function Fj(t, a) {
  for (var i = 0; i < a.length; i++) {
    const l = a[i];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const o in l)
        if (o !== "default" && !(o in t)) {
          const d = Object.getOwnPropertyDescriptor(l, o);
          d && Object.defineProperty(t, o, d.get ? d : {
            enumerable: !0,
            get: () => l[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function ix(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Pd = { exports: {} }, Gs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qg;
function Yj() {
  if (Qg) return Gs;
  Qg = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(l, o, d) {
    var h = null;
    if (d !== void 0 && (h = "" + d), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      d = {};
      for (var m in o)
        m !== "key" && (d[m] = o[m]);
    } else d = o;
    return o = d.ref, {
      $$typeof: t,
      type: l,
      key: h,
      ref: o !== void 0 ? o : null,
      props: d
    };
  }
  return Gs.Fragment = a, Gs.jsx = i, Gs.jsxs = i, Gs;
}
var Zg;
function Gj() {
  return Zg || (Zg = 1, Pd.exports = Yj()), Pd.exports;
}
var c = Gj(), Kd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jg;
function Xj() {
  if (Jg) return Le;
  Jg = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
  function S(M) {
    return M === null || typeof M != "object" ? null : (M = w && M[w] || M["@@iterator"], typeof M == "function" ? M : null);
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
  }, N = Object.assign, C = {};
  function R(M, J, Q) {
    this.props = M, this.context = J, this.refs = C, this.updater = Q || j;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(M, J) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, J, "setState");
  }, R.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function D() {
  }
  D.prototype = R.prototype;
  function O(M, J, Q) {
    this.props = M, this.context = J, this.refs = C, this.updater = Q || j;
  }
  var T = O.prototype = new D();
  T.constructor = O, N(T, R.prototype), T.isPureReactComponent = !0;
  var V = Array.isArray;
  function K() {
  }
  var ne = { H: null, A: null, T: null, S: null }, _ = Object.prototype.hasOwnProperty;
  function Y(M, J, Q) {
    var F = Q.ref;
    return {
      $$typeof: t,
      type: M,
      key: J,
      ref: F !== void 0 ? F : null,
      props: Q
    };
  }
  function $(M, J) {
    return Y(M.type, J, M.props);
  }
  function se(M) {
    return typeof M == "object" && M !== null && M.$$typeof === t;
  }
  function ae(M) {
    var J = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(Q) {
      return J[Q];
    });
  }
  var ee = /\/+/g;
  function ue(M, J) {
    return typeof M == "object" && M !== null && M.key != null ? ae("" + M.key) : J.toString(36);
  }
  function W(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(K, K) : (M.status = "pending", M.then(
          function(J) {
            M.status === "pending" && (M.status = "fulfilled", M.value = J);
          },
          function(J) {
            M.status === "pending" && (M.status = "rejected", M.reason = J);
          }
        )), M.status) {
          case "fulfilled":
            return M.value;
          case "rejected":
            throw M.reason;
        }
    }
    throw M;
  }
  function z(M, J, Q, F, le) {
    var de = typeof M;
    (de === "undefined" || de === "boolean") && (M = null);
    var ve = !1;
    if (M === null) ve = !0;
    else
      switch (de) {
        case "bigint":
        case "string":
        case "number":
          ve = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case t:
            case a:
              ve = !0;
              break;
            case b:
              return ve = M._init, z(
                ve(M._payload),
                J,
                Q,
                F,
                le
              );
          }
      }
    if (ve)
      return le = le(M), ve = F === "" ? "." + ue(M, 0) : F, V(le) ? (Q = "", ve != null && (Q = ve.replace(ee, "$&/") + "/"), z(le, J, Q, "", function(Zt) {
        return Zt;
      })) : le != null && (se(le) && (le = $(
        le,
        Q + (le.key == null || M && M.key === le.key ? "" : ("" + le.key).replace(
          ee,
          "$&/"
        ) + "/") + ve
      )), J.push(le)), 1;
    ve = 0;
    var Te = F === "" ? "." : F + ":";
    if (V(M))
      for (var Ve = 0; Ve < M.length; Ve++)
        F = M[Ve], de = Te + ue(F, Ve), ve += z(
          F,
          J,
          Q,
          de,
          le
        );
    else if (Ve = S(M), typeof Ve == "function")
      for (M = Ve.call(M), Ve = 0; !(F = M.next()).done; )
        F = F.value, de = Te + ue(F, Ve++), ve += z(
          F,
          J,
          Q,
          de,
          le
        );
    else if (de === "object") {
      if (typeof M.then == "function")
        return z(
          W(M),
          J,
          Q,
          F,
          le
        );
      throw J = String(M), Error(
        "Objects are not valid as a React child (found: " + (J === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : J) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ve;
  }
  function L(M, J, Q) {
    if (M == null) return M;
    var F = [], le = 0;
    return z(M, F, "", "", function(de) {
      return J.call(Q, de, le++);
    }), F;
  }
  function H(M) {
    if (M._status === -1) {
      var J = M._result;
      J = J(), J.then(
        function(Q) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = Q);
        },
        function(Q) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = Q);
        }
      ), M._status === -1 && (M._status = 0, M._result = J);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var q = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var J = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(J)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  }, ie = {
    map: L,
    forEach: function(M, J, Q) {
      L(
        M,
        function() {
          J.apply(this, arguments);
        },
        Q
      );
    },
    count: function(M) {
      var J = 0;
      return L(M, function() {
        J++;
      }), J;
    },
    toArray: function(M) {
      return L(M, function(J) {
        return J;
      }) || [];
    },
    only: function(M) {
      if (!se(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  };
  return Le.Activity = v, Le.Children = ie, Le.Component = R, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = O, Le.StrictMode = l, Le.Suspense = g, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, Le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(M) {
      return ne.H.useMemoCache(M);
    }
  }, Le.cache = function(M) {
    return function() {
      return M.apply(null, arguments);
    };
  }, Le.cacheSignal = function() {
    return null;
  }, Le.cloneElement = function(M, J, Q) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var F = N({}, M.props), le = M.key;
    if (J != null)
      for (de in J.key !== void 0 && (le = "" + J.key), J)
        !_.call(J, de) || de === "key" || de === "__self" || de === "__source" || de === "ref" && J.ref === void 0 || (F[de] = J[de]);
    var de = arguments.length - 2;
    if (de === 1) F.children = Q;
    else if (1 < de) {
      for (var ve = Array(de), Te = 0; Te < de; Te++)
        ve[Te] = arguments[Te + 2];
      F.children = ve;
    }
    return Y(M.type, le, F);
  }, Le.createContext = function(M) {
    return M = {
      $$typeof: h,
      _currentValue: M,
      _currentValue2: M,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, M.Provider = M, M.Consumer = {
      $$typeof: d,
      _context: M
    }, M;
  }, Le.createElement = function(M, J, Q) {
    var F, le = {}, de = null;
    if (J != null)
      for (F in J.key !== void 0 && (de = "" + J.key), J)
        _.call(J, F) && F !== "key" && F !== "__self" && F !== "__source" && (le[F] = J[F]);
    var ve = arguments.length - 2;
    if (ve === 1) le.children = Q;
    else if (1 < ve) {
      for (var Te = Array(ve), Ve = 0; Ve < ve; Ve++)
        Te[Ve] = arguments[Ve + 2];
      le.children = Te;
    }
    if (M && M.defaultProps)
      for (F in ve = M.defaultProps, ve)
        le[F] === void 0 && (le[F] = ve[F]);
    return Y(M, de, le);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(M) {
    return { $$typeof: m, render: M };
  }, Le.isValidElement = se, Le.lazy = function(M) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: M },
      _init: H
    };
  }, Le.memo = function(M, J) {
    return {
      $$typeof: p,
      type: M,
      compare: J === void 0 ? null : J
    };
  }, Le.startTransition = function(M) {
    var J = ne.T, Q = {};
    ne.T = Q;
    try {
      var F = M(), le = ne.S;
      le !== null && le(Q, F), typeof F == "object" && F !== null && typeof F.then == "function" && F.then(K, q);
    } catch (de) {
      q(de);
    } finally {
      J !== null && Q.types !== null && (J.types = Q.types), ne.T = J;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, Le.use = function(M) {
    return ne.H.use(M);
  }, Le.useActionState = function(M, J, Q) {
    return ne.H.useActionState(M, J, Q);
  }, Le.useCallback = function(M, J) {
    return ne.H.useCallback(M, J);
  }, Le.useContext = function(M) {
    return ne.H.useContext(M);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(M, J) {
    return ne.H.useDeferredValue(M, J);
  }, Le.useEffect = function(M, J) {
    return ne.H.useEffect(M, J);
  }, Le.useEffectEvent = function(M) {
    return ne.H.useEffectEvent(M);
  }, Le.useId = function() {
    return ne.H.useId();
  }, Le.useImperativeHandle = function(M, J, Q) {
    return ne.H.useImperativeHandle(M, J, Q);
  }, Le.useInsertionEffect = function(M, J) {
    return ne.H.useInsertionEffect(M, J);
  }, Le.useLayoutEffect = function(M, J) {
    return ne.H.useLayoutEffect(M, J);
  }, Le.useMemo = function(M, J) {
    return ne.H.useMemo(M, J);
  }, Le.useOptimistic = function(M, J) {
    return ne.H.useOptimistic(M, J);
  }, Le.useReducer = function(M, J, Q) {
    return ne.H.useReducer(M, J, Q);
  }, Le.useRef = function(M) {
    return ne.H.useRef(M);
  }, Le.useState = function(M) {
    return ne.H.useState(M);
  }, Le.useSyncExternalStore = function(M, J, Q) {
    return ne.H.useSyncExternalStore(
      M,
      J,
      Q
    );
  }, Le.useTransition = function() {
    return ne.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var Wg;
function Sh() {
  return Wg || (Wg = 1, Kd.exports = Xj()), Kd.exports;
}
var y = Sh();
const pe = /* @__PURE__ */ ix(y), Pj = /* @__PURE__ */ Fj({
  __proto__: null,
  default: pe
}, [y]);
var Qd = { exports: {} }, Xs = {}, Zd = { exports: {} }, Jd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ey;
function Kj() {
  return ey || (ey = 1, (function(t) {
    function a(z, L) {
      var H = z.length;
      z.push(L);
      e: for (; 0 < H; ) {
        var q = H - 1 >>> 1, ie = z[q];
        if (0 < o(ie, L))
          z[q] = L, z[H] = ie, H = q;
        else break e;
      }
    }
    function i(z) {
      return z.length === 0 ? null : z[0];
    }
    function l(z) {
      if (z.length === 0) return null;
      var L = z[0], H = z.pop();
      if (H !== L) {
        z[0] = H;
        e: for (var q = 0, ie = z.length, M = ie >>> 1; q < M; ) {
          var J = 2 * (q + 1) - 1, Q = z[J], F = J + 1, le = z[F];
          if (0 > o(Q, H))
            F < ie && 0 > o(le, Q) ? (z[q] = le, z[F] = H, q = F) : (z[q] = Q, z[J] = H, q = J);
          else if (F < ie && 0 > o(le, H))
            z[q] = le, z[F] = H, q = F;
          else break e;
        }
      }
      return L;
    }
    function o(z, L) {
      var H = z.sortIndex - L.sortIndex;
      return H !== 0 ? H : z.id - L.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      t.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, m = h.now();
      t.unstable_now = function() {
        return h.now() - m;
      };
    }
    var g = [], p = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, C = !1, R = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    function T(z) {
      for (var L = i(p); L !== null; ) {
        if (L.callback === null) l(p);
        else if (L.startTime <= z)
          l(p), L.sortIndex = L.expirationTime, a(g, L);
        else break;
        L = i(p);
      }
    }
    function V(z) {
      if (N = !1, T(z), !j)
        if (i(g) !== null)
          j = !0, K || (K = !0, ae());
        else {
          var L = i(p);
          L !== null && W(V, L.startTime - z);
        }
    }
    var K = !1, ne = -1, _ = 5, Y = -1;
    function $() {
      return C ? !0 : !(t.unstable_now() - Y < _);
    }
    function se() {
      if (C = !1, K) {
        var z = t.unstable_now();
        Y = z;
        var L = !0;
        try {
          e: {
            j = !1, N && (N = !1, D(ne), ne = -1), S = !0;
            var H = w;
            try {
              t: {
                for (T(z), v = i(g); v !== null && !(v.expirationTime > z && $()); ) {
                  var q = v.callback;
                  if (typeof q == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var ie = q(
                      v.expirationTime <= z
                    );
                    if (z = t.unstable_now(), typeof ie == "function") {
                      v.callback = ie, T(z), L = !0;
                      break t;
                    }
                    v === i(g) && l(g), T(z);
                  } else l(g);
                  v = i(g);
                }
                if (v !== null) L = !0;
                else {
                  var M = i(p);
                  M !== null && W(
                    V,
                    M.startTime - z
                  ), L = !1;
                }
              }
              break e;
            } finally {
              v = null, w = H, S = !1;
            }
            L = void 0;
          }
        } finally {
          L ? ae() : K = !1;
        }
      }
    }
    var ae;
    if (typeof O == "function")
      ae = function() {
        O(se);
      };
    else if (typeof MessageChannel < "u") {
      var ee = new MessageChannel(), ue = ee.port2;
      ee.port1.onmessage = se, ae = function() {
        ue.postMessage(null);
      };
    } else
      ae = function() {
        R(se, 0);
      };
    function W(z, L) {
      ne = R(function() {
        z(t.unstable_now());
      }, L);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, t.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : _ = 0 < z ? Math.floor(1e3 / z) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_next = function(z) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = w;
      }
      var H = w;
      w = L;
      try {
        return z();
      } finally {
        w = H;
      }
    }, t.unstable_requestPaint = function() {
      C = !0;
    }, t.unstable_runWithPriority = function(z, L) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var H = w;
      w = z;
      try {
        return L();
      } finally {
        w = H;
      }
    }, t.unstable_scheduleCallback = function(z, L, H) {
      var q = t.unstable_now();
      switch (typeof H == "object" && H !== null ? (H = H.delay, H = typeof H == "number" && 0 < H ? q + H : q) : H = q, z) {
        case 1:
          var ie = -1;
          break;
        case 2:
          ie = 250;
          break;
        case 5:
          ie = 1073741823;
          break;
        case 4:
          ie = 1e4;
          break;
        default:
          ie = 5e3;
      }
      return ie = H + ie, z = {
        id: b++,
        callback: L,
        priorityLevel: z,
        startTime: H,
        expirationTime: ie,
        sortIndex: -1
      }, H > q ? (z.sortIndex = H, a(p, z), i(g) === null && z === i(p) && (N ? (D(ne), ne = -1) : N = !0, W(V, H - q))) : (z.sortIndex = ie, a(g, z), j || S || (j = !0, K || (K = !0, ae()))), z;
    }, t.unstable_shouldYield = $, t.unstable_wrapCallback = function(z) {
      var L = w;
      return function() {
        var H = w;
        w = L;
        try {
          return z.apply(this, arguments);
        } finally {
          w = H;
        }
      };
    };
  })(Jd)), Jd;
}
var ty;
function Qj() {
  return ty || (ty = 1, Zd.exports = Kj()), Zd.exports;
}
var Wd = { exports: {} }, ln = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ny;
function Zj() {
  if (ny) return ln;
  ny = 1;
  var t = Sh();
  function a(g) {
    var p = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        p += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var l = {
    d: {
      f: i,
      r: function() {
        throw Error(a(522));
      },
      D: i,
      C: i,
      L: i,
      m: i,
      X: i,
      S: i,
      M: i
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function d(g, p, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: p,
      implementation: b
    };
  }
  var h = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return ln.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, ln.createPortal = function(g, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return d(g, p, null, b);
  }, ln.flushSync = function(g) {
    var p = h.T, b = l.p;
    try {
      if (h.T = null, l.p = 2, g) return g();
    } finally {
      h.T = p, l.p = b, l.d.f();
    }
  }, ln.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, l.d.C(g, p));
  }, ln.prefetchDNS = function(g) {
    typeof g == "string" && l.d.D(g);
  }, ln.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), w = typeof p.integrity == "string" ? p.integrity : void 0, S = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? l.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: w,
          fetchPriority: S
        }
      ) : b === "script" && l.d.X(g, {
        crossOrigin: v,
        integrity: w,
        fetchPriority: S,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, ln.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          l.d.M(g, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && l.d.M(g);
  }, ln.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin);
      l.d.L(g, b, {
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
  }, ln.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        l.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else l.d.m(g);
  }, ln.requestFormReset = function(g) {
    l.d.r(g);
  }, ln.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, ln.useFormState = function(g, p, b) {
    return h.H.useFormState(g, p, b);
  }, ln.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, ln.version = "19.2.5", ln;
}
var ay;
function sx() {
  if (ay) return Wd.exports;
  ay = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Wd.exports = Zj(), Wd.exports;
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
var ry;
function Jj() {
  if (ry) return Xs;
  ry = 1;
  var t = Qj(), a = Sh(), i = sx();
  function l(e) {
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
  function d(e) {
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
  function h(e) {
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
  function g(e) {
    if (d(e) !== e)
      throw Error(l(188));
  }
  function p(e) {
    var n = e.alternate;
    if (!n) {
      if (n = d(e), n === null) throw Error(l(188));
      return n !== e ? null : e;
    }
    for (var r = e, s = n; ; ) {
      var u = r.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (s = u.return, s !== null) {
          r = s;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === r) return g(u), e;
          if (f === s) return g(u), n;
          f = f.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== s.return) r = u, s = f;
      else {
        for (var x = !1, E = u.child; E; ) {
          if (E === r) {
            x = !0, r = u, s = f;
            break;
          }
          if (E === s) {
            x = !0, s = u, r = f;
            break;
          }
          E = E.sibling;
        }
        if (!x) {
          for (E = f.child; E; ) {
            if (E === r) {
              x = !0, r = f, s = u;
              break;
            }
            if (E === s) {
              x = !0, s = f, r = u;
              break;
            }
            E = E.sibling;
          }
          if (!x) throw Error(l(189));
        }
      }
      if (r.alternate !== s) throw Error(l(190));
    }
    if (r.tag !== 3) throw Error(l(188));
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), O = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), $ = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
  function ae(e) {
    return e === null || typeof e != "object" ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ee = Symbol.for("react.client.reference");
  function ue(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ee ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case R:
        return "Profiler";
      case C:
        return "StrictMode";
      case V:
        return "Suspense";
      case K:
        return "SuspenseList";
      case Y:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case O:
          return e.displayName || "Context";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case T:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ne:
          return n = e.displayName || null, n !== null ? n : ue(e.type) || "Memo";
        case _:
          n = e._payload, e = e._init;
          try {
            return ue(e(n));
          } catch {
          }
      }
    return null;
  }
  var W = Array.isArray, z = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, q = [], ie = -1;
  function M(e) {
    return { current: e };
  }
  function J(e) {
    0 > ie || (e.current = q[ie], q[ie] = null, ie--);
  }
  function Q(e, n) {
    ie++, q[ie] = e.current, e.current = n;
  }
  var F = M(null), le = M(null), de = M(null), ve = M(null);
  function Te(e, n) {
    switch (Q(de, n), Q(le, e), Q(F, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? bg(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = bg(n), e = xg(n, e);
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
    J(F), Q(F, e);
  }
  function Ve() {
    J(F), J(le), J(de);
  }
  function Zt(e) {
    e.memoizedState !== null && Q(ve, e);
    var n = F.current, r = xg(n, e.type);
    n !== r && (Q(le, e), Q(F, r));
  }
  function Pt(e) {
    le.current === e && (J(F), J(le)), ve.current === e && (J(ve), qs._currentValue = H);
  }
  var At, et;
  function pt(e) {
    if (At === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        At = n && n[1] || "", et = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + At + e + et;
  }
  var me = !1;
  function Oe(e, n) {
    if (!e || me) return "";
    me = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var ce = function() {
                throw Error();
              };
              if (Object.defineProperty(ce.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(ce, []);
                } catch (te) {
                  var Z = te;
                }
                Reflect.construct(e, [], ce);
              } else {
                try {
                  ce.call();
                } catch (te) {
                  Z = te;
                }
                e.call(ce.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (te) {
                Z = te;
              }
              (ce = e()) && typeof ce.catch == "function" && ce.catch(function() {
              });
            }
          } catch (te) {
            if (te && Z && typeof te.stack == "string")
              return [te.stack, Z.stack];
          }
          return [null, null];
        }
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        s.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = s.DetermineComponentFrameRoot(), x = f[0], E = f[1];
      if (x && E) {
        var k = x.split(`
`), P = E.split(`
`);
        for (u = s = 0; s < k.length && !k[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; u < P.length && !P[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (s === k.length || u === P.length)
          for (s = k.length - 1, u = P.length - 1; 1 <= s && 0 <= u && k[s] !== P[u]; )
            u--;
        for (; 1 <= s && 0 <= u; s--, u--)
          if (k[s] !== P[u]) {
            if (s !== 1 || u !== 1)
              do
                if (s--, u--, 0 > u || k[s] !== P[u]) {
                  var re = `
` + k[s].replace(" at new ", " at ");
                  return e.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", e.displayName)), re;
                }
              while (1 <= s && 0 <= u);
            break;
          }
      }
    } finally {
      me = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? pt(r) : "";
  }
  function De(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return pt(e.type);
      case 16:
        return pt("Lazy");
      case 13:
        return e.child !== n && n !== null ? pt("Suspense Fallback") : pt("Suspense");
      case 19:
        return pt("SuspenseList");
      case 0:
      case 15:
        return Oe(e.type, !1);
      case 11:
        return Oe(e.type.render, !1);
      case 1:
        return Oe(e.type, !0);
      case 31:
        return pt("Activity");
      default:
        return "";
    }
  }
  function Re(e) {
    try {
      var n = "", r = null;
      do
        n += De(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack;
    }
  }
  var bt = Object.prototype.hasOwnProperty, xt = t.unstable_scheduleCallback, un = t.unstable_cancelCallback, Ht = t.unstable_shouldYield, kn = t.unstable_requestPaint, qt = t.unstable_now, be = t.unstable_getCurrentPriorityLevel, ze = t.unstable_ImmediatePriority, Qe = t.unstable_UserBlockingPriority, nt = t.unstable_NormalPriority, It = t.unstable_LowPriority, Ft = t.unstable_IdlePriority, Er = t.log, sa = t.unstable_setDisableYieldValue, Zn = null, Jt = null;
  function Tt(e) {
    if (typeof Er == "function" && sa(e), Jt && typeof Jt.setStrictMode == "function")
      try {
        Jt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : On, Wr = Math.log, Ha = Math.LN2;
  function On(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Wr(e) / Ha | 0) | 0;
  }
  var ga = 256, Jn = 262144, la = 4194304;
  function hn(e) {
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
  function ke(e, n, r) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var u = 0, f = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = s & 134217727;
    return E !== 0 ? (s = E & ~f, s !== 0 ? u = hn(s) : (x &= E, x !== 0 ? u = hn(x) : r || (r = E & ~e, r !== 0 && (u = hn(r))))) : (E = s & ~f, E !== 0 ? u = hn(E) : x !== 0 ? u = hn(x) : r || (r = s & ~e, r !== 0 && (u = hn(r)))), u === 0 ? 0 : n !== 0 && n !== u && (n & f) === 0 && (f = u & -u, r = n & -n, f >= r || f === 32 && (r & 4194048) !== 0) ? n : u;
  }
  function ut(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Dt(e, n) {
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
  function Gt() {
    var e = la;
    return la <<= 1, (la & 62914560) === 0 && (la = 4194304), e;
  }
  function wn(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function it(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Wt(e, n, r, s, u, f) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, k = e.expirationTimes, P = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var re = 31 - Yt(r), ce = 1 << re;
      E[re] = 0, k[re] = -1;
      var Z = P[re];
      if (Z !== null)
        for (P[re] = null, re = 0; re < Z.length; re++) {
          var te = Z[re];
          te !== null && (te.lane &= -536870913);
        }
      r &= ~ce;
    }
    s !== 0 && ya(e, s, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(x & ~n));
  }
  function ya(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var s = 31 - Yt(n);
    e.entangledLanes |= n, e.entanglements[s] = e.entanglements[s] | 1073741824 | r & 261930;
  }
  function rn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var s = 31 - Yt(r), u = 1 << s;
      u & n | e[s] & n && (e[s] |= n), r &= ~u;
    }
  }
  function A(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : B(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function B(e) {
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
  function G(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function fe() {
    var e = L.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Ig(e.type));
  }
  function he(e, n) {
    var r = L.p;
    try {
      return L.p = e, n();
    } finally {
      L.p = r;
    }
  }
  var we = Math.random().toString(36).slice(2), ge = "__reactFiber$" + we, ye = "__reactProps$" + we, Ee = "__reactContainer$" + we, xe = "__reactEvents$" + we, _e = "__reactListeners$" + we, Ce = "__reactHandles$" + we, Ze = "__reactResources$" + we, He = "__reactMarker$" + we;
  function dt(e) {
    delete e[ge], delete e[ye], delete e[xe], delete e[_e], delete e[Ce];
  }
  function st(e) {
    var n = e[ge];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Ee] || r[ge]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Cg(e); e !== null; ) {
            if (r = e[ge]) return r;
            e = Cg(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function St(e) {
    if (e = e[ge] || e[Ee]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Fe(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(l(33));
  }
  function zt(e) {
    var n = e[Ze];
    return n || (n = e[Ze] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function mt(e) {
    e[He] = !0;
  }
  var qa = /* @__PURE__ */ new Set(), Wn = {};
  function Kt(e, n) {
    oa(e, n), oa(e + "Capture", n);
  }
  function oa(e, n) {
    for (Wn[e] = n, e = 0; e < n.length; e++)
      qa.add(n[e]);
  }
  var Nr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ca = {}, Tr = {};
  function ei(e) {
    return bt.call(Tr, e) ? !0 : bt.call(ca, e) ? !1 : Nr.test(e) ? Tr[e] = !0 : (ca[e] = !0, !1);
  }
  function qe(e, n, r) {
    if (ei(n))
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var s = n.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + r);
      }
  }
  function Ct(e, n, r) {
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
  function sn(e, n, r, s) {
    if (s === null) e.removeAttribute(r);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(r);
          return;
      }
      e.setAttributeNS(n, r, "" + s);
    }
  }
  function kt(e) {
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
  function vt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ti(e, n, r) {
    var s = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var u = s.get, f = s.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(x) {
          r = "" + x, f.call(this, x);
        }
      }), Object.defineProperty(e, n, {
        enumerable: s.enumerable
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
  function ni(e) {
    if (!e._valueTracker) {
      var n = vt(e) ? "checked" : "value";
      e._valueTracker = ti(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Cl(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), s = "";
    return e && (s = vt(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Rl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var BS = /[\n"\\]/g;
  function Ln(e) {
    return e.replace(
      BS,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qc(e, n, r, s, u, f, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + kt(n)) : e.value !== "" + kt(n) && (e.value = "" + kt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Ic(e, x, kt(n)) : r != null ? Ic(e, x, kt(r)) : s != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + kt(E) : e.removeAttribute("name");
  }
  function hm(e, n, r, s, u, f, x, E) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || n != null)) {
        ni(e);
        return;
      }
      r = r != null ? "" + kt(r) : "", n = n != null ? "" + kt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    s = s ?? u, s = typeof s != "function" && typeof s != "symbol" && !!s, e.checked = E ? e.checked : !!s, e.defaultChecked = !!s, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ni(e);
  }
  function Ic(e, n, r) {
    n === "number" && Rl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ai(e, n, r, s) {
    if (e = e.options, n) {
      n = {};
      for (var u = 0; u < r.length; u++)
        n["$" + r[u]] = !0;
      for (r = 0; r < e.length; r++)
        u = n.hasOwnProperty("$" + e[r].value), e[r].selected !== u && (e[r].selected = u), u && s && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + kt(r), n = null, u = 0; u < e.length; u++) {
        if (e[u].value === r) {
          e[u].selected = !0, s && (e[u].defaultSelected = !0);
          return;
        }
        n !== null || e[u].disabled || (n = e[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function mm(e, n, r) {
    if (n != null && (n = "" + kt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + kt(r) : "";
  }
  function pm(e, n, r, s) {
    if (n == null) {
      if (s != null) {
        if (r != null) throw Error(l(92));
        if (W(s)) {
          if (1 < s.length) throw Error(l(93));
          s = s[0];
        }
        r = s;
      }
      r == null && (r = ""), n = r;
    }
    r = kt(n), e.defaultValue = r, s = e.textContent, s === r && s !== "" && s !== null && (e.value = s), ni(e);
  }
  function ri(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var $S = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function vm(e, n, r) {
    var s = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? s ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : s ? e.setProperty(n, r) : typeof r != "number" || r === 0 || $S.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function gm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (e = e.style, r != null) {
      for (var s in r)
        !r.hasOwnProperty(s) || n != null && n.hasOwnProperty(s) || (s.indexOf("--") === 0 ? e.setProperty(s, "") : s === "float" ? e.cssFloat = "" : e[s] = "");
      for (var u in n)
        s = n[u], n.hasOwnProperty(u) && r[u] !== s && vm(e, u, s);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && vm(e, f, n[f]);
  }
  function Fc(e) {
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
  var VS = /* @__PURE__ */ new Map([
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
  ]), HS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ml(e) {
    return HS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ba() {
  }
  var Yc = null;
  function Gc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ii = null, si = null;
  function ym(e) {
    var n = St(e);
    if (n && (e = n.stateNode)) {
      var r = e[ye] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (qc(
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
              'input[name="' + Ln(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var s = r[n];
              if (s !== e && s.form === e.form) {
                var u = s[ye] || null;
                if (!u) throw Error(l(90));
                qc(
                  s,
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
            for (n = 0; n < r.length; n++)
              s = r[n], s.form === e.form && Cl(s);
          }
          break e;
        case "textarea":
          mm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ai(e, !!r.multiple, n, !1);
      }
    }
  }
  var Xc = !1;
  function bm(e, n, r) {
    if (Xc) return e(n, r);
    Xc = !0;
    try {
      var s = e(n);
      return s;
    } finally {
      if (Xc = !1, (ii !== null || si !== null) && (go(), ii && (n = ii, e = si, si = ii = null, ym(n), e)))
        for (n = 0; n < e.length; n++) ym(e[n]);
    }
  }
  function is(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var s = r[ye] || null;
    if (s === null) return null;
    r = s[n];
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
        (s = !s.disabled) || (e = e.type, s = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !s;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function")
      throw Error(
        l(231, n, typeof r)
      );
    return r;
  }
  var xa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Pc = !1;
  if (xa)
    try {
      var ss = {};
      Object.defineProperty(ss, "passive", {
        get: function() {
          Pc = !0;
        }
      }), window.addEventListener("test", ss, ss), window.removeEventListener("test", ss, ss);
    } catch {
      Pc = !1;
    }
  var Ia = null, Kc = null, _l = null;
  function xm() {
    if (_l) return _l;
    var e, n = Kc, r = n.length, s, u = "value" in Ia ? Ia.value : Ia.textContent, f = u.length;
    for (e = 0; e < r && n[e] === u[e]; e++) ;
    var x = r - e;
    for (s = 1; s <= x && n[r - s] === u[f - s]; s++) ;
    return _l = u.slice(e, 1 < s ? 1 - s : void 0);
  }
  function Al(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Dl() {
    return !0;
  }
  function Sm() {
    return !1;
  }
  function mn(e) {
    function n(r, s, u, f, x) {
      this._reactName = r, this._targetInst = u, this.type = s, this.nativeEvent = f, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Dl : Sm, this.isPropagationStopped = Sm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Dl);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Dl);
      },
      persist: function() {
      },
      isPersistent: Dl
    }), n;
  }
  var Cr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zl = mn(Cr), ls = v({}, Cr, { view: 0, detail: 0 }), qS = mn(ls), Qc, Zc, os, kl = v({}, ls, {
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
    getModifierState: Wc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== os && (os && e.type === "mousemove" ? (Qc = e.screenX - os.screenX, Zc = e.screenY - os.screenY) : Zc = Qc = 0, os = e), Qc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Zc;
    }
  }), wm = mn(kl), IS = v({}, kl, { dataTransfer: 0 }), FS = mn(IS), YS = v({}, ls, { relatedTarget: 0 }), Jc = mn(YS), GS = v({}, Cr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), XS = mn(GS), PS = v({}, Cr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), KS = mn(PS), QS = v({}, Cr, { data: 0 }), jm = mn(QS), ZS = {
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
  }, JS = {
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
  }, WS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ew(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = WS[e]) ? !!n[e] : !1;
  }
  function Wc() {
    return ew;
  }
  var tw = v({}, ls, {
    key: function(e) {
      if (e.key) {
        var n = ZS[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Al(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? JS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Wc,
    charCode: function(e) {
      return e.type === "keypress" ? Al(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Al(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), nw = mn(tw), aw = v({}, kl, {
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
  }), Em = mn(aw), rw = v({}, ls, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wc
  }), iw = mn(rw), sw = v({}, Cr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lw = mn(sw), ow = v({}, kl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), cw = mn(ow), uw = v({}, Cr, {
    newState: 0,
    oldState: 0
  }), dw = mn(uw), fw = [9, 13, 27, 32], eu = xa && "CompositionEvent" in window, cs = null;
  xa && "documentMode" in document && (cs = document.documentMode);
  var hw = xa && "TextEvent" in window && !cs, Nm = xa && (!eu || cs && 8 < cs && 11 >= cs), Tm = " ", Cm = !1;
  function Rm(e, n) {
    switch (e) {
      case "keyup":
        return fw.indexOf(n.keyCode) !== -1;
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
  function Mm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var li = !1;
  function mw(e, n) {
    switch (e) {
      case "compositionend":
        return Mm(n);
      case "keypress":
        return n.which !== 32 ? null : (Cm = !0, Tm);
      case "textInput":
        return e = n.data, e === Tm && Cm ? null : e;
      default:
        return null;
    }
  }
  function pw(e, n) {
    if (li)
      return e === "compositionend" || !eu && Rm(e, n) ? (e = xm(), _l = Kc = Ia = null, li = !1, e) : null;
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
        return Nm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var vw = {
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
  function _m(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!vw[e.type] : n === "textarea";
  }
  function Am(e, n, r, s) {
    ii ? si ? si.push(s) : si = [s] : ii = s, n = Eo(n, "onChange"), 0 < n.length && (r = new zl(
      "onChange",
      "change",
      null,
      r,
      s
    ), e.push({ event: r, listeners: n }));
  }
  var us = null, ds = null;
  function gw(e) {
    hg(e, 0);
  }
  function Ol(e) {
    var n = Fe(e);
    if (Cl(n)) return e;
  }
  function Dm(e, n) {
    if (e === "change") return n;
  }
  var zm = !1;
  if (xa) {
    var tu;
    if (xa) {
      var nu = "oninput" in document;
      if (!nu) {
        var km = document.createElement("div");
        km.setAttribute("oninput", "return;"), nu = typeof km.oninput == "function";
      }
      tu = nu;
    } else tu = !1;
    zm = tu && (!document.documentMode || 9 < document.documentMode);
  }
  function Om() {
    us && (us.detachEvent("onpropertychange", Lm), ds = us = null);
  }
  function Lm(e) {
    if (e.propertyName === "value" && Ol(ds)) {
      var n = [];
      Am(
        n,
        ds,
        e,
        Gc(e)
      ), bm(gw, n);
    }
  }
  function yw(e, n, r) {
    e === "focusin" ? (Om(), us = n, ds = r, us.attachEvent("onpropertychange", Lm)) : e === "focusout" && Om();
  }
  function bw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ol(ds);
  }
  function xw(e, n) {
    if (e === "click") return Ol(n);
  }
  function Sw(e, n) {
    if (e === "input" || e === "change")
      return Ol(n);
  }
  function ww(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var jn = typeof Object.is == "function" ? Object.is : ww;
  function fs(e, n) {
    if (jn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), s = Object.keys(n);
    if (r.length !== s.length) return !1;
    for (s = 0; s < r.length; s++) {
      var u = r[s];
      if (!bt.call(n, u) || !jn(e[u], n[u]))
        return !1;
    }
    return !0;
  }
  function Um(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Bm(e, n) {
    var r = Um(e);
    e = 0;
    for (var s; r; ) {
      if (r.nodeType === 3) {
        if (s = e + r.textContent.length, e <= n && s >= n)
          return { node: r, offset: n - e };
        e = s;
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
      r = Um(r);
    }
  }
  function $m(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? $m(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Vm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Rl(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Rl(e.document);
    }
    return n;
  }
  function au(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var jw = xa && "documentMode" in document && 11 >= document.documentMode, oi = null, ru = null, hs = null, iu = !1;
  function Hm(e, n, r) {
    var s = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    iu || oi == null || oi !== Rl(s) || (s = oi, "selectionStart" in s && au(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), hs && fs(hs, s) || (hs = s, s = Eo(ru, "onSelect"), 0 < s.length && (n = new zl(
      "onSelect",
      "select",
      null,
      n,
      r
    ), e.push({ event: n, listeners: s }), n.target = oi)));
  }
  function Rr(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ci = {
    animationend: Rr("Animation", "AnimationEnd"),
    animationiteration: Rr("Animation", "AnimationIteration"),
    animationstart: Rr("Animation", "AnimationStart"),
    transitionrun: Rr("Transition", "TransitionRun"),
    transitionstart: Rr("Transition", "TransitionStart"),
    transitioncancel: Rr("Transition", "TransitionCancel"),
    transitionend: Rr("Transition", "TransitionEnd")
  }, su = {}, qm = {};
  xa && (qm = document.createElement("div").style, "AnimationEvent" in window || (delete ci.animationend.animation, delete ci.animationiteration.animation, delete ci.animationstart.animation), "TransitionEvent" in window || delete ci.transitionend.transition);
  function Mr(e) {
    if (su[e]) return su[e];
    if (!ci[e]) return e;
    var n = ci[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in qm)
        return su[e] = n[r];
    return e;
  }
  var Im = Mr("animationend"), Fm = Mr("animationiteration"), Ym = Mr("animationstart"), Ew = Mr("transitionrun"), Nw = Mr("transitionstart"), Tw = Mr("transitioncancel"), Gm = Mr("transitionend"), Xm = /* @__PURE__ */ new Map(), lu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  lu.push("scrollEnd");
  function ea(e, n) {
    Xm.set(e, n), Kt(n, [e]);
  }
  var Ll = typeof reportError == "function" ? reportError : function(e) {
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
  }, Un = [], ui = 0, ou = 0;
  function Ul() {
    for (var e = ui, n = ou = ui = 0; n < e; ) {
      var r = Un[n];
      Un[n++] = null;
      var s = Un[n];
      Un[n++] = null;
      var u = Un[n];
      Un[n++] = null;
      var f = Un[n];
      if (Un[n++] = null, s !== null && u !== null) {
        var x = s.pending;
        x === null ? u.next = u : (u.next = x.next, x.next = u), s.pending = u;
      }
      f !== 0 && Pm(r, u, f);
    }
  }
  function Bl(e, n, r, s) {
    Un[ui++] = e, Un[ui++] = n, Un[ui++] = r, Un[ui++] = s, ou |= s, e.lanes |= s, e = e.alternate, e !== null && (e.lanes |= s);
  }
  function cu(e, n, r, s) {
    return Bl(e, n, r, s), $l(e);
  }
  function _r(e, n) {
    return Bl(e, null, null, n), $l(e);
  }
  function Pm(e, n, r) {
    e.lanes |= r;
    var s = e.alternate;
    s !== null && (s.lanes |= r);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= r, s = f.alternate, s !== null && (s.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && n !== null && (u = 31 - Yt(r), e = f.hiddenUpdates, s = e[u], s === null ? e[u] = [n] : s.push(n), n.lane = r | 536870912), f) : null;
  }
  function $l(e) {
    if (50 < Os)
      throw Os = 0, yd = null, Error(l(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var di = {};
  function Cw(e, n, r, s) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function En(e, n, r, s) {
    return new Cw(e, n, r, s);
  }
  function uu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Sa(e, n) {
    var r = e.alternate;
    return r === null ? (r = En(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function Km(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Vl(e, n, r, s, u, f) {
    var x = 0;
    if (s = e, typeof e == "function") uu(e) && (x = 1);
    else if (typeof e == "string")
      x = Dj(
        e,
        r,
        F.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Y:
          return e = En(31, r, n, u), e.elementType = Y, e.lanes = f, e;
        case N:
          return Ar(r.children, u, f, n);
        case C:
          x = 8, u |= 24;
          break;
        case R:
          return e = En(12, r, n, u | 2), e.elementType = R, e.lanes = f, e;
        case V:
          return e = En(13, r, n, u), e.elementType = V, e.lanes = f, e;
        case K:
          return e = En(19, r, n, u), e.elementType = K, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case O:
                x = 10;
                break e;
              case D:
                x = 9;
                break e;
              case T:
                x = 11;
                break e;
              case ne:
                x = 14;
                break e;
              case _:
                x = 16, s = null;
                break e;
            }
          x = 29, r = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), s = null;
      }
    return n = En(x, r, n, u), n.elementType = e, n.type = s, n.lanes = f, n;
  }
  function Ar(e, n, r, s) {
    return e = En(7, e, s, n), e.lanes = r, e;
  }
  function du(e, n, r) {
    return e = En(6, e, null, n), e.lanes = r, e;
  }
  function Qm(e) {
    var n = En(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function fu(e, n, r) {
    return n = En(
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
  var Zm = /* @__PURE__ */ new WeakMap();
  function Bn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = Zm.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Re(n)
      }, Zm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Re(n)
    };
  }
  var fi = [], hi = 0, Hl = null, ms = 0, $n = [], Vn = 0, Fa = null, ua = 1, da = "";
  function wa(e, n) {
    fi[hi++] = ms, fi[hi++] = Hl, Hl = e, ms = n;
  }
  function Jm(e, n, r) {
    $n[Vn++] = ua, $n[Vn++] = da, $n[Vn++] = Fa, Fa = e;
    var s = ua;
    e = da;
    var u = 32 - Yt(s) - 1;
    s &= ~(1 << u), r += 1;
    var f = 32 - Yt(n) + u;
    if (30 < f) {
      var x = u - u % 5;
      f = (s & (1 << x) - 1).toString(32), s >>= x, u -= x, ua = 1 << 32 - Yt(n) + u | r << u | s, da = f + e;
    } else
      ua = 1 << f | r << u | s, da = e;
  }
  function hu(e) {
    e.return !== null && (wa(e, 1), Jm(e, 1, 0));
  }
  function mu(e) {
    for (; e === Hl; )
      Hl = fi[--hi], fi[hi] = null, ms = fi[--hi], fi[hi] = null;
    for (; e === Fa; )
      Fa = $n[--Vn], $n[Vn] = null, da = $n[--Vn], $n[Vn] = null, ua = $n[--Vn], $n[Vn] = null;
  }
  function Wm(e, n) {
    $n[Vn++] = ua, $n[Vn++] = da, $n[Vn++] = Fa, ua = n.id, da = n.overflow, Fa = e;
  }
  var en = null, gt = null, Ke = !1, Ya = null, Hn = !1, pu = Error(l(519));
  function Ga(e) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ps(Bn(n, e)), pu;
  }
  function ep(e) {
    var n = e.stateNode, r = e.type, s = e.memoizedProps;
    switch (n[ge] = e, n[ye] = s, r) {
      case "dialog":
        Ge("cancel", n), Ge("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ge("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Us.length; r++)
          Ge(Us[r], n);
        break;
      case "source":
        Ge("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ge("error", n), Ge("load", n);
        break;
      case "details":
        Ge("toggle", n);
        break;
      case "input":
        Ge("invalid", n), hm(
          n,
          s.value,
          s.defaultValue,
          s.checked,
          s.defaultChecked,
          s.type,
          s.name,
          !0
        );
        break;
      case "select":
        Ge("invalid", n);
        break;
      case "textarea":
        Ge("invalid", n), pm(n, s.value, s.defaultValue, s.children);
    }
    r = s.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || s.suppressHydrationWarning === !0 || gg(n.textContent, r) ? (s.popover != null && (Ge("beforetoggle", n), Ge("toggle", n)), s.onScroll != null && Ge("scroll", n), s.onScrollEnd != null && Ge("scrollend", n), s.onClick != null && (n.onclick = ba), n = !0) : n = !1, n || Ga(e, !0);
  }
  function tp(e) {
    for (en = e.return; en; )
      switch (en.tag) {
        case 5:
        case 31:
        case 13:
          Hn = !1;
          return;
        case 27:
        case 3:
          Hn = !0;
          return;
        default:
          en = en.return;
      }
  }
  function mi(e) {
    if (e !== en) return !1;
    if (!Ke) return tp(e), Ke = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || zd(e.type, e.memoizedProps)), r = !r), r && gt && Ga(e), tp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Tg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Tg(e);
    } else
      n === 27 ? (n = gt, sr(e.type) ? (e = Bd, Bd = null, gt = e) : gt = n) : gt = en ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Dr() {
    gt = en = null, Ke = !1;
  }
  function vu() {
    var e = Ya;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Ya = null), e;
  }
  function ps(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var gu = M(null), zr = null, ja = null;
  function Xa(e, n, r) {
    Q(gu, n._currentValue), n._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = gu.current, J(gu);
  }
  function yu(e, n, r) {
    for (; e !== null; ) {
      var s = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, s !== null && (s.childLanes |= n)) : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function bu(e, n, r, s) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var x = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var E = f;
          f = u;
          for (var k = 0; k < n.length; k++)
            if (E.context === n[k]) {
              f.lanes |= r, E = f.alternate, E !== null && (E.lanes |= r), yu(
                f.return,
                r,
                e
              ), s || (x = null);
              break e;
            }
          f = E.next;
        }
      } else if (u.tag === 18) {
        if (x = u.return, x === null) throw Error(l(341));
        x.lanes |= r, f = x.alternate, f !== null && (f.lanes |= r), yu(x, r, e), x = null;
      } else x = u.child;
      if (x !== null) x.return = u;
      else
        for (x = u; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (u = x.sibling, u !== null) {
            u.return = x.return, x = u;
            break;
          }
          x = x.return;
        }
      u = x;
    }
  }
  function pi(e, n, r, s) {
    e = null;
    for (var u = n, f = !1; u !== null; ) {
      if (!f) {
        if ((u.flags & 524288) !== 0) f = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var x = u.alternate;
        if (x === null) throw Error(l(387));
        if (x = x.memoizedProps, x !== null) {
          var E = u.type;
          jn(u.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === ve.current) {
        if (x = u.alternate, x === null) throw Error(l(387));
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(qs) : e = [qs]);
      }
      u = u.return;
    }
    e !== null && bu(
      n,
      e,
      r,
      s
    ), n.flags |= 262144;
  }
  function ql(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!jn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function kr(e) {
    zr = e, ja = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function tn(e) {
    return np(zr, e);
  }
  function Il(e, n) {
    return zr === null && kr(e), np(e, n);
  }
  function np(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, ja === null) {
      if (e === null) throw Error(l(308));
      ja = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else ja = ja.next = n;
    return r;
  }
  var Rw = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(r, s) {
        e.push(s);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(r) {
        return r();
      });
    };
  }, Mw = t.unstable_scheduleCallback, _w = t.unstable_NormalPriority, Ot = {
    $$typeof: O,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function xu() {
    return {
      controller: new Rw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function vs(e) {
    e.refCount--, e.refCount === 0 && Mw(_w, function() {
      e.controller.abort();
    });
  }
  var gs = null, Su = 0, vi = 0, gi = null;
  function Aw(e, n) {
    if (gs === null) {
      var r = gs = [];
      Su = 0, vi = Ed(), gi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          r.push(s);
        }
      };
    }
    return Su++, n.then(ap, ap), n;
  }
  function ap() {
    if (--Su === 0 && gs !== null) {
      gi !== null && (gi.status = "fulfilled");
      var e = gs;
      gs = null, vi = 0, gi = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Dw(e, n) {
    var r = [], s = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        r.push(u);
      }
    };
    return e.then(
      function() {
        s.status = "fulfilled", s.value = n;
        for (var u = 0; u < r.length; u++) (0, r[u])(n);
      },
      function(u) {
        for (s.status = "rejected", s.reason = u, u = 0; u < r.length; u++)
          (0, r[u])(void 0);
      }
    ), s;
  }
  var rp = z.S;
  z.S = function(e, n) {
    Hv = qt(), typeof n == "object" && n !== null && typeof n.then == "function" && Aw(e, n), rp !== null && rp(e, n);
  };
  var Or = M(null);
  function wu() {
    var e = Or.current;
    return e !== null ? e : ft.pooledCache;
  }
  function Fl(e, n) {
    n === null ? Q(Or, Or.current) : Q(Or, n.pool);
  }
  function ip() {
    var e = wu();
    return e === null ? null : { parent: Ot._currentValue, pool: e };
  }
  var yi = Error(l(460)), ju = Error(l(474)), Yl = Error(l(542)), Gl = { then: function() {
  } };
  function sp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function lp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(ba, ba), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, cp(e), e;
      default:
        if (typeof n.status == "string") n.then(ba, ba);
        else {
          if (e = ft, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = n, e.status = "pending", e.then(
            function(s) {
              if (n.status === "pending") {
                var u = n;
                u.status = "fulfilled", u.value = s;
              }
            },
            function(s) {
              if (n.status === "pending") {
                var u = n;
                u.status = "rejected", u.reason = s;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, cp(e), e;
        }
        throw Ur = n, yi;
    }
  }
  function Lr(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Ur = r, yi) : r;
    }
  }
  var Ur = null;
  function op() {
    if (Ur === null) throw Error(l(459));
    var e = Ur;
    return Ur = null, e;
  }
  function cp(e) {
    if (e === yi || e === Yl)
      throw Error(l(483));
  }
  var bi = null, ys = 0;
  function Xl(e) {
    var n = ys;
    return ys += 1, bi === null && (bi = []), lp(bi, e, n);
  }
  function bs(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Pl(e, n) {
    throw n.$$typeof === w ? Error(l(525)) : (e = Object.prototype.toString.call(n), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function up(e) {
    function n(I, U) {
      if (e) {
        var X = I.deletions;
        X === null ? (I.deletions = [U], I.flags |= 16) : X.push(U);
      }
    }
    function r(I, U) {
      if (!e) return null;
      for (; U !== null; )
        n(I, U), U = U.sibling;
      return null;
    }
    function s(I) {
      for (var U = /* @__PURE__ */ new Map(); I !== null; )
        I.key !== null ? U.set(I.key, I) : U.set(I.index, I), I = I.sibling;
      return U;
    }
    function u(I, U) {
      return I = Sa(I, U), I.index = 0, I.sibling = null, I;
    }
    function f(I, U, X) {
      return I.index = X, e ? (X = I.alternate, X !== null ? (X = X.index, X < U ? (I.flags |= 67108866, U) : X) : (I.flags |= 67108866, U)) : (I.flags |= 1048576, U);
    }
    function x(I) {
      return e && I.alternate === null && (I.flags |= 67108866), I;
    }
    function E(I, U, X, oe) {
      return U === null || U.tag !== 6 ? (U = du(X, I.mode, oe), U.return = I, U) : (U = u(U, X), U.return = I, U);
    }
    function k(I, U, X, oe) {
      var Me = X.type;
      return Me === N ? re(
        I,
        U,
        X.props.children,
        oe,
        X.key
      ) : U !== null && (U.elementType === Me || typeof Me == "object" && Me !== null && Me.$$typeof === _ && Lr(Me) === U.type) ? (U = u(U, X.props), bs(U, X), U.return = I, U) : (U = Vl(
        X.type,
        X.key,
        X.props,
        null,
        I.mode,
        oe
      ), bs(U, X), U.return = I, U);
    }
    function P(I, U, X, oe) {
      return U === null || U.tag !== 4 || U.stateNode.containerInfo !== X.containerInfo || U.stateNode.implementation !== X.implementation ? (U = fu(X, I.mode, oe), U.return = I, U) : (U = u(U, X.children || []), U.return = I, U);
    }
    function re(I, U, X, oe, Me) {
      return U === null || U.tag !== 7 ? (U = Ar(
        X,
        I.mode,
        oe,
        Me
      ), U.return = I, U) : (U = u(U, X), U.return = I, U);
    }
    function ce(I, U, X) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return U = du(
          "" + U,
          I.mode,
          X
        ), U.return = I, U;
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case S:
            return X = Vl(
              U.type,
              U.key,
              U.props,
              null,
              I.mode,
              X
            ), bs(X, U), X.return = I, X;
          case j:
            return U = fu(
              U,
              I.mode,
              X
            ), U.return = I, U;
          case _:
            return U = Lr(U), ce(I, U, X);
        }
        if (W(U) || ae(U))
          return U = Ar(
            U,
            I.mode,
            X,
            null
          ), U.return = I, U;
        if (typeof U.then == "function")
          return ce(I, Xl(U), X);
        if (U.$$typeof === O)
          return ce(
            I,
            Il(I, U),
            X
          );
        Pl(I, U);
      }
      return null;
    }
    function Z(I, U, X, oe) {
      var Me = U !== null ? U.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return Me !== null ? null : E(I, U, "" + X, oe);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case S:
            return X.key === Me ? k(I, U, X, oe) : null;
          case j:
            return X.key === Me ? P(I, U, X, oe) : null;
          case _:
            return X = Lr(X), Z(I, U, X, oe);
        }
        if (W(X) || ae(X))
          return Me !== null ? null : re(I, U, X, oe, null);
        if (typeof X.then == "function")
          return Z(
            I,
            U,
            Xl(X),
            oe
          );
        if (X.$$typeof === O)
          return Z(
            I,
            U,
            Il(I, X),
            oe
          );
        Pl(I, X);
      }
      return null;
    }
    function te(I, U, X, oe, Me) {
      if (typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint")
        return I = I.get(X) || null, E(U, I, "" + oe, Me);
      if (typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case S:
            return I = I.get(
              oe.key === null ? X : oe.key
            ) || null, k(U, I, oe, Me);
          case j:
            return I = I.get(
              oe.key === null ? X : oe.key
            ) || null, P(U, I, oe, Me);
          case _:
            return oe = Lr(oe), te(
              I,
              U,
              X,
              oe,
              Me
            );
        }
        if (W(oe) || ae(oe))
          return I = I.get(X) || null, re(U, I, oe, Me, null);
        if (typeof oe.then == "function")
          return te(
            I,
            U,
            X,
            Xl(oe),
            Me
          );
        if (oe.$$typeof === O)
          return te(
            I,
            U,
            X,
            Il(U, oe),
            Me
          );
        Pl(U, oe);
      }
      return null;
    }
    function Se(I, U, X, oe) {
      for (var Me = null, Je = null, Ne = U, Be = U = 0, Pe = null; Ne !== null && Be < X.length; Be++) {
        Ne.index > Be ? (Pe = Ne, Ne = null) : Pe = Ne.sibling;
        var We = Z(
          I,
          Ne,
          X[Be],
          oe
        );
        if (We === null) {
          Ne === null && (Ne = Pe);
          break;
        }
        e && Ne && We.alternate === null && n(I, Ne), U = f(We, U, Be), Je === null ? Me = We : Je.sibling = We, Je = We, Ne = Pe;
      }
      if (Be === X.length)
        return r(I, Ne), Ke && wa(I, Be), Me;
      if (Ne === null) {
        for (; Be < X.length; Be++)
          Ne = ce(I, X[Be], oe), Ne !== null && (U = f(
            Ne,
            U,
            Be
          ), Je === null ? Me = Ne : Je.sibling = Ne, Je = Ne);
        return Ke && wa(I, Be), Me;
      }
      for (Ne = s(Ne); Be < X.length; Be++)
        Pe = te(
          Ne,
          I,
          Be,
          X[Be],
          oe
        ), Pe !== null && (e && Pe.alternate !== null && Ne.delete(
          Pe.key === null ? Be : Pe.key
        ), U = f(
          Pe,
          U,
          Be
        ), Je === null ? Me = Pe : Je.sibling = Pe, Je = Pe);
      return e && Ne.forEach(function(dr) {
        return n(I, dr);
      }), Ke && wa(I, Be), Me;
    }
    function Ae(I, U, X, oe) {
      if (X == null) throw Error(l(151));
      for (var Me = null, Je = null, Ne = U, Be = U = 0, Pe = null, We = X.next(); Ne !== null && !We.done; Be++, We = X.next()) {
        Ne.index > Be ? (Pe = Ne, Ne = null) : Pe = Ne.sibling;
        var dr = Z(I, Ne, We.value, oe);
        if (dr === null) {
          Ne === null && (Ne = Pe);
          break;
        }
        e && Ne && dr.alternate === null && n(I, Ne), U = f(dr, U, Be), Je === null ? Me = dr : Je.sibling = dr, Je = dr, Ne = Pe;
      }
      if (We.done)
        return r(I, Ne), Ke && wa(I, Be), Me;
      if (Ne === null) {
        for (; !We.done; Be++, We = X.next())
          We = ce(I, We.value, oe), We !== null && (U = f(We, U, Be), Je === null ? Me = We : Je.sibling = We, Je = We);
        return Ke && wa(I, Be), Me;
      }
      for (Ne = s(Ne); !We.done; Be++, We = X.next())
        We = te(Ne, I, Be, We.value, oe), We !== null && (e && We.alternate !== null && Ne.delete(We.key === null ? Be : We.key), U = f(We, U, Be), Je === null ? Me = We : Je.sibling = We, Je = We);
      return e && Ne.forEach(function(Ij) {
        return n(I, Ij);
      }), Ke && wa(I, Be), Me;
    }
    function ct(I, U, X, oe) {
      if (typeof X == "object" && X !== null && X.type === N && X.key === null && (X = X.props.children), typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case S:
            e: {
              for (var Me = X.key; U !== null; ) {
                if (U.key === Me) {
                  if (Me = X.type, Me === N) {
                    if (U.tag === 7) {
                      r(
                        I,
                        U.sibling
                      ), oe = u(
                        U,
                        X.props.children
                      ), oe.return = I, I = oe;
                      break e;
                    }
                  } else if (U.elementType === Me || typeof Me == "object" && Me !== null && Me.$$typeof === _ && Lr(Me) === U.type) {
                    r(
                      I,
                      U.sibling
                    ), oe = u(U, X.props), bs(oe, X), oe.return = I, I = oe;
                    break e;
                  }
                  r(I, U);
                  break;
                } else n(I, U);
                U = U.sibling;
              }
              X.type === N ? (oe = Ar(
                X.props.children,
                I.mode,
                oe,
                X.key
              ), oe.return = I, I = oe) : (oe = Vl(
                X.type,
                X.key,
                X.props,
                null,
                I.mode,
                oe
              ), bs(oe, X), oe.return = I, I = oe);
            }
            return x(I);
          case j:
            e: {
              for (Me = X.key; U !== null; ) {
                if (U.key === Me)
                  if (U.tag === 4 && U.stateNode.containerInfo === X.containerInfo && U.stateNode.implementation === X.implementation) {
                    r(
                      I,
                      U.sibling
                    ), oe = u(U, X.children || []), oe.return = I, I = oe;
                    break e;
                  } else {
                    r(I, U);
                    break;
                  }
                else n(I, U);
                U = U.sibling;
              }
              oe = fu(X, I.mode, oe), oe.return = I, I = oe;
            }
            return x(I);
          case _:
            return X = Lr(X), ct(
              I,
              U,
              X,
              oe
            );
        }
        if (W(X))
          return Se(
            I,
            U,
            X,
            oe
          );
        if (ae(X)) {
          if (Me = ae(X), typeof Me != "function") throw Error(l(150));
          return X = Me.call(X), Ae(
            I,
            U,
            X,
            oe
          );
        }
        if (typeof X.then == "function")
          return ct(
            I,
            U,
            Xl(X),
            oe
          );
        if (X.$$typeof === O)
          return ct(
            I,
            U,
            Il(I, X),
            oe
          );
        Pl(I, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint" ? (X = "" + X, U !== null && U.tag === 6 ? (r(I, U.sibling), oe = u(U, X), oe.return = I, I = oe) : (r(I, U), oe = du(X, I.mode, oe), oe.return = I, I = oe), x(I)) : r(I, U);
    }
    return function(I, U, X, oe) {
      try {
        ys = 0;
        var Me = ct(
          I,
          U,
          X,
          oe
        );
        return bi = null, Me;
      } catch (Ne) {
        if (Ne === yi || Ne === Yl) throw Ne;
        var Je = En(29, Ne, null, I.mode);
        return Je.lanes = oe, Je.return = I, Je;
      } finally {
      }
    };
  }
  var Br = up(!0), dp = up(!1), Pa = !1;
  function Eu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Nu(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ka(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Qa(e, n, r) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (tt & 2) !== 0) {
      var u = s.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), s.pending = n, n = $l(e), Pm(e, null, r), n;
    }
    return Bl(e, s, n, r), $l(e);
  }
  function xs(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, rn(e, r);
    }
  }
  function Tu(e, n) {
    var r = e.updateQueue, s = e.alternate;
    if (s !== null && (s = s.updateQueue, r === s)) {
      var u = null, f = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var x = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          f === null ? u = f = x : f = f.next = x, r = r.next;
        } while (r !== null);
        f === null ? u = f = n : f = f.next = n;
      } else u = f = n;
      r = {
        baseState: s.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: s.shared,
        callbacks: s.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = n : e.next = n, r.lastBaseUpdate = n;
  }
  var Cu = !1;
  function Ss() {
    if (Cu) {
      var e = gi;
      if (e !== null) throw e;
    }
  }
  function ws(e, n, r, s) {
    Cu = !1;
    var u = e.updateQueue;
    Pa = !1;
    var f = u.firstBaseUpdate, x = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var k = E, P = k.next;
      k.next = null, x === null ? f = P : x.next = P, x = k;
      var re = e.alternate;
      re !== null && (re = re.updateQueue, E = re.lastBaseUpdate, E !== x && (E === null ? re.firstBaseUpdate = P : E.next = P, re.lastBaseUpdate = k));
    }
    if (f !== null) {
      var ce = u.baseState;
      x = 0, re = P = k = null, E = f;
      do {
        var Z = E.lane & -536870913, te = Z !== E.lane;
        if (te ? (Xe & Z) === Z : (s & Z) === Z) {
          Z !== 0 && Z === vi && (Cu = !0), re !== null && (re = re.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Se = e, Ae = E;
            Z = n;
            var ct = r;
            switch (Ae.tag) {
              case 1:
                if (Se = Ae.payload, typeof Se == "function") {
                  ce = Se.call(ct, ce, Z);
                  break e;
                }
                ce = Se;
                break e;
              case 3:
                Se.flags = Se.flags & -65537 | 128;
              case 0:
                if (Se = Ae.payload, Z = typeof Se == "function" ? Se.call(ct, ce, Z) : Se, Z == null) break e;
                ce = v({}, ce, Z);
                break e;
              case 2:
                Pa = !0;
            }
          }
          Z = E.callback, Z !== null && (e.flags |= 64, te && (e.flags |= 8192), te = u.callbacks, te === null ? u.callbacks = [Z] : te.push(Z));
        } else
          te = {
            lane: Z,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, re === null ? (P = re = te, k = ce) : re = re.next = te, x |= Z;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          te = E, E = te.next, te.next = null, u.lastBaseUpdate = te, u.shared.pending = null;
        }
      } while (!0);
      re === null && (k = ce), u.baseState = k, u.firstBaseUpdate = P, u.lastBaseUpdate = re, f === null && (u.shared.lanes = 0), tr |= x, e.lanes = x, e.memoizedState = ce;
    }
  }
  function fp(e, n) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(n);
  }
  function hp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        fp(r[e], n);
  }
  var xi = M(null), Kl = M(0);
  function mp(e, n) {
    e = za, Q(Kl, e), Q(xi, n), za = e | n.baseLanes;
  }
  function Ru() {
    Q(Kl, za), Q(xi, xi.current);
  }
  function Mu() {
    za = Kl.current, J(xi), J(Kl);
  }
  var Nn = M(null), qn = null;
  function Za(e) {
    var n = e.alternate;
    Q(Rt, Rt.current & 1), Q(Nn, e), qn === null && (n === null || xi.current !== null || n.memoizedState !== null) && (qn = e);
  }
  function _u(e) {
    Q(Rt, Rt.current), Q(Nn, e), qn === null && (qn = e);
  }
  function pp(e) {
    e.tag === 22 ? (Q(Rt, Rt.current), Q(Nn, e), qn === null && (qn = e)) : Ja();
  }
  function Ja() {
    Q(Rt, Rt.current), Q(Nn, Nn.current);
  }
  function Tn(e) {
    J(Nn), qn === e && (qn = null), J(Rt);
  }
  var Rt = M(0);
  function Ql(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Ld(r) || Ud(r)))
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
  var Na = 0, Ue = null, lt = null, Lt = null, Zl = !1, Si = !1, $r = !1, Jl = 0, js = 0, wi = null, zw = 0;
  function Et() {
    throw Error(l(321));
  }
  function Au(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!jn(e[r], n[r])) return !1;
    return !0;
  }
  function Du(e, n, r, s, u, f) {
    return Na = f, Ue = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, z.H = e === null || e.memoizedState === null ? Jp : Xu, $r = !1, f = r(s, u), $r = !1, Si && (f = gp(
      n,
      r,
      s,
      u
    )), vp(e), f;
  }
  function vp(e) {
    z.H = Ts;
    var n = lt !== null && lt.next !== null;
    if (Na = 0, Lt = lt = Ue = null, Zl = !1, js = 0, wi = null, n) throw Error(l(300));
    e === null || Ut || (e = e.dependencies, e !== null && ql(e) && (Ut = !0));
  }
  function gp(e, n, r, s) {
    Ue = e;
    var u = 0;
    do {
      if (Si && (wi = null), js = 0, Si = !1, 25 <= u) throw Error(l(301));
      if (u += 1, Lt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      z.H = Wp, f = n(r, s);
    } while (Si);
    return f;
  }
  function kw() {
    var e = z.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Es(n) : n, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), n;
  }
  function zu() {
    var e = Jl !== 0;
    return Jl = 0, e;
  }
  function ku(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Ou(e) {
    if (Zl) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      Zl = !1;
    }
    Na = 0, Lt = lt = Ue = null, Si = !1, js = Jl = 0, wi = null;
  }
  function dn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Lt === null ? Ue.memoizedState = Lt = e : Lt = Lt.next = e, Lt;
  }
  function Mt() {
    if (lt === null) {
      var e = Ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = lt.next;
    var n = Lt === null ? Ue.memoizedState : Lt.next;
    if (n !== null)
      Lt = n, lt = e;
    else {
      if (e === null)
        throw Ue.alternate === null ? Error(l(467)) : Error(l(310));
      lt = e, e = {
        memoizedState: lt.memoizedState,
        baseState: lt.baseState,
        baseQueue: lt.baseQueue,
        queue: lt.queue,
        next: null
      }, Lt === null ? Ue.memoizedState = Lt = e : Lt = Lt.next = e;
    }
    return Lt;
  }
  function Wl() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Es(e) {
    var n = js;
    return js += 1, wi === null && (wi = []), e = lp(wi, e, n), n = Ue, (Lt === null ? n.memoizedState : Lt.next) === null && (n = n.alternate, z.H = n === null || n.memoizedState === null ? Jp : Xu), e;
  }
  function eo(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Es(e);
      if (e.$$typeof === O) return tn(e);
    }
    throw Error(l(438, String(e)));
  }
  function Lu(e) {
    var n = null, r = Ue.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var s = Ue.alternate;
      s !== null && (s = s.updateQueue, s !== null && (s = s.memoCache, s != null && (n = {
        data: s.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = Wl(), Ue.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), s = 0; s < e; s++)
        r[s] = $;
    return n.index++, r;
  }
  function Ta(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function to(e) {
    var n = Mt();
    return Uu(n, lt, e);
  }
  function Uu(e, n, r) {
    var s = e.queue;
    if (s === null) throw Error(l(311));
    s.lastRenderedReducer = r;
    var u = e.baseQueue, f = s.pending;
    if (f !== null) {
      if (u !== null) {
        var x = u.next;
        u.next = f.next, f.next = x;
      }
      n.baseQueue = u = f, s.pending = null;
    }
    if (f = e.baseState, u === null) e.memoizedState = f;
    else {
      n = u.next;
      var E = x = null, k = null, P = n, re = !1;
      do {
        var ce = P.lane & -536870913;
        if (ce !== P.lane ? (Xe & ce) === ce : (Na & ce) === ce) {
          var Z = P.revertLane;
          if (Z === 0)
            k !== null && (k = k.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }), ce === vi && (re = !0);
          else if ((Na & Z) === Z) {
            P = P.next, Z === vi && (re = !0);
            continue;
          } else
            ce = {
              lane: 0,
              revertLane: P.revertLane,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }, k === null ? (E = k = ce, x = f) : k = k.next = ce, Ue.lanes |= Z, tr |= Z;
          ce = P.action, $r && r(f, ce), f = P.hasEagerState ? P.eagerState : r(f, ce);
        } else
          Z = {
            lane: ce,
            revertLane: P.revertLane,
            gesture: P.gesture,
            action: P.action,
            hasEagerState: P.hasEagerState,
            eagerState: P.eagerState,
            next: null
          }, k === null ? (E = k = Z, x = f) : k = k.next = Z, Ue.lanes |= ce, tr |= ce;
        P = P.next;
      } while (P !== null && P !== n);
      if (k === null ? x = f : k.next = E, !jn(f, e.memoizedState) && (Ut = !0, re && (r = gi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = x, e.baseQueue = k, s.lastRenderedState = f;
    }
    return u === null && (s.lanes = 0), [e.memoizedState, s.dispatch];
  }
  function Bu(e) {
    var n = Mt(), r = n.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var s = r.dispatch, u = r.pending, f = n.memoizedState;
    if (u !== null) {
      r.pending = null;
      var x = u = u.next;
      do
        f = e(f, x.action), x = x.next;
      while (x !== u);
      jn(f, n.memoizedState) || (Ut = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), r.lastRenderedState = f;
    }
    return [f, s];
  }
  function yp(e, n, r) {
    var s = Ue, u = Mt(), f = Ke;
    if (f) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else r = n();
    var x = !jn(
      (lt || u).memoizedState,
      r
    );
    if (x && (u.memoizedState = r, Ut = !0), u = u.queue, Hu(Sp.bind(null, s, u, e), [
      e
    ]), u.getSnapshot !== n || x || Lt !== null && Lt.memoizedState.tag & 1) {
      if (s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        xp.bind(
          null,
          s,
          u,
          r,
          n
        ),
        null
      ), ft === null) throw Error(l(349));
      f || (Na & 127) !== 0 || bp(s, n, r);
    }
    return r;
  }
  function bp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ue.updateQueue, n === null ? (n = Wl(), Ue.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function xp(e, n, r, s) {
    n.value = r, n.getSnapshot = s, wp(n) && jp(e);
  }
  function Sp(e, n, r) {
    return r(function() {
      wp(n) && jp(e);
    });
  }
  function wp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !jn(e, r);
    } catch {
      return !0;
    }
  }
  function jp(e) {
    var n = _r(e, 2);
    n !== null && bn(n, e, 2);
  }
  function $u(e) {
    var n = dn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), $r) {
        Tt(!0);
        try {
          r();
        } finally {
          Tt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ta,
      lastRenderedState: e
    }, n;
  }
  function Ep(e, n, r, s) {
    return e.baseState = r, Uu(
      e,
      lt,
      typeof s == "function" ? s : Ta
    );
  }
  function Ow(e, n, r, s, u) {
    if (ro(e)) throw Error(l(485));
    if (e = n.action, e !== null) {
      var f = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          f.listeners.push(x);
        }
      };
      z.T !== null ? r(!0) : f.isTransition = !1, s(f), r = n.pending, r === null ? (f.next = n.pending = f, Np(n, f)) : (f.next = r.next, n.pending = r.next = f);
    }
  }
  function Np(e, n) {
    var r = n.action, s = n.payload, u = e.state;
    if (n.isTransition) {
      var f = z.T, x = {};
      z.T = x;
      try {
        var E = r(u, s), k = z.S;
        k !== null && k(x, E), Tp(e, n, E);
      } catch (P) {
        Vu(e, n, P);
      } finally {
        f !== null && x.types !== null && (f.types = x.types), z.T = f;
      }
    } else
      try {
        f = r(u, s), Tp(e, n, f);
      } catch (P) {
        Vu(e, n, P);
      }
  }
  function Tp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(s) {
        Cp(e, n, s);
      },
      function(s) {
        return Vu(e, n, s);
      }
    ) : Cp(e, n, r);
  }
  function Cp(e, n, r) {
    n.status = "fulfilled", n.value = r, Rp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Np(e, r)));
  }
  function Vu(e, n, r) {
    var s = e.pending;
    if (e.pending = null, s !== null) {
      s = s.next;
      do
        n.status = "rejected", n.reason = r, Rp(n), n = n.next;
      while (n !== s);
    }
    e.action = null;
  }
  function Rp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Mp(e, n) {
    return n;
  }
  function _p(e, n) {
    if (Ke) {
      var r = ft.formState;
      if (r !== null) {
        e: {
          var s = Ue;
          if (Ke) {
            if (gt) {
              t: {
                for (var u = gt, f = Hn; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (u = In(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                gt = In(
                  u.nextSibling
                ), s = u.data === "F!";
                break e;
              }
            }
            Ga(s);
          }
          s = !1;
        }
        s && (n = r[0]);
      }
    }
    return r = dn(), r.memoizedState = r.baseState = n, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mp,
      lastRenderedState: n
    }, r.queue = s, r = Kp.bind(
      null,
      Ue,
      s
    ), s.dispatch = r, s = $u(!1), f = Gu.bind(
      null,
      Ue,
      !1,
      s.queue
    ), s = dn(), u = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, s.queue = u, r = Ow.bind(
      null,
      Ue,
      u,
      f,
      r
    ), u.dispatch = r, s.memoizedState = e, [n, r, !1];
  }
  function Ap(e) {
    var n = Mt();
    return Dp(n, lt, e);
  }
  function Dp(e, n, r) {
    if (n = Uu(
      e,
      n,
      Mp
    )[0], e = to(Ta)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var s = Es(n);
      } catch (x) {
        throw x === yi ? Yl : x;
      }
    else s = n;
    n = Mt();
    var u = n.queue, f = u.dispatch;
    return r !== n.memoizedState && (Ue.flags |= 2048, ji(
      9,
      { destroy: void 0 },
      Lw.bind(null, u, r),
      null
    )), [s, f, e];
  }
  function Lw(e, n) {
    e.action = n;
  }
  function zp(e) {
    var n = Mt(), r = lt;
    if (r !== null)
      return Dp(n, r, e);
    Mt(), n = n.memoizedState, r = Mt();
    var s = r.queue.dispatch;
    return r.memoizedState = e, [n, s, !1];
  }
  function ji(e, n, r, s) {
    return e = { tag: e, create: r, deps: s, inst: n, next: null }, n = Ue.updateQueue, n === null && (n = Wl(), Ue.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (s = r.next, r.next = e, e.next = s, n.lastEffect = e), e;
  }
  function kp() {
    return Mt().memoizedState;
  }
  function no(e, n, r, s) {
    var u = dn();
    Ue.flags |= e, u.memoizedState = ji(
      1 | n,
      { destroy: void 0 },
      r,
      s === void 0 ? null : s
    );
  }
  function ao(e, n, r, s) {
    var u = Mt();
    s = s === void 0 ? null : s;
    var f = u.memoizedState.inst;
    lt !== null && s !== null && Au(s, lt.memoizedState.deps) ? u.memoizedState = ji(n, f, r, s) : (Ue.flags |= e, u.memoizedState = ji(
      1 | n,
      f,
      r,
      s
    ));
  }
  function Op(e, n) {
    no(8390656, 8, e, n);
  }
  function Hu(e, n) {
    ao(2048, 8, e, n);
  }
  function Uw(e) {
    Ue.flags |= 4;
    var n = Ue.updateQueue;
    if (n === null)
      n = Wl(), Ue.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Lp(e) {
    var n = Mt().memoizedState;
    return Uw({ ref: n, nextImpl: e }), function() {
      if ((tt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Up(e, n) {
    return ao(4, 2, e, n);
  }
  function Bp(e, n) {
    return ao(4, 4, e, n);
  }
  function $p(e, n) {
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
  function Vp(e, n, r) {
    r = r != null ? r.concat([e]) : null, ao(4, 4, $p.bind(null, n, e), r);
  }
  function qu() {
  }
  function Hp(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    return n !== null && Au(n, s[1]) ? s[0] : (r.memoizedState = [e, n], e);
  }
  function qp(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    if (n !== null && Au(n, s[1]))
      return s[0];
    if (s = e(), $r) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return r.memoizedState = [s, n], s;
  }
  function Iu(e, n, r) {
    return r === void 0 || (Na & 1073741824) !== 0 && (Xe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Iv(), Ue.lanes |= e, tr |= e, r);
  }
  function Ip(e, n, r, s) {
    return jn(r, n) ? r : xi.current !== null ? (e = Iu(e, r, s), jn(e, n) || (Ut = !0), e) : (Na & 42) === 0 || (Na & 1073741824) !== 0 && (Xe & 261930) === 0 ? (Ut = !0, e.memoizedState = r) : (e = Iv(), Ue.lanes |= e, tr |= e, n);
  }
  function Fp(e, n, r, s, u) {
    var f = L.p;
    L.p = f !== 0 && 8 > f ? f : 8;
    var x = z.T, E = {};
    z.T = E, Gu(e, !1, n, r);
    try {
      var k = u(), P = z.S;
      if (P !== null && P(E, k), k !== null && typeof k == "object" && typeof k.then == "function") {
        var re = Dw(
          k,
          s
        );
        Ns(
          e,
          n,
          re,
          Mn(e)
        );
      } else
        Ns(
          e,
          n,
          s,
          Mn(e)
        );
    } catch (ce) {
      Ns(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: ce },
        Mn()
      );
    } finally {
      L.p = f, x !== null && E.types !== null && (x.types = E.types), z.T = x;
    }
  }
  function Bw() {
  }
  function Fu(e, n, r, s) {
    if (e.tag !== 5) throw Error(l(476));
    var u = Yp(e).queue;
    Fp(
      e,
      u,
      n,
      H,
      r === null ? Bw : function() {
        return Gp(e), r(s);
      }
    );
  }
  function Yp(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: H,
      baseState: H,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ta,
        lastRenderedState: H
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
        lastRenderedReducer: Ta,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Gp(e) {
    var n = Yp(e);
    n.next === null && (n = e.alternate.memoizedState), Ns(
      e,
      n.next.queue,
      {},
      Mn()
    );
  }
  function Yu() {
    return tn(qs);
  }
  function Xp() {
    return Mt().memoizedState;
  }
  function Pp() {
    return Mt().memoizedState;
  }
  function $w(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Mn();
          e = Ka(r);
          var s = Qa(n, e, r);
          s !== null && (bn(s, n, r), xs(s, n, r)), n = { cache: xu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Vw(e, n, r) {
    var s = Mn();
    r = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ro(e) ? Qp(n, r) : (r = cu(e, n, r, s), r !== null && (bn(r, e, s), Zp(r, n, s)));
  }
  function Kp(e, n, r) {
    var s = Mn();
    Ns(e, n, r, s);
  }
  function Ns(e, n, r, s) {
    var u = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ro(e)) Qp(n, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var x = n.lastRenderedState, E = f(x, r);
          if (u.hasEagerState = !0, u.eagerState = E, jn(E, x))
            return Bl(e, n, u, 0), ft === null && Ul(), !1;
        } catch {
        } finally {
        }
      if (r = cu(e, n, u, s), r !== null)
        return bn(r, e, s), Zp(r, n, s), !0;
    }
    return !1;
  }
  function Gu(e, n, r, s) {
    if (s = {
      lane: 2,
      revertLane: Ed(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ro(e)) {
      if (n) throw Error(l(479));
    } else
      n = cu(
        e,
        r,
        s,
        2
      ), n !== null && bn(n, e, 2);
  }
  function ro(e) {
    var n = e.alternate;
    return e === Ue || n !== null && n === Ue;
  }
  function Qp(e, n) {
    Si = Zl = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function Zp(e, n, r) {
    if ((r & 4194048) !== 0) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, rn(e, r);
    }
  }
  var Ts = {
    readContext: tn,
    use: eo,
    useCallback: Et,
    useContext: Et,
    useEffect: Et,
    useImperativeHandle: Et,
    useLayoutEffect: Et,
    useInsertionEffect: Et,
    useMemo: Et,
    useReducer: Et,
    useRef: Et,
    useState: Et,
    useDebugValue: Et,
    useDeferredValue: Et,
    useTransition: Et,
    useSyncExternalStore: Et,
    useId: Et,
    useHostTransitionStatus: Et,
    useFormState: Et,
    useActionState: Et,
    useOptimistic: Et,
    useMemoCache: Et,
    useCacheRefresh: Et
  };
  Ts.useEffectEvent = Et;
  var Jp = {
    readContext: tn,
    use: eo,
    useCallback: function(e, n) {
      return dn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: tn,
    useEffect: Op,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, no(
        4194308,
        4,
        $p.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return no(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      no(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = dn();
      n = n === void 0 ? null : n;
      var s = e();
      if ($r) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return r.memoizedState = [s, n], s;
    },
    useReducer: function(e, n, r) {
      var s = dn();
      if (r !== void 0) {
        var u = r(n);
        if ($r) {
          Tt(!0);
          try {
            r(n);
          } finally {
            Tt(!1);
          }
        }
      } else u = n;
      return s.memoizedState = s.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, s.queue = e, e = e.dispatch = Vw.bind(
        null,
        Ue,
        e
      ), [s.memoizedState, e];
    },
    useRef: function(e) {
      var n = dn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = $u(e);
      var n = e.queue, r = Kp.bind(null, Ue, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: qu,
    useDeferredValue: function(e, n) {
      var r = dn();
      return Iu(r, e, n);
    },
    useTransition: function() {
      var e = $u(!1);
      return e = Fp.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), dn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var s = Ue, u = dn();
      if (Ke) {
        if (r === void 0)
          throw Error(l(407));
        r = r();
      } else {
        if (r = n(), ft === null)
          throw Error(l(349));
        (Xe & 127) !== 0 || bp(s, n, r);
      }
      u.memoizedState = r;
      var f = { value: r, getSnapshot: n };
      return u.queue = f, Op(Sp.bind(null, s, f, e), [
        e
      ]), s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        xp.bind(
          null,
          s,
          f,
          r,
          n
        ),
        null
      ), r;
    },
    useId: function() {
      var e = dn(), n = ft.identifierPrefix;
      if (Ke) {
        var r = da, s = ua;
        r = (s & ~(1 << 32 - Yt(s) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = Jl++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = zw++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Yu,
    useFormState: _p,
    useActionState: _p,
    useOptimistic: function(e) {
      var n = dn();
      n.memoizedState = n.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = Gu.bind(
        null,
        Ue,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Lu,
    useCacheRefresh: function() {
      return dn().memoizedState = $w.bind(
        null,
        Ue
      );
    },
    useEffectEvent: function(e) {
      var n = dn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((tt & 2) !== 0)
          throw Error(l(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Xu = {
    readContext: tn,
    use: eo,
    useCallback: Hp,
    useContext: tn,
    useEffect: Hu,
    useImperativeHandle: Vp,
    useInsertionEffect: Up,
    useLayoutEffect: Bp,
    useMemo: qp,
    useReducer: to,
    useRef: kp,
    useState: function() {
      return to(Ta);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return Ip(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = to(Ta)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Es(e),
        n
      ];
    },
    useSyncExternalStore: yp,
    useId: Xp,
    useHostTransitionStatus: Yu,
    useFormState: Ap,
    useActionState: Ap,
    useOptimistic: function(e, n) {
      var r = Mt();
      return Ep(r, lt, e, n);
    },
    useMemoCache: Lu,
    useCacheRefresh: Pp
  };
  Xu.useEffectEvent = Lp;
  var Wp = {
    readContext: tn,
    use: eo,
    useCallback: Hp,
    useContext: tn,
    useEffect: Hu,
    useImperativeHandle: Vp,
    useInsertionEffect: Up,
    useLayoutEffect: Bp,
    useMemo: qp,
    useReducer: Bu,
    useRef: kp,
    useState: function() {
      return Bu(Ta);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return lt === null ? Iu(r, e, n) : Ip(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Bu(Ta)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Es(e),
        n
      ];
    },
    useSyncExternalStore: yp,
    useId: Xp,
    useHostTransitionStatus: Yu,
    useFormState: zp,
    useActionState: zp,
    useOptimistic: function(e, n) {
      var r = Mt();
      return lt !== null ? Ep(r, lt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Lu,
    useCacheRefresh: Pp
  };
  Wp.useEffectEvent = Lp;
  function Pu(e, n, r, s) {
    n = e.memoizedState, r = r(s, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Ku = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), u = Ka(s);
      u.payload = n, r != null && (u.callback = r), n = Qa(e, u, s), n !== null && (bn(n, e, s), xs(n, e, s));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), u = Ka(s);
      u.tag = 1, u.payload = n, r != null && (u.callback = r), n = Qa(e, u, s), n !== null && (bn(n, e, s), xs(n, e, s));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Mn(), s = Ka(r);
      s.tag = 2, n != null && (s.callback = n), n = Qa(e, s, r), n !== null && (bn(n, e, r), xs(n, e, r));
    }
  };
  function ev(e, n, r, s, u, f, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, f, x) : n.prototype && n.prototype.isPureReactComponent ? !fs(r, s) || !fs(u, f) : !0;
  }
  function tv(e, n, r, s) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, s), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, s), n.state !== e && Ku.enqueueReplaceState(n, n.state, null);
  }
  function Vr(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    }
    if (e = e.defaultProps) {
      r === n && (r = v({}, r));
      for (var u in e)
        r[u] === void 0 && (r[u] = e[u]);
    }
    return r;
  }
  function nv(e) {
    Ll(e);
  }
  function av(e) {
    console.error(e);
  }
  function rv(e) {
    Ll(e);
  }
  function io(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function iv(e, n, r) {
    try {
      var s = e.onCaughtError;
      s(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Qu(e, n, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      io(e, n);
    }, r;
  }
  function sv(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function lv(e, n, r, s) {
    var u = r.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = s.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        iv(n, r, s);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      iv(n, r, s), typeof u != "function" && (nr === null ? nr = /* @__PURE__ */ new Set([this]) : nr.add(this));
      var E = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Hw(e, n, r, s, u) {
    if (r.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (n = r.alternate, n !== null && pi(
        n,
        r,
        u,
        !0
      ), r = Nn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return qn === null ? yo() : r.alternate === null && Nt === 0 && (Nt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = u, s === Gl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([s]) : n.add(s), Sd(e, s, u)), !1;
          case 22:
            return r.flags |= 65536, s === Gl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([s]) : r.add(s)), Sd(e, s, u)), !1;
        }
        throw Error(l(435, r.tag));
      }
      return Sd(e, s, u), yo(), !1;
    }
    if (Ke)
      return n = Nn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, s !== pu && (e = Error(l(422), { cause: s }), ps(Bn(e, r)))) : (s !== pu && (n = Error(l(423), {
        cause: s
      }), ps(
        Bn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, s = Bn(s, r), u = Qu(
        e.stateNode,
        s,
        u
      ), Tu(e, u), Nt !== 4 && (Nt = 2)), !1;
    var f = Error(l(520), { cause: s });
    if (f = Bn(f, r), ks === null ? ks = [f] : ks.push(f), Nt !== 4 && (Nt = 2), n === null) return !0;
    s = Bn(s, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = u & -u, r.lanes |= e, e = Qu(r.stateNode, s, e), Tu(r, e), !1;
        case 1:
          if (n = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (nr === null || !nr.has(f))))
            return r.flags |= 65536, u &= -u, r.lanes |= u, u = sv(u), lv(
              u,
              e,
              r,
              s
            ), Tu(r, u), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Zu = Error(l(461)), Ut = !1;
  function nn(e, n, r, s) {
    n.child = e === null ? dp(n, null, r, s) : Br(
      n,
      e.child,
      r,
      s
    );
  }
  function ov(e, n, r, s, u) {
    r = r.render;
    var f = n.ref;
    if ("ref" in s) {
      var x = {};
      for (var E in s)
        E !== "ref" && (x[E] = s[E]);
    } else x = s;
    return kr(n), s = Du(
      e,
      n,
      r,
      x,
      f,
      u
    ), E = zu(), e !== null && !Ut ? (ku(e, n, u), Ca(e, n, u)) : (Ke && E && hu(n), n.flags |= 1, nn(e, n, s, u), n.child);
  }
  function cv(e, n, r, s, u) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !uu(f) && f.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = f, uv(
        e,
        n,
        f,
        s,
        u
      )) : (e = Vl(
        r.type,
        null,
        s,
        n,
        n.mode,
        u
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !id(e, u)) {
      var x = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : fs, r(x, s) && e.ref === n.ref)
        return Ca(e, n, u);
    }
    return n.flags |= 1, e = Sa(f, s), e.ref = n.ref, e.return = n, n.child = e;
  }
  function uv(e, n, r, s, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (fs(f, s) && e.ref === n.ref)
        if (Ut = !1, n.pendingProps = s = f, id(e, u))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return n.lanes = e.lanes, Ca(e, n, u);
    }
    return Ju(
      e,
      n,
      r,
      s,
      u
    );
  }
  function dv(e, n, r, s) {
    var u = s.children, f = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), s.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | r : r, e !== null) {
          for (s = n.child = e.child, u = 0; s !== null; )
            u = u | s.lanes | s.childLanes, s = s.sibling;
          s = u & ~f;
        } else s = 0, n.child = null;
        return fv(
          e,
          n,
          f,
          r,
          s
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Fl(
          n,
          f !== null ? f.cachePool : null
        ), f !== null ? mp(n, f) : Ru(), pp(n);
      else
        return s = n.lanes = 536870912, fv(
          e,
          n,
          f !== null ? f.baseLanes | r : r,
          r,
          s
        );
    } else
      f !== null ? (Fl(n, f.cachePool), mp(n, f), Ja(), n.memoizedState = null) : (e !== null && Fl(n, null), Ru(), Ja());
    return nn(e, n, u, r), n.child;
  }
  function Cs(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function fv(e, n, r, s, u) {
    var f = wu();
    return f = f === null ? null : { parent: Ot._currentValue, pool: f }, n.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Fl(n, null), Ru(), pp(n), e !== null && pi(e, n, s, !0), n.childLanes = u, null;
  }
  function so(e, n) {
    return n = oo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function hv(e, n, r) {
    return Br(n, e.child, null, r), e = so(n, n.pendingProps), e.flags |= 2, Tn(n), n.memoizedState = null, e;
  }
  function qw(e, n, r) {
    var s = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Ke) {
        if (s.mode === "hidden")
          return e = so(n, s), n.lanes = 536870912, Cs(null, e);
        if (_u(n), (e = gt) ? (e = Ng(
          e,
          Hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Qm(e), r.return = n, n.child = r, en = n, gt = null)) : e = null, e === null) throw Ga(n);
        return n.lanes = 536870912, null;
      }
      return so(n, s);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var x = f.dehydrated;
      if (_u(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = hv(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ut || pi(e, n, r, !1), u = (r & e.childLanes) !== 0, Ut || u) {
        if (s = ft, s !== null && (x = A(s, r), x !== 0 && x !== f.retryLane))
          throw f.retryLane = x, _r(e, x), bn(s, e, x), Zu;
        yo(), n = hv(
          e,
          n,
          r
        );
      } else
        e = f.treeContext, gt = In(x.nextSibling), en = n, Ke = !0, Ya = null, Hn = !1, e !== null && Wm(n, e), n = so(n, s), n.flags |= 4096;
      return n;
    }
    return e = Sa(e.child, {
      mode: s.mode,
      children: s.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function lo(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(l(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function Ju(e, n, r, s, u) {
    return kr(n), r = Du(
      e,
      n,
      r,
      s,
      void 0,
      u
    ), s = zu(), e !== null && !Ut ? (ku(e, n, u), Ca(e, n, u)) : (Ke && s && hu(n), n.flags |= 1, nn(e, n, r, u), n.child);
  }
  function mv(e, n, r, s, u, f) {
    return kr(n), n.updateQueue = null, r = gp(
      n,
      s,
      r,
      u
    ), vp(e), s = zu(), e !== null && !Ut ? (ku(e, n, f), Ca(e, n, f)) : (Ke && s && hu(n), n.flags |= 1, nn(e, n, r, f), n.child);
  }
  function pv(e, n, r, s, u) {
    if (kr(n), n.stateNode === null) {
      var f = di, x = r.contextType;
      typeof x == "object" && x !== null && (f = tn(x)), f = new r(s, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Ku, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = s, f.state = n.memoizedState, f.refs = {}, Eu(n), x = r.contextType, f.context = typeof x == "object" && x !== null ? tn(x) : di, f.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (Pu(
        n,
        r,
        x,
        s
      ), f.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (x = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), x !== f.state && Ku.enqueueReplaceState(f, f.state, null), ws(n, s, f, u), Ss(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !0;
    } else if (e === null) {
      f = n.stateNode;
      var E = n.memoizedProps, k = Vr(r, E);
      f.props = k;
      var P = f.context, re = r.contextType;
      x = di, typeof re == "object" && re !== null && (x = tn(re));
      var ce = r.getDerivedStateFromProps;
      re = typeof ce == "function" || typeof f.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, re || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (E || P !== x) && tv(
        n,
        f,
        s,
        x
      ), Pa = !1;
      var Z = n.memoizedState;
      f.state = Z, ws(n, s, f, u), Ss(), P = n.memoizedState, E || Z !== P || Pa ? (typeof ce == "function" && (Pu(
        n,
        r,
        ce,
        s
      ), P = n.memoizedState), (k = Pa || ev(
        n,
        r,
        k,
        s,
        Z,
        P,
        x
      )) ? (re || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = s, n.memoizedState = P), f.props = s, f.state = P, f.context = x, s = k) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !1);
    } else {
      f = n.stateNode, Nu(e, n), x = n.memoizedProps, re = Vr(r, x), f.props = re, ce = n.pendingProps, Z = f.context, P = r.contextType, k = di, typeof P == "object" && P !== null && (k = tn(P)), E = r.getDerivedStateFromProps, (P = typeof E == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x !== ce || Z !== k) && tv(
        n,
        f,
        s,
        k
      ), Pa = !1, Z = n.memoizedState, f.state = Z, ws(n, s, f, u), Ss();
      var te = n.memoizedState;
      x !== ce || Z !== te || Pa || e !== null && e.dependencies !== null && ql(e.dependencies) ? (typeof E == "function" && (Pu(
        n,
        r,
        E,
        s
      ), te = n.memoizedState), (re = Pa || ev(
        n,
        r,
        re,
        s,
        Z,
        te,
        k
      ) || e !== null && e.dependencies !== null && ql(e.dependencies)) ? (P || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(s, te, k), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        s,
        te,
        k
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && Z === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && Z === e.memoizedState || (n.flags |= 1024), n.memoizedProps = s, n.memoizedState = te), f.props = s, f.state = te, f.context = k, s = re) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && Z === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && Z === e.memoizedState || (n.flags |= 1024), s = !1);
    }
    return f = s, lo(e, n), s = (n.flags & 128) !== 0, f || s ? (f = n.stateNode, r = s && typeof r.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && s ? (n.child = Br(
      n,
      e.child,
      null,
      u
    ), n.child = Br(
      n,
      null,
      r,
      u
    )) : nn(e, n, r, u), n.memoizedState = f.state, e = n.child) : e = Ca(
      e,
      n,
      u
    ), e;
  }
  function vv(e, n, r, s) {
    return Dr(), n.flags |= 256, nn(e, n, r, s), n.child;
  }
  var Wu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ed(e) {
    return { baseLanes: e, cachePool: ip() };
  }
  function td(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Rn), e;
  }
  function gv(e, n, r) {
    var s = n.pendingProps, u = !1, f = (n.flags & 128) !== 0, x;
    if ((x = f) || (x = e !== null && e.memoizedState === null ? !1 : (Rt.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Za(n) : Ja(), (e = gt) ? (e = Ng(
          e,
          Hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Qm(e), r.return = n, n.child = r, en = n, gt = null)) : e = null, e === null) throw Ga(n);
        return Ud(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = s.children;
      return s = s.fallback, u ? (Ja(), u = n.mode, E = oo(
        { mode: "hidden", children: E },
        u
      ), s = Ar(
        s,
        u,
        r,
        null
      ), E.return = n, s.return = n, E.sibling = s, n.child = E, s = n.child, s.memoizedState = ed(r), s.childLanes = td(
        e,
        x,
        r
      ), n.memoizedState = Wu, Cs(null, s)) : (Za(n), nd(n, E));
    }
    var k = e.memoizedState;
    if (k !== null && (E = k.dehydrated, E !== null)) {
      if (f)
        n.flags & 256 ? (Za(n), n.flags &= -257, n = ad(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (Ja(), n.child = e.child, n.flags |= 128, n = null) : (Ja(), E = s.fallback, u = n.mode, s = oo(
          { mode: "visible", children: s.children },
          u
        ), E = Ar(
          E,
          u,
          r,
          null
        ), E.flags |= 2, s.return = n, E.return = n, s.sibling = E, n.child = s, Br(
          n,
          e.child,
          null,
          r
        ), s = n.child, s.memoizedState = ed(r), s.childLanes = td(
          e,
          x,
          r
        ), n.memoizedState = Wu, n = Cs(null, s));
      else if (Za(n), Ud(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var P = x.dgst;
        x = P, s = Error(l(419)), s.stack = "", s.digest = x, ps({ value: s, source: null, stack: null }), n = ad(
          e,
          n,
          r
        );
      } else if (Ut || pi(e, n, r, !1), x = (r & e.childLanes) !== 0, Ut || x) {
        if (x = ft, x !== null && (s = A(x, r), s !== 0 && s !== k.retryLane))
          throw k.retryLane = s, _r(e, s), bn(x, e, s), Zu;
        Ld(E) || yo(), n = ad(
          e,
          n,
          r
        );
      } else
        Ld(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = k.treeContext, gt = In(
          E.nextSibling
        ), en = n, Ke = !0, Ya = null, Hn = !1, e !== null && Wm(n, e), n = nd(
          n,
          s.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (Ja(), E = s.fallback, u = n.mode, k = e.child, P = k.sibling, s = Sa(k, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = k.subtreeFlags & 65011712, P !== null ? E = Sa(
      P,
      E
    ) : (E = Ar(
      E,
      u,
      r,
      null
    ), E.flags |= 2), E.return = n, s.return = n, s.sibling = E, n.child = s, Cs(null, s), s = n.child, E = e.child.memoizedState, E === null ? E = ed(r) : (u = E.cachePool, u !== null ? (k = Ot._currentValue, u = u.parent !== k ? { parent: k, pool: k } : u) : u = ip(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: u
    }), s.memoizedState = E, s.childLanes = td(
      e,
      x,
      r
    ), n.memoizedState = Wu, Cs(e.child, s)) : (Za(n), r = e.child, e = r.sibling, r = Sa(r, {
      mode: "visible",
      children: s.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function nd(e, n) {
    return n = oo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function oo(e, n) {
    return e = En(22, e, null, n), e.lanes = 0, e;
  }
  function ad(e, n, r) {
    return Br(n, e.child, null, r), e = nd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function yv(e, n, r) {
    e.lanes |= n;
    var s = e.alternate;
    s !== null && (s.lanes |= n), yu(e.return, n, r);
  }
  function rd(e, n, r, s, u, f) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: s,
      tail: r,
      tailMode: u,
      treeForkCount: f
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = s, x.tail = r, x.tailMode = u, x.treeForkCount = f);
  }
  function bv(e, n, r) {
    var s = n.pendingProps, u = s.revealOrder, f = s.tail;
    s = s.children;
    var x = Rt.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, Q(Rt, x), nn(e, n, s, r), s = Ke ? ms : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && yv(e, r, n);
        else if (e.tag === 19)
          yv(e, r, n);
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
    switch (u) {
      case "forwards":
        for (r = n.child, u = null; r !== null; )
          e = r.alternate, e !== null && Ql(e) === null && (u = r), r = r.sibling;
        r = u, r === null ? (u = n.child, n.child = null) : (u = r.sibling, r.sibling = null), rd(
          n,
          !1,
          u,
          r,
          f,
          s
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, u = n.child, n.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Ql(e) === null) {
            n.child = u;
            break;
          }
          e = u.sibling, u.sibling = r, r = u, u = e;
        }
        rd(
          n,
          !0,
          r,
          null,
          f,
          s
        );
        break;
      case "together":
        rd(
          n,
          !1,
          null,
          null,
          void 0,
          s
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ca(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), tr |= n.lanes, (r & n.childLanes) === 0)
      if (e !== null) {
        if (pi(
          e,
          n,
          r,
          !1
        ), (r & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(l(153));
    if (n.child !== null) {
      for (e = n.child, r = Sa(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = Sa(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function id(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && ql(e)));
  }
  function Iw(e, n, r) {
    switch (n.tag) {
      case 3:
        Te(n, n.stateNode.containerInfo), Xa(n, Ot, e.memoizedState.cache), Dr();
        break;
      case 27:
      case 5:
        Zt(n);
        break;
      case 4:
        Te(n, n.stateNode.containerInfo);
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
          return n.flags |= 128, _u(n), null;
        break;
      case 13:
        var s = n.memoizedState;
        if (s !== null)
          return s.dehydrated !== null ? (Za(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? gv(e, n, r) : (Za(n), e = Ca(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Za(n);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (s = (r & n.childLanes) !== 0, s || (pi(
          e,
          n,
          r,
          !1
        ), s = (r & n.childLanes) !== 0), u) {
          if (s)
            return bv(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Q(Rt, Rt.current), s) break;
        return null;
      case 22:
        return n.lanes = 0, dv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Ot, e.memoizedState.cache);
    }
    return Ca(e, n, r);
  }
  function xv(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Ut = !0;
      else {
        if (!id(e, r) && (n.flags & 128) === 0)
          return Ut = !1, Iw(
            e,
            n,
            r
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Ke && (n.flags & 1048576) !== 0 && Jm(n, ms, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var s = n.pendingProps;
          if (e = Lr(n.elementType), n.type = e, typeof e == "function")
            uu(e) ? (s = Vr(e, s), n.tag = 1, n = pv(
              null,
              n,
              e,
              s,
              r
            )) : (n.tag = 0, n = Ju(
              null,
              n,
              e,
              s,
              r
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === T) {
                n.tag = 11, n = ov(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              } else if (u === ne) {
                n.tag = 14, n = cv(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              }
            }
            throw n = ue(e) || e, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return Ju(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return s = n.type, u = Vr(
          s,
          n.pendingProps
        ), pv(
          e,
          n,
          s,
          u,
          r
        );
      case 3:
        e: {
          if (Te(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          s = n.pendingProps;
          var f = n.memoizedState;
          u = f.element, Nu(e, n), ws(n, s, null, r);
          var x = n.memoizedState;
          if (s = x.cache, Xa(n, Ot, s), s !== f.cache && bu(
            n,
            [Ot],
            r,
            !0
          ), Ss(), s = x.element, f.isDehydrated)
            if (f = {
              element: s,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
              n = vv(
                e,
                n,
                s,
                r
              );
              break e;
            } else if (s !== u) {
              u = Bn(
                Error(l(424)),
                n
              ), ps(u), n = vv(
                e,
                n,
                s,
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
              for (gt = In(e.firstChild), en = n, Ke = !0, Ya = null, Hn = !0, r = dp(
                n,
                null,
                s,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Dr(), s === u) {
              n = Ca(
                e,
                n,
                r
              );
              break e;
            }
            nn(e, n, s, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return lo(e, n), e === null ? (r = Ag(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : Ke || (r = n.type, e = n.pendingProps, s = No(
          de.current
        ).createElement(r), s[ge] = n, s[ye] = e, an(s, r, e), mt(s), n.stateNode = s) : n.memoizedState = Ag(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Zt(n), e === null && Ke && (s = n.stateNode = Rg(
          n.type,
          n.pendingProps,
          de.current
        ), en = n, Hn = !0, u = gt, sr(n.type) ? (Bd = u, gt = In(s.firstChild)) : gt = u), nn(
          e,
          n,
          n.pendingProps.children,
          r
        ), lo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Ke && ((u = s = gt) && (s = bj(
          s,
          n.type,
          n.pendingProps,
          Hn
        ), s !== null ? (n.stateNode = s, en = n, gt = In(s.firstChild), Hn = !1, u = !0) : u = !1), u || Ga(n)), Zt(n), u = n.type, f = n.pendingProps, x = e !== null ? e.memoizedProps : null, s = f.children, zd(u, f) ? s = null : x !== null && zd(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Du(
          e,
          n,
          kw,
          null,
          null,
          r
        ), qs._currentValue = u), lo(e, n), nn(e, n, s, r), n.child;
      case 6:
        return e === null && Ke && ((e = r = gt) && (r = xj(
          r,
          n.pendingProps,
          Hn
        ), r !== null ? (n.stateNode = r, en = n, gt = null, e = !0) : e = !1), e || Ga(n)), null;
      case 13:
        return gv(e, n, r);
      case 4:
        return Te(
          n,
          n.stateNode.containerInfo
        ), s = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          s,
          r
        ) : nn(e, n, s, r), n.child;
      case 11:
        return ov(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return nn(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return nn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return nn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return s = n.pendingProps, Xa(n, n.type, s.value), nn(e, n, s.children, r), n.child;
      case 9:
        return u = n.type._context, s = n.pendingProps.children, kr(n), u = tn(u), s = s(u), n.flags |= 1, nn(e, n, s, r), n.child;
      case 14:
        return cv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return uv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return bv(e, n, r);
      case 31:
        return qw(e, n, r);
      case 22:
        return dv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return kr(n), s = tn(Ot), e === null ? (u = wu(), u === null && (u = ft, f = xu(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= r), u = f), n.memoizedState = { parent: s, cache: u }, Eu(n), Xa(n, Ot, u)) : ((e.lanes & r) !== 0 && (Nu(e, n), ws(n, null, null, r), Ss()), u = e.memoizedState, f = n.memoizedState, u.parent !== s ? (u = { parent: s, cache: s }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Xa(n, Ot, s)) : (s = f.cache, Xa(n, Ot, s), s !== u.cache && bu(
          n,
          [Ot],
          r,
          !0
        ))), nn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function Ra(e) {
    e.flags |= 4;
  }
  function sd(e, n, r, s, u) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Xv()) e.flags |= 8192;
        else
          throw Ur = Gl, ju;
    } else e.flags &= -16777217;
  }
  function Sv(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Lg(n))
      if (Xv()) e.flags |= 8192;
      else
        throw Ur = Gl, ju;
  }
  function co(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Gt() : 536870912, e.lanes |= n, Ci |= n);
  }
  function Rs(e, n) {
    if (!Ke)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var s = null; r !== null; )
            r.alternate !== null && (s = r), r = r.sibling;
          s === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : s.sibling = null;
      }
  }
  function yt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, s = 0;
    if (n)
      for (var u = e.child; u !== null; )
        r |= u.lanes | u.childLanes, s |= u.subtreeFlags & 65011712, s |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        r |= u.lanes | u.childLanes, s |= u.subtreeFlags, s |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= s, e.childLanes = r, n;
  }
  function Fw(e, n, r) {
    var s = n.pendingProps;
    switch (mu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return yt(n), null;
      case 1:
        return yt(n), null;
      case 3:
        return r = n.stateNode, s = null, e !== null && (s = e.memoizedState.cache), n.memoizedState.cache !== s && (n.flags |= 2048), Ea(Ot), Ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (mi(n) ? Ra(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, vu())), yt(n), null;
      case 26:
        var u = n.type, f = n.memoizedState;
        return e === null ? (Ra(n), f !== null ? (yt(n), Sv(n, f)) : (yt(n), sd(
          n,
          u,
          null,
          s,
          r
        ))) : f ? f !== e.memoizedState ? (Ra(n), yt(n), Sv(n, f)) : (yt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== s && Ra(n), yt(n), sd(
          n,
          u,
          e,
          s,
          r
        )), null;
      case 27:
        if (Pt(n), r = de.current, u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ra(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          e = F.current, mi(n) ? ep(n) : (e = Rg(u, s, r), n.stateNode = e, Ra(n));
        }
        return yt(n), null;
      case 5:
        if (Pt(n), u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ra(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          if (f = F.current, mi(n))
            ep(n);
          else {
            var x = No(
              de.current
            );
            switch (f) {
              case 1:
                f = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                f = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    f = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    f = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    f = x.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof s.is == "string" ? x.createElement("select", {
                      is: s.is
                    }) : x.createElement("select"), s.multiple ? f.multiple = !0 : s.size && (f.size = s.size);
                    break;
                  default:
                    f = typeof s.is == "string" ? x.createElement(u, { is: s.is }) : x.createElement(u);
                }
            }
            f[ge] = n, f[ye] = s;
            e: for (x = n.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                f.appendChild(x.stateNode);
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
            n.stateNode = f;
            e: switch (an(f, u, s), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1;
            }
            s && Ra(n);
          }
        }
        return yt(n), sd(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          r
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== s && Ra(n);
        else {
          if (typeof s != "string" && n.stateNode === null)
            throw Error(l(166));
          if (e = de.current, mi(n)) {
            if (e = n.stateNode, r = n.memoizedProps, s = null, u = en, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  s = u.memoizedProps;
              }
            e[ge] = n, e = !!(e.nodeValue === r || s !== null && s.suppressHydrationWarning === !0 || gg(e.nodeValue, r)), e || Ga(n, !0);
          } else
            e = No(e).createTextNode(
              s
            ), e[ge] = n, n.stateNode = e;
        }
        return yt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (s = mi(n), r !== null) {
            if (e === null) {
              if (!s) throw Error(l(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[ge] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), e = !1;
          } else
            r = vu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return yt(n), null;
      case 13:
        if (s = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = mi(n), s !== null && s.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(l(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(l(317));
              u[ge] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), u = !1;
          } else
            u = vu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
        }
        return Tn(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = s !== null, e = e !== null && e.memoizedState !== null, r && (s = n.child, u = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (u = s.alternate.memoizedState.cachePool.pool), f = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (f = s.memoizedState.cachePool.pool), f !== u && (s.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), co(n, n.updateQueue), yt(n), null);
      case 4:
        return Ve(), e === null && Rd(n.stateNode.containerInfo), yt(n), null;
      case 10:
        return Ea(n.type), yt(n), null;
      case 19:
        if (J(Rt), s = n.memoizedState, s === null) return yt(n), null;
        if (u = (n.flags & 128) !== 0, f = s.rendering, f === null)
          if (u) Rs(s, !1);
          else {
            if (Nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = Ql(e), f !== null) {
                  for (n.flags |= 128, Rs(s, !1), e = f.updateQueue, n.updateQueue = e, co(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    Km(r, e), r = r.sibling;
                  return Q(
                    Rt,
                    Rt.current & 1 | 2
                  ), Ke && wa(n, s.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            s.tail !== null && qt() > po && (n.flags |= 128, u = !0, Rs(s, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Ql(f), e !== null) {
              if (n.flags |= 128, u = !0, e = e.updateQueue, n.updateQueue = e, co(n, e), Rs(s, !0), s.tail === null && s.tailMode === "hidden" && !f.alternate && !Ke)
                return yt(n), null;
            } else
              2 * qt() - s.renderingStartTime > po && r !== 536870912 && (n.flags |= 128, u = !0, Rs(s, !1), n.lanes = 4194304);
          s.isBackwards ? (f.sibling = n.child, n.child = f) : (e = s.last, e !== null ? e.sibling = f : n.child = f, s.last = f);
        }
        return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = qt(), e.sibling = null, r = Rt.current, Q(
          Rt,
          u ? r & 1 | 2 : r & 1
        ), Ke && wa(n, s.treeForkCount), e) : (yt(n), null);
      case 22:
      case 23:
        return Tn(n), Mu(), s = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== s && (n.flags |= 8192) : s && (n.flags |= 8192), s ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (yt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : yt(n), r = n.updateQueue, r !== null && co(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== r && (n.flags |= 2048), e !== null && J(Or), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ea(Ot), yt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function Yw(e, n) {
    switch (mu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ea(Ot), Ve(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Pt(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Tn(n), n.alternate === null)
            throw Error(l(340));
          Dr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Tn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          Dr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return J(Rt), null;
      case 4:
        return Ve(), null;
      case 10:
        return Ea(n.type), null;
      case 22:
      case 23:
        return Tn(n), Mu(), e !== null && J(Or), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ea(Ot), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function wv(e, n) {
    switch (mu(n), n.tag) {
      case 3:
        Ea(Ot), Ve();
        break;
      case 26:
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        Ve();
        break;
      case 31:
        n.memoizedState !== null && Tn(n);
        break;
      case 13:
        Tn(n);
        break;
      case 19:
        J(Rt);
        break;
      case 10:
        Ea(n.type);
        break;
      case 22:
      case 23:
        Tn(n), Mu(), e !== null && J(Or);
        break;
      case 24:
        Ea(Ot);
    }
  }
  function Ms(e, n) {
    try {
      var r = n.updateQueue, s = r !== null ? r.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        r = u;
        do {
          if ((r.tag & e) === e) {
            s = void 0;
            var f = r.create, x = r.inst;
            s = f(), x.destroy = s;
          }
          r = r.next;
        } while (r !== u);
      }
    } catch (E) {
      rt(n, n.return, E);
    }
  }
  function Wa(e, n, r) {
    try {
      var s = n.updateQueue, u = s !== null ? s.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        s = f;
        do {
          if ((s.tag & e) === e) {
            var x = s.inst, E = x.destroy;
            if (E !== void 0) {
              x.destroy = void 0, u = n;
              var k = r, P = E;
              try {
                P();
              } catch (re) {
                rt(
                  u,
                  k,
                  re
                );
              }
            }
          }
          s = s.next;
        } while (s !== f);
      }
    } catch (re) {
      rt(n, n.return, re);
    }
  }
  function jv(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        hp(n, r);
      } catch (s) {
        rt(e, e.return, s);
      }
    }
  }
  function Ev(e, n, r) {
    r.props = Vr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (s) {
      rt(e, n, s);
    }
  }
  function _s(e, n) {
    try {
      var r = e.ref;
      if (r !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var s = e.stateNode;
            break;
          case 30:
            s = e.stateNode;
            break;
          default:
            s = e.stateNode;
        }
        typeof r == "function" ? e.refCleanup = r(s) : r.current = s;
      }
    } catch (u) {
      rt(e, n, u);
    }
  }
  function fa(e, n) {
    var r = e.ref, s = e.refCleanup;
    if (r !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (u) {
          rt(e, n, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (u) {
          rt(e, n, u);
        }
      else r.current = null;
  }
  function Nv(e) {
    var n = e.type, r = e.memoizedProps, s = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && s.focus();
          break e;
        case "img":
          r.src ? s.src = r.src : r.srcSet && (s.srcset = r.srcSet);
      }
    } catch (u) {
      rt(e, e.return, u);
    }
  }
  function ld(e, n, r) {
    try {
      var s = e.stateNode;
      hj(s, e.type, r, n), s[ye] = n;
    } catch (u) {
      rt(e, e.return, u);
    }
  }
  function Tv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && sr(e.type) || e.tag === 4;
  }
  function od(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Tv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && sr(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function cd(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = ba));
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (cd(e, n, r), e = e.sibling; e !== null; )
        cd(e, n, r), e = e.sibling;
  }
  function uo(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (uo(e, n, r), e = e.sibling; e !== null; )
        uo(e, n, r), e = e.sibling;
  }
  function Cv(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var s = e.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      an(n, s, r), n[ge] = e, n[ye] = r;
    } catch (f) {
      rt(e, e.return, f);
    }
  }
  var Ma = !1, Bt = !1, ud = !1, Rv = typeof WeakSet == "function" ? WeakSet : Set, Qt = null;
  function Gw(e, n) {
    if (e = e.containerInfo, Ad = Do, e = Vm(e), au(e)) {
      if ("selectionStart" in e)
        var r = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var s = r.getSelection && r.getSelection();
          if (s && s.rangeCount !== 0) {
            r = s.anchorNode;
            var u = s.anchorOffset, f = s.focusNode;
            s = s.focusOffset;
            try {
              r.nodeType, f.nodeType;
            } catch {
              r = null;
              break e;
            }
            var x = 0, E = -1, k = -1, P = 0, re = 0, ce = e, Z = null;
            t: for (; ; ) {
              for (var te; ce !== r || u !== 0 && ce.nodeType !== 3 || (E = x + u), ce !== f || s !== 0 && ce.nodeType !== 3 || (k = x + s), ce.nodeType === 3 && (x += ce.nodeValue.length), (te = ce.firstChild) !== null; )
                Z = ce, ce = te;
              for (; ; ) {
                if (ce === e) break t;
                if (Z === r && ++P === u && (E = x), Z === f && ++re === s && (k = x), (te = ce.nextSibling) !== null) break;
                ce = Z, Z = ce.parentNode;
              }
              ce = te;
            }
            r = E === -1 || k === -1 ? null : { start: E, end: k };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Dd = { focusedElem: e, selectionRange: r }, Do = !1, Qt = n; Qt !== null; )
      if (n = Qt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, Qt = e;
      else
        for (; Qt !== null; ) {
          switch (n = Qt, f = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  u = e[r], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, r = n, u = f.memoizedProps, f = f.memoizedState, s = r.stateNode;
                try {
                  var Se = Vr(
                    r.type,
                    u
                  );
                  e = s.getSnapshotBeforeUpdate(
                    Se,
                    f
                  ), s.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ae) {
                  rt(
                    r,
                    r.return,
                    Ae
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, r = e.nodeType, r === 9)
                  Od(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Od(e);
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
            e.return = n.return, Qt = e;
            break;
          }
          Qt = n.return;
        }
  }
  function Mv(e, n, r) {
    var s = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        Aa(e, r), s & 4 && Ms(5, r);
        break;
      case 1:
        if (Aa(e, r), s & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              rt(r, r.return, x);
            }
          else {
            var u = Vr(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              rt(
                r,
                r.return,
                x
              );
            }
          }
        s & 64 && jv(r), s & 512 && _s(r, r.return);
        break;
      case 3:
        if (Aa(e, r), s & 64 && (e = r.updateQueue, e !== null)) {
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
            hp(e, n);
          } catch (x) {
            rt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && s & 4 && Cv(r);
      case 26:
      case 5:
        Aa(e, r), n === null && s & 4 && Nv(r), s & 512 && _s(r, r.return);
        break;
      case 12:
        Aa(e, r);
        break;
      case 31:
        Aa(e, r), s & 4 && Dv(e, r);
        break;
      case 13:
        Aa(e, r), s & 4 && zv(e, r), s & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = tj.bind(
          null,
          r
        ), Sj(e, r))));
        break;
      case 22:
        if (s = r.memoizedState !== null || Ma, !s) {
          n = n !== null && n.memoizedState !== null || Bt, u = Ma;
          var f = Bt;
          Ma = s, (Bt = n) && !f ? Da(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : Aa(e, r), Ma = u, Bt = f;
        }
        break;
      case 30:
        break;
      default:
        Aa(e, r);
    }
  }
  function _v(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, _v(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && dt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var wt = null, pn = !1;
  function _a(e, n, r) {
    for (r = r.child; r !== null; )
      Av(e, n, r), r = r.sibling;
  }
  function Av(e, n, r) {
    if (Jt && typeof Jt.onCommitFiberUnmount == "function")
      try {
        Jt.onCommitFiberUnmount(Zn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Bt || fa(r, n), _a(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Bt || fa(r, n);
        var s = wt, u = pn;
        sr(r.type) && (wt = r.stateNode, pn = !1), _a(
          e,
          n,
          r
        ), $s(r.stateNode), wt = s, pn = u;
        break;
      case 5:
        Bt || fa(r, n);
      case 6:
        if (s = wt, u = pn, wt = null, _a(
          e,
          n,
          r
        ), wt = s, pn = u, wt !== null)
          if (pn)
            try {
              (wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(r.stateNode);
            } catch (f) {
              rt(
                r,
                n,
                f
              );
            }
          else
            try {
              wt.removeChild(r.stateNode);
            } catch (f) {
              rt(
                r,
                n,
                f
              );
            }
        break;
      case 18:
        wt !== null && (pn ? (e = wt, jg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Oi(e)) : jg(wt, r.stateNode));
        break;
      case 4:
        s = wt, u = pn, wt = r.stateNode.containerInfo, pn = !0, _a(
          e,
          n,
          r
        ), wt = s, pn = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wa(2, r, n), Bt || Wa(4, r, n), _a(
          e,
          n,
          r
        );
        break;
      case 1:
        Bt || (fa(r, n), s = r.stateNode, typeof s.componentWillUnmount == "function" && Ev(
          r,
          n,
          s
        )), _a(
          e,
          n,
          r
        );
        break;
      case 21:
        _a(
          e,
          n,
          r
        );
        break;
      case 22:
        Bt = (s = Bt) || r.memoizedState !== null, _a(
          e,
          n,
          r
        ), Bt = s;
        break;
      default:
        _a(
          e,
          n,
          r
        );
    }
  }
  function Dv(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Oi(e);
      } catch (r) {
        rt(n, n.return, r);
      }
    }
  }
  function zv(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Oi(e);
      } catch (r) {
        rt(n, n.return, r);
      }
  }
  function Xw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Rv()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Rv()), n;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function fo(e, n) {
    var r = Xw(e);
    n.forEach(function(s) {
      if (!r.has(s)) {
        r.add(s);
        var u = nj.bind(null, e, s);
        s.then(u, u);
      }
    });
  }
  function vn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var s = 0; s < r.length; s++) {
        var u = r[s], f = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (sr(E.type)) {
                wt = E.stateNode, pn = !1;
                break e;
              }
              break;
            case 5:
              wt = E.stateNode, pn = !1;
              break e;
            case 3:
            case 4:
              wt = E.stateNode.containerInfo, pn = !0;
              break e;
          }
          E = E.return;
        }
        if (wt === null) throw Error(l(160));
        Av(f, x, u), wt = null, pn = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        kv(n, e), n = n.sibling;
  }
  var ta = null;
  function kv(e, n) {
    var r = e.alternate, s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vn(n, e), gn(e), s & 4 && (Wa(3, e, e.return), Ms(3, e), Wa(5, e, e.return));
        break;
      case 1:
        vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 64 && Ma && (e = e.updateQueue, e !== null && (s = e.callbacks, s !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? s : r.concat(s))));
        break;
      case 26:
        var u = ta;
        if (vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 4) {
          var f = r !== null ? r.memoizedState : null;
          if (s = e.memoizedState, r === null)
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  s = e.type, r = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (s) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[He] || f[ge] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(s), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), an(f, s, r), f[ge] = e, mt(f), s = f;
                      break e;
                    case "link":
                      var x = kg(
                        "link",
                        "href",
                        u
                      ).get(s + (r.href || ""));
                      if (x) {
                        for (var E = 0; E < x.length; E++)
                          if (f = x[E], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(s), an(f, s, r), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (x = kg(
                        "meta",
                        "content",
                        u
                      ).get(s + (r.content || ""))) {
                        for (E = 0; E < x.length; E++)
                          if (f = x[E], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(s), an(f, s, r), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(l(468, s));
                  }
                  f[ge] = e, mt(f), s = f;
                }
                e.stateNode = s;
              } else
                Og(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = zg(
                u,
                s,
                e.memoizedProps
              );
          else
            f !== s ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, s === null ? Og(
              u,
              e.type,
              e.stateNode
            ) : zg(
              u,
              s,
              e.memoizedProps
            )) : s === null && e.stateNode !== null && ld(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), r !== null && s & 4 && ld(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            ri(u, "");
          } catch (Se) {
            rt(e, e.return, Se);
          }
        }
        s & 4 && e.stateNode != null && (u = e.memoizedProps, ld(
          e,
          u,
          r !== null ? r.memoizedProps : u
        )), s & 1024 && (ud = !0);
        break;
      case 6:
        if (vn(n, e), gn(e), s & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          s = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = s;
          } catch (Se) {
            rt(e, e.return, Se);
          }
        }
        break;
      case 3:
        if (Ro = null, u = ta, ta = To(n.containerInfo), vn(n, e), ta = u, gn(e), s & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Oi(n.containerInfo);
          } catch (Se) {
            rt(e, e.return, Se);
          }
        ud && (ud = !1, Ov(e));
        break;
      case 4:
        s = ta, ta = To(
          e.stateNode.containerInfo
        ), vn(n, e), gn(e), ta = s;
        break;
      case 12:
        vn(n, e), gn(e);
        break;
      case 31:
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, fo(e, s)));
        break;
      case 13:
        vn(n, e), gn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (mo = qt()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, fo(e, s)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var k = r !== null && r.memoizedState !== null, P = Ma, re = Bt;
        if (Ma = P || u, Bt = re || k, vn(n, e), Bt = re, Ma = P, gn(e), s & 8192)
          e: for (n = e.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (r === null || k || Ma || Bt || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                k = r = n;
                try {
                  if (f = k.stateNode, u)
                    x = f.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = k.stateNode;
                    var ce = k.memoizedProps.style, Z = ce != null && ce.hasOwnProperty("display") ? ce.display : null;
                    E.style.display = Z == null || typeof Z == "boolean" ? "" : ("" + Z).trim();
                  }
                } catch (Se) {
                  rt(k, k.return, Se);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                k = n;
                try {
                  k.stateNode.nodeValue = u ? "" : k.memoizedProps;
                } catch (Se) {
                  rt(k, k.return, Se);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                k = n;
                try {
                  var te = k.stateNode;
                  u ? Eg(te, !0) : Eg(k.stateNode, !1);
                } catch (Se) {
                  rt(k, k.return, Se);
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
        s & 4 && (s = e.updateQueue, s !== null && (r = s.retryQueue, r !== null && (s.retryQueue = null, fo(e, r))));
        break;
      case 19:
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, fo(e, s)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        vn(n, e), gn(e);
    }
  }
  function gn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, s = e.return; s !== null; ) {
          if (Tv(s)) {
            r = s;
            break;
          }
          s = s.return;
        }
        if (r == null) throw Error(l(160));
        switch (r.tag) {
          case 27:
            var u = r.stateNode, f = od(e);
            uo(e, f, u);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ri(x, ""), r.flags &= -33);
            var E = od(e);
            uo(e, E, x);
            break;
          case 3:
          case 4:
            var k = r.stateNode.containerInfo, P = od(e);
            cd(
              e,
              P,
              k
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (re) {
        rt(e, e.return, re);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Ov(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Ov(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Aa(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Mv(e, n.alternate, n), n = n.sibling;
  }
  function Hr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Wa(4, n, n.return), Hr(n);
          break;
        case 1:
          fa(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Ev(
            n,
            n.return,
            r
          ), Hr(n);
          break;
        case 27:
          $s(n.stateNode);
        case 26:
        case 5:
          fa(n, n.return), Hr(n);
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
  function Da(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var s = n.alternate, u = e, f = n, x = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Da(
            u,
            f,
            r
          ), Ms(4, f);
          break;
        case 1:
          if (Da(
            u,
            f,
            r
          ), s = f, u = s.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (P) {
              rt(s, s.return, P);
            }
          if (s = f, u = s.updateQueue, u !== null) {
            var E = s.stateNode;
            try {
              var k = u.shared.hiddenCallbacks;
              if (k !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < k.length; u++)
                  fp(k[u], E);
            } catch (P) {
              rt(s, s.return, P);
            }
          }
          r && x & 64 && jv(f), _s(f, f.return);
          break;
        case 27:
          Cv(f);
        case 26:
        case 5:
          Da(
            u,
            f,
            r
          ), r && s === null && x & 4 && Nv(f), _s(f, f.return);
          break;
        case 12:
          Da(
            u,
            f,
            r
          );
          break;
        case 31:
          Da(
            u,
            f,
            r
          ), r && x & 4 && Dv(u, f);
          break;
        case 13:
          Da(
            u,
            f,
            r
          ), r && x & 4 && zv(u, f);
          break;
        case 22:
          f.memoizedState === null && Da(
            u,
            f,
            r
          ), _s(f, f.return);
          break;
        case 30:
          break;
        default:
          Da(
            u,
            f,
            r
          );
      }
      n = n.sibling;
    }
  }
  function dd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && vs(r));
  }
  function fd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && vs(e));
  }
  function na(e, n, r, s) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Lv(
          e,
          n,
          r,
          s
        ), n = n.sibling;
  }
  function Lv(e, n, r, s) {
    var u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        na(
          e,
          n,
          r,
          s
        ), u & 2048 && Ms(9, n);
        break;
      case 1:
        na(
          e,
          n,
          r,
          s
        );
        break;
      case 3:
        na(
          e,
          n,
          r,
          s
        ), u & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && vs(e)));
        break;
      case 12:
        if (u & 2048) {
          na(
            e,
            n,
            r,
            s
          ), e = n.stateNode;
          try {
            var f = n.memoizedProps, x = f.id, E = f.onPostCommit;
            typeof E == "function" && E(
              x,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (k) {
            rt(n, n.return, k);
          }
        } else
          na(
            e,
            n,
            r,
            s
          );
        break;
      case 31:
        na(
          e,
          n,
          r,
          s
        );
        break;
      case 13:
        na(
          e,
          n,
          r,
          s
        );
        break;
      case 23:
        break;
      case 22:
        f = n.stateNode, x = n.alternate, n.memoizedState !== null ? f._visibility & 2 ? na(
          e,
          n,
          r,
          s
        ) : As(e, n) : f._visibility & 2 ? na(
          e,
          n,
          r,
          s
        ) : (f._visibility |= 2, Ei(
          e,
          n,
          r,
          s,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && dd(x, n);
        break;
      case 24:
        na(
          e,
          n,
          r,
          s
        ), u & 2048 && fd(n.alternate, n);
        break;
      default:
        na(
          e,
          n,
          r,
          s
        );
    }
  }
  function Ei(e, n, r, s, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var f = e, x = n, E = r, k = s, P = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ei(
            f,
            x,
            E,
            k,
            u
          ), Ms(8, x);
          break;
        case 23:
          break;
        case 22:
          var re = x.stateNode;
          x.memoizedState !== null ? re._visibility & 2 ? Ei(
            f,
            x,
            E,
            k,
            u
          ) : As(
            f,
            x
          ) : (re._visibility |= 2, Ei(
            f,
            x,
            E,
            k,
            u
          )), u && P & 2048 && dd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ei(
            f,
            x,
            E,
            k,
            u
          ), u && P & 2048 && fd(x.alternate, x);
          break;
        default:
          Ei(
            f,
            x,
            E,
            k,
            u
          );
      }
      n = n.sibling;
    }
  }
  function As(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, s = n, u = s.flags;
        switch (s.tag) {
          case 22:
            As(r, s), u & 2048 && dd(
              s.alternate,
              s
            );
            break;
          case 24:
            As(r, s), u & 2048 && fd(s.alternate, s);
            break;
          default:
            As(r, s);
        }
        n = n.sibling;
      }
  }
  var Ds = 8192;
  function Ni(e, n, r) {
    if (e.subtreeFlags & Ds)
      for (e = e.child; e !== null; )
        Uv(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Uv(e, n, r) {
    switch (e.tag) {
      case 26:
        Ni(
          e,
          n,
          r
        ), e.flags & Ds && e.memoizedState !== null && zj(
          r,
          ta,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ni(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var s = ta;
        ta = To(e.stateNode.containerInfo), Ni(
          e,
          n,
          r
        ), ta = s;
        break;
      case 22:
        e.memoizedState === null && (s = e.alternate, s !== null && s.memoizedState !== null ? (s = Ds, Ds = 16777216, Ni(
          e,
          n,
          r
        ), Ds = s) : Ni(
          e,
          n,
          r
        ));
        break;
      default:
        Ni(
          e,
          n,
          r
        );
    }
  }
  function Bv(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function zs(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, Vv(
            s,
            e
          );
        }
      Bv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        $v(e), e = e.sibling;
  }
  function $v(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        zs(e), e.flags & 2048 && Wa(9, e, e.return);
        break;
      case 3:
        zs(e);
        break;
      case 12:
        zs(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, ho(e)) : zs(e);
        break;
      default:
        zs(e);
    }
  }
  function ho(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, Vv(
            s,
            e
          );
        }
      Bv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, n, n.return), ho(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, ho(n));
          break;
        default:
          ho(n);
      }
      e = e.sibling;
    }
  }
  function Vv(e, n) {
    for (; Qt !== null; ) {
      var r = Qt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var s = r.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          vs(r.memoizedState.cache);
      }
      if (s = r.child, s !== null) s.return = r, Qt = s;
      else
        e: for (r = e; Qt !== null; ) {
          s = Qt;
          var u = s.sibling, f = s.return;
          if (_v(s), s === r) {
            Qt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, Qt = u;
            break e;
          }
          Qt = f;
        }
    }
  }
  var Pw = {
    getCacheForType: function(e) {
      var n = tn(Ot), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return tn(Ot).controller.signal;
    }
  }, Kw = typeof WeakMap == "function" ? WeakMap : Map, tt = 0, ft = null, Ye = null, Xe = 0, at = 0, Cn = null, er = !1, Ti = !1, hd = !1, za = 0, Nt = 0, tr = 0, qr = 0, md = 0, Rn = 0, Ci = 0, ks = null, yn = null, pd = !1, mo = 0, Hv = 0, po = 1 / 0, vo = null, nr = null, Xt = 0, ar = null, Ri = null, ka = 0, vd = 0, gd = null, qv = null, Os = 0, yd = null;
  function Mn() {
    return (tt & 2) !== 0 && Xe !== 0 ? Xe & -Xe : z.T !== null ? Ed() : fe();
  }
  function Iv() {
    if (Rn === 0)
      if ((Xe & 536870912) === 0 || Ke) {
        var e = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), Rn = e;
      } else Rn = 536870912;
    return e = Nn.current, e !== null && (e.flags |= 32), Rn;
  }
  function bn(e, n, r) {
    (e === ft && (at === 2 || at === 9) || e.cancelPendingCommit !== null) && (Mi(e, 0), rr(
      e,
      Xe,
      Rn,
      !1
    )), it(e, r), ((tt & 2) === 0 || e !== ft) && (e === ft && ((tt & 2) === 0 && (qr |= r), Nt === 4 && rr(
      e,
      Xe,
      Rn,
      !1
    )), ha(e));
  }
  function Fv(e, n, r) {
    if ((tt & 6) !== 0) throw Error(l(327));
    var s = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ut(e, n), u = s ? Jw(e, n) : xd(e, n, !0), f = s;
    do {
      if (u === 0) {
        Ti && !s && rr(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !Qw(r)) {
          u = xd(e, n, !1), f = !1;
          continue;
        }
        if (u === 2) {
          if (f = n, e.errorRecoveryDisabledLanes & f)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            e: {
              var E = e;
              u = ks;
              var k = E.current.memoizedState.isDehydrated;
              if (k && (Mi(E, x).flags |= 256), x = xd(
                E,
                x,
                !1
              ), x !== 2) {
                if (hd && !k) {
                  E.errorRecoveryDisabledLanes |= f, qr |= f, u = 4;
                  break e;
                }
                f = yn, yn = u, f !== null && (yn === null ? yn = f : yn.push.apply(
                  yn,
                  f
                ));
              }
              u = x;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Mi(e, 0), rr(e, n, 0, !0);
          break;
        }
        e: {
          switch (s = e, f = u, f) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              rr(
                s,
                n,
                Rn,
                !er
              );
              break e;
            case 2:
              yn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (u = mo + 300 - qt(), 10 < u)) {
            if (rr(
              s,
              n,
              Rn,
              !er
            ), ke(s, 0, !0) !== 0) break e;
            ka = n, s.timeoutHandle = Sg(
              Yv.bind(
                null,
                s,
                r,
                yn,
                vo,
                pd,
                n,
                Rn,
                qr,
                Ci,
                er,
                f,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          Yv(
            s,
            r,
            yn,
            vo,
            pd,
            n,
            Rn,
            qr,
            Ci,
            er,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ha(e);
  }
  function Yv(e, n, r, s, u, f, x, E, k, P, re, ce, Z, te) {
    if (e.timeoutHandle = -1, ce = n.subtreeFlags, ce & 8192 || (ce & 16785408) === 16785408) {
      ce = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ba
      }, Uv(
        n,
        f,
        ce
      );
      var Se = (f & 62914560) === f ? mo - qt() : (f & 4194048) === f ? Hv - qt() : 0;
      if (Se = kj(
        ce,
        Se
      ), Se !== null) {
        ka = f, e.cancelPendingCommit = Se(
          Wv.bind(
            null,
            e,
            n,
            f,
            r,
            s,
            u,
            x,
            E,
            k,
            re,
            ce,
            null,
            Z,
            te
          )
        ), rr(e, f, x, !P);
        return;
      }
    }
    Wv(
      e,
      n,
      f,
      r,
      s,
      u,
      x,
      E,
      k
    );
  }
  function Qw(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var s = 0; s < r.length; s++) {
          var u = r[s], f = u.getSnapshot;
          u = u.value;
          try {
            if (!jn(f(), u)) return !1;
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
  function rr(e, n, r, s) {
    n &= ~md, n &= ~qr, e.suspendedLanes |= n, e.pingedLanes &= ~n, s && (e.warmLanes |= n), s = e.expirationTimes;
    for (var u = n; 0 < u; ) {
      var f = 31 - Yt(u), x = 1 << f;
      s[f] = -1, u &= ~x;
    }
    r !== 0 && ya(e, r, n);
  }
  function go() {
    return (tt & 6) === 0 ? (Ls(0), !1) : !0;
  }
  function bd() {
    if (Ye !== null) {
      if (at === 0)
        var e = Ye.return;
      else
        e = Ye, ja = zr = null, Ou(e), bi = null, ys = 0, e = Ye;
      for (; e !== null; )
        wv(e.alternate, e), e = e.return;
      Ye = null;
    }
  }
  function Mi(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, vj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), ka = 0, bd(), ft = e, Ye = r = Sa(e.current, null), Xe = n, at = 0, Cn = null, er = !1, Ti = ut(e, n), hd = !1, Ci = Rn = md = qr = tr = Nt = 0, yn = ks = null, pd = !1, (n & 8) !== 0 && (n |= n & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= n; 0 < s; ) {
        var u = 31 - Yt(s), f = 1 << u;
        n |= e[u], s &= ~f;
      }
    return za = n, Ul(), r;
  }
  function Gv(e, n) {
    Ue = null, z.H = Ts, n === yi || n === Yl ? (n = op(), at = 3) : n === ju ? (n = op(), at = 4) : at = n === Zu ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Cn = n, Ye === null && (Nt = 1, io(
      e,
      Bn(n, e.current)
    ));
  }
  function Xv() {
    var e = Nn.current;
    return e === null ? !0 : (Xe & 4194048) === Xe ? qn === null : (Xe & 62914560) === Xe || (Xe & 536870912) !== 0 ? e === qn : !1;
  }
  function Pv() {
    var e = z.H;
    return z.H = Ts, e === null ? Ts : e;
  }
  function Kv() {
    var e = z.A;
    return z.A = Pw, e;
  }
  function yo() {
    Nt = 4, er || (Xe & 4194048) !== Xe && Nn.current !== null || (Ti = !0), (tr & 134217727) === 0 && (qr & 134217727) === 0 || ft === null || rr(
      ft,
      Xe,
      Rn,
      !1
    );
  }
  function xd(e, n, r) {
    var s = tt;
    tt |= 2;
    var u = Pv(), f = Kv();
    (ft !== e || Xe !== n) && (vo = null, Mi(e, n)), n = !1;
    var x = Nt;
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          var E = Ye, k = Cn;
          switch (at) {
            case 8:
              bd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (n = !0);
              var P = at;
              if (at = 0, Cn = null, _i(e, E, k, P), r && Ti) {
                x = 0;
                break e;
              }
              break;
            default:
              P = at, at = 0, Cn = null, _i(e, E, k, P);
          }
        }
        Zw(), x = Nt;
        break;
      } catch (re) {
        Gv(e, re);
      }
    while (!0);
    return n && e.shellSuspendCounter++, ja = zr = null, tt = s, z.H = u, z.A = f, Ye === null && (ft = null, Xe = 0, Ul()), x;
  }
  function Zw() {
    for (; Ye !== null; ) Qv(Ye);
  }
  function Jw(e, n) {
    var r = tt;
    tt |= 2;
    var s = Pv(), u = Kv();
    ft !== e || Xe !== n ? (vo = null, po = qt() + 500, Mi(e, n)) : Ti = ut(
      e,
      n
    );
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          n = Ye;
          var f = Cn;
          t: switch (at) {
            case 1:
              at = 0, Cn = null, _i(e, n, f, 1);
              break;
            case 2:
            case 9:
              if (sp(f)) {
                at = 0, Cn = null, Zv(n);
                break;
              }
              n = function() {
                at !== 2 && at !== 9 || ft !== e || (at = 7), ha(e);
              }, f.then(n, n);
              break e;
            case 3:
              at = 7;
              break e;
            case 4:
              at = 5;
              break e;
            case 7:
              sp(f) ? (at = 0, Cn = null, Zv(n)) : (at = 0, Cn = null, _i(e, n, f, 7));
              break;
            case 5:
              var x = null;
              switch (Ye.tag) {
                case 26:
                  x = Ye.memoizedState;
                case 5:
                case 27:
                  var E = Ye;
                  if (x ? Lg(x) : E.stateNode.complete) {
                    at = 0, Cn = null;
                    var k = E.sibling;
                    if (k !== null) Ye = k;
                    else {
                      var P = E.return;
                      P !== null ? (Ye = P, bo(P)) : Ye = null;
                    }
                    break t;
                  }
              }
              at = 0, Cn = null, _i(e, n, f, 5);
              break;
            case 6:
              at = 0, Cn = null, _i(e, n, f, 6);
              break;
            case 8:
              bd(), Nt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        Ww();
        break;
      } catch (re) {
        Gv(e, re);
      }
    while (!0);
    return ja = zr = null, z.H = s, z.A = u, tt = r, Ye !== null ? 0 : (ft = null, Xe = 0, Ul(), Nt);
  }
  function Ww() {
    for (; Ye !== null && !Ht(); )
      Qv(Ye);
  }
  function Qv(e) {
    var n = xv(e.alternate, e, za);
    e.memoizedProps = e.pendingProps, n === null ? bo(e) : Ye = n;
  }
  function Zv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = mv(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Xe
        );
        break;
      case 11:
        n = mv(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Xe
        );
        break;
      case 5:
        Ou(n);
      default:
        wv(r, n), n = Ye = Km(n, za), n = xv(r, n, za);
    }
    e.memoizedProps = e.pendingProps, n === null ? bo(e) : Ye = n;
  }
  function _i(e, n, r, s) {
    ja = zr = null, Ou(n), bi = null, ys = 0;
    var u = n.return;
    try {
      if (Hw(
        e,
        u,
        n,
        r,
        Xe
      )) {
        Nt = 1, io(
          e,
          Bn(r, e.current)
        ), Ye = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw Ye = u, f;
      Nt = 1, io(
        e,
        Bn(r, e.current)
      ), Ye = null;
      return;
    }
    n.flags & 32768 ? (Ke || s === 1 ? e = !0 : Ti || (Xe & 536870912) !== 0 ? e = !1 : (er = e = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = Nn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), Jv(n, e)) : bo(n);
  }
  function bo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Jv(
          n,
          er
        );
        return;
      }
      e = n.return;
      var r = Fw(
        n.alternate,
        n,
        za
      );
      if (r !== null) {
        Ye = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ye = n;
        return;
      }
      Ye = n = e;
    } while (n !== null);
    Nt === 0 && (Nt = 5);
  }
  function Jv(e, n) {
    do {
      var r = Yw(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, Ye = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        Ye = e;
        return;
      }
      Ye = e = r;
    } while (e !== null);
    Nt = 6, Ye = null;
  }
  function Wv(e, n, r, s, u, f, x, E, k) {
    e.cancelPendingCommit = null;
    do
      xo();
    while (Xt !== 0);
    if ((tt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === e.current) throw Error(l(177));
      if (f = n.lanes | n.childLanes, f |= ou, Wt(
        e,
        r,
        f,
        x,
        E,
        k
      ), e === ft && (Ye = ft = null, Xe = 0), Ri = n, ar = e, ka = r, vd = f, gd = u, qv = s, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, aj(nt, function() {
        return rg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), s = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || s) {
        s = z.T, z.T = null, u = L.p, L.p = 2, x = tt, tt |= 4;
        try {
          Gw(e, n, r);
        } finally {
          tt = x, L.p = u, z.T = s;
        }
      }
      Xt = 1, eg(), tg(), ng();
    }
  }
  function eg() {
    if (Xt === 1) {
      Xt = 0;
      var e = ar, n = Ri, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = z.T, z.T = null;
        var s = L.p;
        L.p = 2;
        var u = tt;
        tt |= 4;
        try {
          kv(n, e);
          var f = Dd, x = Vm(e.containerInfo), E = f.focusedElem, k = f.selectionRange;
          if (x !== E && E && E.ownerDocument && $m(
            E.ownerDocument.documentElement,
            E
          )) {
            if (k !== null && au(E)) {
              var P = k.start, re = k.end;
              if (re === void 0 && (re = P), "selectionStart" in E)
                E.selectionStart = P, E.selectionEnd = Math.min(
                  re,
                  E.value.length
                );
              else {
                var ce = E.ownerDocument || document, Z = ce && ce.defaultView || window;
                if (Z.getSelection) {
                  var te = Z.getSelection(), Se = E.textContent.length, Ae = Math.min(k.start, Se), ct = k.end === void 0 ? Ae : Math.min(k.end, Se);
                  !te.extend && Ae > ct && (x = ct, ct = Ae, Ae = x);
                  var I = Bm(
                    E,
                    Ae
                  ), U = Bm(
                    E,
                    ct
                  );
                  if (I && U && (te.rangeCount !== 1 || te.anchorNode !== I.node || te.anchorOffset !== I.offset || te.focusNode !== U.node || te.focusOffset !== U.offset)) {
                    var X = ce.createRange();
                    X.setStart(I.node, I.offset), te.removeAllRanges(), Ae > ct ? (te.addRange(X), te.extend(U.node, U.offset)) : (X.setEnd(U.node, U.offset), te.addRange(X));
                  }
                }
              }
            }
            for (ce = [], te = E; te = te.parentNode; )
              te.nodeType === 1 && ce.push({
                element: te,
                left: te.scrollLeft,
                top: te.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < ce.length; E++) {
              var oe = ce[E];
              oe.element.scrollLeft = oe.left, oe.element.scrollTop = oe.top;
            }
          }
          Do = !!Ad, Dd = Ad = null;
        } finally {
          tt = u, L.p = s, z.T = r;
        }
      }
      e.current = n, Xt = 2;
    }
  }
  function tg() {
    if (Xt === 2) {
      Xt = 0;
      var e = ar, n = Ri, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = z.T, z.T = null;
        var s = L.p;
        L.p = 2;
        var u = tt;
        tt |= 4;
        try {
          Mv(e, n.alternate, n);
        } finally {
          tt = u, L.p = s, z.T = r;
        }
      }
      Xt = 3;
    }
  }
  function ng() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, kn();
      var e = ar, n = Ri, r = ka, s = qv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, Ri = ar = null, ag(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (nr = null), G(r), n = n.stateNode, Jt && typeof Jt.onCommitFiberRoot == "function")
        try {
          Jt.onCommitFiberRoot(
            Zn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        n = z.T, u = L.p, L.p = 2, z.T = null;
        try {
          for (var f = e.onRecoverableError, x = 0; x < s.length; x++) {
            var E = s[x];
            f(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          z.T = n, L.p = u;
        }
      }
      (ka & 3) !== 0 && xo(), ha(e), u = e.pendingLanes, (r & 261930) !== 0 && (u & 42) !== 0 ? e === yd ? Os++ : (Os = 0, yd = e) : Os = 0, Ls(0);
    }
  }
  function ag(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, vs(n)));
  }
  function xo() {
    return eg(), tg(), ng(), rg();
  }
  function rg() {
    if (Xt !== 5) return !1;
    var e = ar, n = vd;
    vd = 0;
    var r = G(ka), s = z.T, u = L.p;
    try {
      L.p = 32 > r ? 32 : r, z.T = null, r = gd, gd = null;
      var f = ar, x = ka;
      if (Xt = 0, Ri = ar = null, ka = 0, (tt & 6) !== 0) throw Error(l(331));
      var E = tt;
      if (tt |= 4, $v(f.current), Lv(
        f,
        f.current,
        x,
        r
      ), tt = E, Ls(0, !1), Jt && typeof Jt.onPostCommitFiberRoot == "function")
        try {
          Jt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      L.p = u, z.T = s, ag(e, n);
    }
  }
  function ig(e, n, r) {
    n = Bn(r, n), n = Qu(e.stateNode, n, 2), e = Qa(e, n, 2), e !== null && (it(e, 2), ha(e));
  }
  function rt(e, n, r) {
    if (e.tag === 3)
      ig(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          ig(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var s = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (nr === null || !nr.has(s))) {
            e = Bn(r, e), r = sv(2), s = Qa(n, r, 2), s !== null && (lv(
              r,
              s,
              n,
              e
            ), it(s, 2), ha(s));
            break;
          }
        }
        n = n.return;
      }
  }
  function Sd(e, n, r) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new Kw();
      var u = /* @__PURE__ */ new Set();
      s.set(n, u);
    } else
      u = s.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), s.set(n, u));
    u.has(r) || (hd = !0, u.add(r), e = ej.bind(null, e, n, r), n.then(e, e));
  }
  function ej(e, n, r) {
    var s = e.pingCache;
    s !== null && s.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, ft === e && (Xe & r) === r && (Nt === 4 || Nt === 3 && (Xe & 62914560) === Xe && 300 > qt() - mo ? (tt & 2) === 0 && Mi(e, 0) : md |= r, Ci === Xe && (Ci = 0)), ha(e);
  }
  function sg(e, n) {
    n === 0 && (n = Gt()), e = _r(e, n), e !== null && (it(e, n), ha(e));
  }
  function tj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), sg(e, r);
  }
  function nj(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var s = e.stateNode, u = e.memoizedState;
        u !== null && (r = u.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      case 22:
        s = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    s !== null && s.delete(n), sg(e, r);
  }
  function aj(e, n) {
    return xt(e, n);
  }
  var So = null, Ai = null, wd = !1, wo = !1, jd = !1, ir = 0;
  function ha(e) {
    e !== Ai && e.next === null && (Ai === null ? So = Ai = e : Ai = Ai.next = e), wo = !0, wd || (wd = !0, ij());
  }
  function Ls(e, n) {
    if (!jd && wo) {
      jd = !0;
      do
        for (var r = !1, s = So; s !== null; ) {
          if (e !== 0) {
            var u = s.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var x = s.suspendedLanes, E = s.pingedLanes;
              f = (1 << 31 - Yt(42 | e) + 1) - 1, f &= u & ~(x & ~E), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, ug(s, f));
          } else
            f = Xe, f = ke(
              s,
              s === ft ? f : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (f & 3) === 0 || ut(s, f) || (r = !0, ug(s, f));
          s = s.next;
        }
      while (r);
      jd = !1;
    }
  }
  function rj() {
    lg();
  }
  function lg() {
    wo = wd = !1;
    var e = 0;
    ir !== 0 && pj() && (e = ir);
    for (var n = qt(), r = null, s = So; s !== null; ) {
      var u = s.next, f = og(s, n);
      f === 0 ? (s.next = null, r === null ? So = u : r.next = u, u === null && (Ai = r)) : (r = s, (e !== 0 || (f & 3) !== 0) && (wo = !0)), s = u;
    }
    Xt !== 0 && Xt !== 5 || Ls(e), ir !== 0 && (ir = 0);
  }
  function og(e, n) {
    for (var r = e.suspendedLanes, s = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var x = 31 - Yt(f), E = 1 << x, k = u[x];
      k === -1 ? ((E & r) === 0 || (E & s) !== 0) && (u[x] = Dt(E, n)) : k <= n && (e.expiredLanes |= E), f &= ~E;
    }
    if (n = ft, r = Xe, r = ke(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s = e.callbackNode, r === 0 || e === n && (at === 2 || at === 9) || e.cancelPendingCommit !== null)
      return s !== null && s !== null && un(s), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ut(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (s !== null && un(s), G(r)) {
        case 2:
        case 8:
          r = Qe;
          break;
        case 32:
          r = nt;
          break;
        case 268435456:
          r = Ft;
          break;
        default:
          r = nt;
      }
      return s = cg.bind(null, e), r = xt(r, s), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return s !== null && s !== null && un(s), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function cg(e, n) {
    if (Xt !== 0 && Xt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (xo() && e.callbackNode !== r)
      return null;
    var s = Xe;
    return s = ke(
      e,
      e === ft ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s === 0 ? null : (Fv(e, s, n), og(e, qt()), e.callbackNode != null && e.callbackNode === r ? cg.bind(null, e) : null);
  }
  function ug(e, n) {
    if (xo()) return null;
    Fv(e, n, !0);
  }
  function ij() {
    gj(function() {
      (tt & 6) !== 0 ? xt(
        ze,
        rj
      ) : lg();
    });
  }
  function Ed() {
    if (ir === 0) {
      var e = vi;
      e === 0 && (e = ga, ga <<= 1, (ga & 261888) === 0 && (ga = 256)), ir = e;
    }
    return ir;
  }
  function dg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ml("" + e);
  }
  function fg(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function sj(e, n, r, s, u) {
    if (n === "submit" && r && r.stateNode === u) {
      var f = dg(
        (u[ye] || null).action
      ), x = s.submitter;
      x && (n = (n = x[ye] || null) ? dg(n.formAction) : x.getAttribute("formAction"), n !== null && (f = n, x = null));
      var E = new zl(
        "action",
        "action",
        null,
        s,
        u
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (s.defaultPrevented) {
                if (ir !== 0) {
                  var k = x ? fg(u, x) : new FormData(u);
                  Fu(
                    r,
                    {
                      pending: !0,
                      data: k,
                      method: u.method,
                      action: f
                    },
                    null,
                    k
                  );
                }
              } else
                typeof f == "function" && (E.preventDefault(), k = x ? fg(u, x) : new FormData(u), Fu(
                  r,
                  {
                    pending: !0,
                    data: k,
                    method: u.method,
                    action: f
                  },
                  f,
                  k
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Nd = 0; Nd < lu.length; Nd++) {
    var Td = lu[Nd], lj = Td.toLowerCase(), oj = Td[0].toUpperCase() + Td.slice(1);
    ea(
      lj,
      "on" + oj
    );
  }
  ea(Im, "onAnimationEnd"), ea(Fm, "onAnimationIteration"), ea(Ym, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(Ew, "onTransitionRun"), ea(Nw, "onTransitionStart"), ea(Tw, "onTransitionCancel"), ea(Gm, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Kt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Kt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Kt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Kt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Kt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Kt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Us = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cj = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Us)
  );
  function hg(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var s = e[r], u = s.event;
      s = s.listeners;
      e: {
        var f = void 0;
        if (n)
          for (var x = s.length - 1; 0 <= x; x--) {
            var E = s[x], k = E.instance, P = E.currentTarget;
            if (E = E.listener, k !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = P;
            try {
              f(u);
            } catch (re) {
              Ll(re);
            }
            u.currentTarget = null, f = k;
          }
        else
          for (x = 0; x < s.length; x++) {
            if (E = s[x], k = E.instance, P = E.currentTarget, E = E.listener, k !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = P;
            try {
              f(u);
            } catch (re) {
              Ll(re);
            }
            u.currentTarget = null, f = k;
          }
      }
    }
  }
  function Ge(e, n) {
    var r = n[xe];
    r === void 0 && (r = n[xe] = /* @__PURE__ */ new Set());
    var s = e + "__bubble";
    r.has(s) || (mg(n, e, 2, !1), r.add(s));
  }
  function Cd(e, n, r) {
    var s = 0;
    n && (s |= 4), mg(
      r,
      e,
      s,
      n
    );
  }
  var jo = "_reactListening" + Math.random().toString(36).slice(2);
  function Rd(e) {
    if (!e[jo]) {
      e[jo] = !0, qa.forEach(function(r) {
        r !== "selectionchange" && (cj.has(r) || Cd(r, !1, e), Cd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[jo] || (n[jo] = !0, Cd("selectionchange", !1, n));
    }
  }
  function mg(e, n, r, s) {
    switch (Ig(n)) {
      case 2:
        var u = Uj;
        break;
      case 8:
        u = Bj;
        break;
      default:
        u = Id;
    }
    r = u.bind(
      null,
      n,
      r,
      e
    ), u = void 0, !Pc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), s ? u !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: u
    }) : e.addEventListener(n, r, !0) : u !== void 0 ? e.addEventListener(n, r, {
      passive: u
    }) : e.addEventListener(n, r, !1);
  }
  function Md(e, n, r, s, u) {
    var f = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      e: for (; ; ) {
        if (s === null) return;
        var x = s.tag;
        if (x === 3 || x === 4) {
          var E = s.stateNode.containerInfo;
          if (E === u) break;
          if (x === 4)
            for (x = s.return; x !== null; ) {
              var k = x.tag;
              if ((k === 3 || k === 4) && x.stateNode.containerInfo === u)
                return;
              x = x.return;
            }
          for (; E !== null; ) {
            if (x = st(E), x === null) return;
            if (k = x.tag, k === 5 || k === 6 || k === 26 || k === 27) {
              s = f = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        s = s.return;
      }
    bm(function() {
      var P = f, re = Gc(r), ce = [];
      e: {
        var Z = Xm.get(e);
        if (Z !== void 0) {
          var te = zl, Se = e;
          switch (e) {
            case "keypress":
              if (Al(r) === 0) break e;
            case "keydown":
            case "keyup":
              te = nw;
              break;
            case "focusin":
              Se = "focus", te = Jc;
              break;
            case "focusout":
              Se = "blur", te = Jc;
              break;
            case "beforeblur":
            case "afterblur":
              te = Jc;
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
              te = wm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              te = FS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              te = iw;
              break;
            case Im:
            case Fm:
            case Ym:
              te = XS;
              break;
            case Gm:
              te = lw;
              break;
            case "scroll":
            case "scrollend":
              te = qS;
              break;
            case "wheel":
              te = cw;
              break;
            case "copy":
            case "cut":
            case "paste":
              te = KS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              te = Em;
              break;
            case "toggle":
            case "beforetoggle":
              te = dw;
          }
          var Ae = (n & 4) !== 0, ct = !Ae && (e === "scroll" || e === "scrollend"), I = Ae ? Z !== null ? Z + "Capture" : null : Z;
          Ae = [];
          for (var U = P, X; U !== null; ) {
            var oe = U;
            if (X = oe.stateNode, oe = oe.tag, oe !== 5 && oe !== 26 && oe !== 27 || X === null || I === null || (oe = is(U, I), oe != null && Ae.push(
              Bs(U, oe, X)
            )), ct) break;
            U = U.return;
          }
          0 < Ae.length && (Z = new te(
            Z,
            Se,
            null,
            r,
            re
          ), ce.push({ event: Z, listeners: Ae }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (Z = e === "mouseover" || e === "pointerover", te = e === "mouseout" || e === "pointerout", Z && r !== Yc && (Se = r.relatedTarget || r.fromElement) && (st(Se) || Se[Ee]))
            break e;
          if ((te || Z) && (Z = re.window === re ? re : (Z = re.ownerDocument) ? Z.defaultView || Z.parentWindow : window, te ? (Se = r.relatedTarget || r.toElement, te = P, Se = Se ? st(Se) : null, Se !== null && (ct = d(Se), Ae = Se.tag, Se !== ct || Ae !== 5 && Ae !== 27 && Ae !== 6) && (Se = null)) : (te = null, Se = P), te !== Se)) {
            if (Ae = wm, oe = "onMouseLeave", I = "onMouseEnter", U = "mouse", (e === "pointerout" || e === "pointerover") && (Ae = Em, oe = "onPointerLeave", I = "onPointerEnter", U = "pointer"), ct = te == null ? Z : Fe(te), X = Se == null ? Z : Fe(Se), Z = new Ae(
              oe,
              U + "leave",
              te,
              r,
              re
            ), Z.target = ct, Z.relatedTarget = X, oe = null, st(re) === P && (Ae = new Ae(
              I,
              U + "enter",
              Se,
              r,
              re
            ), Ae.target = X, Ae.relatedTarget = ct, oe = Ae), ct = oe, te && Se)
              t: {
                for (Ae = uj, I = te, U = Se, X = 0, oe = I; oe; oe = Ae(oe))
                  X++;
                oe = 0;
                for (var Me = U; Me; Me = Ae(Me))
                  oe++;
                for (; 0 < X - oe; )
                  I = Ae(I), X--;
                for (; 0 < oe - X; )
                  U = Ae(U), oe--;
                for (; X--; ) {
                  if (I === U || U !== null && I === U.alternate) {
                    Ae = I;
                    break t;
                  }
                  I = Ae(I), U = Ae(U);
                }
                Ae = null;
              }
            else Ae = null;
            te !== null && pg(
              ce,
              Z,
              te,
              Ae,
              !1
            ), Se !== null && ct !== null && pg(
              ce,
              ct,
              Se,
              Ae,
              !0
            );
          }
        }
        e: {
          if (Z = P ? Fe(P) : window, te = Z.nodeName && Z.nodeName.toLowerCase(), te === "select" || te === "input" && Z.type === "file")
            var Je = Dm;
          else if (_m(Z))
            if (zm)
              Je = Sw;
            else {
              Je = bw;
              var Ne = yw;
            }
          else
            te = Z.nodeName, !te || te.toLowerCase() !== "input" || Z.type !== "checkbox" && Z.type !== "radio" ? P && Fc(P.elementType) && (Je = Dm) : Je = xw;
          if (Je && (Je = Je(e, P))) {
            Am(
              ce,
              Je,
              r,
              re
            );
            break e;
          }
          Ne && Ne(e, Z, P), e === "focusout" && P && Z.type === "number" && P.memoizedProps.value != null && Ic(Z, "number", Z.value);
        }
        switch (Ne = P ? Fe(P) : window, e) {
          case "focusin":
            (_m(Ne) || Ne.contentEditable === "true") && (oi = Ne, ru = P, hs = null);
            break;
          case "focusout":
            hs = ru = oi = null;
            break;
          case "mousedown":
            iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            iu = !1, Hm(ce, r, re);
            break;
          case "selectionchange":
            if (jw) break;
          case "keydown":
          case "keyup":
            Hm(ce, r, re);
        }
        var Be;
        if (eu)
          e: {
            switch (e) {
              case "compositionstart":
                var Pe = "onCompositionStart";
                break e;
              case "compositionend":
                Pe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Pe = "onCompositionUpdate";
                break e;
            }
            Pe = void 0;
          }
        else
          li ? Rm(e, r) && (Pe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (Nm && r.locale !== "ko" && (li || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && li && (Be = xm()) : (Ia = re, Kc = "value" in Ia ? Ia.value : Ia.textContent, li = !0)), Ne = Eo(P, Pe), 0 < Ne.length && (Pe = new jm(
          Pe,
          e,
          null,
          r,
          re
        ), ce.push({ event: Pe, listeners: Ne }), Be ? Pe.data = Be : (Be = Mm(r), Be !== null && (Pe.data = Be)))), (Be = hw ? mw(e, r) : pw(e, r)) && (Pe = Eo(P, "onBeforeInput"), 0 < Pe.length && (Ne = new jm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          re
        ), ce.push({
          event: Ne,
          listeners: Pe
        }), Ne.data = Be)), sj(
          ce,
          e,
          P,
          r,
          re
        );
      }
      hg(ce, n);
    });
  }
  function Bs(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function Eo(e, n) {
    for (var r = n + "Capture", s = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = is(e, r), u != null && s.unshift(
        Bs(e, u, f)
      ), u = is(e, n), u != null && s.push(
        Bs(e, u, f)
      )), e.tag === 3) return s;
      e = e.return;
    }
    return [];
  }
  function uj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function pg(e, n, r, s, u) {
    for (var f = n._reactName, x = []; r !== null && r !== s; ) {
      var E = r, k = E.alternate, P = E.stateNode;
      if (E = E.tag, k !== null && k === s) break;
      E !== 5 && E !== 26 && E !== 27 || P === null || (k = P, u ? (P = is(r, f), P != null && x.unshift(
        Bs(r, P, k)
      )) : u || (P = is(r, f), P != null && x.push(
        Bs(r, P, k)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var dj = /\r\n?/g, fj = /\u0000|\uFFFD/g;
  function vg(e) {
    return (typeof e == "string" ? e : "" + e).replace(dj, `
`).replace(fj, "");
  }
  function gg(e, n) {
    return n = vg(n), vg(e) === n;
  }
  function ot(e, n, r, s, u, f) {
    switch (r) {
      case "children":
        typeof s == "string" ? n === "body" || n === "textarea" && s === "" || ri(e, s) : (typeof s == "number" || typeof s == "bigint") && n !== "body" && ri(e, "" + s);
        break;
      case "className":
        Ct(e, "class", s);
        break;
      case "tabIndex":
        Ct(e, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ct(e, r, s);
        break;
      case "style":
        gm(e, s, f);
        break;
      case "data":
        if (n !== "object") {
          Ct(e, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (n !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(r);
          break;
        }
        s = Ml("" + s), e.setAttribute(r, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          e.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof f == "function" && (r === "formAction" ? (n !== "input" && ot(e, n, "name", u.name, u, null), ot(
            e,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), ot(
            e,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), ot(
            e,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (ot(e, n, "encType", u.encType, u, null), ot(e, n, "method", u.method, u, null), ot(e, n, "target", u.target, u, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(r);
          break;
        }
        s = Ml("" + s), e.setAttribute(r, s);
        break;
      case "onClick":
        s != null && (e.onclick = ba);
        break;
      case "onScroll":
        s != null && Ge("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Ge("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(l(61));
          if (r = s.__html, r != null) {
            if (u.children != null) throw Error(l(60));
            e.innerHTML = r;
          }
        }
        break;
      case "multiple":
        e.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        e.muted = s && typeof s != "function" && typeof s != "symbol";
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
        if (s == null || typeof s == "function" || typeof s == "boolean" || typeof s == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        r = Ml("" + s), e.setAttributeNS(
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
        s != null && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(r, "" + s) : e.removeAttribute(r);
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
        s && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(r, "") : e.removeAttribute(r);
        break;
      case "capture":
      case "download":
        s === !0 ? e.setAttribute(r, "") : s !== !1 && s != null && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(r, s) : e.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s ? e.setAttribute(r, s) : e.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s) ? e.removeAttribute(r) : e.setAttribute(r, s);
        break;
      case "popover":
        Ge("beforetoggle", e), Ge("toggle", e), qe(e, "popover", s);
        break;
      case "xlinkActuate":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          s
        );
        break;
      case "xlinkArcrole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          s
        );
        break;
      case "xlinkRole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          s
        );
        break;
      case "xlinkShow":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          s
        );
        break;
      case "xlinkTitle":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          s
        );
        break;
      case "xlinkType":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          s
        );
        break;
      case "xmlBase":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          s
        );
        break;
      case "xmlLang":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          s
        );
        break;
      case "xmlSpace":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          s
        );
        break;
      case "is":
        qe(e, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = VS.get(r) || r, qe(e, r, s));
    }
  }
  function _d(e, n, r, s, u, f) {
    switch (r) {
      case "style":
        gm(e, s, f);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(l(61));
          if (r = s.__html, r != null) {
            if (u.children != null) throw Error(l(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof s == "string" ? ri(e, s) : (typeof s == "number" || typeof s == "bigint") && ri(e, "" + s);
        break;
      case "onScroll":
        s != null && Ge("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Ge("scrollend", e);
        break;
      case "onClick":
        s != null && (e.onclick = ba);
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
        if (!Wn.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (u = r.endsWith("Capture"), n = r.slice(2, u ? r.length - 7 : void 0), f = e[ye] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(n, f, u), typeof s == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, s, u);
              break e;
            }
            r in e ? e[r] = s : s === !0 ? e.setAttribute(r, "") : qe(e, r, s);
          }
    }
  }
  function an(e, n, r) {
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
        Ge("error", e), Ge("load", e);
        var s = !1, u = !1, f;
        for (f in r)
          if (r.hasOwnProperty(f)) {
            var x = r[f];
            if (x != null)
              switch (f) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, n));
                default:
                  ot(e, n, f, x, r, null);
              }
          }
        u && ot(e, n, "srcSet", r.srcSet, r, null), s && ot(e, n, "src", r.src, r, null);
        return;
      case "input":
        Ge("invalid", e);
        var E = f = x = u = null, k = null, P = null;
        for (s in r)
          if (r.hasOwnProperty(s)) {
            var re = r[s];
            if (re != null)
              switch (s) {
                case "name":
                  u = re;
                  break;
                case "type":
                  x = re;
                  break;
                case "checked":
                  k = re;
                  break;
                case "defaultChecked":
                  P = re;
                  break;
                case "value":
                  f = re;
                  break;
                case "defaultValue":
                  E = re;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (re != null)
                    throw Error(l(137, n));
                  break;
                default:
                  ot(e, n, s, re, r, null);
              }
          }
        hm(
          e,
          f,
          E,
          k,
          P,
          x,
          u,
          !1
        );
        return;
      case "select":
        Ge("invalid", e), s = x = f = null;
        for (u in r)
          if (r.hasOwnProperty(u) && (E = r[u], E != null))
            switch (u) {
              case "value":
                f = E;
                break;
              case "defaultValue":
                x = E;
                break;
              case "multiple":
                s = E;
              default:
                ot(e, n, u, E, r, null);
            }
        n = f, r = x, e.multiple = !!s, n != null ? ai(e, !!s, n, !1) : r != null && ai(e, !!s, r, !0);
        return;
      case "textarea":
        Ge("invalid", e), f = u = s = null;
        for (x in r)
          if (r.hasOwnProperty(x) && (E = r[x], E != null))
            switch (x) {
              case "value":
                s = E;
                break;
              case "defaultValue":
                u = E;
                break;
              case "children":
                f = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(l(91));
                break;
              default:
                ot(e, n, x, E, r, null);
            }
        pm(e, s, u, f);
        return;
      case "option":
        for (k in r)
          if (r.hasOwnProperty(k) && (s = r[k], s != null))
            switch (k) {
              case "selected":
                e.selected = s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                ot(e, n, k, s, r, null);
            }
        return;
      case "dialog":
        Ge("beforetoggle", e), Ge("toggle", e), Ge("cancel", e), Ge("close", e);
        break;
      case "iframe":
      case "object":
        Ge("load", e);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Us.length; s++)
          Ge(Us[s], e);
        break;
      case "image":
        Ge("error", e), Ge("load", e);
        break;
      case "details":
        Ge("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ge("error", e), Ge("load", e);
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
        for (P in r)
          if (r.hasOwnProperty(P) && (s = r[P], s != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                ot(e, n, P, s, r, null);
            }
        return;
      default:
        if (Fc(n)) {
          for (re in r)
            r.hasOwnProperty(re) && (s = r[re], s !== void 0 && _d(
              e,
              n,
              re,
              s,
              r,
              void 0
            ));
          return;
        }
    }
    for (E in r)
      r.hasOwnProperty(E) && (s = r[E], s != null && ot(e, n, E, s, r, null));
  }
  function hj(e, n, r, s) {
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
        var u = null, f = null, x = null, E = null, k = null, P = null, re = null;
        for (te in r) {
          var ce = r[te];
          if (r.hasOwnProperty(te) && ce != null)
            switch (te) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                k = ce;
              default:
                s.hasOwnProperty(te) || ot(e, n, te, null, s, ce);
            }
        }
        for (var Z in s) {
          var te = s[Z];
          if (ce = r[Z], s.hasOwnProperty(Z) && (te != null || ce != null))
            switch (Z) {
              case "type":
                f = te;
                break;
              case "name":
                u = te;
                break;
              case "checked":
                P = te;
                break;
              case "defaultChecked":
                re = te;
                break;
              case "value":
                x = te;
                break;
              case "defaultValue":
                E = te;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (te != null)
                  throw Error(l(137, n));
                break;
              default:
                te !== ce && ot(
                  e,
                  n,
                  Z,
                  te,
                  s,
                  ce
                );
            }
        }
        qc(
          e,
          x,
          E,
          k,
          P,
          re,
          f,
          u
        );
        return;
      case "select":
        te = x = E = Z = null;
        for (f in r)
          if (k = r[f], r.hasOwnProperty(f) && k != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                te = k;
              default:
                s.hasOwnProperty(f) || ot(
                  e,
                  n,
                  f,
                  null,
                  s,
                  k
                );
            }
        for (u in s)
          if (f = s[u], k = r[u], s.hasOwnProperty(u) && (f != null || k != null))
            switch (u) {
              case "value":
                Z = f;
                break;
              case "defaultValue":
                E = f;
                break;
              case "multiple":
                x = f;
              default:
                f !== k && ot(
                  e,
                  n,
                  u,
                  f,
                  s,
                  k
                );
            }
        n = E, r = x, s = te, Z != null ? ai(e, !!r, Z, !1) : !!s != !!r && (n != null ? ai(e, !!r, n, !0) : ai(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        te = Z = null;
        for (E in r)
          if (u = r[E], r.hasOwnProperty(E) && u != null && !s.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, n, E, null, s, u);
            }
        for (x in s)
          if (u = s[x], f = r[x], s.hasOwnProperty(x) && (u != null || f != null))
            switch (x) {
              case "value":
                Z = u;
                break;
              case "defaultValue":
                te = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(l(91));
                break;
              default:
                u !== f && ot(e, n, x, u, s, f);
            }
        mm(e, Z, te);
        return;
      case "option":
        for (var Se in r)
          if (Z = r[Se], r.hasOwnProperty(Se) && Z != null && !s.hasOwnProperty(Se))
            switch (Se) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ot(
                  e,
                  n,
                  Se,
                  null,
                  s,
                  Z
                );
            }
        for (k in s)
          if (Z = s[k], te = r[k], s.hasOwnProperty(k) && Z !== te && (Z != null || te != null))
            switch (k) {
              case "selected":
                e.selected = Z && typeof Z != "function" && typeof Z != "symbol";
                break;
              default:
                ot(
                  e,
                  n,
                  k,
                  Z,
                  s,
                  te
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
        for (var Ae in r)
          Z = r[Ae], r.hasOwnProperty(Ae) && Z != null && !s.hasOwnProperty(Ae) && ot(e, n, Ae, null, s, Z);
        for (P in s)
          if (Z = s[P], te = r[P], s.hasOwnProperty(P) && Z !== te && (Z != null || te != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Z != null)
                  throw Error(l(137, n));
                break;
              default:
                ot(
                  e,
                  n,
                  P,
                  Z,
                  s,
                  te
                );
            }
        return;
      default:
        if (Fc(n)) {
          for (var ct in r)
            Z = r[ct], r.hasOwnProperty(ct) && Z !== void 0 && !s.hasOwnProperty(ct) && _d(
              e,
              n,
              ct,
              void 0,
              s,
              Z
            );
          for (re in s)
            Z = s[re], te = r[re], !s.hasOwnProperty(re) || Z === te || Z === void 0 && te === void 0 || _d(
              e,
              n,
              re,
              Z,
              s,
              te
            );
          return;
        }
    }
    for (var I in r)
      Z = r[I], r.hasOwnProperty(I) && Z != null && !s.hasOwnProperty(I) && ot(e, n, I, null, s, Z);
    for (ce in s)
      Z = s[ce], te = r[ce], !s.hasOwnProperty(ce) || Z === te || Z == null && te == null || ot(e, n, ce, Z, s, te);
  }
  function yg(e) {
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
  function mj() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), s = 0; s < r.length; s++) {
        var u = r[s], f = u.transferSize, x = u.initiatorType, E = u.duration;
        if (f && E && yg(x)) {
          for (x = 0, E = u.responseEnd, s += 1; s < r.length; s++) {
            var k = r[s], P = k.startTime;
            if (P > E) break;
            var re = k.transferSize, ce = k.initiatorType;
            re && yg(ce) && (k = k.responseEnd, x += re * (k < E ? 1 : (E - P) / (k - P)));
          }
          if (--s, n += 8 * (f + x) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ad = null, Dd = null;
  function No(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function bg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function xg(e, n) {
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
  function zd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var kd = null;
  function pj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === kd ? !1 : (kd = e, !0) : (kd = null, !1);
  }
  var Sg = typeof setTimeout == "function" ? setTimeout : void 0, vj = typeof clearTimeout == "function" ? clearTimeout : void 0, wg = typeof Promise == "function" ? Promise : void 0, gj = typeof queueMicrotask == "function" ? queueMicrotask : typeof wg < "u" ? function(e) {
    return wg.resolve(null).then(e).catch(yj);
  } : Sg;
  function yj(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function sr(e) {
    return e === "head";
  }
  function jg(e, n) {
    var r = n, s = 0;
    do {
      var u = r.nextSibling;
      if (e.removeChild(r), u && u.nodeType === 8)
        if (r = u.data, r === "/$" || r === "/&") {
          if (s === 0) {
            e.removeChild(u), Oi(n);
            return;
          }
          s--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          s++;
        else if (r === "html")
          $s(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, $s(r);
          for (var f = r.firstChild; f; ) {
            var x = f.nextSibling, E = f.nodeName;
            f[He] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = x;
          }
        } else
          r === "body" && $s(e.ownerDocument.body);
      r = u;
    } while (r);
    Oi(n);
  }
  function Eg(e, n) {
    var r = e;
    e = 0;
    do {
      var s = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), s && s.nodeType === 8)
        if (r = s.data, r === "/$") {
          if (e === 0) break;
          e--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || e++;
      r = s;
    } while (r);
  }
  function Od(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Od(r), dt(r);
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
  function bj(e, n, r, s) {
    for (; e.nodeType === 1; ) {
      var u = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!s && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (s) {
        if (!e[He])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (f !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var f = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = In(e.nextSibling), e === null) break;
    }
    return null;
  }
  function xj(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ng(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ld(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ud(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Sj(e, n) {
    var r = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || r.readyState !== "loading")
      n();
    else {
      var s = function() {
        n(), r.removeEventListener("DOMContentLoaded", s);
      };
      r.addEventListener("DOMContentLoaded", s), e._reactRetry = s;
    }
  }
  function In(e) {
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
  var Bd = null;
  function Tg(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return In(e.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Cg(e) {
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
  function Rg(e, n, r) {
    switch (n = No(r), e) {
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
  function $s(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    dt(e);
  }
  var Fn = /* @__PURE__ */ new Map(), Mg = /* @__PURE__ */ new Set();
  function To(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = L.d;
  L.d = {
    f: wj,
    r: jj,
    D: Ej,
    C: Nj,
    L: Tj,
    m: Cj,
    X: Mj,
    S: Rj,
    M: _j
  };
  function wj() {
    var e = Oa.f(), n = go();
    return e || n;
  }
  function jj(e) {
    var n = St(e);
    n !== null && n.tag === 5 && n.type === "form" ? Gp(n) : Oa.r(e);
  }
  var Di = typeof document > "u" ? null : document;
  function _g(e, n, r) {
    var s = Di;
    if (s && typeof n == "string" && n) {
      var u = Ln(n);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof r == "string" && (u += '[crossorigin="' + r + '"]'), Mg.has(u) || (Mg.add(u), e = { rel: e, crossOrigin: r, href: n }, s.querySelector(u) === null && (n = s.createElement("link"), an(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function Ej(e) {
    Oa.D(e), _g("dns-prefetch", e, null);
  }
  function Nj(e, n) {
    Oa.C(e, n), _g("preconnect", e, n);
  }
  function Tj(e, n, r) {
    Oa.L(e, n, r);
    var s = Di;
    if (s && e && n) {
      var u = 'link[rel="preload"][as="' + Ln(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (u += '[imagesrcset="' + Ln(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (u += '[imagesizes="' + Ln(
        r.imageSizes
      ) + '"]')) : u += '[href="' + Ln(e) + '"]';
      var f = u;
      switch (n) {
        case "style":
          f = zi(e);
          break;
        case "script":
          f = ki(e);
      }
      Fn.has(f) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Fn.set(f, e), s.querySelector(u) !== null || n === "style" && s.querySelector(Vs(f)) || n === "script" && s.querySelector(Hs(f)) || (n = s.createElement("link"), an(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function Cj(e, n) {
    Oa.m(e, n);
    var r = Di;
    if (r && e) {
      var s = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Ln(s) + '"][href="' + Ln(e) + '"]', f = u;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ki(e);
      }
      if (!Fn.has(f) && (e = v({ rel: "modulepreload", href: e }, n), Fn.set(f, e), r.querySelector(u) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Hs(f)))
              return;
        }
        s = r.createElement("link"), an(s, "link", e), mt(s), r.head.appendChild(s);
      }
    }
  }
  function Rj(e, n, r) {
    Oa.S(e, n, r);
    var s = Di;
    if (s && e) {
      var u = zt(s).hoistableStyles, f = zi(e);
      n = n || "default";
      var x = u.get(f);
      if (!x) {
        var E = { loading: 0, preload: null };
        if (x = s.querySelector(
          Vs(f)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Fn.get(f)) && $d(e, r);
          var k = x = s.createElement("link");
          mt(k), an(k, "link", e), k._p = new Promise(function(P, re) {
            k.onload = P, k.onerror = re;
          }), k.addEventListener("load", function() {
            E.loading |= 1;
          }), k.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Co(x, n, s);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: E
        }, u.set(f, x);
      }
    }
  }
  function Mj(e, n) {
    Oa.X(e, n);
    var r = Di;
    if (r && e) {
      var s = zt(r).hoistableScripts, u = ki(e), f = s.get(u);
      f || (f = r.querySelector(Hs(u)), f || (e = v({ src: e, async: !0 }, n), (n = Fn.get(u)) && Vd(e, n), f = r.createElement("script"), mt(f), an(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(u, f));
    }
  }
  function _j(e, n) {
    Oa.M(e, n);
    var r = Di;
    if (r && e) {
      var s = zt(r).hoistableScripts, u = ki(e), f = s.get(u);
      f || (f = r.querySelector(Hs(u)), f || (e = v({ src: e, async: !0, type: "module" }, n), (n = Fn.get(u)) && Vd(e, n), f = r.createElement("script"), mt(f), an(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(u, f));
    }
  }
  function Ag(e, n, r, s) {
    var u = (u = de.current) ? To(u) : null;
    if (!u) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = zi(r.href), r = zt(
          u
        ).hoistableStyles, s = r.get(n), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = zi(r.href);
          var f = zt(
            u
          ).hoistableStyles, x = f.get(e);
          if (x || (u = u.ownerDocument || u, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, x), (f = u.querySelector(
            Vs(e)
          )) && !f._p && (x.instance = f, x.state.loading = 5), Fn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Fn.set(e, r), f || Aj(
            u,
            e,
            r,
            x.state
          ))), n && s === null)
            throw Error(l(528, ""));
          return x;
        }
        if (n && s !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ki(r), r = zt(
          u
        ).hoistableScripts, s = r.get(n), s || (s = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, s)), s) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function zi(e) {
    return 'href="' + Ln(e) + '"';
  }
  function Vs(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Dg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Aj(e, n, r, s) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? s.loading = 1 : (n = e.createElement("link"), s.preload = n, n.addEventListener("load", function() {
      return s.loading |= 1;
    }), n.addEventListener("error", function() {
      return s.loading |= 2;
    }), an(n, "link", r), mt(n), e.head.appendChild(n));
  }
  function ki(e) {
    return '[src="' + Ln(e) + '"]';
  }
  function Hs(e) {
    return "script[async]" + e;
  }
  function zg(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var s = e.querySelector(
            'style[data-href~="' + Ln(r.href) + '"]'
          );
          if (s)
            return n.instance = s, mt(s), s;
          var u = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return s = (e.ownerDocument || e).createElement(
            "style"
          ), mt(s), an(s, "style", u), Co(s, r.precedence, e), n.instance = s;
        case "stylesheet":
          u = zi(r.href);
          var f = e.querySelector(
            Vs(u)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, mt(f), f;
          s = Dg(r), (u = Fn.get(u)) && $d(s, u), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var x = f;
          return x._p = new Promise(function(E, k) {
            x.onload = E, x.onerror = k;
          }), an(f, "link", s), n.state.loading |= 4, Co(f, r.precedence, e), n.instance = f;
        case "script":
          return f = ki(r.src), (u = e.querySelector(
            Hs(f)
          )) ? (n.instance = u, mt(u), u) : (s = r, (u = Fn.get(f)) && (s = v({}, r), Vd(s, u)), e = e.ownerDocument || e, u = e.createElement("script"), mt(u), an(u, "link", s), e.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (s = n.instance, n.state.loading |= 4, Co(s, r.precedence, e));
    return n.instance;
  }
  function Co(e, n, r) {
    for (var s = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = s.length ? s[s.length - 1] : null, f = u, x = 0; x < s.length; x++) {
      var E = s[x];
      if (E.dataset.precedence === n) f = E;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function $d(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Vd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Ro = null;
  function kg(e, n, r) {
    if (Ro === null) {
      var s = /* @__PURE__ */ new Map(), u = Ro = /* @__PURE__ */ new Map();
      u.set(r, s);
    } else
      u = Ro, s = u.get(r), s || (s = /* @__PURE__ */ new Map(), u.set(r, s));
    if (s.has(e)) return s;
    for (s.set(e, null), r = r.getElementsByTagName(e), u = 0; u < r.length; u++) {
      var f = r[u];
      if (!(f[He] || f[ge] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = f.getAttribute(n) || "";
        x = e + x;
        var E = s.get(x);
        E ? E.push(f) : s.set(x, [f]);
      }
    }
    return s;
  }
  function Og(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Dj(e, n, r) {
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
  function Lg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function zj(e, n, r, s) {
    if (r.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var u = zi(s.href), f = n.querySelector(
          Vs(u)
        );
        if (f) {
          n = f._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Mo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = f, mt(f);
          return;
        }
        f = n.ownerDocument || n, s = Dg(s), (u = Fn.get(u)) && $d(s, u), f = f.createElement("link"), mt(f);
        var x = f;
        x._p = new Promise(function(E, k) {
          x.onload = E, x.onerror = k;
        }), an(f, "link", s), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Mo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Hd = 0;
  function kj(e, n) {
    return e.stylesheets && e.count === 0 && Ao(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var s = setTimeout(function() {
        if (e.stylesheets && Ao(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Hd === 0 && (Hd = 62500 * mj());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ao(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Hd ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(s), clearTimeout(u);
      };
    } : null;
  }
  function Mo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ao(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var _o = null;
  function Ao(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, _o = /* @__PURE__ */ new Map(), n.forEach(Oj, e), _o = null, Mo.call(e));
  }
  function Oj(e, n) {
    if (!(n.state.loading & 4)) {
      var r = _o.get(e);
      if (r) var s = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), _o.set(e, r);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var x = u[f];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), s = x);
        }
        s && r.set(null, s);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), f = r.get(x) || s, f === s && r.set(null, u), r.set(x, u), this.count++, s = Mo.bind(this), u.addEventListener("load", s), u.addEventListener("error", s), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), n.state.loading |= 4;
    }
  }
  var qs = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: H,
    _currentValue2: H,
    _threadCount: 0
  };
  function Lj(e, n, r, s, u, f, x, E, k) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = s, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = k, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ug(e, n, r, s, u, f, x, E, k, P, re, ce) {
    return e = new Lj(
      e,
      n,
      r,
      x,
      k,
      P,
      re,
      ce,
      E
    ), n = 1, f === !0 && (n |= 24), f = En(3, null, null, n), e.current = f, f.stateNode = e, n = xu(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: s,
      isDehydrated: r,
      cache: n
    }, Eu(f), e;
  }
  function Bg(e) {
    return e ? (e = di, e) : di;
  }
  function $g(e, n, r, s, u, f) {
    u = Bg(u), s.context === null ? s.context = u : s.pendingContext = u, s = Ka(n), s.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (s.callback = f), r = Qa(e, s, n), r !== null && (bn(r, e, n), xs(r, e, n));
  }
  function Vg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function qd(e, n) {
    Vg(e, n), (e = e.alternate) && Vg(e, n);
  }
  function Hg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = _r(e, 67108864);
      n !== null && bn(n, e, 67108864), qd(e, 67108864);
    }
  }
  function qg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Mn();
      n = B(n);
      var r = _r(e, n);
      r !== null && bn(r, e, n), qd(e, n);
    }
  }
  var Do = !0;
  function Uj(e, n, r, s) {
    var u = z.T;
    z.T = null;
    var f = L.p;
    try {
      L.p = 2, Id(e, n, r, s);
    } finally {
      L.p = f, z.T = u;
    }
  }
  function Bj(e, n, r, s) {
    var u = z.T;
    z.T = null;
    var f = L.p;
    try {
      L.p = 8, Id(e, n, r, s);
    } finally {
      L.p = f, z.T = u;
    }
  }
  function Id(e, n, r, s) {
    if (Do) {
      var u = Fd(s);
      if (u === null)
        Md(
          e,
          n,
          s,
          zo,
          r
        ), Fg(e, s);
      else if (Vj(
        u,
        e,
        n,
        r,
        s
      ))
        s.stopPropagation();
      else if (Fg(e, s), n & 4 && -1 < $j.indexOf(e)) {
        for (; u !== null; ) {
          var f = St(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var x = hn(f.pendingLanes);
                  if (x !== 0) {
                    var E = f;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var k = 1 << 31 - Yt(x);
                      E.entanglements[1] |= k, x &= ~k;
                    }
                    ha(f), (tt & 6) === 0 && (po = qt() + 500, Ls(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = _r(f, 2), E !== null && bn(E, f, 2), go(), qd(f, 2);
            }
          if (f = Fd(s), f === null && Md(
            e,
            n,
            s,
            zo,
            r
          ), f === u) break;
          u = f;
        }
        u !== null && s.stopPropagation();
      } else
        Md(
          e,
          n,
          s,
          null,
          r
        );
    }
  }
  function Fd(e) {
    return e = Gc(e), Yd(e);
  }
  var zo = null;
  function Yd(e) {
    if (zo = null, e = st(e), e !== null) {
      var n = d(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (e = h(n), e !== null) return e;
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
    return zo = e, null;
  }
  function Ig(e) {
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
        switch (be()) {
          case ze:
            return 2;
          case Qe:
            return 8;
          case nt:
          case It:
            return 32;
          case Ft:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Gd = !1, lr = null, or = null, cr = null, Is = /* @__PURE__ */ new Map(), Fs = /* @__PURE__ */ new Map(), ur = [], $j = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Fg(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        lr = null;
        break;
      case "dragenter":
      case "dragleave":
        or = null;
        break;
      case "mouseover":
      case "mouseout":
        cr = null;
        break;
      case "pointerover":
      case "pointerout":
        Is.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fs.delete(n.pointerId);
    }
  }
  function Ys(e, n, r, s, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: s,
      nativeEvent: f,
      targetContainers: [u]
    }, n !== null && (n = St(n), n !== null && Hg(n)), e) : (e.eventSystemFlags |= s, n = e.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), e);
  }
  function Vj(e, n, r, s, u) {
    switch (n) {
      case "focusin":
        return lr = Ys(
          lr,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "dragenter":
        return or = Ys(
          or,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "mouseover":
        return cr = Ys(
          cr,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return Is.set(
          f,
          Ys(
            Is.get(f) || null,
            e,
            n,
            r,
            s,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Fs.set(
          f,
          Ys(
            Fs.get(f) || null,
            e,
            n,
            r,
            s,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Yg(e) {
    var n = st(e.target);
    if (n !== null) {
      var r = d(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = h(r), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              qg(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              qg(r);
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
  function ko(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = Fd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var s = new r.constructor(
          r.type,
          r
        );
        Yc = s, r.target.dispatchEvent(s), Yc = null;
      } else
        return n = St(r), n !== null && Hg(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Gg(e, n, r) {
    ko(e) && r.delete(n);
  }
  function Hj() {
    Gd = !1, lr !== null && ko(lr) && (lr = null), or !== null && ko(or) && (or = null), cr !== null && ko(cr) && (cr = null), Is.forEach(Gg), Fs.forEach(Gg);
  }
  function Oo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Gd || (Gd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      Hj
    )));
  }
  var Lo = null;
  function Xg(e) {
    Lo !== e && (Lo = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Lo === e && (Lo = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], s = e[n + 1], u = e[n + 2];
          if (typeof s != "function") {
            if (Yd(s || r) === null)
              continue;
            break;
          }
          var f = St(r);
          f !== null && (e.splice(n, 3), n -= 3, Fu(
            f,
            {
              pending: !0,
              data: u,
              method: r.method,
              action: s
            },
            s,
            u
          ));
        }
      }
    ));
  }
  function Oi(e) {
    function n(k) {
      return Oo(k, e);
    }
    lr !== null && Oo(lr, e), or !== null && Oo(or, e), cr !== null && Oo(cr, e), Is.forEach(n), Fs.forEach(n);
    for (var r = 0; r < ur.length; r++) {
      var s = ur[r];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      Yg(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (s = 0; s < r.length; s += 3) {
        var u = r[s], f = r[s + 1], x = u[ye] || null;
        if (typeof f == "function")
          x || Xg(r);
        else if (x) {
          var E = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, x = f[ye] || null)
              E = x.formAction;
            else if (Yd(u) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[s + 1] = E : (r.splice(s, 3), s -= 3), Xg(r);
        }
      }
  }
  function Pg() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(x) {
            return u = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      u !== null && (u(), u = null), s || setTimeout(r, 20);
    }
    function r() {
      if (!s && !navigation.transition) {
        var f = navigation.currentEntry;
        f && f.url != null && navigation.navigate(f.url, {
          state: f.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var s = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        s = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), u !== null && (u(), u = null);
      };
    }
  }
  function Xd(e) {
    this._internalRoot = e;
  }
  Uo.prototype.render = Xd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var r = n.current, s = Mn();
    $g(r, s, e, n, null, null);
  }, Uo.prototype.unmount = Xd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      $g(e.current, 2, null, e, null, null), go(), n[Ee] = null;
    }
  };
  function Uo(e) {
    this._internalRoot = e;
  }
  Uo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = fe();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < ur.length && n !== 0 && n < ur[r].priority; r++) ;
      ur.splice(r, 0, e), r === 0 && Yg(e);
    }
  };
  var Kg = a.version;
  if (Kg !== "19.2.5")
    throw Error(
      l(
        527,
        Kg,
        "19.2.5"
      )
    );
  L.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var qj = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Bo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Bo.isDisabled && Bo.supportsFiber)
      try {
        Zn = Bo.inject(
          qj
        ), Jt = Bo;
      } catch {
      }
  }
  return Xs.createRoot = function(e, n) {
    if (!o(e)) throw Error(l(299));
    var r = !1, s = "", u = nv, f = av, x = rv;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Ug(
      e,
      1,
      !1,
      null,
      null,
      r,
      s,
      null,
      u,
      f,
      x,
      Pg
    ), e[Ee] = n.current, Rd(e), new Xd(n);
  }, Xs.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(l(299));
    var s = !1, u = "", f = nv, x = av, E = rv, k = null;
    return r != null && (r.unstable_strictMode === !0 && (s = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (k = r.formState)), n = Ug(
      e,
      1,
      !0,
      n,
      r ?? null,
      s,
      u,
      k,
      f,
      x,
      E,
      Pg
    ), n.context = Bg(null), r = n.current, s = Mn(), s = B(s), u = Ka(s), u.callback = null, Qa(r, u, s), r = s, n.current.lanes = r, it(n, r), ha(n), e[Ee] = n.current, Rd(e), new Uo(n);
  }, Xs.version = "19.2.5", Xs;
}
var iy;
function Wj() {
  if (iy) return Qd.exports;
  iy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Qd.exports = Jj(), Qd.exports;
}
var eE = Wj();
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
var lx = (t) => {
  throw TypeError(t);
}, tE = (t, a, i) => a.has(t) || lx("Cannot " + i), ef = (t, a, i) => (tE(t, a, "read from private field"), i ? i.call(t) : a.get(t)), nE = (t, a, i) => a.has(t) ? lx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i);
function sy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function aE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: l = !1 } = t, o;
  o = a.map(
    (S, j) => b(
      S,
      typeof S == "string" ? null : S.state,
      j === 0 ? "default" : void 0,
      typeof S == "string" ? void 0 : S.unstable_mask
    )
  );
  let d = g(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function g(S) {
    return Math.min(Math.max(S, 0), o.length - 1);
  }
  function p() {
    return o[d];
  }
  function b(S, j = null, N, C) {
    let R = Ff(
      o ? p().pathname : "/",
      S,
      j,
      N,
      C
    );
    return _t(
      R.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        S
      )}`
    ), R;
  }
  function v(S) {
    return typeof S == "string" ? S : pa(S);
  }
  return {
    get index() {
      return d;
    },
    get action() {
      return h;
    },
    get location() {
      return p();
    },
    createHref: v,
    createURL(S) {
      return new URL(v(S), "http://localhost");
    },
    encodeLocation(S) {
      let j = typeof S == "string" ? ia(S) : S;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(S, j) {
      h = "PUSH";
      let N = sy(S) ? S : b(S, j);
      d += 1, o.splice(d, o.length, N), l && m && m({ action: h, location: N, delta: 1 });
    },
    replace(S, j) {
      h = "REPLACE";
      let N = sy(S) ? S : b(S, j);
      o[d] = N, l && m && m({ action: h, location: N, delta: 0 });
    },
    go(S) {
      h = "POP";
      let j = g(d + S), N = o[j];
      d = j, m && m({ action: h, location: N, delta: S });
    },
    listen(S) {
      return m = S, () => {
        m = null;
      };
    }
  };
}
function Ie(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function _t(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function rE() {
  return Math.random().toString(36).substring(2, 10);
}
function Ff(t, a, i = null, l, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ia(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || rE(),
    unstable_mask: o
  };
}
function pa({
  pathname: t = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (t += i.charAt(0) === "#" ? i : "#" + i), t;
}
function ia(t) {
  let a = {};
  if (t) {
    let i = t.indexOf("#");
    i >= 0 && (a.hash = t.substring(i), t = t.substring(0, i));
    let l = t.indexOf("?");
    l >= 0 && (a.search = t.substring(l), t = t.substring(0, l)), t && (a.pathname = t);
  }
  return a;
}
function iE(t, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Ie(i, "No window.location.(origin|href) available to create URL");
  let l = typeof t == "string" ? t : pa(t);
  return l = l.replace(/ $/, "%20"), !a && l.startsWith("//") && (l = i + l), new URL(l, i);
}
var rl, ly = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (nE(this, rl, /* @__PURE__ */ new Map()), t)
      for (let [a, i] of t)
        this.set(a, i);
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
    if (ef(this, rl).has(t))
      return ef(this, rl).get(t);
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
    ef(this, rl).set(t, a);
  }
};
rl = /* @__PURE__ */ new WeakMap();
var sE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function lE(t) {
  return sE.has(
    t
  );
}
var oE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function cE(t) {
  return oE.has(
    t
  );
}
function uE(t) {
  return t.index === !0;
}
function dl(t, a, i = [], l = {}, o = !1) {
  return t.map((d, h) => {
    let m = [...i, String(h)], g = typeof d.id == "string" ? d.id : m.join("-");
    if (Ie(
      d.index !== !0 || !d.children,
      "Cannot specify children on an index route"
    ), Ie(
      o || !l[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), uE(d)) {
      let p = {
        ...d,
        id: g
      };
      return l[g] = oy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...d,
        id: g,
        children: void 0
      };
      return l[g] = oy(
        p,
        a(p)
      ), d.children && (p.children = dl(
        d.children,
        a,
        m,
        l,
        o
      )), p;
    }
  });
}
function oy(t, a) {
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
function vr(t, a, i = "/") {
  return il(t, a, i, !1);
}
function il(t, a, i, l) {
  let o = typeof a == "string" ? ia(a) : a, d = Kn(o.pathname || "/", i);
  if (d == null)
    return null;
  let h = ox(t);
  fE(h);
  let m = null;
  for (let g = 0; m == null && g < h.length; ++g) {
    let p = jE(d);
    m = SE(
      h[g],
      p,
      l
    );
  }
  return m;
}
function dE(t, a) {
  let { route: i, pathname: l, params: o } = t;
  return {
    id: i.id,
    pathname: l,
    params: o,
    data: a[i.id],
    loaderData: a[i.id],
    handle: i.handle
  };
}
function ox(t, a = [], i = [], l = "", o = !1) {
  let d = (h, m, g = o, p) => {
    let b = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(l) && g)
        return;
      Ie(
        b.relativePath.startsWith(l),
        `Absolute route path "${b.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(l.length);
    }
    let v = Gn([l, b.relativePath]), w = i.concat(b);
    h.children && h.children.length > 0 && (Ie(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), ox(
      h.children,
      a,
      w,
      v,
      g
    )), !(h.path == null && !h.index) && a.push({
      path: v,
      score: bE(v, h.index),
      routesMeta: w
    });
  };
  return t.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      d(h, m);
    else
      for (let g of cx(h.path))
        d(h, m, !0, g);
  }), a;
}
function cx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...l] = a, o = i.endsWith("?"), d = i.replace(/\?$/, "");
  if (l.length === 0)
    return o ? [d, ""] : [d];
  let h = cx(l.join("/")), m = [];
  return m.push(
    ...h.map(
      (g) => g === "" ? d : [d, g].join("/")
    )
  ), o && m.push(...h), m.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function fE(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : xE(
      a.routesMeta.map((l) => l.childrenIndex),
      i.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var hE = /^:[\w-]+$/, mE = 3, pE = 2, vE = 1, gE = 10, yE = -2, cy = (t) => t === "*";
function bE(t, a) {
  let i = t.split("/"), l = i.length;
  return i.some(cy) && (l += yE), a && (l += pE), i.filter((o) => !cy(o)).reduce(
    (o, d) => o + (hE.test(d) ? mE : d === "" ? vE : gE),
    l
  );
}
function xE(t, a) {
  return t.length === a.length && t.slice(0, -1).every((l, o) => l === a[o]) ? (
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
function SE(t, a, i = !1) {
  let { routesMeta: l } = t, o = {}, d = "/", h = [];
  for (let m = 0; m < l.length; ++m) {
    let g = l[m], p = m === l.length - 1, b = d === "/" ? a : a.slice(d.length) || "/", v = hc(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: p },
      b
    ), w = g.route;
    if (!v && p && i && !l[l.length - 1].route.index && (v = hc(
      {
        path: g.relativePath,
        caseSensitive: g.caseSensitive,
        end: !1
      },
      b
    )), !v)
      return null;
    Object.assign(o, v.params), h.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Gn([d, v.pathname]),
      pathnameBase: TE(
        Gn([d, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (d = Gn([d, v.pathnameBase]));
  }
  return h;
}
function hc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, l] = wE(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(i);
  if (!o) return null;
  let d = o[0], h = d.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: l.reduce(
      (p, { paramName: b, isOptional: v }, w) => {
        if (b === "*") {
          let j = m[w] || "";
          h = d.slice(0, d.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const S = m[w];
        return v && !S ? p[b] = void 0 : p[b] = (S || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: d,
    pathnameBase: h,
    pattern: t
  };
}
function wE(t, a = !1, i = !0) {
  _t(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let l = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, g, p, b) => {
      if (l.push({ paramName: m, isOptional: g != null }), g) {
        let v = b.charAt(p + h.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (l.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), l];
}
function jE(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return _t(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function Kn(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, l = t.charAt(i);
  return l && l !== "/" ? null : t.slice(i) || "/";
}
function EE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Gn([t, a]);
}
var ux = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, wh = (t) => ux.test(t);
function NE(t, a = "/") {
  let {
    pathname: i,
    search: l = "",
    hash: o = ""
  } = typeof t == "string" ? ia(t) : t, d;
  return i ? (i = Eh(i), i.startsWith("/") ? d = uy(i.substring(1), "/") : d = uy(i, a)) : d = a, {
    pathname: d,
    search: CE(l),
    hash: RE(o)
  };
}
function uy(t, a) {
  let i = mc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function tf(t, a, i, l) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function dx(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function jh(t) {
  let a = dx(t);
  return a.map(
    (i, l) => l === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Rc(t, a, i, l = !1) {
  let o;
  typeof t == "string" ? o = ia(t) : (o = { ...t }, Ie(
    !o.pathname || !o.pathname.includes("?"),
    tf("?", "pathname", "search", o)
  ), Ie(
    !o.pathname || !o.pathname.includes("#"),
    tf("#", "pathname", "hash", o)
  ), Ie(
    !o.search || !o.search.includes("#"),
    tf("#", "search", "hash", o)
  ));
  let d = t === "" || o.pathname === "", h = d ? "/" : o.pathname, m;
  if (h == null)
    m = i;
  else {
    let v = a.length - 1;
    if (!l && h.startsWith("..")) {
      let w = h.split("/");
      for (; w[0] === ".."; )
        w.shift(), v -= 1;
      o.pathname = w.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let g = NE(o, m), p = h && h !== "/" && h.endsWith("/"), b = (d || h === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (p || b) && (g.pathname += "/"), g;
}
var Eh = (t) => t.replace(/\/\/+/g, "/"), Gn = (t) => Eh(t.join("/")), mc = (t) => t.replace(/\/+$/, ""), TE = (t) => mc(t).replace(/^\/*/, "/"), CE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, RE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, ME = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let l = new Headers(i.headers);
  return l.set("Location", t), new Response(null, { ...i, headers: l });
}, Mc = class {
  constructor(t, a, i, l = !1) {
    this.status = t, this.statusText = a || "", this.internal = l, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function fl(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function yl(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Gn(a) || "/";
}
var fx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function hx(t, a) {
  let i = t;
  if (typeof i != "string" || !ux.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let l = i, o = !1;
  if (fx)
    try {
      let d = new URL(window.location.href), h = i.startsWith("//") ? new URL(d.protocol + i) : new URL(i), m = Kn(h.pathname, a);
      h.origin === d.origin && m != null ? i = m + h.search + h.hash : o = !0;
    } catch {
      _t(
        !1,
        `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: l,
    isExternal: o,
    to: i
  };
}
var yr = Symbol("Uninstrumented");
function _E(t, a) {
  let i = {
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
      instrument(d) {
        let h = Object.keys(i);
        for (let m of h)
          d[m] && i[m].push(d[m]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let o = qi(i.lazy, a.lazy, () => {
    });
    o && (l.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((d) => {
      let h = o[d], m = i[`lazy.${d}`];
      if (typeof h == "function" && m.length > 0) {
        let g = qi(m, h, () => {
        });
        g && (l.lazy = Object.assign(l.lazy || {}, {
          [d]: g
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let d = a[o];
    if (typeof d == "function" && i[o].length > 0) {
      let h = d[yr] ?? d, m = qi(
        i[o],
        h,
        (...g) => dy(g[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yr] = h, l[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (l.middleware = a.middleware.map((o) => {
    let d = o[yr] ?? o, h = qi(
      i.middleware,
      d,
      (...m) => dy(m[0])
    );
    return h ? (h[yr] = d, h) : o;
  })), l;
}
function AE(t, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (l) => l({
      instrument(o) {
        let d = Object.keys(o);
        for (let h of d)
          o[h] && i[h].push(o[h]);
      }
    })
  ), i.navigate.length > 0) {
    let l = t.navigate[yr] ?? t.navigate, o = qi(
      i.navigate,
      l,
      (...d) => {
        let [h, m] = d;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? pa(h) : ".",
          ...fy(t, m ?? {})
        };
      }
    );
    o && (o[yr] = l, t.navigate = o);
  }
  if (i.fetch.length > 0) {
    let l = t.fetch[yr] ?? t.fetch, o = qi(i.fetch, l, (...d) => {
      let [h, , m, g] = d;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...fy(t, g ?? {})
      };
    });
    o && (o[yr] = l, t.fetch = o);
  }
  return t;
}
function qi(t, a, i) {
  return t.length === 0 ? null : async (...l) => {
    let o = await mx(
      t,
      i(...l),
      () => a(...l),
      t.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function mx(t, a, i, l) {
  let o = t[l], d;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = mx(t, a, i, l - 1), d = await h, Ie(d, "Expected a result"), d.type === "error" && d.value instanceof Error ? { status: "error", error: d.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (g) {
      console.error("An instrumentation function threw an error:", g);
    }
    h || await m(), await h;
  } else
    try {
      d = { type: "success", value: await i() };
    } catch (h) {
      d = { type: "error", value: h };
    }
  return d || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function dy(t) {
  let { request: a, context: i, params: l, unstable_pattern: o } = t;
  return {
    request: DE(a),
    params: { ...l },
    unstable_pattern: o,
    context: zE(i)
  };
}
function fy(t, a) {
  return {
    currentUrl: pa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function DE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function zE(t) {
  if (OE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var kE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function OE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === kE;
}
var px = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], LE = new Set(
  px
), UE = [
  "GET",
  ...px
], BE = new Set(UE), vx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), $E = /* @__PURE__ */ new Set([307, 308]), nf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, VE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Ps = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, HE = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), gx = "remix-router-transitions", yx = Symbol("ResetLoaderData");
function qE(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ie(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = t.hydrationRouteProperties || [], o = t.mapRouteProperties || HE, d = o;
  if (t.unstable_instrumentations) {
    let A = t.unstable_instrumentations;
    d = (B) => ({
      ...o(B),
      ..._E(
        A.map((G) => G.route).filter(Boolean),
        B
      )
    });
  }
  let h = {}, m = dl(
    t.routes,
    d,
    void 0,
    h
  ), g, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || XE, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, C = null, R = t.hydrationData != null, D = vr(m, t.history.location, p), O = !1, T = null, V, K;
  if (D == null && !t.patchRoutesOnNavigation) {
    let A = Yn(404, {
      pathname: t.history.location.pathname
    }), { matches: B, route: G } = $o(m);
    V = !0, K = !V, D = B, T = { [G.id]: A };
  } else if (D && !t.hydrationData && wn(
    D,
    m,
    t.history.location.pathname
  ).active && (D = null), D)
    if (D.some((A) => A.route.lazy))
      V = !1, K = !V;
    else if (!D.some((A) => Nh(A.route)))
      V = !0, K = !V;
    else {
      let A = t.hydrationData ? t.hydrationData.loaderData : null, B = t.hydrationData ? t.hydrationData.errors : null, G = D;
      if (B) {
        let fe = D.findIndex(
          (he) => B[he.route.id] !== void 0
        );
        G = G.slice(0, fe + 1);
      }
      K = !1, V = !0, G.forEach((fe) => {
        let he = bx(fe.route, A, B);
        K = K || he.renderFallback, V = V && !he.shouldLoad;
      });
    }
  else {
    V = !1, K = !V, D = [];
    let A = wn(
      null,
      m,
      t.history.location.pathname
    );
    A.active && A.matches && (O = !0, D = A.matches);
  }
  let ne, _ = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: D,
    initialized: V,
    renderFallback: K,
    navigation: nf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || T,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Y = "POP", $ = null, se = !1, ae, ee = !1, ue = /* @__PURE__ */ new Map(), W = null, z = !1, L = !1, H = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Map(), ie = 0, M = -1, J = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Map(), le = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Set(), ve = /* @__PURE__ */ new Map(), Te, Ve = null;
  function Zt() {
    if (w = t.history.listen(
      ({ action: A, location: B, delta: G }) => {
        if (Te) {
          Te(), Te = void 0;
          return;
        }
        _t(
          ve.size === 0 || G != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let fe = la({
          currentLocation: _.location,
          nextLocation: B,
          historyAction: A
        });
        if (fe && G != null) {
          let he = new Promise((we) => {
            Te = we;
          });
          t.history.go(G * -1), Jn(fe, {
            state: "blocked",
            location: B,
            proceed() {
              Jn(fe, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: B
              }), he.then(() => t.history.go(G));
            },
            reset() {
              let we = new Map(_.blockers);
              we.set(fe, Ps), et({ blockers: we });
            }
          }), $?.resolve(), $ = null;
          return;
        }
        return De(A, B);
      }
    ), i) {
      dN(a, ue);
      let A = () => fN(a, ue);
      a.addEventListener("pagehide", A), W = () => a.removeEventListener("pagehide", A);
    }
    return _.initialized || De("POP", _.location, {
      initialHydration: !0
    }), ne;
  }
  function Pt() {
    w && w(), W && W(), S.clear(), ae && ae.abort(), _.fetchers.forEach((A, B) => Zn(B)), _.blockers.forEach((A, B) => ga(B));
  }
  function At(A) {
    return S.add(A), () => S.delete(A);
  }
  function et(A, B = {}) {
    A.matches && (A.matches = A.matches.map((he) => {
      let we = h[he.route.id], ge = he.route;
      return ge.element !== we.element || ge.errorElement !== we.errorElement || ge.hydrateFallbackElement !== we.hydrateFallbackElement ? {
        ...he,
        route: we
      } : he;
    })), _ = {
      ..._,
      ...A
    };
    let G = [], fe = [];
    _.fetchers.forEach((he, we) => {
      he.state === "idle" && (de.has(we) ? G.push(we) : fe.push(we));
    }), de.forEach((he) => {
      !_.fetchers.has(he) && !q.has(he) && G.push(he);
    }), [...S].forEach(
      (he) => he(_, {
        deletedFetchers: G,
        newErrors: A.errors ?? null,
        viewTransitionOpts: B.viewTransitionOpts,
        flushSync: B.flushSync === !0
      })
    ), G.forEach((he) => Zn(he)), fe.forEach((he) => _.fetchers.delete(he));
  }
  function pt(A, B, { flushSync: G } = {}) {
    let fe = _.actionData != null && _.navigation.formMethod != null && on(_.navigation.formMethod) && _.navigation.state === "loading" && A.state?._isRedirect !== !0, he;
    B.actionData ? Object.keys(B.actionData).length > 0 ? he = B.actionData : he = null : fe ? he = _.actionData : he = null;
    let we = B.loaderData ? jy(
      _.loaderData,
      B.loaderData,
      B.matches || [],
      B.errors
    ) : _.loaderData, ge = _.blockers;
    ge.size > 0 && (ge = new Map(ge), ge.forEach((_e, Ce) => ge.set(Ce, Ps)));
    let ye = z ? !1 : Gt(A, B.matches || _.matches), Ee = se === !0 || _.navigation.formMethod != null && on(_.navigation.formMethod) && A.state?._isRedirect !== !0;
    g && (m = g, g = void 0), z || Y === "POP" || (Y === "PUSH" ? t.history.push(A, A.state) : Y === "REPLACE" && t.history.replace(A, A.state));
    let xe;
    if (Y === "POP") {
      let _e = ue.get(_.location.pathname);
      _e && _e.has(A.pathname) ? xe = {
        currentLocation: _.location,
        nextLocation: A
      } : ue.has(A.pathname) && (xe = {
        currentLocation: A,
        nextLocation: _.location
      });
    } else if (ee) {
      let _e = ue.get(_.location.pathname);
      _e ? _e.add(A.pathname) : (_e = /* @__PURE__ */ new Set([A.pathname]), ue.set(_.location.pathname, _e)), xe = {
        currentLocation: _.location,
        nextLocation: A
      };
    }
    et(
      {
        ...B,
        // matches, errors, fetchers go through as-is
        actionData: he,
        loaderData: we,
        historyAction: Y,
        location: A,
        initialized: !0,
        renderFallback: !1,
        navigation: nf,
        revalidation: "idle",
        restoreScrollPosition: ye,
        preventScrollReset: Ee,
        blockers: ge
      },
      {
        viewTransitionOpts: xe,
        flushSync: G === !0
      }
    ), Y = "POP", se = !1, ee = !1, z = !1, L = !1, $?.resolve(), $ = null, Ve?.resolve(), Ve = null;
  }
  async function me(A, B) {
    if ($?.resolve(), $ = null, typeof A == "number") {
      $ || ($ = Cy());
      let dt = $.promise;
      return t.history.go(A), dt;
    }
    let G = Yf(
      _.location,
      _.matches,
      p,
      A,
      B?.fromRouteId,
      B?.relative
    ), { path: fe, submission: he, error: we } = hy(
      !1,
      G,
      B
    ), ge;
    B?.unstable_mask && (ge = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof B.unstable_mask == "string" ? ia(B.unstable_mask) : {
        ..._.location.unstable_mask,
        ...B.unstable_mask
      }
    });
    let ye = _.location, Ee = Ff(
      ye,
      fe,
      B && B.state,
      void 0,
      ge
    );
    Ee = {
      ...Ee,
      ...t.history.encodeLocation(Ee)
    };
    let xe = B && B.replace != null ? B.replace : void 0, _e = "PUSH";
    xe === !0 ? _e = "REPLACE" : xe === !1 || he != null && on(he.formMethod) && he.formAction === _.location.pathname + _.location.search && (_e = "REPLACE");
    let Ce = B && "preventScrollReset" in B ? B.preventScrollReset === !0 : void 0, Ze = (B && B.flushSync) === !0, He = la({
      currentLocation: ye,
      nextLocation: Ee,
      historyAction: _e
    });
    if (He) {
      Jn(He, {
        state: "blocked",
        location: Ee,
        proceed() {
          Jn(He, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ee
          }), me(A, B);
        },
        reset() {
          let dt = new Map(_.blockers);
          dt.set(He, Ps), et({ blockers: dt });
        }
      });
      return;
    }
    await De(_e, Ee, {
      submission: he,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: we,
      preventScrollReset: Ce,
      replace: B && B.replace,
      enableViewTransition: B && B.viewTransition,
      flushSync: Ze,
      callSiteDefaultShouldRevalidate: B && B.unstable_defaultShouldRevalidate
    });
  }
  function Oe() {
    Ve || (Ve = Cy()), nt(), et({ revalidation: "loading" });
    let A = Ve.promise;
    return _.navigation.state === "submitting" ? A : _.navigation.state === "idle" ? (De(_.historyAction, _.location, {
      startUninterruptedRevalidation: !0
    }), A) : (De(
      Y || _.historyAction,
      _.navigation.location,
      {
        overrideNavigation: _.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ee === !0
      }
    ), A);
  }
  async function De(A, B, G) {
    ae && ae.abort(), ae = null, Y = A, z = (G && G.startUninterruptedRevalidation) === !0, Dt(_.location, _.matches), se = (G && G.preventScrollReset) === !0, ee = (G && G.enableViewTransition) === !0;
    let fe = g || m, he = G && G.overrideNavigation, we = G?.initialHydration && _.matches && _.matches.length > 0 && !O ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      _.matches
    ) : vr(fe, B, p), ge = (G && G.flushSync) === !0;
    if (we && _.initialized && !L && tN(_.location, B) && !(G && G.submission && on(G.submission.formMethod))) {
      pt(B, { matches: we }, { flushSync: ge });
      return;
    }
    let ye = wn(we, fe, B.pathname);
    if (ye.active && ye.matches && (we = ye.matches), !we) {
      let { error: st, notFoundMatches: St, route: Fe } = hn(
        B.pathname
      );
      pt(
        B,
        {
          matches: St,
          loaderData: {},
          errors: {
            [Fe.id]: st
          }
        },
        { flushSync: ge }
      );
      return;
    }
    ae = new AbortController();
    let Ee = Vi(
      t.history,
      B,
      ae.signal,
      G && G.submission
    ), xe = t.getContext ? await t.getContext() : new ly(), _e;
    if (G && G.pendingError)
      _e = [
        gr(we).route.id,
        { type: "error", error: G.pendingError }
      ];
    else if (G && G.submission && on(G.submission.formMethod)) {
      let st = await Re(
        Ee,
        B,
        G.submission,
        we,
        xe,
        ye.active,
        G && G.initialHydration === !0,
        { replace: G.replace, flushSync: ge }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [St, Fe] = st.pendingActionResult;
        if (An(Fe) && fl(Fe.error) && Fe.error.status === 404) {
          ae = null, pt(B, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [St]: Fe.error
            }
          });
          return;
        }
      }
      we = st.matches || we, _e = st.pendingActionResult, he = af(B, G.submission), ge = !1, ye.active = !1, Ee = Vi(
        t.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Ce,
      matches: Ze,
      loaderData: He,
      errors: dt
    } = await bt(
      Ee,
      B,
      we,
      xe,
      ye.active,
      he,
      G && G.submission,
      G && G.fetcherSubmission,
      G && G.replace,
      G && G.initialHydration === !0,
      ge,
      _e,
      G && G.callSiteDefaultShouldRevalidate
    );
    Ce || (ae = null, pt(B, {
      matches: Ze || we,
      ...Ey(_e),
      loaderData: He,
      errors: dt
    }));
  }
  async function Re(A, B, G, fe, he, we, ge, ye = {}) {
    nt();
    let Ee = cN(B, G);
    if (et({ navigation: Ee }, { flushSync: ye.flushSync === !0 }), we) {
      let Ce = await it(
        fe,
        B.pathname,
        A.signal
      );
      if (Ce.type === "aborted")
        return { shortCircuited: !0 };
      if (Ce.type === "error") {
        if (Ce.partialMatches.length === 0) {
          let { matches: He, route: dt } = $o(m);
          return {
            matches: He,
            pendingActionResult: [
              dt.id,
              {
                type: "error",
                error: Ce.error
              }
            ]
          };
        }
        let Ze = gr(Ce.partialMatches).route.id;
        return {
          matches: Ce.partialMatches,
          pendingActionResult: [
            Ze,
            {
              type: "error",
              error: Ce.error
            }
          ]
        };
      } else if (Ce.matches)
        fe = Ce.matches;
      else {
        let { notFoundMatches: Ze, error: He, route: dt } = hn(
          B.pathname
        );
        return {
          matches: Ze,
          pendingActionResult: [
            dt.id,
            {
              type: "error",
              error: He
            }
          ]
        };
      }
    }
    let xe, _e = ic(fe, B);
    if (!_e.route.action && !_e.route.lazy)
      xe = {
        type: "error",
        error: Yn(405, {
          method: A.method,
          pathname: B.pathname,
          routeId: _e.route.id
        })
      };
    else {
      let Ce = Yi(
        d,
        h,
        A,
        B,
        fe,
        _e,
        ge ? [] : l,
        he
      ), Ze = await ze(
        A,
        B,
        Ce,
        he,
        null
      );
      if (xe = Ze[_e.route.id], !xe) {
        for (let He of fe)
          if (Ze[He.route.id]) {
            xe = Ze[He.route.id];
            break;
          }
      }
      if (A.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Fr(xe)) {
      let Ce;
      return ye && ye.replace != null ? Ce = ye.replace : Ce = xy(
        xe.response.headers.get("Location"),
        new URL(A.url),
        p,
        t.history
      ) === _.location.pathname + _.location.search, await be(A, xe, !0, {
        submission: G,
        replace: Ce
      }), { shortCircuited: !0 };
    }
    if (An(xe)) {
      let Ce = gr(fe, _e.route.id);
      return (ye && ye.replace) !== !0 && (Y = "PUSH"), {
        matches: fe,
        pendingActionResult: [
          Ce.route.id,
          xe,
          _e.route.id
        ]
      };
    }
    return {
      matches: fe,
      pendingActionResult: [_e.route.id, xe]
    };
  }
  async function bt(A, B, G, fe, he, we, ge, ye, Ee, xe, _e, Ce, Ze) {
    let He = we || af(B, ge), dt = ge || ye || Ty(He), st = !z && !xe;
    if (he) {
      if (st) {
        let Ct = xt(Ce);
        et(
          {
            navigation: He,
            ...Ct !== void 0 ? { actionData: Ct } : {}
          },
          {
            flushSync: _e
          }
        );
      }
      let qe = await it(
        G,
        B.pathname,
        A.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: sn, route: kt } = $o(m);
          return {
            matches: sn,
            loaderData: {},
            errors: {
              [kt.id]: qe.error
            }
          };
        }
        let Ct = gr(qe.partialMatches).route.id;
        return {
          matches: qe.partialMatches,
          loaderData: {},
          errors: {
            [Ct]: qe.error
          }
        };
      } else if (qe.matches)
        G = qe.matches;
      else {
        let { error: Ct, notFoundMatches: sn, route: kt } = hn(
          B.pathname
        );
        return {
          matches: sn,
          loaderData: {},
          errors: {
            [kt.id]: Ct
          }
        };
      }
    }
    let St = g || m, { dsMatches: Fe, revalidatingFetchers: zt } = my(
      A,
      fe,
      d,
      h,
      t.history,
      _,
      G,
      dt,
      B,
      xe ? [] : l,
      xe === !0,
      L,
      H,
      de,
      F,
      Q,
      St,
      p,
      t.patchRoutesOnNavigation != null,
      Ce,
      Ze
    );
    if (M = ++ie, !t.dataStrategy && !Fe.some((qe) => qe.shouldLoad) && !Fe.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && zt.length === 0) {
      let qe = Wr();
      return pt(
        B,
        {
          matches: G,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ce && An(Ce[1]) ? { [Ce[0]]: Ce[1].error } : null,
          ...Ey(Ce),
          ...qe ? { fetchers: new Map(_.fetchers) } : {}
        },
        { flushSync: _e }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let qe = {};
      if (!he) {
        qe.navigation = He;
        let Ct = xt(Ce);
        Ct !== void 0 && (qe.actionData = Ct);
      }
      zt.length > 0 && (qe.fetchers = un(zt)), et(qe, { flushSync: _e });
    }
    zt.forEach((qe) => {
      Tt(qe.key), qe.controller && q.set(qe.key, qe.controller);
    });
    let mt = () => zt.forEach((qe) => Tt(qe.key));
    ae && ae.signal.addEventListener(
      "abort",
      mt
    );
    let { loaderResults: qa, fetcherResults: Wn } = await Qe(
      Fe,
      zt,
      A,
      B,
      fe
    );
    if (A.signal.aborted)
      return { shortCircuited: !0 };
    ae && ae.signal.removeEventListener(
      "abort",
      mt
    ), zt.forEach((qe) => q.delete(qe.key));
    let Kt = Vo(qa);
    if (Kt)
      return await be(A, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Kt = Vo(Wn), Kt)
      return Q.add(Kt.key), await be(A, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: oa, errors: Nr } = wy(
      _,
      G,
      qa,
      Ce,
      zt,
      Wn
    );
    xe && _.errors && (Nr = { ..._.errors, ...Nr });
    let ca = Wr(), Tr = Ha(M), ei = ca || Tr || zt.length > 0;
    return {
      matches: G,
      loaderData: oa,
      errors: Nr,
      ...ei ? { fetchers: new Map(_.fetchers) } : {}
    };
  }
  function xt(A) {
    if (A && !An(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (_.actionData)
      return Object.keys(_.actionData).length === 0 ? null : _.actionData;
  }
  function un(A) {
    return A.forEach((B) => {
      let G = _.fetchers.get(B.key), fe = Ks(
        void 0,
        G ? G.data : void 0
      );
      _.fetchers.set(B.key, fe);
    }), new Map(_.fetchers);
  }
  async function Ht(A, B, G, fe) {
    Tt(A);
    let he = (fe && fe.flushSync) === !0, we = g || m, ge = Yf(
      _.location,
      _.matches,
      p,
      G,
      B,
      fe?.relative
    ), ye = vr(we, ge, p), Ee = wn(ye, we, ge);
    if (Ee.active && Ee.matches && (ye = Ee.matches), !ye) {
      Ft(
        A,
        B,
        Yn(404, { pathname: ge }),
        { flushSync: he }
      );
      return;
    }
    let { path: xe, submission: _e, error: Ce } = hy(
      !0,
      ge,
      fe
    );
    if (Ce) {
      Ft(A, B, Ce, { flushSync: he });
      return;
    }
    let Ze = t.getContext ? await t.getContext() : new ly(), He = (fe && fe.preventScrollReset) === !0;
    if (_e && on(_e.formMethod)) {
      await kn(
        A,
        B,
        xe,
        ye,
        Ze,
        Ee.active,
        he,
        He,
        _e,
        fe && fe.unstable_defaultShouldRevalidate
      );
      return;
    }
    F.set(A, { routeId: B, path: xe }), await qt(
      A,
      B,
      xe,
      ye,
      Ze,
      Ee.active,
      he,
      He,
      _e
    );
  }
  async function kn(A, B, G, fe, he, we, ge, ye, Ee, xe) {
    nt(), F.delete(A);
    let _e = _.fetchers.get(A);
    It(A, uN(Ee, _e), {
      flushSync: ge
    });
    let Ce = new AbortController(), Ze = Vi(
      t.history,
      G,
      Ce.signal,
      Ee
    );
    if (we) {
      let vt = await it(
        fe,
        new URL(Ze.url).pathname,
        Ze.signal,
        A
      );
      if (vt.type === "aborted")
        return;
      if (vt.type === "error") {
        Ft(A, B, vt.error, { flushSync: ge });
        return;
      } else if (vt.matches)
        fe = vt.matches;
      else {
        Ft(
          A,
          B,
          Yn(404, { pathname: G }),
          { flushSync: ge }
        );
        return;
      }
    }
    let He = ic(fe, G);
    if (!He.route.action && !He.route.lazy) {
      let vt = Yn(405, {
        method: Ee.formMethod,
        pathname: G,
        routeId: B
      });
      Ft(A, B, vt, { flushSync: ge });
      return;
    }
    q.set(A, Ce);
    let dt = ie, st = Yi(
      d,
      h,
      Ze,
      G,
      fe,
      He,
      l,
      he
    ), St = await ze(
      Ze,
      G,
      st,
      he,
      A
    ), Fe = St[He.route.id];
    if (!Fe) {
      for (let vt of st)
        if (St[vt.route.id]) {
          Fe = St[vt.route.id];
          break;
        }
    }
    if (Ze.signal.aborted) {
      q.get(A) === Ce && q.delete(A);
      return;
    }
    if (de.has(A)) {
      if (Fr(Fe) || An(Fe)) {
        It(A, La(void 0));
        return;
      }
    } else {
      if (Fr(Fe))
        if (q.delete(A), M > dt) {
          It(A, La(void 0));
          return;
        } else
          return Q.add(A), It(A, Ks(Ee)), be(Ze, Fe, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: ye
          });
      if (An(Fe)) {
        Ft(A, B, Fe.error);
        return;
      }
    }
    let zt = _.navigation.location || _.location, mt = Vi(
      t.history,
      zt,
      Ce.signal
    ), qa = g || m, Wn = _.navigation.state !== "idle" ? vr(qa, _.navigation.location, p) : _.matches;
    Ie(Wn, "Didn't find any matches after fetcher action");
    let Kt = ++ie;
    J.set(A, Kt);
    let oa = Ks(Ee, Fe.data);
    _.fetchers.set(A, oa);
    let { dsMatches: Nr, revalidatingFetchers: ca } = my(
      mt,
      he,
      d,
      h,
      t.history,
      _,
      Wn,
      Ee,
      zt,
      l,
      !1,
      L,
      H,
      de,
      F,
      Q,
      qa,
      p,
      t.patchRoutesOnNavigation != null,
      [He.route.id, Fe],
      xe
    );
    ca.filter((vt) => vt.key !== A).forEach((vt) => {
      let ti = vt.key, ni = _.fetchers.get(ti), Cl = Ks(
        void 0,
        ni ? ni.data : void 0
      );
      _.fetchers.set(ti, Cl), Tt(ti), vt.controller && q.set(ti, vt.controller);
    }), et({ fetchers: new Map(_.fetchers) });
    let Tr = () => ca.forEach((vt) => Tt(vt.key));
    Ce.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ei, fetcherResults: qe } = await Qe(
      Nr,
      ca,
      mt,
      zt,
      he
    );
    if (Ce.signal.aborted)
      return;
    if (Ce.signal.removeEventListener(
      "abort",
      Tr
    ), J.delete(A), q.delete(A), ca.forEach((vt) => q.delete(vt.key)), _.fetchers.has(A)) {
      let vt = La(Fe.data);
      _.fetchers.set(A, vt);
    }
    let Ct = Vo(ei);
    if (Ct)
      return be(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ye }
      );
    if (Ct = Vo(qe), Ct)
      return Q.add(Ct.key), be(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ye }
      );
    let { loaderData: sn, errors: kt } = wy(
      _,
      Wn,
      ei,
      void 0,
      ca,
      qe
    );
    Ha(Kt), _.navigation.state === "loading" && Kt > M ? (Ie(Y, "Expected pending action"), ae && ae.abort(), pt(_.navigation.location, {
      matches: Wn,
      loaderData: sn,
      errors: kt,
      fetchers: new Map(_.fetchers)
    })) : (et({
      errors: kt,
      loaderData: jy(
        _.loaderData,
        sn,
        Wn,
        kt
      ),
      fetchers: new Map(_.fetchers)
    }), L = !1);
  }
  async function qt(A, B, G, fe, he, we, ge, ye, Ee) {
    let xe = _.fetchers.get(A);
    It(
      A,
      Ks(
        Ee,
        xe ? xe.data : void 0
      ),
      { flushSync: ge }
    );
    let _e = new AbortController(), Ce = Vi(
      t.history,
      G,
      _e.signal
    );
    if (we) {
      let Fe = await it(
        fe,
        new URL(Ce.url).pathname,
        Ce.signal,
        A
      );
      if (Fe.type === "aborted")
        return;
      if (Fe.type === "error") {
        Ft(A, B, Fe.error, { flushSync: ge });
        return;
      } else if (Fe.matches)
        fe = Fe.matches;
      else {
        Ft(
          A,
          B,
          Yn(404, { pathname: G }),
          { flushSync: ge }
        );
        return;
      }
    }
    let Ze = ic(fe, G);
    q.set(A, _e);
    let He = ie, dt = Yi(
      d,
      h,
      Ce,
      G,
      fe,
      Ze,
      l,
      he
    ), st = await ze(
      Ce,
      G,
      dt,
      he,
      A
    ), St = st[Ze.route.id];
    if (!St) {
      for (let Fe of fe)
        if (st[Fe.route.id]) {
          St = st[Fe.route.id];
          break;
        }
    }
    if (q.get(A) === _e && q.delete(A), !Ce.signal.aborted) {
      if (de.has(A)) {
        It(A, La(void 0));
        return;
      }
      if (Fr(St))
        if (M > He) {
          It(A, La(void 0));
          return;
        } else {
          Q.add(A), await be(Ce, St, !1, {
            preventScrollReset: ye
          });
          return;
        }
      if (An(St)) {
        Ft(A, B, St.error);
        return;
      }
      It(A, La(St.data));
    }
  }
  async function be(A, B, G, {
    submission: fe,
    fetcherSubmission: he,
    preventScrollReset: we,
    replace: ge
  } = {}) {
    G || ($?.resolve(), $ = null), B.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let ye = B.response.headers.get("Location");
    Ie(ye, "Expected a Location header on the redirect Response"), ye = xy(
      ye,
      new URL(A.url),
      p,
      t.history
    );
    let Ee = Ff(_.location, ye, {
      _isRedirect: !0
    });
    if (i) {
      let dt = !1;
      if (B.response.headers.has("X-Remix-Reload-Document"))
        dt = !0;
      else if (wh(ye)) {
        const st = iE(ye, !0);
        dt = // Hard reload if it's an absolute URL to a new origin
        st.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Kn(st.pathname, p) == null;
      }
      if (dt) {
        ge ? a.location.replace(ye) : a.location.assign(ye);
        return;
      }
    }
    ae = null;
    let xe = ge === !0 || B.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: _e, formAction: Ce, formEncType: Ze } = _.navigation;
    !fe && !he && _e && Ce && Ze && (fe = Ty(_.navigation));
    let He = fe || he;
    if ($E.has(B.response.status) && He && on(He.formMethod))
      await De(xe, Ee, {
        submission: {
          ...He,
          formAction: ye
        },
        // Preserve these flags across redirects
        preventScrollReset: we || se,
        enableViewTransition: G ? ee : void 0
      });
    else {
      let dt = af(
        Ee,
        fe
      );
      await De(xe, Ee, {
        overrideNavigation: dt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: he,
        // Preserve these flags across redirects
        preventScrollReset: we || se,
        enableViewTransition: G ? ee : void 0
      });
    }
  }
  async function ze(A, B, G, fe, he) {
    let we, ge = {};
    try {
      we = await KE(
        b,
        A,
        B,
        G,
        he,
        fe,
        !1
      );
    } catch (ye) {
      return G.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        ge[Ee.route.id] = {
          type: "error",
          error: ye
        };
      }), ge;
    }
    if (A.signal.aborted)
      return ge;
    if (!on(A.method))
      for (let ye of G) {
        if (we[ye.route.id]?.type === "error")
          break;
        !we.hasOwnProperty(ye.route.id) && !_.loaderData.hasOwnProperty(ye.route.id) && (!_.errors || !_.errors.hasOwnProperty(ye.route.id)) && ye.shouldCallHandler() && (we[ye.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ye.route.id}`
          )
        });
      }
    for (let [ye, Ee] of Object.entries(we))
      if (iN(Ee)) {
        let xe = Ee.result;
        ge[ye] = {
          type: "redirect",
          response: WE(
            xe,
            A,
            ye,
            G,
            p
          )
        };
      } else
        ge[ye] = await JE(Ee);
    return ge;
  }
  async function Qe(A, B, G, fe, he) {
    let we = ze(
      G,
      fe,
      A,
      he,
      null
    ), ge = Promise.all(
      B.map(async (xe) => {
        if (xe.matches && xe.match && xe.request && xe.controller) {
          let Ce = (await ze(
            xe.request,
            xe.path,
            xe.matches,
            he,
            xe.key
          ))[xe.match.route.id];
          return { [xe.key]: Ce };
        } else
          return Promise.resolve({
            [xe.key]: {
              type: "error",
              error: Yn(404, {
                pathname: xe.path
              })
            }
          });
      })
    ), ye = await we, Ee = (await ge).reduce(
      (xe, _e) => Object.assign(xe, _e),
      {}
    );
    return {
      loaderResults: ye,
      fetcherResults: Ee
    };
  }
  function nt() {
    L = !0, F.forEach((A, B) => {
      q.has(B) && H.add(B), Tt(B);
    });
  }
  function It(A, B, G = {}) {
    _.fetchers.set(A, B), et(
      { fetchers: new Map(_.fetchers) },
      { flushSync: (G && G.flushSync) === !0 }
    );
  }
  function Ft(A, B, G, fe = {}) {
    let he = gr(_.matches, B);
    Zn(A), et(
      {
        errors: {
          [he.route.id]: G
        },
        fetchers: new Map(_.fetchers)
      },
      { flushSync: (fe && fe.flushSync) === !0 }
    );
  }
  function Er(A) {
    return le.set(A, (le.get(A) || 0) + 1), de.has(A) && de.delete(A), _.fetchers.get(A) || VE;
  }
  function sa(A, B) {
    Tt(A, B?.reason), It(A, La(null));
  }
  function Zn(A) {
    let B = _.fetchers.get(A);
    q.has(A) && !(B && B.state === "loading" && J.has(A)) && Tt(A), F.delete(A), J.delete(A), Q.delete(A), de.delete(A), H.delete(A), _.fetchers.delete(A);
  }
  function Jt(A) {
    let B = (le.get(A) || 0) - 1;
    B <= 0 ? (le.delete(A), de.add(A)) : le.set(A, B), et({ fetchers: new Map(_.fetchers) });
  }
  function Tt(A, B) {
    let G = q.get(A);
    G && (G.abort(B), q.delete(A));
  }
  function Yt(A) {
    for (let B of A) {
      let G = Er(B), fe = La(G.data);
      _.fetchers.set(B, fe);
    }
  }
  function Wr() {
    let A = [], B = !1;
    for (let G of Q) {
      let fe = _.fetchers.get(G);
      Ie(fe, `Expected fetcher: ${G}`), fe.state === "loading" && (Q.delete(G), A.push(G), B = !0);
    }
    return Yt(A), B;
  }
  function Ha(A) {
    let B = [];
    for (let [G, fe] of J)
      if (fe < A) {
        let he = _.fetchers.get(G);
        Ie(he, `Expected fetcher: ${G}`), he.state === "loading" && (Tt(G), J.delete(G), B.push(G));
      }
    return Yt(B), B.length > 0;
  }
  function On(A, B) {
    let G = _.blockers.get(A) || Ps;
    return ve.get(A) !== B && ve.set(A, B), G;
  }
  function ga(A) {
    _.blockers.delete(A), ve.delete(A);
  }
  function Jn(A, B) {
    let G = _.blockers.get(A) || Ps;
    Ie(
      G.state === "unblocked" && B.state === "blocked" || G.state === "blocked" && B.state === "blocked" || G.state === "blocked" && B.state === "proceeding" || G.state === "blocked" && B.state === "unblocked" || G.state === "proceeding" && B.state === "unblocked",
      `Invalid blocker state transition: ${G.state} -> ${B.state}`
    );
    let fe = new Map(_.blockers);
    fe.set(A, B), et({ blockers: fe });
  }
  function la({
    currentLocation: A,
    nextLocation: B,
    historyAction: G
  }) {
    if (ve.size === 0)
      return;
    ve.size > 1 && _t(!1, "A router only supports one blocker at a time");
    let fe = Array.from(ve.entries()), [he, we] = fe[fe.length - 1], ge = _.blockers.get(he);
    if (!(ge && ge.state === "proceeding") && we({ currentLocation: A, nextLocation: B, historyAction: G }))
      return he;
  }
  function hn(A) {
    let B = Yn(404, { pathname: A }), G = g || m, { matches: fe, route: he } = $o(G);
    return { notFoundMatches: fe, route: he, error: B };
  }
  function ke(A, B, G) {
    if (j = A, C = B, N = G || null, !R && _.navigation === nf) {
      R = !0;
      let fe = Gt(_.location, _.matches);
      fe != null && et({ restoreScrollPosition: fe });
    }
    return () => {
      j = null, C = null, N = null;
    };
  }
  function ut(A, B) {
    return N && N(
      A,
      B.map((fe) => dE(fe, _.loaderData))
    ) || A.key;
  }
  function Dt(A, B) {
    if (j && C) {
      let G = ut(A, B);
      j[G] = C();
    }
  }
  function Gt(A, B) {
    if (j) {
      let G = ut(A, B), fe = j[G];
      if (typeof fe == "number")
        return fe;
    }
    return null;
  }
  function wn(A, B, G) {
    if (t.patchRoutesOnNavigation)
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: il(
            B,
            G,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: il(
          B,
          G,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function it(A, B, G, fe) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: A };
    let he = A;
    for (; ; ) {
      let we = g == null, ge = g || m, ye = h;
      try {
        await t.patchRoutesOnNavigation({
          signal: G,
          path: B,
          matches: he,
          fetcherKey: fe,
          patch: (_e, Ce) => {
            G.aborted || py(
              _e,
              Ce,
              ge,
              ye,
              d,
              !1
            );
          }
        });
      } catch (_e) {
        return { type: "error", error: _e, partialMatches: he };
      } finally {
        we && !G.aborted && (m = [...m]);
      }
      if (G.aborted)
        return { type: "aborted" };
      let Ee = vr(ge, B, p), xe = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (xe = il(
          ge,
          B,
          p,
          !0
        ), !(xe && he.length < xe.length && Wt(
          he,
          xe.slice(0, he.length)
        )))
          return { type: "success", matches: Ee };
      }
      if (xe || (xe = il(
        ge,
        B,
        p,
        !0
      )), !xe || Wt(he, xe))
        return { type: "success", matches: null };
      he = xe;
    }
  }
  function Wt(A, B) {
    return A.length === B.length && A.every((G, fe) => G.route.id === B[fe].route.id);
  }
  function ya(A) {
    h = {}, g = dl(
      A,
      d,
      void 0,
      h
    );
  }
  function rn(A, B, G = !1) {
    let fe = g == null;
    py(
      A,
      B,
      g || m,
      h,
      d,
      G
    ), fe && (m = [...m], et({}));
  }
  return ne = {
    get basename() {
      return p;
    },
    get future() {
      return v;
    },
    get state() {
      return _;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: Zt,
    subscribe: At,
    enableScrollRestoration: ke,
    navigate: me,
    fetch: Ht,
    revalidate: Oe,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => t.history.createHref(A),
    encodeLocation: (A) => t.history.encodeLocation(A),
    getFetcher: Er,
    resetFetcher: sa,
    deleteFetcher: Jt,
    dispose: Pt,
    getBlocker: On,
    deleteBlocker: ga,
    patchRoutes: rn,
    _internalFetchControllers: q,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ya,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
      et(A);
    }
  }, t.unstable_instrumentations && (ne = AE(
    ne,
    t.unstable_instrumentations.map((A) => A.router).filter(Boolean)
  )), ne;
}
function IE(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Yf(t, a, i, l, o, d) {
  let h, m;
  if (o) {
    h = [];
    for (let p of a)
      if (h.push(p), p.route.id === o) {
        m = p;
        break;
      }
  } else
    h = a, m = a[a.length - 1];
  let g = Rc(
    l || ".",
    jh(h),
    Kn(t.pathname, i) || t.pathname,
    d === "path"
  );
  if (l == null && (g.search = t.search, g.hash = t.hash), (l == null || l === "" || l === ".") && m) {
    let p = Ch(g.search);
    if (m.route.index && !p)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      g.search = w ? `?${w}` : "";
    }
  }
  return i !== "/" && (g.pathname = EE({ basename: i, pathname: g.pathname })), pa(g);
}
function hy(t, a, i) {
  if (!i || !IE(i))
    return { path: a };
  if (i.formMethod && !oN(i.formMethod))
    return {
      path: a,
      error: Yn(405, { method: i.formMethod })
    };
  let l = () => ({
    path: a,
    error: Yn(400, { type: "invalid-body" })
  }), d = (i.formMethod || "get").toUpperCase(), h = Tx(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!on(d))
        return l();
      let v = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (w, [S, j]) => `${w}${S}=${j}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: d,
          formAction: h,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!on(d))
        return l();
      try {
        let v = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: d,
            formAction: h,
            formEncType: i.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return l();
      }
    }
  }
  Ie(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, g;
  if (i.formData)
    m = Xf(i.formData), g = i.formData;
  else if (i.body instanceof FormData)
    m = Xf(i.body), g = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, g = Sy(m);
  else if (i.body == null)
    m = new URLSearchParams(), g = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), g = Sy(m);
    } catch {
      return l();
    }
  let p = {
    formMethod: d,
    formAction: h,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (on(p.formMethod))
    return { path: a, submission: p };
  let b = ia(a);
  return t && b.search && Ch(b.search) && m.append("index", ""), b.search = `?${m}`, { path: pa(b), submission: p };
}
function my(t, a, i, l, o, d, h, m, g, p, b, v, w, S, j, N, C, R, D, O, T) {
  let V = O ? An(O[1]) ? O[1].error : O[1].data : void 0, K = o.createURL(d.location), ne = o.createURL(g), _;
  if (b && d.errors) {
    let W = Object.keys(d.errors)[0];
    _ = h.findIndex((z) => z.route.id === W);
  } else if (O && An(O[1])) {
    let W = O[0];
    _ = h.findIndex((z) => z.route.id === W) - 1;
  }
  let Y = O ? O[1].statusCode : void 0, $ = Y && Y >= 400, se = {
    currentUrl: K,
    currentParams: d.matches[0]?.params || {},
    nextUrl: ne,
    nextParams: h[0].params,
    ...m,
    actionResult: V,
    actionStatus: Y
  }, ae = yl(h), ee = h.map((W, z) => {
    let { route: L } = W, H = null;
    if (_ != null && z > _)
      H = !1;
    else if (L.lazy)
      H = !0;
    else if (!Nh(L))
      H = !1;
    else if (b) {
      let { shouldLoad: J } = bx(
        L,
        d.loaderData,
        d.errors
      );
      H = J;
    } else FE(d.loaderData, d.matches[z], W) && (H = !0);
    if (H !== null)
      return Gf(
        i,
        l,
        t,
        g,
        ae,
        W,
        p,
        a,
        H
      );
    let q = !1;
    typeof T == "boolean" ? q = T : $ ? q = !1 : (v || K.pathname + K.search === ne.pathname + ne.search || K.search !== ne.search || YE(d.matches[z], W)) && (q = !0);
    let ie = {
      ...se,
      defaultShouldRevalidate: q
    }, M = ll(W, ie);
    return Gf(
      i,
      l,
      t,
      g,
      ae,
      W,
      p,
      a,
      M,
      ie,
      T
    );
  }), ue = [];
  return j.forEach((W, z) => {
    if (b || !h.some((F) => F.route.id === W.routeId) || S.has(z))
      return;
    let L = d.fetchers.get(z), H = L && L.state !== "idle" && L.data === void 0, q = vr(C, W.path, R);
    if (!q) {
      if (D && H)
        return;
      ue.push({
        key: z,
        routeId: W.routeId,
        path: W.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(z))
      return;
    let ie = ic(q, W.path), M = new AbortController(), J = Vi(
      o,
      W.path,
      M.signal
    ), Q = null;
    if (w.has(z))
      w.delete(z), Q = Yi(
        i,
        l,
        J,
        W.path,
        q,
        ie,
        p,
        a
      );
    else if (H)
      v && (Q = Yi(
        i,
        l,
        J,
        W.path,
        q,
        ie,
        p,
        a
      ));
    else {
      let F;
      typeof T == "boolean" ? F = T : $ ? F = !1 : F = v;
      let le = {
        ...se,
        defaultShouldRevalidate: F
      };
      ll(ie, le) && (Q = Yi(
        i,
        l,
        J,
        W.path,
        q,
        ie,
        p,
        a,
        le
      ));
    }
    Q && ue.push({
      key: z,
      routeId: W.routeId,
      path: W.path,
      matches: Q,
      match: ie,
      request: J,
      controller: M
    });
  }), { dsMatches: ee, revalidatingFetchers: ue };
}
function Nh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function bx(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Nh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && t.id in a, o = i != null && i[t.id] !== void 0;
  if (!l && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let d = !l && !o;
  return { shouldLoad: d, renderFallback: d };
}
function FE(t, a, i) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !t.hasOwnProperty(i.route.id);
  return l || o;
}
function YE(t, a) {
  let i = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function ll(t, a) {
  if (t.route.shouldRevalidate) {
    let i = t.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function py(t, a, i, l, o, d) {
  let h;
  if (t) {
    let p = l[t];
    Ie(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = i;
  let m = [], g = [];
  if (a.forEach((p) => {
    let b = h.find(
      (v) => xx(p, v)
    );
    b ? g.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = dl(
      m,
      o,
      [t || "_", "patch", String(h?.length || "0")],
      l
    );
    h.push(...p);
  }
  if (d && g.length > 0)
    for (let p = 0; p < g.length; p++) {
      let { existingRoute: b, newRoute: v } = g[p], w = b, [S] = dl(
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
function xx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, l) => a.children?.some((o) => xx(i, o))
  ) ?? !1 : !1;
}
var vy = /* @__PURE__ */ new WeakMap(), Sx = ({
  key: t,
  route: a,
  manifest: i,
  mapRouteProperties: l
}) => {
  let o = i[a.id];
  if (Ie(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let d = o.lazy[t];
  if (!d)
    return;
  let h = vy.get(o);
  h || (h = {}, vy.set(o, h));
  let m = h[t];
  if (m)
    return m;
  let g = (async () => {
    let p = lE(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      _t(
        !p,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), h[t] = Promise.resolve();
    else if (v)
      _t(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let w = await d();
      w != null && (Object.assign(o, { [t]: w }), Object.assign(o, l(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((w) => w === void 0) && (o.lazy = void 0));
  })();
  return h[t] = g, g;
}, gy = /* @__PURE__ */ new WeakMap();
function GE(t, a, i, l, o) {
  let d = i[t.id];
  if (Ie(d, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = gy.get(d);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      Ie(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let C = cE(j), D = d[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        C ? _t(
          !C,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : D ? _t(
          !D,
          `Route "${d.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : S[j] = N;
      }
      Object.assign(d, S), Object.assign(d, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(d),
        lazy: void 0
      });
    })();
    return gy.set(d, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let h = Object.keys(t.lazy), m = [], g;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let v = Sx({
      key: b,
      route: t,
      manifest: i,
      mapRouteProperties: l
    });
    v && (m.push(v), b === a && (g = v));
  }
  let p = m.length > 0 ? Promise.all(m).then(() => {
  }) : void 0;
  return p?.catch(() => {
  }), g?.catch(() => {
  }), {
    lazyRoutePromise: p,
    lazyHandlerPromise: g
  };
}
async function yy(t) {
  let a = t.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, d) => {
    i[a[d].route.id] = o;
  }), i;
}
async function XE(t) {
  return t.matches.some((a) => a.route.middleware) ? wx(t, () => yy(t)) : yy(t);
}
function wx(t, a) {
  return PE(
    t,
    a,
    (l) => {
      if (lN(l))
        throw l;
      return l;
    },
    aN,
    i
  );
  function i(l, o, d) {
    if (d)
      return Promise.resolve(
        Object.assign(d.value, {
          [o]: { type: "error", result: l }
        })
      );
    {
      let { matches: h } = t, m = Math.min(
        // Throwing route
        Math.max(
          h.findIndex((p) => p.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          h.findIndex((p) => p.shouldCallHandler()),
          0
        )
      ), g = gr(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: l }
      });
    }
  }
}
async function PE(t, a, i, l, o) {
  let { matches: d, ...h } = t, m = d.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await jx(
    h,
    m,
    a,
    i,
    l,
    o
  );
}
async function jx(t, a, i, l, o, d, h = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let g = a[h];
  if (!g)
    return await i();
  let [p, b] = g, v, w = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await jx(
        t,
        a,
        i,
        l,
        o,
        d,
        h + 1
      ) }, v.value;
    } catch (S) {
      return v = { value: await d(S, p, v) }, v.value;
    }
  };
  try {
    let S = await b(t, w), j = S != null ? l(S) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await w() }, v.value);
  } catch (S) {
    return await d(S, p, v);
  }
}
function Ex(t, a, i, l, o) {
  let d = Sx({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: t
  }), h = GE(
    l.route,
    on(i.method) ? "action" : "loader",
    a,
    t,
    o
  );
  return {
    middleware: d,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Gf(t, a, i, l, o, d, h, m, g, p = null, b) {
  let v = !1, w = Ex(
    t,
    a,
    i,
    d,
    h
  );
  return {
    ...d,
    _lazyPromises: w,
    shouldLoad: g,
    shouldRevalidateArgs: p,
    shouldCallHandler(S) {
      return v = !0, p ? typeof b == "boolean" ? ll(d, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? ll(d, {
        ...p,
        defaultShouldRevalidate: S
      }) : ll(d, p) : g;
    },
    resolve(S) {
      let { lazy: j, loader: N, middleware: C } = d.route, R = v || g || S && !on(i.method) && (j || N), D = C && C.length > 0 && !N && !j;
      return R && (on(i.method) || !D) ? QE({
        request: i,
        path: l,
        unstable_pattern: o,
        match: d,
        lazyHandlerPromise: w?.handler,
        lazyRoutePromise: w?.route,
        handlerOverride: S,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Yi(t, a, i, l, o, d, h, m, g = null) {
  return o.map((p) => p.route.id !== d.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: Ex(
      t,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Gf(
    t,
    a,
    i,
    l,
    yl(o),
    p,
    h,
    m,
    !0,
    g
  ));
}
async function KE(t, a, i, l, o, d, h) {
  l.some((b) => b._lazyPromises?.middleware) && await Promise.all(l.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: Nx(a, i),
    unstable_pattern: yl(l),
    params: l[0].params,
    context: d,
    matches: l
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return wx(v, () => b({
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
      l.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function QE({
  request: t,
  path: a,
  unstable_pattern: i,
  match: l,
  lazyHandlerPromise: o,
  lazyRoutePromise: d,
  handlerOverride: h,
  scopedContext: m
}) {
  let g, p, b = on(t.method), v = b ? "action" : "loader", w = (S) => {
    let j, N = new Promise((D, O) => j = O);
    p = () => j(), t.signal.addEventListener("abort", p);
    let C = (D) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${l.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: Nx(t, a),
        unstable_pattern: i,
        params: l.params,
        context: m
      },
      ...D !== void 0 ? [D] : []
    ), R = (async () => {
      try {
        return { type: "data", result: await (h ? h((O) => C(O)) : C()) };
      } catch (D) {
        return { type: "error", result: D };
      }
    })();
    return Promise.race([R, N]);
  };
  try {
    let S = b ? l.route.action : l.route.loader;
    if (o || d)
      if (S) {
        let j, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          w(S).catch((C) => {
            j = C;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          d
        ]);
        if (j !== void 0)
          throw j;
        g = N;
      } else {
        await o;
        let j = b ? l.route.action : l.route.loader;
        if (j)
          [g] = await Promise.all([w(j), d]);
        else if (v === "action") {
          let N = new URL(t.url), C = N.pathname + N.search;
          throw Yn(405, {
            method: t.method,
            pathname: C,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (S)
      g = await w(S);
    else {
      let j = new URL(t.url), N = j.pathname + j.search;
      throw Yn(404, {
        pathname: N
      });
    }
  } catch (S) {
    return { type: "error", result: S };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return g;
}
async function ZE(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function JE(t) {
  let { result: a, type: i } = t;
  if (Th(a)) {
    let l;
    try {
      l = await ZE(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new Mc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Ny(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: nN(a),
    statusCode: fl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: fl(a) ? a.status : void 0
  } : Ny(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function WE(t, a, i, l, o) {
  let d = t.headers.get("Location");
  if (Ie(
    d,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !wh(d)) {
    let h = l.slice(
      0,
      l.findIndex((m) => m.route.id === i) + 1
    );
    d = Yf(
      new URL(a.url),
      h,
      o,
      d
    ), t.headers.set("Location", d);
  }
  return t;
}
var by = [
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
function xy(t, a, i, l) {
  if (wh(t)) {
    let o = t, d = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (by.includes(d.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(d.pathname, i) != null;
    if (d.origin === a.origin && h)
      return Eh(d.pathname) + d.search + d.hash;
  }
  try {
    let o = l.createURL(t);
    if (by.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Vi(t, a, i, l) {
  let o = t.createURL(Tx(a)).toString(), d = { signal: i };
  if (l && on(l.formMethod)) {
    let { formMethod: h, formEncType: m } = l;
    d.method = h.toUpperCase(), m === "application/json" ? (d.headers = new Headers({ "Content-Type": m }), d.body = JSON.stringify(l.json)) : m === "text/plain" ? d.body = l.text : m === "application/x-www-form-urlencoded" && l.formData ? d.body = Xf(l.formData) : d.body = l.formData;
  }
  return new Request(o, d);
}
function Nx(t, a) {
  let i = new URL(t.url), l = typeof a == "string" ? ia(a) : a;
  if (i.pathname = l.pathname || "/", l.search) {
    let o = new URLSearchParams(l.search), d = o.getAll("index");
    o.delete("index");
    for (let h of d.filter(Boolean))
      o.append("index", h);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = l.hash || "", i;
}
function Xf(t) {
  let a = new URLSearchParams();
  for (let [i, l] of t.entries())
    a.append(i, typeof l == "string" ? l : l.name);
  return a;
}
function Sy(t) {
  let a = new FormData();
  for (let [i, l] of t.entries())
    a.append(i, l);
  return a;
}
function eN(t, a, i, l = !1, o = !1) {
  let d = {}, h = null, m, g = !1, p = {}, b = i && An(i[1]) ? i[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (Ie(
      !Fr(S),
      "Cannot handle redirect results in processLoaderData"
    ), An(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), h = h || {}, o)
        h[w] = j;
      else {
        let N = gr(t, w);
        h[N.route.id] == null && (h[N.route.id] = j);
      }
      l || (d[w] = yx), g || (g = !0, m = fl(S.error) ? S.error.status : 500), S.headers && (p[w] = S.headers);
    } else
      d[w] = S.data, S.statusCode && S.statusCode !== 200 && !g && (m = S.statusCode), S.headers && (p[w] = S.headers);
  }), b !== void 0 && i && (h = { [i[0]]: b }, i[2] && (d[i[2]] = void 0)), {
    loaderData: d,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function wy(t, a, i, l, o, d) {
  let { loaderData: h, errors: m } = eN(
    a,
    i,
    l
  );
  return o.filter((g) => !g.matches || g.matches.some((p) => p.shouldLoad)).forEach((g) => {
    let { key: p, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let w = d[p];
    if (Ie(w, "Did not find corresponding fetcher result"), An(w)) {
      let S = gr(t.matches, b?.route.id);
      m && m[S.route.id] || (m = {
        ...m,
        [S.route.id]: w.error
      }), t.fetchers.delete(p);
    } else if (Fr(w))
      Ie(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = La(w.data);
      t.fetchers.set(p, S);
    }
  }), { loaderData: h, errors: m };
}
function jy(t, a, i, l) {
  let o = Object.entries(a).filter(([, d]) => d !== yx).reduce((d, [h, m]) => (d[h] = m, d), {});
  for (let d of i) {
    let h = d.route.id;
    if (!a.hasOwnProperty(h) && t.hasOwnProperty(h) && d.route.loader && (o[h] = t[h]), l && l.hasOwnProperty(h))
      break;
  }
  return o;
}
function Ey(t) {
  return t ? An(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function gr(t, a) {
  return (a ? t.slice(0, t.findIndex((l) => l.route.id === a) + 1) : [...t]).reverse().find((l) => l.route.hasErrorBoundary === !0) || t[0];
}
function $o(t) {
  let a = t.length === 1 ? t[0] : t.find((i) => i.index || !i.path || i.path === "/") || {
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
function Yn(t, {
  pathname: a,
  routeId: i,
  method: l,
  type: o,
  message: d
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return t === 400 ? (h = "Bad Request", l && a && i ? m = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (h = "Method Not Allowed", l && a && i ? m = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : l && (m = `Invalid request method "${l.toUpperCase()}"`)), new Mc(
    t || 500,
    h,
    new Error(m),
    !0
  );
}
function Vo(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [l, o] = a[i];
    if (Fr(o))
      return { key: l, result: o };
  }
}
function Tx(t) {
  let a = typeof t == "string" ? ia(t) : t;
  return pa({ ...a, hash: "" });
}
function tN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function nN(t) {
  return new Mc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function aN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && rN(i)
  );
}
function rN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function iN(t) {
  return Th(t.result) && vx.has(t.result.status);
}
function An(t) {
  return t.type === "error";
}
function Fr(t) {
  return (t && t.type) === "redirect";
}
function Ny(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Th(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function sN(t) {
  return vx.has(t);
}
function lN(t) {
  return Th(t) && sN(t.status) && t.headers.has("Location");
}
function oN(t) {
  return BE.has(t.toUpperCase());
}
function on(t) {
  return LE.has(t.toUpperCase());
}
function Ch(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function ic(t, a) {
  let i = typeof a == "string" ? ia(a).search : a.search;
  if (t[t.length - 1].route.index && Ch(i || ""))
    return t[t.length - 1];
  let l = dx(t);
  return l[l.length - 1];
}
function Ty(t) {
  let { formMethod: a, formAction: i, formEncType: l, text: o, formData: d, json: h } = t;
  if (!(!a || !i || !l)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (d != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: d,
        json: void 0,
        text: void 0
      };
    if (h !== void 0)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: h,
        text: void 0
      };
  }
}
function af(t, a) {
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
function cN(t, a) {
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
function Ks(t, a) {
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
function uN(t, a) {
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
function La(t) {
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
function dN(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      gx
    );
    if (i) {
      let l = JSON.parse(i);
      for (let [o, d] of Object.entries(l || {}))
        d && Array.isArray(d) && a.set(o, new Set(d || []));
    }
  } catch {
  }
}
function fN(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [l, o] of a)
      i[l] = [...o];
    try {
      t.sessionStorage.setItem(
        gx,
        JSON.stringify(i)
      );
    } catch (l) {
      _t(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function Cy() {
  let t, a, i = new Promise((l, o) => {
    t = async (d) => {
      l(d);
      try {
        await i;
      } catch {
      }
    }, a = async (d) => {
      o(d);
      try {
        await i;
      } catch {
      }
    };
  });
  return {
    promise: i,
    //@ts-ignore
    resolve: t,
    //@ts-ignore
    reject: a
  };
}
var Jr = y.createContext(null);
Jr.displayName = "DataRouter";
var bl = y.createContext(null);
bl.displayName = "DataRouterState";
var Cx = y.createContext(!1);
function Rx() {
  return y.useContext(Cx);
}
var Rh = y.createContext({
  isTransitioning: !1
});
Rh.displayName = "ViewTransition";
var Mx = y.createContext(
  /* @__PURE__ */ new Map()
);
Mx.displayName = "Fetchers";
var hN = y.createContext(null);
hN.displayName = "Await";
var Qn = y.createContext(
  null
);
Qn.displayName = "Navigation";
var _c = y.createContext(
  null
);
_c.displayName = "Location";
var $a = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
$a.displayName = "Route";
var Mh = y.createContext(null);
Mh.displayName = "RouteError";
var _x = "REACT_ROUTER_ERROR", mN = "REDIRECT", pN = "ROUTE_ERROR_RESPONSE";
function vN(t) {
  if (t.startsWith(`${_x}:${mN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function gN(t) {
  if (t.startsWith(
    `${_x}:${pN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Mc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function yN(t, { relative: a } = {}) {
  Ie(
    xl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: l } = y.useContext(Qn), { hash: o, pathname: d, search: h } = Sl(t, { relative: a }), m = d;
  return i !== "/" && (m = d === "/" ? i : Gn([i, d])), l.createHref({ pathname: m, search: h, hash: o });
}
function xl() {
  return y.useContext(_c) != null;
}
function Va() {
  return Ie(
    xl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(_c).location;
}
var Ax = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Dx(t) {
  y.useContext(Qn).static || y.useLayoutEffect(t);
}
function Ji() {
  let { isDataRoute: t } = y.useContext($a);
  return t ? _N() : bN();
}
function bN() {
  Ie(
    xl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = y.useContext(Jr), { basename: a, navigator: i } = y.useContext(Qn), { matches: l } = y.useContext($a), { pathname: o } = Va(), d = JSON.stringify(jh(l)), h = y.useRef(!1);
  return Dx(() => {
    h.current = !0;
  }), y.useCallback(
    (g, p = {}) => {
      if (_t(h.current, Ax), !h.current) return;
      if (typeof g == "number") {
        i.go(g);
        return;
      }
      let b = Rc(
        g,
        JSON.parse(d),
        o,
        p.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Gn([a, b.pathname])), (p.replace ? i.replace : i.push)(
        b,
        p.state,
        p
      );
    },
    [
      a,
      i,
      d,
      o,
      t
    ]
  );
}
y.createContext(null);
function Sl(t, { relative: a } = {}) {
  let { matches: i } = y.useContext($a), { pathname: l } = Va(), o = JSON.stringify(jh(i));
  return y.useMemo(
    () => Rc(
      t,
      JSON.parse(o),
      l,
      a === "path"
    ),
    [t, o, l, a]
  );
}
function xN(t, a, i) {
  Ie(
    xl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = y.useContext(Qn), { matches: o } = y.useContext($a), d = o[o.length - 1], h = d ? d.params : {}, m = d ? d.pathname : "/", g = d ? d.pathnameBase : "/", p = d && d.route;
  {
    let C = p && p.path || "";
    Ox(
      m,
      !p || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let b = Va(), v;
  v = b;
  let w = v.pathname || "/", S = w;
  if (g !== "/") {
    let C = g.replace(/^\//, "").split("/");
    S = "/" + w.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let j = vr(t, { pathname: S });
  return _t(
    p || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), _t(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), NN(
    j && j.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, h, C.params),
        pathname: Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            C.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? g : Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            C.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function SN() {
  let t = MN(), a = fl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, l = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: l }, d = { padding: "2px 4px", backgroundColor: l }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), h = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: d }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: d }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, h);
}
var wN = /* @__PURE__ */ y.createElement(SN, null), zx = class extends y.Component {
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
      const i = gN(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ y.createElement($a.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Mh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(jN, { error: t }, a) : a;
  }
};
zx.contextType = Cx;
var rf = /* @__PURE__ */ new WeakMap();
function jN({
  children: t,
  error: a
}) {
  let { basename: i } = y.useContext(Qn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = vN(a.digest);
    if (l) {
      let o = rf.get(a);
      if (o) throw o;
      let d = hx(l.location, i);
      if (fx && !rf.get(a))
        if (d.isExternal || l.reloadDocument)
          window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(d.to, {
              replace: l.replace
            })
          );
          throw rf.set(a, h), h;
        }
      return /* @__PURE__ */ y.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${d.absoluteURL || d.to}`
        }
      );
    }
  }
  return t;
}
function EN({ routeContext: t, match: a, children: i }) {
  let l = y.useContext(Jr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement($a.Provider, { value: t }, i);
}
function NN(t, a = [], i) {
  let l = i?.state;
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
  let o = t, d = l?.errors;
  if (d != null) {
    let b = o.findIndex(
      (v) => v.route.id && d?.[v.route.id] !== void 0
    );
    Ie(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        d
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let h = !1, m = -1;
  if (i && l) {
    h = l.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = b), v.route.id) {
        let { loaderData: w, errors: S } = l, j = v.route.loader && !w.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
        if (v.route.lazy || j) {
          i.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let g = i?.onError, p = l && g ? (b, v) => {
    g(b, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      unstable_pattern: yl(l.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, w) => {
      let S, j = !1, N = null, C = null;
      l && (S = d && v.route.id ? d[v.route.id] : void 0, N = v.route.errorElement || wN, h && (m < 0 && w === 0 ? (Ox(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, C = null) : m === w && (j = !0, C = v.route.hydrateFallbackElement || null)));
      let R = a.concat(o.slice(0, w + 1)), D = () => {
        let O;
        return S ? O = N : j ? O = C : v.route.Component ? O = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? O = v.route.element : O = b, /* @__PURE__ */ y.createElement(
          EN,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: R,
              isDataRoute: l != null
            },
            children: O
          }
        );
      };
      return l && (v.route.ErrorBoundary || v.route.errorElement || w === 0) ? /* @__PURE__ */ y.createElement(
        zx,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: N,
          error: S,
          children: D(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: p
        }
      ) : D();
    },
    null
  );
}
function _h(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function TN(t) {
  let a = y.useContext(Jr);
  return Ie(a, _h(t)), a;
}
function kx(t) {
  let a = y.useContext(bl);
  return Ie(a, _h(t)), a;
}
function CN(t) {
  let a = y.useContext($a);
  return Ie(a, _h(t)), a;
}
function Ac(t) {
  let a = CN(t), i = a.matches[a.matches.length - 1];
  return Ie(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function RN() {
  return Ac(
    "useRouteId"
    /* UseRouteId */
  );
}
function wl() {
  let t = kx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Ac(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function MN() {
  let t = y.useContext(Mh), a = kx(
    "useRouteError"
    /* UseRouteError */
  ), i = Ac(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function _N() {
  let { router: t } = TN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Ac(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return Dx(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, d = {}) => {
      _t(i.current, Ax), i.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...d }));
    },
    [t, a]
  );
}
var Ry = {};
function Ox(t, a, i) {
  !a && !Ry[t] && (Ry[t] = !0, _t(!1, i));
}
var My = {};
function _y(t, a) {
  !t && !My[a] && (My[a] = !0, console.warn(a));
}
var AN = "useOptimistic", Ay = Pj[AN], DN = () => {
};
function zN(t) {
  return Ay ? Ay(t) : [t, DN];
}
function kN(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && _t(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: y.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && _t(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: y.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && _t(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: y.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var ON = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function LN(t, a) {
  return qE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: aE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: ON,
    mapRouteProperties: kN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var UN = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((t, a) => {
      this.resolve = (i) => {
        this.status === "pending" && (this.status = "resolved", t(i));
      }, this.reject = (i) => {
        this.status === "pending" && (this.status = "rejected", a(i));
      };
    });
  }
};
function BN({
  router: t,
  flushSync: a,
  onError: i,
  unstable_useTransitions: l
}) {
  l = Rx() || l;
  let [d, h] = y.useState(t.state), [m, g] = zN(d), [p, b] = y.useState(), [v, w] = y.useState({
    isTransitioning: !1
  }), [S, j] = y.useState(), [N, C] = y.useState(), [R, D] = y.useState(), O = y.useRef(/* @__PURE__ */ new Map()), T = y.useCallback(
    (Y, { deletedFetchers: $, newErrors: se, flushSync: ae, viewTransitionOpts: ee }) => {
      se && i && Object.values(se).forEach(
        (W) => i(W, {
          location: Y.location,
          params: Y.matches[0]?.params ?? {},
          unstable_pattern: yl(Y.matches)
        })
      ), Y.fetchers.forEach((W, z) => {
        W.data !== void 0 && O.current.set(z, W.data);
      }), $.forEach((W) => O.current.delete(W)), _y(
        ae === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ue = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (_y(
        ee == null || ue,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !ee || !ue) {
        a && ae ? a(() => h(Y)) : l === !1 ? h(Y) : y.startTransition(() => {
          l === !0 && g((W) => Dy(W, Y)), h(Y);
        });
        return;
      }
      if (a && ae) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: ee.currentLocation,
            nextLocation: ee.nextLocation
          });
        });
        let W = t.window.document.startViewTransition(() => {
          a(() => h(Y));
        });
        W.finished.finally(() => {
          a(() => {
            j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => C(W));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), D({
        state: Y,
        currentLocation: ee.currentLocation,
        nextLocation: ee.nextLocation
      })) : (b(Y), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: ee.currentLocation,
        nextLocation: ee.nextLocation
      }));
    },
    [
      t.window,
      a,
      N,
      S,
      l,
      g,
      i
    ]
  );
  y.useLayoutEffect(() => t.subscribe(T), [t, T]);
  let V = m.initialized;
  y.useLayoutEffect(() => {
    !V && t.state.initialized && T(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [V, T, t.state]), y.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new UN());
  }, [v]), y.useEffect(() => {
    if (S && p && t.window) {
      let Y = p, $ = S.promise, se = t.window.document.startViewTransition(async () => {
        l === !1 ? h(Y) : y.startTransition(() => {
          l === !0 && g((ae) => Dy(ae, Y)), h(Y);
        }), await $;
      });
      se.finished.finally(() => {
        j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
      }), C(se);
    }
  }, [
    p,
    S,
    t.window,
    l,
    g
  ]), y.useEffect(() => {
    S && p && m.location.key === p.location.key && S.resolve();
  }, [S, N, m.location, p]), y.useEffect(() => {
    !v.isTransitioning && R && (b(R.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: R.currentLocation,
      nextLocation: R.nextLocation
    }), D(void 0));
  }, [v.isTransitioning, R]);
  let K = y.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (Y) => t.navigate(Y),
    push: (Y, $, se) => t.navigate(Y, {
      state: $,
      preventScrollReset: se?.preventScrollReset
    }),
    replace: (Y, $, se) => t.navigate(Y, {
      replace: !0,
      state: $,
      preventScrollReset: se?.preventScrollReset
    })
  }), [t]), ne = t.basename || "/", _ = y.useMemo(
    () => ({
      router: t,
      navigator: K,
      static: !1,
      basename: ne,
      onError: i
    }),
    [t, K, ne, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Jr.Provider, { value: _ }, /* @__PURE__ */ y.createElement(bl.Provider, { value: m }, /* @__PURE__ */ y.createElement(Mx.Provider, { value: O.current }, /* @__PURE__ */ y.createElement(Rh.Provider, { value: v }, /* @__PURE__ */ y.createElement(
    HN,
    {
      basename: ne,
      location: m.location,
      navigationType: m.historyAction,
      navigator: K,
      unstable_useTransitions: l
    },
    /* @__PURE__ */ y.createElement(
      $N,
      {
        routes: t.routes,
        future: t.future,
        state: m,
        isStatic: !1,
        onError: i
      }
    )
  ))))), null);
}
function Dy(t, a) {
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
var $N = y.memo(VN);
function VN({
  routes: t,
  future: a,
  state: i,
  isStatic: l,
  onError: o
}) {
  return xN(t, void 0, { state: i, isStatic: l, onError: o });
}
function HN({
  basename: t = "/",
  children: a = null,
  location: i,
  navigationType: l = "POP",
  navigator: o,
  static: d = !1,
  unstable_useTransitions: h
}) {
  Ie(
    !xl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = t.replace(/^\/*/, "/"), g = y.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: d,
      unstable_useTransitions: h,
      future: {}
    }),
    [m, o, d, h]
  );
  typeof i == "string" && (i = ia(i));
  let {
    pathname: p = "/",
    search: b = "",
    hash: v = "",
    state: w = null,
    key: S = "default",
    unstable_mask: j
  } = i, N = y.useMemo(() => {
    let C = Kn(p, m);
    return C == null ? null : {
      location: {
        pathname: C,
        search: b,
        hash: v,
        state: w,
        key: S,
        unstable_mask: j
      },
      navigationType: l
    };
  }, [
    m,
    p,
    b,
    v,
    w,
    S,
    l,
    j
  ]);
  return _t(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ y.createElement(Qn.Provider, { value: g }, /* @__PURE__ */ y.createElement(_c.Provider, { children: a, value: N }));
}
var sc = "get", lc = "application/x-www-form-urlencoded";
function Dc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function qN(t) {
  return Dc(t) && t.tagName.toLowerCase() === "button";
}
function IN(t) {
  return Dc(t) && t.tagName.toLowerCase() === "form";
}
function FN(t) {
  return Dc(t) && t.tagName.toLowerCase() === "input";
}
function YN(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function GN(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !YN(t);
}
var Ho = null;
function XN() {
  if (Ho === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ho = !1;
    } catch {
      Ho = !0;
    }
  return Ho;
}
var PN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function sf(t) {
  return t != null && !PN.has(t) ? (_t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${lc}"`
  ), null) : t;
}
function KN(t, a) {
  let i, l, o, d, h;
  if (IN(t)) {
    let m = t.getAttribute("action");
    l = m ? Kn(m, a) : null, i = t.getAttribute("method") || sc, o = sf(t.getAttribute("enctype")) || lc, d = new FormData(t);
  } else if (qN(t) || FN(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || m.getAttribute("action");
    if (l = g ? Kn(g, a) : null, i = t.getAttribute("formmethod") || m.getAttribute("method") || sc, o = sf(t.getAttribute("formenctype")) || sf(m.getAttribute("enctype")) || lc, d = new FormData(m, t), !XN()) {
      let { name: p, type: b, value: v } = t;
      if (b === "image") {
        let w = p ? `${p}.` : "";
        d.append(`${w}x`, "0"), d.append(`${w}y`, "0");
      } else p && d.append(p, v);
    }
  } else {
    if (Dc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = sc, l = null, o = lc, h = t;
  }
  return d && o === "text/plain" && (h = d, d = void 0), { action: l, method: i.toLowerCase(), encType: o, formData: d, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ah(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Lx(t, a, i, l) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${l}` : o.pathname = `${o.pathname}.${l}` : o.pathname === "/" ? o.pathname = `_root.${l}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${mc(a)}/_root.${l}` : o.pathname = `${mc(o.pathname)}.${l}`, o;
}
async function QN(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let i = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = i, i;
  } catch (i) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(i), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function ZN(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function JN(t, a, i) {
  let l = await Promise.all(
    t.map(async (o) => {
      let d = a.routes[o.route.id];
      if (d) {
        let h = await QN(d, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return nT(
    l.flat(1).filter(ZN).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function zy(t, a, i, l, o, d) {
  let h = (g, p) => i[p] ? g.route.id !== i[p].route.id : !0, m = (g, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== g.params["*"]
  );
  return d === "assets" ? a.filter(
    (g, p) => h(g, p) || m(g, p)
  ) : d === "data" ? a.filter((g, p) => {
    let b = l.routes[g.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (h(g, p) || m(g, p))
      return !0;
    if (g.route.shouldRevalidate) {
      let v = g.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: i[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: g.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function WN(t, a, { includeHydrateFallback: i } = {}) {
  return eT(
    t.map((l) => {
      let o = a.routes[l.route.id];
      if (!o) return [];
      let d = [o.module];
      return o.clientActionModule && (d = d.concat(o.clientActionModule)), o.clientLoaderModule && (d = d.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (d = d.concat(o.hydrateFallbackModule)), o.imports && (d = d.concat(o.imports)), d;
    }).flat(1)
  );
}
function eT(t) {
  return [...new Set(t)];
}
function tT(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let l of i)
    a[l] = t[l];
  return a;
}
function nT(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((l, o) => {
    let d = JSON.stringify(tT(o));
    return i.has(d) || (i.add(d), l.push({ key: d, link: o })), l;
  }, []);
}
function Dh() {
  let t = y.useContext(Jr);
  return Ah(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function aT() {
  let t = y.useContext(bl);
  return Ah(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var zh = y.createContext(void 0);
zh.displayName = "FrameworkContext";
function kh() {
  let t = y.useContext(zh);
  return Ah(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function rT(t, a) {
  let i = y.useContext(zh), [l, o] = y.useState(!1), [d, h] = y.useState(!1), { onFocus: m, onBlur: g, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, w = y.useRef(null);
  y.useEffect(() => {
    if (t === "render" && h(!0), t === "viewport") {
      let N = (R) => {
        R.forEach((D) => {
          h(D.isIntersecting);
        });
      }, C = new IntersectionObserver(N, { threshold: 0.5 });
      return w.current && C.observe(w.current), () => {
        C.disconnect();
      };
    }
  }, [t]), y.useEffect(() => {
    if (l) {
      let N = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(N);
      };
    }
  }, [l]);
  let S = () => {
    o(!0);
  }, j = () => {
    o(!1), h(!1);
  };
  return i ? t !== "intent" ? [d, w, {}] : [
    d,
    w,
    {
      onFocus: Qs(m, S),
      onBlur: Qs(g, j),
      onMouseEnter: Qs(p, S),
      onMouseLeave: Qs(b, j),
      onTouchStart: Qs(v, S)
    }
  ] : [!1, w, {}];
}
function Qs(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function iT({ page: t, ...a }) {
  let i = Rx(), { router: l } = Dh(), o = y.useMemo(
    () => vr(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(lT, { page: t, matches: o, ...a }) : /* @__PURE__ */ y.createElement(oT, { page: t, matches: o, ...a }) : null;
}
function sT(t) {
  let { manifest: a, routeModules: i } = kh(), [l, o] = y.useState([]);
  return y.useEffect(() => {
    let d = !1;
    return JN(t, a, i).then(
      (h) => {
        d || o(h);
      }
    ), () => {
      d = !0;
    };
  }, [t, a, i]), l;
}
function lT({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o } = kh(), { basename: d } = Dh(), h = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let m = Lx(
      t,
      d,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? g = !0 : p.push(b.route.id);
    return g && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    d,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    l,
    a
  ]);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, h.map((m) => /* @__PURE__ */ y.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function oT({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o, manifest: d, routeModules: h } = kh(), { basename: m } = Dh(), { loaderData: g, matches: p } = aT(), b = y.useMemo(
    () => zy(
      t,
      a,
      p,
      d,
      l,
      "data"
    ),
    [t, a, p, d, l]
  ), v = y.useMemo(
    () => zy(
      t,
      a,
      p,
      d,
      l,
      "assets"
    ),
    [t, a, p, d, l]
  ), w = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((D) => {
      let O = d.routes[D.route.id];
      !O || !O.hasLoader || (!b.some((T) => T.route.id === D.route.id) && D.route.id in g && h[D.route.id]?.shouldRevalidate || O.hasClientLoader ? C = !0 : N.add(D.route.id));
    }), N.size === 0)
      return [];
    let R = Lx(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return C && N.size > 0 && R.searchParams.set(
      "_routes",
      a.filter((D) => N.has(D.route.id)).map((D) => D.route.id).join(",")
    ), [R.pathname + R.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    g,
    l,
    d,
    b,
    a,
    t,
    h
  ]), S = y.useMemo(
    () => WN(v, d),
    [v, d]
  ), j = sT(v);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, w.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...i })), S.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "modulepreload", href: N, ...i })), j.map(({ key: N, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement(
      "link",
      {
        key: N,
        nonce: i.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function cT(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var uT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  uT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Ux = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Oh = y.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: l = "none",
    relative: o,
    reloadDocument: d,
    replace: h,
    unstable_mask: m,
    state: g,
    target: p,
    to: b,
    preventScrollReset: v,
    viewTransition: w,
    unstable_defaultShouldRevalidate: S,
    ...j
  }, N) {
    let { basename: C, navigator: R, unstable_useTransitions: D } = y.useContext(Qn), O = typeof b == "string" && Ux.test(b), T = hx(b, C);
    b = T.to;
    let V = yN(b, { relative: o }), K = Va(), ne = null;
    if (m) {
      let W = Rc(
        m,
        [],
        K.unstable_mask ? K.unstable_mask.pathname : "/",
        !0
      );
      C !== "/" && (W.pathname = W.pathname === "/" ? C : Gn([C, W.pathname])), ne = R.createHref(W);
    }
    let [_, Y, $] = rT(
      l,
      j
    ), se = mT(b, {
      replace: h,
      unstable_mask: m,
      state: g,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: D
    });
    function ae(W) {
      a && a(W), W.defaultPrevented || se(W);
    }
    let ee = !(T.isExternal || d), ue = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...j,
          ...$,
          href: (ee ? ne : void 0) || T.absoluteURL || V,
          onClick: ee ? ae : a,
          ref: cT(N, Y),
          target: p,
          "data-discover": !O && i === "render" ? "true" : void 0
        }
      )
    );
    return _ && !O ? /* @__PURE__ */ y.createElement(y.Fragment, null, ue, /* @__PURE__ */ y.createElement(iT, { page: V })) : ue;
  }
);
Oh.displayName = "Link";
var dT = y.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: l = "",
    end: o = !1,
    style: d,
    to: h,
    viewTransition: m,
    children: g,
    ...p
  }, b) {
    let v = Sl(h, { relative: p.relative }), w = Va(), S = y.useContext(bl), { navigator: j, basename: N } = y.useContext(Qn), C = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bT(v) && m === !0, R = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, D = w.pathname, O = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    i || (D = D.toLowerCase(), O = O ? O.toLowerCase() : null, R = R.toLowerCase()), O && N && (O = Kn(O, N) || O);
    const T = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let V = D === R || !o && D.startsWith(R) && D.charAt(T) === "/", K = O != null && (O === R || !o && O.startsWith(R) && O.charAt(R.length) === "/"), ne = {
      isActive: V,
      isPending: K,
      isTransitioning: C
    }, _ = V ? a : void 0, Y;
    typeof l == "function" ? Y = l(ne) : Y = [
      l,
      V ? "active" : null,
      K ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let $ = typeof d == "function" ? d(ne) : d;
    return /* @__PURE__ */ y.createElement(
      Oh,
      {
        ...p,
        "aria-current": _,
        className: Y,
        ref: b,
        style: $,
        to: h,
        viewTransition: m
      },
      typeof g == "function" ? g(ne) : g
    );
  }
);
dT.displayName = "NavLink";
var fT = y.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: l,
    replace: o,
    state: d,
    method: h = sc,
    action: m,
    onSubmit: g,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: N } = y.useContext(Qn), C = gT(), R = yT(m, { relative: p }), D = h.toLowerCase() === "get" ? "get" : "post", O = typeof m == "string" && Ux.test(m), T = (V) => {
      if (g && g(V), V.defaultPrevented) return;
      V.preventDefault();
      let K = V.nativeEvent.submitter, ne = K?.getAttribute("formmethod") || h, _ = () => C(K || V.currentTarget, {
        fetcherKey: a,
        method: ne,
        navigate: i,
        replace: o,
        state: d,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: w
      });
      N && i !== !1 ? y.startTransition(() => _()) : _();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: j,
        method: D,
        action: R,
        onSubmit: l ? g : T,
        ...S,
        "data-discover": !O && t === "render" ? "true" : void 0
      }
    );
  }
);
fT.displayName = "Form";
function hT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Bx(t) {
  let a = y.useContext(Jr);
  return Ie(a, hT(t)), a;
}
function mT(t, {
  target: a,
  replace: i,
  unstable_mask: l,
  state: o,
  preventScrollReset: d,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: g,
  unstable_useTransitions: p
} = {}) {
  let b = Ji(), v = Va(), w = Sl(t, { relative: h });
  return y.useCallback(
    (S) => {
      if (GN(S, a)) {
        S.preventDefault();
        let j = i !== void 0 ? i : pa(v) === pa(w), N = () => b(t, {
          replace: j,
          unstable_mask: l,
          state: o,
          preventScrollReset: d,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: g
        });
        p ? y.startTransition(() => N()) : N();
      }
    },
    [
      v,
      b,
      w,
      i,
      l,
      o,
      a,
      t,
      d,
      h,
      m,
      g,
      p
    ]
  );
}
var pT = 0, vT = () => `__${String(++pT)}__`;
function gT() {
  let { router: t } = Bx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(Qn), i = RN(), l = t.fetch, o = t.navigate;
  return y.useCallback(
    async (d, h = {}) => {
      let { action: m, method: g, encType: p, formData: b, body: v } = KN(
        d,
        a
      );
      if (h.navigate === !1) {
        let w = h.fetcherKey || vT();
        await l(w, i, h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: v,
          formMethod: h.method || g,
          formEncType: h.encType || p,
          flushSync: h.flushSync
        });
      } else
        await o(h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: v,
          formMethod: h.method || g,
          formEncType: h.encType || p,
          replace: h.replace,
          state: h.state,
          fromRouteId: i,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition
        });
    },
    [l, o, a, i]
  );
}
function yT(t, { relative: a } = {}) {
  let { basename: i } = y.useContext(Qn), l = y.useContext($a);
  Ie(l, "useFormAction must be used inside a RouteContext");
  let [o] = l.matches.slice(-1), d = { ...Sl(t || ".", { relative: a }) }, h = Va();
  if (t == null) {
    d.search = h.search;
    let m = new URLSearchParams(d.search), g = m.getAll("index");
    if (g.some((b) => b === "")) {
      m.delete("index"), g.filter((v) => v).forEach((v) => m.append("index", v));
      let b = m.toString();
      d.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (d.pathname = d.pathname === "/" ? i : Gn([i, d.pathname])), pa(d);
}
function bT(t, { relative: a } = {}) {
  let i = y.useContext(Rh);
  Ie(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = Bx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Sl(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let d = Kn(i.currentLocation.pathname, l) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return hc(o.pathname, h) != null || hc(o.pathname, d) != null;
}
class Wi extends Error {
  constructor(a, i, l, o) {
    super(l), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const va = "/api/v1/extensions/nexus.audio.emotiontts";
async function ht(t, a) {
  const i = t.startsWith("http") ? t : `${va}${t}`, l = await fetch(i, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!l.ok) {
    let o = null;
    try {
      o = await l.json();
    } catch {
      o = null;
    }
    throw new Wi(
      l.status,
      o?.category ?? "unknown",
      o?.message ?? l.statusText,
      o?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function xT(t, a, i) {
  const l = t.startsWith("http") ? t : `${va}${t}`, o = new EventSource(l);
  return o.onmessage = (d) => {
    if (d.data)
      try {
        a(JSON.parse(d.data));
      } catch {
      }
  }, o.onerror = (d) => {
    i?.(d);
  }, () => o.close();
}
async function ST() {
  return ht("/deployments");
}
async function ky(t) {
  return ht(`/deployments/${t}`);
}
async function wT(t, a) {
  return ht(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Oy(t) {
  return ht(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Lh(t, a) {
  return ht("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function ol(t, a, i) {
  return ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function $x(t, a) {
  await ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function jT(t) {
  return ht(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function ET(t, a, i = "error") {
  return ht("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: i })
  });
}
async function NT(t, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const l = i.toString(), o = l ? `?${l}` : "";
  return ht(`/deployments/${t}/runs${o}`);
}
async function TT(t, a) {
  return ht(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Uh(t, a) {
  return ht(`/deployments/${t}/runs/${a}`);
}
async function CT(t, a) {
  return ht(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function Vx(t, a) {
  return ht(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function RT(t, a) {
  return ht(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Ly(t, a, i, l) {
  return xT(
    `/deployments/${t}/runs/${a}/progress`,
    i,
    l
  );
}
async function Xi(t) {
  return ht(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function pc(t, a, i, l, o) {
  const d = new FormData();
  d.append("deploymentId", t), d.append("displayName", i), d.append("kind", l), d.append("audio", a);
  const h = await fetch(`${va}/voice-assets`, {
    method: "POST",
    body: d
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function MT(t, a) {
  await ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function _T(t, a, i) {
  return ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function AT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${va}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function DT(t) {
  return ht(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var zT = "mux0i60", kT = "mux0i61", OT = "mux0i62", LT = "mux0i63";
function zc({ count: t = "0", title: a, hint: i }) {
  return /* @__PURE__ */ c.jsxs("div", { className: zT, children: [
    /* @__PURE__ */ c.jsx("span", { className: kT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: OT, children: a }),
    i ? /* @__PURE__ */ c.jsx("p", { className: LT, children: i }) : null
  ] });
}
var UT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, BT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, $T = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, VT = "zwn3019";
function Ua({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: l = "section",
  children: o,
  className: d,
  style: h,
  ...m
}) {
  const g = [UT[t], $T[a], BT[i], d].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(l, { className: g, style: h, "data-elevation": i, ...m, children: o });
}
function HT({ children: t, className: a }) {
  const i = [VT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, children: t });
}
var Xr = "vrkn5p0", qT = "_93p6291", IT = "_93p6292", FT = "_93p6293", YT = "_93p6294", GT = "_93p6295", XT = "_93p6296", PT = "_93p6297", KT = "_93p6298", QT = "_93p6299", ZT = "_93p629a", JT = "_93p629b", WT = "_93p629c", eC = "_93p629d", tC = "_93p629e";
const nC = "nexus-host-navigate";
function aC(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function rC(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const i = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(nC, {
      detail: i
    })
  );
}
function iC() {
  const { deployments: t } = wl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: qT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: IT, children: [
      /* @__PURE__ */ c.jsx("p", { className: FT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: YT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: GT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: XT, children: [
        /* @__PURE__ */ c.jsx("span", { className: PT, children: t.length }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ua,
      {
        density: "airy",
        elevation: "raised",
        className: KT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Xr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            zc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: QT, children: t.map((i) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: aC(i.deploymentId),
              onClick: (l) => rC(l, i.deploymentId),
              className: ZT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: JT, "aria-hidden": "true", children: sC(i.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: WT, children: i.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: eC, children: i.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: tC, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function sC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Bh = sx();
const lC = /* @__PURE__ */ ix(Bh);
function oC(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const cC = (t) => {
  switch (t) {
    case "success":
      return fC;
    case "info":
      return mC;
    case "warning":
      return hC;
    case "error":
      return pC;
    default:
      return null;
  }
}, uC = Array(12).fill(0), dC = ({ visible: t, className: a }) => /* @__PURE__ */ pe.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ pe.createElement("div", {
  className: "sonner-spinner"
}, uC.map((i, l) => /* @__PURE__ */ pe.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), fC = /* @__PURE__ */ pe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ pe.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), hC = /* @__PURE__ */ pe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ pe.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), mC = /* @__PURE__ */ pe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ pe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), pC = /* @__PURE__ */ pe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ pe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), vC = /* @__PURE__ */ pe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ pe.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ pe.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), gC = () => {
  const [t, a] = pe.useState(document.hidden);
  return pe.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let Pf = 1;
class yC {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const i = this.subscribers.indexOf(a);
      this.subscribers.splice(i, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((i) => i(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var i;
      const { message: l, ...o } = a, d = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Pf++, h = this.toasts.find((g) => g.id === d), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(d) && this.dismissedToasts.delete(d), h ? this.toasts = this.toasts.map((g) => g.id === d ? (this.publish({
        ...g,
        ...a,
        id: d,
        title: l
      }), {
        ...g,
        ...a,
        id: d,
        dismissible: m,
        title: l
      }) : g) : this.addToast({
        title: l,
        ...o,
        dismissible: m,
        id: d
      }), d;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((i) => i({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((i) => {
      this.subscribers.forEach((l) => l({
        id: i.id,
        dismiss: !0
      }));
    }), a), this.message = (a, i) => this.create({
      ...i,
      message: a
    }), this.error = (a, i) => this.create({
      ...i,
      message: a,
      type: "error"
    }), this.success = (a, i) => this.create({
      ...i,
      type: "success",
      message: a
    }), this.info = (a, i) => this.create({
      ...i,
      type: "info",
      message: a
    }), this.warning = (a, i) => this.create({
      ...i,
      type: "warning",
      message: a
    }), this.loading = (a, i) => this.create({
      ...i,
      type: "loading",
      message: a
    }), this.promise = (a, i) => {
      if (!i)
        return;
      let l;
      i.loading !== void 0 && (l = this.create({
        ...i,
        promise: a,
        type: "loading",
        message: i.loading,
        description: typeof i.description != "function" ? i.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let d = l !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], pe.isValidElement(p))
          d = !1, this.create({
            id: l,
            type: "default",
            message: p
          });
        else if (xC(p) && !p.ok) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, w = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, j = typeof v == "object" && !pe.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: w,
            ...j
          });
        } else if (p instanceof Error) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(p) : i.error, w = typeof i.description == "function" ? await i.description(p) : i.description, j = typeof v == "object" && !pe.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: w,
            ...j
          });
        } else if (i.success !== void 0) {
          d = !1;
          const v = typeof i.success == "function" ? await i.success(p) : i.success, w = typeof i.description == "function" ? await i.description(p) : i.description, j = typeof v == "object" && !pe.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "success",
            description: w,
            ...j
          });
        }
      }).catch(async (p) => {
        if (h = [
          "reject",
          p
        ], i.error !== void 0) {
          d = !1;
          const b = typeof i.error == "function" ? await i.error(p) : i.error, v = typeof i.description == "function" ? await i.description(p) : i.description, S = typeof b == "object" && !pe.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...S
          });
        }
      }).finally(() => {
        d && (this.dismiss(l), l = void 0), i.finally == null || i.finally.call(i);
      }), g = () => new Promise((p, b) => m.then(() => h[0] === "reject" ? b(h[1]) : p(h[1])).catch(b));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: g
      } : Object.assign(l, {
        unwrap: g
      });
    }, this.custom = (a, i) => {
      const l = i?.id || Pf++;
      return this.create({
        jsx: a(l),
        id: l,
        ...i
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const xn = new yC(), bC = (t, a) => {
  const i = a?.id || Pf++;
  return xn.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, xC = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", SC = bC, wC = () => xn.toasts, jC = () => xn.getActiveToasts(), fn = Object.assign(SC, {
  success: xn.success,
  info: xn.info,
  warning: xn.warning,
  error: xn.error,
  custom: xn.custom,
  message: xn.message,
  promise: xn.promise,
  dismiss: xn.dismiss,
  loading: xn.loading
}, {
  getHistory: wC,
  getToasts: jC
});
oC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function qo(t) {
  return t.label !== void 0;
}
const EC = 3, NC = "24px", TC = "16px", Uy = 4e3, CC = 356, RC = 14, MC = 45, _C = 200;
function ma(...t) {
  return t.filter(Boolean).join(" ");
}
function AC(t) {
  const [a, i] = t.split("-"), l = [];
  return a && l.push(a), i && l.push(i), l;
}
const DC = (t) => {
  var a, i, l, o, d, h, m, g, p;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: C, index: R, toasts: D, expanded: O, removeToast: T, defaultRichColors: V, closeButton: K, style: ne, cancelButtonStyle: _, actionButtonStyle: Y, className: $ = "", descriptionClassName: se = "", duration: ae, position: ee, gap: ue, expandByDefault: W, classNames: z, icons: L, closeButtonAriaLabel: H = "Close toast" } = t, [q, ie] = pe.useState(null), [M, J] = pe.useState(null), [Q, F] = pe.useState(!1), [le, de] = pe.useState(!1), [ve, Te] = pe.useState(!1), [Ve, Zt] = pe.useState(!1), [Pt, At] = pe.useState(!1), [et, pt] = pe.useState(0), [me, Oe] = pe.useState(0), De = pe.useRef(v.duration || ae || Uy), Re = pe.useRef(null), bt = pe.useRef(null), xt = R === 0, un = R + 1 <= N, Ht = v.type, kn = v.dismissible !== !1, qt = v.className || "", be = v.descriptionClassName || "", ze = pe.useMemo(() => C.findIndex((ke) => ke.toastId === v.id) || 0, [
    C,
    v.id
  ]), Qe = pe.useMemo(() => {
    var ke;
    return (ke = v.closeButton) != null ? ke : K;
  }, [
    v.closeButton,
    K
  ]), nt = pe.useMemo(() => v.duration || ae || Uy, [
    v.duration,
    ae
  ]), It = pe.useRef(0), Ft = pe.useRef(0), Er = pe.useRef(0), sa = pe.useRef(null), [Zn, Jt] = ee.split("-"), Tt = pe.useMemo(() => C.reduce((ke, ut, Dt) => Dt >= ze ? ke : ke + ut.height, 0), [
    C,
    ze
  ]), Yt = gC(), Wr = v.invert || b, Ha = Ht === "loading";
  Ft.current = pe.useMemo(() => ze * ue + Tt, [
    ze,
    Tt
  ]), pe.useEffect(() => {
    De.current = nt;
  }, [
    nt
  ]), pe.useEffect(() => {
    F(!0);
  }, []), pe.useEffect(() => {
    const ke = bt.current;
    if (ke) {
      const ut = ke.getBoundingClientRect().height;
      return Oe(ut), j((Dt) => [
        {
          toastId: v.id,
          height: ut,
          position: v.position
        },
        ...Dt
      ]), () => j((Dt) => Dt.filter((Gt) => Gt.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), pe.useLayoutEffect(() => {
    if (!Q) return;
    const ke = bt.current, ut = ke.style.height;
    ke.style.height = "auto";
    const Dt = ke.getBoundingClientRect().height;
    ke.style.height = ut, Oe(Dt), j((Gt) => Gt.find((it) => it.toastId === v.id) ? Gt.map((it) => it.toastId === v.id ? {
      ...it,
      height: Dt
    } : it) : [
      {
        toastId: v.id,
        height: Dt,
        position: v.position
      },
      ...Gt
    ]);
  }, [
    Q,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const On = pe.useCallback(() => {
    de(!0), pt(Ft.current), j((ke) => ke.filter((ut) => ut.toastId !== v.id)), setTimeout(() => {
      T(v);
    }, _C);
  }, [
    v,
    T,
    j,
    Ft
  ]);
  pe.useEffect(() => {
    if (v.promise && Ht === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ke;
    return O || S || Yt ? (() => {
      if (Er.current < It.current) {
        const Gt = (/* @__PURE__ */ new Date()).getTime() - It.current;
        De.current = De.current - Gt;
      }
      Er.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      De.current !== 1 / 0 && (It.current = (/* @__PURE__ */ new Date()).getTime(), ke = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), On();
      }, De.current));
    })(), () => clearTimeout(ke);
  }, [
    O,
    S,
    v,
    Ht,
    Yt,
    On
  ]), pe.useEffect(() => {
    v.delete && (On(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    On,
    v.delete
  ]);
  function ga() {
    var ke;
    if (L?.loading) {
      var ut;
      return /* @__PURE__ */ pe.createElement("div", {
        className: ma(z?.loader, v == null || (ut = v.classNames) == null ? void 0 : ut.loader, "sonner-loader"),
        "data-visible": Ht === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ pe.createElement(dC, {
      className: ma(z?.loader, v == null || (ke = v.classNames) == null ? void 0 : ke.loader),
      visible: Ht === "loading"
    });
  }
  const Jn = v.icon || L?.[Ht] || cC(Ht);
  var la, hn;
  return /* @__PURE__ */ pe.createElement("li", {
    tabIndex: 0,
    ref: bt,
    className: ma($, qt, z?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, z?.default, z?.[Ht], v == null || (i = v.classNames) == null ? void 0 : i[Ht]),
    "data-sonner-toast": "",
    "data-rich-colors": (la = v.richColors) != null ? la : V,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": Q,
    "data-promise": !!v.promise,
    "data-swiped": Pt,
    "data-removed": le,
    "data-visible": un,
    "data-y-position": Zn,
    "data-x-position": Jt,
    "data-index": R,
    "data-front": xt,
    "data-swiping": ve,
    "data-dismissible": kn,
    "data-type": Ht,
    "data-invert": Wr,
    "data-swipe-out": Ve,
    "data-swipe-direction": M,
    "data-expanded": !!(O || W && Q),
    "data-testid": v.testId,
    style: {
      "--index": R,
      "--toasts-before": R,
      "--z-index": D.length - R,
      "--offset": `${le ? et : Ft.current}px`,
      "--initial-height": W ? "auto" : `${me}px`,
      ...ne,
      ...v.style
    },
    onDragEnd: () => {
      Te(!1), ie(null), sa.current = null;
    },
    onPointerDown: (ke) => {
      ke.button !== 2 && (Ha || !kn || (Re.current = /* @__PURE__ */ new Date(), pt(Ft.current), ke.target.setPointerCapture(ke.pointerId), ke.target.tagName !== "BUTTON" && (Te(!0), sa.current = {
        x: ke.clientX,
        y: ke.clientY
      })));
    },
    onPointerUp: () => {
      var ke, ut, Dt;
      if (Ve || !kn) return;
      sa.current = null;
      const Gt = Number(((ke = bt.current) == null ? void 0 : ke.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((ut = bt.current) == null ? void 0 : ut.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), it = (/* @__PURE__ */ new Date()).getTime() - ((Dt = Re.current) == null ? void 0 : Dt.getTime()), Wt = q === "x" ? Gt : wn, ya = Math.abs(Wt) / it;
      if (Math.abs(Wt) >= MC || ya > 0.11) {
        pt(Ft.current), v.onDismiss == null || v.onDismiss.call(v, v), J(q === "x" ? Gt > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), On(), Zt(!0);
        return;
      } else {
        var rn, A;
        (rn = bt.current) == null || rn.style.setProperty("--swipe-amount-x", "0px"), (A = bt.current) == null || A.style.setProperty("--swipe-amount-y", "0px");
      }
      At(!1), Te(!1), ie(null);
    },
    onPointerMove: (ke) => {
      var ut, Dt, Gt;
      if (!sa.current || !kn || ((ut = window.getSelection()) == null ? void 0 : ut.toString().length) > 0) return;
      const it = ke.clientY - sa.current.y, Wt = ke.clientX - sa.current.x;
      var ya;
      const rn = (ya = t.swipeDirections) != null ? ya : AC(ee);
      !q && (Math.abs(Wt) > 1 || Math.abs(it) > 1) && ie(Math.abs(Wt) > Math.abs(it) ? "x" : "y");
      let A = {
        x: 0,
        y: 0
      };
      const B = (G) => 1 / (1.5 + Math.abs(G) / 20);
      if (q === "y") {
        if (rn.includes("top") || rn.includes("bottom"))
          if (rn.includes("top") && it < 0 || rn.includes("bottom") && it > 0)
            A.y = it;
          else {
            const G = it * B(it);
            A.y = Math.abs(G) < Math.abs(it) ? G : it;
          }
      } else if (q === "x" && (rn.includes("left") || rn.includes("right")))
        if (rn.includes("left") && Wt < 0 || rn.includes("right") && Wt > 0)
          A.x = Wt;
        else {
          const G = Wt * B(Wt);
          A.x = Math.abs(G) < Math.abs(Wt) ? G : Wt;
        }
      (Math.abs(A.x) > 0 || Math.abs(A.y) > 0) && At(!0), (Dt = bt.current) == null || Dt.style.setProperty("--swipe-amount-x", `${A.x}px`), (Gt = bt.current) == null || Gt.style.setProperty("--swipe-amount-y", `${A.y}px`);
    }
  }, Qe && !v.jsx && Ht !== "loading" ? /* @__PURE__ */ pe.createElement("button", {
    "aria-label": H,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !kn ? () => {
    } : () => {
      On(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ma(z?.closeButton, v == null || (l = v.classNames) == null ? void 0 : l.closeButton)
  }, (hn = L?.close) != null ? hn : vC) : null, (Ht || v.icon || v.promise) && v.icon !== null && (L?.[Ht] !== null || v.icon) ? /* @__PURE__ */ pe.createElement("div", {
    "data-icon": "",
    className: ma(z?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || ga() : null, v.type !== "loading" ? Jn : null) : null, /* @__PURE__ */ pe.createElement("div", {
    "data-content": "",
    className: ma(z?.content, v == null || (d = v.classNames) == null ? void 0 : d.content)
  }, /* @__PURE__ */ pe.createElement("div", {
    "data-title": "",
    className: ma(z?.title, v == null || (h = v.classNames) == null ? void 0 : h.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ pe.createElement("div", {
    "data-description": "",
    className: ma(se, be, z?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ pe.isValidElement(v.cancel) ? v.cancel : v.cancel && qo(v.cancel) ? /* @__PURE__ */ pe.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || _,
    onClick: (ke) => {
      qo(v.cancel) && kn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ke), On());
    },
    className: ma(z?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ pe.isValidElement(v.action) ? v.action : v.action && qo(v.action) ? /* @__PURE__ */ pe.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || Y,
    onClick: (ke) => {
      qo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ke), !ke.defaultPrevented && On());
    },
    className: ma(z?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function By() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function zC(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((l, o) => {
    const d = o === 1, h = d ? "--mobile-offset" : "--offset", m = d ? TC : NC;
    function g(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        i[`${h}-${b}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof l == "number" || typeof l == "string" ? g(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      l[p] === void 0 ? i[`${h}-${p}`] = m : i[`${h}-${p}`] = typeof l[p] == "number" ? `${l[p]}px` : l[p];
    }) : g(m);
  }), i;
}
const kC = /* @__PURE__ */ pe.forwardRef(function(a, i) {
  const { id: l, invert: o, position: d = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: g, className: p, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: C = EC, toastOptions: R, dir: D = By(), gap: O = RC, icons: T, containerAriaLabel: V = "Notifications" } = a, [K, ne] = pe.useState([]), _ = pe.useMemo(() => l ? K.filter((Q) => Q.toasterId === l) : K.filter((Q) => !Q.toasterId), [
    K,
    l
  ]), Y = pe.useMemo(() => Array.from(new Set([
    d
  ].concat(_.filter((Q) => Q.position).map((Q) => Q.position)))), [
    _,
    d
  ]), [$, se] = pe.useState([]), [ae, ee] = pe.useState(!1), [ue, W] = pe.useState(!1), [z, L] = pe.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), H = pe.useRef(null), q = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ie = pe.useRef(null), M = pe.useRef(!1), J = pe.useCallback((Q) => {
    ne((F) => {
      var le;
      return (le = F.find((de) => de.id === Q.id)) != null && le.delete || xn.dismiss(Q.id), F.filter(({ id: de }) => de !== Q.id);
    });
  }, []);
  return pe.useEffect(() => xn.subscribe((Q) => {
    if (Q.dismiss) {
      requestAnimationFrame(() => {
        ne((F) => F.map((le) => le.id === Q.id ? {
          ...le,
          delete: !0
        } : le));
      });
      return;
    }
    setTimeout(() => {
      lC.flushSync(() => {
        ne((F) => {
          const le = F.findIndex((de) => de.id === Q.id);
          return le !== -1 ? [
            ...F.slice(0, le),
            {
              ...F[le],
              ...Q
            },
            ...F.slice(le + 1)
          ] : [
            Q,
            ...F
          ];
        });
      });
    });
  }), [
    K
  ]), pe.useEffect(() => {
    if (w !== "system") {
      L(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), typeof window > "u") return;
    const Q = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Q.addEventListener("change", ({ matches: F }) => {
        L(F ? "dark" : "light");
      });
    } catch {
      Q.addListener(({ matches: le }) => {
        try {
          L(le ? "dark" : "light");
        } catch (de) {
          console.error(de);
        }
      });
    }
  }, [
    w
  ]), pe.useEffect(() => {
    K.length <= 1 && ee(!1);
  }, [
    K
  ]), pe.useEffect(() => {
    const Q = (F) => {
      var le;
      if (h.every((Te) => F[Te] || F.code === Te)) {
        var ve;
        ee(!0), (ve = H.current) == null || ve.focus();
      }
      F.code === "Escape" && (document.activeElement === H.current || (le = H.current) != null && le.contains(document.activeElement)) && ee(!1);
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [
    h
  ]), pe.useEffect(() => {
    if (H.current)
      return () => {
        ie.current && (ie.current.focus({
          preventScroll: !0
        }), ie.current = null, M.current = !1);
      };
  }, [
    H.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ pe.createElement("section", {
    ref: i,
    "aria-label": `${V} ${q}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, Y.map((Q, F) => {
    var le;
    const [de, ve] = Q.split("-");
    return _.length ? /* @__PURE__ */ pe.createElement("ol", {
      key: Q,
      dir: D === "auto" ? By() : D,
      tabIndex: -1,
      ref: H,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": z,
      "data-y-position": de,
      "data-x-position": ve,
      style: {
        "--front-toast-height": `${((le = $[0]) == null ? void 0 : le.height) || 0}px`,
        "--width": `${CC}px`,
        "--gap": `${O}px`,
        ...N,
        ...zC(b, v)
      },
      onBlur: (Te) => {
        M.current && !Te.currentTarget.contains(Te.relatedTarget) && (M.current = !1, ie.current && (ie.current.focus({
          preventScroll: !0
        }), ie.current = null));
      },
      onFocus: (Te) => {
        Te.target instanceof HTMLElement && Te.target.dataset.dismissible === "false" || M.current || (M.current = !0, ie.current = Te.relatedTarget);
      },
      onMouseEnter: () => ee(!0),
      onMouseMove: () => ee(!0),
      onMouseLeave: () => {
        ue || ee(!1);
      },
      onDragEnd: () => ee(!1),
      onPointerDown: (Te) => {
        Te.target instanceof HTMLElement && Te.target.dataset.dismissible === "false" || W(!0);
      },
      onPointerUp: () => W(!1)
    }, _.filter((Te) => !Te.position && F === 0 || Te.position === Q).map((Te, Ve) => {
      var Zt, Pt;
      return /* @__PURE__ */ pe.createElement(DC, {
        key: Te.id,
        icons: T,
        index: Ve,
        toast: Te,
        defaultRichColors: S,
        duration: (Zt = R?.duration) != null ? Zt : j,
        className: R?.className,
        descriptionClassName: R?.descriptionClassName,
        invert: o,
        visibleToasts: C,
        closeButton: (Pt = R?.closeButton) != null ? Pt : g,
        interacting: ue,
        position: Q,
        style: R?.style,
        unstyled: R?.unstyled,
        classNames: R?.classNames,
        cancelButtonStyle: R?.cancelButtonStyle,
        actionButtonStyle: R?.actionButtonStyle,
        closeButtonAriaLabel: R?.closeButtonAriaLabel,
        removeToast: J,
        toasts: _.filter((At) => At.position == Te.position),
        heights: $.filter((At) => At.position == Te.position),
        setHeights: se,
        expandByDefault: m,
        gap: O,
        expanded: ae,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), $y = 32, Vy = -30, Hy = -6, qy = 0.5, Iy = 2, Fy = -24, Yy = 24, Gy = -12, Xy = 12, Py = -12, Ky = 12, Qy = -60, Zy = -20;
class Pi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Hx(t, a, i, l = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, d = `${va}${o}`, h = await fetch(d, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), g = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Pi(g, p);
  }
  if (!h.ok)
    throw new Error(await kc(h, "apply"));
  return await h.json();
}
async function OC(t, a, i, l, o = {}) {
  const d = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${va}${d}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const g = await m.json().catch(() => null), p = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Pi(p, b);
  }
  if (!m.ok)
    throw new Error(await kc(m, "apply"));
  return await m.json();
}
async function LC(t, a, i = {}) {
  const l = `${va}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(l, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function UC(t, a, i, l = {}) {
  const o = `${va}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, d = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (!d.ok)
    throw new Error(await kc(d, "preview"));
  return d.blob();
}
async function oc(t, a, i, l = 50, o = {}) {
  const d = `${va}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(l))}`, h = await fetch(d, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await kc(h, "audit fetch"));
  return await h.json();
}
function Sn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function qx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > $y)
    return {
      message: `Chain exceeds the maximum of ${$y} operations.`
    };
  for (const i of t.ops) {
    const l = BC(i, a);
    if (l) return l;
  }
  return null;
}
function BC(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return $C(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Vy || t.target_lufs > Hy ? {
        opId: t.id,
        message: `Normalize target must be between ${Vy} and ${Hy} LUFS.`
      } : null;
    case "speed":
      return t.factor < qy || t.factor > Iy ? {
        opId: t.id,
        message: `Speed factor must be between ${qy}× and ${Iy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < Fy || t.gain_db > Yy ? {
        opId: t.id,
        message: `Volume must be between ${Fy} and ${Yy} dB.`
      } : null;
    case "eq3":
      for (const [i, l] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (l < Gy || l > Xy)
          return {
            opId: t.id,
            message: `EQ ${i} must be between ${Gy} and ${Xy} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < Py || t.semitones > Ky ? {
        opId: t.id,
        message: `Pitch must be between ${Py} and ${Ky} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < Qy || t.threshold_db > Zy ? {
        opId: t.id,
        message: `Silence threshold must be between ${Qy} and ${Zy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function $C(t, a, i, l) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: t, message: "End must be greater than start." } : l > 0 && i > l ? { opId: t, message: "End extends past source duration." } : null;
}
async function kc(t, a) {
  const i = await t.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${t.status}`;
}
var VC = "g5r6d10", HC = "g5r6d11", qC = "g5r6d12", IC = "g5r6d13", FC = "g5r6d14", YC = "g5r6d15", GC = "g5r6d1a", XC = "g5r6d1b", PC = "g5r6d1c", KC = "g5r6d1d", QC = "g5r6d1e", ZC = "g5r6d1g", JC = "g5r6d1h", WC = "g5r6d1i", eR = "g5r6d1j", tR = "g5r6d1k", nR = "g5r6d1l", aR = "g5r6d1m", rR = "g5r6d1n", iR = "g5r6d1o", Jy = "g5r6d1p", sR = "g5r6d1q", lR = "g5r6d1r", oR = "g5r6d1s", cR = "g5r6d1t", uR = "g5r6d1u", Wy = "g5r6d1v", e0 = "g5r6d1w", dR = "g5r6d1x", fR = "g5r6d1y", Ii = "g5r6d1z", hR = "g5r6d110", t0 = "g5r6d111", mR = "g5r6d112", pR = "g5r6d113", fr = "g5r6d114", vR = "g5r6d119", gR = "a6ki8u0", yR = "a6ki8u1", bR = "a6ki8u2", xR = "a6ki8u3", SR = "a6ki8u4", wR = "a6ki8u5", jR = "a6ki8u6", lf = "a6ki8u7", ER = "a6ki8u8", NR = "a6ki8u9", TR = "a6ki8ua", CR = "a6ki8ub", RR = "a6ki8uc", MR = "a6ki8ud", _R = "a6ki8ue", AR = "a6ki8uf", DR = "a6ki8ug", zR = "a6ki8uh", kR = "_1lguv7x0", OR = "_1lguv7x1", LR = "_1lguv7x2", UR = "_1lguv7x3", BR = "_1lguv7x4", $R = "_1lguv7x5", VR = "_1lguv7x6", HR = "_1lguv7x7", qR = "_1lguv7x8", IR = "_1lguv7x9", FR = "_1lguv7xa", YR = "_1lguv7xb", GR = "_1lguv7xc", n0 = "_1lguv7xd", XR = "_1lguv7xe", PR = "_1lguv7xf", KR = "_1lguv7xg", QR = "_1lguv7xh", Ix = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Fx = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, ZR = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, JR = "_4ydn54f";
function $e({
  variant: t = "primary",
  size: a = "md",
  type: i = "button",
  loading: l = !1,
  iconOnly: o = !1,
  disabled: d,
  children: h,
  className: m,
  style: g,
  ...p
}) {
  const b = [
    Ix[t],
    Fx[a],
    o ? ZR[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: i,
      className: b,
      style: g,
      disabled: l || d,
      "aria-busy": l || void 0,
      ...p,
      children: [
        l ? /* @__PURE__ */ c.jsx("span", { className: JR, "aria-hidden": "true" }) : null,
        h
      ]
    }
  );
}
const WR = 28;
function eM(t) {
  if (!t) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(t.length, 12); i++)
    a = a * 33 + t.charCodeAt(i) >>> 0;
  return a || 1;
}
function tM(t, a) {
  const i = new Array(a);
  let l = t;
  for (let o = 0; o < a; o++) {
    l = (l * 9301 + 49297) % 233280;
    const d = l / 233280, h = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, h * (0.32 + d * 0.68));
  }
  return i;
}
function nM(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function aM(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function rM({
  asset: t,
  presentation: a,
  usedBy: i,
  isPlaying: l,
  onTogglePlay: o,
  onRename: d,
  onCopyName: h,
  onDelete: m,
  onPlaybackEnded: g
}) {
  const [p, b] = y.useState(!1), [v, w] = y.useState(t.displayName), S = y.useRef(null), j = y.useMemo(() => eM(t.contentSha256), [t.contentSha256]), N = y.useMemo(() => tM(j, WR), [j]), C = y.useMemo(() => AT(t), [t]);
  y.useEffect(() => {
    w(t.displayName);
  }, [t.displayName]), y.useEffect(() => {
    const O = S.current;
    O && (l && C ? O.play().catch(() => {
    }) : (O.pause(), O.currentTime = 0));
  }, [l, C]);
  const R = async () => {
    const O = v.trim();
    if (!O || O === t.displayName) {
      b(!1), w(t.displayName);
      return;
    }
    try {
      await d(O);
    } finally {
      b(!1);
    }
  }, D = `${nM(t.durationMs)} · ${aM(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: kR, "data-playing": l ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: OR, children: [
      /* @__PURE__ */ c.jsx("span", { className: LR, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: UR, children: [
        p ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: $R,
            value: v,
            autoFocus: !0,
            onChange: (O) => w(O.target.value),
            onBlur: () => {
              R();
            },
            onKeyDown: (O) => {
              O.key === "Enter" ? (O.preventDefault(), O.currentTarget.blur()) : O.key === "Escape" && (b(!1), w(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: BR,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: VR, children: D })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: HR, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: qR,
        "data-playing": l ? "true" : "false",
        disabled: C == null,
        title: C ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": l ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: IR, "aria-hidden": "true", children: l ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: FR, "aria-hidden": "true", children: N.map((O, T) => /* @__PURE__ */ c.jsx("span", { className: YR, style: { height: `${Math.round(O * 100)}%` } }, T)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: GR, children: [
      i.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: n0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        i.map((O) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: XR,
            style: { color: O.color, borderColor: O.color },
            children: O.characterName
          },
          O.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: n0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: PR, children: [
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Rename",
            "aria-label": "Rename voice",
            onClick: () => b(!0),
            children: "✎"
          }
        ),
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Copy name",
            "aria-label": "Copy voice name",
            onClick: h,
            children: "⧉"
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: KR,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }),
    C && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: S,
        src: C,
        preload: "none",
        className: QR,
        onEnded: g
      }
    )
  ] });
}
var iM = "_17eol302", sM = "_17eol303", lM = "_17eol304", oM = "_17eol305", cM = "_17eol306", uM = "_17eol307", Io = "_17eol308", dM = "_17eol309", fM = "_17eol30a", hM = "_17eol30b", mM = "_17eol30c", pM = "_17eol30d", a0 = "_17eol30e", vM = "_17eol30g";
function gM() {
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
function yM(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function bM({
  open: t,
  defaultName: a,
  onClose: i,
  onSubmit: l
}) {
  const [o, d] = y.useState("idle"), [h, m] = y.useState(null), [g, p] = y.useState(0), [b, v] = y.useState(null), [w, S] = y.useState(a), [j, N] = y.useState(!1), C = y.useRef(null), R = y.useRef(null), D = y.useRef([]), O = y.useRef(0), T = y.useRef(null), V = y.useRef(null), K = y.useRef({ mime: "audio/webm", ext: "webm" }), ne = y.useRef(null), _ = y.useRef(null), Y = y.useRef(null);
  y.useEffect(() => {
    if (t)
      return Y.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ne.current?.scrollIntoView({ behavior: "smooth", block: "center" }), _.current?.focus();
      }), () => {
        Y.current?.focus?.();
      };
  }, [t]), y.useEffect(() => {
    if (!t) return;
    const L = (H) => {
      H.key === "Escape" && i();
    };
    return window.addEventListener("keydown", L), () => window.removeEventListener("keydown", L);
  }, [t, i]);
  const $ = y.useCallback(
    (L) => {
      if (L.key !== "Tab") return;
      const H = ne.current;
      if (!H) return;
      const q = H.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (q.length === 0) return;
      const ie = q[0], M = q[q.length - 1], J = document.activeElement;
      L.shiftKey ? (J === ie || J === H) && (L.preventDefault(), M.focus()) : J === M && (L.preventDefault(), ie.focus());
    },
    []
  ), se = y.useCallback(() => {
    if (R.current) {
      for (const L of R.current.getTracks()) L.stop();
      R.current = null;
    }
    T.current != null && (window.clearInterval(T.current), T.current = null);
  }, []), ae = y.useCallback(() => {
    se(), b && URL.revokeObjectURL(b), v(null), D.current = [], V.current = null, p(0), m(null), d("idle");
  }, [b, se]);
  if (y.useEffect(() => {
    t || (ae(), S(a));
  }, [t, a, ae]), y.useEffect(() => () => {
    se(), b && URL.revokeObjectURL(b);
  }, [b, se]), !t) return null;
  const ee = async () => {
    m(null), d("preparing");
    try {
      const L = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      R.current = L;
      const H = gM();
      K.current = H;
      const q = H.mime ? new MediaRecorder(L, { mimeType: H.mime }) : new MediaRecorder(L);
      C.current = q, D.current = [], q.ondataavailable = (ie) => {
        ie.data && ie.data.size > 0 && D.current.push(ie.data);
      }, q.onstop = () => {
        const ie = H.mime || "audio/webm", M = new Blob(D.current, { type: ie }), J = new File([M], `${w || a || "recording"}.${H.ext}`, {
          type: ie
        });
        V.current = J;
        const Q = URL.createObjectURL(M);
        v(Q), d("ready"), se();
      }, q.start(), O.current = Date.now(), p(0), T.current = window.setInterval(() => {
        p(Date.now() - O.current);
      }, 200), d("recording");
    } catch (L) {
      const H = L instanceof Error ? L.message : "could not access microphone";
      m(H), d(H.toLowerCase().includes("denied") ? "denied" : "error"), se();
    }
  }, ue = () => {
    const L = C.current;
    L && L.state !== "inactive" && L.stop(), T.current != null && (window.clearInterval(T.current), T.current = null);
  }, W = async () => {
    const L = V.current;
    if (!L) return;
    const H = (w || a).trim();
    if (!H) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await l(L, H), i();
    } catch (q) {
      m(q instanceof Error ? q.message : "upload failed");
    } finally {
      N(!1);
    }
  }, z = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: iM, role: "presentation", onClick: i, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ne,
      className: sM,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (L) => L.stopPropagation(),
      onKeyDown: $,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: lM, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: oM, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: cM,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: z
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: mM, "aria-live": "polite", children: yM(g) }),
        /* @__PURE__ */ c.jsxs("div", { className: uM, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: _,
              type: "button",
              className: Io,
              "data-tone": "danger",
              onClick: () => {
                ee();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: a0, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ c.jsx("button", { type: "button", className: Io, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ c.jsxs(
            "button",
            {
              type: "button",
              className: Io,
              "data-tone": "danger",
              "data-active": "true",
              onClick: ue,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: a0, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: Io,
              onClick: () => {
                ae();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: pM, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: dM, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: fM,
              value: w,
              onChange: (L) => S(L.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ c.jsx("div", { className: hM, children: h }),
        /* @__PURE__ */ c.jsxs("div", { className: vM, children: [
          /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "md", onClick: i, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            $e,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                W();
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
function xM({
  deploymentId: t,
  voiceAssets: a,
  mappings: i,
  characterColors: l,
  onVoiceAssetsChange: o
}) {
  const [d, h] = y.useState(""), [m, g] = y.useState("all"), [p, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), [N, C] = y.useState(!1), R = y.useRef(null), D = y.useCallback(
    (ee) => "upload",
    []
  ), O = y.useMemo(() => {
    const ee = d.trim().toLowerCase();
    return a.filter((ue) => {
      const W = D(ue);
      return !(m === "uploaded" && W !== "upload" || m === "preset" && W !== "preset" || ee && !ue.displayName.toLowerCase().includes(ee));
    });
  }, [a, d, m, D]), T = y.useMemo(
    () => a.filter((ee) => D(ee) === "upload").length,
    [a, D]
  ), V = y.useCallback(
    (ee) => {
      const ue = [], W = /* @__PURE__ */ new Set();
      for (const z of i)
        z.speakerVoiceAssetId === ee && (W.has(z.characterName) || (W.add(z.characterName), ue.push({
          characterName: z.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: l[z.characterName] ?? "#ba9eff"
        })));
      return ue;
    },
    [i, l]
  ), K = y.useCallback(
    async (ee) => {
      const ue = Array.from(ee).slice(0, 8);
      if (ue.length !== 0) {
        C(!0);
        try {
          const W = [];
          for (const z of ue) {
            if (!z.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(z.name)) {
              fn.error(`${z.name}: not an audio file`);
              continue;
            }
            const L = z.name.replace(/\.[^.]+$/, "");
            try {
              const H = await pc(t, z, L, "speaker");
              W.push(H), fn.success(`Added ${H.displayName}`);
            } catch (H) {
              fn.error(H instanceof Error ? H.message : `${z.name}: upload failed`);
            }
          }
          W.length > 0 && o([...W, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [t, a, o]
  ), ne = (ee) => {
    ee.preventDefault(), b(!1), ee.dataTransfer?.files && K(ee.dataTransfer.files);
  }, _ = y.useCallback(async () => {
    const ee = window.prompt("Paste an audio URL (https://…)");
    if (ee)
      try {
        const ue = await fetch(ee);
        if (!ue.ok) throw new Error(`fetch failed: ${ue.status}`);
        const W = await ue.blob(), z = ee.split("/").pop()?.split("?")[0] ?? "voice.wav", L = new File([W], z, { type: W.type || "audio/wav" });
        await K([L]);
      } catch (ue) {
        fn.error(ue instanceof Error ? ue.message : "could not fetch URL");
      }
  }, [K]), Y = y.useCallback(
    async (ee, ue) => {
      try {
        const W = await _T(t, ee, ue);
        o(
          a.map((z) => z.voiceAssetId === ee ? W : z)
        ), fn.success(`Renamed to ${W.displayName}`);
      } catch (W) {
        fn.error(W instanceof Error ? W.message : "rename failed");
      }
    },
    [t, a, o]
  ), $ = y.useCallback((ee) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(ee), fn.success("Copied name")) : fn.error("Clipboard unavailable");
  }, []), se = y.useCallback(
    async (ee) => {
      if (window.confirm(`Delete "${ee.displayName}"? Mappings using it will reset.`))
        try {
          await MT(t, ee.voiceAssetId), o(a.filter((W) => W.voiceAssetId !== ee.voiceAssetId)), fn.success(`Deleted ${ee.displayName}`);
        } catch (W) {
          fn.error(W instanceof Error ? W.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: gR, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: yR,
        "data-over": p ? "true" : "false",
        onDragOver: (ee) => {
          ee.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: ne,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: bR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: xR, children: [
            /* @__PURE__ */ c.jsxs("div", { className: SR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: wR, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: jR, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: lf,
                  onClick: () => R.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: lf,
                  onClick: () => {
                    _();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: lf,
                  onClick: () => j(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            $e,
            {
              variant: "primary",
              size: "md",
              disabled: N,
              onClick: () => R.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: R,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: zR,
              onChange: (ee) => {
                ee.target.files && (K(ee.target.files), ee.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: ER, children: [
      /* @__PURE__ */ c.jsxs("label", { className: NR, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: TR,
            value: d,
            onChange: (ee) => h(ee.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: CR, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([ee, ue]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: RR,
          "data-active": m === ee ? "true" : "false",
          onClick: () => g(ee),
          children: ue
        },
        ee
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: AR, children: [
        /* @__PURE__ */ c.jsx("span", { className: DR, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          T,
          " uploaded"
        ] })
      ] })
    ] }),
    O.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: _R, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: MR, children: O.map((ee) => {
      const ue = D(ee);
      return /* @__PURE__ */ c.jsx(
        rM,
        {
          asset: ee,
          presentation: ue,
          usedBy: V(ee.voiceAssetId),
          isPlaying: v === ee.voiceAssetId,
          onTogglePlay: () => w((W) => W === ee.voiceAssetId ? null : ee.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (W) => Y(ee.voiceAssetId, W),
          onCopyName: () => $(ee.displayName),
          onDelete: ue === "upload" ? () => void se(ee) : void 0
        },
        ee.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      bM,
      {
        open: S,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => j(!1),
        onSubmit: async (ee, ue) => {
          await ae(ee, ue);
        }
      }
    )
  ] });
  async function ae(ee, ue) {
    C(!0);
    try {
      const W = await pc(t, ee, ue, "speaker");
      o([W, ...a]), fn.success(`Recorded ${W.displayName}`);
    } catch (W) {
      throw fn.error(W instanceof Error ? W.message : "upload failed"), W;
    } finally {
      C(!1);
    }
  }
}
async function Yx(t) {
  return ht(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function SM(t, a, i) {
  return ht("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: i })
  });
}
async function wM(t, a) {
  await ht(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var r0 = "_190jlds0", jM = "_190jlds1", EM = "_190jlds2", NM = "_190jlds3", TM = "_190jlds4", CM = "_190jlds5", RM = "_190jlds6", MM = "_190jlds7", _M = "_190jlds8", AM = "_190jlds9", i0 = "_190jldsa", DM = "_190jldsb", s0 = "_190jldsc", zM = "_190jldsd", kM = "_190jldse", OM = "_190jldsf";
function LM({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: l,
  emptyHint: o
}) {
  const [d, h] = y.useState(() => Li(a[0])), [m, g] = y.useState([]), [p, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), [N, C] = y.useState(null), R = y.useMemo(
    () => a.find((T) => Li(T) === d) ?? a[0],
    [a, d]
  );
  y.useEffect(() => {
    a.length && (a.some((T) => Li(T) === d) || h(Li(a[0])));
  }, [a, d]), y.useEffect(() => {
    if (!R) {
      g([]);
      return;
    }
    let T = !1;
    return b(!0), w(null), oc(t, R.kind, R.id, 50).then((V) => {
      T || g(V.entries);
    }).catch((V) => {
      T || w(V instanceof Error ? V.message : "audit fetch failed");
    }).finally(() => {
      T || b(!1);
    }), () => {
      T = !0;
    };
  }, [t, R]);
  const D = y.useCallback(() => {
    if (!R) return;
    const T = {
      deploymentId: t,
      targetKind: R.kind,
      targetId: R.id,
      targetLabel: R.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, V = new Blob([JSON.stringify(T, null, 2)], {
      type: "application/json"
    }), K = URL.createObjectURL(V), ne = document.createElement("a");
    ne.href = K, ne.download = `audit-${R.kind}-${R.id}-${Date.now()}.json`, document.body.appendChild(ne), ne.click(), document.body.removeChild(ne), URL.revokeObjectURL(K);
  }, [t, m, R]), O = y.useCallback(async () => {
    if (!(!R || !i) && window.confirm(
      `Revert "${R.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await i(R);
        const T = await oc(t, R.kind, R.id, 50);
        g(T.entries);
      } catch (T) {
        w(T instanceof Error ? T.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, i, R]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: r0, children: /* @__PURE__ */ c.jsx("p", { className: s0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: r0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: jM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: EM, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: i0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: NM,
            value: d,
            onChange: (T) => h(T.target.value),
            children: a.map((T) => /* @__PURE__ */ c.jsxs("option", { value: Li(T), children: [
              T.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              T.label
            ] }, Li(T)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: TM, children: [
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: D,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void O(),
            disabled: S || !R,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: kM, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: OM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: s0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: zM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: CM, children: m.map((T) => {
      const V = l && R && !!T.chain_snapshot_json && T.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: RM, children: [
        /* @__PURE__ */ c.jsx("span", { className: MM, children: UM(T.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: _M, children: T.operation_count === 0 ? "cleared" : `${T.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: AM, title: T.digest_after, children: [
          T.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: i0, children: T.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: DM,
            style: {
              background: `color-mix(in oklab, ${T.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: T.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: T.digest_before === "" || !T.digest_before ? "create" : T.operation_count === 0 ? "clear" : "update"
          }
        ),
        V && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            disabled: S || N !== null,
            onClick: async () => {
              if (!(!R || !T.chain_snapshot_json) && !(N !== null || S) && window.confirm(
                `Replay this ${T.operation_count}-op chain on "${R.label}"? A new audit entry will be written.`
              )) {
                C(T.entry_id);
                try {
                  await l(R, T.chain_snapshot_json, T);
                  const K = await oc(
                    t,
                    R.kind,
                    R.id,
                    50
                  );
                  g(K.entries);
                } catch (K) {
                  w(K instanceof Error ? K.message : "revert failed");
                } finally {
                  C(null);
                }
              }
            },
            children: N === T.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, T.entry_id);
    }) })
  ] });
}
function Li(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function UM(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var BM = "_1uzgubz0", $M = "_1uzgubz1", VM = "_1uzgubz2", HM = "_1uzgubz3", qM = "_1uzgubz4", IM = "_1uzgubz5", FM = "_1uzgubz6", YM = "_1uzgubz7", l0 = "_1uzgubz8", GM = "_1uzgubz9", Gx = "_1uzgubza", Xx = "_1uzgubzb", XM = "_1uzgubzc", PM = "_1uzgubzd", of = "_1uzgubze", cf = "_1uzgubzf", KM = "_1uzgubzg", QM = "_1uzgubzh", o0 = "_1uzgubzi", c0 = "_1uzgubzj", u0 = "_1uzgubzk", d0 = "_1uzgubzl", f0 = "_1uzgubzm", ZM = "_1uzgubzn", JM = "_1uzgubzo", WM = "_1uzgubzp", e_ = "_1uzgubzq";
function t_({
  characterName: t,
  color: a,
  lineCount: i,
  mapping: l,
  voiceAssets: o,
  presets: d,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: g,
  onAssignPreset: p,
  onUploadFile: b,
  onClearMapping: v
}) {
  const [w, S] = y.useState(!1), j = l ? o.find((D) => D.voiceAssetId === l.speakerVoiceAssetId) : null, N = l?.defaultVectorPresetId ? d.find((D) => D.presetId === l.defaultVectorPresetId) ?? null : null, C = (t[0] ?? "?").toUpperCase(), R = l !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${BM}${h ? ` ${$M}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: VM,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: HM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: C
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: qM, children: [
            /* @__PURE__ */ c.jsx("span", { className: IM, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: FM, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: YM, children: [
            j ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: l0, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                h0(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: l0, children: N.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            l?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: XM, children: [
              "chain · ",
              l.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${GM} ${R ? Gx : Xx}`,
              children: R ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ c.jsxs("div", { className: PM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: of, children: [
        /* @__PURE__ */ c.jsx("span", { className: cf, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${KM}${w ? ` ${QM}` : ""}`,
            onDragEnter: (D) => {
              D.preventDefault(), S(!0);
            },
            onDragOver: (D) => D.preventDefault(),
            onDragLeave: () => S(!1),
            onDrop: (D) => {
              D.preventDefault(), S(!1);
              const O = D.dataTransfer.files?.[0];
              O && b && b(O);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (D) => {
                    const O = D.target.files?.[0];
                    O && b && b(O);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: of, children: [
        /* @__PURE__ */ c.jsx("span", { className: cf, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: o0, children: o.map((D) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${c0}${l?.speakerVoiceAssetId === D.voiceAssetId ? ` ${u0}` : ""}`,
            onClick: () => g(D.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: d0, children: D.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: f0, children: [
                D.durationMs != null ? h0(D.durationMs) : "—",
                " ",
                "·",
                " ",
                D.sampleRate ? `${D.sampleRate} Hz` : "—"
              ] })
            ]
          },
          D.voiceAssetId
        )) })
      ] }),
      d.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: of, children: [
        /* @__PURE__ */ c.jsx("span", { className: cf, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: o0, children: d.map((D) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${c0}${l?.defaultVectorPresetId === D.presetId ? ` ${u0}` : ""}`,
            onClick: () => p(D.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: d0, children: D.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: f0, children: "preset · vector" })
            ]
          },
          D.presetId
        )) })
      ] }),
      R && v && /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function h0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function n_({
  unmappedCount: t,
  totalCount: a,
  children: i,
  emptyHint: l
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: e_, children: l ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: ZM, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${JM} ${o ? Gx : Xx}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: WM, children: i })
  ] });
}
async function vc() {
  return ht("/runtime/health");
}
async function a_() {
  await ht("/runtime/start", { method: "POST" });
}
async function r_() {
  return ht("/runtime/stop", { method: "POST" });
}
function Px(t) {
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
var i_ = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function zn({
  severity: t,
  children: a,
  role: i,
  ariaLive: l,
  className: o,
  style: d
}) {
  const h = [i_[t], o].filter(Boolean).join(" "), m = i ?? (t === "error" ? "alert" : "status"), g = l ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: h, role: m, "aria-live": g, style: d, children: a });
}
var Kx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Qx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, s_ = "_13bb4njb";
function Qr({
  tone: t,
  size: a = "sm",
  pulse: i = !1,
  children: l,
  className: o,
  style: d,
  title: h
}) {
  const m = i && t !== "faint", g = [Kx[a], Qx[t], m ? s_ : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: g, style: d, title: h, children: l });
}
const l_ = 4e3;
function o_({ deployment: t }) {
  const [a, i] = y.useState(null), [l, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const g = async () => {
      try {
        const b = await vc();
        m || (i(b), o(null));
      } catch (b) {
        m || o(d_(b));
      }
    };
    g();
    const p = setInterval(g, l_);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const d = a?.badge ?? "not_installed", h = l?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: hR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Ii, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Ii, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Qr, { tone: c_(d), pulse: d === "starting" || d === "installing", children: Px(d) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Ii, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: u_(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Ii, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    l && !h && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: l })
  ] });
}
function c_(t) {
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
function u_(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function d_(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
const gc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Oc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ba = 1e-3;
function f_(t, a, i) {
  for (const l of Object.keys(gc)) {
    const o = gc[l];
    if (Math.abs(o.low - t) < Ba && Math.abs(o.mid - a) < Ba && Math.abs(o.high - i) < Ba)
      return l;
  }
  return "custom";
}
function h_(t) {
  let a = p_();
  for (const i of t.ops)
    a = m_(a, i);
  return a;
}
function m_(t, a) {
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
          preset: f_(a.low_db, a.mid_db, a.high_db)
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
function p_() {
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
function wr(t, a) {
  return t.ops.filter((i) => i.mode !== a);
}
function jr(t, a) {
  return [...t, a];
}
function v_(t, a) {
  const i = wr(t, "gain");
  if (Math.abs(a) < Ba) return { ...t, ops: i };
  const l = { id: Sn(), mode: "gain", gain_db: a };
  return { ...t, ops: jr(i, l) };
}
function g_(t, a, i, l) {
  const o = wr(t, "eq3");
  if (Math.abs(a) < Ba && Math.abs(i) < Ba && Math.abs(l) < Ba)
    return { ...t, ops: o };
  const d = {
    id: Sn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: l
  };
  return { ...t, ops: jr(o, d) };
}
function y_(t, a) {
  const i = wr(t, "speed");
  if (Math.abs(a - 1) < Ba) return { ...t, ops: i };
  const l = { id: Sn(), mode: "speed", factor: a };
  return { ...t, ops: jr(i, l) };
}
function b_(t, a) {
  const i = wr(t, "pitch_shift");
  if (Math.abs(a) < Ba) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: jr(i, l) };
}
function x_(t, a, i) {
  const l = wr(t, "normalize");
  if (a === "off") return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...t, ops: jr(l, o) };
}
function S_(t, a) {
  const i = wr(t, "fade_in");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: jr(i, l) };
}
function w_(t, a) {
  const i = wr(t, "fade_out");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: jr(i, l) };
}
function j_(t, a, i) {
  const l = wr(t, "silence_strip");
  if (!a) return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...t, ops: jr(l, o) };
}
const Zx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function Jx(t, a) {
  const i = {
    ...t,
    ops: t.ops.filter((d) => !Zx.has(d.mode))
  };
  let o = v_({ version: 1, ops: [] }, a.volumeDb);
  return o = g_(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = y_(o, a.speed.value)), o = b_(o, a.pitchSt), o = x_(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = S_(o, a.fade.inS), o = w_(o, a.fade.outS), o = j_(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function Wx(t) {
  const a = {
    ...t,
    ops: t.ops.filter((i) => Zx.has(i.mode))
  };
  return h_(a);
}
var E_ = "_1rsa80i0", N_ = "_1rsa80i1", T_ = "_1rsa80i2", C_ = "_1rsa80i3", R_ = "_1rsa80i4", M_ = "_1rsa80i5", __ = "_1rsa80i6", A_ = "_1rsa80i7", D_ = "_1rsa80i8", z_ = "_1rsa80i9";
const e1 = ["flat", "warm", "bright", "voice", "telephone"], Zs = -12, Fo = 12, k_ = 0.5;
function O_(t) {
  const { low: a, mid: i, high: l, preset: o, onChange: d, disabled: h } = t, m = (p) => {
    const b = gc[p];
    d(b.low, b.mid, b.high, p);
  }, g = (p, b) => {
    const v = { low: a, mid: i, high: l, [p]: b }, w = U_(v.low, v.mid, v.high);
    d(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: E_, children: [
    /* @__PURE__ */ c.jsxs("div", { className: N_, role: "group", "aria-label": "EQ presets", children: [
      e1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: T_,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: C_, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: R_, children: [
      /* @__PURE__ */ c.jsx(
        uf,
        {
          label: "Low",
          value: a,
          onChange: (p) => g("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ c.jsx(
        uf,
        {
          label: "Mid",
          value: i,
          onChange: (p) => g("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ c.jsx(
        uf,
        {
          label: "High",
          value: l,
          onChange: (p) => g("high", p),
          disabled: h
        }
      )
    ] })
  ] });
}
function uf({ label: t, value: a, onChange: i, disabled: l }) {
  const o = (a - Zs) / (Fo - Zs) * 100, d = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: M_, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: d, className: __, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: d,
        type: "range",
        min: Zs,
        max: Fo,
        step: k_,
        value: a,
        disabled: l,
        className: D_,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": Zs,
        "aria-valuemax": Fo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: A_, children: L_(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: z_, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: Zs }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Fo
      ] })
    ] })
  ] });
}
function L_(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const df = 1e-3;
function U_(t, a, i) {
  for (const l of e1) {
    const o = gc[l];
    if (Math.abs(o.low - t) < df && Math.abs(o.mid - a) < df && Math.abs(o.high - i) < df)
      return l;
  }
  return "custom";
}
var B_ = "_85bhwb0", $_ = "_85bhwb1", m0 = "_85bhwb2", V_ = "_85bhwb3", H_ = "_85bhwb4", q_ = "_85bhwb5", I_ = "_85bhwb6", F_ = "_85bhwb7";
const Yo = 0.5, ff = 2, Y_ = 0.05;
function G_(t) {
  const { mode: a, value: i, supportsSynthSpeed: l, onChange: o, onReRenderAtSynthTime: d, disabled: h } = t, m = (i - Yo) / (ff - Yo) * 100, g = y.useId(), p = (v) => o(v, i), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: B_, children: [
    l ? /* @__PURE__ */ c.jsxs("div", { className: $_, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: m0,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: h,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: m0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: V_, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Yo,
          max: ff,
          step: Y_,
          value: i,
          disabled: h,
          className: H_,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Yo,
          "aria-valuemax": ff,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: q_, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && l ? /* @__PURE__ */ c.jsxs("div", { className: I_, children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "primary",
          size: "sm",
          onClick: d,
          disabled: h || !d,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: F_, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var X_ = "kgszk50", P_ = "kgszk51", p0 = "kgszk52", K_ = "kgszk53", Q_ = "kgszk54", t1 = "kgszk55", Z_ = "kgszk56", J_ = "kgszk58", $h = "kgszk59", n1 = "kgszk5a", Vh = "kgszk5b", W_ = "kgszk5c", eA = "kgszk5d", tA = "kgszk5e", v0 = "kgszk5f", g0 = "kgszk5g", y0 = "kgszk5h", nA = "kgszk5i", aA = "kgszk5j", rA = "kgszk5l", hl = "kgszk5m", ml = "kgszk5n";
const iA = -24, sA = 24, lA = 0.5, oA = -12, cA = 12, uA = 0.5, dA = -30, fA = -6, hA = -12, mA = 0, Go = -60, hf = -20;
function Hh(t) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: l,
    onReRenderAtSynthTime: o,
    onSliderFlush: d,
    pendingExecution: h = !1,
    disabled: m = !1,
    onApply: g,
    applyLabel: p = "Apply edit"
  } = t, b = (S) => {
    i({ ...a, ...S });
  }, v = yA(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && d?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: X_, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: P_, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: K_, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: p0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ c.jsxs("span", { className: p0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: Q_, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      b0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: iA,
        max: sA,
        step: lA,
        format: bA,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: hl, children: [
      /* @__PURE__ */ c.jsx("span", { className: ml, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        O_,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (S, j, N, C) => b({ eq3: { low: S, mid: j, high: N, preset: C } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: hl, children: [
      /* @__PURE__ */ c.jsx("span", { className: ml, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        G_,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: l,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (S, j) => b({ speed: { mode: S, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      b0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: oA,
        max: cA,
        step: uA,
        format: xA,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      pA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      vA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      gA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    g ? /* @__PURE__ */ c.jsxs("div", { className: rA, children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(Oc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx($e, { variant: "primary", size: "md", onClick: g, disabled: m, children: p })
    ] }) : null
  ] });
}
function b0(t) {
  const { label: a, sub: i, min: l, max: o, step: d, format: h, value: m, onChange: g, disabled: p } = t, b = (m - l) / (o - l) * 100, v = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: t1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Z_, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: J_, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: n1, children: i })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: l,
        max: o,
        step: d,
        value: m,
        disabled: p,
        className: Vh,
        style: { "--fill": `${b}%` },
        onChange: (w) => g(Number(w.target.value)),
        "aria-valuemin": l,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: $h, children: h(m) })
  ] });
}
function pA({ normalize: t, onChange: a, disabled: i }) {
  const o = t.mode === "loudness" ? { min: dA, max: fA, step: 0.5, suffix: "LUFS" } : { min: hA, max: mA, step: 0.5, suffix: "dB" }, d = SA(t.targetDbOrLufs, o.min, o.max), h = (d - o.min) / (o.max - o.min) * 100, m = (g) => {
    if (g === "off") {
      a({ mode: g, targetDbOrLufs: t.targetDbOrLufs });
      return;
    }
    if (g === "peak") {
      a({ mode: g, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: g, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: hl, children: [
    /* @__PURE__ */ c.jsx("span", { className: ml, children: "Normalize" }),
    /* @__PURE__ */ c.jsx("div", { className: W_, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const p = g === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: eA,
          "data-active": t.mode === g,
          disabled: i || p,
          onClick: () => m(g),
          title: p ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            g,
            p ? " (soon)" : ""
          ]
        },
        g
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: t1, children: [
      /* @__PURE__ */ c.jsx("span", { className: n1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: d,
          disabled: i,
          className: Vh,
          style: { "--fill": `${h}%` },
          onChange: (g) => a({ mode: t.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": d,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: $h, children: [
        d.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function vA({ inS: t, outS: a, onChange: i, disabled: l }) {
  const o = y.useId(), d = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: hl, children: [
    /* @__PURE__ */ c.jsx("span", { className: ml, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: tA, children: [
      /* @__PURE__ */ c.jsxs("div", { className: v0, children: [
        /* @__PURE__ */ c.jsx("label", { className: g0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: l,
            className: y0,
            onChange: (h) => i(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: v0, children: [
        /* @__PURE__ */ c.jsx("label", { className: g0, htmlFor: d, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: d,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: l,
            className: y0,
            onChange: (h) => i(t, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function gA({ enabled: t, thresholdDb: a, onChange: i, disabled: l }) {
  const o = (a - Go) / (hf - Go) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: hl, children: [
    /* @__PURE__ */ c.jsx("span", { className: ml, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: nA, children: [
      /* @__PURE__ */ c.jsxs("label", { className: aA, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            disabled: l,
            onChange: (d) => i(d.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: Go,
          max: hf,
          step: 1,
          value: a,
          disabled: l || !t,
          className: Vh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (d) => i(t, Number(d.target.value)),
          "aria-valuemin": Go,
          "aria-valuemax": hf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: $h, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Ui = 1e-3;
function yA(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Ui && a.push("gain"), (Math.abs(t.eq3.low) >= Ui || Math.abs(t.eq3.mid) >= Ui || Math.abs(t.eq3.high) >= Ui) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Ui && a.push("speed"), Math.abs(t.pitchSt) >= Ui && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function bA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function xA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function SA(t, a, i) {
  return Number.isFinite(t) ? Math.max(a, Math.min(i, t)) : a;
}
var wA = "skdk4g0", jA = "skdk4g1", x0 = "skdk4g2", EA = "skdk4g3", NA = "skdk4g4", TA = "skdk4g5", CA = "skdk4g6", RA = "skdk4g7", MA = "skdk4g8", _A = "skdk4g9", AA = "skdk4ga", DA = "skdk4gb", zA = "skdk4gc", kA = "skdk4gd", S0 = "skdk4ge", w0 = "skdk4gf", OA = "skdk4gg", j0 = "skdk4gh", E0 = "skdk4gi", LA = "skdk4gj", UA = "skdk4gk", BA = "skdk4gl", N0 = "skdk4gm", $A = "skdk4gn", T0 = "skdk4go", VA = "skdk4gp", HA = "skdk4gq", qA = "skdk4gr", IA = "skdk4gs", FA = "skdk4gt", YA = "skdk4gu", GA = "skdk4gv", C0 = "skdk4gw", XA = "skdk4gx", PA = "skdk4gy", KA = "skdk4gz", QA = "skdk4g10", ZA = "cgsfgh1", JA = "cgsfgh2", WA = "cgsfgh3", e2 = "cgsfgh4", t2 = "cgsfgh5", n2 = "cgsfgh6", a2 = "cgsfgh7", r2 = "cgsfgh8", i2 = "cgsfgh9", s2 = "cgsfgha", l2 = "cgsfghb", o2 = "cgsfghc", c2 = "cgsfghd", u2 = "cgsfghe", d2 = "cgsfghm", f2 = "cgsfghn", h2 = "cgsfgho", m2 = "cgsfghp";
const Vt = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], pl = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Ki = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, a1 = 0.05;
function p2(t) {
  let a = null, i = -1 / 0;
  for (const l of Vt) {
    const o = t[l];
    o > i && (i = o, a = l);
  }
  return !a || i <= a1 ? null : a;
}
function r1(t, a = 3) {
  return Vt.map((i) => ({ key: i, label: pl[i], value: t[i] })).filter((i) => i.value > a1).sort((i, l) => l.value - i.value).slice(0, a);
}
function v2(t) {
  let a = 0;
  for (const i of Vt) a += t[i] * t[i];
  return Math.sqrt(a);
}
function R0(t) {
  const a = r1(t, 2), i = a[0];
  if (!i) return "";
  const l = a[1];
  return !l || i.value - l.value > 0.25 ? mf(i.label) : `${mf(i.label)} + ${l.label.toLowerCase()}`;
}
function mf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Zr(t) {
  const a = { ...Ki };
  for (const i of Vt) {
    const l = t[i];
    a[i] = Number.isFinite(l) ? Math.max(0, Math.min(1, l)) : 0;
  }
  return a;
}
const M0 = 0.05, _0 = 0.2, g2 = 22, y2 = 320, pf = 0.78;
function vf(t, a, i, l) {
  const o = Math.cos(i), d = Math.sin(i), h = t * o + a * d;
  return Math.max(0, Math.min(1, h / l));
}
function b2(t) {
  const { vec: a, onChange: i, size: l, reduceMotion: o = !1 } = t, [d, h] = y.useState(a), [m, g] = y.useState(null), [p, b] = y.useState(null), v = y.useRef(null), w = y.useRef(a), S = y.useRef(o), j = y.useRef(null), N = y.useRef(0);
  S.current = o, y.useEffect(() => {
    h(a), w.current = a;
  }, [a]);
  const C = y.useCallback(
    (Y) => {
      const $ = Zr(Y);
      h($), w.current = $, i($);
    },
    [i]
  ), R = y.useCallback((Y) => {
    const $ = Zr(Y);
    h($), w.current = $;
  }, []), D = y.useCallback(
    (Y) => {
      const $ = v.current;
      if (!$ || S.current) return;
      const se = Y.clientX - $.centerX, ae = Y.clientY - $.centerY, ee = l / 2 * pf, ue = vf(se, ae, $.angle, ee), W = { ...w.current, [$.axis]: ue };
      R(W);
    },
    [l, R]
  ), O = y.useCallback(
    (Y) => {
      const $ = v.current;
      if ($) {
        if (window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", O), S.current) {
          const se = Y.clientX - $.centerX, ae = Y.clientY - $.centerY, ee = l / 2 * pf, ue = vf(se, ae, $.angle, ee), W = { ...w.current, [$.axis]: ue };
          v.current = null, C(W);
          return;
        }
        v.current = null, C(w.current);
      }
    },
    [C, D, l]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", O), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [D, O]);
  const T = y.useCallback((Y, $) => {
    S.current || (N.current += 1, b({ x: Y, y: $, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, y2));
  }, []), V = y.useCallback(
    (Y, $, se, ae, ee) => {
      const ue = se.getBoundingClientRect(), W = ue.left + ue.width / 2, z = ue.top + ue.height / 2, H = Vt.indexOf(Y) / Vt.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: Y,
        pointerId: $,
        centerX: W,
        centerY: z,
        angle: H
      }, g(Y), ae !== void 0 && ee !== void 0) {
        const q = ae - W, ie = ee - z, M = l / 2 * pf, J = vf(q, ie, H, M), Q = { ...w.current, [Y]: J };
        S.current ? C(Q) : R(Q);
      }
      window.addEventListener("pointermove", D), window.addEventListener("pointerup", O), window.addEventListener("pointercancel", O);
    },
    [C, D, O, l, R]
  ), K = y.useCallback(
    (Y, $) => {
      $.preventDefault();
      const se = $.currentTarget, ae = se.ownerSVGElement ?? se;
      V(Y, $.pointerId, ae);
    },
    [V]
  ), ne = y.useCallback(
    (Y) => {
      const $ = Y.currentTarget, se = $ instanceof SVGSVGElement ? $ : $.ownerSVGElement ?? $, ae = se.getBoundingClientRect(), ee = ae.left + ae.width / 2, ue = ae.top + ae.height / 2, W = Y.clientX - ee, z = Y.clientY - ue;
      if (Math.sqrt(W * W + z * z) < 8) return;
      let H = Math.atan2(z, W) * 180 / Math.PI;
      H = ((H + 90) % 360 + 360) % 360;
      let q = null, ie = 999;
      for (let Q = 0; Q < Vt.length; Q++) {
        const F = Vt[Q];
        if (!F) continue;
        const le = Q / Vt.length * 360, de = Math.abs((le - H + 540) % 360 - 180);
        de < ie && (ie = de, q = F);
      }
      if (!q || ie > g2) return;
      Y.preventDefault();
      const M = (Y.clientX - ae.left) / ae.width * l, J = (Y.clientY - ae.top) / ae.height * l;
      T(M, J), V(q, Y.pointerId, se, Y.clientX, Y.clientY);
    },
    [V, l, T]
  ), _ = y.useCallback(
    (Y, $) => {
      const se = w.current[Y];
      let ae = se;
      switch ($.key) {
        case "ArrowUp":
        case "ArrowRight":
          ae = se + M0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          ae = se - M0;
          break;
        case "PageUp":
          ae = se + _0;
          break;
        case "PageDown":
          ae = se - _0;
          break;
        case "Home":
          ae = 0;
          break;
        case "End":
          ae = 1;
          break;
        default:
          return;
      }
      $.preventDefault(), g(Y), C({ ...w.current, [Y]: ae });
    },
    [C]
  );
  return {
    liveVec: d,
    activeAxis: m,
    setActiveAxis: g,
    onPointerDown: K,
    onKeyDown: _,
    onSurfacePointerDown: ne,
    surfacePing: p
  };
}
const x2 = [0.25, 0.5, 0.75, 1];
function S2({
  vec: t,
  onChange: a,
  size: i = 360,
  readOnly: l = !1,
  reduceMotion: o = !1
}) {
  const d = b2({ vec: t, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, g = i / 2 * 0.78, p = y.useMemo(() => w2(h, m, g), [h, m, g]), b = y.useMemo(() => Vt.map((v, w) => {
    const S = cc(d.liveVec[v]), j = p[w];
    return j ? `${h + j.dx * S},${m + j.dy * S}` : "0,0";
  }).join(" "), [p, h, m, d.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: ZA, children: /* @__PURE__ */ c.jsx("div", { className: JA, style: { width: i, height: i }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: WA,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: l ? void 0 : d.onSurfacePointerDown,
      style: l ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        x2.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: e2,
            cx: h,
            cy: m,
            r: g * v
          },
          v
        )),
        Vt.map((v, w) => {
          const S = p[w];
          if (!S) return null;
          const j = h + S.dx * 1.18, N = m + S.dy * 1.18, C = d.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: t2,
                x1: h,
                y1: m,
                x2: h + S.dx,
                y2: m + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${c2}${C ? ` ${u2}` : ""}`,
                x: j,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: pl[v]
              }
            )
          ] }, v);
        }),
        Vt.map((v, w) => {
          const S = cc(d.liveVec[v]);
          if (S <= 0.01) return null;
          const j = p[w];
          if (!j) return null;
          const N = d.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${a2}${N ? ` ${r2}` : ""}`,
              x1: h,
              y1: m,
              x2: h + j.dx * S,
              y2: m + j.dy * S
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: n2, points: b }),
        d.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: o2,
            cx: d.surfacePing.x,
            cy: d.surfacePing.y,
            r: 10
          },
          d.surfacePing.key
        ),
        !l && Vt.map((v, w) => {
          const S = cc(d.liveVec[v]), j = p[w];
          if (!j) return null;
          const N = h + j.dx * S, C = m + j.dy * S, R = d.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: i2,
                cx: N,
                cy: C,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${pl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: (D) => d.onPointerDown(v, D),
                onKeyDown: (D) => d.onKeyDown(v, D),
                onFocus: () => d.setActiveAxis(v),
                onBlur: () => d.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${s2}${R ? ` ${l2}` : ""}`,
                cx: N,
                cy: C,
                r: 6
              }
            )
          ] }, v);
        })
      ]
    }
  ) }) });
}
function w2(t, a, i) {
  return Vt.map((l, o) => {
    const d = o / Vt.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(d) * i,
      dy: Math.sin(d) * i
    };
  });
}
function cc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function j2({ vec: t, size: a = 36 }) {
  const i = a / 2, l = a / 2, o = a / 2 * 0.86, d = y.useMemo(() => Vt.map((h, m) => {
    const g = cc(t[h]), p = m / Vt.length * Math.PI * 2 - Math.PI / 2, b = i + Math.cos(p) * o * g, v = l + Math.sin(p) * o * g;
    return `${b},${v}`;
  }).join(" "), [i, l, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: d2, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: f2,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: h2, cx: i, cy: l, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: m2, points: d })
      ]
    }
  ) });
}
var E2 = "_1jqr3aj0", N2 = "_1jqr3aj1", T2 = "_1jqr3aj2", C2 = "_1jqr3aj3", R2 = "_1jqr3aj4", M2 = "_1jqr3aj5", _2 = "_1jqr3aj6", A2 = "_1jqr3aj7";
const A0 = 0.05, D0 = 0.2;
function D2({
  vec: t,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: l = !1
}) {
  const [o, d] = y.useState(null), h = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), g = y.useCallback(
    (j, N) => {
      const C = Math.max(0, Math.min(1, N));
      a(Zr({ ...t, [j]: C }));
    },
    [a, t]
  ), p = y.useCallback((j, N) => {
    const C = m.current.get(j);
    return !C || C.width <= 0 ? 0 : (N - C.left) / C.width;
  }, []), b = y.useCallback(
    (j, N) => {
      if (i) return;
      N.preventDefault();
      const C = N.currentTarget.querySelector("[data-track]");
      C instanceof HTMLElement && m.current.set(j, C.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), h.current = j, d(j), g(j, p(j, N.clientX));
    },
    [i, g, p]
  ), v = y.useCallback(
    (j, N) => {
      i || l || h.current === j && g(j, p(j, N.clientX));
    },
    [i, l, g, p]
  ), w = y.useCallback(
    (j, N) => {
      if (h.current === j) {
        try {
          N.currentTarget.releasePointerCapture(N.pointerId);
        } catch {
        }
        h.current = null, m.current.delete(j);
      }
    },
    []
  ), S = y.useCallback(
    (j, N) => {
      if (i) return;
      const C = t[j] ?? 0;
      let R = C;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          R = C + A0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          R = C - A0;
          break;
        case "PageUp":
          R = C + D0;
          break;
        case "PageDown":
          R = C - D0;
          break;
        case "Home":
          R = 0;
          break;
        case "End":
          R = 1;
          break;
        default:
          return;
      }
      N.preventDefault(), d(j), g(j, R);
    },
    [i, g, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: E2, role: "group", "aria-label": "Emotion axis sliders", children: Vt.map((j) => {
    const N = z2(t[j] ?? 0), C = N > 0.05, R = o === j, D = pl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${N2}${C ? ` ${T2}` : ""}${R ? ` ${C2}` : ""}`,
        role: "slider",
        "aria-label": `${D} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (O) => b(j, O),
        onPointerMove: (O) => v(j, O),
        onPointerUp: (O) => w(j, O),
        onPointerCancel: (O) => w(j, O),
        onKeyDown: (O) => S(j, O),
        onFocus: () => d(j),
        onBlur: () => d(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: R2, children: D }),
          /* @__PURE__ */ c.jsx("span", { className: M2, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: _2,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: A2, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function z2(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var z0 = "gvwvwg0", k2 = "gvwvwg2", O2 = "gvwvwg3", L2 = "gvwvwg8", U2 = "gvwvwg9", B2 = "gvwvwga", $2 = "gvwvwgb", V2 = "gvwvwgc", H2 = "gvwvwgd", q2 = "gvwvwge";
function I2({
  presets: t,
  activePresetId: a,
  onSelect: i,
  onDelete: l
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: z0, children: [
    /* @__PURE__ */ c.jsx("span", { className: k2, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: O2, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: z0, children: [
    /* @__PURE__ */ c.jsx("span", { className: q2, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: L2, children: t.map((o) => {
      const d = F2(o), h = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${U2}${h ? ` ${$2}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: B2,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ c.jsx(j2, { vec: d, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: V2, children: o.presetName })
                ]
              }
            ),
            l && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: H2,
                onClick: () => {
                  window.confirm(`Delete preset "${o.presetName}"? This cannot be undone.`) && l(o.presetId);
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
const Kf = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function F2(t) {
  const a = Kf.reduce(
    (l, o) => ({ ...l, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const i = Kf.reduce(
    (l, o, d) => ({ ...l, [o]: t.vector[d] ?? 0 }),
    a
  );
  return Zr(i);
}
function gf(t) {
  return Kf.map((a) => t[a] ?? 0);
}
const Y2 = [
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
], G2 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], X2 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], P2 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function K2(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Ki };
  const l = a.split(/\s+/).some((h) => G2.includes(h)) ? 1.2 : 1, o = X2.some((h) => a.includes(h)) ? 0.55 : 1, d = { ...Ki };
  for (const h of Y2) {
    let m = 0;
    for (const g of h.keywords) {
      const p = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const w = v.index, S = a.slice(0, w), j = Math.max(
        S.lastIndexOf(","),
        S.lastIndexOf(";"),
        S.lastIndexOf(" but "),
        S.lastIndexOf(" yet ")
      ), C = S.slice(j >= 0 ? j : 0).slice(-30);
      P2.some((R) => new RegExp(`\\b${R}\\b`).test(C)) || (m += 1);
    }
    if (m > 0) {
      const g = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * l * o;
      d[h.axis] = Math.min(1, g);
    }
  }
  return Vt.every((h) => d[h] === 0) && (d.calm = 0.4), Zr(d);
}
const Q2 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function Z2({
  value: t,
  onChange: a,
  deploymentId: i
}) {
  const l = t.mode ?? "none", o = y.useMemo(() => J2(t.vector), [t.vector]), d = t.emotionAlpha ?? 1, [h, m] = y.useState([]), [g, p] = y.useState(null), [b, v] = y.useState(!1), [w, S] = y.useState(null), [j, N] = y.useState(""), [C, R] = y.useState(!1), D = y.useRef(!0);
  y.useEffect(() => (D.current = !0, () => {
    D.current = !1;
  }), []), y.useEffect(() => {
    let L = !1;
    return Yx(i).then((H) => {
      L || m(k0(H.presets));
    }).catch((H) => {
      L || p(yf(H));
    }), () => {
      L = !0;
    };
  }, [i]), y.useEffect(() => {
    C || N(R0(o));
  }, [o, C]);
  const O = (L) => {
    a({ ...t, mode: L });
  }, T = (L) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: gf(L)
    }), w && S(null);
  }, V = () => {
    T(Zr(Ki));
  }, K = (L) => {
    const H = Math.max(0, Math.min(10, Number.isFinite(L) ? L : 1));
    a({ ...t, emotionAlpha: H });
  }, ne = async () => {
    const L = j.trim();
    if (L) {
      v(!0), p(null);
      try {
        const H = await SM(i, L, gf(o));
        if (!D.current) return;
        m(
          (q) => k0([H, ...q.filter((ie) => ie.presetId !== H.presetId)])
        ), S(H.presetId), R(!1);
      } catch (H) {
        D.current && p(yf(H));
      } finally {
        D.current && v(!1);
      }
    }
  }, _ = async (L) => {
    const H = h;
    m((q) => q.filter((ie) => ie.presetId !== L)), w === L && S(null);
    try {
      await wM(i, L);
    } catch (q) {
      D.current && (m(H), p(yf(q)));
    }
  }, Y = (L) => {
    S(L.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: L.vector
    });
  }, $ = (L) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: L });
  }, se = p2(o), ae = v2(o), ee = r1(o, 3), ue = ee.length > 0 && j.trim().length > 0 && !b, W = R0(o) || "name your preset…", z = l !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: wA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: jA, children: [
      /* @__PURE__ */ c.jsx("span", { className: x0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: EA, role: "radiogroup", "aria-label": "Emotion mode", children: Q2.map((L) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": l === L.id,
          className: `${NA}${l === L.id ? ` ${TA}` : ""}`,
          onClick: () => O(L.id),
          children: L.label
        },
        L.id
      )) })
    ] }),
    l === "none" && /* @__PURE__ */ c.jsxs("div", { className: T0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ c.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    l === "audio_ref" && /* @__PURE__ */ c.jsx("div", { className: T0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    l === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: LA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: UA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (L) => $(L.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: BA, children: [
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "secondary",
            onClick: () => {
              const L = (t.qwenTemplate ?? "").trim();
              if (!L) return;
              const H = K2(L);
              a({
                ...t,
                mode: "emotion_vector",
                vector: gf(H)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: N0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: N0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (l === "emotion_vector" || l === "none" || l === "audio_ref") && /* @__PURE__ */ c.jsxs("div", { className: kA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${Jy} ${CA}`, children: /* @__PURE__ */ c.jsx(
        S2,
        {
          vec: o,
          onChange: T,
          readOnly: z
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${Jy} ${RA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: MA, children: [
          /* @__PURE__ */ c.jsx("span", { className: x0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: _A, children: se ? pl[se].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: AA, children: [
            "‖v‖ = ",
            ae.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(D2, { vec: o, onChange: T, readOnly: z }),
        /* @__PURE__ */ c.jsx("div", { className: DA, children: /* @__PURE__ */ c.jsxs(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: V,
            disabled: z || ae < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: zA,
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
    l === "emotion_vector" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: S0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: w0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: OA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: d,
            className: j0,
            style: { "--fill": `${d * 10}%` },
            onChange: (L) => K(Number(L.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: E0, children: [
          (d * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${VA}${ee.length === 0 ? ` ${HA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: qA, children: [
              /* @__PURE__ */ c.jsx("span", { className: IA, children: "Save current as preset" }),
              ee.length === 0 && /* @__PURE__ */ c.jsx("span", { className: FA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: YA, children: [
              /* @__PURE__ */ c.jsx("div", { className: GA, children: ee.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${C0} ${PA}`, children: "no axes set" }) : ee.map((L) => /* @__PURE__ */ c.jsxs("span", { className: C0, children: [
                L.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: XA, children: L.value.toFixed(2) })
              ] }, L.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: KA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: QA,
                    placeholder: W,
                    value: j,
                    disabled: ee.length === 0 || b,
                    onChange: (L) => {
                      N(L.target.value), R(!0);
                    },
                    onKeyDown: (L) => {
                      L.key === "Enter" && ue && ne();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  $e,
                  {
                    variant: "primary",
                    disabled: !ue,
                    onClick: ne,
                    children: b ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ c.jsx(
        I2,
        {
          presets: h,
          activePresetId: w,
          onSelect: Y,
          onDelete: _
        }
      )
    ] }),
    l === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: S0, children: [
      /* @__PURE__ */ c.jsx("span", { className: w0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: d,
          className: j0,
          style: { "--fill": `${d * 10}%` },
          onChange: (L) => K(Number(L.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: E0, children: [
        (d * 100).toFixed(0),
        "%"
      ] })
    ] }),
    g && /* @__PURE__ */ c.jsx("div", { className: $A, children: g })
  ] });
}
function J2(t) {
  if (!t || !Array.isArray(t)) return Zr(Ki);
  const a = { ...Ki };
  return Vt.forEach((i, l) => {
    const o = t[l];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function k0(t) {
  return [...t].sort((a, i) => i.updatedAt - a.updatedAt);
}
function yf(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "Unknown error";
}
var W2 = "_5u1uau0", Js = "_5u1uau1", e3 = "_5u1uau2", Bi = "_5u1uau3", Ws = "_5u1uau4", t3 = "_5u1uau5", bf = "_5u1uau6", n3 = "_5u1uau7", a3 = "_5u1uau8", r3 = "_5u1uau9", i3 = "_5u1uaua", s3 = "_5u1uaub", l3 = "_5u1uauc", o3 = "_5u1uaud", c3 = "_5u1uaue", O0 = "_5u1uauf", L0 = "_5u1uaug", u3 = "_5u1uauh";
const xf = [
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
], d3 = ["mp3", "wav", "flac"], Xo = 0.5, Sf = 2, f3 = 0.05, h3 = 0.8, m3 = 0.8, U0 = 42;
function Po(t, a, i) {
  const l = t[a];
  if (typeof l == "number" && Number.isFinite(l)) return l;
  if (typeof l == "string") {
    const o = Number(l);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function p3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: l,
  cachePolicy: o,
  onCachePolicyChange: d,
  generation: h,
  onGenerationChange: m
}) {
  const g = y.useId(), p = y.useId(), b = y.useId(), v = y.useId(), w = y.useId(), S = (V, K) => {
    m({ ...h, [V]: K });
  }, j = h.seed === void 0 || h.seed === null ? "random" : "fixed", N = (V) => {
    if (V !== j)
      if (V === "random") {
        const K = { ...h };
        delete K.seed, m(K);
      } else {
        const K = Po(h, "seed", U0);
        m({ ...h, seed: K });
      }
  }, C = xf.find((V) => V.id === o) ?? xf[0], R = (i - Xo) / (Sf - Xo) * 100, D = Po(h, "temperature", h3), O = Po(h, "top_p", m3), T = Po(h, "seed", U0);
  return /* @__PURE__ */ c.jsxs("div", { className: W2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: g, className: Bi, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: Ws, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: g,
          className: t3,
          value: t,
          onChange: (V) => a(V.currentTarget.value),
          children: d3.map((V) => /* @__PURE__ */ c.jsx("option", { value: V, children: V }, V))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Bi, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${Ws} ${n3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: a3,
            min: Xo,
            max: Sf,
            step: f3,
            value: i,
            style: { "--range-pct": `${R}%` },
            onChange: (V) => l(Number(V.currentTarget.value)),
            "aria-valuemin": Xo,
            "aria-valuemax": Sf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: r3, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: e3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Bi, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: i3, children: xf.map((V) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === V.id,
          className: s3,
          onClick: () => d(V.id),
          title: V.help,
          children: V.label
        },
        V.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: l3, "aria-live": "polite", children: C.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: o3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Bi, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: Ws, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: bf,
          min: 0,
          max: 2,
          step: 0.05,
          value: D,
          onChange: (V) => S("temperature", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Bi, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: Ws, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: bf,
          min: 0,
          max: 1,
          step: 0.05,
          value: O,
          onChange: (V) => S("top_p", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bi, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${Ws} ${c3}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${O0} ${j === "fixed" ? L0 : ""}`,
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
                className: `${O0} ${j === "random" ? L0 : ""}`,
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
                className: bf,
                step: 1,
                value: T,
                onChange: (V) => S("seed", Math.trunc(Number(V.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: u3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var v3 = "iv43qk0", B0 = "iv43qk1", g3 = "iv43qk2", $0 = "iv43qk3", y3 = "iv43qk4", b3 = "iv43qk5", x3 = "iv43qk6", S3 = "iv43qk7", w3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, j3 = "iv43qkd", E3 = "iv43qke", wf = "iv43qkf", jf = "iv43qkg";
function N3({
  lines: t,
  characterColors: a,
  onLineClick: i
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: j3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const l = t.length, o = t.filter((h) => h.character !== null).length, d = l - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: E3, children: [
      /* @__PURE__ */ c.jsxs("span", { className: wf, children: [
        /* @__PURE__ */ c.jsx("span", { className: jf, children: l }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: wf, children: [
        /* @__PURE__ */ c.jsx("span", { className: jf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: wf, children: [
        /* @__PURE__ */ c.jsx("span", { className: jf, children: d }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: v3, children: t.map((h) => /* @__PURE__ */ c.jsx(
      T3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function T3({ line: t, color: a, onClick: i }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${B0} ${g3}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: $0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: x3, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: B0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: $0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: y3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: b3, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${S3} ${w3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var C3 = "_46z95i0", R3 = "_46z95i1", M3 = "_46z95i2", _3 = "_46z95i3", A3 = "_46z95i4", D3 = "_46z95i5", z3 = "_46z95i6";
const k3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function O3({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: C3, children: [
    /* @__PURE__ */ c.jsx(
      Ef,
      {
        label: "Intensity",
        sub: "How emotionally amplified each line reads",
        min: 0,
        max: 1,
        step: 0.01,
        format: (i) => `${Math.round(i * 100)}%`,
        value: t.intensity,
        onChange: (i) => a({ ...t, intensity: i })
      }
    ),
    /* @__PURE__ */ c.jsx(
      Ef,
      {
        label: "Pace",
        sub: "Time-stretched playback per line",
        min: 0.5,
        max: 2,
        step: 0.01,
        format: (i) => `${i.toFixed(2)}×`,
        value: t.pace,
        onChange: (i) => a({ ...t, pace: i })
      }
    ),
    /* @__PURE__ */ c.jsx(
      Ef,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: -12,
        max: 12,
        step: 0.5,
        format: (i) => `${i >= 0 ? "+" : ""}${i.toFixed(1)} st`,
        value: t.pitchSt,
        onChange: (i) => a({ ...t, pitchSt: i })
      }
    )
  ] });
}
function Ef({ label: t, sub: a, min: i, max: l, step: o, format: d, value: h, onChange: m }) {
  const g = (h - i) / (l - i) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: R3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: M3, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: _3, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: A3, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: i,
        max: l,
        step: o,
        value: h,
        className: D3,
        style: { "--fill": `${g}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: z3, children: d(h) })
  ] });
}
var L3 = "qe93dj0", U3 = "qe93dj1", B3 = "qe93dj2", $3 = "qe93dj3", V3 = "qe93dj4", H3 = "qe93dj5", q3 = "qe93dj6", I3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, F3 = "qe93dja", Y3 = "qe93djb";
function G3({ checks: t }) {
  const a = t.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: L3, children: [
    /* @__PURE__ */ c.jsxs("header", { className: U3, children: [
      /* @__PURE__ */ c.jsx("span", { className: B3, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: $3, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: V3, children: t.map((i) => /* @__PURE__ */ c.jsxs("li", { className: H3, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${q3} ${I3[i.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: F3, children: i.label }),
      i.detail && /* @__PURE__ */ c.jsx("span", { className: Y3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var V0 = "_17fbpt30", H0 = "_17fbpt31", q0 = "_17fbpt32", X3 = "_17fbpt33", P3 = "_17fbpt34", K3 = "_17fbpt35", I0 = "_17fbpt36", Q3 = "_17fbpt37", Z3 = "_17fbpt38";
const J3 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function W3({
  runs: t,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: l,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: V0, children: [
    /* @__PURE__ */ c.jsx("header", { className: H0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: q0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (d) => {
          d.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: Q3, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: Z3, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: V0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: H0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: q0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (d) => {
            d.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: X3, children: t.slice(0, 5).map((d) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: P3,
        onClick: l ? () => l(d.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: K3, children: d.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${Kx.sm} ${Qx[J3[d.status] ?? "neutral"]}`, children: d.status }),
          /* @__PURE__ */ c.jsx("span", { className: I0, children: eD(d.startedAt ?? d.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: I0, children: d.kind })
        ]
      }
    ) }, d.runId)) })
  ] });
}
function eD(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
const i1 = y.createContext({});
function qh(t) {
  const a = y.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const tD = typeof window < "u", s1 = tD ? y.useLayoutEffect : y.useEffect, Lc = /* @__PURE__ */ y.createContext(null);
function nD(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function aD(t, a) {
  const i = t.indexOf(a);
  i > -1 && t.splice(i, 1);
}
const xr = (t, a, i) => i > a ? a : i < t ? t : i;
function F0(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let jl = () => {
}, Qi = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (jl = (t, a, i) => {
  !t && typeof console < "u" && console.warn(F0(a, i));
}, Qi = (t, a, i) => {
  if (!t)
    throw new Error(F0(a, i));
});
const Sr = {}, l1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function rD(t) {
  return typeof t == "object" && t !== null;
}
const o1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function c1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const es = /* @__NO_SIDE_EFFECTS__ */ (t) => t, iD = (t, a) => (i) => a(t(i)), Uc = (...t) => t.reduce(iD), u1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, i) => {
  const l = a - t;
  return l === 0 ? 1 : (i - t) / l;
};
class d1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return nD(this.subscriptions, a), () => aD(this.subscriptions, a);
  }
  notify(a, i, l) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, l);
      else
        for (let d = 0; d < o; d++) {
          const h = this.subscriptions[d];
          h && h(a, i, l);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Xn = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, aa = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function f1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const h1 = (t, a, i) => (((1 - 3 * i + 3 * a) * t + (3 * i - 6 * a)) * t + 3 * a) * t, sD = 1e-7, lD = 12;
function oD(t, a, i, l, o) {
  let d, h, m = 0;
  do
    h = a + (i - a) / 2, d = h1(h, l, o) - t, d > 0 ? i = h : a = h;
  while (Math.abs(d) > sD && ++m < lD);
  return h;
}
function El(t, a, i, l) {
  if (t === a && i === l)
    return es;
  const o = (d) => oD(d, 0, 1, t, i);
  return (d) => d === 0 || d === 1 ? d : h1(o(d), a, l);
}
const m1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, p1 = (t) => (a) => 1 - t(1 - a), v1 = /* @__PURE__ */ El(0.33, 1.53, 0.69, 0.99), Ih = /* @__PURE__ */ p1(v1), g1 = /* @__PURE__ */ m1(Ih), y1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Ih(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Fh = (t) => 1 - Math.sin(Math.acos(t)), cD = p1(Fh), b1 = m1(Fh), uD = /* @__PURE__ */ El(0.42, 0, 1, 1), dD = /* @__PURE__ */ El(0, 0, 0.58, 1), x1 = /* @__PURE__ */ El(0.42, 0, 0.58, 1), fD = (t) => Array.isArray(t) && typeof t[0] != "number", S1 = (t) => Array.isArray(t) && typeof t[0] == "number", Y0 = {
  linear: es,
  easeIn: uD,
  easeInOut: x1,
  easeOut: dD,
  circIn: Fh,
  circInOut: b1,
  circOut: cD,
  backIn: Ih,
  backInOut: g1,
  backOut: v1,
  anticipate: y1
}, hD = (t) => typeof t == "string", G0 = (t) => {
  if (S1(t)) {
    Qi(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, l, o] = t;
    return El(a, i, l, o);
  } else if (hD(t))
    return Qi(Y0[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), Y0[t];
  return t;
}, Ko = [
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
function mD(t, a) {
  let i = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = !1, d = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function g(b) {
    h.has(b) && (p.schedule(b), t()), b(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, v = !1, w = !1) => {
      const j = w && o ? i : l;
      return v && h.add(b), j.add(b), b;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (b) => {
      l.delete(b), h.delete(b);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (b) => {
      if (m = b, o) {
        d = !0;
        return;
      }
      o = !0;
      const v = i;
      i = l, l = v, i.forEach(g), i.clear(), o = !1, d && (d = !1, p.process(b));
    }
  };
  return p;
}
const pD = 40;
function w1(t, a) {
  let i = !1, l = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => i = !0, h = Ko.reduce((O, T) => (O[T] = mD(d), O), {}), { setup: m, read: g, resolveKeyframes: p, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = h, N = () => {
    const O = Sr.useManualTiming, T = O ? o.timestamp : performance.now();
    i = !1, O || (o.delta = l ? 1e3 / 60 : Math.max(Math.min(T - o.timestamp, pD), 1)), o.timestamp = T, o.isProcessing = !0, m.process(o), g.process(o), p.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, i && a && (l = !1, t(N));
  }, C = () => {
    i = !0, l = !0, o.isProcessing || t(N);
  };
  return { schedule: Ko.reduce((O, T) => {
    const V = h[T];
    return O[T] = (K, ne = !1, _ = !1) => (i || C(), V.schedule(K, ne, _)), O;
  }, {}), cancel: (O) => {
    for (let T = 0; T < Ko.length; T++)
      h[Ko[T]].cancel(O);
  }, state: o, steps: h };
}
const { schedule: Pn, cancel: Qf, state: yc } = /* @__PURE__ */ w1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : es, !0);
let uc;
function vD() {
  uc = void 0;
}
const Dn = {
  now: () => (uc === void 0 && Dn.set(yc.isProcessing || Sr.useManualTiming ? yc.timestamp : performance.now()), uc),
  set: (t) => {
    uc = t, queueMicrotask(vD);
  }
}, j1 = (t) => (a) => typeof a == "string" && a.startsWith(t), E1 = /* @__PURE__ */ j1("--"), gD = /* @__PURE__ */ j1("var(--"), Yh = (t) => gD(t) ? yD.test(t.split("/*")[0].trim()) : !1, yD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function X0(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ts = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, vl = {
  ...ts,
  transform: (t) => xr(0, 1, t)
}, Qo = {
  ...ts,
  default: 1
}, cl = (t) => Math.round(t * 1e5) / 1e5, Gh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function bD(t) {
  return t == null;
}
const xD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Xh = (t, a) => (i) => !!(typeof i == "string" && xD.test(i) && i.startsWith(t) || a && !bD(i) && Object.prototype.hasOwnProperty.call(i, a)), N1 = (t, a, i) => (l) => {
  if (typeof l != "string")
    return l;
  const [o, d, h, m] = l.match(Gh);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(d),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, SD = (t) => xr(0, 255, t), Nf = {
  ...ts,
  transform: (t) => Math.round(SD(t))
}, Yr = {
  test: /* @__PURE__ */ Xh("rgb", "red"),
  parse: /* @__PURE__ */ N1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: i, alpha: l = 1 }) => "rgba(" + Nf.transform(t) + ", " + Nf.transform(a) + ", " + Nf.transform(i) + ", " + cl(vl.transform(l)) + ")"
};
function wD(t) {
  let a = "", i = "", l = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), i = t.substring(3, 5), l = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), i = t.substring(2, 3), l = t.substring(3, 4), o = t.substring(4, 5), a += a, i += i, l += l, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(l, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Zf = {
  test: /* @__PURE__ */ Xh("#"),
  parse: wD,
  transform: Yr.transform
}, Nl = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), pr = /* @__PURE__ */ Nl("deg"), Gi = /* @__PURE__ */ Nl("%"), je = /* @__PURE__ */ Nl("px"), jD = /* @__PURE__ */ Nl("vh"), ED = /* @__PURE__ */ Nl("vw"), P0 = {
  ...Gi,
  parse: (t) => Gi.parse(t) / 100,
  transform: (t) => Gi.transform(t * 100)
}, Fi = {
  test: /* @__PURE__ */ Xh("hsl", "hue"),
  parse: /* @__PURE__ */ N1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: i, alpha: l = 1 }) => "hsla(" + Math.round(t) + ", " + Gi.transform(cl(a)) + ", " + Gi.transform(cl(i)) + ", " + cl(vl.transform(l)) + ")"
}, $t = {
  test: (t) => Yr.test(t) || Zf.test(t) || Fi.test(t),
  parse: (t) => Yr.test(t) ? Yr.parse(t) : Fi.test(t) ? Fi.parse(t) : Zf.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Yr.transform(t) : Fi.transform(t),
  getAnimatableNone: (t) => {
    const a = $t.parse(t);
    return a.alpha = 0, $t.transform(a);
  }
}, ND = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function TD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Gh)?.length || 0) + (t.match(ND)?.length || 0) > 0;
}
const T1 = "number", C1 = "color", CD = "var", RD = "var(", K0 = "${}", MD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Zi(t) {
  const a = t.toString(), i = [], l = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let d = 0;
  const m = a.replace(MD, (g) => ($t.test(g) ? (l.color.push(d), o.push(C1), i.push($t.parse(g))) : g.startsWith(RD) ? (l.var.push(d), o.push(CD), i.push(g)) : (l.number.push(d), o.push(T1), i.push(parseFloat(g))), ++d, K0)).split(K0);
  return { values: i, split: m, indexes: l, types: o };
}
function _D(t) {
  return Zi(t).values;
}
function R1({ split: t, types: a }) {
  const i = t.length;
  return (l) => {
    let o = "";
    for (let d = 0; d < i; d++)
      if (o += t[d], l[d] !== void 0) {
        const h = a[d];
        h === T1 ? o += cl(l[d]) : h === C1 ? o += $t.transform(l[d]) : o += l[d];
      }
    return o;
  };
}
function AD(t) {
  return R1(Zi(t));
}
const DD = (t) => typeof t == "number" ? 0 : $t.test(t) ? $t.getAnimatableNone(t) : t, zD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : DD(t);
function kD(t) {
  const a = Zi(t);
  return R1(a)(a.values.map((l, o) => zD(l, a.split[o])));
}
const ra = {
  test: TD,
  parse: _D,
  createTransformer: AD,
  getAnimatableNone: kD
};
function Tf(t, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (a - t) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? t + (a - t) * (2 / 3 - i) * 6 : t;
}
function OD({ hue: t, saturation: a, lightness: i, alpha: l }) {
  t /= 360, a /= 100, i /= 100;
  let o = 0, d = 0, h = 0;
  if (!a)
    o = d = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, g = 2 * i - m;
    o = Tf(g, m, t + 1 / 3), d = Tf(g, m, t), h = Tf(g, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(d * 255),
    blue: Math.round(h * 255),
    alpha: l
  };
}
function bc(t, a) {
  return (i) => i > 0 ? a : t;
}
const Tl = (t, a, i) => t + (a - t) * i, Cf = (t, a, i) => {
  const l = t * t, o = i * (a * a - l) + l;
  return o < 0 ? 0 : Math.sqrt(o);
}, LD = [Zf, Yr, Fi], UD = (t) => LD.find((a) => a.test(t));
function Q0(t) {
  const a = UD(t);
  if (jl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(t);
  return a === Fi && (i = OD(i)), i;
}
const Z0 = (t, a) => {
  const i = Q0(t), l = Q0(a);
  if (!i || !l)
    return bc(t, a);
  const o = { ...i };
  return (d) => (o.red = Cf(i.red, l.red, d), o.green = Cf(i.green, l.green, d), o.blue = Cf(i.blue, l.blue, d), o.alpha = Tl(i.alpha, l.alpha, d), Yr.transform(o));
}, Jf = /* @__PURE__ */ new Set(["none", "hidden"]);
function BD(t, a) {
  return Jf.has(t) ? (i) => i <= 0 ? t : a : (i) => i >= 1 ? a : t;
}
function $D(t, a) {
  return (i) => Tl(t, a, i);
}
function Ph(t) {
  return typeof t == "number" ? $D : typeof t == "string" ? Yh(t) ? bc : $t.test(t) ? Z0 : qD : Array.isArray(t) ? M1 : typeof t == "object" ? $t.test(t) ? Z0 : VD : bc;
}
function M1(t, a) {
  const i = [...t], l = i.length, o = t.map((d, h) => Ph(d)(d, a[h]));
  return (d) => {
    for (let h = 0; h < l; h++)
      i[h] = o[h](d);
    return i;
  };
}
function VD(t, a) {
  const i = { ...t, ...a }, l = {};
  for (const o in i)
    t[o] !== void 0 && a[o] !== void 0 && (l[o] = Ph(t[o])(t[o], a[o]));
  return (o) => {
    for (const d in l)
      i[d] = l[d](o);
    return i;
  };
}
function HD(t, a) {
  const i = [], l = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const d = a.types[o], h = t.indexes[d][l[d]], m = t.values[h] ?? 0;
    i[o] = m, l[d]++;
  }
  return i;
}
const qD = (t, a) => {
  const i = ra.createTransformer(a), l = Zi(t), o = Zi(a);
  return l.indexes.var.length === o.indexes.var.length && l.indexes.color.length === o.indexes.color.length && l.indexes.number.length >= o.indexes.number.length ? Jf.has(t) && !o.values.length || Jf.has(a) && !l.values.length ? BD(t, a) : Uc(M1(HD(l, o), o.values), i) : (jl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), bc(t, a));
};
function _1(t, a, i) {
  return typeof t == "number" && typeof a == "number" && typeof i == "number" ? Tl(t, a, i) : Ph(t)(t, a);
}
const ID = (t) => {
  const a = ({ timestamp: i }) => t(i);
  return {
    start: (i = !0) => Pn.update(a, i),
    stop: () => Qf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => yc.isProcessing ? yc.timestamp : Dn.now()
  };
}, A1 = (t, a, i = 10) => {
  let l = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let d = 0; d < o; d++)
    l += Math.round(t(d / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, xc = 2e4;
function Kh(t) {
  let a = 0;
  const i = 50;
  let l = t.next(a);
  for (; !l.done && a < xc; )
    a += i, l = t.next(a);
  return a >= xc ? 1 / 0 : a;
}
function FD(t, a = 100, i) {
  const l = i({ ...t, keyframes: [0, a] }), o = Math.min(Kh(l), xc);
  return {
    type: "keyframes",
    ease: (d) => l.next(o * d).value / a,
    duration: /* @__PURE__ */ aa(o)
  };
}
const jt = {
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
function Wf(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const YD = 12;
function GD(t, a, i) {
  let l = i;
  for (let o = 1; o < YD; o++)
    l = l - t(l) / a(l);
  return l;
}
const Rf = 1e-3;
function XD({ duration: t = jt.duration, bounce: a = jt.bounce, velocity: i = jt.velocity, mass: l = jt.mass }) {
  let o, d;
  jl(t <= /* @__PURE__ */ Xn(jt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xr(jt.minDamping, jt.maxDamping, h), t = xr(jt.minDuration, jt.maxDuration, /* @__PURE__ */ aa(t)), h < 1 ? (o = (p) => {
    const b = p * h, v = b * t, w = b - i, S = Wf(p, h), j = Math.exp(-v);
    return Rf - w / S * j;
  }, d = (p) => {
    const v = p * h * t, w = v * i + i, S = Math.pow(h, 2) * Math.pow(p, 2) * t, j = Math.exp(-v), N = Wf(Math.pow(p, 2), h);
    return (-o(p) + Rf > 0 ? -1 : 1) * ((w - S) * j) / N;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - i) * t + 1;
    return -Rf + b * v;
  }, d = (p) => {
    const b = Math.exp(-p * t), v = (i - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, g = GD(o, d, m);
  if (t = /* @__PURE__ */ Xn(t), isNaN(g))
    return {
      stiffness: jt.stiffness,
      damping: jt.damping,
      duration: t
    };
  {
    const p = Math.pow(g, 2) * l;
    return {
      stiffness: p,
      damping: h * 2 * Math.sqrt(l * p),
      duration: t
    };
  }
}
const PD = ["duration", "bounce"], KD = ["stiffness", "damping", "mass"];
function J0(t, a) {
  return a.some((i) => t[i] !== void 0);
}
function QD(t) {
  let a = {
    velocity: jt.velocity,
    stiffness: jt.stiffness,
    damping: jt.damping,
    mass: jt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!J0(t, KD) && J0(t, PD))
    if (a.velocity = 0, t.visualDuration) {
      const i = t.visualDuration, l = 2 * Math.PI / (i * 1.2), o = l * l, d = 2 * xr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: jt.mass,
        stiffness: o,
        damping: d
      };
    } else {
      const i = XD({ ...t, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: jt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Sc(t = jt.visualDuration, a = jt.bounce) {
  const i = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: l, restDelta: o } = i;
  const d = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: d }, { stiffness: g, damping: p, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = QD({
    ...i,
    velocity: -/* @__PURE__ */ aa(i.velocity || 0)
  }), j = w || 0, N = p / (2 * Math.sqrt(g * b)), C = h - d, R = /* @__PURE__ */ aa(Math.sqrt(g / b)), D = Math.abs(C) < 5;
  l || (l = D ? jt.restSpeed.granular : jt.restSpeed.default), o || (o = D ? jt.restDelta.granular : jt.restDelta.default);
  let O, T, V, K, ne, _;
  if (N < 1)
    V = Wf(R, N), K = (j + N * R * C) / V, O = ($) => {
      const se = Math.exp(-N * R * $);
      return h - se * (K * Math.sin(V * $) + C * Math.cos(V * $));
    }, ne = N * R * K + C * V, _ = N * R * C - K * V, T = ($) => Math.exp(-N * R * $) * (ne * Math.sin(V * $) + _ * Math.cos(V * $));
  else if (N === 1) {
    O = (se) => h - Math.exp(-R * se) * (C + (j + R * C) * se);
    const $ = j + R * C;
    T = (se) => Math.exp(-R * se) * (R * $ * se - j);
  } else {
    const $ = R * Math.sqrt(N * N - 1);
    O = (ue) => {
      const W = Math.exp(-N * R * ue), z = Math.min($ * ue, 300);
      return h - W * ((j + N * R * C) * Math.sinh(z) + $ * C * Math.cosh(z)) / $;
    };
    const se = (j + N * R * C) / $, ae = N * R * se - C * $, ee = N * R * C - se * $;
    T = (ue) => {
      const W = Math.exp(-N * R * ue), z = Math.min($ * ue, 300);
      return W * (ae * Math.sinh(z) + ee * Math.cosh(z));
    };
  }
  const Y = {
    calculatedDuration: S && v || null,
    velocity: ($) => /* @__PURE__ */ Xn(T($)),
    next: ($) => {
      if (!S && N < 1) {
        const ae = Math.exp(-N * R * $), ee = Math.sin(V * $), ue = Math.cos(V * $), W = h - ae * (K * ee + C * ue), z = /* @__PURE__ */ Xn(ae * (ne * ee + _ * ue));
        return m.done = Math.abs(z) <= l && Math.abs(h - W) <= o, m.value = m.done ? h : W, m;
      }
      const se = O($);
      if (S)
        m.done = $ >= v;
      else {
        const ae = /* @__PURE__ */ Xn(T($));
        m.done = Math.abs(ae) <= l && Math.abs(h - se) <= o;
      }
      return m.value = m.done ? h : se, m;
    },
    toString: () => {
      const $ = Math.min(Kh(Y), xc), se = A1((ae) => Y.next($ * ae).value, $, 30);
      return $ + "ms " + se;
    },
    toTransition: () => {
    }
  };
  return Y;
}
Sc.applyToOptions = (t) => {
  const a = FD(t, 100, Sc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ Xn(a.duration), t.type = "keyframes", t;
};
const ZD = 5;
function D1(t, a, i) {
  const l = Math.max(a - ZD, 0);
  return f1(i - t(l), a - l);
}
function eh({ keyframes: t, velocity: a = 0, power: i = 0.8, timeConstant: l = 325, bounceDamping: o = 10, bounceStiffness: d = 500, modifyTarget: h, min: m, max: g, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (_) => m !== void 0 && _ < m || g !== void 0 && _ > g, j = (_) => m === void 0 ? g : g === void 0 || Math.abs(m - _) < Math.abs(g - _) ? m : g;
  let N = i * a;
  const C = v + N, R = h === void 0 ? C : h(C);
  R !== C && (N = R - v);
  const D = (_) => -N * Math.exp(-_ / l), O = (_) => R + D(_), T = (_) => {
    const Y = D(_), $ = O(_);
    w.done = Math.abs(Y) <= p, w.value = w.done ? R : $;
  };
  let V, K;
  const ne = (_) => {
    S(w.value) && (V = _, K = Sc({
      keyframes: [w.value, j(w.value)],
      velocity: D1(O, _, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: d,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ne(0), {
    calculatedDuration: null,
    next: (_) => {
      let Y = !1;
      return !K && V === void 0 && (Y = !0, T(_), ne(_)), V !== void 0 && _ >= V ? K.next(_ - V) : (!Y && T(_), w);
    }
  };
}
function JD(t, a, i) {
  const l = [], o = i || Sr.mix || _1, d = t.length - 1;
  for (let h = 0; h < d; h++) {
    let m = o(t[h], t[h + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[h] || es : a;
      m = Uc(g, m);
    }
    l.push(m);
  }
  return l;
}
function WD(t, a, { clamp: i = !0, ease: l, mixer: o } = {}) {
  const d = t.length;
  if (Qi(d === a.length, "Both input and output ranges must be the same length", "range-length"), d === 1)
    return () => a[0];
  if (d === 2 && a[0] === a[1])
    return () => a[1];
  const h = t[0] === t[1];
  t[0] > t[d - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = JD(a, l, o), g = m.length, p = (b) => {
    if (h && b < t[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ u1(t[v], t[v + 1], b);
    return m[v](w);
  };
  return i ? (b) => p(xr(t[0], t[d - 1], b)) : p;
}
function e5(t, a) {
  const i = t[t.length - 1];
  for (let l = 1; l <= a; l++) {
    const o = /* @__PURE__ */ u1(0, a, l);
    t.push(Tl(i, 1, o));
  }
}
function t5(t) {
  const a = [0];
  return e5(a, t.length - 1), a;
}
function n5(t, a) {
  return t.map((i) => i * a);
}
function a5(t, a) {
  return t.map(() => a || x1).splice(0, t.length - 1);
}
function ul({ duration: t = 300, keyframes: a, times: i, ease: l = "easeInOut" }) {
  const o = fD(l) ? l.map(G0) : G0(l), d = {
    done: !1,
    value: a[0]
  }, h = n5(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : t5(a),
    t
  ), m = WD(h, a, {
    ease: Array.isArray(o) ? o : a5(a, o)
  });
  return {
    calculatedDuration: t,
    next: (g) => (d.value = m(g), d.done = g >= t, d)
  };
}
const r5 = (t) => t !== null;
function Bc(t, { repeat: a, repeatType: i = "loop" }, l, o = 1) {
  const d = t.filter(r5), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : d.length - 1;
  return !m || l === void 0 ? d[m] : l;
}
const i5 = {
  decay: eh,
  inertia: eh,
  tween: ul,
  keyframes: ul,
  spring: Sc
};
function z1(t) {
  typeof t.type == "string" && (t.type = i5[t.type]);
}
class Qh {
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
  then(a, i) {
    return this.finished.then(a, i);
  }
}
const s5 = (t) => t / 100;
class wc extends Qh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== Dn.now() && this.tick(Dn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    z1(a);
    const { type: i = ul, repeat: l = 0, repeatDelay: o = 0, repeatType: d, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const g = i || ul;
    g !== ul && typeof m[0] != "number" && (this.mixKeyframes = Uc(s5, _1(m[0], m[1])), m = [0, 100]);
    const p = g({ ...a, keyframes: m });
    d === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Kh(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (l + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: l, totalDuration: o, mixKeyframes: d, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: g } = this;
    if (this.startTime === null)
      return l.next(0);
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: w, repeatDelay: S, type: j, onUpdate: N, finalKeyframe: C } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const R = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), D = this.playbackSpeed >= 0 ? R < 0 : R > o;
    this.currentTime = Math.max(R, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let O = this.currentTime, T = l;
    if (v) {
      const _ = Math.min(this.currentTime, o) / m;
      let Y = Math.floor(_), $ = _ % 1;
      !$ && _ >= 1 && ($ = 1), $ === 1 && Y--, Y = Math.min(Y, v + 1), !!(Y % 2) && (w === "reverse" ? ($ = 1 - $, S && ($ -= S / m)) : w === "mirror" && (T = h)), O = xr(0, 1, $) * m;
    }
    let V;
    D ? (this.delayState.value = b[0], V = this.delayState) : V = T.next(O), d && !D && (V.value = d(V.value));
    let { done: K } = V;
    !D && g !== null && (K = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ne = this.holdTime === null && (this.state === "finished" || this.state === "running" && K);
    return ne && j !== eh && (V.value = Bc(b, this.options, C, this.speed)), N && N(V.value), ne && this.finish(), V;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, i) {
    return this.finished.then(a, i);
  }
  get duration() {
    return /* @__PURE__ */ aa(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ aa(a);
  }
  get time() {
    return /* @__PURE__ */ aa(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Xn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const i = this.generator.next(a).value;
    return D1((l) => this.generator.next(l).value, a, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const i = this.playbackSpeed !== a;
    i && this.driver && this.updateTime(Dn.now()), this.playbackSpeed = a, i && this.driver && (this.time = /* @__PURE__ */ aa(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = ID, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const l = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = l) : this.holdTime !== null ? this.startTime = l - this.holdTime : this.startTime || (this.startTime = i ?? l), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Dn.now()), this.holdTime = this.currentTime;
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
function l5(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Gr = (t) => t * 180 / Math.PI, th = (t) => {
  const a = Gr(Math.atan2(t[1], t[0]));
  return nh(a);
}, o5 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: th,
  rotateZ: th,
  skewX: (t) => Gr(Math.atan(t[1])),
  skewY: (t) => Gr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, nh = (t) => (t = t % 360, t < 0 && (t += 360), t), W0 = th, eb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), tb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), c5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: eb,
  scaleY: tb,
  scale: (t) => (eb(t) + tb(t)) / 2,
  rotateX: (t) => nh(Gr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => nh(Gr(Math.atan2(-t[2], t[0]))),
  rotateZ: W0,
  rotate: W0,
  skewX: (t) => Gr(Math.atan(t[4])),
  skewY: (t) => Gr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function ah(t) {
  return t.includes("scale") ? 1 : 0;
}
function rh(t, a) {
  if (!t || t === "none")
    return ah(a);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, o;
  if (i)
    l = c5, o = i;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = o5, o = m;
  }
  if (!o)
    return ah(a);
  const d = l[a], h = o[1].split(",").map(d5);
  return typeof d == "function" ? d(h) : h[d];
}
const u5 = (t, a) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return rh(i, a);
};
function d5(t) {
  return parseFloat(t.trim());
}
const ns = [
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
], as = new Set(ns), nb = (t) => t === ts || t === je, f5 = /* @__PURE__ */ new Set(["x", "y", "z"]), h5 = ns.filter((t) => !f5.has(t));
function m5(t) {
  const a = [];
  return h5.forEach((i) => {
    const l = t.getValue(i);
    l !== void 0 && (a.push([i, l.get()]), l.set(i.startsWith("scale") ? 1 : 0));
  }), a;
}
const br = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: a = "0", paddingRight: i = "0", boxSizing: l }) => {
    const o = t.max - t.min;
    return l === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  height: ({ y: t }, { paddingTop: a = "0", paddingBottom: i = "0", boxSizing: l }) => {
    const o = t.max - t.min;
    return l === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  top: (t, { top: a }) => parseFloat(a),
  left: (t, { left: a }) => parseFloat(a),
  bottom: ({ y: t }, { top: a }) => parseFloat(a) + (t.max - t.min),
  right: ({ x: t }, { left: a }) => parseFloat(a) + (t.max - t.min),
  // Transform
  x: (t, { transform: a }) => rh(a, "x"),
  y: (t, { transform: a }) => rh(a, "y")
};
br.translateX = br.x;
br.translateY = br.y;
const Pr = /* @__PURE__ */ new Set();
let ih = !1, sh = !1, lh = !1;
function k1() {
  if (sh) {
    const t = Array.from(Pr).filter((l) => l.needsMeasurement), a = new Set(t.map((l) => l.element)), i = /* @__PURE__ */ new Map();
    a.forEach((l) => {
      const o = m5(l);
      o.length && (i.set(l, o), l.render());
    }), t.forEach((l) => l.measureInitialState()), a.forEach((l) => {
      l.render();
      const o = i.get(l);
      o && o.forEach(([d, h]) => {
        l.getValue(d)?.set(h);
      });
    }), t.forEach((l) => l.measureEndState()), t.forEach((l) => {
      l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY);
    });
  }
  sh = !1, ih = !1, Pr.forEach((t) => t.complete(lh)), Pr.clear();
}
function O1() {
  Pr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (sh = !0);
  });
}
function p5() {
  lh = !0, O1(), k1(), lh = !1;
}
class Zh {
  constructor(a, i, l, o, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = l, this.motionValue = o, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Pr.add(this), ih || (ih = !0, Pn.read(O1), Pn.resolveKeyframes(k1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: l, motionValue: o } = this;
    if (a[0] === null) {
      const d = o?.get(), h = a[a.length - 1];
      if (d !== void 0)
        a[0] = d;
      else if (l && i) {
        const m = l.readValue(i, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && d === void 0 && o.set(a[0]);
    }
    l5(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Pr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Pr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const v5 = (t) => t.startsWith("--");
function L1(t, a, i) {
  v5(a) ? t.style.setProperty(a, i) : t.style[a] = i;
}
const g5 = {};
function U1(t, a) {
  const i = /* @__PURE__ */ c1(t);
  return () => g5[a] ?? i();
}
const y5 = /* @__PURE__ */ U1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), B1 = /* @__PURE__ */ U1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), sl = ([t, a, i, l]) => `cubic-bezier(${t}, ${a}, ${i}, ${l})`, ab = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ sl([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ sl([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ sl([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ sl([0.33, 1.53, 0.69, 0.99])
};
function $1(t, a) {
  if (t)
    return typeof t == "function" ? B1() ? A1(t, a) : "ease-out" : S1(t) ? sl(t) : Array.isArray(t) ? t.map((i) => $1(i, a) || ab.easeOut) : ab[t];
}
function b5(t, a, i, { delay: l = 0, duration: o = 300, repeat: d = 0, repeatType: h = "loop", ease: m = "easeOut", times: g } = {}, p = void 0) {
  const b = {
    [a]: i
  };
  g && (b.offset = g);
  const v = $1(m, o);
  Array.isArray(v) && (b.easing = v);
  const w = {
    delay: l,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: d + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (w.pseudoElement = p), t.animate(b, w);
}
function V1(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function x5({ type: t, ...a }) {
  return V1(t) && B1() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class H1 extends Qh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: l, keyframes: o, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: m, onComplete: g } = a;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = a, Qi(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = x5(a);
    this.animation = b5(i, l, o, p, d), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const b = Bc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), L1(i, l, b), this.animation.cancel();
      }
      g?.(), this.notifyFinished();
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
    return /* @__PURE__ */ aa(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ aa(a);
  }
  get time() {
    return /* @__PURE__ */ aa(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Xn(a), i && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: i, rangeEnd: l, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && y5() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), l && (this.animation.rangeEnd = l), es) : o(this);
  }
}
const q1 = {
  anticipate: y1,
  backInOut: g1,
  circInOut: b1
};
function S5(t) {
  return t in q1;
}
function w5(t) {
  typeof t.ease == "string" && S5(t.ease) && (t.ease = q1[t.ease]);
}
const Mf = 10;
class j5 extends H1 {
  constructor(a) {
    w5(a), z1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: l, onComplete: o, element: d, ...h } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const m = new wc({
      ...h,
      autoplay: !1
    }), g = Math.max(Mf, Dn.now() - this.startTime), p = xr(0, Mf, g - Mf), b = m.sample(g).value, { name: v } = this.options;
    d && v && L1(d, v, b), i.setWithVelocity(m.sample(Math.max(0, g - p)).value, b, p), m.stop();
  }
}
const rb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ra.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function E5(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let i = 0; i < t.length; i++)
    if (t[i] !== a)
      return !0;
}
function N5(t, a, i, l) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const d = t[t.length - 1], h = rb(o, a), m = rb(d, a);
  return jl(h === m, `You are trying to animate ${a} from "${o}" to "${d}". "${h ? d : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : E5(t) || (i === "spring" || V1(i)) && l;
}
function oh(t) {
  t.duration = 0, t.type = "keyframes";
}
const I1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), T5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function C5(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && T5.test(t[a]))
      return !0;
  return !1;
}
const R5 = /* @__PURE__ */ new Set([
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
]), M5 = /* @__PURE__ */ c1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function _5(t) {
  const { motionValue: a, name: i, repeatDelay: l, repeatType: o, damping: d, type: h, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return M5() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (I1.has(i) || R5.has(i) && C5(m)) && (i !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !l && o !== "mirror" && d !== 0 && h !== "inertia";
}
const A5 = 40;
class D5 extends Qh {
  constructor({ autoplay: a = !0, delay: i = 0, type: l = "keyframes", repeat: o = 0, repeatDelay: d = 0, repeatType: h = "loop", keyframes: m, name: g, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Dn.now();
    const w = {
      autoplay: a,
      delay: i,
      type: l,
      repeat: o,
      repeatDelay: d,
      repeatType: h,
      name: g,
      motionValue: p,
      element: b,
      ...v
    }, S = b?.KeyframeResolver || Zh;
    this.keyframeResolver = new S(m, (j, N, C) => this.onKeyframesResolved(j, N, w, !C), g, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, l, o) {
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: m, delay: g, isHandoff: p, onUpdate: b } = l;
    this.resolvedAt = Dn.now();
    let v = !0;
    N5(a, d, h, m) || (v = !1, (Sr.instantAnimations || !g) && b?.(Bc(a, l, i)), a[0] = a[a.length - 1], oh(l), l.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > A5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...l,
      keyframes: a
    }, j = v && !p && _5(S), N = S.motionValue?.owner?.current;
    let C;
    if (j)
      try {
        C = new j5({
          ...S,
          element: N
        });
      } catch {
        C = new wc(S);
      }
    else
      C = new wc(S);
    C.finished.then(() => {
      this.notifyFinished();
    }).catch(es), this.pendingTimeline && (this.stopTimeline = C.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = C;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), p5()), this._animation;
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
function F1(t, a, i, l = 0, o = 1) {
  const d = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), h = t.size, m = (h - 1) * l;
  return typeof i == "function" ? i(d, h) : o === 1 ? d * l : m - d * l;
}
const z5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function k5(t) {
  const a = z5.exec(t);
  if (!a)
    return [,];
  const [, i, l, o] = a;
  return [`--${i ?? l}`, o];
}
const O5 = 4;
function Y1(t, a, i = 1) {
  Qi(i <= O5, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [l, o] = k5(t);
  if (!l)
    return;
  const d = window.getComputedStyle(a).getPropertyValue(l);
  if (d) {
    const h = d.trim();
    return l1(h) ? parseFloat(h) : h;
  }
  return Yh(o) ? Y1(o, a, i + 1) : o;
}
const L5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, U5 = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), B5 = {
  type: "keyframes",
  duration: 0.8
}, $5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, V5 = (t, { keyframes: a }) => a.length > 2 ? B5 : as.has(t) ? t.startsWith("scale") ? U5(a[1]) : L5 : $5;
function G1(t, a) {
  if (t?.inherit && a) {
    const { inherit: i, ...l } = t;
    return { ...a, ...l };
  }
  return t;
}
function X1(t, a) {
  const i = t?.[a] ?? t?.default ?? t;
  return i !== t ? G1(i, t) : i;
}
const H5 = /* @__PURE__ */ new Set([
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
function q5(t) {
  for (const a in t)
    if (!H5.has(a))
      return !0;
  return !1;
}
const I5 = (t, a, i, l = {}, o, d) => (h) => {
  const m = X1(l, t) || {}, g = m.delay || l.delay || 0;
  let { elapsed: p = 0 } = l;
  p = p - /* @__PURE__ */ Xn(g);
  const b = {
    keyframes: Array.isArray(i) ? i : [null, i],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -p,
    onUpdate: (w) => {
      a.set(w), m.onUpdate && m.onUpdate(w);
    },
    onComplete: () => {
      h(), m.onComplete && m.onComplete();
    },
    name: t,
    motionValue: a,
    element: d ? void 0 : o
  };
  q5(m) || Object.assign(b, V5(t, b)), b.duration && (b.duration = /* @__PURE__ */ Xn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Xn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (oh(b), b.delay === 0 && (v = !0)), (Sr.instantAnimations || Sr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, oh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !d && a.get() !== void 0) {
    const w = Bc(b.keyframes, m);
    if (w !== void 0) {
      Pn.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new wc(b) : new D5(b);
};
function ib(t) {
  const a = [{}, {}];
  return t?.values.forEach((i, l) => {
    a[0][l] = i.get(), a[1][l] = i.getVelocity();
  }), a;
}
function Jh(t, a, i, l) {
  if (typeof a == "function") {
    const [o, d] = ib(l);
    a = a(i !== void 0 ? i : t.custom, o, d);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, d] = ib(l);
    a = a(i !== void 0 ? i : t.custom, o, d);
  }
  return a;
}
function Kr(t, a, i) {
  const l = t.getProps();
  return Jh(l, a, i !== void 0 ? i : l.custom, t);
}
const P1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ns
]), sb = 30, F5 = (t) => !isNaN(parseFloat(t));
class Y5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (l) => {
      const o = Dn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(l), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const d of this.dependents)
          d.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = F5(this.current));
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
  on(a, i) {
    this.events[a] || (this.events[a] = new d1());
    const l = this.events[a].add(i);
    return a === "change" ? () => {
      l(), Pn.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : l;
  }
  clearListeners() {
    for (const a in this.events)
      this.events[a].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(a, i) {
    this.passiveEffect = a, this.stopPassiveEffect = i;
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
  setWithVelocity(a, i, l) {
    this.set(i), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - l;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, i = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, i && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const a = Dn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > sb)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, sb);
    return f1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
    return this.stop(), new Promise((i) => {
      this.hasAnimated = !0, this.animation = a(i), this.events.animationStart && this.events.animationStart.notify();
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
function jc(t, a) {
  return new Y5(t, a);
}
const ch = (t) => Array.isArray(t);
function G5(t, a, i) {
  t.hasValue(a) ? t.getValue(a).set(i) : t.addValue(a, jc(i));
}
function X5(t) {
  return ch(t) ? t[t.length - 1] || 0 : t;
}
function P5(t, a) {
  const i = Kr(t, a);
  let { transitionEnd: l = {}, transition: o = {}, ...d } = i || {};
  d = { ...d, ...l };
  for (const h in d) {
    const m = X5(d[h]);
    G5(t, h, m);
  }
}
const cn = (t) => !!(t && t.getVelocity);
function K5(t) {
  return !!(cn(t) && t.add);
}
function Q5(t, a) {
  const i = t.getValue("willChange");
  if (K5(i))
    return i.add(a);
  if (!i && Sr.WillChange) {
    const l = new Sr.WillChange("auto");
    t.addValue("willChange", l), l.add(a);
  }
}
function Wh(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const Z5 = "framerAppearId", K1 = "data-" + Wh(Z5);
function J5(t) {
  return t.props[K1];
}
function W5({ protectedKeys: t, needsAnimating: a }, i) {
  const l = t.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, l;
}
function Q1(t, a, { delay: i = 0, transitionOverride: l, type: o } = {}) {
  let { transition: d, transitionEnd: h, ...m } = a;
  const g = t.getDefaultTransition();
  d = d ? G1(d, g) : g;
  const p = d?.reduceMotion;
  l && (d = l);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in m) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = m[w];
    if (j === void 0 || v && W5(v, w))
      continue;
    const N = {
      delay: i,
      ...X1(d || {}, w)
    }, C = S.get();
    if (C !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === C && !N.velocity) {
      Pn.update(() => S.set(j));
      continue;
    }
    let R = !1;
    if (window.MotionHandoffAnimation) {
      const T = J5(t);
      if (T) {
        const V = window.MotionHandoffAnimation(T, w, Pn);
        V !== null && (N.startTime = V, R = !0);
      }
    }
    Q5(t, w);
    const D = p ?? t.shouldReduceMotion;
    S.start(I5(w, S, j, D && P1.has(w) ? { type: !1 } : N, t, R));
    const O = S.animation;
    O && b.push(O);
  }
  if (h) {
    const w = () => Pn.update(() => {
      h && P5(t, h);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function uh(t, a, i = {}) {
  const l = Kr(t, a, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = l || {};
  i.transitionOverride && (o = i.transitionOverride);
  const d = l ? () => Promise.all(Q1(t, l, i)) : () => Promise.resolve(), h = t.variantChildren && t.variantChildren.size ? (g = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return ez(t, a, g, p, b, v, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [g, p] = m === "beforeChildren" ? [d, h] : [h, d];
    return g().then(() => p());
  } else
    return Promise.all([d(), h(i.delay)]);
}
function ez(t, a, i = 0, l = 0, o = 0, d = 1, h) {
  const m = [];
  for (const g of t.variantChildren)
    g.notify("AnimationStart", a), m.push(uh(g, a, {
      ...h,
      delay: i + (typeof l == "function" ? 0 : l) + F1(t.variantChildren, g, l, o, d)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function tz(t, a, i = {}) {
  t.notify("AnimationStart", a);
  let l;
  if (Array.isArray(a)) {
    const o = a.map((d) => uh(t, d, i));
    l = Promise.all(o);
  } else if (typeof a == "string")
    l = uh(t, a, i);
  else {
    const o = typeof a == "function" ? Kr(t, a, i.custom) : a;
    l = Promise.all(Q1(t, o, i));
  }
  return l.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const nz = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Z1 = (t) => (a) => a.test(t), J1 = [ts, je, Gi, pr, ED, jD, nz], lb = (t) => J1.find(Z1(t));
function az(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || o1(t) : !0;
}
const rz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function iz(t) {
  const [a, i] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [l] = i.match(Gh) || [];
  if (!l)
    return t;
  const o = i.replace(l, "");
  let d = rz.has(a) ? 1 : 0;
  return l !== i && (d *= 100), a + "(" + d + o + ")";
}
const sz = /\b([a-z-]*)\(.*?\)/gu, dh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = t.match(sz);
    return a ? a.map(iz).join(" ") : t;
  }
}, fh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = ra.parse(t);
    return ra.createTransformer(t)(a.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, ob = {
  ...ts,
  transform: Math.round
}, lz = {
  rotate: pr,
  rotateX: pr,
  rotateY: pr,
  rotateZ: pr,
  scale: Qo,
  scaleX: Qo,
  scaleY: Qo,
  scaleZ: Qo,
  skew: pr,
  skewX: pr,
  skewY: pr,
  distance: je,
  translateX: je,
  translateY: je,
  translateZ: je,
  x: je,
  y: je,
  z: je,
  perspective: je,
  transformPerspective: je,
  opacity: vl,
  originX: P0,
  originY: P0,
  originZ: je
}, em = {
  // Border props
  borderWidth: je,
  borderTopWidth: je,
  borderRightWidth: je,
  borderBottomWidth: je,
  borderLeftWidth: je,
  borderRadius: je,
  borderTopLeftRadius: je,
  borderTopRightRadius: je,
  borderBottomRightRadius: je,
  borderBottomLeftRadius: je,
  // Positioning props
  width: je,
  maxWidth: je,
  height: je,
  maxHeight: je,
  top: je,
  right: je,
  bottom: je,
  left: je,
  inset: je,
  insetBlock: je,
  insetBlockStart: je,
  insetBlockEnd: je,
  insetInline: je,
  insetInlineStart: je,
  insetInlineEnd: je,
  // Spacing props
  padding: je,
  paddingTop: je,
  paddingRight: je,
  paddingBottom: je,
  paddingLeft: je,
  paddingBlock: je,
  paddingBlockStart: je,
  paddingBlockEnd: je,
  paddingInline: je,
  paddingInlineStart: je,
  paddingInlineEnd: je,
  margin: je,
  marginTop: je,
  marginRight: je,
  marginBottom: je,
  marginLeft: je,
  marginBlock: je,
  marginBlockStart: je,
  marginBlockEnd: je,
  marginInline: je,
  marginInlineStart: je,
  marginInlineEnd: je,
  // Typography
  fontSize: je,
  // Misc
  backgroundPositionX: je,
  backgroundPositionY: je,
  ...lz,
  zIndex: ob,
  // SVG
  fillOpacity: vl,
  strokeOpacity: vl,
  numOctaves: ob
}, oz = {
  ...em,
  // Color props
  color: $t,
  backgroundColor: $t,
  outlineColor: $t,
  fill: $t,
  stroke: $t,
  // Border props
  borderColor: $t,
  borderTopColor: $t,
  borderRightColor: $t,
  borderBottomColor: $t,
  borderLeftColor: $t,
  filter: dh,
  WebkitFilter: dh,
  mask: fh,
  WebkitMask: fh
}, W1 = (t) => oz[t], cz = /* @__PURE__ */ new Set([dh, fh]);
function eS(t, a) {
  let i = W1(t);
  return cz.has(i) || (i = ra), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const uz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function dz(t, a, i) {
  let l = 0, o;
  for (; l < t.length && !o; ) {
    const d = t[l];
    typeof d == "string" && !uz.has(d) && Zi(d).values.length && (o = t[l]), l++;
  }
  if (o && i)
    for (const d of a)
      t[d] = eS(i, o);
}
class fz extends Zh {
  constructor(a, i, l, o, d) {
    super(a, i, l, o, d, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: l } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let v = a[b];
      if (typeof v == "string" && (v = v.trim(), Yh(v))) {
        const w = Y1(v, i.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !P1.has(l) || a.length !== 2)
      return;
    const [o, d] = a, h = lb(o), m = lb(d), g = X0(o), p = X0(d);
    if (g !== p && br[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (nb(h) && nb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else br[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, l = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || az(a[o])) && l.push(o);
    l.length && dz(a, l, i);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: i, name: l } = this;
    if (!a || !a.current)
      return;
    l === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = br[l](a.measureViewportBox(), window.getComputedStyle(a.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && a.getValue(l, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: i, unresolvedKeyframes: l } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const d = l.length - 1, h = l[d];
    l[d] = br[i](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, g]) => {
      a.getValue(m).set(g);
    }), this.resolveNoneKeyframes();
  }
}
function hz(t, a, i) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let l = document;
    const o = i?.[t] ?? l.querySelectorAll(t);
    return o ? Array.from(o) : [];
  }
  return Array.from(t).filter((l) => l != null);
}
const tS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function dc(t) {
  return rD(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: mz } = /* @__PURE__ */ w1(queueMicrotask, !1), pz = {
  y: !1
};
function vz() {
  return pz.y;
}
function nS(t, a) {
  const i = hz(t), l = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: l.signal
  };
  return [i, o, () => l.abort()];
}
function gz(t) {
  return !(t.pointerType === "touch" || vz());
}
function yz(t, a, i = {}) {
  const [l, o, d] = nS(t, i);
  return l.forEach((h) => {
    let m = !1, g = !1, p;
    const b = () => {
      h.removeEventListener("pointerleave", j);
    }, v = (C) => {
      p && (p(C), p = void 0), b();
    }, w = (C) => {
      m = !1, window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), g && (g = !1, v(C));
    }, S = () => {
      m = !0, window.addEventListener("pointerup", w, o), window.addEventListener("pointercancel", w, o);
    }, j = (C) => {
      if (C.pointerType !== "touch") {
        if (m) {
          g = !0;
          return;
        }
        v(C);
      }
    }, N = (C) => {
      if (!gz(C))
        return;
      g = !1;
      const R = a(h, C);
      typeof R == "function" && (p = R, h.addEventListener("pointerleave", j, o));
    };
    h.addEventListener("pointerenter", N, o), h.addEventListener("pointerdown", S, o);
  }), d;
}
const aS = (t, a) => a ? t === a ? !0 : aS(t, a.parentElement) : !1, bz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, xz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Sz(t) {
  return xz.has(t.tagName) || t.isContentEditable === !0;
}
const fc = /* @__PURE__ */ new WeakSet();
function cb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function _f(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const wz = (t, a) => {
  const i = t.currentTarget;
  if (!i)
    return;
  const l = cb(() => {
    if (fc.has(i))
      return;
    _f(i, "down");
    const o = cb(() => {
      _f(i, "up");
    }), d = () => _f(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", d, a);
  });
  i.addEventListener("keydown", l, a), i.addEventListener("blur", () => i.removeEventListener("keydown", l), a);
};
function ub(t) {
  return bz(t) && !0;
}
const db = /* @__PURE__ */ new WeakSet();
function jz(t, a, i = {}) {
  const [l, o, d] = nS(t, i), h = (m) => {
    const g = m.currentTarget;
    if (!ub(m) || db.has(m))
      return;
    fc.add(g), i.stopPropagation && db.add(m);
    const p = a(g, m), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), fc.has(g) && fc.delete(g), ub(S) && typeof p == "function" && p(S, { success: j });
    }, v = (S) => {
      b(S, g === window || g === document || i.useGlobalTarget || aS(g, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return l.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), dc(m) && (m.addEventListener("focus", (p) => wz(p, o)), !Sz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), d;
}
const Ez = [...J1, $t, ra], Nz = (t) => Ez.find(Z1(t)), fb = () => ({ min: 0, max: 0 }), rS = () => ({
  x: fb(),
  y: fb()
}), Tz = /* @__PURE__ */ new WeakMap();
function $c(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function gl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const tm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], nm = ["initial", ...tm];
function Vc(t) {
  return $c(t.animate) || nm.some((a) => gl(t[a]));
}
function iS(t) {
  return !!(Vc(t) || t.variants);
}
function Cz(t, a, i) {
  for (const l in a) {
    const o = a[l], d = i[l];
    if (cn(o))
      t.addValue(l, o);
    else if (cn(d))
      t.addValue(l, jc(o, { owner: t }));
    else if (d !== o)
      if (t.hasValue(l)) {
        const h = t.getValue(l);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = t.getStaticValue(l);
        t.addValue(l, jc(h !== void 0 ? h : o, { owner: t }));
      }
  }
  for (const l in i)
    a[l] === void 0 && t.removeValue(l);
  return a;
}
const Ec = { current: null }, am = { current: !1 }, Rz = typeof window < "u";
function sS() {
  if (am.current = !0, !!Rz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Ec.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Ec.current = !1;
}
const hb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Nc = {};
function lS(t) {
  Nc = t;
}
function Mz() {
  return Nc;
}
class _z {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, i, l) {
    return {};
  }
  constructor({ parent: a, props: i, presenceContext: l, reducedMotionConfig: o, skipAnimations: d, blockInitialAnimation: h, visualState: m }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Zh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = Dn.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, Pn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = i, this.presenceContext = l, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = d, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = Vc(i), this.isVariantNode = iS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const S in w) {
      const j = w[S];
      p[S] !== void 0 && cn(j) && j.set(p[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, Tz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, l) => this.bindToMotionValue(l, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (am.current || sS(), this.shouldReduceMotion = Ec.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Qf(this.notifyUpdate), Qf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const i = this.features[a];
      i && (i.unmount(), i.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, i) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && I1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: g, ease: p, duration: b } = i.accelerate, v = new H1({
        element: this.current,
        name: a,
        keyframes: m,
        times: g,
        ease: p,
        duration: /* @__PURE__ */ Xn(b)
      }), w = h(v);
      this.valueSubscriptions.set(a, () => {
        w(), v.cancel();
      });
      return;
    }
    const l = as.has(a);
    l && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Pn.preRender(this.notifyUpdate), l && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let d;
    typeof window < "u" && window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, a, i)), this.valueSubscriptions.set(a, () => {
      o(), d && d(), i.owner && i.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in Nc) {
      const i = Nc[a];
      if (!i)
        continue;
      const { isEnabled: l, Feature: o } = i;
      if (!this.features[a] && o && l(this.props) && (this.features[a] = new o(this)), this.features[a]) {
        const d = this.features[a];
        d.isMounted ? d.update() : (d.mount(), d.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : rS();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, i) {
    this.latestValues[a] = i;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, i) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = i;
    for (let l = 0; l < hb.length; l++) {
      const o = hb[l];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const d = "on" + o, h = a[d];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = Cz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const i = this.getClosestVariantNode();
    if (i)
      return i.variantChildren && i.variantChildren.add(a), () => i.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, i) {
    const l = this.values.get(a);
    i !== l && (l && this.removeValue(a), this.bindToMotionValue(a, i), this.values.set(a, i), this.latestValues[a] = i.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const i = this.valueSubscriptions.get(a);
    i && (i(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, i) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let l = this.values.get(a);
    return l === void 0 && i !== void 0 && (l = jc(i === null ? void 0 : i, { owner: this }), this.addValue(a, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let l = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return l != null && (typeof l == "string" && (l1(l) || o1(l)) ? l = parseFloat(l) : !Nz(l) && ra.test(i) && (l = eS(a, i)), this.setBaseTarget(a, cn(l) ? l.get() : l)), cn(l) ? l.get() : l;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, i) {
    this.baseTarget[a] = i;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: i } = this.props;
    let l;
    if (typeof i == "string" || typeof i == "object") {
      const d = Jh(this.props, i, this.presenceContext?.custom);
      d && (l = d[a]);
    }
    if (i && l !== void 0)
      return l;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !cn(o) ? o : this.initialValues[a] !== void 0 && l === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new d1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    mz.render(this.render);
  }
}
class oS extends _z {
  constructor() {
    super(...arguments), this.KeyframeResolver = fz;
  }
  sortInstanceNodePosition(a, i) {
    return a.compareDocumentPosition(i) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, i) {
    const l = a.style;
    return l ? l[i] : void 0;
  }
  removeValueFromRenderState(a, { vars: i, style: l }) {
    delete i[a], delete l[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    cn(a) && (this.childSubscription = a.on("change", (i) => {
      this.current && (this.current.textContent = `${i}`);
    }));
  }
}
class rs {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function Az({ top: t, left: a, right: i, bottom: l }) {
  return {
    x: { min: a, max: i },
    y: { min: t, max: l }
  };
}
function Dz(t, a) {
  if (!a)
    return t;
  const i = a({ x: t.left, y: t.top }), l = a({ x: t.right, y: t.bottom });
  return {
    top: i.y,
    left: i.x,
    bottom: l.y,
    right: l.x
  };
}
function zz(t, a) {
  return Az(Dz(t.getBoundingClientRect(), a));
}
const kz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Oz = ns.length;
function Lz(t, a, i) {
  let l = "", o = !0;
  for (let d = 0; d < Oz; d++) {
    const h = ns[d], m = t[h];
    if (m === void 0)
      continue;
    let g = !0;
    if (typeof m == "number")
      g = m === (h.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      g = h.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!g || i) {
      const p = tS(m, em[h]);
      if (!g) {
        o = !1;
        const b = kz[h] || h;
        l += `${b}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return l = l.trim(), i ? l = i(a, o ? "" : l) : o && (l = "none"), l;
}
function rm(t, a, i) {
  const { style: l, vars: o, transformOrigin: d } = t;
  let h = !1, m = !1;
  for (const g in a) {
    const p = a[g];
    if (as.has(g)) {
      h = !0;
      continue;
    } else if (E1(g)) {
      o[g] = p;
      continue;
    } else {
      const b = tS(p, em[g]);
      g.startsWith("origin") ? (m = !0, d[g] = b) : l[g] = b;
    }
  }
  if (a.transform || (h || i ? l.transform = Lz(a, t.transform, i) : l.transform && (l.transform = "none")), m) {
    const { originX: g = "50%", originY: p = "50%", originZ: b = 0 } = d;
    l.transformOrigin = `${g} ${p} ${b}`;
  }
}
function cS(t, { style: a, vars: i }, l, o) {
  const d = t.style;
  let h;
  for (h in a)
    d[h] = a[h];
  o?.applyProjectionStyles(d, l);
  for (h in i)
    d.setProperty(h, i[h]);
}
function mb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const el = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (je.test(t))
        t = parseFloat(t);
      else
        return t;
    const i = mb(t, a.target.x), l = mb(t, a.target.y);
    return `${i}% ${l}%`;
  }
}, Uz = {
  correct: (t, { treeScale: a, projectionDelta: i }) => {
    const l = t, o = ra.parse(t);
    if (o.length > 5)
      return l;
    const d = ra.createTransformer(t), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, g = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= g;
    const p = Tl(m, g, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), d(o);
  }
}, Bz = {
  borderRadius: {
    ...el,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: el,
  borderTopRightRadius: el,
  borderBottomLeftRadius: el,
  borderBottomRightRadius: el,
  boxShadow: Uz
};
function uS(t, { layout: a, layoutId: i }) {
  return as.has(t) || t.startsWith("origin") || (a || i !== void 0) && (!!Bz[t] || t === "opacity");
}
function im(t, a, i) {
  const l = t.style, o = a?.style, d = {};
  if (!l)
    return d;
  for (const h in l)
    (cn(l[h]) || o && cn(o[h]) || uS(h, t) || i?.getValue(h)?.liveStyle !== void 0) && (d[h] = l[h]);
  return d;
}
function $z(t) {
  return window.getComputedStyle(t);
}
class Vz extends oS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = cS;
  }
  readValueFromInstance(a, i) {
    if (as.has(i))
      return this.projection?.isProjecting ? ah(i) : u5(a, i);
    {
      const l = $z(a), o = (E1(i) ? l.getPropertyValue(i) : l[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return zz(a, i);
  }
  build(a, i, l) {
    rm(a, i, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return im(a, i, l);
  }
}
const Hz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, qz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Iz(t, a, i = 1, l = 0, o = !0) {
  t.pathLength = 1;
  const d = o ? Hz : qz;
  t[d.offset] = `${-l}`, t[d.array] = `${a} ${i}`;
}
const Fz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function dS(t, {
  attrX: a,
  attrY: i,
  attrScale: l,
  pathLength: o,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, g, p, b) {
  if (rm(t, m, p), g) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: w } = t;
  v.transform && (w.transform = v.transform, delete v.transform), (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const S of Fz)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), i !== void 0 && (v.y = i), l !== void 0 && (v.scale = l), o !== void 0 && Iz(v, o, d, h, !1);
}
const fS = /* @__PURE__ */ new Set([
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
]), hS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Yz(t, a, i, l) {
  cS(t, a, void 0, l);
  for (const o in a.attrs)
    t.setAttribute(fS.has(o) ? o : Wh(o), a.attrs[o]);
}
function mS(t, a, i) {
  const l = im(t, a, i);
  for (const o in t)
    if (cn(t[o]) || cn(a[o])) {
      const d = ns.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      l[d] = t[o];
    }
  return l;
}
class Gz extends oS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = rS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (as.has(i)) {
      const l = W1(i);
      return l && l.default || 0;
    }
    return i = fS.has(i) ? i : Wh(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return mS(a, i, l);
  }
  build(a, i, l) {
    dS(a, i, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(a, i, l, o) {
    Yz(a, i, l, o);
  }
  mount(a) {
    this.isSVGTag = hS(a.tagName), super.mount(a);
  }
}
const Xz = nm.length;
function pS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const i = t.parent ? pS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (i.initial = t.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < Xz; i++) {
    const l = nm[i], o = t.props[l];
    (gl(o) || o === !1) && (a[l] = o);
  }
  return a;
}
function vS(t, a) {
  if (!Array.isArray(a))
    return !1;
  const i = a.length;
  if (i !== t.length)
    return !1;
  for (let l = 0; l < i; l++)
    if (a[l] !== t[l])
      return !1;
  return !0;
}
const Pz = [...tm].reverse(), Kz = tm.length;
function Qz(t) {
  return (a) => Promise.all(a.map(({ animation: i, options: l }) => tz(t, i, l)));
}
function Zz(t) {
  let a = Qz(t), i = pb(), l = !0, o = !1;
  const d = (p) => (b, v) => {
    const w = Kr(t, v, p === "exit" ? t.presenceContext?.custom : void 0);
    if (w) {
      const { transition: S, transitionEnd: j, ...N } = w;
      b = { ...b, ...N, ...j };
    }
    return b;
  };
  function h(p) {
    a = p(t);
  }
  function m(p) {
    const { props: b } = t, v = pS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let R = 0; R < Kz; R++) {
      const D = Pz[R], O = i[D], T = b[D] !== void 0 ? b[D] : v[D], V = gl(T), K = D === p ? O.isActive : null;
      K === !1 && (N = R);
      let ne = T === v[D] && T !== b[D] && V;
      if (ne && (l || o) && t.manuallyAnimateOnMount && (ne = !1), O.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !O.isActive && K === null || // If we didn't and don't have any defined prop for this animation type
      !T && !O.prevProp || // Or if the prop doesn't define an animation
      $c(T) || typeof T == "boolean")
        continue;
      if (D === "exit" && O.isActive && K !== !0) {
        O.prevResolvedValues && (j = {
          ...j,
          ...O.prevResolvedValues
        });
        continue;
      }
      const _ = Jz(O.prevProp, T);
      let Y = _ || // If we're making this variant active, we want to always make it active
      D === p && O.isActive && !ne && V || // If we removed a higher-priority variant (i is in reverse order)
      R > N && V, $ = !1;
      const se = Array.isArray(T) ? T : [T];
      let ae = se.reduce(d(D), {});
      K === !1 && (ae = {});
      const { prevResolvedValues: ee = {} } = O, ue = {
        ...ee,
        ...ae
      }, W = (H) => {
        Y = !0, S.has(H) && ($ = !0, S.delete(H)), O.needsAnimating[H] = !0;
        const q = t.getValue(H);
        q && (q.liveStyle = !1);
      };
      for (const H in ue) {
        const q = ae[H], ie = ee[H];
        if (j.hasOwnProperty(H))
          continue;
        let M = !1;
        ch(q) && ch(ie) ? M = !vS(q, ie) : M = q !== ie, M ? q != null ? W(H) : S.add(H) : q !== void 0 && S.has(H) ? W(H) : O.protectedKeys[H] = !0;
      }
      O.prevProp = T, O.prevResolvedValues = ae, O.isActive && (j = { ...j, ...ae }), (l || o) && t.blockInitialAnimation && (Y = !1);
      const z = ne && _;
      Y && (!z || $) && w.push(...se.map((H) => {
        const q = { type: D };
        if (typeof H == "string" && (l || o) && !z && t.manuallyAnimateOnMount && t.parent) {
          const { parent: ie } = t, M = Kr(ie, H);
          if (ie.enteringChildren && M) {
            const { delayChildren: J } = M.transition || {};
            q.delay = F1(ie.enteringChildren, t, J);
          }
        }
        return {
          animation: H,
          options: q
        };
      }));
    }
    if (S.size) {
      const R = {};
      if (typeof b.initial != "boolean") {
        const D = Kr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        D && D.transition && (R.transition = D.transition);
      }
      S.forEach((D) => {
        const O = t.getBaseTarget(D), T = t.getValue(D);
        T && (T.liveStyle = !0), R[D] = O ?? null;
      }), w.push({ animation: R });
    }
    let C = !!w.length;
    return l && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (C = !1), l = !1, o = !1, C ? a(w) : Promise.resolve();
  }
  function g(p, b) {
    if (i[p].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((w) => w.animationState?.setActive(p, b)), i[p].isActive = b;
    const v = m(p);
    for (const w in i)
      i[w].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: g,
    setAnimateFunction: h,
    getState: () => i,
    reset: () => {
      i = pb(), o = !0;
    }
  };
}
function Jz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !vS(a, t) : !1;
}
function Ir(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function pb() {
  return {
    animate: Ir(!0),
    whileInView: Ir(),
    whileHover: Ir(),
    whileTap: Ir(),
    whileDrag: Ir(),
    whileFocus: Ir(),
    exit: Ir()
  };
}
function vb(t, a, i, l = { passive: !0 }) {
  return t.addEventListener(a, i, l), () => t.removeEventListener(a, i);
}
function Wz(t) {
  return cn(t) ? t.get() : t;
}
const sm = y.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function gb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function ek(...t) {
  return (a) => {
    let i = !1;
    const l = t.map((o) => {
      const d = gb(o, a);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let o = 0; o < l.length; o++) {
          const d = l[o];
          typeof d == "function" ? d() : gb(t[o], null);
        }
      };
  };
}
function tk(...t) {
  return y.useCallback(ek(...t), t);
}
class nk extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (dc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = i.offsetParent, o = dc(l) && l.offsetWidth || 0, d = dc(l) && l.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = i.offsetTop, m.left = i.offsetLeft, m.right = o - m.width - m.left, m.bottom = d - m.height - m.top;
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
function ak({ children: t, isPresent: a, anchorX: i, anchorY: l, root: o, pop: d }) {
  const h = y.useId(), m = y.useRef(null), g = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(sm), b = t.props?.ref ?? t?.ref, v = tk(m, b);
  return y.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: C, bottom: R } = g.current;
    if (a || d === !1 || !m.current || !w || !S)
      return;
    const D = i === "left" ? `left: ${N}` : `right: ${C}`, O = l === "bottom" ? `bottom: ${R}` : `top: ${j}`;
    m.current.dataset.motionPopId = h;
    const T = document.createElement("style");
    p && (T.nonce = p);
    const V = o ?? document.head;
    return V.appendChild(T), T.sheet && T.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${D}px !important;
            ${O}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), V.contains(T) && V.removeChild(T);
    };
  }, [a]), c.jsx(nk, { isPresent: a, childRef: m, sizeRef: g, pop: d, children: d === !1 ? t : y.cloneElement(t, { ref: v }) });
}
const rk = ({ children: t, initial: a, isPresent: i, onExitComplete: l, custom: o, presenceAffectsLayout: d, mode: h, anchorX: m, anchorY: g, root: p }) => {
  const b = qh(ik), v = y.useId();
  let w = !0, S = y.useMemo(() => (w = !1, {
    id: v,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const N of b.values())
        if (!N)
          return;
      l && l();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [i, b, l]);
  return d && w && (S = { ...S }), y.useMemo(() => {
    b.forEach((j, N) => b.set(N, !1));
  }, [i]), y.useEffect(() => {
    !i && !b.size && l && l();
  }, [i]), t = c.jsx(ak, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: g, root: p, children: t }), c.jsx(Lc.Provider, { value: S, children: t });
};
function ik() {
  return /* @__PURE__ */ new Map();
}
function sk(t = !0) {
  const a = y.useContext(Lc);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: l, register: o } = a, d = y.useId();
  y.useEffect(() => {
    if (t)
      return o(d);
  }, [t]);
  const h = y.useCallback(() => t && l && l(d), [d, l, t]);
  return !i && l ? [!1, h] : [!0];
}
const Zo = (t) => t.key || "";
function yb(t) {
  const a = [];
  return y.Children.forEach(t, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const gS = ({ children: t, custom: a, initial: i = !0, onExitComplete: l, presenceAffectsLayout: o = !0, mode: d = "sync", propagate: h = !1, anchorX: m = "left", anchorY: g = "top", root: p }) => {
  const [b, v] = sk(h), w = y.useMemo(() => yb(t), [t]), S = h && !b ? [] : w.map(Zo), j = y.useRef(!0), N = y.useRef(w), C = qh(() => /* @__PURE__ */ new Map()), R = y.useRef(/* @__PURE__ */ new Set()), [D, O] = y.useState(w), [T, V] = y.useState(w);
  s1(() => {
    j.current = !1, N.current = w;
    for (let _ = 0; _ < T.length; _++) {
      const Y = Zo(T[_]);
      S.includes(Y) ? (C.delete(Y), R.current.delete(Y)) : C.get(Y) !== !0 && C.set(Y, !1);
    }
  }, [T, S.length, S.join("-")]);
  const K = [];
  if (w !== D) {
    let _ = [...w];
    for (let Y = 0; Y < T.length; Y++) {
      const $ = T[Y], se = Zo($);
      S.includes(se) || (_.splice(Y, 0, $), K.push($));
    }
    return d === "wait" && K.length && (_ = K), V(yb(_)), O(w), null;
  }
  const { forceRender: ne } = y.useContext(i1);
  return c.jsx(c.Fragment, { children: T.map((_) => {
    const Y = Zo(_), $ = h && !b ? !1 : w === T || S.includes(Y), se = () => {
      if (R.current.has(Y))
        return;
      if (C.has(Y))
        R.current.add(Y), C.set(Y, !0);
      else
        return;
      let ae = !0;
      C.forEach((ee) => {
        ee || (ae = !1);
      }), ae && (ne?.(), V(N.current), h && v?.(), l && l());
    };
    return c.jsx(rk, { isPresent: $, initial: !j.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: d, root: p, onExitComplete: $ ? void 0 : se, anchorX: m, anchorY: g, children: _ }, Y);
  }) });
}, lm = y.createContext({ strict: !1 }), bb = {
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
let xb = !1;
function lk() {
  if (xb)
    return;
  const t = {};
  for (const a in bb)
    t[a] = {
      isEnabled: (i) => bb[a].some((l) => !!i[l])
    };
  lS(t), xb = !0;
}
function yS() {
  return lk(), Mz();
}
function hh(t) {
  const a = yS();
  for (const i in t)
    a[i] = {
      ...a[i],
      ...t[i]
    };
  lS(a);
}
function om({ children: t, features: a, strict: i = !1 }) {
  const [, l] = y.useState(!Af(a)), o = y.useRef(void 0);
  if (!Af(a)) {
    const { renderer: d, ...h } = a;
    o.current = d, hh(h);
  }
  return y.useEffect(() => {
    Af(a) && a().then(({ renderer: d, ...h }) => {
      hh(h), o.current = d, l(!0);
    });
  }, []), c.jsx(lm.Provider, { value: { renderer: o.current, strict: i }, children: t });
}
function Af(t) {
  return typeof t == "function";
}
const ok = /* @__PURE__ */ new Set([
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
function Tc(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || ok.has(t);
}
let bS = (t) => !Tc(t);
function ck(t) {
  typeof t == "function" && (bS = (a) => a.startsWith("on") ? !Tc(a) : t(a));
}
try {
  ck(require("@emotion/is-prop-valid").default);
} catch {
}
function uk(t, a, i) {
  const l = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || cn(t[o]) || (bS(o) || i === !0 && Tc(o) || !a && !Tc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (l[o] = t[o]);
  return l;
}
const Hc = /* @__PURE__ */ y.createContext({});
function dk(t, a) {
  if (Vc(t)) {
    const { initial: i, animate: l } = t;
    return {
      initial: i === !1 || gl(i) ? i : void 0,
      animate: gl(l) ? l : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function fk(t) {
  const { initial: a, animate: i } = dk(t, y.useContext(Hc));
  return y.useMemo(() => ({ initial: a, animate: i }), [Sb(a), Sb(i)]);
}
function Sb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const cm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function xS(t, a, i) {
  for (const l in a)
    !cn(a[l]) && !uS(l, i) && (t[l] = a[l]);
}
function hk({ transformTemplate: t }, a) {
  return y.useMemo(() => {
    const i = cm();
    return rm(i, a, t), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function mk(t, a) {
  const i = t.style || {}, l = {};
  return xS(l, i, t), Object.assign(l, hk(t, a)), l;
}
function pk(t, a) {
  const i = {}, l = mk(t, a);
  return t.drag && t.dragListener !== !1 && (i.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0), i.style = l, i;
}
const SS = () => ({
  ...cm(),
  attrs: {}
});
function vk(t, a, i, l) {
  const o = y.useMemo(() => {
    const d = SS();
    return dS(d, a, hS(l), t.transformTemplate, t.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [a]);
  if (t.style) {
    const d = {};
    xS(d, t.style, t), o.style = { ...d, ...o.style };
  }
  return o;
}
const gk = [
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
function um(t) {
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
      !!(gk.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function yk(t, a, i, { latestValues: l }, o, d = !1, h) {
  const g = (h ?? um(t) ? vk : pk)(a, l, o, t), p = uk(a, typeof t == "string", d), b = t !== y.Fragment ? { ...p, ...g, ref: i } : {}, { children: v } = a, w = y.useMemo(() => cn(v) ? v.get() : v, [v]);
  return y.createElement(t, {
    ...b,
    children: w
  });
}
function bk({ scrapeMotionValuesFromProps: t, createRenderState: a }, i, l, o) {
  return {
    latestValues: xk(i, l, o, t),
    renderState: a()
  };
}
function xk(t, a, i, l) {
  const o = {}, d = l(t, {});
  for (const w in d)
    o[w] = Wz(d[w]);
  let { initial: h, animate: m } = t;
  const g = Vc(t), p = iS(t);
  a && p && !g && t.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let b = i ? i.initial === !1 : !1;
  b = b || h === !1;
  const v = b ? m : h;
  if (v && typeof v != "boolean" && !$c(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = Jh(t, w[S]);
      if (j) {
        const { transitionEnd: N, transition: C, ...R } = j;
        for (const D in R) {
          let O = R[D];
          if (Array.isArray(O)) {
            const T = b ? O.length - 1 : 0;
            O = O[T];
          }
          O !== null && (o[D] = O);
        }
        for (const D in N)
          o[D] = N[D];
      }
    }
  }
  return o;
}
const wS = (t) => (a, i) => {
  const l = y.useContext(Hc), o = y.useContext(Lc), d = () => bk(t, a, l, o);
  return i ? d() : qh(d);
}, Sk = /* @__PURE__ */ wS({
  scrapeMotionValuesFromProps: im,
  createRenderState: cm
}), wk = /* @__PURE__ */ wS({
  scrapeMotionValuesFromProps: mS,
  createRenderState: SS
}), jk = Symbol.for("motionComponentSymbol");
function Ek(t, a, i) {
  const l = y.useRef(i);
  y.useInsertionEffect(() => {
    l.current = i;
  });
  const o = y.useRef(null);
  return y.useCallback((d) => {
    d && t.onMount?.(d);
    const h = l.current;
    if (typeof h == "function")
      if (d) {
        const m = h(d);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : h(d);
    else h && (h.current = d);
    a && (d ? a.mount(d) : a.unmount());
  }, [a]);
}
const Nk = y.createContext({});
function Tk(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Ck(t, a, i, l, o, d) {
  const { visualElement: h } = y.useContext(Hc), m = y.useContext(lm), g = y.useContext(Lc), p = y.useContext(sm), b = p.reducedMotion, v = p.skipAnimations, w = y.useRef(null), S = y.useRef(!1);
  l = l || m.renderer, !w.current && l && (w.current = l(t, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: d
  }), S.current && w.current && (w.current.manuallyAnimateOnMount = !0));
  const j = w.current, N = y.useContext(Nk);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && Rk(w.current, i, o, N);
  const C = y.useRef(!1);
  y.useInsertionEffect(() => {
    j && C.current && j.update(i, g);
  });
  const R = i[K1], D = y.useRef(!!R && typeof window < "u" && !window.MotionHandoffIsComplete?.(R) && window.MotionHasOptimisedAnimation?.(R));
  return s1(() => {
    S.current = !0, j && (C.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), D.current && j.animationState && j.animationState.animateChanges());
  }), y.useEffect(() => {
    j && (!D.current && j.animationState && j.animationState.animateChanges(), D.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(R);
    }), D.current = !1), j.enteringChildren = void 0);
  }), j;
}
function Rk(t, a, i, l) {
  const { layoutId: o, layout: d, drag: h, dragConstraints: m, layoutScroll: g, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new i(t.latestValues, a["data-framer-portal-id"] ? void 0 : jS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: d,
    alwaysMeasureLayout: !!h || m && Tk(m),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof d == "string" ? d : "both",
    initialPromotionConfig: l,
    crossfade: v,
    layoutScroll: g,
    layoutRoot: p,
    layoutAnchor: b
  });
}
function jS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : jS(t.parent);
}
function Df(t, { forwardMotionProps: a = !1, type: i } = {}, l, o) {
  l && hh(l);
  const d = i ? i === "svg" : um(t), h = d ? wk : Sk;
  function m(p, b) {
    let v;
    const w = {
      ...y.useContext(sm),
      ...p,
      layoutId: Mk(p)
    }, { isStatic: S } = w, j = fk(p), N = h(p, S);
    if (!S && typeof window < "u") {
      _k();
      const C = Ak(w);
      v = C.MeasureLayout, j.visualElement = Ck(t, N, w, o, C.ProjectionNode, d);
    }
    return c.jsxs(Hc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, yk(t, p, Ek(N, j.visualElement, b), N, S, a, d)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const g = y.forwardRef(m);
  return g[jk] = t, g;
}
function Mk({ layoutId: t }) {
  const a = y.useContext(i1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function _k(t, a) {
  y.useContext(lm).strict;
}
function Ak(t) {
  const a = yS(), { drag: i, layout: l } = a;
  if (!i && !l)
    return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout: i?.isEnabled(t) || l?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Dk(t, a) {
  if (typeof Proxy > "u")
    return Df;
  const i = /* @__PURE__ */ new Map(), l = (d, h) => Df(d, h, t, a), o = (d, h) => l(d, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? l : (i.has(h) || i.set(h, Df(h, void 0, t, a)), i.get(h))
  });
}
const dm = /* @__PURE__ */ Dk(), zk = (t, a) => a.isSVG ?? um(t) ? new Gz(a) : new Vz(a, {
  allowProjection: t !== y.Fragment
});
class kk extends rs {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Zz(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    $c(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: i } = this.node.prevProps || {};
    a !== i && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Ok = 0;
class Lk extends rs {
  constructor() {
    super(...arguments), this.id = Ok++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: l } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === l)
      return;
    if (a && l === !1) {
      if (this.isExitComplete) {
        const { initial: d, custom: h } = this.node.getProps();
        if (typeof d == "string") {
          const m = Kr(this.node, d, h);
          if (m) {
            const { transition: g, transitionEnd: p, ...b } = m;
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
    i && !a && o.then(() => {
      this.isExitComplete = !0, i(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: i } = this.node.presenceContext || {};
    i && i(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const Uk = {
  animation: {
    Feature: kk
  },
  exit: {
    Feature: Lk
  }
};
function ES(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function wb(t, a, i) {
  const { props: l } = t;
  t.animationState && l.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, d = l[o];
  d && Pn.postRender(() => d(a, ES(a)));
}
class Bk extends rs {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = yz(a, (i, l) => (wb(this.node, l, "Start"), (o) => wb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class $k extends rs {
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
    this.unmount = Uc(vb(this.node.current, "focus", () => this.onFocus()), vb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function jb(t, a, i) {
  const { props: l } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && l.whileTap && t.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), d = l[o];
  d && Pn.postRender(() => d(a, ES(a)));
}
class Vk extends rs {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: l } = this.node.props;
    this.unmount = jz(a, (o, d) => (jb(this.node, d, "Start"), (h, { success: m }) => jb(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const mh = /* @__PURE__ */ new WeakMap(), zf = /* @__PURE__ */ new WeakMap(), Hk = (t) => {
  const a = mh.get(t.target);
  a && a(t);
}, qk = (t) => {
  t.forEach(Hk);
};
function Ik({ root: t, ...a }) {
  const i = t || document;
  zf.has(i) || zf.set(i, {});
  const l = zf.get(i), o = JSON.stringify(a);
  return l[o] || (l[o] = new IntersectionObserver(qk, { root: t, ...a })), l[o];
}
function Fk(t, a, i) {
  const l = Ik(a);
  return mh.set(t, i), l.observe(t), () => {
    mh.delete(t), l.unobserve(t);
  };
}
const Yk = {
  some: 0,
  all: 1
};
class Gk extends rs {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: l, amount: o = "some", once: d } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: l,
      threshold: typeof o == "number" ? o : Yk[o]
    }, m = (g) => {
      const { isIntersecting: p } = g;
      if (this.isInView === p || (this.isInView = p, d && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = p ? b : v;
      w && w(g);
    };
    this.stopObserver = Fk(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(Xk(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function Xk({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (i) => t[i] !== a[i];
}
const Pk = {
  inView: {
    Feature: Gk
  },
  tap: {
    Feature: Vk
  },
  focus: {
    Feature: $k
  },
  hover: {
    Feature: Bk
  }
}, fm = {
  renderer: zk,
  ...Uk,
  ...Pk
};
function Kk() {
  !am.current && sS();
  const [t] = y.useState(Ec.current);
  return t;
}
const ph = "emotion-tts:trigger-generate", vh = "emotion-tts:run-state";
function Qk() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(ph));
}
function Zk(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(vh, { detail: t }));
}
function Jk(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(ph, t), () => window.removeEventListener(ph, t));
}
function NS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const l = i.detail;
    l && t(l);
  };
  return window.addEventListener(vh, a), () => window.removeEventListener(vh, a);
}
var Wk = "wksjad0", e4 = "wksjad1", t4 = "wksjad2", n4 = "wksjad3", a4 = "wksjad4", r4 = "wksjad5", i4 = "wksjad6", s4 = "wksjad7", l4 = "wksjad8", o4 = "wksjad9", c4 = "wksjada", u4 = "wksjadb", d4 = "wksjadc", f4 = "wksjadd", h4 = "wksjade", m4 = "wksjadf", p4 = "wksjadg", kf = "wksjadh", v4 = "wksjadi", g4 = "wksjadj", y4 = "wksjadk", b4 = "wksjadl", x4 = "wksjadm", S4 = "wksjadn";
const gh = 5, w4 = 5e-3;
function TS(t, a = "") {
  return `${va}/deployments/${t}/artifacts${a}`;
}
function j4(t) {
  const [a, i] = y.useState([]), [l, o] = y.useState(!1), [d, h] = y.useState(null), [m, g] = y.useState(0), p = y.useRef(null), b = y.useRef(!1), v = y.useCallback(() => g((w) => w + 1), []);
  return y.useEffect(() => {
    p.current?.abort();
    const w = new AbortController();
    return p.current = w, o(!0), h(null), fetch(`${TS(t)}?limit=${gh}`, {
      headers: { accept: "application/json" },
      signal: w.signal
    }).then(async (S) => {
      if (!S.ok)
        throw new Error(`HTTP ${S.status}`);
      const j = await S.json();
      w.signal.aborted || i(j.artifacts.slice(0, gh));
    }).catch((S) => {
      if (w.signal.aborted) return;
      const j = S instanceof Error ? S.message : "fetch failed";
      h(j);
    }).finally(() => {
      w.signal.aborted || o(!1);
    }), () => w.abort();
  }, [t, m]), y.useEffect(() => NS((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: l, error: d, refetch: v, tick: m };
}
function E4(t, a) {
  const [i, l] = y.useState(() => /* @__PURE__ */ new Map());
  return y.useEffect(() => {
    let o = !1;
    return Xi(t).then(({ voiceAssets: d }) => {
      if (o) return;
      const h = /* @__PURE__ */ new Map();
      for (const m of d)
        h.set(m.voiceAssetId, m.displayName);
      l(h);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), i;
}
function N4({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: i, loading: l, error: o, refetch: d, tick: h } = j4(t), m = E4(t, h), [g, p] = y.useState(null), b = Kk(), v = y.useCallback(() => {
    p(null), d();
  }, [d]), w = i;
  return !l && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: Wk, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: e4, children: [
      /* @__PURE__ */ c.jsx("span", { className: t4, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: n4, children: [
        /* @__PURE__ */ c.jsx("span", { className: a4, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: r4, children: [
          "last ",
          gh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: i4,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: S4, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(om, { features: fm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: s4, children: /* @__PURE__ */ c.jsx(gS, { initial: !1, children: w.map((S) => {
      const j = g === S.utteranceId, N = TS(
        t,
        `/${S.utteranceId}/download`
      ), C = S.voiceAssetId ? m.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        dm.li,
        {
          className: l4,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: o4, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: c4,
                  onClick: () => p(
                    (R) => R === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: u4, children: [
                /* @__PURE__ */ c.jsxs("div", { className: d4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: f4, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: h4, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: m4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: p4, children: C4(S.finishedAt) }),
                  C && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: kf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: v4, children: C })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: kf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: g4, children: T4(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > w4 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: kf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: y4, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: b4,
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
                className: x4,
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
function T4(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return i > 0 ? `${i}:${l.toString().padStart(2, "0")}` : `${l}s`;
}
function C4(t) {
  if (!t) return "—";
  const i = Math.floor(Date.now() / 1e3) - t;
  return i < 0 ? "just now" : i < 60 ? `${i}s ago` : i < 3600 ? `${Math.floor(i / 60)}m ago` : i < 86400 ? `${Math.floor(i / 3600)}h ago` : i < 604800 ? `${Math.floor(i / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function R4(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function CS() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function M4() {
  if (typeof window > "u") return;
  const t = CS();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function RS(t) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const l = CS(), o = () => {
      const h = l.reduce((m, g) => {
        const p = R4(g);
        return p > m ? p : m;
      }, 0);
      i(h > t);
    };
    o();
    const d = { passive: !0 };
    for (const h of l)
      h.addEventListener("scroll", o, d);
    return () => {
      for (const h of l)
        h.removeEventListener("scroll", o, d);
    };
  }, [t]), a;
}
const MS = 360;
var _4 = "_1s59p180", A4 = "_1s59p181", D4 = "_1s59p182", z4 = "_1s59p183", k4 = "_1s59p184", O4 = "_1s59p185", L4 = "_1s59p186", U4 = "_1s59p188", B4 = "_1s59p189", Eb = "_1s59p18a", $4 = "_1s59p18c", V4 = "_1s59p18d", H4 = "_1s59p18e", q4 = "_1s59p18f", I4 = "_1s59p18g", F4 = "_1s59p18i";
function Y4(t) {
  const a = Ji(), [i, l] = y.useState("idle"), [o, d] = y.useState(null), [h, m] = y.useState(/* @__PURE__ */ new Map()), [g, p] = y.useState(null), [b, v] = y.useState(null), w = y.useRef(null);
  y.useEffect(() => () => {
    w.current?.();
  }, []), y.useEffect(() => {
    Zk({ busy: i === "starting" || i === "running" });
  }, [i]);
  const S = y.useCallback(
    (q) => {
      const ie = q.status;
      (ie === "completed" || ie === "partial") && fn.success(
        ie === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
        {
          action: {
            label: "Artifacts",
            onClick: () => {
              a(`/${t.deploymentId}?tab=artifacts`);
            }
          }
        }
      );
    },
    [a, t.deploymentId]
  ), j = y.useCallback(async () => {
    l("starting"), p(null), m(/* @__PURE__ */ new Map()), v(null);
    try {
      const q = await TT(t.deploymentId, t.createPayload);
      d(q.runId), l("running"), w.current?.(), w.current = Ly(
        t.deploymentId,
        q.runId,
        (ie) => Nb(
          ie,
          m,
          l,
          (M) => {
            v(M), S(M);
          },
          t.deploymentId,
          q.runId
        ),
        () => l("error")
      );
    } catch (q) {
      l("error"), p(Of(q));
    }
  }, [t.deploymentId, t.createPayload, S]);
  y.useEffect(() => Jk(() => {
    (i === "idle" || i === "terminal" || i === "error") && j();
  }), [i, j]);
  const N = y.useCallback(async () => {
    if (o)
      try {
        await CT(t.deploymentId, o);
      } catch (q) {
        p(Of(q));
      }
  }, [t.deploymentId, o]), C = Array.from(h.values()).sort((q, ie) => q.globalIndex - ie.globalIndex), R = i === "starting" || i === "running", D = b?.status === "partial", O = C.filter((q) => q.status === "running").length, T = C.filter((q) => q.status === "completed").length, V = i === "starting" || i === "running" || C.length > 0, K = C.filter((q) => q.status === "failed"), ne = (() => {
    if (i !== "terminal" || K.length === 0) return null;
    const q = /* @__PURE__ */ new Map();
    for (const Q of K) {
      const F = Q.failureCategory ?? "unknown";
      q.set(F, (q.get(F) ?? 0) + 1);
    }
    let ie = "unknown", M = 0;
    for (const [Q, F] of q)
      F > M && (ie = Q, M = F);
    const J = C.length;
    return { category: ie, count: M, total: J };
  })(), _ = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, Y = "Check the run detail page for the per-segment error log.", $ = g?.toLowerCase().includes("unmapped") ?? !1, se = t.diagnostics ?? [], ae = se.find((q) => q.status === "fail"), ee = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", ue = !t.canGenerate || R || !!ae, W = i === "starting" || i === "running", z = W ? "running" : ue ? "blocked" : "idle", H = !RS(MS) || W;
  return /* @__PURE__ */ c.jsxs("div", { className: _4, children: [
    /* @__PURE__ */ c.jsxs("div", { className: A4, children: [
      /* @__PURE__ */ c.jsxs("div", { className: z4, children: [
        /* @__PURE__ */ c.jsxs("span", { className: k4, children: [
          /* @__PURE__ */ c.jsx("span", { className: D4, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          V && /* @__PURE__ */ c.jsxs("span", { className: I4, children: [
            /* @__PURE__ */ c.jsx("span", { className: F4, "aria-hidden": "true" }),
            O > 0 ? `${O} in flight` : `${T} done`
          ] })
        ] }),
        se.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: O4, "aria-label": "Pre-flight checks", children: se.map((q) => /* @__PURE__ */ c.jsxs("li", { className: L4, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: U4,
              "data-status": q.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: B4, children: q.label }),
          q.detail && /* @__PURE__ */ c.jsx("span", { className: Eb, children: q.detail })
        ] }, q.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Eb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: $4, "data-state": z, children: [
        H ? /* @__PURE__ */ c.jsxs(
          $e,
          {
            variant: "primary",
            size: "sm",
            onClick: j,
            disabled: ue,
            loading: W,
            children: [
              !W && /* @__PURE__ */ c.jsx("span", { className: V4, "aria-hidden": "true", children: "▶" }),
              ee
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: H4, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: q4, children: "↑" })
        ] }),
        R && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            onClick: N,
            "aria-label": "Cancel current run",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    g && /* @__PURE__ */ c.jsxs(
      zn,
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
          /* @__PURE__ */ c.jsx("span", { children: g }),
          $ && /* @__PURE__ */ c.jsx(
            $e,
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
    ne && /* @__PURE__ */ c.jsxs(zn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        ne.count,
        " of ",
        ne.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: ne.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: _[ne.category] ?? Y })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${Ix.secondary} ${Fx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    D && b && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "secondary",
          disabled: !!ae,
          onClick: async () => {
            try {
              const q = await Vx(t.deploymentId, b.runId);
              d(q.runId), m(/* @__PURE__ */ new Map()), v(null), l("running"), w.current?.(), w.current = Ly(
                t.deploymentId,
                q.runId,
                (ie) => Nb(ie, m, l, v, t.deploymentId, q.runId),
                () => l("error")
              );
            } catch (q) {
              p(Of(q)), l("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: mR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: C.map((q) => /* @__PURE__ */ c.jsxs("tr", { className: pR, children: [
        /* @__PURE__ */ c.jsx("td", { className: fr, children: q.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: /* @__PURE__ */ c.jsx(Qr, { tone: G4(q.status), children: q.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: q.durationMs ? `${q.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: q.failureCategory ?? "" })
      ] }, q.globalIndex)) })
    ] })
  ] });
}
async function Nb(t, a, i, l, o, d) {
  switch (t.type) {
    case "segment_started":
      a((h) => {
        const m = new Map(h);
        return m.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), m;
      });
      return;
    case "segment_completed":
      a((h) => {
        const m = new Map(h);
        return m.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), m;
      });
      return;
    case "segment_failed":
      a((h) => {
        const m = new Map(h);
        return m.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "failed",
          failureCategory: t.failureCategory
        }), m;
      });
      return;
    case "run_terminal":
      i("terminal");
      try {
        const h = await Uh(o, d);
        l(h);
      } catch {
      }
      return;
  }
}
function G4(t) {
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
function Of(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
var X4 = "pz3uk70", P4 = "pz3uk71", K4 = "pz3uk72", Q4 = "pz3uk73", Z4 = "pz3uk74", J4 = "pz3uk75", W4 = "pz3uk76", eO = "pz3uk77";
const tO = y.forwardRef(
  function({ checked: a, onChange: i, label: l, hint: o, disabled: d, id: h, className: m, emphasis: g = !1 }, p) {
    const b = (v) => {
      i(v.currentTarget.checked);
    };
    return /* @__PURE__ */ c.jsxs(
      "label",
      {
        className: `${X4} ${g && a ? P4 : ""} ${m ?? ""}`,
        "data-disabled": d || void 0,
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: p,
              id: h,
              type: "checkbox",
              className: K4,
              checked: a,
              onChange: b,
              disabled: d
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: Q4, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${Z4}`, children: "check" }) }),
          (l || o) && /* @__PURE__ */ c.jsxs("span", { className: J4, children: [
            l && /* @__PURE__ */ c.jsx("span", { className: W4, children: l }),
            o && /* @__PURE__ */ c.jsx("span", { className: eO, children: o })
          ] })
        ]
      }
    );
  }
);
var nO = "xq3iim0", aO = "xq3iim1", rO = "xq3iim2", iO = "xq3iim3", sO = "xq3iim4", lO = "xq3iim5", oO = "xq3iim6", cO = "xq3iim7", uO = "xq3iim8", dO = "xq3iim9", fO = "xq3iima", hO = "xq3iimb", mO = "xq3iimc", pO = "xq3iimd", vO = "xq3iime", gO = "xq3iimf", yO = "xq3iimg", bO = "xq3iimh", xO = "xq3iimi", SO = "xq3iimj", wO = "xq3iimk", Tb = "xq3iiml";
function jO({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [l, o] = y.useState([]), [d, h] = y.useState(a), [m, g] = y.useState(!0), [p, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), N = y.useRef(null), C = y.useRef(null);
  y.useEffect(() => {
    let T = !1;
    return g(!0), Xi(t).then(({ voiceAssets: V }) => {
      T || o(V);
    }).catch((V) => {
      T || w(V instanceof Error ? V.message : "Failed to load voices");
    }).finally(() => {
      T || g(!1);
    }), () => {
      T = !0;
    };
  }, [t]), y.useEffect(() => {
    if (!S) return;
    const T = (K) => {
      N.current && (K.target instanceof Node && N.current.contains(K.target) || j(!1));
    }, V = (K) => {
      K.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", T), document.addEventListener("keydown", V), () => {
      document.removeEventListener("mousedown", T), document.removeEventListener("keydown", V);
    };
  }, [S]);
  const R = y.useCallback(
    async (T) => {
      b(!0), w(null);
      const V = d, K = T === d ? null : T;
      h(K), j(!1);
      try {
        await wT(t, K), i?.(K);
      } catch (ne) {
        h(V), w(ne instanceof Error ? ne.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, i, d]
  ), D = y.useMemo(
    () => l.find((T) => T.voiceAssetId === d) ?? null,
    [l, d]
  ), O = y.useMemo(() => {
    const T = [], V = [];
    for (const K of l)
      K.kind === "speaker" || K.kind === "mixed" ? T.push(K) : V.push(K);
    return { uploaded: T, other: V };
  }, [l]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: Tb, children: "Loading voices…" }) : l.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Tb, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: nO, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: C,
        type: "button",
        className: `${aO} ${S ? rO : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: p,
        onClick: () => j((T) => !T),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: iO, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: sO, children: [
            /* @__PURE__ */ c.jsx("span", { className: lO, children: D ? D.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: oO, children: D ? _S(D) : `${l.length} voice${l.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: cO, "aria-hidden": "true", children: EO.map((T, V) => /* @__PURE__ */ c.jsx("i", { style: { height: `${T * 100}%` } }, V)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${uO}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: dO,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: fO, children: /* @__PURE__ */ c.jsx("span", { className: hO, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: mO, role: "alert", children: v }),
          O.uploaded.length > 0 && /* @__PURE__ */ c.jsx(Cb, { label: "Uploaded", children: O.uploaded.map((T) => /* @__PURE__ */ c.jsx(
            Rb,
            {
              voice: T,
              selected: d === T.voiceAssetId,
              onSelect: () => void R(T.voiceAssetId)
            },
            T.voiceAssetId
          )) }),
          O.other.length > 0 && /* @__PURE__ */ c.jsx(Cb, { label: "Other", children: O.other.map((T) => /* @__PURE__ */ c.jsx(
            Rb,
            {
              voice: T,
              selected: d === T.voiceAssetId,
              onSelect: () => void R(T.voiceAssetId)
            },
            T.voiceAssetId
          )) })
        ]
      }
    )
  ] });
}
function Cb({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: pO, children: [
    /* @__PURE__ */ c.jsx("div", { className: vO, children: t }),
    a
  ] });
}
function Rb({ voice: t, selected: a, onSelect: i }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${gO} ${a ? yO : ""}`,
      onClick: i,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: bO, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: xO, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: SO, children: _S(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${wO}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const EO = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function _S(t) {
  const a = [];
  return t.durationMs != null && a.push(NO(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function NO(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), l = Math.round(a - i * 60);
  return `${i}:${l.toString().padStart(2, "0")}`;
}
const Mb = [
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
function TO(t) {
  const a = Ji(), i = y.useRef(null), { tokens: l, attributions: o, unresolved: d, predictedFilenames: h, characterColor: m } = y.useMemo(
    () => RO(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), g = (b) => {
    const v = i.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? cR : sR, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: i, className: lR, "aria-hidden": "true", children: l.map((b, v) => CO(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? uR : oR,
          value: t.value,
          onChange: (b) => t.onChange(b.currentTarget.value),
          onScroll: p ? void 0 : g,
          placeholder: p ? "Type or paste plain text. The selected voice will read every word." : `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    d.length > 0 && /* @__PURE__ */ c.jsxs(zn, { severity: "error", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      d.map((b) => /* @__PURE__ */ c.jsxs(
        $e,
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
      /* @__PURE__ */ c.jsx("span", { className: Ii, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: t0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
        "#",
        b.lineNumber.toString().padStart(3, "0"),
        " [",
        b.character,
        "] ",
        b.text,
        !b.hasMapping && b.character !== "Narrator" && " — unresolved"
      ] }, b.lineNumber)) })
    ] }),
    h.length > 0 && /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx("span", { className: Ii, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: t0, children: h.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function CO(t, a, i) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: e0, children: t.raw }),
      `
`
    ] }, a);
  const l = i.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? Wy : `${Wy} ${dR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: l }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: fR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: e0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function RO(t, a, i) {
  const l = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], d = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), g = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let w = 0;
  return v.forEach((S, j) => {
    const N = S.trim();
    if (!N) {
      o.push({ kind: "blank", raw: S });
      return;
    }
    const C = j + 1, R = N.match(l);
    let D = "Narrator", O = N, T, V = !1;
    if (R?.groups) {
      V = !0;
      const Y = (R.groups.body ?? "").trim(), $ = (R.groups.rest ?? "").trim();
      D = ((Y.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", T = (Y.includes("|") ? Y.slice(Y.indexOf("|") + 1) : "").trim() || void 0, O = $;
    }
    w += 1;
    const K = D.toLowerCase(), ne = (m.get(K) ?? 0) + 1;
    m.set(K, ne);
    const _ = D === "Narrator" || i.has(K);
    if (_ || h.add(D), D !== "Narrator" && !p.has(K) && (p.set(K, Mb[b % Mb.length] ?? "currentColor"), b += 1), V) {
      const Y = { kind: "character", raw: S, character: D, text: O, hasMapping: _ };
      T !== void 0 && (Y.override = T), o.push(Y);
    } else
      o.push({ kind: "narrator", raw: S });
    d.push({ lineNumber: C, character: D, text: O, hasMapping: _ }), g.push(
      `${w.toString().padStart(3, "0")}_${MO(D)}_${ne.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: d,
    unresolved: Array.from(h),
    predictedFilenames: g,
    characterColor: p
  };
}
function MO(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
var _O = "_5o8xvy0", AO = "_5o8xvy1", DO = "_5o8xvy2", zO = "_5o8xvy3", Lf = "_5o8xvy4", kO = "_3f2ar0", OO = "_3f2ar1", LO = "_3f2ar2", UO = "_3f2ar3", BO = "_3f2ar4", $O = "_3f2ar6", tl = "_3f2ar7", nl = "_3f2ar8", al = "_3f2ar9", _b = "_3f2ara", Ab = "_3f2arb";
function VO({ label: t, glyph: a = "?", children: i }) {
  const [l, o] = y.useState(!1), d = y.useRef(null), h = y.useId(), m = `${h}-content`, g = y.useCallback(() => o(!1), []);
  return y.useEffect(() => {
    if (!l) return;
    const p = (v) => {
      d.current && (v.target instanceof Node && d.current.contains(v.target) || g());
    }, b = (v) => {
      v.key === "Escape" && g();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", b);
    };
  }, [l, g]), /* @__PURE__ */ c.jsxs("span", { ref: d, className: kO, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: OO,
        "aria-expanded": l,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: LO, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    l && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": h,
        className: UO,
        children: i
      }
    )
  ] });
}
var HO = "_1dxb1dg0", Db = "_1dxb1dg1", qO = "_1dxb1dg2", IO = "_1dxb1dg3", FO = "_1dxb1dg4";
function YO() {
  return /* @__PURE__ */ c.jsxs(VO, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: BO, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: $O, children: [
      /* @__PURE__ */ c.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ c.jsx("code", { className: nl, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: al, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ c.jsx("code", { className: nl, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: al, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ c.jsx("code", { className: nl, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: al, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ c.jsx("code", { className: nl, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: al, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ c.jsx("code", { className: nl, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: al, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: _b, children: [
      /* @__PURE__ */ c.jsx("span", { className: Ab, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: _b, children: [
      /* @__PURE__ */ c.jsx("span", { className: Ab, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function GO() {
  return /* @__PURE__ */ c.jsxs("ul", { className: HO, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Db, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Db, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: qO, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: IO, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: FO, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function XO({
  quickMode: t,
  onToggleQuickMode: a,
  deployment: i,
  script: l,
  onScriptChange: o,
  outputFormat: d,
  mappingsByLower: h,
  defaultVoiceAssetId: m,
  onDefaultVoiceAssetIdChange: g
}) {
  const p = l.length, b = l.trim() ? l.trim().split(/\s+/).length : 0, v = l.trim() ? l.trim().split(/\r?\n/).filter((w) => w.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: _O, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${AO} ${t ? DO : ""}`,
        "data-quick-on": t || void 0,
        children: [
          /* @__PURE__ */ c.jsx(
            tO,
            {
              checked: t,
              onChange: a,
              emphasis: !0,
              label: "Quick mode",
              hint: "single voice · plain prose · no character syntax"
            }
          ),
          t && /* @__PURE__ */ c.jsx(
            jO,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: m,
              onChange: g
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: zO, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Lf, children: p.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Lf, children: v.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Lf, children: b.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            /* @__PURE__ */ c.jsx(YO, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx(
      TO,
      {
        value: l,
        onChange: o,
        outputFormat: d,
        mappings: h,
        deploymentId: i.deploymentId,
        quickMode: t
      }
    ),
    !t && /* @__PURE__ */ c.jsx(GO, {})
  ] });
}
function PO({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: l,
  unmappedCount: o,
  globalEmotion: d,
  performance: h
}) {
  const m = [], g = t.trim();
  if (!g)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = g.split(/\r?\n/).filter((b) => b.trim()).length;
    m.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${p} lines · ${g.length} chars`
    });
  }
  if (a ? m.push({
    id: "voice",
    status: i ? "ok" : "warn",
    label: "Quick voice",
    detail: i ? "default voice set" : "no default voice"
  }) : l.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${l.length} mapped` }) : m.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), d.mode === "qwen_template" && !d.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (d.mode === "emotion_vector") {
    const p = d.vector, b = Array.isArray(p) && p.some((v) => Math.abs(v) > 0.01);
    m.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else d.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const Uf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], KO = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function QO(t) {
  const a = [];
  if (!t) return a;
  const i = t.split(/\r?\n/);
  for (let l = 0; l < i.length; l += 1) {
    const d = (i[l] ?? "").trim();
    if (d.length === 0) continue;
    const h = d.match(KO);
    if (!h || !h.groups) {
      a.push({ idx: l, character: null, text: d, override: null });
      continue;
    }
    const m = h.groups.body ?? "", g = (h.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: l, character: null, text: g || d, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? ZO(S) : null;
    a.push({
      idx: l,
      character: w,
      text: g,
      override: j
    });
  }
  return a;
}
function ZO(t) {
  const a = t.trim();
  if (!a) return { kind: "raw", label: "" };
  const i = a.indexOf(":"), l = i >= 0 ? a.slice(0, i).trim().toLowerCase() : a.toLowerCase(), o = i >= 0 ? a.slice(i + 1).trim() : "";
  switch (l) {
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
function JO(t) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const l of t) {
    if (!l.character) continue;
    const o = l.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(l.character));
  }
  return i;
}
function WO(t) {
  const a = {};
  for (let i = 0; i < t.length; i += 1) {
    const l = t[i];
    l && (a[l] = Uf[i % Uf.length] ?? Uf[0]);
  }
  return a;
}
function e6(t) {
  const a = {};
  for (const i of t)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var t6 = "_1snzz30", n6 = "_1snzz31", a6 = "_1snzz33", r6 = "_1snzz34", i6 = "_1snzz36", zb = "_1snzz3b", kb = "_1snzz3c", Ob = "_1snzz3d";
const s6 = "ext-action-invoke", l6 = "emotion-tts.run";
function o6() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(s6, {
      detail: { id: l6 },
      bubbles: !1
    })
  ), !0) : !1;
}
const c6 = 4e3;
function u6({ visible: t, canGenerate: a }) {
  const [i, l] = y.useState(null), [o, d] = y.useState(!1), [h, m] = y.useState(!1), g = y.useRef(null);
  y.useEffect(() => {
    let L = !1;
    const H = async () => {
      try {
        const ie = await vc();
        L || (g.current = ie, l(ie));
      } catch {
      }
    };
    H();
    const q = window.setInterval(H, c6);
    return () => {
      L = !0, window.clearInterval(q);
    };
  }, []), y.useEffect(() => NS((L) => {
    m(!!L.busy);
  }), []);
  const p = y.useCallback(() => {
    Qk();
  }, []), b = i?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  y.useEffect(() => {
    o && (w || v) && d(!1);
  }, [o, w, v]);
  const j = y.useCallback(() => {
    d(!0), o6();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", C = o || w, R = o || w, D = R ? "transitioning" : v ? "running" : "stopped", O = !a || h || !S, T = S ? a ? h ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", V = S && a && !h, K = v ? "ready" : w || o ? "busy" : "off", ne = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", _ = K === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const Y = "rgba(28, 30, 34, 0.94)", $ = "#ba9eff", se = "#8455ef", ae = "#1a0a3a", ee = "#f0f0f3", ue = "#aaabae", W = "#22c55e", z = v ? "◼" : "⏻";
  return Bh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: t6,
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
          background: Y,
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
              className: n6,
              "data-tone": K,
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
                color: K === "ready" ? W : K === "busy" ? $ : ue,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${K === "ready" ? "rgba(34, 197, 94, 0.4)" : K === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: a6,
                    "data-pulse": _ ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: K === "ready" ? `0 0 8px ${W}` : K === "busy" ? `0 0 8px ${$}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ne
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: kb, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: r6,
                "data-state": D,
                onClick: j,
                disabled: C,
                "aria-label": N,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: D === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: D === "running" ? W : ee,
                  fontSize: "16px",
                  cursor: C ? "not-allowed" : "pointer",
                  opacity: C ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${D === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: R ? /* @__PURE__ */ c.jsx("span", { className: zb, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: z })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Ob, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: kb, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: i6,
                "data-ready": V ? "true" : "false",
                onClick: p,
                disabled: O,
                "aria-label": T,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: O ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${$} 0%, ${se} 100%)`,
                  color: O ? ue : ae,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: O ? "not-allowed" : "pointer",
                  boxShadow: O ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  h ? /* @__PURE__ */ c.jsx("span", { className: zb, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: h ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Ob, role: "tooltip", children: T })
          ] })
        ]
      }
    ),
    document.body
  );
}
function d6(t) {
  const a = t.workflowCustomised ?? !1, i = t.unmappableFields ?? [], l = f6(t.deployment.displayName, t.deployment.deploymentId), o = RS(MS), d = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: VC, children: [
    /* @__PURE__ */ c.jsxs("header", { className: HC, children: [
      /* @__PURE__ */ c.jsx("div", { className: IC, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: qC, children: /* @__PURE__ */ c.jsx("h1", { className: FC, children: l }) }),
      /* @__PURE__ */ c.jsx("p", { className: YC, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: nR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: GC, children: [
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: t.scriptSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: t.parsedDialogueSection
        }
      ),
      t.voiceLibrarySection && /* @__PURE__ */ c.jsx(
        hr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: t.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: t.castSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: t.emotionSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: t.performanceSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: t.recentRunsSection
        }
      ),
      t.auditSection && /* @__PURE__ */ c.jsx(
        hr,
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
    /* @__PURE__ */ c.jsx(u6, { visible: o, canGenerate: d }),
    typeof document < "u" && Bh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: aR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: M4,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function f6(t, a) {
  const i = (t ?? "").trim();
  return !i || i === a ? "Recipe Studio" : i;
}
function hr({
  number: t,
  title: a,
  id: i,
  variant: l,
  defaultCollapsed: o = !1,
  children: d
}) {
  const [h, m] = y.useState(o), g = `${i}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: XC, "aria-labelledby": i, children: [
    /* @__PURE__ */ c.jsx("header", { className: PC, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: ZC,
        "aria-expanded": !h,
        "aria-controls": g,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: KC, children: [
            /* @__PURE__ */ c.jsx("span", { className: JC, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: WC, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: eR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: i, className: QC, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: tR,
              "data-collapsed": h ? "true" : "false",
              "aria-hidden": "true",
              children: "▾"
            }
          )
        ]
      }
    ) }),
    !h && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: g,
        className: l === "split" ? iR : rR,
        children: d
      }
    )
  ] });
}
const _n = {
  success(t) {
    fn.success(t);
  },
  error(t) {
    fn.error(t);
  }
}, yh = "__recipe";
function h6(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function m6(t) {
  const a = {};
  for (const i of Object.keys(t))
    i !== yh && (a[i] = t[i]);
  return a;
}
function p6() {
  const { deployment: t, mappings: a, runs: i, workflow: l } = wl(), [o, d] = y.useState(a), [h, m] = y.useState([]), [g, p] = y.useState([]), [b, v] = y.useState(null), [w, S] = y.useState(Oc), j = y.useMemo(
    () => t.defaultGenerationOverridesJson ? h6(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = y.useMemo(() => {
    const me = j[yh];
    return typeof me == "object" && me !== null ? me : {};
  }, [j]), [C, R] = y.useState(""), [D, O] = y.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [T, V] = y.useState(t.defaultSpeedFactor ?? 1), [K, ne] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [_, Y] = y.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...m6(j)
  })), [$, se] = y.useState(() => {
    const me = N.cachePolicy;
    return me === "use_cache" || me === "force_regenerate" || me === "read_only_cache" ? me : "use_cache";
  }), [ae, ee] = y.useState(
    t.defaultVoiceAssetId ?? null
  ), [ue, W] = y.useState(() => {
    const me = N.quickMode;
    return typeof me == "boolean" ? me : t.defaultVoiceAssetId != null;
  }), [z, L] = y.useState(k3);
  y.useEffect(() => {
    let me = !1;
    return Xi(t.deploymentId).then((Oe) => {
      me || m(Oe.voiceAssets);
    }).catch(() => {
    }), Yx(t.deploymentId).then((Oe) => {
      me || p(Oe.presets);
    }).catch(() => {
    }), () => {
      me = !0;
    };
  }, [t.deploymentId]);
  const H = y.useRef(!0);
  y.useEffect(() => {
    if (H.current) {
      H.current = !1;
      return;
    }
    const me = window.setTimeout(() => {
      const Oe = {
        ..._,
        [yh]: {
          quickMode: ue,
          cachePolicy: $
        }
      };
      ht(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: D,
          defaultSpeedFactor: T,
          defaultGenerationOverrides: Oe
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(me);
  }, [
    t.deploymentId,
    D,
    T,
    $,
    ue,
    _
  ]);
  const q = y.useMemo(() => QO(C), [C]), ie = y.useMemo(() => JO(q), [q]), M = y.useMemo(() => WO(ie), [ie]), J = y.useMemo(() => e6(q), [q]), Q = y.useMemo(() => {
    const me = /* @__PURE__ */ new Map();
    for (const Oe of o)
      me.set(Oe.characterName.toLowerCase(), Oe);
    return me;
  }, [o]), F = y.useMemo(() => ue && ae ? 0 : ie.filter((me) => !Q.has(me.toLowerCase())).length, [ie, Q, ue, ae]), le = y.useCallback(
    async (me, Oe) => {
      const De = Q.get(me.toLowerCase());
      try {
        if (De) {
          const Re = await ol(t.deploymentId, De.mappingId, Oe);
          d(
            (bt) => bt.map((xt) => xt.mappingId === Re.mappingId ? Re : xt)
          ), _n.success(`Updated mapping for ${me}`);
        } else if (Oe.speakerVoiceAssetId) {
          const Re = await Lh(t.deploymentId, {
            ...Oe,
            characterName: me,
            speakerVoiceAssetId: Oe.speakerVoiceAssetId
          });
          d((bt) => [...bt, Re]), _n.success(`Mapped ${me} to voice`);
        }
      } catch (Re) {
        _n.error(Re instanceof Error ? Re.message : "mapping failed");
      }
    },
    [Q, t.deploymentId]
  ), de = y.useCallback(
    async (me) => {
      const Oe = Q.get(me.toLowerCase());
      if (Oe)
        try {
          await $x(t.deploymentId, Oe.mappingId), d((De) => De.filter((Re) => Re.mappingId !== Oe.mappingId)), _n.success(`Cleared mapping for ${me}`);
        } catch (De) {
          _n.error(De instanceof Error ? De.message : "clear failed");
        }
    },
    [Q, t.deploymentId]
  ), ve = y.useCallback(
    async (me, Oe) => {
      try {
        const De = await pc(
          t.deploymentId,
          Oe,
          Oe.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Re) => [De, ...Re]), await le(me, { speakerVoiceAssetId: De.voiceAssetId });
      } catch (De) {
        _n.error(De instanceof Error ? De.message : "upload failed");
      }
    },
    [t.deploymentId, le]
  ), Te = y.useCallback((me) => {
    S(me);
  }, []), Ve = y.useMemo(() => {
    const me = [], Oe = /* @__PURE__ */ new Set();
    for (const De of o) {
      const Re = De.speakerVoiceAssetId;
      if (!Re || Oe.has(Re)) continue;
      Oe.add(Re);
      const xt = h.find((un) => un.voiceAssetId === Re)?.displayName ?? `${De.characterName} · ${Re.slice(0, 8)}`;
      me.push({ kind: "voice_asset", id: Re, label: xt });
    }
    for (const De of h)
      Oe.has(De.voiceAssetId) || (Oe.add(De.voiceAssetId), me.push({ kind: "voice_asset", id: De.voiceAssetId, label: De.displayName }));
    return me;
  }, [o, h]), Zt = y.useCallback(
    async (me, Oe) => {
      if (me.kind !== "voice_asset") {
        _n.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let De;
      try {
        const Re = JSON.parse(Oe);
        if (typeof Re != "object" || Re === null || Re.version !== 1 || !Array.isArray(Re.ops))
          throw new Error("snapshot is not a valid EditChain");
        De = Re;
      } catch (Re) {
        _n.error(
          Re instanceof Error ? `Audit snapshot is malformed: ${Re.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Re = await Hx(me.id, t.deploymentId, {
          chain: De
        }), bt = o.filter((xt) => xt.speakerVoiceAssetId === me.id);
        await Promise.all(
          bt.map(
            (xt) => ol(t.deploymentId, xt.mappingId, {
              voiceAssetChainDigest: Re.chain_digest
            }).catch(() => null)
          )
        ), d(
          (xt) => xt.map(
            (un) => un.speakerVoiceAssetId === me.id ? { ...un, voiceAssetChainDigest: Re.chain_digest } : un
          )
        ), _n.success(`Reverted ${me.label} to a prior chain`);
      } catch (Re) {
        _n.error(Re instanceof Error ? Re.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Pt = y.useCallback(
    async (me) => {
      if (me.kind !== "voice_asset") {
        _n.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await LC(me.id, t.deploymentId);
        const Oe = o.filter((De) => De.speakerVoiceAssetId === me.id);
        await Promise.all(
          Oe.map(
            (De) => ol(t.deploymentId, De.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), d(
          (De) => De.map(
            (Re) => Re.speakerVoiceAssetId === me.id ? { ...Re, voiceAssetChainDigest: null } : Re
          )
        ), _n.success(`Cleared edit chain on ${me.label}`);
      } catch (Oe) {
        _n.error(Oe instanceof Error ? Oe.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), At = y.useMemo(
    () => ({
      script: C,
      parserMode: ue ? "raw_text" : "dialogue",
      outputFormat: D,
      speedFactor: T,
      globalEmotion: { ...K, emotionAlpha: z.intensity },
      generation: _,
      cachePolicy: $
    }),
    [C, ue, D, T, z.intensity, K, _, $]
  ), et = y.useMemo(
    () => PO({
      script: C,
      quickMode: ue,
      defaultVoiceAssetId: ae,
      characters: ie,
      unmappedCount: F,
      globalEmotion: K,
      performance: z
    }),
    [C, ue, ae, ie, F, K, z]
  ), pt = y.useMemo(
    () => et.filter((me) => me.id !== "performance").map((me) => ({
      label: me.label,
      status: me.status === "ok" ? "ok" : me.status === "warn" ? "warn" : "fail",
      detail: me.detail
    })),
    [et]
  );
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(kC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ c.jsx(
      d6,
      {
        deployment: t,
        canGenerate: C.trim().length > 0,
        workflowCustomised: l.workflow.customised,
        unmappableFields: l.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(o_, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          Y4,
          {
            deploymentId: t.deploymentId,
            createPayload: At,
            canGenerate: C.trim().length > 0,
            diagnostics: pt
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          N4,
          {
            deploymentId: t.deploymentId,
            speedFactor: T
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          XO,
          {
            quickMode: ue,
            onToggleQuickMode: W,
            deployment: t,
            script: C,
            onScriptChange: R,
            outputFormat: D,
            mappingsByLower: Q,
            defaultVoiceAssetId: ae,
            onDefaultVoiceAssetIdChange: ee
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(N3, { lines: q, characterColors: M }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          xM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: h,
            mappings: o,
            characterColors: M,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(n_, { unmappedCount: F, totalCount: ie.length, children: ie.map((me) => {
          const Oe = Q.get(me.toLowerCase()) ?? null, De = M[me] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: vR, children: /* @__PURE__ */ c.jsx(
            t_,
            {
              characterName: me,
              color: De,
              lineCount: J[me] ?? 0,
              mapping: Oe,
              voiceAssets: h,
              presets: g,
              active: b === me,
              onToggle: () => v((Re) => Re === me ? null : me),
              onAssignVoiceAsset: (Re) => le(me, { speakerVoiceAssetId: Re }),
              onAssignPreset: (Re) => le(me, { defaultVectorPresetId: Re }),
              onUploadFile: (Re) => ve(me, Re),
              onClearMapping: () => de(me)
            }
          ) }, me);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          Z2,
          {
            value: K,
            onChange: ne,
            deploymentId: t.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            O3,
            {
              value: { ...z, pace: T },
              onChange: (me) => {
                L(me), me.pace !== T && V(me.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Hh,
            {
              state: w,
              onChange: Te,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(G3, { checks: et }),
          /* @__PURE__ */ c.jsx(
            p3,
            {
              outputFormat: D,
              onOutputFormatChange: O,
              speedFactor: T,
              onSpeedFactorChange: V,
              cachePolicy: $,
              onCachePolicyChange: se,
              generation: _,
              onGenerationChange: Y
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(W3, { runs: i, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          LM,
          {
            deploymentId: t.deploymentId,
            targets: Ve,
            onRevertToIdentity: Pt,
            onRevertToChain: Zt
          }
        )
      }
    )
  ] });
}
const Lb = /* @__PURE__ */ new Map();
function v6(t, a) {
  const [i, l] = y.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return y.useEffect(() => {
    if (!t || a <= 0) {
      l({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, d = Lb.get(o);
    if (d) {
      l({ peaks: d, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return l({ peaks: null, isLoading: !0, error: null }), g6(t, a, h.signal).then((m) => {
      h.signal.aborted || (Lb.set(o, m), l({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const g = m instanceof Error ? m.message : "decode failed";
      l({ peaks: null, isLoading: !1, error: g });
    }), () => h.abort();
  }, [t, a]), i;
}
async function g6(t, a, i) {
  const l = await fetch(t, { signal: i });
  if (!l.ok) throw new Error(`failed to load audio (${l.status})`);
  const o = await l.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return y6(h, a);
}
function y6(t, a) {
  const i = t.numberOfChannels, l = t.length, o = Math.max(1, Math.floor(l / a)), d = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const g = m * o, p = Math.min(l, g + o);
    let b = 0;
    for (let v = g; v < p; v += 1) {
      let w = 0;
      for (let j = 0; j < i; j += 1) {
        const N = h[j];
        N && (w += Math.abs(N[v] ?? 0));
      }
      const S = w / i;
      S > b && (b = S);
    }
    d[m] = b;
  }
  return d;
}
const Ub = "(prefers-reduced-motion: reduce)";
function b6() {
  const [t, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Ub).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(Ub), l = (o) => a(o.matches);
    return i.addEventListener("change", l), () => i.removeEventListener("change", l);
  }, []), t;
}
var x6 = "mquzal0", S6 = "mquzal1", Bb = "mquzal2", $b = "mquzal3", Vb = "mquzal4", w6 = "mquzal5", Hb = "mquzal6", qb = "mquzal7";
const j6 = 120, E6 = 720;
function AS(t) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: l,
    endMs: o,
    onChangeStart: d,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: g = 0,
    onSeek: p,
    width: b = E6,
    height: v = j6
  } = t, w = y.useRef(null), S = y.useRef(null), j = y.useRef(null), N = v6(a, b), C = b6();
  y.useEffect(() => {
    N6(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const R = y.useCallback(
    (_) => {
      const Y = S.current?.getBoundingClientRect();
      if (!Y || Y.width <= 0) return 0;
      const $ = Math.max(0, Math.min(1, (_ - Y.left) / Y.width));
      return Math.round($ * i);
    },
    [i]
  );
  y.useEffect(() => {
    const _ = ($) => {
      if (!j.current) return;
      const se = R($.clientX);
      j.current === "start" ? d(Jo(se, 0, o - 1)) : h(Jo(se, l + 1, i));
    }, Y = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", _), window.addEventListener("pointerup", Y), () => {
      window.removeEventListener("pointermove", _), window.removeEventListener("pointerup", Y);
    };
  }, [R, i, o, l, d, h]);
  const D = (_) => (Y) => {
    Y.preventDefault(), Y.stopPropagation(), j.current = _;
  }, O = (_) => {
    !p || _.target.closest("[data-handle]") || p(R(_.clientX));
  }, T = (_) => (Y) => {
    const $ = Y.shiftKey ? 100 : Y.ctrlKey ? 1 : 10;
    let se = 0;
    if (Y.key === "ArrowLeft") se = -$;
    else if (Y.key === "ArrowRight") se = $;
    else return;
    Y.preventDefault(), _ === "start" ? d(Jo(l + se, 0, o - 1)) : h(Jo(o + se, l + 1, i));
  }, V = Bf(l, i), K = Bf(o, i), ne = Bf(g, i);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: x6,
      style: { height: v },
      onPointerDown: O,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: S6,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: qb, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: qb, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: Hb, style: { left: 0, width: `${V}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: Hb,
            style: { left: `${K}%`, right: 0, width: `${100 - K}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Bb,
            style: { left: `${V}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": l,
            tabIndex: 0,
            onPointerDown: D("start"),
            onKeyDown: T("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: $b, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Vb, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Bb,
            style: { left: `${K}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: D("end"),
            onKeyDown: T("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: $b, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Vb, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: w6,
            style: {
              left: `${ne}%`,
              transition: C ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Bf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function Jo(t, a, i) {
  return Math.max(a, Math.min(i, t));
}
function N6(t, a, i, l) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, l), !a || a.length === 0)) return;
  const d = l / 2;
  o.fillStyle = T6(t, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const g = a[m] ?? 0, p = Math.max(1, g * (l - 4));
    o.fillRect(m, d - p / 2, 1, p);
  }
}
function T6(t, a, i) {
  return getComputedStyle(t).getPropertyValue(a).trim() || i;
}
var C6 = "r8lfsm0", R6 = "r8lfsm1", M6 = "r8lfsm2", _6 = "r8lfsm3", A6 = "r8lfsm4", D6 = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, z6 = "_1b1zchy3", k6 = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, O6 = "_1b1zchy6", L6 = "_1b1zchy7";
const DS = y.createContext("standalone");
function zS({
  variant: t = "standalone",
  children: a,
  className: i,
  style: l,
  ...o
}) {
  const d = [D6[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(DS.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: d, style: l, ...o, children: a }) });
}
function kS({
  title: t,
  meta: a,
  children: i,
  className: l,
  titleId: o
}) {
  const d = y.useContext(DS), h = [z6, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: h, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: k6[d], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: O6, children: a }) : null,
    i
  ] });
}
function OS({
  children: t,
  className: a,
  role: i = "group"
}) {
  const l = [L6, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: l, role: i, children: t });
}
const Ib = -16, U6 = 80, B6 = 720;
function $6(t) {
  const { deploymentId: a, runId: i, utterance: l, audioUrl: o, onApplied: d, onError: h, onCancel: m } = t, g = l.durationMs ?? 0, [p, b] = y.useState(() => Fb(g)), [v, w] = y.useState(Oc), [S, j] = y.useState(!1), [N, C] = y.useState(!1), [R, D] = y.useState(null), [O, T] = y.useState(!1), V = y.useRef(null), K = y.useRef(null), ne = y.useRef(null);
  y.useEffect(() => {
    const H = Fb(g);
    b(H), w(Wx(H)), C(!1), D(null), ne.current = null;
  }, [l.utteranceId, g]);
  const _ = y.useCallback((H) => {
    w(H), b((q) => Jx(q, H));
  }, []);
  y.useEffect(() => () => K.current?.abort(), []), y.useEffect(() => {
    V.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [l.utteranceId]);
  const Y = y.useCallback(
    (H) => {
      H.key === "Escape" && (H.stopPropagation(), m());
    },
    [m]
  ), $ = y.useMemo(
    () => p.ops.find((H) => H.mode === "trim"),
    [p.ops]
  ), se = $?.start_ms ?? 0, ae = $?.end_ms ?? Math.max(1, g), ee = y.useCallback((H, q) => {
    b((ie) => V6(ie, "trim", (M) => ({
      ...M,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(H)),
      end_ms: Math.max(Math.floor(H) + 1, Math.floor(q))
    })));
  }, []), ue = y.useCallback((H) => ee(H, ae), [ae, ee]), W = y.useCallback((H) => ee(se, H), [se, ee]), z = y.useCallback((H) => {
    C(H), b((q) => {
      const ie = q.ops.filter((M) => M.mode !== "normalize");
      if (H) {
        const M = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Ib
        };
        return { ...q, ops: [...ie, M] };
      }
      return { ...q, ops: ie };
    });
  }, []), L = y.useCallback(async () => {
    const H = qx(p, g);
    if (H) {
      D(H.message);
      return;
    }
    if (D(null), O) return;
    K.current?.abort();
    const q = new AbortController();
    K.current = q, T(!0);
    try {
      const ie = ne.current ?? void 0, M = await OC(
        a,
        i,
        l.utteranceId,
        ie ? { chain: p, digest_before: ie } : { chain: p },
        { signal: q.signal }
      );
      if (q.signal.aborted) return;
      ne.current = M.chain_digest, d(M);
    } catch (ie) {
      if (q.signal.aborted) return;
      ie instanceof Pi && (ne.current = ie.currentDigest || null);
      const M = ie instanceof Pi ? "Edit chain has changed in another tab. Reload to continue." : ie instanceof Error ? ie.message : "apply failed";
      D(M), h(M);
    } finally {
      q.signal.aborted || T(!1);
    }
  }, [p, g, O, a, i, l.utteranceId, d, h]);
  return /* @__PURE__ */ c.jsx(zS, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: V, onKeyDown: Y, children: [
    /* @__PURE__ */ c.jsx(kS, { title: "Edit segment", meta: `Source · ${Wo(g)}` }),
    /* @__PURE__ */ c.jsx(
      AS,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: se,
        endMs: ae,
        onChangeStart: ue,
        onChangeEnd: W,
        height: U6,
        width: B6
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: C6, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: R6, children: [
        Wo(se),
        " → ",
        Wo(ae),
        " · ",
        Wo(ae - se)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: M6, children: [
      /* @__PURE__ */ c.jsxs("label", { className: _6, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (H) => z(H.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          Ib.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: A6,
          onClick: () => j((H) => !H),
          "aria-expanded": S,
          children: [
            S ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ c.jsx(
      Hh,
      {
        state: v,
        onChange: _,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(OS, { children: [
      /* @__PURE__ */ c.jsx($e, { size: "sm", onClick: () => void L(), disabled: O, children: O ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: m, disabled: O, children: "Cancel" })
    ] }),
    R && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: R })
  ] }) });
}
function Fb(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function V6(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function Wo(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var H6 = "jq2zyb2", q6 = "jq2zyb3", I6 = "jq2zyb4", F6 = "jq2zyb5", Y6 = "jq2zyb6", G6 = "jq2zyb7", X6 = "jq2zyb8", P6 = "jq2zyb9", K6 = "jq2zyba", Q6 = "jq2zybb", Z6 = "jq2zybc", J6 = "jq2zybd", W6 = "jq2zybe", eL = "jq2zybf jq2zybe", tL = "jq2zybg", nL = "jq2zybh", aL = "jq2zybi", rL = "jq2zybj", iL = "jq2zybk", sL = "jq2zybl", lL = "jq2zybm", oL = "jq2zybn", cL = "jq2zybo", uL = "jq2zybp", dL = "jq2zybq", fL = "jq2zybr", hL = "jq2zybs", mL = "jq2zybt", pL = "jq2zybu", vL = "jq2zybv", gL = "jq2zybw", yL = "jq2zybx", bL = "jq2zyby", Yb = "jq2zybz", xL = "jq2zyb10", SL = "jq2zyb11", wL = "jq2zyb12";
const jL = ["cancelled", "failed", "partial"], EL = 2600;
function NL() {
  const { run: t } = wl(), a = Ji(), [i, l] = y.useState(t), [o, d] = y.useState(!1), [h, m] = y.useState(null), [g, p] = y.useState(null), [b, v] = y.useState(
    null
  );
  y.useEffect(() => {
    l(t);
  }, [t]), y.useEffect(() => {
    if (!b) return;
    const T = setTimeout(() => v(null), EL);
    return () => clearTimeout(T);
  }, [b]);
  const w = y.useMemo(() => RL(i), [i]), S = jL.includes(i.status) && i.kind === "batch", j = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      d(!0), m(null);
      try {
        const { runId: T } = await Vx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${T}`);
      } catch (T) {
        m(AL(T));
      } finally {
        d(!1);
      }
    }
  }, C = y.useCallback((T) => {
    p((V) => V === T ? null : T);
  }, []), R = y.useCallback(() => {
    p(null);
  }, []), D = (T, V) => {
    l((K) => CL(K, T, V)), p(null), v({ message: "Segment edited", severity: "success" });
  }, O = y.useCallback((T) => {
    v({ message: T, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: H6, children: [
    /* @__PURE__ */ c.jsxs("div", { className: q6, children: [
      /* @__PURE__ */ c.jsxs("header", { className: I6, children: [
        /* @__PURE__ */ c.jsxs("p", { className: F6, children: [
          i.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Oh, { to: `/${i.deploymentId}/recipe`, className: Y6, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: G6, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: X6, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: P6, children: [
            ML(i.kind),
            /* @__PURE__ */ c.jsx("span", { className: K6, children: i.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Qr, { size: "md", tone: DL(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: Q6, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(ec, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(ec, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          ec,
          {
            label: "Completed",
            value: `${w.completed} / ${w.total}`,
            progress: w.total > 0 ? w.completed / w.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          ec,
          {
            label: "Cache hit",
            value: `${w.cacheRatio}%`,
            progress: w.cacheRatio / 100
          }
        )
      ] }),
      S && /* @__PURE__ */ c.jsxs("section", { className: nL, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: aL, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: rL, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: iL, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx($e, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ c.jsx("p", { className: sL, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ c.jsxs(Ua, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(HT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Xr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: lL, children: [
            /* @__PURE__ */ c.jsx("span", { className: oL, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: cL, children: i.utterances.map((T) => {
          const V = g === T.utteranceId, K = T.status === "completed" && T.audioArtifactRef !== null && T.audioArtifactRef !== void 0, ne = T.derivedArtifactRef ?? T.audioArtifactRef ?? null, _ = ne ? `/api/v1/artifacts/${encodeURIComponent(ne)}/download` : "", Y = (T.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: dL, children: [
            /* @__PURE__ */ c.jsxs("div", { className: uL, children: [
              /* @__PURE__ */ c.jsxs("span", { className: hL, children: [
                "#",
                T.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: mL, title: T.characterDisplay, children: T.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: pL, title: T.text, children: T.text }),
              /* @__PURE__ */ c.jsxs("span", { className: vL, children: [
                T.cacheHit && /* @__PURE__ */ c.jsx("span", { className: gL, children: "cached" }),
                Y && /* @__PURE__ */ c.jsx("span", { className: fL, children: "edited" }),
                T.durationMs ? /* @__PURE__ */ c.jsx("span", { children: _L(T.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Qr, { tone: zL(T.status), children: T.status }),
                K && /* @__PURE__ */ c.jsx(
                  $e,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => C(T.utteranceId),
                    "aria-expanded": V,
                    "aria-label": V ? "Close segment editor" : "Edit segment",
                    children: V ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            V && _ && i.deploymentId && /* @__PURE__ */ c.jsx(
              $6,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: T,
                audioUrl: _,
                onApplied: ($) => D(T.utteranceId, $),
                onError: O,
                onCancel: R
              }
            )
          ] }, T.utteranceId);
        }) })
      ] }),
      TL(i, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: wL,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function TL(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const l = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: yL, children: a ? /* @__PURE__ */ c.jsxs("div", { className: xL, children: [
    /* @__PURE__ */ c.jsx("p", { className: SL, children: l }),
    /* @__PURE__ */ c.jsxs(
      $e,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: Yb, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: bL,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: Yb, children: "↓" })
      ]
    }
  ) : null });
}
function CL(t, a, i) {
  const l = t.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: i.derived_artifact_ref,
    durationMs: i.derived_duration_ms
  });
  return {
    ...t,
    utterances: l,
    exportZipStaleAt: t.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function ec({ label: t, value: a, mono: i, progress: l }) {
  const o = l !== void 0 ? Math.min(1, Math.max(0, l)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: Z6,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: J6, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: i ? eL : W6, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: tL, "aria-hidden": "true" })
      ]
    }
  );
}
function RL(t) {
  const a = t.utterances.length, i = t.utterances.filter((h) => h.status === "completed").length, l = t.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = t.utterances.filter((h) => h.cacheHit).length, d = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: l, cached: o, cacheRatio: d };
}
function ML(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function _L(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function AL(t) {
  return t instanceof Wi ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function DL(t) {
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
function zL(t) {
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
var kL = "pcphqj2", OL = "pcphqj3", LL = "pcphqj4", UL = "pcphqj5", BL = "pcphqj6", $L = "pcphqj7", VL = "pcphqj8", HL = "pcphqj9", qL = "pcphqja", Gb = "pcphqjb", IL = "pcphqjc", FL = "pcphqjd", YL = "pcphqje pcphqjd", GL = "pcphqjf", XL = "pcphqjg", PL = "pcphqjh", KL = "pcphqji", QL = "pcphqjj pcphqji", ZL = "pcphqjk pcphqji", JL = "pcphqjl pcphqji", WL = "pcphqjm", $f = "pcphqjn", Vf = "pcphqjo";
function e8() {
  const [t, a] = y.useState(null), [i, l] = y.useState(null);
  return y.useEffect(() => {
    let o = !1;
    const d = async () => {
      try {
        const m = await ht("/runtime/queue");
        o || (a(m.entries), l(null));
      } catch (m) {
        o || l(m instanceof Error ? m.message : "Unknown error");
      }
    };
    d();
    const h = setInterval(() => void d(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ c.jsx("main", { className: kL, children: /* @__PURE__ */ c.jsxs("div", { className: OL, children: [
    /* @__PURE__ */ c.jsxs("header", { className: LL, children: [
      /* @__PURE__ */ c.jsx("p", { className: UL, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: BL, children: [
        /* @__PURE__ */ c.jsx("h1", { className: $L, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: VL, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: HL, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ c.jsx(zn, { severity: "error", children: i }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Ua, { density: "compact", children: /* @__PURE__ */ c.jsx(zc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Ua, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Xr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: qL, children: t.map((o) => {
        const d = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: d ? `${Gb} ${IL}` : Gb,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: d ? YL : FL, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: GL, children: [
                /* @__PURE__ */ c.jsx("span", { className: XL, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: PL, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: t8(o.kind), children: n8(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: WL, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: $f, children: a8(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: Vf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: $f, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: Vf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: $f, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: Vf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function t8(t) {
  switch (t) {
    case "batch":
      return QL;
    case "test_line":
      return ZL;
    case "resume":
      return JL;
    default:
      return KL;
  }
}
function n8(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function a8(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), i = t % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function r8() {
  const { deploymentId: t, prefillCharacterName: a } = wl(), i = Ji(), [l, o] = y.useState(a), [d, h] = y.useState(""), [m, g] = y.useState("none"), [p, b] = y.useState(!1), [v, w] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await Lh(t, {
        characterName: l,
        speakerVoiceAssetId: d,
        defaultEmotionMode: m
      }), i(`/${t}/recipe`);
    } catch (C) {
      w(C instanceof Error ? C.message : "failed");
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
            value: l,
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
            value: d,
            onChange: (N) => h(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ c.jsxs("select", { value: m, onChange: (N) => g(N.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx($e, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: v })
    ] })
  ] });
}
var i8 = "_1oor31e0", s8 = "_1oor31e1", l8 = "_1oor31e2", o8 = "_1oor31e3", c8 = "_1oor31e4", u8 = "_1oor31e5", d8 = "_1oor31e6", f8 = "_1oor31e7", h8 = "_1oor31e8";
const m8 = 8;
function p8(t) {
  const { entries: a, loading: i, error: l } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: i8, "aria-busy": !!i, children: [
    l && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: l }),
    i && !l && /* @__PURE__ */ c.jsx("div", { className: h8, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !l && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: f8, children: "No edits yet" }),
    !i && !l && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: s8, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: l8, children: [
      /* @__PURE__ */ c.jsx("span", { className: o8, children: g8(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: c8, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: u8, title: o.digest_after, children: v8(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: d8, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function v8(t) {
  return t ? `${t.slice(0, m8)}…` : "—";
}
function g8(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Xb = "_1c63kaw0", y8 = "_1c63kaw1", b8 = "_1c63kaw2", x8 = "_1c63kaw3", S8 = "_1c63kaw4", w8 = "_1c63kaw5", j8 = "_1c63kaw6";
function E8({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Xb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: y8, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Xb, "data-testid": "edit-chain-list", children: t.ops.map((i, l) => /* @__PURE__ */ c.jsxs("li", { className: b8, children: [
    /* @__PURE__ */ c.jsxs("span", { className: x8, "aria-hidden": "true", children: [
      l + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: S8, children: [
      /* @__PURE__ */ c.jsx("span", { className: w8, children: Pb(i) }),
      /* @__PURE__ */ c.jsx("span", { className: j8, children: N8(i) })
    ] }),
    /* @__PURE__ */ c.jsx(
      $e,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Pb(i)} (position ${l + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Pb(t) {
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
function N8(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Kb(t.start_ms)} → ${Kb(t.end_ms)}`;
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
      return `${Hf(t.low_db)} / ${Hf(t.mid_db)} / ${Hf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Hf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function Kb(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var tc = "_1o3ytop0", qf = "_1o3ytop1", Qb = "_1o3ytop2", T8 = "_1o3ytop3", C8 = "_1o3ytop4", R8 = "_1o3ytop5", M8 = "_1o3ytop6", _8 = "_1o3ytop7", nc = "_1o3ytop8", A8 = "_1o3ytop9", D8 = "_1o3ytopf", z8 = "_1o3ytopg", k8 = "_1o3ytoph", O8 = "_1o3ytopi", L8 = "_1o3ytopj", U8 = "_1o3ytopk", B8 = "_1t0zy2f0", $8 = "_1t0zy2f1", V8 = "_1t0zy2f2";
function H8({ content: t, children: a, delayMs: i = 350 }) {
  const [l, o] = y.useState(!1), d = y.useId(), h = y.useRef(null), m = y.useCallback(() => {
    h.current != null && (window.clearTimeout(h.current), h.current = null);
  }, []), g = y.useCallback(() => {
    m(), h.current = window.setTimeout(() => o(!0), i);
  }, [m, i]), p = y.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (y.useEffect(() => () => m(), [m]), y.useEffect(() => {
    if (!l) return;
    const v = (w) => {
      w.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [l]), !y.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: g,
    onMouseLeave: p,
    onFocus: g,
    onBlur: p,
    "aria-describedby": l ? d : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: B8, children: [
    y.cloneElement(a, b),
    l && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: d, className: V8, children: t })
  ] });
}
function ac({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(H8, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: $8, children: "?" }) });
}
const Zb = -16;
function q8(t) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: l = [],
    onChainPersisted: o,
    onError: d
  } = t, h = a.durationMs ?? 0, m = y.useMemo(
    () => I8(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, p] = y.useState(() => If(h)), [b, v] = y.useState(Oc), [w, S] = y.useState(!1), [j, N] = y.useState(null), [C, R] = y.useState(null), [D, O] = y.useState(!1), [T, V] = y.useState(!1), [K, ne] = y.useState(!1), [_, Y] = y.useState(null), [$, se] = y.useState([]), [ae, ee] = y.useState(null), [ue, W] = y.useState([]), [z, L] = y.useState(!1), [H, q] = y.useState(null), [ie, M] = y.useState(0), J = y.useRef(null), Q = y.useRef(null), F = y.useRef(null), le = y.useRef(null), de = y.useRef(null), ve = y.useRef(0), Te = y.useMemo(
    () => g.ops.some((be) => be.mode === "normalize"),
    [g.ops]
  );
  y.useEffect(() => {
    const be = If(h);
    p(be), v(Wx(be)), N(null), ne(!1), se([]), ee(null), de.current = null;
  }, [a.voiceAssetId, h]);
  const Ve = y.useCallback((be) => {
    v(be), p((ze) => Jx(ze, be));
  }, []);
  y.useEffect(() => {
    le.current?.abort();
    const be = new AbortController();
    return le.current = be, L(!0), q(null), oc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: be.signal
    }).then((ze) => {
      be.signal.aborted || W(ze.entries);
    }).catch((ze) => {
      if (be.signal.aborted) return;
      const Qe = ze instanceof Error ? ze.message : "audit fetch failed";
      q(Qe);
    }).finally(() => {
      be.signal.aborted || L(!1);
    }), () => be.abort();
  }, [i, a.voiceAssetId, ie]), y.useEffect(() => () => {
    C && URL.revokeObjectURL(C);
  }, [C]), y.useEffect(() => () => {
    Q.current?.abort(), F.current?.abort(), le.current?.abort();
  }, []);
  const Zt = g.ops.find((be) => be.mode === "trim"), Pt = g.ops.find((be) => be.mode === "normalize"), At = Zt?.start_ms ?? 0, et = Zt?.end_ms ?? Math.max(1, h), pt = y.useCallback((be, ze) => {
    p(
      (Qe) => Jb(
        Qe,
        "trim",
        (nt) => ({
          ...nt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(be)),
          end_ms: Math.max(Math.floor(be) + 1, Math.floor(ze))
        })
      )
    );
  }, []), me = y.useCallback(
    (be) => pt(be, et),
    [et, pt]
  ), Oe = y.useCallback(
    (be) => pt(At, be),
    [At, pt]
  ), De = y.useCallback((be) => {
    p((ze) => {
      const Qe = ze.ops.filter((nt) => nt.mode !== "normalize");
      if (be) {
        const nt = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Zb
        };
        return { ...ze, ops: [...Qe, nt] };
      }
      return { ...ze, ops: Qe };
    });
  }, []), Re = y.useCallback(
    (be) => {
      const ze = g.ops.findIndex((It) => It.id === be);
      if (ze === -1) return;
      const Qe = g.ops[ze];
      if (!Qe) return;
      const nt = [...g.ops.slice(0, ze), ...g.ops.slice(ze + 1)];
      p({ ...g, ops: nt }), se((It) => [...It, { op: Qe, index: ze }]);
    },
    [g]
  ), bt = y.useCallback(() => {
    const be = $[$.length - 1];
    if (!be) return;
    const ze = Math.min(be.index, g.ops.length), Qe = [...g.ops.slice(0, ze), be.op, ...g.ops.slice(ze)];
    p({ ...g, ops: Qe }), se($.slice(0, -1));
  }, [g, $]), xt = y.useCallback(() => {
    const be = qx(g, h);
    return be ? (N(be.message), !1) : (N(null), !0);
  }, [g, h]), un = y.useCallback(async () => {
    if (!xt() || D) return;
    Q.current?.abort();
    const be = new AbortController();
    Q.current = be;
    const ze = ++ve.current;
    V(!0);
    try {
      const Qe = await UC(a.voiceAssetId, i, g, {
        signal: be.signal
      });
      if (be.signal.aborted || ze !== ve.current) return;
      C && URL.revokeObjectURL(C);
      const nt = URL.createObjectURL(Qe);
      R(nt), ne(!0), requestAnimationFrame(() => J.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (be.signal.aborted) return;
      const nt = Qe instanceof Error ? Qe.message : "preview failed";
      N(nt), d(nt);
    } finally {
      be.signal.aborted || V(!1);
    }
  }, [xt, D, a.voiceAssetId, i, g, C, d]), Ht = y.useCallback(async () => {
    if (!xt() || T || D) return;
    if (l.length > 1) {
      const ze = l.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${l.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    Q.current?.abort(), F.current?.abort();
    const be = new AbortController();
    F.current = be, O(!0);
    try {
      const ze = de.current ?? void 0, Qe = await Hx(
        a.voiceAssetId,
        i,
        ze ? { chain: g, digest_before: ze } : { chain: g },
        { signal: be.signal }
      );
      if (be.signal.aborted) return;
      de.current = Qe.chain_digest, ee(Qe.chain_digest), N(null), Y(Qe.measured_lufs ?? null), se([]), o(Qe), M((nt) => nt + 1);
    } catch (ze) {
      if (be.signal.aborted) return;
      const Qe = ze instanceof Pi;
      ze instanceof Pi && (de.current = ze.currentDigest || null);
      const nt = Qe ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      N(nt), d(nt);
    } finally {
      be.signal.aborted || O(!1);
    }
  }, [
    xt,
    T,
    D,
    l,
    a.voiceAssetId,
    i,
    g,
    o,
    d
  ]), kn = y.useCallback(() => {
    Q.current?.abort(), p(If(h)), N(null), Y(null), ne(!1), se([]), M((be) => be + 1), C && (URL.revokeObjectURL(C), R(null));
  }, [h, C]), qt = y.useCallback((be) => {
    p(
      (ze) => Jb(
        ze,
        "normalize",
        (Qe) => ({
          ...Qe,
          mode: "normalize",
          target_lufs: be
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(zS, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      kS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${rc(h)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      AS,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: At,
        endMs: et,
        onChangeStart: me,
        onChangeEnd: Oe
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: tc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: qf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          ac,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Qb, children: [
        rc(At),
        " → ",
        rc(et),
        " · ",
        rc(et - At)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: _8, children: [
      /* @__PURE__ */ c.jsxs("div", { className: nc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: tc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: qf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              ac,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          Te && Pt && /* @__PURE__ */ c.jsxs("span", { className: D8, children: [
            "target ",
            Pt.target_lufs.toFixed(1),
            " LUFS",
            _ !== null && ` · measured ${_.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: A8, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: Te,
              onChange: (be) => De(be.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Zb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Te && Pt && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: k8,
            min: -30,
            max: -6,
            step: 0.5,
            value: Pt.target_lufs,
            onChange: (be) => qt(Number(be.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: nc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: tc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: qf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              ac,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: Qb, children: g.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(E8, { chain: g, onRemoveOp: Re })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: nc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: T8,
            onClick: () => S((be) => !be),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: C8, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: R8, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                ac,
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
          Hh,
          {
            state: b,
            onChange: Ve,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      ae && /* @__PURE__ */ c.jsx("div", { className: nc, children: /* @__PURE__ */ c.jsxs("span", { className: tc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: M8, title: ae, children: [
          ae.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(OS, { children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "secondary",
          onClick: () => void un(),
          disabled: T || D,
          children: T ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          onClick: () => void Ht(),
          disabled: D || T,
          children: D ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "ghost",
          onClick: kn,
          disabled: D || T,
          children: "Reset"
        }
      ),
      $.length > 0 && /* @__PURE__ */ c.jsxs(
        $e,
        {
          variant: "ghost",
          size: "sm",
          onClick: bt,
          disabled: D || T,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            $.length,
            ")"
          ]
        }
      ),
      K && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: U8,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    C && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: J,
        src: C,
        controls: !0,
        className: z8,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: O8, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: L8, children: [
        "Edit history",
        ue.length > 0 ? ` · ${ue.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        p8,
        {
          entries: ue,
          loading: z,
          error: H
        }
      )
    ] })
  ] });
}
function If(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Jb(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function rc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function I8(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var F8 = "go9vi12", Y8 = "go9vi13", G8 = "go9vi14", X8 = "go9vi15", P8 = "go9vi16", K8 = "go9vi17", Q8 = "go9vi18", Z8 = "go9vi19", J8 = "go9vi1a", W8 = "go9vi1b go9vi1a", eU = "go9vi1c", tU = "go9vi1d", nU = "go9vi1e", aU = "go9vi1f", rU = "go9vi1g", iU = "go9vi1h", sU = "go9vi1i", lU = "go9vi1j", Wb = "go9vi1k", oU = "go9vi1l", cU = "go9vi1m", uU = "go9vi1n", Cc = "go9vi1o", dU = "go9vi1q", fU = "go9vi1r go9vi1q", hU = "go9vi1s go9vi1q", mU = "go9vi1t", pU = "go9vi1u", vU = "go9vi1v", gU = "go9vi1w", LS = "go9vi1x", yU = "go9vi1y", bU = "go9vi1z", xU = "go9vi110 go9vi1o", SU = "go9vi111", wU = "go9vi112", jU = "go9vi113", EU = "go9vi114", NU = "go9vi115", TU = "go9vi116";
function CU() {
  const { deployment: t, mappings: a, voiceAssets: i } = wl(), l = Ji(), [o, d] = y.useState(a), [h, m] = y.useState(i), [g, p] = y.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = y.useState(""), [w, S] = y.useState(null), [j, N] = y.useState(null), [C, R] = y.useState(null), [D, O] = y.useState(null), [T, V] = y.useState(0), K = y.useCallback(() => {
    l(`/${t.deploymentId}/recipe`);
  }, [l, t.deploymentId]), ne = y.useCallback((F) => {
    O(F), window.setTimeout(() => {
      O((le) => le === F ? null : le);
    }, 1600);
  }, []), _ = y.useMemo(() => {
    const F = /* @__PURE__ */ new Map();
    for (const le of h) F.set(le.voiceAssetId, le);
    return F;
  }, [h]), Y = y.useMemo(() => {
    const F = b.trim().toLowerCase();
    return F ? o.filter((le) => le.characterName.toLowerCase().includes(F)) : o;
  }, [o, b]), $ = y.useMemo(
    () => o.find((F) => F.mappingId === g) ?? null,
    [o, g]
  );
  y.useEffect(() => {
    d(a), m(i), p(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!j) return;
    const F = setTimeout(() => N(null), 2600);
    return () => clearTimeout(F);
  }, [j]);
  const se = y.useCallback(async () => {
    const F = await Xi(t.deploymentId);
    m(F.voiceAssets);
  }, [t.deploymentId]), ae = y.useCallback(
    (F) => {
      d(
        (le) => le.map((de) => de.mappingId === g ? { ...de, ...F } : de)
      );
    },
    [g]
  ), ee = y.useCallback(
    async (F) => {
      if (!$) return;
      const le = $;
      try {
        const de = await ol(t.deploymentId, $.mappingId, F);
        d((ve) => ve.map((Te) => Te.mappingId === de.mappingId ? de : Te)), Object.prototype.hasOwnProperty.call(F, "characterName") && ne(de.mappingId);
      } catch (de) {
        d(
          (ve) => ve.map((Te) => Te.mappingId === le.mappingId ? le : Te)
        ), S(mr(de));
      }
    },
    [$, t.deploymentId, ne]
  ), ue = y.useCallback(async () => {
    const F = h[0];
    if (!F) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const le = kU(o), de = await Lh(t.deploymentId, {
        characterName: le,
        speakerVoiceAssetId: F.voiceAssetId
      });
      d((ve) => [...ve, de]), p(de.mappingId), V((ve) => ve + 1);
    } catch (le) {
      S(mr(le));
    }
  }, [t.deploymentId, h, o]), W = y.useCallback(() => {
    $ && R({ id: $.mappingId, name: $.characterName });
  }, [$]), z = y.useCallback(async () => {
    if (!C) return;
    const { id: F, name: le } = C;
    R(null);
    try {
      await $x(t.deploymentId, F), d((de) => de.filter((ve) => ve.mappingId !== F)), p(null), N(`Mapping for ${le} deactivated.`);
    } catch (de) {
      S(mr(de));
    }
  }, [t.deploymentId, C]), L = y.useCallback(
    async (F, le, de) => {
      try {
        const ve = await pc(t.deploymentId, F, le, de);
        return m((Te) => [ve, ...Te]), N(`${ve.displayName} uploaded.`), ve;
      } catch (ve) {
        return S(mr(ve)), null;
      }
    },
    [t.deploymentId]
  ), H = y.useCallback(async () => {
    try {
      const F = await jT(t.deploymentId);
      $U(F, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (F) {
      S(mr(F));
    }
  }, [t.deploymentId]), q = y.useCallback(
    async (F, le) => {
      try {
        const de = await ET(
          t.deploymentId,
          F.mappings,
          le
        );
        N(
          `Imported ${de.created.length} • skipped ${de.skipped.length} • replaced ${de.replaced.length}.`
        );
        const ve = await Xi(t.deploymentId);
        m(ve.voiceAssets);
      } catch (de) {
        S(mr(de));
      }
    },
    [t.deploymentId]
  ), ie = y.useCallback(
    async (F) => {
      if (await se(), $ && F.chain_digest)
        try {
          const le = await ol(t.deploymentId, $.mappingId, {
            voiceAssetChainDigest: F.chain_digest
          });
          d(
            (de) => de.map((ve) => ve.mappingId === le.mappingId ? le : ve)
          );
        } catch (le) {
          S(mr(le));
        }
      N("Edit applied.");
    },
    [se, $, t.deploymentId]
  ), M = y.useCallback((F) => {
    S(F);
  }, []), J = y.useCallback(
    async (F, le) => {
      if (!$) return null;
      const de = F.trim() || `[${$.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await RT(t.deploymentId, {
          line: de,
          outputFormat: le
        })).runId };
      } catch (ve) {
        return S(mr(ve)), null;
      }
    },
    [t.deploymentId, $]
  ), Q = h.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: F8, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: Y8, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: G8,
          onClick: K,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: X8, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: P8, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: K8, children: [
            o.length,
            " active · ",
            h.length,
            " ",
            Q
          ] })
        ] }),
        /* @__PURE__ */ c.jsx($e, { variant: "primary", size: "sm", onClick: ue, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: Q8,
          placeholder: "Search characters",
          value: b,
          onChange: (F) => v(F.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(zU, { onExport: H, onImport: q, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: Z8, children: Y.length === 0 ? /* @__PURE__ */ c.jsx(
        zc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : Y.map((F) => {
        const le = _.get(F.speakerVoiceAssetId), de = F.mappingId === g;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: de ? W8 : J8,
            onClick: () => p(F.mappingId),
            "aria-pressed": de,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: eU, "aria-hidden": "true", children: OU(F.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: tU, children: [
                /* @__PURE__ */ c.jsx("span", { className: nU, children: F.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: aU, children: le?.displayName ?? "no voice" })
              ] })
            ]
          },
          F.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: rU, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(om, { features: fm, children: /* @__PURE__ */ c.jsx(gS, { children: j && /* @__PURE__ */ c.jsx(
        dm.div,
        {
          className: yU,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: j
        },
        j
      ) }) }),
      w && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: w }),
      C && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          C.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx($e, { variant: "danger", size: "sm", onClick: () => void z(), children: "Delete" }),
        /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: () => R(null), children: "Cancel" })
      ] }),
      $ ? /* @__PURE__ */ c.jsx(
        MU,
        {
          deploymentId: t.deploymentId,
          mapping: $,
          voiceAssets: h,
          allMappings: o,
          onNameChange: (F) => {
            ae({ characterName: F });
          },
          onNameSave: (F) => {
            const le = F.trim();
            le && ee({ characterName: le });
          },
          savedHint: D === $.mappingId,
          autoFocusNonce: T,
          onSpeakerChange: (F) => {
            ae({ speakerVoiceAssetId: F }), ee({ speakerVoiceAssetId: F });
          },
          onDelete: W,
          onUploadVoice: async (F, le, de) => {
            const ve = await L(F, le, de);
            return ve && de === "speaker" && (ae({ speakerVoiceAssetId: ve.voiceAssetId }), ee({ speakerVoiceAssetId: ve.voiceAssetId })), await se(), ve;
          },
          onTestLine: J,
          onEditChainPersisted: ie,
          onEditError: M
        },
        $.mappingId
      ) : /* @__PURE__ */ c.jsx(
        RU,
        {
          voiceCount: h.length,
          onUploadVoice: async (F) => {
            await L(F, F.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function RU({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Ua, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: jU, children: [
      /* @__PURE__ */ c.jsx("p", { className: Xr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: EU, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: NU, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      US,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Ua, { density: "airy", children: /* @__PURE__ */ c.jsx(
    zc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function MU(t) {
  const { mapping: a, voiceAssets: i, allMappings: l } = t, o = i.find((R) => R.voiceAssetId === a.speakerVoiceAssetId) ?? null, d = y.useMemo(
    () => l.filter(
      (R) => R.isActive && R.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((R) => R.characterName),
    [l, a.speakerVoiceAssetId]
  ), [h, m] = y.useState(""), [g, p] = y.useState("mp3"), [b, v] = y.useState("idle"), [w, S] = y.useState(null), j = y.useRef(!1), N = y.useRef(null);
  y.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), y.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const R = N.current;
    R && (R.focus(), R.select());
  }, [t.autoFocusNonce]);
  const C = y.useCallback(async () => {
    j.current = !1, v("running"), S(null);
    const R = await t.onTestLine(h, g);
    if (j.current) return;
    if (!R) {
      v("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: D } = R;
    for (let O = 0; O < 60; O += 1) {
      if (await new Promise((T) => setTimeout(T, 500)), j.current) return;
      try {
        const T = await Uh(t.deploymentId, D);
        if (j.current) return;
        if (T.status === "completed") {
          v("done");
          return;
        }
        if (T.status === "failed" || T.status === "cancelled") {
          v("error"), S(`Run ${T.status}.`);
          return;
        }
      } catch (T) {
        if (j.current) return;
        v("error"), S(T instanceof Error ? T.message : "unknown error");
        return;
      }
    }
    j.current || (v("error"), S("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, h, g]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: iU, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Xr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: sU, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: LS, children: /* @__PURE__ */ c.jsx($e, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ua,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: bU,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: xU,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: h,
              onChange: (R) => m(R.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: b === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Cc,
              value: g,
              onChange: (R) => p(R.currentTarget.value),
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
            $e,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void C(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(Qr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && w && /* @__PURE__ */ c.jsx(Qr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: lU, children: [
      /* @__PURE__ */ c.jsxs(Ua, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Xr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: uU, children: [
          /* @__PURE__ */ c.jsxs("span", { className: oU, children: [
            /* @__PURE__ */ c.jsx("span", { className: Wb, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: cU,
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
              className: Cc,
              value: a.characterName,
              onChange: (R) => t.onNameChange(R.currentTarget.value),
              onBlur: (R) => t.onNameSave(R.currentTarget.value),
              onKeyDown: (R) => {
                R.key === "Enter" && (R.preventDefault(), R.currentTarget.blur());
              },
              placeholder: "Type a name and press Enter"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(Ua, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Xr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Wb, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          _U,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(AU, { voice: o }),
        /* @__PURE__ */ c.jsx(
          US,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (R) => t.onUploadVoice(R, R.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          q8,
          {
            voiceAsset: o,
            deploymentId: t.deploymentId,
            affectedCharacterNames: d,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        )
      ] })
    ] })
  ] });
}
function _U({
  value: t,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: Cc,
      value: t,
      onChange: (l) => i(l.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ c.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((l) => /* @__PURE__ */ c.jsx("option", { value: l.voiceAssetId, children: l.displayName }, l.voiceAssetId))
      ]
    }
  );
}
function AU({ voice: t }) {
  const a = LU(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: mU, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: UU(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: pU, children: [
      /* @__PURE__ */ c.jsx("div", { className: vU, children: /* @__PURE__ */ c.jsx(om, { features: fm, children: /* @__PURE__ */ c.jsx(
        dm.div,
        {
          className: gU,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Qr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(DU, { seed: t.contentSha256 })
  ] });
}
function DU({ seed: t }) {
  const a = y.useMemo(() => BU(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: SU, "aria-hidden": "true", children: a.map((i, l) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: wU,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${t}-${l}`
  )) });
}
function US({
  label: t,
  onFile: a
}) {
  const [i, l] = y.useState(!1), [o, d] = y.useState(!1), h = y.useRef(null), m = y.useCallback(
    async (g) => {
      d(!0);
      try {
        await a(g);
      } finally {
        d(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: o ? hU : i ? fU : dU,
      onDragOver: (g) => {
        g.preventDefault(), l(!0);
      },
      onDragLeave: () => l(!1),
      onDrop: (g) => {
        g.preventDefault(), l(!1);
        const p = g.dataTransfer.files?.[0];
        p && m(p);
      },
      onClick: () => h.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), h.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: h,
            type: "file",
            accept: "audio/*",
            onChange: (g) => {
              const p = g.currentTarget.files?.[0];
              p && m(p), g.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function zU({
  onExport: t,
  onImport: a,
  onParseError: i
}) {
  const [l, o] = y.useState("error"), d = y.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: LS, children: [
    /* @__PURE__ */ c.jsx($e, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: d,
        type: "file",
        accept: "application/json,.json",
        className: TU,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const m = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!m)
            try {
              const g = await m.text(), p = JSON.parse(g);
              a(p, l);
            } catch {
              i("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ c.jsx($e, { variant: "secondary", size: "sm", onClick: () => d.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: Cc,
        value: l,
        onChange: (h) => o(h.currentTarget.value),
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
function kU(t) {
  const a = new Set(t.map((l) => l.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function OU(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function LU(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function UU(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function BU(t, a) {
  const i = [];
  for (let l = 0; l < a; l += 1) {
    const o = t.charCodeAt(l % t.length);
    i.push((o * 31 + l * 7) % 100 / 100);
  }
  return i;
}
function $U(t, a) {
  const i = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), l = URL.createObjectURL(i), o = document.createElement("a");
  o.href = l, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(l);
}
function mr(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
function VU() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await ST();
        return { deployments: t };
      },
      Component: iC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId");
        return ME(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), [i, { mappings: l }, { runs: o }, d] = await Promise.all([
          ky(a),
          Oy(a),
          NT(a, { limit: 10 }),
          DT(a)
        ]);
        return { deployment: i, mappings: l, runs: o, workflow: d };
      },
      Component: p6
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), i = $i(t, "runId");
        return { run: await Uh(a, i) };
      },
      Component: NL
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), [i, { mappings: l }, { voiceAssets: o }] = await Promise.all([
          ky(a),
          Oy(a),
          Xi(a)
        ]);
        return { deployment: i, mappings: l, voiceAssets: o };
      },
      Component: CU
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const i = $i(t, "deploymentId"), l = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: l.searchParams.get("character") ?? ""
        };
      },
      Component: r8
    },
    {
      path: "/runtime/queue",
      Component: e8
    }
  ];
}
function $i(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const ex = "ext-actions-request", HU = "ext-actions-declare", qU = "ext-action-state", tx = "ext-action-invoke", bh = "emotion-tts:navigate", Hi = "emotion-tts.run", nx = "emotion-tts.mappings", IU = 4e3;
function FU(t, a) {
  let i = null, l = !1;
  const o = () => {
    const j = i?.badge ?? "not_installed";
    return YU(j, l);
  }, d = () => ({
    primary: o(),
    secondary: {
      id: nx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    t.dispatchEvent(
      new CustomEvent(HU, {
        detail: { actions: d() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(qU, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => h(), p = (j) => {
    const N = j.detail?.id;
    N === Hi ? b() : N === nx && t.dispatchEvent(
      new CustomEvent(bh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = i?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    l = !0, m();
    try {
      N ? await r_() : await a_();
      try {
        i = await vc();
      } catch {
      }
    } catch {
    } finally {
      l = !1, m();
    }
  };
  t.addEventListener(ex, g), t.addEventListener(tx, p);
  let v = !1;
  const w = async () => {
    try {
      const j = await vc();
      if (v) return;
      i = j, m();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), IU);
  return h(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(ex, g), t.removeEventListener(tx, p);
    }
  };
}
function YU(t, a) {
  const i = t === "ready" || t === "running" || t === "starting", l = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: Hi,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: Hi,
    label: Px(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : i ? {
    id: Hi,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : l ? {
    id: Hi,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: Hi,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const xh = "emotion-tts-app", GU = "ext-event", ax = "emotion-tts-stylesheet", rx = ["accent", "density", "card"];
function XU(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function PU() {
  if (typeof document > "u" || document.getElementById(ax)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = ax, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
PU();
class KU extends HTMLElement {
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
    this.root = eE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(bh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = FU(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const l = i.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(bh, a);
  }
  syncTweaksFromBody() {
    for (const a of rx) {
      const i = XU(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: rx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = LN(VU(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ c.jsx(y.StrictMode, { children: /* @__PURE__ */ c.jsx(BN, { router: i }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const i = this.getAttribute("deployment-id");
    return i && i.length > 0 ? `/${i}/recipe` : "/";
  }
  emitHostEvent(a, i) {
    this.dispatchEvent(
      new CustomEvent(GU, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function QU() {
  typeof customElements > "u" || customElements.get(xh) || customElements.define(xh, KU);
}
typeof customElements < "u" && !customElements.get(xh) && QU();
export {
  QU as register
};
//# sourceMappingURL=emotion-tts.js.map
