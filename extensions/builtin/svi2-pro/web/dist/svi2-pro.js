function xE(e, a) {
  for (var r = 0; r < a.length; r++) {
    const l = a[r];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const s in l)
        if (s !== "default" && !(s in e)) {
          const u = Object.getOwnPropertyDescriptor(l, s);
          u && Object.defineProperty(e, s, u.get ? u : {
            enumerable: !0,
            get: () => l[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function um(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fd = { exports: {} }, Co = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qv;
function wE() {
  if (qv) return Co;
  qv = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(l, s, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), s.key !== void 0 && (c = "" + s.key), "key" in s) {
      u = {};
      for (var d in s)
        d !== "key" && (u[d] = s[d]);
    } else u = s;
    return s = u.ref, {
      $$typeof: e,
      type: l,
      key: c,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return Co.Fragment = a, Co.jsx = r, Co.jsxs = r, Co;
}
var $v;
function _E() {
  return $v || ($v = 1, Fd.exports = wE()), Fd.exports;
}
var y = _E(), Zd = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Iv;
function SE() {
  if (Iv) return Ve;
  Iv = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), b = Symbol.iterator;
  function x(j) {
    return j === null || typeof j != "object" ? null : (j = b && j[b] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var _ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, R = Object.assign, N = {};
  function C(j, U, Q) {
    this.props = j, this.context = U, this.refs = N, this.updater = Q || _;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(j, U) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, U, "setState");
  }, C.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function D() {
  }
  D.prototype = C.prototype;
  function E(j, U, Q) {
    this.props = j, this.context = U, this.refs = N, this.updater = Q || _;
  }
  var O = E.prototype = new D();
  O.constructor = E, R(O, C.prototype), O.isPureReactComponent = !0;
  var k = Array.isArray;
  function H() {
  }
  var V = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function I(j, U, Q) {
    var ee = Q.ref;
    return {
      $$typeof: e,
      type: j,
      key: U,
      ref: ee !== void 0 ? ee : null,
      props: Q
    };
  }
  function ne(j, U) {
    return I(j.type, U, j.props);
  }
  function $(j) {
    return typeof j == "object" && j !== null && j.$$typeof === e;
  }
  function K(j) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(Q) {
      return U[Q];
    });
  }
  var oe = /\/+/g;
  function z(j, U) {
    return typeof j == "object" && j !== null && j.key != null ? K("" + j.key) : U.toString(36);
  }
  function Y(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(H, H) : (j.status = "pending", j.then(
          function(U) {
            j.status === "pending" && (j.status = "fulfilled", j.value = U);
          },
          function(U) {
            j.status === "pending" && (j.status = "rejected", j.reason = U);
          }
        )), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason;
        }
    }
    throw j;
  }
  function T(j, U, Q, ee, ce) {
    var ae = typeof j;
    (ae === "undefined" || ae === "boolean") && (j = null);
    var se = !1;
    if (j === null) se = !0;
    else
      switch (ae) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case e:
            case a:
              se = !0;
              break;
            case v:
              return se = j._init, T(
                se(j._payload),
                U,
                Q,
                ee,
                ce
              );
          }
      }
    if (se)
      return ce = ce(j), se = ee === "" ? "." + z(j, 0) : ee, k(ce) ? (Q = "", se != null && (Q = se.replace(oe, "$&/") + "/"), T(ce, U, Q, "", function(_e) {
        return _e;
      })) : ce != null && ($(ce) && (ce = ne(
        ce,
        Q + (ce.key == null || j && j.key === ce.key ? "" : ("" + ce.key).replace(
          oe,
          "$&/"
        ) + "/") + se
      )), U.push(ce)), 1;
    se = 0;
    var P = ee === "" ? "." : ee + ":";
    if (k(j))
      for (var me = 0; me < j.length; me++)
        ee = j[me], ae = P + z(ee, me), se += T(
          ee,
          U,
          Q,
          ae,
          ce
        );
    else if (me = x(j), typeof me == "function")
      for (j = me.call(j), me = 0; !(ee = j.next()).done; )
        ee = ee.value, ae = P + z(ee, me++), se += T(
          ee,
          U,
          Q,
          ae,
          ce
        );
    else if (ae === "object") {
      if (typeof j.then == "function")
        return T(
          Y(j),
          U,
          Q,
          ee,
          ce
        );
      throw U = String(j), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return se;
  }
  function L(j, U, Q) {
    if (j == null) return j;
    var ee = [], ce = 0;
    return T(j, ee, "", "", function(ae) {
      return U.call(Q, ae, ce++);
    }), ee;
  }
  function F(j) {
    if (j._status === -1) {
      var U = j._result;
      U = U(), U.then(
        function(Q) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = Q);
        },
        function(Q) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = Q);
        }
      ), j._status === -1 && (j._status = 0, j._result = U);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var G = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  }, te = {
    map: L,
    forEach: function(j, U, Q) {
      L(
        j,
        function() {
          U.apply(this, arguments);
        },
        Q
      );
    },
    count: function(j) {
      var U = 0;
      return L(j, function() {
        U++;
      }), U;
    },
    toArray: function(j) {
      return L(j, function(U) {
        return U;
      }) || [];
    },
    only: function(j) {
      if (!$(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return Ve.Activity = g, Ve.Children = te, Ve.Component = C, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = l, Ve.Suspense = p, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return V.H.useMemoCache(j);
    }
  }, Ve.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, Ve.cacheSignal = function() {
    return null;
  }, Ve.cloneElement = function(j, U, Q) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var ee = R({}, j.props), ce = j.key;
    if (U != null)
      for (ae in U.key !== void 0 && (ce = "" + U.key), U)
        !A.call(U, ae) || ae === "key" || ae === "__self" || ae === "__source" || ae === "ref" && U.ref === void 0 || (ee[ae] = U[ae]);
    var ae = arguments.length - 2;
    if (ae === 1) ee.children = Q;
    else if (1 < ae) {
      for (var se = Array(ae), P = 0; P < ae; P++)
        se[P] = arguments[P + 2];
      ee.children = se;
    }
    return I(j.type, ce, ee);
  }, Ve.createContext = function(j) {
    return j = {
      $$typeof: c,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: u,
      _context: j
    }, j;
  }, Ve.createElement = function(j, U, Q) {
    var ee, ce = {}, ae = null;
    if (U != null)
      for (ee in U.key !== void 0 && (ae = "" + U.key), U)
        A.call(U, ee) && ee !== "key" && ee !== "__self" && ee !== "__source" && (ce[ee] = U[ee]);
    var se = arguments.length - 2;
    if (se === 1) ce.children = Q;
    else if (1 < se) {
      for (var P = Array(se), me = 0; me < se; me++)
        P[me] = arguments[me + 2];
      ce.children = P;
    }
    if (j && j.defaultProps)
      for (ee in se = j.defaultProps, se)
        ce[ee] === void 0 && (ce[ee] = se[ee]);
    return I(j, ae, ce);
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(j) {
    return { $$typeof: d, render: j };
  }, Ve.isValidElement = $, Ve.lazy = function(j) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: j },
      _init: F
    };
  }, Ve.memo = function(j, U) {
    return {
      $$typeof: h,
      type: j,
      compare: U === void 0 ? null : U
    };
  }, Ve.startTransition = function(j) {
    var U = V.T, Q = {};
    V.T = Q;
    try {
      var ee = j(), ce = V.S;
      ce !== null && ce(Q, ee), typeof ee == "object" && ee !== null && typeof ee.then == "function" && ee.then(H, G);
    } catch (ae) {
      G(ae);
    } finally {
      U !== null && Q.types !== null && (U.types = Q.types), V.T = U;
    }
  }, Ve.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ve.use = function(j) {
    return V.H.use(j);
  }, Ve.useActionState = function(j, U, Q) {
    return V.H.useActionState(j, U, Q);
  }, Ve.useCallback = function(j, U) {
    return V.H.useCallback(j, U);
  }, Ve.useContext = function(j) {
    return V.H.useContext(j);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(j, U) {
    return V.H.useDeferredValue(j, U);
  }, Ve.useEffect = function(j, U) {
    return V.H.useEffect(j, U);
  }, Ve.useEffectEvent = function(j) {
    return V.H.useEffectEvent(j);
  }, Ve.useId = function() {
    return V.H.useId();
  }, Ve.useImperativeHandle = function(j, U, Q) {
    return V.H.useImperativeHandle(j, U, Q);
  }, Ve.useInsertionEffect = function(j, U) {
    return V.H.useInsertionEffect(j, U);
  }, Ve.useLayoutEffect = function(j, U) {
    return V.H.useLayoutEffect(j, U);
  }, Ve.useMemo = function(j, U) {
    return V.H.useMemo(j, U);
  }, Ve.useOptimistic = function(j, U) {
    return V.H.useOptimistic(j, U);
  }, Ve.useReducer = function(j, U, Q) {
    return V.H.useReducer(j, U, Q);
  }, Ve.useRef = function(j) {
    return V.H.useRef(j);
  }, Ve.useState = function(j) {
    return V.H.useState(j);
  }, Ve.useSyncExternalStore = function(j, U, Q) {
    return V.H.useSyncExternalStore(
      j,
      U,
      Q
    );
  }, Ve.useTransition = function() {
    return V.H.useTransition();
  }, Ve.version = "19.2.7", Ve;
}
var Yv;
function ns() {
  return Yv || (Yv = 1, Zd.exports = SE()), Zd.exports;
}
var S = ns();
const ve = /* @__PURE__ */ um(S), EE = /* @__PURE__ */ xE({
  __proto__: null,
  default: ve
}, [S]);
var Pd = { exports: {} }, Ro = {}, Qd = { exports: {} }, Kd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gv;
function NE() {
  return Gv || (Gv = 1, (function(e) {
    function a(T, L) {
      var F = T.length;
      T.push(L);
      e: for (; 0 < F; ) {
        var G = F - 1 >>> 1, te = T[G];
        if (0 < s(te, L))
          T[G] = L, T[F] = te, F = G;
        else break e;
      }
    }
    function r(T) {
      return T.length === 0 ? null : T[0];
    }
    function l(T) {
      if (T.length === 0) return null;
      var L = T[0], F = T.pop();
      if (F !== L) {
        T[0] = F;
        e: for (var G = 0, te = T.length, j = te >>> 1; G < j; ) {
          var U = 2 * (G + 1) - 1, Q = T[U], ee = U + 1, ce = T[ee];
          if (0 > s(Q, F))
            ee < te && 0 > s(ce, Q) ? (T[G] = ce, T[ee] = F, G = ee) : (T[G] = Q, T[U] = F, G = U);
          else if (ee < te && 0 > s(ce, F))
            T[G] = ce, T[ee] = F, G = ee;
          else break e;
        }
      }
      return L;
    }
    function s(T, L) {
      var F = T.sortIndex - L.sortIndex;
      return F !== 0 ? F : T.id - L.id;
    }
    if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      e.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, d = c.now();
      e.unstable_now = function() {
        return c.now() - d;
      };
    }
    var p = [], h = [], v = 1, g = null, b = 3, x = !1, _ = !1, R = !1, N = !1, C = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function O(T) {
      for (var L = r(h); L !== null; ) {
        if (L.callback === null) l(h);
        else if (L.startTime <= T)
          l(h), L.sortIndex = L.expirationTime, a(p, L);
        else break;
        L = r(h);
      }
    }
    function k(T) {
      if (R = !1, O(T), !_)
        if (r(p) !== null)
          _ = !0, H || (H = !0, K());
        else {
          var L = r(h);
          L !== null && Y(k, L.startTime - T);
        }
    }
    var H = !1, V = -1, A = 5, I = -1;
    function ne() {
      return N ? !0 : !(e.unstable_now() - I < A);
    }
    function $() {
      if (N = !1, H) {
        var T = e.unstable_now();
        I = T;
        var L = !0;
        try {
          e: {
            _ = !1, R && (R = !1, D(V), V = -1), x = !0;
            var F = b;
            try {
              t: {
                for (O(T), g = r(p); g !== null && !(g.expirationTime > T && ne()); ) {
                  var G = g.callback;
                  if (typeof G == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var te = G(
                      g.expirationTime <= T
                    );
                    if (T = e.unstable_now(), typeof te == "function") {
                      g.callback = te, O(T), L = !0;
                      break t;
                    }
                    g === r(p) && l(p), O(T);
                  } else l(p);
                  g = r(p);
                }
                if (g !== null) L = !0;
                else {
                  var j = r(h);
                  j !== null && Y(
                    k,
                    j.startTime - T
                  ), L = !1;
                }
              }
              break e;
            } finally {
              g = null, b = F, x = !1;
            }
            L = void 0;
          }
        } finally {
          L ? K() : H = !1;
        }
      }
    }
    var K;
    if (typeof E == "function")
      K = function() {
        E($);
      };
    else if (typeof MessageChannel < "u") {
      var oe = new MessageChannel(), z = oe.port2;
      oe.port1.onmessage = $, K = function() {
        z.postMessage(null);
      };
    } else
      K = function() {
        C($, 0);
      };
    function Y(T, L) {
      V = C(function() {
        T(e.unstable_now());
      }, L);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, e.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < T ? Math.floor(1e3 / T) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, e.unstable_next = function(T) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = b;
      }
      var F = b;
      b = L;
      try {
        return T();
      } finally {
        b = F;
      }
    }, e.unstable_requestPaint = function() {
      N = !0;
    }, e.unstable_runWithPriority = function(T, L) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var F = b;
      b = T;
      try {
        return L();
      } finally {
        b = F;
      }
    }, e.unstable_scheduleCallback = function(T, L, F) {
      var G = e.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? G + F : G) : F = G, T) {
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
      return te = F + te, T = {
        id: v++,
        callback: L,
        priorityLevel: T,
        startTime: F,
        expirationTime: te,
        sortIndex: -1
      }, F > G ? (T.sortIndex = F, a(h, T), r(p) === null && T === r(h) && (R ? (D(V), V = -1) : R = !0, Y(k, F - G))) : (T.sortIndex = te, a(p, T), _ || x || (_ = !0, H || (H = !0, K()))), T;
    }, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(T) {
      var L = b;
      return function() {
        var F = b;
        b = L;
        try {
          return T.apply(this, arguments);
        } finally {
          b = F;
        }
      };
    };
  })(Kd)), Kd;
}
var Xv;
function CE() {
  return Xv || (Xv = 1, Qd.exports = NE()), Qd.exports;
}
var Jd = { exports: {} }, dn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fv;
function RE() {
  if (Fv) return dn;
  Fv = 1;
  var e = ns();
  function a(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        h += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(p, h, v) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: g == null ? null : "" + g,
      children: p,
      containerInfo: h,
      implementation: v
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return dn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, dn.createPortal = function(p, h) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(a(299));
    return u(p, h, null, v);
  }, dn.flushSync = function(p) {
    var h = c.T, v = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = h, l.p = v, l.d.f();
    }
  }, dn.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, l.d.C(p, h));
  }, dn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, dn.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var v = h.as, g = d(v, h.crossOrigin), b = typeof h.integrity == "string" ? h.integrity : void 0, x = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      v === "style" ? l.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: g,
          integrity: b,
          fetchPriority: x
        }
      ) : v === "script" && l.d.X(p, {
        crossOrigin: g,
        integrity: b,
        fetchPriority: x,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, dn.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var v = d(
            h.as,
            h.crossOrigin
          );
          l.d.M(p, {
            crossOrigin: v,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && l.d.M(p);
  }, dn.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var v = h.as, g = d(v, h.crossOrigin);
      l.d.L(p, v, {
        crossOrigin: g,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, dn.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var v = d(h.as, h.crossOrigin);
        l.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: v,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else l.d.m(p);
  }, dn.requestFormReset = function(p) {
    l.d.r(p);
  }, dn.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, dn.useFormState = function(p, h, v) {
    return c.H.useFormState(p, h, v);
  }, dn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, dn.version = "19.2.7", dn;
}
var Zv;
function wx() {
  if (Zv) return Jd.exports;
  Zv = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Jd.exports = RE(), Jd.exports;
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
var Pv;
function TE() {
  if (Pv) return Ro;
  Pv = 1;
  var e = CE(), a = ns(), r = wx();
  function l(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        n += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function u(t) {
    var n = t, i = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do
        n = t, (n.flags & 4098) !== 0 && (i = n.return), t = n.return;
      while (t);
    }
    return n.tag === 3 ? i : null;
  }
  function c(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function d(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (u(t) !== t)
      throw Error(l(188));
  }
  function h(t) {
    var n = t.alternate;
    if (!n) {
      if (n = u(t), n === null) throw Error(l(188));
      return n !== t ? null : t;
    }
    for (var i = t, o = n; ; ) {
      var f = i.return;
      if (f === null) break;
      var m = f.alternate;
      if (m === null) {
        if (o = f.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (f.child === m.child) {
        for (m = f.child; m; ) {
          if (m === i) return p(f), t;
          if (m === o) return p(f), n;
          m = m.sibling;
        }
        throw Error(l(188));
      }
      if (i.return !== o.return) i = f, o = m;
      else {
        for (var w = !1, M = f.child; M; ) {
          if (M === i) {
            w = !0, i = f, o = m;
            break;
          }
          if (M === o) {
            w = !0, o = f, i = m;
            break;
          }
          M = M.sibling;
        }
        if (!w) {
          for (M = m.child; M; ) {
            if (M === i) {
              w = !0, i = m, o = f;
              break;
            }
            if (M === o) {
              w = !0, o = m, i = f;
              break;
            }
            M = M.sibling;
          }
          if (!w) throw Error(l(189));
        }
      }
      if (i.alternate !== o) throw Error(l(190));
    }
    if (i.tag !== 3) throw Error(l(188));
    return i.stateNode.current === i ? t : n;
  }
  function v(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (n = v(t), n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var g = Object.assign, b = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), E = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), H = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), ne = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var oe = Symbol.for("react.client.reference");
  function z(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === oe ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case R:
        return "Fragment";
      case C:
        return "Profiler";
      case N:
        return "StrictMode";
      case k:
        return "Suspense";
      case H:
        return "SuspenseList";
      case I:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case _:
          return "Portal";
        case E:
          return t.displayName || "Context";
        case D:
          return (t._context.displayName || "Context") + ".Consumer";
        case O:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case V:
          return n = t.displayName || null, n !== null ? n : z(t.type) || "Memo";
        case A:
          n = t._payload, t = t._init;
          try {
            return z(t(n));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, T = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], te = -1;
  function j(t) {
    return { current: t };
  }
  function U(t) {
    0 > te || (t.current = G[te], G[te] = null, te--);
  }
  function Q(t, n) {
    te++, G[te] = t.current, t.current = n;
  }
  var ee = j(null), ce = j(null), ae = j(null), se = j(null);
  function P(t, n) {
    switch (Q(ae, n), Q(ce, t), Q(ee, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? cv(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = cv(n), t = fv(n, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    U(ee), Q(ee, t);
  }
  function me() {
    U(ee), U(ce), U(ae);
  }
  function _e(t) {
    t.memoizedState !== null && Q(se, t);
    var n = ee.current, i = fv(n, t.type);
    n !== i && (Q(ce, t), Q(ee, i));
  }
  function Te(t) {
    ce.current === t && (U(ee), U(ce)), se.current === t && (U(se), _o._currentValue = F);
  }
  var Se, xe;
  function Re(t) {
    if (Se === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        Se = n && n[1] || "", xe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Se + t + xe;
  }
  var $e = !1;
  function ft(t, n) {
    if (!t || $e) return "";
    $e = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var he = function() {
                throw Error();
              };
              if (Object.defineProperty(he.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(he, []);
                } catch (ue) {
                  var le = ue;
                }
                Reflect.construct(t, [], he);
              } else {
                try {
                  he.call();
                } catch (ue) {
                  le = ue;
                }
                t.call(he.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ue) {
                le = ue;
              }
              (he = t()) && typeof he.catch == "function" && he.catch(function() {
              });
            }
          } catch (ue) {
            if (ue && le && typeof ue.stack == "string")
              return [ue.stack, le.stack];
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
      var m = o.DetermineComponentFrameRoot(), w = m[0], M = m[1];
      if (w && M) {
        var q = w.split(`
`), re = M.split(`
`);
        for (f = o = 0; o < q.length && !q[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < re.length && !re[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === q.length || f === re.length)
          for (o = q.length - 1, f = re.length - 1; 1 <= o && 0 <= f && q[o] !== re[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (q[o] !== re[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || q[o] !== re[f]) {
                  var fe = `
` + q[o].replace(" at new ", " at ");
                  return t.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", t.displayName)), fe;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      $e = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? Re(i) : "";
  }
  function Me(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Re(t.type);
      case 16:
        return Re("Lazy");
      case 13:
        return t.child !== n && n !== null ? Re("Suspense Fallback") : Re("Suspense");
      case 19:
        return Re("SuspenseList");
      case 0:
      case 15:
        return ft(t.type, !1);
      case 11:
        return ft(t.type.render, !1);
      case 1:
        return ft(t.type, !0);
      case 31:
        return Re("Activity");
      default:
        return "";
    }
  }
  function Xe(t) {
    try {
      var n = "", i = null;
      do
        n += Me(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var He = Object.prototype.hasOwnProperty, Ie = e.unstable_scheduleCallback, _t = e.unstable_cancelCallback, Je = e.unstable_shouldYield, Ze = e.unstable_requestPaint, Pe = e.unstable_now, gt = e.unstable_getCurrentPriorityLevel, vt = e.unstable_ImmediatePriority, Yt = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, mt = e.unstable_LowPriority, ot = e.unstable_IdlePriority, Pn = e.log, _n = e.unstable_setDisableYieldValue, nn = null, Kt = null;
  function Ot(t) {
    if (typeof Pn == "function" && _n(t), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(nn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : Sn, vi = Math.log, Ra = Math.LN2;
  function Sn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (vi(t) / Ra | 0) | 0;
  }
  var da = 256, kn = 262144, Qn = 4194304;
  function cn(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function ke(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0, m = t.suspendedLanes, w = t.pingedLanes;
    t = t.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~m, o !== 0 ? f = cn(o) : (w &= M, w !== 0 ? f = cn(w) : i || (i = M & ~t, i !== 0 && (f = cn(i))))) : (M = o & ~m, M !== 0 ? f = cn(M) : w !== 0 ? f = cn(w) : i || (i = o & ~t, i !== 0 && (f = cn(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & m) === 0 && (m = f & -f, i = n & -n, m >= i || m === 32 && (i & 4194048) !== 0) ? n : f;
  }
  function yt(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function kt(t, n) {
    switch (t) {
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
    var t = Qn;
    return Qn <<= 1, (Qn & 62914560) === 0 && (Qn = 4194304), t;
  }
  function gn(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function pt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Jt(t, n, i, o, f, m) {
    var w = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var M = t.entanglements, q = t.expirationTimes, re = t.hiddenUpdates;
    for (i = w & ~i; 0 < i; ) {
      var fe = 31 - Ut(i), he = 1 << fe;
      M[fe] = 0, q[fe] = -1;
      var le = re[fe];
      if (le !== null)
        for (re[fe] = null, fe = 0; fe < le.length; fe++) {
          var ue = le[fe];
          ue !== null && (ue.lane &= -536870913);
        }
      i &= ~he;
    }
    o !== 0 && ha(t, o, 0), m !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= m & ~(w & ~n));
  }
  function ha(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ut(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function en(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ut(i), f = 1 << o;
      f & n | t[o] & n && (t[o] |= n), i &= ~f;
    }
  }
  function B(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Z(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Z(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function W(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function pe() {
    var t = L.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : zv(t.type));
  }
  function ge(t, n) {
    var i = L.p;
    try {
      return L.p = t, n();
    } finally {
      L.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ye = "__reactFiber$" + Ee, we = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Ae = "__reactEvents$" + Ee, De = "__reactListeners$" + Ee, Ue = "__reactHandles$" + Ee, ze = "__reactResources$" + Ee, Ge = "__reactMarker$" + Ee;
  function rt(t) {
    delete t[ye], delete t[we], delete t[Ae], delete t[De], delete t[Ue];
  }
  function Ct(t) {
    var n = t[ye];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[be] || i[ye]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = yv(t); t !== null; ) {
            if (i = t[ye]) return i;
            t = yv(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function st(t) {
    if (t = t[ye] || t[be]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function We(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(l(33));
  }
  function zt(t) {
    var n = t[ze];
    return n || (n = t[ze] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(t) {
    t[Ge] = !0;
  }
  var Ta = /* @__PURE__ */ new Set(), Hn = {};
  function fn(t, n) {
    an(t, n), an(t + "Capture", n);
  }
  function an(t, n) {
    for (Hn[t] = n, t = 0; t < n.length; t++)
      Ta.add(n[t]);
  }
  var En = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), yi = {}, Nn = {};
  function bi(t) {
    return He.call(Nn, t) ? !0 : He.call(yi, t) ? !1 : En.test(t) ? Nn[t] = !0 : (yi[t] = !0, !1);
  }
  function ma(t, n, i) {
    if (bi(n))
      if (i === null) t.removeAttribute(n);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, "" + i);
      }
  }
  function pa(t, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + i);
    }
  }
  function Be(t, n, i, o) {
    if (o === null) t.removeAttribute(i);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(i);
          return;
      }
      t.setAttributeNS(n, i, "" + o);
    }
  }
  function bt(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function vn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Bn(t, n, i) {
    var o = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      n
    );
    if (!t.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var f = o.get, m = o.set;
      return Object.defineProperty(t, n, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(w) {
          i = "" + w, m.call(this, w);
        }
      }), Object.defineProperty(t, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(w) {
          i = "" + w;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function xi(t) {
    if (!t._valueTracker) {
      var n = vn(t) ? "checked" : "value";
      t._valueTracker = Bn(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Ga(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = vn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function dt(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Kn = /[\n"\\]/g;
  function rn(t) {
    return t.replace(
      Kn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function tr(t, n, i, o, f, m, w, M) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + bt(n)) : t.value !== "" + bt(n) && (t.value = "" + bt(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? kl(t, w, bt(n)) : i != null ? kl(t, w, bt(i)) : o != null && t.removeAttribute("value"), f == null && m != null && (t.defaultChecked = !!m), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + bt(M) : t.removeAttribute("name");
  }
  function Lr(t, n, i, o, f, m, w, M) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.type = m), n != null || i != null) {
      if (!(m !== "submit" && m !== "reset" || n != null)) {
        xi(t);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), xi(t);
  }
  function kl(t, n, i) {
    n === "number" && dt(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function wi(t, n, i, o) {
    if (t = t.options, n) {
      n = {};
      for (var f = 0; f < i.length; f++)
        n["$" + i[f]] = !0;
      for (i = 0; i < t.length; i++)
        f = n.hasOwnProperty("$" + t[i].value), t[i].selected !== f && (t[i].selected = f), f && o && (t[i].defaultSelected = !0);
    } else {
      for (i = "" + bt(i), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === i) {
          t[f].selected = !0, o && (t[f].defaultSelected = !0);
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Hl(t, n, i) {
    if (n != null && (n = "" + bt(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + bt(i) : "";
  }
  function lp(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(l(92));
        if (Y(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = bt(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), xi(t);
  }
  function kr(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var p_ = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function op(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || p_.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function sp(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && op(t, f, o);
    } else
      for (var m in n)
        n.hasOwnProperty(m) && op(t, m, n[m]);
  }
  function $c(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var g_ = /* @__PURE__ */ new Map([
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
  ]), v_ = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ms(t) {
    return v_.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Xa() {
  }
  var Ic = null;
  function Yc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Hr = null, Br = null;
  function up(t) {
    var n = st(t);
    if (n && (t = n.stateNode)) {
      var i = t[we] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (tr(
            t,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), n = i.name, i.type === "radio" && n != null) {
            for (i = t; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + rn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var f = o[we] || null;
                if (!f) throw Error(l(90));
                tr(
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
              o = i[n], o.form === t.form && Ga(o);
          }
          break e;
        case "textarea":
          Hl(t, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && wi(t, !!i.multiple, n, !1);
      }
    }
  }
  var Gc = !1;
  function cp(t, n, i) {
    if (Gc) return t(n, i);
    Gc = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (Gc = !1, (Hr !== null || Br !== null) && (tu(), Hr && (n = Hr, t = Br, Br = Hr = null, up(n), t)))
        for (n = 0; n < t.length; n++) up(t[n]);
    }
  }
  function Bl(t, n) {
    var i = t.stateNode;
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
        (o = !o.disabled) || (t = t.type, o = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !o;
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (i && typeof i != "function")
      throw Error(
        l(231, n, typeof i)
      );
    return i;
  }
  var Fa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xc = !1;
  if (Fa)
    try {
      var Ul = {};
      Object.defineProperty(Ul, "passive", {
        get: function() {
          Xc = !0;
        }
      }), window.addEventListener("test", Ul, Ul), window.removeEventListener("test", Ul, Ul);
    } catch {
      Xc = !1;
    }
  var _i = null, Fc = null, ps = null;
  function fp() {
    if (ps) return ps;
    var t, n = Fc, i = n.length, o, f = "value" in _i ? _i.value : _i.textContent, m = f.length;
    for (t = 0; t < i && n[t] === f[t]; t++) ;
    var w = i - t;
    for (o = 1; o <= w && n[i - o] === f[m - o]; o++) ;
    return ps = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function gs(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function vs() {
    return !0;
  }
  function dp() {
    return !1;
  }
  function Cn(t) {
    function n(i, o, f, m, w) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = m, this.target = w, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (i = t[M], this[M] = i ? i(m) : m[M]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? vs : dp, this.isPropagationStopped = dp, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = vs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = vs);
      },
      persist: function() {
      },
      isPersistent: vs
    }), n;
  }
  var nr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ys = Cn(nr), Vl = g({}, nr, { view: 0, detail: 0 }), y_ = Cn(Vl), Zc, Pc, ql, bs = g({}, Vl, {
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
    getModifierState: Kc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ql && (ql && t.type === "mousemove" ? (Zc = t.screenX - ql.screenX, Pc = t.screenY - ql.screenY) : Pc = Zc = 0, ql = t), Zc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Pc;
    }
  }), hp = Cn(bs), b_ = g({}, bs, { dataTransfer: 0 }), x_ = Cn(b_), w_ = g({}, Vl, { relatedTarget: 0 }), Qc = Cn(w_), __ = g({}, nr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), S_ = Cn(__), E_ = g({}, nr, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), N_ = Cn(E_), C_ = g({}, nr, { data: 0 }), mp = Cn(C_), R_ = {
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
  }, T_ = {
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
  }, M_ = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function A_(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = M_[t]) ? !!n[t] : !1;
  }
  function Kc() {
    return A_;
  }
  var D_ = g({}, Vl, {
    key: function(t) {
      if (t.key) {
        var n = R_[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = gs(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? T_[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Kc,
    charCode: function(t) {
      return t.type === "keypress" ? gs(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? gs(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), j_ = Cn(D_), O_ = g({}, bs, {
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
  }), pp = Cn(O_), z_ = g({}, Vl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Kc
  }), L_ = Cn(z_), k_ = g({}, nr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), H_ = Cn(k_), B_ = g({}, bs, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), U_ = Cn(B_), V_ = g({}, nr, {
    newState: 0,
    oldState: 0
  }), q_ = Cn(V_), $_ = [9, 13, 27, 32], Jc = Fa && "CompositionEvent" in window, $l = null;
  Fa && "documentMode" in document && ($l = document.documentMode);
  var I_ = Fa && "TextEvent" in window && !$l, gp = Fa && (!Jc || $l && 8 < $l && 11 >= $l), vp = " ", yp = !1;
  function bp(t, n) {
    switch (t) {
      case "keyup":
        return $_.indexOf(n.keyCode) !== -1;
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
  function xp(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ur = !1;
  function Y_(t, n) {
    switch (t) {
      case "compositionend":
        return xp(n);
      case "keypress":
        return n.which !== 32 ? null : (yp = !0, vp);
      case "textInput":
        return t = n.data, t === vp && yp ? null : t;
      default:
        return null;
    }
  }
  function G_(t, n) {
    if (Ur)
      return t === "compositionend" || !Jc && bp(t, n) ? (t = fp(), ps = Fc = _i = null, Ur = !1, t) : null;
    switch (t) {
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
        return gp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var X_ = {
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
  function wp(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!X_[t.type] : n === "textarea";
  }
  function _p(t, n, i, o) {
    Hr ? Br ? Br.push(o) : Br = [o] : Hr = o, n = su(n, "onChange"), 0 < n.length && (i = new ys(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var Il = null, Yl = null;
  function F_(t) {
    iv(t, 0);
  }
  function xs(t) {
    var n = We(t);
    if (Ga(n)) return t;
  }
  function Sp(t, n) {
    if (t === "change") return n;
  }
  var Ep = !1;
  if (Fa) {
    var Wc;
    if (Fa) {
      var ef = "oninput" in document;
      if (!ef) {
        var Np = document.createElement("div");
        Np.setAttribute("oninput", "return;"), ef = typeof Np.oninput == "function";
      }
      Wc = ef;
    } else Wc = !1;
    Ep = Wc && (!document.documentMode || 9 < document.documentMode);
  }
  function Cp() {
    Il && (Il.detachEvent("onpropertychange", Rp), Yl = Il = null);
  }
  function Rp(t) {
    if (t.propertyName === "value" && xs(Yl)) {
      var n = [];
      _p(
        n,
        Yl,
        t,
        Yc(t)
      ), cp(F_, n);
    }
  }
  function Z_(t, n, i) {
    t === "focusin" ? (Cp(), Il = n, Yl = i, Il.attachEvent("onpropertychange", Rp)) : t === "focusout" && Cp();
  }
  function P_(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return xs(Yl);
  }
  function Q_(t, n) {
    if (t === "click") return xs(n);
  }
  function K_(t, n) {
    if (t === "input" || t === "change")
      return xs(n);
  }
  function J_(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Un = typeof Object.is == "function" ? Object.is : J_;
  function Gl(t, n) {
    if (Un(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!He.call(n, f) || !Un(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Tp(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Mp(t, n) {
    var i = Tp(t);
    t = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (o = t + i.textContent.length, t <= n && o >= n)
          return { node: i, offset: n - t };
        t = o;
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
      i = Tp(i);
    }
  }
  function Ap(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Ap(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Dp(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = dt(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = dt(t.document);
    }
    return n;
  }
  function tf(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var W_ = Fa && "documentMode" in document && 11 >= document.documentMode, Vr = null, nf = null, Xl = null, af = !1;
  function jp(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    af || Vr == null || Vr !== dt(o) || (o = Vr, "selectionStart" in o && tf(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Xl && Gl(Xl, o) || (Xl = o, o = su(nf, "onSelect"), 0 < o.length && (n = new ys(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = Vr)));
  }
  function ar(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var qr = {
    animationend: ar("Animation", "AnimationEnd"),
    animationiteration: ar("Animation", "AnimationIteration"),
    animationstart: ar("Animation", "AnimationStart"),
    transitionrun: ar("Transition", "TransitionRun"),
    transitionstart: ar("Transition", "TransitionStart"),
    transitioncancel: ar("Transition", "TransitionCancel"),
    transitionend: ar("Transition", "TransitionEnd")
  }, rf = {}, Op = {};
  Fa && (Op = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
  function ir(t) {
    if (rf[t]) return rf[t];
    if (!qr[t]) return t;
    var n = qr[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Op)
        return rf[t] = n[i];
    return t;
  }
  var zp = ir("animationend"), Lp = ir("animationiteration"), kp = ir("animationstart"), eS = ir("transitionrun"), tS = ir("transitionstart"), nS = ir("transitioncancel"), Hp = ir("transitionend"), Bp = /* @__PURE__ */ new Map(), lf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  lf.push("scrollEnd");
  function ga(t, n) {
    Bp.set(t, n), fn(n, [t]);
  }
  var ws = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Jn = [], $r = 0, of = 0;
  function _s() {
    for (var t = $r, n = of = $r = 0; n < t; ) {
      var i = Jn[n];
      Jn[n++] = null;
      var o = Jn[n];
      Jn[n++] = null;
      var f = Jn[n];
      Jn[n++] = null;
      var m = Jn[n];
      if (Jn[n++] = null, o !== null && f !== null) {
        var w = o.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), o.pending = f;
      }
      m !== 0 && Up(i, f, m);
    }
  }
  function Ss(t, n, i, o) {
    Jn[$r++] = t, Jn[$r++] = n, Jn[$r++] = i, Jn[$r++] = o, of |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function sf(t, n, i, o) {
    return Ss(t, n, i, o), Es(t);
  }
  function rr(t, n) {
    return Ss(t, null, null, n), Es(t);
  }
  function Up(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, m = t.return; m !== null; )
      m.childLanes |= i, o = m.alternate, o !== null && (o.childLanes |= i), m.tag === 22 && (t = m.stateNode, t === null || t._visibility & 1 || (f = !0)), t = m, m = m.return;
    return t.tag === 3 ? (m = t.stateNode, f && n !== null && (f = 31 - Ut(i), t = m.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = i | 536870912), m) : null;
  }
  function Es(t) {
    if (50 < po)
      throw po = 0, vd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ir = {};
  function aS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Vn(t, n, i, o) {
    return new aS(t, n, i, o);
  }
  function uf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Za(t, n) {
    var i = t.alternate;
    return i === null ? (i = Vn(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Vp(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Ns(t, n, i, o, f, m) {
    var w = 0;
    if (o = t, typeof t == "function") uf(t) && (w = 1);
    else if (typeof t == "string")
      w = sE(
        t,
        i,
        ee.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case I:
          return t = Vn(31, i, n, f), t.elementType = I, t.lanes = m, t;
        case R:
          return lr(i.children, f, m, n);
        case N:
          w = 8, f |= 24;
          break;
        case C:
          return t = Vn(12, i, n, f | 2), t.elementType = C, t.lanes = m, t;
        case k:
          return t = Vn(13, i, n, f), t.elementType = k, t.lanes = m, t;
        case H:
          return t = Vn(19, i, n, f), t.elementType = H, t.lanes = m, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case E:
                w = 10;
                break e;
              case D:
                w = 9;
                break e;
              case O:
                w = 11;
                break e;
              case V:
                w = 14;
                break e;
              case A:
                w = 16, o = null;
                break e;
            }
          w = 29, i = Error(
            l(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = Vn(w, i, n, f), n.elementType = t, n.type = o, n.lanes = m, n;
  }
  function lr(t, n, i, o) {
    return t = Vn(7, t, o, n), t.lanes = i, t;
  }
  function cf(t, n, i) {
    return t = Vn(6, t, null, n), t.lanes = i, t;
  }
  function qp(t) {
    var n = Vn(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function ff(t, n, i) {
    return n = Vn(
      4,
      t.children !== null ? t.children : [],
      t.key,
      n
    ), n.lanes = i, n.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, n;
  }
  var $p = /* @__PURE__ */ new WeakMap();
  function Wn(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = $p.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Xe(n)
      }, $p.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Xe(n)
    };
  }
  var Yr = [], Gr = 0, Cs = null, Fl = 0, ea = [], ta = 0, Si = null, Ma = 1, Aa = "";
  function Pa(t, n) {
    Yr[Gr++] = Fl, Yr[Gr++] = Cs, Cs = t, Fl = n;
  }
  function Ip(t, n, i) {
    ea[ta++] = Ma, ea[ta++] = Aa, ea[ta++] = Si, Si = t;
    var o = Ma;
    t = Aa;
    var f = 32 - Ut(o) - 1;
    o &= ~(1 << f), i += 1;
    var m = 32 - Ut(n) + f;
    if (30 < m) {
      var w = f - f % 5;
      m = (o & (1 << w) - 1).toString(32), o >>= w, f -= w, Ma = 1 << 32 - Ut(n) + f | i << f | o, Aa = m + t;
    } else
      Ma = 1 << m | i << f | o, Aa = t;
  }
  function df(t) {
    t.return !== null && (Pa(t, 1), Ip(t, 1, 0));
  }
  function hf(t) {
    for (; t === Cs; )
      Cs = Yr[--Gr], Yr[Gr] = null, Fl = Yr[--Gr], Yr[Gr] = null;
    for (; t === Si; )
      Si = ea[--ta], ea[ta] = null, Aa = ea[--ta], ea[ta] = null, Ma = ea[--ta], ea[ta] = null;
  }
  function Yp(t, n) {
    ea[ta++] = Ma, ea[ta++] = Aa, ea[ta++] = Si, Ma = n.id, Aa = n.overflow, Si = t;
  }
  var ln = null, Tt = null, it = !1, Ei = null, na = !1, mf = Error(l(519));
  function Ni(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Zl(Wn(n, t)), mf;
  }
  function Gp(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ye] = t, n[we] = o, i) {
      case "dialog":
        Ke("cancel", n), Ke("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ke("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < vo.length; i++)
          Ke(vo[i], n);
        break;
      case "source":
        Ke("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ke("error", n), Ke("load", n);
        break;
      case "details":
        Ke("toggle", n);
        break;
      case "input":
        Ke("invalid", n), Lr(
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
        Ke("invalid", n);
        break;
      case "textarea":
        Ke("invalid", n), lp(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || sv(n.textContent, i) ? (o.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), o.onScroll != null && Ke("scroll", n), o.onScrollEnd != null && Ke("scrollend", n), o.onClick != null && (n.onclick = Xa), n = !0) : n = !1, n || Ni(t, !0);
  }
  function Xp(t) {
    for (ln = t.return; ln; )
      switch (ln.tag) {
        case 5:
        case 31:
        case 13:
          na = !1;
          return;
        case 27:
        case 3:
          na = !0;
          return;
        default:
          ln = ln.return;
      }
  }
  function Xr(t) {
    if (t !== ln) return !1;
    if (!it) return Xp(t), it = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || jd(t.type, t.memoizedProps)), i = !i), i && Tt && Ni(t), Xp(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = vv(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = vv(t);
    } else
      n === 27 ? (n = Tt, Ui(t.type) ? (t = Hd, Hd = null, Tt = t) : Tt = n) : Tt = ln ? ia(t.stateNode.nextSibling) : null;
    return !0;
  }
  function or() {
    Tt = ln = null, it = !1;
  }
  function pf() {
    var t = Ei;
    return t !== null && (An === null ? An = t : An.push.apply(
      An,
      t
    ), Ei = null), t;
  }
  function Zl(t) {
    Ei === null ? Ei = [t] : Ei.push(t);
  }
  var gf = j(null), sr = null, Qa = null;
  function Ci(t, n, i) {
    Q(gf, n._currentValue), n._currentValue = i;
  }
  function Ka(t) {
    t._currentValue = gf.current, U(gf);
  }
  function vf(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function yf(t, n, i, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var m = f.dependencies;
      if (m !== null) {
        var w = f.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var M = m;
          m = f;
          for (var q = 0; q < n.length; q++)
            if (M.context === n[q]) {
              m.lanes |= i, M = m.alternate, M !== null && (M.lanes |= i), vf(
                m.return,
                i,
                t
              ), o || (w = null);
              break e;
            }
          m = M.next;
        }
      } else if (f.tag === 18) {
        if (w = f.return, w === null) throw Error(l(341));
        w.lanes |= i, m = w.alternate, m !== null && (m.lanes |= i), vf(w, i, t), w = null;
      } else w = f.child;
      if (w !== null) w.return = f;
      else
        for (w = f; w !== null; ) {
          if (w === t) {
            w = null;
            break;
          }
          if (f = w.sibling, f !== null) {
            f.return = w.return, w = f;
            break;
          }
          w = w.return;
        }
      f = w;
    }
  }
  function Fr(t, n, i, o) {
    t = null;
    for (var f = n, m = !1; f !== null; ) {
      if (!m) {
        if ((f.flags & 524288) !== 0) m = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var w = f.alternate;
        if (w === null) throw Error(l(387));
        if (w = w.memoizedProps, w !== null) {
          var M = f.type;
          Un(f.pendingProps.value, w.value) || (t !== null ? t.push(M) : t = [M]);
        }
      } else if (f === se.current) {
        if (w = f.alternate, w === null) throw Error(l(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(_o) : t = [_o]);
      }
      f = f.return;
    }
    t !== null && yf(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Rs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Un(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ur(t) {
    sr = t, Qa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function on(t) {
    return Fp(sr, t);
  }
  function Ts(t, n) {
    return sr === null && ur(t), Fp(t, n);
  }
  function Fp(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Qa === null) {
      if (t === null) throw Error(l(308));
      Qa = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Qa = Qa.next = n;
    return i;
  }
  var iS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(i, o) {
        t.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, t.forEach(function(i) {
        return i();
      });
    };
  }, rS = e.unstable_scheduleCallback, lS = e.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function bf() {
    return {
      controller: new iS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Pl(t) {
    t.refCount--, t.refCount === 0 && rS(lS, function() {
      t.controller.abort();
    });
  }
  var Ql = null, xf = 0, Zr = 0, Pr = null;
  function oS(t, n) {
    if (Ql === null) {
      var i = Ql = [];
      xf = 0, Zr = Sd(), Pr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return xf++, n.then(Zp, Zp), n;
  }
  function Zp() {
    if (--xf === 0 && Ql !== null) {
      Pr !== null && (Pr.status = "fulfilled");
      var t = Ql;
      Ql = null, Zr = 0, Pr = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function sS(t, n) {
    var i = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        i.push(f);
      }
    };
    return t.then(
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
  var Pp = T.S;
  T.S = function(t, n) {
    j0 = Pe(), typeof n == "object" && n !== null && typeof n.then == "function" && oS(t, n), Pp !== null && Pp(t, n);
  };
  var cr = j(null);
  function wf() {
    var t = cr.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function Ms(t, n) {
    n === null ? Q(cr, cr.current) : Q(cr, n.pool);
  }
  function Qp() {
    var t = wf();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Qr = Error(l(460)), _f = Error(l(474)), As = Error(l(542)), Ds = { then: function() {
  } };
  function Kp(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Jp(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Xa, Xa), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, eg(t), t;
      default:
        if (typeof n.status == "string") n.then(Xa, Xa);
        else {
          if (t = Rt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(l(482));
          t = n, t.status = "pending", t.then(
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
            throw t = n.reason, eg(t), t;
        }
        throw dr = n, Qr;
    }
  }
  function fr(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (dr = i, Qr) : i;
    }
  }
  var dr = null;
  function Wp() {
    if (dr === null) throw Error(l(459));
    var t = dr;
    return dr = null, t;
  }
  function eg(t) {
    if (t === Qr || t === As)
      throw Error(l(483));
  }
  var Kr = null, Kl = 0;
  function js(t) {
    var n = Kl;
    return Kl += 1, Kr === null && (Kr = []), Jp(Kr, t, n);
  }
  function Jl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Os(t, n) {
    throw n.$$typeof === b ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function tg(t) {
    function n(J, X) {
      if (t) {
        var ie = J.deletions;
        ie === null ? (J.deletions = [X], J.flags |= 16) : ie.push(X);
      }
    }
    function i(J, X) {
      if (!t) return null;
      for (; X !== null; )
        n(J, X), X = X.sibling;
      return null;
    }
    function o(J) {
      for (var X = /* @__PURE__ */ new Map(); J !== null; )
        J.key !== null ? X.set(J.key, J) : X.set(J.index, J), J = J.sibling;
      return X;
    }
    function f(J, X) {
      return J = Za(J, X), J.index = 0, J.sibling = null, J;
    }
    function m(J, X, ie) {
      return J.index = ie, t ? (ie = J.alternate, ie !== null ? (ie = ie.index, ie < X ? (J.flags |= 67108866, X) : ie) : (J.flags |= 67108866, X)) : (J.flags |= 1048576, X);
    }
    function w(J) {
      return t && J.alternate === null && (J.flags |= 67108866), J;
    }
    function M(J, X, ie, de) {
      return X === null || X.tag !== 6 ? (X = cf(ie, J.mode, de), X.return = J, X) : (X = f(X, ie), X.return = J, X);
    }
    function q(J, X, ie, de) {
      var Oe = ie.type;
      return Oe === R ? fe(
        J,
        X,
        ie.props.children,
        de,
        ie.key
      ) : X !== null && (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && fr(Oe) === X.type) ? (X = f(X, ie.props), Jl(X, ie), X.return = J, X) : (X = Ns(
        ie.type,
        ie.key,
        ie.props,
        null,
        J.mode,
        de
      ), Jl(X, ie), X.return = J, X);
    }
    function re(J, X, ie, de) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ie.containerInfo || X.stateNode.implementation !== ie.implementation ? (X = ff(ie, J.mode, de), X.return = J, X) : (X = f(X, ie.children || []), X.return = J, X);
    }
    function fe(J, X, ie, de, Oe) {
      return X === null || X.tag !== 7 ? (X = lr(
        ie,
        J.mode,
        de,
        Oe
      ), X.return = J, X) : (X = f(X, ie), X.return = J, X);
    }
    function he(J, X, ie) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return X = cf(
          "" + X,
          J.mode,
          ie
        ), X.return = J, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return ie = Ns(
              X.type,
              X.key,
              X.props,
              null,
              J.mode,
              ie
            ), Jl(ie, X), ie.return = J, ie;
          case _:
            return X = ff(
              X,
              J.mode,
              ie
            ), X.return = J, X;
          case A:
            return X = fr(X), he(J, X, ie);
        }
        if (Y(X) || K(X))
          return X = lr(
            X,
            J.mode,
            ie,
            null
          ), X.return = J, X;
        if (typeof X.then == "function")
          return he(J, js(X), ie);
        if (X.$$typeof === E)
          return he(
            J,
            Ts(J, X),
            ie
          );
        Os(J, X);
      }
      return null;
    }
    function le(J, X, ie, de) {
      var Oe = X !== null ? X.key : null;
      if (typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint")
        return Oe !== null ? null : M(J, X, "" + ie, de);
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case x:
            return ie.key === Oe ? q(J, X, ie, de) : null;
          case _:
            return ie.key === Oe ? re(J, X, ie, de) : null;
          case A:
            return ie = fr(ie), le(J, X, ie, de);
        }
        if (Y(ie) || K(ie))
          return Oe !== null ? null : fe(J, X, ie, de, null);
        if (typeof ie.then == "function")
          return le(
            J,
            X,
            js(ie),
            de
          );
        if (ie.$$typeof === E)
          return le(
            J,
            X,
            Ts(J, ie),
            de
          );
        Os(J, ie);
      }
      return null;
    }
    function ue(J, X, ie, de, Oe) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return J = J.get(ie) || null, M(X, J, "" + de, Oe);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case x:
            return J = J.get(
              de.key === null ? ie : de.key
            ) || null, q(X, J, de, Oe);
          case _:
            return J = J.get(
              de.key === null ? ie : de.key
            ) || null, re(X, J, de, Oe);
          case A:
            return de = fr(de), ue(
              J,
              X,
              ie,
              de,
              Oe
            );
        }
        if (Y(de) || K(de))
          return J = J.get(ie) || null, fe(X, J, de, Oe, null);
        if (typeof de.then == "function")
          return ue(
            J,
            X,
            ie,
            js(de),
            Oe
          );
        if (de.$$typeof === E)
          return ue(
            J,
            X,
            ie,
            Ts(X, de),
            Oe
          );
        Os(X, de);
      }
      return null;
    }
    function Ne(J, X, ie, de) {
      for (var Oe = null, ut = null, Ce = X, Ye = X = 0, tt = null; Ce !== null && Ye < ie.length; Ye++) {
        Ce.index > Ye ? (tt = Ce, Ce = null) : tt = Ce.sibling;
        var ct = le(
          J,
          Ce,
          ie[Ye],
          de
        );
        if (ct === null) {
          Ce === null && (Ce = tt);
          break;
        }
        t && Ce && ct.alternate === null && n(J, Ce), X = m(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ce = tt;
      }
      if (Ye === ie.length)
        return i(J, Ce), it && Pa(J, Ye), Oe;
      if (Ce === null) {
        for (; Ye < ie.length; Ye++)
          Ce = he(J, ie[Ye], de), Ce !== null && (X = m(
            Ce,
            X,
            Ye
          ), ut === null ? Oe = Ce : ut.sibling = Ce, ut = Ce);
        return it && Pa(J, Ye), Oe;
      }
      for (Ce = o(Ce); Ye < ie.length; Ye++)
        tt = ue(
          Ce,
          J,
          Ye,
          ie[Ye],
          de
        ), tt !== null && (t && tt.alternate !== null && Ce.delete(
          tt.key === null ? Ye : tt.key
        ), X = m(
          tt,
          X,
          Ye
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return t && Ce.forEach(function(Yi) {
        return n(J, Yi);
      }), it && Pa(J, Ye), Oe;
    }
    function Le(J, X, ie, de) {
      if (ie == null) throw Error(l(151));
      for (var Oe = null, ut = null, Ce = X, Ye = X = 0, tt = null, ct = ie.next(); Ce !== null && !ct.done; Ye++, ct = ie.next()) {
        Ce.index > Ye ? (tt = Ce, Ce = null) : tt = Ce.sibling;
        var Yi = le(J, Ce, ct.value, de);
        if (Yi === null) {
          Ce === null && (Ce = tt);
          break;
        }
        t && Ce && Yi.alternate === null && n(J, Ce), X = m(Yi, X, Ye), ut === null ? Oe = Yi : ut.sibling = Yi, ut = Yi, Ce = tt;
      }
      if (ct.done)
        return i(J, Ce), it && Pa(J, Ye), Oe;
      if (Ce === null) {
        for (; !ct.done; Ye++, ct = ie.next())
          ct = he(J, ct.value, de), ct !== null && (X = m(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && Pa(J, Ye), Oe;
      }
      for (Ce = o(Ce); !ct.done; Ye++, ct = ie.next())
        ct = ue(Ce, J, Ye, ct.value, de), ct !== null && (t && ct.alternate !== null && Ce.delete(ct.key === null ? Ye : ct.key), X = m(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return t && Ce.forEach(function(bE) {
        return n(J, bE);
      }), it && Pa(J, Ye), Oe;
    }
    function Nt(J, X, ie, de) {
      if (typeof ie == "object" && ie !== null && ie.type === R && ie.key === null && (ie = ie.props.children), typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case x:
            e: {
              for (var Oe = ie.key; X !== null; ) {
                if (X.key === Oe) {
                  if (Oe = ie.type, Oe === R) {
                    if (X.tag === 7) {
                      i(
                        J,
                        X.sibling
                      ), de = f(
                        X,
                        ie.props.children
                      ), de.return = J, J = de;
                      break e;
                    }
                  } else if (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && fr(Oe) === X.type) {
                    i(
                      J,
                      X.sibling
                    ), de = f(X, ie.props), Jl(de, ie), de.return = J, J = de;
                    break e;
                  }
                  i(J, X);
                  break;
                } else n(J, X);
                X = X.sibling;
              }
              ie.type === R ? (de = lr(
                ie.props.children,
                J.mode,
                de,
                ie.key
              ), de.return = J, J = de) : (de = Ns(
                ie.type,
                ie.key,
                ie.props,
                null,
                J.mode,
                de
              ), Jl(de, ie), de.return = J, J = de);
            }
            return w(J);
          case _:
            e: {
              for (Oe = ie.key; X !== null; ) {
                if (X.key === Oe)
                  if (X.tag === 4 && X.stateNode.containerInfo === ie.containerInfo && X.stateNode.implementation === ie.implementation) {
                    i(
                      J,
                      X.sibling
                    ), de = f(X, ie.children || []), de.return = J, J = de;
                    break e;
                  } else {
                    i(J, X);
                    break;
                  }
                else n(J, X);
                X = X.sibling;
              }
              de = ff(ie, J.mode, de), de.return = J, J = de;
            }
            return w(J);
          case A:
            return ie = fr(ie), Nt(
              J,
              X,
              ie,
              de
            );
        }
        if (Y(ie))
          return Ne(
            J,
            X,
            ie,
            de
          );
        if (K(ie)) {
          if (Oe = K(ie), typeof Oe != "function") throw Error(l(150));
          return ie = Oe.call(ie), Le(
            J,
            X,
            ie,
            de
          );
        }
        if (typeof ie.then == "function")
          return Nt(
            J,
            X,
            js(ie),
            de
          );
        if (ie.$$typeof === E)
          return Nt(
            J,
            X,
            Ts(J, ie),
            de
          );
        Os(J, ie);
      }
      return typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint" ? (ie = "" + ie, X !== null && X.tag === 6 ? (i(J, X.sibling), de = f(X, ie), de.return = J, J = de) : (i(J, X), de = cf(ie, J.mode, de), de.return = J, J = de), w(J)) : i(J, X);
    }
    return function(J, X, ie, de) {
      try {
        Kl = 0;
        var Oe = Nt(
          J,
          X,
          ie,
          de
        );
        return Kr = null, Oe;
      } catch (Ce) {
        if (Ce === Qr || Ce === As) throw Ce;
        var ut = Vn(29, Ce, null, J.mode);
        return ut.lanes = de, ut.return = J, ut;
      } finally {
      }
    };
  }
  var hr = tg(!0), ng = tg(!1), Ri = !1;
  function Sf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ef(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ti(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Mi(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = Es(t), Up(t, null, i), n;
    }
    return Ss(t, o, n, i), Es(t);
  }
  function Wl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  function Nf(t, n) {
    var i = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var f = null, m = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var w = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          m === null ? f = m = w : m = m.next = w, i = i.next;
        } while (i !== null);
        m === null ? f = m = n : m = m.next = n;
      } else f = m = n;
      i = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: m,
        shared: o.shared,
        callbacks: o.callbacks
      }, t.updateQueue = i;
      return;
    }
    t = i.lastBaseUpdate, t === null ? i.firstBaseUpdate = n : t.next = n, i.lastBaseUpdate = n;
  }
  var Cf = !1;
  function eo() {
    if (Cf) {
      var t = Pr;
      if (t !== null) throw t;
    }
  }
  function to(t, n, i, o) {
    Cf = !1;
    var f = t.updateQueue;
    Ri = !1;
    var m = f.firstBaseUpdate, w = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var q = M, re = q.next;
      q.next = null, w === null ? m = re : w.next = re, w = q;
      var fe = t.alternate;
      fe !== null && (fe = fe.updateQueue, M = fe.lastBaseUpdate, M !== w && (M === null ? fe.firstBaseUpdate = re : M.next = re, fe.lastBaseUpdate = q));
    }
    if (m !== null) {
      var he = f.baseState;
      w = 0, fe = re = q = null, M = m;
      do {
        var le = M.lane & -536870913, ue = le !== M.lane;
        if (ue ? (et & le) === le : (o & le) === le) {
          le !== 0 && le === Zr && (Cf = !0), fe !== null && (fe = fe.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var Ne = t, Le = M;
            le = n;
            var Nt = i;
            switch (Le.tag) {
              case 1:
                if (Ne = Le.payload, typeof Ne == "function") {
                  he = Ne.call(Nt, he, le);
                  break e;
                }
                he = Ne;
                break e;
              case 3:
                Ne.flags = Ne.flags & -65537 | 128;
              case 0:
                if (Ne = Le.payload, le = typeof Ne == "function" ? Ne.call(Nt, he, le) : Ne, le == null) break e;
                he = g({}, he, le);
                break e;
              case 2:
                Ri = !0;
            }
          }
          le = M.callback, le !== null && (t.flags |= 64, ue && (t.flags |= 8192), ue = f.callbacks, ue === null ? f.callbacks = [le] : ue.push(le));
        } else
          ue = {
            lane: le,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, fe === null ? (re = fe = ue, q = he) : fe = fe.next = ue, w |= le;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          ue = M, M = ue.next, ue.next = null, f.lastBaseUpdate = ue, f.shared.pending = null;
        }
      } while (!0);
      fe === null && (q = he), f.baseState = q, f.firstBaseUpdate = re, f.lastBaseUpdate = fe, m === null && (f.shared.lanes = 0), zi |= w, t.lanes = w, t.memoizedState = he;
    }
  }
  function ag(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function ig(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        ag(i[t], n);
  }
  var Jr = j(null), zs = j(0);
  function rg(t, n) {
    t = li, Q(zs, t), Q(Jr, n), li = t | n.baseLanes;
  }
  function Rf() {
    Q(zs, li), Q(Jr, Jr.current);
  }
  function Tf() {
    li = zs.current, U(Jr), U(zs);
  }
  var qn = j(null), aa = null;
  function Ai(t) {
    var n = t.alternate;
    Q(qt, qt.current & 1), Q(qn, t), aa === null && (n === null || Jr.current !== null || n.memoizedState !== null) && (aa = t);
  }
  function Mf(t) {
    Q(qt, qt.current), Q(qn, t), aa === null && (aa = t);
  }
  function lg(t) {
    t.tag === 22 ? (Q(qt, qt.current), Q(qn, t), aa === null && (aa = t)) : Di();
  }
  function Di() {
    Q(qt, qt.current), Q(qn, qn.current);
  }
  function $n(t) {
    U(qn), aa === t && (aa = null), U(qt);
  }
  var qt = j(0);
  function Ls(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Ld(i) || kd(i)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Ja = 0, qe = null, St = null, Xt = null, ks = !1, Wr = !1, mr = !1, Hs = 0, no = 0, el = null, uS = 0;
  function Ht() {
    throw Error(l(321));
  }
  function Af(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Un(t[i], n[i])) return !1;
    return !0;
  }
  function Df(t, n, i, o, f, m) {
    return Ja = m, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, T.H = t === null || t.memoizedState === null ? Ig : Xf, mr = !1, m = i(o, f), mr = !1, Wr && (m = sg(
      n,
      i,
      o,
      f
    )), og(t), m;
  }
  function og(t) {
    T.H = ro;
    var n = St !== null && St.next !== null;
    if (Ja = 0, Xt = St = qe = null, ks = !1, no = 0, el = null, n) throw Error(l(300));
    t === null || Ft || (t = t.dependencies, t !== null && Rs(t) && (Ft = !0));
  }
  function sg(t, n, i, o) {
    qe = t;
    var f = 0;
    do {
      if (Wr && (el = null), no = 0, Wr = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Xt = St = null, t.updateQueue != null) {
        var m = t.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      T.H = Yg, m = n(i, o);
    } while (Wr);
    return m;
  }
  function cS() {
    var t = T.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? ao(n) : n, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (qe.flags |= 1024), n;
  }
  function jf() {
    var t = Hs !== 0;
    return Hs = 0, t;
  }
  function Of(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function zf(t) {
    if (ks) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      ks = !1;
    }
    Ja = 0, Xt = St = qe = null, Wr = !1, no = Hs = 0, el = null;
  }
  function yn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Xt === null ? qe.memoizedState = Xt = t : Xt = Xt.next = t, Xt;
  }
  function $t() {
    if (St === null) {
      var t = qe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var n = Xt === null ? qe.memoizedState : Xt.next;
    if (n !== null)
      Xt = n, St = t;
    else {
      if (t === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, Xt === null ? qe.memoizedState = Xt = t : Xt = Xt.next = t;
    }
    return Xt;
  }
  function Bs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ao(t) {
    var n = no;
    return no += 1, el === null && (el = []), t = Jp(el, t, n), n = qe, (Xt === null ? n.memoizedState : Xt.next) === null && (n = n.alternate, T.H = n === null || n.memoizedState === null ? Ig : Xf), t;
  }
  function Us(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ao(t);
      if (t.$$typeof === E) return on(t);
    }
    throw Error(l(438, String(t)));
  }
  function Lf(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = Bs(), qe.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = ne;
    return n.index++, i;
  }
  function Wa(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Vs(t) {
    var n = $t();
    return kf(n, St, t);
  }
  function kf(t, n, i) {
    var o = t.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = i;
    var f = t.baseQueue, m = o.pending;
    if (m !== null) {
      if (f !== null) {
        var w = f.next;
        f.next = m.next, m.next = w;
      }
      n.baseQueue = f = m, o.pending = null;
    }
    if (m = t.baseState, f === null) t.memoizedState = m;
    else {
      n = f.next;
      var M = w = null, q = null, re = n, fe = !1;
      do {
        var he = re.lane & -536870913;
        if (he !== re.lane ? (et & he) === he : (Ja & he) === he) {
          var le = re.revertLane;
          if (le === 0)
            q !== null && (q = q.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }), he === Zr && (fe = !0);
          else if ((Ja & le) === le) {
            re = re.next, le === Zr && (fe = !0);
            continue;
          } else
            he = {
              lane: 0,
              revertLane: re.revertLane,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }, q === null ? (M = q = he, w = m) : q = q.next = he, qe.lanes |= le, zi |= le;
          he = re.action, mr && i(m, he), m = re.hasEagerState ? re.eagerState : i(m, he);
        } else
          le = {
            lane: he,
            revertLane: re.revertLane,
            gesture: re.gesture,
            action: re.action,
            hasEagerState: re.hasEagerState,
            eagerState: re.eagerState,
            next: null
          }, q === null ? (M = q = le, w = m) : q = q.next = le, qe.lanes |= he, zi |= he;
        re = re.next;
      } while (re !== null && re !== n);
      if (q === null ? w = m : q.next = M, !Un(m, t.memoizedState) && (Ft = !0, fe && (i = Pr, i !== null)))
        throw i;
      t.memoizedState = m, t.baseState = w, t.baseQueue = q, o.lastRenderedState = m;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Hf(t) {
    var n = $t(), i = n.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, f = i.pending, m = n.memoizedState;
    if (f !== null) {
      i.pending = null;
      var w = f = f.next;
      do
        m = t(m, w.action), w = w.next;
      while (w !== f);
      Un(m, n.memoizedState) || (Ft = !0), n.memoizedState = m, n.baseQueue === null && (n.baseState = m), i.lastRenderedState = m;
    }
    return [m, o];
  }
  function ug(t, n, i) {
    var o = qe, f = $t(), m = it;
    if (m) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var w = !Un(
      (St || f).memoizedState,
      i
    );
    if (w && (f.memoizedState = i, Ft = !0), f = f.queue, Vf(dg.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || w || Xt !== null && Xt.memoizedState.tag & 1) {
      if (o.flags |= 2048, tl(
        9,
        { destroy: void 0 },
        fg.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      m || (Ja & 127) !== 0 || cg(o, n, i);
    }
    return i;
  }
  function cg(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = Bs(), qe.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function fg(t, n, i, o) {
    n.value = i, n.getSnapshot = o, hg(n) && mg(t);
  }
  function dg(t, n, i) {
    return i(function() {
      hg(n) && mg(t);
    });
  }
  function hg(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Un(t, i);
    } catch {
      return !0;
    }
  }
  function mg(t) {
    var n = rr(t, 2);
    n !== null && Dn(n, t, 2);
  }
  function Bf(t) {
    var n = yn();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), mr) {
        Ot(!0);
        try {
          i();
        } finally {
          Ot(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wa,
      lastRenderedState: t
    }, n;
  }
  function pg(t, n, i, o) {
    return t.baseState = i, kf(
      t,
      St,
      typeof o == "function" ? o : Wa
    );
  }
  function fS(t, n, i, o, f) {
    if (Is(t)) throw Error(l(485));
    if (t = n.action, t !== null) {
      var m = {
        payload: f,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(w) {
          m.listeners.push(w);
        }
      };
      T.T !== null ? i(!0) : m.isTransition = !1, o(m), i = n.pending, i === null ? (m.next = n.pending = m, gg(n, m)) : (m.next = i.next, n.pending = i.next = m);
    }
  }
  function gg(t, n) {
    var i = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var m = T.T, w = {};
      T.T = w;
      try {
        var M = i(f, o), q = T.S;
        q !== null && q(w, M), vg(t, n, M);
      } catch (re) {
        Uf(t, n, re);
      } finally {
        m !== null && w.types !== null && (m.types = w.types), T.T = m;
      }
    } else
      try {
        m = i(f, o), vg(t, n, m);
      } catch (re) {
        Uf(t, n, re);
      }
  }
  function vg(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        yg(t, n, o);
      },
      function(o) {
        return Uf(t, n, o);
      }
    ) : yg(t, n, i);
  }
  function yg(t, n, i) {
    n.status = "fulfilled", n.value = i, bg(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, gg(t, i)));
  }
  function Uf(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, bg(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function bg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function xg(t, n) {
    return n;
  }
  function wg(t, n) {
    if (it) {
      var i = Rt.formState;
      if (i !== null) {
        e: {
          var o = qe;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, m = na; f.nodeType !== 8; ) {
                  if (!m) {
                    f = null;
                    break t;
                  }
                  if (f = ia(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                m = f.data, f = m === "F!" || m === "F" ? f : null;
              }
              if (f) {
                Tt = ia(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            Ni(o);
          }
          o = !1;
        }
        o && (n = i[0]);
      }
    }
    return i = yn(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xg,
      lastRenderedState: n
    }, i.queue = o, i = Vg.bind(
      null,
      qe,
      o
    ), o.dispatch = i, o = Bf(!1), m = Gf.bind(
      null,
      qe,
      !1,
      o.queue
    ), o = yn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, i = fS.bind(
      null,
      qe,
      f,
      m,
      i
    ), f.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function _g(t) {
    var n = $t();
    return Sg(n, St, t);
  }
  function Sg(t, n, i) {
    if (n = kf(
      t,
      n,
      xg
    )[0], t = Vs(Wa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = ao(n);
      } catch (w) {
        throw w === Qr ? As : w;
      }
    else o = n;
    n = $t();
    var f = n.queue, m = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, tl(
      9,
      { destroy: void 0 },
      dS.bind(null, f, i),
      null
    )), [o, m, t];
  }
  function dS(t, n) {
    t.action = n;
  }
  function Eg(t) {
    var n = $t(), i = St;
    if (i !== null)
      return Sg(n, i, t);
    $t(), n = n.memoizedState, i = $t();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function tl(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = Bs(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Ng() {
    return $t().memoizedState;
  }
  function qs(t, n, i, o) {
    var f = yn();
    qe.flags |= t, f.memoizedState = tl(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function $s(t, n, i, o) {
    var f = $t();
    o = o === void 0 ? null : o;
    var m = f.memoizedState.inst;
    St !== null && o !== null && Af(o, St.memoizedState.deps) ? f.memoizedState = tl(n, m, i, o) : (qe.flags |= t, f.memoizedState = tl(
      1 | n,
      m,
      i,
      o
    ));
  }
  function Cg(t, n) {
    qs(8390656, 8, t, n);
  }
  function Vf(t, n) {
    $s(2048, 8, t, n);
  }
  function hS(t) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = Bs(), qe.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Rg(t) {
    var n = $t().memoizedState;
    return hS({ ref: n, nextImpl: t }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Tg(t, n) {
    return $s(4, 2, t, n);
  }
  function Mg(t, n) {
    return $s(4, 4, t, n);
  }
  function Ag(t, n) {
    if (typeof n == "function") {
      t = t();
      var i = n(t);
      return function() {
        typeof i == "function" ? i() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function Dg(t, n, i) {
    i = i != null ? i.concat([t]) : null, $s(4, 4, Ag.bind(null, n, t), i);
  }
  function qf() {
  }
  function jg(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && Af(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Og(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && Af(n, o[1]))
      return o[0];
    if (o = t(), mr) {
      Ot(!0);
      try {
        t();
      } finally {
        Ot(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function $f(t, n, i) {
    return i === void 0 || (Ja & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = z0(), qe.lanes |= t, zi |= t, i);
  }
  function zg(t, n, i, o) {
    return Un(i, n) ? i : Jr.current !== null ? (t = $f(t, i, o), Un(t, n) || (Ft = !0), t) : (Ja & 42) === 0 || (Ja & 1073741824) !== 0 && (et & 261930) === 0 ? (Ft = !0, t.memoizedState = i) : (t = z0(), qe.lanes |= t, zi |= t, n);
  }
  function Lg(t, n, i, o, f) {
    var m = L.p;
    L.p = m !== 0 && 8 > m ? m : 8;
    var w = T.T, M = {};
    T.T = M, Gf(t, !1, n, i);
    try {
      var q = f(), re = T.S;
      if (re !== null && re(M, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var fe = sS(
          q,
          o
        );
        io(
          t,
          n,
          fe,
          Gn(t)
        );
      } else
        io(
          t,
          n,
          o,
          Gn(t)
        );
    } catch (he) {
      io(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: he },
        Gn()
      );
    } finally {
      L.p = m, w !== null && M.types !== null && (w.types = M.types), T.T = w;
    }
  }
  function mS() {
  }
  function If(t, n, i, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = kg(t).queue;
    Lg(
      t,
      f,
      n,
      F,
      i === null ? mS : function() {
        return Hg(t), i(o);
      }
    );
  }
  function kg(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wa,
        lastRenderedState: F
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
        lastRenderedReducer: Wa,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Hg(t) {
    var n = kg(t);
    n.next === null && (n = t.alternate.memoizedState), io(
      t,
      n.next.queue,
      {},
      Gn()
    );
  }
  function Yf() {
    return on(_o);
  }
  function Bg() {
    return $t().memoizedState;
  }
  function Ug() {
    return $t().memoizedState;
  }
  function pS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Gn();
          t = Ti(i);
          var o = Mi(n, t, i);
          o !== null && (Dn(o, n, i), Wl(o, n, i)), n = { cache: bf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function gS(t, n, i) {
    var o = Gn();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Is(t) ? qg(n, i) : (i = sf(t, n, i, o), i !== null && (Dn(i, t, o), $g(i, n, o)));
  }
  function Vg(t, n, i) {
    var o = Gn();
    io(t, n, i, o);
  }
  function io(t, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Is(t)) qg(n, f);
    else {
      var m = t.alternate;
      if (t.lanes === 0 && (m === null || m.lanes === 0) && (m = n.lastRenderedReducer, m !== null))
        try {
          var w = n.lastRenderedState, M = m(w, i);
          if (f.hasEagerState = !0, f.eagerState = M, Un(M, w))
            return Ss(t, n, f, 0), Rt === null && _s(), !1;
        } catch {
        } finally {
        }
      if (i = sf(t, n, f, o), i !== null)
        return Dn(i, t, o), $g(i, n, o), !0;
    }
    return !1;
  }
  function Gf(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: Sd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Is(t)) {
      if (n) throw Error(l(479));
    } else
      n = sf(
        t,
        i,
        o,
        2
      ), n !== null && Dn(n, t, 2);
  }
  function Is(t) {
    var n = t.alternate;
    return t === qe || n !== null && n === qe;
  }
  function qg(t, n) {
    Wr = ks = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function $g(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  var ro = {
    readContext: on,
    use: Us,
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
  ro.useEffectEvent = Ht;
  var Ig = {
    readContext: on,
    use: Us,
    useCallback: function(t, n) {
      return yn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: on,
    useEffect: Cg,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, qs(
        4194308,
        4,
        Ag.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return qs(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      qs(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = yn();
      n = n === void 0 ? null : n;
      var o = t();
      if (mr) {
        Ot(!0);
        try {
          t();
        } finally {
          Ot(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, i) {
      var o = yn();
      if (i !== void 0) {
        var f = i(n);
        if (mr) {
          Ot(!0);
          try {
            i(n);
          } finally {
            Ot(!1);
          }
        }
      } else f = n;
      return o.memoizedState = o.baseState = f, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: f
      }, o.queue = t, t = t.dispatch = gS.bind(
        null,
        qe,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = yn();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Bf(t);
      var n = t.queue, i = Vg.bind(null, qe, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: qf,
    useDeferredValue: function(t, n) {
      var i = yn();
      return $f(i, t, n);
    },
    useTransition: function() {
      var t = Bf(!1);
      return t = Lg.bind(
        null,
        qe,
        t.queue,
        !0,
        !1
      ), yn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = qe, f = yn();
      if (it) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = n(), Rt === null)
          throw Error(l(349));
        (et & 127) !== 0 || cg(o, n, i);
      }
      f.memoizedState = i;
      var m = { value: i, getSnapshot: n };
      return f.queue = m, Cg(dg.bind(null, o, m, t), [
        t
      ]), o.flags |= 2048, tl(
        9,
        { destroy: void 0 },
        fg.bind(
          null,
          o,
          m,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var t = yn(), n = Rt.identifierPrefix;
      if (it) {
        var i = Aa, o = Ma;
        i = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Hs++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = uS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Yf,
    useFormState: wg,
    useActionState: wg,
    useOptimistic: function(t) {
      var n = yn();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = Gf.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Lf,
    useCacheRefresh: function() {
      return yn().memoizedState = pS.bind(
        null,
        qe
      );
    },
    useEffectEvent: function(t) {
      var n = yn(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((ht & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Xf = {
    readContext: on,
    use: Us,
    useCallback: jg,
    useContext: on,
    useEffect: Vf,
    useImperativeHandle: Dg,
    useInsertionEffect: Tg,
    useLayoutEffect: Mg,
    useMemo: Og,
    useReducer: Vs,
    useRef: Ng,
    useState: function() {
      return Vs(Wa);
    },
    useDebugValue: qf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return zg(
        i,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Vs(Wa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : ao(t),
        n
      ];
    },
    useSyncExternalStore: ug,
    useId: Bg,
    useHostTransitionStatus: Yf,
    useFormState: _g,
    useActionState: _g,
    useOptimistic: function(t, n) {
      var i = $t();
      return pg(i, St, t, n);
    },
    useMemoCache: Lf,
    useCacheRefresh: Ug
  };
  Xf.useEffectEvent = Rg;
  var Yg = {
    readContext: on,
    use: Us,
    useCallback: jg,
    useContext: on,
    useEffect: Vf,
    useImperativeHandle: Dg,
    useInsertionEffect: Tg,
    useLayoutEffect: Mg,
    useMemo: Og,
    useReducer: Hf,
    useRef: Ng,
    useState: function() {
      return Hf(Wa);
    },
    useDebugValue: qf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return St === null ? $f(i, t, n) : zg(
        i,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Hf(Wa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : ao(t),
        n
      ];
    },
    useSyncExternalStore: ug,
    useId: Bg,
    useHostTransitionStatus: Yf,
    useFormState: Eg,
    useActionState: Eg,
    useOptimistic: function(t, n) {
      var i = $t();
      return St !== null ? pg(i, St, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Lf,
    useCacheRefresh: Ug
  };
  Yg.useEffectEvent = Rg;
  function Ff(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : g({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var Zf = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Gn(), f = Ti(o);
      f.payload = n, i != null && (f.callback = i), n = Mi(t, f, o), n !== null && (Dn(n, t, o), Wl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Gn(), f = Ti(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Mi(t, f, o), n !== null && (Dn(n, t, o), Wl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Gn(), o = Ti(i);
      o.tag = 2, n != null && (o.callback = n), n = Mi(t, o, i), n !== null && (Dn(n, t, i), Wl(n, t, i));
    }
  };
  function Gg(t, n, i, o, f, m, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, m, w) : n.prototype && n.prototype.isPureReactComponent ? !Gl(i, o) || !Gl(f, m) : !0;
  }
  function Xg(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && Zf.enqueueReplaceState(n, n.state, null);
  }
  function pr(t, n) {
    var i = n;
    if ("ref" in n) {
      i = {};
      for (var o in n)
        o !== "ref" && (i[o] = n[o]);
    }
    if (t = t.defaultProps) {
      i === n && (i = g({}, i));
      for (var f in t)
        i[f] === void 0 && (i[f] = t[f]);
    }
    return i;
  }
  function Fg(t) {
    ws(t);
  }
  function Zg(t) {
    console.error(t);
  }
  function Pg(t) {
    ws(t);
  }
  function Ys(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Qg(t, n, i) {
    try {
      var o = t.onCaughtError;
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
  function Pf(t, n, i) {
    return i = Ti(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Ys(t, n);
    }, i;
  }
  function Kg(t) {
    return t = Ti(t), t.tag = 3, t;
  }
  function Jg(t, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var m = o.value;
      t.payload = function() {
        return f(m);
      }, t.callback = function() {
        Qg(n, i, o);
      };
    }
    var w = i.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      Qg(n, i, o), typeof f != "function" && (Li === null ? Li = /* @__PURE__ */ new Set([this]) : Li.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function vS(t, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && Fr(
        n,
        i,
        f,
        !0
      ), i = qn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return aa === null ? nu() : i.alternate === null && Bt === 0 && (Bt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === Ds ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), xd(t, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === Ds ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), xd(t, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return xd(t, o, f), nu(), !1;
    }
    if (it)
      return n = qn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== mf && (t = Error(l(422), { cause: o }), Zl(Wn(t, i)))) : (o !== mf && (n = Error(l(423), {
        cause: o
      }), Zl(
        Wn(n, i)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Wn(o, i), f = Pf(
        t.stateNode,
        o,
        f
      ), Nf(t, f), Bt !== 4 && (Bt = 2)), !1;
    var m = Error(l(520), { cause: o });
    if (m = Wn(m, i), mo === null ? mo = [m] : mo.push(m), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Wn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = f & -f, i.lanes |= t, t = Pf(i.stateNode, o, t), Nf(i, t), !1;
        case 1:
          if (n = i.type, m = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (Li === null || !Li.has(m))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = Kg(f), Jg(
              f,
              t,
              i,
              o
            ), Nf(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Qf = Error(l(461)), Ft = !1;
  function sn(t, n, i, o) {
    n.child = t === null ? ng(n, null, i, o) : hr(
      n,
      t.child,
      i,
      o
    );
  }
  function Wg(t, n, i, o, f) {
    i = i.render;
    var m = n.ref;
    if ("ref" in o) {
      var w = {};
      for (var M in o)
        M !== "ref" && (w[M] = o[M]);
    } else w = o;
    return ur(n), o = Df(
      t,
      n,
      i,
      w,
      m,
      f
    ), M = jf(), t !== null && !Ft ? (Of(t, n, f), ei(t, n, f)) : (it && M && df(n), n.flags |= 1, sn(t, n, o, f), n.child);
  }
  function e0(t, n, i, o, f) {
    if (t === null) {
      var m = i.type;
      return typeof m == "function" && !uf(m) && m.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = m, t0(
        t,
        n,
        m,
        o,
        f
      )) : (t = Ns(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (m = t.child, !id(t, f)) {
      var w = m.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Gl, i(w, o) && t.ref === n.ref)
        return ei(t, n, f);
    }
    return n.flags |= 1, t = Za(m, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function t0(t, n, i, o, f) {
    if (t !== null) {
      var m = t.memoizedProps;
      if (Gl(m, o) && t.ref === n.ref)
        if (Ft = !1, n.pendingProps = o = m, id(t, f))
          (t.flags & 131072) !== 0 && (Ft = !0);
        else
          return n.lanes = t.lanes, ei(t, n, f);
    }
    return Kf(
      t,
      n,
      i,
      o,
      f
    );
  }
  function n0(t, n, i, o) {
    var f = o.children, m = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (m = m !== null ? m.baseLanes | i : i, t !== null) {
          for (o = n.child = t.child, f = 0; o !== null; )
            f = f | o.lanes | o.childLanes, o = o.sibling;
          o = f & ~m;
        } else o = 0, n.child = null;
        return a0(
          t,
          n,
          m,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ms(
          n,
          m !== null ? m.cachePool : null
        ), m !== null ? rg(n, m) : Rf(), lg(n);
      else
        return o = n.lanes = 536870912, a0(
          t,
          n,
          m !== null ? m.baseLanes | i : i,
          i,
          o
        );
    } else
      m !== null ? (Ms(n, m.cachePool), rg(n, m), Di(), n.memoizedState = null) : (t !== null && Ms(n, null), Rf(), Di());
    return sn(t, n, f, i), n.child;
  }
  function lo(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function a0(t, n, i, o, f) {
    var m = wf();
    return m = m === null ? null : { parent: Gt._currentValue, pool: m }, n.memoizedState = {
      baseLanes: i,
      cachePool: m
    }, t !== null && Ms(n, null), Rf(), lg(n), t !== null && Fr(t, n, o, !0), n.childLanes = f, null;
  }
  function Gs(t, n) {
    return n = Fs(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function i0(t, n, i) {
    return hr(n, t.child, null, i), t = Gs(n, n.pendingProps), t.flags |= 2, $n(n), n.memoizedState = null, t;
  }
  function yS(t, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = Gs(n, o), n.lanes = 536870912, lo(null, t);
        if (Mf(n), (t = Tt) ? (t = gv(
          t,
          na
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Si !== null ? { id: Ma, overflow: Aa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = qp(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ni(n);
        return n.lanes = 536870912, null;
      }
      return Gs(n, o);
    }
    var m = t.memoizedState;
    if (m !== null) {
      var w = m.dehydrated;
      if (Mf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = i0(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ft || Fr(t, n, i, !1), f = (i & t.childLanes) !== 0, Ft || f) {
        if (o = Rt, o !== null && (w = B(o, i), w !== 0 && w !== m.retryLane))
          throw m.retryLane = w, rr(t, w), Dn(o, t, w), Qf;
        nu(), n = i0(
          t,
          n,
          i
        );
      } else
        t = m.treeContext, Tt = ia(w.nextSibling), ln = n, it = !0, Ei = null, na = !1, t !== null && Yp(n, t), n = Gs(n, o), n.flags |= 4096;
      return n;
    }
    return t = Za(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Xs(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Kf(t, n, i, o, f) {
    return ur(n), i = Df(
      t,
      n,
      i,
      o,
      void 0,
      f
    ), o = jf(), t !== null && !Ft ? (Of(t, n, f), ei(t, n, f)) : (it && o && df(n), n.flags |= 1, sn(t, n, i, f), n.child);
  }
  function r0(t, n, i, o, f, m) {
    return ur(n), n.updateQueue = null, i = sg(
      n,
      o,
      i,
      f
    ), og(t), o = jf(), t !== null && !Ft ? (Of(t, n, m), ei(t, n, m)) : (it && o && df(n), n.flags |= 1, sn(t, n, i, m), n.child);
  }
  function l0(t, n, i, o, f) {
    if (ur(n), n.stateNode === null) {
      var m = Ir, w = i.contextType;
      typeof w == "object" && w !== null && (m = on(w)), m = new i(o, m), n.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = Zf, n.stateNode = m, m._reactInternals = n, m = n.stateNode, m.props = o, m.state = n.memoizedState, m.refs = {}, Sf(n), w = i.contextType, m.context = typeof w == "object" && w !== null ? on(w) : Ir, m.state = n.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (Ff(
        n,
        i,
        w,
        o
      ), m.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (w = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), w !== m.state && Zf.enqueueReplaceState(m, m.state, null), to(n, o, m, f), eo(), m.state = n.memoizedState), typeof m.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      m = n.stateNode;
      var M = n.memoizedProps, q = pr(i, M);
      m.props = q;
      var re = m.context, fe = i.contextType;
      w = Ir, typeof fe == "object" && fe !== null && (w = on(fe));
      var he = i.getDerivedStateFromProps;
      fe = typeof he == "function" || typeof m.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, fe || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (M || re !== w) && Xg(
        n,
        m,
        o,
        w
      ), Ri = !1;
      var le = n.memoizedState;
      m.state = le, to(n, o, m, f), eo(), re = n.memoizedState, M || le !== re || Ri ? (typeof he == "function" && (Ff(
        n,
        i,
        he,
        o
      ), re = n.memoizedState), (q = Ri || Gg(
        n,
        i,
        q,
        o,
        le,
        re,
        w
      )) ? (fe || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = re), m.props = o, m.state = re, m.context = w, o = q) : (typeof m.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      m = n.stateNode, Ef(t, n), w = n.memoizedProps, fe = pr(i, w), m.props = fe, he = n.pendingProps, le = m.context, re = i.contextType, q = Ir, typeof re == "object" && re !== null && (q = on(re)), M = i.getDerivedStateFromProps, (re = typeof M == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (w !== he || le !== q) && Xg(
        n,
        m,
        o,
        q
      ), Ri = !1, le = n.memoizedState, m.state = le, to(n, o, m, f), eo();
      var ue = n.memoizedState;
      w !== he || le !== ue || Ri || t !== null && t.dependencies !== null && Rs(t.dependencies) ? (typeof M == "function" && (Ff(
        n,
        i,
        M,
        o
      ), ue = n.memoizedState), (fe = Ri || Gg(
        n,
        i,
        fe,
        o,
        le,
        ue,
        q
      ) || t !== null && t.dependencies !== null && Rs(t.dependencies)) ? (re || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, ue, q), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        o,
        ue,
        q
      )), typeof m.componentDidUpdate == "function" && (n.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = ue), m.props = o, m.state = ue, m.context = q, o = fe) : (typeof m.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return m = o, Xs(t, n), o = (n.flags & 128) !== 0, m || o ? (m = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : m.render(), n.flags |= 1, t !== null && o ? (n.child = hr(
      n,
      t.child,
      null,
      f
    ), n.child = hr(
      n,
      null,
      i,
      f
    )) : sn(t, n, i, f), n.memoizedState = m.state, t = n.child) : t = ei(
      t,
      n,
      f
    ), t;
  }
  function o0(t, n, i, o) {
    return or(), n.flags |= 256, sn(t, n, i, o), n.child;
  }
  var Jf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Wf(t) {
    return { baseLanes: t, cachePool: Qp() };
  }
  function ed(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Yn), t;
  }
  function s0(t, n, i) {
    var o = n.pendingProps, f = !1, m = (n.flags & 128) !== 0, w;
    if ((w = m) || (w = t !== null && t.memoizedState === null ? !1 : (qt.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Ai(n) : Di(), (t = Tt) ? (t = gv(
          t,
          na
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Si !== null ? { id: Ma, overflow: Aa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = qp(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ni(n);
        return kd(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (Di(), f = n.mode, M = Fs(
        { mode: "hidden", children: M },
        f
      ), o = lr(
        o,
        f,
        i,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = Wf(i), o.childLanes = ed(
        t,
        w,
        i
      ), n.memoizedState = Jf, lo(null, o)) : (Ai(n), td(n, M));
    }
    var q = t.memoizedState;
    if (q !== null && (M = q.dehydrated, M !== null)) {
      if (m)
        n.flags & 256 ? (Ai(n), n.flags &= -257, n = nd(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (Di(), n.child = t.child, n.flags |= 128, n = null) : (Di(), M = o.fallback, f = n.mode, o = Fs(
          { mode: "visible", children: o.children },
          f
        ), M = lr(
          M,
          f,
          i,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, hr(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = Wf(i), o.childLanes = ed(
          t,
          w,
          i
        ), n.memoizedState = Jf, n = lo(null, o));
      else if (Ai(n), kd(M)) {
        if (w = M.nextSibling && M.nextSibling.dataset, w) var re = w.dgst;
        w = re, o = Error(l(419)), o.stack = "", o.digest = w, Zl({ value: o, source: null, stack: null }), n = nd(
          t,
          n,
          i
        );
      } else if (Ft || Fr(t, n, i, !1), w = (i & t.childLanes) !== 0, Ft || w) {
        if (w = Rt, w !== null && (o = B(w, i), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, rr(t, o), Dn(w, t, o), Qf;
        Ld(M) || nu(), n = nd(
          t,
          n,
          i
        );
      } else
        Ld(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = q.treeContext, Tt = ia(
          M.nextSibling
        ), ln = n, it = !0, Ei = null, na = !1, t !== null && Yp(n, t), n = td(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Di(), M = o.fallback, f = n.mode, q = t.child, re = q.sibling, o = Za(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, re !== null ? M = Za(
      re,
      M
    ) : (M = lr(
      M,
      f,
      i,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, lo(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = Wf(i) : (f = M.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = Qp(), M = {
      baseLanes: M.baseLanes | i,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = ed(
      t,
      w,
      i
    ), n.memoizedState = Jf, lo(t.child, o)) : (Ai(n), i = t.child, t = i.sibling, i = Za(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function td(t, n) {
    return n = Fs(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Fs(t, n) {
    return t = Vn(22, t, null, n), t.lanes = 0, t;
  }
  function nd(t, n, i) {
    return hr(n, t.child, null, i), t = td(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function u0(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), vf(t.return, n, i);
  }
  function ad(t, n, i, o, f, m) {
    var w = t.memoizedState;
    w === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: f,
      treeForkCount: m
    } : (w.isBackwards = n, w.rendering = null, w.renderingStartTime = 0, w.last = o, w.tail = i, w.tailMode = f, w.treeForkCount = m);
  }
  function c0(t, n, i) {
    var o = n.pendingProps, f = o.revealOrder, m = o.tail;
    o = o.children;
    var w = qt.current, M = (w & 2) !== 0;
    if (M ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, Q(qt, w), sn(t, n, o, i), o = it ? Fl : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && u0(t, i, n);
        else if (t.tag === 19)
          u0(t, i, n);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === n) break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n)
            break e;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (f) {
      case "forwards":
        for (i = n.child, f = null; i !== null; )
          t = i.alternate, t !== null && Ls(t) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), ad(
          n,
          !1,
          f,
          i,
          m,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, f = n.child, n.child = null; f !== null; ) {
          if (t = f.alternate, t !== null && Ls(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = i, i = f, f = t;
        }
        ad(
          n,
          !0,
          i,
          null,
          m,
          o
        );
        break;
      case "together":
        ad(
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
  function ei(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), zi |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (Fr(
          t,
          n,
          i,
          !1
        ), (i & n.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && n.child !== t.child)
      throw Error(l(153));
    if (n.child !== null) {
      for (t = n.child, i = Za(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Za(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function id(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Rs(t)));
  }
  function bS(t, n, i) {
    switch (n.tag) {
      case 3:
        P(n, n.stateNode.containerInfo), Ci(n, Gt, t.memoizedState.cache), or();
        break;
      case 27:
      case 5:
        _e(n);
        break;
      case 4:
        P(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ci(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Mf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Ai(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? s0(t, n, i) : (Ai(n), t = ei(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        Ai(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (Fr(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return c0(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Q(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, n0(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ci(n, Gt, t.memoizedState.cache);
    }
    return ei(t, n, i);
  }
  function f0(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Ft = !0;
      else {
        if (!id(t, i) && (n.flags & 128) === 0)
          return Ft = !1, bS(
            t,
            n,
            i
          );
        Ft = (t.flags & 131072) !== 0;
      }
    else
      Ft = !1, it && (n.flags & 1048576) !== 0 && Ip(n, Fl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = fr(n.elementType), n.type = t, typeof t == "function")
            uf(t) ? (o = pr(t, o), n.tag = 1, n = l0(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = Kf(
              null,
              n,
              t,
              o,
              i
            ));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === O) {
                n.tag = 11, n = Wg(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = e0(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              }
            }
            throw n = z(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return Kf(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, f = pr(
          o,
          n.pendingProps
        ), l0(
          t,
          n,
          o,
          f,
          i
        );
      case 3:
        e: {
          if (P(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var m = n.memoizedState;
          f = m.element, Ef(t, n), to(n, o, null, i);
          var w = n.memoizedState;
          if (o = w.cache, Ci(n, Gt, o), o !== m.cache && yf(
            n,
            [Gt],
            i,
            !0
          ), eo(), o = w.element, m.isDehydrated)
            if (m = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = m, n.memoizedState = m, n.flags & 256) {
              n = o0(
                t,
                n,
                o,
                i
              );
              break e;
            } else if (o !== f) {
              f = Wn(
                Error(l(424)),
                n
              ), Zl(f), n = o0(
                t,
                n,
                o,
                i
              );
              break e;
            } else {
              switch (t = n.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Tt = ia(t.firstChild), ln = n, it = !0, Ei = null, na = !0, i = ng(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (or(), o === f) {
              n = ei(
                t,
                n,
                i
              );
              break e;
            }
            sn(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Xs(t, n), t === null ? (i = _v(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, t = n.pendingProps, o = uu(
          ae.current
        ).createElement(i), o[ye] = n, o[we] = t, un(o, i, t), at(o), n.stateNode = o) : n.memoizedState = _v(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return _e(n), t === null && it && (o = n.stateNode = bv(
          n.type,
          n.pendingProps,
          ae.current
        ), ln = n, na = !0, f = Tt, Ui(n.type) ? (Hd = f, Tt = ia(o.firstChild)) : Tt = f), sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), Xs(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Tt) && (o = PS(
          o,
          n.type,
          n.pendingProps,
          na
        ), o !== null ? (n.stateNode = o, ln = n, Tt = ia(o.firstChild), na = !1, f = !0) : f = !1), f || Ni(n)), _e(n), f = n.type, m = n.pendingProps, w = t !== null ? t.memoizedProps : null, o = m.children, jd(f, m) ? o = null : w !== null && jd(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = Df(
          t,
          n,
          cS,
          null,
          null,
          i
        ), _o._currentValue = f), Xs(t, n), sn(t, n, o, i), n.child;
      case 6:
        return t === null && it && ((t = i = Tt) && (i = QS(
          i,
          n.pendingProps,
          na
        ), i !== null ? (n.stateNode = i, ln = n, Tt = null, t = !0) : t = !1), t || Ni(n)), null;
      case 13:
        return s0(t, n, i);
      case 4:
        return P(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = hr(
          n,
          null,
          o,
          i
        ) : sn(t, n, o, i), n.child;
      case 11:
        return Wg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return sn(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, Ci(n, n.type, o.value), sn(t, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, ur(n), f = on(f), o = o(f), n.flags |= 1, sn(t, n, o, i), n.child;
      case 14:
        return e0(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return t0(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return c0(t, n, i);
      case 31:
        return yS(t, n, i);
      case 22:
        return n0(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return ur(n), o = on(Gt), t === null ? (f = wf(), f === null && (f = Rt, m = bf(), f.pooledCache = m, m.refCount++, m !== null && (f.pooledCacheLanes |= i), f = m), n.memoizedState = { parent: o, cache: f }, Sf(n), Ci(n, Gt, f)) : ((t.lanes & i) !== 0 && (Ef(t, n), to(n, null, null, i), eo()), f = t.memoizedState, m = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ci(n, Gt, o)) : (o = m.cache, Ci(n, Gt, o), o !== f.cache && yf(
          n,
          [Gt],
          i,
          !0
        ))), sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function ti(t) {
    t.flags |= 4;
  }
  function rd(t, n, i, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (B0()) t.flags |= 8192;
        else
          throw dr = Ds, _f;
    } else t.flags &= -16777217;
  }
  function d0(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Rv(n))
      if (B0()) t.flags |= 8192;
      else
        throw dr = Ds, _f;
  }
  function Zs(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, rl |= n);
  }
  function oo(t, n) {
    if (!it)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? t.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = t.tail;
          for (var o = null; i !== null; )
            i.alternate !== null && (o = i), i = i.sibling;
          o === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : o.sibling = null;
      }
  }
  function Mt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, i = 0, o = 0;
    if (n)
      for (var f = t.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags & 65011712, o |= f.flags & 65011712, f.return = t, f = f.sibling;
    else
      for (f = t.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags, o |= f.flags, f.return = t, f = f.sibling;
    return t.subtreeFlags |= o, t.childLanes = i, n;
  }
  function xS(t, n, i) {
    var o = n.pendingProps;
    switch (hf(n), n.tag) {
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
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Ka(Gt), me(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Xr(n) ? ti(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, pf())), Mt(n), null;
      case 26:
        var f = n.type, m = n.memoizedState;
        return t === null ? (ti(n), m !== null ? (Mt(n), d0(n, m)) : (Mt(n), rd(
          n,
          f,
          null,
          o,
          i
        ))) : m ? m !== t.memoizedState ? (ti(n), Mt(n), d0(n, m)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && ti(n), Mt(n), rd(
          n,
          f,
          t,
          o,
          i
        )), null;
      case 27:
        if (Te(n), i = ae.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ti(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = ee.current, Xr(n) ? Gp(n) : (t = bv(f, o, i), n.stateNode = t, ti(n));
        }
        return Mt(n), null;
      case 5:
        if (Te(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ti(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (m = ee.current, Xr(n))
            Gp(n);
          else {
            var w = uu(
              ae.current
            );
            switch (m) {
              case 1:
                m = w.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                m = w.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    m = w.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    m = w.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    m = w.createElement("div"), m.innerHTML = "<script><\/script>", m = m.removeChild(
                      m.firstChild
                    );
                    break;
                  case "select":
                    m = typeof o.is == "string" ? w.createElement("select", {
                      is: o.is
                    }) : w.createElement("select"), o.multiple ? m.multiple = !0 : o.size && (m.size = o.size);
                    break;
                  default:
                    m = typeof o.is == "string" ? w.createElement(f, { is: o.is }) : w.createElement(f);
                }
            }
            m[ye] = n, m[we] = o;
            e: for (w = n.child; w !== null; ) {
              if (w.tag === 5 || w.tag === 6)
                m.appendChild(w.stateNode);
              else if (w.tag !== 4 && w.tag !== 27 && w.child !== null) {
                w.child.return = w, w = w.child;
                continue;
              }
              if (w === n) break e;
              for (; w.sibling === null; ) {
                if (w.return === null || w.return === n)
                  break e;
                w = w.return;
              }
              w.sibling.return = w.return, w = w.sibling;
            }
            n.stateNode = m;
            e: switch (un(m, f, o), f) {
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
            o && ti(n);
          }
        }
        return Mt(n), rd(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && ti(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = ae.current, Xr(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, f = ln, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[ye] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || sv(t.nodeValue, i)), t || Ni(n, !0);
          } else
            t = uu(t).createTextNode(
              o
            ), t[ye] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Xr(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[ye] = n;
            } else
              or(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            i = pf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Xr(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ye] = n;
            } else
              or(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = pf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
        }
        return $n(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), m = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (m = o.memoizedState.cachePool.pool), m !== f && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), Zs(n, n.updateQueue), Mt(n), null);
      case 4:
        return me(), t === null && Rd(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Ka(n.type), Mt(n), null;
      case 19:
        if (U(qt), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, m = o.rendering, m === null)
          if (f) oo(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (m = Ls(t), m !== null) {
                  for (n.flags |= 128, oo(o, !1), t = m.updateQueue, n.updateQueue = t, Zs(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Vp(i, t), i = i.sibling;
                  return Q(
                    qt,
                    qt.current & 1 | 2
                  ), it && Pa(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Pe() > Ws && (n.flags |= 128, f = !0, oo(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = Ls(m), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, Zs(n, t), oo(o, !0), o.tail === null && o.tailMode === "hidden" && !m.alternate && !it)
                return Mt(n), null;
            } else
              2 * Pe() - o.renderingStartTime > Ws && i !== 536870912 && (n.flags |= 128, f = !0, oo(o, !1), n.lanes = 4194304);
          o.isBackwards ? (m.sibling = n.child, n.child = m) : (t = o.last, t !== null ? t.sibling = m : n.child = m, o.last = m);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Pe(), t.sibling = null, i = qt.current, Q(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && Pa(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return $n(n), Tf(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && Zs(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && U(cr), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Ka(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function wS(t, n) {
    switch (hf(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Ka(Gt), me(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Te(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($n(n), n.alternate === null)
            throw Error(l(340));
          or();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if ($n(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          or();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return U(qt), null;
      case 4:
        return me(), null;
      case 10:
        return Ka(n.type), null;
      case 22:
      case 23:
        return $n(n), Tf(), t !== null && U(cr), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Ka(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function h0(t, n) {
    switch (hf(n), n.tag) {
      case 3:
        Ka(Gt), me();
        break;
      case 26:
      case 27:
      case 5:
        Te(n);
        break;
      case 4:
        me();
        break;
      case 31:
        n.memoizedState !== null && $n(n);
        break;
      case 13:
        $n(n);
        break;
      case 19:
        U(qt);
        break;
      case 10:
        Ka(n.type);
        break;
      case 22:
      case 23:
        $n(n), Tf(), t !== null && U(cr);
        break;
      case 24:
        Ka(Gt);
    }
  }
  function so(t, n) {
    try {
      var i = n.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        i = f;
        do {
          if ((i.tag & t) === t) {
            o = void 0;
            var m = i.create, w = i.inst;
            o = m(), w.destroy = o;
          }
          i = i.next;
        } while (i !== f);
      }
    } catch (M) {
      wt(n, n.return, M);
    }
  }
  function ji(t, n, i) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var m = f.next;
        o = m;
        do {
          if ((o.tag & t) === t) {
            var w = o.inst, M = w.destroy;
            if (M !== void 0) {
              w.destroy = void 0, f = n;
              var q = i, re = M;
              try {
                re();
              } catch (fe) {
                wt(
                  f,
                  q,
                  fe
                );
              }
            }
          }
          o = o.next;
        } while (o !== m);
      }
    } catch (fe) {
      wt(n, n.return, fe);
    }
  }
  function m0(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        ig(n, i);
      } catch (o) {
        wt(t, t.return, o);
      }
    }
  }
  function p0(t, n, i) {
    i.props = pr(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      wt(t, n, o);
    }
  }
  function uo(t, n) {
    try {
      var i = t.ref;
      if (i !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var o = t.stateNode;
            break;
          case 30:
            o = t.stateNode;
            break;
          default:
            o = t.stateNode;
        }
        typeof i == "function" ? t.refCleanup = i(o) : i.current = o;
      }
    } catch (f) {
      wt(t, n, f);
    }
  }
  function Da(t, n) {
    var i = t.ref, o = t.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          wt(t, n, f);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (f) {
          wt(t, n, f);
        }
      else i.current = null;
  }
  function g0(t) {
    var n = t.type, i = t.memoizedProps, o = t.stateNode;
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
      wt(t, t.return, f);
    }
  }
  function ld(t, n, i) {
    try {
      var o = t.stateNode;
      IS(o, t.type, i, n), o[we] = n;
    } catch (f) {
      wt(t, t.return, f);
    }
  }
  function v0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ui(t.type) || t.tag === 4;
  }
  function od(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || v0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ui(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function sd(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Xa));
    else if (o !== 4 && (o === 27 && Ui(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (sd(t, n, i), t = t.sibling; t !== null; )
        sd(t, n, i), t = t.sibling;
  }
  function Ps(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && Ui(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (Ps(t, n, i), t = t.sibling; t !== null; )
        Ps(t, n, i), t = t.sibling;
  }
  function y0(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      un(n, o, i), n[ye] = t, n[we] = i;
    } catch (m) {
      wt(t, t.return, m);
    }
  }
  var ni = !1, Zt = !1, ud = !1, b0 = typeof WeakSet == "function" ? WeakSet : Set, tn = null;
  function _S(t, n) {
    if (t = t.containerInfo, Ad = gu, t = Dp(t), tf(t)) {
      if ("selectionStart" in t)
        var i = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        e: {
          i = (i = t.ownerDocument) && i.defaultView || window;
          var o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            var f = o.anchorOffset, m = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, m.nodeType;
            } catch {
              i = null;
              break e;
            }
            var w = 0, M = -1, q = -1, re = 0, fe = 0, he = t, le = null;
            t: for (; ; ) {
              for (var ue; he !== i || f !== 0 && he.nodeType !== 3 || (M = w + f), he !== m || o !== 0 && he.nodeType !== 3 || (q = w + o), he.nodeType === 3 && (w += he.nodeValue.length), (ue = he.firstChild) !== null; )
                le = he, he = ue;
              for (; ; ) {
                if (he === t) break t;
                if (le === i && ++re === f && (M = w), le === m && ++fe === o && (q = w), (ue = he.nextSibling) !== null) break;
                he = le, le = he.parentNode;
              }
              he = ue;
            }
            i = M === -1 || q === -1 ? null : { start: M, end: q };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Dd = { focusedElem: t, selectionRange: i }, gu = !1, tn = n; tn !== null; )
      if (n = tn, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, tn = t;
      else
        for (; tn !== null; ) {
          switch (n = tn, m = n.alternate, t = n.flags, n.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = n.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (i = 0; i < t.length; i++)
                  f = t[i], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && m !== null) {
                t = void 0, i = n, f = m.memoizedProps, m = m.memoizedState, o = i.stateNode;
                try {
                  var Ne = pr(
                    i.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    Ne,
                    m
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Le) {
                  wt(
                    i,
                    i.return,
                    Le
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, i = t.nodeType, i === 9)
                  zd(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      zd(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(l(163));
          }
          if (t = n.sibling, t !== null) {
            t.return = n.return, tn = t;
            break;
          }
          tn = n.return;
        }
  }
  function x0(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ii(t, i), o & 4 && so(5, i);
        break;
      case 1:
        if (ii(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (w) {
              wt(i, i.return, w);
            }
          else {
            var f = pr(
              i.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              t.componentDidUpdate(
                f,
                n,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (w) {
              wt(
                i,
                i.return,
                w
              );
            }
          }
        o & 64 && m0(i), o & 512 && uo(i, i.return);
        break;
      case 3:
        if (ii(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            ig(t, n);
          } catch (w) {
            wt(i, i.return, w);
          }
        }
        break;
      case 27:
        n === null && o & 4 && y0(i);
      case 26:
      case 5:
        ii(t, i), n === null && o & 4 && g0(i), o & 512 && uo(i, i.return);
        break;
      case 12:
        ii(t, i);
        break;
      case 31:
        ii(t, i), o & 4 && S0(t, i);
        break;
      case 13:
        ii(t, i), o & 4 && E0(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = DS.bind(
          null,
          i
        ), KS(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || ni, !o) {
          n = n !== null && n.memoizedState !== null || Zt, f = ni;
          var m = Zt;
          ni = o, (Zt = n) && !m ? ri(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ii(t, i), ni = f, Zt = m;
        }
        break;
      case 30:
        break;
      default:
        ii(t, i);
    }
  }
  function w0(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, w0(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && rt(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var At = null, Rn = !1;
  function ai(t, n, i) {
    for (i = i.child; i !== null; )
      _0(t, n, i), i = i.sibling;
  }
  function _0(t, n, i) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(nn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Zt || Da(i, n), ai(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Zt || Da(i, n);
        var o = At, f = Rn;
        Ui(i.type) && (At = i.stateNode, Rn = !1), ai(
          t,
          n,
          i
        ), bo(i.stateNode), At = o, Rn = f;
        break;
      case 5:
        Zt || Da(i, n);
      case 6:
        if (o = At, f = Rn, At = null, ai(
          t,
          n,
          i
        ), At = o, Rn = f, At !== null)
          if (Rn)
            try {
              (At.nodeType === 9 ? At.body : At.nodeName === "HTML" ? At.ownerDocument.body : At).removeChild(i.stateNode);
            } catch (m) {
              wt(
                i,
                n,
                m
              );
            }
          else
            try {
              At.removeChild(i.stateNode);
            } catch (m) {
              wt(
                i,
                n,
                m
              );
            }
        break;
      case 18:
        At !== null && (Rn ? (t = At, mv(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), hl(t)) : mv(At, i.stateNode));
        break;
      case 4:
        o = At, f = Rn, At = i.stateNode.containerInfo, Rn = !0, ai(
          t,
          n,
          i
        ), At = o, Rn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ji(2, i, n), Zt || ji(4, i, n), ai(
          t,
          n,
          i
        );
        break;
      case 1:
        Zt || (Da(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && p0(
          i,
          n,
          o
        )), ai(
          t,
          n,
          i
        );
        break;
      case 21:
        ai(
          t,
          n,
          i
        );
        break;
      case 22:
        Zt = (o = Zt) || i.memoizedState !== null, ai(
          t,
          n,
          i
        ), Zt = o;
        break;
      default:
        ai(
          t,
          n,
          i
        );
    }
  }
  function S0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        hl(t);
      } catch (i) {
        wt(n, n.return, i);
      }
    }
  }
  function E0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        hl(t);
      } catch (i) {
        wt(n, n.return, i);
      }
  }
  function SS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new b0()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new b0()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function Qs(t, n) {
    var i = SS(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = jS.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Tn(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], m = t, w = n, M = w;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Ui(M.type)) {
                At = M.stateNode, Rn = !1;
                break e;
              }
              break;
            case 5:
              At = M.stateNode, Rn = !1;
              break e;
            case 3:
            case 4:
              At = M.stateNode.containerInfo, Rn = !0;
              break e;
          }
          M = M.return;
        }
        if (At === null) throw Error(l(160));
        _0(m, w, f), At = null, Rn = !1, m = f.alternate, m !== null && (m.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        N0(n, t), n = n.sibling;
  }
  var va = null;
  function N0(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, t), Mn(t), o & 4 && (ji(3, t, t.return), so(3, t), ji(5, t, t.return));
        break;
      case 1:
        Tn(n, t), Mn(t), o & 512 && (Zt || i === null || Da(i, i.return)), o & 64 && ni && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = va;
        if (Tn(n, t), Mn(t), o & 512 && (Zt || i === null || Da(i, i.return)), o & 4) {
          var m = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  o = t.type, i = t.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      m = f.getElementsByTagName("title")[0], (!m || m[Ge] || m[ye] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = f.createElement(o), f.head.insertBefore(
                        m,
                        f.querySelector("head > title")
                      )), un(m, o, i), m[ye] = t, at(m), o = m;
                      break e;
                    case "link":
                      var w = Nv(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (w) {
                        for (var M = 0; M < w.length; M++)
                          if (m = w[M], m.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && m.getAttribute("rel") === (i.rel == null ? null : i.rel) && m.getAttribute("title") === (i.title == null ? null : i.title) && m.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      m = f.createElement(o), un(m, o, i), f.head.appendChild(m);
                      break;
                    case "meta":
                      if (w = Nv(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (M = 0; M < w.length; M++)
                          if (m = w[M], m.getAttribute("content") === (i.content == null ? null : "" + i.content) && m.getAttribute("name") === (i.name == null ? null : i.name) && m.getAttribute("property") === (i.property == null ? null : i.property) && m.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && m.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      m = f.createElement(o), un(m, o, i), f.head.appendChild(m);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  m[ye] = t, at(m), o = m;
                }
                t.stateNode = o;
              } else
                Cv(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Ev(
                f,
                o,
                t.memoizedProps
              );
          else
            m !== o ? (m === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : m.count--, o === null ? Cv(
              f,
              t.type,
              t.stateNode
            ) : Ev(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && ld(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, t), Mn(t), o & 512 && (Zt || i === null || Da(i, i.return)), i !== null && o & 4 && ld(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, t), Mn(t), o & 512 && (Zt || i === null || Da(i, i.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            kr(f, "");
          } catch (Ne) {
            wt(t, t.return, Ne);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, ld(
          t,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (ud = !0);
        break;
      case 6:
        if (Tn(n, t), Mn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (Ne) {
            wt(t, t.return, Ne);
          }
        }
        break;
      case 3:
        if (du = null, f = va, va = cu(n.containerInfo), Tn(n, t), va = f, Mn(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            hl(n.containerInfo);
          } catch (Ne) {
            wt(t, t.return, Ne);
          }
        ud && (ud = !1, C0(t));
        break;
      case 4:
        o = va, va = cu(
          t.stateNode.containerInfo
        ), Tn(n, t), Mn(t), va = o;
        break;
      case 12:
        Tn(n, t), Mn(t);
        break;
      case 31:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Qs(t, o)));
        break;
      case 13:
        Tn(n, t), Mn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Js = Pe()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Qs(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var q = i !== null && i.memoizedState !== null, re = ni, fe = Zt;
        if (ni = re || f, Zt = fe || q, Tn(n, t), Zt = fe, ni = re, Mn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || q || ni || Zt || gr(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                q = i = n;
                try {
                  if (m = q.stateNode, f)
                    w = m.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    M = q.stateNode;
                    var he = q.memoizedProps.style, le = he != null && he.hasOwnProperty("display") ? he.display : null;
                    M.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (Ne) {
                  wt(q, q.return, Ne);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                q = n;
                try {
                  q.stateNode.nodeValue = f ? "" : q.memoizedProps;
                } catch (Ne) {
                  wt(q, q.return, Ne);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                q = n;
                try {
                  var ue = q.stateNode;
                  f ? pv(ue, !0) : pv(q.stateNode, !1);
                } catch (Ne) {
                  wt(q, q.return, Ne);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === t) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              i === n && (i = null), n = n.return;
            }
            i === n && (i = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Qs(t, i))));
        break;
      case 19:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Qs(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Tn(n, t), Mn(t);
    }
  }
  function Mn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (v0(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, m = od(t);
            Ps(t, m, f);
            break;
          case 5:
            var w = i.stateNode;
            i.flags & 32 && (kr(w, ""), i.flags &= -33);
            var M = od(t);
            Ps(t, M, w);
            break;
          case 3:
          case 4:
            var q = i.stateNode.containerInfo, re = od(t);
            sd(
              t,
              re,
              q
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (fe) {
        wt(t, t.return, fe);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function C0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        C0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function ii(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        x0(t, n.alternate, n), n = n.sibling;
  }
  function gr(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ji(4, n, n.return), gr(n);
          break;
        case 1:
          Da(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && p0(
            n,
            n.return,
            i
          ), gr(n);
          break;
        case 27:
          bo(n.stateNode);
        case 26:
        case 5:
          Da(n, n.return), gr(n);
          break;
        case 22:
          n.memoizedState === null && gr(n);
          break;
        case 30:
          gr(n);
          break;
        default:
          gr(n);
      }
      t = t.sibling;
    }
  }
  function ri(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, m = n, w = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          ri(
            f,
            m,
            i
          ), so(4, m);
          break;
        case 1:
          if (ri(
            f,
            m,
            i
          ), o = m, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (re) {
              wt(o, o.return, re);
            }
          if (o = m, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var q = f.shared.hiddenCallbacks;
              if (q !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < q.length; f++)
                  ag(q[f], M);
            } catch (re) {
              wt(o, o.return, re);
            }
          }
          i && w & 64 && m0(m), uo(m, m.return);
          break;
        case 27:
          y0(m);
        case 26:
        case 5:
          ri(
            f,
            m,
            i
          ), i && o === null && w & 4 && g0(m), uo(m, m.return);
          break;
        case 12:
          ri(
            f,
            m,
            i
          );
          break;
        case 31:
          ri(
            f,
            m,
            i
          ), i && w & 4 && S0(f, m);
          break;
        case 13:
          ri(
            f,
            m,
            i
          ), i && w & 4 && E0(f, m);
          break;
        case 22:
          m.memoizedState === null && ri(
            f,
            m,
            i
          ), uo(m, m.return);
          break;
        case 30:
          break;
        default:
          ri(
            f,
            m,
            i
          );
      }
      n = n.sibling;
    }
  }
  function cd(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Pl(i));
  }
  function fd(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Pl(t));
  }
  function ya(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        R0(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function R0(t, n, i, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ya(
          t,
          n,
          i,
          o
        ), f & 2048 && so(9, n);
        break;
      case 1:
        ya(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        ya(
          t,
          n,
          i,
          o
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Pl(t)));
        break;
      case 12:
        if (f & 2048) {
          ya(
            t,
            n,
            i,
            o
          ), t = n.stateNode;
          try {
            var m = n.memoizedProps, w = m.id, M = m.onPostCommit;
            typeof M == "function" && M(
              w,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (q) {
            wt(n, n.return, q);
          }
        } else
          ya(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        ya(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        ya(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        m = n.stateNode, w = n.alternate, n.memoizedState !== null ? m._visibility & 2 ? ya(
          t,
          n,
          i,
          o
        ) : co(t, n) : m._visibility & 2 ? ya(
          t,
          n,
          i,
          o
        ) : (m._visibility |= 2, nl(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && cd(w, n);
        break;
      case 24:
        ya(
          t,
          n,
          i,
          o
        ), f & 2048 && fd(n.alternate, n);
        break;
      default:
        ya(
          t,
          n,
          i,
          o
        );
    }
  }
  function nl(t, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var m = t, w = n, M = i, q = o, re = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          nl(
            m,
            w,
            M,
            q,
            f
          ), so(8, w);
          break;
        case 23:
          break;
        case 22:
          var fe = w.stateNode;
          w.memoizedState !== null ? fe._visibility & 2 ? nl(
            m,
            w,
            M,
            q,
            f
          ) : co(
            m,
            w
          ) : (fe._visibility |= 2, nl(
            m,
            w,
            M,
            q,
            f
          )), f && re & 2048 && cd(
            w.alternate,
            w
          );
          break;
        case 24:
          nl(
            m,
            w,
            M,
            q,
            f
          ), f && re & 2048 && fd(w.alternate, w);
          break;
        default:
          nl(
            m,
            w,
            M,
            q,
            f
          );
      }
      n = n.sibling;
    }
  }
  function co(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            co(i, o), f & 2048 && cd(
              o.alternate,
              o
            );
            break;
          case 24:
            co(i, o), f & 2048 && fd(o.alternate, o);
            break;
          default:
            co(i, o);
        }
        n = n.sibling;
      }
  }
  var fo = 8192;
  function al(t, n, i) {
    if (t.subtreeFlags & fo)
      for (t = t.child; t !== null; )
        T0(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function T0(t, n, i) {
    switch (t.tag) {
      case 26:
        al(
          t,
          n,
          i
        ), t.flags & fo && t.memoizedState !== null && uE(
          i,
          va,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        al(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = va;
        va = cu(t.stateNode.containerInfo), al(
          t,
          n,
          i
        ), va = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = fo, fo = 16777216, al(
          t,
          n,
          i
        ), fo = o) : al(
          t,
          n,
          i
        ));
        break;
      default:
        al(
          t,
          n,
          i
        );
    }
  }
  function M0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function ho(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, D0(
            o,
            t
          );
        }
      M0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        A0(t), t = t.sibling;
  }
  function A0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ho(t), t.flags & 2048 && ji(9, t, t.return);
        break;
      case 3:
        ho(t);
        break;
      case 12:
        ho(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, Ks(t)) : ho(t);
        break;
      default:
        ho(t);
    }
  }
  function Ks(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, D0(
            o,
            t
          );
        }
      M0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          ji(8, n, n.return), Ks(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, Ks(n));
          break;
        default:
          Ks(n);
      }
      t = t.sibling;
    }
  }
  function D0(t, n) {
    for (; tn !== null; ) {
      var i = tn;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ji(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Pl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, tn = o;
      else
        e: for (i = t; tn !== null; ) {
          o = tn;
          var f = o.sibling, m = o.return;
          if (w0(o), o === i) {
            tn = null;
            break e;
          }
          if (f !== null) {
            f.return = m, tn = f;
            break e;
          }
          tn = m;
        }
    }
  }
  var ES = {
    getCacheForType: function(t) {
      var n = on(Gt), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return on(Gt).controller.signal;
    }
  }, NS = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Rt = null, Qe = null, et = 0, xt = 0, In = null, Oi = !1, il = !1, dd = !1, li = 0, Bt = 0, zi = 0, vr = 0, hd = 0, Yn = 0, rl = 0, mo = null, An = null, md = !1, Js = 0, j0 = 0, Ws = 1 / 0, eu = null, Li = null, Wt = 0, ki = null, ll = null, oi = 0, pd = 0, gd = null, O0 = null, po = 0, vd = null;
  function Gn() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : T.T !== null ? Sd() : pe();
  }
  function z0() {
    if (Yn === 0)
      if ((et & 536870912) === 0 || it) {
        var t = kn;
        kn <<= 1, (kn & 3932160) === 0 && (kn = 262144), Yn = t;
      } else Yn = 536870912;
    return t = qn.current, t !== null && (t.flags |= 32), Yn;
  }
  function Dn(t, n, i) {
    (t === Rt && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null) && (ol(t, 0), Hi(
      t,
      et,
      Yn,
      !1
    )), pt(t, i), ((ht & 2) === 0 || t !== Rt) && (t === Rt && ((ht & 2) === 0 && (vr |= i), Bt === 4 && Hi(
      t,
      et,
      Yn,
      !1
    )), ja(t));
  }
  function L0(t, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || yt(t, n), f = o ? TS(t, n) : bd(t, n, !0), m = o;
    do {
      if (f === 0) {
        il && !o && Hi(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, m && !CS(i)) {
          f = bd(t, n, !1), m = !1;
          continue;
        }
        if (f === 2) {
          if (m = n, t.errorRecoveryDisabledLanes & m)
            var w = 0;
          else
            w = t.pendingLanes & -536870913, w = w !== 0 ? w : w & 536870912 ? 536870912 : 0;
          if (w !== 0) {
            n = w;
            e: {
              var M = t;
              f = mo;
              var q = M.current.memoizedState.isDehydrated;
              if (q && (ol(M, w).flags |= 256), w = bd(
                M,
                w,
                !1
              ), w !== 2) {
                if (dd && !q) {
                  M.errorRecoveryDisabledLanes |= m, vr |= m, f = 4;
                  break e;
                }
                m = An, An = f, m !== null && (An === null ? An = m : An.push.apply(
                  An,
                  m
                ));
              }
              f = w;
            }
            if (m = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          ol(t, 0), Hi(t, n, 0, !0);
          break;
        }
        e: {
          switch (o = t, m = f, m) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Hi(
                o,
                n,
                Yn,
                !Oi
              );
              break e;
            case 2:
              An = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = Js + 300 - Pe(), 10 < f)) {
            if (Hi(
              o,
              n,
              Yn,
              !Oi
            ), ke(o, 0, !0) !== 0) break e;
            oi = n, o.timeoutHandle = dv(
              k0.bind(
                null,
                o,
                i,
                An,
                eu,
                md,
                n,
                Yn,
                vr,
                rl,
                Oi,
                m,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          k0(
            o,
            i,
            An,
            eu,
            md,
            n,
            Yn,
            vr,
            rl,
            Oi,
            m,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ja(t);
  }
  function k0(t, n, i, o, f, m, w, M, q, re, fe, he, le, ue) {
    if (t.timeoutHandle = -1, he = n.subtreeFlags, he & 8192 || (he & 16785408) === 16785408) {
      he = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Xa
      }, T0(
        n,
        m,
        he
      );
      var Ne = (m & 62914560) === m ? Js - Pe() : (m & 4194048) === m ? j0 - Pe() : 0;
      if (Ne = cE(
        he,
        Ne
      ), Ne !== null) {
        oi = m, t.cancelPendingCommit = Ne(
          Y0.bind(
            null,
            t,
            n,
            m,
            i,
            o,
            f,
            w,
            M,
            q,
            fe,
            he,
            null,
            le,
            ue
          )
        ), Hi(t, m, w, !re);
        return;
      }
    }
    Y0(
      t,
      n,
      m,
      i,
      o,
      f,
      w,
      M,
      q
    );
  }
  function CS(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], m = f.getSnapshot;
          f = f.value;
          try {
            if (!Un(m(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = n.child, n.subtreeFlags & 16384 && i !== null)
        i.return = n, n = i;
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Hi(t, n, i, o) {
    n &= ~hd, n &= ~vr, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var m = 31 - Ut(f), w = 1 << m;
      o[m] = -1, f &= ~w;
    }
    i !== 0 && ha(t, i, n);
  }
  function tu() {
    return (ht & 6) === 0 ? (go(0), !1) : !0;
  }
  function yd() {
    if (Qe !== null) {
      if (xt === 0)
        var t = Qe.return;
      else
        t = Qe, Qa = sr = null, zf(t), Kr = null, Kl = 0, t = Qe;
      for (; t !== null; )
        h0(t.alternate, t), t = t.return;
      Qe = null;
    }
  }
  function ol(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, XS(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), oi = 0, yd(), Rt = t, Qe = i = Za(t.current, null), et = n, xt = 0, In = null, Oi = !1, il = yt(t, n), dd = !1, rl = Yn = hd = vr = zi = Bt = 0, An = mo = null, md = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), m = 1 << f;
        n |= t[f], o &= ~m;
      }
    return li = n, _s(), i;
  }
  function H0(t, n) {
    qe = null, T.H = ro, n === Qr || n === As ? (n = Wp(), xt = 3) : n === _f ? (n = Wp(), xt = 4) : xt = n === Qf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, In = n, Qe === null && (Bt = 1, Ys(
      t,
      Wn(n, t.current)
    ));
  }
  function B0() {
    var t = qn.current;
    return t === null ? !0 : (et & 4194048) === et ? aa === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === aa : !1;
  }
  function U0() {
    var t = T.H;
    return T.H = ro, t === null ? ro : t;
  }
  function V0() {
    var t = T.A;
    return T.A = ES, t;
  }
  function nu() {
    Bt = 4, Oi || (et & 4194048) !== et && qn.current !== null || (il = !0), (zi & 134217727) === 0 && (vr & 134217727) === 0 || Rt === null || Hi(
      Rt,
      et,
      Yn,
      !1
    );
  }
  function bd(t, n, i) {
    var o = ht;
    ht |= 2;
    var f = U0(), m = V0();
    (Rt !== t || et !== n) && (eu = null, ol(t, n)), n = !1;
    var w = Bt;
    e: do
      try {
        if (xt !== 0 && Qe !== null) {
          var M = Qe, q = In;
          switch (xt) {
            case 8:
              yd(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              qn.current === null && (n = !0);
              var re = xt;
              if (xt = 0, In = null, sl(t, M, q, re), i && il) {
                w = 0;
                break e;
              }
              break;
            default:
              re = xt, xt = 0, In = null, sl(t, M, q, re);
          }
        }
        RS(), w = Bt;
        break;
      } catch (fe) {
        H0(t, fe);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Qa = sr = null, ht = o, T.H = f, T.A = m, Qe === null && (Rt = null, et = 0, _s()), w;
  }
  function RS() {
    for (; Qe !== null; ) q0(Qe);
  }
  function TS(t, n) {
    var i = ht;
    ht |= 2;
    var o = U0(), f = V0();
    Rt !== t || et !== n ? (eu = null, Ws = Pe() + 500, ol(t, n)) : il = yt(
      t,
      n
    );
    e: do
      try {
        if (xt !== 0 && Qe !== null) {
          n = Qe;
          var m = In;
          t: switch (xt) {
            case 1:
              xt = 0, In = null, sl(t, n, m, 1);
              break;
            case 2:
            case 9:
              if (Kp(m)) {
                xt = 0, In = null, $0(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Rt !== t || (xt = 7), ja(t);
              }, m.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              Kp(m) ? (xt = 0, In = null, $0(n)) : (xt = 0, In = null, sl(t, n, m, 7));
              break;
            case 5:
              var w = null;
              switch (Qe.tag) {
                case 26:
                  w = Qe.memoizedState;
                case 5:
                case 27:
                  var M = Qe;
                  if (w ? Rv(w) : M.stateNode.complete) {
                    xt = 0, In = null;
                    var q = M.sibling;
                    if (q !== null) Qe = q;
                    else {
                      var re = M.return;
                      re !== null ? (Qe = re, au(re)) : Qe = null;
                    }
                    break t;
                  }
              }
              xt = 0, In = null, sl(t, n, m, 5);
              break;
            case 6:
              xt = 0, In = null, sl(t, n, m, 6);
              break;
            case 8:
              yd(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        MS();
        break;
      } catch (fe) {
        H0(t, fe);
      }
    while (!0);
    return Qa = sr = null, T.H = o, T.A = f, ht = i, Qe !== null ? 0 : (Rt = null, et = 0, _s(), Bt);
  }
  function MS() {
    for (; Qe !== null && !Je(); )
      q0(Qe);
  }
  function q0(t) {
    var n = f0(t.alternate, t, li);
    t.memoizedProps = t.pendingProps, n === null ? au(t) : Qe = n;
  }
  function $0(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = r0(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = r0(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        zf(n);
      default:
        h0(i, n), n = Qe = Vp(n, li), n = f0(i, n, li);
    }
    t.memoizedProps = t.pendingProps, n === null ? au(t) : Qe = n;
  }
  function sl(t, n, i, o) {
    Qa = sr = null, zf(n), Kr = null, Kl = 0;
    var f = n.return;
    try {
      if (vS(
        t,
        f,
        n,
        i,
        et
      )) {
        Bt = 1, Ys(
          t,
          Wn(i, t.current)
        ), Qe = null;
        return;
      }
    } catch (m) {
      if (f !== null) throw Qe = f, m;
      Bt = 1, Ys(
        t,
        Wn(i, t.current)
      ), Qe = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : il || (et & 536870912) !== 0 ? t = !1 : (Oi = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = qn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), I0(n, t)) : au(n);
  }
  function au(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        I0(
          n,
          Oi
        );
        return;
      }
      t = n.return;
      var i = xS(
        n.alternate,
        n,
        li
      );
      if (i !== null) {
        Qe = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Qe = n;
        return;
      }
      Qe = n = t;
    } while (n !== null);
    Bt === 0 && (Bt = 5);
  }
  function I0(t, n) {
    do {
      var i = wS(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, Qe = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        Qe = t;
        return;
      }
      Qe = t = i;
    } while (t !== null);
    Bt = 6, Qe = null;
  }
  function Y0(t, n, i, o, f, m, w, M, q) {
    t.cancelPendingCommit = null;
    do
      iu();
    while (Wt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (m = n.lanes | n.childLanes, m |= of, Jt(
        t,
        i,
        m,
        w,
        M,
        q
      ), t === Rt && (Qe = Rt = null, et = 0), ll = n, ki = t, oi = i, pd = m, gd = f, O0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, OS(Lt, function() {
        return P0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = T.T, T.T = null, f = L.p, L.p = 2, w = ht, ht |= 4;
        try {
          _S(t, n, i);
        } finally {
          ht = w, L.p = f, T.T = o;
        }
      }
      Wt = 1, G0(), X0(), F0();
    }
  }
  function G0() {
    if (Wt === 1) {
      Wt = 0;
      var t = ki, n = ll, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          N0(n, t);
          var m = Dd, w = Dp(t.containerInfo), M = m.focusedElem, q = m.selectionRange;
          if (w !== M && M && M.ownerDocument && Ap(
            M.ownerDocument.documentElement,
            M
          )) {
            if (q !== null && tf(M)) {
              var re = q.start, fe = q.end;
              if (fe === void 0 && (fe = re), "selectionStart" in M)
                M.selectionStart = re, M.selectionEnd = Math.min(
                  fe,
                  M.value.length
                );
              else {
                var he = M.ownerDocument || document, le = he && he.defaultView || window;
                if (le.getSelection) {
                  var ue = le.getSelection(), Ne = M.textContent.length, Le = Math.min(q.start, Ne), Nt = q.end === void 0 ? Le : Math.min(q.end, Ne);
                  !ue.extend && Le > Nt && (w = Nt, Nt = Le, Le = w);
                  var J = Mp(
                    M,
                    Le
                  ), X = Mp(
                    M,
                    Nt
                  );
                  if (J && X && (ue.rangeCount !== 1 || ue.anchorNode !== J.node || ue.anchorOffset !== J.offset || ue.focusNode !== X.node || ue.focusOffset !== X.offset)) {
                    var ie = he.createRange();
                    ie.setStart(J.node, J.offset), ue.removeAllRanges(), Le > Nt ? (ue.addRange(ie), ue.extend(X.node, X.offset)) : (ie.setEnd(X.node, X.offset), ue.addRange(ie));
                  }
                }
              }
            }
            for (he = [], ue = M; ue = ue.parentNode; )
              ue.nodeType === 1 && he.push({
                element: ue,
                left: ue.scrollLeft,
                top: ue.scrollTop
              });
            for (typeof M.focus == "function" && M.focus(), M = 0; M < he.length; M++) {
              var de = he[M];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          gu = !!Ad, Dd = Ad = null;
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      t.current = n, Wt = 2;
    }
  }
  function X0() {
    if (Wt === 2) {
      Wt = 0;
      var t = ki, n = ll, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          x0(t, n.alternate, n);
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      Wt = 3;
    }
  }
  function F0() {
    if (Wt === 4 || Wt === 3) {
      Wt = 0, Ze();
      var t = ki, n = ll, i = oi, o = O0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Wt = 5 : (Wt = 0, ll = ki = null, Z0(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (Li = null), W(i), n = n.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
        try {
          Kt.onCommitFiberRoot(
            nn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = T.T, f = L.p, L.p = 2, T.T = null;
        try {
          for (var m = t.onRecoverableError, w = 0; w < o.length; w++) {
            var M = o[w];
            m(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          T.T = n, L.p = f;
        }
      }
      (oi & 3) !== 0 && iu(), ja(t), f = t.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? t === vd ? po++ : (po = 0, vd = t) : po = 0, go(0);
    }
  }
  function Z0(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Pl(n)));
  }
  function iu() {
    return G0(), X0(), F0(), P0();
  }
  function P0() {
    if (Wt !== 5) return !1;
    var t = ki, n = pd;
    pd = 0;
    var i = W(oi), o = T.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, T.T = null, i = gd, gd = null;
      var m = ki, w = oi;
      if (Wt = 0, ll = ki = null, oi = 0, (ht & 6) !== 0) throw Error(l(331));
      var M = ht;
      if (ht |= 4, A0(m.current), R0(
        m,
        m.current,
        w,
        i
      ), ht = M, go(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(nn, m);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, T.T = o, Z0(t, n);
    }
  }
  function Q0(t, n, i) {
    n = Wn(i, n), n = Pf(t.stateNode, n, 2), t = Mi(t, n, 2), t !== null && (pt(t, 2), ja(t));
  }
  function wt(t, n, i) {
    if (t.tag === 3)
      Q0(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Q0(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Li === null || !Li.has(o))) {
            t = Wn(i, t), i = Kg(2), o = Mi(n, i, 2), o !== null && (Jg(
              i,
              o,
              n,
              t
            ), pt(o, 2), ja(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function xd(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new NS();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (dd = !0, f.add(i), t = AS.bind(null, t, n, i), n.then(t, t));
  }
  function AS(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Rt === t && (et & i) === i && (Bt === 4 || Bt === 3 && (et & 62914560) === et && 300 > Pe() - Js ? (ht & 2) === 0 && ol(t, 0) : hd |= i, rl === et && (rl = 0)), ja(t);
  }
  function K0(t, n) {
    n === 0 && (n = Vt()), t = rr(t, n), t !== null && (pt(t, n), ja(t));
  }
  function DS(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), K0(t, i);
  }
  function jS(t, n) {
    var i = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode, f = t.memoizedState;
        f !== null && (i = f.retryLane);
        break;
      case 19:
        o = t.stateNode;
        break;
      case 22:
        o = t.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    o !== null && o.delete(n), K0(t, i);
  }
  function OS(t, n) {
    return Ie(t, n);
  }
  var ru = null, ul = null, wd = !1, lu = !1, _d = !1, Bi = 0;
  function ja(t) {
    t !== ul && t.next === null && (ul === null ? ru = ul = t : ul = ul.next = t), lu = !0, wd || (wd = !0, LS());
  }
  function go(t, n) {
    if (!_d && lu) {
      _d = !0;
      do
        for (var i = !1, o = ru; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var m = 0;
            else {
              var w = o.suspendedLanes, M = o.pingedLanes;
              m = (1 << 31 - Ut(42 | t) + 1) - 1, m &= f & ~(w & ~M), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (i = !0, tv(o, m));
          } else
            m = et, m = ke(
              o,
              o === Rt ? m : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (m & 3) === 0 || yt(o, m) || (i = !0, tv(o, m));
          o = o.next;
        }
      while (i);
      _d = !1;
    }
  }
  function zS() {
    J0();
  }
  function J0() {
    lu = wd = !1;
    var t = 0;
    Bi !== 0 && GS() && (t = Bi);
    for (var n = Pe(), i = null, o = ru; o !== null; ) {
      var f = o.next, m = W0(o, n);
      m === 0 ? (o.next = null, i === null ? ru = f : i.next = f, f === null && (ul = i)) : (i = o, (t !== 0 || (m & 3) !== 0) && (lu = !0)), o = f;
    }
    Wt !== 0 && Wt !== 5 || go(t), Bi !== 0 && (Bi = 0);
  }
  function W0(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, m = t.pendingLanes & -62914561; 0 < m; ) {
      var w = 31 - Ut(m), M = 1 << w, q = f[w];
      q === -1 ? ((M & i) === 0 || (M & o) !== 0) && (f[w] = kt(M, n)) : q <= n && (t.expiredLanes |= M), m &= ~M;
    }
    if (n = Rt, i = et, i = ke(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && _t(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || yt(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && _t(o), W(i)) {
        case 2:
        case 8:
          i = Yt;
          break;
        case 32:
          i = Lt;
          break;
        case 268435456:
          i = ot;
          break;
        default:
          i = Lt;
      }
      return o = ev.bind(null, t), i = Ie(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && _t(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function ev(t, n) {
    if (Wt !== 0 && Wt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (iu() && t.callbackNode !== i)
      return null;
    var o = et;
    return o = ke(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (L0(t, o, n), W0(t, Pe()), t.callbackNode != null && t.callbackNode === i ? ev.bind(null, t) : null);
  }
  function tv(t, n) {
    if (iu()) return null;
    L0(t, n, !0);
  }
  function LS() {
    FS(function() {
      (ht & 6) !== 0 ? Ie(
        vt,
        zS
      ) : J0();
    });
  }
  function Sd() {
    if (Bi === 0) {
      var t = Zr;
      t === 0 && (t = da, da <<= 1, (da & 261888) === 0 && (da = 256)), Bi = t;
    }
    return Bi;
  }
  function nv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ms("" + t);
  }
  function av(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function kS(t, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var m = nv(
        (f[we] || null).action
      ), w = o.submitter;
      w && (n = (n = w[we] || null) ? nv(n.formAction) : w.getAttribute("formAction"), n !== null && (m = n, w = null));
      var M = new ys(
        "action",
        "action",
        null,
        o,
        f
      );
      t.push({
        event: M,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (Bi !== 0) {
                  var q = w ? av(f, w) : new FormData(f);
                  If(
                    i,
                    {
                      pending: !0,
                      data: q,
                      method: f.method,
                      action: m
                    },
                    null,
                    q
                  );
                }
              } else
                typeof m == "function" && (M.preventDefault(), q = w ? av(f, w) : new FormData(f), If(
                  i,
                  {
                    pending: !0,
                    data: q,
                    method: f.method,
                    action: m
                  },
                  m,
                  q
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var Ed = 0; Ed < lf.length; Ed++) {
    var Nd = lf[Ed], HS = Nd.toLowerCase(), BS = Nd[0].toUpperCase() + Nd.slice(1);
    ga(
      HS,
      "on" + BS
    );
  }
  ga(zp, "onAnimationEnd"), ga(Lp, "onAnimationIteration"), ga(kp, "onAnimationStart"), ga("dblclick", "onDoubleClick"), ga("focusin", "onFocus"), ga("focusout", "onBlur"), ga(eS, "onTransitionRun"), ga(tS, "onTransitionStart"), ga(nS, "onTransitionCancel"), ga(Hp, "onTransitionEnd"), an("onMouseEnter", ["mouseout", "mouseover"]), an("onMouseLeave", ["mouseout", "mouseover"]), an("onPointerEnter", ["pointerout", "pointerover"]), an("onPointerLeave", ["pointerout", "pointerover"]), fn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), fn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), fn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), fn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), fn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), fn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var vo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), US = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vo)
  );
  function iv(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], f = o.event;
      o = o.listeners;
      e: {
        var m = void 0;
        if (n)
          for (var w = o.length - 1; 0 <= w; w--) {
            var M = o[w], q = M.instance, re = M.currentTarget;
            if (M = M.listener, q !== m && f.isPropagationStopped())
              break e;
            m = M, f.currentTarget = re;
            try {
              m(f);
            } catch (fe) {
              ws(fe);
            }
            f.currentTarget = null, m = q;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (M = o[w], q = M.instance, re = M.currentTarget, M = M.listener, q !== m && f.isPropagationStopped())
              break e;
            m = M, f.currentTarget = re;
            try {
              m(f);
            } catch (fe) {
              ws(fe);
            }
            f.currentTarget = null, m = q;
          }
      }
    }
  }
  function Ke(t, n) {
    var i = n[Ae];
    i === void 0 && (i = n[Ae] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (rv(n, t, 2, !1), i.add(o));
  }
  function Cd(t, n, i) {
    var o = 0;
    n && (o |= 4), rv(
      i,
      t,
      o,
      n
    );
  }
  var ou = "_reactListening" + Math.random().toString(36).slice(2);
  function Rd(t) {
    if (!t[ou]) {
      t[ou] = !0, Ta.forEach(function(i) {
        i !== "selectionchange" && (US.has(i) || Cd(i, !1, t), Cd(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[ou] || (n[ou] = !0, Cd("selectionchange", !1, n));
    }
  }
  function rv(t, n, i, o) {
    switch (zv(n)) {
      case 2:
        var f = hE;
        break;
      case 8:
        f = mE;
        break;
      default:
        f = $d;
    }
    i = f.bind(
      null,
      n,
      i,
      t
    ), f = void 0, !Xc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, i, !0) : f !== void 0 ? t.addEventListener(n, i, {
      passive: f
    }) : t.addEventListener(n, i, !1);
  }
  function Td(t, n, i, o, f) {
    var m = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var w = o.tag;
        if (w === 3 || w === 4) {
          var M = o.stateNode.containerInfo;
          if (M === f) break;
          if (w === 4)
            for (w = o.return; w !== null; ) {
              var q = w.tag;
              if ((q === 3 || q === 4) && w.stateNode.containerInfo === f)
                return;
              w = w.return;
            }
          for (; M !== null; ) {
            if (w = Ct(M), w === null) return;
            if (q = w.tag, q === 5 || q === 6 || q === 26 || q === 27) {
              o = m = w;
              continue e;
            }
            M = M.parentNode;
          }
        }
        o = o.return;
      }
    cp(function() {
      var re = m, fe = Yc(i), he = [];
      e: {
        var le = Bp.get(t);
        if (le !== void 0) {
          var ue = ys, Ne = t;
          switch (t) {
            case "keypress":
              if (gs(i) === 0) break e;
            case "keydown":
            case "keyup":
              ue = j_;
              break;
            case "focusin":
              Ne = "focus", ue = Qc;
              break;
            case "focusout":
              Ne = "blur", ue = Qc;
              break;
            case "beforeblur":
            case "afterblur":
              ue = Qc;
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
              ue = hp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ue = x_;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ue = L_;
              break;
            case zp:
            case Lp:
            case kp:
              ue = S_;
              break;
            case Hp:
              ue = H_;
              break;
            case "scroll":
            case "scrollend":
              ue = y_;
              break;
            case "wheel":
              ue = U_;
              break;
            case "copy":
            case "cut":
            case "paste":
              ue = N_;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ue = pp;
              break;
            case "toggle":
            case "beforetoggle":
              ue = q_;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (t === "scroll" || t === "scrollend"), J = Le ? le !== null ? le + "Capture" : null : le;
          Le = [];
          for (var X = re, ie; X !== null; ) {
            var de = X;
            if (ie = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || ie === null || J === null || (de = Bl(X, J), de != null && Le.push(
              yo(X, de, ie)
            )), Nt) break;
            X = X.return;
          }
          0 < Le.length && (le = new ue(
            le,
            Ne,
            null,
            i,
            fe
          ), he.push({ event: le, listeners: Le }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = t === "mouseover" || t === "pointerover", ue = t === "mouseout" || t === "pointerout", le && i !== Ic && (Ne = i.relatedTarget || i.fromElement) && (Ct(Ne) || Ne[be]))
            break e;
          if ((ue || le) && (le = fe.window === fe ? fe : (le = fe.ownerDocument) ? le.defaultView || le.parentWindow : window, ue ? (Ne = i.relatedTarget || i.toElement, ue = re, Ne = Ne ? Ct(Ne) : null, Ne !== null && (Nt = u(Ne), Le = Ne.tag, Ne !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (Ne = null)) : (ue = null, Ne = re), ue !== Ne)) {
            if (Le = hp, de = "onMouseLeave", J = "onMouseEnter", X = "mouse", (t === "pointerout" || t === "pointerover") && (Le = pp, de = "onPointerLeave", J = "onPointerEnter", X = "pointer"), Nt = ue == null ? le : We(ue), ie = Ne == null ? le : We(Ne), le = new Le(
              de,
              X + "leave",
              ue,
              i,
              fe
            ), le.target = Nt, le.relatedTarget = ie, de = null, Ct(fe) === re && (Le = new Le(
              J,
              X + "enter",
              Ne,
              i,
              fe
            ), Le.target = ie, Le.relatedTarget = Nt, de = Le), Nt = de, ue && Ne)
              t: {
                for (Le = VS, J = ue, X = Ne, ie = 0, de = J; de; de = Le(de))
                  ie++;
                de = 0;
                for (var Oe = X; Oe; Oe = Le(Oe))
                  de++;
                for (; 0 < ie - de; )
                  J = Le(J), ie--;
                for (; 0 < de - ie; )
                  X = Le(X), de--;
                for (; ie--; ) {
                  if (J === X || X !== null && J === X.alternate) {
                    Le = J;
                    break t;
                  }
                  J = Le(J), X = Le(X);
                }
                Le = null;
              }
            else Le = null;
            ue !== null && lv(
              he,
              le,
              ue,
              Le,
              !1
            ), Ne !== null && Nt !== null && lv(
              he,
              Nt,
              Ne,
              Le,
              !0
            );
          }
        }
        e: {
          if (le = re ? We(re) : window, ue = le.nodeName && le.nodeName.toLowerCase(), ue === "select" || ue === "input" && le.type === "file")
            var ut = Sp;
          else if (wp(le))
            if (Ep)
              ut = K_;
            else {
              ut = P_;
              var Ce = Z_;
            }
          else
            ue = le.nodeName, !ue || ue.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? re && $c(re.elementType) && (ut = Sp) : ut = Q_;
          if (ut && (ut = ut(t, re))) {
            _p(
              he,
              ut,
              i,
              fe
            );
            break e;
          }
          Ce && Ce(t, le, re), t === "focusout" && re && le.type === "number" && re.memoizedProps.value != null && kl(le, "number", le.value);
        }
        switch (Ce = re ? We(re) : window, t) {
          case "focusin":
            (wp(Ce) || Ce.contentEditable === "true") && (Vr = Ce, nf = re, Xl = null);
            break;
          case "focusout":
            Xl = nf = Vr = null;
            break;
          case "mousedown":
            af = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            af = !1, jp(he, i, fe);
            break;
          case "selectionchange":
            if (W_) break;
          case "keydown":
          case "keyup":
            jp(he, i, fe);
        }
        var Ye;
        if (Jc)
          e: {
            switch (t) {
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
          Ur ? bp(t, i) && (tt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (gp && i.locale !== "ko" && (Ur || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Ur && (Ye = fp()) : (_i = fe, Fc = "value" in _i ? _i.value : _i.textContent, Ur = !0)), Ce = su(re, tt), 0 < Ce.length && (tt = new mp(
          tt,
          t,
          null,
          i,
          fe
        ), he.push({ event: tt, listeners: Ce }), Ye ? tt.data = Ye : (Ye = xp(i), Ye !== null && (tt.data = Ye)))), (Ye = I_ ? Y_(t, i) : G_(t, i)) && (tt = su(re, "onBeforeInput"), 0 < tt.length && (Ce = new mp(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          fe
        ), he.push({
          event: Ce,
          listeners: tt
        }), Ce.data = Ye)), kS(
          he,
          t,
          re,
          i,
          fe
        );
      }
      iv(he, n);
    });
  }
  function yo(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function su(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var f = t, m = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || m === null || (f = Bl(t, i), f != null && o.unshift(
        yo(t, f, m)
      ), f = Bl(t, n), f != null && o.push(
        yo(t, f, m)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function VS(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function lv(t, n, i, o, f) {
    for (var m = n._reactName, w = []; i !== null && i !== o; ) {
      var M = i, q = M.alternate, re = M.stateNode;
      if (M = M.tag, q !== null && q === o) break;
      M !== 5 && M !== 26 && M !== 27 || re === null || (q = re, f ? (re = Bl(i, m), re != null && w.unshift(
        yo(i, re, q)
      )) : f || (re = Bl(i, m), re != null && w.push(
        yo(i, re, q)
      ))), i = i.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var qS = /\r\n?/g, $S = /\u0000|\uFFFD/g;
  function ov(t) {
    return (typeof t == "string" ? t : "" + t).replace(qS, `
`).replace($S, "");
  }
  function sv(t, n) {
    return n = ov(n), ov(t) === n;
  }
  function Et(t, n, i, o, f, m) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || kr(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && kr(t, "" + o);
        break;
      case "className":
        pa(t, "class", o);
        break;
      case "tabIndex":
        pa(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        pa(t, i, o);
        break;
      case "style":
        sp(t, o, m);
        break;
      case "data":
        if (n !== "object") {
          pa(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || i !== "href")) {
          t.removeAttribute(i);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = ms("" + o), t.setAttribute(i, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof m == "function" && (i === "formAction" ? (n !== "input" && Et(t, n, "name", f.name, f, null), Et(
            t,
            n,
            "formEncType",
            f.formEncType,
            f,
            null
          ), Et(
            t,
            n,
            "formMethod",
            f.formMethod,
            f,
            null
          ), Et(
            t,
            n,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (Et(t, n, "encType", f.encType, f, null), Et(t, n, "method", f.method, f, null), Et(t, n, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = ms("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = Xa);
        break;
      case "onScroll":
        o != null && Ke("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = i;
          }
        }
        break;
      case "multiple":
        t.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        t.muted = o && typeof o != "function" && typeof o != "symbol";
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
          t.removeAttribute("xlink:href");
          break;
        }
        i = ms("" + o), t.setAttributeNS(
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
        o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, "" + o) : t.removeAttribute(i);
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
        o && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, "") : t.removeAttribute(i);
        break;
      case "capture":
      case "download":
        o === !0 ? t.setAttribute(i, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, o) : t.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? t.setAttribute(i, o) : t.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? t.removeAttribute(i) : t.setAttribute(i, o);
        break;
      case "popover":
        Ke("beforetoggle", t), Ke("toggle", t), ma(t, "popover", o);
        break;
      case "xlinkActuate":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Be(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Be(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Be(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        ma(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = g_.get(i) || i, ma(t, i, o));
    }
  }
  function Md(t, n, i, o, f, m) {
    switch (i) {
      case "style":
        sp(t, o, m);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof o == "string" ? kr(t, o) : (typeof o == "number" || typeof o == "bigint") && kr(t, "" + o);
        break;
      case "onScroll":
        o != null && Ke("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Xa);
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
        if (!Hn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), n = i.slice(2, f ? i.length - 7 : void 0), m = t[we] || null, m = m != null ? m[i] : null, typeof m == "function" && t.removeEventListener(n, m, f), typeof o == "function")) {
              typeof m != "function" && m !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, f);
              break e;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : ma(t, i, o);
          }
    }
  }
  function un(t, n, i) {
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
        Ke("error", t), Ke("load", t);
        var o = !1, f = !1, m;
        for (m in i)
          if (i.hasOwnProperty(m)) {
            var w = i[m];
            if (w != null)
              switch (m) {
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
                  Et(t, n, m, w, i, null);
              }
          }
        f && Et(t, n, "srcSet", i.srcSet, i, null), o && Et(t, n, "src", i.src, i, null);
        return;
      case "input":
        Ke("invalid", t);
        var M = m = w = f = null, q = null, re = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var fe = i[o];
            if (fe != null)
              switch (o) {
                case "name":
                  f = fe;
                  break;
                case "type":
                  w = fe;
                  break;
                case "checked":
                  q = fe;
                  break;
                case "defaultChecked":
                  re = fe;
                  break;
                case "value":
                  m = fe;
                  break;
                case "defaultValue":
                  M = fe;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (fe != null)
                    throw Error(l(137, n));
                  break;
                default:
                  Et(t, n, o, fe, i, null);
              }
          }
        Lr(
          t,
          m,
          M,
          q,
          re,
          w,
          f,
          !1
        );
        return;
      case "select":
        Ke("invalid", t), o = w = m = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (M = i[f], M != null))
            switch (f) {
              case "value":
                m = M;
                break;
              case "defaultValue":
                w = M;
                break;
              case "multiple":
                o = M;
              default:
                Et(t, n, f, M, i, null);
            }
        n = m, i = w, t.multiple = !!o, n != null ? wi(t, !!o, n, !1) : i != null && wi(t, !!o, i, !0);
        return;
      case "textarea":
        Ke("invalid", t), m = f = o = null;
        for (w in i)
          if (i.hasOwnProperty(w) && (M = i[w], M != null))
            switch (w) {
              case "value":
                o = M;
                break;
              case "defaultValue":
                f = M;
                break;
              case "children":
                m = M;
                break;
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(l(91));
                break;
              default:
                Et(t, n, w, M, i, null);
            }
        lp(t, o, f, m);
        return;
      case "option":
        for (q in i)
          if (i.hasOwnProperty(q) && (o = i[q], o != null))
            switch (q) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Et(t, n, q, o, i, null);
            }
        return;
      case "dialog":
        Ke("beforetoggle", t), Ke("toggle", t), Ke("cancel", t), Ke("close", t);
        break;
      case "iframe":
      case "object":
        Ke("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < vo.length; o++)
          Ke(vo[o], t);
        break;
      case "image":
        Ke("error", t), Ke("load", t);
        break;
      case "details":
        Ke("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Ke("error", t), Ke("load", t);
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
        for (re in i)
          if (i.hasOwnProperty(re) && (o = i[re], o != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                Et(t, n, re, o, i, null);
            }
        return;
      default:
        if ($c(n)) {
          for (fe in i)
            i.hasOwnProperty(fe) && (o = i[fe], o !== void 0 && Md(
              t,
              n,
              fe,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (M in i)
      i.hasOwnProperty(M) && (o = i[M], o != null && Et(t, n, M, o, i, null));
  }
  function IS(t, n, i, o) {
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
        var f = null, m = null, w = null, M = null, q = null, re = null, fe = null;
        for (ue in i) {
          var he = i[ue];
          if (i.hasOwnProperty(ue) && he != null)
            switch (ue) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = he;
              default:
                o.hasOwnProperty(ue) || Et(t, n, ue, null, o, he);
            }
        }
        for (var le in o) {
          var ue = o[le];
          if (he = i[le], o.hasOwnProperty(le) && (ue != null || he != null))
            switch (le) {
              case "type":
                m = ue;
                break;
              case "name":
                f = ue;
                break;
              case "checked":
                re = ue;
                break;
              case "defaultChecked":
                fe = ue;
                break;
              case "value":
                w = ue;
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
                ue !== he && Et(
                  t,
                  n,
                  le,
                  ue,
                  o,
                  he
                );
            }
        }
        tr(
          t,
          w,
          M,
          q,
          re,
          fe,
          m,
          f
        );
        return;
      case "select":
        ue = w = M = le = null;
        for (m in i)
          if (q = i[m], i.hasOwnProperty(m) && q != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                ue = q;
              default:
                o.hasOwnProperty(m) || Et(
                  t,
                  n,
                  m,
                  null,
                  o,
                  q
                );
            }
        for (f in o)
          if (m = o[f], q = i[f], o.hasOwnProperty(f) && (m != null || q != null))
            switch (f) {
              case "value":
                le = m;
                break;
              case "defaultValue":
                M = m;
                break;
              case "multiple":
                w = m;
              default:
                m !== q && Et(
                  t,
                  n,
                  f,
                  m,
                  o,
                  q
                );
            }
        n = M, i = w, o = ue, le != null ? wi(t, !!i, le, !1) : !!o != !!i && (n != null ? wi(t, !!i, n, !0) : wi(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        ue = le = null;
        for (M in i)
          if (f = i[M], i.hasOwnProperty(M) && f != null && !o.hasOwnProperty(M))
            switch (M) {
              case "value":
                break;
              case "children":
                break;
              default:
                Et(t, n, M, null, o, f);
            }
        for (w in o)
          if (f = o[w], m = i[w], o.hasOwnProperty(w) && (f != null || m != null))
            switch (w) {
              case "value":
                le = f;
                break;
              case "defaultValue":
                ue = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(l(91));
                break;
              default:
                f !== m && Et(t, n, w, f, o, m);
            }
        Hl(t, le, ue);
        return;
      case "option":
        for (var Ne in i)
          if (le = i[Ne], i.hasOwnProperty(Ne) && le != null && !o.hasOwnProperty(Ne))
            switch (Ne) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  n,
                  Ne,
                  null,
                  o,
                  le
                );
            }
        for (q in o)
          if (le = o[q], ue = i[q], o.hasOwnProperty(q) && le !== ue && (le != null || ue != null))
            switch (q) {
              case "selected":
                t.selected = le && typeof le != "function" && typeof le != "symbol";
                break;
              default:
                Et(
                  t,
                  n,
                  q,
                  le,
                  o,
                  ue
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
        for (var Le in i)
          le = i[Le], i.hasOwnProperty(Le) && le != null && !o.hasOwnProperty(Le) && Et(t, n, Le, null, o, le);
        for (re in o)
          if (le = o[re], ue = i[re], o.hasOwnProperty(re) && le !== ue && (le != null || ue != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(l(137, n));
                break;
              default:
                Et(
                  t,
                  n,
                  re,
                  le,
                  o,
                  ue
                );
            }
        return;
      default:
        if ($c(n)) {
          for (var Nt in i)
            le = i[Nt], i.hasOwnProperty(Nt) && le !== void 0 && !o.hasOwnProperty(Nt) && Md(
              t,
              n,
              Nt,
              void 0,
              o,
              le
            );
          for (fe in o)
            le = o[fe], ue = i[fe], !o.hasOwnProperty(fe) || le === ue || le === void 0 && ue === void 0 || Md(
              t,
              n,
              fe,
              le,
              o,
              ue
            );
          return;
        }
    }
    for (var J in i)
      le = i[J], i.hasOwnProperty(J) && le != null && !o.hasOwnProperty(J) && Et(t, n, J, null, o, le);
    for (he in o)
      le = o[he], ue = i[he], !o.hasOwnProperty(he) || le === ue || le == null && ue == null || Et(t, n, he, le, o, ue);
  }
  function uv(t) {
    switch (t) {
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
  function YS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], m = f.transferSize, w = f.initiatorType, M = f.duration;
        if (m && M && uv(w)) {
          for (w = 0, M = f.responseEnd, o += 1; o < i.length; o++) {
            var q = i[o], re = q.startTime;
            if (re > M) break;
            var fe = q.transferSize, he = q.initiatorType;
            fe && uv(he) && (q = q.responseEnd, w += fe * (q < M ? 1 : (M - re) / (q - re)));
          }
          if (--o, n += 8 * (m + w) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ad = null, Dd = null;
  function uu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function cv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function fv(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function jd(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Od = null;
  function GS() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Od ? !1 : (Od = t, !0) : (Od = null, !1);
  }
  var dv = typeof setTimeout == "function" ? setTimeout : void 0, XS = typeof clearTimeout == "function" ? clearTimeout : void 0, hv = typeof Promise == "function" ? Promise : void 0, FS = typeof queueMicrotask == "function" ? queueMicrotask : typeof hv < "u" ? function(t) {
    return hv.resolve(null).then(t).catch(ZS);
  } : dv;
  function ZS(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ui(t) {
    return t === "head";
  }
  function mv(t, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (t.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(f), hl(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          bo(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, bo(i);
          for (var m = i.firstChild; m; ) {
            var w = m.nextSibling, M = m.nodeName;
            m[Ge] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && m.rel.toLowerCase() === "stylesheet" || i.removeChild(m), m = w;
          }
        } else
          i === "body" && bo(t.ownerDocument.body);
      i = f;
    } while (i);
    hl(n);
  }
  function pv(t, n) {
    var i = t;
    t = 0;
    do {
      var o = i.nextSibling;
      if (i.nodeType === 1 ? n ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (n ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), o && o.nodeType === 8)
        if (i = o.data, i === "/$") {
          if (t === 0) break;
          t--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || t++;
      i = o;
    } while (i);
  }
  function zd(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          zd(i), rt(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(i);
    }
  }
  function PS(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var f = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[Ge])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (m = t.getAttribute("rel"), m === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (m !== f.rel || t.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || t.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (m = t.getAttribute("src"), (m !== (f.src == null ? null : f.src) || t.getAttribute("type") !== (f.type == null ? null : f.type) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && m && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var m = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && t.getAttribute("name") === m)
          return t;
      } else return t;
      if (t = ia(t.nextSibling), t === null) break;
    }
    return null;
  }
  function QS(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ia(t.nextSibling), t === null)) return null;
    return t;
  }
  function gv(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ia(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ld(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function kd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function KS(t, n) {
    var i = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || i.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), i.removeEventListener("DOMContentLoaded", o);
      };
      i.addEventListener("DOMContentLoaded", o), t._reactRetry = o;
    }
  }
  function ia(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = t.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return t;
  }
  var Hd = null;
  function vv(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return ia(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function yv(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (n === 0) return t;
          n--;
        } else i !== "/$" && i !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function bv(t, n, i) {
    switch (n = uu(i), t) {
      case "html":
        if (t = n.documentElement, !t) throw Error(l(452));
        return t;
      case "head":
        if (t = n.head, !t) throw Error(l(453));
        return t;
      case "body":
        if (t = n.body, !t) throw Error(l(454));
        return t;
      default:
        throw Error(l(451));
    }
  }
  function bo(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    rt(t);
  }
  var ra = /* @__PURE__ */ new Map(), xv = /* @__PURE__ */ new Set();
  function cu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var si = L.d;
  L.d = {
    f: JS,
    r: WS,
    D: eE,
    C: tE,
    L: nE,
    m: aE,
    X: rE,
    S: iE,
    M: lE
  };
  function JS() {
    var t = si.f(), n = tu();
    return t || n;
  }
  function WS(t) {
    var n = st(t);
    n !== null && n.tag === 5 && n.type === "form" ? Hg(n) : si.r(t);
  }
  var cl = typeof document > "u" ? null : document;
  function wv(t, n, i) {
    var o = cl;
    if (o && typeof n == "string" && n) {
      var f = rn(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), xv.has(f) || (xv.add(f), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), un(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function eE(t) {
    si.D(t), wv("dns-prefetch", t, null);
  }
  function tE(t, n) {
    si.C(t, n), wv("preconnect", t, n);
  }
  function nE(t, n, i) {
    si.L(t, n, i);
    var o = cl;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + rn(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + rn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + rn(
        i.imageSizes
      ) + '"]')) : f += '[href="' + rn(t) + '"]';
      var m = f;
      switch (n) {
        case "style":
          m = fl(t);
          break;
        case "script":
          m = dl(t);
      }
      ra.has(m) || (t = g(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), ra.set(m, t), o.querySelector(f) !== null || n === "style" && o.querySelector(xo(m)) || n === "script" && o.querySelector(wo(m)) || (n = o.createElement("link"), un(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function aE(t, n) {
    si.m(t, n);
    var i = cl;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + rn(o) + '"][href="' + rn(t) + '"]', m = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = dl(t);
      }
      if (!ra.has(m) && (t = g({ rel: "modulepreload", href: t }, n), ra.set(m, t), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(wo(m)))
              return;
        }
        o = i.createElement("link"), un(o, "link", t), at(o), i.head.appendChild(o);
      }
    }
  }
  function iE(t, n, i) {
    si.S(t, n, i);
    var o = cl;
    if (o && t) {
      var f = zt(o).hoistableStyles, m = fl(t);
      n = n || "default";
      var w = f.get(m);
      if (!w) {
        var M = { loading: 0, preload: null };
        if (w = o.querySelector(
          xo(m)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = ra.get(m)) && Bd(t, i);
          var q = w = o.createElement("link");
          at(q), un(q, "link", t), q._p = new Promise(function(re, fe) {
            q.onload = re, q.onerror = fe;
          }), q.addEventListener("load", function() {
            M.loading |= 1;
          }), q.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, fu(w, n, o);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: M
        }, f.set(m, w);
      }
    }
  }
  function rE(t, n) {
    si.X(t, n);
    var i = cl;
    if (i && t) {
      var o = zt(i).hoistableScripts, f = dl(t), m = o.get(f);
      m || (m = i.querySelector(wo(f)), m || (t = g({ src: t, async: !0 }, n), (n = ra.get(f)) && Ud(t, n), m = i.createElement("script"), at(m), un(m, "link", t), i.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, o.set(f, m));
    }
  }
  function lE(t, n) {
    si.M(t, n);
    var i = cl;
    if (i && t) {
      var o = zt(i).hoistableScripts, f = dl(t), m = o.get(f);
      m || (m = i.querySelector(wo(f)), m || (t = g({ src: t, async: !0, type: "module" }, n), (n = ra.get(f)) && Ud(t, n), m = i.createElement("script"), at(m), un(m, "link", t), i.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, o.set(f, m));
    }
  }
  function _v(t, n, i, o) {
    var f = (f = ae.current) ? cu(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = fl(i.href), i = zt(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = fl(i.href);
          var m = zt(
            f
          ).hoistableStyles, w = m.get(t);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, m.set(t, w), (m = f.querySelector(
            xo(t)
          )) && !m._p && (w.instance = m, w.state.loading = 5), ra.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, ra.set(t, i), m || oE(
            f,
            t,
            i,
            w.state
          ))), n && o === null)
            throw Error(l(528, ""));
          return w;
        }
        if (n && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = dl(i), i = zt(
          f
        ).hoistableScripts, o = i.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, t));
    }
  }
  function fl(t) {
    return 'href="' + rn(t) + '"';
  }
  function xo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Sv(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function oE(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), un(n, "link", i), at(n), t.head.appendChild(n));
  }
  function dl(t) {
    return '[src="' + rn(t) + '"]';
  }
  function wo(t) {
    return "script[async]" + t;
  }
  function Ev(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + rn(i.href) + '"]'
          );
          if (o)
            return n.instance = o, at(o), o;
          var f = g({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), at(o), un(o, "style", f), fu(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          f = fl(i.href);
          var m = t.querySelector(
            xo(f)
          );
          if (m)
            return n.state.loading |= 4, n.instance = m, at(m), m;
          o = Sv(i), (f = ra.get(f)) && Bd(o, f), m = (t.ownerDocument || t).createElement("link"), at(m);
          var w = m;
          return w._p = new Promise(function(M, q) {
            w.onload = M, w.onerror = q;
          }), un(m, "link", o), n.state.loading |= 4, fu(m, i.precedence, t), n.instance = m;
        case "script":
          return m = dl(i.src), (f = t.querySelector(
            wo(m)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = ra.get(m)) && (o = g({}, i), Ud(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), at(f), un(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, fu(o, i.precedence, t));
    return n.instance;
  }
  function fu(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, m = f, w = 0; w < o.length; w++) {
      var M = o[w];
      if (M.dataset.precedence === n) m = M;
      else if (m !== f) break;
    }
    m ? m.parentNode.insertBefore(t, m.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Bd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Ud(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var du = null;
  function Nv(t, n, i) {
    if (du === null) {
      var o = /* @__PURE__ */ new Map(), f = du = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = du, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), f = 0; f < i.length; f++) {
      var m = i[f];
      if (!(m[Ge] || m[ye] || t === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = m.getAttribute(n) || "";
        w = t + w;
        var M = o.get(w);
        M ? M.push(m) : o.set(w, [m]);
      }
    }
    return o;
  }
  function Cv(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function sE(t, n, i) {
    if (i === 1 || n.itemProp != null) return !1;
    switch (t) {
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
            return t = n.disabled, typeof n.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Rv(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function uE(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = fl(o.href), m = n.querySelector(
          xo(f)
        );
        if (m) {
          n = m._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = hu.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = m, at(m);
          return;
        }
        m = n.ownerDocument || n, o = Sv(o), (f = ra.get(f)) && Bd(o, f), m = m.createElement("link"), at(m);
        var w = m;
        w._p = new Promise(function(M, q) {
          w.onload = M, w.onerror = q;
        }), un(m, "link", o), i.instance = m;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = hu.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Vd = 0;
  function cE(t, n) {
    return t.stylesheets && t.count === 0 && pu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && pu(t, t.stylesheets), t.unsuspend) {
          var m = t.unsuspend;
          t.unsuspend = null, m();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Vd === 0 && (Vd = 62500 * YS());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && pu(t, t.stylesheets), t.unsuspend)) {
            var m = t.unsuspend;
            t.unsuspend = null, m();
          }
        },
        (t.imgBytes > Vd ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function hu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) pu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var mu = null;
  function pu(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, mu = /* @__PURE__ */ new Map(), n.forEach(fE, t), mu = null, hu.call(t));
  }
  function fE(t, n) {
    if (!(n.state.loading & 4)) {
      var i = mu.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), mu.set(t, i);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < f.length; m++) {
          var w = f[m];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (i.set(w.dataset.precedence, w), o = w);
        }
        o && i.set(null, o);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), m = i.get(w) || o, m === o && i.set(null, f), i.set(w, f), this.count++, o = hu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), m ? m.parentNode.insertBefore(f, m.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var _o = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function dE(t, n, i, o, f, m, w, M, q) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gn(0), this.hiddenUpdates = gn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = m, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Tv(t, n, i, o, f, m, w, M, q, re, fe, he) {
    return t = new dE(
      t,
      n,
      i,
      w,
      q,
      re,
      fe,
      he,
      M
    ), n = 1, m === !0 && (n |= 24), m = Vn(3, null, null, n), t.current = m, m.stateNode = t, n = bf(), n.refCount++, t.pooledCache = n, n.refCount++, m.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Sf(m), t;
  }
  function Mv(t) {
    return t ? (t = Ir, t) : Ir;
  }
  function Av(t, n, i, o, f, m) {
    f = Mv(f), o.context === null ? o.context = f : o.pendingContext = f, o = Ti(n), o.payload = { element: i }, m = m === void 0 ? null : m, m !== null && (o.callback = m), i = Mi(t, o, n), i !== null && (Dn(i, t, n), Wl(i, t, n));
  }
  function Dv(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function qd(t, n) {
    Dv(t, n), (t = t.alternate) && Dv(t, n);
  }
  function jv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = rr(t, 67108864);
      n !== null && Dn(n, t, 67108864), qd(t, 67108864);
    }
  }
  function Ov(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Gn();
      n = Z(n);
      var i = rr(t, n);
      i !== null && Dn(i, t, n), qd(t, n);
    }
  }
  var gu = !0;
  function hE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var m = L.p;
    try {
      L.p = 2, $d(t, n, i, o);
    } finally {
      L.p = m, T.T = f;
    }
  }
  function mE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var m = L.p;
    try {
      L.p = 8, $d(t, n, i, o);
    } finally {
      L.p = m, T.T = f;
    }
  }
  function $d(t, n, i, o) {
    if (gu) {
      var f = Id(o);
      if (f === null)
        Td(
          t,
          n,
          o,
          vu,
          i
        ), Lv(t, o);
      else if (gE(
        f,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (Lv(t, o), n & 4 && -1 < pE.indexOf(t)) {
        for (; f !== null; ) {
          var m = st(f);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var w = cn(m.pendingLanes);
                  if (w !== 0) {
                    var M = m;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; w; ) {
                      var q = 1 << 31 - Ut(w);
                      M.entanglements[1] |= q, w &= ~q;
                    }
                    ja(m), (ht & 6) === 0 && (Ws = Pe() + 500, go(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = rr(m, 2), M !== null && Dn(M, m, 2), tu(), qd(m, 2);
            }
          if (m = Id(o), m === null && Td(
            t,
            n,
            o,
            vu,
            i
          ), m === f) break;
          f = m;
        }
        f !== null && o.stopPropagation();
      } else
        Td(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function Id(t) {
    return t = Yc(t), Yd(t);
  }
  var vu = null;
  function Yd(t) {
    if (vu = null, t = Ct(t), t !== null) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var i = n.tag;
        if (i === 13) {
          if (t = c(n), t !== null) return t;
          t = null;
        } else if (i === 31) {
          if (t = d(n), t !== null) return t;
          t = null;
        } else if (i === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return vu = t, null;
  }
  function zv(t) {
    switch (t) {
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
          case vt:
            return 2;
          case Yt:
            return 8;
          case Lt:
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
  var Gd = !1, Vi = null, qi = null, $i = null, So = /* @__PURE__ */ new Map(), Eo = /* @__PURE__ */ new Map(), Ii = [], pE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Lv(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Vi = null;
        break;
      case "dragenter":
      case "dragleave":
        qi = null;
        break;
      case "mouseover":
      case "mouseout":
        $i = null;
        break;
      case "pointerover":
      case "pointerout":
        So.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Eo.delete(n.pointerId);
    }
  }
  function No(t, n, i, o, f, m) {
    return t === null || t.nativeEvent !== m ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: m,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && jv(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function gE(t, n, i, o, f) {
    switch (n) {
      case "focusin":
        return Vi = No(
          Vi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return qi = No(
          qi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return $i = No(
          $i,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var m = f.pointerId;
        return So.set(
          m,
          No(
            So.get(m) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return m = f.pointerId, Eo.set(
          m,
          No(
            Eo.get(m) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
    }
    return !1;
  }
  function kv(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Ov(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Ov(i);
            });
            return;
          }
        } else if (n === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function yu(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Id(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Ic = o, i.target.dispatchEvent(o), Ic = null;
      } else
        return n = st(i), n !== null && jv(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Hv(t, n, i) {
    yu(t) && i.delete(n);
  }
  function vE() {
    Gd = !1, Vi !== null && yu(Vi) && (Vi = null), qi !== null && yu(qi) && (qi = null), $i !== null && yu($i) && ($i = null), So.forEach(Hv), Eo.forEach(Hv);
  }
  function bu(t, n) {
    t.blockedOn === n && (t.blockedOn = null, Gd || (Gd = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      vE
    )));
  }
  var xu = null;
  function Bv(t) {
    xu !== t && (xu = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        xu === t && (xu = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Yd(o || i) === null)
              continue;
            break;
          }
          var m = st(i);
          m !== null && (t.splice(n, 3), n -= 3, If(
            m,
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
  function hl(t) {
    function n(q) {
      return bu(q, t);
    }
    Vi !== null && bu(Vi, t), qi !== null && bu(qi, t), $i !== null && bu($i, t), So.forEach(n), Eo.forEach(n);
    for (var i = 0; i < Ii.length; i++) {
      var o = Ii[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Ii.length && (i = Ii[0], i.blockedOn === null); )
      kv(i), i.blockedOn === null && Ii.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], m = i[o + 1], w = f[we] || null;
        if (typeof m == "function")
          w || Bv(i);
        else if (w) {
          var M = null;
          if (m && m.hasAttribute("formAction")) {
            if (f = m, w = m[we] || null)
              M = w.formAction;
            else if (Yd(f) !== null) continue;
          } else M = w.action;
          typeof M == "function" ? i[o + 1] = M : (i.splice(o, 3), o -= 3), Bv(i);
        }
      }
  }
  function Uv() {
    function t(m) {
      m.canIntercept && m.info === "react-transition" && m.intercept({
        handler: function() {
          return new Promise(function(w) {
            return f = w;
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
        var m = navigation.currentEntry;
        m && m.url != null && navigation.navigate(m.url, {
          state: m.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, f = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        o = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function Xd(t) {
    this._internalRoot = t;
  }
  wu.prototype.render = Xd.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = Gn();
    Av(i, o, t, n, null, null);
  }, wu.prototype.unmount = Xd.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      Av(t.current, 2, null, t, null, null), tu(), n[be] = null;
    }
  };
  function wu(t) {
    this._internalRoot = t;
  }
  wu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = pe();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < Ii.length && n !== 0 && n < Ii[i].priority; i++) ;
      Ii.splice(i, 0, t), i === 0 && kv(t);
    }
  };
  var Vv = a.version;
  if (Vv !== "19.2.7")
    throw Error(
      l(
        527,
        Vv,
        "19.2.7"
      )
    );
  L.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = h(n), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var yE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _u = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_u.isDisabled && _u.supportsFiber)
      try {
        nn = _u.inject(
          yE
        ), Kt = _u;
      } catch {
      }
  }
  return Ro.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var i = !1, o = "", f = Fg, m = Zg, w = Pg;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = Tv(
      t,
      1,
      !1,
      null,
      null,
      i,
      o,
      null,
      f,
      m,
      w,
      Uv
    ), t[be] = n.current, Rd(t), new Xd(n);
  }, Ro.hydrateRoot = function(t, n, i) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", m = Fg, w = Zg, M = Pg, q = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (m = i.onUncaughtError), i.onCaughtError !== void 0 && (w = i.onCaughtError), i.onRecoverableError !== void 0 && (M = i.onRecoverableError), i.formState !== void 0 && (q = i.formState)), n = Tv(
      t,
      1,
      !0,
      n,
      i ?? null,
      o,
      f,
      q,
      m,
      w,
      M,
      Uv
    ), n.context = Mv(null), i = n.current, o = Gn(), o = Z(o), f = Ti(o), f.callback = null, Mi(i, f, o), i = o, n.current.lanes = i, pt(n, i), ja(n), t[be] = n.current, Rd(t), new wu(n);
  }, Ro.version = "19.2.7", Ro;
}
var Qv;
function ME() {
  if (Qv) return Pd.exports;
  Qv = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Pd.exports = TE(), Pd.exports;
}
var AE = ME();
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
var _x = (e) => {
  throw TypeError(e);
}, Sx = (e, a, r) => a.has(e) || _x("Cannot " + r), oa = (e, a, r) => (Sx(e, a, "read from private field"), r ? r.call(e) : a.get(e)), Lo = (e, a, r) => a.has(e) ? _x("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), Oa = (e, a, r, l) => (Sx(e, a, "write to private field"), a.set(e, r), r);
function Kv(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function DE(e = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: l = !1 } = e, s;
  s = a.map(
    (x, _) => v(
      x,
      typeof x == "string" ? null : x.state,
      _ === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = p(
    r ?? s.length - 1
  ), c = "POP", d = null;
  function p(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function h() {
    return s[u];
  }
  function v(x, _ = null, R, N) {
    let C = Dh(
      s ? h().pathname : "/",
      x,
      _,
      R,
      N
    );
    return It(
      C.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), C;
  }
  function g(x) {
    return typeof x == "string" ? x : $a(x);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return c;
    },
    get location() {
      return h();
    },
    createHref: g,
    createURL(x) {
      return new URL(g(x), "http://localhost");
    },
    encodeLocation(x) {
      let _ = typeof x == "string" ? Na(x) : x;
      return {
        pathname: _.pathname || "",
        search: _.search || "",
        hash: _.hash || ""
      };
    },
    push(x, _) {
      c = "PUSH";
      let R = Kv(x) ? x : v(x, _);
      u += 1, s.splice(u, s.length, R), l && d && d({ action: c, location: R, delta: 1 });
    },
    replace(x, _) {
      c = "REPLACE";
      let R = Kv(x) ? x : v(x, _);
      s[u] = R, l && d && d({ action: c, location: R, delta: 0 });
    },
    go(x) {
      c = "POP";
      let _ = p(u + x), R = s[_];
      u = _, d && d({ action: c, location: R, delta: x });
    },
    listen(x) {
      return d = x, () => {
        d = null;
      };
    }
  };
}
function Fe(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function It(e, a) {
  if (!e) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function jE() {
  return Math.random().toString(36).substring(2, 10);
}
function Dh(e, a, r = null, l, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Na(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || jE(),
    mask: s
  };
}
function $a({
  pathname: e = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function Na(e) {
  let a = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (a.hash = e.substring(r), e = e.substring(0, r));
    let l = e.indexOf("?");
    l >= 0 && (a.search = e.substring(l), e = e.substring(0, l)), e && (a.pathname = e);
  }
  return a;
}
function OE(e, a, r = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Fe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : $a(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var ko, Jv = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (Lo(this, ko, /* @__PURE__ */ new Map()), e)
      for (let [a, r] of e)
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
  get(e) {
    if (oa(this, ko).has(e))
      return oa(this, ko).get(e);
    if (e.defaultValue !== void 0)
      return e.defaultValue;
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
  set(e, a) {
    oa(this, ko).set(e, a);
  }
};
ko = /* @__PURE__ */ new WeakMap();
var zE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function LE(e) {
  return zE.has(
    e
  );
}
var kE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function HE(e) {
  return kE.has(
    e
  );
}
function BE(e) {
  return e.index === !0;
}
function Io(e, a, r = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...r, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Fe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Fe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), BE(u)) {
      let h = {
        ...u,
        id: p
      };
      return l[p] = Wv(
        h,
        a(h)
      ), h;
    } else {
      let h = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = Wv(
        h,
        a(h)
      ), u.children && (h.children = Io(
        u.children,
        a,
        d,
        l,
        s
      )), h;
    }
  });
}
function Wv(e, a) {
  return Object.assign(e, {
    ...a,
    ...typeof a.lazy == "object" && a.lazy != null ? {
      lazy: {
        ...e.lazy,
        ...a.lazy
      }
    } : {}
  });
}
function Ex(e, a, r = "/") {
  return ba(e, a, r, !1);
}
function ba(e, a, r, l, s) {
  let u = typeof a == "string" ? Na(a) : a, c = ca(u.pathname || "/", r);
  if (c == null)
    return null;
  let d = s ?? Fu(e), p = null, h = KE(c);
  for (let v = 0; p == null && v < d.length; ++v)
    p = PE(
      d[v],
      h,
      l
    );
  return p;
}
function UE(e, a) {
  let { route: r, pathname: l, params: s } = e;
  return {
    id: r.id,
    pathname: l,
    params: s,
    data: a[r.id],
    loaderData: a[r.id],
    handle: r.handle
  };
}
function Fu(e) {
  let a = Nx(e);
  return VE(a), a;
}
function Nx(e, a = [], r = [], l = "", s = !1) {
  let u = (c, d, p = s, h) => {
    let v = {
      relativePath: h === void 0 ? c.path || "" : h,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: d,
      route: c
    };
    if (v.relativePath.startsWith("/")) {
      if (!v.relativePath.startsWith(l) && p)
        return;
      Fe(
        v.relativePath.startsWith(l),
        `Absolute route path "${v.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), v.relativePath = v.relativePath.slice(l.length);
    }
    let g = ua([l, v.relativePath]), b = r.concat(v);
    c.children && c.children.length > 0 && (Fe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Nx(
      c.children,
      a,
      b,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: FE(g, c.index),
      routesMeta: b
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of Cx(c.path))
        u(c, d, !0, p);
  }), a;
}
function Cx(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Cx(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function VE(e) {
  e.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : ZE(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var qE = /^:[\w-]+$/, $E = 3, IE = 2, YE = 1, GE = 10, XE = -2, ey = (e) => e === "*";
function FE(e, a) {
  let r = e.split("/"), l = r.length;
  return r.some(ey) && (l += XE), a && (l += IE), r.filter((s) => !ey(s)).reduce(
    (s, u) => s + (qE.test(u) ? $E : u === "" ? YE : GE),
    l
  );
}
function ZE(e, a) {
  return e.length === a.length && e.slice(0, -1).every((l, s) => l === a[s]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - a[a.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function PE(e, a, r = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], h = d === l.length - 1, v = u === "/" ? a : a.slice(u.length) || "/", g = ic(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: h },
      v
    ), b = p.route;
    if (!g && h && r && !l[l.length - 1].route.index && (g = ic(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      v
    )), !g)
      return null;
    Object.assign(s, g.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: ua([u, g.pathname]),
      pathnameBase: e2(
        ua([u, g.pathnameBase])
      ),
      route: b
    }), g.pathnameBase !== "/" && (u = ua([u, g.pathnameBase]));
  }
  return c;
}
function ic(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, l] = QE(
    e.path,
    e.caseSensitive,
    e.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: l.reduce(
      (h, { paramName: v, isOptional: g }, b) => {
        if (v === "*") {
          let _ = d[b] || "";
          c = u.slice(0, u.length - _.length).replace(/(.)\/+$/, "$1");
        }
        const x = d[b];
        return g && !x ? h[v] = void 0 : h[v] = (x || "").replace(/%2F/g, "/"), h;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: e
  };
}
function QE(e, a = !1, r = !0) {
  It(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let l = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, d, p, h, v) => {
      if (l.push({ paramName: d, isOptional: p != null }), p) {
        let g = v.charAt(h + c.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (l.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function KE(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return It(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), e;
  }
}
function ca(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, l = e.charAt(r);
  return l && l !== "/" ? null : e.slice(r) || "/";
}
function JE({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : ua([e, a]);
}
var Rx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, cm = (e) => Rx.test(e);
function WE(e, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Na(e) : e, u;
  return r ? (r = dm(r), r.startsWith("/") ? u = ty(r.substring(1), "/") : u = ty(r, a)) : u = a, {
    pathname: u,
    search: t2(l),
    hash: n2(s)
  };
}
function ty(e, a) {
  let r = rc(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Wd(e, a, r, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Tx(e) {
  return e.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function fm(e) {
  let a = Tx(e);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function bc(e, a, r, l = !1) {
  let s;
  typeof e == "string" ? s = Na(e) : (s = { ...e }, Fe(
    !s.pathname || !s.pathname.includes("?"),
    Wd("?", "pathname", "search", s)
  ), Fe(
    !s.pathname || !s.pathname.includes("#"),
    Wd("#", "pathname", "hash", s)
  ), Fe(
    !s.search || !s.search.includes("#"),
    Wd("#", "search", "hash", s)
  ));
  let u = e === "" || s.pathname === "", c = u ? "/" : s.pathname, d;
  if (c == null)
    d = r;
  else {
    let g = a.length - 1;
    if (!l && c.startsWith("..")) {
      let b = c.split("/");
      for (; b[0] === ".."; )
        b.shift(), g -= 1;
      s.pathname = b.join("/");
    }
    d = g >= 0 ? a[g] : "/";
  }
  let p = WE(s, d), h = c && c !== "/" && c.endsWith("/"), v = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (h || v) && (p.pathname += "/"), p;
}
var dm = (e) => e.replace(/\/\/+/g, "/"), ua = (e) => dm(e.join("/")), rc = (e) => e.replace(/\/+$/, ""), e2 = (e) => rc(e).replace(/^\/*/, "/"), t2 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, n2 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, ny = (e, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", e), new Response(null, { ...r, headers: l });
}, xc = class {
  constructor(e, a, r, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Yo(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function as(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return ua(a) || "/";
}
var Mx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Ax(e, a) {
  let r = e;
  if (typeof r != "string" || !Rx.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (Mx)
    try {
      let u = new URL(window.location.href), c = r.startsWith("//") ? new URL(u.protocol + r) : new URL(r), d = ca(c.pathname, a);
      c.origin === u.origin && d != null ? r = d + c.search + c.hash : s = !0;
    } catch {
      It(
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
var Qi = Symbol("Uninstrumented");
function a2(e, a) {
  let r = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  e.forEach(
    (s) => s({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(u) {
        let c = Object.keys(r);
        for (let d of c)
          u[d] && r[d].push(u[d]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let s = xl(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = r[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = xl(d, c, () => {
        });
        p && (l.lazy = Object.assign(l.lazy || {}, {
          [u]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && r[s].length > 0) {
      let c = u[Qi] ?? u, d = xl(
        r[s],
        c,
        (...p) => ay(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[Qi] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Qi] ?? s, c = xl(
      r.middleware,
      u,
      (...d) => ay(d[0])
    );
    return c ? (c[Qi] = u, c) : s;
  })), l;
}
function i2(e, a) {
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
    let l = e.navigate[Qi] ?? e.navigate, s = xl(
      r.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? $a(c) : ".",
          ...iy(e, d ?? {})
        };
      }
    );
    s && (s[Qi] = l, e.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = e.fetch[Qi] ?? e.fetch, s = xl(r.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...iy(e, p ?? {})
      };
    });
    s && (s[Qi] = l, e.fetch = s);
  }
  return e;
}
function xl(e, a, r) {
  return e.length === 0 ? null : async (...l) => {
    let s = await Dx(
      e,
      r(...l),
      () => a(...l),
      e.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function Dx(e, a, r, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Dx(e, a, r, l - 1), u = await c, Fe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(d, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    c || await d(), await c;
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
function ay(e) {
  let { request: a, context: r, params: l, pattern: s } = e;
  return {
    request: r2(a),
    params: { ...l },
    pattern: s,
    context: l2(r)
  };
}
function iy(e, a) {
  return {
    currentUrl: $a(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function r2(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function l2(e) {
  if (s2(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var o2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function s2(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === o2;
}
var jx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], u2 = new Set(
  jx
), c2 = [
  "GET",
  ...jx
], f2 = new Set(c2), Ox = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), d2 = /* @__PURE__ */ new Set([307, 308]), eh = {
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
}, h2 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, To = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, m2 = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), zx = "remix-router-transitions", Lx = Symbol("ResetLoaderData"), wr, gl, Fi, vl, p2 = class {
  constructor(e) {
    Lo(this, wr), Lo(this, gl), Lo(this, Fi), Lo(this, vl), Oa(this, wr, e), Oa(this, gl, Fu(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return oa(this, wr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return oa(this, Fi) ?? oa(this, wr);
  }
  /** Pre-computed branches */
  get branches() {
    return oa(this, vl) ?? oa(this, gl);
  }
  get hasHMRRoutes() {
    return oa(this, Fi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Oa(this, wr, e), Oa(this, gl, Fu(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Oa(this, Fi, e), Oa(this, vl, Fu(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    oa(this, Fi) && (Oa(this, wr, oa(this, Fi)), Oa(this, gl, oa(this, vl)), Oa(this, Fi, void 0), Oa(this, vl, void 0));
  }
};
wr = /* @__PURE__ */ new WeakMap();
gl = /* @__PURE__ */ new WeakMap();
Fi = /* @__PURE__ */ new WeakMap();
vl = /* @__PURE__ */ new WeakMap();
function g2(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Fe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || m2, u = s;
  if (e.instrumentations) {
    let B = e.instrumentations;
    u = (Z) => ({
      ...s(Z),
      ...a2(
        B.map((W) => W.route).filter(Boolean),
        Z
      )
    });
  }
  let c = {}, d = new p2(
    Io(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let h = e.dataStrategy || w2, v = {
    ...e.future
  }, g = null, b = /* @__PURE__ */ new Set(), x = null, _ = null, R = null, N = null, C = e.hydrationData != null, D = ba(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), E = !1, O = null, k, H;
  if (D == null && !e.patchRoutesOnNavigation) {
    let B = sa(404, {
      pathname: e.history.location.pathname
    }), { matches: Z, route: W } = Su(d.activeRoutes);
    k = !0, H = !k, D = Z, O = { [W.id]: B };
  } else if (D && !e.hydrationData && gn(
    D,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (D = null), D)
    if (D.some((B) => B.route.lazy))
      k = !1, H = !k;
    else if (!D.some((B) => hm(B.route)))
      k = !0, H = !k;
    else {
      let B = e.hydrationData ? e.hydrationData.loaderData : null, Z = e.hydrationData ? e.hydrationData.errors : null, W = D;
      if (Z) {
        let pe = D.findIndex(
          (ge) => Z[ge.route.id] !== void 0
        );
        W = W.slice(0, pe + 1);
      }
      H = !1, k = !0, W.forEach((pe) => {
        let ge = kx(pe.route, B, Z);
        H = H || ge.renderFallback, k = k && !ge.shouldLoad;
      });
    }
  else {
    k = !1, H = !k, D = [];
    let B = gn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    B.active && B.matches && (E = !0, D = B.matches);
  }
  let V, A = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: D,
    initialized: k,
    renderFallback: H,
    navigation: eh,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", ne = null, $ = !1, K, oe = !1, z = /* @__PURE__ */ new Map(), Y = null, T = !1, L = !1, F = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), te = 0, j = -1, U = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Map(), ce = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), P, me = null;
  function _e() {
    if (g = e.history.listen(
      ({ action: B, location: Z, delta: W }) => {
        if (P) {
          P(), P = void 0;
          return;
        }
        It(
          se.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let pe = Qn({
          currentLocation: A.location,
          nextLocation: Z,
          historyAction: B
        });
        if (pe && W != null) {
          let ge = new Promise((Ee) => {
            P = Ee;
          });
          e.history.go(W * -1), kn(pe, {
            state: "blocked",
            location: Z,
            proceed() {
              kn(pe, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Z
              }), ge.then(() => e.history.go(W));
            },
            reset() {
              let Ee = new Map(A.blockers);
              Ee.set(pe, To), xe({ blockers: Ee });
            }
          }), ne?.resolve(), ne = null;
          return;
        }
        return Me(B, Z);
      }
    ), r) {
      U2(a, z);
      let B = () => V2(a, z);
      a.addEventListener("pagehide", B), Y = () => a.removeEventListener("pagehide", B);
    }
    return A.initialized || Me("POP", A.location, {
      initialHydration: !0
    }), V;
  }
  function Te() {
    g && g(), Y && Y(), b.clear(), K && K.abort(), A.fetchers.forEach((B, Z) => nn(A.fetchers, Z)), A.blockers.forEach((B, Z) => da(Z));
  }
  function Se(B) {
    if (b.add(B), x) {
      let { newErrors: Z } = x;
      x = null, B(A, {
        deletedFetchers: [],
        newErrors: Z,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => b.delete(B);
  }
  function xe(B, Z = {}) {
    B.matches && (B.matches = B.matches.map((ge) => {
      let Ee = c[ge.route.id], ye = ge.route;
      return ye.element !== Ee.element || ye.errorElement !== Ee.errorElement || ye.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...ge,
        route: Ee
      } : ge;
    })), A = {
      ...A,
      ...B
    };
    let W = [], pe = [];
    A.fetchers.forEach((ge, Ee) => {
      ge.state === "idle" && (ae.has(Ee) ? W.push(Ee) : pe.push(Ee));
    }), ae.forEach((ge) => {
      !A.fetchers.has(ge) && !G.has(ge) && W.push(ge);
    }), b.size === 0 && (x = { newErrors: B.errors ?? null }), [...b].forEach(
      (ge) => ge(A, {
        deletedFetchers: W,
        newErrors: B.errors ?? null,
        viewTransitionOpts: Z.viewTransitionOpts,
        flushSync: Z.flushSync === !0
      })
    ), W.forEach((ge) => nn(A.fetchers, ge)), pe.forEach((ge) => A.fetchers.delete(ge));
  }
  function Re(B, Z, { flushSync: W } = {}) {
    let pe = A.actionData != null && A.navigation.formMethod != null && hn(A.navigation.formMethod) && A.navigation.state === "loading" && B.state?._isRedirect !== !0, ge;
    Z.actionData ? Object.keys(Z.actionData).length > 0 ? ge = Z.actionData : ge = null : pe ? ge = A.actionData : ge = null;
    let Ee = Z.loaderData ? py(
      A.loaderData,
      Z.loaderData,
      Z.matches || [],
      Z.errors
    ) : A.loaderData, ye = A.blockers;
    ye.size > 0 && (ye = new Map(ye), ye.forEach((De, Ue) => ye.set(Ue, To)));
    let we = T ? !1 : Vt(B, Z.matches || A.matches), be = $ === !0 || A.navigation.formMethod != null && hn(A.navigation.formMethod) && B.state?._isRedirect !== !0;
    d.commitHmrRoutes(), T || I === "POP" || (I === "PUSH" ? e.history.push(B, B.state) : I === "REPLACE" && e.history.replace(B, B.state));
    let Ae;
    if (I === "POP") {
      let De = z.get(A.location.pathname);
      De && De.has(B.pathname) ? Ae = {
        currentLocation: A.location,
        nextLocation: B
      } : z.has(B.pathname) && (Ae = {
        currentLocation: B,
        nextLocation: A.location
      });
    } else if (oe) {
      let De = z.get(A.location.pathname);
      De ? De.add(B.pathname) : (De = /* @__PURE__ */ new Set([B.pathname]), z.set(A.location.pathname, De)), Ae = {
        currentLocation: A.location,
        nextLocation: B
      };
    }
    xe(
      {
        ...Z,
        // matches, errors, fetchers go through as-is
        actionData: ge,
        loaderData: Ee,
        historyAction: I,
        location: B,
        initialized: !0,
        renderFallback: !1,
        navigation: eh,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: be,
        blockers: ye
      },
      {
        viewTransitionOpts: Ae,
        flushSync: W === !0
      }
    ), I = "POP", $ = !1, oe = !1, T = !1, L = !1, ne?.resolve(), ne = null, me?.resolve(), me = null;
  }
  async function $e(B, Z) {
    if (ne?.resolve(), ne = null, typeof B == "number") {
      ne || (ne = by());
      let rt = ne.promise;
      return e.history.go(B), rt;
    }
    let W = jh(
      A.location,
      A.matches,
      p,
      B,
      Z?.fromRouteId,
      Z?.relative
    ), { path: pe, submission: ge, error: Ee } = ry(
      !1,
      W,
      Z
    ), ye;
    Z?.mask && (ye = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Z.mask == "string" ? Na(Z.mask) : {
        ...A.location.mask,
        ...Z.mask
      }
    });
    let we = A.location, be = Dh(
      we,
      pe,
      Z && Z.state,
      void 0,
      ye
    );
    be = {
      ...be,
      ...e.history.encodeLocation(be)
    };
    let Ae = Z && Z.replace != null ? Z.replace : void 0, De = "PUSH";
    Ae === !0 ? De = "REPLACE" : Ae === !1 || ge != null && hn(ge.formMethod) && ge.formAction === A.location.pathname + A.location.search && (De = "REPLACE");
    let Ue = Z && "preventScrollReset" in Z ? Z.preventScrollReset === !0 : void 0, ze = (Z && Z.flushSync) === !0, Ge = Qn({
      currentLocation: we,
      nextLocation: be,
      historyAction: De
    });
    if (Ge) {
      kn(Ge, {
        state: "blocked",
        location: be,
        proceed() {
          kn(Ge, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), $e(B, Z);
        },
        reset() {
          let rt = new Map(A.blockers);
          rt.set(Ge, To), xe({ blockers: rt });
        }
      });
      return;
    }
    await Me(De, be, {
      submission: ge,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: Ue,
      replace: Z && Z.replace,
      enableViewTransition: Z && Z.viewTransition,
      flushSync: ze,
      callSiteDefaultShouldRevalidate: Z && Z.defaultShouldRevalidate
    });
  }
  function ft() {
    me || (me = by()), Lt(), xe({ revalidation: "loading" });
    let B = me.promise;
    return A.navigation.state === "submitting" ? B : A.navigation.state === "idle" ? (Me(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), B) : (Me(
      I || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: oe === !0
      }
    ), B);
  }
  async function Me(B, Z, W) {
    K && K.abort(), K = null, I = B, T = (W && W.startUninterruptedRevalidation) === !0, kt(A.location, A.matches), $ = (W && W.preventScrollReset) === !0, oe = (W && W.enableViewTransition) === !0;
    let pe = d.activeRoutes, ge = W?.initialHydration && A.matches && A.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : ba(
      pe,
      Z,
      p,
      !1,
      d.branches
    ), Ee = (W && W.flushSync) === !0;
    if (ge && A.initialized && !L && M2(A.location, Z) && !(W && W.submission && hn(W.submission.formMethod))) {
      Re(Z, { matches: ge }, { flushSync: Ee });
      return;
    }
    let ye = gn(ge, pe, Z.pathname);
    if (ye.active && ye.matches && (ge = ye.matches), !ge) {
      let { error: st, notFoundMatches: We, route: zt } = cn(
        Z.pathname
      );
      Re(
        Z,
        {
          matches: We,
          loaderData: {},
          errors: {
            [zt.id]: st
          }
        },
        { flushSync: Ee }
      );
      return;
    }
    let we = W && W.overrideNavigation ? {
      ...W.overrideNavigation,
      matches: ge,
      historyAction: B
    } : void 0;
    K = new AbortController();
    let be = yl(
      e.history,
      Z,
      K.signal,
      W && W.submission
    ), Ae = e.getContext ? await e.getContext() : new Jv(), De;
    if (W && W.pendingError)
      De = [
        Zi(ge).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && hn(W.submission.formMethod)) {
      let st = await Xe(
        be,
        Z,
        W.submission,
        ge,
        B,
        Ae,
        ye.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, zt] = st.pendingActionResult;
        if (Xn(zt) && Yo(zt.error) && zt.error.status === 404) {
          K = null, Re(Z, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [We]: zt.error
            }
          });
          return;
        }
      }
      ge = st.matches || ge, De = st.pendingActionResult, we = th(
        Z,
        ge,
        B,
        W.submission
      ), Ee = !1, ye.active = !1, be = yl(
        e.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: Ue,
      matches: ze,
      loaderData: Ge,
      errors: rt,
      workingFetchers: Ct
    } = await He(
      be,
      Z,
      ge,
      B,
      Ae,
      ye.active,
      we,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ee,
      De,
      W && W.callSiteDefaultShouldRevalidate
    );
    Ue || (K = null, Re(Z, {
      matches: ze || ge,
      ...gy(De),
      loaderData: Ge,
      errors: rt,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function Xe(B, Z, W, pe, ge, Ee, ye, we, be = {}) {
    Lt();
    let Ae = H2(
      Z,
      pe,
      ge,
      W
    );
    if (xe({ navigation: Ae }, { flushSync: be.flushSync === !0 }), ye) {
      let ze = await pt(
        pe,
        Z.pathname,
        B.signal
      );
      if (ze.type === "aborted")
        return { shortCircuited: !0 };
      if (ze.type === "error") {
        if (ze.partialMatches.length === 0) {
          let { matches: rt, route: Ct } = Su(
            d.activeRoutes
          );
          return {
            matches: rt,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: ze.error
              }
            ]
          };
        }
        let Ge = Zi(ze.partialMatches).route.id;
        return {
          matches: ze.partialMatches,
          pendingActionResult: [
            Ge,
            {
              type: "error",
              error: ze.error
            }
          ]
        };
      } else if (ze.matches)
        pe = ze.matches;
      else {
        let { notFoundMatches: Ge, error: rt, route: Ct } = cn(
          Z.pathname
        );
        return {
          matches: Ge,
          pendingActionResult: [
            Ct.id,
            {
              type: "error",
              error: rt
            }
          ]
        };
      }
    }
    let De, Ue = Zu(pe, Z);
    if (!Ue.route.action && !Ue.route.lazy)
      De = {
        type: "error",
        error: sa(405, {
          method: B.method,
          pathname: Z.pathname,
          routeId: Ue.route.id
        })
      };
    else {
      let ze = Sl(
        u,
        c,
        B,
        Z,
        pe,
        Ue,
        we ? [] : l,
        Ee
      ), Ge = await vt(
        B,
        Z,
        ze,
        Ee,
        null
      );
      if (De = Ge[Ue.route.id], !De) {
        for (let rt of pe)
          if (Ge[rt.route.id]) {
            De = Ge[rt.route.id];
            break;
          }
      }
      if (B.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Sr(De)) {
      let ze;
      return be && be.replace != null ? ze = be.replace : ze = dy(
        De.response.headers.get("Location"),
        new URL(B.url),
        p,
        e.history
      ) === A.location.pathname + A.location.search, await gt(B, De, !0, {
        submission: W,
        replace: ze
      }), { shortCircuited: !0 };
    }
    if (Xn(De)) {
      let ze = Zi(pe, Ue.route.id);
      return (be && be.replace) !== !0 && (I = "PUSH"), {
        matches: pe,
        pendingActionResult: [
          ze.route.id,
          De,
          Ue.route.id
        ]
      };
    }
    return {
      matches: pe,
      pendingActionResult: [Ue.route.id, De]
    };
  }
  async function He(B, Z, W, pe, ge, Ee, ye, we, be, Ae, De, Ue, ze, Ge) {
    let rt = ye || th(Z, W, pe, we), Ct = we || be || yy(rt), st = !T && !De;
    if (Ee) {
      if (st) {
        let bt = Ie(ze);
        xe(
          {
            navigation: rt,
            ...bt !== void 0 ? { actionData: bt } : {}
          },
          {
            flushSync: Ue
          }
        );
      }
      let Be = await pt(
        W,
        Z.pathname,
        B.signal
      );
      if (Be.type === "aborted")
        return { shortCircuited: !0 };
      if (Be.type === "error") {
        if (Be.partialMatches.length === 0) {
          let { matches: vn, route: Bn } = Su(
            d.activeRoutes
          );
          return {
            matches: vn,
            loaderData: {},
            errors: {
              [Bn.id]: Be.error
            }
          };
        }
        let bt = Zi(Be.partialMatches).route.id;
        return {
          matches: Be.partialMatches,
          loaderData: {},
          errors: {
            [bt]: Be.error
          }
        };
      } else if (Be.matches)
        W = Be.matches;
      else {
        let { error: bt, notFoundMatches: vn, route: Bn } = cn(
          Z.pathname
        );
        return {
          matches: vn,
          loaderData: {},
          errors: {
            [Bn.id]: bt
          }
        };
      }
    }
    let We = d.activeRoutes, { dsMatches: zt, revalidatingFetchers: at } = ly(
      B,
      ge,
      u,
      c,
      e.history,
      A,
      W,
      Ct,
      Z,
      De ? [] : l,
      De === !0,
      L,
      F,
      ae,
      ee,
      Q,
      We,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      ze,
      Ge
    );
    if (j = ++te, !e.dataStrategy && !zt.some((Be) => Be.shouldLoad) && !zt.some(
      (Be) => Be.route.middleware && Be.route.middleware.length > 0
    ) && at.length === 0) {
      let Be = new Map(A.fetchers), bt = vi(Be);
      return Re(
        Z,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: ze && Xn(ze[1]) ? { [ze[0]]: ze[1].error } : null,
          ...gy(ze),
          ...bt ? { fetchers: Be } : {}
        },
        { flushSync: Ue }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let Be = {};
      if (!Ee) {
        Be.navigation = rt;
        let bt = Ie(ze);
        bt !== void 0 && (Be.actionData = bt);
      }
      at.length > 0 && (Be.fetchers = _t(at)), xe(Be, { flushSync: Ue });
    }
    at.forEach((Be) => {
      Ot(Be.key), Be.controller && G.set(Be.key, Be.controller);
    });
    let Ta = () => at.forEach((Be) => Ot(Be.key));
    K && K.signal.addEventListener(
      "abort",
      Ta
    );
    let { loaderResults: Hn, fetcherResults: fn } = await Yt(
      zt,
      at,
      B,
      Z,
      ge
    );
    if (B.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      Ta
    ), at.forEach((Be) => G.delete(Be.key));
    let an = Eu(Hn);
    if (an)
      return await gt(B, an.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    if (an = Eu(fn), an)
      return Q.add(an.key), await gt(B, an.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    let En = new Map(A.fetchers), { loaderData: yi, errors: Nn } = my(
      A,
      W,
      Hn,
      ze,
      at,
      fn,
      En
    );
    De && A.errors && (Nn = { ...A.errors, ...Nn });
    let bi = vi(En), ma = Ra(
      j,
      En
    ), pa = bi || ma || at.length > 0;
    return {
      matches: W,
      loaderData: yi,
      errors: Nn,
      ...pa ? { workingFetchers: En } : {}
    };
  }
  function Ie(B) {
    if (B && !Xn(B[1]))
      return {
        [B[0]]: B[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function _t(B) {
    let Z = new Map(A.fetchers);
    return B.forEach((W) => {
      let pe = Z.get(W.key), ge = Mo(
        void 0,
        pe ? pe.data : void 0
      );
      Z.set(W.key, ge);
    }), Z;
  }
  async function Je(B, Z, W, pe) {
    Ot(B);
    let ge = (pe && pe.flushSync) === !0, Ee = d.activeRoutes, ye = jh(
      A.location,
      A.matches,
      p,
      W,
      Z,
      pe?.relative
    ), we = ba(
      Ee,
      ye,
      p,
      !1,
      d.branches
    ), be = gn(we, Ee, ye);
    if (be.active && be.matches && (we = be.matches), !we) {
      ot(
        B,
        Z,
        sa(404, { pathname: ye }),
        { flushSync: ge }
      );
      return;
    }
    let { path: Ae, submission: De, error: Ue } = ry(
      !0,
      ye,
      pe
    );
    if (Ue) {
      ot(B, Z, Ue, { flushSync: ge });
      return;
    }
    let ze = e.getContext ? await e.getContext() : new Jv(), Ge = (pe && pe.preventScrollReset) === !0;
    if (De && hn(De.formMethod)) {
      await Ze(
        B,
        Z,
        Ae,
        we,
        ze,
        be.active,
        ge,
        Ge,
        De,
        pe && pe.defaultShouldRevalidate
      );
      return;
    }
    ee.set(B, { routeId: Z, path: Ae }), await Pe(
      B,
      Z,
      Ae,
      we,
      ze,
      be.active,
      ge,
      Ge,
      De
    );
  }
  async function Ze(B, Z, W, pe, ge, Ee, ye, we, be, Ae) {
    Lt(), ee.delete(B);
    let De = A.fetchers.get(B);
    mt(B, B2(be, De), {
      flushSync: ye
    });
    let Ue = new AbortController(), ze = yl(
      e.history,
      W,
      Ue.signal,
      be
    );
    if (Ee) {
      let dt = await pt(
        pe,
        new URL(ze.url).pathname,
        ze.signal,
        B
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(B, Z, dt.error, { flushSync: ye });
        return;
      } else if (dt.matches)
        pe = dt.matches;
      else {
        ot(
          B,
          Z,
          sa(404, { pathname: W }),
          { flushSync: ye }
        );
        return;
      }
    }
    let Ge = Zu(pe, W);
    if (!Ge.route.action && !Ge.route.lazy) {
      let dt = sa(405, {
        method: be.formMethod,
        pathname: W,
        routeId: Z
      });
      ot(B, Z, dt, { flushSync: ye });
      return;
    }
    G.set(B, Ue);
    let rt = te, Ct = Sl(
      u,
      c,
      ze,
      W,
      pe,
      Ge,
      l,
      ge
    ), st = await vt(
      ze,
      W,
      Ct,
      ge,
      B
    ), We = st[Ge.route.id];
    if (!We) {
      for (let dt of Ct)
        if (st[dt.route.id]) {
          We = st[dt.route.id];
          break;
        }
    }
    if (ze.signal.aborted) {
      G.get(B) === Ue && G.delete(B);
      return;
    }
    if (ae.has(B)) {
      if (Sr(We) || Xn(We)) {
        mt(B, La(void 0));
        return;
      }
    } else {
      if (Sr(We))
        if (G.delete(B), j > rt) {
          mt(B, La(void 0));
          return;
        } else
          return Q.add(B), mt(B, Mo(be)), gt(ze, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: we
          });
      if (Xn(We)) {
        ot(B, Z, We.error);
        return;
      }
    }
    let zt = A.navigation.location || A.location, at = yl(
      e.history,
      zt,
      Ue.signal
    ), Ta = d.activeRoutes, Hn = A.navigation.state !== "idle" ? ba(
      Ta,
      A.navigation.location,
      p,
      !1,
      d.branches
    ) : A.matches;
    Fe(Hn, "Didn't find any matches after fetcher action");
    let fn = ++te;
    U.set(B, fn);
    let { dsMatches: an, revalidatingFetchers: En } = ly(
      at,
      ge,
      u,
      c,
      e.history,
      A,
      Hn,
      be,
      zt,
      l,
      !1,
      L,
      F,
      ae,
      ee,
      Q,
      Ta,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Ge.route.id, We],
      Ae
    ), yi = Mo(be, We.data), Nn = new Map(A.fetchers);
    Nn.set(B, yi), En.filter((dt) => dt.key !== B).forEach((dt) => {
      let Kn = dt.key, rn = Nn.get(Kn), tr = Mo(
        void 0,
        rn ? rn.data : void 0
      );
      Nn.set(Kn, tr), Ot(Kn), dt.controller && G.set(Kn, dt.controller);
    }), xe({ fetchers: Nn });
    let bi = () => En.forEach((dt) => Ot(dt.key));
    Ue.signal.addEventListener(
      "abort",
      bi
    );
    let { loaderResults: ma, fetcherResults: pa } = await Yt(
      an,
      En,
      at,
      zt,
      ge
    );
    if (Ue.signal.aborted)
      return;
    Ue.signal.removeEventListener(
      "abort",
      bi
    ), U.delete(B), G.delete(B), En.forEach((dt) => G.delete(dt.key));
    let Be = A.fetchers.has(B), bt = (dt) => {
      if (!Be) return dt;
      let Kn = new Map(dt.fetchers);
      return Kn.set(B, La(We.data)), { ...dt, fetchers: Kn };
    }, vn = Eu(ma);
    if (vn)
      return A = bt(A), gt(
        at,
        vn.result,
        !1,
        { preventScrollReset: we }
      );
    if (vn = Eu(pa), vn)
      return Q.add(vn.key), A = bt(A), gt(
        at,
        vn.result,
        !1,
        { preventScrollReset: we }
      );
    let Bn = new Map(A.fetchers);
    Be && Bn.set(B, La(We.data));
    let { loaderData: xi, errors: Ga } = my(
      A,
      Hn,
      ma,
      void 0,
      En,
      pa,
      Bn
    );
    Ra(fn, Bn), A.navigation.state === "loading" && fn > j ? (Fe(I, "Expected pending action"), K && K.abort(), Re(A.navigation.location, {
      matches: Hn,
      loaderData: xi,
      errors: Ga,
      fetchers: Bn
    })) : (xe({
      errors: Ga,
      loaderData: py(
        A.loaderData,
        xi,
        Hn,
        Ga
      ),
      fetchers: Bn
    }), L = !1);
  }
  async function Pe(B, Z, W, pe, ge, Ee, ye, we, be) {
    let Ae = A.fetchers.get(B);
    mt(
      B,
      Mo(
        be,
        Ae ? Ae.data : void 0
      ),
      { flushSync: ye }
    );
    let De = new AbortController(), Ue = yl(
      e.history,
      W,
      De.signal
    );
    if (Ee) {
      let We = await pt(
        pe,
        new URL(Ue.url).pathname,
        Ue.signal,
        B
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        ot(B, Z, We.error, { flushSync: ye });
        return;
      } else if (We.matches)
        pe = We.matches;
      else {
        ot(
          B,
          Z,
          sa(404, { pathname: W }),
          { flushSync: ye }
        );
        return;
      }
    }
    let ze = Zu(pe, W);
    G.set(B, De);
    let Ge = te, rt = Sl(
      u,
      c,
      Ue,
      W,
      pe,
      ze,
      l,
      ge
    ), Ct = await vt(
      Ue,
      W,
      rt,
      ge,
      B
    ), st = Ct[ze.route.id];
    if (!st) {
      for (let We of pe)
        if (Ct[We.route.id]) {
          st = Ct[We.route.id];
          break;
        }
    }
    if (G.get(B) === De && G.delete(B), !Ue.signal.aborted) {
      if (ae.has(B)) {
        mt(B, La(void 0));
        return;
      }
      if (Sr(st))
        if (j > Ge) {
          mt(B, La(void 0));
          return;
        } else {
          Q.add(B), await gt(Ue, st, !1, {
            preventScrollReset: we
          });
          return;
        }
      if (Xn(st)) {
        ot(B, Z, st.error);
        return;
      }
      mt(B, La(st.data));
    }
  }
  async function gt(B, Z, W, {
    submission: pe,
    fetcherSubmission: ge,
    preventScrollReset: Ee,
    replace: ye
  } = {}) {
    W || (ne?.resolve(), ne = null), Z.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let we = Z.response.headers.get("Location");
    Fe(we, "Expected a Location header on the redirect Response"), we = dy(
      we,
      new URL(B.url),
      p,
      e.history
    );
    let be = Dh(A.location, we, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Z.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (cm(we)) {
        const Ct = OE(a, we, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        ca(Ct.pathname, p) == null;
      }
      if (rt) {
        ye ? a.location.replace(we) : a.location.assign(we);
        return;
      }
    }
    K = null;
    let Ae = ye === !0 || Z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: Ue, formEncType: ze } = A.navigation;
    !pe && !ge && De && Ue && ze && (pe = yy(A.navigation));
    let Ge = pe || ge;
    if (d2.has(Z.response.status) && Ge && hn(Ge.formMethod))
      await Me(Ae, be, {
        submission: {
          ...Ge,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? oe : void 0
      });
    else {
      let rt = th(
        be,
        [],
        Ae,
        pe
      );
      await Me(Ae, be, {
        overrideNavigation: rt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ge,
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? oe : void 0
      });
    }
  }
  async function vt(B, Z, W, pe, ge) {
    let Ee, ye = {};
    try {
      Ee = await S2(
        h,
        B,
        Z,
        W,
        ge,
        pe,
        !1
      );
    } catch (we) {
      return W.filter((be) => be.shouldLoad).forEach((be) => {
        ye[be.route.id] = {
          type: "error",
          error: we
        };
      }), ye;
    }
    if (B.signal.aborted)
      return ye;
    if (!hn(B.method))
      for (let we of W) {
        if (Ee[we.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(we.route.id) && !A.loaderData.hasOwnProperty(we.route.id) && (!A.errors || !A.errors.hasOwnProperty(we.route.id)) && we.shouldCallHandler() && (Ee[we.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${we.route.id}`
          )
        });
      }
    for (let [we, be] of Object.entries(Ee))
      if (O2(be)) {
        let Ae = be.result;
        ye[we] = {
          type: "redirect",
          response: R2(
            Ae,
            B,
            we,
            W,
            p
          )
        };
      } else
        ye[we] = await C2(be);
    return ye;
  }
  async function Yt(B, Z, W, pe, ge) {
    let Ee = vt(
      W,
      pe,
      B,
      ge,
      null
    ), ye = Promise.all(
      Z.map(async (Ae) => {
        if (Ae.matches && Ae.match && Ae.request && Ae.controller) {
          let Ue = (await vt(
            Ae.request,
            Ae.path,
            Ae.matches,
            ge,
            Ae.key
          ))[Ae.match.route.id];
          return { [Ae.key]: Ue };
        } else
          return Promise.resolve({
            [Ae.key]: {
              type: "error",
              error: sa(404, {
                pathname: Ae.path
              })
            }
          });
      })
    ), we = await Ee, be = (await ye).reduce(
      (Ae, De) => Object.assign(Ae, De),
      {}
    );
    return {
      loaderResults: we,
      fetcherResults: be
    };
  }
  function Lt() {
    L = !0, ee.forEach((B, Z) => {
      G.has(Z) && F.add(Z), Ot(Z);
    });
  }
  function mt(B, Z, W = {}) {
    let pe = new Map(A.fetchers);
    pe.set(B, Z), xe(
      { fetchers: pe },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function ot(B, Z, W, pe = {}) {
    let ge = Zi(A.matches, Z), Ee = new Map(A.fetchers);
    nn(Ee, B), xe(
      {
        errors: {
          [ge.route.id]: W
        },
        fetchers: Ee
      },
      { flushSync: (pe && pe.flushSync) === !0 }
    );
  }
  function Pn(B) {
    return ce.set(B, (ce.get(B) || 0) + 1), ae.has(B) && ae.delete(B), A.fetchers.get(B) || h2;
  }
  function _n(B, Z) {
    Ot(B, Z?.reason), mt(B, La(null));
  }
  function nn(B, Z) {
    let W = A.fetchers.get(Z);
    G.has(Z) && !(W && W.state === "loading" && U.has(Z)) && Ot(Z), ee.delete(Z), U.delete(Z), Q.delete(Z), ae.delete(Z), F.delete(Z), B.delete(Z);
  }
  function Kt(B) {
    let Z = (ce.get(B) || 0) - 1;
    Z <= 0 ? (ce.delete(B), ae.add(B)) : ce.set(B, Z), xe({ fetchers: new Map(A.fetchers) });
  }
  function Ot(B, Z) {
    let W = G.get(B);
    W && (W.abort(Z), G.delete(B));
  }
  function Ut(B, Z) {
    for (let W of B) {
      let pe = Z.get(W);
      Fe(pe, `Expected fetcher: ${W}`);
      let ge = La(pe.data);
      Z.set(W, ge);
    }
  }
  function vi(B) {
    let Z = [], W = !1;
    for (let pe of Q) {
      let ge = B.get(pe);
      Fe(ge, `Expected fetcher: ${pe}`), ge.state === "loading" && (Q.delete(pe), Z.push(pe), W = !0);
    }
    return Ut(Z, B), W;
  }
  function Ra(B, Z) {
    let W = [];
    for (let [pe, ge] of U)
      if (ge < B) {
        let Ee = Z.get(pe);
        Fe(Ee, `Expected fetcher: ${pe}`), Ee.state === "loading" && (Ot(pe), U.delete(pe), W.push(pe));
      }
    return Ut(W, Z), W.length > 0;
  }
  function Sn(B, Z) {
    let W = A.blockers.get(B) || To;
    return se.get(B) !== Z && se.set(B, Z), W;
  }
  function da(B) {
    A.blockers.delete(B), se.delete(B);
  }
  function kn(B, Z) {
    let W = A.blockers.get(B) || To;
    Fe(
      W.state === "unblocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "proceeding" || W.state === "blocked" && Z.state === "unblocked" || W.state === "proceeding" && Z.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${Z.state}`
    );
    let pe = new Map(A.blockers);
    pe.set(B, Z), xe({ blockers: pe });
  }
  function Qn({
    currentLocation: B,
    nextLocation: Z,
    historyAction: W
  }) {
    if (se.size === 0)
      return;
    se.size > 1 && It(!1, "A router only supports one blocker at a time");
    let pe = Array.from(se.entries()), [ge, Ee] = pe[pe.length - 1], ye = A.blockers.get(ge);
    if (!(ye && ye.state === "proceeding") && Ee({ currentLocation: B, nextLocation: Z, historyAction: W }))
      return ge;
  }
  function cn(B) {
    let Z = sa(404, { pathname: B }), W = d.activeRoutes, { matches: pe, route: ge } = Su(W);
    return { notFoundMatches: pe, route: ge, error: Z };
  }
  function ke(B, Z, W) {
    if (_ = B, N = Z, R = W || null, !C && A.navigation === eh) {
      C = !0;
      let pe = Vt(A.location, A.matches);
      pe != null && xe({ restoreScrollPosition: pe });
    }
    return () => {
      _ = null, N = null, R = null;
    };
  }
  function yt(B, Z) {
    return R && R(
      B,
      Z.map((pe) => UE(pe, A.loaderData))
    ) || B.key;
  }
  function kt(B, Z) {
    if (_ && N) {
      let W = yt(B, Z);
      _[W] = N();
    }
  }
  function Vt(B, Z) {
    if (_) {
      let W = yt(B, Z), pe = _[W];
      if (typeof pe == "number")
        return pe;
    }
    return null;
  }
  function gn(B, Z, W) {
    if (e.patchRoutesOnNavigation) {
      let pe = d.branches;
      if (B) {
        if (Object.keys(B[0].params).length > 0)
          return { active: !0, matches: ba(
            Z,
            W,
            p,
            !0,
            pe
          ) };
      } else
        return { active: !0, matches: ba(
          Z,
          W,
          p,
          !0,
          pe
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(B, Z, W, pe) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: B };
    let ge = B;
    for (; ; ) {
      let Ee = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: W,
          path: Z,
          matches: ge,
          fetcherKey: pe,
          patch: (Ae, De) => {
            W.aborted || oy(
              Ae,
              De,
              d,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Ae) {
        return { type: "error", error: Ae, partialMatches: ge };
      }
      if (W.aborted)
        return { type: "aborted" };
      let ye = d.branches, we = ba(
        d.activeRoutes,
        Z,
        p,
        !1,
        ye
      ), be = null;
      if (we) {
        if (Object.keys(we[0].params).length === 0)
          return { type: "success", matches: we };
        if (be = ba(
          d.activeRoutes,
          Z,
          p,
          !0,
          ye
        ), !(be && ge.length < be.length && Jt(
          ge,
          be.slice(0, ge.length)
        )))
          return { type: "success", matches: we };
      }
      if (be || (be = ba(
        d.activeRoutes,
        Z,
        p,
        !0,
        ye
      )), !be || Jt(ge, be))
        return { type: "success", matches: null };
      ge = be;
    }
  }
  function Jt(B, Z) {
    return B.length === Z.length && B.every((W, pe) => W.route.id === Z[pe].route.id);
  }
  function ha(B) {
    c = {}, d.setHmrRoutes(
      Io(
        B,
        u,
        void 0,
        c
      )
    );
  }
  function en(B, Z, W = !1) {
    oy(
      B,
      Z,
      d,
      c,
      u,
      W
    ), d.hasHMRRoutes || xe({});
  }
  return V = {
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
      return d.stableRoutes;
    },
    get branches() {
      return d.branches;
    },
    get manifest() {
      return c;
    },
    get window() {
      return a;
    },
    initialize: _e,
    subscribe: Se,
    enableScrollRestoration: ke,
    navigate: $e,
    fetch: Je,
    revalidate: ft,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (B) => e.history.createHref(B),
    encodeLocation: (B) => e.history.encodeLocation(B),
    getFetcher: Pn,
    resetFetcher: _n,
    deleteFetcher: Kt,
    dispose: Te,
    getBlocker: Sn,
    deleteBlocker: da,
    patchRoutes: en,
    _internalFetchControllers: G,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ha,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(B) {
      xe(B);
    }
  }, e.instrumentations && (V = i2(
    V,
    e.instrumentations.map((B) => B.router).filter(Boolean)
  )), V;
}
function v2(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function jh(e, a, r, l, s, u) {
  let c, d;
  if (s) {
    c = [];
    for (let h of a)
      if (c.push(h), h.route.id === s) {
        d = h;
        break;
      }
  } else
    c = a, d = a[a.length - 1];
  let p = bc(
    l || ".",
    fm(c),
    ca(e.pathname, r) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let h = pm(p.search);
    if (d.route.index && !h)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && h) {
      let v = new URLSearchParams(p.search), g = v.getAll("index");
      v.delete("index"), g.filter((x) => x).forEach((x) => v.append("index", x));
      let b = v.toString();
      p.search = b ? `?${b}` : "";
    }
  }
  return r !== "/" && (p.pathname = JE({ basename: r, pathname: p.pathname })), $a(p);
}
function ry(e, a, r) {
  if (!r || !v2(r))
    return { path: a };
  if (r.formMethod && !k2(r.formMethod))
    return {
      path: a,
      error: sa(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: sa(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = Ix(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!hn(u))
        return l();
      let g = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (b, [x, _]) => `${b}${x}=${_}
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
          text: g
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!hn(u))
        return l();
      try {
        let g = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: r.formEncType,
            formData: void 0,
            json: g,
            text: void 0
          }
        };
      } catch {
        return l();
      }
    }
  }
  Fe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let d, p;
  if (r.formData)
    d = zh(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    d = zh(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    d = r.body, p = hy(d);
  else if (r.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(r.body), p = hy(d);
    } catch {
      return l();
    }
  let h = {
    formMethod: u,
    formAction: c,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (hn(h.formMethod))
    return { path: a, submission: h };
  let v = Na(a);
  return e && v.search && pm(v.search) && d.append("index", ""), v.search = `?${d}`, { path: $a(v), submission: h };
}
function ly(e, a, r, l, s, u, c, d, p, h, v, g, b, x, _, R, N, C, D, E, O, k) {
  let H = O ? Xn(O[1]) ? O[1].error : O[1].data : void 0, V = s.createURL(u.location), A = s.createURL(p), I;
  if (v && u.errors) {
    let T = Object.keys(u.errors)[0];
    I = c.findIndex((L) => L.route.id === T);
  } else if (O && Xn(O[1])) {
    let T = O[0];
    I = c.findIndex((L) => L.route.id === T) - 1;
  }
  let ne = O ? O[1].statusCode : void 0, $ = ne && ne >= 400, K = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...d,
    actionResult: H,
    actionStatus: ne
  }, oe = as(c), z = c.map((T, L) => {
    let { route: F } = T, G = null;
    if (I != null && L > I)
      G = !1;
    else if (F.lazy)
      G = !0;
    else if (!hm(F))
      G = !1;
    else if (v) {
      let { shouldLoad: Q } = kx(
        F,
        u.loaderData,
        u.errors
      );
      G = Q;
    } else y2(u.loaderData, u.matches[L], T) && (G = !0);
    if (G !== null)
      return Oh(
        r,
        l,
        e,
        p,
        oe,
        T,
        h,
        a,
        G
      );
    let te = !1;
    typeof k == "boolean" ? te = k : $ ? te = !1 : (g || V.pathname + V.search === A.pathname + A.search || V.search !== A.search || b2(u.matches[L], T)) && (te = !0);
    let j = {
      ...K,
      defaultShouldRevalidate: te
    }, U = Uo(T, j);
    return Oh(
      r,
      l,
      e,
      p,
      oe,
      T,
      h,
      a,
      U,
      j,
      k
    );
  }), Y = [];
  return _.forEach((T, L) => {
    if (v || !c.some((ce) => ce.route.id === T.routeId) || x.has(L))
      return;
    let F = u.fetchers.get(L), G = F && F.state !== "idle" && F.data === void 0, te = ba(
      N,
      T.path,
      C ?? "/",
      !1,
      E
    );
    if (!te) {
      if (D && G)
        return;
      Y.push({
        key: L,
        routeId: T.routeId,
        path: T.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(L))
      return;
    let j = Zu(te, T.path), U = new AbortController(), Q = yl(
      s,
      T.path,
      U.signal
    ), ee = null;
    if (b.has(L))
      b.delete(L), ee = Sl(
        r,
        l,
        Q,
        T.path,
        te,
        j,
        h,
        a
      );
    else if (G)
      g && (ee = Sl(
        r,
        l,
        Q,
        T.path,
        te,
        j,
        h,
        a
      ));
    else {
      let ce;
      typeof k == "boolean" ? ce = k : $ ? ce = !1 : ce = g;
      let ae = {
        ...K,
        defaultShouldRevalidate: ce
      };
      Uo(j, ae) && (ee = Sl(
        r,
        l,
        Q,
        T.path,
        te,
        j,
        h,
        a,
        ae
      ));
    }
    ee && Y.push({
      key: L,
      routeId: T.routeId,
      path: T.path,
      matches: ee,
      match: j,
      request: Q,
      controller: U
    });
  }), { dsMatches: z, revalidatingFetchers: Y };
}
function hm(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function kx(e, a, r) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!hm(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = r != null && r[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function y2(e, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !e.hasOwnProperty(r.route.id);
  return l || s;
}
function b2(e, a) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function Uo(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function oy(e, a, r, l, s, u) {
  let c;
  if (e) {
    let h = l[e];
    Fe(
      h,
      `No route found to patch children into: routeId = ${e}`
    ), h.children || (h.children = []), c = h.children;
  } else
    c = r.activeRoutes;
  let d = [], p = [];
  if (a.forEach((h) => {
    let v = c.find(
      (g) => Hx(h, g)
    );
    v ? p.push({ existingRoute: v, newRoute: h }) : d.push(h);
  }), d.length > 0) {
    let h = Io(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...h);
  }
  if (u && p.length > 0)
    for (let h = 0; h < p.length; h++) {
      let { existingRoute: v, newRoute: g } = p[h], b = v, [x] = Io(
        [g],
        s,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(b, {
        element: x.element ? x.element : b.element,
        errorElement: x.errorElement ? x.errorElement : b.errorElement,
        hydrateFallbackElement: x.hydrateFallbackElement ? x.hydrateFallbackElement : b.hydrateFallbackElement
      });
    }
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function Hx(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (r, l) => a.children?.some((s) => Hx(r, s))
  ) ?? !1 : !1;
}
var sy = /* @__PURE__ */ new WeakMap(), Bx = ({
  key: e,
  route: a,
  manifest: r,
  mapRouteProperties: l
}) => {
  let s = r[a.id];
  if (Fe(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[e];
  if (!u)
    return;
  let c = sy.get(s);
  c || (c = {}, sy.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let h = LE(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
    if (h)
      It(
        !h,
        "Route property " + e + " is not a supported lazy route property. This property will be ignored."
      ), c[e] = Promise.resolve();
    else if (g)
      It(
        !1,
        `Route "${s.id}" has a static property "${e}" defined. The lazy property will be ignored.`
      );
    else {
      let b = await u();
      b != null && (Object.assign(s, { [e]: b }), Object.assign(s, l(s)));
    }
    typeof s.lazy == "object" && (s.lazy[e] = void 0, Object.values(s.lazy).every((b) => b === void 0) && (s.lazy = void 0));
  })();
  return c[e] = p, p;
}, uy = /* @__PURE__ */ new WeakMap();
function x2(e, a, r, l, s) {
  let u = r[e.id];
  if (Fe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let v = uy.get(u);
    if (v)
      return {
        lazyRoutePromise: v,
        lazyHandlerPromise: v
      };
    let g = (async () => {
      Fe(
        typeof e.lazy == "function",
        "No lazy route function found"
      );
      let b = await e.lazy(), x = {};
      for (let _ in b) {
        let R = b[_];
        if (R === void 0)
          continue;
        let N = HE(_), D = u[_] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        _ !== "hasErrorBoundary";
        N ? It(
          !N,
          "Route property " + _ + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : D ? It(
          !D,
          `Route "${u.id}" has a static property "${_}" defined but its lazy function is also returning a value for this property. The lazy route property "${_}" will be ignored.`
        ) : x[_] = R;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return uy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let v of c) {
    if (s && s.includes(v))
      continue;
    let g = Bx({
      key: v,
      route: e,
      manifest: r,
      mapRouteProperties: l
    });
    g && (d.push(g), v === a && (p = g));
  }
  let h = d.length > 0 ? Promise.all(d).then(() => {
  }) : void 0;
  return h?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: h,
    lazyHandlerPromise: p
  };
}
async function cy(e) {
  let a = e.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function w2(e) {
  return e.matches.some((a) => a.route.middleware) ? Ux(e, () => cy(e)) : cy(e);
}
function Ux(e, a) {
  return _2(
    e,
    a,
    (l) => {
      if (L2(l))
        throw l;
      return l;
    },
    D2,
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
      let { matches: c } = e, d = Math.min(
        // Throwing route
        Math.max(
          c.findIndex((h) => h.route.id === s),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          c.findIndex((h) => h.shouldCallHandler()),
          0
        )
      ), p = Zi(
        c,
        c[d].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: l }
      });
    }
  }
}
async function _2(e, a, r, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (h) => h.route.middleware ? h.route.middleware.map((v) => [h.route.id, v]) : []
  );
  return await Vx(
    c,
    d,
    a,
    r,
    l,
    s
  );
}
async function Vx(e, a, r, l, s, u, c = 0) {
  let { request: d } = e;
  if (d.signal.aborted)
    throw d.signal.reason ?? new Error(`Request aborted: ${d.method} ${d.url}`);
  let p = a[c];
  if (!p)
    return await r();
  let [h, v] = p, g, b = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await Vx(
        e,
        a,
        r,
        l,
        s,
        u,
        c + 1
      ) }, g.value;
    } catch (x) {
      return g = { value: await u(x, h, g) }, g.value;
    }
  };
  try {
    let x = await v(e, b), _ = x != null ? l(x) : void 0;
    return s(_) ? _ : g ? _ ?? g.value : (g = { value: await b() }, g.value);
  } catch (x) {
    return await u(x, h, g);
  }
}
function qx(e, a, r, l, s) {
  let u = Bx({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = x2(
    l.route,
    hn(r.method) ? "action" : "loader",
    a,
    e,
    s
  );
  return {
    middleware: u,
    route: c.lazyRoutePromise,
    handler: c.lazyHandlerPromise
  };
}
function Oh(e, a, r, l, s, u, c, d, p, h = null, v) {
  let g = !1, b = qx(
    e,
    a,
    r,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: b,
    shouldLoad: p,
    shouldRevalidateArgs: h,
    shouldCallHandler(x) {
      return g = !0, h ? typeof v == "boolean" ? Uo(u, {
        ...h,
        defaultShouldRevalidate: v
      }) : typeof x == "boolean" ? Uo(u, {
        ...h,
        defaultShouldRevalidate: x
      }) : Uo(u, h) : p;
    },
    resolve(x) {
      let { lazy: _, loader: R, middleware: N } = u.route, C = g || p || x && !hn(r.method) && (_ || R), D = N && N.length > 0 && !R && !_;
      return C && (hn(r.method) || !D) ? E2({
        request: r,
        path: l,
        pattern: s,
        match: u,
        lazyHandlerPromise: b?.handler,
        lazyRoutePromise: b?.route,
        handlerOverride: x,
        scopedContext: d
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Sl(e, a, r, l, s, u, c, d, p = null) {
  return s.map((h) => h.route.id !== u.route.id ? {
    ...h,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: qx(
      e,
      a,
      r,
      h,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Oh(
    e,
    a,
    r,
    l,
    as(s),
    h,
    c,
    d,
    !0,
    p
  ));
}
async function S2(e, a, r, l, s, u, c) {
  l.some((v) => v._lazyPromises?.middleware) && await Promise.all(l.map((v) => v._lazyPromises?.middleware));
  let d = {
    request: a,
    url: $x(a, r),
    pattern: as(l),
    params: l[0].params,
    context: u,
    matches: l
  }, h = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (v) => {
      let g = d;
      return Ux(g, () => v({
        ...g,
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
      l.flatMap((v) => [
        v._lazyPromises?.handler,
        v._lazyPromises?.route
      ])
    );
  } catch {
  }
  return h;
}
async function E2({
  request: e,
  path: a,
  pattern: r,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, h, v = hn(e.method), g = v ? "action" : "loader", b = (x) => {
    let _, R = new Promise((D, E) => _ = E);
    h = () => _(), e.signal.addEventListener("abort", h);
    let N = (D) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: $x(e, a),
        pattern: r,
        params: l.params,
        context: d
      },
      ...D !== void 0 ? [D] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => N(E)) : N()) };
      } catch (D) {
        return { type: "error", result: D };
      }
    })();
    return Promise.race([C, R]);
  };
  try {
    let x = v ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let _, [R] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          b(x).catch((N) => {
            _ = N;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (_ !== void 0)
          throw _;
        p = R;
      } else {
        await s;
        let _ = v ? l.route.action : l.route.loader;
        if (_)
          [p] = await Promise.all([b(_), u]);
        else if (g === "action") {
          let R = new URL(e.url), N = R.pathname + R.search;
          throw sa(405, {
            method: e.method,
            pathname: N,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await b(x);
    else {
      let _ = new URL(e.url), R = _.pathname + _.search;
      throw sa(404, {
        pathname: R
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    h && e.signal.removeEventListener("abort", h);
  }
  return p;
}
async function N2(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function C2(e) {
  let { result: a, type: r } = e;
  if (mm(a)) {
    let l;
    try {
      l = await N2(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new xc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? vy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: A2(a),
    statusCode: Yo(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Yo(a) ? a.status : void 0
  } : vy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function R2(e, a, r, l, s) {
  let u = e.headers.get("Location");
  if (Fe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !cm(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === r) + 1
    );
    u = jh(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var fy = [
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
function dy(e, a, r, l) {
  if (cm(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (fy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = ca(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return dm(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (fy.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function yl(e, a, r, l) {
  let s = e.createURL(Ix(a)).toString(), u = { signal: r };
  if (l && hn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = zh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function $x(e, a) {
  let r = new URL(e.url), l = typeof a == "string" ? Na(a) : a;
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
function zh(e) {
  let a = new URLSearchParams();
  for (let [r, l] of e.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function hy(e) {
  let a = new FormData();
  for (let [r, l] of e.entries())
    a.append(r, l);
  return a;
}
function T2(e, a, r, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, h = {}, v = r && Xn(r[1]) ? r[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let b = g.route.id, x = a[b];
    if (Fe(
      !Sr(x),
      "Cannot handle redirect results in processLoaderData"
    ), Xn(x)) {
      let _ = x.error;
      if (v !== void 0 && (_ = v, v = void 0), c = c || {}, s)
        c[b] = _;
      else {
        let R = Zi(e, b);
        c[R.route.id] == null && (c[R.route.id] = _);
      }
      l || (u[b] = Lx), p || (p = !0, d = Yo(x.error) ? x.error.status : 500), x.headers && (h[b] = x.headers);
    } else
      u[b] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (h[b] = x.headers);
  }), v !== void 0 && r && (c = { [r[0]]: v }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: h
  };
}
function my(e, a, r, l, s, u, c) {
  let { loaderData: d, errors: p } = T2(
    a,
    r,
    l
  );
  return s.filter((h) => !h.matches || h.matches.some((v) => v.shouldLoad)).forEach((h) => {
    let { key: v, match: g, controller: b } = h;
    if (b && b.signal.aborted)
      return;
    let x = u[v];
    if (Fe(x, "Did not find corresponding fetcher result"), Xn(x)) {
      let _ = Zi(e.matches, g?.route.id);
      p && p[_.route.id] || (p = {
        ...p,
        [_.route.id]: x.error
      }), c.delete(v);
    } else if (Sr(x))
      Fe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let _ = La(x.data);
      c.set(v, _);
    }
  }), { loaderData: d, errors: p };
}
function py(e, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== Lx).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function gy(e) {
  return e ? Xn(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Zi(e, a) {
  return (a ? e.slice(0, e.findIndex((l) => l.route.id === a) + 1) : [...e]).reverse().find((l) => l.route.hasErrorBoundary === !0) || e[0];
}
function Su(e) {
  let a = e.length === 1 ? e[0] : e.find((r) => r.index || !r.path || r.path === "/") || {
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
function sa(e, {
  pathname: a,
  routeId: r,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", d = "Unknown @remix-run/router error";
  return e === 400 ? (c = "Bad Request", l && a && r ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${r}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && r ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new xc(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function Eu(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (Sr(s))
      return { key: l, result: s };
  }
}
function Ix(e) {
  let a = typeof e == "string" ? Na(e) : e;
  return $a({ ...a, hash: "" });
}
function M2(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function A2(e) {
  return new xc(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function D2(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, r]) => typeof a == "string" && j2(r)
  );
}
function j2(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function O2(e) {
  return mm(e.result) && Ox.has(e.result.status);
}
function Xn(e) {
  return e.type === "error";
}
function Sr(e) {
  return (e && e.type) === "redirect";
}
function vy(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function mm(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function z2(e) {
  return Ox.has(e);
}
function L2(e) {
  return mm(e) && z2(e.status) && e.headers.has("Location");
}
function k2(e) {
  return f2.has(e.toUpperCase());
}
function hn(e) {
  return u2.has(e.toUpperCase());
}
function pm(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function Zu(e, a) {
  let r = typeof a == "string" ? Na(a).search : a.search;
  if (e[e.length - 1].route.index && pm(r || ""))
    return e[e.length - 1];
  let l = Tx(e);
  return l[l.length - 1];
}
function yy(e) {
  let { formMethod: a, formAction: r, formEncType: l, text: s, formData: u, json: c } = e;
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
function th(e, a, r, l) {
  return l ? {
    state: "loading",
    location: e,
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
    location: e,
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
function H2(e, a, r, l) {
  return {
    state: "submitting",
    location: e,
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
function Mo(e, a) {
  return e ? {
    state: "loading",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
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
function B2(e, a) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: a ? a.data : void 0
  };
}
function La(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e
  };
}
function U2(e, a) {
  try {
    let r = e.sessionStorage.getItem(
      zx
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function V2(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      e.sessionStorage.setItem(
        zx,
        JSON.stringify(r)
      );
    } catch (l) {
      It(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function by() {
  let e, a, r = new Promise((l, s) => {
    e = async (u) => {
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
    resolve: e,
    //@ts-ignore
    reject: a
  };
}
var zr = S.createContext(null);
zr.displayName = "DataRouter";
var is = S.createContext(null);
is.displayName = "DataRouterState";
var Yx = S.createContext(!1);
function Gx() {
  return S.useContext(Yx);
}
var gm = S.createContext({
  isTransitioning: !1
});
gm.displayName = "ViewTransition";
var Xx = S.createContext(
  /* @__PURE__ */ new Map()
);
Xx.displayName = "Fetchers";
var q2 = S.createContext(null);
q2.displayName = "Await";
var fa = S.createContext(
  null
);
fa.displayName = "Navigation";
var wc = S.createContext(
  null
);
wc.displayName = "Location";
var Ia = S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ia.displayName = "Route";
var vm = S.createContext(null);
vm.displayName = "RouteError";
var Fx = "REACT_ROUTER_ERROR", $2 = "REDIRECT", I2 = "ROUTE_ERROR_RESPONSE";
function Y2(e) {
  if (e.startsWith(`${Fx}:${$2}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function G2(e) {
  if (e.startsWith(
    `${Fx}:${I2}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new xc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function X2(e, { relative: a } = {}) {
  Fe(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = S.useContext(fa), { hash: s, pathname: u, search: c } = ls(e, { relative: a }), d = u;
  return r !== "/" && (d = u === "/" ? r : ua([r, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function rs() {
  return S.useContext(wc) != null;
}
function pi() {
  return Fe(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(wc).location;
}
var Zx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Px(e) {
  S.useContext(fa).static || S.useLayoutEffect(e);
}
function F2() {
  let { isDataRoute: e } = S.useContext(Ia);
  return e ? sN() : Z2();
}
function Z2() {
  Fe(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = S.useContext(zr), { basename: a, navigator: r } = S.useContext(fa), { matches: l } = S.useContext(Ia), { pathname: s } = pi(), u = JSON.stringify(fm(l)), c = S.useRef(!1);
  return Px(() => {
    c.current = !0;
  }), S.useCallback(
    (p, h = {}) => {
      if (It(c.current, Zx), !c.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let v = bc(
        p,
        JSON.parse(u),
        s,
        h.relative === "path"
      );
      e == null && a !== "/" && (v.pathname = v.pathname === "/" ? a : ua([a, v.pathname])), (h.replace ? r.replace : r.push)(
        v,
        h.state,
        h
      );
    },
    [
      a,
      r,
      u,
      s,
      e
    ]
  );
}
var P2 = S.createContext(null);
function Q2(e) {
  let a = S.useContext(Ia).outlet;
  return S.useMemo(
    () => a && /* @__PURE__ */ S.createElement(P2.Provider, { value: e }, a),
    [a, e]
  );
}
function ls(e, { relative: a } = {}) {
  let { matches: r } = S.useContext(Ia), { pathname: l } = pi(), s = JSON.stringify(fm(r));
  return S.useMemo(
    () => bc(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function K2(e, a, r) {
  Fe(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = S.useContext(fa), { matches: s } = S.useContext(Ia), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", h = u && u.route;
  {
    let N = h && h.path || "";
    Jx(
      d,
      !h || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let v = pi(), g;
  g = v;
  let b = g.pathname || "/", x = b;
  if (p !== "/") {
    let N = p.replace(/^\//, "").split("/");
    x = "/" + b.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let _ = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (N) => Object.assign(N, {
        route: r.manifest[N.route.id] || N.route
      })
    )
  ) : Ex(e, { pathname: x });
  return It(
    h || _ != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), It(
    _ == null || _[_.length - 1].route.element !== void 0 || _[_.length - 1].route.Component !== void 0 || _[_.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), nN(
    _ && _.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, c, N.params),
        pathname: ua([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            N.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? p : ua([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            N.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function J2() {
  let e = oN(), a = Yo(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ S.createElement("pre", { style: s }, r) : null, c);
}
var W2 = /* @__PURE__ */ S.createElement(J2, null), Qx = class extends S.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, a) {
    return a.location !== e.location || a.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : a.error,
      location: a.location,
      revalidation: e.revalidation || a.revalidation
    };
  }
  componentDidCatch(e, a) {
    this.props.onError ? this.props.onError(e, a) : console.error(
      "React Router caught the following error during render",
      e
    );
  }
  render() {
    let e = this.state.error;
    if (this.context && typeof e == "object" && e && "digest" in e && typeof e.digest == "string") {
      const r = G2(e.digest);
      r && (e = r);
    }
    let a = e !== void 0 ? /* @__PURE__ */ S.createElement(Ia.Provider, { value: this.props.routeContext }, /* @__PURE__ */ S.createElement(
      vm.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ S.createElement(eN, { error: e }, a) : a;
  }
};
Qx.contextType = Yx;
var nh = /* @__PURE__ */ new WeakMap();
function eN({
  children: e,
  error: a
}) {
  let { basename: r } = S.useContext(fa);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = Y2(a.digest);
    if (l) {
      let s = nh.get(a);
      if (s) throw s;
      let u = Ax(l.location, r);
      if (Mx && !nh.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw nh.set(a, c), c;
        }
      return /* @__PURE__ */ S.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${u.absoluteURL || u.to}`
        }
      );
    }
  }
  return e;
}
function tN({ routeContext: e, match: a, children: r }) {
  let l = S.useContext(zr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ S.createElement(Ia.Provider, { value: e }, r);
}
function nN(e, a = [], r) {
  let l = r?.state;
  if (e == null) {
    if (!l)
      return null;
    if (l.errors)
      e = l.matches;
    else if (a.length === 0 && !l.initialized && l.matches.length > 0)
      e = l.matches;
    else
      return null;
  }
  let s = e, u = l?.errors;
  if (u != null) {
    let v = s.findIndex(
      (g) => g.route.id && u?.[g.route.id] !== void 0
    );
    Fe(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, v + 1)
    );
  }
  let c = !1, d = -1;
  if (r && l) {
    c = l.renderFallback;
    for (let v = 0; v < s.length; v++) {
      let g = s[v];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (d = v), g.route.id) {
        let { loaderData: b, errors: x } = l, _ = g.route.loader && !b.hasOwnProperty(g.route.id) && (!x || x[g.route.id] === void 0);
        if (g.route.lazy || _) {
          r.isStatic && (c = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, h = l && p ? (v, g) => {
    p(v, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      pattern: as(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (v, g, b) => {
      let x, _ = !1, R = null, N = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, R = g.route.errorElement || W2, c && (d < 0 && b === 0 ? (Jx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), _ = !0, N = null) : d === b && (_ = !0, N = g.route.hydrateFallbackElement || null)));
      let C = a.concat(s.slice(0, b + 1)), D = () => {
        let E;
        return x ? E = R : _ ? E = N : g.route.Component ? E = /* @__PURE__ */ S.createElement(g.route.Component, null) : g.route.element ? E = g.route.element : E = v, /* @__PURE__ */ S.createElement(
          tN,
          {
            match: g,
            routeContext: {
              outlet: v,
              matches: C,
              isDataRoute: l != null
            },
            children: E
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || b === 0) ? /* @__PURE__ */ S.createElement(
        Qx,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: R,
          error: x,
          children: D(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: h
        }
      ) : D();
    },
    null
  );
}
function ym(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function aN(e) {
  let a = S.useContext(zr);
  return Fe(a, ym(e)), a;
}
function Kx(e) {
  let a = S.useContext(is);
  return Fe(a, ym(e)), a;
}
function iN(e) {
  let a = S.useContext(Ia);
  return Fe(a, ym(e)), a;
}
function _c(e) {
  let a = iN(e), r = a.matches[a.matches.length - 1];
  return Fe(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function rN() {
  return _c(
    "useRouteId"
    /* UseRouteId */
  );
}
function lN() {
  let e = Kx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = _c(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function oN() {
  let e = S.useContext(vm), a = Kx(
    "useRouteError"
    /* UseRouteError */
  ), r = _c(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[r];
}
function sN() {
  let { router: e } = aN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = _c(
    "useNavigate"
    /* UseNavigateStable */
  ), r = S.useRef(!1);
  return Px(() => {
    r.current = !0;
  }), S.useCallback(
    async (s, u = {}) => {
      It(r.current, Zx), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var xy = {};
function Jx(e, a, r) {
  !a && !xy[e] && (xy[e] = !0, It(!1, r));
}
var wy = {};
function _y(e, a) {
  !e && !wy[a] && (wy[a] = !0, console.warn(a));
}
var uN = "useOptimistic", Sy = EE[uN], cN = () => {
};
function fN(e) {
  return Sy ? Sy(e) : [e, cN];
}
function dN(e) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null
  };
  return e.Component && (e.element && It(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: S.createElement(e.Component),
    Component: void 0
  })), e.HydrateFallback && (e.hydrateFallbackElement && It(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: S.createElement(e.HydrateFallback),
    HydrateFallback: void 0
  })), e.ErrorBoundary && (e.errorElement && It(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: S.createElement(e.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var hN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function mN(e, a) {
  return g2({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: DE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: hN,
    mapRouteProperties: dN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var pN = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((e, a) => {
      this.resolve = (r) => {
        this.status === "pending" && (this.status = "resolved", e(r));
      }, this.reject = (r) => {
        this.status === "pending" && (this.status = "rejected", a(r));
      };
    });
  }
};
function gN({
  router: e,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = Gx() || l;
  let [u, c] = S.useState(e.state), [d, p] = fN(u), [h, v] = S.useState(), [g, b] = S.useState({
    isTransitioning: !1
  }), [x, _] = S.useState(), [R, N] = S.useState(), [C, D] = S.useState(), E = S.useRef(/* @__PURE__ */ new Map()), O = S.useCallback(
    (A, { deletedFetchers: I, newErrors: ne, flushSync: $, viewTransitionOpts: K }) => {
      ne && r && Object.values(ne).forEach(
        (z) => r(z, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: as(A.matches)
        })
      ), A.fetchers.forEach((z, Y) => {
        z.data !== void 0 && E.current.set(Y, z.data);
      }), I.forEach((z) => E.current.delete(z)), _y(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (_y(
        K == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !oe) {
        a && $ ? a(() => c(A)) : l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p((z) => Ey(z, A)), c(A);
        });
        return;
      }
      if (a && $) {
        a(() => {
          R && (x?.resolve(), R.skipTransition()), b({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let z = e.window.document.startViewTransition(() => {
          a(() => c(A));
        });
        z.finished.finally(() => {
          a(() => {
            _(void 0), N(void 0), v(void 0), b({ isTransitioning: !1 });
          });
        }), a(() => N(z));
        return;
      }
      R ? (x?.resolve(), R.skipTransition(), D({
        state: A,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (v(A), b({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      }));
    },
    [
      e.window,
      a,
      R,
      x,
      l,
      p,
      r
    ]
  );
  S.useLayoutEffect(() => e.subscribe(O), [e, O]), S.useEffect(() => {
    g.isTransitioning && !g.flushSync && _(new pN());
  }, [g]), S.useEffect(() => {
    if (x && h && e.window) {
      let A = h, I = x.promise, ne = e.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p(($) => Ey($, A)), c(A);
        }), await I;
      });
      ne.finished.finally(() => {
        _(void 0), N(void 0), v(void 0), b({ isTransitioning: !1 });
      }), N(ne);
    }
  }, [
    h,
    x,
    e.window,
    l,
    p
  ]), S.useEffect(() => {
    x && h && d.location.key === h.location.key && x.resolve();
  }, [x, R, d.location, h]), S.useEffect(() => {
    !g.isTransitioning && C && (v(C.state), b({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), D(void 0));
  }, [g.isTransitioning, C]);
  let k = S.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (A) => e.navigate(A),
    push: (A, I, ne) => e.navigate(A, {
      state: I,
      preventScrollReset: ne?.preventScrollReset
    }),
    replace: (A, I, ne) => e.navigate(A, {
      replace: !0,
      state: I,
      preventScrollReset: ne?.preventScrollReset
    })
  }), [e]), H = e.basename || "/", V = S.useMemo(
    () => ({
      router: e,
      navigator: k,
      static: !1,
      basename: H,
      onError: r
    }),
    [e, k, H, r]
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(zr.Provider, { value: V }, /* @__PURE__ */ S.createElement(is.Provider, { value: d }, /* @__PURE__ */ S.createElement(Xx.Provider, { value: E.current }, /* @__PURE__ */ S.createElement(gm.Provider, { value: g }, /* @__PURE__ */ S.createElement(
    xN,
    {
      basename: H,
      location: d.location,
      navigationType: d.historyAction,
      navigator: k,
      useTransitions: l
    },
    /* @__PURE__ */ S.createElement(
      vN,
      {
        routes: e.routes,
        manifest: e.manifest,
        future: e.future,
        state: d,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function Ey(e, a) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...e,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: a.navigation.state !== "idle" ? a.navigation : e.navigation,
    revalidation: a.revalidation !== "idle" ? a.revalidation : e.revalidation,
    actionData: a.navigation.state !== "submitting" ? a.actionData : e.actionData,
    fetchers: a.fetchers
  };
}
var vN = S.memo(yN);
function yN({
  routes: e,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return K2(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function bN(e) {
  return Q2(e.context);
}
function xN({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Fe(
    !rs(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), p = S.useMemo(
    () => ({
      basename: d,
      navigator: s,
      static: u,
      useTransitions: c,
      future: {}
    }),
    [d, s, u, c]
  );
  typeof r == "string" && (r = Na(r));
  let {
    pathname: h = "/",
    search: v = "",
    hash: g = "",
    state: b = null,
    key: x = "default",
    mask: _
  } = r, R = S.useMemo(() => {
    let N = ca(h, d);
    return N == null ? null : {
      location: {
        pathname: N,
        search: v,
        hash: g,
        state: b,
        key: x,
        mask: _
      },
      navigationType: l
    };
  }, [d, h, v, g, b, x, l, _]);
  return It(
    R != null,
    `<Router basename="${d}"> is not able to match the URL "${h}${v}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), R == null ? null : /* @__PURE__ */ S.createElement(fa.Provider, { value: p }, /* @__PURE__ */ S.createElement(wc.Provider, { children: a, value: R }));
}
var Pu = "get", Qu = "application/x-www-form-urlencoded";
function Sc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function wN(e) {
  return Sc(e) && e.tagName.toLowerCase() === "button";
}
function _N(e) {
  return Sc(e) && e.tagName.toLowerCase() === "form";
}
function SN(e) {
  return Sc(e) && e.tagName.toLowerCase() === "input";
}
function EN(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function NN(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !EN(e);
}
var Nu = null;
function CN() {
  if (Nu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Nu = !1;
    } catch {
      Nu = !0;
    }
  return Nu;
}
var RN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function ah(e) {
  return e != null && !RN.has(e) ? (It(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Qu}"`
  ), null) : e;
}
function TN(e, a) {
  let r, l, s, u, c;
  if (_N(e)) {
    let d = e.getAttribute("action");
    l = d ? ca(d, a) : null, r = e.getAttribute("method") || Pu, s = ah(e.getAttribute("enctype")) || Qu, u = new FormData(e);
  } else if (wN(e) || SN(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? ca(p, a) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || Pu, s = ah(e.getAttribute("formenctype")) || ah(d.getAttribute("enctype")) || Qu, u = new FormData(d, e), !CN()) {
      let { name: h, type: v, value: g } = e;
      if (v === "image") {
        let b = h ? `${h}.` : "";
        u.append(`${b}x`, "0"), u.append(`${b}y`, "0");
      } else h && u.append(h, g);
    }
  } else {
    if (Sc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Pu, l = null, s = Qu, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function bm(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function Wx(e, a, r, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && ca(s.pathname, a) === "/" ? s.pathname = `${rc(a)}/_root.${l}` : s.pathname = `${rc(s.pathname)}.${l}`, s;
}
async function MN(e, a) {
  if (e.id in a)
    return a[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return a[e.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function AN(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function DN(e, a, r) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await MN(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return LN(
    l.flat(1).filter(AN).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function Ny(e, a, r, l, s, u) {
  let c = (p, h) => r[h] ? p.route.id !== r[h].route.id : !0, d = (p, h) => (
    // param change, /users/123 -> /users/456
    r[h].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[h].route.path?.endsWith("*") && r[h].params["*"] !== p.params["*"]
  );
  return u === "assets" ? a.filter(
    (p, h) => c(p, h) || d(p, h)
  ) : u === "data" ? a.filter((p, h) => {
    let v = l.routes[p.route.id];
    if (!v || !v.hasLoader)
      return !1;
    if (c(p, h) || d(p, h))
      return !0;
    if (p.route.shouldRevalidate) {
      let g = p.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function jN(e, a, { includeHydrateFallback: r } = {}) {
  return ON(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function ON(e) {
  return [...new Set(e)];
}
function zN(e) {
  let a = {}, r = Object.keys(e).sort();
  for (let l of r)
    a[l] = e[l];
  return a;
}
function LN(e, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(zN(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function xm() {
  let e = S.useContext(zr);
  return bm(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function kN() {
  let e = S.useContext(is);
  return bm(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var wm = S.createContext(void 0);
wm.displayName = "FrameworkContext";
function _m() {
  let e = S.useContext(wm);
  return bm(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function HN(e, a) {
  let r = S.useContext(wm), [l, s] = S.useState(!1), [u, c] = S.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: h, onMouseLeave: v, onTouchStart: g } = a, b = S.useRef(null);
  S.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let R = (C) => {
        C.forEach((D) => {
          c(D.isIntersecting);
        });
      }, N = new IntersectionObserver(R, { threshold: 0.5 });
      return b.current && N.observe(b.current), () => {
        N.disconnect();
      };
    }
  }, [e]), S.useEffect(() => {
    if (l) {
      let R = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(R);
      };
    }
  }, [l]);
  let x = () => {
    s(!0);
  }, _ = () => {
    s(!1), c(!1);
  };
  return r ? e !== "intent" ? [u, b, {}] : [
    u,
    b,
    {
      onFocus: Ao(d, x),
      onBlur: Ao(p, _),
      onMouseEnter: Ao(h, x),
      onMouseLeave: Ao(v, _),
      onTouchStart: Ao(g, x)
    }
  ] : [!1, b, {}];
}
function Ao(e, a) {
  return (r) => {
    e && e(r), r.defaultPrevented || a(r);
  };
}
function BN({ page: e, ...a }) {
  let r = Gx(), { router: l } = xm(), s = S.useMemo(
    () => Ex(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? r ? /* @__PURE__ */ S.createElement(VN, { page: e, matches: s, ...a }) : /* @__PURE__ */ S.createElement(qN, { page: e, matches: s, ...a }) : null;
}
function UN(e) {
  let { manifest: a, routeModules: r } = _m(), [l, s] = S.useState([]);
  return S.useEffect(() => {
    let u = !1;
    return DN(e, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, r]), l;
}
function VN({
  page: e,
  matches: a,
  ...r
}) {
  let l = pi(), { future: s } = _m(), { basename: u } = xm(), c = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = Wx(
      e,
      u,
      s.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, h = [];
    for (let v of a)
      typeof v.route.shouldRevalidate == "function" ? p = !0 : h.push(v.route.id);
    return p && h.length > 0 && d.searchParams.set("_routes", h.join(",")), [d.pathname + d.search];
  }, [
    u,
    s.v8_trailingSlashAwareDataRequests,
    e,
    l,
    a
  ]);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, c.map((d) => /* @__PURE__ */ S.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })));
}
function qN({
  page: e,
  matches: a,
  ...r
}) {
  let l = pi(), { future: s, manifest: u, routeModules: c } = _m(), { basename: d } = xm(), { loaderData: p, matches: h } = kN(), v = S.useMemo(
    () => Ny(
      e,
      a,
      h,
      u,
      l,
      "data"
    ),
    [e, a, h, u, l]
  ), g = S.useMemo(
    () => Ny(
      e,
      a,
      h,
      u,
      l,
      "assets"
    ),
    [e, a, h, u, l]
  ), b = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let R = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((D) => {
      let E = u.routes[D.route.id];
      !E || !E.hasLoader || (!v.some((O) => O.route.id === D.route.id) && D.route.id in p && c[D.route.id]?.shouldRevalidate || E.hasClientLoader ? N = !0 : R.add(D.route.id));
    }), R.size === 0)
      return [];
    let C = Wx(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return N && R.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((D) => R.has(D.route.id)).map((D) => D.route.id).join(",")
    ), [C.pathname + C.search];
  }, [
    d,
    s.v8_trailingSlashAwareDataRequests,
    p,
    l,
    u,
    v,
    a,
    e,
    c
  ]), x = S.useMemo(
    () => jN(g, u),
    [g, u]
  ), _ = UN(g);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, b.map((R) => /* @__PURE__ */ S.createElement("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...r })), x.map((R) => /* @__PURE__ */ S.createElement("link", { key: R, rel: "modulepreload", href: R, ...r })), _.map(({ key: R, link: N }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ S.createElement(
      "link",
      {
        key: R,
        nonce: r.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function $N(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var IN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  IN && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var e1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, t1 = S.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: l = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: d,
    state: p,
    target: h,
    to: v,
    preventScrollReset: g,
    viewTransition: b,
    defaultShouldRevalidate: x,
    ..._
  }, R) {
    let { basename: N, navigator: C, useTransitions: D } = S.useContext(fa), E = typeof v == "string" && e1.test(v), O = Ax(v, N);
    v = O.to;
    let k = X2(v, { relative: s }), H = pi(), V = null;
    if (d) {
      let Y = bc(
        d,
        [],
        H.mask ? H.mask.pathname : "/",
        !0
      );
      N !== "/" && (Y.pathname = Y.pathname === "/" ? N : ua([N, Y.pathname])), V = C.createHref(Y);
    }
    let [A, I, ne] = HN(
      l,
      _
    ), $ = FN(v, {
      replace: c,
      mask: d,
      state: p,
      target: h,
      preventScrollReset: g,
      relative: s,
      viewTransition: b,
      defaultShouldRevalidate: x,
      useTransitions: D
    });
    function K(Y) {
      a && a(Y), Y.defaultPrevented || $(Y);
    }
    let oe = !(O.isExternal || u), z = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ S.createElement(
        "a",
        {
          ..._,
          ...ne,
          href: (oe ? V : void 0) || O.absoluteURL || k,
          onClick: oe ? K : a,
          ref: $N(R, I),
          target: h,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !E ? /* @__PURE__ */ S.createElement(S.Fragment, null, z, /* @__PURE__ */ S.createElement(BN, { page: k })) : z;
  }
);
t1.displayName = "Link";
var YN = S.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: l = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: d,
    children: p,
    ...h
  }, v) {
    let g = ls(c, { relative: h.relative }), b = pi(), x = S.useContext(is), { navigator: _, basename: R } = S.useContext(fa), N = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    JN(g) && d === !0, C = _.encodeLocation ? _.encodeLocation(g).pathname : g.pathname, D = b.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (D = D.toLowerCase(), E = E ? E.toLowerCase() : null, C = C.toLowerCase()), E && R && (E = ca(E, R) || E);
    const O = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let k = D === C || !s && D.startsWith(C) && D.charAt(O) === "/", H = E != null && (E === C || !s && E.startsWith(C) && E.charAt(C.length) === "/"), V = {
      isActive: k,
      isPending: H,
      isTransitioning: N
    }, A = k ? a : void 0, I;
    typeof l == "function" ? I = l(V) : I = [
      l,
      k ? "active" : null,
      H ? "pending" : null,
      N ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let ne = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ S.createElement(
      t1,
      {
        ...h,
        "aria-current": A,
        className: I,
        ref: v,
        style: ne,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(V) : p
    );
  }
);
YN.displayName = "NavLink";
var GN = S.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = Pu,
    action: d,
    onSubmit: p,
    relative: h,
    preventScrollReset: v,
    viewTransition: g,
    defaultShouldRevalidate: b,
    ...x
  }, _) => {
    let { useTransitions: R } = S.useContext(fa), N = QN(), C = KN(d, { relative: h }), D = c.toLowerCase() === "get" ? "get" : "post", E = typeof d == "string" && e1.test(d), O = (k) => {
      if (p && p(k), k.defaultPrevented) return;
      k.preventDefault();
      let H = k.nativeEvent.submitter, V = H?.getAttribute("formmethod") || c, A = () => N(H || k.currentTarget, {
        fetcherKey: a,
        method: V,
        navigate: r,
        replace: s,
        state: u,
        relative: h,
        preventScrollReset: v,
        viewTransition: g,
        defaultShouldRevalidate: b
      });
      R && r !== !1 ? S.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ S.createElement(
      "form",
      {
        ref: _,
        method: D,
        action: C,
        onSubmit: l ? p : O,
        ...x,
        "data-discover": !E && e === "render" ? "true" : void 0
      }
    );
  }
);
GN.displayName = "Form";
function XN(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function n1(e) {
  let a = S.useContext(zr);
  return Fe(a, XN(e)), a;
}
function FN(e, {
  target: a,
  replace: r,
  mask: l,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: d,
  defaultShouldRevalidate: p,
  useTransitions: h
} = {}) {
  let v = F2(), g = pi(), b = ls(e, { relative: c });
  return S.useCallback(
    (x) => {
      if (NN(x, a)) {
        x.preventDefault();
        let _ = r !== void 0 ? r : $a(g) === $a(b), R = () => v(e, {
          replace: _,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        h ? S.startTransition(() => R()) : R();
      }
    },
    [
      g,
      v,
      b,
      r,
      l,
      s,
      a,
      e,
      u,
      c,
      d,
      p,
      h
    ]
  );
}
var ZN = 0, PN = () => `__${String(++ZN)}__`;
function QN() {
  let { router: e } = n1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = S.useContext(fa), r = rN(), l = e.fetch, s = e.navigate;
  return S.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: h, formData: v, body: g } = TN(
        u,
        a
      );
      if (c.navigate === !1) {
        let b = c.fetcherKey || PN();
        await l(b, r, c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: v,
          body: g,
          formMethod: c.method || p,
          formEncType: c.encType || h,
          flushSync: c.flushSync
        });
      } else
        await s(c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: v,
          body: g,
          formMethod: c.method || p,
          formEncType: c.encType || h,
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
function KN(e, { relative: a } = {}) {
  let { basename: r } = S.useContext(fa), l = S.useContext(Ia);
  Fe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...ls(e || ".", { relative: a }) }, c = pi();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search), p = d.getAll("index");
    if (p.some((v) => v === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let v = d.toString();
      u.search = v ? `?${v}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : ua([r, u.pathname])), $a(u);
}
function JN(e, { relative: a } = {}) {
  let r = S.useContext(gm);
  Fe(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = n1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = ls(e, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = ca(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = ca(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return ic(s.pathname, c) != null || ic(s.pathname, u) != null;
}
const Sm = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "flash3_fp4", label: "FlashAttention 3 FP4" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], WN = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], eC = [
  { value: "high", label: "High-noise SVI LoRA" },
  { value: "low", label: "Low-noise SVI LoRA" },
  { value: "off", label: "No SVI LoRA" }
], tC = [
  { value: "default", label: "Default (inductor)" },
  { value: "reduce-overhead", label: "Reduce-overhead (CUDA graphs)" },
  { value: "max-autotune", label: "Max-autotune (slow first build)" }
], a1 = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  outputDir: "",
  baseModelFamilyId: "",
  ditHighPath: "",
  ditLowPath: "",
  sviLoraTier: "high"
};
class Ec extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const Nc = "/api/v1/extensions/nexus.video.svi2-pro";
async function er(e, a) {
  const r = e.startsWith("http") ? e : `${Nc}${e}`, l = await fetch(r, {
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
    throw new Ec(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function nC(e, a, r) {
  const l = e.startsWith("http") ? e : `${Nc}${e}`, s = new EventSource(l);
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
async function i1() {
  return er("/presets");
}
async function aC() {
  return er("/settings");
}
async function lc(e) {
  return er("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var iC = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function On({ tone: e = "neutral", children: a, className: r }) {
  const l = [iC[e], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsx("span", { className: l, children: a });
}
var rC = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, lC = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, oC = "_1h48t1v9";
function Ua({
  variant: e = "primary",
  size: a = "md",
  type: r = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...d
}) {
  const p = [rC[e], lC[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ y.jsx("span", { className: oC, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Pt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let a = "";
  if (Array.isArray(e))
    for (let r = 0, l; r < e.length; r++)
      (l = Pt(e[r])) !== "" && (a += (a && " ") + l);
  else
    for (let r in e)
      e[r] && (a += (a && " ") + r);
  return a;
}
var sC = { value: () => {
} };
function Cc() {
  for (var e = 0, a = arguments.length, r = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new Ku(r);
}
function Ku(e) {
  this._ = e;
}
function uC(e, a) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
Ku.prototype = Cc.prototype = {
  constructor: Ku,
  on: function(e, a) {
    var r = this._, l = uC(e + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = cC(r[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) r[s] = Cy(r[s], e.name, a);
      else if (a == null) for (s in r) r[s] = Cy(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var r in a) e[r] = a[r].slice();
    return new Ku(e);
  },
  call: function(e, a) {
    if ((s = arguments.length - 2) > 0) for (var r = new Array(s), l = 0, s, u; l < s; ++l) r[l] = arguments[l + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (u = this._[e], l = 0, s = u.length; l < s; ++l) u[l].value.apply(a, r);
  },
  apply: function(e, a, r) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var l = this._[e], s = 0, u = l.length; s < u; ++s) l[s].value.apply(a, r);
  }
};
function cC(e, a) {
  for (var r = 0, l = e.length, s; r < l; ++r)
    if ((s = e[r]).name === a)
      return s.value;
}
function Cy(e, a, r) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = sC, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return r != null && e.push({ name: a, value: r }), e;
}
var Lh = "http://www.w3.org/1999/xhtml";
const Ry = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Lh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Rc(e) {
  var a = e += "", r = a.indexOf(":");
  return r >= 0 && (a = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), Ry.hasOwnProperty(a) ? { space: Ry[a], local: e } : e;
}
function fC(e) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === Lh && a.documentElement.namespaceURI === Lh ? a.createElement(e) : a.createElementNS(r, e);
  };
}
function dC(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function r1(e) {
  var a = Rc(e);
  return (a.local ? dC : fC)(a);
}
function hC() {
}
function Em(e) {
  return e == null ? hC : function() {
    return this.querySelector(e);
  };
}
function mC(e) {
  typeof e != "function" && (e = Em(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, h, v = 0; v < c; ++v)
      (p = u[v]) && (h = e.call(p, p.__data__, v, u)) && ("__data__" in p && (h.__data__ = p.__data__), d[v] = h);
  return new Zn(l, this._parents);
}
function pC(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function gC() {
  return [];
}
function l1(e) {
  return e == null ? gC : function() {
    return this.querySelectorAll(e);
  };
}
function vC(e) {
  return function() {
    return pC(e.apply(this, arguments));
  };
}
function yC(e) {
  typeof e == "function" ? e = vC(e) : e = l1(e);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], d = c.length, p, h = 0; h < d; ++h)
      (p = c[h]) && (l.push(e.call(p, p.__data__, h, c)), s.push(p));
  return new Zn(l, s);
}
function o1(e) {
  return function() {
    return this.matches(e);
  };
}
function s1(e) {
  return function(a) {
    return a.matches(e);
  };
}
var bC = Array.prototype.find;
function xC(e) {
  return function() {
    return bC.call(this.children, e);
  };
}
function wC() {
  return this.firstElementChild;
}
function _C(e) {
  return this.select(e == null ? wC : xC(typeof e == "function" ? e : s1(e)));
}
var SC = Array.prototype.filter;
function EC() {
  return Array.from(this.children);
}
function NC(e) {
  return function() {
    return SC.call(this.children, e);
  };
}
function CC(e) {
  return this.selectAll(e == null ? EC : NC(typeof e == "function" ? e : s1(e)));
}
function RC(e) {
  typeof e != "function" && (e = o1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, h = 0; h < c; ++h)
      (p = u[h]) && e.call(p, p.__data__, h, u) && d.push(p);
  return new Zn(l, this._parents);
}
function u1(e) {
  return new Array(e.length);
}
function TC() {
  return new Zn(this._enter || this._groups.map(u1), this._parents);
}
function oc(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
oc.prototype = {
  constructor: oc,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, a) {
    return this._parent.insertBefore(e, a);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function MC(e) {
  return function() {
    return e;
  };
}
function AC(e, a, r, l, s, u) {
  for (var c = 0, d, p = a.length, h = u.length; c < h; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : r[c] = new oc(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function DC(e, a, r, l, s, u, c) {
  var d, p, h = /* @__PURE__ */ new Map(), v = a.length, g = u.length, b = new Array(v), x;
  for (d = 0; d < v; ++d)
    (p = a[d]) && (b[d] = x = c.call(p, p.__data__, d, a) + "", h.has(x) ? s[d] = p : h.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = h.get(x)) ? (l[d] = p, p.__data__ = u[d], h.delete(x)) : r[d] = new oc(e, u[d]);
  for (d = 0; d < v; ++d)
    (p = a[d]) && h.get(b[d]) === p && (s[d] = p);
}
function jC(e) {
  return e.__data__;
}
function OC(e, a) {
  if (!arguments.length) return Array.from(this, jC);
  var r = a ? DC : AC, l = this._parents, s = this._groups;
  typeof e != "function" && (e = MC(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), h = 0; h < u; ++h) {
    var v = l[h], g = s[h], b = g.length, x = zC(e.call(v, v && v.__data__, h, l)), _ = x.length, R = d[h] = new Array(_), N = c[h] = new Array(_), C = p[h] = new Array(b);
    r(v, g, R, N, C, x, a);
    for (var D = 0, E = 0, O, k; D < _; ++D)
      if (O = R[D]) {
        for (D >= E && (E = D + 1); !(k = N[E]) && ++E < _; ) ;
        O._next = k || null;
      }
  }
  return c = new Zn(c, l), c._enter = d, c._exit = p, c;
}
function zC(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function LC() {
  return new Zn(this._exit || this._groups.map(u1), this._parents);
}
function kC(e, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function HC(e) {
  for (var a = e.selection ? e.selection() : e, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var h = r[p], v = l[p], g = h.length, b = d[p] = new Array(g), x, _ = 0; _ < g; ++_)
      (x = h[_] || v[_]) && (b[_] = x);
  for (; p < s; ++p)
    d[p] = r[p];
  return new Zn(d, this._parents);
}
function BC() {
  for (var e = this._groups, a = -1, r = e.length; ++a < r; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function UC(e) {
  e || (e = VC);
  function a(g, b) {
    return g && b ? e(g.__data__, b.__data__) : !g - !b;
  }
  for (var r = this._groups, l = r.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = r[u], d = c.length, p = s[u] = new Array(d), h, v = 0; v < d; ++v)
      (h = c[v]) && (p[v] = h);
    p.sort(a);
  }
  return new Zn(s, this._parents).order();
}
function VC(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function qC() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function $C() {
  return Array.from(this);
}
function IC() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function YC() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function GC() {
  return !this.node();
}
function XC(e) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function FC(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ZC(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function PC(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function QC(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function KC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function JC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function WC(e, a) {
  var r = Rc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? ZC : FC : typeof a == "function" ? r.local ? JC : KC : r.local ? QC : PC)(r, a));
}
function c1(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function eR(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function tR(e, a, r) {
  return function() {
    this.style.setProperty(e, a, r);
  };
}
function nR(e, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, r);
  };
}
function aR(e, a, r) {
  return arguments.length > 1 ? this.each((a == null ? eR : typeof a == "function" ? nR : tR)(e, a, r ?? "")) : Rl(this.node(), e);
}
function Rl(e, a) {
  return e.style.getPropertyValue(a) || c1(e).getComputedStyle(e, null).getPropertyValue(a);
}
function iR(e) {
  return function() {
    delete this[e];
  };
}
function rR(e, a) {
  return function() {
    this[e] = a;
  };
}
function lR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function oR(e, a) {
  return arguments.length > 1 ? this.each((a == null ? iR : typeof a == "function" ? lR : rR)(e, a)) : this.node()[e];
}
function f1(e) {
  return e.trim().split(/^|\s+/);
}
function Nm(e) {
  return e.classList || new d1(e);
}
function d1(e) {
  this._node = e, this._names = f1(e.getAttribute("class") || "");
}
d1.prototype = {
  add: function(e) {
    var a = this._names.indexOf(e);
    a < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var a = this._names.indexOf(e);
    a >= 0 && (this._names.splice(a, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function h1(e, a) {
  for (var r = Nm(e), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function m1(e, a) {
  for (var r = Nm(e), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function sR(e) {
  return function() {
    h1(this, e);
  };
}
function uR(e) {
  return function() {
    m1(this, e);
  };
}
function cR(e, a) {
  return function() {
    (a.apply(this, arguments) ? h1 : m1)(this, e);
  };
}
function fR(e, a) {
  var r = f1(e + "");
  if (arguments.length < 2) {
    for (var l = Nm(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? cR : a ? sR : uR)(r, a));
}
function dR() {
  this.textContent = "";
}
function hR(e) {
  return function() {
    this.textContent = e;
  };
}
function mR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function pR(e) {
  return arguments.length ? this.each(e == null ? dR : (typeof e == "function" ? mR : hR)(e)) : this.node().textContent;
}
function gR() {
  this.innerHTML = "";
}
function vR(e) {
  return function() {
    this.innerHTML = e;
  };
}
function yR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function bR(e) {
  return arguments.length ? this.each(e == null ? gR : (typeof e == "function" ? yR : vR)(e)) : this.node().innerHTML;
}
function xR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function wR() {
  return this.each(xR);
}
function _R() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function SR() {
  return this.each(_R);
}
function ER(e) {
  var a = typeof e == "function" ? e : r1(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function NR() {
  return null;
}
function CR(e, a) {
  var r = typeof e == "function" ? e : r1(e), l = a == null ? NR : typeof a == "function" ? a : Em(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function RR() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function TR() {
  return this.each(RR);
}
function MR() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function AR() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function DR(e) {
  return this.select(e ? AR : MR);
}
function jR(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function OR(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function zR(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function LR(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function kR(e, a, r) {
  return function() {
    var l = this.__on, s, u = OR(a);
    if (l) {
      for (var c = 0, d = l.length; c < d; ++c)
        if ((s = l[c]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = r), s.value = a;
          return;
        }
    }
    this.addEventListener(e.type, u, r), s = { type: e.type, name: e.name, value: a, listener: u, options: r }, l ? l.push(s) : this.__on = [s];
  };
}
function HR(e, a, r) {
  var l = zR(e + ""), s, u = l.length, c;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var p = 0, h = d.length, v; p < h; ++p)
        for (s = 0, v = d[p]; s < u; ++s)
          if ((c = l[s]).type === v.type && c.name === v.name)
            return v.value;
    }
    return;
  }
  for (d = a ? kR : LR, s = 0; s < u; ++s) this.each(d(l[s], a, r));
  return this;
}
function p1(e, a, r) {
  var l = c1(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function BR(e, a) {
  return function() {
    return p1(this, e, a);
  };
}
function UR(e, a) {
  return function() {
    return p1(this, e, a.apply(this, arguments));
  };
}
function VR(e, a) {
  return this.each((typeof a == "function" ? UR : BR)(e, a));
}
function* qR() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var g1 = [null];
function Zn(e, a) {
  this._groups = e, this._parents = a;
}
function os() {
  return new Zn([[document.documentElement]], g1);
}
function $R() {
  return this;
}
Zn.prototype = os.prototype = {
  constructor: Zn,
  select: mC,
  selectAll: yC,
  selectChild: _C,
  selectChildren: CC,
  filter: RC,
  data: OC,
  enter: TC,
  exit: LC,
  join: kC,
  merge: HC,
  selection: $R,
  order: BC,
  sort: UC,
  call: qC,
  nodes: $C,
  node: IC,
  size: YC,
  empty: GC,
  each: XC,
  attr: WC,
  style: aR,
  property: oR,
  classed: fR,
  text: pR,
  html: bR,
  raise: wR,
  lower: SR,
  append: ER,
  insert: CR,
  remove: TR,
  clone: DR,
  datum: jR,
  on: HR,
  dispatch: VR,
  [Symbol.iterator]: qR
};
function Fn(e) {
  return typeof e == "string" ? new Zn([[document.querySelector(e)]], [document.documentElement]) : new Zn([[e]], g1);
}
function IR(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function xa(e, a) {
  if (e = IR(e), a === void 0 && (a = e.currentTarget), a) {
    var r = a.ownerSVGElement || a;
    if (r.createSVGPoint) {
      var l = r.createSVGPoint();
      return l.x = e.clientX, l.y = e.clientY, l = l.matrixTransform(a.getScreenCTM().inverse()), [l.x, l.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [e.clientX - s.left - a.clientLeft, e.clientY - s.top - a.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const YR = { passive: !1 }, Go = { capture: !0, passive: !1 };
function ih(e) {
  e.stopImmediatePropagation();
}
function El(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function v1(e) {
  var a = e.document.documentElement, r = Fn(e).on("dragstart.drag", El, Go);
  "onselectstart" in a ? r.on("selectstart.drag", El, Go) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function y1(e, a) {
  var r = e.document.documentElement, l = Fn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", El, Go), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const Cu = (e) => () => e;
function kh(e, {
  sourceEvent: a,
  subject: r,
  target: l,
  identifier: s,
  active: u,
  x: c,
  y: d,
  dx: p,
  dy: h,
  dispatch: v
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    subject: { value: r, enumerable: !0, configurable: !0 },
    target: { value: l, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: d, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: h, enumerable: !0, configurable: !0 },
    _: { value: v }
  });
}
kh.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function GR(e) {
  return !e.ctrlKey && !e.button;
}
function XR() {
  return this.parentNode;
}
function FR(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function ZR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function b1() {
  var e = GR, a = XR, r = FR, l = ZR, s = {}, u = Cc("start", "drag", "end"), c = 0, d, p, h, v, g = 0;
  function b(O) {
    O.on("mousedown.drag", x).filter(l).on("touchstart.drag", N).on("touchmove.drag", C, YR).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(O, k) {
    if (!(v || !e.call(this, O, k))) {
      var H = E(this, a.call(this, O, k), O, k, "mouse");
      H && (Fn(O.view).on("mousemove.drag", _, Go).on("mouseup.drag", R, Go), v1(O.view), ih(O), h = !1, d = O.clientX, p = O.clientY, H("start", O));
    }
  }
  function _(O) {
    if (El(O), !h) {
      var k = O.clientX - d, H = O.clientY - p;
      h = k * k + H * H > g;
    }
    s.mouse("drag", O);
  }
  function R(O) {
    Fn(O.view).on("mousemove.drag mouseup.drag", null), y1(O.view, h), El(O), s.mouse("end", O);
  }
  function N(O, k) {
    if (e.call(this, O, k)) {
      var H = O.changedTouches, V = a.call(this, O, k), A = H.length, I, ne;
      for (I = 0; I < A; ++I)
        (ne = E(this, V, O, k, H[I].identifier, H[I])) && (ih(O), ne("start", O, H[I]));
    }
  }
  function C(O) {
    var k = O.changedTouches, H = k.length, V, A;
    for (V = 0; V < H; ++V)
      (A = s[k[V].identifier]) && (El(O), A("drag", O, k[V]));
  }
  function D(O) {
    var k = O.changedTouches, H = k.length, V, A;
    for (v && clearTimeout(v), v = setTimeout(function() {
      v = null;
    }, 500), V = 0; V < H; ++V)
      (A = s[k[V].identifier]) && (ih(O), A("end", O, k[V]));
  }
  function E(O, k, H, V, A, I) {
    var ne = u.copy(), $ = xa(I || H, k), K, oe, z;
    if ((z = r.call(O, new kh("beforestart", {
      sourceEvent: H,
      target: b,
      identifier: A,
      active: c,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: ne
    }), V)) != null)
      return K = z.x - $[0] || 0, oe = z.y - $[1] || 0, function Y(T, L, F) {
        var G = $, te;
        switch (T) {
          case "start":
            s[A] = Y, te = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            $ = xa(F || L, k), te = c;
            break;
        }
        ne.call(
          T,
          O,
          new kh(T, {
            sourceEvent: L,
            subject: z,
            target: b,
            identifier: A,
            active: te,
            x: $[0] + K,
            y: $[1] + oe,
            dx: $[0] - G[0],
            dy: $[1] - G[1],
            dispatch: ne
          }),
          V
        );
      };
  }
  return b.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : Cu(!!O), b) : e;
  }, b.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : Cu(O), b) : a;
  }, b.subject = function(O) {
    return arguments.length ? (r = typeof O == "function" ? O : Cu(O), b) : r;
  }, b.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : Cu(!!O), b) : l;
  }, b.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? b : O;
  }, b.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, b) : Math.sqrt(g);
  }, b;
}
function Cm(e, a, r) {
  e.prototype = a.prototype = r, r.constructor = e;
}
function x1(e, a) {
  var r = Object.create(e.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function ss() {
}
var Xo = 0.7, sc = 1 / Xo, Nl = "\\s*([+-]?\\d+)\\s*", Fo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Va = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", PR = /^#([0-9a-f]{3,8})$/, QR = new RegExp(`^rgb\\(${Nl},${Nl},${Nl}\\)$`), KR = new RegExp(`^rgb\\(${Va},${Va},${Va}\\)$`), JR = new RegExp(`^rgba\\(${Nl},${Nl},${Nl},${Fo}\\)$`), WR = new RegExp(`^rgba\\(${Va},${Va},${Va},${Fo}\\)$`), eT = new RegExp(`^hsl\\(${Fo},${Va},${Va}\\)$`), tT = new RegExp(`^hsla\\(${Fo},${Va},${Va},${Fo}\\)$`), Ty = {
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
Cm(ss, Tr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: My,
  // Deprecated! Use color.formatHex.
  formatHex: My,
  formatHex8: nT,
  formatHsl: aT,
  formatRgb: Ay,
  toString: Ay
});
function My() {
  return this.rgb().formatHex();
}
function nT() {
  return this.rgb().formatHex8();
}
function aT() {
  return w1(this).formatHsl();
}
function Ay() {
  return this.rgb().formatRgb();
}
function Tr(e) {
  var a, r;
  return e = (e + "").trim().toLowerCase(), (a = PR.exec(e)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? Dy(a) : r === 3 ? new zn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? Ru(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? Ru(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = QR.exec(e)) ? new zn(a[1], a[2], a[3], 1) : (a = KR.exec(e)) ? new zn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = JR.exec(e)) ? Ru(a[1], a[2], a[3], a[4]) : (a = WR.exec(e)) ? Ru(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = eT.exec(e)) ? zy(a[1], a[2] / 100, a[3] / 100, 1) : (a = tT.exec(e)) ? zy(a[1], a[2] / 100, a[3] / 100, a[4]) : Ty.hasOwnProperty(e) ? Dy(Ty[e]) : e === "transparent" ? new zn(NaN, NaN, NaN, 0) : null;
}
function Dy(e) {
  return new zn(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ru(e, a, r, l) {
  return l <= 0 && (e = a = r = NaN), new zn(e, a, r, l);
}
function iT(e) {
  return e instanceof ss || (e = Tr(e)), e ? (e = e.rgb(), new zn(e.r, e.g, e.b, e.opacity)) : new zn();
}
function Hh(e, a, r, l) {
  return arguments.length === 1 ? iT(e) : new zn(e, a, r, l ?? 1);
}
function zn(e, a, r, l) {
  this.r = +e, this.g = +a, this.b = +r, this.opacity = +l;
}
Cm(zn, Hh, x1(ss, {
  brighter(e) {
    return e = e == null ? sc : Math.pow(sc, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xo : Math.pow(Xo, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new zn(Cr(this.r), Cr(this.g), Cr(this.b), uc(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: jy,
  // Deprecated! Use color.formatHex.
  formatHex: jy,
  formatHex8: rT,
  formatRgb: Oy,
  toString: Oy
}));
function jy() {
  return `#${Er(this.r)}${Er(this.g)}${Er(this.b)}`;
}
function rT() {
  return `#${Er(this.r)}${Er(this.g)}${Er(this.b)}${Er((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Oy() {
  const e = uc(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Cr(this.r)}, ${Cr(this.g)}, ${Cr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function uc(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Cr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Er(e) {
  return e = Cr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function zy(e, a, r, l) {
  return l <= 0 ? e = a = r = NaN : r <= 0 || r >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new wa(e, a, r, l);
}
function w1(e) {
  if (e instanceof wa) return new wa(e.h, e.s, e.l, e.opacity);
  if (e instanceof ss || (e = Tr(e)), !e) return new wa();
  if (e instanceof wa) return e;
  e = e.rgb();
  var a = e.r / 255, r = e.g / 255, l = e.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (r - l) / d + (r < l) * 6 : r === u ? c = (l - a) / d + 2 : c = (a - r) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new wa(c, d, p, e.opacity);
}
function lT(e, a, r, l) {
  return arguments.length === 1 ? w1(e) : new wa(e, a, r, l ?? 1);
}
function wa(e, a, r, l) {
  this.h = +e, this.s = +a, this.l = +r, this.opacity = +l;
}
Cm(wa, lT, x1(ss, {
  brighter(e) {
    return e = e == null ? sc : Math.pow(sc, e), new wa(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xo : Math.pow(Xo, e), new wa(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new zn(
      rh(e >= 240 ? e - 240 : e + 120, s, l),
      rh(e, s, l),
      rh(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new wa(Ly(this.h), Tu(this.s), Tu(this.l), uc(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = uc(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Ly(this.h)}, ${Tu(this.s) * 100}%, ${Tu(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Ly(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Tu(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function rh(e, a, r) {
  return (e < 60 ? a + (r - a) * e / 60 : e < 180 ? r : e < 240 ? a + (r - a) * (240 - e) / 60 : a) * 255;
}
const Rm = (e) => () => e;
function oT(e, a) {
  return function(r) {
    return e + r * a;
  };
}
function sT(e, a, r) {
  return e = Math.pow(e, r), a = Math.pow(a, r) - e, r = 1 / r, function(l) {
    return Math.pow(e + l * a, r);
  };
}
function uT(e) {
  return (e = +e) == 1 ? _1 : function(a, r) {
    return r - a ? sT(a, r, e) : Rm(isNaN(a) ? r : a);
  };
}
function _1(e, a) {
  var r = a - e;
  return r ? oT(e, r) : Rm(isNaN(e) ? a : e);
}
const cc = (function e(a) {
  var r = uT(a);
  function l(s, u) {
    var c = r((s = Hh(s)).r, (u = Hh(u)).r), d = r(s.g, u.g), p = r(s.b, u.b), h = _1(s.opacity, u.opacity);
    return function(v) {
      return s.r = c(v), s.g = d(v), s.b = p(v), s.opacity = h(v), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function cT(e, a) {
  a || (a = []);
  var r = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function fT(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dT(e, a) {
  var r = a ? a.length : 0, l = e ? Math.min(r, e.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = Vo(e[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function hT(e, a) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, a = +a, function(l) {
    return r.setTime(e * (1 - l) + a * l), r;
  };
}
function Ha(e, a) {
  return e = +e, a = +a, function(r) {
    return e * (1 - r) + a * r;
  };
}
function mT(e, a) {
  var r = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? r[s] = Vo(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var Bh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, lh = new RegExp(Bh.source, "g");
function pT(e) {
  return function() {
    return e;
  };
}
function gT(e) {
  return function(a) {
    return e(a) + "";
  };
}
function S1(e, a) {
  var r = Bh.lastIndex = lh.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = Bh.exec(e)) && (s = lh.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: Ha(l, s) })), r = lh.lastIndex;
  return r < a.length && (u = a.slice(r), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? gT(p[0].x) : pT(a) : (a = p.length, function(h) {
    for (var v = 0, g; v < a; ++v) d[(g = p[v]).i] = g.x(h);
    return d.join("");
  });
}
function Vo(e, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? Rm(a) : (r === "number" ? Ha : r === "string" ? (l = Tr(a)) ? (a = l, cc) : S1 : a instanceof Tr ? cc : a instanceof Date ? hT : fT(a) ? cT : Array.isArray(a) ? dT : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? mT : Ha)(e, a);
}
var ky = 180 / Math.PI, Uh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function E1(e, a, r, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * r + a * l) && (r -= e * p, l -= a * p), (d = Math.sqrt(r * r + l * l)) && (r /= d, l /= d, p /= d), e * l < a * r && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * ky,
    skewX: Math.atan(p) * ky,
    scaleX: c,
    scaleY: d
  };
}
var Mu;
function vT(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Uh : E1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function yT(e) {
  return e == null || (Mu || (Mu = document.createElementNS("http://www.w3.org/2000/svg", "g")), Mu.setAttribute("transform", e), !(e = Mu.transform.baseVal.consolidate())) ? Uh : (e = e.matrix, E1(e.a, e.b, e.c, e.d, e.e, e.f));
}
function N1(e, a, r, l) {
  function s(h) {
    return h.length ? h.pop() + " " : "";
  }
  function u(h, v, g, b, x, _) {
    if (h !== g || v !== b) {
      var R = x.push("translate(", null, a, null, r);
      _.push({ i: R - 4, x: Ha(h, g) }, { i: R - 2, x: Ha(v, b) });
    } else (g || b) && x.push("translate(" + g + a + b + r);
  }
  function c(h, v, g, b) {
    h !== v ? (h - v > 180 ? v += 360 : v - h > 180 && (h += 360), b.push({ i: g.push(s(g) + "rotate(", null, l) - 2, x: Ha(h, v) })) : v && g.push(s(g) + "rotate(" + v + l);
  }
  function d(h, v, g, b) {
    h !== v ? b.push({ i: g.push(s(g) + "skewX(", null, l) - 2, x: Ha(h, v) }) : v && g.push(s(g) + "skewX(" + v + l);
  }
  function p(h, v, g, b, x, _) {
    if (h !== g || v !== b) {
      var R = x.push(s(x) + "scale(", null, ",", null, ")");
      _.push({ i: R - 4, x: Ha(h, g) }, { i: R - 2, x: Ha(v, b) });
    } else (g !== 1 || b !== 1) && x.push(s(x) + "scale(" + g + "," + b + ")");
  }
  return function(h, v) {
    var g = [], b = [];
    return h = e(h), v = e(v), u(h.translateX, h.translateY, v.translateX, v.translateY, g, b), c(h.rotate, v.rotate, g, b), d(h.skewX, v.skewX, g, b), p(h.scaleX, h.scaleY, v.scaleX, v.scaleY, g, b), h = v = null, function(x) {
      for (var _ = -1, R = b.length, N; ++_ < R; ) g[(N = b[_]).i] = N.x(x);
      return g.join("");
    };
  };
}
var bT = N1(vT, "px, ", "px)", "deg)"), xT = N1(yT, ", ", ")", ")"), wT = 1e-12;
function Hy(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function _T(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function ST(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ju = (function e(a, r, l) {
  function s(u, c) {
    var d = u[0], p = u[1], h = u[2], v = c[0], g = c[1], b = c[2], x = v - d, _ = g - p, R = x * x + _ * _, N, C;
    if (R < wT)
      C = Math.log(b / h) / a, N = function(V) {
        return [
          d + V * x,
          p + V * _,
          h * Math.exp(a * V * C)
        ];
      };
    else {
      var D = Math.sqrt(R), E = (b * b - h * h + l * R) / (2 * h * r * D), O = (b * b - h * h - l * R) / (2 * b * r * D), k = Math.log(Math.sqrt(E * E + 1) - E), H = Math.log(Math.sqrt(O * O + 1) - O);
      C = (H - k) / a, N = function(V) {
        var A = V * C, I = Hy(k), ne = h / (r * D) * (I * ST(a * A + k) - _T(k));
        return [
          d + ne * x,
          p + ne * _,
          h * I / Hy(a * A + k)
        ];
      };
    }
    return N.duration = C * 1e3 * a / Math.SQRT2, N;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Tl = 0, Ho = 0, Do = 0, C1 = 1e3, fc, Bo, dc = 0, Mr = 0, Tc = 0, Zo = typeof performance == "object" && performance.now ? performance : Date, R1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Tm() {
  return Mr || (R1(ET), Mr = Zo.now() + Tc);
}
function ET() {
  Mr = 0;
}
function hc() {
  this._call = this._time = this._next = null;
}
hc.prototype = T1.prototype = {
  constructor: hc,
  restart: function(e, a, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Tm() : +r) + (a == null ? 0 : +a), !this._next && Bo !== this && (Bo ? Bo._next = this : fc = this, Bo = this), this._call = e, this._time = r, Vh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vh());
  }
};
function T1(e, a, r) {
  var l = new hc();
  return l.restart(e, a, r), l;
}
function NT() {
  Tm(), ++Tl;
  for (var e = fc, a; e; )
    (a = Mr - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Tl;
}
function By() {
  Mr = (dc = Zo.now()) + Tc, Tl = Ho = 0;
  try {
    NT();
  } finally {
    Tl = 0, RT(), Mr = 0;
  }
}
function CT() {
  var e = Zo.now(), a = e - dc;
  a > C1 && (Tc -= a, dc = e);
}
function RT() {
  for (var e, a = fc, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (r = a._next, a._next = null, a = e ? e._next = r : fc = r);
  Bo = e, Vh(l);
}
function Vh(e) {
  if (!Tl) {
    Ho && (Ho = clearTimeout(Ho));
    var a = e - Mr;
    a > 24 ? (e < 1 / 0 && (Ho = setTimeout(By, e - Zo.now() - Tc)), Do && (Do = clearInterval(Do))) : (Do || (dc = Zo.now(), Do = setInterval(CT, C1)), Tl = 1, R1(By));
  }
}
function Uy(e, a, r) {
  var l = new hc();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, r), l;
}
var TT = Cc("start", "end", "cancel", "interrupt"), MT = [], M1 = 0, Vy = 1, qh = 2, Wu = 3, qy = 4, $h = 5, ec = 6;
function Mc(e, a, r, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (r in c) return;
  AT(e, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: TT,
    tween: MT,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: M1
  });
}
function Mm(e, a) {
  var r = Ca(e, a);
  if (r.state > M1) throw new Error("too late; already scheduled");
  return r;
}
function Ya(e, a) {
  var r = Ca(e, a);
  if (r.state > Wu) throw new Error("too late; already running");
  return r;
}
function Ca(e, a) {
  var r = e.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function AT(e, a, r) {
  var l = e.__transition, s;
  l[a] = r, r.timer = T1(u, 0, r.time);
  function u(h) {
    r.state = Vy, r.timer.restart(c, r.delay, r.time), r.delay <= h && c(h - r.delay);
  }
  function c(h) {
    var v, g, b, x;
    if (r.state !== Vy) return p();
    for (v in l)
      if (x = l[v], x.name === r.name) {
        if (x.state === Wu) return Uy(c);
        x.state === qy ? (x.state = ec, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[v]) : +v < a && (x.state = ec, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[v]);
      }
    if (Uy(function() {
      r.state === Wu && (r.state = qy, r.timer.restart(d, r.delay, r.time), d(h));
    }), r.state = qh, r.on.call("start", e, e.__data__, r.index, r.group), r.state === qh) {
      for (r.state = Wu, s = new Array(b = r.tween.length), v = 0, g = -1; v < b; ++v)
        (x = r.tween[v].value.call(e, e.__data__, r.index, r.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(h) {
    for (var v = h < r.duration ? r.ease.call(null, h / r.duration) : (r.timer.restart(p), r.state = $h, 1), g = -1, b = s.length; ++g < b; )
      s[g].call(e, v);
    r.state === $h && (r.on.call("end", e, e.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = ec, r.timer.stop(), delete l[a];
    for (var h in l) return;
    delete e.__transition;
  }
}
function tc(e, a) {
  var r = e.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > qh && l.state < $h, l.state = ec, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete r[c];
    }
    u && delete e.__transition;
  }
}
function DT(e) {
  return this.each(function() {
    tc(this, e);
  });
}
function jT(e, a) {
  var r, l;
  return function() {
    var s = Ya(this, e), u = s.tween;
    if (u !== r) {
      l = r = u;
      for (var c = 0, d = l.length; c < d; ++c)
        if (l[c].name === a) {
          l = l.slice(), l.splice(c, 1);
          break;
        }
    }
    s.tween = l;
  };
}
function OT(e, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = Ya(this, e), c = u.tween;
    if (c !== l) {
      s = (l = c).slice();
      for (var d = { name: a, value: r }, p = 0, h = s.length; p < h; ++p)
        if (s[p].name === a) {
          s[p] = d;
          break;
        }
      p === h && s.push(d);
    }
    u.tween = s;
  };
}
function zT(e, a) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = Ca(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? jT : OT)(r, e, a));
}
function Am(e, a, r) {
  var l = e._id;
  return e.each(function() {
    var s = Ya(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return Ca(s, l).value[a];
  };
}
function A1(e, a) {
  var r;
  return (typeof a == "number" ? Ha : a instanceof Tr ? cc : (r = Tr(a)) ? (a = r, cc) : S1)(e, a);
}
function LT(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function kT(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function HT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function BT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function UT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function VT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function qT(e, a) {
  var r = Rc(e), l = r === "transform" ? xT : A1;
  return this.attrTween(e, typeof a == "function" ? (r.local ? VT : UT)(r, l, Am(this, "attr." + e, a)) : a == null ? (r.local ? kT : LT)(r) : (r.local ? BT : HT)(r, l, a));
}
function $T(e, a) {
  return function(r) {
    this.setAttribute(e, a.call(this, r));
  };
}
function IT(e, a) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, a.call(this, r));
  };
}
function YT(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && IT(e, u)), r;
  }
  return s._value = a, s;
}
function GT(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && $T(e, u)), r;
  }
  return s._value = a, s;
}
function XT(e, a) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = Rc(e);
  return this.tween(r, (l.local ? YT : GT)(l, a));
}
function FT(e, a) {
  return function() {
    Mm(this, e).delay = +a.apply(this, arguments);
  };
}
function ZT(e, a) {
  return a = +a, function() {
    Mm(this, e).delay = a;
  };
}
function PT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? FT : ZT)(a, e)) : Ca(this.node(), a).delay;
}
function QT(e, a) {
  return function() {
    Ya(this, e).duration = +a.apply(this, arguments);
  };
}
function KT(e, a) {
  return a = +a, function() {
    Ya(this, e).duration = a;
  };
}
function JT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? QT : KT)(a, e)) : Ca(this.node(), a).duration;
}
function WT(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Ya(this, e).ease = a;
  };
}
function eM(e) {
  var a = this._id;
  return arguments.length ? this.each(WT(a, e)) : Ca(this.node(), a).ease;
}
function tM(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    Ya(this, e).ease = r;
  };
}
function nM(e) {
  if (typeof e != "function") throw new Error();
  return this.each(tM(this._id, e));
}
function aM(e) {
  typeof e != "function" && (e = o1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, h = 0; h < c; ++h)
      (p = u[h]) && e.call(p, p.__data__, h, u) && d.push(p);
  return new mi(l, this._parents, this._name, this._id);
}
function iM(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, r = e._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], h = r[d], v = p.length, g = c[d] = new Array(v), b, x = 0; x < v; ++x)
      (b = p[x] || h[x]) && (g[x] = b);
  for (; d < l; ++d)
    c[d] = a[d];
  return new mi(c, this._parents, this._name, this._id);
}
function rM(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function lM(e, a, r) {
  var l, s, u = rM(a) ? Mm : Ya;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, r), c.on = s;
  };
}
function oM(e, a) {
  var r = this._id;
  return arguments.length < 2 ? Ca(this.node(), r).on.on(e) : this.each(lM(r, e, a));
}
function sM(e) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    a && a.removeChild(this);
  };
}
function uM() {
  return this.on("end.remove", sM(this._id));
}
function cM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = Em(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, h = u[c] = new Array(p), v, g, b = 0; b < p; ++b)
      (v = d[b]) && (g = e.call(v, v.__data__, b, d)) && ("__data__" in v && (g.__data__ = v.__data__), h[b] = g, Mc(h[b], a, r, b, h, Ca(v, r)));
  return new mi(u, this._parents, a, r);
}
function fM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = l1(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], h = p.length, v, g = 0; g < h; ++g)
      if (v = p[g]) {
        for (var b = e.call(v, v.__data__, g, p), x, _ = Ca(v, r), R = 0, N = b.length; R < N; ++R)
          (x = b[R]) && Mc(x, a, r, R, b, _);
        u.push(b), c.push(v);
      }
  return new mi(u, c, a, r);
}
var dM = os.prototype.constructor;
function hM() {
  return new dM(this._groups, this._parents);
}
function mM(e, a) {
  var r, l, s;
  return function() {
    var u = Rl(this, e), c = (this.style.removeProperty(e), Rl(this, e));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function D1(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function pM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = Rl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function gM(e, a, r) {
  var l, s, u;
  return function() {
    var c = Rl(this, e), d = r(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), Rl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function vM(e, a) {
  var r, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = Ya(this, e), h = p.on, v = p.value[u] == null ? d || (d = D1(a)) : void 0;
    (h !== r || s !== v) && (l = (r = h).copy()).on(c, s = v), p.on = l;
  };
}
function yM(e, a, r) {
  var l = (e += "") == "transform" ? bT : A1;
  return a == null ? this.styleTween(e, mM(e, l)).on("end.style." + e, D1(e)) : typeof a == "function" ? this.styleTween(e, gM(e, l, Am(this, "style." + e, a))).each(vM(this._id, e)) : this.styleTween(e, pM(e, l, a), r).on("end.style." + e, null);
}
function bM(e, a, r) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), r);
  };
}
function xM(e, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && bM(e, c, r)), l;
  }
  return u._value = a, u;
}
function wM(e, a, r) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, xM(e, a, r ?? ""));
}
function _M(e) {
  return function() {
    this.textContent = e;
  };
}
function SM(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function EM(e) {
  return this.tween("text", typeof e == "function" ? SM(Am(this, "text", e)) : _M(e == null ? "" : e + ""));
}
function NM(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function CM(e) {
  var a, r;
  function l() {
    var s = e.apply(this, arguments);
    return s !== r && (a = (r = s) && NM(s)), a;
  }
  return l._value = e, l;
}
function RM(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, CM(e));
}
function TM() {
  for (var e = this._name, a = this._id, r = j1(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, h = 0; h < d; ++h)
      if (p = c[h]) {
        var v = Ca(p, a);
        Mc(p, e, r, h, c, {
          time: v.time + v.delay + v.duration,
          delay: 0,
          duration: v.duration,
          ease: v.ease
        });
      }
  return new mi(l, this._parents, e, r);
}
function MM() {
  var e, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var h = Ya(this, l), v = h.on;
      v !== e && (a = (e = v).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), h.on = a;
    }), s === 0 && u();
  });
}
var AM = 0;
function mi(e, a, r, l) {
  this._groups = e, this._parents = a, this._name = r, this._id = l;
}
function j1() {
  return ++AM;
}
var ui = os.prototype;
mi.prototype = {
  constructor: mi,
  select: cM,
  selectAll: fM,
  selectChild: ui.selectChild,
  selectChildren: ui.selectChildren,
  filter: aM,
  merge: iM,
  selection: hM,
  transition: TM,
  call: ui.call,
  nodes: ui.nodes,
  node: ui.node,
  size: ui.size,
  empty: ui.empty,
  each: ui.each,
  on: oM,
  attr: qT,
  attrTween: XT,
  style: yM,
  styleTween: wM,
  text: EM,
  textTween: RM,
  remove: uM,
  tween: zT,
  delay: PT,
  duration: JT,
  ease: eM,
  easeVarying: nM,
  end: MM,
  [Symbol.iterator]: ui[Symbol.iterator]
};
function DM(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var jM = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: DM
};
function OM(e, a) {
  for (var r; !(r = e.__transition) || !(r = r[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function zM(e) {
  var a, r;
  e instanceof mi ? (a = e._id, e = e._name) : (a = j1(), (r = jM).time = Tm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, h = 0; h < d; ++h)
      (p = c[h]) && Mc(p, e, a, h, c, r || OM(p, a));
  return new mi(l, this._parents, e, a);
}
os.prototype.interrupt = DT;
os.prototype.transition = zM;
const Au = (e) => () => e;
function LM(e, {
  sourceEvent: a,
  target: r,
  transform: l,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: l, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function di(e, a, r) {
  this.k = e, this.x = a, this.y = r;
}
di.prototype = {
  constructor: di,
  scale: function(e) {
    return e === 1 ? this : new di(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new di(this.k, this.x + this.k * e, this.y + this.k * a);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ac = new di(1, 0, 0);
O1.prototype = di.prototype;
function O1(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Ac;
  return e.__zoom;
}
function oh(e) {
  e.stopImmediatePropagation();
}
function jo(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function kM(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function HM() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function $y() {
  return this.__zoom || Ac;
}
function BM(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function UM() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function VM(e, a, r) {
  var l = e.invertX(a[0][0]) - r[0][0], s = e.invertX(a[1][0]) - r[1][0], u = e.invertY(a[0][1]) - r[0][1], c = e.invertY(a[1][1]) - r[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function z1() {
  var e = kM, a = HM, r = VM, l = BM, s = UM, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = Ju, h = Cc("start", "zoom", "end"), v, g, b, x = 500, _ = 150, R = 0, N = 10;
  function C(z) {
    z.property("__zoom", $y).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", ne).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", oe).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  C.transform = function(z, Y, T, L) {
    var F = z.selection ? z.selection() : z;
    F.property("__zoom", $y), z !== F ? k(z, Y, T, L) : F.interrupt().each(function() {
      H(this, arguments).event(L).start().zoom(null, typeof Y == "function" ? Y.apply(this, arguments) : Y).end();
    });
  }, C.scaleBy = function(z, Y, T, L) {
    C.scaleTo(z, function() {
      var F = this.__zoom.k, G = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return F * G;
    }, T, L);
  }, C.scaleTo = function(z, Y, T, L) {
    C.transform(z, function() {
      var F = a.apply(this, arguments), G = this.__zoom, te = T == null ? O(F) : typeof T == "function" ? T.apply(this, arguments) : T, j = G.invert(te), U = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return r(E(D(G, U), te, j), F, c);
    }, T, L);
  }, C.translateBy = function(z, Y, T, L) {
    C.transform(z, function() {
      return r(this.__zoom.translate(
        typeof Y == "function" ? Y.apply(this, arguments) : Y,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), a.apply(this, arguments), c);
    }, null, L);
  }, C.translateTo = function(z, Y, T, L, F) {
    C.transform(z, function() {
      var G = a.apply(this, arguments), te = this.__zoom, j = L == null ? O(G) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(Ac.translate(j[0], j[1]).scale(te.k).translate(
        typeof Y == "function" ? -Y.apply(this, arguments) : -Y,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), G, c);
    }, L, F);
  };
  function D(z, Y) {
    return Y = Math.max(u[0], Math.min(u[1], Y)), Y === z.k ? z : new di(Y, z.x, z.y);
  }
  function E(z, Y, T) {
    var L = Y[0] - T[0] * z.k, F = Y[1] - T[1] * z.k;
    return L === z.x && F === z.y ? z : new di(z.k, L, F);
  }
  function O(z) {
    return [(+z[0][0] + +z[1][0]) / 2, (+z[0][1] + +z[1][1]) / 2];
  }
  function k(z, Y, T, L) {
    z.on("start.zoom", function() {
      H(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      H(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var F = this, G = arguments, te = H(F, G).event(L), j = a.apply(F, G), U = T == null ? O(j) : typeof T == "function" ? T.apply(F, G) : T, Q = Math.max(j[1][0] - j[0][0], j[1][1] - j[0][1]), ee = F.__zoom, ce = typeof Y == "function" ? Y.apply(F, G) : Y, ae = p(ee.invert(U).concat(Q / ee.k), ce.invert(U).concat(Q / ce.k));
      return function(se) {
        if (se === 1) se = ce;
        else {
          var P = ae(se), me = Q / P[2];
          se = new di(me, U[0] - P[0] * me, U[1] - P[1] * me);
        }
        te.zoom(null, se);
      };
    });
  }
  function H(z, Y, T) {
    return !T && z.__zooming || new V(z, Y);
  }
  function V(z, Y) {
    this.that = z, this.args = Y, this.active = 0, this.sourceEvent = null, this.extent = a.apply(z, Y), this.taps = 0;
  }
  V.prototype = {
    event: function(z) {
      return z && (this.sourceEvent = z), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(z, Y) {
      return this.mouse && z !== "mouse" && (this.mouse[1] = Y.invert(this.mouse[0])), this.touch0 && z !== "touch" && (this.touch0[1] = Y.invert(this.touch0[0])), this.touch1 && z !== "touch" && (this.touch1[1] = Y.invert(this.touch1[0])), this.that.__zoom = Y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(z) {
      var Y = Fn(this.that).datum();
      h.call(
        z,
        this.that,
        new LM(z, {
          sourceEvent: this.sourceEvent,
          target: C,
          transform: this.that.__zoom,
          dispatch: h
        }),
        Y
      );
    }
  };
  function A(z, ...Y) {
    if (!e.apply(this, arguments)) return;
    var T = H(this, Y).event(z), L = this.__zoom, F = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, l.apply(this, arguments)))), G = xa(z);
    if (T.wheel)
      (T.mouse[0][0] !== G[0] || T.mouse[0][1] !== G[1]) && (T.mouse[1] = L.invert(T.mouse[0] = G)), clearTimeout(T.wheel);
    else {
      if (L.k === F) return;
      T.mouse = [G, L.invert(G)], tc(this), T.start();
    }
    jo(z), T.wheel = setTimeout(te, _), T.zoom("mouse", r(E(D(L, F), T.mouse[0], T.mouse[1]), T.extent, c));
    function te() {
      T.wheel = null, T.end();
    }
  }
  function I(z, ...Y) {
    if (b || !e.apply(this, arguments)) return;
    var T = z.currentTarget, L = H(this, Y, !0).event(z), F = Fn(z.view).on("mousemove.zoom", U, !0).on("mouseup.zoom", Q, !0), G = xa(z, T), te = z.clientX, j = z.clientY;
    v1(z.view), oh(z), L.mouse = [G, this.__zoom.invert(G)], tc(this), L.start();
    function U(ee) {
      if (jo(ee), !L.moved) {
        var ce = ee.clientX - te, ae = ee.clientY - j;
        L.moved = ce * ce + ae * ae > R;
      }
      L.event(ee).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = xa(ee, T), L.mouse[1]), L.extent, c));
    }
    function Q(ee) {
      F.on("mousemove.zoom mouseup.zoom", null), y1(ee.view, L.moved), jo(ee), L.event(ee).end();
    }
  }
  function ne(z, ...Y) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, L = xa(z.changedTouches ? z.changedTouches[0] : z, this), F = T.invert(L), G = T.k * (z.shiftKey ? 0.5 : 2), te = r(E(D(T, G), L, F), a.apply(this, Y), c);
      jo(z), d > 0 ? Fn(this).transition().duration(d).call(k, te, L, z) : Fn(this).call(C.transform, te, L, z);
    }
  }
  function $(z, ...Y) {
    if (e.apply(this, arguments)) {
      var T = z.touches, L = T.length, F = H(this, Y, z.changedTouches.length === L).event(z), G, te, j, U;
      for (oh(z), te = 0; te < L; ++te)
        j = T[te], U = xa(j, this), U = [U, this.__zoom.invert(U), j.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== U[2] && (F.touch1 = U, F.taps = 0) : (F.touch0 = U, G = !0, F.taps = 1 + !!v);
      v && (v = clearTimeout(v)), G && (F.taps < 2 && (g = U[0], v = setTimeout(function() {
        v = null;
      }, x)), tc(this), F.start());
    }
  }
  function K(z, ...Y) {
    if (this.__zooming) {
      var T = H(this, Y).event(z), L = z.changedTouches, F = L.length, G, te, j, U;
      for (jo(z), G = 0; G < F; ++G)
        te = L[G], j = xa(te, this), T.touch0 && T.touch0[2] === te.identifier ? T.touch0[0] = j : T.touch1 && T.touch1[2] === te.identifier && (T.touch1[0] = j);
      if (te = T.that.__zoom, T.touch1) {
        var Q = T.touch0[0], ee = T.touch0[1], ce = T.touch1[0], ae = T.touch1[1], se = (se = ce[0] - Q[0]) * se + (se = ce[1] - Q[1]) * se, P = (P = ae[0] - ee[0]) * P + (P = ae[1] - ee[1]) * P;
        te = D(te, Math.sqrt(se / P)), j = [(Q[0] + ce[0]) / 2, (Q[1] + ce[1]) / 2], U = [(ee[0] + ae[0]) / 2, (ee[1] + ae[1]) / 2];
      } else if (T.touch0) j = T.touch0[0], U = T.touch0[1];
      else return;
      T.zoom("touch", r(E(te, j, U), T.extent, c));
    }
  }
  function oe(z, ...Y) {
    if (this.__zooming) {
      var T = H(this, Y).event(z), L = z.changedTouches, F = L.length, G, te;
      for (oh(z), b && clearTimeout(b), b = setTimeout(function() {
        b = null;
      }, x), G = 0; G < F; ++G)
        te = L[G], T.touch0 && T.touch0[2] === te.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === te.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (te = xa(te, this), Math.hypot(g[0] - te[0], g[1] - te[1]) < N)) {
        var j = Fn(this).on("dblclick.zoom");
        j && j.apply(this, arguments);
      }
    }
  }
  return C.wheelDelta = function(z) {
    return arguments.length ? (l = typeof z == "function" ? z : Au(+z), C) : l;
  }, C.filter = function(z) {
    return arguments.length ? (e = typeof z == "function" ? z : Au(!!z), C) : e;
  }, C.touchable = function(z) {
    return arguments.length ? (s = typeof z == "function" ? z : Au(!!z), C) : s;
  }, C.extent = function(z) {
    return arguments.length ? (a = typeof z == "function" ? z : Au([[+z[0][0], +z[0][1]], [+z[1][0], +z[1][1]]]), C) : a;
  }, C.scaleExtent = function(z) {
    return arguments.length ? (u[0] = +z[0], u[1] = +z[1], C) : [u[0], u[1]];
  }, C.translateExtent = function(z) {
    return arguments.length ? (c[0][0] = +z[0][0], c[1][0] = +z[1][0], c[0][1] = +z[0][1], c[1][1] = +z[1][1], C) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, C.constrain = function(z) {
    return arguments.length ? (r = z, C) : r;
  }, C.duration = function(z) {
    return arguments.length ? (d = +z, C) : d;
  }, C.interpolate = function(z) {
    return arguments.length ? (p = z, C) : p;
  }, C.on = function() {
    var z = h.on.apply(h, arguments);
    return z === h ? C : z;
  }, C.clickDistance = function(z) {
    return arguments.length ? (R = (z = +z) * z, C) : Math.sqrt(R);
  }, C.tapDistance = function(z) {
    return arguments.length ? (N = +z, C) : N;
  }, C;
}
const Ea = {
  error001: (e = "react") => `Seems like you have not used zustand provider as an ancestor. Help: https://${e}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (e) => `The old edge with id=${e} does not exist.`,
  error009: (e) => `Marker type "${e}" doesn't exist.`,
  error008: (e, { id: a, sourceHandle: r, targetHandle: l }) => `Couldn't create edge for ${e} handle id: "${e === "source" ? r : l}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
  error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (e = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (e) => `Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, Po = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], L1 = ["Enter", " ", "Escape"], k1 = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: a, y: r }) => `Moved selected node ${e}. New position, x: ${a}, y: ${r}`,
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
var Ml;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Ml || (Ml = {}));
var Rr;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Rr || (Rr = {}));
var Qo;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Qo || (Qo = {}));
const H1 = {
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
var Pi;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Pi || (Pi = {}));
var mc;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(mc || (mc = {}));
var je;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(je || (je = {}));
const Iy = {
  [je.Left]: je.Right,
  [je.Right]: je.Left,
  [je.Top]: je.Bottom,
  [je.Bottom]: je.Top
};
function B1(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const U1 = (e) => "id" in e && "source" in e && "target" in e, qM = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Dm = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), us = (e, a = [0, 0]) => {
  const { width: r, height: l } = gi(e), s = e.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, $M = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Dm(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? pc(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Dc(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return jc(r);
}, cs = (e, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = Dc(r, pc(s)), l = !0);
  }), l ? jc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, jm = (e, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...Ll(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const h of e.values()) {
    const { measured: v, selectable: g = !0, hidden: b = !1 } = h;
    if (c && !g || b)
      continue;
    const x = v.width ?? h.width ?? h.initialWidth ?? null, _ = v.height ?? h.height ?? h.initialHeight ?? null, R = Ko(d, Dl(h)), N = (x ?? 0) * (_ ?? 0), C = u && R > 0;
    (!h.internals.handleBounds || C || R >= N || h.dragging) && p.push(h);
  }
  return p;
}, IM = (e, a) => {
  const r = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function YM(e, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function GM({ nodes: e, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = YM(e, c), p = cs(d), h = zm(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(h, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function V1({ nodeId: e, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(e), d = c.parentId ? r.get(c.parentId) : void 0, { x: p, y: h } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, v = c.origin ?? l;
  let g = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", Ea.error005());
    else {
      const x = d.measured.width, _ = d.measured.height;
      x && _ && (g = [
        [p, h],
        [p + x, h + _]
      ]);
    }
  else d && Dr(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + h],
    [c.extent[1][0] + p, c.extent[1][1] + h]
  ]);
  const b = Dr(g) ? Ar(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", Ea.error015()), {
    position: {
      x: b.x - p + (c.measured.width ?? 0) * v[0],
      y: b.y - h + (c.measured.height ?? 0) * v[1]
    },
    positionAbsolute: b
  };
}
async function XM({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((b) => b.id)), c = [];
  for (const b of r) {
    if (b.deletable === !1)
      continue;
    const x = u.has(b.id), _ = !x && b.parentId && c.find((R) => R.id === b.parentId);
    (x || _) && c.push(b);
  }
  const d = new Set(a.map((b) => b.id)), p = l.filter((b) => b.deletable !== !1), v = IM(c, p);
  for (const b of p)
    d.has(b.id) && !v.find((_) => _.id === b.id) && v.push(b);
  if (!s)
    return {
      edges: v,
      nodes: c
    };
  const g = await s({
    nodes: c,
    edges: v
  });
  return typeof g == "boolean" ? g ? { edges: v, nodes: c } : { edges: [], nodes: [] } : g;
}
const Al = (e, a = 0, r = 1) => Math.min(Math.max(e, a), r), Ar = (e = { x: 0, y: 0 }, a, r) => ({
  x: Al(e.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: Al(e.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function q1(e, a, r) {
  const { width: l, height: s } = gi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return Ar(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const Yy = (e, a, r) => e < a ? Al(Math.abs(e - a), 1, a) / a : e > r ? -Al(Math.abs(e - r), 1, a) / a : 0, Om = (e, a, r = 15, l = 40) => {
  const s = Yy(e.x, l, a.width - l) * r, u = Yy(e.y, l, a.height - l) * r;
  return [s, u];
}, Dc = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), Ih = ({ x: e, y: a, width: r, height: l }) => ({
  x: e,
  y: a,
  x2: e + r,
  y2: a + l
}), jc = ({ x: e, y: a, x2: r, y2: l }) => ({
  x: e,
  y: a,
  width: r - e,
  height: l - a
}), Dl = (e, a = [0, 0]) => {
  const { x: r, y: l } = Dm(e) ? e.internals.positionAbsolute : us(e, a);
  return {
    x: r,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, pc = (e, a = [0, 0]) => {
  const { x: r, y: l } = Dm(e) ? e.internals.positionAbsolute : us(e, a);
  return {
    x: r,
    y: l,
    x2: r + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, $1 = (e, a) => jc(Dc(Ih(e), Ih(a))), Ko = (e, a) => {
  const r = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(r * l);
}, Gy = (e) => _a(e.width) && _a(e.height) && _a(e.x) && _a(e.y), _a = (e) => !isNaN(e) && isFinite(e), I1 = (e, a) => (r, l) => {
}, fs = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), Ll = ({ x: e, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - r) / s,
    y: (a - l) / s
  };
  return u ? fs(d, c) : d;
}, jl = ({ x: e, y: a }, [r, l, s]) => ({
  x: e * s + r,
  y: a * s + l
});
function ml(e, a) {
  if (typeof e == "number")
    return Math.floor((a - a / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const r = parseFloat(e);
    if (!Number.isNaN(r))
      return Math.floor(r);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const r = parseFloat(e);
    if (!Number.isNaN(r))
      return Math.floor(a * r * 0.01);
  }
  return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function FM(e, a, r) {
  if (typeof e == "string" || typeof e == "number") {
    const l = ml(e, r), s = ml(e, a);
    return {
      top: l,
      right: s,
      bottom: l,
      left: s,
      x: s * 2,
      y: l * 2
    };
  }
  if (typeof e == "object") {
    const l = ml(e.top ?? e.y ?? 0, r), s = ml(e.bottom ?? e.y ?? 0, r), u = ml(e.left ?? e.x ?? 0, a), c = ml(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function ZM(e, a, r, l, s, u) {
  const { x: c, y: d } = jl(e, [a, r, l]), { x: p, y: h } = jl({ x: e.x + e.width, y: e.y + e.height }, [a, r, l]), v = s - p, g = u - h;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(v),
    bottom: Math.floor(g)
  };
}
const zm = (e, a, r, l, s, u) => {
  const c = FM(u, a, r), d = (a - c.x) / e.width, p = (r - c.y) / e.height, h = Math.min(d, p), v = Al(h, l, s), g = e.x + e.width / 2, b = e.y + e.height / 2, x = a / 2 - g * v, _ = r / 2 - b * v, R = ZM(e, x, _, v, a, r), N = {
    left: Math.min(R.left - c.left, 0),
    top: Math.min(R.top - c.top, 0),
    right: Math.min(R.right - c.right, 0),
    bottom: Math.min(R.bottom - c.bottom, 0)
  };
  return {
    x: x - N.left + N.right,
    y: _ - N.top + N.bottom,
    zoom: v
  };
}, Jo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Dr(e) {
  return e != null && e !== "parent";
}
function gi(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function Y1(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function G1(e, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...e }, c = l.get(r);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function Xy(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const r of e)
    if (!a.has(r))
      return !1;
  return !0;
}
function PM() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function QM(e) {
  return { ...k1, ...e || {} };
}
function qo(e, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = Sa(e), d = Ll({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: h } = r ? fs(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: h,
    ...d
  };
}
const Lm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), X1 = (e) => e?.getRootNode?.() || window?.document, KM = ["INPUT", "SELECT", "TEXTAREA"];
function F1(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : KM.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const Z1 = (e) => "clientX" in e, Sa = (e, a) => {
  const r = Z1(e), l = r ? e.clientX : e.touches?.[0].clientX, s = r ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, Fy = (e, a, r, l, s) => {
  const u = a.querySelectorAll(`.${e}`);
  return !u || !u.length ? null : Array.from(u).map((c) => {
    const d = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      type: e,
      nodeId: s,
      position: c.getAttribute("data-handlepos"),
      x: (d.left - r.left) / l,
      y: (d.top - r.top) / l,
      ...Lm(c)
    };
  });
};
function P1({ sourceX: e, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, h = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, v = Math.abs(p - e), g = Math.abs(h - a);
  return [p, h, v, g];
}
function Du(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function Zy({ pos: e, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (e) {
    case je.Left:
      return [a - Du(a - l, u), r];
    case je.Right:
      return [a + Du(l - a, u), r];
    case je.Top:
      return [a, r - Du(r - s, u)];
    case je.Bottom:
      return [a, r + Du(s - r, u)];
  }
}
function Q1({ sourceX: e, sourceY: a, sourcePosition: r = je.Bottom, targetX: l, targetY: s, targetPosition: u = je.Top, curvature: c = 0.25 }) {
  const [d, p] = Zy({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [h, v] = Zy({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, b, x, _] = P1({
    sourceX: e,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: d,
    sourceControlY: p,
    targetControlX: h,
    targetControlY: v
  });
  return [
    `M${e},${a} C${d},${p} ${h},${v} ${l},${s}`,
    g,
    b,
    x,
    _
  ];
}
function K1({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - e) / 2, u = r < e ? r + s : r - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function JM({ sourceNode: e, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function WM({ sourceNode: e, targetNode: a, width: r, height: l, transform: s }) {
  const u = Dc(pc(e), pc(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Ko(c, jc(u)) > 0;
}
const eA = ({ source: e, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${e}${a || ""}-${r}${l || ""}`, tA = (e, a) => a.some((r) => r.source === e.source && r.target === e.target && (r.sourceHandle === e.sourceHandle || !r.sourceHandle && !e.sourceHandle) && (r.targetHandle === e.targetHandle || !r.targetHandle && !e.targetHandle)), nA = (e, a, r = {}) => {
  if (!e.source || !e.target)
    return r.onError?.("006", Ea.error006()), a;
  const l = r.getEdgeId || eA;
  let s;
  return U1(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, tA(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function J1({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, d] = K1({
    sourceX: e,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${e},${a}L ${r},${l}`, s, u, c, d];
}
const Py = {
  [je.Left]: { x: -1, y: 0 },
  [je.Right]: { x: 1, y: 0 },
  [je.Top]: { x: 0, y: -1 },
  [je.Bottom]: { x: 0, y: 1 }
}, aA = ({ source: e, sourcePosition: a = je.Bottom, target: r }) => a === je.Left || a === je.Right ? e.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Qy = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function iA({ source: e, sourcePosition: a = je.Bottom, target: r, targetPosition: l = je.Top, center: s, offset: u, stepPosition: c }) {
  const d = Py[a], p = Py[l], h = { x: e.x + d.x * u, y: e.y + d.y * u }, v = { x: r.x + p.x * u, y: r.y + p.y * u }, g = aA({
    source: h,
    sourcePosition: a,
    target: v
  }), b = g.x !== 0 ? "x" : "y", x = g[b];
  let _ = [], R, N;
  const C = { x: 0, y: 0 }, D = { x: 0, y: 0 }, [, , E, O] = K1({
    sourceX: e.x,
    sourceY: e.y,
    targetX: r.x,
    targetY: r.y
  });
  if (d[b] * p[b] === -1) {
    b === "x" ? (R = s.x ?? h.x + (v.x - h.x) * c, N = s.y ?? (h.y + v.y) / 2) : (R = s.x ?? (h.x + v.x) / 2, N = s.y ?? h.y + (v.y - h.y) * c);
    const A = [
      { x: R, y: h.y },
      { x: R, y: v.y }
    ], I = [
      { x: h.x, y: N },
      { x: v.x, y: N }
    ];
    d[b] === x ? _ = b === "x" ? A : I : _ = b === "x" ? I : A;
  } else {
    const A = [{ x: h.x, y: v.y }], I = [{ x: v.x, y: h.y }];
    if (b === "x" ? _ = d.x === x ? I : A : _ = d.y === x ? A : I, a === l) {
      const z = Math.abs(e[b] - r[b]);
      if (z <= u) {
        const Y = Math.min(u - 1, u - z);
        d[b] === x ? C[b] = (h[b] > e[b] ? -1 : 1) * Y : D[b] = (v[b] > r[b] ? -1 : 1) * Y;
      }
    }
    if (a !== l) {
      const z = b === "x" ? "y" : "x", Y = d[b] === p[z], T = h[z] > v[z], L = h[z] < v[z];
      (d[b] === 1 && (!Y && T || Y && L) || d[b] !== 1 && (!Y && L || Y && T)) && (_ = b === "x" ? A : I);
    }
    const ne = { x: h.x + C.x, y: h.y + C.y }, $ = { x: v.x + D.x, y: v.y + D.y }, K = Math.max(Math.abs(ne.x - _[0].x), Math.abs($.x - _[0].x)), oe = Math.max(Math.abs(ne.y - _[0].y), Math.abs($.y - _[0].y));
    K >= oe ? (R = (ne.x + $.x) / 2, N = _[0].y) : (R = _[0].x, N = (ne.y + $.y) / 2);
  }
  const k = { x: h.x + C.x, y: h.y + C.y }, H = { x: v.x + D.x, y: v.y + D.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...k.x !== _[0].x || k.y !== _[0].y ? [k] : [],
    ..._,
    ...H.x !== _[_.length - 1].x || H.y !== _[_.length - 1].y ? [H] : [],
    r
  ], R, N, E, O];
}
function rA(e, a, r, l) {
  const s = Math.min(Qy(e, a) / 2, Qy(a, r) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === r.x || e.y === c && c === r.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const h = e.x < r.x ? -1 : 1, v = e.y < r.y ? 1 : -1;
    return `L ${u + s * h},${c}Q ${u},${c} ${u},${c + s * v}`;
  }
  const d = e.x < r.x ? 1 : -1, p = e.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function Yh({ sourceX: e, sourceY: a, sourcePosition: r = je.Bottom, targetX: l, targetY: s, targetPosition: u = je.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: h = 20, stepPosition: v = 0.5 }) {
  const [g, b, x, _, R] = iA({
    source: { x: e, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: h,
    stepPosition: v
  });
  let N = `M${g[0].x} ${g[0].y}`;
  for (let C = 1; C < g.length - 1; C++)
    N += rA(g[C - 1], g[C], g[C + 1], c);
  return N += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [N, b, x, _, R];
}
function Ky(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function lA(e) {
  const { sourceNode: a, targetNode: r } = e;
  if (!Ky(a) || !Ky(r))
    return null;
  const l = a.internals.handleBounds || Jy(a.handles), s = r.internals.handleBounds || Jy(r.handles), u = Wy(l?.source ?? [], e.sourceHandle), c = Wy(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Ml.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", Ea.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || je.Bottom, p = c?.position || je.Top, h = jr(a, u, d), v = jr(r, c, p);
  return {
    sourceX: h.x,
    sourceY: h.y,
    targetX: v.x,
    targetY: v.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function Jy(e) {
  if (!e)
    return null;
  const a = [], r = [];
  for (const l of e)
    l.width = l.width ?? 1, l.height = l.height ?? 1, l.type === "source" ? a.push(l) : l.type === "target" && r.push(l);
  return {
    source: a,
    target: r
  };
}
function jr(e, a, r = je.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? gi(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? r) {
    case je.Top:
      return { x: s + c / 2, y: u };
    case je.Right:
      return { x: s + c, y: u + d / 2 };
    case je.Bottom:
      return { x: s + c / 2, y: u + d };
    case je.Left:
      return { x: s, y: u + d / 2 };
  }
}
function Wy(e, a) {
  return e && (a ? e.find((r) => r.id === a) : e[0]) || null;
}
function Gh(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function oA(e, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const h = Gh(p, a);
      u.has(h) || (c.push({ id: h, color: p.color || r, ...p }), u.add(h));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const W1 = 1e3, sA = 10, km = {
  nodeOrigin: [0, 0],
  nodeExtent: Po,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, uA = {
  ...km,
  checkEquality: !0
};
function Hm(e, a) {
  const r = { ...e };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function cA(e, a, r) {
  const l = Hm(km, r);
  for (const s of e.values())
    if (s.parentId)
      Um(s, e, a, l);
    else {
      const u = us(s, l.nodeOrigin), c = Dr(s.extent) ? s.extent : l.nodeExtent, d = Ar(u, c, gi(s));
      s.internals.positionAbsolute = d;
    }
}
function fA(e, a) {
  if (!e.handles)
    return e.measured ? a?.internals.handleBounds : void 0;
  const r = [], l = [];
  for (const s of e.handles) {
    const u = {
      id: s.id,
      width: s.width ?? 1,
      height: s.height ?? 1,
      nodeId: e.id,
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
function Bm(e) {
  return e === "manual";
}
function Xh(e, a, r, l = {}) {
  const s = Hm(uA, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !Bm(s.zIndexMode) ? W1 : 0;
  let p = e.length > 0, h = !1;
  a.clear(), r.clear();
  for (const v of e) {
    let g = c.get(v.id);
    if (s.checkEquality && v === g?.internals.userNode)
      a.set(v.id, g);
    else {
      const b = us(v, s.nodeOrigin), x = Dr(v.extent) ? v.extent : s.nodeExtent, _ = Ar(b, x, gi(v));
      g = {
        ...s.defaults,
        ...v,
        measured: {
          width: v.measured?.width,
          height: v.measured?.height
        },
        internals: {
          positionAbsolute: _,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: fA(v, g),
          z: ew(v, d, s.zIndexMode),
          userNode: v
        }
      }, a.set(v.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), v.parentId && Um(g, a, r, l, u), h ||= v.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: h };
}
function dA(e, a) {
  if (!e.parentId)
    return;
  const r = a.get(e.parentId);
  r ? r.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Um(e, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = Hm(km, l), h = e.parentId, v = a.get(h);
  if (!v) {
    console.warn(`Parent node ${h} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  dA(e, r), s && !v.parentId && v.internals.rootParentIndex === void 0 && p === "auto" && (v.internals.rootParentIndex = ++s.i, v.internals.z = v.internals.z + s.i * sA), s && v.internals.rootParentIndex !== void 0 && (s.i = v.internals.rootParentIndex);
  const g = u && !Bm(p) ? W1 : 0, { x: b, y: x, z: _ } = hA(e, v, c, d, g, p), { positionAbsolute: R } = e.internals, N = b !== R.x || x !== R.y;
  (N || _ !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: N ? { x: b, y: x } : R,
      z: _
    }
  });
}
function ew(e, a, r) {
  const l = _a(e.zIndex) ? e.zIndex : 0;
  return Bm(r) ? l : l + (e.selected ? a : 0);
}
function hA(e, a, r, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = gi(e), h = us(e, r), v = Dr(e.extent) ? Ar(h, e.extent, p) : h;
  let g = Ar({ x: c + v.x, y: d + v.y }, l, p);
  e.extent === "parent" && (g = q1(g, p, a));
  const b = ew(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= b ? x + 1 : b
  };
}
function Vm(e, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? Dl(d), h = $1(p, c.rect);
    u.set(c.parentId, { expandedRect: h, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const h = d.internals.positionAbsolute, v = gi(d), g = d.origin ?? l, b = c.x < h.x ? Math.round(Math.abs(h.x - c.x)) : 0, x = c.y < h.y ? Math.round(Math.abs(h.y - c.y)) : 0, _ = Math.max(v.width, Math.round(c.width)), R = Math.max(v.height, Math.round(c.height)), N = (_ - v.width) * g[0], C = (R - v.height) * g[1];
    (b > 0 || x > 0 || N || C) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - b + N,
        y: d.position.y - x + C
      }
    }), r.get(p)?.forEach((D) => {
      e.some((E) => E.id === D.id) || s.push({
        id: D.id,
        type: "position",
        position: {
          x: D.position.x + b,
          y: D.position.y + x
        }
      });
    })), (v.width < c.width || v.height < c.height || b || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: _ + (b ? g[0] * b - N : 0),
        height: R + (x ? g[1] * x - C : 0)
      }
    });
  }), s;
}
function mA(e, a, r, l, s, u, c) {
  const d = l?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d)
    return { changes: [], updatedInternals: p };
  const h = [], v = window.getComputedStyle(d), { m22: g } = new window.DOMMatrixReadOnly(v.transform), b = [];
  for (const x of e.values()) {
    const _ = a.get(x.id);
    if (!_)
      continue;
    if (_.hidden) {
      a.set(_.id, {
        ..._,
        internals: {
          ..._.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const R = Lm(x.nodeElement), N = _.measured.width !== R.width || _.measured.height !== R.height;
    if (!!(R.width && R.height && (N || !_.internals.handleBounds || x.force))) {
      const D = x.nodeElement.getBoundingClientRect(), E = Dr(_.extent) ? _.extent : u;
      let { positionAbsolute: O } = _.internals;
      _.parentId && _.extent === "parent" ? O = q1(O, R, a.get(_.parentId)) : E && (O = Ar(O, E, R));
      const k = {
        ..._,
        measured: R,
        internals: {
          ..._.internals,
          positionAbsolute: O,
          handleBounds: {
            source: Fy("source", x.nodeElement, D, g, _.id),
            target: Fy("target", x.nodeElement, D, g, _.id)
          }
        }
      };
      a.set(_.id, k), _.parentId && Um(k, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, N && (h.push({
        id: _.id,
        type: "dimensions",
        dimensions: R
      }), _.expandParent && _.parentId && b.push({
        id: _.id,
        parentId: _.parentId,
        rect: Dl(k, s)
      }));
    }
  }
  if (b.length > 0) {
    const x = Vm(b, a, r, s);
    h.push(...x);
  }
  return { changes: h, updatedInternals: p };
}
async function pA({ delta: e, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
  if (!a || !e.x && !e.y)
    return !1;
  const c = await a.setViewportConstrained({
    x: r[0] + e.x,
    y: r[1] + e.y,
    zoom: r[2]
  }, [
    [0, 0],
    [s, u]
  ], l);
  return !!c && (c.x !== r[0] || c.y !== r[1] || c.k !== r[2]);
}
function eb(e, a, r, l, s, u) {
  let c = s;
  const d = l.get(c) || /* @__PURE__ */ new Map();
  l.set(c, d.set(r, a)), c = `${s}-${e}`;
  const p = l.get(c) || /* @__PURE__ */ new Map();
  if (l.set(c, p.set(r, a)), u) {
    c = `${s}-${e}-${u}`;
    const h = l.get(c) || /* @__PURE__ */ new Map();
    l.set(c, h.set(r, a));
  }
}
function tw(e, a, r) {
  e.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, h = `${s}-${c}--${u}-${d}`, v = `${u}-${d}--${s}-${c}`;
    eb("source", p, v, e, s, c), eb("target", p, h, e, u, d), a.set(l.id, l);
  }
}
function nw(e, a) {
  if (!e.parentId)
    return !1;
  const r = a.get(e.parentId);
  return r ? r.selected ? !0 : nw(r, a) : !1;
}
function tb(e, a, r) {
  let l = e;
  do {
    if (l?.matches?.(a))
      return !0;
    if (l === r)
      return !1;
    l = l?.parentElement;
  } while (l);
  return !1;
}
function gA(e, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !nw(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
      const d = e.get(u);
      d && s.set(u, {
        id: u,
        position: d.position || { x: 0, y: 0 },
        distance: {
          x: r.x - d.internals.positionAbsolute.x,
          y: r.y - d.internals.positionAbsolute.y
        },
        extent: d.extent,
        parentId: d.parentId,
        origin: d.origin,
        expandParent: d.expandParent,
        internals: {
          positionAbsolute: d.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: d.measured.width ?? 0,
          height: d.measured.height ?? 0
        }
      });
    }
  return s;
}
function sh({ nodeId: e, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
  const s = [];
  for (const [c, d] of a) {
    const p = r.get(c)?.internals.userNode;
    p && s.push({
      ...p,
      position: d.position,
      dragging: l
    });
  }
  if (!e)
    return [s[0], s];
  const u = r.get(e)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(e)?.position || u.position,
      dragging: l
    } : s[0],
    s
  ];
}
function vA({ dragItems: e, snapGrid: a, x: r, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = fs(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function yA({ onNodeMouseDown: e, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, h = { x: 0, y: 0 }, v = null, g = !1, b = null, x = !1, _ = !1, R = null;
  function N({ noDragClassName: D, handleSelector: E, domNode: O, isSelectable: k, nodeId: H, nodeClickDistance: V = 0 }) {
    b = Fn(O);
    function A({ x: K, y: oe }) {
      const { nodeLookup: z, nodeExtent: Y, snapGrid: T, snapToGrid: L, nodeOrigin: F, onNodeDrag: G, onSelectionDrag: te, onError: j, updateNodePositions: U } = a();
      u = { x: K, y: oe };
      let Q = !1;
      const ee = d.size > 1, ce = ee && Y ? Ih(cs(d)) : null, ae = ee && L ? vA({
        dragItems: d,
        snapGrid: T,
        x: K,
        y: oe
      }) : null;
      for (const [se, P] of d) {
        if (!z.has(se))
          continue;
        let me = { x: K - P.distance.x, y: oe - P.distance.y };
        L && (me = ae ? {
          x: Math.round(me.x + ae.x),
          y: Math.round(me.y + ae.y)
        } : fs(me, T));
        let _e = null;
        if (ee && Y && !P.extent && ce) {
          const { positionAbsolute: xe } = P.internals, Re = xe.x - ce.x + Y[0][0], $e = xe.x + P.measured.width - ce.x2 + Y[1][0], ft = xe.y - ce.y + Y[0][1], Me = xe.y + P.measured.height - ce.y2 + Y[1][1];
          _e = [
            [Re, ft],
            [$e, Me]
          ];
        }
        const { position: Te, positionAbsolute: Se } = V1({
          nodeId: se,
          nextPosition: me,
          nodeLookup: z,
          nodeExtent: _e || Y,
          nodeOrigin: F,
          onError: j
        });
        Q = Q || P.position.x !== Te.x || P.position.y !== Te.y, P.position = Te, P.internals.positionAbsolute = Se;
      }
      if (_ = _ || Q, !!Q && (U(d, !0), R && (l || G || !H && te))) {
        const [se, P] = sh({
          nodeId: H,
          dragItems: d,
          nodeLookup: z
        });
        l?.(R, d, se, P), G?.(R, se, P), H || te?.(R, P);
      }
    }
    async function I() {
      if (!v)
        return;
      const { transform: K, panBy: oe, autoPanSpeed: z, autoPanOnNodeDrag: Y } = a();
      if (!Y) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [T, L] = Om(h, v, z);
      (T !== 0 || L !== 0) && (u.x = (u.x ?? 0) - T / K[2], u.y = (u.y ?? 0) - L / K[2], await oe({ x: T, y: L }) && A(u)), c = requestAnimationFrame(I);
    }
    function ne(K) {
      const { nodeLookup: oe, multiSelectionActive: z, nodesDraggable: Y, transform: T, snapGrid: L, snapToGrid: F, selectNodesOnDrag: G, onNodeDragStart: te, onSelectionDragStart: j, unselectNodesAndEdges: U } = a();
      g = !0, (!G || !k) && !z && H && (oe.get(H)?.selected || U()), k && G && H && e?.(H);
      const Q = qo(K.sourceEvent, { transform: T, snapGrid: L, snapToGrid: F, containerBounds: v });
      if (u = Q, d = gA(oe, Y, Q, H), d.size > 0 && (r || te || !H && j)) {
        const [ee, ce] = sh({
          nodeId: H,
          dragItems: d,
          nodeLookup: oe
        });
        r?.(K.sourceEvent, d, ee, ce), te?.(K.sourceEvent, ee, ce), H || j?.(K.sourceEvent, ce);
      }
    }
    const $ = b1().clickDistance(V).on("start", (K) => {
      const { domNode: oe, nodeDragThreshold: z, transform: Y, snapGrid: T, snapToGrid: L } = a();
      v = oe?.getBoundingClientRect() || null, x = !1, _ = !1, R = K.sourceEvent, z === 0 && ne(K), u = qo(K.sourceEvent, { transform: Y, snapGrid: T, snapToGrid: L, containerBounds: v }), h = Sa(K.sourceEvent, v);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: oe, transform: z, snapGrid: Y, snapToGrid: T, nodeDragThreshold: L, nodeLookup: F } = a(), G = qo(K.sourceEvent, { transform: z, snapGrid: Y, snapToGrid: T, containerBounds: v });
      if (R = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      H && !F.has(H)) && (x = !0), !x) {
        if (!p && oe && g && (p = !0, I()), !g) {
          const te = Sa(K.sourceEvent, v), j = te.x - h.x, U = te.y - h.y;
          Math.sqrt(j * j + U * U) > L && ne(K);
        }
        (u.x !== G.xSnapped || u.y !== G.ySnapped) && d && g && (h = Sa(K.sourceEvent, v), A(G));
      }
    }).on("end", (K) => {
      if (!g || x) {
        x && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: oe, updateNodePositions: z, onNodeDragStop: Y, onSelectionDragStop: T } = a();
        if (_ && (z(d, !1), _ = !1), s || Y || !H && T) {
          const [L, F] = sh({
            nodeId: H,
            dragItems: d,
            nodeLookup: oe,
            dragging: !1
          });
          s?.(K.sourceEvent, d, L, F), Y?.(K.sourceEvent, L, F), H || T?.(K.sourceEvent, F);
        }
      }
    }).filter((K) => {
      const oe = K.target;
      return !K.button && (!D || !tb(oe, `.${D}`, O)) && (!E || tb(oe, E, O));
    });
    b.call($);
  }
  function C() {
    b?.on(".drag", null);
  }
  return {
    update: N,
    destroy: C
  };
}
function bA(e, a, r) {
  const l = [], s = {
    x: e.x - r,
    y: e.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Ko(s, Dl(u)) > 0 && l.push(u);
  return l;
}
const xA = 250;
function wA(e, a, r, l) {
  let s = [], u = 1 / 0;
  const c = bA(e, r, a + xA);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const h of p) {
      if (l.nodeId === h.nodeId && l.type === h.type && l.id === h.id)
        continue;
      const { x: v, y: g } = jr(d, h, h.position, !0), b = Math.sqrt(Math.pow(v - e.x, 2) + Math.pow(g - e.y, 2));
      b > a || (b < u ? (s = [{ ...h, x: v, y: g }], u = b) : b === u && s.push({ ...h, x: v, y: g }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const d = l.type === "source" ? "target" : "source";
    return s.find((p) => p.type === d) ?? s[0];
  }
  return s[0];
}
function aw(e, a, r, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? d?.find((h) => h.id === r) : d?.[0]) ?? null;
  return p && u ? { ...p, ...jr(c, p, p.position, !0) } : p;
}
function iw(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function _A(e, a) {
  let r = null;
  return a ? r = !0 : e && !a && (r = !1), r;
}
const rw = () => !0;
function SA(e, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: h, autoPanOnConnect: v, flowId: g, panBy: b, cancelConnection: x, onConnectStart: _, onConnect: R, onConnectEnd: N, isValidConnection: C = rw, onReconnectEnd: D, updateConnection: E, getTransform: O, getFromHandle: k, autoPanSpeed: H, dragThreshold: V = 1, handleDomNode: A }) {
  const I = X1(e.target);
  let ne = 0, $;
  const { x: K, y: oe } = Sa(e), z = iw(u, A), Y = d?.getBoundingClientRect();
  let T = !1;
  if (!Y || !z)
    return;
  const L = aw(s, z, l, p, a);
  if (!L)
    return;
  let F = Sa(e, Y), G = !1, te = null, j = !1, U = null;
  function Q() {
    if (!v || !Y)
      return;
    const [Te, Se] = Om(F, Y, H);
    b({ x: Te, y: Se }), ne = requestAnimationFrame(Q);
  }
  const ee = {
    ...L,
    nodeId: s,
    type: z,
    position: L.position
  }, ce = p.get(s);
  let se = {
    inProgress: !0,
    isValid: null,
    from: jr(ce, ee, je.Left, !0),
    fromHandle: ee,
    fromPosition: ee.position,
    fromNode: ce,
    to: F,
    toHandle: null,
    toPosition: Iy[ee.position],
    toNode: null,
    pointer: F
  };
  function P() {
    T = !0, E(se), _?.(e, { nodeId: s, handleId: l, handleType: z });
  }
  V === 0 && P();
  function me(Te) {
    if (!T) {
      const { x: Me, y: Xe } = Sa(Te), He = Me - K, Ie = Xe - oe;
      if (!(He * He + Ie * Ie > V * V))
        return;
      P();
    }
    if (!k() || !ee) {
      _e(Te);
      return;
    }
    const Se = O();
    F = Sa(Te, Y), $ = wA(Ll(F, Se, !1, [1, 1]), r, p, ee), G || (Q(), G = !0);
    const xe = lw(Te, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: C,
      doc: I,
      lib: h,
      flowId: g,
      nodeLookup: p
    });
    U = xe.handleDomNode, te = xe.connection, j = _A(!!$, xe.isValid);
    const Re = p.get(s), $e = Re ? jr(Re, ee, je.Left, !0) : se.from, ft = {
      ...se,
      from: $e,
      isValid: j,
      to: xe.toHandle && j ? jl({ x: xe.toHandle.x, y: xe.toHandle.y }, Se) : F,
      toHandle: xe.toHandle,
      toPosition: j && xe.toHandle ? xe.toHandle.position : Iy[ee.position],
      toNode: xe.toHandle ? p.get(xe.toHandle.nodeId) : null,
      pointer: F
    };
    E(ft), se = ft;
  }
  function _e(Te) {
    if (!("touches" in Te && Te.touches.length > 0)) {
      if (T) {
        ($ || U) && te && j && R?.(te);
        const { inProgress: Se, ...xe } = se, Re = {
          ...xe,
          toPosition: se.toHandle ? se.toPosition : null
        };
        N?.(Te, Re), u && D?.(Te, Re);
      }
      x(), cancelAnimationFrame(ne), G = !1, j = !1, te = null, U = null, I.removeEventListener("mousemove", me), I.removeEventListener("mouseup", _e), I.removeEventListener("touchmove", me), I.removeEventListener("touchend", _e);
    }
  }
  I.addEventListener("mousemove", me), I.addEventListener("mouseup", _e), I.addEventListener("touchmove", me), I.addEventListener("touchend", _e);
}
function lw(e, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: h = rw, nodeLookup: v }) {
  const g = u === "target", b = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: _ } = Sa(e), R = c.elementFromPoint(x, _), N = R?.classList.contains(`${d}-flow__handle`) ? R : b, C = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const D = iw(void 0, N), E = N.getAttribute("data-nodeid"), O = N.getAttribute("data-handleid"), k = N.classList.contains("connectable"), H = N.classList.contains("connectableend");
    if (!E || !D)
      return C;
    const V = {
      source: g ? E : l,
      sourceHandle: g ? O : s,
      target: g ? l : E,
      targetHandle: g ? s : O
    };
    C.connection = V;
    const I = k && H && (r === Ml.Strict ? g && D === "source" || !g && D === "target" : E !== l || O !== s);
    C.isValid = I && h(V), C.toHandle = aw(E, D, O, v, r, !0);
  }
  return C;
}
const Fh = {
  onPointerDown: SA,
  isValid: lw
};
function EA({ domNode: e, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = Fn(e);
  function u({ translateExtent: d, width: p, height: h, zoomStep: v = 1, pannable: g = !0, zoomable: b = !0, inversePan: x = !1 }) {
    const _ = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const O = r(), k = E.sourceEvent.ctrlKey && Jo() ? 10 : 1, H = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * v, V = O[2] * Math.pow(2, H * k);
      a.scaleTo(V);
    };
    let R = [0, 0];
    const N = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (R = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, C = (E) => {
      const O = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const k = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], H = [k[0] - R[0], k[1] - R[1]];
      R = k;
      const V = l() * Math.max(O[2], Math.log(O[2])) * (x ? -1 : 1), A = {
        x: O[0] - H[0] * V,
        y: O[1] - H[1] * V
      }, I = [
        [0, 0],
        [p, h]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: O[2]
      }, I, d);
    }, D = z1().on("start", N).on("zoom", g ? C : null).on("zoom.wheel", b ? _ : null);
    s.call(D, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: xa
  };
}
const Oc = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), uh = ({ x: e, y: a, zoom: r }) => Ac.translate(e, a).scale(r), wl = (e, a) => e.target.closest(`.${a}`), ow = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), NA = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, ch = (e, a = 0, r = NA, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(r).on("end", l) : e;
}, sw = (e) => {
  const a = e.ctrlKey && Jo() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function CA({ zoomPanValues: e, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: h }) {
  return (v) => {
    if (wl(v, a))
      return v.ctrlKey && v.preventDefault(), !1;
    v.preventDefault(), v.stopImmediatePropagation();
    const g = r.property("__zoom").k || 1;
    if (v.ctrlKey && c) {
      const N = xa(v), C = sw(v), D = g * Math.pow(2, C);
      l.scaleTo(r, D, N, v);
      return;
    }
    const b = v.deltaMode === 1 ? 20 : 1;
    let x = s === Rr.Vertical ? 0 : v.deltaX * b, _ = s === Rr.Horizontal ? 0 : v.deltaY * b;
    !Jo() && v.shiftKey && s !== Rr.Vertical && (x = v.deltaY * b, _ = 0), l.translateBy(
      r,
      -(x / g) * u,
      -(_ / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const R = Oc(r.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(v, R), e.panScrollTimeout = setTimeout(() => {
      h?.(v, R), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(v, R));
  };
}
function RA({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = wl(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function TA({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = Oc(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function MA({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(r && ow(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Oc(u.transform));
  };
}
function AA({ zoomPanValues: e, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && ow(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = Oc(c.transform);
      e.prevViewport = d, clearTimeout(e.timerId), e.timerId = setTimeout(
        () => {
          s?.(c.sourceEvent, d);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        r ? 150 : 0
      );
    }
  };
}
function DA({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: h, connectionInProgress: v }) {
  return (g) => {
    const b = e || a, x = r && g.ctrlKey, _ = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (wl(g, `${h}-flow__node`) || wl(g, `${h}-flow__edge`)))
      return !0;
    if (!l && !b && !s && !u && !r || c || v && !_ || wl(g, d) && _ || wl(g, p) && (!_ || s && _ && !e) || !r && g.ctrlKey && _)
      return !1;
    if (!r && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!b && !s && !x && _ || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const R = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || _) && R;
  };
}
function jA({ domNode: e, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const h = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, v = e.getBoundingClientRect(), g = z1().scaleExtent([a, r]).translateExtent(l), b = Fn(e).call(g);
  D({
    x: s.x,
    y: s.y,
    zoom: Al(s.zoom, a, r)
  }, [
    [0, 0],
    [v.width, v.height]
  ], l);
  const x = b.on("wheel.zoom"), _ = b.on("dblclick.zoom");
  g.wheelDelta(sw);
  async function R($, K) {
    return b ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? Vo : Ju).transform(ch(b, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function N({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: oe, userSelectionActive: z, panOnScroll: Y, panOnDrag: T, panOnScrollMode: L, panOnScrollSpeed: F, preventScrolling: G, zoomOnPinch: te, zoomOnScroll: j, zoomOnDoubleClick: U, zoomActivationKeyPressed: Q, lib: ee, onTransformChange: ce, connectionInProgress: ae, paneClickDistance: se, selectionOnDrag: P }) {
    z && !h.isZoomingOrPanning && C();
    const me = Y && !Q && !z;
    g.clickDistance(P ? 1 / 0 : !_a(se) || se < 0 ? 0 : se);
    const _e = me ? CA({
      zoomPanValues: h,
      noWheelClassName: $,
      d3Selection: b,
      d3Zoom: g,
      panOnScrollMode: L,
      panOnScrollSpeed: F,
      zoomOnPinch: te,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : RA({
      noWheelClassName: $,
      preventScrolling: G,
      d3ZoomHandler: x
    });
    b.on("wheel.zoom", _e, { passive: !1 });
    const Te = TA({
      zoomPanValues: h,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", Te);
    const Se = MA({
      zoomPanValues: h,
      panOnDrag: T,
      onPaneContextMenu: !!oe,
      onPanZoom: u,
      onTransformChange: ce
    });
    g.on("zoom", Se);
    const xe = AA({
      zoomPanValues: h,
      panOnDrag: T,
      panOnScroll: Y,
      onPaneContextMenu: oe,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", xe);
    const Re = DA({
      zoomActivationKeyPressed: Q,
      panOnDrag: T,
      zoomOnScroll: j,
      panOnScroll: Y,
      zoomOnDoubleClick: U,
      zoomOnPinch: te,
      userSelectionActive: z,
      noPanClassName: K,
      noWheelClassName: $,
      lib: ee,
      connectionInProgress: ae
    });
    g.filter(Re), U ? b.on("dblclick.zoom", _) : b.on("dblclick.zoom", null);
  }
  function C() {
    g.on("zoom", null);
  }
  async function D($, K, oe) {
    const z = uh($), Y = g?.constrain()(z, K, oe);
    return Y && await R(Y), Y;
  }
  async function E($, K) {
    const oe = uh($);
    return await R(oe, K), oe;
  }
  function O($) {
    if (b) {
      const K = uh($), oe = b.property("__zoom");
      (oe.k !== $.zoom || oe.x !== $.x || oe.y !== $.y) && g?.transform(b, K, null, { sync: !0 });
    }
  }
  function k() {
    const $ = b ? O1(b.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function H($, K) {
    return b ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? Vo : Ju).scaleTo(ch(b, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  async function V($, K) {
    return b ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? Vo : Ju).scaleBy(ch(b, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function A($) {
    g?.scaleExtent($);
  }
  function I($) {
    g?.translateExtent($);
  }
  function ne($) {
    const K = !_a($) || $ < 0 ? 0 : $;
    g?.clickDistance(K);
  }
  return {
    update: N,
    destroy: C,
    setViewport: E,
    setViewportConstrained: D,
    getViewport: k,
    scaleTo: H,
    scaleBy: V,
    setScaleExtent: A,
    setTranslateExtent: I,
    syncViewport: O,
    setClickDistance: ne
  };
}
var Ol;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Ol || (Ol = {}));
function OA({ width: e, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = r - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function nb(e) {
  const a = e.includes("right") || e.includes("left"), r = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function Gi(e, a) {
  return Math.max(0, a - e);
}
function Xi(e, a) {
  return Math.max(0, e - a);
}
function ju(e, a, r) {
  return Math.max(0, a - e, e - r);
}
function ab(e, a) {
  return e ? !a : a;
}
function zA(e, a, r, l, s, u, c, d) {
  let { affectsX: p, affectsY: h } = a;
  const { isHorizontal: v, isVertical: g } = a, b = v && g, { xSnapped: x, ySnapped: _ } = r, { minWidth: R, maxWidth: N, minHeight: C, maxHeight: D } = l, { x: E, y: O, width: k, height: H, aspectRatio: V } = e;
  let A = Math.floor(v ? x - e.pointerX : 0), I = Math.floor(g ? _ - e.pointerY : 0);
  const ne = k + (p ? -A : A), $ = H + (h ? -I : I), K = -u[0] * k, oe = -u[1] * H;
  let z = ju(ne, R, N), Y = ju($, C, D);
  if (c) {
    let F = 0, G = 0;
    p && A < 0 ? F = Gi(E + A + K, c[0][0]) : !p && A > 0 && (F = Xi(E + ne + K, c[1][0])), h && I < 0 ? G = Gi(O + I + oe, c[0][1]) : !h && I > 0 && (G = Xi(O + $ + oe, c[1][1])), z = Math.max(z, F), Y = Math.max(Y, G);
  }
  if (d) {
    let F = 0, G = 0;
    p && A > 0 ? F = Xi(E + A, d[0][0]) : !p && A < 0 && (F = Gi(E + ne, d[1][0])), h && I > 0 ? G = Xi(O + I, d[0][1]) : !h && I < 0 && (G = Gi(O + $, d[1][1])), z = Math.max(z, F), Y = Math.max(Y, G);
  }
  if (s) {
    if (v) {
      const F = ju(ne / V, C, D) * V;
      if (z = Math.max(z, F), c) {
        let G = 0;
        !p && !h || p && !h && b ? G = Xi(O + oe + ne / V, c[1][1]) * V : G = Gi(O + oe + (p ? A : -A) / V, c[0][1]) * V, z = Math.max(z, G);
      }
      if (d) {
        let G = 0;
        !p && !h || p && !h && b ? G = Gi(O + ne / V, d[1][1]) * V : G = Xi(O + (p ? A : -A) / V, d[0][1]) * V, z = Math.max(z, G);
      }
    }
    if (g) {
      const F = ju($ * V, R, N) / V;
      if (Y = Math.max(Y, F), c) {
        let G = 0;
        !p && !h || h && !p && b ? G = Xi(E + $ * V + K, c[1][0]) / V : G = Gi(E + (h ? I : -I) * V + K, c[0][0]) / V, Y = Math.max(Y, G);
      }
      if (d) {
        let G = 0;
        !p && !h || h && !p && b ? G = Gi(E + $ * V, d[1][0]) / V : G = Xi(E + (h ? I : -I) * V, d[0][0]) / V, Y = Math.max(Y, G);
      }
    }
  }
  I = I + (I < 0 ? Y : -Y), A = A + (A < 0 ? z : -z), s && (b ? ne > $ * V ? I = (ab(p, h) ? -A : A) / V : A = (ab(p, h) ? -I : I) * V : v ? (I = A / V, h = p) : (A = I * V, p = h));
  const T = p ? E + A : E, L = h ? O + I : O;
  return {
    width: k + (p ? -A : A),
    height: H + (h ? -I : I),
    x: u[0] * A * (p ? -1 : 1) + T,
    y: u[1] * I * (h ? -1 : 1) + L
  };
}
const uw = { width: 0, height: 0, x: 0, y: 0 }, LA = {
  ...uw,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function kA(e, a, r) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = r[0] * u, p = r[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function HA({ domNode: e, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = Fn(e);
  let c = {
    controlDirection: nb("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: h, boundaries: v, keepAspectRatio: g, resizeDirection: b, onResizeStart: x, onResize: _, onResizeEnd: R, shouldResize: N }) {
    let C = { ...uw }, D = { ...LA };
    c = {
      boundaries: v,
      resizeDirection: b,
      keepAspectRatio: g,
      controlDirection: nb(h)
    };
    let E, O = null, k = [], H, V, A, I = !1;
    const ne = b1().on("start", ($) => {
      const { nodeLookup: K, transform: oe, snapGrid: z, snapToGrid: Y, nodeOrigin: T, paneDomNode: L } = r();
      if (E = K.get(a), !E)
        return;
      O = L?.getBoundingClientRect() ?? null;
      const { xSnapped: F, ySnapped: G } = qo($.sourceEvent, {
        transform: oe,
        snapGrid: z,
        snapToGrid: Y,
        containerBounds: O
      });
      C = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, D = {
        ...C,
        pointerX: F,
        pointerY: G,
        aspectRatio: C.width / C.height
      }, H = void 0, V = Dr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (H = K.get(E.parentId)), H && E.extent === "parent" && (V = [
        [0, 0],
        [H.measured.width, H.measured.height]
      ]), k = [], A = void 0;
      for (const [te, j] of K)
        if (j.parentId === a && (k.push({
          id: te,
          position: { ...j.position },
          extent: j.extent
        }), j.extent === "parent" || j.expandParent)) {
          const U = kA(j, E, j.origin ?? T);
          A ? A = [
            [Math.min(U[0][0], A[0][0]), Math.min(U[0][1], A[0][1])],
            [Math.max(U[1][0], A[1][0]), Math.max(U[1][1], A[1][1])]
          ] : A = U;
        }
      x?.($, { ...C });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: oe, snapToGrid: z, nodeOrigin: Y } = r(), T = qo($.sourceEvent, {
        transform: K,
        snapGrid: oe,
        snapToGrid: z,
        containerBounds: O
      }), L = [];
      if (!E)
        return;
      const { x: F, y: G, width: te, height: j } = C, U = {}, Q = E.origin ?? Y, { width: ee, height: ce, x: ae, y: se } = zA(D, c.controlDirection, T, c.boundaries, c.keepAspectRatio, Q, V, A), P = ee !== te, me = ce !== j, _e = ae !== F && P, Te = se !== G && me;
      if (!_e && !Te && !P && !me)
        return;
      if ((_e || Te || Q[0] === 1 || Q[1] === 1) && (U.x = _e ? ae : C.x, U.y = Te ? se : C.y, C.x = U.x, C.y = U.y, k.length > 0)) {
        const $e = ae - F, ft = se - G;
        for (const Me of k)
          Me.position = {
            x: Me.position.x - $e + Q[0] * (ee - te),
            y: Me.position.y - ft + Q[1] * (ce - j)
          }, L.push(Me);
      }
      if ((P || me) && (U.width = P && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ee : C.width, U.height = me && (!c.resizeDirection || c.resizeDirection === "vertical") ? ce : C.height, C.width = U.width, C.height = U.height), H && E.expandParent) {
        const $e = Q[0] * (U.width ?? 0);
        U.x && U.x < $e && (C.x = $e, D.x = D.x - (U.x - $e));
        const ft = Q[1] * (U.height ?? 0);
        U.y && U.y < ft && (C.y = ft, D.y = D.y - (U.y - ft));
      }
      const Se = OA({
        width: C.width,
        prevWidth: te,
        height: C.height,
        prevHeight: j,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...C, direction: Se };
      N?.($, xe) !== !1 && (I = !0, _?.($, xe), l(U, L));
    }).on("end", ($) => {
      I && (R?.($, { ...C }), s?.({ ...C }), I = !1);
    });
    u.call(ne);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: p
  };
}
var fh = { exports: {} }, dh = {}, hh = { exports: {} }, mh = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ib;
function BA() {
  if (ib) return mh;
  ib = 1;
  var e = ns();
  function a(g, b) {
    return g === b && (g !== 0 || 1 / g === 1 / b) || g !== g && b !== b;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, b) {
    var x = b(), _ = l({ inst: { value: x, getSnapshot: b } }), R = _[0].inst, N = _[1];
    return u(
      function() {
        R.value = x, R.getSnapshot = b, p(R) && N({ inst: R });
      },
      [g, x, b]
    ), s(
      function() {
        return p(R) && N({ inst: R }), g(function() {
          p(R) && N({ inst: R });
        });
      },
      [g]
    ), c(x), x;
  }
  function p(g) {
    var b = g.getSnapshot;
    g = g.value;
    try {
      var x = b();
      return !r(g, x);
    } catch {
      return !0;
    }
  }
  function h(g, b) {
    return b();
  }
  var v = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : d;
  return mh.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : v, mh;
}
var rb;
function cw() {
  return rb || (rb = 1, hh.exports = BA()), hh.exports;
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
var lb;
function UA() {
  if (lb) return dh;
  lb = 1;
  var e = ns(), a = cw();
  function r(h, v) {
    return h === v && (h !== 0 || 1 / h === 1 / v) || h !== h && v !== v;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return dh.useSyncExternalStoreWithSelector = function(h, v, g, b, x) {
    var _ = u(null);
    if (_.current === null) {
      var R = { hasValue: !1, value: null };
      _.current = R;
    } else R = _.current;
    _ = d(
      function() {
        function C(H) {
          if (!D) {
            if (D = !0, E = H, H = b(H), x !== void 0 && R.hasValue) {
              var V = R.value;
              if (x(V, H))
                return O = V;
            }
            return O = H;
          }
          if (V = O, l(E, H)) return V;
          var A = b(H);
          return x !== void 0 && x(V, A) ? (E = H, V) : (E = H, O = A);
        }
        var D = !1, E, O, k = g === void 0 ? null : g;
        return [
          function() {
            return C(v());
          },
          k === null ? void 0 : function() {
            return C(k());
          }
        ];
      },
      [v, g, b, x]
    );
    var N = s(h, _[0], _[1]);
    return c(
      function() {
        R.hasValue = !0, R.value = N;
      },
      [N]
    ), p(N), N;
  }, dh;
}
var ob;
function VA() {
  return ob || (ob = 1, fh.exports = UA()), fh.exports;
}
var qA = VA();
const $A = /* @__PURE__ */ um(qA), IA = {}, sb = (e) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (v, g) => {
    const b = typeof v == "function" ? v(a) : v;
    if (!Object.is(b, a)) {
      const x = a;
      a = g ?? (typeof b != "object" || b === null) ? b : Object.assign({}, a, b), r.forEach((_) => _(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => h, subscribe: (v) => (r.add(v), () => r.delete(v)), destroy: () => {
    (IA ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, h = a = e(l, s, p);
  return p;
}, YA = (e) => e ? sb(e) : sb, { useDebugValue: GA } = ve, { useSyncExternalStoreWithSelector: XA } = $A, FA = (e) => e;
function fw(e, a = FA, r) {
  const l = XA(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    r
  );
  return GA(l), l;
}
const ub = (e, a) => {
  const r = YA(e), l = (s, u = a) => fw(r, s, u);
  return Object.assign(l, r), l;
}, ZA = (e, a) => e ? ub(e, a) : ub;
function Dt(e, a) {
  if (Object.is(e, a))
    return !0;
  if (typeof e != "object" || e === null || typeof a != "object" || a === null)
    return !1;
  if (e instanceof Map && a instanceof Map) {
    if (e.size !== a.size) return !1;
    for (const [l, s] of e)
      if (!Object.is(s, a.get(l)))
        return !1;
    return !0;
  }
  if (e instanceof Set && a instanceof Set) {
    if (e.size !== a.size) return !1;
    for (const l of e)
      if (!a.has(l))
        return !1;
    return !0;
  }
  const r = Object.keys(e);
  if (r.length !== Object.keys(a).length)
    return !1;
  for (const l of r)
    if (!Object.prototype.hasOwnProperty.call(a, l) || !Object.is(e[l], a[l]))
      return !1;
  return !0;
}
var PA = wx();
const QA = /* @__PURE__ */ um(PA), zc = S.createContext(null), KA = zc.Provider, dw = Ea.error001("react");
function lt(e, a) {
  const r = S.useContext(zc);
  if (r === null)
    throw new Error(dw);
  return fw(r, e, a);
}
function jt() {
  const e = S.useContext(zc);
  if (e === null)
    throw new Error(dw);
  return S.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const cb = { display: "none" }, JA = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, hw = "react-flow__node-desc", mw = "react-flow__edge-desc", WA = "react-flow__aria-live", eD = (e) => e.ariaLiveMessage, tD = (e) => e.ariaLabelConfig;
function nD({ rfId: e }) {
  const a = lt(eD);
  return y.jsx("div", { id: `${WA}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: JA, children: a });
}
function aD({ rfId: e, disableKeyboardA11y: a }) {
  const r = lt(tD);
  return y.jsxs(y.Fragment, { children: [y.jsx("div", { id: `${hw}-${e}`, style: cb, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), y.jsx("div", { id: `${mw}-${e}`, style: cb, children: r["edge.a11yDescription.default"] }), !a && y.jsx(nD, { rfId: e })] });
}
const Lc = S.forwardRef(({ position: e = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return y.jsx("div", { className: Pt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
Lc.displayName = "Panel";
function iD({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : y.jsx(Lc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: y.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const rD = (e) => {
  const a = [], r = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, Ou = (e) => e.id;
function lD(e, a) {
  return Dt(e.selectedNodes.map(Ou), a.selectedNodes.map(Ou)) && Dt(e.selectedEdges.map(Ou), a.selectedEdges.map(Ou));
}
function oD({ onSelectionChange: e }) {
  const a = jt(), { selectedNodes: r, selectedEdges: l } = lt(rD, lD);
  return S.useEffect(() => {
    const s = { nodes: r, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, e]), null;
}
const sD = (e) => !!e.onSelectionChangeHandlers;
function uD({ onSelectionChange: e }) {
  const a = lt(sD);
  return e || a ? y.jsx(oD, { onSelectionChange: e }) : null;
}
const pw = [0, 0], cD = { x: 0, y: 0, zoom: 1 }, fD = [
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
], fb = [...fD, "rfId"], dD = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), db = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Po,
  nodeOrigin: pw,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function hD(e) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = lt(dD, Dt), h = jt();
  S.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    v.current = db, d();
  }), []);
  const v = S.useRef(db);
  return S.useEffect(
    () => {
      for (const g of fb) {
        const b = e[g], x = v.current[g];
        b !== x && (typeof e[g] > "u" || (g === "nodes" ? a(b) : g === "edges" ? r(b) : g === "minZoom" ? l(b) : g === "maxZoom" ? s(b) : g === "translateExtent" ? u(b) : g === "nodeExtent" ? c(b) : g === "ariaLabelConfig" ? h.setState({ ariaLabelConfig: QM(b) }) : g === "fitView" ? h.setState({ fitViewQueued: b }) : g === "fitViewOptions" ? h.setState({ fitViewOptions: b }) : h.setState({ [g]: b })));
      }
      v.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    fb.map((g) => e[g])
  ), null;
}
function hb() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function mD(e) {
  const [a, r] = S.useState(e === "system" ? null : e);
  return S.useEffect(() => {
    if (e !== "system") {
      r(e);
      return;
    }
    const l = hb(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : hb()?.matches ? "dark" : "light";
}
const mb = typeof document < "u" ? document : null;
function Wo(e = null, a = { target: mb, actInsideInputWithModifier: !0 }) {
  const [r, l] = S.useState(!1), s = S.useRef(!1), u = S.useRef(/* @__PURE__ */ new Set([])), [c, d] = S.useMemo(() => {
    if (e !== null) {
      const h = (Array.isArray(e) ? e : [e]).filter((g) => typeof g == "string").map((g) => g.replace("+", `
`).replace(`

`, `
+`).split(`
`)), v = h.reduce((g, b) => g.concat(...b), []);
      return [h, v];
    }
    return [[], []];
  }, [e]);
  return S.useEffect(() => {
    const p = a?.target ?? mb, h = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const v = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !h) && F1(x))
          return !1;
        const R = gb(x.code, d);
        if (u.current.add(x[R]), pb(c, u.current, !1)) {
          const N = x.composedPath?.()?.[0] || x.target, C = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !C) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const _ = gb(x.code, d);
        pb(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[_]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, b = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", v), p?.addEventListener("keyup", g), window.addEventListener("blur", b), window.addEventListener("contextmenu", b), () => {
        p?.removeEventListener("keydown", v), p?.removeEventListener("keyup", g), window.removeEventListener("blur", b), window.removeEventListener("contextmenu", b);
      };
    }
  }, [e, l]), r;
}
function pb(e, a, r) {
  return e.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function gb(e, a) {
  return a.includes(e) ? "code" : "key";
}
const pD = () => {
  const e = jt();
  return S.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: r } = e.getState();
      return r ? r.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: r } = e.getState();
      return r ? r.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, r) => {
      const { panZoom: l } = e.getState();
      return l ? l.scaleTo(a, r) : !1;
    },
    getZoom: () => e.getState().transform[2],
    setViewport: async (a, r) => {
      const { transform: [l, s, u], panZoom: c } = e.getState();
      return c ? (await c.setViewport({
        x: a.x ?? l,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, r), !0) : !1;
    },
    getViewport: () => {
      const [a, r, l] = e.getState().transform;
      return { x: a, y: r, zoom: l };
    },
    setCenter: async (a, r, l) => e.getState().setCenter(a, r, l),
    fitBounds: async (a, r) => {
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = zm(a, l, s, u, c, r?.padding ?? 0.1);
      return d ? (await d.setViewport(p, {
        duration: r?.duration,
        ease: r?.ease,
        interpolate: r?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, r = {}) => {
      const { transform: l, snapGrid: s, snapToGrid: u, domNode: c } = e.getState();
      if (!c)
        return a;
      const { x: d, y: p } = c.getBoundingClientRect(), h = {
        x: a.x - d,
        y: a.y - p
      }, v = r.snapGrid ?? s, g = r.snapToGrid ?? u;
      return Ll(h, l, g, v);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = jl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function gw(e, a) {
  const r = [], l = /* @__PURE__ */ new Map(), s = [];
  for (const u of e)
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
    const d = { ...u };
    for (const p of c)
      gD(p, d);
    r.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function gD(e, a) {
  switch (e.type) {
    case "select": {
      a.selected = e.selected;
      break;
    }
    case "position": {
      typeof e.position < "u" && (a.position = e.position), typeof e.dragging < "u" && (a.dragging = e.dragging);
      break;
    }
    case "dimensions": {
      typeof e.dimensions < "u" && (a.measured = {
        ...e.dimensions
      }, e.setAttributes && ((e.setAttributes === !0 || e.setAttributes === "width") && (a.width = e.dimensions.width), (e.setAttributes === !0 || e.setAttributes === "height") && (a.height = e.dimensions.height))), typeof e.resizing == "boolean" && (a.resizing = e.resizing);
      break;
    }
  }
}
function vD(e, a) {
  return gw(e, a);
}
function yD(e, a) {
  return gw(e, a);
}
function _r(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function _l(e, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(_r(u.id, c)));
  }
  return l;
}
function vb({ items: e = [], lookup: a }) {
  const r = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && r.push({ id: u.id, item: u, type: "replace" }), d === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function yb(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const bD = I1();
function xD(e, a, r = {}) {
  return nA(e, a, {
    ...r,
    onError: r.onError ?? bD
  });
}
const bb = (e) => qM(e), wD = (e) => U1(e);
function vw(e) {
  return S.forwardRef(e);
}
const _D = typeof window < "u" ? S.useLayoutEffect : S.useEffect;
function xb(e) {
  const [a, r] = S.useState(BigInt(0)), [l] = S.useState(() => SD(() => r((s) => s + BigInt(1))));
  return _D(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function SD(e) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (r) => {
      a.push(r), e();
    }
  };
}
const yw = S.createContext(null);
function ED({ children: e }) {
  const a = jt(), r = S.useCallback((d) => {
    const { nodes: p = [], setNodes: h, hasDefaultNodes: v, onNodesChange: g, nodeLookup: b, fitViewQueued: x, onNodesChangeMiddlewareMap: _ } = a.getState();
    let R = p;
    for (const C of d)
      R = typeof C == "function" ? C(R) : C;
    let N = vb({
      items: R,
      lookup: b
    });
    for (const C of _.values())
      N = C(N);
    v && h(R), N.length > 0 ? g?.(N) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: C, nodes: D, setNodes: E } = a.getState();
      C && E(D);
    });
  }, []), l = xb(r), s = S.useCallback((d) => {
    const { edges: p = [], setEdges: h, hasDefaultEdges: v, onEdgesChange: g, edgeLookup: b } = a.getState();
    let x = p;
    for (const _ of d)
      x = typeof _ == "function" ? _(x) : _;
    v ? h(x) : g && g(vb({
      items: x,
      lookup: b
    }));
  }, []), u = xb(s), c = S.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return y.jsx(yw.Provider, { value: c, children: e });
}
function ND() {
  const e = S.useContext(yw);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const CD = (e) => !!e.panZoom;
function qm() {
  const e = pD(), a = jt(), r = ND(), l = lt(CD), s = S.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      r.nodeQueue.push(g);
    }, d = (g) => {
      r.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: b, nodeOrigin: x } = a.getState(), _ = bb(g) ? g : b.get(g.id), R = _.parentId ? G1(_.position, _.measured, _.parentId, b, x) : _.position, N = {
        ..._,
        position: R,
        width: _.measured?.width ?? _.width,
        height: _.measured?.height ?? _.height
      };
      return Dl(N);
    }, h = (g, b, x = { replace: !1 }) => {
      c((_) => _.map((R) => {
        if (R.id === g) {
          const N = typeof b == "function" ? b(R) : b;
          return x.replace && bb(N) ? N : { ...R, ...N };
        }
        return R;
      }));
    }, v = (g, b, x = { replace: !1 }) => {
      d((_) => _.map((R) => {
        if (R.id === g) {
          const N = typeof b == "function" ? b(R) : b;
          return x.replace && wD(N) ? N : { ...R, ...N };
        }
        return R;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((g) => ({ ...g })),
      getNode: (g) => u(g)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: g = [] } = a.getState();
        return g.map((b) => ({ ...b }));
      },
      getEdge: (g) => a.getState().edgeLookup.get(g),
      setNodes: c,
      setEdges: d,
      addNodes: (g) => {
        const b = Array.isArray(g) ? g : [g];
        r.nodeQueue.push((x) => [...x, ...b]);
      },
      addEdges: (g) => {
        const b = Array.isArray(g) ? g : [g];
        r.edgeQueue.push((x) => [...x, ...b]);
      },
      toObject: () => {
        const { nodes: g = [], edges: b = [], transform: x } = a.getState(), [_, R, N] = x;
        return {
          nodes: g.map((C) => ({ ...C })),
          edges: b.map((C) => ({ ...C })),
          viewport: {
            x: _,
            y: R,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: b = [] }) => {
        const { nodes: x, edges: _, onNodesDelete: R, onEdgesDelete: N, triggerNodeChanges: C, triggerEdgeChanges: D, onDelete: E, onBeforeDelete: O } = a.getState(), { nodes: k, edges: H } = await XM({
          nodesToRemove: g,
          edgesToRemove: b,
          nodes: x,
          edges: _,
          onBeforeDelete: O
        }), V = H.length > 0, A = k.length > 0;
        if (V) {
          const I = H.map(yb);
          N?.(H), D(I);
        }
        if (A) {
          const I = k.map(yb);
          R?.(k), C(I);
        }
        return (A || V) && E?.({ nodes: k, edges: H }), { deletedNodes: k, deletedEdges: H };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, b = !0, x) => {
        const _ = Gy(g), R = _ ? g : p(g), N = x !== void 0;
        return R ? (x || a.getState().nodes).filter((C) => {
          const D = a.getState().nodeLookup.get(C.id);
          if (D && !_ && (C.id === g.id || !D.internals.positionAbsolute))
            return !1;
          const E = Dl(N ? C : D), O = Ko(E, R);
          return b && O > 0 || O >= E.width * E.height || O >= R.width * R.height;
        }) : [];
      },
      isNodeIntersecting: (g, b, x = !0) => {
        const R = Gy(g) ? g : p(g);
        if (!R)
          return !1;
        const N = Ko(R, b);
        return x && N > 0 || N >= b.width * b.height || N >= R.width * R.height;
      },
      updateNode: h,
      updateNodeData: (g, b, x = { replace: !1 }) => {
        h(g, (_) => {
          const R = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: R } : { ..._, data: { ..._.data, ...R } };
        }, x);
      },
      updateEdge: v,
      updateEdgeData: (g, b, x = { replace: !1 }) => {
        v(g, (_) => {
          const R = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: R } : { ..._, data: { ..._.data, ...R } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: b, nodeOrigin: x } = a.getState();
        return $M(g, { nodeLookup: b, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${b ? `-${b}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? b ? `-${g}-${b}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const b = a.getState().fitViewResolver ?? PM();
        return a.setState({ fitViewQueued: !0, fitViewOptions: g, fitViewResolver: b }), r.nodeQueue.push((x) => [...x]), b.promise;
      }
    };
  }, []);
  return S.useMemo(() => ({
    ...s,
    ...e,
    viewportInitialized: l
  }), [l]);
}
const wb = (e) => e.selected, RD = typeof window < "u" ? window : void 0;
function TD({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const r = jt(), { deleteElements: l } = qm(), s = Wo(e, { actInsideInputWithModifier: !1 }), u = Wo(a, { target: RD });
  S.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = r.getState();
      l({ nodes: d.filter(wb), edges: c.filter(wb) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), S.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function MD(e) {
  const a = jt();
  S.useEffect(() => {
    const r = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = Lm(e.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", Ea.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
    };
    if (e.current) {
      r(), window.addEventListener("resize", r);
      const l = new ResizeObserver(() => r());
      return l.observe(e.current), () => {
        window.removeEventListener("resize", r), l && e.current && l.unobserve(e.current);
      };
    }
  }, []);
}
const kc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, AD = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function DD({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = Rr.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: h, minZoom: v, maxZoom: g, zoomActivationKeyCode: b, preventScrolling: x = !0, children: _, noWheelClassName: R, noPanClassName: N, onViewportChange: C, isControlledViewport: D, paneClickDistance: E, selectionOnDrag: O }) {
  const k = jt(), H = S.useRef(null), { userSelectionActive: V, lib: A, connectionInProgress: I } = lt(AD, Dt), ne = Wo(b), $ = S.useRef();
  MD(H);
  const K = S.useCallback((oe) => {
    C?.({ x: oe[0], y: oe[1], zoom: oe[2] }), D || k.setState({ transform: oe });
  }, [C, D]);
  return S.useEffect(() => {
    if (H.current) {
      $.current = jA({
        domNode: H.current,
        minZoom: v,
        maxZoom: g,
        translateExtent: h,
        viewport: p,
        onDraggingChange: (T) => k.setState((L) => L.paneDragging === T ? L : { paneDragging: T }),
        onPanZoomStart: (T, L) => {
          const { onViewportChangeStart: F, onMoveStart: G } = k.getState();
          G?.(T, L), F?.(L);
        },
        onPanZoom: (T, L) => {
          const { onViewportChange: F, onMove: G } = k.getState();
          G?.(T, L), F?.(L);
        },
        onPanZoomEnd: (T, L) => {
          const { onViewportChangeEnd: F, onMoveEnd: G } = k.getState();
          G?.(T, L), F?.(L);
        }
      });
      const { x: oe, y: z, zoom: Y } = $.current.getViewport();
      return k.setState({
        panZoom: $.current,
        transform: [oe, z, Y],
        domNode: H.current.closest(".react-flow")
      }), () => {
        $.current?.destroy();
      };
    }
  }, []), S.useEffect(() => {
    $.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: a,
      zoomOnPinch: r,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: ne,
      preventScrolling: x,
      noPanClassName: N,
      userSelectionActive: V,
      noWheelClassName: R,
      lib: A,
      onTransformChange: K,
      connectionInProgress: I,
      selectionOnDrag: O,
      paneClickDistance: E
    });
  }, [
    e,
    a,
    r,
    l,
    s,
    u,
    c,
    d,
    ne,
    x,
    N,
    V,
    R,
    A,
    K,
    I,
    O,
    E
  ]), y.jsx("div", { className: "react-flow__renderer", ref: H, style: kc, children: _ });
}
const jD = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function OD() {
  const { userSelectionActive: e, userSelectionRect: a } = lt(jD, Dt);
  return e && a ? y.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const ph = (e, a) => (r) => {
  r.target === a.current && e?.(r);
}, zD = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function LD({ isSelecting: e, selectionKeyPressed: a, selectionMode: r = Qo.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: h, onPaneContextMenu: v, onPaneScroll: g, onPaneMouseEnter: b, onPaneMouseMove: x, onPaneMouseLeave: _, children: R }) {
  const N = S.useRef(0), C = jt(), { userSelectionActive: D, elementsSelectable: E, dragging: O, connectionInProgress: k, panBy: H, autoPanSpeed: V } = lt(zD, Dt), A = E && (e || D), I = S.useRef(null), ne = S.useRef(), $ = S.useRef(/* @__PURE__ */ new Set()), K = S.useRef(/* @__PURE__ */ new Set()), oe = S.useRef(!1), z = S.useRef({ x: 0, y: 0 }), Y = S.useRef(!1), T = (P) => {
    if (oe.current || k) {
      oe.current = !1;
      return;
    }
    h?.(P), C.getState().resetSelectedElements(), C.setState({ nodesSelectionActive: !1 });
  }, L = (P) => {
    if (Array.isArray(l) && l?.includes(2)) {
      P.preventDefault();
      return;
    }
    v?.(P);
  }, F = g ? (P) => g(P) : void 0, G = (P) => {
    oe.current && (P.stopPropagation(), oe.current = !1);
  }, te = (P) => {
    const { domNode: me, transform: _e } = C.getState();
    if (ne.current = me?.getBoundingClientRect(), !ne.current)
      return;
    const Te = P.target === I.current;
    if (!Te && !!P.target.closest(".nokey") || !e || !(c && Te || a) || P.button !== 0 || !P.isPrimary)
      return;
    P.target?.setPointerCapture?.(P.pointerId), oe.current = !1;
    const { x: Re, y: $e } = Sa(P.nativeEvent, ne.current), ft = Ll({ x: Re, y: $e }, _e);
    C.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Re,
        y: $e
      }
    }), Te || (P.stopPropagation(), P.preventDefault());
  };
  function j(P, me) {
    const { userSelectionRect: _e } = C.getState();
    if (!_e)
      return;
    const { transform: Te, nodeLookup: Se, edgeLookup: xe, connectionLookup: Re, triggerNodeChanges: $e, triggerEdgeChanges: ft, defaultEdgeOptions: Me } = C.getState(), Xe = { x: _e.startX, y: _e.startY }, { x: He, y: Ie } = jl(Xe, Te), _t = {
      startX: Xe.x,
      startY: Xe.y,
      x: P < He ? P : He,
      y: me < Ie ? me : Ie,
      width: Math.abs(P - He),
      height: Math.abs(me - Ie)
    }, Je = $.current, Ze = K.current;
    $.current = new Set(jm(Se, _t, Te, r === Qo.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Pe = Me?.selectable ?? !0;
    for (const gt of $.current) {
      const vt = Re.get(gt);
      if (vt)
        for (const { edgeId: Yt } of vt.values()) {
          const Lt = xe.get(Yt);
          Lt && (Lt.selectable ?? Pe) && K.current.add(Yt);
        }
    }
    if (!Xy(Je, $.current)) {
      const gt = _l(Se, $.current, !0);
      $e(gt);
    }
    if (!Xy(Ze, K.current)) {
      const gt = _l(xe, K.current);
      ft(gt);
    }
    C.setState({
      userSelectionRect: _t,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function U() {
    if (!s || !ne.current)
      return;
    const [P, me] = Om(z.current, ne.current, V);
    H({ x: P, y: me }).then((_e) => {
      if (!oe.current || !_e) {
        N.current = requestAnimationFrame(U);
        return;
      }
      const { x: Te, y: Se } = z.current;
      j(Te, Se), N.current = requestAnimationFrame(U);
    });
  }
  const Q = () => {
    cancelAnimationFrame(N.current), N.current = 0, Y.current = !1;
  };
  S.useEffect(() => () => Q(), []);
  const ee = (P) => {
    const { userSelectionRect: me, transform: _e, resetSelectedElements: Te } = C.getState();
    if (!ne.current || !me)
      return;
    const { x: Se, y: xe } = Sa(P.nativeEvent, ne.current);
    z.current = { x: Se, y: xe };
    const Re = jl({ x: me.startX, y: me.startY }, _e);
    if (!oe.current) {
      const $e = a ? 0 : u;
      if (Math.hypot(Se - Re.x, xe - Re.y) <= $e)
        return;
      Te(), d?.(P);
    }
    oe.current = !0, Y.current || (U(), Y.current = !0), j(Se, xe);
  }, ce = (P) => {
    P.button === 0 && (P.target?.releasePointerCapture?.(P.pointerId), !D && P.target === I.current && C.getState().userSelectionRect && T?.(P), C.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), oe.current && (p?.(P), C.setState({
      nodesSelectionActive: $.current.size > 0
    })), Q());
  }, ae = (P) => {
    P.target?.releasePointerCapture?.(P.pointerId), Q();
  }, se = l === !0 || Array.isArray(l) && l.includes(0);
  return y.jsxs("div", { className: Pt(["react-flow__pane", { draggable: se, dragging: O, selection: e }]), onClick: A ? void 0 : ph(T, I), onContextMenu: ph(L, I), onWheel: ph(F, I), onPointerEnter: A ? void 0 : b, onPointerMove: A ? ee : x, onPointerUp: A ? ce : void 0, onPointerCancel: A ? ae : void 0, onPointerDownCapture: A ? te : void 0, onClickCapture: A ? G : void 0, onPointerLeave: _, ref: I, style: kc, children: [R, y.jsx(OD, {})] });
}
function Zh({ id: e, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), h = d.get(e);
  if (!h) {
    p?.("012", Ea.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), h.selected ? (r || h.selected && c) && (u({ nodes: [h], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function bw({ nodeRef: e, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = jt(), [p, h] = S.useState(!1), v = S.useRef();
  return S.useEffect(() => {
    v.current = yA({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        Zh({
          id: g,
          store: d,
          nodeRef: e
        });
      },
      onDragStart: () => {
        h(!0);
      },
      onDragStop: () => {
        h(!1);
      }
    });
  }, []), S.useEffect(() => {
    if (!(a || !e.current || !v.current))
      return v.current.update({
        noDragClassName: r,
        handleSelector: l,
        domNode: e.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        v.current?.destroy();
      };
  }, [r, l, a, u, e, s, c]), p;
}
const kD = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function xw() {
  const e = jt();
  return S.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: h, nodeOrigin: v } = e.getState(), g = /* @__PURE__ */ new Map(), b = kD(c), x = s ? u[0] : 5, _ = s ? u[1] : 5, R = r.direction.x * x * r.factor, N = r.direction.y * _ * r.factor;
    for (const [, C] of h) {
      if (!b(C))
        continue;
      let D = {
        x: C.internals.positionAbsolute.x + R,
        y: C.internals.positionAbsolute.y + N
      };
      s && (D = fs(D, u));
      const { position: E, positionAbsolute: O } = V1({
        nodeId: C.id,
        nextPosition: D,
        nodeLookup: h,
        nodeExtent: l,
        nodeOrigin: v,
        onError: d
      });
      C.position = E, C.internals.positionAbsolute = O, g.set(C.id, C);
    }
    p(g);
  }, []);
}
const $m = S.createContext(null), HD = $m.Provider;
$m.Consumer;
const ww = () => S.useContext($m), BD = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), UD = (e, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: h } = c, v = p?.nodeId === e && p?.id === a && p?.type === r;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === r,
    connectingTo: v,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === Ml.Strict ? d?.type !== r : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: v && h
  };
};
function VD({ type: e = "source", position: a = je.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: h, onMouseDown: v, onTouchStart: g, ...b }, x) {
  const _ = c || null, R = e === "target", N = jt(), C = ww(), { connectOnClick: D, noPanClassName: E, rfId: O } = lt(BD, Dt), { connectingFrom: k, connectingTo: H, clickConnecting: V, isPossibleEndHandle: A, connectionInProcess: I, clickConnectionInProcess: ne, valid: $ } = lt(UD(C, _, e), Dt);
  C || N.getState().onError?.("010", Ea.error010());
  const K = (Y) => {
    const { defaultEdgeOptions: T, onConnect: L, hasDefaultEdges: F } = N.getState(), G = {
      ...T,
      ...Y
    };
    if (F) {
      const { edges: te, setEdges: j, onError: U } = N.getState();
      j(xD(G, te, { onError: U }));
    }
    L?.(G), d?.(G);
  }, oe = (Y) => {
    if (!C)
      return;
    const T = Z1(Y.nativeEvent);
    if (s && (T && Y.button === 0 || !T)) {
      const L = N.getState();
      Fh.onPointerDown(Y.nativeEvent, {
        handleDomNode: Y.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: R,
        handleId: _,
        nodeId: C,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...F) => N.getState().onConnectEnd?.(...F),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...F) => N.getState().isValidConnection?.(...F) ?? !0),
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    T ? v?.(Y) : g?.(Y);
  }, z = (Y) => {
    const { onClickConnectStart: T, onClickConnectEnd: L, connectionClickStartHandle: F, connectionMode: G, isValidConnection: te, lib: j, rfId: U, nodeLookup: Q, connection: ee } = N.getState();
    if (!C || !F && !s)
      return;
    if (!F) {
      T?.(Y.nativeEvent, { nodeId: C, handleId: _, handleType: e }), N.setState({ connectionClickStartHandle: { nodeId: C, type: e, id: _ } });
      return;
    }
    const ce = X1(Y.target), ae = r || te, { connection: se, isValid: P } = Fh.isValid(Y.nativeEvent, {
      handle: {
        nodeId: C,
        id: _,
        type: e
      },
      connectionMode: G,
      fromNodeId: F.nodeId,
      fromHandleId: F.id || null,
      fromType: F.type,
      isValidConnection: ae,
      flowId: U,
      doc: ce,
      lib: j,
      nodeLookup: Q
    });
    P && se && K(se);
    const me = structuredClone(ee);
    delete me.inProgress, me.toPosition = me.toHandle ? me.toHandle.position : null, L?.(Y, me), N.setState({ connectionClickStartHandle: null });
  };
  return y.jsx("div", { "data-handleid": _, "data-nodeid": C, "data-handlepos": a, "data-id": `${O}-${C}-${_}-${e}`, className: Pt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    h,
    {
      source: !R,
      target: R,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: V,
      connectingfrom: k,
      connectingto: H,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!I || A) && (I || ne ? u : s)
    }
  ]), onMouseDown: oe, onTouchStart: oe, onClick: D ? z : void 0, ref: x, ...b, children: p });
}
const zl = S.memo(vw(VD));
function qD({ data: e, isConnectable: a, sourcePosition: r = je.Bottom }) {
  return y.jsxs(y.Fragment, { children: [e?.label, y.jsx(zl, { type: "source", position: r, isConnectable: a })] });
}
function $D({ data: e, isConnectable: a, targetPosition: r = je.Top, sourcePosition: l = je.Bottom }) {
  return y.jsxs(y.Fragment, { children: [y.jsx(zl, { type: "target", position: r, isConnectable: a }), e?.label, y.jsx(zl, { type: "source", position: l, isConnectable: a })] });
}
function ID() {
  return null;
}
function YD({ data: e, isConnectable: a, targetPosition: r = je.Top }) {
  return y.jsxs(y.Fragment, { children: [y.jsx(zl, { type: "target", position: r, isConnectable: a }), e?.label] });
}
const gc = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, _b = {
  input: qD,
  default: $D,
  output: YD,
  group: ID
};
function GD(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const XD = (e) => {
  const { width: a, height: r, x: l, y: s } = cs(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: _a(a) ? a : null,
    height: _a(r) ? r : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function FD({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = jt(), { width: s, height: u, transformString: c, userSelectionActive: d } = lt(XD, Dt), p = xw(), h = S.useRef(null);
  S.useEffect(() => {
    r || h.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const v = !d && s !== null && u !== null;
  if (bw({
    nodeRef: h,
    disabled: !v
  }), !v)
    return null;
  const g = e ? (x) => {
    const _ = l.getState().nodes.filter((R) => R.selected);
    e(x, _);
  } : void 0, b = (x) => {
    Object.prototype.hasOwnProperty.call(gc, x.key) && (x.preventDefault(), p({
      direction: gc[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return y.jsx("div", { className: Pt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: y.jsx("div", { ref: h, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : b, style: {
    width: s,
    height: u
  } }) });
}
const Sb = typeof window < "u" ? window : void 0, ZD = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function _w({ children: e, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: h, selectionOnDrag: v, selectionMode: g, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: _, panActivationKeyCode: R, zoomActivationKeyCode: N, elementsSelectable: C, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: k, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: A, autoPanOnSelection: I, defaultViewport: ne, translateExtent: $, minZoom: K, maxZoom: oe, preventScrolling: z, onSelectionContextMenu: Y, noWheelClassName: T, noPanClassName: L, disableKeyboardA11y: F, onViewportChange: G, isControlledViewport: te }) {
  const { nodesSelectionActive: j, userSelectionActive: U } = lt(ZD, Dt), Q = Wo(h, { target: Sb }), ee = Wo(R, { target: Sb }), ce = ee || A, ae = ee || O, se = v && ce !== !0, P = Q || U || se;
  return TD({ deleteKeyCode: p, multiSelectionKeyCode: _ }), y.jsx(DD, { onPaneContextMenu: u, elementsSelectable: C, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: ae, panOnScrollSpeed: k, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: !Q && ce, defaultViewport: ne, translateExtent: $, minZoom: K, maxZoom: oe, zoomActivationKeyCode: N, preventScrolling: z, noWheelClassName: T, noPanClassName: L, onViewportChange: G, isControlledViewport: te, paneClickDistance: d, selectionOnDrag: se, children: y.jsxs(LD, { onSelectionStart: b, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: ce, autoPanOnSelection: I, isSelecting: !!P, selectionMode: g, selectionKeyPressed: Q, paneClickDistance: d, selectionOnDrag: se, children: [e, j && y.jsx(FD, { onSelectionContextMenu: Y, noPanClassName: L, disableKeyboardA11y: F })] }) });
}
_w.displayName = "FlowRenderer";
const PD = S.memo(_w), QD = (e) => (a) => e ? jm(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function KD(e) {
  return lt(S.useCallback(QD(e), [e]), Dt);
}
const JD = (e) => e.updateNodeInternals;
function WD() {
  const e = lt(JD), [a] = S.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
    const l = /* @__PURE__ */ new Map();
    r.forEach((s) => {
      const u = s.target.getAttribute("data-id");
      l.set(u, {
        id: u,
        nodeElement: s.target,
        force: !0
      });
    }), e(l);
  }));
  return S.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function e4({ node: e, nodeType: a, hasDimensions: r, resizeObserver: l }) {
  const s = jt(), u = S.useRef(null), c = S.useRef(null), d = S.useRef(e.sourcePosition), p = S.useRef(e.targetPosition), h = S.useRef(a), v = r && !!e.internals.handleBounds;
  return S.useEffect(() => {
    u.current && !e.hidden && (!v || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [v, e.hidden]), S.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), S.useEffect(() => {
    if (u.current) {
      const g = h.current !== a, b = d.current !== e.sourcePosition, x = p.current !== e.targetPosition;
      (g || b || x) && (h.current = a, d.current = e.sourcePosition, p.current = e.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [e.id, a, e.sourcePosition, e.targetPosition]), u;
}
function t4({ id: e, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: h, nodesFocusable: v, resizeObserver: g, noDragClassName: b, noPanClassName: x, disableKeyboardA11y: _, rfId: R, nodeTypes: N, nodeClickDistance: C, onError: D }) {
  const { node: E, internals: O, isParent: k } = lt((P) => {
    const me = P.nodeLookup.get(e), _e = P.parentLookup.has(e);
    return {
      node: me,
      internals: me.internals,
      isParent: _e
    };
  }, Dt);
  let H = E.type || "default", V = N?.[H] || _b[H];
  V === void 0 && (D?.("003", Ea.error003(H)), H = "default", V = N?.default || _b.default);
  const A = !!(E.draggable || d && typeof E.draggable > "u"), I = !!(E.selectable || p && typeof E.selectable > "u"), ne = !!(E.connectable || h && typeof E.connectable > "u"), $ = !!(E.focusable || v && typeof E.focusable > "u"), K = jt(), oe = Y1(E), z = e4({ node: E, nodeType: H, hasDimensions: oe, resizeObserver: g }), Y = bw({
    nodeRef: z,
    disabled: E.hidden || !A,
    noDragClassName: b,
    handleSelector: E.dragHandle,
    nodeId: e,
    isSelectable: I,
    nodeClickDistance: C
  }), T = xw();
  if (E.hidden)
    return null;
  const L = gi(E), F = GD(E), G = I || A || a || r || l || s, te = r ? (P) => r(P, { ...O.userNode }) : void 0, j = l ? (P) => l(P, { ...O.userNode }) : void 0, U = s ? (P) => s(P, { ...O.userNode }) : void 0, Q = u ? (P) => u(P, { ...O.userNode }) : void 0, ee = c ? (P) => c(P, { ...O.userNode }) : void 0, ce = (P) => {
    const { selectNodesOnDrag: me, nodeDragThreshold: _e } = K.getState();
    I && (!me || !A || _e > 0) && Zh({
      id: e,
      store: K,
      nodeRef: z
    }), a && a(P, { ...O.userNode });
  }, ae = (P) => {
    if (!(F1(P.nativeEvent) || _)) {
      if (L1.includes(P.key) && I) {
        const me = P.key === "Escape";
        Zh({
          id: e,
          store: K,
          unselect: me,
          nodeRef: z
        });
      } else if (A && E.selected && Object.prototype.hasOwnProperty.call(gc, P.key)) {
        P.preventDefault();
        const { ariaLabelConfig: me } = K.getState();
        K.setState({
          ariaLiveMessage: me["node.a11yDescription.ariaLiveMessage"]({
            direction: P.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), T({
          direction: gc[P.key],
          factor: P.shiftKey ? 4 : 1
        });
      }
    }
  }, se = () => {
    if (_ || !z.current?.matches(":focus-visible"))
      return;
    const { transform: P, width: me, height: _e, autoPanOnNodeFocus: Te, setCenter: Se } = K.getState();
    if (!Te)
      return;
    jm(/* @__PURE__ */ new Map([[e, E]]), { x: 0, y: 0, width: me, height: _e }, P, !0).length > 0 || Se(E.position.x + L.width / 2, E.position.y + L.height / 2, {
      zoom: P[2]
    });
  };
  return y.jsx("div", { className: Pt([
    "react-flow__node",
    `react-flow__node-${H}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: A
    },
    E.className,
    {
      selected: E.selected,
      selectable: I,
      parent: k,
      draggable: A,
      dragging: Y
    }
  ]), ref: z, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: G ? "all" : "none",
    visibility: oe ? "visible" : "hidden",
    ...E.style,
    ...F
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: te, onMouseMove: j, onMouseLeave: U, onContextMenu: Q, onClick: ce, onDoubleClick: ee, onKeyDown: $ ? ae : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? se : void 0, role: E.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": _ ? void 0 : `${hw}-${R}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: y.jsx(HD, { value: e, children: y.jsx(V, { id: e, data: E.data, type: H, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: E.selected ?? !1, selectable: I, draggable: A, deletable: E.deletable ?? !0, isConnectable: ne, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: Y, dragHandle: E.dragHandle, zIndex: O.z, parentId: E.parentId, ...L }) }) });
}
var n4 = S.memo(t4);
const a4 = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Sw(e) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(a4, Dt), c = KD(e.onlyRenderVisibleElements), d = WD();
  return y.jsx("div", { className: "react-flow__nodes", style: kc, children: c.map((p) => (
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
    y.jsx(n4, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
Sw.displayName = "NodeRenderer";
const i4 = S.memo(Sw);
function r4(e) {
  return lt(S.useCallback((r) => {
    if (!e)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && WM({
          sourceNode: u,
          targetNode: c,
          width: r.width,
          height: r.height,
          transform: r.transform
        }) && l.push(s.id);
      }
    return l;
  }, [e]), Dt);
}
const l4 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return y.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, o4 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return y.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Eb = {
  [mc.Arrow]: l4,
  [mc.ArrowClosed]: o4
};
function s4(e) {
  const a = jt();
  return S.useMemo(() => Object.prototype.hasOwnProperty.call(Eb, e) ? Eb[e] : (a.getState().onError?.("009", Ea.error009(e)), null), [e]);
}
const u4 = ({ id: e, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = s4(a);
  return p ? y.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: y.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, Ew = ({ defaultColor: e, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = S.useMemo(() => oA(r, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, e]);
  return s.length ? y.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: y.jsx("defs", { children: s.map((u) => y.jsx(u4, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Ew.displayName = "MarkerDefinitions";
var c4 = S.memo(Ew);
function Nw({ x: e, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: h, ...v }) {
  const [g, b] = S.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Pt(["react-flow__edge-textwrapper", h]), _ = S.useRef(null);
  return S.useEffect(() => {
    if (_.current) {
      const R = _.current.getBBox();
      b({
        x: R.x,
        y: R.y,
        width: R.width,
        height: R.height
      });
    }
  }, [r]), r ? y.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...v, children: [s && y.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), y.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: _, style: l, children: r }), p] }) : null;
}
Nw.displayName = "EdgeText";
const f4 = S.memo(Nw);
function Hc({ path: e, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: h = 20, ...v }) {
  return y.jsxs(y.Fragment, { children: [y.jsx("path", { ...v, d: e, fill: "none", className: Pt(["react-flow__edge-path", v.className]) }), h ? y.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: h, className: "react-flow__edge-interaction" }) : null, l && _a(a) && _a(r) ? y.jsx(f4, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function Nb({ pos: e, x1: a, y1: r, x2: l, y2: s }) {
  return e === je.Left || e === je.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function Cw({ sourceX: e, sourceY: a, sourcePosition: r = je.Bottom, targetX: l, targetY: s, targetPosition: u = je.Top }) {
  const [c, d] = Nb({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, h] = Nb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [v, g, b, x] = P1({
    sourceX: e,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: c,
    sourceControlY: d,
    targetControlX: p,
    targetControlY: h
  });
  return [
    `M${e},${a} C${c},${d} ${p},${h} ${l},${s}`,
    v,
    g,
    b,
    x
  ];
}
function Rw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: R, markerStart: N, interactionWidth: C }) => {
    const [D, E, O] = Cw({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), k = e.isInternal ? void 0 : a;
    return y.jsx(Hc, { id: k, path: D, labelX: E, labelY: O, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: R, markerStart: N, interactionWidth: C });
  });
}
const d4 = Rw({ isInternal: !1 }), Tw = Rw({ isInternal: !0 });
d4.displayName = "SimpleBezierEdge";
Tw.displayName = "SimpleBezierEdgeInternal";
function Mw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: g, style: b, sourcePosition: x = je.Bottom, targetPosition: _ = je.Top, markerEnd: R, markerStart: N, pathOptions: C, interactionWidth: D }) => {
    const [E, O, k] = Yh({
      sourceX: r,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: _,
      borderRadius: C?.borderRadius,
      offset: C?.offset,
      stepPosition: C?.stepPosition
    }), H = e.isInternal ? void 0 : a;
    return y.jsx(Hc, { id: H, path: E, labelX: O, labelY: k, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: g, style: b, markerEnd: R, markerStart: N, interactionWidth: D });
  });
}
const Aw = Mw({ isInternal: !1 }), Dw = Mw({ isInternal: !0 });
Aw.displayName = "SmoothStepEdge";
Dw.displayName = "SmoothStepEdgeInternal";
function jw(e) {
  return S.memo(({ id: a, ...r }) => {
    const l = e.isInternal ? void 0 : a;
    return y.jsx(Aw, { ...r, id: l, pathOptions: S.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const h4 = jw({ isInternal: !1 }), Ow = jw({ isInternal: !0 });
h4.displayName = "StepEdge";
Ow.displayName = "StepEdgeInternal";
function zw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: R }) => {
    const [N, C, D] = J1({ sourceX: r, sourceY: l, targetX: s, targetY: u }), E = e.isInternal ? void 0 : a;
    return y.jsx(Hc, { id: E, path: N, labelX: C, labelY: D, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: R });
  });
}
const m4 = zw({ isInternal: !1 }), Lw = zw({ isInternal: !0 });
m4.displayName = "StraightEdge";
Lw.displayName = "StraightEdgeInternal";
function kw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = je.Bottom, targetPosition: d = je.Top, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: R, markerStart: N, pathOptions: C, interactionWidth: D }) => {
    const [E, O, k] = Q1({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: C?.curvature
    }), H = e.isInternal ? void 0 : a;
    return y.jsx(Hc, { id: H, path: E, labelX: O, labelY: k, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: R, markerStart: N, interactionWidth: D });
  });
}
const p4 = kw({ isInternal: !1 }), Hw = kw({ isInternal: !0 });
p4.displayName = "BezierEdge";
Hw.displayName = "BezierEdgeInternal";
const Cb = {
  default: Hw,
  straight: Lw,
  step: Ow,
  smoothstep: Dw,
  simplebezier: Tw
}, Rb = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, g4 = (e, a, r) => r === je.Left ? e - a : r === je.Right ? e + a : e, v4 = (e, a, r) => r === je.Top ? e - a : r === je.Bottom ? e + a : e, Tb = "react-flow__edgeupdater";
function Mb({ position: e, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return y.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Pt([Tb, `${Tb}-${d}`]), cx: g4(a, l, e), cy: v4(r, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function y4({ isReconnectable: e, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: h, onReconnectStart: v, onReconnectEnd: g, setReconnecting: b, setUpdateHover: x }) {
  const _ = jt(), R = (O, k) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: H, domNode: V, connectionMode: A, connectionRadius: I, lib: ne, onConnectStart: $, cancelConnection: K, nodeLookup: oe, rfId: z, panBy: Y, updateConnection: T } = _.getState(), L = k.type === "target", F = (j, U) => {
      b(!1), g?.(j, r, k.type, U);
    }, G = (j) => h?.(r, j), te = (j, U) => {
      b(!0), v?.(O, r, k.type), $?.(j, U);
    };
    Fh.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: H,
      connectionMode: A,
      connectionRadius: I,
      domNode: V,
      handleId: k.id,
      nodeId: k.nodeId,
      nodeLookup: oe,
      isTarget: L,
      edgeUpdaterType: k.type,
      lib: ne,
      flowId: z,
      cancelConnection: K,
      panBy: Y,
      isValidConnection: (...j) => _.getState().isValidConnection?.(...j) ?? !0,
      onConnect: G,
      onConnectStart: te,
      onConnectEnd: (...j) => _.getState().onConnectEnd?.(...j),
      onReconnectEnd: F,
      updateConnection: T,
      getTransform: () => _.getState().transform,
      getFromHandle: () => _.getState().connection.fromHandle,
      dragThreshold: _.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, N = (O) => R(O, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), C = (O) => R(O, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), D = () => x(!0), E = () => x(!1);
  return y.jsxs(y.Fragment, { children: [(e === !0 || e === "source") && y.jsx(Mb, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: N, onMouseEnter: D, onMouseOut: E, type: "source" }), (e === !0 || e === "target") && y.jsx(Mb, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: C, onMouseEnter: D, onMouseOut: E, type: "target" })] });
}
function b4({ id: e, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: h, reconnectRadius: v, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, rfId: _, edgeTypes: R, noPanClassName: N, onError: C, disableKeyboardA11y: D }) {
  let E = lt((Se) => Se.edgeLookup.get(e));
  const O = lt((Se) => Se.defaultEdgeOptions);
  E = O ? { ...O, ...E } : E;
  let k = E.type || "default", H = R?.[k] || Cb[k];
  H === void 0 && (C?.("011", Ea.error011(k)), k = "default", H = R?.default || Cb.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), A = typeof g < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), I = !!(E.selectable || l && typeof E.selectable > "u"), ne = S.useRef(null), [$, K] = S.useState(!1), [oe, z] = S.useState(!1), Y = jt(), { zIndex: T, sourceX: L, sourceY: F, targetX: G, targetY: te, sourcePosition: j, targetPosition: U } = lt(S.useCallback((Se) => {
    const xe = Se.nodeLookup.get(E.source), Re = Se.nodeLookup.get(E.target);
    if (!xe || !Re)
      return {
        zIndex: E.zIndex,
        ...Rb
      };
    const $e = lA({
      id: e,
      sourceNode: xe,
      targetNode: Re,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: Se.connectionMode,
      onError: C
    });
    return {
      zIndex: JM({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Re,
        elevateOnSelect: Se.elevateEdgesOnSelect,
        zIndexMode: Se.zIndexMode
      }),
      ...$e || Rb
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), Dt), Q = S.useMemo(() => E.markerStart ? `url('#${Gh(E.markerStart, _)}')` : void 0, [E.markerStart, _]), ee = S.useMemo(() => E.markerEnd ? `url('#${Gh(E.markerEnd, _)}')` : void 0, [E.markerEnd, _]);
  if (E.hidden || L === null || F === null || G === null || te === null)
    return null;
  const ce = (Se) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Re, multiSelectionActive: $e } = Y.getState();
    I && (Y.setState({ nodesSelectionActive: !1 }), E.selected && $e ? (Re({ nodes: [], edges: [E] }), ne.current?.blur()) : xe([e])), s && s(Se, E);
  }, ae = u ? (Se) => {
    u(Se, { ...E });
  } : void 0, se = c ? (Se) => {
    c(Se, { ...E });
  } : void 0, P = d ? (Se) => {
    d(Se, { ...E });
  } : void 0, me = p ? (Se) => {
    p(Se, { ...E });
  } : void 0, _e = h ? (Se) => {
    h(Se, { ...E });
  } : void 0, Te = (Se) => {
    if (!D && L1.includes(Se.key) && I) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Re } = Y.getState();
      Se.key === "Escape" ? (ne.current?.blur(), xe({ edges: [E] })) : Re([e]);
    }
  };
  return y.jsx("svg", { style: { zIndex: T }, children: y.jsxs("g", { className: Pt([
    "react-flow__edge",
    `react-flow__edge-${k}`,
    E.className,
    N,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !I && !s,
      updating: $,
      selectable: I
    }
  ]), onClick: ce, onDoubleClick: ae, onContextMenu: se, onMouseEnter: P, onMouseMove: me, onMouseLeave: _e, onKeyDown: V ? Te : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${mw}-${_}` : void 0, ref: ne, ...E.domAttributes, children: [!oe && y.jsx(H, { id: e, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: I, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: F, targetX: G, targetY: te, sourcePosition: j, targetPosition: U, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: Q, markerEnd: ee, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), A && y.jsx(y4, { edge: E, isReconnectable: A, reconnectRadius: v, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, sourceX: L, sourceY: F, targetX: G, targetY: te, sourcePosition: j, targetPosition: U, setUpdateHover: K, setReconnecting: z })] }) });
}
var x4 = S.memo(b4);
const w4 = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function Bw({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: h, onEdgeClick: v, reconnectRadius: g, onEdgeDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, disableKeyboardA11y: R }) {
  const { edgesFocusable: N, edgesReconnectable: C, elementsSelectable: D, onError: E } = lt(w4, Dt), O = r4(a);
  return y.jsxs("div", { className: "react-flow__edges", children: [y.jsx(c4, { defaultColor: e, rfId: r }), O.map((k) => y.jsx(x4, { id: k, edgesFocusable: N, edgesReconnectable: C, elementsSelectable: D, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: h, onClick: v, reconnectRadius: g, onDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, rfId: r, onError: E, edgeTypes: l, disableKeyboardA11y: R }, k))] });
}
Bw.displayName = "EdgeRenderer";
const _4 = S.memo(Bw), S4 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function E4({ children: e }) {
  const a = lt(S4);
  return y.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function N4(e) {
  const a = qm(), r = S.useRef(!1);
  S.useEffect(() => {
    !r.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), r.current = !0);
  }, [e, a.viewportInitialized]);
}
const C4 = (e) => e.panZoom?.syncViewport;
function R4(e) {
  const a = lt(C4), r = jt();
  return S.useEffect(() => {
    e && (a?.(e), r.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function T4(e) {
  return e.connection.inProgress ? { ...e.connection, to: Ll(e.connection.to, e.transform) } : { ...e.connection };
}
function M4(e) {
  return T4;
}
function A4(e) {
  const a = M4();
  return lt(a, Dt);
}
const D4 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function j4({ containerStyle: e, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = lt(D4, Dt);
  return !(u && s && p) ? null : y.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: y.jsx("g", { className: Pt(["react-flow__connection", B1(d)]), children: y.jsx(Uw, { style: a, type: r, CustomComponent: l, isValid: d }) }) });
}
const Uw = ({ style: e, type: a = Pi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: h, toNode: v, toHandle: g, toPosition: b, pointer: x } = A4();
  if (!s)
    return;
  if (r)
    return y.jsx(r, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: h.x, toY: h.y, fromPosition: p, toPosition: b, connectionStatus: B1(l), toNode: v, toHandle: g, pointer: x });
  let _ = "";
  const R = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: h.x,
    targetY: h.y,
    targetPosition: b
  };
  switch (a) {
    case Pi.Bezier:
      [_] = Q1(R);
      break;
    case Pi.SimpleBezier:
      [_] = Cw(R);
      break;
    case Pi.Step:
      [_] = Yh({
        ...R,
        borderRadius: 0
      });
      break;
    case Pi.SmoothStep:
      [_] = Yh(R);
      break;
    default:
      [_] = J1(R);
  }
  return y.jsx("path", { d: _, fill: "none", className: "react-flow__connection-path", style: e });
};
Uw.displayName = "ConnectionLine";
const O4 = {};
function Ab(e = O4) {
  S.useRef(e), jt(), S.useEffect(() => {
  }, [e]);
}
function z4() {
  jt(), S.useRef(!1), S.useEffect(() => {
  }, []);
}
function Vw({ nodeTypes: e, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: v, onSelectionContextMenu: g, onSelectionStart: b, onSelectionEnd: x, connectionLineType: _, connectionLineStyle: R, connectionLineComponent: N, connectionLineContainerStyle: C, selectionKeyCode: D, selectionOnDrag: E, selectionMode: O, multiSelectionKeyCode: k, panActivationKeyCode: H, zoomActivationKeyCode: V, deleteKeyCode: A, onlyRenderVisibleElements: I, elementsSelectable: ne, defaultViewport: $, translateExtent: K, minZoom: oe, maxZoom: z, preventScrolling: Y, defaultMarkerColor: T, zoomOnScroll: L, zoomOnPinch: F, panOnScroll: G, panOnScrollSpeed: te, panOnScrollMode: j, zoomOnDoubleClick: U, panOnDrag: Q, autoPanOnSelection: ee, onPaneClick: ce, onPaneMouseEnter: ae, onPaneMouseMove: se, onPaneMouseLeave: P, onPaneScroll: me, onPaneContextMenu: _e, paneClickDistance: Te, nodeClickDistance: Se, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, onReconnect: Xe, onReconnectStart: He, onReconnectEnd: Ie, noDragClassName: _t, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Pe, nodeExtent: gt, rfId: vt, viewport: Yt, onViewportChange: Lt }) {
  return Ab(e), Ab(a), z4(), N4(r), R4(Yt), y.jsx(PD, { onPaneClick: ce, onPaneMouseEnter: ae, onPaneMouseMove: se, onPaneMouseLeave: P, onPaneContextMenu: _e, onPaneScroll: me, paneClickDistance: Te, deleteKeyCode: A, selectionKeyCode: D, selectionOnDrag: E, selectionMode: O, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: k, panActivationKeyCode: H, zoomActivationKeyCode: V, elementsSelectable: ne, zoomOnScroll: L, zoomOnPinch: F, zoomOnDoubleClick: U, panOnScroll: G, panOnScrollSpeed: te, panOnScrollMode: j, panOnDrag: Q, autoPanOnSelection: ee, defaultViewport: $, translateExtent: K, minZoom: oe, maxZoom: z, onSelectionContextMenu: g, preventScrolling: Y, noDragClassName: _t, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Pe, onViewportChange: Lt, isControlledViewport: !!Yt, children: y.jsxs(E4, { children: [y.jsx(_4, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Xe, onReconnectStart: He, onReconnectEnd: Ie, onlyRenderVisibleElements: I, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, defaultMarkerColor: T, noPanClassName: Ze, disableKeyboardA11y: Pe, rfId: vt }), y.jsx(j4, { style: R, type: _, component: N, containerStyle: C }), y.jsx("div", { className: "react-flow__edgelabel-renderer" }), y.jsx(i4, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: v, nodeClickDistance: Se, onlyRenderVisibleElements: I, noPanClassName: Ze, noDragClassName: _t, disableKeyboardA11y: Pe, nodeExtent: gt, rfId: vt }), y.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Vw.displayName = "GraphView";
const L4 = S.memo(Vw), k4 = I1(), Db = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: h = 2, nodeOrigin: v, nodeExtent: g, zIndexMode: b = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), C = l ?? a ?? [], D = r ?? e ?? [], E = v ?? [0, 0], O = g ?? Po;
  tw(R, N, C);
  const { nodesInitialized: k } = Xh(D, x, _, {
    nodeOrigin: E,
    nodeExtent: O,
    zIndexMode: b
  });
  let H = [0, 0, 1];
  if (c && s && u) {
    const V = cs(x, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: A, y: I, zoom: ne } = zm(V, s, u, p, h, d?.padding ?? 0.1);
    H = [A, I, ne];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: H,
    nodes: D,
    nodesInitialized: k,
    nodeLookup: x,
    parentLookup: _,
    edges: C,
    edgeLookup: N,
    connectionLookup: R,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: h,
    translateExtent: Po,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Ml.Strict,
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
    fitViewOptions: d,
    fitViewResolver: null,
    connection: { ...H1 },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: k4,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: k1,
    zIndexMode: b,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, H4 = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: h, nodeOrigin: v, nodeExtent: g, zIndexMode: b }) => ZA((x, _) => {
  async function R() {
    const { nodeLookup: N, panZoom: C, fitViewOptions: D, fitViewResolver: E, width: O, height: k, minZoom: H, maxZoom: V } = _();
    C && (await GM({
      nodes: N,
      width: O,
      height: k,
      panZoom: C,
      minZoom: H,
      maxZoom: V
    }, D), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...Db({
      nodes: e,
      edges: a,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: d,
      minZoom: p,
      maxZoom: h,
      nodeOrigin: v,
      nodeExtent: g,
      defaultNodes: r,
      defaultEdges: l,
      zIndexMode: b
    }),
    setNodes: (N) => {
      const { nodeLookup: C, parentLookup: D, nodeOrigin: E, elevateNodesOnSelect: O, fitViewQueued: k, zIndexMode: H, nodesSelectionActive: V } = _(), { nodesInitialized: A, hasSelectedNodes: I } = Xh(N, C, D, {
        nodeOrigin: E,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: H
      }), ne = V && I;
      k && A ? (R(), x({
        nodes: N,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: ne
      })) : x({ nodes: N, nodesInitialized: A, nodesSelectionActive: ne });
    },
    setEdges: (N) => {
      const { connectionLookup: C, edgeLookup: D } = _();
      tw(C, D, N), x({ edges: N });
    },
    setDefaultNodesAndEdges: (N, C) => {
      if (N) {
        const { setNodes: D } = _();
        D(N), x({ hasDefaultNodes: !0 });
      }
      if (C) {
        const { setEdges: D } = _();
        D(C), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (N) => {
      const { triggerNodeChanges: C, nodeLookup: D, parentLookup: E, domNode: O, nodeOrigin: k, nodeExtent: H, debug: V, fitViewQueued: A, zIndexMode: I } = _(), { changes: ne, updatedInternals: $ } = mA(N, D, E, O, k, H, I);
      $ && (cA(D, E, { nodeOrigin: k, nodeExtent: H, zIndexMode: I }), A ? (R(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), ne?.length > 0 && (V && console.log("React Flow: trigger node changes", ne), C?.(ne)));
    },
    updateNodePositions: (N, C = !1) => {
      const D = [];
      let E = [];
      const { nodeLookup: O, triggerNodeChanges: k, connection: H, updateConnection: V, onNodesChangeMiddlewareMap: A } = _();
      for (const [I, ne] of N) {
        const $ = O.get(I), K = !!($?.expandParent && $?.parentId && ne?.position), oe = {
          id: I,
          type: "position",
          position: K ? {
            x: Math.max(0, ne.position.x),
            y: Math.max(0, ne.position.y)
          } : ne.position,
          dragging: C
        };
        if ($ && H.inProgress && H.fromNode.id === $.id) {
          const z = jr($, H.fromHandle, je.Left, !0);
          V({ ...H, from: z });
        }
        K && $.parentId && D.push({
          id: I,
          parentId: $.parentId,
          rect: {
            ...ne.internals.positionAbsolute,
            width: ne.measured.width ?? 0,
            height: ne.measured.height ?? 0
          }
        }), E.push(oe);
      }
      if (D.length > 0) {
        const { parentLookup: I, nodeOrigin: ne } = _(), $ = Vm(D, O, I, ne);
        E.push(...$);
      }
      for (const I of A.values())
        E = I(E);
      k(E);
    },
    triggerNodeChanges: (N) => {
      const { onNodesChange: C, setNodes: D, nodes: E, hasDefaultNodes: O, debug: k } = _();
      if (N?.length) {
        if (O) {
          const H = vD(N, E);
          D(H);
        }
        k && console.log("React Flow: trigger node changes", N), C?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: C, setEdges: D, edges: E, hasDefaultEdges: O, debug: k } = _();
      if (N?.length) {
        if (O) {
          const H = yD(N, E);
          D(H);
        }
        k && console.log("React Flow: trigger edge changes", N), C?.(N);
      }
    },
    addSelectedNodes: (N) => {
      const { multiSelectionActive: C, edgeLookup: D, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: k } = _();
      if (C) {
        const H = N.map((V) => _r(V, !0));
        O(H);
        return;
      }
      O(_l(E, /* @__PURE__ */ new Set([...N]), !0)), k(_l(D));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: C, edgeLookup: D, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: k } = _();
      if (C) {
        const H = N.map((V) => _r(V, !0));
        k(H);
        return;
      }
      k(_l(D, /* @__PURE__ */ new Set([...N]))), O(_l(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: N, edges: C } = {}) => {
      const { edges: D, nodes: E, nodeLookup: O, triggerNodeChanges: k, triggerEdgeChanges: H } = _(), V = N || E, A = C || D, I = [];
      for (const $ of V) {
        if (!$.selected)
          continue;
        const K = O.get($.id);
        K && (K.selected = !1), I.push(_r($.id, !1));
      }
      const ne = [];
      for (const $ of A)
        $.selected && ne.push(_r($.id, !1));
      k(I), H(ne);
    },
    setMinZoom: (N) => {
      const { panZoom: C, maxZoom: D } = _();
      C?.setScaleExtent([N, D]), x({ minZoom: N });
    },
    setMaxZoom: (N) => {
      const { panZoom: C, minZoom: D } = _();
      C?.setScaleExtent([D, N]), x({ maxZoom: N });
    },
    setTranslateExtent: (N) => {
      _().panZoom?.setTranslateExtent(N), x({ translateExtent: N });
    },
    resetSelectedElements: () => {
      const { edges: N, nodes: C, triggerNodeChanges: D, triggerEdgeChanges: E, elementsSelectable: O } = _();
      if (!O)
        return;
      const k = C.reduce((V, A) => A.selected ? [...V, _r(A.id, !1)] : V, []), H = N.reduce((V, A) => A.selected ? [...V, _r(A.id, !1)] : V, []);
      D(k), E(H);
    },
    setNodeExtent: (N) => {
      const { nodes: C, nodeLookup: D, parentLookup: E, nodeOrigin: O, elevateNodesOnSelect: k, nodeExtent: H, zIndexMode: V } = _();
      N[0][0] === H[0][0] && N[0][1] === H[0][1] && N[1][0] === H[1][0] && N[1][1] === H[1][1] || (Xh(C, D, E, {
        nodeOrigin: O,
        nodeExtent: N,
        elevateNodesOnSelect: k,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: C, width: D, height: E, panZoom: O, translateExtent: k } = _();
      return pA({ delta: N, panZoom: O, transform: C, translateExtent: k, width: D, height: E });
    },
    setCenter: async (N, C, D) => {
      const { width: E, height: O, maxZoom: k, panZoom: H } = _();
      if (!H)
        return !1;
      const V = typeof D?.zoom < "u" ? D.zoom : k;
      return await H.setViewport({
        x: E / 2 - N * V,
        y: O / 2 - C * V,
        zoom: V
      }, { duration: D?.duration, ease: D?.ease, interpolate: D?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...H1 }
      });
    },
    updateConnection: (N) => {
      x({ connection: N });
    },
    reset: () => x({ ...Db() })
  };
}, Object.is);
function qw({ initialNodes: e, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: h, nodeOrigin: v, nodeExtent: g, zIndexMode: b, children: x }) {
  const [_] = S.useState(() => H4({
    nodes: e,
    edges: a,
    defaultNodes: r,
    defaultEdges: l,
    width: s,
    height: u,
    fitView: h,
    minZoom: c,
    maxZoom: d,
    fitViewOptions: p,
    nodeOrigin: v,
    nodeExtent: g,
    zIndexMode: b
  }));
  return y.jsx(KA, { value: _, children: y.jsx(ED, { children: x }) });
}
function B4({ children: e, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: h, maxZoom: v, nodeOrigin: g, nodeExtent: b, zIndexMode: x }) {
  return S.useContext(zc) ? y.jsx(y.Fragment, { children: e }) : y.jsx(qw, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: h, initialMaxZoom: v, nodeOrigin: g, nodeExtent: b, zIndexMode: x, children: e });
}
const U4 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function V4({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: h, onMove: v, onMoveStart: g, onMoveEnd: b, onConnect: x, onConnectStart: _, onConnectEnd: R, onClickConnectStart: N, onClickConnectEnd: C, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: k, onNodeDoubleClick: H, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: I, onNodesDelete: ne, onEdgesDelete: $, onDelete: K, onSelectionChange: oe, onSelectionDragStart: z, onSelectionDrag: Y, onSelectionDragStop: T, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onBeforeDelete: te, connectionMode: j, connectionLineType: U = Pi.Bezier, connectionLineStyle: Q, connectionLineComponent: ee, connectionLineContainerStyle: ce, deleteKeyCode: ae = "Backspace", selectionKeyCode: se = "Shift", selectionOnDrag: P = !1, selectionMode: me = Qo.Full, panActivationKeyCode: _e = "Space", multiSelectionKeyCode: Te = Jo() ? "Meta" : "Control", zoomActivationKeyCode: Se = Jo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Re, onlyRenderVisibleElements: $e = !1, selectNodesOnDrag: ft, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: He, nodesFocusable: Ie, nodeOrigin: _t = pw, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Pe = !0, defaultViewport: gt = cD, minZoom: vt = 0.5, maxZoom: Yt = 2, translateExtent: Lt = Po, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: Pn = "#b1b1b7", zoomOnScroll: _n = !0, zoomOnPinch: nn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = Rr.Free, zoomOnDoubleClick: vi = !0, panOnDrag: Ra = !0, onPaneClick: Sn, onPaneMouseEnter: da, onPaneMouseMove: kn, onPaneMouseLeave: Qn, onPaneScroll: cn, onPaneContextMenu: ke, paneClickDistance: yt = 1, nodeClickDistance: kt = 0, children: Vt, onReconnect: gn, onReconnectStart: pt, onReconnectEnd: Jt, onEdgeContextMenu: ha, onEdgeDoubleClick: en, onEdgeMouseEnter: B, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: pe = 10, onNodesChange: ge, onEdgesChange: Ee, noDragClassName: ye = "nodrag", noWheelClassName: we = "nowheel", noPanClassName: be = "nopan", fitView: Ae, fitViewOptions: De, connectOnClick: Ue, attributionPosition: ze, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: zt, autoPanOnNodeDrag: at, autoPanOnSelection: Ta = !0, autoPanSpeed: Hn, connectionRadius: fn, isValidConnection: an, onError: En, style: yi, id: Nn, nodeDragThreshold: bi, connectionDragThreshold: ma, viewport: pa, onViewportChange: Be, width: bt, height: vn, colorMode: Bn = "light", debug: xi, onScroll: Ga, ariaLabelConfig: dt, zIndexMode: Kn = "basic", ...rn }, tr) {
  const Lr = Nn || "1", kl = mD(Bn), wi = S.useCallback((Hl) => {
    Hl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ga?.(Hl);
  }, [Ga]);
  return y.jsx("div", { "data-testid": "rf__wrapper", ...rn, onScroll: wi, style: { ...yi, ...U4 }, ref: tr, className: Pt(["react-flow", s, kl]), id: Nn, role: "application", children: y.jsxs(B4, { nodes: e, edges: a, width: bt, height: vn, fitView: Ae, fitViewOptions: De, minZoom: vt, maxZoom: Yt, nodeOrigin: _t, nodeExtent: ot, zIndexMode: Kn, children: [y.jsx(hD, { nodes: e, edges: a, defaultNodes: r, defaultEdges: l, onConnect: x, onConnectStart: _, onConnectEnd: R, onClickConnectStart: N, onClickConnectEnd: C, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: He, nodesFocusable: Ie, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Pe, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: st, minZoom: vt, maxZoom: Yt, nodeExtent: ot, onNodesChange: ge, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Re, connectionMode: j, translateExtent: Lt, connectOnClick: Ue, defaultEdgeOptions: rt, fitView: Ae, fitViewOptions: De, onNodesDelete: ne, onEdgesDelete: $, onDelete: K, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: I, onSelectionDrag: Y, onSelectionDragStart: z, onSelectionDragStop: T, onMove: v, onMoveStart: g, onMoveEnd: b, noPanClassName: be, nodeOrigin: _t, rfId: Lr, autoPanOnConnect: zt, autoPanOnNodeDrag: at, autoPanSpeed: Hn, onError: En, connectionRadius: fn, isValidConnection: an, selectNodesOnDrag: ft, nodeDragThreshold: bi, connectionDragThreshold: ma, onBeforeDelete: te, debug: xi, ariaLabelConfig: dt, zIndexMode: Kn }), y.jsx(L4, { onInit: h, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: k, onNodeDoubleClick: H, nodeTypes: u, edgeTypes: c, connectionLineType: U, connectionLineStyle: Q, connectionLineComponent: ee, connectionLineContainerStyle: ce, selectionKeyCode: se, selectionOnDrag: P, selectionMode: me, deleteKeyCode: ae, multiSelectionKeyCode: Te, panActivationKeyCode: _e, zoomActivationKeyCode: Se, onlyRenderVisibleElements: $e, defaultViewport: gt, translateExtent: Lt, minZoom: vt, maxZoom: Yt, preventScrolling: mt, zoomOnScroll: _n, zoomOnPinch: nn, zoomOnDoubleClick: vi, panOnScroll: Kt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: Ra, autoPanOnSelection: Ta, onPaneClick: Sn, onPaneMouseEnter: da, onPaneMouseMove: kn, onPaneMouseLeave: Qn, onPaneScroll: cn, onPaneContextMenu: ke, paneClickDistance: yt, nodeClickDistance: kt, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onReconnect: gn, onReconnectStart: pt, onReconnectEnd: Jt, onEdgeContextMenu: ha, onEdgeDoubleClick: en, onEdgeMouseEnter: B, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: pe, defaultMarkerColor: Pn, noDragClassName: ye, noWheelClassName: we, noPanClassName: be, rfId: Lr, disableKeyboardA11y: We, nodeExtent: ot, viewport: pa, onViewportChange: Be }), y.jsx(uD, { onSelectionChange: oe }), Vt, y.jsx(iD, { proOptions: Ge, position: ze }), y.jsx(aD, { rfId: Lr, disableKeyboardA11y: We })] }) });
}
var q4 = vw(V4);
function $4({ dimensions: e, lineWidth: a, variant: r, className: l }) {
  return y.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Pt(["react-flow__background-pattern", r, l]) });
}
function I4({ radius: e, className: a }) {
  return y.jsx("circle", { cx: e, cy: e, r: e, className: Pt(["react-flow__background-pattern", "dots", a]) });
}
var qa;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(qa || (qa = {}));
const Y4 = {
  [qa.Dots]: 1,
  [qa.Lines]: 1,
  [qa.Cross]: 6
}, G4 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function $w({
  id: e,
  variant: a = qa.Dots,
  // only used for dots and cross
  gap: r = 20,
  // only used for lines and cross
  size: l,
  lineWidth: s = 1,
  offset: u = 0,
  color: c,
  bgColor: d,
  style: p,
  className: h,
  patternClassName: v
}) {
  const g = S.useRef(null), { transform: b, patternId: x } = lt(G4, Dt), _ = l || Y4[a], R = a === qa.Dots, N = a === qa.Cross, C = Array.isArray(r) ? r : [r, r], D = [C[0] * b[2] || 1, C[1] * b[2] || 1], E = _ * b[2], O = Array.isArray(u) ? u : [u, u], k = N ? [E, E] : D, H = [
    O[0] * b[2] || 1 + k[0] / 2,
    O[1] * b[2] || 1 + k[1] / 2
  ], V = `${x}${e || ""}`;
  return y.jsxs("svg", { className: Pt(["react-flow__background", h]), style: {
    ...p,
    ...kc,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [y.jsx("pattern", { id: V, x: b[0] % D[0], y: b[1] % D[1], width: D[0], height: D[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${H[0]},-${H[1]})`, children: R ? y.jsx(I4, { radius: E / 2, className: v }) : y.jsx($4, { dimensions: k, lineWidth: s, variant: a, className: v }) }), y.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
$w.displayName = "Background";
const jb = S.memo($w);
function X4() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: y.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function F4() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: y.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function Z4() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: y.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function P4() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: y.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function Q4() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: y.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function zu({ children: e, className: a, ...r }) {
  return y.jsx("button", { type: "button", className: Pt(["react-flow__controls-button", a]), ...r, children: e });
}
const K4 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function Iw({ style: e, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: h, children: v, position: g = "bottom-left", orientation: b = "vertical", "aria-label": x }) {
  const _ = jt(), { isInteractive: R, minZoomReached: N, maxZoomReached: C, ariaLabelConfig: D } = lt(K4, Dt), { zoomIn: E, zoomOut: O, fitView: k } = qm(), H = () => {
    E(), u?.();
  }, V = () => {
    O(), c?.();
  }, A = () => {
    k(s), d?.();
  }, I = () => {
    _.setState({
      nodesDraggable: !R,
      nodesConnectable: !R,
      elementsSelectable: !R
    }), p?.(!R);
  }, ne = b === "horizontal" ? "horizontal" : "vertical";
  return y.jsxs(Lc, { className: Pt(["react-flow__controls", ne, h]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? D["controls.ariaLabel"], children: [a && y.jsxs(y.Fragment, { children: [y.jsx(zu, { onClick: H, className: "react-flow__controls-zoomin", title: D["controls.zoomIn.ariaLabel"], "aria-label": D["controls.zoomIn.ariaLabel"], disabled: C, children: y.jsx(X4, {}) }), y.jsx(zu, { onClick: V, className: "react-flow__controls-zoomout", title: D["controls.zoomOut.ariaLabel"], "aria-label": D["controls.zoomOut.ariaLabel"], disabled: N, children: y.jsx(F4, {}) })] }), r && y.jsx(zu, { className: "react-flow__controls-fitview", onClick: A, title: D["controls.fitView.ariaLabel"], "aria-label": D["controls.fitView.ariaLabel"], children: y.jsx(Z4, {}) }), l && y.jsx(zu, { className: "react-flow__controls-interactive", onClick: I, title: D["controls.interactive.ariaLabel"], "aria-label": D["controls.interactive.ariaLabel"], children: R ? y.jsx(Q4, {}) : y.jsx(P4, {}) }), v] });
}
Iw.displayName = "Controls";
const J4 = S.memo(Iw);
function W4({ id: e, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: h, borderRadius: v, shapeRendering: g, selected: b, onClick: x }) {
  const { background: _, backgroundColor: R } = u || {}, N = c || _ || R;
  return y.jsx("rect", { className: Pt(["react-flow__minimap-node", { selected: b }, h]), x: a, y: r, rx: v, ry: v, width: l, height: s, style: {
    fill: N,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (C) => x(C, e) : void 0 });
}
const e5 = S.memo(W4), t5 = (e) => e.nodes.map((a) => a.id), gh = (e) => e instanceof Function ? e : () => e;
function n5({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = e5,
  onClick: c
}) {
  const d = lt(t5, Dt), p = gh(a), h = gh(e), v = gh(r), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return y.jsx(y.Fragment, { children: d.map((b) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    y.jsx(i5, { id: b, nodeColorFunc: p, nodeStrokeColorFunc: h, nodeClassNameFunc: v, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, b)
  )) });
}
function a5({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: h, x: v, y: g, width: b, height: x } = lt((_) => {
    const R = _.nodeLookup.get(e);
    if (!R)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = R.internals.userNode, { x: C, y: D } = R.internals.positionAbsolute, { width: E, height: O } = gi(N);
    return {
      node: N,
      x: C,
      y: D,
      width: E,
      height: O
    };
  }, Dt);
  return !h || h.hidden || !Y1(h) ? null : y.jsx(d, { x: v, y: g, width: b, height: x, style: h.style, selected: !!h.selected, className: l(h), color: a(h), borderRadius: s, strokeColor: r(h), strokeWidth: u, shapeRendering: c, onClick: p, id: h.id });
}
const i5 = S.memo(a5);
var r5 = S.memo(n5);
const l5 = 200, o5 = 150, s5 = (e) => !e.hidden, u5 = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? $1(cs(e.nodeLookup, { filter: s5 }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, c5 = "react-flow__minimap-desc";
function Yw({
  style: e,
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
  nodeComponent: d,
  bgColor: p,
  maskColor: h,
  maskStrokeColor: v,
  maskStrokeWidth: g,
  position: b = "bottom-right",
  onClick: x,
  onNodeClick: _,
  pannable: R = !1,
  zoomable: N = !1,
  ariaLabel: C,
  inversePan: D,
  zoomStep: E = 1,
  offsetScale: O = 5
}) {
  const k = jt(), H = S.useRef(null), { boundingRect: V, viewBB: A, rfId: I, panZoom: ne, translateExtent: $, flowWidth: K, flowHeight: oe, ariaLabelConfig: z } = lt(u5, Dt), Y = e?.width ?? l5, T = e?.height ?? o5, L = V.width / Y, F = V.height / T, G = Math.max(L, F), te = G * Y, j = G * T, U = O * G, Q = V.x - (te - V.width) / 2 - U, ee = V.y - (j - V.height) / 2 - U, ce = te + U * 2, ae = j + U * 2, se = `${c5}-${I}`, P = S.useRef(0), me = S.useRef();
  P.current = G, S.useEffect(() => {
    if (H.current && ne)
      return me.current = EA({
        domNode: H.current,
        panZoom: ne,
        getTransform: () => k.getState().transform,
        getViewScale: () => P.current
      }), () => {
        me.current?.destroy();
      };
  }, [ne]), S.useEffect(() => {
    me.current?.update({
      translateExtent: $,
      width: K,
      height: oe,
      inversePan: D,
      pannable: R,
      zoomStep: E,
      zoomable: N
    });
  }, [R, N, D, E, $, K, oe]);
  const _e = x ? (xe) => {
    const [Re, $e] = me.current?.pointer(xe) || [0, 0];
    x(xe, { x: Re, y: $e });
  } : void 0, Te = _ ? S.useCallback((xe, Re) => {
    const $e = k.getState().nodeLookup.get(Re).internals.userNode;
    _(xe, $e);
  }, []) : void 0, Se = C ?? z["minimap.ariaLabel"];
  return y.jsx(Lc, { position: b, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof h == "string" ? h : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof v == "string" ? v : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * G : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Pt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: y.jsxs("svg", { width: Y, height: T, viewBox: `${Q} ${ee} ${ce} ${ae}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": se, ref: H, onClick: _e, children: [Se && y.jsx("title", { id: se, children: Se }), y.jsx(r5, { onClick: Te, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), y.jsx("path", { className: "react-flow__minimap-mask", d: `M${Q - U},${ee - U}h${ce + U * 2}v${ae + U * 2}h${-ce - U * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Yw.displayName = "MiniMap";
const f5 = S.memo(Yw), d5 = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, h5 = {
  [Ol.Line]: "right",
  [Ol.Handle]: "bottom-right"
};
function m5({ nodeId: e, position: a, variant: r = Ol.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: h = Number.MAX_VALUE, maxHeight: v = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: b, autoScale: x = !0, shouldResize: _, onResizeStart: R, onResize: N, onResizeEnd: C }) {
  const D = ww(), E = typeof e == "string" ? e : D, O = jt(), k = S.useRef(null), H = r === Ol.Handle, V = lt(S.useCallback(d5(H && x), [H, x]), Dt), A = S.useRef(null), I = a ?? h5[r];
  S.useEffect(() => {
    if (!(!k.current || !E))
      return A.current || (A.current = HA({
        domNode: k.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: oe, snapToGrid: z, nodeOrigin: Y, domNode: T } = O.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: oe,
            snapToGrid: z,
            nodeOrigin: Y,
            paneDomNode: T
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: oe, nodeLookup: z, parentLookup: Y, nodeOrigin: T } = O.getState(), L = [], F = { x: $.x, y: $.y }, G = z.get(E);
          if (G && G.expandParent && G.parentId) {
            const te = G.origin ?? T, j = $.width ?? G.measured.width ?? 0, U = $.height ?? G.measured.height ?? 0, Q = {
              id: G.id,
              parentId: G.parentId,
              rect: {
                width: j,
                height: U,
                ...G1({
                  x: $.x ?? G.position.x,
                  y: $.y ?? G.position.y
                }, { width: j, height: U }, G.parentId, z, te)
              }
            }, ee = Vm([Q], z, Y, T);
            L.push(...ee), F.x = $.x ? Math.max(te[0] * j, $.x) : void 0, F.y = $.y ? Math.max(te[1] * U, $.y) : void 0;
          }
          if (F.x !== void 0 && F.y !== void 0) {
            const te = {
              id: E,
              type: "position",
              position: { ...F }
            };
            L.push(te);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const j = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: b ? b === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            L.push(j);
          }
          for (const te of K) {
            const j = {
              ...te,
              type: "position"
            };
            L.push(j);
          }
          oe(L);
        },
        onEnd: ({ width: $, height: K }) => {
          const oe = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: $,
              height: K
            }
          };
          O.getState().triggerNodeChanges([oe]);
        }
      })), A.current.update({
        controlPosition: I,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: h,
          maxHeight: v
        },
        keepAspectRatio: g,
        resizeDirection: b,
        onResizeStart: R,
        onResize: N,
        onResizeEnd: C,
        shouldResize: _
      }), () => {
        A.current?.destroy();
      };
  }, [
    I,
    d,
    p,
    h,
    v,
    g,
    R,
    N,
    C,
    _
  ]);
  const ne = I.split("-");
  return y.jsx("div", { className: Pt(["react-flow__resize-control", "nodrag", ...ne, r, l]), ref: k, style: {
    ...s,
    scale: V,
    ...c && { [H ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
S.memo(m5);
var p5 = "_1bllf8b0", g5 = "_1bllf8b1";
const Ob = 16, v5 = "rgba(186, 158, 255, 0.14)", y5 = "rgba(186, 158, 255, 0.06)", b5 = "rgba(0, 0, 0, 0.6)", x5 = "#1d2023", w5 = "#ba9eff";
function _5({
  nodes: e,
  edges: a,
  nodeTypes: r,
  showMiniMap: l = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: d,
  children: p,
  onNodeClick: h
}) {
  const v = [p5, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsx("div", { className: v, "aria-label": d ?? "node graph", children: /* @__PURE__ */ y.jsxs(
    q4,
    {
      nodes: e,
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
      onNodeClick: (g, b) => h?.(b),
      children: [
        /* @__PURE__ */ y.jsx(
          jb,
          {
            id: "minor",
            variant: qa.Dots,
            gap: Ob,
            size: 1.1,
            color: v5
          }
        ),
        /* @__PURE__ */ y.jsx(
          jb,
          {
            id: "major",
            variant: qa.Lines,
            gap: Ob * 5,
            lineWidth: 1,
            color: y5
          }
        ),
        s && /* @__PURE__ */ y.jsx(J4, { showInteractive: !1 }),
        l && /* @__PURE__ */ y.jsx(
          f5,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: b5,
            nodeColor: () => x5,
            nodeStrokeColor: () => w5,
            className: g5
          }
        ),
        p
      ]
    }
  ) });
}
function S5(e) {
  return /* @__PURE__ */ y.jsx(qw, { children: /* @__PURE__ */ y.jsx(_5, { ...e }) });
}
var E5 = "a9gtw0", N5 = "a9gtw1", C5 = "a9gtw2", R5 = "a9gtw3", T5 = "a9gtw4", M5 = "a9gtw5", A5 = "a9gtw6", D5 = "a9gtw7";
const j5 = {
  default: "",
  raised: N5,
  inset: C5
};
function ka({
  title: e,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [E5, j5[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("section", { className: c, children: [
    (e || r) && /* @__PURE__ */ y.jsxs("header", { className: R5, children: [
      /* @__PURE__ */ y.jsxs("div", { className: T5, children: [
        e && /* @__PURE__ */ y.jsx("span", { className: A5, children: e }),
        a && /* @__PURE__ */ y.jsx("span", { className: D5, children: a })
      ] }),
      r && /* @__PURE__ */ y.jsx("div", { className: M5, children: r })
    ] }),
    l
  ] });
}
const Im = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function Ym() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function vc() {
  return {
    phase: "idle",
    jobId: null,
    stage: null,
    stageDetail: null,
    overallFraction: 0,
    clipIndex: 0,
    numClips: 0,
    step: 0,
    totalSteps: 0,
    secondsPerStep: null,
    vramPeakGib: null,
    outputPath: null,
    renderReport: null,
    errorCode: null,
    errorMessage: null,
    stalled: !1,
    lastFrameAt: null,
    stageStates: Ym()
  };
}
function zb(e, a, r = Date.now()) {
  return {
    ...vc(),
    phase: "running",
    jobId: e,
    lastFrameAt: r,
    stageStates: {
      ...Ym(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function O5(e, a, r = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: H5(a.params.fraction),
        stage: a.params.stage ?? l.stage,
        stageDetail: a.params.detail ?? l.stageDetail
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: q5(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: U5(
          l.secondsPerStep,
          a.params.seconds_per_step
        )
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
        stageStates: Gw(l.stageStates)
      };
    default:
      return l;
  }
}
function z5(e) {
  return { ...e, phase: "cancelled", stageStates: Ym() };
}
const L5 = -32108;
function k5(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: L5,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: Gw(e.stageStates)
  };
}
function Lb(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function Lu(e) {
  const a = vc();
  return e.status === "succeeded" && e.outputPath ? {
    ...a,
    phase: "done",
    jobId: e.id,
    overallFraction: 1,
    outputPath: e.outputPath,
    renderReport: e.renderReport,
    vramPeakGib: e.renderReport?.vram_peak_gib ?? null,
    stageStates: {
      anchor: "done",
      qwen_edit: "done",
      diffusion: "done",
      stitch: "done",
      interpolate: "done",
      mux: "done"
    }
  } : e.status === "failed" ? {
    ...a,
    phase: "error",
    jobId: e.id,
    errorCode: e.errorCode,
    errorMessage: e.errorMessage
  } : e.status === "cancelled" ? { ...a, phase: "cancelled", jobId: e.id } : { ...a, jobId: e.id };
}
function H5(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const B5 = 0.3;
function U5(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + B5 * (a - e);
}
function V5(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), r = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + r * e.totalSteps) * e.secondsPerStep;
}
function q5(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function Gw(e) {
  const a = { ...e };
  for (const r of Im)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const Xw = [
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
    description: "Canonical chaining plus exact clip/size overrides. Change only for A/B.",
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
], Bc = [
  {
    key: "num_clips",
    label: "Clips",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 64,
    step: 1,
    default: 6,
    help: "Number of chained clips. Driven by the Length control; edit for exact counts."
  },
  {
    key: "frames_per_clip",
    label: "Frames per clip",
    tier: "coherence",
    control: "number",
    min: 5,
    max: 129,
    step: 4,
    default: 85,
    help: "Must be 4n+1 (49, 65, 85, 129). 85 @ 16 fps ≈ 5.3s per segment."
  },
  {
    key: "width",
    label: "Width (custom)",
    tier: "coherence",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 832,
    help: "Must be divisible by 16. Prefer the Generation resolution presets; 832×480 is the trained budget."
  },
  {
    key: "height",
    label: "Height (custom)",
    tier: "coherence",
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
    key: "solver",
    label: "Solver",
    tier: "quality",
    control: "select",
    default: "euler",
    options: [
      { value: "euler", label: "Euler (standard)" },
      { value: "euler_ancestral", label: "Euler ancestral (distill / lightx2v)" },
      { value: "heun", label: "Heun (2nd-order, ~2× slower)" }
    ],
    help: "Euler = standard flow step (fast). Euler ancestral = re-noises each step; matches ComfyUI euler_ancestral for distill (lightx2v) models. Heun = 2nd-order, ~2× render time. Heun disables TeaCache."
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
  },
  {
    key: "teacache_multiplier",
    label: "TeaCache speedup",
    tier: "perf",
    control: "select",
    numeric: !0,
    default: 1,
    options: [
      { value: "1", label: "Off (1×)" },
      { value: "1.25", label: "1.25× (near-lossless)" },
      { value: "1.5", label: "1.5×" },
      { value: "1.75", label: "1.75×" },
      { value: "2", label: "2× (softer)" },
      { value: "2.25", label: "2.25×" },
      { value: "2.5", label: "2.5× (artifacts likely)" }
    ],
    help: "Caches diffusion steps when frame-to-frame change is small — higher = faster but more ghosting/artifacts. Off = full quality."
  }
];
function $5(e) {
  return Bc.filter((a) => a.tier === e);
}
function I5() {
  const e = {};
  for (const a of Bc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function kb(e) {
  return {
    ...I5(),
    mode: "image_to_video",
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    upscale_factor: 0,
    upscale_model: "auto",
    upscale_quality: "HIGH",
    blocks_to_swap: e.blocksToSwap,
    attention: e.attentionBackend,
    interpolate_method: e.interpolateMethod,
    interpolate_fps: e.interpolateFps,
    models_dir: e.modelsDir || void 0,
    output_path: e.outputDir ? `${e.outputDir}/svi2_out.mp4` : void 0,
    dit_high_path: e.ditHighPath || void 0,
    dit_low_path: e.ditLowPath || void 0,
    svi_lora_tier: e.sviLoraTier ?? "high",
    torch_compile_mode: "default"
  };
}
function Hb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const Fw = [10, 20, 30, 60, 120], Y5 = "custom", bl = 85, vh = { framesPerClip: bl, fps: 16, overlap: 5 };
function Or(e) {
  return {
    framesPerClip: e.frames_per_clip ?? vh.framesPerClip,
    fps: e.fps ?? vh.fps,
    overlap: e.num_overlap_frame ?? vh.overlap
  };
}
function Zw(e, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (e - 1) * (r - l);
}
function Ph(e, a) {
  return a.fps <= 0 ? 0 : Zw(e, a) / a.fps;
}
function G5(e, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
function X5(e, a) {
  const { fps: r, overlap: l } = a;
  if (r <= 0) return { numClips: 1, framesPerClip: bl };
  const s = Math.round(e * r);
  if (s <= Gm)
    return { numClips: 1, framesPerClip: Xm(s) };
  const u = bl - l;
  return u <= 0 ? { numClips: 1, framesPerClip: bl } : { numClips: Math.max(2, Math.round((s - bl) / u) + 1), framesPerClip: bl };
}
const F5 = 5, Gm = 129, Z5 = [2, 3, 4, 5, 6, 8];
function Xm(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(Gm, Math.max(F5, a));
}
function Bb(e, a) {
  return Xm(e * a);
}
function P5(e) {
  return e <= 0 ? 0 : Math.floor(Gm / e);
}
function Pw(e) {
  const { framesPerClip: a, fps: r } = Or(e);
  return r <= 0 ? 0 : a / r;
}
function Q5(e) {
  const { framesPerClip: a, fps: r } = Or(e), l = `1 × ${a} frames @ ${r} fps → ${Pw(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function K5(e, a) {
  for (const r of Fw)
    if (G5(r, a) === e) return r;
  return Y5;
}
function J5(e) {
  const a = Or(e), r = e.num_clips ?? 1, l = Ph(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
const es = "svi-canonical", W5 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), e3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), t3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function n3(e) {
  const a = e.frames_per_clip, r = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function a3(e) {
  const a = e.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = n3(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = W5.has(e.id), h = a.blocks_to_swap ?? 0, v = h >= 40 ? "~10–11 GiB (16 GB)" : h > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: v,
    isLowVram: p,
    isOffDistribution: e3.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : t3.has(e.id)
  };
}
function i3(e) {
  return [...e].sort((a, r) => a.id === es ? -1 : r.id === es ? 1 : 0);
}
function r3(e) {
  const a = e.filter((r) => !r.hidden);
  return {
    featured: i3(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function l3(e = 25) {
  return er(`/render/jobs?limit=${e}`);
}
async function yh(e) {
  return er(`/render/jobs/${e}`);
}
async function o3(e) {
  return er("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function s3(e) {
  return er(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function u3(e, a, r) {
  return nC(`/render/jobs/${e}/events`, a, r);
}
const c3 = 9e4, Ub = 24e4, f3 = 5e3, Fm = "nexus.video.svi2-pro.active-render";
function d3(e) {
  try {
    sessionStorage.setItem(Fm, JSON.stringify({ jobId: e }));
  } catch {
  }
}
function ku() {
  try {
    sessionStorage.removeItem(Fm);
  } catch {
  }
}
function h3() {
  try {
    const e = sessionStorage.getItem(Fm);
    if (!e) return null;
    const a = JSON.parse(e);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
const Qw = S.createContext(null);
function m3({
  initialSettings: e = a1,
  initialPreset: a = null,
  children: r
}) {
  const [l, s] = S.useState(e), [u, c] = S.useState(
    a?.id ?? es
  ), [d, p] = S.useState(a !== null), [h, v] = S.useState(() => {
    const ae = kb(e);
    return a ? Hb(ae, a) : ae;
  }), [g, b] = S.useState(null), [x, _] = S.useState(null), [R, N] = S.useState({
    enabled: !1,
    prompt: ""
  }), [C, D] = S.useState(vc), E = S.useRef(null), O = S.useRef(null), k = S.useRef(C);
  k.current = C;
  const H = S.useRef(!1), V = S.useRef(0), A = S.useRef(null), I = S.useCallback(() => {
    O.current !== null && (clearInterval(O.current), O.current = null);
  }, []), ne = S.useCallback(() => {
    I(), O.current = setInterval(() => {
      const ae = k.current;
      if (ae.phase !== "running" || ae.lastFrameAt === null || H.current) return;
      const se = Date.now() - ae.lastFrameAt, P = Date.now() - V.current;
      if (se >= Ub && P >= Ub) {
        ae.jobId && A.current?.(ae.jobId);
        return;
      }
      se >= c3 && D((me) => Lb(me));
    }, f3);
  }, [I]), $ = S.useCallback(
    (ae) => {
      E.current?.(), E.current = u3(
        ae,
        (se) => {
          D((P) => O5(P, se));
        },
        () => {
          H.current || D((se) => Lb(se));
        }
      ), ne();
    },
    [ne]
  ), K = S.useCallback(
    (ae) => {
      if (H.current) return;
      const se = ae;
      H.current = !0, V.current = Date.now(), $(ae), D(
        (_e) => _e.phase === "running" ? { ..._e, lastFrameAt: Date.now() } : _e
      );
      const P = () => k.current.jobId === se && k.current.phase === "running", me = (_e) => {
        P() && (E.current?.(), E.current = null, I(), D(_e));
      };
      yh(ae).then((_e) => {
        (_e.status === "succeeded" || _e.status === "failed" || _e.status === "cancelled") && me(Lu(_e));
      }).catch(() => {
        me(k5(k.current));
      }).finally(() => {
        H.current = !1;
      });
    },
    [$, I]
  );
  A.current = K;
  const oe = S.useCallback(
    (ae) => {
      const se = ae.params.requires_last_image === !0;
      c(ae.id), p(!0), v((P) => {
        const me = {
          ...kb(l),
          mode: P.mode ?? "image_to_video",
          ref_image_path: P.ref_image_path,
          prompts: P.prompts,
          last_image_path: se ? P.last_image_path ?? null : null
        };
        return Hb(me, ae);
      }), se || _(null);
    },
    [l]
  ), z = S.useCallback((ae) => {
    v((se) => {
      if (ae === "text_to_video") return { ...se, mode: ae };
      const { seed: P, ...me } = se;
      return { ...me, mode: ae };
    });
  }, []), Y = S.useCallback(
    (ae, se) => {
      v((P) => ({ ...P, [ae]: se }));
    },
    []
  ), T = S.useCallback((ae) => {
    v((se) => ({ ...se, prompts: ae }));
  }, []), L = S.useCallback((ae, se) => {
    b(ae), v((P) => ({ ...P, ref_image_path: se }));
  }, []), F = S.useCallback((ae, se) => {
    _(ae), v((P) => se === null || se.length === 0 ? { ...P, last_image_path: se } : {
      ...P,
      last_image_path: se,
      num_clips: 1,
      frames_per_clip: Xm(P.frames_per_clip ?? 81)
    });
  }, []), G = S.useCallback((ae) => {
    N((se) => ({ ...se, ...ae }));
  }, []), te = S.useCallback((ae) => {
    s(ae);
  }, []), j = S.useCallback(() => {
    E.current?.(), E.current = null, I(), ku(), D(vc());
  }, [I]), U = S.useCallback(async () => {
    E.current?.(), V.current = 0, console.info("[svi2] render → params", {
      base_model: {
        dit_high_path: h.dit_high_path ?? "(bundled)",
        dit_low_path: h.dit_low_path ?? "(bundled)",
        svi_lora_tier: h.svi_lora_tier ?? "high"
      },
      quality: {
        num_inference_steps: h.num_inference_steps,
        cfg_scale: h.cfg_scale,
        sigma_shift: h.sigma_shift,
        switch_boundary: h.switch_boundary,
        solver: h.solver,
        seed: h.seed,
        seed_multiplier: h.seed_multiplier
      },
      basics: {
        width: h.width,
        height: h.height,
        num_clips: h.num_clips,
        frames_per_clip: h.frames_per_clip,
        fps: h.fps,
        interpolate_fps: h.interpolate_fps,
        interpolate_method: h.interpolate_method,
        upscale_factor: h.upscale_factor,
        upscale_model: h.upscale_model,
        upscale_quality: h.upscale_quality
      },
      compile: {
        use_torch_compile: h.use_torch_compile,
        torch_compile_mode: h.torch_compile_mode,
        blocks_to_swap: h.blocks_to_swap
      },
      user_loras: h.user_loras ?? [],
      presetId: u
    });
    const { jobId: ae } = await o3({ presetId: u, params: h });
    D(zb(ae, R.enabled)), d3(ae), $(ae);
  }, [h, u, R.enabled, $]), Q = S.useCallback(async () => {
    const ae = k.current.jobId ?? C.jobId;
    if (!ae) return;
    const { status: se } = await s3(ae);
    se !== "cancelling" && (E.current?.(), E.current = null, I(), ku(), D((P) => z5(P)));
  }, [C.jobId, I]), ee = S.useCallback(
    async (ae) => {
      E.current?.(), E.current = null, I();
      try {
        const se = await yh(ae.id);
        D(Lu(se));
      } catch {
        D(Lu(ae));
      }
    },
    [I]
  );
  S.useEffect(() => {
    (C.phase === "done" || C.phase === "error" || C.phase === "cancelled") && ku();
  }, [C.phase]), S.useEffect(() => {
    const ae = () => {
      const me = k.current;
      me.phase !== "running" || !me.jobId || ($(me.jobId), D(
        (_e) => _e.phase === "running" ? { ..._e, stalled: !1, lastFrameAt: Date.now() } : _e
      ));
    }, se = () => {
      document.visibilityState === "visible" && ae();
    }, P = () => ae();
    return document.addEventListener("visibilitychange", se), window.addEventListener("focus", P), () => {
      document.removeEventListener("visibilitychange", se), window.removeEventListener("focus", P);
    };
  }, [$]), S.useEffect(() => {
    const ae = h3();
    if (!ae) return;
    let se = !1;
    return yh(ae).then((P) => {
      if (!se) {
        if (P.status === "succeeded" || P.status === "failed" || P.status === "cancelled") {
          ku(), D(Lu(P));
          return;
        }
        D(zb(ae, !1)), $(ae);
      }
    }).catch(() => {
    }), () => {
      se = !0;
    };
  }, [$]), S.useEffect(() => () => {
    E.current?.(), E.current = null, I();
  }, [I]);
  const ce = S.useMemo(
    () => ({
      settings: l,
      presetId: u,
      presetApplied: d,
      params: h,
      refImageName: g,
      lastImageName: x,
      qwenEdit: R,
      render: C,
      applyPresetById: oe,
      setMode: z,
      updateParam: Y,
      setPrompts: T,
      setRefImage: L,
      setLastImage: F,
      setQwenEdit: G,
      setSettings: te,
      startRenderJob: U,
      cancelRenderJob: Q,
      resetRender: j,
      showJobResult: ee
    }),
    [
      l,
      u,
      d,
      h,
      g,
      x,
      R,
      C,
      oe,
      z,
      Y,
      T,
      L,
      F,
      G,
      te,
      U,
      Q,
      j,
      ee
    ]
  );
  return /* @__PURE__ */ y.jsx(Qw.Provider, { value: ce, children: r });
}
function Qt() {
  const e = S.useContext(Qw);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
function p3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
const g3 = (e) => {
  switch (e) {
    case "success":
      return b3;
    case "info":
      return w3;
    case "warning":
      return x3;
    case "error":
      return _3;
    default:
      return null;
  }
}, v3 = Array(12).fill(0), y3 = ({ visible: e, className: a }) => /* @__PURE__ */ ve.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ ve.createElement("div", {
  className: "sonner-spinner"
}, v3.map((r, l) => /* @__PURE__ */ ve.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), b3 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), x3 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), w3 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), _3 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), S3 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ ve.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ ve.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), E3 = () => {
  const [e, a] = ve.useState(document.hidden);
  return ve.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), e;
};
let Qh = 1;
class N3 {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : Qh++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), c ? this.toasts = this.toasts.map((p) => p.id === u ? (this.publish({
        ...p,
        ...a,
        id: u,
        title: l
      }), {
        ...p,
        ...a,
        id: u,
        dismissible: d,
        title: l
      }) : p) : this.addToast({
        title: l,
        ...s,
        dismissible: d,
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
      const d = s.then(async (h) => {
        if (c = [
          "resolve",
          h
        ], ve.isValidElement(h))
          u = !1, this.create({
            id: l,
            type: "default",
            message: h
          });
        else if (R3(h) && !h.ok) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${h.status}`) : r.error, b = typeof r.description == "function" ? await r.description(`HTTP error! status: ${h.status}`) : r.description, _ = typeof g == "object" && !ve.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ..._
          });
        } else if (h instanceof Error) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(h) : r.error, b = typeof r.description == "function" ? await r.description(h) : r.description, _ = typeof g == "object" && !ve.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ..._
          });
        } else if (r.success !== void 0) {
          u = !1;
          const g = typeof r.success == "function" ? await r.success(h) : r.success, b = typeof r.description == "function" ? await r.description(h) : r.description, _ = typeof g == "object" && !ve.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "success",
            description: b,
            ..._
          });
        }
      }).catch(async (h) => {
        if (c = [
          "reject",
          h
        ], r.error !== void 0) {
          u = !1;
          const v = typeof r.error == "function" ? await r.error(h) : r.error, g = typeof r.description == "function" ? await r.description(h) : r.description, x = typeof v == "object" && !ve.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: g,
            ...x
          });
        }
      }).finally(() => {
        u && (this.dismiss(l), l = void 0), r.finally == null || r.finally.call(r);
      }), p = () => new Promise((h, v) => d.then(() => c[0] === "reject" ? v(c[1]) : h(c[1])).catch(v));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: p
      } : Object.assign(l, {
        unwrap: p
      });
    }, this.custom = (a, r) => {
      const l = r?.id || Qh++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const jn = new N3(), C3 = (e, a) => {
  const r = a?.id || Qh++;
  return jn.addToast({
    title: e,
    ...a,
    id: r
  }), r;
}, R3 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", T3 = C3, M3 = () => jn.toasts, A3 = () => jn.getActiveToasts(), Nr = Object.assign(T3, {
  success: jn.success,
  info: jn.info,
  warning: jn.warning,
  error: jn.error,
  custom: jn.custom,
  message: jn.message,
  promise: jn.promise,
  dismiss: jn.dismiss,
  loading: jn.loading
}, {
  getHistory: M3,
  getToasts: A3
});
p3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Hu(e) {
  return e.label !== void 0;
}
const D3 = 3, j3 = "24px", O3 = "16px", Vb = 4e3, z3 = 356, L3 = 14, k3 = 45, H3 = 200;
function za(...e) {
  return e.filter(Boolean).join(" ");
}
function B3(e) {
  const [a, r] = e.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const U3 = (e) => {
  var a, r, l, s, u, c, d, p, h;
  const { invert: v, toast: g, unstyled: b, interacting: x, setHeights: _, visibleToasts: R, heights: N, index: C, toasts: D, expanded: E, removeToast: O, defaultRichColors: k, closeButton: H, style: V, cancelButtonStyle: A, actionButtonStyle: I, className: ne = "", descriptionClassName: $ = "", duration: K, position: oe, gap: z, expandByDefault: Y, classNames: T, icons: L, closeButtonAriaLabel: F = "Close toast" } = e, [G, te] = ve.useState(null), [j, U] = ve.useState(null), [Q, ee] = ve.useState(!1), [ce, ae] = ve.useState(!1), [se, P] = ve.useState(!1), [me, _e] = ve.useState(!1), [Te, Se] = ve.useState(!1), [xe, Re] = ve.useState(0), [$e, ft] = ve.useState(0), Me = ve.useRef(g.duration || K || Vb), Xe = ve.useRef(null), He = ve.useRef(null), Ie = C === 0, _t = C + 1 <= R, Je = g.type, Ze = g.dismissible !== !1, Pe = g.className || "", gt = g.descriptionClassName || "", vt = ve.useMemo(() => N.findIndex((ke) => ke.toastId === g.id) || 0, [
    N,
    g.id
  ]), Yt = ve.useMemo(() => {
    var ke;
    return (ke = g.closeButton) != null ? ke : H;
  }, [
    g.closeButton,
    H
  ]), Lt = ve.useMemo(() => g.duration || K || Vb, [
    g.duration,
    K
  ]), mt = ve.useRef(0), ot = ve.useRef(0), Pn = ve.useRef(0), _n = ve.useRef(null), [nn, Kt] = oe.split("-"), Ot = ve.useMemo(() => N.reduce((ke, yt, kt) => kt >= vt ? ke : ke + yt.height, 0), [
    N,
    vt
  ]), Ut = E3(), vi = g.invert || v, Ra = Je === "loading";
  ot.current = ve.useMemo(() => vt * z + Ot, [
    vt,
    Ot
  ]), ve.useEffect(() => {
    Me.current = Lt;
  }, [
    Lt
  ]), ve.useEffect(() => {
    ee(!0);
  }, []), ve.useEffect(() => {
    const ke = He.current;
    if (ke) {
      const yt = ke.getBoundingClientRect().height;
      return ft(yt), _((kt) => [
        {
          toastId: g.id,
          height: yt,
          position: g.position
        },
        ...kt
      ]), () => _((kt) => kt.filter((Vt) => Vt.toastId !== g.id));
    }
  }, [
    _,
    g.id
  ]), ve.useLayoutEffect(() => {
    if (!Q) return;
    const ke = He.current, yt = ke.style.height;
    ke.style.height = "auto";
    const kt = ke.getBoundingClientRect().height;
    ke.style.height = yt, ft(kt), _((Vt) => Vt.find((pt) => pt.toastId === g.id) ? Vt.map((pt) => pt.toastId === g.id ? {
      ...pt,
      height: kt
    } : pt) : [
      {
        toastId: g.id,
        height: kt,
        position: g.position
      },
      ...Vt
    ]);
  }, [
    Q,
    g.title,
    g.description,
    _,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const Sn = ve.useCallback(() => {
    ae(!0), Re(ot.current), _((ke) => ke.filter((yt) => yt.toastId !== g.id)), setTimeout(() => {
      O(g);
    }, H3);
  }, [
    g,
    O,
    _,
    ot
  ]);
  ve.useEffect(() => {
    if (g.promise && Je === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let ke;
    return E || x || Ut ? (() => {
      if (Pn.current < mt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - mt.current;
        Me.current = Me.current - Vt;
      }
      Pn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Me.current !== 1 / 0 && (mt.current = (/* @__PURE__ */ new Date()).getTime(), ke = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), Sn();
      }, Me.current));
    })(), () => clearTimeout(ke);
  }, [
    E,
    x,
    g,
    Je,
    Ut,
    Sn
  ]), ve.useEffect(() => {
    g.delete && (Sn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    Sn,
    g.delete
  ]);
  function da() {
    var ke;
    if (L?.loading) {
      var yt;
      return /* @__PURE__ */ ve.createElement("div", {
        className: za(T?.loader, g == null || (yt = g.classNames) == null ? void 0 : yt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ve.createElement(y3, {
      className: za(T?.loader, g == null || (ke = g.classNames) == null ? void 0 : ke.loader),
      visible: Je === "loading"
    });
  }
  const kn = g.icon || L?.[Je] || g3(Je);
  var Qn, cn;
  return /* @__PURE__ */ ve.createElement("li", {
    tabIndex: 0,
    ref: He,
    className: za(ne, Pe, T?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, T?.default, T?.[Je], g == null || (r = g.classNames) == null ? void 0 : r[Je]),
    "data-sonner-toast": "",
    "data-rich-colors": (Qn = g.richColors) != null ? Qn : k,
    "data-styled": !(g.jsx || g.unstyled || b),
    "data-mounted": Q,
    "data-promise": !!g.promise,
    "data-swiped": Te,
    "data-removed": ce,
    "data-visible": _t,
    "data-y-position": nn,
    "data-x-position": Kt,
    "data-index": C,
    "data-front": Ie,
    "data-swiping": se,
    "data-dismissible": Ze,
    "data-type": Je,
    "data-invert": vi,
    "data-swipe-out": me,
    "data-swipe-direction": j,
    "data-expanded": !!(E || Y && Q),
    "data-testid": g.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": D.length - C,
      "--offset": `${ce ? xe : ot.current}px`,
      "--initial-height": Y ? "auto" : `${$e}px`,
      ...V,
      ...g.style
    },
    onDragEnd: () => {
      P(!1), te(null), _n.current = null;
    },
    onPointerDown: (ke) => {
      ke.button !== 2 && (Ra || !Ze || (Xe.current = /* @__PURE__ */ new Date(), Re(ot.current), ke.target.setPointerCapture(ke.pointerId), ke.target.tagName !== "BUTTON" && (P(!0), _n.current = {
        x: ke.clientX,
        y: ke.clientY
      })));
    },
    onPointerUp: () => {
      var ke, yt, kt;
      if (me || !Ze) return;
      _n.current = null;
      const Vt = Number(((ke = He.current) == null ? void 0 : ke.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), gn = Number(((yt = He.current) == null ? void 0 : yt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((kt = Xe.current) == null ? void 0 : kt.getTime()), Jt = G === "x" ? Vt : gn, ha = Math.abs(Jt) / pt;
      if (Math.abs(Jt) >= k3 || ha > 0.11) {
        Re(ot.current), g.onDismiss == null || g.onDismiss.call(g, g), U(G === "x" ? Vt > 0 ? "right" : "left" : gn > 0 ? "down" : "up"), Sn(), _e(!0);
        return;
      } else {
        var en, B;
        (en = He.current) == null || en.style.setProperty("--swipe-amount-x", "0px"), (B = He.current) == null || B.style.setProperty("--swipe-amount-y", "0px");
      }
      Se(!1), P(!1), te(null);
    },
    onPointerMove: (ke) => {
      var yt, kt, Vt;
      if (!_n.current || !Ze || ((yt = window.getSelection()) == null ? void 0 : yt.toString().length) > 0) return;
      const pt = ke.clientY - _n.current.y, Jt = ke.clientX - _n.current.x;
      var ha;
      const en = (ha = e.swipeDirections) != null ? ha : B3(oe);
      !G && (Math.abs(Jt) > 1 || Math.abs(pt) > 1) && te(Math.abs(Jt) > Math.abs(pt) ? "x" : "y");
      let B = {
        x: 0,
        y: 0
      };
      const Z = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if (G === "y") {
        if (en.includes("top") || en.includes("bottom"))
          if (en.includes("top") && pt < 0 || en.includes("bottom") && pt > 0)
            B.y = pt;
          else {
            const W = pt * Z(pt);
            B.y = Math.abs(W) < Math.abs(pt) ? W : pt;
          }
      } else if (G === "x" && (en.includes("left") || en.includes("right")))
        if (en.includes("left") && Jt < 0 || en.includes("right") && Jt > 0)
          B.x = Jt;
        else {
          const W = Jt * Z(Jt);
          B.x = Math.abs(W) < Math.abs(Jt) ? W : Jt;
        }
      (Math.abs(B.x) > 0 || Math.abs(B.y) > 0) && Se(!0), (kt = He.current) == null || kt.style.setProperty("--swipe-amount-x", `${B.x}px`), (Vt = He.current) == null || Vt.style.setProperty("--swipe-amount-y", `${B.y}px`);
    }
  }, Yt && !g.jsx && Je !== "loading" ? /* @__PURE__ */ ve.createElement("button", {
    "aria-label": F,
    "data-disabled": Ra,
    "data-close-button": !0,
    onClick: Ra || !Ze ? () => {
    } : () => {
      Sn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: za(T?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (cn = L?.close) != null ? cn : S3) : null, (Je || g.icon || g.promise) && g.icon !== null && (L?.[Je] !== null || g.icon) ? /* @__PURE__ */ ve.createElement("div", {
    "data-icon": "",
    className: za(T?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || da() : null, g.type !== "loading" ? kn : null) : null, /* @__PURE__ */ ve.createElement("div", {
    "data-content": "",
    className: za(T?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ve.createElement("div", {
    "data-title": "",
    className: za(T?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ ve.createElement("div", {
    "data-description": "",
    className: za($, gt, T?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ ve.isValidElement(g.cancel) ? g.cancel : g.cancel && Hu(g.cancel) ? /* @__PURE__ */ ve.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (ke) => {
      Hu(g.cancel) && Ze && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, ke), Sn());
    },
    className: za(T?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ ve.isValidElement(g.action) ? g.action : g.action && Hu(g.action) ? /* @__PURE__ */ ve.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || I,
    onClick: (ke) => {
      Hu(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, ke), !ke.defaultPrevented && Sn());
    },
    className: za(T?.actionButton, g == null || (h = g.classNames) == null ? void 0 : h.actionButton)
  }, g.action.label) : null);
};
function qb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function V3(e, a) {
  const r = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? O3 : j3;
    function p(h) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((v) => {
        r[`${c}-${v}`] = typeof h == "number" ? `${h}px` : h;
      });
    }
    typeof l == "number" || typeof l == "string" ? p(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((h) => {
      l[h] === void 0 ? r[`${c}-${h}`] = d : r[`${c}-${h}`] = typeof l[h] == "number" ? `${l[h]}px` : l[h];
    }) : p(d);
  }), r;
}
const q3 = /* @__PURE__ */ ve.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: h, offset: v, mobileOffset: g, theme: b = "light", richColors: x, duration: _, style: R, visibleToasts: N = D3, toastOptions: C, dir: D = qb(), gap: E = L3, icons: O, containerAriaLabel: k = "Notifications" } = a, [H, V] = ve.useState([]), A = ve.useMemo(() => l ? H.filter((Q) => Q.toasterId === l) : H.filter((Q) => !Q.toasterId), [
    H,
    l
  ]), I = ve.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((Q) => Q.position).map((Q) => Q.position)))), [
    A,
    u
  ]), [ne, $] = ve.useState([]), [K, oe] = ve.useState(!1), [z, Y] = ve.useState(!1), [T, L] = ve.useState(b !== "system" ? b : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = ve.useRef(null), G = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), te = ve.useRef(null), j = ve.useRef(!1), U = ve.useCallback((Q) => {
    V((ee) => {
      var ce;
      return (ce = ee.find((ae) => ae.id === Q.id)) != null && ce.delete || jn.dismiss(Q.id), ee.filter(({ id: ae }) => ae !== Q.id);
    });
  }, []);
  return ve.useEffect(() => jn.subscribe((Q) => {
    if (Q.dismiss) {
      requestAnimationFrame(() => {
        V((ee) => ee.map((ce) => ce.id === Q.id ? {
          ...ce,
          delete: !0
        } : ce));
      });
      return;
    }
    setTimeout(() => {
      QA.flushSync(() => {
        V((ee) => {
          const ce = ee.findIndex((ae) => ae.id === Q.id);
          return ce !== -1 ? [
            ...ee.slice(0, ce),
            {
              ...ee[ce],
              ...Q
            },
            ...ee.slice(ce + 1)
          ] : [
            Q,
            ...ee
          ];
        });
      });
    });
  }), [
    H
  ]), ve.useEffect(() => {
    if (b !== "system") {
      L(b);
      return;
    }
    if (b === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), typeof window > "u") return;
    const Q = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Q.addEventListener("change", ({ matches: ee }) => {
        L(ee ? "dark" : "light");
      });
    } catch {
      Q.addListener(({ matches: ce }) => {
        try {
          L(ce ? "dark" : "light");
        } catch (ae) {
          console.error(ae);
        }
      });
    }
  }, [
    b
  ]), ve.useEffect(() => {
    H.length <= 1 && oe(!1);
  }, [
    H
  ]), ve.useEffect(() => {
    const Q = (ee) => {
      var ce;
      if (c.every((P) => ee[P] || ee.code === P)) {
        var se;
        oe(!0), (se = F.current) == null || se.focus();
      }
      ee.code === "Escape" && (document.activeElement === F.current || (ce = F.current) != null && ce.contains(document.activeElement)) && oe(!1);
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [
    c
  ]), ve.useEffect(() => {
    if (F.current)
      return () => {
        te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null, j.current = !1);
      };
  }, [
    F.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ve.createElement("section", {
    ref: r,
    "aria-label": `${k} ${G}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((Q, ee) => {
    var ce;
    const [ae, se] = Q.split("-");
    return A.length ? /* @__PURE__ */ ve.createElement("ol", {
      key: Q,
      dir: D === "auto" ? qb() : D,
      tabIndex: -1,
      ref: F,
      className: h,
      "data-sonner-toaster": !0,
      "data-sonner-theme": T,
      "data-y-position": ae,
      "data-x-position": se,
      style: {
        "--front-toast-height": `${((ce = ne[0]) == null ? void 0 : ce.height) || 0}px`,
        "--width": `${z3}px`,
        "--gap": `${E}px`,
        ...R,
        ...V3(v, g)
      },
      onBlur: (P) => {
        j.current && !P.currentTarget.contains(P.relatedTarget) && (j.current = !1, te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null));
      },
      onFocus: (P) => {
        P.target instanceof HTMLElement && P.target.dataset.dismissible === "false" || j.current || (j.current = !0, te.current = P.relatedTarget);
      },
      onMouseEnter: () => oe(!0),
      onMouseMove: () => oe(!0),
      onMouseLeave: () => {
        z || oe(!1);
      },
      onDragEnd: () => oe(!1),
      onPointerDown: (P) => {
        P.target instanceof HTMLElement && P.target.dataset.dismissible === "false" || Y(!0);
      },
      onPointerUp: () => Y(!1)
    }, A.filter((P) => !P.position && ee === 0 || P.position === Q).map((P, me) => {
      var _e, Te;
      return /* @__PURE__ */ ve.createElement(U3, {
        key: P.id,
        icons: O,
        index: me,
        toast: P,
        defaultRichColors: x,
        duration: (_e = C?.duration) != null ? _e : _,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: s,
        visibleToasts: N,
        closeButton: (Te = C?.closeButton) != null ? Te : p,
        interacting: z,
        position: Q,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
        removeToast: U,
        toasts: A.filter((Se) => Se.position == P.position),
        heights: ne.filter((Se) => Se.position == P.position),
        setHeights: $,
        expandByDefault: d,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Kh = "svi2-pro:trigger-render", Jh = "svi2-pro:render-state";
function $3() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Kh));
}
function I3(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Jh, { detail: e }));
}
function Y3(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Kh, e), () => window.removeEventListener(Kh, e));
}
function G3(e) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && e(l);
  };
  return window.addEventListener(Jh, a), () => window.removeEventListener(Jh, a);
}
const X3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), F3 = 832 * 480, Z3 = 0.85;
function Zm(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && X3.has(e);
}
function Uc(e, a) {
  return Zm(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function $b(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function P3(e, a) {
  const r = [];
  (e.mode ?? "image_to_video") !== "text_to_video" && (!a.hasRefImage || !e.ref_image_path) && r.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (e.prompts ?? []).some((b) => b.trim().length > 0) || r.push({
    field: "prompts",
    message: "At least one prompt is required.",
    severity: "error"
  });
  const c = e.frames_per_clip ?? 81;
  (c - 1) % 4 !== 0 && r.push({
    field: "frames_per_clip",
    message: `Frames per clip must be 4n+1 (got ${c}). Try ${c - (c - 1) % 4}.`,
    severity: "error"
  });
  const d = e.width ?? 480, p = e.height ?? 832;
  $b(d, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), $b(p, 16) || r.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${p}).`,
    severity: "error"
  });
  const h = e.num_inference_steps ?? 50;
  (h < 1 || h > 100) && r.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const v = e.cfg_scale ?? 5;
  (v < 1 || v > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const g = e.num_clips;
  return g !== void 0 && g < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), Zm(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Uc(a.presetId, e) && g !== void 0 && g > 1 && r.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < F3 * Z3 && r.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function Q3(e) {
  return e.some((a) => a.severity === "error");
}
function Kw() {
  const {
    params: e,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Qt(), d = S.useMemo(
    () => P3(e, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, r, l]
  ), p = Q3(d), h = s.phase === "running", [v, g] = S.useState(null), b = S.useCallback(async () => {
    if (p) {
      const _ = d.find((R) => R.severity === "error");
      _ && g({ field: _.field, token: Date.now() }), Nr.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), Nr.success("Render started.");
    } catch (_) {
      const R = _ instanceof Ec ? _.message : "Could not start the render.";
      Nr.error(R);
    }
  }, [p, d, u]), x = S.useCallback(async () => {
    try {
      await c();
    } catch {
      Nr.error("Could not cancel the render.");
    }
  }, [c]);
  return S.useEffect(() => Y3(() => void b()), [b]), S.useEffect(() => {
    I3({ busy: h, blocked: p });
  }, [h, p]), { issues: d, blocked: p, busy: h, submit: b, cancel: x, focusRequest: v };
}
const K3 = 220, J3 = 80;
function W3(e) {
  switch (e) {
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
function ej(e, a) {
  const r = a.params;
  switch (e) {
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
function tj(e) {
  const a = Im.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: W3(s),
      subtitle: ej(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * K3, y: J3 },
      data: c
    };
  }), l = [];
  for (let s = 1; s < a.length; s += 1) {
    const u = a[s - 1], c = a[s];
    !u || !c || l.push({
      id: `${u}->${c}`,
      source: u,
      target: c,
      animated: e.render.stageStates[c] === "active"
    });
  }
  return { nodes: r, edges: l };
}
var nj = "dk8hba0", aj = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, ij = "dk8hba5", rj = "dk8hba6", lj = "dk8hba7", oj = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, sj = "dk8hbac";
function uj({ data: e }) {
  const a = e, r = [nj, aj[a.state]].join(" "), l = [sj, oj[a.state]].join(" ");
  return /* @__PURE__ */ y.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ y.jsx(zl, { type: "target", position: je.Left }),
    /* @__PURE__ */ y.jsxs("div", { className: ij, children: [
      /* @__PURE__ */ y.jsx("span", { className: rj, children: a.title }),
      /* @__PURE__ */ y.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ y.jsx("span", { className: lj, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ y.jsx(zl, { type: "source", position: je.Right })
  ] });
}
const cj = { pipeline: uj };
var fj = "_1g4g8kk0", dj = "_1g4g8kk1", hj = "_1g4g8kk2", mj = "_1g4g8kk3", pj = "_1g4g8kk4", gj = "_1g4g8kk5";
const vj = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, yj = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function bj() {
  const { render: e, params: a, qwenEdit: r } = Qt(), { busy: l, blocked: s, submit: u, cancel: c } = Kw(), d = S.useMemo(
    () => tj({ render: e, params: a, qwenEditEnabled: r.enabled }),
    [e, a, r.enabled]
  ), p = Im.filter(
    (h) => h !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ y.jsxs("div", { className: fj, children: [
    /* @__PURE__ */ y.jsx("div", { className: dj, children: /* @__PURE__ */ y.jsx(
      S5,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: cj,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ y.jsx("div", { className: hj, children: /* @__PURE__ */ y.jsxs(
      ka,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ y.jsx("div", { className: mj, children: p.map((h) => /* @__PURE__ */ y.jsxs("div", { className: pj, children: [
            /* @__PURE__ */ y.jsx("span", { children: yj[h] }),
            /* @__PURE__ */ y.jsx(On, { tone: vj[e.stageStates[h]], children: e.stageStates[h] })
          ] }, h)) }),
          /* @__PURE__ */ y.jsx("div", { className: gj, children: l ? /* @__PURE__ */ y.jsx(Ua, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ y.jsx(Ua, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var Ib = cw();
const Jw = 0, Ww = 1, e_ = 2, Yb = 3;
var Gb = Object.prototype.hasOwnProperty;
function Wh(e, a) {
  var r, l;
  if (e === a) return !0;
  if (e && a && (r = e.constructor) === a.constructor) {
    if (r === Date) return e.getTime() === a.getTime();
    if (r === RegExp) return e.toString() === a.toString();
    if (r === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && Wh(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof e == "object") {
      l = 0;
      for (r in e)
        if (Gb.call(e, r) && ++l && !Gb.call(a, r) || !(r in a) || !Wh(e[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const fi = /* @__PURE__ */ new WeakMap(), hi = () => {
}, mn = (
  /*#__NOINLINE__*/
  hi()
), em = Object, nt = (e) => e === mn, Ba = (e) => typeof e == "function", Wi = (e, a) => ({
  ...e,
  ...a
}), t_ = (e) => Ba(e.then), bh = {}, Bu = {}, Pm = "undefined", ds = typeof window != Pm, tm = typeof document != Pm, xj = ds && "Deno" in window, wj = () => ds && typeof window.requestAnimationFrame != Pm, n_ = (e, a) => {
  const r = fi.get(e);
  return [
    // Getter
    () => !nt(a) && e.get(a) || bh,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = e.get(a);
        a in Bu || (Bu[a] = s), r[5](a, Wi(s, l), s || bh);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in Bu ? Bu[a] : !nt(a) && e.get(a) || bh
  ];
};
let nm = !0;
const _j = () => nm, [am, im] = ds && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  hi,
  hi
], Sj = () => {
  const e = tm && document.visibilityState;
  return nt(e) || e !== "hidden";
}, Ej = (e) => (tm && document.addEventListener("visibilitychange", e), am("focus", e), () => {
  tm && document.removeEventListener("visibilitychange", e), im("focus", e);
}), Nj = (e) => {
  const a = () => {
    nm = !0, e();
  }, r = () => {
    nm = !1;
  };
  return am("online", a), am("offline", r), () => {
    im("online", a), im("offline", r);
  };
}, Cj = {
  isOnline: _j,
  isVisible: Sj
}, Rj = {
  initFocus: Ej,
  initReconnect: Nj
}, Xb = !ve.useId, Cl = !ds || xj, Tj = (e) => wj() ? window.requestAnimationFrame(e) : setTimeout(e, 1), xh = Cl ? S.useEffect : S.useLayoutEffect, wh = typeof navigator < "u" && navigator.connection, Fb = !Cl && wh && ([
  "slow-2g",
  "2g"
].includes(wh.effectiveType) || wh.saveData), Uu = /* @__PURE__ */ new WeakMap(), Mj = (e) => em.prototype.toString.call(e), _h = (e, a) => e === `[object ${a}]`;
let Aj = 0;
const rm = (e) => {
  const a = typeof e, r = Mj(e), l = _h(r, "Date"), s = _h(r, "RegExp"), u = _h(r, "Object");
  let c, d;
  if (em(e) === e && !l && !s) {
    if (c = Uu.get(e), c) return c;
    if (c = ++Aj + "~", Uu.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += rm(e[d]) + ",";
      Uu.set(e, c);
    }
    if (u) {
      c = "#";
      const p = em.keys(e).sort();
      for (; !nt(d = p.pop()); )
        nt(e[d]) || (c += d + ":" + rm(e[d]) + ",");
      Uu.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, Qm = (e) => {
  if (Ba(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? rm(e) : "", [
    e,
    a
  ];
};
let Dj = 0;
const lm = () => ++Dj;
async function a_(...e) {
  const [a, r, l, s] = e, u = Wi({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const d = u.rollbackOnError;
  let p = u.optimisticData;
  const h = (b) => typeof d == "function" ? d(b) : d !== !1, v = u.throwOnError;
  if (Ba(r)) {
    const b = r, x = [], _ = a.keys();
    for (const R of _)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(R) && b(a.get(R)._k) && x.push(R);
    return Promise.all(x.map(g));
  }
  return g(r);
  async function g(b) {
    const [x] = Qm(b);
    if (!x) return;
    const [_, R] = n_(a, x), [N, C, D, E] = fi.get(a), O = () => {
      const z = N[x];
      return (Ba(u.revalidate) ? u.revalidate(_().data, b) : u.revalidate !== !1) && (delete D[x], delete E[x], z && z[0]) ? z[0](e_).then(() => _().data) : _().data;
    };
    if (e.length < 3)
      return O();
    let k = l, H, V = !1;
    const A = lm();
    C[x] = [
      A,
      0
    ];
    const I = !nt(p), ne = _(), $ = ne.data, K = ne._c, oe = nt(K) ? $ : K;
    if (I && (p = Ba(p) ? p(oe, $) : p, R({
      data: p,
      _c: oe
    })), Ba(k))
      try {
        k = k(oe);
      } catch (z) {
        H = z, V = !0;
      }
    if (k && t_(k))
      if (k = await k.catch((z) => {
        H = z, V = !0;
      }), A !== C[x][0]) {
        if (V) throw H;
        return k;
      } else V && I && h(H) && (c = !0, R({
        data: oe,
        _c: mn
      }));
    if (c && !V)
      if (Ba(c)) {
        const z = c(k, oe);
        R({
          data: z,
          error: mn,
          _c: mn
        });
      } else
        R({
          data: k,
          error: mn,
          _c: mn
        });
    if (C[x][1] = lm(), Promise.resolve(O()).then(() => {
      R({
        _c: mn
      });
    }), V) {
      if (v) throw H;
      return;
    }
    return k;
  }
}
const Zb = (e, a) => {
  for (const r in e)
    e[r][0] && e[r][0](a);
}, jj = (e, a) => {
  if (!fi.has(e)) {
    const r = Wi(Rj, a), l = /* @__PURE__ */ Object.create(null), s = a_.bind(mn, e);
    let u = hi;
    const c = /* @__PURE__ */ Object.create(null), d = (v, g) => {
      const b = c[v] || [];
      return c[v] = b, b.push(g), () => b.splice(b.indexOf(g), 1);
    }, p = (v, g, b) => {
      e.set(v, g);
      const x = c[v];
      if (x)
        for (const _ of x)
          _(g, b);
    }, h = () => {
      if (!fi.has(e) && (fi.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !Cl)) {
        const v = r.initFocus(setTimeout.bind(mn, Zb.bind(mn, l, Jw))), g = r.initReconnect(setTimeout.bind(mn, Zb.bind(mn, l, Ww)));
        u = () => {
          v && v(), g && g(), fi.delete(e);
        };
      }
    };
    return h(), [
      e,
      s,
      h,
      u
    ];
  }
  return [
    e,
    fi.get(e)[4]
  ];
}, Oj = (e, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, d, s);
}, zj = Wh, [i_, Lj] = jj(/* @__PURE__ */ new Map()), kj = Wi(
  {
    // events
    onLoadingSlow: hi,
    onSuccess: hi,
    onError: hi,
    onErrorRetry: Oj,
    onDiscarded: hi,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Fb ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Fb ? 5e3 : 3e3,
    // providers
    compare: zj,
    isPaused: () => !1,
    cache: i_,
    mutate: Lj,
    fallback: {}
  },
  // use web preset by default
  Cj
), Hj = (e, a) => {
  const r = Wi(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Wi(s, c));
  }
  return r;
}, Bj = S.createContext({}), Uj = "$inf$", r_ = ds && window.__SWR_DEVTOOLS_USE__, Vj = r_ ? window.__SWR_DEVTOOLS_USE__ : [], qj = () => {
  r_ && (window.__SWR_DEVTOOLS_REACT__ = ve);
}, $j = (e) => Ba(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], Ij = () => {
  const e = S.useContext(Bj);
  return S.useMemo(() => Wi(kj, e), [
    e
  ]);
}, Yj = (e) => (a, r, l) => e(a, r && ((...u) => {
  const [c] = Qm(a), [, , , d] = fi.get(i_);
  if (c.startsWith(Uj))
    return r(...u);
  const p = d[c];
  return nt(p) ? r(...u) : (delete d[c], p);
}), l), Gj = Vj.concat(Yj), Xj = (e) => function(...r) {
  const l = Ij(), [s, u, c] = $j(r), d = Hj(l, c);
  let p = e;
  const { use: h } = d, v = (h || []).concat(Gj);
  for (let g = v.length; g--; )
    p = v[g](p);
  return p(s, u || d.fetcher || null, d);
}, Fj = (e, a, r) => {
  const l = a[e] || (a[e] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
qj();
const Sh = ve.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((e) => {
  switch (e.status) {
    case "pending":
      throw e;
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      throw e.status = "pending", e.then((a) => {
        e.status = "fulfilled", e.value = a;
      }, (a) => {
        e.status = "rejected", e.reason = a;
      }), e;
  }
}), Eh = {
  dedupe: !0
}, Pb = Promise.resolve(mn), Zj = () => hi, Pj = (e, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: h, refreshWhenHidden: v, refreshWhenOffline: g, keepPreviousData: b, strictServerPrefetchWarning: x } = r, [_, R, N, C] = fi.get(l), [D, E] = Qm(e), O = S.useRef(!1), k = S.useRef(!1), H = S.useRef(D), V = S.useRef(a), A = S.useRef(r), I = () => A.current, ne = () => I().isVisible() && I().isOnline(), [$, K, oe, z] = n_(l, D), Y = S.useRef({}).current, T = nt(c) ? nt(r.fallback) ? mn : r.fallback[D] : c, L = (Me, Xe) => {
    for (const He in Y) {
      const Ie = He;
      if (Ie === "data") {
        if (!s(Me[Ie], Xe[Ie]) && (!nt(Me[Ie]) || !s(ae, Xe[Ie])))
          return !1;
      } else if (Xe[Ie] !== Me[Ie])
        return !1;
    }
    return !0;
  }, F = !O.current, G = S.useMemo(() => {
    const Me = $(), Xe = z(), He = (Ze) => {
      const Pe = Wi(Ze);
      return delete Pe._k, (() => {
        if (!D || !a || I().isPaused()) return !1;
        if (F && !nt(d)) return d;
        const vt = nt(T) ? Pe.data : T;
        return nt(vt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Pe
      } : Pe;
    }, Ie = He(Me), _t = Me === Xe ? Ie : He(Xe);
    let Je = Ie;
    return [
      () => {
        const Ze = He($());
        return L(Ze, Je) ? (Je.data = Ze.data, Je.isLoading = Ze.isLoading, Je.isValidating = Ze.isValidating, Je.error = Ze.error, Je) : (Je = Ze, Ze);
      },
      () => _t
    ];
  }, [
    l,
    D
  ]), te = Ib.useSyncExternalStore(S.useCallback(
    (Me) => oe(D, (Xe, He) => {
      L(He, Xe) || Me();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      D
    ]
  ), G[0], G[1]), j = _[D] && _[D].length > 0, U = te.data, Q = nt(U) ? T && t_(T) ? Sh(T) : T : U, ee = te.error, ce = S.useRef(Q), ae = b ? nt(U) ? nt(ce.current) ? Q : ce.current : U : Q, se = D && nt(Q), P = S.useRef(null);
  !Cl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Ib.useSyncExternalStore(Zj, () => (P.current = !1, P), () => (P.current = !0, P));
  const me = P.current;
  x && me && !u && se && console.warn(`Missing pre-initiated data for serialized key "${D}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const _e = !D || !a || I().isPaused() || j && !nt(ee) ? !1 : F && !nt(d) ? d : u ? nt(Q) ? !1 : p : nt(Q) || p, Te = F && _e, Se = nt(te.isValidating) ? Te : te.isValidating, xe = nt(te.isLoading) ? Te : te.isLoading, Re = S.useCallback(
    async (Me) => {
      const Xe = V.current;
      if (!D || !Xe || k.current || I().isPaused())
        return !1;
      let He, Ie, _t = !0;
      const Je = Me || {}, Ze = !N[D] || !Je.dedupe, Pe = () => Xb ? !k.current && D === H.current && O.current : D === H.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, vt = () => {
        K(gt);
      }, Yt = () => {
        const mt = N[D];
        mt && mt[1] === Ie && delete N[D];
      }, Lt = {
        isValidating: !0
      };
      nt($().data) && (Lt.isLoading = !0);
      try {
        if (Ze && (K(Lt), r.loadingTimeout && nt($().data) && setTimeout(() => {
          _t && Pe() && I().onLoadingSlow(D, r);
        }, r.loadingTimeout), N[D] = [
          Xe(E),
          lm()
        ]), [He, Ie] = N[D], He = await He, Ze && setTimeout(Yt, r.dedupingInterval), !N[D] || N[D][1] !== Ie)
          return Ze && Pe() && I().onDiscarded(D), !1;
        gt.error = mn;
        const mt = R[D];
        if (!nt(mt) && // case 1
        (Ie <= mt[0] || // case 2
        Ie <= mt[1] || // case 3
        mt[1] === 0))
          return vt(), Ze && Pe() && I().onDiscarded(D), !1;
        const ot = $().data;
        gt.data = s(ot, He) ? ot : He, Ze && Pe() && I().onSuccess(He, D, r);
      } catch (mt) {
        Yt();
        const ot = I(), { shouldRetryOnError: Pn } = ot;
        ot.isPaused() || (gt.error = mt, Ze && Pe() && (ot.onError(mt, D, ot), (Pn === !0 || Ba(Pn) && Pn(mt)) && (!I().revalidateOnFocus || !I().revalidateOnReconnect || ne()) && ot.onErrorRetry(mt, D, ot, (_n) => {
          const nn = _[D];
          nn && nn[0] && nn[0](Yb, _n);
        }, {
          retryCount: (Je.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return _t = !1, vt(), !0;
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
      D,
      l
    ]
  ), $e = S.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Me) => a_(l, H.current, ...Me),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (xh(() => {
    V.current = a, A.current = r, nt(U) || (ce.current = U);
  }), xh(() => {
    if (!D) return;
    const Me = Re.bind(mn, Eh);
    let Xe = 0;
    I().revalidateOnFocus && (Xe = Date.now() + I().focusThrottleInterval);
    const Ie = Fj(D, _, (_t, Je = {}) => {
      if (_t == Jw) {
        const Ze = Date.now();
        I().revalidateOnFocus && Ze > Xe && ne() && (Xe = Ze + I().focusThrottleInterval, Me());
      } else if (_t == Ww)
        I().revalidateOnReconnect && ne() && Me();
      else {
        if (_t == e_)
          return Re();
        if (_t == Yb)
          return Re(Je);
      }
    });
    return k.current = !1, H.current = D, O.current = !0, K({
      _k: E
    }), _e && (N[D] || (nt(Q) || Cl ? Me() : Tj(Me))), () => {
      k.current = !0, Ie();
    };
  }, [
    D
  ]), xh(() => {
    let Me;
    function Xe() {
      const Ie = Ba(h) ? h($().data) : h;
      Ie && Me !== -1 && (Me = setTimeout(He, Ie));
    }
    function He() {
      !$().error && (v || I().isVisible()) && (g || I().isOnline()) ? Re(Eh).then(Xe) : Xe();
    }
    return Xe(), () => {
      Me && (clearTimeout(Me), Me = -1);
    };
  }, [
    h,
    v,
    g,
    D
  ]), S.useDebugValue(ae), u) {
    if (!Xb && Cl && se)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    se && (V.current = a, A.current = r, k.current = !1);
    const Me = C[D], Xe = !nt(Me) && se ? $e(Me) : Pb;
    if (Sh(Xe), !nt(ee) && se)
      throw ee;
    const He = se ? Re(Eh) : Pb;
    !nt(ae) && se && (He.status = "fulfilled", He.value = !0), Sh(He);
  }
  return {
    mutate: $e,
    get data() {
      return Y.data = !0, ae;
    },
    get error() {
      return Y.error = !0, ee;
    },
    get isValidating() {
      return Y.isValidating = !0, Se;
    },
    get isLoading() {
      return Y.isLoading = !0, xe;
    }
  };
}, ts = Xj(Pj);
var Qj = "_1xasopc0", Kj = "_1xasopc1", Jj = "_1xasopc2", Wj = "_1xasopc3", eO = "_1xasopc4", tO = "_1xasopc5", nO = "_1xasopc6", aO = "_1xasopc7", iO = "_1xasopc8";
function rO(e, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function lO(e, a, r) {
  for (const l of e) {
    if (a && !rO(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function Qb({
  accept: e,
  maxSizeBytes: a,
  multiple: r = !1,
  disabled: l = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: d,
  renderPreview: p,
  onFiles: h
}) {
  const v = S.useRef(null), g = S.useId(), b = S.useId(), [x, _] = S.useState(!1), [R, N] = S.useState(null), [C, D] = S.useState([]), E = S.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), oe = r ? K : K.slice(0, 1), z = lO(oe, e, a);
      if (z) {
        N(z);
        return;
      }
      N(null), D(oe), h(oe);
    },
    [e, a, r, h]
  ), O = S.useCallback(() => {
    l || v.current?.click();
  }, [l]), k = S.useCallback(
    ($) => {
      l || ($.key === "Enter" || $.key === " ") && ($.preventDefault(), O());
    },
    [l, O]
  ), H = S.useCallback(
    ($) => {
      $.preventDefault(), _(!1), !l && E($.dataTransfer.files);
    },
    [l, E]
  ), V = S.useCallback(
    ($) => {
      $.preventDefault(), l || _(!0);
    },
    [l]
  ), A = S.useCallback(($) => {
    $.preventDefault(), _(!1);
  }, []), I = [u ? b : null, R ? g : null].filter(Boolean).join(" "), ne = [
    Qj,
    x ? Kj : "",
    l ? Jj : "",
    R !== null ? Wj : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("div", { children: [
    /* @__PURE__ */ y.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": l,
        "aria-describedby": I || void 0,
        className: ne,
        onClick: O,
        onKeyDown: k,
        onDrop: H,
        onDragOver: V,
        onDragLeave: A,
        children: [
          /* @__PURE__ */ y.jsx(
            "input",
            {
              ref: v,
              type: "file",
              className: eO,
              accept: e,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => E($.target.files)
            }
          ),
          /* @__PURE__ */ y.jsx("span", { className: tO, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ y.jsx("span", { id: b, className: nO, children: u }),
          p && C.length > 0 && /* @__PURE__ */ y.jsx("div", { className: iO, children: p(C) })
        ]
      }
    ),
    R && /* @__PURE__ */ y.jsx("div", { id: g, role: "alert", className: aO, children: R })
  ] });
}
function Kb(e) {
  const [a, r] = S.useState(null);
  return S.useEffect(() => {
    if (!e) {
      r(null);
      return;
    }
    const l = URL.createObjectURL(e);
    return r(l), () => URL.revokeObjectURL(l);
  }, [e]), a;
}
async function oO(e) {
  const a = new FormData();
  a.append("file", e);
  const r = await fetch(`${Nc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new Ec(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function Jb(e) {
  const [a, r] = S.useState(null), [l, s] = S.useState(!1), [u, c] = S.useState(null), d = S.useCallback(
    async (p) => {
      if (r(p), c(null), !p) {
        e(null, null);
        return;
      }
      s(!0);
      try {
        const { path: h } = await oO(p);
        e(p.name, h);
      } catch (h) {
        const v = h instanceof Ec ? h.message : "Upload failed. Try again.";
        c(v), e(null, null), Nr.error(v);
      } finally {
        s(!1);
      }
    },
    [e]
  );
  return { file: a, uploading: l, uploadError: u, pick: d };
}
var sO = "cyswg40", Wb = "cyswg41", ex = "cyswg42", tx = "cyswg43", nx = "cyswg44", ax = "cyswg45", Vu = "cyswg46";
const ix = 32 * 1024 * 1024;
function uO({
  refImageRequired: e,
  lastImageRequired: a,
  refError: r,
  lastError: l
}) {
  const { setRefImage: s, setLastImage: u } = Qt(), c = S.useCallback(
    (b, x) => s(b, x ?? ""),
    [s]
  ), d = S.useCallback(
    (b, x) => u(b, x),
    [u]
  ), p = Jb(c), h = Jb(d), v = Kb(p.file), g = Kb(h.file);
  return /* @__PURE__ */ y.jsxs("div", { className: sO, children: [
    /* @__PURE__ */ y.jsxs("div", { className: Wb, children: [
      /* @__PURE__ */ y.jsxs("span", { className: ex, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ y.jsx(On, { tone: "accent", children: "required" }) : /* @__PURE__ */ y.jsx(On, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ y.jsx(
        Qb,
        {
          accept: "image/*",
          maxSizeBytes: ix,
          ariaLabel: "reference image upload",
          label: p.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (b) => void p.pick(b[0] ?? null),
          renderPreview: () => v ? /* @__PURE__ */ y.jsx("img", { className: tx, src: v, alt: "reference preview" }) : null
        }
      ),
      p.uploading && /* @__PURE__ */ y.jsx("span", { className: ax, children: "Uploading…" }),
      !p.uploading && p.file && /* @__PURE__ */ y.jsx("span", { className: nx, children: p.file.name }),
      p.uploadError && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Vu, children: p.uploadError }),
      r && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Vu, children: r })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: Wb, children: [
      /* @__PURE__ */ y.jsxs("span", { className: ex, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ y.jsx(On, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ y.jsx(On, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ y.jsx(
        Qb,
        {
          accept: "image/*",
          maxSizeBytes: ix,
          ariaLabel: "last image upload",
          label: h.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (b) => void h.pick(b[0] ?? null),
          renderPreview: () => g ? /* @__PURE__ */ y.jsx("img", { className: tx, src: g, alt: "last preview" }) : null
        }
      ),
      h.uploading && /* @__PURE__ */ y.jsx("span", { className: ax, children: "Uploading…" }),
      !h.uploading && h.file && /* @__PURE__ */ y.jsx("span", { className: nx, children: h.file.name }),
      h.uploadError && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Vu, children: h.uploadError }),
      l && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Vu, children: l })
    ] })
  ] });
}
const cO = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function fO(e) {
  return e.replace(/^[a-z0-9_]+:/i, "");
}
function dO(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function hO(e) {
  return cO.has(e.format) && e.install_path !== null;
}
function mO(e) {
  return e.filter((a) => hO(a) && a.install_path).map((a) => ({
    value: a.install_path,
    label: `${dO(a.filename)}${a.family_id ? ` (${fO(a.family_id)})` : ""}`
  })).sort((a, r) => a.label.localeCompare(r.label));
}
const pO = "/api/v1/model-store/installed";
async function gO() {
  const e = await fetch(pO, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var vO = "_1hbttwg0", yO = "_1hbttwg1", bO = "_1hbttwg2", xO = "_1hbttwg3", l_ = "_1hbttwg4", wO = "_1hbttwg5", _O = "_1hbttwg7 _1hbttwg6", SO = "_1hbttwg8 _1hbttwg6", rx = "_1hbttwg9", EO = "_1hbttwga", Km = "_1hbttwgb", Jm = "_1hbttwgc", Wm = "_1hbttwgd", Ln = "_1czy96m0", wn = "_1czy96m1", Vc = "_1czy96m2", ep = "_1czy96m3", tp = "_1czy96m4", o_ = "_1czy96m5", s_ = "_1czy96m6", u_ = "_1czy96m7", c_ = "_1czy96m8", np = "_1czy96m9", NO = "_1czy96ma", CO = "_1czy96mb", RO = "_1czy96mc", TO = "_1czy96md", MO = "_1czy96me", AO = "_1czy96mf", DO = "_1czy96mg", jO = "_1czy96mh", OO = "_1czy96mi", zO = "_1czy96mk _1czy96mj", LO = "_1czy96ml _1czy96mj", Ki = "_1czy96mm", Ji = "_1czy96mn", hs = "_1czy96mo", pn = "_1czy96mp", kO = "_1czy96mq", f_ = "_1czy96mr";
const Nh = "__bundled__";
function d_() {
  return /* @__PURE__ */ y.jsx("span", { className: hs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "open" }),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M4 6l4 4 4-4",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) });
}
function Ch({
  id: e,
  label: a,
  value: r,
  options: l,
  includeBundled: s,
  onChange: u
}) {
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: e, children: a }),
    /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsxs(
        "select",
        {
          id: e,
          className: Ji,
          value: r ?? Nh,
          onChange: (c) => u(c.target.value === Nh ? void 0 : c.target.value),
          children: [
            s && /* @__PURE__ */ y.jsx("option", { value: Nh, children: "Bundled Wan2.2 (default)" }),
            l.map((c) => /* @__PURE__ */ y.jsx("option", { value: c.value, children: c.label }, c.value))
          ]
        }
      ),
      /* @__PURE__ */ y.jsx(d_, {})
    ] })
  ] });
}
function HO() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Qt(), s = ts("svi2/installed-models", gO), u = S.useMemo(
    () => mO(s.data?.installed ?? []),
    [s.data]
  ), c = e.dit_high_path ?? void 0, d = e.dit_low_path ?? void 0, p = typeof c == "string" && c.length > 0 && c === d, [h, v] = S.useState(p), g = s.error !== void 0, b = a.sviLoraTier ?? e.svi_lora_tier ?? "high", x = S.useCallback(
    (N, C) => {
      r("dit_high_path", N), r("dit_low_path", C);
      const D = { ...a, ditHighPath: N ?? "", ditLowPath: C ?? "" };
      l(D), lc(D).catch(() => {
      });
    },
    [a, r, l]
  ), _ = S.useCallback(
    (N) => {
      if (v(N), N) {
        const C = c ?? d ?? u[0]?.value;
        x(C, C);
      }
    },
    [c, d, u, x]
  ), R = S.useCallback(
    (N) => {
      const C = N;
      r("svi_lora_tier", C);
      const D = { ...a, sviLoraTier: C };
      l(D), lc(D).catch(() => {
      });
    },
    [a, r, l]
  );
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: Km, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": h,
          "aria-label": "Use one model file for both experts",
          className: Jm,
          onClick: () => _(!h),
          children: /* @__PURE__ */ y.jsx("span", { className: Wm, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Same file for both experts (single-file model)" })
    ] }),
    h ? /* @__PURE__ */ y.jsx(
      Ch,
      {
        id: "svi2-base-model",
        label: "Base model",
        value: c,
        options: u,
        includeBundled: !1,
        onChange: (N) => x(N, N)
      }
    ) : /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
      /* @__PURE__ */ y.jsx(
        Ch,
        {
          id: "svi2-model-high",
          label: "High-noise expert (runs first)",
          value: c,
          options: u,
          includeBundled: !0,
          onChange: (N) => x(N, d)
        }
      ),
      /* @__PURE__ */ y.jsx(
        Ch,
        {
          id: "svi2-model-low",
          label: "Low-noise expert (runs second)",
          value: d,
          options: u,
          includeBundled: !0,
          onChange: (N) => x(c, N)
        }
      )
    ] }),
    g && /* @__PURE__ */ y.jsx("span", { className: pn, children: "Model Foundry list unavailable — using the bundled base model." }),
    !g && u.length === 0 && /* @__PURE__ */ y.jsx("span", { className: pn, children: "No models installed via Model Foundry yet — using the bundled base model." }),
    p && /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-svi-lora-tier", children: "SVI LoRA" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-svi-lora-tier",
            className: Ji,
            value: b,
            onChange: (N) => R(N.target.value),
            children: eC.map((N) => /* @__PURE__ */ y.jsx("option", { value: N.value, children: N.label }, N.value))
          }
        ),
        /* @__PURE__ */ y.jsx(d_, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Which SVI2 LoRA wraps this single-file model. Off for community merges (e.g. SmoothMix)." })
    ] })
  ] });
}
const BO = "/api/v1/model-store/installed";
function UO(e) {
  return e.filter(
    (a) => (a.role === "lora" || a.format === "safetensors") && a.install_path !== null && a.install_path.length > 0
  ).map((a) => ({
    artifactId: a.artifact_id,
    familyId: a.family_id,
    filename: a.filename,
    installPath: a.install_path
  }));
}
async function VO() {
  const e = await fetch(BO, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json(), r = "installed" in a ? a : a.data ?? { installed: [] };
  return UO(r.installed);
}
const nc = 4, qO = 4;
function $O(e) {
  return e.weight_high ?? e.weight ?? 1;
}
function IO(e) {
  return e.weight_low ?? e.weight ?? 1;
}
function YO(e) {
  return e.length >= nc ? e : [...e, { path: "", weight_high: 1, weight_low: 1 }];
}
function GO(e, a) {
  return e.filter((r, l) => l !== a);
}
function XO(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, path: r } : l);
}
function FO(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, weight_high: r } : l);
}
function ZO(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, weight_low: r } : l);
}
const qu = "__none__";
function lx({
  tier: e,
  value: a,
  onChange: r
}) {
  const l = S.useId();
  return /* @__PURE__ */ y.jsxs("div", { className: f_, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: l, style: { width: "34px" }, children: e }),
    /* @__PURE__ */ y.jsx(
      "input",
      {
        id: l,
        type: "range",
        min: 0,
        max: qO,
        step: 0.05,
        value: a,
        onChange: (s) => r(parseFloat(s.target.value)),
        style: { flex: 1 }
      }
    ),
    /* @__PURE__ */ y.jsx("span", { className: np, children: a.toFixed(2) })
  ] });
}
function PO({
  rowIndex: e,
  row: a,
  options: r,
  onPath: l,
  onWeightHigh: s,
  onWeightLow: u,
  onRemove: c
}) {
  const d = S.useId(), p = a.path.length > 0 ? a.path : qu, h = (v) => {
    l(v === qu ? null : v);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
      /* @__PURE__ */ y.jsxs("label", { className: wn, htmlFor: d, style: { flex: 1 }, children: [
        "LoRA ",
        e + 1
      ] }),
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          "aria-label": `Remove LoRA ${e + 1}`,
          onClick: c,
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
            lineHeight: 1,
            color: "var(--color-text-muted, #888)"
          },
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsxs(
        "select",
        {
          id: d,
          className: Ji,
          value: p,
          onChange: (v) => h(v.target.value),
          children: [
            /* @__PURE__ */ y.jsx("option", { value: qu, children: "None" }),
            r.map((v) => /* @__PURE__ */ y.jsxs("option", { value: v.installPath, children: [
              v.filename,
              v.familyId ? ` (${v.familyId.replace(/^[^:]+:/, "")})` : ""
            ] }, v.artifactId))
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: hs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ y.jsx("title", { children: "open" }),
        /* @__PURE__ */ y.jsx(
          "path",
          {
            d: "M4 6l4 4 4-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }) })
    ] }),
    p !== qu && /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
      /* @__PURE__ */ y.jsx(lx, { tier: "High", value: $O(a), onChange: s }),
      /* @__PURE__ */ y.jsx(lx, { tier: "Low", value: IO(a), onChange: u }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Per-expert weight (0 = off for that expert). Distill LoRAs like lightx2v run High>Low, e.g. 3.0 / 1.5." })
    ] })
  ] });
}
function QO() {
  const { params: e, updateParam: a } = Qt(), r = ts("svi2/installed-loras", VO, {
    shouldRetryOnError: !1
  }), l = r.data ?? [], s = e.user_loras ?? [], u = (c) => a("user_loras", c);
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    r.error && /* @__PURE__ */ y.jsx("div", { className: kO, role: "alert", children: "Failed to load installed LoRAs" }),
    /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
      /* @__PURE__ */ y.jsx("span", { className: wn, children: "LoRAs (applied to both experts)" }),
      s.map((c, d) => /* @__PURE__ */ y.jsx(
        PO,
        {
          rowIndex: d,
          row: c,
          options: l,
          onPath: (p) => u(XO(s, d, p ?? "")),
          onWeightHigh: (p) => u(FO(s, d, p)),
          onWeightLow: (p) => u(ZO(s, d, p)),
          onRemove: () => u(GO(s, d))
        },
        d
      )),
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          onClick: () => u(YO(s)),
          disabled: s.length >= nc,
          className: pn,
          style: {
            background: "none",
            border: "none",
            cursor: s.length >= nc ? "not-allowed" : "pointer",
            padding: "4px 0",
            textAlign: "left",
            opacity: s.length >= nc ? 0.45 : 1
          },
          children: "+ Add LoRA"
        }
      )
    ] })
  ] });
}
const qc = "custom", KO = [
  {
    presetId: "svi-canonical",
    label: "Native",
    sub: "SVI 2.0 Pro 480p training budget",
    stepsDown: 0,
    offDistribution: !1
  },
  {
    presetId: "svi-canonical-704",
    label: "One step down",
    sub: "Mild downscale from native",
    stepsDown: 1,
    offDistribution: !0
  },
  {
    presetId: "svi-canonical-640",
    label: "Two steps down",
    sub: "Below 480p training budget",
    stepsDown: 2,
    offDistribution: !0
  }
];
function ap(e) {
  const a = new Map(e.map((l) => [l.id, l])), r = [];
  for (const l of KO) {
    const s = a.get(l.presetId), u = s?.params.width, c = s?.params.height;
    !u || !c || r.push({
      id: l.presetId,
      width: u,
      height: c,
      label: l.label,
      sub: l.sub,
      stepsDown: l.stepsDown,
      offDistribution: l.offDistribution
    });
  }
  return r;
}
function ip(e, a) {
  const r = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return r ? r.id : qc;
}
var JO = "_14qe5430", WO = "_14qe5431", ez = "_14qe5432", tz = "_14qe5433", nz = "_14qe5434", az = "_14qe5435", iz = "_14qe5436", rz = "_14qe5437", lz = "_14qe5438", oz = "_14qe543a _14qe5439", sz = "_14qe543b _14qe5439", uz = "_14qe543c _14qe5439";
const cz = {
  ok: WO,
  neutral: ez,
  warn: tz
}, fz = {
  ok: az,
  neutral: iz,
  warn: rz
}, dz = {
  ok: oz,
  neutral: sz,
  warn: uz
};
function hz(e, a) {
  return e === 0 ? {
    tone: "ok",
    text: "In distribution — identity-lock nominal at the native 480p budget.",
    tag: "in-distribution"
  } : e === 1 ? {
    tone: "neutral",
    text: "One step below native — minor identity drift possible, but well within bounds.",
    tag: "caution"
  } : e !== null && e >= 2 ? {
    tone: "warn",
    text: "Below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.",
    tag: "off-distribution"
  } : a ? { tone: "warn", text: a, tag: "custom" } : {
    tone: "neutral",
    text: "Custom resolution — outside the preset ladder. Identity-lock is untested here.",
    tag: "custom"
  };
}
function mz({ tone: e }) {
  return e === "ok" ? /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "in distribution" }),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M7 10l2.1 2.1L13.2 8",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) : e === "warn" ? /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "warning" }),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M10 2.6L18.6 17H1.4L10 2.6z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ y.jsx("path", { d: "M10 8v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "14.4", r: "0.9", fill: "currentColor" })
  ] }) : /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "info" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ y.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "6.2", r: "0.9", fill: "currentColor" })
  ] });
}
function pz({
  presets: e,
  warningText: a
}) {
  const { params: r } = Qt(), l = S.useMemo(() => ap(e), [e]);
  if (l.length === 0) return null;
  const s = ip(r, l), u = s === qc ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = hz(u, a);
  return /* @__PURE__ */ y.jsxs(
    "output",
    {
      className: [JO, cz[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ y.jsx("span", { className: [nz, fz[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ y.jsx(mz, { tone: c.tone }) }),
        /* @__PURE__ */ y.jsx("span", { className: lz, children: c.text }),
        /* @__PURE__ */ y.jsx("span", { className: dz[c.tone], children: c.tag })
      ]
    }
  );
}
var gz = "_5d10lv0";
const Oo = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], vz = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.", yz = /* @__PURE__ */ new Set(["ArrowRight", "ArrowDown"]), bz = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowUp"]);
function xz(e) {
  return [tp, e ? o_ : ""].filter(Boolean).join(" ");
}
function wz({ value: e, onChange: a }) {
  const r = S.useId(), l = (s) => {
    const u = yz.has(s.key), c = bz.has(s.key);
    if (!u && !c) return;
    s.preventDefault();
    const d = Oo.findIndex((v) => v.value === e), h = Oo[(d + (u ? 1 : -1) + Oo.length) % Oo.length];
    h && h.value !== e && a(h.value);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: r, children: "Mode" }),
    /* @__PURE__ */ y.jsx("div", { className: Vc, children: /* @__PURE__ */ y.jsx(
      "div",
      {
        className: ep,
        role: "radiogroup",
        "aria-labelledby": r,
        onKeyDown: l,
        children: Oo.map((s) => {
          const u = e === s.value;
          return /* @__PURE__ */ y.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": u,
              tabIndex: u ? 0 : -1,
              className: xz(u),
              onClick: () => a(s.value),
              children: s.label
            },
            s.value
          );
        })
      }
    ) }),
    e === "text_to_video" && /* @__PURE__ */ y.jsx("p", { className: gz, "aria-live": "polite", children: vz })
  ] });
}
var _z = "dck790", Sz = "dck791", Ez = "dck792";
function yc({ title: e, detail: a, action: r, className: l }) {
  const s = [_z, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("div", { className: s, children: [
    /* @__PURE__ */ y.jsx("span", { className: Sz, children: e }),
    a && /* @__PURE__ */ y.jsx("span", { className: Ez, children: a }),
    r
  ] });
}
var Nz = "_1880igs0", Cz = "_1880igs1", Rz = "_1880igs2", Tz = "_1880igs3", Mz = "_1880igs4", Az = "_1880igs5", Dz = "_1880igs6";
const jz = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function Oz({ jobs: e, onOpen: a }) {
  return e.length === 0 ? /* @__PURE__ */ y.jsx(
    yc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ y.jsx("div", { className: Nz, children: e.map((r) => /* @__PURE__ */ y.jsxs("button", { type: "button", className: Cz, onClick: () => a(r), children: [
    /* @__PURE__ */ y.jsxs("span", { className: Rz, children: [
      /* @__PURE__ */ y.jsx("span", { className: Tz, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ y.jsx("span", { className: Mz, children: zz(r) })
    ] }),
    /* @__PURE__ */ y.jsxs("span", { className: Az, children: [
      /* @__PURE__ */ y.jsx("time", { className: Dz, dateTime: r.createdAt, title: Lz(r.createdAt), children: kz(r.createdAt) }),
      /* @__PURE__ */ y.jsx(On, { tone: jz[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function zz(e) {
  const a = e.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function Lz(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function kz(e) {
  const a = new Date(e), r = a.getTime();
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
function Hz() {
  const { presetId: e, params: a } = Qt();
  return Uc(e, a) ? /* @__PURE__ */ y.jsx(Uz, {}) : /* @__PURE__ */ y.jsx(Bz, {});
}
function h_(e) {
  return [tp, e ? o_ : ""].filter(Boolean).join(" ");
}
function Bz() {
  const { params: e, updateParam: a } = Qt(), r = Or(e), l = K5(e.num_clips ?? 1, r), [s, u] = S.useState(
    () => Number(Ph(e.num_clips ?? 1, r).toFixed(1))
  ), c = (d) => {
    const p = X5(d, r);
    a("num_clips", p.numClips), a("frames_per_clip", p.framesPerClip);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ y.jsxs("div", { className: Vc, children: [
      /* @__PURE__ */ y.jsx("div", { className: ep, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: Fw.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: h_(p),
            onClick: () => {
              u(d), c(d);
            },
            children: [
              d,
              "s"
            ]
          },
          d
        );
      }) }),
      /* @__PURE__ */ y.jsxs("div", { className: s_, children: [
        /* @__PURE__ */ y.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: u_,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            },
            onBlur: () => {
              u(Number(Ph(e.num_clips ?? 1, Or(e)).toFixed(1)));
            }
          }
        ),
        /* @__PURE__ */ y.jsx("span", { className: c_, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("output", { className: np, "aria-live": "polite", children: J5(e) })
  ] });
}
function Uz() {
  const { params: e, updateParam: a } = Qt(), r = Or(e), l = P5(r.fps), [s, u] = S.useState(() => Number(Pw(e).toFixed(1))), c = Z5.filter((p) => p <= l), d = (p) => {
    const h = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", Bb(h, r.fps));
  };
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ y.jsxs("div", { className: Vc, children: [
      /* @__PURE__ */ y.jsx("div", { className: ep, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const h = Bb(p, r.fps) === r.framesPerClip;
        return /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": h,
            className: h_(h),
            onClick: () => {
              u(p), d(p);
            },
            children: [
              p,
              "s"
            ]
          },
          p
        );
      }) : /* @__PURE__ */ y.jsxs("span", { className: tp, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ y.jsxs("div", { className: s_, children: [
        /* @__PURE__ */ y.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: u_,
            min: 1,
            max: l,
            step: 0.5,
            value: s,
            onChange: (p) => {
              const h = Number(p.target.value);
              u(h), Number.isFinite(h) && h > 0 && d(h);
            }
          }
        ),
        /* @__PURE__ */ y.jsx("span", { className: c_, children: "sec" })
      ] }),
      /* @__PURE__ */ y.jsxs("span", { className: pn, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        r.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("output", { className: np, "aria-live": "polite", children: Q5(e) })
  ] });
}
var Vz = "_17owg2e0", qz = "_17owg2e1", $z = "_17owg2e2", $u = "_17owg2e3", Iu = "_17owg2e4", Iz = "_17owg2e5", Yz = "_17owg2e6", Gz = "_17owg2e7", Xz = "_17owg2e8";
function Rh() {
  return /* @__PURE__ */ y.jsx("span", { className: Iz, "aria-hidden": "true" });
}
function Fz({ presets: e }) {
  const { presetId: a, params: r } = Qt(), l = S.useMemo(() => ap(e), [e]), s = Or(r), u = Uc(a, r), c = u ? 1 : r.num_clips ?? 1, d = u ? s.framesPerClip : Zw(c, s), p = s.fps > 0 ? d / s.fps : 0, h = r.interpolate_fps ?? 0, v = h > 0 ? h : s.fps, g = h > 0 && s.fps > 0 ? Math.round(d * (h / s.fps)) : d, b = typeof r.upscale_factor == "number" ? r.upscale_factor : 0, x = b > 0 ? b : 1, _ = (r.width ?? 0) * x, R = (r.height ?? 0) * x, N = ip(r, l), C = N === qc || (l.find((E) => E.id === N)?.stepsDown ?? 0) >= 2, D = [Gz, C ? Xz : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("div", { className: Vz, children: [
    /* @__PURE__ */ y.jsx("span", { className: qz, children: "Output" }),
    /* @__PURE__ */ y.jsxs("div", { className: $z, children: [
      /* @__PURE__ */ y.jsxs("span", { children: [
        /* @__PURE__ */ y.jsx("span", { className: $u, children: g }),
        " ",
        /* @__PURE__ */ y.jsx("span", { className: Iu, children: "frames" })
      ] }),
      /* @__PURE__ */ y.jsx(Rh, {}),
      /* @__PURE__ */ y.jsxs("span", { className: $u, children: [
        _,
        "×",
        R
      ] }),
      /* @__PURE__ */ y.jsx(Rh, {}),
      /* @__PURE__ */ y.jsxs("span", { children: [
        /* @__PURE__ */ y.jsx("span", { className: $u, children: v }),
        " ",
        /* @__PURE__ */ y.jsx("span", { className: Iu, children: "fps" })
      ] }),
      /* @__PURE__ */ y.jsx(Rh, {}),
      /* @__PURE__ */ y.jsxs("span", { children: [
        /* @__PURE__ */ y.jsx("span", { className: Iu, children: "~" }),
        /* @__PURE__ */ y.jsx("span", { className: $u, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ y.jsx("span", { className: Iu, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsxs("span", { className: Yz, children: [
      /* @__PURE__ */ y.jsx("span", { className: D, "aria-hidden": "true" }),
      C ? "off-distribution" : "ready"
    ] })
  ] });
}
var Zz = "dgx4n20", Pz = "dgx4n21", Qz = "dgx4n22", Kz = "dgx4n23", Jz = "dgx4n24", Wz = "dgx4n25", eL = "dgx4n26", tL = "dgx4n27", nL = "dgx4n28", aL = "dgx4n29", iL = "dgx4n2a", rL = "dgx4n2b", ox = "dgx4n2c", lL = "dgx4n2d", oL = "dgx4n2e";
function sL(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function uL({
  presets: e,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = S.useState(!1), u = S.useMemo(() => r3(e), [e]), c = S.useMemo(() => {
    const b = u.legacy.filter((_) => _.id === a), x = l ? u.legacy : b;
    return [...u.featured, ...x];
  }, [u, l, a]), d = S.useRef([]), p = S.useCallback(
    (b) => {
      const x = c[b];
      x && (d.current[b]?.focus(), r(x));
    },
    [c, r]
  ), h = S.useCallback(
    (b, x) => {
      const _ = c.length - 1;
      switch (b.key) {
        case "ArrowRight":
        case "ArrowDown":
          b.preventDefault(), p(x === _ ? 0 : x + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          b.preventDefault(), p(x === 0 ? _ : x - 1);
          break;
        case "Home":
          b.preventDefault(), p(0);
          break;
        case "End":
          b.preventDefault(), p(_);
          break;
      }
    },
    [c, p]
  );
  if (e.length === 0)
    return /* @__PURE__ */ y.jsx(
      yc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const v = Math.max(
    0,
    c.findIndex((b) => b.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ y.jsxs("div", { className: iL, children: [
    /* @__PURE__ */ y.jsx("div", { className: Zz, role: "radiogroup", "aria-label": "Render presets", children: c.map((b, x) => {
      const _ = a3(b), R = b.id === a, N = b.id === es, C = [
        Pz,
        b.legacy ? "" : Qz,
        N ? Kz : "",
        R ? Jz : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ y.jsxs(
        "button",
        {
          ref: (D) => {
            d.current[x] = D;
          },
          type: "button",
          role: "radio",
          "aria-checked": R,
          tabIndex: x === v ? 0 : -1,
          title: b.description,
          className: C,
          onClick: () => r(b),
          onKeyDown: (D) => h(D, x),
          children: [
            /* @__PURE__ */ y.jsxs("div", { className: eL, children: [
              /* @__PURE__ */ y.jsx("span", { className: tL, children: b.label }),
              N && /* @__PURE__ */ y.jsx(On, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ y.jsx("span", { className: Wz, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
                /* @__PURE__ */ y.jsx("title", { children: "selected" }),
                /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
                /* @__PURE__ */ y.jsx(
                  "path",
                  {
                    d: "M6.5 10.2l2.3 2.3 4.7-4.8",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ y.jsx("span", { className: nL, children: sL(b.description) }),
            /* @__PURE__ */ y.jsxs("div", { className: aL, children: [
              /* @__PURE__ */ y.jsx(On, { tone: "neutral", children: _.resolution }),
              /* @__PURE__ */ y.jsx(On, { tone: "neutral", children: _.duration }),
              /* @__PURE__ */ y.jsx(On, { tone: _.isLowVram ? "success" : "neutral", children: _.vram }),
              _.isOffDistribution && /* @__PURE__ */ y.jsx(On, { tone: "warning", children: "off-distribution" }),
              _.requiresLastImage && /* @__PURE__ */ y.jsx(On, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        b.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ y.jsxs("div", { className: rL, children: [
      /* @__PURE__ */ y.jsx("span", { className: ox, "aria-hidden": "true" }),
      /* @__PURE__ */ y.jsxs(
        "button",
        {
          type: "button",
          className: lL,
          "aria-expanded": l,
          onClick: () => s((b) => !b),
          children: [
            /* @__PURE__ */ y.jsx("span", { className: oL, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: ox, "aria-hidden": "true" })
    ] })
  ] });
}
var cL = "_1ntn2zv0", fL = "_1ntn2zv1", dL = "_1ntn2zv2", hL = "_1ntn2zv3", mL = "_1ntn2zv4", pL = "_1ntn2zv5", sx = "_1ntn2zv6", gL = "_1ntn2zv7", vL = "_1ntn2zv8", yL = "_1ntn2zv9", bL = "_1ntn2zva";
function xL({ error: e, textareaId: a }) {
  const { params: r, setPrompts: l } = Qt(), [s, u] = S.useState(!1), c = r.prompts ?? [""], d = S.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), p = S.useMemo(
    () => c.slice(d).filter((b) => b.trim().length > 0).length,
    [c, d]
  ), h = (b) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = b, l(x);
  }, v = (b, x) => {
    const _ = Math.max(d, c.length, b + 1), R = Array.from({ length: _ }, (N, C) => c[C] ?? "");
    R[b] = x, l(R);
  }, g = (b) => {
    if (u(b), b) {
      const x = c[0] ?? "", _ = Math.max(d, c.length);
      l(Array.from({ length: _ }, (R, N) => c[N] ?? x));
    }
  };
  return /* @__PURE__ */ y.jsxs("div", { className: cL, children: [
    /* @__PURE__ */ y.jsx("div", { className: fL, children: /* @__PURE__ */ y.jsxs("span", { className: dL, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: hL,
          onClick: () => g(!s),
          children: /* @__PURE__ */ y.jsx("span", { className: mL, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (b, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ y.jsxs("div", { className: gL, children: [
        /* @__PURE__ */ y.jsxs("span", { className: vL, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ y.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: sx,
            "aria-label": `prompt for clip ${x + 1}`,
            "aria-invalid": x === 0 && e !== void 0 ? !0 : void 0,
            value: c[x] ?? "",
            onChange: (_) => v(x, _.target.value)
          }
        )
      ] }, `clip-${x}`)
    )) : /* @__PURE__ */ y.jsx(
      "textarea",
      {
        id: a,
        className: sx,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (b) => h(b.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ y.jsxs("output", { className: pL, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ y.jsx("p", { className: yL, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ y.jsx("span", { role: "alert", className: bL, children: e })
  ] });
}
var wL = "_1itrxk30", _L = "_1itrxk31", SL = "_1itrxk32", EL = "_1itrxk33", NL = "_1itrxk34", CL = "_1itrxk35", RL = "_1itrxk36", TL = "_1itrxk37";
function ML() {
  const { qwenEdit: e, setQwenEdit: a } = Qt();
  return /* @__PURE__ */ y.jsxs("div", { className: wL, children: [
    /* @__PURE__ */ y.jsxs("div", { className: _L, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: RL,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ y.jsx("span", { className: TL, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ y.jsxs("span", { className: SL, children: [
        /* @__PURE__ */ y.jsx("span", { className: EL, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ y.jsx("span", { className: NL, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ y.jsx(
      "textarea",
      {
        className: CL,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var AL = "ob7g5b0", DL = "ob7g5b1", jL = "ob7g5b3", OL = "ob7g5b4", zL = "ob7g5b5", LL = "ob7g5b6", kL = "ob7g5b7", HL = "ob7g5b8", BL = "ob7g5b9", UL = "ob7g5ba";
function VL({
  src: e,
  poster: a,
  fpsLabel: r,
  controls: l = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: d,
  className: p,
  emptyContent: h,
  onEnded: v,
  onReady: g,
  onError: b
}) {
  const [x, _] = S.useState("loading"), [R, N] = S.useState(null), C = S.useCallback(() => {
    _("ready"), g?.();
  }, [g]), D = S.useCallback(
    (O) => {
      const k = O.target, H = k.error?.message || `media error code ${k.error?.code ?? "?"}`;
      _("error"), N(H), b?.(new Error(H));
    },
    [b]
  ), E = [AL, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ y.jsx("div", { className: E, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ y.jsxs("div", { className: kL, children: [
    /* @__PURE__ */ y.jsx("div", { className: HL, children: "Could not play video" }),
    /* @__PURE__ */ y.jsx("div", { className: BL, children: R ?? "unknown error" }),
    /* @__PURE__ */ y.jsx("a", { className: UL, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ y.jsxs("div", { className: E, children: [
    x === "loading" && /* @__PURE__ */ y.jsx("div", { className: jL, "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("div", { className: OL }) }),
    r && /* @__PURE__ */ y.jsx("span", { className: zL, children: r }),
    /* @__PURE__ */ y.jsx(
      "video",
      {
        className: DL,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: C,
        onEnded: v,
        onError: D,
        children: /* @__PURE__ */ y.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ y.jsx("div", { className: E, "aria-label": d ?? "no video", children: /* @__PURE__ */ y.jsx("div", { className: LL, children: h ?? "No video to display yet." }) });
}
const ci = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, ux = {
  [ci.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [ci.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [ci.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [ci.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [ci.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [ci.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [ci.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [ci.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [ci.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function qL(e, a) {
  return e !== null && ux[e] ? ux[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function $L(e) {
  return e ? `${Nc}/media?path=${encodeURIComponent(e)}` : null;
}
var Yu = "_1ojc56g0", IL = "_1ojc56g1", YL = "_1ojc56g2", GL = "_1ojc56g3", XL = "_1ojc56g4", FL = "_1ojc56g5", ZL = "_1ojc56g6", PL = "_1ojc56g7", QL = "_1ojc56g8", Gu = "_1ojc56g9", KL = "_1ojc56ga", JL = "_1ojc56gb", WL = "_1ojc56gc", e6 = "_1ojc56gd", t6 = "_1ojc56ge", n6 = "_1ojc56gf", a6 = "_1ojc56gg", i6 = "_1ojc56gh", r6 = "_51y2ql0", l6 = "_51y2ql1", o6 = "_51y2ql2", s6 = "_51y2ql3", u6 = "_51y2ql4", Th = "_51y2ql5", c6 = "_51y2ql6", f6 = "_51y2ql7 _51y2ql6", d6 = "_51y2ql8 _51y2ql6", h6 = "_51y2ql9", m6 = "_51y2qla", p6 = "_51y2qlb", g6 = "_51y2qlc", v6 = "_51y2qld", y6 = "_51y2qle";
const bn = 60, la = 62, xn = 46, b6 = 180, $o = 75, ac = 45, x6 = [0, 0.25, 0.5, 0.75, 1];
function w6(e) {
  const a = Math.PI * (1 - e), r = Math.cos(a), l = Math.sin(a);
  return {
    x1: bn + r * (xn - 9),
    y1: la - l * (xn - 9),
    x2: bn + r * (xn - 14),
    y2: la - l * (xn - 14)
  };
}
function _6(e) {
  const a = $o - ac, r = ($o - e) / a;
  return Math.min(1, Math.max(0.02, r));
}
function S6(e) {
  return e >= 0.55 ? c6 : e >= 0.25 ? f6 : d6;
}
function E6({ secondsPerStep: e }) {
  const a = e !== null && e > 0, r = a ? _6(e) : 0, l = b6 * r, s = a ? e.toFixed(1) : "—", u = a ? 1 / e : null, c = u === null ? "—" : u >= 1 ? u.toFixed(2) : u.toFixed(3);
  return /* @__PURE__ */ y.jsxs(
    "div",
    {
      className: r6,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": ac,
      "aria-valuemax": $o,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ y.jsx("span", { className: l6, children: "Speed" }),
        /* @__PURE__ */ y.jsxs("svg", { className: o6, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ y.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ y.jsx(
            "path",
            {
              className: s6,
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          x6.map((d) => {
            const p = w6(d);
            return /* @__PURE__ */ y.jsx(
              "line",
              {
                className: u6,
                strokeWidth: 1.4,
                x1: p.x1,
                y1: p.y1,
                x2: p.x2,
                y2: p.y2
              },
              d
            );
          }),
          /* @__PURE__ */ y.jsx("text", { className: Th, x: bn - xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: $o }),
          /* @__PURE__ */ y.jsx("text", { className: Th, x: bn, y: 9, fontSize: 6, textAnchor: "middle", children: ($o + ac) / 2 }),
          /* @__PURE__ */ y.jsx("text", { className: Th, x: bn + xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: ac }),
          a && /* @__PURE__ */ y.jsx(
            "path",
            {
              className: S6(r),
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, r * 100)} 100`
            }
          ),
          /* @__PURE__ */ y.jsx(
            "g",
            {
              className: h6,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${bn}px ${la}px`
              },
              children: /* @__PURE__ */ y.jsx(
                "line",
                {
                  className: m6,
                  strokeWidth: 2.4,
                  x1: bn,
                  y1: la,
                  x2: bn - xn + 16,
                  y2: la
                }
              )
            }
          ),
          /* @__PURE__ */ y.jsx("circle", { className: p6, cx: bn, cy: la, r: 3.6 }),
          /* @__PURE__ */ y.jsx("text", { className: g6, x: bn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ y.jsx("text", { className: v6, x: bn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] }),
        /* @__PURE__ */ y.jsxs("span", { className: y6, children: [
          c,
          " it/s"
        ] })
      ]
    }
  );
}
function N6({ state: e, onCancel: a, onReset: r }) {
  const [l, s] = S.useState(!1);
  S.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = S.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ y.jsx(
      yc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const h = qL(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ y.jsxs("div", { className: Yu, children: [
      /* @__PURE__ */ y.jsxs("div", { className: n6, role: "alert", children: [
        /* @__PURE__ */ y.jsx("span", { className: a6, children: h.title }),
        /* @__PURE__ */ y.jsx("span", { className: i6, children: h.hint })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: Gu, children: /* @__PURE__ */ y.jsx(Ua, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ y.jsxs("div", { className: Yu, children: [
      /* @__PURE__ */ y.jsx(yc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ y.jsx("div", { className: Gu, children: /* @__PURE__ */ y.jsx(Ua, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ y.jsxs("output", { className: Yu, children: [
      /* @__PURE__ */ y.jsx(
        VL,
        {
          src: $L(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ y.jsx(D6, { state: e }),
      /* @__PURE__ */ y.jsx("div", { className: Gu, children: /* @__PURE__ */ y.jsx(Ua, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ y.jsxs("div", { className: Yu, children: [
    /* @__PURE__ */ y.jsx("output", { className: IL, "aria-live": "polite", children: T6(e) }),
    /* @__PURE__ */ y.jsx(
      "div",
      {
        className: PL,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ y.jsx(
          "div",
          {
            className: QL,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ y.jsx("output", { className: t6, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ y.jsxs("div", { className: YL, "aria-live": "polite", children: [
      /* @__PURE__ */ y.jsx(E6, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ y.jsxs("div", { className: GL, children: [
        /* @__PURE__ */ y.jsx(zo, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ y.jsx(
          zo,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ y.jsx(
          zo,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ y.jsx(zo, { label: "ETA", value: C6(V5(e)) }),
        /* @__PURE__ */ y.jsx(
          zo,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: Gu, children: /* @__PURE__ */ y.jsx(Ua, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function C6(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), r = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return r > 0 ? `${r}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const R6 = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading diffusion experts…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function T6(e) {
  if (!e.stage) return "Starting worker…";
  if (e.stage === "loading_experts" && e.stageDetail) return e.stageDetail;
  const a = R6[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function M6(e) {
  const a = e.base_model_high, r = e.base_model_low;
  if (typeof a != "string") return null;
  const l = e.base_model_override === !0, s = l ? "custom" : "bundled", u = cx(a);
  if (typeof r == "string" && r !== a)
    return `${u} + ${cx(r)} (${s})`;
  const c = e.svi_lora_tier, d = l && typeof c == "string" ? `, SVI ${c}` : "";
  return `${u} (${s}${d})`;
}
function A6(e) {
  const a = e.torch_compile;
  if (!a || typeof a != "object") return null;
  const r = a;
  if (r.requested !== !0) return null;
  if (r.blocked_by_block_swap === !0) return "skipped — block-swap on";
  if (typeof r.error == "string") return "failed → eager";
  if (r.engaged !== !0) return "not engaged";
  const l = typeof r.mode == "string" ? r.mode : "default", s = r.dynamo ?? {}, u = typeof s.unique_graphs == "number" ? s.unique_graphs : null, c = typeof s.calls_captured == "number" ? s.calls_captured : null, d = typeof s.graph_breaks == "number" ? s.graph_breaks : null;
  if (u !== null && c !== null) {
    const p = d ? `, ${d} breaks` : "";
    return `${l} — ${u} graphs / ${c} calls${p}`;
  }
  return `${l} — engaged`;
}
function cx(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function zo({ label: e, value: a }) {
  return /* @__PURE__ */ y.jsxs("div", { className: XL, children: [
    /* @__PURE__ */ y.jsx("span", { className: FL, children: e }),
    /* @__PURE__ */ y.jsx("span", { className: ZL, children: a })
  ] });
}
function D6({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const r = [], l = M6(a);
  l && r.push(["Base model", l]);
  const s = A6(a);
  return s && r.push(["torch.compile", s]), typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && r.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && r.push(["Output", e.outputPath]), r.length === 0 ? null : /* @__PURE__ */ y.jsx("div", { className: KL, children: r.map(([u, c]) => /* @__PURE__ */ y.jsxs("div", { className: JL, children: [
    /* @__PURE__ */ y.jsx("span", { className: WL, children: u }),
    /* @__PURE__ */ y.jsx("span", { className: e6, children: c })
  ] }, u)) });
}
function j6() {
  return /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "selected" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M6.5 10.2l2.3 2.3 4.7-4.8",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function O6({ presets: e }) {
  const { params: a, updateParam: r } = Qt(), l = S.useMemo(() => ap(e), [e]);
  if (l.length === 0) return null;
  const s = ip(a, l);
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ y.jsx("div", { className: NO, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: l.map((u) => {
      const c = s === u.id, d = [CO, c ? RO : ""].filter(Boolean).join(" "), p = [AO, c ? DO : ""].filter(Boolean).join(" ");
      return /* @__PURE__ */ y.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": c,
          className: d,
          onClick: () => {
            r("width", u.width), r("height", u.height);
          },
          children: [
            /* @__PURE__ */ y.jsxs("span", { className: TO, children: [
              /* @__PURE__ */ y.jsxs("span", { className: MO, children: [
                u.width,
                "×",
                u.height
              ] }),
              /* @__PURE__ */ y.jsx("span", { className: p, children: /* @__PURE__ */ y.jsx(j6, {}) })
            ] }),
            /* @__PURE__ */ y.jsx("span", { className: jO, children: u.label }),
            /* @__PURE__ */ y.jsx("span", { className: OO, children: u.sub }),
            u.stepsDown > 0 && /* @__PURE__ */ y.jsx(
              "span",
              {
                className: u.stepsDown >= 2 ? LO : zO,
                children: u.stepsDown >= 2 ? "off-distribution" : "below native"
              }
            )
          ]
        },
        u.id
      );
    }) }),
    s === qc && /* @__PURE__ */ y.jsx("div", { className: f_, children: /* @__PURE__ */ y.jsxs(On, { tone: "warning", children: [
      "custom ",
      a.width,
      "×",
      a.height
    ] }) })
  ] });
}
var z6 = "_1x63kpu0";
const L6 = "Random each render";
function k6(e) {
  const a = e.trim();
  if (a.length === 0) return;
  const r = Number(a);
  if (!(!Number.isFinite(r) || r < 0))
    return Math.trunc(r);
}
function H6() {
  const { params: e, updateParam: a } = Qt(), r = S.useId(), l = e.seed, s = (u) => {
    a("seed", k6(u.target.value));
  };
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: r, children: "Seed" }),
    /* @__PURE__ */ y.jsxs("div", { className: Vc, children: [
      /* @__PURE__ */ y.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          className: z6,
          "aria-labelledby": r,
          min: 0,
          step: 1,
          placeholder: L6,
          value: l ?? "",
          onChange: s
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize." })
    ] })
  ] });
}
function B6({
  spec: e,
  value: a,
  error: r,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = S.useId(), d = `${c}-help`, p = r ? `${c}-error` : d;
  return /* @__PURE__ */ y.jsxs("div", { className: vO, title: s ? u : void 0, children: [
    /* @__PURE__ */ y.jsxs("div", { className: yO, children: [
      /* @__PURE__ */ y.jsx("label", { className: bO, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ y.jsx("span", { className: xO, children: V6(a, e.step) })
    ] }),
    U6(e, a, l, c, p, r !== void 0, s),
    /* @__PURE__ */ y.jsx("span", { id: d, className: l_, children: s && u ? u : e.help }),
    r && /* @__PURE__ */ y.jsx("span", { id: `${c}-error`, role: "alert", className: wO, children: r })
  ] });
}
function U6(e, a, r, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ y.jsxs("div", { className: Km, children: [
        /* @__PURE__ */ y.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: Jm,
            onClick: () => r(!d),
            children: /* @__PURE__ */ y.jsx("span", { className: Wm, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ y.jsx("span", { className: l_, children: d ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ y.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [SO, u ? rx : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => r(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ y.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = fx(a, e), p = e.min ?? 0, h = e.max ?? 100, g = { "--svi2-slider-fill": `${h > p ? (d - p) / (h - p) * 100 : 0}%` };
      return /* @__PURE__ */ y.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: EO,
          style: g,
          min: e.min,
          max: e.max,
          step: e.step,
          value: d,
          onChange: (b) => r(Number(b.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ y.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [_O, u ? rx : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: fx(a, e),
          onChange: (d) => r(Number(d.target.value))
        }
      );
  }
}
function fx(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function V6(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var q6 = "_1f0q5gf0", $6 = "_1f0q5gf1", I6 = "_1f0q5gf2", Y6 = "_1f0q5gf3", G6 = "_1f0q5gf4", X6 = "_1f0q5gf5", F6 = "_1f0q5gf6", Z6 = "_1f0q5gf7", P6 = "_1f0q5gf8", Q6 = "_1f0q5gf9", K6 = "_1f0q5gfa", J6 = "_1f0q5gfb", W6 = "_1f0q5gfc";
function e8({
  title: e,
  description: a,
  badge: r,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = S.useId(), [h, v] = S.useState(u ? s : !1), g = [q6, c].filter(Boolean).join(" "), b = [I6, h ? Y6 : ""].filter(Boolean).join(" "), x = !u || !h;
  return /* @__PURE__ */ y.jsxs("section", { className: g, children: [
    /* @__PURE__ */ y.jsxs(
      "button",
      {
        type: "button",
        className: $6,
        "aria-expanded": x,
        "aria-controls": p,
        disabled: !u,
        onClick: () => u && v((_) => !_),
        children: [
          u && /* @__PURE__ */ y.jsx("span", { className: b, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ y.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ y.jsx(
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
          /* @__PURE__ */ y.jsxs("span", { className: G6, children: [
            /* @__PURE__ */ y.jsx("span", { className: X6, children: e }),
            a && /* @__PURE__ */ y.jsx("span", { className: F6, children: a })
          ] }),
          (l || r) && /* @__PURE__ */ y.jsxs("span", { className: Z6, children: [
            l && /* @__PURE__ */ y.jsx("span", { className: P6, children: l }),
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ y.jsx(
      "div",
      {
        id: p,
        className: [Q6, x ? K6 : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ y.jsx("div", { className: J6, children: /* @__PURE__ */ y.jsx("div", { className: W6, children: d }) })
      }
    )
  ] });
}
const t8 = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function dx(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function n8(e) {
  return Bc.find((a) => a.key === e)?.default;
}
function pl(e, a) {
  const r = e[a];
  if (typeof r == "number" && Number.isFinite(r)) return r;
  const l = n8(a);
  return typeof l == "number" ? l : 0;
}
function a8(e, a) {
  if (e === "core") {
    const r = pl(a, "fps"), l = pl(a, "interpolate_fps"), s = l > 0 ? l : r, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = t8[u] ?? u, d = pl(a, "upscale_factor"), p = `${r} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const r = pl(a, "num_inference_steps"), l = pl(a, "cfg_scale"), s = pl(a, "sigma_shift");
    return `${r} steps · CFG ${dx(l)} · shift ${dx(s)}`;
  }
  return null;
}
async function i8() {
  return er("/capabilities/attention");
}
const hx = Object.fromEntries(
  Sm.map((e) => [e.value, e.label])
);
function r8() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Qt(), s = ts("svi2/attention-capabilities", i8, {
    shouldRetryOnError: !1
  }), u = e.attention ?? a.attentionBackend ?? "flash2", c = S.useCallback(
    (b) => {
      r("attention", b);
      const x = { ...a, attentionBackend: b };
      l(x), lc(x).catch(() => {
      });
    },
    [a, r, l]
  ), d = s.data, p = d === void 0, h = s.error !== void 0, v = d?.backends.find((b) => b.id === u), g = v !== void 0 && !v.supported;
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-attention", children: "Attention mechanism" }),
    /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsxs(
        "select",
        {
          id: "svi2-attention",
          className: Ji,
          value: u,
          onChange: (b) => c(b.target.value),
          children: [
            /* @__PURE__ */ y.jsx("option", { value: "auto", children: hx.auto }),
            d ? d.backends.map((b) => /* @__PURE__ */ y.jsx(
              "option",
              {
                value: b.id,
                disabled: !b.supported,
                title: b.reason ?? void 0,
                children: hx[b.id] ?? b.id
              },
              b.id
            )) : Sm.filter((b) => b.value !== "auto").map((b) => /* @__PURE__ */ y.jsx("option", { value: b.value, children: b.label }, b.value))
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: hs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ y.jsx("title", { children: "open" }),
        /* @__PURE__ */ y.jsx(
          "path",
          {
            d: "M4 6l4 4 4-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }) })
    ] }),
    h && /* @__PURE__ */ y.jsx("span", { className: pn, children: "GPU capabilities unavailable — all options shown." }),
    g && /* @__PURE__ */ y.jsxs("span", { className: pn, children: [
      v.reason ?? "This backend is not supported on the current GPU",
      " — will fall back to flash2 at render time."
    ] }),
    !p && u === "sage3_fp4" && !g && /* @__PURE__ */ y.jsx("span", { className: pn, children: "FP4 — may show artifacts on some GPUs." })
  ] });
}
function l8() {
  const { params: e, updateParam: a } = Qt(), r = (e.blocks_to_swap ?? 0) > 0, l = !r && (e.use_torch_compile ?? !1), s = e.torch_compile_mode ?? "default";
  return /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-torch-compile", children: "torch.compile (experimental)" }),
    /* @__PURE__ */ y.jsxs("div", { className: Km, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          id: "svi2-torch-compile",
          role: "switch",
          "aria-checked": l,
          disabled: r,
          className: Jm,
          onClick: () => a("use_torch_compile", !l),
          children: /* @__PURE__ */ y.jsx("span", { className: Wm, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: l ? "On" : "Off" })
    ] }),
    l && /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsx(
        "select",
        {
          "aria-label": "torch.compile mode",
          className: Ji,
          value: s,
          onChange: (u) => a("torch_compile_mode", u.target.value),
          children: tC.map((u) => /* @__PURE__ */ y.jsx("option", { value: u.value, children: u.label }, u.value))
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: hs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ y.jsx("title", { children: "open" }),
        /* @__PURE__ */ y.jsx(
          "path",
          {
            d: "M4 6l4 4 4-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ y.jsx("span", { className: pn, children: r ? "Set Blocks to swap = 0 to enable — compile needs both experts VRAM-resident (no offload)." : "Compiles the DiT for faster steps; CUDA graphs via reduce-overhead. Falls back to eager if the backend is unavailable. Render report shows whether it engaged." })
  ] });
}
const rp = "off", o8 = [
  { value: "off", label: "Off (native resolution)" },
  { value: "auto", label: "Auto (best available)" },
  { value: "maxine", label: "Maxine VSR — RTX (Windows only)" },
  { value: "drct-l-hq", label: "DRCT-L HQ (best, slow)" },
  { value: "drct-l-real", label: "DRCT-L Real (degraded sources)" },
  { value: "hat-l", label: "HAT-L (transformer)" },
  { value: "swinir-l", label: "SwinIR-L (real-world)" },
  { value: "realesrgan", label: "Real-ESRGAN (fast)" }
], s8 = [
  { value: 2, label: "2×" },
  { value: 3, label: "3×" },
  { value: 4, label: "4×" }
], u8 = [
  { value: "LOW", label: "Low (fastest)" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "ULTRA", label: "Ultra (best)" },
  { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
  { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" }
], c8 = 2;
function f8(e) {
  return e === "maxine" || e === "auto";
}
function d8(e, a) {
  return !e || e <= 0 ? rp : a ?? "auto";
}
function h8(e, a) {
  return e === rp ? { upscale_factor: 0 } : { upscale_factor: a && a > 0 ? a : c8, upscale_model: e };
}
function Mh() {
  return /* @__PURE__ */ y.jsx("span", { className: hs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "open" }),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M4 6l4 4 4-4",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) });
}
function m8() {
  const { params: e, updateParam: a } = Qt(), r = d8(e.upscale_factor, e.upscale_model), l = r === rp, s = f8(r), u = S.useCallback(
    (c) => {
      const d = h8(c, e.upscale_factor);
      a("upscale_factor", d.upscale_factor), d.upscale_model !== void 0 && a("upscale_model", d.upscale_model);
    },
    [e.upscale_factor, a]
  );
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-upscale-engine", children: "Upscaler" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-upscale-engine",
            className: Ji,
            value: r,
            onChange: (c) => u(c.target.value),
            children: o8.map((c) => /* @__PURE__ */ y.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ y.jsx(Mh, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Super-resolution after stitch, before interpolation. Auto = Maxine (RTX/Windows) → DRCT-L → Real-ESRGAN. DRCT-L is the highest-quality transformer (runs on aarch64/GB10)." })
    ] }),
    !l && /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-upscale-scale", children: "Scale" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-upscale-scale",
            className: Ji,
            value: String(e.upscale_factor ?? 2),
            onChange: (c) => a("upscale_factor", Number(c.target.value)),
            children: s8.map((c) => /* @__PURE__ */ y.jsx("option", { value: String(c.value), children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ y.jsx(Mh, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Output multiplier applied to the rendered resolution." })
    ] }),
    !l && s && /* @__PURE__ */ y.jsxs("div", { className: Ln, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-upscale-quality", children: "Maxine quality" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-upscale-quality",
            className: Ji,
            value: String(e.upscale_quality ?? "HIGH"),
            onChange: (c) => a("upscale_quality", c.target.value),
            children: u8.map((c) => /* @__PURE__ */ y.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ y.jsx(Mh, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Maxine VSR preset (Maxine/Auto on Windows only; ignored by DRCT-L/Real-ESRGAN)." })
    ] })
  ] });
}
var p8 = "kn07ek0", g8 = "kn07ek1";
const v8 = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function y8({ issues: e }) {
  const { presetId: a, params: r, updateParam: l } = Qt(), s = Uc(a, r), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ y.jsx("div", { className: p8, children: Xw.map((c) => {
    const d = $5(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ y.jsx(
      e8,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: a8(c.id, r),
        badge: c.defaultCollapsed ? /* @__PURE__ */ y.jsx(On, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ y.jsxs("div", { className: g8, children: [
          c.id === "perf" && /* @__PURE__ */ y.jsx(r8, {}),
          c.id === "perf" && /* @__PURE__ */ y.jsx(l8, {}),
          d.map((p) => {
            const h = s ? v8[p.key] : void 0;
            return /* @__PURE__ */ y.jsx(
              B6,
              {
                spec: p,
                value: r[p.key],
                error: u(p.key),
                disabled: h !== void 0,
                disabledReason: h,
                onChange: (v) => l(p.key, v)
              },
              p.key
            );
          }),
          c.id === "core" && /* @__PURE__ */ y.jsx(m8, {})
        ] })
      },
      c.id
    );
  }) });
}
var b8 = "_1w9jfpf0", x8 = "_1w9jfpf1", w8 = "_1w9jfpf2", _8 = "_1w9jfpf3", S8 = "_1w9jfpf4", E8 = "_1w9jfpf5";
const om = "svi2-anchor-panel", m_ = "svi2-prompt-input";
function N8() {
  const {
    presetId: e,
    presetApplied: a,
    params: r,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d
  } = Qt(), { issues: p, blocked: h, busy: v, submit: g, cancel: b, focusRequest: x } = Kw();
  R8(x);
  const _ = ts("svi2/presets", i1), R = ts("svi2/history", () => l3(25)), N = _.data?.presets ?? [];
  S.useEffect(() => {
    if (a || N.length === 0) return;
    const ne = N.find(($) => $.id === e) ?? N[0];
    ne && s(ne);
  }, [a, N, e, s]);
  const C = R.data?.jobs ?? [], D = r.mode ?? "image_to_video", E = D !== "text_to_video", O = Zm(e, r), k = p.find((ne) => ne.field === "ref_image_path")?.message, H = p.find((ne) => ne.field === "last_image_path")?.message, V = p.find((ne) => ne.field === "prompts")?.message, A = p.find(
    (ne) => ne.field === "width" && ne.severity === "warning"
  )?.message, I = S.useCallback(
    (ne) => {
      d(ne);
    },
    [d]
  );
  return /* @__PURE__ */ y.jsxs("div", { className: b8, children: [
    /* @__PURE__ */ y.jsxs("div", { className: x8, children: [
      /* @__PURE__ */ y.jsx(
        ka,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ y.jsx(uL, { presets: N, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ y.jsxs(
        ka,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: [
            /* @__PURE__ */ y.jsx(wz, { value: D, onChange: u }),
            D === "text_to_video" && /* @__PURE__ */ y.jsx(H6, {})
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("div", { id: om, children: /* @__PURE__ */ y.jsx(
        ka,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ y.jsx(
            uO,
            {
              refImageRequired: E,
              lastImageRequired: O,
              refError: k,
              lastError: H
            }
          )
        }
      ) }),
      /* @__PURE__ */ y.jsx(ka, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ y.jsx(xL, { error: V, textareaId: m_ }) }),
      /* @__PURE__ */ y.jsx(ka, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ y.jsx(ML, {}) }),
      /* @__PURE__ */ y.jsxs(
        ka,
        {
          title: /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
            /* @__PURE__ */ y.jsx("span", { className: S8, children: "Inference · Parameters" }),
            "Parameters"
          ] }),
          description: "Grouped by tier. Advanced tiers stay collapsed.",
          actions: /* @__PURE__ */ y.jsx(
            Ua,
            {
              variant: "secondary",
              size: "sm",
              title: "Re-apply the active preset's defaults",
              onClick: () => {
                const ne = N.find(($) => $.id === e);
                ne && s(ne);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ y.jsx(pz, { presets: N, warningText: A }),
            /* @__PURE__ */ y.jsxs("div", { className: E8, children: [
              /* @__PURE__ */ y.jsx(Hz, {}),
              /* @__PURE__ */ y.jsx(O6, { presets: N }),
              /* @__PURE__ */ y.jsx(HO, {}),
              /* @__PURE__ */ y.jsx(QO, {})
            ] }),
            /* @__PURE__ */ y.jsx(y8, { issues: p }),
            /* @__PURE__ */ y.jsx(Fz, { presets: N })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: w8, children: [
      /* @__PURE__ */ y.jsxs(
        ka,
        {
          title: "Render",
          description: v ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ y.jsx(N6, { state: l, onCancel: b, onReset: c }),
            !v && /* @__PURE__ */ y.jsx("div", { className: _8, children: /* @__PURE__ */ y.jsx(
              Ua,
              {
                variant: "primary",
                disabled: h,
                title: h ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void g(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ y.jsx(ka, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ y.jsx(Oz, { jobs: C, onOpen: I }) })
    ] })
  ] });
}
const C8 = {
  ref_image_path: om,
  last_image_path: om,
  prompts: m_
};
function R8(e) {
  S.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = C8[e.field];
    if (a) {
      const l = document.getElementById(a);
      mx(l);
      return;
    }
    T8(e.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      mx(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [e]);
}
function T8(e) {
  const a = Bc.find((s) => s.key === e);
  if (!a) return;
  const r = Xw.find((s) => s.id === a.tier);
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
function mx(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var M8 = "_1smvon90", yr = "_1smvon91", br = "_1smvon92", xr = "_1smvon93", Xu = "_1smvon94", Ah = "_1smvon95 _1smvon94", A8 = "_1smvon96", D8 = "_1smvon97";
const j8 = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function O8() {
  const { settings: e, setSettings: a } = Qt(), [r, l] = S.useState(e), [s, u] = S.useState(!1), c = S.useMemo(
    () => Object.keys(r).some(
      (h) => r[h] !== e[h]
    ),
    [r, e]
  ), d = (h, v) => {
    l((g) => ({ ...g, [h]: v }));
  }, p = async () => {
    u(!0);
    try {
      const h = await lc(r);
      a(h), l(h), Nr.success("Settings saved. Applied to new renders.");
    } catch {
      Nr.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ y.jsxs(
    ka,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ y.jsxs("div", { className: M8, children: [
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Models directory" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Xu,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (h) => d("modelsDir", h.target.value)
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Output directory" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Xu,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (h) => d("outputDir", h.target.value)
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ y.jsx(
              "select",
              {
                className: Ah,
                value: r.attentionBackend,
                onChange: (h) => d("attentionBackend", h.target.value),
                children: Sm.map((h) => /* @__PURE__ */ y.jsx("option", { value: h.value, children: h.label }, h.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ y.jsx(
              "select",
              {
                className: Ah,
                value: r.fp8Compute,
                onChange: (h) => d("fp8Compute", h.target.value),
                children: WN.map((h) => /* @__PURE__ */ y.jsx("option", { value: h.value, children: h.label }, h.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Blocks to swap" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Xu,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (h) => d("blocksToSwap", Number(h.target.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Interpolation method" }),
            /* @__PURE__ */ y.jsx(
              "select",
              {
                className: Ah,
                value: r.interpolateMethod,
                onChange: (h) => d("interpolateMethod", h.target.value),
                children: j8.map((h) => /* @__PURE__ */ y.jsx("option", { value: h.value, children: h.label }, h.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Interpolate target fps" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Xu,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (h) => d("interpolateFps", Number(h.target.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: A8, children: [
          /* @__PURE__ */ y.jsx(Ua, { loading: s, disabled: !c, onClick: () => void p(), children: "Save settings" }),
          /* @__PURE__ */ y.jsx(
            Ua,
            {
              variant: "secondary",
              onClick: () => l(e),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ y.jsx("output", { className: D8, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var z8 = "_1ugwva20", L8 = "_1ugwva21", k8 = "_1ugwva22", H8 = "_1ugwva23", B8 = "_1ugwva24", U8 = "_1ugwva25";
function V8() {
  const e = lN(), a = q8(e.catalog?.presets ?? []);
  return /* @__PURE__ */ y.jsxs(m3, { initialSettings: e.settings, initialPreset: a, children: [
    /* @__PURE__ */ y.jsxs("div", { className: z8, children: [
      /* @__PURE__ */ y.jsx("header", { className: L8, children: /* @__PURE__ */ y.jsxs("div", { className: k8, children: [
        /* @__PURE__ */ y.jsx("h1", { className: H8, children: "SVI 2.0 Pro" }),
        /* @__PURE__ */ y.jsx("p", { className: B8, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
      ] }) }),
      /* @__PURE__ */ y.jsx("main", { className: U8, children: /* @__PURE__ */ y.jsx(bN, {}) })
    ] }),
    /* @__PURE__ */ y.jsx(q3, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function q8(e) {
  return e.find((a) => a.id === es) ?? e[0] ?? null;
}
async function $8() {
  const [e, a] = await Promise.all([
    i1().catch(() => null),
    aC().catch(() => a1)
  ]);
  return { catalog: e, settings: a };
}
function I8() {
  return [
    {
      path: "/",
      loader: () => ny("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: $8,
      Component: V8,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => ny(`/${Y8(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: N8 },
        { path: "dag", Component: bj },
        { path: "settings", Component: O8 }
      ]
    }
  ];
}
function Y8(e, a) {
  const r = e[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const px = "ext-actions-request", G8 = "ext-actions-declare", X8 = "ext-action-state", gx = "ext-action-invoke", vx = "svi2-pro:navigate", yx = "svi2-pro.render";
function F8(e, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: yx,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(G8, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(X8, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), h = (g) => {
    g.detail?.id === yx && $3();
  }, v = G3((g) => {
    r = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(px, p), e.addEventListener(gx, h), c(), {
    dispose: () => {
      v(), e.removeEventListener(px, p), e.removeEventListener(gx, h);
    }
  };
}
const sm = "svi2-pro-app", Z8 = "ext-event", bx = "svi2-pro-stylesheet", xx = ["accent", "density", "card"];
function P8(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function Q8() {
  if (typeof document > "u" || document.getElementById(bx)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = bx, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
Q8();
class K8 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  actionBridge = null;
  actionBridgeDeploymentId = null;
  router = null;
  navigateListener = null;
  paintedEntry = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = AE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(vx, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = F8(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(vx, a);
  }
  syncTweaksFromBody() {
    for (const a of xx) {
      const r = P8(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: xx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry();
    if (this.router && this.paintedEntry === a) return;
    const r = mN(I8(), { initialEntries: [a] });
    this.router = r, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ y.jsx(S.StrictMode, { children: /* @__PURE__ */ y.jsx(gN, { router: r }) })
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
      new CustomEvent(Z8, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function J8() {
  typeof customElements > "u" || customElements.get(sm) || customElements.define(sm, K8);
}
typeof customElements < "u" && !customElements.get(sm) && J8();
export {
  J8 as register
};
//# sourceMappingURL=svi2-pro.js.map
