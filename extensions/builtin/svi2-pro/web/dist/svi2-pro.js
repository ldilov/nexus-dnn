function JE(e, a) {
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
function wm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nh = { exports: {} }, Ro = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kv;
function WE() {
  if (Kv) return Ro;
  Kv = 1;
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
  return Ro.Fragment = a, Ro.jsx = r, Ro.jsxs = r, Ro;
}
var Jv;
function e2() {
  return Jv || (Jv = 1, nh.exports = WE()), nh.exports;
}
var v = e2(), ah = { exports: {} }, Ie = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wv;
function t2() {
  if (Wv) return Ie;
  Wv = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), b = Symbol.iterator;
  function x(D) {
    return D === null || typeof D != "object" ? null : (D = b && D[b] || D["@@iterator"], typeof D == "function" ? D : null);
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
  }, E = Object.assign, N = {};
  function R(D, V, Z) {
    this.props = D, this.context = V, this.refs = N, this.updater = Z || _;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(D, V) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, V, "setState");
  }, R.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function j() {
  }
  j.prototype = R.prototype;
  function C(D, V, Z) {
    this.props = D, this.context = V, this.refs = N, this.updater = Z || _;
  }
  var O = C.prototype = new j();
  O.constructor = C, E(O, R.prototype), O.isPureReactComponent = !0;
  var B = Array.isArray;
  function k() {
  }
  var H = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function Y(D, V, Z) {
    var ee = Z.ref;
    return {
      $$typeof: e,
      type: D,
      key: V,
      ref: ee !== void 0 ? ee : null,
      props: Z
    };
  }
  function le(D, V) {
    return Y(D.type, V, D.props);
  }
  function q(D) {
    return typeof D == "object" && D !== null && D.$$typeof === e;
  }
  function Q(D) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(Z) {
      return V[Z];
    });
  }
  var ne = /\/+/g;
  function L(D, V) {
    return typeof D == "object" && D !== null && D.key != null ? Q("" + D.key) : V.toString(36);
  }
  function I(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(k, k) : (D.status = "pending", D.then(
          function(V) {
            D.status === "pending" && (D.status = "fulfilled", D.value = V);
          },
          function(V) {
            D.status === "pending" && (D.status = "rejected", D.reason = V);
          }
        )), D.status) {
          case "fulfilled":
            return D.value;
          case "rejected":
            throw D.reason;
        }
    }
    throw D;
  }
  function T(D, V, Z, ee, se) {
    var he = typeof D;
    (he === "undefined" || he === "boolean") && (D = null);
    var me = !1;
    if (D === null) me = !0;
    else
      switch (he) {
        case "bigint":
        case "string":
        case "number":
          me = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case e:
            case a:
              me = !0;
              break;
            case y:
              return me = D._init, T(
                me(D._payload),
                V,
                Z,
                ee,
                se
              );
          }
      }
    if (me)
      return se = se(D), me = ee === "" ? "." + L(D, 0) : ee, B(se) ? (Z = "", me != null && (Z = me.replace(ne, "$&/") + "/"), T(se, V, Z, "", function(Oe) {
        return Oe;
      })) : se != null && (q(se) && (se = le(
        se,
        Z + (se.key == null || D && D.key === se.key ? "" : ("" + se.key).replace(
          ne,
          "$&/"
        ) + "/") + me
      )), V.push(se)), 1;
    me = 0;
    var J = ee === "" ? "." : ee + ":";
    if (B(D))
      for (var ve = 0; ve < D.length; ve++)
        ee = D[ve], he = J + L(ee, ve), me += T(
          ee,
          V,
          Z,
          he,
          se
        );
    else if (ve = x(D), typeof ve == "function")
      for (D = ve.call(D), ve = 0; !(ee = D.next()).done; )
        ee = ee.value, he = J + L(ee, ve++), me += T(
          ee,
          V,
          Z,
          he,
          se
        );
    else if (he === "object") {
      if (typeof D.then == "function")
        return T(
          I(D),
          V,
          Z,
          ee,
          se
        );
      throw V = String(D), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return me;
  }
  function z(D, V, Z) {
    if (D == null) return D;
    var ee = [], se = 0;
    return T(D, ee, "", "", function(he) {
      return V.call(Z, he, se++);
    }), ee;
  }
  function G(D) {
    if (D._status === -1) {
      var V = D._result;
      V = V(), V.then(
        function(Z) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = Z);
        },
        function(Z) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = Z);
        }
      ), D._status === -1 && (D._status = 0, D._result = V);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var F = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var V = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(V)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, te = {
    map: z,
    forEach: function(D, V, Z) {
      z(
        D,
        function() {
          V.apply(this, arguments);
        },
        Z
      );
    },
    count: function(D) {
      var V = 0;
      return z(D, function() {
        V++;
      }), V;
    },
    toArray: function(D) {
      return z(D, function(V) {
        return V;
      }) || [];
    },
    only: function(D) {
      if (!q(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Ie.Activity = g, Ie.Children = te, Ie.Component = R, Ie.Fragment = r, Ie.Profiler = s, Ie.PureComponent = C, Ie.StrictMode = l, Ie.Suspense = p, Ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H, Ie.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return H.H.useMemoCache(D);
    }
  }, Ie.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, Ie.cacheSignal = function() {
    return null;
  }, Ie.cloneElement = function(D, V, Z) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var ee = E({}, D.props), se = D.key;
    if (V != null)
      for (he in V.key !== void 0 && (se = "" + V.key), V)
        !A.call(V, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && V.ref === void 0 || (ee[he] = V[he]);
    var he = arguments.length - 2;
    if (he === 1) ee.children = Z;
    else if (1 < he) {
      for (var me = Array(he), J = 0; J < he; J++)
        me[J] = arguments[J + 2];
      ee.children = me;
    }
    return Y(D.type, se, ee);
  }, Ie.createContext = function(D) {
    return D = {
      $$typeof: c,
      _currentValue: D,
      _currentValue2: D,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, D.Provider = D, D.Consumer = {
      $$typeof: u,
      _context: D
    }, D;
  }, Ie.createElement = function(D, V, Z) {
    var ee, se = {}, he = null;
    if (V != null)
      for (ee in V.key !== void 0 && (he = "" + V.key), V)
        A.call(V, ee) && ee !== "key" && ee !== "__self" && ee !== "__source" && (se[ee] = V[ee]);
    var me = arguments.length - 2;
    if (me === 1) se.children = Z;
    else if (1 < me) {
      for (var J = Array(me), ve = 0; ve < me; ve++)
        J[ve] = arguments[ve + 2];
      se.children = J;
    }
    if (D && D.defaultProps)
      for (ee in me = D.defaultProps, me)
        se[ee] === void 0 && (se[ee] = me[ee]);
    return Y(D, he, se);
  }, Ie.createRef = function() {
    return { current: null };
  }, Ie.forwardRef = function(D) {
    return { $$typeof: d, render: D };
  }, Ie.isValidElement = q, Ie.lazy = function(D) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: D },
      _init: G
    };
  }, Ie.memo = function(D, V) {
    return {
      $$typeof: m,
      type: D,
      compare: V === void 0 ? null : V
    };
  }, Ie.startTransition = function(D) {
    var V = H.T, Z = {};
    H.T = Z;
    try {
      var ee = D(), se = H.S;
      se !== null && se(Z, ee), typeof ee == "object" && ee !== null && typeof ee.then == "function" && ee.then(k, F);
    } catch (he) {
      F(he);
    } finally {
      V !== null && Z.types !== null && (V.types = Z.types), H.T = V;
    }
  }, Ie.unstable_useCacheRefresh = function() {
    return H.H.useCacheRefresh();
  }, Ie.use = function(D) {
    return H.H.use(D);
  }, Ie.useActionState = function(D, V, Z) {
    return H.H.useActionState(D, V, Z);
  }, Ie.useCallback = function(D, V) {
    return H.H.useCallback(D, V);
  }, Ie.useContext = function(D) {
    return H.H.useContext(D);
  }, Ie.useDebugValue = function() {
  }, Ie.useDeferredValue = function(D, V) {
    return H.H.useDeferredValue(D, V);
  }, Ie.useEffect = function(D, V) {
    return H.H.useEffect(D, V);
  }, Ie.useEffectEvent = function(D) {
    return H.H.useEffectEvent(D);
  }, Ie.useId = function() {
    return H.H.useId();
  }, Ie.useImperativeHandle = function(D, V, Z) {
    return H.H.useImperativeHandle(D, V, Z);
  }, Ie.useInsertionEffect = function(D, V) {
    return H.H.useInsertionEffect(D, V);
  }, Ie.useLayoutEffect = function(D, V) {
    return H.H.useLayoutEffect(D, V);
  }, Ie.useMemo = function(D, V) {
    return H.H.useMemo(D, V);
  }, Ie.useOptimistic = function(D, V) {
    return H.H.useOptimistic(D, V);
  }, Ie.useReducer = function(D, V, Z) {
    return H.H.useReducer(D, V, Z);
  }, Ie.useRef = function(D) {
    return H.H.useRef(D);
  }, Ie.useState = function(D) {
    return H.H.useState(D);
  }, Ie.useSyncExternalStore = function(D, V, Z) {
    return H.H.useSyncExternalStore(
      D,
      V,
      Z
    );
  }, Ie.useTransition = function() {
    return H.H.useTransition();
  }, Ie.version = "19.2.7", Ie;
}
var ey;
function ls() {
  return ey || (ey = 1, ah.exports = t2()), ah.exports;
}
var S = ls();
const be = /* @__PURE__ */ wm(S), n2 = /* @__PURE__ */ JE({
  __proto__: null,
  default: be
}, [S]);
var ih = { exports: {} }, To = {}, rh = { exports: {} }, lh = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ty;
function a2() {
  return ty || (ty = 1, (function(e) {
    function a(T, z) {
      var G = T.length;
      T.push(z);
      e: for (; 0 < G; ) {
        var F = G - 1 >>> 1, te = T[F];
        if (0 < s(te, z))
          T[F] = z, T[G] = te, G = F;
        else break e;
      }
    }
    function r(T) {
      return T.length === 0 ? null : T[0];
    }
    function l(T) {
      if (T.length === 0) return null;
      var z = T[0], G = T.pop();
      if (G !== z) {
        T[0] = G;
        e: for (var F = 0, te = T.length, D = te >>> 1; F < D; ) {
          var V = 2 * (F + 1) - 1, Z = T[V], ee = V + 1, se = T[ee];
          if (0 > s(Z, G))
            ee < te && 0 > s(se, Z) ? (T[F] = se, T[ee] = G, F = ee) : (T[F] = Z, T[V] = G, F = V);
          else if (ee < te && 0 > s(se, G))
            T[F] = se, T[ee] = G, F = ee;
          else break e;
        }
      }
      return z;
    }
    function s(T, z) {
      var G = T.sortIndex - z.sortIndex;
      return G !== 0 ? G : T.id - z.id;
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
    var p = [], m = [], y = 1, g = null, b = 3, x = !1, _ = !1, E = !1, N = !1, R = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, C = typeof setImmediate < "u" ? setImmediate : null;
    function O(T) {
      for (var z = r(m); z !== null; ) {
        if (z.callback === null) l(m);
        else if (z.startTime <= T)
          l(m), z.sortIndex = z.expirationTime, a(p, z);
        else break;
        z = r(m);
      }
    }
    function B(T) {
      if (E = !1, O(T), !_)
        if (r(p) !== null)
          _ = !0, k || (k = !0, Q());
        else {
          var z = r(m);
          z !== null && I(B, z.startTime - T);
        }
    }
    var k = !1, H = -1, A = 5, Y = -1;
    function le() {
      return N ? !0 : !(e.unstable_now() - Y < A);
    }
    function q() {
      if (N = !1, k) {
        var T = e.unstable_now();
        Y = T;
        var z = !0;
        try {
          e: {
            _ = !1, E && (E = !1, j(H), H = -1), x = !0;
            var G = b;
            try {
              t: {
                for (O(T), g = r(p); g !== null && !(g.expirationTime > T && le()); ) {
                  var F = g.callback;
                  if (typeof F == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var te = F(
                      g.expirationTime <= T
                    );
                    if (T = e.unstable_now(), typeof te == "function") {
                      g.callback = te, O(T), z = !0;
                      break t;
                    }
                    g === r(p) && l(p), O(T);
                  } else l(p);
                  g = r(p);
                }
                if (g !== null) z = !0;
                else {
                  var D = r(m);
                  D !== null && I(
                    B,
                    D.startTime - T
                  ), z = !1;
                }
              }
              break e;
            } finally {
              g = null, b = G, x = !1;
            }
            z = void 0;
          }
        } finally {
          z ? Q() : k = !1;
        }
      }
    }
    var Q;
    if (typeof C == "function")
      Q = function() {
        C(q);
      };
    else if (typeof MessageChannel < "u") {
      var ne = new MessageChannel(), L = ne.port2;
      ne.port1.onmessage = q, Q = function() {
        L.postMessage(null);
      };
    } else
      Q = function() {
        R(q, 0);
      };
    function I(T, z) {
      H = R(function() {
        T(e.unstable_now());
      }, z);
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
          var z = 3;
          break;
        default:
          z = b;
      }
      var G = b;
      b = z;
      try {
        return T();
      } finally {
        b = G;
      }
    }, e.unstable_requestPaint = function() {
      N = !0;
    }, e.unstable_runWithPriority = function(T, z) {
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
      var G = b;
      b = T;
      try {
        return z();
      } finally {
        b = G;
      }
    }, e.unstable_scheduleCallback = function(T, z, G) {
      var F = e.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? F + G : F) : G = F, T) {
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
      return te = G + te, T = {
        id: y++,
        callback: z,
        priorityLevel: T,
        startTime: G,
        expirationTime: te,
        sortIndex: -1
      }, G > F ? (T.sortIndex = G, a(m, T), r(p) === null && T === r(m) && (E ? (j(H), H = -1) : E = !0, I(B, G - F))) : (T.sortIndex = te, a(p, T), _ || x || (_ = !0, k || (k = !0, Q()))), T;
    }, e.unstable_shouldYield = le, e.unstable_wrapCallback = function(T) {
      var z = b;
      return function() {
        var G = b;
        b = z;
        try {
          return T.apply(this, arguments);
        } finally {
          b = G;
        }
      };
    };
  })(lh)), lh;
}
var ny;
function i2() {
  return ny || (ny = 1, rh.exports = a2()), rh.exports;
}
var oh = { exports: {} }, hn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ay;
function r2() {
  if (ay) return hn;
  ay = 1;
  var e = ls();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(p, m, y) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: g == null ? null : "" + g,
      children: p,
      containerInfo: m,
      implementation: y
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(p, m) {
    if (p === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, hn.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(p, m, null, y);
  }, hn.flushSync = function(p) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, hn.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(p, m));
  }, hn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, hn.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, g = d(y, m.crossOrigin), b = typeof m.integrity == "string" ? m.integrity : void 0, x = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? l.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: g,
          integrity: b,
          fetchPriority: x
        }
      ) : y === "script" && l.d.X(p, {
        crossOrigin: g,
        integrity: b,
        fetchPriority: x,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, hn.preinitModule = function(p, m) {
    if (typeof p == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var y = d(
            m.as,
            m.crossOrigin
          );
          l.d.M(p, {
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && l.d.M(p);
  }, hn.preload = function(p, m) {
    if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var y = m.as, g = d(y, m.crossOrigin);
      l.d.L(p, y, {
        crossOrigin: g,
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
  }, hn.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = d(m.as, m.crossOrigin);
        l.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(p);
  }, hn.requestFormReset = function(p) {
    l.d.r(p);
  }, hn.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, hn.useFormState = function(p, m, y) {
    return c.H.useFormState(p, m, y);
  }, hn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, hn.version = "19.2.7", hn;
}
var iy;
function Ix() {
  if (iy) return oh.exports;
  iy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), oh.exports = r2(), oh.exports;
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
function l2() {
  if (ry) return To;
  ry = 1;
  var e = i2(), a = ls(), r = Ix();
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
  function m(t) {
    var n = t.alternate;
    if (!n) {
      if (n = u(t), n === null) throw Error(l(188));
      return n !== t ? null : t;
    }
    for (var i = t, o = n; ; ) {
      var f = i.return;
      if (f === null) break;
      var h = f.alternate;
      if (h === null) {
        if (o = f.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === i) return p(f), t;
          if (h === o) return p(f), n;
          h = h.sibling;
        }
        throw Error(l(188));
      }
      if (i.return !== o.return) i = f, o = h;
      else {
        for (var w = !1, M = f.child; M; ) {
          if (M === i) {
            w = !0, i = f, o = h;
            break;
          }
          if (M === o) {
            w = !0, o = f, i = h;
            break;
          }
          M = M.sibling;
        }
        if (!w) {
          for (M = h.child; M; ) {
            if (M === i) {
              w = !0, i = h, o = f;
              break;
            }
            if (M === o) {
              w = !0, o = h, i = f;
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
  function y(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (n = y(t), n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var g = Object.assign, b = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), C = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), H = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), le = Symbol.for("react.memo_cache_sentinel"), q = Symbol.iterator;
  function Q(t) {
    return t === null || typeof t != "object" ? null : (t = q && t[q] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ne = Symbol.for("react.client.reference");
  function L(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ne ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case E:
        return "Fragment";
      case R:
        return "Profiler";
      case N:
        return "StrictMode";
      case B:
        return "Suspense";
      case k:
        return "SuspenseList";
      case Y:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case _:
          return "Portal";
        case C:
          return t.displayName || "Context";
        case j:
          return (t._context.displayName || "Context") + ".Consumer";
        case O:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case H:
          return n = t.displayName || null, n !== null ? n : L(t.type) || "Memo";
        case A:
          n = t._payload, t = t._init;
          try {
            return L(t(n));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, T = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, F = [], te = -1;
  function D(t) {
    return { current: t };
  }
  function V(t) {
    0 > te || (t.current = F[te], F[te] = null, te--);
  }
  function Z(t, n) {
    te++, F[te] = t.current, t.current = n;
  }
  var ee = D(null), se = D(null), he = D(null), me = D(null);
  function J(t, n) {
    switch (Z(he, n), Z(se, t), Z(ee, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? xv(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = xv(n), t = wv(n, t);
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
    V(ee), Z(ee, t);
  }
  function ve() {
    V(ee), V(se), V(he);
  }
  function Oe(t) {
    t.memoizedState !== null && Z(me, t);
    var n = ee.current, i = wv(n, t.type);
    n !== i && (Z(se, t), Z(ee, i));
  }
  function je(t) {
    se.current === t && (V(ee), V(se)), me.current === t && (V(me), So._currentValue = G);
  }
  var Ee, we;
  function Me(t) {
    if (Ee === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        Ee = n && n[1] || "", we = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ee + t + we;
  }
  var Ye = !1;
  function ye(t, n) {
    if (!t || Ye) return "";
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
                  var re = oe;
                }
                Reflect.construct(t, [], fe);
              } else {
                try {
                  fe.call();
                } catch (oe) {
                  re = oe;
                }
                t.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                re = oe;
              }
              (fe = t()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && re && typeof oe.stack == "string")
              return [oe.stack, re.stack];
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
      var h = o.DetermineComponentFrameRoot(), w = h[0], M = h[1];
      if (w && M) {
        var $ = w.split(`
`), ie = M.split(`
`);
        for (f = o = 0; o < $.length && !$[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < ie.length && !ie[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === $.length || f === ie.length)
          for (o = $.length - 1, f = ie.length - 1; 1 <= o && 0 <= f && $[o] !== ie[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if ($[o] !== ie[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || $[o] !== ie[f]) {
                  var ue = `
` + $[o].replace(" at new ", " at ");
                  return t.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", t.displayName)), ue;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      Ye = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? Me(i) : "";
  }
  function pe(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Me(t.type);
      case 16:
        return Me("Lazy");
      case 13:
        return t.child !== n && n !== null ? Me("Suspense Fallback") : Me("Suspense");
      case 19:
        return Me("SuspenseList");
      case 0:
      case 15:
        return ye(t.type, !1);
      case 11:
        return ye(t.type.render, !1);
      case 1:
        return ye(t.type, !0);
      case 31:
        return Me("Activity");
      default:
        return "";
    }
  }
  function _e(t) {
    try {
      var n = "", i = null;
      do
        n += pe(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Re = Object.prototype.hasOwnProperty, Ae = e.unstable_scheduleCallback, lt = e.unstable_cancelCallback, Ze = e.unstable_shouldYield, Fe = e.unstable_requestPaint, Ke = e.unstable_now, vt = e.unstable_getCurrentPriorityLevel, yt = e.unstable_ImmediatePriority, Yt = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, pt = e.unstable_LowPriority, ut = e.unstable_IdlePriority, Zn = e.log, _n = e.unstable_setDisableYieldValue, nn = null, Kt = null;
  function Ot(t) {
    if (typeof Zn == "function" && _n(t), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(nn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : Sn, yi = Math.log, Ma = Math.LN2;
  function Sn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (yi(t) / Ma | 0) | 0;
  }
  var ha = 256, Ln = 262144, Qn = 4194304;
  function fn(t) {
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
  function Ve(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0, h = t.suspendedLanes, w = t.pingedLanes;
    t = t.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~h, o !== 0 ? f = fn(o) : (w &= M, w !== 0 ? f = fn(w) : i || (i = M & ~t, i !== 0 && (f = fn(i))))) : (M = o & ~h, M !== 0 ? f = fn(M) : w !== 0 ? f = fn(w) : i || (i = o & ~t, i !== 0 && (f = fn(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, i = n & -n, h >= i || h === 32 && (i & 4194048) !== 0) ? n : f;
  }
  function bt(t, n) {
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
  function gt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Jt(t, n, i, o, f, h) {
    var w = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var M = t.entanglements, $ = t.expirationTimes, ie = t.hiddenUpdates;
    for (i = w & ~i; 0 < i; ) {
      var ue = 31 - Ut(i), fe = 1 << ue;
      M[ue] = 0, $[ue] = -1;
      var re = ie[ue];
      if (re !== null)
        for (ie[ue] = null, ue = 0; ue < re.length; ue++) {
          var oe = re[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      i &= ~fe;
    }
    o !== 0 && ma(t, o, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(w & ~n));
  }
  function ma(t, n, i) {
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
  function U(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : P(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function P(t) {
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
  function de() {
    var t = z.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Yv(t.type));
  }
  function ge(t, n) {
    var i = z.p;
    try {
      return z.p = t, n();
    } finally {
      z.p = i;
    }
  }
  var Ce = Math.random().toString(36).slice(2), xe = "__reactFiber$" + Ce, Ne = "__reactProps$" + Ce, Se = "__reactContainer$" + Ce, ze = "__reactEvents$" + Ce, Le = "__reactListeners$" + Ce, qe = "__reactHandles$" + Ce, Be = "__reactResources$" + Ce, Pe = "__reactMarker$" + Ce;
  function ot(t) {
    delete t[xe], delete t[Ne], delete t[ze], delete t[Le], delete t[qe];
  }
  function Ct(t) {
    var n = t[xe];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[Se] || i[xe]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = Tv(t); t !== null; ) {
            if (i = t[xe]) return i;
            t = Tv(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function ct(t) {
    if (t = t[xe] || t[Se]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function et(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(l(33));
  }
  function zt(t) {
    var n = t[Be];
    return n || (n = t[Be] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function it(t) {
    t[Pe] = !0;
  }
  var Aa = /* @__PURE__ */ new Set(), kn = {};
  function dn(t, n) {
    an(t, n), an(t + "Capture", n);
  }
  function an(t, n) {
    for (kn[t] = n, t = 0; t < n.length; t++)
      Aa.add(n[t]);
  }
  var En = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), bi = {}, Nn = {};
  function xi(t) {
    return Re.call(Nn, t) ? !0 : Re.call(bi, t) ? !1 : En.test(t) ? Nn[t] = !0 : (bi[t] = !0, !1);
  }
  function pa(t, n, i) {
    if (xi(n))
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
  function ga(t, n, i) {
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
  function $e(t, n, i, o) {
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
  function xt(t) {
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
  function Hn(t, n, i) {
    var o = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      n
    );
    if (!t.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var f = o.get, h = o.set;
      return Object.defineProperty(t, n, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(w) {
          i = "" + w, h.call(this, w);
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
  function wi(t) {
    if (!t._valueTracker) {
      var n = vn(t) ? "checked" : "value";
      t._valueTracker = Hn(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Fa(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = vn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function ht(t) {
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
  function nr(t, n, i, o, f, h, w, M) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + xt(n)) : t.value !== "" + xt(n) && (t.value = "" + xt(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? Hl(t, w, xt(n)) : i != null ? Hl(t, w, xt(i)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + xt(M) : t.removeAttribute("name");
  }
  function kr(t, n, i, o, f, h, w, M) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || i != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        wi(t);
        return;
      }
      i = i != null ? "" + xt(i) : "", n = n != null ? "" + xt(n) : i, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), wi(t);
  }
  function Hl(t, n, i) {
    n === "number" && ht(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function _i(t, n, i, o) {
    if (t = t.options, n) {
      n = {};
      for (var f = 0; f < i.length; f++)
        n["$" + i[f]] = !0;
      for (i = 0; i < t.length; i++)
        f = n.hasOwnProperty("$" + t[i].value), t[i].selected !== f && (t[i].selected = f), f && o && (t[i].defaultSelected = !0);
    } else {
      for (i = "" + xt(i), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === i) {
          t[f].selected = !0, o && (t[f].defaultSelected = !0);
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Bl(t, n, i) {
    if (n != null && (n = "" + xt(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + xt(i) : "";
  }
  function gp(t, n, i, o) {
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
    i = xt(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), wi(t);
  }
  function Hr(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var X_ = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function vp(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || X_.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function yp(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && vp(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && vp(t, h, n[h]);
  }
  function Kc(t) {
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
  var P_ = /* @__PURE__ */ new Map([
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
  ]), Z_ = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ys(t) {
    return Z_.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Xa() {
  }
  var Jc = null;
  function Wc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Br = null, Ur = null;
  function bp(t) {
    var n = ct(t);
    if (n && (t = n.stateNode)) {
      var i = t[Ne] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (nr(
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
                var f = o[Ne] || null;
                if (!f) throw Error(l(90));
                nr(
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
              o = i[n], o.form === t.form && Fa(o);
          }
          break e;
        case "textarea":
          Bl(t, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && _i(t, !!i.multiple, n, !1);
      }
    }
  }
  var ef = !1;
  function xp(t, n, i) {
    if (ef) return t(n, i);
    ef = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (ef = !1, (Br !== null || Ur !== null) && (ru(), Br && (n = Br, t = Ur, Ur = Br = null, bp(n), t)))
        for (n = 0; n < t.length; n++) bp(t[n]);
    }
  }
  function Ul(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[Ne] || null;
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
  var Pa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), tf = !1;
  if (Pa)
    try {
      var Vl = {};
      Object.defineProperty(Vl, "passive", {
        get: function() {
          tf = !0;
        }
      }), window.addEventListener("test", Vl, Vl), window.removeEventListener("test", Vl, Vl);
    } catch {
      tf = !1;
    }
  var Si = null, nf = null, bs = null;
  function wp() {
    if (bs) return bs;
    var t, n = nf, i = n.length, o, f = "value" in Si ? Si.value : Si.textContent, h = f.length;
    for (t = 0; t < i && n[t] === f[t]; t++) ;
    var w = i - t;
    for (o = 1; o <= w && n[i - o] === f[h - o]; o++) ;
    return bs = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function xs(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ws() {
    return !0;
  }
  function _p() {
    return !1;
  }
  function Cn(t) {
    function n(i, o, f, h, w) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (i = t[M], this[M] = i ? i(h) : h[M]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? ws : _p, this.isPropagationStopped = _p, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = ws);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = ws);
      },
      persist: function() {
      },
      isPersistent: ws
    }), n;
  }
  var ar = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _s = Cn(ar), $l = g({}, ar, { view: 0, detail: 0 }), Q_ = Cn($l), af, rf, ql, Ss = g({}, $l, {
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
    getModifierState: of,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ql && (ql && t.type === "mousemove" ? (af = t.screenX - ql.screenX, rf = t.screenY - ql.screenY) : rf = af = 0, ql = t), af);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : rf;
    }
  }), Sp = Cn(Ss), K_ = g({}, Ss, { dataTransfer: 0 }), J_ = Cn(K_), W_ = g({}, $l, { relatedTarget: 0 }), lf = Cn(W_), eS = g({}, ar, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), tS = Cn(eS), nS = g({}, ar, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), aS = Cn(nS), iS = g({}, ar, { data: 0 }), Ep = Cn(iS), rS = {
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
  }, lS = {
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
  }, oS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function sS(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = oS[t]) ? !!n[t] : !1;
  }
  function of() {
    return sS;
  }
  var uS = g({}, $l, {
    key: function(t) {
      if (t.key) {
        var n = rS[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = xs(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? lS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: of,
    charCode: function(t) {
      return t.type === "keypress" ? xs(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? xs(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), cS = Cn(uS), fS = g({}, Ss, {
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
  }), Np = Cn(fS), dS = g({}, $l, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: of
  }), hS = Cn(dS), mS = g({}, ar, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pS = Cn(mS), gS = g({}, Ss, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vS = Cn(gS), yS = g({}, ar, {
    newState: 0,
    oldState: 0
  }), bS = Cn(yS), xS = [9, 13, 27, 32], sf = Pa && "CompositionEvent" in window, Il = null;
  Pa && "documentMode" in document && (Il = document.documentMode);
  var wS = Pa && "TextEvent" in window && !Il, Cp = Pa && (!sf || Il && 8 < Il && 11 >= Il), Rp = " ", Tp = !1;
  function Mp(t, n) {
    switch (t) {
      case "keyup":
        return xS.indexOf(n.keyCode) !== -1;
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
  function Ap(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Vr = !1;
  function _S(t, n) {
    switch (t) {
      case "compositionend":
        return Ap(n);
      case "keypress":
        return n.which !== 32 ? null : (Tp = !0, Rp);
      case "textInput":
        return t = n.data, t === Rp && Tp ? null : t;
      default:
        return null;
    }
  }
  function SS(t, n) {
    if (Vr)
      return t === "compositionend" || !sf && Mp(t, n) ? (t = wp(), bs = nf = Si = null, Vr = !1, t) : null;
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
        return Cp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var ES = {
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
  function Dp(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!ES[t.type] : n === "textarea";
  }
  function jp(t, n, i, o) {
    Br ? Ur ? Ur.push(o) : Ur = [o] : Br = o, n = du(n, "onChange"), 0 < n.length && (i = new _s(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var Yl = null, Gl = null;
  function NS(t) {
    mv(t, 0);
  }
  function Es(t) {
    var n = et(t);
    if (Fa(n)) return t;
  }
  function Op(t, n) {
    if (t === "change") return n;
  }
  var zp = !1;
  if (Pa) {
    var uf;
    if (Pa) {
      var cf = "oninput" in document;
      if (!cf) {
        var Lp = document.createElement("div");
        Lp.setAttribute("oninput", "return;"), cf = typeof Lp.oninput == "function";
      }
      uf = cf;
    } else uf = !1;
    zp = uf && (!document.documentMode || 9 < document.documentMode);
  }
  function kp() {
    Yl && (Yl.detachEvent("onpropertychange", Hp), Gl = Yl = null);
  }
  function Hp(t) {
    if (t.propertyName === "value" && Es(Gl)) {
      var n = [];
      jp(
        n,
        Gl,
        t,
        Wc(t)
      ), xp(NS, n);
    }
  }
  function CS(t, n, i) {
    t === "focusin" ? (kp(), Yl = n, Gl = i, Yl.attachEvent("onpropertychange", Hp)) : t === "focusout" && kp();
  }
  function RS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Es(Gl);
  }
  function TS(t, n) {
    if (t === "click") return Es(n);
  }
  function MS(t, n) {
    if (t === "input" || t === "change")
      return Es(n);
  }
  function AS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Bn = typeof Object.is == "function" ? Object.is : AS;
  function Fl(t, n) {
    if (Bn(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!Re.call(n, f) || !Bn(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Bp(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Up(t, n) {
    var i = Bp(t);
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
      i = Bp(i);
    }
  }
  function Vp(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Vp(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function $p(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = ht(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = ht(t.document);
    }
    return n;
  }
  function ff(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var DS = Pa && "documentMode" in document && 11 >= document.documentMode, $r = null, df = null, Xl = null, hf = !1;
  function qp(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    hf || $r == null || $r !== ht(o) || (o = $r, "selectionStart" in o && ff(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Xl && Fl(Xl, o) || (Xl = o, o = du(df, "onSelect"), 0 < o.length && (n = new _s(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = $r)));
  }
  function ir(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var qr = {
    animationend: ir("Animation", "AnimationEnd"),
    animationiteration: ir("Animation", "AnimationIteration"),
    animationstart: ir("Animation", "AnimationStart"),
    transitionrun: ir("Transition", "TransitionRun"),
    transitionstart: ir("Transition", "TransitionStart"),
    transitioncancel: ir("Transition", "TransitionCancel"),
    transitionend: ir("Transition", "TransitionEnd")
  }, mf = {}, Ip = {};
  Pa && (Ip = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
  function rr(t) {
    if (mf[t]) return mf[t];
    if (!qr[t]) return t;
    var n = qr[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Ip)
        return mf[t] = n[i];
    return t;
  }
  var Yp = rr("animationend"), Gp = rr("animationiteration"), Fp = rr("animationstart"), jS = rr("transitionrun"), OS = rr("transitionstart"), zS = rr("transitioncancel"), Xp = rr("transitionend"), Pp = /* @__PURE__ */ new Map(), pf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pf.push("scrollEnd");
  function va(t, n) {
    Pp.set(t, n), dn(n, [t]);
  }
  var Ns = typeof reportError == "function" ? reportError : function(t) {
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
  }, Jn = [], Ir = 0, gf = 0;
  function Cs() {
    for (var t = Ir, n = gf = Ir = 0; n < t; ) {
      var i = Jn[n];
      Jn[n++] = null;
      var o = Jn[n];
      Jn[n++] = null;
      var f = Jn[n];
      Jn[n++] = null;
      var h = Jn[n];
      if (Jn[n++] = null, o !== null && f !== null) {
        var w = o.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), o.pending = f;
      }
      h !== 0 && Zp(i, f, h);
    }
  }
  function Rs(t, n, i, o) {
    Jn[Ir++] = t, Jn[Ir++] = n, Jn[Ir++] = i, Jn[Ir++] = o, gf |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function vf(t, n, i, o) {
    return Rs(t, n, i, o), Ts(t);
  }
  function lr(t, n) {
    return Rs(t, null, null, n), Ts(t);
  }
  function Zp(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= i, o = h.alternate, o !== null && (o.childLanes |= i), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(i), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = i | 536870912), h) : null;
  }
  function Ts(t) {
    if (50 < go)
      throw go = 0, Cd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Yr = {};
  function LS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Un(t, n, i, o) {
    return new LS(t, n, i, o);
  }
  function yf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Za(t, n) {
    var i = t.alternate;
    return i === null ? (i = Un(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Qp(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Ms(t, n, i, o, f, h) {
    var w = 0;
    if (o = t, typeof t == "function") yf(t) && (w = 1);
    else if (typeof t == "string")
      w = VE(
        t,
        i,
        ee.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case Y:
          return t = Un(31, i, n, f), t.elementType = Y, t.lanes = h, t;
        case E:
          return or(i.children, f, h, n);
        case N:
          w = 8, f |= 24;
          break;
        case R:
          return t = Un(12, i, n, f | 2), t.elementType = R, t.lanes = h, t;
        case B:
          return t = Un(13, i, n, f), t.elementType = B, t.lanes = h, t;
        case k:
          return t = Un(19, i, n, f), t.elementType = k, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case C:
                w = 10;
                break e;
              case j:
                w = 9;
                break e;
              case O:
                w = 11;
                break e;
              case H:
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
    return n = Un(w, i, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function or(t, n, i, o) {
    return t = Un(7, t, o, n), t.lanes = i, t;
  }
  function bf(t, n, i) {
    return t = Un(6, t, null, n), t.lanes = i, t;
  }
  function Kp(t) {
    var n = Un(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function xf(t, n, i) {
    return n = Un(
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
  var Jp = /* @__PURE__ */ new WeakMap();
  function Wn(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Jp.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: _e(n)
      }, Jp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: _e(n)
    };
  }
  var Gr = [], Fr = 0, As = null, Pl = 0, ea = [], ta = 0, Ei = null, Da = 1, ja = "";
  function Qa(t, n) {
    Gr[Fr++] = Pl, Gr[Fr++] = As, As = t, Pl = n;
  }
  function Wp(t, n, i) {
    ea[ta++] = Da, ea[ta++] = ja, ea[ta++] = Ei, Ei = t;
    var o = Da;
    t = ja;
    var f = 32 - Ut(o) - 1;
    o &= ~(1 << f), i += 1;
    var h = 32 - Ut(n) + f;
    if (30 < h) {
      var w = f - f % 5;
      h = (o & (1 << w) - 1).toString(32), o >>= w, f -= w, Da = 1 << 32 - Ut(n) + f | i << f | o, ja = h + t;
    } else
      Da = 1 << h | i << f | o, ja = t;
  }
  function wf(t) {
    t.return !== null && (Qa(t, 1), Wp(t, 1, 0));
  }
  function _f(t) {
    for (; t === As; )
      As = Gr[--Fr], Gr[Fr] = null, Pl = Gr[--Fr], Gr[Fr] = null;
    for (; t === Ei; )
      Ei = ea[--ta], ea[ta] = null, ja = ea[--ta], ea[ta] = null, Da = ea[--ta], ea[ta] = null;
  }
  function eg(t, n) {
    ea[ta++] = Da, ea[ta++] = ja, ea[ta++] = Ei, Da = n.id, ja = n.overflow, Ei = t;
  }
  var ln = null, Tt = null, rt = !1, Ni = null, na = !1, Sf = Error(l(519));
  function Ci(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Zl(Wn(n, t)), Sf;
  }
  function tg(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[xe] = t, n[Ne] = o, i) {
      case "dialog":
        We("cancel", n), We("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        We("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < yo.length; i++)
          We(yo[i], n);
        break;
      case "source":
        We("error", n);
        break;
      case "img":
      case "image":
      case "link":
        We("error", n), We("load", n);
        break;
      case "details":
        We("toggle", n);
        break;
      case "input":
        We("invalid", n), kr(
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
        We("invalid", n);
        break;
      case "textarea":
        We("invalid", n), gp(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || yv(n.textContent, i) ? (o.popover != null && (We("beforetoggle", n), We("toggle", n)), o.onScroll != null && We("scroll", n), o.onScrollEnd != null && We("scrollend", n), o.onClick != null && (n.onclick = Xa), n = !0) : n = !1, n || Ci(t, !0);
  }
  function ng(t) {
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
    if (!rt) return ng(t), rt = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || $d(t.type, t.memoizedProps)), i = !i), i && Tt && Ci(t), ng(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Rv(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Rv(t);
    } else
      n === 27 ? (n = Tt, Vi(t.type) ? (t = Fd, Fd = null, Tt = t) : Tt = n) : Tt = ln ? ia(t.stateNode.nextSibling) : null;
    return !0;
  }
  function sr() {
    Tt = ln = null, rt = !1;
  }
  function Ef() {
    var t = Ni;
    return t !== null && (An === null ? An = t : An.push.apply(
      An,
      t
    ), Ni = null), t;
  }
  function Zl(t) {
    Ni === null ? Ni = [t] : Ni.push(t);
  }
  var Nf = D(null), ur = null, Ka = null;
  function Ri(t, n, i) {
    Z(Nf, n._currentValue), n._currentValue = i;
  }
  function Ja(t) {
    t._currentValue = Nf.current, V(Nf);
  }
  function Cf(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function Rf(t, n, i, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var w = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var M = h;
          h = f;
          for (var $ = 0; $ < n.length; $++)
            if (M.context === n[$]) {
              h.lanes |= i, M = h.alternate, M !== null && (M.lanes |= i), Cf(
                h.return,
                i,
                t
              ), o || (w = null);
              break e;
            }
          h = M.next;
        }
      } else if (f.tag === 18) {
        if (w = f.return, w === null) throw Error(l(341));
        w.lanes |= i, h = w.alternate, h !== null && (h.lanes |= i), Cf(w, i, t), w = null;
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
  function Pr(t, n, i, o) {
    t = null;
    for (var f = n, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var w = f.alternate;
        if (w === null) throw Error(l(387));
        if (w = w.memoizedProps, w !== null) {
          var M = f.type;
          Bn(f.pendingProps.value, w.value) || (t !== null ? t.push(M) : t = [M]);
        }
      } else if (f === me.current) {
        if (w = f.alternate, w === null) throw Error(l(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(So) : t = [So]);
      }
      f = f.return;
    }
    t !== null && Rf(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Ds(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Bn(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function cr(t) {
    ur = t, Ka = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function on(t) {
    return ag(ur, t);
  }
  function js(t, n) {
    return ur === null && cr(t), ag(t, n);
  }
  function ag(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Ka === null) {
      if (t === null) throw Error(l(308));
      Ka = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Ka = Ka.next = n;
    return i;
  }
  var kS = typeof AbortController < "u" ? AbortController : function() {
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
  }, HS = e.unstable_scheduleCallback, BS = e.unstable_NormalPriority, Gt = {
    $$typeof: C,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tf() {
    return {
      controller: new kS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ql(t) {
    t.refCount--, t.refCount === 0 && HS(BS, function() {
      t.controller.abort();
    });
  }
  var Kl = null, Mf = 0, Zr = 0, Qr = null;
  function US(t, n) {
    if (Kl === null) {
      var i = Kl = [];
      Mf = 0, Zr = jd(), Qr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Mf++, n.then(ig, ig), n;
  }
  function ig() {
    if (--Mf === 0 && Kl !== null) {
      Qr !== null && (Qr.status = "fulfilled");
      var t = Kl;
      Kl = null, Zr = 0, Qr = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function VS(t, n) {
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
  var rg = T.S;
  T.S = function(t, n) {
    q0 = Ke(), typeof n == "object" && n !== null && typeof n.then == "function" && US(t, n), rg !== null && rg(t, n);
  };
  var fr = D(null);
  function Af() {
    var t = fr.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function Os(t, n) {
    n === null ? Z(fr, fr.current) : Z(fr, n.pool);
  }
  function lg() {
    var t = Af();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Kr = Error(l(460)), Df = Error(l(474)), zs = Error(l(542)), Ls = { then: function() {
  } };
  function og(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function sg(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Xa, Xa), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, cg(t), t;
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
            throw t = n.reason, cg(t), t;
        }
        throw hr = n, Kr;
    }
  }
  function dr(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (hr = i, Kr) : i;
    }
  }
  var hr = null;
  function ug() {
    if (hr === null) throw Error(l(459));
    var t = hr;
    return hr = null, t;
  }
  function cg(t) {
    if (t === Kr || t === zs)
      throw Error(l(483));
  }
  var Jr = null, Jl = 0;
  function ks(t) {
    var n = Jl;
    return Jl += 1, Jr === null && (Jr = []), sg(Jr, t, n);
  }
  function Wl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Hs(t, n) {
    throw n.$$typeof === b ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function fg(t) {
    function n(K, X) {
      if (t) {
        var ae = K.deletions;
        ae === null ? (K.deletions = [X], K.flags |= 16) : ae.push(X);
      }
    }
    function i(K, X) {
      if (!t) return null;
      for (; X !== null; )
        n(K, X), X = X.sibling;
      return null;
    }
    function o(K) {
      for (var X = /* @__PURE__ */ new Map(); K !== null; )
        K.key !== null ? X.set(K.key, K) : X.set(K.index, K), K = K.sibling;
      return X;
    }
    function f(K, X) {
      return K = Za(K, X), K.index = 0, K.sibling = null, K;
    }
    function h(K, X, ae) {
      return K.index = ae, t ? (ae = K.alternate, ae !== null ? (ae = ae.index, ae < X ? (K.flags |= 67108866, X) : ae) : (K.flags |= 67108866, X)) : (K.flags |= 1048576, X);
    }
    function w(K) {
      return t && K.alternate === null && (K.flags |= 67108866), K;
    }
    function M(K, X, ae, ce) {
      return X === null || X.tag !== 6 ? (X = bf(ae, K.mode, ce), X.return = K, X) : (X = f(X, ae), X.return = K, X);
    }
    function $(K, X, ae, ce) {
      var He = ae.type;
      return He === E ? ue(
        K,
        X,
        ae.props.children,
        ce,
        ae.key
      ) : X !== null && (X.elementType === He || typeof He == "object" && He !== null && He.$$typeof === A && dr(He) === X.type) ? (X = f(X, ae.props), Wl(X, ae), X.return = K, X) : (X = Ms(
        ae.type,
        ae.key,
        ae.props,
        null,
        K.mode,
        ce
      ), Wl(X, ae), X.return = K, X);
    }
    function ie(K, X, ae, ce) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ae.containerInfo || X.stateNode.implementation !== ae.implementation ? (X = xf(ae, K.mode, ce), X.return = K, X) : (X = f(X, ae.children || []), X.return = K, X);
    }
    function ue(K, X, ae, ce, He) {
      return X === null || X.tag !== 7 ? (X = or(
        ae,
        K.mode,
        ce,
        He
      ), X.return = K, X) : (X = f(X, ae), X.return = K, X);
    }
    function fe(K, X, ae) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return X = bf(
          "" + X,
          K.mode,
          ae
        ), X.return = K, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return ae = Ms(
              X.type,
              X.key,
              X.props,
              null,
              K.mode,
              ae
            ), Wl(ae, X), ae.return = K, ae;
          case _:
            return X = xf(
              X,
              K.mode,
              ae
            ), X.return = K, X;
          case A:
            return X = dr(X), fe(K, X, ae);
        }
        if (I(X) || Q(X))
          return X = or(
            X,
            K.mode,
            ae,
            null
          ), X.return = K, X;
        if (typeof X.then == "function")
          return fe(K, ks(X), ae);
        if (X.$$typeof === C)
          return fe(
            K,
            js(K, X),
            ae
          );
        Hs(K, X);
      }
      return null;
    }
    function re(K, X, ae, ce) {
      var He = X !== null ? X.key : null;
      if (typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint")
        return He !== null ? null : M(K, X, "" + ae, ce);
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            return ae.key === He ? $(K, X, ae, ce) : null;
          case _:
            return ae.key === He ? ie(K, X, ae, ce) : null;
          case A:
            return ae = dr(ae), re(K, X, ae, ce);
        }
        if (I(ae) || Q(ae))
          return He !== null ? null : ue(K, X, ae, ce, null);
        if (typeof ae.then == "function")
          return re(
            K,
            X,
            ks(ae),
            ce
          );
        if (ae.$$typeof === C)
          return re(
            K,
            X,
            js(K, ae),
            ce
          );
        Hs(K, ae);
      }
      return null;
    }
    function oe(K, X, ae, ce, He) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return K = K.get(ae) || null, M(X, K, "" + ce, He);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return K = K.get(
              ce.key === null ? ae : ce.key
            ) || null, $(X, K, ce, He);
          case _:
            return K = K.get(
              ce.key === null ? ae : ce.key
            ) || null, ie(X, K, ce, He);
          case A:
            return ce = dr(ce), oe(
              K,
              X,
              ae,
              ce,
              He
            );
        }
        if (I(ce) || Q(ce))
          return K = K.get(ae) || null, ue(X, K, ce, He, null);
        if (typeof ce.then == "function")
          return oe(
            K,
            X,
            ae,
            ks(ce),
            He
          );
        if (ce.$$typeof === C)
          return oe(
            K,
            X,
            ae,
            js(X, ce),
            He
          );
        Hs(X, ce);
      }
      return null;
    }
    function Te(K, X, ae, ce) {
      for (var He = null, ft = null, De = X, Xe = X = 0, nt = null; De !== null && Xe < ae.length; Xe++) {
        De.index > Xe ? (nt = De, De = null) : nt = De.sibling;
        var dt = re(
          K,
          De,
          ae[Xe],
          ce
        );
        if (dt === null) {
          De === null && (De = nt);
          break;
        }
        t && De && dt.alternate === null && n(K, De), X = h(dt, X, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt, De = nt;
      }
      if (Xe === ae.length)
        return i(K, De), rt && Qa(K, Xe), He;
      if (De === null) {
        for (; Xe < ae.length; Xe++)
          De = fe(K, ae[Xe], ce), De !== null && (X = h(
            De,
            X,
            Xe
          ), ft === null ? He = De : ft.sibling = De, ft = De);
        return rt && Qa(K, Xe), He;
      }
      for (De = o(De); Xe < ae.length; Xe++)
        nt = oe(
          De,
          K,
          Xe,
          ae[Xe],
          ce
        ), nt !== null && (t && nt.alternate !== null && De.delete(
          nt.key === null ? Xe : nt.key
        ), X = h(
          nt,
          X,
          Xe
        ), ft === null ? He = nt : ft.sibling = nt, ft = nt);
      return t && De.forEach(function(Gi) {
        return n(K, Gi);
      }), rt && Qa(K, Xe), He;
    }
    function Ue(K, X, ae, ce) {
      if (ae == null) throw Error(l(151));
      for (var He = null, ft = null, De = X, Xe = X = 0, nt = null, dt = ae.next(); De !== null && !dt.done; Xe++, dt = ae.next()) {
        De.index > Xe ? (nt = De, De = null) : nt = De.sibling;
        var Gi = re(K, De, dt.value, ce);
        if (Gi === null) {
          De === null && (De = nt);
          break;
        }
        t && De && Gi.alternate === null && n(K, De), X = h(Gi, X, Xe), ft === null ? He = Gi : ft.sibling = Gi, ft = Gi, De = nt;
      }
      if (dt.done)
        return i(K, De), rt && Qa(K, Xe), He;
      if (De === null) {
        for (; !dt.done; Xe++, dt = ae.next())
          dt = fe(K, dt.value, ce), dt !== null && (X = h(dt, X, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt);
        return rt && Qa(K, Xe), He;
      }
      for (De = o(De); !dt.done; Xe++, dt = ae.next())
        dt = oe(De, K, Xe, dt.value, ce), dt !== null && (t && dt.alternate !== null && De.delete(dt.key === null ? Xe : dt.key), X = h(dt, X, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt);
      return t && De.forEach(function(KE) {
        return n(K, KE);
      }), rt && Qa(K, Xe), He;
    }
    function Nt(K, X, ae, ce) {
      if (typeof ae == "object" && ae !== null && ae.type === E && ae.key === null && (ae = ae.props.children), typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            e: {
              for (var He = ae.key; X !== null; ) {
                if (X.key === He) {
                  if (He = ae.type, He === E) {
                    if (X.tag === 7) {
                      i(
                        K,
                        X.sibling
                      ), ce = f(
                        X,
                        ae.props.children
                      ), ce.return = K, K = ce;
                      break e;
                    }
                  } else if (X.elementType === He || typeof He == "object" && He !== null && He.$$typeof === A && dr(He) === X.type) {
                    i(
                      K,
                      X.sibling
                    ), ce = f(X, ae.props), Wl(ce, ae), ce.return = K, K = ce;
                    break e;
                  }
                  i(K, X);
                  break;
                } else n(K, X);
                X = X.sibling;
              }
              ae.type === E ? (ce = or(
                ae.props.children,
                K.mode,
                ce,
                ae.key
              ), ce.return = K, K = ce) : (ce = Ms(
                ae.type,
                ae.key,
                ae.props,
                null,
                K.mode,
                ce
              ), Wl(ce, ae), ce.return = K, K = ce);
            }
            return w(K);
          case _:
            e: {
              for (He = ae.key; X !== null; ) {
                if (X.key === He)
                  if (X.tag === 4 && X.stateNode.containerInfo === ae.containerInfo && X.stateNode.implementation === ae.implementation) {
                    i(
                      K,
                      X.sibling
                    ), ce = f(X, ae.children || []), ce.return = K, K = ce;
                    break e;
                  } else {
                    i(K, X);
                    break;
                  }
                else n(K, X);
                X = X.sibling;
              }
              ce = xf(ae, K.mode, ce), ce.return = K, K = ce;
            }
            return w(K);
          case A:
            return ae = dr(ae), Nt(
              K,
              X,
              ae,
              ce
            );
        }
        if (I(ae))
          return Te(
            K,
            X,
            ae,
            ce
          );
        if (Q(ae)) {
          if (He = Q(ae), typeof He != "function") throw Error(l(150));
          return ae = He.call(ae), Ue(
            K,
            X,
            ae,
            ce
          );
        }
        if (typeof ae.then == "function")
          return Nt(
            K,
            X,
            ks(ae),
            ce
          );
        if (ae.$$typeof === C)
          return Nt(
            K,
            X,
            js(K, ae),
            ce
          );
        Hs(K, ae);
      }
      return typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint" ? (ae = "" + ae, X !== null && X.tag === 6 ? (i(K, X.sibling), ce = f(X, ae), ce.return = K, K = ce) : (i(K, X), ce = bf(ae, K.mode, ce), ce.return = K, K = ce), w(K)) : i(K, X);
    }
    return function(K, X, ae, ce) {
      try {
        Jl = 0;
        var He = Nt(
          K,
          X,
          ae,
          ce
        );
        return Jr = null, He;
      } catch (De) {
        if (De === Kr || De === zs) throw De;
        var ft = Un(29, De, null, K.mode);
        return ft.lanes = ce, ft.return = K, ft;
      } finally {
      }
    };
  }
  var mr = fg(!0), dg = fg(!1), Ti = !1;
  function jf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Of(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Mi(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ai(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (mt & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = Ts(t), Zp(t, null, i), n;
    }
    return Rs(t, o, n, i), Ts(t);
  }
  function eo(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  function zf(t, n) {
    var i = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var f = null, h = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var w = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = w : h = h.next = w, i = i.next;
        } while (i !== null);
        h === null ? f = h = n : h = h.next = n;
      } else f = h = n;
      i = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: h,
        shared: o.shared,
        callbacks: o.callbacks
      }, t.updateQueue = i;
      return;
    }
    t = i.lastBaseUpdate, t === null ? i.firstBaseUpdate = n : t.next = n, i.lastBaseUpdate = n;
  }
  var Lf = !1;
  function to() {
    if (Lf) {
      var t = Qr;
      if (t !== null) throw t;
    }
  }
  function no(t, n, i, o) {
    Lf = !1;
    var f = t.updateQueue;
    Ti = !1;
    var h = f.firstBaseUpdate, w = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var $ = M, ie = $.next;
      $.next = null, w === null ? h = ie : w.next = ie, w = $;
      var ue = t.alternate;
      ue !== null && (ue = ue.updateQueue, M = ue.lastBaseUpdate, M !== w && (M === null ? ue.firstBaseUpdate = ie : M.next = ie, ue.lastBaseUpdate = $));
    }
    if (h !== null) {
      var fe = f.baseState;
      w = 0, ue = ie = $ = null, M = h;
      do {
        var re = M.lane & -536870913, oe = re !== M.lane;
        if (oe ? (tt & re) === re : (o & re) === re) {
          re !== 0 && re === Zr && (Lf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var Te = t, Ue = M;
            re = n;
            var Nt = i;
            switch (Ue.tag) {
              case 1:
                if (Te = Ue.payload, typeof Te == "function") {
                  fe = Te.call(Nt, fe, re);
                  break e;
                }
                fe = Te;
                break e;
              case 3:
                Te.flags = Te.flags & -65537 | 128;
              case 0:
                if (Te = Ue.payload, re = typeof Te == "function" ? Te.call(Nt, fe, re) : Te, re == null) break e;
                fe = g({}, fe, re);
                break e;
              case 2:
                Ti = !0;
            }
          }
          re = M.callback, re !== null && (t.flags |= 64, oe && (t.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [re] : oe.push(re));
        } else
          oe = {
            lane: re,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, ue === null ? (ie = ue = oe, $ = fe) : ue = ue.next = oe, w |= re;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          oe = M, M = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && ($ = fe), f.baseState = $, f.firstBaseUpdate = ie, f.lastBaseUpdate = ue, h === null && (f.shared.lanes = 0), Li |= w, t.lanes = w, t.memoizedState = fe;
    }
  }
  function hg(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function mg(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        hg(i[t], n);
  }
  var Wr = D(null), Bs = D(0);
  function pg(t, n) {
    t = oi, Z(Bs, t), Z(Wr, n), oi = t | n.baseLanes;
  }
  function kf() {
    Z(Bs, oi), Z(Wr, Wr.current);
  }
  function Hf() {
    oi = Bs.current, V(Wr), V(Bs);
  }
  var Vn = D(null), aa = null;
  function Di(t) {
    var n = t.alternate;
    Z($t, $t.current & 1), Z(Vn, t), aa === null && (n === null || Wr.current !== null || n.memoizedState !== null) && (aa = t);
  }
  function Bf(t) {
    Z($t, $t.current), Z(Vn, t), aa === null && (aa = t);
  }
  function gg(t) {
    t.tag === 22 ? (Z($t, $t.current), Z(Vn, t), aa === null && (aa = t)) : ji();
  }
  function ji() {
    Z($t, $t.current), Z(Vn, Vn.current);
  }
  function $n(t) {
    V(Vn), aa === t && (aa = null), V($t);
  }
  var $t = D(0);
  function Us(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Yd(i) || Gd(i)))
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
  var Wa = 0, Ge = null, St = null, Ft = null, Vs = !1, el = !1, pr = !1, $s = 0, ao = 0, tl = null, $S = 0;
  function Ht() {
    throw Error(l(321));
  }
  function Uf(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Bn(t[i], n[i])) return !1;
    return !0;
  }
  function Vf(t, n, i, o, f, h) {
    return Wa = h, Ge = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, T.H = t === null || t.memoizedState === null ? Wg : td, pr = !1, h = i(o, f), pr = !1, el && (h = yg(
      n,
      i,
      o,
      f
    )), vg(t), h;
  }
  function vg(t) {
    T.H = lo;
    var n = St !== null && St.next !== null;
    if (Wa = 0, Ft = St = Ge = null, Vs = !1, ao = 0, tl = null, n) throw Error(l(300));
    t === null || Xt || (t = t.dependencies, t !== null && Ds(t) && (Xt = !0));
  }
  function yg(t, n, i, o) {
    Ge = t;
    var f = 0;
    do {
      if (el && (tl = null), ao = 0, el = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Ft = St = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      T.H = e0, h = n(i, o);
    } while (el);
    return h;
  }
  function qS() {
    var t = T.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? io(n) : n, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (Ge.flags |= 1024), n;
  }
  function $f() {
    var t = $s !== 0;
    return $s = 0, t;
  }
  function qf(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function If(t) {
    if (Vs) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Vs = !1;
    }
    Wa = 0, Ft = St = Ge = null, el = !1, ao = $s = 0, tl = null;
  }
  function yn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ft === null ? Ge.memoizedState = Ft = t : Ft = Ft.next = t, Ft;
  }
  function qt() {
    if (St === null) {
      var t = Ge.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var n = Ft === null ? Ge.memoizedState : Ft.next;
    if (n !== null)
      Ft = n, St = t;
    else {
      if (t === null)
        throw Ge.alternate === null ? Error(l(467)) : Error(l(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, Ft === null ? Ge.memoizedState = Ft = t : Ft = Ft.next = t;
    }
    return Ft;
  }
  function qs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function io(t) {
    var n = ao;
    return ao += 1, tl === null && (tl = []), t = sg(tl, t, n), n = Ge, (Ft === null ? n.memoizedState : Ft.next) === null && (n = n.alternate, T.H = n === null || n.memoizedState === null ? Wg : td), t;
  }
  function Is(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return io(t);
      if (t.$$typeof === C) return on(t);
    }
    throw Error(l(438, String(t)));
  }
  function Yf(t) {
    var n = null, i = Ge.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var o = Ge.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = qs(), Ge.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = le;
    return n.index++, i;
  }
  function ei(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Ys(t) {
    var n = qt();
    return Gf(n, St, t);
  }
  function Gf(t, n, i) {
    var o = t.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = i;
    var f = t.baseQueue, h = o.pending;
    if (h !== null) {
      if (f !== null) {
        var w = f.next;
        f.next = h.next, h.next = w;
      }
      n.baseQueue = f = h, o.pending = null;
    }
    if (h = t.baseState, f === null) t.memoizedState = h;
    else {
      n = f.next;
      var M = w = null, $ = null, ie = n, ue = !1;
      do {
        var fe = ie.lane & -536870913;
        if (fe !== ie.lane ? (tt & fe) === fe : (Wa & fe) === fe) {
          var re = ie.revertLane;
          if (re === 0)
            $ !== null && ($ = $.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ie.action,
              hasEagerState: ie.hasEagerState,
              eagerState: ie.eagerState,
              next: null
            }), fe === Zr && (ue = !0);
          else if ((Wa & re) === re) {
            ie = ie.next, re === Zr && (ue = !0);
            continue;
          } else
            fe = {
              lane: 0,
              revertLane: ie.revertLane,
              gesture: null,
              action: ie.action,
              hasEagerState: ie.hasEagerState,
              eagerState: ie.eagerState,
              next: null
            }, $ === null ? (M = $ = fe, w = h) : $ = $.next = fe, Ge.lanes |= re, Li |= re;
          fe = ie.action, pr && i(h, fe), h = ie.hasEagerState ? ie.eagerState : i(h, fe);
        } else
          re = {
            lane: fe,
            revertLane: ie.revertLane,
            gesture: ie.gesture,
            action: ie.action,
            hasEagerState: ie.hasEagerState,
            eagerState: ie.eagerState,
            next: null
          }, $ === null ? (M = $ = re, w = h) : $ = $.next = re, Ge.lanes |= fe, Li |= fe;
        ie = ie.next;
      } while (ie !== null && ie !== n);
      if ($ === null ? w = h : $.next = M, !Bn(h, t.memoizedState) && (Xt = !0, ue && (i = Qr, i !== null)))
        throw i;
      t.memoizedState = h, t.baseState = w, t.baseQueue = $, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Ff(t) {
    var n = qt(), i = n.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, f = i.pending, h = n.memoizedState;
    if (f !== null) {
      i.pending = null;
      var w = f = f.next;
      do
        h = t(h, w.action), w = w.next;
      while (w !== f);
      Bn(h, n.memoizedState) || (Xt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), i.lastRenderedState = h;
    }
    return [h, o];
  }
  function bg(t, n, i) {
    var o = Ge, f = qt(), h = rt;
    if (h) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var w = !Bn(
      (St || f).memoizedState,
      i
    );
    if (w && (f.memoizedState = i, Xt = !0), f = f.queue, Zf(_g.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || w || Ft !== null && Ft.memoizedState.tag & 1) {
      if (o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        wg.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (Wa & 127) !== 0 || xg(o, n, i);
    }
    return i;
  }
  function xg(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = Ge.updateQueue, n === null ? (n = qs(), Ge.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function wg(t, n, i, o) {
    n.value = i, n.getSnapshot = o, Sg(n) && Eg(t);
  }
  function _g(t, n, i) {
    return i(function() {
      Sg(n) && Eg(t);
    });
  }
  function Sg(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Bn(t, i);
    } catch {
      return !0;
    }
  }
  function Eg(t) {
    var n = lr(t, 2);
    n !== null && Dn(n, t, 2);
  }
  function Xf(t) {
    var n = yn();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), pr) {
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
      lastRenderedReducer: ei,
      lastRenderedState: t
    }, n;
  }
  function Ng(t, n, i, o) {
    return t.baseState = i, Gf(
      t,
      St,
      typeof o == "function" ? o : ei
    );
  }
  function IS(t, n, i, o, f) {
    if (Xs(t)) throw Error(l(485));
    if (t = n.action, t !== null) {
      var h = {
        payload: f,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(w) {
          h.listeners.push(w);
        }
      };
      T.T !== null ? i(!0) : h.isTransition = !1, o(h), i = n.pending, i === null ? (h.next = n.pending = h, Cg(n, h)) : (h.next = i.next, n.pending = i.next = h);
    }
  }
  function Cg(t, n) {
    var i = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = T.T, w = {};
      T.T = w;
      try {
        var M = i(f, o), $ = T.S;
        $ !== null && $(w, M), Rg(t, n, M);
      } catch (ie) {
        Pf(t, n, ie);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), T.T = h;
      }
    } else
      try {
        h = i(f, o), Rg(t, n, h);
      } catch (ie) {
        Pf(t, n, ie);
      }
  }
  function Rg(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        Tg(t, n, o);
      },
      function(o) {
        return Pf(t, n, o);
      }
    ) : Tg(t, n, i);
  }
  function Tg(t, n, i) {
    n.status = "fulfilled", n.value = i, Mg(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, Cg(t, i)));
  }
  function Pf(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, Mg(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function Mg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Ag(t, n) {
    return n;
  }
  function Dg(t, n) {
    if (rt) {
      var i = Rt.formState;
      if (i !== null) {
        e: {
          var o = Ge;
          if (rt) {
            if (Tt) {
              t: {
                for (var f = Tt, h = na; f.nodeType !== 8; ) {
                  if (!h) {
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
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Tt = ia(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            Ci(o);
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
      lastRenderedReducer: Ag,
      lastRenderedState: n
    }, i.queue = o, i = Qg.bind(
      null,
      Ge,
      o
    ), o.dispatch = i, o = Xf(!1), h = ed.bind(
      null,
      Ge,
      !1,
      o.queue
    ), o = yn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, i = IS.bind(
      null,
      Ge,
      f,
      h,
      i
    ), f.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function jg(t) {
    var n = qt();
    return Og(n, St, t);
  }
  function Og(t, n, i) {
    if (n = Gf(
      t,
      n,
      Ag
    )[0], t = Ys(ei)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = io(n);
      } catch (w) {
        throw w === Kr ? zs : w;
      }
    else o = n;
    n = qt();
    var f = n.queue, h = f.dispatch;
    return i !== n.memoizedState && (Ge.flags |= 2048, nl(
      9,
      { destroy: void 0 },
      YS.bind(null, f, i),
      null
    )), [o, h, t];
  }
  function YS(t, n) {
    t.action = n;
  }
  function zg(t) {
    var n = qt(), i = St;
    if (i !== null)
      return Og(n, i, t);
    qt(), n = n.memoizedState, i = qt();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function nl(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = Ge.updateQueue, n === null && (n = qs(), Ge.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Lg() {
    return qt().memoizedState;
  }
  function Gs(t, n, i, o) {
    var f = yn();
    Ge.flags |= t, f.memoizedState = nl(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Fs(t, n, i, o) {
    var f = qt();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    St !== null && o !== null && Uf(o, St.memoizedState.deps) ? f.memoizedState = nl(n, h, i, o) : (Ge.flags |= t, f.memoizedState = nl(
      1 | n,
      h,
      i,
      o
    ));
  }
  function kg(t, n) {
    Gs(8390656, 8, t, n);
  }
  function Zf(t, n) {
    Fs(2048, 8, t, n);
  }
  function GS(t) {
    Ge.flags |= 4;
    var n = Ge.updateQueue;
    if (n === null)
      n = qs(), Ge.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Hg(t) {
    var n = qt().memoizedState;
    return GS({ ref: n, nextImpl: t }), function() {
      if ((mt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Bg(t, n) {
    return Fs(4, 2, t, n);
  }
  function Ug(t, n) {
    return Fs(4, 4, t, n);
  }
  function Vg(t, n) {
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
  function $g(t, n, i) {
    i = i != null ? i.concat([t]) : null, Fs(4, 4, Vg.bind(null, n, t), i);
  }
  function Qf() {
  }
  function qg(t, n) {
    var i = qt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && Uf(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Ig(t, n) {
    var i = qt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && Uf(n, o[1]))
      return o[0];
    if (o = t(), pr) {
      Ot(!0);
      try {
        t();
      } finally {
        Ot(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function Kf(t, n, i) {
    return i === void 0 || (Wa & 1073741824) !== 0 && (tt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = Y0(), Ge.lanes |= t, Li |= t, i);
  }
  function Yg(t, n, i, o) {
    return Bn(i, n) ? i : Wr.current !== null ? (t = Kf(t, i, o), Bn(t, n) || (Xt = !0), t) : (Wa & 42) === 0 || (Wa & 1073741824) !== 0 && (tt & 261930) === 0 ? (Xt = !0, t.memoizedState = i) : (t = Y0(), Ge.lanes |= t, Li |= t, n);
  }
  function Gg(t, n, i, o, f) {
    var h = z.p;
    z.p = h !== 0 && 8 > h ? h : 8;
    var w = T.T, M = {};
    T.T = M, ed(t, !1, n, i);
    try {
      var $ = f(), ie = T.S;
      if (ie !== null && ie(M, $), $ !== null && typeof $ == "object" && typeof $.then == "function") {
        var ue = VS(
          $,
          o
        );
        ro(
          t,
          n,
          ue,
          Yn(t)
        );
      } else
        ro(
          t,
          n,
          o,
          Yn(t)
        );
    } catch (fe) {
      ro(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Yn()
      );
    } finally {
      z.p = h, w !== null && M.types !== null && (w.types = M.types), T.T = w;
    }
  }
  function FS() {
  }
  function Jf(t, n, i, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = Fg(t).queue;
    Gg(
      t,
      f,
      n,
      G,
      i === null ? FS : function() {
        return Xg(t), i(o);
      }
    );
  }
  function Fg(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: G,
      baseState: G,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ei,
        lastRenderedState: G
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
        lastRenderedReducer: ei,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Xg(t) {
    var n = Fg(t);
    n.next === null && (n = t.alternate.memoizedState), ro(
      t,
      n.next.queue,
      {},
      Yn()
    );
  }
  function Wf() {
    return on(So);
  }
  function Pg() {
    return qt().memoizedState;
  }
  function Zg() {
    return qt().memoizedState;
  }
  function XS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Yn();
          t = Mi(i);
          var o = Ai(n, t, i);
          o !== null && (Dn(o, n, i), eo(o, n, i)), n = { cache: Tf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function PS(t, n, i) {
    var o = Yn();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xs(t) ? Kg(n, i) : (i = vf(t, n, i, o), i !== null && (Dn(i, t, o), Jg(i, n, o)));
  }
  function Qg(t, n, i) {
    var o = Yn();
    ro(t, n, i, o);
  }
  function ro(t, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xs(t)) Kg(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, M = h(w, i);
          if (f.hasEagerState = !0, f.eagerState = M, Bn(M, w))
            return Rs(t, n, f, 0), Rt === null && Cs(), !1;
        } catch {
        } finally {
        }
      if (i = vf(t, n, f, o), i !== null)
        return Dn(i, t, o), Jg(i, n, o), !0;
    }
    return !1;
  }
  function ed(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: jd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xs(t)) {
      if (n) throw Error(l(479));
    } else
      n = vf(
        t,
        i,
        o,
        2
      ), n !== null && Dn(n, t, 2);
  }
  function Xs(t) {
    var n = t.alternate;
    return t === Ge || n !== null && n === Ge;
  }
  function Kg(t, n) {
    el = Vs = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Jg(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  var lo = {
    readContext: on,
    use: Is,
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
  lo.useEffectEvent = Ht;
  var Wg = {
    readContext: on,
    use: Is,
    useCallback: function(t, n) {
      return yn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: on,
    useEffect: kg,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, Gs(
        4194308,
        4,
        Vg.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return Gs(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      Gs(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = yn();
      n = n === void 0 ? null : n;
      var o = t();
      if (pr) {
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
        if (pr) {
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
      }, o.queue = t, t = t.dispatch = PS.bind(
        null,
        Ge,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = yn();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Xf(t);
      var n = t.queue, i = Qg.bind(null, Ge, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Qf,
    useDeferredValue: function(t, n) {
      var i = yn();
      return Kf(i, t, n);
    },
    useTransition: function() {
      var t = Xf(!1);
      return t = Gg.bind(
        null,
        Ge,
        t.queue,
        !0,
        !1
      ), yn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = Ge, f = yn();
      if (rt) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = n(), Rt === null)
          throw Error(l(349));
        (tt & 127) !== 0 || xg(o, n, i);
      }
      f.memoizedState = i;
      var h = { value: i, getSnapshot: n };
      return f.queue = h, kg(_g.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        wg.bind(
          null,
          o,
          h,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var t = yn(), n = Rt.identifierPrefix;
      if (rt) {
        var i = ja, o = Da;
        i = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = $s++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = $S++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Wf,
    useFormState: Dg,
    useActionState: Dg,
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
      return n.queue = i, n = ed.bind(
        null,
        Ge,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Yf,
    useCacheRefresh: function() {
      return yn().memoizedState = XS.bind(
        null,
        Ge
      );
    },
    useEffectEvent: function(t) {
      var n = yn(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((mt & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, td = {
    readContext: on,
    use: Is,
    useCallback: qg,
    useContext: on,
    useEffect: Zf,
    useImperativeHandle: $g,
    useInsertionEffect: Bg,
    useLayoutEffect: Ug,
    useMemo: Ig,
    useReducer: Ys,
    useRef: Lg,
    useState: function() {
      return Ys(ei);
    },
    useDebugValue: Qf,
    useDeferredValue: function(t, n) {
      var i = qt();
      return Yg(
        i,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Ys(ei)[0], n = qt().memoizedState;
      return [
        typeof t == "boolean" ? t : io(t),
        n
      ];
    },
    useSyncExternalStore: bg,
    useId: Pg,
    useHostTransitionStatus: Wf,
    useFormState: jg,
    useActionState: jg,
    useOptimistic: function(t, n) {
      var i = qt();
      return Ng(i, St, t, n);
    },
    useMemoCache: Yf,
    useCacheRefresh: Zg
  };
  td.useEffectEvent = Hg;
  var e0 = {
    readContext: on,
    use: Is,
    useCallback: qg,
    useContext: on,
    useEffect: Zf,
    useImperativeHandle: $g,
    useInsertionEffect: Bg,
    useLayoutEffect: Ug,
    useMemo: Ig,
    useReducer: Ff,
    useRef: Lg,
    useState: function() {
      return Ff(ei);
    },
    useDebugValue: Qf,
    useDeferredValue: function(t, n) {
      var i = qt();
      return St === null ? Kf(i, t, n) : Yg(
        i,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Ff(ei)[0], n = qt().memoizedState;
      return [
        typeof t == "boolean" ? t : io(t),
        n
      ];
    },
    useSyncExternalStore: bg,
    useId: Pg,
    useHostTransitionStatus: Wf,
    useFormState: zg,
    useActionState: zg,
    useOptimistic: function(t, n) {
      var i = qt();
      return St !== null ? Ng(i, St, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Yf,
    useCacheRefresh: Zg
  };
  e0.useEffectEvent = Hg;
  function nd(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : g({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var ad = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Yn(), f = Mi(o);
      f.payload = n, i != null && (f.callback = i), n = Ai(t, f, o), n !== null && (Dn(n, t, o), eo(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Yn(), f = Mi(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Ai(t, f, o), n !== null && (Dn(n, t, o), eo(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Yn(), o = Mi(i);
      o.tag = 2, n != null && (o.callback = n), n = Ai(t, o, i), n !== null && (Dn(n, t, i), eo(n, t, i));
    }
  };
  function t0(t, n, i, o, f, h, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, w) : n.prototype && n.prototype.isPureReactComponent ? !Fl(i, o) || !Fl(f, h) : !0;
  }
  function n0(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && ad.enqueueReplaceState(n, n.state, null);
  }
  function gr(t, n) {
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
  function a0(t) {
    Ns(t);
  }
  function i0(t) {
    console.error(t);
  }
  function r0(t) {
    Ns(t);
  }
  function Ps(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function l0(t, n, i) {
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
  function id(t, n, i) {
    return i = Mi(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Ps(t, n);
    }, i;
  }
  function o0(t) {
    return t = Mi(t), t.tag = 3, t;
  }
  function s0(t, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        l0(n, i, o);
      };
    }
    var w = i.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      l0(n, i, o), typeof f != "function" && (ki === null ? ki = /* @__PURE__ */ new Set([this]) : ki.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function ZS(t, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && Pr(
        n,
        i,
        f,
        !0
      ), i = Vn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return aa === null ? lu() : i.alternate === null && Bt === 0 && (Bt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === Ls ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Md(t, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === Ls ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), Md(t, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return Md(t, o, f), lu(), !1;
    }
    if (rt)
      return n = Vn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== Sf && (t = Error(l(422), { cause: o }), Zl(Wn(t, i)))) : (o !== Sf && (n = Error(l(423), {
        cause: o
      }), Zl(
        Wn(n, i)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Wn(o, i), f = id(
        t.stateNode,
        o,
        f
      ), zf(t, f), Bt !== 4 && (Bt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Wn(h, i), po === null ? po = [h] : po.push(h), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Wn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = f & -f, i.lanes |= t, t = id(i.stateNode, o, t), zf(i, t), !1;
        case 1:
          if (n = i.type, h = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (ki === null || !ki.has(h))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = o0(f), s0(
              f,
              t,
              i,
              o
            ), zf(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var rd = Error(l(461)), Xt = !1;
  function sn(t, n, i, o) {
    n.child = t === null ? dg(n, null, i, o) : mr(
      n,
      t.child,
      i,
      o
    );
  }
  function u0(t, n, i, o, f) {
    i = i.render;
    var h = n.ref;
    if ("ref" in o) {
      var w = {};
      for (var M in o)
        M !== "ref" && (w[M] = o[M]);
    } else w = o;
    return cr(n), o = Vf(
      t,
      n,
      i,
      w,
      h,
      f
    ), M = $f(), t !== null && !Xt ? (qf(t, n, f), ti(t, n, f)) : (rt && M && wf(n), n.flags |= 1, sn(t, n, o, f), n.child);
  }
  function c0(t, n, i, o, f) {
    if (t === null) {
      var h = i.type;
      return typeof h == "function" && !yf(h) && h.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = h, f0(
        t,
        n,
        h,
        o,
        f
      )) : (t = Ms(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !hd(t, f)) {
      var w = h.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Fl, i(w, o) && t.ref === n.ref)
        return ti(t, n, f);
    }
    return n.flags |= 1, t = Za(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function f0(t, n, i, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Fl(h, o) && t.ref === n.ref)
        if (Xt = !1, n.pendingProps = o = h, hd(t, f))
          (t.flags & 131072) !== 0 && (Xt = !0);
        else
          return n.lanes = t.lanes, ti(t, n, f);
    }
    return ld(
      t,
      n,
      i,
      o,
      f
    );
  }
  function d0(t, n, i, o) {
    var f = o.children, h = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | i : i, t !== null) {
          for (o = n.child = t.child, f = 0; o !== null; )
            f = f | o.lanes | o.childLanes, o = o.sibling;
          o = f & ~h;
        } else o = 0, n.child = null;
        return h0(
          t,
          n,
          h,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Os(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? pg(n, h) : kf(), gg(n);
      else
        return o = n.lanes = 536870912, h0(
          t,
          n,
          h !== null ? h.baseLanes | i : i,
          i,
          o
        );
    } else
      h !== null ? (Os(n, h.cachePool), pg(n, h), ji(), n.memoizedState = null) : (t !== null && Os(n, null), kf(), ji());
    return sn(t, n, f, i), n.child;
  }
  function oo(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function h0(t, n, i, o, f) {
    var h = Af();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: i,
      cachePool: h
    }, t !== null && Os(n, null), kf(), gg(n), t !== null && Pr(t, n, o, !0), n.childLanes = f, null;
  }
  function Zs(t, n) {
    return n = Ks(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function m0(t, n, i) {
    return mr(n, t.child, null, i), t = Zs(n, n.pendingProps), t.flags |= 2, $n(n), n.memoizedState = null, t;
  }
  function QS(t, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (rt) {
        if (o.mode === "hidden")
          return t = Zs(n, o), n.lanes = 536870912, oo(null, t);
        if (Bf(n), (t = Tt) ? (t = Cv(
          t,
          na
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Ei !== null ? { id: Da, overflow: ja } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Kp(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ci(n);
        return n.lanes = 536870912, null;
      }
      return Zs(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if (Bf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = m0(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Xt || Pr(t, n, i, !1), f = (i & t.childLanes) !== 0, Xt || f) {
        if (o = Rt, o !== null && (w = U(o, i), w !== 0 && w !== h.retryLane))
          throw h.retryLane = w, lr(t, w), Dn(o, t, w), rd;
        lu(), n = m0(
          t,
          n,
          i
        );
      } else
        t = h.treeContext, Tt = ia(w.nextSibling), ln = n, rt = !0, Ni = null, na = !1, t !== null && eg(n, t), n = Zs(n, o), n.flags |= 4096;
      return n;
    }
    return t = Za(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Qs(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function ld(t, n, i, o, f) {
    return cr(n), i = Vf(
      t,
      n,
      i,
      o,
      void 0,
      f
    ), o = $f(), t !== null && !Xt ? (qf(t, n, f), ti(t, n, f)) : (rt && o && wf(n), n.flags |= 1, sn(t, n, i, f), n.child);
  }
  function p0(t, n, i, o, f, h) {
    return cr(n), n.updateQueue = null, i = yg(
      n,
      o,
      i,
      f
    ), vg(t), o = $f(), t !== null && !Xt ? (qf(t, n, h), ti(t, n, h)) : (rt && o && wf(n), n.flags |= 1, sn(t, n, i, h), n.child);
  }
  function g0(t, n, i, o, f) {
    if (cr(n), n.stateNode === null) {
      var h = Yr, w = i.contextType;
      typeof w == "object" && w !== null && (h = on(w)), h = new i(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = ad, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, jf(n), w = i.contextType, h.context = typeof w == "object" && w !== null ? on(w) : Yr, h.state = n.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (nd(
        n,
        i,
        w,
        o
      ), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && ad.enqueueReplaceState(h, h.state, null), no(n, o, h, f), to(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var M = n.memoizedProps, $ = gr(i, M);
      h.props = $;
      var ie = h.context, ue = i.contextType;
      w = Yr, typeof ue == "object" && ue !== null && (w = on(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof h.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (M || ie !== w) && n0(
        n,
        h,
        o,
        w
      ), Ti = !1;
      var re = n.memoizedState;
      h.state = re, no(n, o, h, f), to(), ie = n.memoizedState, M || re !== ie || Ti ? (typeof fe == "function" && (nd(
        n,
        i,
        fe,
        o
      ), ie = n.memoizedState), ($ = Ti || t0(
        n,
        i,
        $,
        o,
        re,
        ie,
        w
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ie), h.props = o, h.state = ie, h.context = w, o = $) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, Of(t, n), w = n.memoizedProps, ue = gr(i, w), h.props = ue, fe = n.pendingProps, re = h.context, ie = i.contextType, $ = Yr, typeof ie == "object" && ie !== null && ($ = on(ie)), M = i.getDerivedStateFromProps, (ie = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== fe || re !== $) && n0(
        n,
        h,
        o,
        $
      ), Ti = !1, re = n.memoizedState, h.state = re, no(n, o, h, f), to();
      var oe = n.memoizedState;
      w !== fe || re !== oe || Ti || t !== null && t.dependencies !== null && Ds(t.dependencies) ? (typeof M == "function" && (nd(
        n,
        i,
        M,
        o
      ), oe = n.memoizedState), (ue = Ti || t0(
        n,
        i,
        ue,
        o,
        re,
        oe,
        $
      ) || t !== null && t.dependencies !== null && Ds(t.dependencies)) ? (ie || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, oe, $), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        oe,
        $
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), h.props = o, h.state = oe, h.context = $, o = ue) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, Qs(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = mr(
      n,
      t.child,
      null,
      f
    ), n.child = mr(
      n,
      null,
      i,
      f
    )) : sn(t, n, i, f), n.memoizedState = h.state, t = n.child) : t = ti(
      t,
      n,
      f
    ), t;
  }
  function v0(t, n, i, o) {
    return sr(), n.flags |= 256, sn(t, n, i, o), n.child;
  }
  var od = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sd(t) {
    return { baseLanes: t, cachePool: lg() };
  }
  function ud(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= In), t;
  }
  function y0(t, n, i) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = t !== null && t.memoizedState === null ? !1 : ($t.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (rt) {
        if (f ? Di(n) : ji(), (t = Tt) ? (t = Cv(
          t,
          na
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Ei !== null ? { id: Da, overflow: ja } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Kp(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ci(n);
        return Gd(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (ji(), f = n.mode, M = Ks(
        { mode: "hidden", children: M },
        f
      ), o = or(
        o,
        f,
        i,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = sd(i), o.childLanes = ud(
        t,
        w,
        i
      ), n.memoizedState = od, oo(null, o)) : (Di(n), cd(n, M));
    }
    var $ = t.memoizedState;
    if ($ !== null && (M = $.dehydrated, M !== null)) {
      if (h)
        n.flags & 256 ? (Di(n), n.flags &= -257, n = fd(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (ji(), n.child = t.child, n.flags |= 128, n = null) : (ji(), M = o.fallback, f = n.mode, o = Ks(
          { mode: "visible", children: o.children },
          f
        ), M = or(
          M,
          f,
          i,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, mr(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = sd(i), o.childLanes = ud(
          t,
          w,
          i
        ), n.memoizedState = od, n = oo(null, o));
      else if (Di(n), Gd(M)) {
        if (w = M.nextSibling && M.nextSibling.dataset, w) var ie = w.dgst;
        w = ie, o = Error(l(419)), o.stack = "", o.digest = w, Zl({ value: o, source: null, stack: null }), n = fd(
          t,
          n,
          i
        );
      } else if (Xt || Pr(t, n, i, !1), w = (i & t.childLanes) !== 0, Xt || w) {
        if (w = Rt, w !== null && (o = U(w, i), o !== 0 && o !== $.retryLane))
          throw $.retryLane = o, lr(t, o), Dn(w, t, o), rd;
        Yd(M) || lu(), n = fd(
          t,
          n,
          i
        );
      } else
        Yd(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = $.treeContext, Tt = ia(
          M.nextSibling
        ), ln = n, rt = !0, Ni = null, na = !1, t !== null && eg(n, t), n = cd(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (ji(), M = o.fallback, f = n.mode, $ = t.child, ie = $.sibling, o = Za($, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = $.subtreeFlags & 65011712, ie !== null ? M = Za(
      ie,
      M
    ) : (M = or(
      M,
      f,
      i,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, oo(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = sd(i) : (f = M.cachePool, f !== null ? ($ = Gt._currentValue, f = f.parent !== $ ? { parent: $, pool: $ } : f) : f = lg(), M = {
      baseLanes: M.baseLanes | i,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = ud(
      t,
      w,
      i
    ), n.memoizedState = od, oo(t.child, o)) : (Di(n), i = t.child, t = i.sibling, i = Za(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function cd(t, n) {
    return n = Ks(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Ks(t, n) {
    return t = Un(22, t, null, n), t.lanes = 0, t;
  }
  function fd(t, n, i) {
    return mr(n, t.child, null, i), t = cd(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function b0(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), Cf(t.return, n, i);
  }
  function dd(t, n, i, o, f, h) {
    var w = t.memoizedState;
    w === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: f,
      treeForkCount: h
    } : (w.isBackwards = n, w.rendering = null, w.renderingStartTime = 0, w.last = o, w.tail = i, w.tailMode = f, w.treeForkCount = h);
  }
  function x0(t, n, i) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var w = $t.current, M = (w & 2) !== 0;
    if (M ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, Z($t, w), sn(t, n, o, i), o = rt ? Pl : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && b0(t, i, n);
        else if (t.tag === 19)
          b0(t, i, n);
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
          t = i.alternate, t !== null && Us(t) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), dd(
          n,
          !1,
          f,
          i,
          h,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, f = n.child, n.child = null; f !== null; ) {
          if (t = f.alternate, t !== null && Us(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = i, i = f, f = t;
        }
        dd(
          n,
          !0,
          i,
          null,
          h,
          o
        );
        break;
      case "together":
        dd(
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
  function ti(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), Li |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (Pr(
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
  function hd(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ds(t)));
  }
  function KS(t, n, i) {
    switch (n.tag) {
      case 3:
        J(n, n.stateNode.containerInfo), Ri(n, Gt, t.memoizedState.cache), sr();
        break;
      case 27:
      case 5:
        Oe(n);
        break;
      case 4:
        J(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ri(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Bf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Di(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? y0(t, n, i) : (Di(n), t = ti(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        Di(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (Pr(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return x0(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Z($t, $t.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, d0(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ri(n, Gt, t.memoizedState.cache);
    }
    return ti(t, n, i);
  }
  function w0(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Xt = !0;
      else {
        if (!hd(t, i) && (n.flags & 128) === 0)
          return Xt = !1, KS(
            t,
            n,
            i
          );
        Xt = (t.flags & 131072) !== 0;
      }
    else
      Xt = !1, rt && (n.flags & 1048576) !== 0 && Wp(n, Pl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = dr(n.elementType), n.type = t, typeof t == "function")
            yf(t) ? (o = gr(t, o), n.tag = 1, n = g0(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = ld(
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
                n.tag = 11, n = u0(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              } else if (f === H) {
                n.tag = 14, n = c0(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              }
            }
            throw n = L(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return ld(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, f = gr(
          o,
          n.pendingProps
        ), g0(
          t,
          n,
          o,
          f,
          i
        );
      case 3:
        e: {
          if (J(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, Of(t, n), no(n, o, null, i);
          var w = n.memoizedState;
          if (o = w.cache, Ri(n, Gt, o), o !== h.cache && Rf(
            n,
            [Gt],
            i,
            !0
          ), to(), o = w.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = v0(
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
              ), Zl(f), n = v0(
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
              for (Tt = ia(t.firstChild), ln = n, rt = !0, Ni = null, na = !0, i = dg(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (sr(), o === f) {
              n = ti(
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
        return Qs(t, n), t === null ? (i = jv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : rt || (i = n.type, t = n.pendingProps, o = hu(
          he.current
        ).createElement(i), o[xe] = n, o[Ne] = t, un(o, i, t), it(o), n.stateNode = o) : n.memoizedState = jv(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Oe(n), t === null && rt && (o = n.stateNode = Mv(
          n.type,
          n.pendingProps,
          he.current
        ), ln = n, na = !0, f = Tt, Vi(n.type) ? (Fd = f, Tt = ia(o.firstChild)) : Tt = f), sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), Qs(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && rt && ((f = o = Tt) && (o = RE(
          o,
          n.type,
          n.pendingProps,
          na
        ), o !== null ? (n.stateNode = o, ln = n, Tt = ia(o.firstChild), na = !1, f = !0) : f = !1), f || Ci(n)), Oe(n), f = n.type, h = n.pendingProps, w = t !== null ? t.memoizedProps : null, o = h.children, $d(f, h) ? o = null : w !== null && $d(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = Vf(
          t,
          n,
          qS,
          null,
          null,
          i
        ), So._currentValue = f), Qs(t, n), sn(t, n, o, i), n.child;
      case 6:
        return t === null && rt && ((t = i = Tt) && (i = TE(
          i,
          n.pendingProps,
          na
        ), i !== null ? (n.stateNode = i, ln = n, Tt = null, t = !0) : t = !1), t || Ci(n)), null;
      case 13:
        return y0(t, n, i);
      case 4:
        return J(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = mr(
          n,
          null,
          o,
          i
        ) : sn(t, n, o, i), n.child;
      case 11:
        return u0(
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
        return o = n.pendingProps, Ri(n, n.type, o.value), sn(t, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, cr(n), f = on(f), o = o(f), n.flags |= 1, sn(t, n, o, i), n.child;
      case 14:
        return c0(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return f0(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return x0(t, n, i);
      case 31:
        return QS(t, n, i);
      case 22:
        return d0(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return cr(n), o = on(Gt), t === null ? (f = Af(), f === null && (f = Rt, h = Tf(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= i), f = h), n.memoizedState = { parent: o, cache: f }, jf(n), Ri(n, Gt, f)) : ((t.lanes & i) !== 0 && (Of(t, n), no(n, null, null, i), to()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ri(n, Gt, o)) : (o = h.cache, Ri(n, Gt, o), o !== f.cache && Rf(
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
  function ni(t) {
    t.flags |= 4;
  }
  function md(t, n, i, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (P0()) t.flags |= 8192;
        else
          throw hr = Ls, Df;
    } else t.flags &= -16777217;
  }
  function _0(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Hv(n))
      if (P0()) t.flags |= 8192;
      else
        throw hr = Ls, Df;
  }
  function Js(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, ll |= n);
  }
  function so(t, n) {
    if (!rt)
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
  function JS(t, n, i) {
    var o = n.pendingProps;
    switch (_f(n), n.tag) {
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
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Ja(Gt), ve(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Xr(n) ? ni(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Ef())), Mt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (ni(n), h !== null ? (Mt(n), _0(n, h)) : (Mt(n), md(
          n,
          f,
          null,
          o,
          i
        ))) : h ? h !== t.memoizedState ? (ni(n), Mt(n), _0(n, h)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && ni(n), Mt(n), md(
          n,
          f,
          t,
          o,
          i
        )), null;
      case 27:
        if (je(n), i = he.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ni(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = ee.current, Xr(n) ? tg(n) : (t = Mv(f, o, i), n.stateNode = t, ni(n));
        }
        return Mt(n), null;
      case 5:
        if (je(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ni(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (h = ee.current, Xr(n))
            tg(n);
          else {
            var w = hu(
              he.current
            );
            switch (h) {
              case 1:
                h = w.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = w.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = w.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = w.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = w.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof o.is == "string" ? w.createElement("select", {
                      is: o.is
                    }) : w.createElement("select"), o.multiple ? h.multiple = !0 : o.size && (h.size = o.size);
                    break;
                  default:
                    h = typeof o.is == "string" ? w.createElement(f, { is: o.is }) : w.createElement(f);
                }
            }
            h[xe] = n, h[Ne] = o;
            e: for (w = n.child; w !== null; ) {
              if (w.tag === 5 || w.tag === 6)
                h.appendChild(w.stateNode);
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
            n.stateNode = h;
            e: switch (un(h, f, o), f) {
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
            o && ni(n);
          }
        }
        return Mt(n), md(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && ni(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = he.current, Xr(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, f = ln, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[xe] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || yv(t.nodeValue, i)), t || Ci(n, !0);
          } else
            t = hu(t).createTextNode(
              o
            ), t[xe] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Xr(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[xe] = n;
            } else
              sr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            i = Ef(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
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
              f[xe] = n;
            } else
              sr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = Ef(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
        }
        return $n(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), Js(n, n.updateQueue), Mt(n), null);
      case 4:
        return ve(), t === null && kd(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Ja(n.type), Mt(n), null;
      case 19:
        if (V($t), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) so(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = Us(t), h !== null) {
                  for (n.flags |= 128, so(o, !1), t = h.updateQueue, n.updateQueue = t, Js(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Qp(i, t), i = i.sibling;
                  return Z(
                    $t,
                    $t.current & 1 | 2
                  ), rt && Qa(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Ke() > au && (n.flags |= 128, f = !0, so(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = Us(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, Js(n, t), so(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !rt)
                return Mt(n), null;
            } else
              2 * Ke() - o.renderingStartTime > au && i !== 536870912 && (n.flags |= 128, f = !0, so(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ke(), t.sibling = null, i = $t.current, Z(
          $t,
          f ? i & 1 | 2 : i & 1
        ), rt && Qa(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return $n(n), Hf(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && Js(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && V(fr), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Ja(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function WS(t, n) {
    switch (_f(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Ja(Gt), ve(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return je(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($n(n), n.alternate === null)
            throw Error(l(340));
          sr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if ($n(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          sr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return V($t), null;
      case 4:
        return ve(), null;
      case 10:
        return Ja(n.type), null;
      case 22:
      case 23:
        return $n(n), Hf(), t !== null && V(fr), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Ja(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function S0(t, n) {
    switch (_f(n), n.tag) {
      case 3:
        Ja(Gt), ve();
        break;
      case 26:
      case 27:
      case 5:
        je(n);
        break;
      case 4:
        ve();
        break;
      case 31:
        n.memoizedState !== null && $n(n);
        break;
      case 13:
        $n(n);
        break;
      case 19:
        V($t);
        break;
      case 10:
        Ja(n.type);
        break;
      case 22:
      case 23:
        $n(n), Hf(), t !== null && V(fr);
        break;
      case 24:
        Ja(Gt);
    }
  }
  function uo(t, n) {
    try {
      var i = n.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        i = f;
        do {
          if ((i.tag & t) === t) {
            o = void 0;
            var h = i.create, w = i.inst;
            o = h(), w.destroy = o;
          }
          i = i.next;
        } while (i !== f);
      }
    } catch (M) {
      _t(n, n.return, M);
    }
  }
  function Oi(t, n, i) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        o = h;
        do {
          if ((o.tag & t) === t) {
            var w = o.inst, M = w.destroy;
            if (M !== void 0) {
              w.destroy = void 0, f = n;
              var $ = i, ie = M;
              try {
                ie();
              } catch (ue) {
                _t(
                  f,
                  $,
                  ue
                );
              }
            }
          }
          o = o.next;
        } while (o !== h);
      }
    } catch (ue) {
      _t(n, n.return, ue);
    }
  }
  function E0(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        mg(n, i);
      } catch (o) {
        _t(t, t.return, o);
      }
    }
  }
  function N0(t, n, i) {
    i.props = gr(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      _t(t, n, o);
    }
  }
  function co(t, n) {
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
      _t(t, n, f);
    }
  }
  function Oa(t, n) {
    var i = t.ref, o = t.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          _t(t, n, f);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (f) {
          _t(t, n, f);
        }
      else i.current = null;
  }
  function C0(t) {
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
      _t(t, t.return, f);
    }
  }
  function pd(t, n, i) {
    try {
      var o = t.stateNode;
      wE(o, t.type, i, n), o[Ne] = n;
    } catch (f) {
      _t(t, t.return, f);
    }
  }
  function R0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Vi(t.type) || t.tag === 4;
  }
  function gd(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || R0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Vi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function vd(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Xa));
    else if (o !== 4 && (o === 27 && Vi(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (vd(t, n, i), t = t.sibling; t !== null; )
        vd(t, n, i), t = t.sibling;
  }
  function Ws(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && Vi(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (Ws(t, n, i), t = t.sibling; t !== null; )
        Ws(t, n, i), t = t.sibling;
  }
  function T0(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      un(n, o, i), n[xe] = t, n[Ne] = i;
    } catch (h) {
      _t(t, t.return, h);
    }
  }
  var ai = !1, Pt = !1, yd = !1, M0 = typeof WeakSet == "function" ? WeakSet : Set, tn = null;
  function eE(t, n) {
    if (t = t.containerInfo, Ud = xu, t = $p(t), ff(t)) {
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
            var f = o.anchorOffset, h = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, h.nodeType;
            } catch {
              i = null;
              break e;
            }
            var w = 0, M = -1, $ = -1, ie = 0, ue = 0, fe = t, re = null;
            t: for (; ; ) {
              for (var oe; fe !== i || f !== 0 && fe.nodeType !== 3 || (M = w + f), fe !== h || o !== 0 && fe.nodeType !== 3 || ($ = w + o), fe.nodeType === 3 && (w += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                re = fe, fe = oe;
              for (; ; ) {
                if (fe === t) break t;
                if (re === i && ++ie === f && (M = w), re === h && ++ue === o && ($ = w), (oe = fe.nextSibling) !== null) break;
                fe = re, re = fe.parentNode;
              }
              fe = oe;
            }
            i = M === -1 || $ === -1 ? null : { start: M, end: $ };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Vd = { focusedElem: t, selectionRange: i }, xu = !1, tn = n; tn !== null; )
      if (n = tn, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, tn = t;
      else
        for (; tn !== null; ) {
          switch (n = tn, h = n.alternate, t = n.flags, n.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = n.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (i = 0; i < t.length; i++)
                  f = t[i], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && h !== null) {
                t = void 0, i = n, f = h.memoizedProps, h = h.memoizedState, o = i.stateNode;
                try {
                  var Te = gr(
                    i.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    Te,
                    h
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Ue) {
                  _t(
                    i,
                    i.return,
                    Ue
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, i = t.nodeType, i === 9)
                  Id(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Id(t);
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
  function A0(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ri(t, i), o & 4 && uo(5, i);
        break;
      case 1:
        if (ri(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (w) {
              _t(i, i.return, w);
            }
          else {
            var f = gr(
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
              _t(
                i,
                i.return,
                w
              );
            }
          }
        o & 64 && E0(i), o & 512 && co(i, i.return);
        break;
      case 3:
        if (ri(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            mg(t, n);
          } catch (w) {
            _t(i, i.return, w);
          }
        }
        break;
      case 27:
        n === null && o & 4 && T0(i);
      case 26:
      case 5:
        ri(t, i), n === null && o & 4 && C0(i), o & 512 && co(i, i.return);
        break;
      case 12:
        ri(t, i);
        break;
      case 31:
        ri(t, i), o & 4 && O0(t, i);
        break;
      case 13:
        ri(t, i), o & 4 && z0(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = uE.bind(
          null,
          i
        ), ME(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || ai, !o) {
          n = n !== null && n.memoizedState !== null || Pt, f = ai;
          var h = Pt;
          ai = o, (Pt = n) && !h ? li(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ri(t, i), ai = f, Pt = h;
        }
        break;
      case 30:
        break;
      default:
        ri(t, i);
    }
  }
  function D0(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, D0(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && ot(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var At = null, Rn = !1;
  function ii(t, n, i) {
    for (i = i.child; i !== null; )
      j0(t, n, i), i = i.sibling;
  }
  function j0(t, n, i) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(nn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Pt || Oa(i, n), ii(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Pt || Oa(i, n);
        var o = At, f = Rn;
        Vi(i.type) && (At = i.stateNode, Rn = !1), ii(
          t,
          n,
          i
        ), xo(i.stateNode), At = o, Rn = f;
        break;
      case 5:
        Pt || Oa(i, n);
      case 6:
        if (o = At, f = Rn, At = null, ii(
          t,
          n,
          i
        ), At = o, Rn = f, At !== null)
          if (Rn)
            try {
              (At.nodeType === 9 ? At.body : At.nodeName === "HTML" ? At.ownerDocument.body : At).removeChild(i.stateNode);
            } catch (h) {
              _t(
                i,
                n,
                h
              );
            }
          else
            try {
              At.removeChild(i.stateNode);
            } catch (h) {
              _t(
                i,
                n,
                h
              );
            }
        break;
      case 18:
        At !== null && (Rn ? (t = At, Ev(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), ml(t)) : Ev(At, i.stateNode));
        break;
      case 4:
        o = At, f = Rn, At = i.stateNode.containerInfo, Rn = !0, ii(
          t,
          n,
          i
        ), At = o, Rn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Oi(2, i, n), Pt || Oi(4, i, n), ii(
          t,
          n,
          i
        );
        break;
      case 1:
        Pt || (Oa(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && N0(
          i,
          n,
          o
        )), ii(
          t,
          n,
          i
        );
        break;
      case 21:
        ii(
          t,
          n,
          i
        );
        break;
      case 22:
        Pt = (o = Pt) || i.memoizedState !== null, ii(
          t,
          n,
          i
        ), Pt = o;
        break;
      default:
        ii(
          t,
          n,
          i
        );
    }
  }
  function O0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ml(t);
      } catch (i) {
        _t(n, n.return, i);
      }
    }
  }
  function z0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ml(t);
      } catch (i) {
        _t(n, n.return, i);
      }
  }
  function tE(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new M0()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new M0()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function eu(t, n) {
    var i = tE(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = cE.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Tn(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], h = t, w = n, M = w;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Vi(M.type)) {
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
        j0(h, w, f), At = null, Rn = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        L0(n, t), n = n.sibling;
  }
  var ya = null;
  function L0(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, t), Mn(t), o & 4 && (Oi(3, t, t.return), uo(3, t), Oi(5, t, t.return));
        break;
      case 1:
        Tn(n, t), Mn(t), o & 512 && (Pt || i === null || Oa(i, i.return)), o & 64 && ai && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = ya;
        if (Tn(n, t), Mn(t), o & 512 && (Pt || i === null || Oa(i, i.return)), o & 4) {
          var h = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  o = t.type, i = t.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Pe] || h[xe] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(o), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), un(h, o, i), h[xe] = t, it(h), o = h;
                      break e;
                    case "link":
                      var w = Lv(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (w) {
                        for (var M = 0; M < w.length; M++)
                          if (h = w[M], h.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && h.getAttribute("rel") === (i.rel == null ? null : i.rel) && h.getAttribute("title") === (i.title == null ? null : i.title) && h.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), un(h, o, i), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (w = Lv(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (M = 0; M < w.length; M++)
                          if (h = w[M], h.getAttribute("content") === (i.content == null ? null : "" + i.content) && h.getAttribute("name") === (i.name == null ? null : i.name) && h.getAttribute("property") === (i.property == null ? null : i.property) && h.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && h.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), un(h, o, i), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[xe] = t, it(h), o = h;
                }
                t.stateNode = o;
              } else
                kv(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = zv(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : h.count--, o === null ? kv(
              f,
              t.type,
              t.stateNode
            ) : zv(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && pd(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, t), Mn(t), o & 512 && (Pt || i === null || Oa(i, i.return)), i !== null && o & 4 && pd(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, t), Mn(t), o & 512 && (Pt || i === null || Oa(i, i.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            Hr(f, "");
          } catch (Te) {
            _t(t, t.return, Te);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, pd(
          t,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (yd = !0);
        break;
      case 6:
        if (Tn(n, t), Mn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (Te) {
            _t(t, t.return, Te);
          }
        }
        break;
      case 3:
        if (gu = null, f = ya, ya = mu(n.containerInfo), Tn(n, t), ya = f, Mn(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            ml(n.containerInfo);
          } catch (Te) {
            _t(t, t.return, Te);
          }
        yd && (yd = !1, k0(t));
        break;
      case 4:
        o = ya, ya = mu(
          t.stateNode.containerInfo
        ), Tn(n, t), Mn(t), ya = o;
        break;
      case 12:
        Tn(n, t), Mn(t);
        break;
      case 31:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, eu(t, o)));
        break;
      case 13:
        Tn(n, t), Mn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (nu = Ke()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, eu(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var $ = i !== null && i.memoizedState !== null, ie = ai, ue = Pt;
        if (ai = ie || f, Pt = ue || $, Tn(n, t), Pt = ue, ai = ie, Mn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || $ || ai || Pt || vr(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                $ = i = n;
                try {
                  if (h = $.stateNode, f)
                    w = h.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    M = $.stateNode;
                    var fe = $.memoizedProps.style, re = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    M.style.display = re == null || typeof re == "boolean" ? "" : ("" + re).trim();
                  }
                } catch (Te) {
                  _t($, $.return, Te);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                $ = n;
                try {
                  $.stateNode.nodeValue = f ? "" : $.memoizedProps;
                } catch (Te) {
                  _t($, $.return, Te);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                $ = n;
                try {
                  var oe = $.stateNode;
                  f ? Nv(oe, !0) : Nv($.stateNode, !1);
                } catch (Te) {
                  _t($, $.return, Te);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, eu(t, i))));
        break;
      case 19:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, eu(t, o)));
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
          if (R0(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, h = gd(t);
            Ws(t, h, f);
            break;
          case 5:
            var w = i.stateNode;
            i.flags & 32 && (Hr(w, ""), i.flags &= -33);
            var M = gd(t);
            Ws(t, M, w);
            break;
          case 3:
          case 4:
            var $ = i.stateNode.containerInfo, ie = gd(t);
            vd(
              t,
              ie,
              $
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ue) {
        _t(t, t.return, ue);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function k0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        k0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function ri(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        A0(t, n.alternate, n), n = n.sibling;
  }
  function vr(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Oi(4, n, n.return), vr(n);
          break;
        case 1:
          Oa(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && N0(
            n,
            n.return,
            i
          ), vr(n);
          break;
        case 27:
          xo(n.stateNode);
        case 26:
        case 5:
          Oa(n, n.return), vr(n);
          break;
        case 22:
          n.memoizedState === null && vr(n);
          break;
        case 30:
          vr(n);
          break;
        default:
          vr(n);
      }
      t = t.sibling;
    }
  }
  function li(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, h = n, w = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          li(
            f,
            h,
            i
          ), uo(4, h);
          break;
        case 1:
          if (li(
            f,
            h,
            i
          ), o = h, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (ie) {
              _t(o, o.return, ie);
            }
          if (o = h, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var $ = f.shared.hiddenCallbacks;
              if ($ !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < $.length; f++)
                  hg($[f], M);
            } catch (ie) {
              _t(o, o.return, ie);
            }
          }
          i && w & 64 && E0(h), co(h, h.return);
          break;
        case 27:
          T0(h);
        case 26:
        case 5:
          li(
            f,
            h,
            i
          ), i && o === null && w & 4 && C0(h), co(h, h.return);
          break;
        case 12:
          li(
            f,
            h,
            i
          );
          break;
        case 31:
          li(
            f,
            h,
            i
          ), i && w & 4 && O0(f, h);
          break;
        case 13:
          li(
            f,
            h,
            i
          ), i && w & 4 && z0(f, h);
          break;
        case 22:
          h.memoizedState === null && li(
            f,
            h,
            i
          ), co(h, h.return);
          break;
        case 30:
          break;
        default:
          li(
            f,
            h,
            i
          );
      }
      n = n.sibling;
    }
  }
  function bd(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Ql(i));
  }
  function xd(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Ql(t));
  }
  function ba(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        H0(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function H0(t, n, i, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ba(
          t,
          n,
          i,
          o
        ), f & 2048 && uo(9, n);
        break;
      case 1:
        ba(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        ba(
          t,
          n,
          i,
          o
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Ql(t)));
        break;
      case 12:
        if (f & 2048) {
          ba(
            t,
            n,
            i,
            o
          ), t = n.stateNode;
          try {
            var h = n.memoizedProps, w = h.id, M = h.onPostCommit;
            typeof M == "function" && M(
              w,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch ($) {
            _t(n, n.return, $);
          }
        } else
          ba(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        ba(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        ba(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, w = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? ba(
          t,
          n,
          i,
          o
        ) : fo(t, n) : h._visibility & 2 ? ba(
          t,
          n,
          i,
          o
        ) : (h._visibility |= 2, al(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && bd(w, n);
        break;
      case 24:
        ba(
          t,
          n,
          i,
          o
        ), f & 2048 && xd(n.alternate, n);
        break;
      default:
        ba(
          t,
          n,
          i,
          o
        );
    }
  }
  function al(t, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, w = n, M = i, $ = o, ie = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          al(
            h,
            w,
            M,
            $,
            f
          ), uo(8, w);
          break;
        case 23:
          break;
        case 22:
          var ue = w.stateNode;
          w.memoizedState !== null ? ue._visibility & 2 ? al(
            h,
            w,
            M,
            $,
            f
          ) : fo(
            h,
            w
          ) : (ue._visibility |= 2, al(
            h,
            w,
            M,
            $,
            f
          )), f && ie & 2048 && bd(
            w.alternate,
            w
          );
          break;
        case 24:
          al(
            h,
            w,
            M,
            $,
            f
          ), f && ie & 2048 && xd(w.alternate, w);
          break;
        default:
          al(
            h,
            w,
            M,
            $,
            f
          );
      }
      n = n.sibling;
    }
  }
  function fo(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            fo(i, o), f & 2048 && bd(
              o.alternate,
              o
            );
            break;
          case 24:
            fo(i, o), f & 2048 && xd(o.alternate, o);
            break;
          default:
            fo(i, o);
        }
        n = n.sibling;
      }
  }
  var ho = 8192;
  function il(t, n, i) {
    if (t.subtreeFlags & ho)
      for (t = t.child; t !== null; )
        B0(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function B0(t, n, i) {
    switch (t.tag) {
      case 26:
        il(
          t,
          n,
          i
        ), t.flags & ho && t.memoizedState !== null && $E(
          i,
          ya,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        il(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = ya;
        ya = mu(t.stateNode.containerInfo), il(
          t,
          n,
          i
        ), ya = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = ho, ho = 16777216, il(
          t,
          n,
          i
        ), ho = o) : il(
          t,
          n,
          i
        ));
        break;
      default:
        il(
          t,
          n,
          i
        );
    }
  }
  function U0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function mo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, $0(
            o,
            t
          );
        }
      U0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        V0(t), t = t.sibling;
  }
  function V0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        mo(t), t.flags & 2048 && Oi(9, t, t.return);
        break;
      case 3:
        mo(t);
        break;
      case 12:
        mo(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, tu(t)) : mo(t);
        break;
      default:
        mo(t);
    }
  }
  function tu(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, $0(
            o,
            t
          );
        }
      U0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Oi(8, n, n.return), tu(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, tu(n));
          break;
        default:
          tu(n);
      }
      t = t.sibling;
    }
  }
  function $0(t, n) {
    for (; tn !== null; ) {
      var i = tn;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Oi(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Ql(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, tn = o;
      else
        e: for (i = t; tn !== null; ) {
          o = tn;
          var f = o.sibling, h = o.return;
          if (D0(o), o === i) {
            tn = null;
            break e;
          }
          if (f !== null) {
            f.return = h, tn = f;
            break e;
          }
          tn = h;
        }
    }
  }
  var nE = {
    getCacheForType: function(t) {
      var n = on(Gt), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return on(Gt).controller.signal;
    }
  }, aE = typeof WeakMap == "function" ? WeakMap : Map, mt = 0, Rt = null, Je = null, tt = 0, wt = 0, qn = null, zi = !1, rl = !1, wd = !1, oi = 0, Bt = 0, Li = 0, yr = 0, _d = 0, In = 0, ll = 0, po = null, An = null, Sd = !1, nu = 0, q0 = 0, au = 1 / 0, iu = null, ki = null, Wt = 0, Hi = null, ol = null, si = 0, Ed = 0, Nd = null, I0 = null, go = 0, Cd = null;
  function Yn() {
    return (mt & 2) !== 0 && tt !== 0 ? tt & -tt : T.T !== null ? jd() : de();
  }
  function Y0() {
    if (In === 0)
      if ((tt & 536870912) === 0 || rt) {
        var t = Ln;
        Ln <<= 1, (Ln & 3932160) === 0 && (Ln = 262144), In = t;
      } else In = 536870912;
    return t = Vn.current, t !== null && (t.flags |= 32), In;
  }
  function Dn(t, n, i) {
    (t === Rt && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null) && (sl(t, 0), Bi(
      t,
      tt,
      In,
      !1
    )), gt(t, i), ((mt & 2) === 0 || t !== Rt) && (t === Rt && ((mt & 2) === 0 && (yr |= i), Bt === 4 && Bi(
      t,
      tt,
      In,
      !1
    )), za(t));
  }
  function G0(t, n, i) {
    if ((mt & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || bt(t, n), f = o ? lE(t, n) : Td(t, n, !0), h = o;
    do {
      if (f === 0) {
        rl && !o && Bi(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, h && !iE(i)) {
          f = Td(t, n, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var w = 0;
          else
            w = t.pendingLanes & -536870913, w = w !== 0 ? w : w & 536870912 ? 536870912 : 0;
          if (w !== 0) {
            n = w;
            e: {
              var M = t;
              f = po;
              var $ = M.current.memoizedState.isDehydrated;
              if ($ && (sl(M, w).flags |= 256), w = Td(
                M,
                w,
                !1
              ), w !== 2) {
                if (wd && !$) {
                  M.errorRecoveryDisabledLanes |= h, yr |= h, f = 4;
                  break e;
                }
                h = An, An = f, h !== null && (An === null ? An = h : An.push.apply(
                  An,
                  h
                ));
              }
              f = w;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          sl(t, 0), Bi(t, n, 0, !0);
          break;
        }
        e: {
          switch (o = t, h = f, h) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Bi(
                o,
                n,
                In,
                !zi
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
          if ((n & 62914560) === n && (f = nu + 300 - Ke(), 10 < f)) {
            if (Bi(
              o,
              n,
              In,
              !zi
            ), Ve(o, 0, !0) !== 0) break e;
            si = n, o.timeoutHandle = _v(
              F0.bind(
                null,
                o,
                i,
                An,
                iu,
                Sd,
                n,
                In,
                yr,
                ll,
                zi,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          F0(
            o,
            i,
            An,
            iu,
            Sd,
            n,
            In,
            yr,
            ll,
            zi,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    za(t);
  }
  function F0(t, n, i, o, f, h, w, M, $, ie, ue, fe, re, oe) {
    if (t.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Xa
      }, B0(
        n,
        h,
        fe
      );
      var Te = (h & 62914560) === h ? nu - Ke() : (h & 4194048) === h ? q0 - Ke() : 0;
      if (Te = qE(
        fe,
        Te
      ), Te !== null) {
        si = h, t.cancelPendingCommit = Te(
          ev.bind(
            null,
            t,
            n,
            h,
            i,
            o,
            f,
            w,
            M,
            $,
            ue,
            fe,
            null,
            re,
            oe
          )
        ), Bi(t, h, w, !ie);
        return;
      }
    }
    ev(
      t,
      n,
      h,
      i,
      o,
      f,
      w,
      M,
      $
    );
  }
  function iE(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Bn(h(), f)) return !1;
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
  function Bi(t, n, i, o) {
    n &= ~_d, n &= ~yr, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), w = 1 << h;
      o[h] = -1, f &= ~w;
    }
    i !== 0 && ma(t, i, n);
  }
  function ru() {
    return (mt & 6) === 0 ? (vo(0), !1) : !0;
  }
  function Rd() {
    if (Je !== null) {
      if (wt === 0)
        var t = Je.return;
      else
        t = Je, Ka = ur = null, If(t), Jr = null, Jl = 0, t = Je;
      for (; t !== null; )
        S0(t.alternate, t), t = t.return;
      Je = null;
    }
  }
  function sl(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, EE(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), si = 0, Rd(), Rt = t, Je = i = Za(t.current, null), tt = n, wt = 0, qn = null, zi = !1, rl = bt(t, n), wd = !1, ll = In = _d = yr = Li = Bt = 0, An = po = null, Sd = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return oi = n, Cs(), i;
  }
  function X0(t, n) {
    Ge = null, T.H = lo, n === Kr || n === zs ? (n = ug(), wt = 3) : n === Df ? (n = ug(), wt = 4) : wt = n === rd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, qn = n, Je === null && (Bt = 1, Ps(
      t,
      Wn(n, t.current)
    ));
  }
  function P0() {
    var t = Vn.current;
    return t === null ? !0 : (tt & 4194048) === tt ? aa === null : (tt & 62914560) === tt || (tt & 536870912) !== 0 ? t === aa : !1;
  }
  function Z0() {
    var t = T.H;
    return T.H = lo, t === null ? lo : t;
  }
  function Q0() {
    var t = T.A;
    return T.A = nE, t;
  }
  function lu() {
    Bt = 4, zi || (tt & 4194048) !== tt && Vn.current !== null || (rl = !0), (Li & 134217727) === 0 && (yr & 134217727) === 0 || Rt === null || Bi(
      Rt,
      tt,
      In,
      !1
    );
  }
  function Td(t, n, i) {
    var o = mt;
    mt |= 2;
    var f = Z0(), h = Q0();
    (Rt !== t || tt !== n) && (iu = null, sl(t, n)), n = !1;
    var w = Bt;
    e: do
      try {
        if (wt !== 0 && Je !== null) {
          var M = Je, $ = qn;
          switch (wt) {
            case 8:
              Rd(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Vn.current === null && (n = !0);
              var ie = wt;
              if (wt = 0, qn = null, ul(t, M, $, ie), i && rl) {
                w = 0;
                break e;
              }
              break;
            default:
              ie = wt, wt = 0, qn = null, ul(t, M, $, ie);
          }
        }
        rE(), w = Bt;
        break;
      } catch (ue) {
        X0(t, ue);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Ka = ur = null, mt = o, T.H = f, T.A = h, Je === null && (Rt = null, tt = 0, Cs()), w;
  }
  function rE() {
    for (; Je !== null; ) K0(Je);
  }
  function lE(t, n) {
    var i = mt;
    mt |= 2;
    var o = Z0(), f = Q0();
    Rt !== t || tt !== n ? (iu = null, au = Ke() + 500, sl(t, n)) : rl = bt(
      t,
      n
    );
    e: do
      try {
        if (wt !== 0 && Je !== null) {
          n = Je;
          var h = qn;
          t: switch (wt) {
            case 1:
              wt = 0, qn = null, ul(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (og(h)) {
                wt = 0, qn = null, J0(n);
                break;
              }
              n = function() {
                wt !== 2 && wt !== 9 || Rt !== t || (wt = 7), za(t);
              }, h.then(n, n);
              break e;
            case 3:
              wt = 7;
              break e;
            case 4:
              wt = 5;
              break e;
            case 7:
              og(h) ? (wt = 0, qn = null, J0(n)) : (wt = 0, qn = null, ul(t, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (Je.tag) {
                case 26:
                  w = Je.memoizedState;
                case 5:
                case 27:
                  var M = Je;
                  if (w ? Hv(w) : M.stateNode.complete) {
                    wt = 0, qn = null;
                    var $ = M.sibling;
                    if ($ !== null) Je = $;
                    else {
                      var ie = M.return;
                      ie !== null ? (Je = ie, ou(ie)) : Je = null;
                    }
                    break t;
                  }
              }
              wt = 0, qn = null, ul(t, n, h, 5);
              break;
            case 6:
              wt = 0, qn = null, ul(t, n, h, 6);
              break;
            case 8:
              Rd(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        oE();
        break;
      } catch (ue) {
        X0(t, ue);
      }
    while (!0);
    return Ka = ur = null, T.H = o, T.A = f, mt = i, Je !== null ? 0 : (Rt = null, tt = 0, Cs(), Bt);
  }
  function oE() {
    for (; Je !== null && !Ze(); )
      K0(Je);
  }
  function K0(t) {
    var n = w0(t.alternate, t, oi);
    t.memoizedProps = t.pendingProps, n === null ? ou(t) : Je = n;
  }
  function J0(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = p0(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          tt
        );
        break;
      case 11:
        n = p0(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          tt
        );
        break;
      case 5:
        If(n);
      default:
        S0(i, n), n = Je = Qp(n, oi), n = w0(i, n, oi);
    }
    t.memoizedProps = t.pendingProps, n === null ? ou(t) : Je = n;
  }
  function ul(t, n, i, o) {
    Ka = ur = null, If(n), Jr = null, Jl = 0;
    var f = n.return;
    try {
      if (ZS(
        t,
        f,
        n,
        i,
        tt
      )) {
        Bt = 1, Ps(
          t,
          Wn(i, t.current)
        ), Je = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Je = f, h;
      Bt = 1, Ps(
        t,
        Wn(i, t.current)
      ), Je = null;
      return;
    }
    n.flags & 32768 ? (rt || o === 1 ? t = !0 : rl || (tt & 536870912) !== 0 ? t = !1 : (zi = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Vn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), W0(n, t)) : ou(n);
  }
  function ou(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        W0(
          n,
          zi
        );
        return;
      }
      t = n.return;
      var i = JS(
        n.alternate,
        n,
        oi
      );
      if (i !== null) {
        Je = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Je = n;
        return;
      }
      Je = n = t;
    } while (n !== null);
    Bt === 0 && (Bt = 5);
  }
  function W0(t, n) {
    do {
      var i = WS(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, Je = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        Je = t;
        return;
      }
      Je = t = i;
    } while (t !== null);
    Bt = 6, Je = null;
  }
  function ev(t, n, i, o, f, h, w, M, $) {
    t.cancelPendingCommit = null;
    do
      su();
    while (Wt !== 0);
    if ((mt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= gf, Jt(
        t,
        i,
        h,
        w,
        M,
        $
      ), t === Rt && (Je = Rt = null, tt = 0), ol = n, Hi = t, si = i, Ed = h, Nd = f, I0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, fE(Lt, function() {
        return rv(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = T.T, T.T = null, f = z.p, z.p = 2, w = mt, mt |= 4;
        try {
          eE(t, n, i);
        } finally {
          mt = w, z.p = f, T.T = o;
        }
      }
      Wt = 1, tv(), nv(), av();
    }
  }
  function tv() {
    if (Wt === 1) {
      Wt = 0;
      var t = Hi, n = ol, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = T.T, T.T = null;
        var o = z.p;
        z.p = 2;
        var f = mt;
        mt |= 4;
        try {
          L0(n, t);
          var h = Vd, w = $p(t.containerInfo), M = h.focusedElem, $ = h.selectionRange;
          if (w !== M && M && M.ownerDocument && Vp(
            M.ownerDocument.documentElement,
            M
          )) {
            if ($ !== null && ff(M)) {
              var ie = $.start, ue = $.end;
              if (ue === void 0 && (ue = ie), "selectionStart" in M)
                M.selectionStart = ie, M.selectionEnd = Math.min(
                  ue,
                  M.value.length
                );
              else {
                var fe = M.ownerDocument || document, re = fe && fe.defaultView || window;
                if (re.getSelection) {
                  var oe = re.getSelection(), Te = M.textContent.length, Ue = Math.min($.start, Te), Nt = $.end === void 0 ? Ue : Math.min($.end, Te);
                  !oe.extend && Ue > Nt && (w = Nt, Nt = Ue, Ue = w);
                  var K = Up(
                    M,
                    Ue
                  ), X = Up(
                    M,
                    Nt
                  );
                  if (K && X && (oe.rangeCount !== 1 || oe.anchorNode !== K.node || oe.anchorOffset !== K.offset || oe.focusNode !== X.node || oe.focusOffset !== X.offset)) {
                    var ae = fe.createRange();
                    ae.setStart(K.node, K.offset), oe.removeAllRanges(), Ue > Nt ? (oe.addRange(ae), oe.extend(X.node, X.offset)) : (ae.setEnd(X.node, X.offset), oe.addRange(ae));
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
          xu = !!Ud, Vd = Ud = null;
        } finally {
          mt = f, z.p = o, T.T = i;
        }
      }
      t.current = n, Wt = 2;
    }
  }
  function nv() {
    if (Wt === 2) {
      Wt = 0;
      var t = Hi, n = ol, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = T.T, T.T = null;
        var o = z.p;
        z.p = 2;
        var f = mt;
        mt |= 4;
        try {
          A0(t, n.alternate, n);
        } finally {
          mt = f, z.p = o, T.T = i;
        }
      }
      Wt = 3;
    }
  }
  function av() {
    if (Wt === 4 || Wt === 3) {
      Wt = 0, Fe();
      var t = Hi, n = ol, i = si, o = I0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Wt = 5 : (Wt = 0, ol = Hi = null, iv(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (ki = null), W(i), n = n.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
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
        n = T.T, f = z.p, z.p = 2, T.T = null;
        try {
          for (var h = t.onRecoverableError, w = 0; w < o.length; w++) {
            var M = o[w];
            h(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          T.T = n, z.p = f;
        }
      }
      (si & 3) !== 0 && su(), za(t), f = t.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? t === Cd ? go++ : (go = 0, Cd = t) : go = 0, vo(0);
    }
  }
  function iv(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Ql(n)));
  }
  function su() {
    return tv(), nv(), av(), rv();
  }
  function rv() {
    if (Wt !== 5) return !1;
    var t = Hi, n = Ed;
    Ed = 0;
    var i = W(si), o = T.T, f = z.p;
    try {
      z.p = 32 > i ? 32 : i, T.T = null, i = Nd, Nd = null;
      var h = Hi, w = si;
      if (Wt = 0, ol = Hi = null, si = 0, (mt & 6) !== 0) throw Error(l(331));
      var M = mt;
      if (mt |= 4, V0(h.current), H0(
        h,
        h.current,
        w,
        i
      ), mt = M, vo(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(nn, h);
        } catch {
        }
      return !0;
    } finally {
      z.p = f, T.T = o, iv(t, n);
    }
  }
  function lv(t, n, i) {
    n = Wn(i, n), n = id(t.stateNode, n, 2), t = Ai(t, n, 2), t !== null && (gt(t, 2), za(t));
  }
  function _t(t, n, i) {
    if (t.tag === 3)
      lv(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          lv(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ki === null || !ki.has(o))) {
            t = Wn(i, t), i = o0(2), o = Ai(n, i, 2), o !== null && (s0(
              i,
              o,
              n,
              t
            ), gt(o, 2), za(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Md(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new aE();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (wd = !0, f.add(i), t = sE.bind(null, t, n, i), n.then(t, t));
  }
  function sE(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Rt === t && (tt & i) === i && (Bt === 4 || Bt === 3 && (tt & 62914560) === tt && 300 > Ke() - nu ? (mt & 2) === 0 && sl(t, 0) : _d |= i, ll === tt && (ll = 0)), za(t);
  }
  function ov(t, n) {
    n === 0 && (n = Vt()), t = lr(t, n), t !== null && (gt(t, n), za(t));
  }
  function uE(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), ov(t, i);
  }
  function cE(t, n) {
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
    o !== null && o.delete(n), ov(t, i);
  }
  function fE(t, n) {
    return Ae(t, n);
  }
  var uu = null, cl = null, Ad = !1, cu = !1, Dd = !1, Ui = 0;
  function za(t) {
    t !== cl && t.next === null && (cl === null ? uu = cl = t : cl = cl.next = t), cu = !0, Ad || (Ad = !0, hE());
  }
  function vo(t, n) {
    if (!Dd && cu) {
      Dd = !0;
      do
        for (var i = !1, o = uu; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var w = o.suspendedLanes, M = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(w & ~M), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (i = !0, fv(o, h));
          } else
            h = tt, h = Ve(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || bt(o, h) || (i = !0, fv(o, h));
          o = o.next;
        }
      while (i);
      Dd = !1;
    }
  }
  function dE() {
    sv();
  }
  function sv() {
    cu = Ad = !1;
    var t = 0;
    Ui !== 0 && SE() && (t = Ui);
    for (var n = Ke(), i = null, o = uu; o !== null; ) {
      var f = o.next, h = uv(o, n);
      h === 0 ? (o.next = null, i === null ? uu = f : i.next = f, f === null && (cl = i)) : (i = o, (t !== 0 || (h & 3) !== 0) && (cu = !0)), o = f;
    }
    Wt !== 0 && Wt !== 5 || vo(t), Ui !== 0 && (Ui = 0);
  }
  function uv(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var w = 31 - Ut(h), M = 1 << w, $ = f[w];
      $ === -1 ? ((M & i) === 0 || (M & o) !== 0) && (f[w] = kt(M, n)) : $ <= n && (t.expiredLanes |= M), h &= ~M;
    }
    if (n = Rt, i = tt, i = Ve(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && lt(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || bt(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && lt(o), W(i)) {
        case 2:
        case 8:
          i = Yt;
          break;
        case 32:
          i = Lt;
          break;
        case 268435456:
          i = ut;
          break;
        default:
          i = Lt;
      }
      return o = cv.bind(null, t), i = Ae(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && lt(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function cv(t, n) {
    if (Wt !== 0 && Wt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (su() && t.callbackNode !== i)
      return null;
    var o = tt;
    return o = Ve(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (G0(t, o, n), uv(t, Ke()), t.callbackNode != null && t.callbackNode === i ? cv.bind(null, t) : null);
  }
  function fv(t, n) {
    if (su()) return null;
    G0(t, n, !0);
  }
  function hE() {
    NE(function() {
      (mt & 6) !== 0 ? Ae(
        yt,
        dE
      ) : sv();
    });
  }
  function jd() {
    if (Ui === 0) {
      var t = Zr;
      t === 0 && (t = ha, ha <<= 1, (ha & 261888) === 0 && (ha = 256)), Ui = t;
    }
    return Ui;
  }
  function dv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ys("" + t);
  }
  function hv(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function mE(t, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var h = dv(
        (f[Ne] || null).action
      ), w = o.submitter;
      w && (n = (n = w[Ne] || null) ? dv(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var M = new _s(
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
                if (Ui !== 0) {
                  var $ = w ? hv(f, w) : new FormData(f);
                  Jf(
                    i,
                    {
                      pending: !0,
                      data: $,
                      method: f.method,
                      action: h
                    },
                    null,
                    $
                  );
                }
              } else
                typeof h == "function" && (M.preventDefault(), $ = w ? hv(f, w) : new FormData(f), Jf(
                  i,
                  {
                    pending: !0,
                    data: $,
                    method: f.method,
                    action: h
                  },
                  h,
                  $
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var Od = 0; Od < pf.length; Od++) {
    var zd = pf[Od], pE = zd.toLowerCase(), gE = zd[0].toUpperCase() + zd.slice(1);
    va(
      pE,
      "on" + gE
    );
  }
  va(Yp, "onAnimationEnd"), va(Gp, "onAnimationIteration"), va(Fp, "onAnimationStart"), va("dblclick", "onDoubleClick"), va("focusin", "onFocus"), va("focusout", "onBlur"), va(jS, "onTransitionRun"), va(OS, "onTransitionStart"), va(zS, "onTransitionCancel"), va(Xp, "onTransitionEnd"), an("onMouseEnter", ["mouseout", "mouseover"]), an("onMouseLeave", ["mouseout", "mouseover"]), an("onPointerEnter", ["pointerout", "pointerover"]), an("onPointerLeave", ["pointerout", "pointerover"]), dn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), dn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), dn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), dn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), dn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), dn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var yo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yo)
  );
  function mv(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], f = o.event;
      o = o.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var w = o.length - 1; 0 <= w; w--) {
            var M = o[w], $ = M.instance, ie = M.currentTarget;
            if (M = M.listener, $ !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              Ns(ue);
            }
            f.currentTarget = null, h = $;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (M = o[w], $ = M.instance, ie = M.currentTarget, M = M.listener, $ !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              Ns(ue);
            }
            f.currentTarget = null, h = $;
          }
      }
    }
  }
  function We(t, n) {
    var i = n[ze];
    i === void 0 && (i = n[ze] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (pv(n, t, 2, !1), i.add(o));
  }
  function Ld(t, n, i) {
    var o = 0;
    n && (o |= 4), pv(
      i,
      t,
      o,
      n
    );
  }
  var fu = "_reactListening" + Math.random().toString(36).slice(2);
  function kd(t) {
    if (!t[fu]) {
      t[fu] = !0, Aa.forEach(function(i) {
        i !== "selectionchange" && (vE.has(i) || Ld(i, !1, t), Ld(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[fu] || (n[fu] = !0, Ld("selectionchange", !1, n));
    }
  }
  function pv(t, n, i, o) {
    switch (Yv(n)) {
      case 2:
        var f = GE;
        break;
      case 8:
        f = FE;
        break;
      default:
        f = Kd;
    }
    i = f.bind(
      null,
      n,
      i,
      t
    ), f = void 0, !tf || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, i, !0) : f !== void 0 ? t.addEventListener(n, i, {
      passive: f
    }) : t.addEventListener(n, i, !1);
  }
  function Hd(t, n, i, o, f) {
    var h = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var w = o.tag;
        if (w === 3 || w === 4) {
          var M = o.stateNode.containerInfo;
          if (M === f) break;
          if (w === 4)
            for (w = o.return; w !== null; ) {
              var $ = w.tag;
              if (($ === 3 || $ === 4) && w.stateNode.containerInfo === f)
                return;
              w = w.return;
            }
          for (; M !== null; ) {
            if (w = Ct(M), w === null) return;
            if ($ = w.tag, $ === 5 || $ === 6 || $ === 26 || $ === 27) {
              o = h = w;
              continue e;
            }
            M = M.parentNode;
          }
        }
        o = o.return;
      }
    xp(function() {
      var ie = h, ue = Wc(i), fe = [];
      e: {
        var re = Pp.get(t);
        if (re !== void 0) {
          var oe = _s, Te = t;
          switch (t) {
            case "keypress":
              if (xs(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = cS;
              break;
            case "focusin":
              Te = "focus", oe = lf;
              break;
            case "focusout":
              Te = "blur", oe = lf;
              break;
            case "beforeblur":
            case "afterblur":
              oe = lf;
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
              oe = Sp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = J_;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = hS;
              break;
            case Yp:
            case Gp:
            case Fp:
              oe = tS;
              break;
            case Xp:
              oe = pS;
              break;
            case "scroll":
            case "scrollend":
              oe = Q_;
              break;
            case "wheel":
              oe = vS;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = aS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Np;
              break;
            case "toggle":
            case "beforetoggle":
              oe = bS;
          }
          var Ue = (n & 4) !== 0, Nt = !Ue && (t === "scroll" || t === "scrollend"), K = Ue ? re !== null ? re + "Capture" : null : re;
          Ue = [];
          for (var X = ie, ae; X !== null; ) {
            var ce = X;
            if (ae = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ae === null || K === null || (ce = Ul(X, K), ce != null && Ue.push(
              bo(X, ce, ae)
            )), Nt) break;
            X = X.return;
          }
          0 < Ue.length && (re = new oe(
            re,
            Te,
            null,
            i,
            ue
          ), fe.push({ event: re, listeners: Ue }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (re = t === "mouseover" || t === "pointerover", oe = t === "mouseout" || t === "pointerout", re && i !== Jc && (Te = i.relatedTarget || i.fromElement) && (Ct(Te) || Te[Se]))
            break e;
          if ((oe || re) && (re = ue.window === ue ? ue : (re = ue.ownerDocument) ? re.defaultView || re.parentWindow : window, oe ? (Te = i.relatedTarget || i.toElement, oe = ie, Te = Te ? Ct(Te) : null, Te !== null && (Nt = u(Te), Ue = Te.tag, Te !== Nt || Ue !== 5 && Ue !== 27 && Ue !== 6) && (Te = null)) : (oe = null, Te = ie), oe !== Te)) {
            if (Ue = Sp, ce = "onMouseLeave", K = "onMouseEnter", X = "mouse", (t === "pointerout" || t === "pointerover") && (Ue = Np, ce = "onPointerLeave", K = "onPointerEnter", X = "pointer"), Nt = oe == null ? re : et(oe), ae = Te == null ? re : et(Te), re = new Ue(
              ce,
              X + "leave",
              oe,
              i,
              ue
            ), re.target = Nt, re.relatedTarget = ae, ce = null, Ct(ue) === ie && (Ue = new Ue(
              K,
              X + "enter",
              Te,
              i,
              ue
            ), Ue.target = ae, Ue.relatedTarget = Nt, ce = Ue), Nt = ce, oe && Te)
              t: {
                for (Ue = yE, K = oe, X = Te, ae = 0, ce = K; ce; ce = Ue(ce))
                  ae++;
                ce = 0;
                for (var He = X; He; He = Ue(He))
                  ce++;
                for (; 0 < ae - ce; )
                  K = Ue(K), ae--;
                for (; 0 < ce - ae; )
                  X = Ue(X), ce--;
                for (; ae--; ) {
                  if (K === X || X !== null && K === X.alternate) {
                    Ue = K;
                    break t;
                  }
                  K = Ue(K), X = Ue(X);
                }
                Ue = null;
              }
            else Ue = null;
            oe !== null && gv(
              fe,
              re,
              oe,
              Ue,
              !1
            ), Te !== null && Nt !== null && gv(
              fe,
              Nt,
              Te,
              Ue,
              !0
            );
          }
        }
        e: {
          if (re = ie ? et(ie) : window, oe = re.nodeName && re.nodeName.toLowerCase(), oe === "select" || oe === "input" && re.type === "file")
            var ft = Op;
          else if (Dp(re))
            if (zp)
              ft = MS;
            else {
              ft = RS;
              var De = CS;
            }
          else
            oe = re.nodeName, !oe || oe.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? ie && Kc(ie.elementType) && (ft = Op) : ft = TS;
          if (ft && (ft = ft(t, ie))) {
            jp(
              fe,
              ft,
              i,
              ue
            );
            break e;
          }
          De && De(t, re, ie), t === "focusout" && ie && re.type === "number" && ie.memoizedProps.value != null && Hl(re, "number", re.value);
        }
        switch (De = ie ? et(ie) : window, t) {
          case "focusin":
            (Dp(De) || De.contentEditable === "true") && ($r = De, df = ie, Xl = null);
            break;
          case "focusout":
            Xl = df = $r = null;
            break;
          case "mousedown":
            hf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hf = !1, qp(fe, i, ue);
            break;
          case "selectionchange":
            if (DS) break;
          case "keydown":
          case "keyup":
            qp(fe, i, ue);
        }
        var Xe;
        if (sf)
          e: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break e;
              case "compositionend":
                nt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break e;
            }
            nt = void 0;
          }
        else
          Vr ? Mp(t, i) && (nt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (nt = "onCompositionStart");
        nt && (Cp && i.locale !== "ko" && (Vr || nt !== "onCompositionStart" ? nt === "onCompositionEnd" && Vr && (Xe = wp()) : (Si = ue, nf = "value" in Si ? Si.value : Si.textContent, Vr = !0)), De = du(ie, nt), 0 < De.length && (nt = new Ep(
          nt,
          t,
          null,
          i,
          ue
        ), fe.push({ event: nt, listeners: De }), Xe ? nt.data = Xe : (Xe = Ap(i), Xe !== null && (nt.data = Xe)))), (Xe = wS ? _S(t, i) : SS(t, i)) && (nt = du(ie, "onBeforeInput"), 0 < nt.length && (De = new Ep(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: De,
          listeners: nt
        }), De.data = Xe)), mE(
          fe,
          t,
          ie,
          i,
          ue
        );
      }
      mv(fe, n);
    });
  }
  function bo(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function du(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = Ul(t, i), f != null && o.unshift(
        bo(t, f, h)
      ), f = Ul(t, n), f != null && o.push(
        bo(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function yE(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function gv(t, n, i, o, f) {
    for (var h = n._reactName, w = []; i !== null && i !== o; ) {
      var M = i, $ = M.alternate, ie = M.stateNode;
      if (M = M.tag, $ !== null && $ === o) break;
      M !== 5 && M !== 26 && M !== 27 || ie === null || ($ = ie, f ? (ie = Ul(i, h), ie != null && w.unshift(
        bo(i, ie, $)
      )) : f || (ie = Ul(i, h), ie != null && w.push(
        bo(i, ie, $)
      ))), i = i.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var bE = /\r\n?/g, xE = /\u0000|\uFFFD/g;
  function vv(t) {
    return (typeof t == "string" ? t : "" + t).replace(bE, `
`).replace(xE, "");
  }
  function yv(t, n) {
    return n = vv(n), vv(t) === n;
  }
  function Et(t, n, i, o, f, h) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Hr(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Hr(t, "" + o);
        break;
      case "className":
        ga(t, "class", o);
        break;
      case "tabIndex":
        ga(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ga(t, i, o);
        break;
      case "style":
        yp(t, o, h);
        break;
      case "data":
        if (n !== "object") {
          ga(t, "data", o);
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
        o = ys("" + o), t.setAttribute(i, o);
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
          typeof h == "function" && (i === "formAction" ? (n !== "input" && Et(t, n, "name", f.name, f, null), Et(
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
        o = ys("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = Xa);
        break;
      case "onScroll":
        o != null && We("scroll", t);
        break;
      case "onScrollEnd":
        o != null && We("scrollend", t);
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
        i = ys("" + o), t.setAttributeNS(
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
        We("beforetoggle", t), We("toggle", t), pa(t, "popover", o);
        break;
      case "xlinkActuate":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        pa(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = P_.get(i) || i, pa(t, i, o));
    }
  }
  function Bd(t, n, i, o, f, h) {
    switch (i) {
      case "style":
        yp(t, o, h);
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
        typeof o == "string" ? Hr(t, o) : (typeof o == "number" || typeof o == "bigint") && Hr(t, "" + o);
        break;
      case "onScroll":
        o != null && We("scroll", t);
        break;
      case "onScrollEnd":
        o != null && We("scrollend", t);
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
        if (!kn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), n = i.slice(2, f ? i.length - 7 : void 0), h = t[Ne] || null, h = h != null ? h[i] : null, typeof h == "function" && t.removeEventListener(n, h, f), typeof o == "function")) {
              typeof h != "function" && h !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, f);
              break e;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : pa(t, i, o);
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
        We("error", t), We("load", t);
        var o = !1, f = !1, h;
        for (h in i)
          if (i.hasOwnProperty(h)) {
            var w = i[h];
            if (w != null)
              switch (h) {
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
                  Et(t, n, h, w, i, null);
              }
          }
        f && Et(t, n, "srcSet", i.srcSet, i, null), o && Et(t, n, "src", i.src, i, null);
        return;
      case "input":
        We("invalid", t);
        var M = h = w = f = null, $ = null, ie = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var ue = i[o];
            if (ue != null)
              switch (o) {
                case "name":
                  f = ue;
                  break;
                case "type":
                  w = ue;
                  break;
                case "checked":
                  $ = ue;
                  break;
                case "defaultChecked":
                  ie = ue;
                  break;
                case "value":
                  h = ue;
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
                  Et(t, n, o, ue, i, null);
              }
          }
        kr(
          t,
          h,
          M,
          $,
          ie,
          w,
          f,
          !1
        );
        return;
      case "select":
        We("invalid", t), o = w = h = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (M = i[f], M != null))
            switch (f) {
              case "value":
                h = M;
                break;
              case "defaultValue":
                w = M;
                break;
              case "multiple":
                o = M;
              default:
                Et(t, n, f, M, i, null);
            }
        n = h, i = w, t.multiple = !!o, n != null ? _i(t, !!o, n, !1) : i != null && _i(t, !!o, i, !0);
        return;
      case "textarea":
        We("invalid", t), h = f = o = null;
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
                h = M;
                break;
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(l(91));
                break;
              default:
                Et(t, n, w, M, i, null);
            }
        gp(t, o, f, h);
        return;
      case "option":
        for ($ in i)
          if (i.hasOwnProperty($) && (o = i[$], o != null))
            switch ($) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Et(t, n, $, o, i, null);
            }
        return;
      case "dialog":
        We("beforetoggle", t), We("toggle", t), We("cancel", t), We("close", t);
        break;
      case "iframe":
      case "object":
        We("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < yo.length; o++)
          We(yo[o], t);
        break;
      case "image":
        We("error", t), We("load", t);
        break;
      case "details":
        We("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        We("error", t), We("load", t);
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
        for (ie in i)
          if (i.hasOwnProperty(ie) && (o = i[ie], o != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                Et(t, n, ie, o, i, null);
            }
        return;
      default:
        if (Kc(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (o = i[ue], o !== void 0 && Bd(
              t,
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
      i.hasOwnProperty(M) && (o = i[M], o != null && Et(t, n, M, o, i, null));
  }
  function wE(t, n, i, o) {
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
        var f = null, h = null, w = null, M = null, $ = null, ie = null, ue = null;
        for (oe in i) {
          var fe = i[oe];
          if (i.hasOwnProperty(oe) && fe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                $ = fe;
              default:
                o.hasOwnProperty(oe) || Et(t, n, oe, null, o, fe);
            }
        }
        for (var re in o) {
          var oe = o[re];
          if (fe = i[re], o.hasOwnProperty(re) && (oe != null || fe != null))
            switch (re) {
              case "type":
                h = oe;
                break;
              case "name":
                f = oe;
                break;
              case "checked":
                ie = oe;
                break;
              case "defaultChecked":
                ue = oe;
                break;
              case "value":
                w = oe;
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
                oe !== fe && Et(
                  t,
                  n,
                  re,
                  oe,
                  o,
                  fe
                );
            }
        }
        nr(
          t,
          w,
          M,
          $,
          ie,
          ue,
          h,
          f
        );
        return;
      case "select":
        oe = w = M = re = null;
        for (h in i)
          if ($ = i[h], i.hasOwnProperty(h) && $ != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = $;
              default:
                o.hasOwnProperty(h) || Et(
                  t,
                  n,
                  h,
                  null,
                  o,
                  $
                );
            }
        for (f in o)
          if (h = o[f], $ = i[f], o.hasOwnProperty(f) && (h != null || $ != null))
            switch (f) {
              case "value":
                re = h;
                break;
              case "defaultValue":
                M = h;
                break;
              case "multiple":
                w = h;
              default:
                h !== $ && Et(
                  t,
                  n,
                  f,
                  h,
                  o,
                  $
                );
            }
        n = M, i = w, o = oe, re != null ? _i(t, !!i, re, !1) : !!o != !!i && (n != null ? _i(t, !!i, n, !0) : _i(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        oe = re = null;
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
          if (f = o[w], h = i[w], o.hasOwnProperty(w) && (f != null || h != null))
            switch (w) {
              case "value":
                re = f;
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
                f !== h && Et(t, n, w, f, o, h);
            }
        Bl(t, re, oe);
        return;
      case "option":
        for (var Te in i)
          if (re = i[Te], i.hasOwnProperty(Te) && re != null && !o.hasOwnProperty(Te))
            switch (Te) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  n,
                  Te,
                  null,
                  o,
                  re
                );
            }
        for ($ in o)
          if (re = o[$], oe = i[$], o.hasOwnProperty($) && re !== oe && (re != null || oe != null))
            switch ($) {
              case "selected":
                t.selected = re && typeof re != "function" && typeof re != "symbol";
                break;
              default:
                Et(
                  t,
                  n,
                  $,
                  re,
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
        for (var Ue in i)
          re = i[Ue], i.hasOwnProperty(Ue) && re != null && !o.hasOwnProperty(Ue) && Et(t, n, Ue, null, o, re);
        for (ie in o)
          if (re = o[ie], oe = i[ie], o.hasOwnProperty(ie) && re !== oe && (re != null || oe != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(l(137, n));
                break;
              default:
                Et(
                  t,
                  n,
                  ie,
                  re,
                  o,
                  oe
                );
            }
        return;
      default:
        if (Kc(n)) {
          for (var Nt in i)
            re = i[Nt], i.hasOwnProperty(Nt) && re !== void 0 && !o.hasOwnProperty(Nt) && Bd(
              t,
              n,
              Nt,
              void 0,
              o,
              re
            );
          for (ue in o)
            re = o[ue], oe = i[ue], !o.hasOwnProperty(ue) || re === oe || re === void 0 && oe === void 0 || Bd(
              t,
              n,
              ue,
              re,
              o,
              oe
            );
          return;
        }
    }
    for (var K in i)
      re = i[K], i.hasOwnProperty(K) && re != null && !o.hasOwnProperty(K) && Et(t, n, K, null, o, re);
    for (fe in o)
      re = o[fe], oe = i[fe], !o.hasOwnProperty(fe) || re === oe || re == null && oe == null || Et(t, n, fe, re, o, oe);
  }
  function bv(t) {
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
  function _E() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], h = f.transferSize, w = f.initiatorType, M = f.duration;
        if (h && M && bv(w)) {
          for (w = 0, M = f.responseEnd, o += 1; o < i.length; o++) {
            var $ = i[o], ie = $.startTime;
            if (ie > M) break;
            var ue = $.transferSize, fe = $.initiatorType;
            ue && bv(fe) && ($ = $.responseEnd, w += ue * ($ < M ? 1 : (M - ie) / ($ - ie)));
          }
          if (--o, n += 8 * (h + w) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ud = null, Vd = null;
  function hu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function xv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wv(t, n) {
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
  function $d(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var qd = null;
  function SE() {
    var t = window.event;
    return t && t.type === "popstate" ? t === qd ? !1 : (qd = t, !0) : (qd = null, !1);
  }
  var _v = typeof setTimeout == "function" ? setTimeout : void 0, EE = typeof clearTimeout == "function" ? clearTimeout : void 0, Sv = typeof Promise == "function" ? Promise : void 0, NE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sv < "u" ? function(t) {
    return Sv.resolve(null).then(t).catch(CE);
  } : _v;
  function CE(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Vi(t) {
    return t === "head";
  }
  function Ev(t, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (t.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(f), ml(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          xo(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, xo(i);
          for (var h = i.firstChild; h; ) {
            var w = h.nextSibling, M = h.nodeName;
            h[Pe] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && h.rel.toLowerCase() === "stylesheet" || i.removeChild(h), h = w;
          }
        } else
          i === "body" && xo(t.ownerDocument.body);
      i = f;
    } while (i);
    ml(n);
  }
  function Nv(t, n) {
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
  function Id(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Id(i), ot(i);
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
  function RE(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var f = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[Pe])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (h = t.getAttribute("rel"), h === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (h !== f.rel || t.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || t.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (h = t.getAttribute("src"), (h !== (f.src == null ? null : f.src) || t.getAttribute("type") !== (f.type == null ? null : f.type) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && h && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var h = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && t.getAttribute("name") === h)
          return t;
      } else return t;
      if (t = ia(t.nextSibling), t === null) break;
    }
    return null;
  }
  function TE(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ia(t.nextSibling), t === null)) return null;
    return t;
  }
  function Cv(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ia(t.nextSibling), t === null)) return null;
    return t;
  }
  function Yd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Gd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function ME(t, n) {
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
  var Fd = null;
  function Rv(t) {
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
  function Tv(t) {
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
  function Mv(t, n, i) {
    switch (n = hu(i), t) {
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
  function xo(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    ot(t);
  }
  var ra = /* @__PURE__ */ new Map(), Av = /* @__PURE__ */ new Set();
  function mu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ui = z.d;
  z.d = {
    f: AE,
    r: DE,
    D: jE,
    C: OE,
    L: zE,
    m: LE,
    X: HE,
    S: kE,
    M: BE
  };
  function AE() {
    var t = ui.f(), n = ru();
    return t || n;
  }
  function DE(t) {
    var n = ct(t);
    n !== null && n.tag === 5 && n.type === "form" ? Xg(n) : ui.r(t);
  }
  var fl = typeof document > "u" ? null : document;
  function Dv(t, n, i) {
    var o = fl;
    if (o && typeof n == "string" && n) {
      var f = rn(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), Av.has(f) || (Av.add(f), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), un(n, "link", t), it(n), o.head.appendChild(n)));
    }
  }
  function jE(t) {
    ui.D(t), Dv("dns-prefetch", t, null);
  }
  function OE(t, n) {
    ui.C(t, n), Dv("preconnect", t, n);
  }
  function zE(t, n, i) {
    ui.L(t, n, i);
    var o = fl;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + rn(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + rn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + rn(
        i.imageSizes
      ) + '"]')) : f += '[href="' + rn(t) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = dl(t);
          break;
        case "script":
          h = hl(t);
      }
      ra.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), ra.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(wo(h)) || n === "script" && o.querySelector(_o(h)) || (n = o.createElement("link"), un(n, "link", t), it(n), o.head.appendChild(n)));
    }
  }
  function LE(t, n) {
    ui.m(t, n);
    var i = fl;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + rn(o) + '"][href="' + rn(t) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = hl(t);
      }
      if (!ra.has(h) && (t = g({ rel: "modulepreload", href: t }, n), ra.set(h, t), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(_o(h)))
              return;
        }
        o = i.createElement("link"), un(o, "link", t), it(o), i.head.appendChild(o);
      }
    }
  }
  function kE(t, n, i) {
    ui.S(t, n, i);
    var o = fl;
    if (o && t) {
      var f = zt(o).hoistableStyles, h = dl(t);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var M = { loading: 0, preload: null };
        if (w = o.querySelector(
          wo(h)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = ra.get(h)) && Xd(t, i);
          var $ = w = o.createElement("link");
          it($), un($, "link", t), $._p = new Promise(function(ie, ue) {
            $.onload = ie, $.onerror = ue;
          }), $.addEventListener("load", function() {
            M.loading |= 1;
          }), $.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, pu(w, n, o);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: M
        }, f.set(h, w);
      }
    }
  }
  function HE(t, n) {
    ui.X(t, n);
    var i = fl;
    if (i && t) {
      var o = zt(i).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = i.querySelector(_o(f)), h || (t = g({ src: t, async: !0 }, n), (n = ra.get(f)) && Pd(t, n), h = i.createElement("script"), it(h), un(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function BE(t, n) {
    ui.M(t, n);
    var i = fl;
    if (i && t) {
      var o = zt(i).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = i.querySelector(_o(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = ra.get(f)) && Pd(t, n), h = i.createElement("script"), it(h), un(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function jv(t, n, i, o) {
    var f = (f = he.current) ? mu(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = dl(i.href), i = zt(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = dl(i.href);
          var h = zt(
            f
          ).hoistableStyles, w = h.get(t);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, w), (h = f.querySelector(
            wo(t)
          )) && !h._p && (w.instance = h, w.state.loading = 5), ra.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, ra.set(t, i), h || UE(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = hl(i), i = zt(
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
  function dl(t) {
    return 'href="' + rn(t) + '"';
  }
  function wo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Ov(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function UE(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), un(n, "link", i), it(n), t.head.appendChild(n));
  }
  function hl(t) {
    return '[src="' + rn(t) + '"]';
  }
  function _o(t) {
    return "script[async]" + t;
  }
  function zv(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + rn(i.href) + '"]'
          );
          if (o)
            return n.instance = o, it(o), o;
          var f = g({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), it(o), un(o, "style", f), pu(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          f = dl(i.href);
          var h = t.querySelector(
            wo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, it(h), h;
          o = Ov(i), (f = ra.get(f)) && Xd(o, f), h = (t.ownerDocument || t).createElement("link"), it(h);
          var w = h;
          return w._p = new Promise(function(M, $) {
            w.onload = M, w.onerror = $;
          }), un(h, "link", o), n.state.loading |= 4, pu(h, i.precedence, t), n.instance = h;
        case "script":
          return h = hl(i.src), (f = t.querySelector(
            _o(h)
          )) ? (n.instance = f, it(f), f) : (o = i, (f = ra.get(h)) && (o = g({}, i), Pd(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), it(f), un(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, pu(o, i.precedence, t));
    return n.instance;
  }
  function pu(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, w = 0; w < o.length; w++) {
      var M = o[w];
      if (M.dataset.precedence === n) h = M;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Xd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Pd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var gu = null;
  function Lv(t, n, i) {
    if (gu === null) {
      var o = /* @__PURE__ */ new Map(), f = gu = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = gu, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), f = 0; f < i.length; f++) {
      var h = i[f];
      if (!(h[Pe] || h[xe] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = h.getAttribute(n) || "";
        w = t + w;
        var M = o.get(w);
        M ? M.push(h) : o.set(w, [h]);
      }
    }
    return o;
  }
  function kv(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function VE(t, n, i) {
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
  function Hv(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function $E(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = dl(o.href), h = n.querySelector(
          wo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = vu.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = h, it(h);
          return;
        }
        h = n.ownerDocument || n, o = Ov(o), (f = ra.get(f)) && Xd(o, f), h = h.createElement("link"), it(h);
        var w = h;
        w._p = new Promise(function(M, $) {
          w.onload = M, w.onerror = $;
        }), un(h, "link", o), i.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = vu.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Zd = 0;
  function qE(t, n) {
    return t.stylesheets && t.count === 0 && bu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && bu(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Zd === 0 && (Zd = 62500 * _E());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && bu(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Zd ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function vu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) bu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var yu = null;
  function bu(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, yu = /* @__PURE__ */ new Map(), n.forEach(IE, t), yu = null, vu.call(t));
  }
  function IE(t, n) {
    if (!(n.state.loading & 4)) {
      var i = yu.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), yu.set(t, i);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (i.set(w.dataset.precedence, w), o = w);
        }
        o && i.set(null, o);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = i.get(w) || o, h === o && i.set(null, f), i.set(w, f), this.count++, o = vu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var So = {
    $$typeof: C,
    Provider: null,
    Consumer: null,
    _currentValue: G,
    _currentValue2: G,
    _threadCount: 0
  };
  function YE(t, n, i, o, f, h, w, M, $) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gn(0), this.hiddenUpdates = gn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = $, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Bv(t, n, i, o, f, h, w, M, $, ie, ue, fe) {
    return t = new YE(
      t,
      n,
      i,
      w,
      $,
      ie,
      ue,
      fe,
      M
    ), n = 1, h === !0 && (n |= 24), h = Un(3, null, null, n), t.current = h, h.stateNode = t, n = Tf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, jf(h), t;
  }
  function Uv(t) {
    return t ? (t = Yr, t) : Yr;
  }
  function Vv(t, n, i, o, f, h) {
    f = Uv(f), o.context === null ? o.context = f : o.pendingContext = f, o = Mi(n), o.payload = { element: i }, h = h === void 0 ? null : h, h !== null && (o.callback = h), i = Ai(t, o, n), i !== null && (Dn(i, t, n), eo(i, t, n));
  }
  function $v(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Qd(t, n) {
    $v(t, n), (t = t.alternate) && $v(t, n);
  }
  function qv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = lr(t, 67108864);
      n !== null && Dn(n, t, 67108864), Qd(t, 67108864);
    }
  }
  function Iv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Yn();
      n = P(n);
      var i = lr(t, n);
      i !== null && Dn(i, t, n), Qd(t, n);
    }
  }
  var xu = !0;
  function GE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = z.p;
    try {
      z.p = 2, Kd(t, n, i, o);
    } finally {
      z.p = h, T.T = f;
    }
  }
  function FE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = z.p;
    try {
      z.p = 8, Kd(t, n, i, o);
    } finally {
      z.p = h, T.T = f;
    }
  }
  function Kd(t, n, i, o) {
    if (xu) {
      var f = Jd(o);
      if (f === null)
        Hd(
          t,
          n,
          o,
          wu,
          i
        ), Gv(t, o);
      else if (PE(
        f,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (Gv(t, o), n & 4 && -1 < XE.indexOf(t)) {
        for (; f !== null; ) {
          var h = ct(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var w = fn(h.pendingLanes);
                  if (w !== 0) {
                    var M = h;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; w; ) {
                      var $ = 1 << 31 - Ut(w);
                      M.entanglements[1] |= $, w &= ~$;
                    }
                    za(h), (mt & 6) === 0 && (au = Ke() + 500, vo(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = lr(h, 2), M !== null && Dn(M, h, 2), ru(), Qd(h, 2);
            }
          if (h = Jd(o), h === null && Hd(
            t,
            n,
            o,
            wu,
            i
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        Hd(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function Jd(t) {
    return t = Wc(t), Wd(t);
  }
  var wu = null;
  function Wd(t) {
    if (wu = null, t = Ct(t), t !== null) {
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
    return wu = t, null;
  }
  function Yv(t) {
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
        switch (vt()) {
          case yt:
            return 2;
          case Yt:
            return 8;
          case Lt:
          case pt:
            return 32;
          case ut:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var eh = !1, $i = null, qi = null, Ii = null, Eo = /* @__PURE__ */ new Map(), No = /* @__PURE__ */ new Map(), Yi = [], XE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Gv(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        $i = null;
        break;
      case "dragenter":
      case "dragleave":
        qi = null;
        break;
      case "mouseover":
      case "mouseout":
        Ii = null;
        break;
      case "pointerover":
      case "pointerout":
        Eo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        No.delete(n.pointerId);
    }
  }
  function Co(t, n, i, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = ct(n), n !== null && qv(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function PE(t, n, i, o, f) {
    switch (n) {
      case "focusin":
        return $i = Co(
          $i,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return qi = Co(
          qi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return Ii = Co(
          Ii,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return Eo.set(
          h,
          Co(
            Eo.get(h) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, No.set(
          h,
          Co(
            No.get(h) || null,
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
  function Fv(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Iv(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Iv(i);
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
  function _u(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Jd(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Jc = o, i.target.dispatchEvent(o), Jc = null;
      } else
        return n = ct(i), n !== null && qv(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Xv(t, n, i) {
    _u(t) && i.delete(n);
  }
  function ZE() {
    eh = !1, $i !== null && _u($i) && ($i = null), qi !== null && _u(qi) && (qi = null), Ii !== null && _u(Ii) && (Ii = null), Eo.forEach(Xv), No.forEach(Xv);
  }
  function Su(t, n) {
    t.blockedOn === n && (t.blockedOn = null, eh || (eh = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      ZE
    )));
  }
  var Eu = null;
  function Pv(t) {
    Eu !== t && (Eu = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        Eu === t && (Eu = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Wd(o || i) === null)
              continue;
            break;
          }
          var h = ct(i);
          h !== null && (t.splice(n, 3), n -= 3, Jf(
            h,
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
  function ml(t) {
    function n($) {
      return Su($, t);
    }
    $i !== null && Su($i, t), qi !== null && Su(qi, t), Ii !== null && Su(Ii, t), Eo.forEach(n), No.forEach(n);
    for (var i = 0; i < Yi.length; i++) {
      var o = Yi[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Yi.length && (i = Yi[0], i.blockedOn === null); )
      Fv(i), i.blockedOn === null && Yi.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], h = i[o + 1], w = f[Ne] || null;
        if (typeof h == "function")
          w || Pv(i);
        else if (w) {
          var M = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[Ne] || null)
              M = w.formAction;
            else if (Wd(f) !== null) continue;
          } else M = w.action;
          typeof M == "function" ? i[o + 1] = M : (i.splice(o, 3), o -= 3), Pv(i);
        }
      }
  }
  function Zv() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
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
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
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
  function th(t) {
    this._internalRoot = t;
  }
  Nu.prototype.render = th.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = Yn();
    Vv(i, o, t, n, null, null);
  }, Nu.prototype.unmount = th.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      Vv(t.current, 2, null, t, null, null), ru(), n[Se] = null;
    }
  };
  function Nu(t) {
    this._internalRoot = t;
  }
  Nu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = de();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < Yi.length && n !== 0 && n < Yi[i].priority; i++) ;
      Yi.splice(i, 0, t), i === 0 && Fv(t);
    }
  };
  var Qv = a.version;
  if (Qv !== "19.2.7")
    throw Error(
      l(
        527,
        Qv,
        "19.2.7"
      )
    );
  z.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var QE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Cu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Cu.isDisabled && Cu.supportsFiber)
      try {
        nn = Cu.inject(
          QE
        ), Kt = Cu;
      } catch {
      }
  }
  return To.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var i = !1, o = "", f = a0, h = i0, w = r0;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = Bv(
      t,
      1,
      !1,
      null,
      null,
      i,
      o,
      null,
      f,
      h,
      w,
      Zv
    ), t[Se] = n.current, kd(t), new th(n);
  }, To.hydrateRoot = function(t, n, i) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = a0, w = i0, M = r0, $ = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (w = i.onCaughtError), i.onRecoverableError !== void 0 && (M = i.onRecoverableError), i.formState !== void 0 && ($ = i.formState)), n = Bv(
      t,
      1,
      !0,
      n,
      i ?? null,
      o,
      f,
      $,
      h,
      w,
      M,
      Zv
    ), n.context = Uv(null), i = n.current, o = Yn(), o = P(o), f = Mi(o), f.callback = null, Ai(i, f, o), i = o, n.current.lanes = i, gt(n, i), za(n), t[Se] = n.current, kd(t), new Nu(n);
  }, To.version = "19.2.7", To;
}
var ly;
function o2() {
  if (ly) return ih.exports;
  ly = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), ih.exports = l2(), ih.exports;
}
var s2 = o2();
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
var Yx = (e) => {
  throw TypeError(e);
}, Gx = (e, a, r) => a.has(e) || Yx("Cannot " + r), oa = (e, a, r) => (Gx(e, a, "read from private field"), r ? r.call(e) : a.get(e)), Ho = (e, a, r) => a.has(e) ? Yx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), La = (e, a, r, l) => (Gx(e, a, "write to private field"), a.set(e, r), r);
function oy(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function u2(e = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: l = !1 } = e, s;
  s = a.map(
    (x, _) => y(
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
  function m() {
    return s[u];
  }
  function y(x, _ = null, E, N) {
    let R = qh(
      s ? m().pathname : "/",
      x,
      _,
      E,
      N
    );
    return It(
      R.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), R;
  }
  function g(x) {
    return typeof x == "string" ? x : Ya(x);
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
    createHref: g,
    createURL(x) {
      return new URL(g(x), "http://localhost");
    },
    encodeLocation(x) {
      let _ = typeof x == "string" ? Ca(x) : x;
      return {
        pathname: _.pathname || "",
        search: _.search || "",
        hash: _.hash || ""
      };
    },
    push(x, _) {
      c = "PUSH";
      let E = oy(x) ? x : y(x, _);
      u += 1, s.splice(u, s.length, E), l && d && d({ action: c, location: E, delta: 1 });
    },
    replace(x, _) {
      c = "REPLACE";
      let E = oy(x) ? x : y(x, _);
      s[u] = E, l && d && d({ action: c, location: E, delta: 0 });
    },
    go(x) {
      c = "POP";
      let _ = p(u + x), E = s[_];
      u = _, d && d({ action: c, location: E, delta: x });
    },
    listen(x) {
      return d = x, () => {
        d = null;
      };
    }
  };
}
function Qe(e, a) {
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
function c2() {
  return Math.random().toString(36).substring(2, 10);
}
function qh(e, a, r = null, l, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Ca(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || c2(),
    mask: s
  };
}
function Ya({
  pathname: e = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function Ca(e) {
  let a = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (a.hash = e.substring(r), e = e.substring(0, r));
    let l = e.indexOf("?");
    l >= 0 && (a.search = e.substring(l), e = e.substring(0, l)), e && (a.pathname = e);
  }
  return a;
}
function f2(e, a, r = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Qe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ya(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Bo, sy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (Ho(this, Bo, /* @__PURE__ */ new Map()), e)
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
    if (oa(this, Bo).has(e))
      return oa(this, Bo).get(e);
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
    oa(this, Bo).set(e, a);
  }
};
Bo = /* @__PURE__ */ new WeakMap();
var d2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function h2(e) {
  return d2.has(
    e
  );
}
var m2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function p2(e) {
  return m2.has(
    e
  );
}
function g2(e) {
  return e.index === !0;
}
function Go(e, a, r = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...r, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Qe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Qe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), g2(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = uy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = uy(
        m,
        a(m)
      ), u.children && (m.children = Go(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function uy(e, a) {
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
function Fx(e, a, r = "/") {
  return xa(e, a, r, !1);
}
function xa(e, a, r, l, s) {
  let u = typeof a == "string" ? Ca(a) : a, c = fa(u.pathname || "/", r);
  if (c == null)
    return null;
  let d = s ?? Ju(e), p = null, m = M2(c);
  for (let y = 0; p == null && y < d.length; ++y)
    p = R2(
      d[y],
      m,
      l
    );
  return p;
}
function v2(e, a) {
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
function Ju(e) {
  let a = Xx(e);
  return y2(a), a;
}
function Xx(e, a = [], r = [], l = "", s = !1) {
  let u = (c, d, p = s, m) => {
    let y = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: d,
      route: c
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(l) && p)
        return;
      Qe(
        y.relativePath.startsWith(l),
        `Absolute route path "${y.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(l.length);
    }
    let g = ca([l, y.relativePath]), b = r.concat(y);
    c.children && c.children.length > 0 && (Qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Xx(
      c.children,
      a,
      b,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: N2(g, c.index),
      routesMeta: b
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of Px(c.path))
        u(c, d, !0, p);
  }), a;
}
function Px(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Px(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function y2(e) {
  e.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : C2(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var b2 = /^:[\w-]+$/, x2 = 3, w2 = 2, _2 = 1, S2 = 10, E2 = -2, cy = (e) => e === "*";
function N2(e, a) {
  let r = e.split("/"), l = r.length;
  return r.some(cy) && (l += E2), a && (l += w2), r.filter((s) => !cy(s)).reduce(
    (s, u) => s + (b2.test(u) ? x2 : u === "" ? _2 : S2),
    l
  );
}
function C2(e, a) {
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
function R2(e, a, r = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", g = uc(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), b = p.route;
    if (!g && m && r && !l[l.length - 1].route.index && (g = uc(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !g)
      return null;
    Object.assign(s, g.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: ca([u, g.pathname]),
      pathnameBase: j2(
        ca([u, g.pathnameBase])
      ),
      route: b
    }), g.pathnameBase !== "/" && (u = ca([u, g.pathnameBase]));
  }
  return c;
}
function uc(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, l] = T2(
    e.path,
    e.caseSensitive,
    e.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: l.reduce(
      (m, { paramName: y, isOptional: g }, b) => {
        if (y === "*") {
          let _ = d[b] || "";
          c = u.slice(0, u.length - _.length).replace(/(.)\/+$/, "$1");
        }
        const x = d[b];
        return g && !x ? m[y] = void 0 : m[y] = (x || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: e
  };
}
function T2(e, a = !1, r = !0) {
  It(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let l = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, d, p, m, y) => {
      if (l.push({ paramName: d, isOptional: p != null }), p) {
        let g = y.charAt(m + c.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (l.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function M2(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return It(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), e;
  }
}
function fa(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, l = e.charAt(r);
  return l && l !== "/" ? null : e.slice(r) || "/";
}
function A2({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : ca([e, a]);
}
var Zx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, _m = (e) => Zx.test(e);
function D2(e, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Ca(e) : e, u;
  return r ? (r = Em(r), r.startsWith("/") ? u = fy(r.substring(1), "/") : u = fy(r, a)) : u = a, {
    pathname: u,
    search: O2(l),
    hash: z2(s)
  };
}
function fy(e, a) {
  let r = cc(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function sh(e, a, r, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Qx(e) {
  return e.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Sm(e) {
  let a = Qx(e);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Mc(e, a, r, l = !1) {
  let s;
  typeof e == "string" ? s = Ca(e) : (s = { ...e }, Qe(
    !s.pathname || !s.pathname.includes("?"),
    sh("?", "pathname", "search", s)
  ), Qe(
    !s.pathname || !s.pathname.includes("#"),
    sh("#", "pathname", "hash", s)
  ), Qe(
    !s.search || !s.search.includes("#"),
    sh("#", "search", "hash", s)
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
  let p = D2(s, d), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var Em = (e) => e.replace(/\/\/+/g, "/"), ca = (e) => Em(e.join("/")), cc = (e) => e.replace(/\/+$/, ""), j2 = (e) => cc(e).replace(/^\/*/, "/"), O2 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, z2 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, dy = (e, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", e), new Response(null, { ...r, headers: l });
}, Ac = class {
  constructor(e, a, r, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Fo(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function os(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return ca(a) || "/";
}
var Kx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Jx(e, a) {
  let r = e;
  if (typeof r != "string" || !Zx.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (Kx)
    try {
      let u = new URL(window.location.href), c = r.startsWith("//") ? new URL(u.protocol + r) : new URL(r), d = fa(c.pathname, a);
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
var Ki = Symbol("Uninstrumented");
function L2(e, a) {
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
    let s = wl(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = r[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = wl(d, c, () => {
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
      let c = u[Ki] ?? u, d = wl(
        r[s],
        c,
        (...p) => hy(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[Ki] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Ki] ?? s, c = wl(
      r.middleware,
      u,
      (...d) => hy(d[0])
    );
    return c ? (c[Ki] = u, c) : s;
  })), l;
}
function k2(e, a) {
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
    let l = e.navigate[Ki] ?? e.navigate, s = wl(
      r.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? Ya(c) : ".",
          ...my(e, d ?? {})
        };
      }
    );
    s && (s[Ki] = l, e.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = e.fetch[Ki] ?? e.fetch, s = wl(r.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...my(e, p ?? {})
      };
    });
    s && (s[Ki] = l, e.fetch = s);
  }
  return e;
}
function wl(e, a, r) {
  return e.length === 0 ? null : async (...l) => {
    let s = await Wx(
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
async function Wx(e, a, r, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Wx(e, a, r, l - 1), u = await c, Qe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function hy(e) {
  let { request: a, context: r, params: l, pattern: s } = e;
  return {
    request: H2(a),
    params: { ...l },
    pattern: s,
    context: B2(r)
  };
}
function my(e, a) {
  return {
    currentUrl: Ya(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function H2(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function B2(e) {
  if (V2(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var U2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function V2(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === U2;
}
var e1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], $2 = new Set(
  e1
), q2 = [
  "GET",
  ...e1
], I2 = new Set(q2), t1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Y2 = /* @__PURE__ */ new Set([307, 308]), uh = {
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
}, G2 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Mo = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, F2 = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), n1 = "remix-router-transitions", a1 = Symbol("ResetLoaderData"), _r, vl, Pi, yl, X2 = class {
  constructor(e) {
    Ho(this, _r), Ho(this, vl), Ho(this, Pi), Ho(this, yl), La(this, _r, e), La(this, vl, Ju(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return oa(this, _r);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return oa(this, Pi) ?? oa(this, _r);
  }
  /** Pre-computed branches */
  get branches() {
    return oa(this, yl) ?? oa(this, vl);
  }
  get hasHMRRoutes() {
    return oa(this, Pi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    La(this, _r, e), La(this, vl, Ju(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    La(this, Pi, e), La(this, yl, Ju(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    oa(this, Pi) && (La(this, _r, oa(this, Pi)), La(this, vl, oa(this, yl)), La(this, Pi, void 0), La(this, yl, void 0));
  }
};
_r = /* @__PURE__ */ new WeakMap();
vl = /* @__PURE__ */ new WeakMap();
Pi = /* @__PURE__ */ new WeakMap();
yl = /* @__PURE__ */ new WeakMap();
function P2(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Qe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || F2, u = s;
  if (e.instrumentations) {
    let U = e.instrumentations;
    u = (P) => ({
      ...s(P),
      ...L2(
        U.map((W) => W.route).filter(Boolean),
        P
      )
    });
  }
  let c = {}, d = new X2(
    Go(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || W2, y = {
    ...e.future
  }, g = null, b = /* @__PURE__ */ new Set(), x = null, _ = null, E = null, N = null, R = e.hydrationData != null, j = xa(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), C = !1, O = null, B, k;
  if (j == null && !e.patchRoutesOnNavigation) {
    let U = sa(404, {
      pathname: e.history.location.pathname
    }), { matches: P, route: W } = Ru(d.activeRoutes);
    B = !0, k = !B, j = P, O = { [W.id]: U };
  } else if (j && !e.hydrationData && gn(
    j,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (j = null), j)
    if (j.some((U) => U.route.lazy))
      B = !1, k = !B;
    else if (!j.some((U) => Nm(U.route)))
      B = !0, k = !B;
    else {
      let U = e.hydrationData ? e.hydrationData.loaderData : null, P = e.hydrationData ? e.hydrationData.errors : null, W = j;
      if (P) {
        let de = j.findIndex(
          (ge) => P[ge.route.id] !== void 0
        );
        W = W.slice(0, de + 1);
      }
      k = !1, B = !0, W.forEach((de) => {
        let ge = i1(de.route, U, P);
        k = k || ge.renderFallback, B = B && !ge.shouldLoad;
      });
    }
  else {
    B = !1, k = !B, j = [];
    let U = gn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    U.active && U.matches && (C = !0, j = U.matches);
  }
  let H, A = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: j,
    initialized: B,
    renderFallback: k,
    navigation: uh,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Y = "POP", le = null, q = !1, Q, ne = !1, L = /* @__PURE__ */ new Map(), I = null, T = !1, z = !1, G = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Map(), te = 0, D = -1, V = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), me = /* @__PURE__ */ new Map(), J, ve = null;
  function Oe() {
    if (g = e.history.listen(
      ({ action: U, location: P, delta: W }) => {
        if (J) {
          J(), J = void 0;
          return;
        }
        It(
          me.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = Qn({
          currentLocation: A.location,
          nextLocation: P,
          historyAction: U
        });
        if (de && W != null) {
          let ge = new Promise((Ce) => {
            J = Ce;
          });
          e.history.go(W * -1), Ln(de, {
            state: "blocked",
            location: P,
            proceed() {
              Ln(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: P
              }), ge.then(() => e.history.go(W));
            },
            reset() {
              let Ce = new Map(A.blockers);
              Ce.set(de, Mo), we({ blockers: Ce });
            }
          }), le?.resolve(), le = null;
          return;
        }
        return pe(U, P);
      }
    ), r) {
      vN(a, L);
      let U = () => yN(a, L);
      a.addEventListener("pagehide", U), I = () => a.removeEventListener("pagehide", U);
    }
    return A.initialized || pe("POP", A.location, {
      initialHydration: !0
    }), H;
  }
  function je() {
    g && g(), I && I(), b.clear(), Q && Q.abort(), A.fetchers.forEach((U, P) => nn(A.fetchers, P)), A.blockers.forEach((U, P) => ha(P));
  }
  function Ee(U) {
    if (b.add(U), x) {
      let { newErrors: P } = x;
      x = null, U(A, {
        deletedFetchers: [],
        newErrors: P,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => b.delete(U);
  }
  function we(U, P = {}) {
    U.matches && (U.matches = U.matches.map((ge) => {
      let Ce = c[ge.route.id], xe = ge.route;
      return xe.element !== Ce.element || xe.errorElement !== Ce.errorElement || xe.hydrateFallbackElement !== Ce.hydrateFallbackElement ? {
        ...ge,
        route: Ce
      } : ge;
    })), A = {
      ...A,
      ...U
    };
    let W = [], de = [];
    A.fetchers.forEach((ge, Ce) => {
      ge.state === "idle" && (he.has(Ce) ? W.push(Ce) : de.push(Ce));
    }), he.forEach((ge) => {
      !A.fetchers.has(ge) && !F.has(ge) && W.push(ge);
    }), b.size === 0 && (x = { newErrors: U.errors ?? null }), [...b].forEach(
      (ge) => ge(A, {
        deletedFetchers: W,
        newErrors: U.errors ?? null,
        viewTransitionOpts: P.viewTransitionOpts,
        flushSync: P.flushSync === !0
      })
    ), W.forEach((ge) => nn(A.fetchers, ge)), de.forEach((ge) => A.fetchers.delete(ge));
  }
  function Me(U, P, { flushSync: W } = {}) {
    let de = A.actionData != null && A.navigation.formMethod != null && mn(A.navigation.formMethod) && A.navigation.state === "loading" && U.state?._isRedirect !== !0, ge;
    P.actionData ? Object.keys(P.actionData).length > 0 ? ge = P.actionData : ge = null : de ? ge = A.actionData : ge = null;
    let Ce = P.loaderData ? Ny(
      A.loaderData,
      P.loaderData,
      P.matches || [],
      P.errors
    ) : A.loaderData, xe = A.blockers;
    xe.size > 0 && (xe = new Map(xe), xe.forEach((Le, qe) => xe.set(qe, Mo)));
    let Ne = T ? !1 : Vt(U, P.matches || A.matches), Se = q === !0 || A.navigation.formMethod != null && mn(A.navigation.formMethod) && U.state?._isRedirect !== !0;
    d.commitHmrRoutes(), T || Y === "POP" || (Y === "PUSH" ? e.history.push(U, U.state) : Y === "REPLACE" && e.history.replace(U, U.state));
    let ze;
    if (Y === "POP") {
      let Le = L.get(A.location.pathname);
      Le && Le.has(U.pathname) ? ze = {
        currentLocation: A.location,
        nextLocation: U
      } : L.has(U.pathname) && (ze = {
        currentLocation: U,
        nextLocation: A.location
      });
    } else if (ne) {
      let Le = L.get(A.location.pathname);
      Le ? Le.add(U.pathname) : (Le = /* @__PURE__ */ new Set([U.pathname]), L.set(A.location.pathname, Le)), ze = {
        currentLocation: A.location,
        nextLocation: U
      };
    }
    we(
      {
        ...P,
        // matches, errors, fetchers go through as-is
        actionData: ge,
        loaderData: Ce,
        historyAction: Y,
        location: U,
        initialized: !0,
        renderFallback: !1,
        navigation: uh,
        revalidation: "idle",
        restoreScrollPosition: Ne,
        preventScrollReset: Se,
        blockers: xe
      },
      {
        viewTransitionOpts: ze,
        flushSync: W === !0
      }
    ), Y = "POP", q = !1, ne = !1, T = !1, z = !1, le?.resolve(), le = null, ve?.resolve(), ve = null;
  }
  async function Ye(U, P) {
    if (le?.resolve(), le = null, typeof U == "number") {
      le || (le = My());
      let ot = le.promise;
      return e.history.go(U), ot;
    }
    let W = Ih(
      A.location,
      A.matches,
      p,
      U,
      P?.fromRouteId,
      P?.relative
    ), { path: de, submission: ge, error: Ce } = py(
      !1,
      W,
      P
    ), xe;
    P?.mask && (xe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof P.mask == "string" ? Ca(P.mask) : {
        ...A.location.mask,
        ...P.mask
      }
    });
    let Ne = A.location, Se = qh(
      Ne,
      de,
      P && P.state,
      void 0,
      xe
    );
    Se = {
      ...Se,
      ...e.history.encodeLocation(Se)
    };
    let ze = P && P.replace != null ? P.replace : void 0, Le = "PUSH";
    ze === !0 ? Le = "REPLACE" : ze === !1 || ge != null && mn(ge.formMethod) && ge.formAction === A.location.pathname + A.location.search && (Le = "REPLACE");
    let qe = P && "preventScrollReset" in P ? P.preventScrollReset === !0 : void 0, Be = (P && P.flushSync) === !0, Pe = Qn({
      currentLocation: Ne,
      nextLocation: Se,
      historyAction: Le
    });
    if (Pe) {
      Ln(Pe, {
        state: "blocked",
        location: Se,
        proceed() {
          Ln(Pe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Se
          }), Ye(U, P);
        },
        reset() {
          let ot = new Map(A.blockers);
          ot.set(Pe, Mo), we({ blockers: ot });
        }
      });
      return;
    }
    await pe(Le, Se, {
      submission: ge,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ce,
      preventScrollReset: qe,
      replace: P && P.replace,
      enableViewTransition: P && P.viewTransition,
      flushSync: Be,
      callSiteDefaultShouldRevalidate: P && P.defaultShouldRevalidate
    });
  }
  function ye() {
    ve || (ve = My()), Lt(), we({ revalidation: "loading" });
    let U = ve.promise;
    return A.navigation.state === "submitting" ? U : A.navigation.state === "idle" ? (pe(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), U) : (pe(
      Y || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ne === !0
      }
    ), U);
  }
  async function pe(U, P, W) {
    Q && Q.abort(), Q = null, Y = U, T = (W && W.startUninterruptedRevalidation) === !0, kt(A.location, A.matches), q = (W && W.preventScrollReset) === !0, ne = (W && W.enableViewTransition) === !0;
    let de = d.activeRoutes, ge = W?.initialHydration && A.matches && A.matches.length > 0 && !C ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : xa(
      de,
      P,
      p,
      !1,
      d.branches
    ), Ce = (W && W.flushSync) === !0;
    if (ge && A.initialized && !z && oN(A.location, P) && !(W && W.submission && mn(W.submission.formMethod))) {
      Me(P, { matches: ge }, { flushSync: Ce });
      return;
    }
    let xe = gn(ge, de, P.pathname);
    if (xe.active && xe.matches && (ge = xe.matches), !ge) {
      let { error: ct, notFoundMatches: et, route: zt } = fn(
        P.pathname
      );
      Me(
        P,
        {
          matches: et,
          loaderData: {},
          errors: {
            [zt.id]: ct
          }
        },
        { flushSync: Ce }
      );
      return;
    }
    let Ne = W && W.overrideNavigation ? {
      ...W.overrideNavigation,
      matches: ge,
      historyAction: U
    } : void 0;
    Q = new AbortController();
    let Se = bl(
      e.history,
      P,
      Q.signal,
      W && W.submission
    ), ze = e.getContext ? await e.getContext() : new sy(), Le;
    if (W && W.pendingError)
      Le = [
        Zi(ge).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && mn(W.submission.formMethod)) {
      let ct = await _e(
        Se,
        P,
        W.submission,
        ge,
        U,
        ze,
        xe.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ce }
      );
      if (ct.shortCircuited)
        return;
      if (ct.pendingActionResult) {
        let [et, zt] = ct.pendingActionResult;
        if (Gn(zt) && Fo(zt.error) && zt.error.status === 404) {
          Q = null, Me(P, {
            matches: ct.matches,
            loaderData: {},
            errors: {
              [et]: zt.error
            }
          });
          return;
        }
      }
      ge = ct.matches || ge, Le = ct.pendingActionResult, Ne = ch(
        P,
        ge,
        U,
        W.submission
      ), Ce = !1, xe.active = !1, Se = bl(
        e.history,
        Se.url,
        Se.signal
      );
    }
    let {
      shortCircuited: qe,
      matches: Be,
      loaderData: Pe,
      errors: ot,
      workingFetchers: Ct
    } = await Re(
      Se,
      P,
      ge,
      U,
      ze,
      xe.active,
      Ne,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ce,
      Le,
      W && W.callSiteDefaultShouldRevalidate
    );
    qe || (Q = null, Me(P, {
      matches: Be || ge,
      ...Cy(Le),
      loaderData: Pe,
      errors: ot,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function _e(U, P, W, de, ge, Ce, xe, Ne, Se = {}) {
    Lt();
    let ze = pN(
      P,
      de,
      ge,
      W
    );
    if (we({ navigation: ze }, { flushSync: Se.flushSync === !0 }), xe) {
      let Be = await gt(
        de,
        P.pathname,
        U.signal
      );
      if (Be.type === "aborted")
        return { shortCircuited: !0 };
      if (Be.type === "error") {
        if (Be.partialMatches.length === 0) {
          let { matches: ot, route: Ct } = Ru(
            d.activeRoutes
          );
          return {
            matches: ot,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: Be.error
              }
            ]
          };
        }
        let Pe = Zi(Be.partialMatches).route.id;
        return {
          matches: Be.partialMatches,
          pendingActionResult: [
            Pe,
            {
              type: "error",
              error: Be.error
            }
          ]
        };
      } else if (Be.matches)
        de = Be.matches;
      else {
        let { notFoundMatches: Pe, error: ot, route: Ct } = fn(
          P.pathname
        );
        return {
          matches: Pe,
          pendingActionResult: [
            Ct.id,
            {
              type: "error",
              error: ot
            }
          ]
        };
      }
    }
    let Le, qe = Wu(de, P);
    if (!qe.route.action && !qe.route.lazy)
      Le = {
        type: "error",
        error: sa(405, {
          method: U.method,
          pathname: P.pathname,
          routeId: qe.route.id
        })
      };
    else {
      let Be = El(
        u,
        c,
        U,
        P,
        de,
        qe,
        Ne ? [] : l,
        Ce
      ), Pe = await yt(
        U,
        P,
        Be,
        Ce,
        null
      );
      if (Le = Pe[qe.route.id], !Le) {
        for (let ot of de)
          if (Pe[ot.route.id]) {
            Le = Pe[ot.route.id];
            break;
          }
      }
      if (U.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Er(Le)) {
      let Be;
      return Se && Se.replace != null ? Be = Se.replace : Be = _y(
        Le.response.headers.get("Location"),
        new URL(U.url),
        p,
        e.history
      ) === A.location.pathname + A.location.search, await vt(U, Le, !0, {
        submission: W,
        replace: Be
      }), { shortCircuited: !0 };
    }
    if (Gn(Le)) {
      let Be = Zi(de, qe.route.id);
      return (Se && Se.replace) !== !0 && (Y = "PUSH"), {
        matches: de,
        pendingActionResult: [
          Be.route.id,
          Le,
          qe.route.id
        ]
      };
    }
    return {
      matches: de,
      pendingActionResult: [qe.route.id, Le]
    };
  }
  async function Re(U, P, W, de, ge, Ce, xe, Ne, Se, ze, Le, qe, Be, Pe) {
    let ot = xe || ch(P, W, de, Ne), Ct = Ne || Se || Ty(ot), ct = !T && !Le;
    if (Ce) {
      if (ct) {
        let xt = Ae(Be);
        we(
          {
            navigation: ot,
            ...xt !== void 0 ? { actionData: xt } : {}
          },
          {
            flushSync: qe
          }
        );
      }
      let $e = await gt(
        W,
        P.pathname,
        U.signal
      );
      if ($e.type === "aborted")
        return { shortCircuited: !0 };
      if ($e.type === "error") {
        if ($e.partialMatches.length === 0) {
          let { matches: vn, route: Hn } = Ru(
            d.activeRoutes
          );
          return {
            matches: vn,
            loaderData: {},
            errors: {
              [Hn.id]: $e.error
            }
          };
        }
        let xt = Zi($e.partialMatches).route.id;
        return {
          matches: $e.partialMatches,
          loaderData: {},
          errors: {
            [xt]: $e.error
          }
        };
      } else if ($e.matches)
        W = $e.matches;
      else {
        let { error: xt, notFoundMatches: vn, route: Hn } = fn(
          P.pathname
        );
        return {
          matches: vn,
          loaderData: {},
          errors: {
            [Hn.id]: xt
          }
        };
      }
    }
    let et = d.activeRoutes, { dsMatches: zt, revalidatingFetchers: it } = gy(
      U,
      ge,
      u,
      c,
      e.history,
      A,
      W,
      Ct,
      P,
      Le ? [] : l,
      Le === !0,
      z,
      G,
      he,
      ee,
      Z,
      et,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      Be,
      Pe
    );
    if (D = ++te, !e.dataStrategy && !zt.some(($e) => $e.shouldLoad) && !zt.some(
      ($e) => $e.route.middleware && $e.route.middleware.length > 0
    ) && it.length === 0) {
      let $e = new Map(A.fetchers), xt = yi($e);
      return Me(
        P,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Be && Gn(Be[1]) ? { [Be[0]]: Be[1].error } : null,
          ...Cy(Be),
          ...xt ? { fetchers: $e } : {}
        },
        { flushSync: qe }
      ), { shortCircuited: !0 };
    }
    if (ct) {
      let $e = {};
      if (!Ce) {
        $e.navigation = ot;
        let xt = Ae(Be);
        xt !== void 0 && ($e.actionData = xt);
      }
      it.length > 0 && ($e.fetchers = lt(it)), we($e, { flushSync: qe });
    }
    it.forEach(($e) => {
      Ot($e.key), $e.controller && F.set($e.key, $e.controller);
    });
    let Aa = () => it.forEach(($e) => Ot($e.key));
    Q && Q.signal.addEventListener(
      "abort",
      Aa
    );
    let { loaderResults: kn, fetcherResults: dn } = await Yt(
      zt,
      it,
      U,
      P,
      ge
    );
    if (U.signal.aborted)
      return { shortCircuited: !0 };
    Q && Q.signal.removeEventListener(
      "abort",
      Aa
    ), it.forEach(($e) => F.delete($e.key));
    let an = Tu(kn);
    if (an)
      return await vt(U, an.result, !0, {
        replace: ze
      }), { shortCircuited: !0 };
    if (an = Tu(dn), an)
      return Z.add(an.key), await vt(U, an.result, !0, {
        replace: ze
      }), { shortCircuited: !0 };
    let En = new Map(A.fetchers), { loaderData: bi, errors: Nn } = Ey(
      A,
      W,
      kn,
      Be,
      it,
      dn,
      En
    );
    Le && A.errors && (Nn = { ...A.errors, ...Nn });
    let xi = yi(En), pa = Ma(
      D,
      En
    ), ga = xi || pa || it.length > 0;
    return {
      matches: W,
      loaderData: bi,
      errors: Nn,
      ...ga ? { workingFetchers: En } : {}
    };
  }
  function Ae(U) {
    if (U && !Gn(U[1]))
      return {
        [U[0]]: U[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function lt(U) {
    let P = new Map(A.fetchers);
    return U.forEach((W) => {
      let de = P.get(W.key), ge = Ao(
        void 0,
        de ? de.data : void 0
      );
      P.set(W.key, ge);
    }), P;
  }
  async function Ze(U, P, W, de) {
    Ot(U);
    let ge = (de && de.flushSync) === !0, Ce = d.activeRoutes, xe = Ih(
      A.location,
      A.matches,
      p,
      W,
      P,
      de?.relative
    ), Ne = xa(
      Ce,
      xe,
      p,
      !1,
      d.branches
    ), Se = gn(Ne, Ce, xe);
    if (Se.active && Se.matches && (Ne = Se.matches), !Ne) {
      ut(
        U,
        P,
        sa(404, { pathname: xe }),
        { flushSync: ge }
      );
      return;
    }
    let { path: ze, submission: Le, error: qe } = py(
      !0,
      xe,
      de
    );
    if (qe) {
      ut(U, P, qe, { flushSync: ge });
      return;
    }
    let Be = e.getContext ? await e.getContext() : new sy(), Pe = (de && de.preventScrollReset) === !0;
    if (Le && mn(Le.formMethod)) {
      await Fe(
        U,
        P,
        ze,
        Ne,
        Be,
        Se.active,
        ge,
        Pe,
        Le,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    ee.set(U, { routeId: P, path: ze }), await Ke(
      U,
      P,
      ze,
      Ne,
      Be,
      Se.active,
      ge,
      Pe,
      Le
    );
  }
  async function Fe(U, P, W, de, ge, Ce, xe, Ne, Se, ze) {
    Lt(), ee.delete(U);
    let Le = A.fetchers.get(U);
    pt(U, gN(Se, Le), {
      flushSync: xe
    });
    let qe = new AbortController(), Be = bl(
      e.history,
      W,
      qe.signal,
      Se
    );
    if (Ce) {
      let ht = await gt(
        de,
        new URL(Be.url).pathname,
        Be.signal,
        U
      );
      if (ht.type === "aborted")
        return;
      if (ht.type === "error") {
        ut(U, P, ht.error, { flushSync: xe });
        return;
      } else if (ht.matches)
        de = ht.matches;
      else {
        ut(
          U,
          P,
          sa(404, { pathname: W }),
          { flushSync: xe }
        );
        return;
      }
    }
    let Pe = Wu(de, W);
    if (!Pe.route.action && !Pe.route.lazy) {
      let ht = sa(405, {
        method: Se.formMethod,
        pathname: W,
        routeId: P
      });
      ut(U, P, ht, { flushSync: xe });
      return;
    }
    F.set(U, qe);
    let ot = te, Ct = El(
      u,
      c,
      Be,
      W,
      de,
      Pe,
      l,
      ge
    ), ct = await yt(
      Be,
      W,
      Ct,
      ge,
      U
    ), et = ct[Pe.route.id];
    if (!et) {
      for (let ht of Ct)
        if (ct[ht.route.id]) {
          et = ct[ht.route.id];
          break;
        }
    }
    if (Be.signal.aborted) {
      F.get(U) === qe && F.delete(U);
      return;
    }
    if (he.has(U)) {
      if (Er(et) || Gn(et)) {
        pt(U, Ha(void 0));
        return;
      }
    } else {
      if (Er(et))
        if (F.delete(U), D > ot) {
          pt(U, Ha(void 0));
          return;
        } else
          return Z.add(U), pt(U, Ao(Se)), vt(Be, et, !1, {
            fetcherSubmission: Se,
            preventScrollReset: Ne
          });
      if (Gn(et)) {
        ut(U, P, et.error);
        return;
      }
    }
    let zt = A.navigation.location || A.location, it = bl(
      e.history,
      zt,
      qe.signal
    ), Aa = d.activeRoutes, kn = A.navigation.state !== "idle" ? xa(
      Aa,
      A.navigation.location,
      p,
      !1,
      d.branches
    ) : A.matches;
    Qe(kn, "Didn't find any matches after fetcher action");
    let dn = ++te;
    V.set(U, dn);
    let { dsMatches: an, revalidatingFetchers: En } = gy(
      it,
      ge,
      u,
      c,
      e.history,
      A,
      kn,
      Se,
      zt,
      l,
      !1,
      z,
      G,
      he,
      ee,
      Z,
      Aa,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Pe.route.id, et],
      ze
    ), bi = Ao(Se, et.data), Nn = new Map(A.fetchers);
    Nn.set(U, bi), En.filter((ht) => ht.key !== U).forEach((ht) => {
      let Kn = ht.key, rn = Nn.get(Kn), nr = Ao(
        void 0,
        rn ? rn.data : void 0
      );
      Nn.set(Kn, nr), Ot(Kn), ht.controller && F.set(Kn, ht.controller);
    }), we({ fetchers: Nn });
    let xi = () => En.forEach((ht) => Ot(ht.key));
    qe.signal.addEventListener(
      "abort",
      xi
    );
    let { loaderResults: pa, fetcherResults: ga } = await Yt(
      an,
      En,
      it,
      zt,
      ge
    );
    if (qe.signal.aborted)
      return;
    qe.signal.removeEventListener(
      "abort",
      xi
    ), V.delete(U), F.delete(U), En.forEach((ht) => F.delete(ht.key));
    let $e = A.fetchers.has(U), xt = (ht) => {
      if (!$e) return ht;
      let Kn = new Map(ht.fetchers);
      return Kn.set(U, Ha(et.data)), { ...ht, fetchers: Kn };
    }, vn = Tu(pa);
    if (vn)
      return A = xt(A), vt(
        it,
        vn.result,
        !1,
        { preventScrollReset: Ne }
      );
    if (vn = Tu(ga), vn)
      return Z.add(vn.key), A = xt(A), vt(
        it,
        vn.result,
        !1,
        { preventScrollReset: Ne }
      );
    let Hn = new Map(A.fetchers);
    $e && Hn.set(U, Ha(et.data));
    let { loaderData: wi, errors: Fa } = Ey(
      A,
      kn,
      pa,
      void 0,
      En,
      ga,
      Hn
    );
    Ma(dn, Hn), A.navigation.state === "loading" && dn > D ? (Qe(Y, "Expected pending action"), Q && Q.abort(), Me(A.navigation.location, {
      matches: kn,
      loaderData: wi,
      errors: Fa,
      fetchers: Hn
    })) : (we({
      errors: Fa,
      loaderData: Ny(
        A.loaderData,
        wi,
        kn,
        Fa
      ),
      fetchers: Hn
    }), z = !1);
  }
  async function Ke(U, P, W, de, ge, Ce, xe, Ne, Se) {
    let ze = A.fetchers.get(U);
    pt(
      U,
      Ao(
        Se,
        ze ? ze.data : void 0
      ),
      { flushSync: xe }
    );
    let Le = new AbortController(), qe = bl(
      e.history,
      W,
      Le.signal
    );
    if (Ce) {
      let et = await gt(
        de,
        new URL(qe.url).pathname,
        qe.signal,
        U
      );
      if (et.type === "aborted")
        return;
      if (et.type === "error") {
        ut(U, P, et.error, { flushSync: xe });
        return;
      } else if (et.matches)
        de = et.matches;
      else {
        ut(
          U,
          P,
          sa(404, { pathname: W }),
          { flushSync: xe }
        );
        return;
      }
    }
    let Be = Wu(de, W);
    F.set(U, Le);
    let Pe = te, ot = El(
      u,
      c,
      qe,
      W,
      de,
      Be,
      l,
      ge
    ), Ct = await yt(
      qe,
      W,
      ot,
      ge,
      U
    ), ct = Ct[Be.route.id];
    if (!ct) {
      for (let et of de)
        if (Ct[et.route.id]) {
          ct = Ct[et.route.id];
          break;
        }
    }
    if (F.get(U) === Le && F.delete(U), !qe.signal.aborted) {
      if (he.has(U)) {
        pt(U, Ha(void 0));
        return;
      }
      if (Er(ct))
        if (D > Pe) {
          pt(U, Ha(void 0));
          return;
        } else {
          Z.add(U), await vt(qe, ct, !1, {
            preventScrollReset: Ne
          });
          return;
        }
      if (Gn(ct)) {
        ut(U, P, ct.error);
        return;
      }
      pt(U, Ha(ct.data));
    }
  }
  async function vt(U, P, W, {
    submission: de,
    fetcherSubmission: ge,
    preventScrollReset: Ce,
    replace: xe
  } = {}) {
    W || (le?.resolve(), le = null), P.response.headers.has("X-Remix-Revalidate") && (z = !0);
    let Ne = P.response.headers.get("Location");
    Qe(Ne, "Expected a Location header on the redirect Response"), Ne = _y(
      Ne,
      new URL(U.url),
      p,
      e.history
    );
    let Se = qh(A.location, Ne, {
      _isRedirect: !0
    });
    if (r) {
      let ot = !1;
      if (P.response.headers.has("X-Remix-Reload-Document"))
        ot = !0;
      else if (_m(Ne)) {
        const Ct = f2(a, Ne, !0);
        ot = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        fa(Ct.pathname, p) == null;
      }
      if (ot) {
        xe ? a.location.replace(Ne) : a.location.assign(Ne);
        return;
      }
    }
    Q = null;
    let ze = xe === !0 || P.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Le, formAction: qe, formEncType: Be } = A.navigation;
    !de && !ge && Le && qe && Be && (de = Ty(A.navigation));
    let Pe = de || ge;
    if (Y2.has(P.response.status) && Pe && mn(Pe.formMethod))
      await pe(ze, Se, {
        submission: {
          ...Pe,
          formAction: Ne
        },
        // Preserve these flags across redirects
        preventScrollReset: Ce || q,
        enableViewTransition: W ? ne : void 0
      });
    else {
      let ot = ch(
        Se,
        [],
        ze,
        de
      );
      await pe(ze, Se, {
        overrideNavigation: ot,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ge,
        // Preserve these flags across redirects
        preventScrollReset: Ce || q,
        enableViewTransition: W ? ne : void 0
      });
    }
  }
  async function yt(U, P, W, de, ge) {
    let Ce, xe = {};
    try {
      Ce = await tN(
        m,
        U,
        P,
        W,
        ge,
        de,
        !1
      );
    } catch (Ne) {
      return W.filter((Se) => Se.shouldLoad).forEach((Se) => {
        xe[Se.route.id] = {
          type: "error",
          error: Ne
        };
      }), xe;
    }
    if (U.signal.aborted)
      return xe;
    if (!mn(U.method))
      for (let Ne of W) {
        if (Ce[Ne.route.id]?.type === "error")
          break;
        !Ce.hasOwnProperty(Ne.route.id) && !A.loaderData.hasOwnProperty(Ne.route.id) && (!A.errors || !A.errors.hasOwnProperty(Ne.route.id)) && Ne.shouldCallHandler() && (Ce[Ne.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ne.route.id}`
          )
        });
      }
    for (let [Ne, Se] of Object.entries(Ce))
      if (fN(Se)) {
        let ze = Se.result;
        xe[Ne] = {
          type: "redirect",
          response: rN(
            ze,
            U,
            Ne,
            W,
            p
          )
        };
      } else
        xe[Ne] = await iN(Se);
    return xe;
  }
  async function Yt(U, P, W, de, ge) {
    let Ce = yt(
      W,
      de,
      U,
      ge,
      null
    ), xe = Promise.all(
      P.map(async (ze) => {
        if (ze.matches && ze.match && ze.request && ze.controller) {
          let qe = (await yt(
            ze.request,
            ze.path,
            ze.matches,
            ge,
            ze.key
          ))[ze.match.route.id];
          return { [ze.key]: qe };
        } else
          return Promise.resolve({
            [ze.key]: {
              type: "error",
              error: sa(404, {
                pathname: ze.path
              })
            }
          });
      })
    ), Ne = await Ce, Se = (await xe).reduce(
      (ze, Le) => Object.assign(ze, Le),
      {}
    );
    return {
      loaderResults: Ne,
      fetcherResults: Se
    };
  }
  function Lt() {
    z = !0, ee.forEach((U, P) => {
      F.has(P) && G.add(P), Ot(P);
    });
  }
  function pt(U, P, W = {}) {
    let de = new Map(A.fetchers);
    de.set(U, P), we(
      { fetchers: de },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function ut(U, P, W, de = {}) {
    let ge = Zi(A.matches, P), Ce = new Map(A.fetchers);
    nn(Ce, U), we(
      {
        errors: {
          [ge.route.id]: W
        },
        fetchers: Ce
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function Zn(U) {
    return se.set(U, (se.get(U) || 0) + 1), he.has(U) && he.delete(U), A.fetchers.get(U) || G2;
  }
  function _n(U, P) {
    Ot(U, P?.reason), pt(U, Ha(null));
  }
  function nn(U, P) {
    let W = A.fetchers.get(P);
    F.has(P) && !(W && W.state === "loading" && V.has(P)) && Ot(P), ee.delete(P), V.delete(P), Z.delete(P), he.delete(P), G.delete(P), U.delete(P);
  }
  function Kt(U) {
    let P = (se.get(U) || 0) - 1;
    P <= 0 ? (se.delete(U), he.add(U)) : se.set(U, P), we({ fetchers: new Map(A.fetchers) });
  }
  function Ot(U, P) {
    let W = F.get(U);
    W && (W.abort(P), F.delete(U));
  }
  function Ut(U, P) {
    for (let W of U) {
      let de = P.get(W);
      Qe(de, `Expected fetcher: ${W}`);
      let ge = Ha(de.data);
      P.set(W, ge);
    }
  }
  function yi(U) {
    let P = [], W = !1;
    for (let de of Z) {
      let ge = U.get(de);
      Qe(ge, `Expected fetcher: ${de}`), ge.state === "loading" && (Z.delete(de), P.push(de), W = !0);
    }
    return Ut(P, U), W;
  }
  function Ma(U, P) {
    let W = [];
    for (let [de, ge] of V)
      if (ge < U) {
        let Ce = P.get(de);
        Qe(Ce, `Expected fetcher: ${de}`), Ce.state === "loading" && (Ot(de), V.delete(de), W.push(de));
      }
    return Ut(W, P), W.length > 0;
  }
  function Sn(U, P) {
    let W = A.blockers.get(U) || Mo;
    return me.get(U) !== P && me.set(U, P), W;
  }
  function ha(U) {
    A.blockers.delete(U), me.delete(U);
  }
  function Ln(U, P) {
    let W = A.blockers.get(U) || Mo;
    Qe(
      W.state === "unblocked" && P.state === "blocked" || W.state === "blocked" && P.state === "blocked" || W.state === "blocked" && P.state === "proceeding" || W.state === "blocked" && P.state === "unblocked" || W.state === "proceeding" && P.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${P.state}`
    );
    let de = new Map(A.blockers);
    de.set(U, P), we({ blockers: de });
  }
  function Qn({
    currentLocation: U,
    nextLocation: P,
    historyAction: W
  }) {
    if (me.size === 0)
      return;
    me.size > 1 && It(!1, "A router only supports one blocker at a time");
    let de = Array.from(me.entries()), [ge, Ce] = de[de.length - 1], xe = A.blockers.get(ge);
    if (!(xe && xe.state === "proceeding") && Ce({ currentLocation: U, nextLocation: P, historyAction: W }))
      return ge;
  }
  function fn(U) {
    let P = sa(404, { pathname: U }), W = d.activeRoutes, { matches: de, route: ge } = Ru(W);
    return { notFoundMatches: de, route: ge, error: P };
  }
  function Ve(U, P, W) {
    if (_ = U, N = P, E = W || null, !R && A.navigation === uh) {
      R = !0;
      let de = Vt(A.location, A.matches);
      de != null && we({ restoreScrollPosition: de });
    }
    return () => {
      _ = null, N = null, E = null;
    };
  }
  function bt(U, P) {
    return E && E(
      U,
      P.map((de) => v2(de, A.loaderData))
    ) || U.key;
  }
  function kt(U, P) {
    if (_ && N) {
      let W = bt(U, P);
      _[W] = N();
    }
  }
  function Vt(U, P) {
    if (_) {
      let W = bt(U, P), de = _[W];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function gn(U, P, W) {
    if (e.patchRoutesOnNavigation) {
      let de = d.branches;
      if (U) {
        if (Object.keys(U[0].params).length > 0)
          return { active: !0, matches: xa(
            P,
            W,
            p,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: xa(
          P,
          W,
          p,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function gt(U, P, W, de) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: U };
    let ge = U;
    for (; ; ) {
      let Ce = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: W,
          path: P,
          matches: ge,
          fetcherKey: de,
          patch: (ze, Le) => {
            W.aborted || vy(
              ze,
              Le,
              d,
              Ce,
              u,
              !1
            );
          }
        });
      } catch (ze) {
        return { type: "error", error: ze, partialMatches: ge };
      }
      if (W.aborted)
        return { type: "aborted" };
      let xe = d.branches, Ne = xa(
        d.activeRoutes,
        P,
        p,
        !1,
        xe
      ), Se = null;
      if (Ne) {
        if (Object.keys(Ne[0].params).length === 0)
          return { type: "success", matches: Ne };
        if (Se = xa(
          d.activeRoutes,
          P,
          p,
          !0,
          xe
        ), !(Se && ge.length < Se.length && Jt(
          ge,
          Se.slice(0, ge.length)
        )))
          return { type: "success", matches: Ne };
      }
      if (Se || (Se = xa(
        d.activeRoutes,
        P,
        p,
        !0,
        xe
      )), !Se || Jt(ge, Se))
        return { type: "success", matches: null };
      ge = Se;
    }
  }
  function Jt(U, P) {
    return U.length === P.length && U.every((W, de) => W.route.id === P[de].route.id);
  }
  function ma(U) {
    c = {}, d.setHmrRoutes(
      Go(
        U,
        u,
        void 0,
        c
      )
    );
  }
  function en(U, P, W = !1) {
    vy(
      U,
      P,
      d,
      c,
      u,
      W
    ), d.hasHMRRoutes || we({});
  }
  return H = {
    get basename() {
      return p;
    },
    get future() {
      return y;
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
    initialize: Oe,
    subscribe: Ee,
    enableScrollRestoration: Ve,
    navigate: Ye,
    fetch: Ze,
    revalidate: ye,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (U) => e.history.createHref(U),
    encodeLocation: (U) => e.history.encodeLocation(U),
    getFetcher: Zn,
    resetFetcher: _n,
    deleteFetcher: Kt,
    dispose: je,
    getBlocker: Sn,
    deleteBlocker: ha,
    patchRoutes: en,
    _internalFetchControllers: F,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ma,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(U) {
      we(U);
    }
  }, e.instrumentations && (H = k2(
    H,
    e.instrumentations.map((U) => U.router).filter(Boolean)
  )), H;
}
function Z2(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function Ih(e, a, r, l, s, u) {
  let c, d;
  if (s) {
    c = [];
    for (let m of a)
      if (c.push(m), m.route.id === s) {
        d = m;
        break;
      }
  } else
    c = a, d = a[a.length - 1];
  let p = Mc(
    l || ".",
    Sm(c),
    fa(e.pathname, r) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = Rm(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let y = new URLSearchParams(p.search), g = y.getAll("index");
      y.delete("index"), g.filter((x) => x).forEach((x) => y.append("index", x));
      let b = y.toString();
      p.search = b ? `?${b}` : "";
    }
  }
  return r !== "/" && (p.pathname = A2({ basename: r, pathname: p.pathname })), Ya(p);
}
function py(e, a, r) {
  if (!r || !Z2(r))
    return { path: a };
  if (r.formMethod && !mN(r.formMethod))
    return {
      path: a,
      error: sa(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: sa(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = f1(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!mn(u))
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
      if (!mn(u))
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
  Qe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let d, p;
  if (r.formData)
    d = Gh(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    d = Gh(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    d = r.body, p = Sy(d);
  else if (r.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(r.body), p = Sy(d);
    } catch {
      return l();
    }
  let m = {
    formMethod: u,
    formAction: c,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (mn(m.formMethod))
    return { path: a, submission: m };
  let y = Ca(a);
  return e && y.search && Rm(y.search) && d.append("index", ""), y.search = `?${d}`, { path: Ya(y), submission: m };
}
function gy(e, a, r, l, s, u, c, d, p, m, y, g, b, x, _, E, N, R, j, C, O, B) {
  let k = O ? Gn(O[1]) ? O[1].error : O[1].data : void 0, H = s.createURL(u.location), A = s.createURL(p), Y;
  if (y && u.errors) {
    let T = Object.keys(u.errors)[0];
    Y = c.findIndex((z) => z.route.id === T);
  } else if (O && Gn(O[1])) {
    let T = O[0];
    Y = c.findIndex((z) => z.route.id === T) - 1;
  }
  let le = O ? O[1].statusCode : void 0, q = le && le >= 400, Q = {
    currentUrl: H,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...d,
    actionResult: k,
    actionStatus: le
  }, ne = os(c), L = c.map((T, z) => {
    let { route: G } = T, F = null;
    if (Y != null && z > Y)
      F = !1;
    else if (G.lazy)
      F = !0;
    else if (!Nm(G))
      F = !1;
    else if (y) {
      let { shouldLoad: Z } = i1(
        G,
        u.loaderData,
        u.errors
      );
      F = Z;
    } else Q2(u.loaderData, u.matches[z], T) && (F = !0);
    if (F !== null)
      return Yh(
        r,
        l,
        e,
        p,
        ne,
        T,
        m,
        a,
        F
      );
    let te = !1;
    typeof B == "boolean" ? te = B : q ? te = !1 : (g || H.pathname + H.search === A.pathname + A.search || H.search !== A.search || K2(u.matches[z], T)) && (te = !0);
    let D = {
      ...Q,
      defaultShouldRevalidate: te
    }, V = $o(T, D);
    return Yh(
      r,
      l,
      e,
      p,
      ne,
      T,
      m,
      a,
      V,
      D,
      B
    );
  }), I = [];
  return _.forEach((T, z) => {
    if (y || !c.some((se) => se.route.id === T.routeId) || x.has(z))
      return;
    let G = u.fetchers.get(z), F = G && G.state !== "idle" && G.data === void 0, te = xa(
      N,
      T.path,
      R ?? "/",
      !1,
      C
    );
    if (!te) {
      if (j && F)
        return;
      I.push({
        key: z,
        routeId: T.routeId,
        path: T.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (E.has(z))
      return;
    let D = Wu(te, T.path), V = new AbortController(), Z = bl(
      s,
      T.path,
      V.signal
    ), ee = null;
    if (b.has(z))
      b.delete(z), ee = El(
        r,
        l,
        Z,
        T.path,
        te,
        D,
        m,
        a
      );
    else if (F)
      g && (ee = El(
        r,
        l,
        Z,
        T.path,
        te,
        D,
        m,
        a
      ));
    else {
      let se;
      typeof B == "boolean" ? se = B : q ? se = !1 : se = g;
      let he = {
        ...Q,
        defaultShouldRevalidate: se
      };
      $o(D, he) && (ee = El(
        r,
        l,
        Z,
        T.path,
        te,
        D,
        m,
        a,
        he
      ));
    }
    ee && I.push({
      key: z,
      routeId: T.routeId,
      path: T.path,
      matches: ee,
      match: D,
      request: Z,
      controller: V
    });
  }), { dsMatches: L, revalidatingFetchers: I };
}
function Nm(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function i1(e, a, r) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Nm(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = r != null && r[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function Q2(e, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !e.hasOwnProperty(r.route.id);
  return l || s;
}
function K2(e, a) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function $o(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function vy(e, a, r, l, s, u) {
  let c;
  if (e) {
    let m = l[e];
    Qe(
      m,
      `No route found to patch children into: routeId = ${e}`
    ), m.children || (m.children = []), c = m.children;
  } else
    c = r.activeRoutes;
  let d = [], p = [];
  if (a.forEach((m) => {
    let y = c.find(
      (g) => r1(m, g)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = Go(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: g } = p[m], b = y, [x] = Go(
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
function r1(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (r, l) => a.children?.some((s) => r1(r, s))
  ) ?? !1 : !1;
}
var yy = /* @__PURE__ */ new WeakMap(), l1 = ({
  key: e,
  route: a,
  manifest: r,
  mapRouteProperties: l
}) => {
  let s = r[a.id];
  if (Qe(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[e];
  if (!u)
    return;
  let c = yy.get(s);
  c || (c = {}, yy.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = h2(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
    if (m)
      It(
        !m,
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
}, by = /* @__PURE__ */ new WeakMap();
function J2(e, a, r, l, s) {
  let u = r[e.id];
  if (Qe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let y = by.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let g = (async () => {
      Qe(
        typeof e.lazy == "function",
        "No lazy route function found"
      );
      let b = await e.lazy(), x = {};
      for (let _ in b) {
        let E = b[_];
        if (E === void 0)
          continue;
        let N = p2(_), j = u[_] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        _ !== "hasErrorBoundary";
        N ? It(
          !N,
          "Route property " + _ + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : j ? It(
          !j,
          `Route "${u.id}" has a static property "${_}" defined but its lazy function is also returning a value for this property. The lazy route property "${_}" will be ignored.`
        ) : x[_] = E;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return by.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let g = l1({
      key: y,
      route: e,
      manifest: r,
      mapRouteProperties: l
    });
    g && (d.push(g), y === a && (p = g));
  }
  let m = d.length > 0 ? Promise.all(d).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: p
  };
}
async function xy(e) {
  let a = e.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function W2(e) {
  return e.matches.some((a) => a.route.middleware) ? o1(e, () => xy(e)) : xy(e);
}
function o1(e, a) {
  return eN(
    e,
    a,
    (l) => {
      if (hN(l))
        throw l;
      return l;
    },
    uN,
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
          c.findIndex((m) => m.route.id === s),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          c.findIndex((m) => m.shouldCallHandler()),
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
async function eN(e, a, r, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await s1(
    c,
    d,
    a,
    r,
    l,
    s
  );
}
async function s1(e, a, r, l, s, u, c = 0) {
  let { request: d } = e;
  if (d.signal.aborted)
    throw d.signal.reason ?? new Error(`Request aborted: ${d.method} ${d.url}`);
  let p = a[c];
  if (!p)
    return await r();
  let [m, y] = p, g, b = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await s1(
        e,
        a,
        r,
        l,
        s,
        u,
        c + 1
      ) }, g.value;
    } catch (x) {
      return g = { value: await u(x, m, g) }, g.value;
    }
  };
  try {
    let x = await y(e, b), _ = x != null ? l(x) : void 0;
    return s(_) ? _ : g ? _ ?? g.value : (g = { value: await b() }, g.value);
  } catch (x) {
    return await u(x, m, g);
  }
}
function u1(e, a, r, l, s) {
  let u = l1({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = J2(
    l.route,
    mn(r.method) ? "action" : "loader",
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
function Yh(e, a, r, l, s, u, c, d, p, m = null, y) {
  let g = !1, b = u1(
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
    shouldRevalidateArgs: m,
    shouldCallHandler(x) {
      return g = !0, m ? typeof y == "boolean" ? $o(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? $o(u, {
        ...m,
        defaultShouldRevalidate: x
      }) : $o(u, m) : p;
    },
    resolve(x) {
      let { lazy: _, loader: E, middleware: N } = u.route, R = g || p || x && !mn(r.method) && (_ || E), j = N && N.length > 0 && !E && !_;
      return R && (mn(r.method) || !j) ? nN({
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
function El(e, a, r, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: u1(
      e,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Yh(
    e,
    a,
    r,
    l,
    os(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function tN(e, a, r, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let d = {
    request: a,
    url: c1(a, r),
    pattern: os(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let g = d;
      return o1(g, () => y({
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
      l.flatMap((y) => [
        y._lazyPromises?.handler,
        y._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function nN({
  request: e,
  path: a,
  pattern: r,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, m, y = mn(e.method), g = y ? "action" : "loader", b = (x) => {
    let _, E = new Promise((j, C) => _ = C);
    m = () => _(), e.signal.addEventListener("abort", m);
    let N = (j) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: c1(e, a),
        pattern: r,
        params: l.params,
        context: d
      },
      ...j !== void 0 ? [j] : []
    ), R = (async () => {
      try {
        return { type: "data", result: await (c ? c((C) => N(C)) : N()) };
      } catch (j) {
        return { type: "error", result: j };
      }
    })();
    return Promise.race([R, E]);
  };
  try {
    let x = y ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let _, [E] = await Promise.all([
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
        p = E;
      } else {
        await s;
        let _ = y ? l.route.action : l.route.loader;
        if (_)
          [p] = await Promise.all([b(_), u]);
        else if (g === "action") {
          let E = new URL(e.url), N = E.pathname + E.search;
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
      let _ = new URL(e.url), E = _.pathname + _.search;
      throw sa(404, {
        pathname: E
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    m && e.signal.removeEventListener("abort", m);
  }
  return p;
}
async function aN(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function iN(e) {
  let { result: a, type: r } = e;
  if (Cm(a)) {
    let l;
    try {
      l = await aN(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new Ac(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Ry(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: sN(a),
    statusCode: Fo(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Fo(a) ? a.status : void 0
  } : Ry(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function rN(e, a, r, l, s) {
  let u = e.headers.get("Location");
  if (Qe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !_m(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === r) + 1
    );
    u = Ih(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var wy = [
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
function _y(e, a, r, l) {
  if (_m(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (wy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = fa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return Em(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (wy.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function bl(e, a, r, l) {
  let s = e.createURL(f1(a)).toString(), u = { signal: r };
  if (l && mn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = Gh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function c1(e, a) {
  let r = new URL(e.url), l = typeof a == "string" ? Ca(a) : a;
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
function Gh(e) {
  let a = new URLSearchParams();
  for (let [r, l] of e.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function Sy(e) {
  let a = new FormData();
  for (let [r, l] of e.entries())
    a.append(r, l);
  return a;
}
function lN(e, a, r, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, y = r && Gn(r[1]) ? r[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let b = g.route.id, x = a[b];
    if (Qe(
      !Er(x),
      "Cannot handle redirect results in processLoaderData"
    ), Gn(x)) {
      let _ = x.error;
      if (y !== void 0 && (_ = y, y = void 0), c = c || {}, s)
        c[b] = _;
      else {
        let E = Zi(e, b);
        c[E.route.id] == null && (c[E.route.id] = _);
      }
      l || (u[b] = a1), p || (p = !0, d = Fo(x.error) ? x.error.status : 500), x.headers && (m[b] = x.headers);
    } else
      u[b] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (m[b] = x.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function Ey(e, a, r, l, s, u, c) {
  let { loaderData: d, errors: p } = lN(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: g, controller: b } = m;
    if (b && b.signal.aborted)
      return;
    let x = u[y];
    if (Qe(x, "Did not find corresponding fetcher result"), Gn(x)) {
      let _ = Zi(e.matches, g?.route.id);
      p && p[_.route.id] || (p = {
        ...p,
        [_.route.id]: x.error
      }), c.delete(y);
    } else if (Er(x))
      Qe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let _ = Ha(x.data);
      c.set(y, _);
    }
  }), { loaderData: d, errors: p };
}
function Ny(e, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== a1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Cy(e) {
  return e ? Gn(e[1]) ? {
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
function Ru(e) {
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
  return e === 400 ? (c = "Bad Request", l && a && r ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${r}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && r ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new Ac(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function Tu(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (Er(s))
      return { key: l, result: s };
  }
}
function f1(e) {
  let a = typeof e == "string" ? Ca(e) : e;
  return Ya({ ...a, hash: "" });
}
function oN(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function sN(e) {
  return new Ac(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function uN(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, r]) => typeof a == "string" && cN(r)
  );
}
function cN(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function fN(e) {
  return Cm(e.result) && t1.has(e.result.status);
}
function Gn(e) {
  return e.type === "error";
}
function Er(e) {
  return (e && e.type) === "redirect";
}
function Ry(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function Cm(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function dN(e) {
  return t1.has(e);
}
function hN(e) {
  return Cm(e) && dN(e.status) && e.headers.has("Location");
}
function mN(e) {
  return I2.has(e.toUpperCase());
}
function mn(e) {
  return $2.has(e.toUpperCase());
}
function Rm(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function Wu(e, a) {
  let r = typeof a == "string" ? Ca(a).search : a.search;
  if (e[e.length - 1].route.index && Rm(r || ""))
    return e[e.length - 1];
  let l = Qx(e);
  return l[l.length - 1];
}
function Ty(e) {
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
function ch(e, a, r, l) {
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
function pN(e, a, r, l) {
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
function Ao(e, a) {
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
function gN(e, a) {
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
function Ha(e) {
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
function vN(e, a) {
  try {
    let r = e.sessionStorage.getItem(
      n1
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function yN(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      e.sessionStorage.setItem(
        n1,
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
function My() {
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
var Lr = S.createContext(null);
Lr.displayName = "DataRouter";
var ss = S.createContext(null);
ss.displayName = "DataRouterState";
var d1 = S.createContext(!1);
function h1() {
  return S.useContext(d1);
}
var Tm = S.createContext({
  isTransitioning: !1
});
Tm.displayName = "ViewTransition";
var m1 = S.createContext(
  /* @__PURE__ */ new Map()
);
m1.displayName = "Fetchers";
var bN = S.createContext(null);
bN.displayName = "Await";
var da = S.createContext(
  null
);
da.displayName = "Navigation";
var Dc = S.createContext(
  null
);
Dc.displayName = "Location";
var Ra = S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ra.displayName = "Route";
var Mm = S.createContext(null);
Mm.displayName = "RouteError";
var p1 = "REACT_ROUTER_ERROR", xN = "REDIRECT", wN = "ROUTE_ERROR_RESPONSE";
function _N(e) {
  if (e.startsWith(`${p1}:${xN}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function SN(e) {
  if (e.startsWith(
    `${p1}:${wN}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Ac(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function EN(e, { relative: a } = {}) {
  Qe(
    us(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = S.useContext(da), { hash: s, pathname: u, search: c } = cs(e, { relative: a }), d = u;
  return r !== "/" && (d = u === "/" ? r : ca([r, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function us() {
  return S.useContext(Dc) != null;
}
function gi() {
  return Qe(
    us(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(Dc).location;
}
var g1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function v1(e) {
  S.useContext(da).static || S.useLayoutEffect(e);
}
function NN() {
  let { isDataRoute: e } = S.useContext(Ra);
  return e ? $N() : CN();
}
function CN() {
  Qe(
    us(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = S.useContext(Lr), { basename: a, navigator: r } = S.useContext(da), { matches: l } = S.useContext(Ra), { pathname: s } = gi(), u = JSON.stringify(Sm(l)), c = S.useRef(!1);
  return v1(() => {
    c.current = !0;
  }), S.useCallback(
    (p, m = {}) => {
      if (It(c.current, g1), !c.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let y = Mc(
        p,
        JSON.parse(u),
        s,
        m.relative === "path"
      );
      e == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : ca([a, y.pathname])), (m.replace ? r.replace : r.push)(
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
      e
    ]
  );
}
var RN = S.createContext(null);
function TN(e) {
  let a = S.useContext(Ra).outlet;
  return S.useMemo(
    () => a && /* @__PURE__ */ S.createElement(RN.Provider, { value: e }, a),
    [a, e]
  );
}
function MN() {
  let { matches: e } = S.useContext(Ra);
  return e[e.length - 1]?.params ?? {};
}
function cs(e, { relative: a } = {}) {
  let { matches: r } = S.useContext(Ra), { pathname: l } = gi(), s = JSON.stringify(Sm(r));
  return S.useMemo(
    () => Mc(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function AN(e, a, r) {
  Qe(
    us(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = S.useContext(da), { matches: s } = S.useContext(Ra), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let N = m && m.path || "";
    x1(
      d,
      !m || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let y = gi(), g;
  g = y;
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
  ) : Fx(e, { pathname: x });
  return It(
    m || _ != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), It(
    _ == null || _[_.length - 1].route.element !== void 0 || _[_.length - 1].route.Component !== void 0 || _[_.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), LN(
    _ && _.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, c, N.params),
        pathname: ca([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            N.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? p : ca([
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
function DN() {
  let e = VN(), a = Fo(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ S.createElement("pre", { style: s }, r) : null, c);
}
var jN = /* @__PURE__ */ S.createElement(DN, null), y1 = class extends S.Component {
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
      const r = SN(e.digest);
      r && (e = r);
    }
    let a = e !== void 0 ? /* @__PURE__ */ S.createElement(Ra.Provider, { value: this.props.routeContext }, /* @__PURE__ */ S.createElement(
      Mm.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ S.createElement(ON, { error: e }, a) : a;
  }
};
y1.contextType = d1;
var fh = /* @__PURE__ */ new WeakMap();
function ON({
  children: e,
  error: a
}) {
  let { basename: r } = S.useContext(da);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = _N(a.digest);
    if (l) {
      let s = fh.get(a);
      if (s) throw s;
      let u = Jx(l.location, r);
      if (Kx && !fh.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw fh.set(a, c), c;
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
function zN({ routeContext: e, match: a, children: r }) {
  let l = S.useContext(Lr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ S.createElement(Ra.Provider, { value: e }, r);
}
function LN(e, a = [], r) {
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
    let y = s.findIndex(
      (g) => g.route.id && u?.[g.route.id] !== void 0
    );
    Qe(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, y + 1)
    );
  }
  let c = !1, d = -1;
  if (r && l) {
    c = l.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let g = s[y];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (d = y), g.route.id) {
        let { loaderData: b, errors: x } = l, _ = g.route.loader && !b.hasOwnProperty(g.route.id) && (!x || x[g.route.id] === void 0);
        if (g.route.lazy || _) {
          r.isStatic && (c = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, m = l && p ? (y, g) => {
    p(y, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      pattern: os(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (y, g, b) => {
      let x, _ = !1, E = null, N = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, E = g.route.errorElement || jN, c && (d < 0 && b === 0 ? (x1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), _ = !0, N = null) : d === b && (_ = !0, N = g.route.hydrateFallbackElement || null)));
      let R = a.concat(s.slice(0, b + 1)), j = () => {
        let C;
        return x ? C = E : _ ? C = N : g.route.Component ? C = /* @__PURE__ */ S.createElement(g.route.Component, null) : g.route.element ? C = g.route.element : C = y, /* @__PURE__ */ S.createElement(
          zN,
          {
            match: g,
            routeContext: {
              outlet: y,
              matches: R,
              isDataRoute: l != null
            },
            children: C
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || b === 0) ? /* @__PURE__ */ S.createElement(
        y1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: E,
          error: x,
          children: j(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: m
        }
      ) : j();
    },
    null
  );
}
function Am(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function kN(e) {
  let a = S.useContext(Lr);
  return Qe(a, Am(e)), a;
}
function b1(e) {
  let a = S.useContext(ss);
  return Qe(a, Am(e)), a;
}
function HN(e) {
  let a = S.useContext(Ra);
  return Qe(a, Am(e)), a;
}
function jc(e) {
  let a = HN(e), r = a.matches[a.matches.length - 1];
  return Qe(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function BN() {
  return jc(
    "useRouteId"
    /* UseRouteId */
  );
}
function UN() {
  let e = b1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = jc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function VN() {
  let e = S.useContext(Mm), a = b1(
    "useRouteError"
    /* UseRouteError */
  ), r = jc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[r];
}
function $N() {
  let { router: e } = kN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = jc(
    "useNavigate"
    /* UseNavigateStable */
  ), r = S.useRef(!1);
  return v1(() => {
    r.current = !0;
  }), S.useCallback(
    async (s, u = {}) => {
      It(r.current, g1), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var Ay = {};
function x1(e, a, r) {
  !a && !Ay[e] && (Ay[e] = !0, It(!1, r));
}
var Dy = {};
function jy(e, a) {
  !e && !Dy[a] && (Dy[a] = !0, console.warn(a));
}
var qN = "useOptimistic", Oy = n2[qN], IN = () => {
};
function YN(e) {
  return Oy ? Oy(e) : [e, IN];
}
function GN(e) {
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
var FN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function XN(e, a) {
  return P2({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: u2({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: FN,
    mapRouteProperties: GN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var PN = class {
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
function ZN({
  router: e,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = h1() || l;
  let [u, c] = S.useState(e.state), [d, p] = YN(u), [m, y] = S.useState(), [g, b] = S.useState({
    isTransitioning: !1
  }), [x, _] = S.useState(), [E, N] = S.useState(), [R, j] = S.useState(), C = S.useRef(/* @__PURE__ */ new Map()), O = S.useCallback(
    (A, { deletedFetchers: Y, newErrors: le, flushSync: q, viewTransitionOpts: Q }) => {
      le && r && Object.values(le).forEach(
        (L) => r(L, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: os(A.matches)
        })
      ), A.fetchers.forEach((L, I) => {
        L.data !== void 0 && C.current.set(I, L.data);
      }), Y.forEach((L) => C.current.delete(L)), jy(
        q === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ne = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (jy(
        Q == null || ne,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Q || !ne) {
        a && q ? a(() => c(A)) : l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p((L) => zy(L, A)), c(A);
        });
        return;
      }
      if (a && q) {
        a(() => {
          E && (x?.resolve(), E.skipTransition()), b({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Q.currentLocation,
            nextLocation: Q.nextLocation
          });
        });
        let L = e.window.document.startViewTransition(() => {
          a(() => c(A));
        });
        L.finished.finally(() => {
          a(() => {
            _(void 0), N(void 0), y(void 0), b({ isTransitioning: !1 });
          });
        }), a(() => N(L));
        return;
      }
      E ? (x?.resolve(), E.skipTransition(), j({
        state: A,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
      })) : (y(A), b({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
      }));
    },
    [
      e.window,
      a,
      E,
      x,
      l,
      p,
      r
    ]
  );
  S.useLayoutEffect(() => e.subscribe(O), [e, O]), S.useEffect(() => {
    g.isTransitioning && !g.flushSync && _(new PN());
  }, [g]), S.useEffect(() => {
    if (x && m && e.window) {
      let A = m, Y = x.promise, le = e.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p((q) => zy(q, A)), c(A);
        }), await Y;
      });
      le.finished.finally(() => {
        _(void 0), N(void 0), y(void 0), b({ isTransitioning: !1 });
      }), N(le);
    }
  }, [
    m,
    x,
    e.window,
    l,
    p
  ]), S.useEffect(() => {
    x && m && d.location.key === m.location.key && x.resolve();
  }, [x, E, d.location, m]), S.useEffect(() => {
    !g.isTransitioning && R && (y(R.state), b({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: R.currentLocation,
      nextLocation: R.nextLocation
    }), j(void 0));
  }, [g.isTransitioning, R]);
  let B = S.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (A) => e.navigate(A),
    push: (A, Y, le) => e.navigate(A, {
      state: Y,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (A, Y, le) => e.navigate(A, {
      replace: !0,
      state: Y,
      preventScrollReset: le?.preventScrollReset
    })
  }), [e]), k = e.basename || "/", H = S.useMemo(
    () => ({
      router: e,
      navigator: B,
      static: !1,
      basename: k,
      onError: r
    }),
    [e, B, k, r]
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Lr.Provider, { value: H }, /* @__PURE__ */ S.createElement(ss.Provider, { value: d }, /* @__PURE__ */ S.createElement(m1.Provider, { value: C.current }, /* @__PURE__ */ S.createElement(Tm.Provider, { value: g }, /* @__PURE__ */ S.createElement(
    WN,
    {
      basename: k,
      location: d.location,
      navigationType: d.historyAction,
      navigator: B,
      useTransitions: l
    },
    /* @__PURE__ */ S.createElement(
      QN,
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
function zy(e, a) {
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
var QN = S.memo(KN);
function KN({
  routes: e,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return AN(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function JN(e) {
  return TN(e.context);
}
function WN({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Qe(
    !us(),
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
  typeof r == "string" && (r = Ca(r));
  let {
    pathname: m = "/",
    search: y = "",
    hash: g = "",
    state: b = null,
    key: x = "default",
    mask: _
  } = r, E = S.useMemo(() => {
    let N = fa(m, d);
    return N == null ? null : {
      location: {
        pathname: N,
        search: y,
        hash: g,
        state: b,
        key: x,
        mask: _
      },
      navigationType: l
    };
  }, [d, m, y, g, b, x, l, _]);
  return It(
    E != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), E == null ? null : /* @__PURE__ */ S.createElement(da.Provider, { value: p }, /* @__PURE__ */ S.createElement(Dc.Provider, { children: a, value: E }));
}
var ec = "get", tc = "application/x-www-form-urlencoded";
function Oc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function eC(e) {
  return Oc(e) && e.tagName.toLowerCase() === "button";
}
function tC(e) {
  return Oc(e) && e.tagName.toLowerCase() === "form";
}
function nC(e) {
  return Oc(e) && e.tagName.toLowerCase() === "input";
}
function aC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function iC(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !aC(e);
}
var Mu = null;
function rC() {
  if (Mu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Mu = !1;
    } catch {
      Mu = !0;
    }
  return Mu;
}
var lC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function dh(e) {
  return e != null && !lC.has(e) ? (It(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${tc}"`
  ), null) : e;
}
function oC(e, a) {
  let r, l, s, u, c;
  if (tC(e)) {
    let d = e.getAttribute("action");
    l = d ? fa(d, a) : null, r = e.getAttribute("method") || ec, s = dh(e.getAttribute("enctype")) || tc, u = new FormData(e);
  } else if (eC(e) || nC(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? fa(p, a) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || ec, s = dh(e.getAttribute("formenctype")) || dh(d.getAttribute("enctype")) || tc, u = new FormData(d, e), !rC()) {
      let { name: m, type: y, value: g } = e;
      if (y === "image") {
        let b = m ? `${m}.` : "";
        u.append(`${b}x`, "0"), u.append(`${b}y`, "0");
      } else m && u.append(m, g);
    }
  } else {
    if (Oc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = ec, l = null, s = tc, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Dm(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function w1(e, a, r, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && fa(s.pathname, a) === "/" ? s.pathname = `${cc(a)}/_root.${l}` : s.pathname = `${cc(s.pathname)}.${l}`, s;
}
async function sC(e, a) {
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
function uC(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function cC(e, a, r) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await sC(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return mC(
    l.flat(1).filter(uC).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function Ly(e, a, r, l, s, u) {
  let c = (p, m) => r[m] ? p.route.id !== r[m].route.id : !0, d = (p, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== p.params["*"]
  );
  return u === "assets" ? a.filter(
    (p, m) => c(p, m) || d(p, m)
  ) : u === "data" ? a.filter((p, m) => {
    let y = l.routes[p.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (c(p, m) || d(p, m))
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
function fC(e, a, { includeHydrateFallback: r } = {}) {
  return dC(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function dC(e) {
  return [...new Set(e)];
}
function hC(e) {
  let a = {}, r = Object.keys(e).sort();
  for (let l of r)
    a[l] = e[l];
  return a;
}
function mC(e, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(hC(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function jm() {
  let e = S.useContext(Lr);
  return Dm(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function pC() {
  let e = S.useContext(ss);
  return Dm(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var Om = S.createContext(void 0);
Om.displayName = "FrameworkContext";
function zm() {
  let e = S.useContext(Om);
  return Dm(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function gC(e, a) {
  let r = S.useContext(Om), [l, s] = S.useState(!1), [u, c] = S.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: g } = a, b = S.useRef(null);
  S.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let E = (R) => {
        R.forEach((j) => {
          c(j.isIntersecting);
        });
      }, N = new IntersectionObserver(E, { threshold: 0.5 });
      return b.current && N.observe(b.current), () => {
        N.disconnect();
      };
    }
  }, [e]), S.useEffect(() => {
    if (l) {
      let E = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(E);
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
      onFocus: Do(d, x),
      onBlur: Do(p, _),
      onMouseEnter: Do(m, x),
      onMouseLeave: Do(y, _),
      onTouchStart: Do(g, x)
    }
  ] : [!1, b, {}];
}
function Do(e, a) {
  return (r) => {
    e && e(r), r.defaultPrevented || a(r);
  };
}
function vC({ page: e, ...a }) {
  let r = h1(), { router: l } = jm(), s = S.useMemo(
    () => Fx(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? r ? /* @__PURE__ */ S.createElement(bC, { page: e, matches: s, ...a }) : /* @__PURE__ */ S.createElement(xC, { page: e, matches: s, ...a }) : null;
}
function yC(e) {
  let { manifest: a, routeModules: r } = zm(), [l, s] = S.useState([]);
  return S.useEffect(() => {
    let u = !1;
    return cC(e, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, r]), l;
}
function bC({
  page: e,
  matches: a,
  ...r
}) {
  let l = gi(), { future: s } = zm(), { basename: u } = jm(), c = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = w1(
      e,
      u,
      s.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, m = [];
    for (let y of a)
      typeof y.route.shouldRevalidate == "function" ? p = !0 : m.push(y.route.id);
    return p && m.length > 0 && d.searchParams.set("_routes", m.join(",")), [d.pathname + d.search];
  }, [
    u,
    s.v8_trailingSlashAwareDataRequests,
    e,
    l,
    a
  ]);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, c.map((d) => /* @__PURE__ */ S.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })));
}
function xC({
  page: e,
  matches: a,
  ...r
}) {
  let l = gi(), { future: s, manifest: u, routeModules: c } = zm(), { basename: d } = jm(), { loaderData: p, matches: m } = pC(), y = S.useMemo(
    () => Ly(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = S.useMemo(
    () => Ly(
      e,
      a,
      m,
      u,
      l,
      "assets"
    ),
    [e, a, m, u, l]
  ), b = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let E = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((j) => {
      let C = u.routes[j.route.id];
      !C || !C.hasLoader || (!y.some((O) => O.route.id === j.route.id) && j.route.id in p && c[j.route.id]?.shouldRevalidate || C.hasClientLoader ? N = !0 : E.add(j.route.id));
    }), E.size === 0)
      return [];
    let R = w1(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return N && E.size > 0 && R.searchParams.set(
      "_routes",
      a.filter((j) => E.has(j.route.id)).map((j) => j.route.id).join(",")
    ), [R.pathname + R.search];
  }, [
    d,
    s.v8_trailingSlashAwareDataRequests,
    p,
    l,
    u,
    y,
    a,
    e,
    c
  ]), x = S.useMemo(
    () => fC(g, u),
    [g, u]
  ), _ = yC(g);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, b.map((E) => /* @__PURE__ */ S.createElement("link", { key: E, rel: "prefetch", as: "fetch", href: E, ...r })), x.map((E) => /* @__PURE__ */ S.createElement("link", { key: E, rel: "modulepreload", href: E, ...r })), _.map(({ key: E, link: N }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ S.createElement(
      "link",
      {
        key: E,
        nonce: r.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function wC(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var _C = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  _C && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var _1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, S1 = S.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: l = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: d,
    state: p,
    target: m,
    to: y,
    preventScrollReset: g,
    viewTransition: b,
    defaultShouldRevalidate: x,
    ..._
  }, E) {
    let { basename: N, navigator: R, useTransitions: j } = S.useContext(da), C = typeof y == "string" && _1.test(y), O = Jx(y, N);
    y = O.to;
    let B = EN(y, { relative: s }), k = gi(), H = null;
    if (d) {
      let I = Mc(
        d,
        [],
        k.mask ? k.mask.pathname : "/",
        !0
      );
      N !== "/" && (I.pathname = I.pathname === "/" ? N : ca([N, I.pathname])), H = R.createHref(I);
    }
    let [A, Y, le] = gC(
      l,
      _
    ), q = CC(y, {
      replace: c,
      mask: d,
      state: p,
      target: m,
      preventScrollReset: g,
      relative: s,
      viewTransition: b,
      defaultShouldRevalidate: x,
      useTransitions: j
    });
    function Q(I) {
      a && a(I), I.defaultPrevented || q(I);
    }
    let ne = !(O.isExternal || u), L = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ S.createElement(
        "a",
        {
          ..._,
          ...le,
          href: (ne ? H : void 0) || O.absoluteURL || B,
          onClick: ne ? Q : a,
          ref: wC(E, Y),
          target: m,
          "data-discover": !C && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !C ? /* @__PURE__ */ S.createElement(S.Fragment, null, L, /* @__PURE__ */ S.createElement(vC, { page: B })) : L;
  }
);
S1.displayName = "Link";
var SC = S.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: l = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: d,
    children: p,
    ...m
  }, y) {
    let g = cs(c, { relative: m.relative }), b = gi(), x = S.useContext(ss), { navigator: _, basename: E } = S.useContext(da), N = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    DC(g) && d === !0, R = _.encodeLocation ? _.encodeLocation(g).pathname : g.pathname, j = b.pathname, C = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (j = j.toLowerCase(), C = C ? C.toLowerCase() : null, R = R.toLowerCase()), C && E && (C = fa(C, E) || C);
    const O = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let B = j === R || !s && j.startsWith(R) && j.charAt(O) === "/", k = C != null && (C === R || !s && C.startsWith(R) && C.charAt(R.length) === "/"), H = {
      isActive: B,
      isPending: k,
      isTransitioning: N
    }, A = B ? a : void 0, Y;
    typeof l == "function" ? Y = l(H) : Y = [
      l,
      B ? "active" : null,
      k ? "pending" : null,
      N ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let le = typeof u == "function" ? u(H) : u;
    return /* @__PURE__ */ S.createElement(
      S1,
      {
        ...m,
        "aria-current": A,
        className: Y,
        ref: y,
        style: le,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(H) : p
    );
  }
);
SC.displayName = "NavLink";
var EC = S.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = ec,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: g,
    defaultShouldRevalidate: b,
    ...x
  }, _) => {
    let { useTransitions: E } = S.useContext(da), N = MC(), R = AC(d, { relative: m }), j = c.toLowerCase() === "get" ? "get" : "post", C = typeof d == "string" && _1.test(d), O = (B) => {
      if (p && p(B), B.defaultPrevented) return;
      B.preventDefault();
      let k = B.nativeEvent.submitter, H = k?.getAttribute("formmethod") || c, A = () => N(k || B.currentTarget, {
        fetcherKey: a,
        method: H,
        navigate: r,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: y,
        viewTransition: g,
        defaultShouldRevalidate: b
      });
      E && r !== !1 ? S.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ S.createElement(
      "form",
      {
        ref: _,
        method: j,
        action: R,
        onSubmit: l ? p : O,
        ...x,
        "data-discover": !C && e === "render" ? "true" : void 0
      }
    );
  }
);
EC.displayName = "Form";
function NC(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function E1(e) {
  let a = S.useContext(Lr);
  return Qe(a, NC(e)), a;
}
function CC(e, {
  target: a,
  replace: r,
  mask: l,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: d,
  defaultShouldRevalidate: p,
  useTransitions: m
} = {}) {
  let y = NN(), g = gi(), b = cs(e, { relative: c });
  return S.useCallback(
    (x) => {
      if (iC(x, a)) {
        x.preventDefault();
        let _ = r !== void 0 ? r : Ya(g) === Ya(b), E = () => y(e, {
          replace: _,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? S.startTransition(() => E()) : E();
      }
    },
    [
      g,
      y,
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
      m
    ]
  );
}
var RC = 0, TC = () => `__${String(++RC)}__`;
function MC() {
  let { router: e } = E1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = S.useContext(da), r = BN(), l = e.fetch, s = e.navigate;
  return S.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: y, body: g } = oC(
        u,
        a
      );
      if (c.navigate === !1) {
        let b = c.fetcherKey || TC();
        await l(b, r, c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: g,
          formMethod: c.method || p,
          formEncType: c.encType || m,
          flushSync: c.flushSync
        });
      } else
        await s(c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: g,
          formMethod: c.method || p,
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
function AC(e, { relative: a } = {}) {
  let { basename: r } = S.useContext(da), l = S.useContext(Ra);
  Qe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...cs(e || ".", { relative: a }) }, c = gi();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search), p = d.getAll("index");
    if (p.some((y) => y === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let y = d.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : ca([r, u.pathname])), Ya(u);
}
function DC(e, { relative: a } = {}) {
  let r = S.useContext(Tm);
  Qe(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = E1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = cs(e, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = fa(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = fa(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return uc(s.pathname, c) != null || uc(s.pathname, u) != null;
}
const Lm = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "flash3_fp4", label: "FlashAttention 3 FP4" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], jC = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], OC = [
  { value: "high", label: "High-noise SVI LoRA" },
  { value: "low", label: "Low-noise SVI LoRA" },
  { value: "off", label: "No SVI LoRA" }
], zC = [
  { value: "default", label: "Default (inductor)" },
  { value: "reduce-overhead", label: "Reduce-overhead (CUDA graphs)" },
  { value: "max-autotune", label: "Max-autotune (slow first build)" }
], N1 = {
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
class zc extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const Lc = "/api/v1/extensions/nexus.video.svi2-pro";
async function tr(e, a) {
  const r = e.startsWith("http") ? e : `${Lc}${e}`, l = await fetch(r, {
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
    throw new zc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function LC(e, a, r) {
  const l = e.startsWith("http") ? e : `${Lc}${e}`, s = new EventSource(l);
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
async function C1() {
  return tr("/presets");
}
async function kC() {
  return tr("/settings");
}
async function fc(e) {
  return tr("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var HC = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function Fn({ tone: e = "neutral", children: a, className: r }) {
  const l = [HC[e], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("span", { className: l, children: a });
}
var BC = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, UC = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, VC = "_1h48t1v9";
function ua({
  variant: e = "primary",
  size: a = "md",
  type: r = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...d
}) {
  const p = [BC[e], UC[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ v.jsx("span", { className: VC, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Zt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let a = "";
  if (Array.isArray(e))
    for (let r = 0, l; r < e.length; r++)
      (l = Zt(e[r])) !== "" && (a += (a && " ") + l);
  else
    for (let r in e)
      e[r] && (a += (a && " ") + r);
  return a;
}
var $C = { value: () => {
} };
function kc() {
  for (var e = 0, a = arguments.length, r = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new nc(r);
}
function nc(e) {
  this._ = e;
}
function qC(e, a) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
nc.prototype = kc.prototype = {
  constructor: nc,
  on: function(e, a) {
    var r = this._, l = qC(e + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = IC(r[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) r[s] = ky(r[s], e.name, a);
      else if (a == null) for (s in r) r[s] = ky(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var r in a) e[r] = a[r].slice();
    return new nc(e);
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
function IC(e, a) {
  for (var r = 0, l = e.length, s; r < l; ++r)
    if ((s = e[r]).name === a)
      return s.value;
}
function ky(e, a, r) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = $C, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return r != null && e.push({ name: a, value: r }), e;
}
var Fh = "http://www.w3.org/1999/xhtml";
const Hy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Fh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Hc(e) {
  var a = e += "", r = a.indexOf(":");
  return r >= 0 && (a = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), Hy.hasOwnProperty(a) ? { space: Hy[a], local: e } : e;
}
function YC(e) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === Fh && a.documentElement.namespaceURI === Fh ? a.createElement(e) : a.createElementNS(r, e);
  };
}
function GC(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function R1(e) {
  var a = Hc(e);
  return (a.local ? GC : YC)(a);
}
function FC() {
}
function km(e) {
  return e == null ? FC : function() {
    return this.querySelector(e);
  };
}
function XC(e) {
  typeof e != "function" && (e = km(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, y = 0; y < c; ++y)
      (p = u[y]) && (m = e.call(p, p.__data__, y, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[y] = m);
  return new Pn(l, this._parents);
}
function PC(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ZC() {
  return [];
}
function T1(e) {
  return e == null ? ZC : function() {
    return this.querySelectorAll(e);
  };
}
function QC(e) {
  return function() {
    return PC(e.apply(this, arguments));
  };
}
function KC(e) {
  typeof e == "function" ? e = QC(e) : e = T1(e);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new Pn(l, s);
}
function M1(e) {
  return function() {
    return this.matches(e);
  };
}
function A1(e) {
  return function(a) {
    return a.matches(e);
  };
}
var JC = Array.prototype.find;
function WC(e) {
  return function() {
    return JC.call(this.children, e);
  };
}
function eR() {
  return this.firstElementChild;
}
function tR(e) {
  return this.select(e == null ? eR : WC(typeof e == "function" ? e : A1(e)));
}
var nR = Array.prototype.filter;
function aR() {
  return Array.from(this.children);
}
function iR(e) {
  return function() {
    return nR.call(this.children, e);
  };
}
function rR(e) {
  return this.selectAll(e == null ? aR : iR(typeof e == "function" ? e : A1(e)));
}
function lR(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Pn(l, this._parents);
}
function D1(e) {
  return new Array(e.length);
}
function oR() {
  return new Pn(this._enter || this._groups.map(D1), this._parents);
}
function dc(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
dc.prototype = {
  constructor: dc,
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
function sR(e) {
  return function() {
    return e;
  };
}
function uR(e, a, r, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : r[c] = new dc(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function cR(e, a, r, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), y = a.length, g = u.length, b = new Array(y), x;
  for (d = 0; d < y; ++d)
    (p = a[d]) && (b[d] = x = c.call(p, p.__data__, d, a) + "", m.has(x) ? s[d] = p : m.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = m.get(x)) ? (l[d] = p, p.__data__ = u[d], m.delete(x)) : r[d] = new dc(e, u[d]);
  for (d = 0; d < y; ++d)
    (p = a[d]) && m.get(b[d]) === p && (s[d] = p);
}
function fR(e) {
  return e.__data__;
}
function dR(e, a) {
  if (!arguments.length) return Array.from(this, fR);
  var r = a ? cR : uR, l = this._parents, s = this._groups;
  typeof e != "function" && (e = sR(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], g = s[m], b = g.length, x = hR(e.call(y, y && y.__data__, m, l)), _ = x.length, E = d[m] = new Array(_), N = c[m] = new Array(_), R = p[m] = new Array(b);
    r(y, g, E, N, R, x, a);
    for (var j = 0, C = 0, O, B; j < _; ++j)
      if (O = E[j]) {
        for (j >= C && (C = j + 1); !(B = N[C]) && ++C < _; ) ;
        O._next = B || null;
      }
  }
  return c = new Pn(c, l), c._enter = d, c._exit = p, c;
}
function hR(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function mR() {
  return new Pn(this._exit || this._groups.map(D1), this._parents);
}
function pR(e, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function gR(e) {
  for (var a = e.selection ? e.selection() : e, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = r[p], y = l[p], g = m.length, b = d[p] = new Array(g), x, _ = 0; _ < g; ++_)
      (x = m[_] || y[_]) && (b[_] = x);
  for (; p < s; ++p)
    d[p] = r[p];
  return new Pn(d, this._parents);
}
function vR() {
  for (var e = this._groups, a = -1, r = e.length; ++a < r; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function yR(e) {
  e || (e = bR);
  function a(g, b) {
    return g && b ? e(g.__data__, b.__data__) : !g - !b;
  }
  for (var r = this._groups, l = r.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = r[u], d = c.length, p = s[u] = new Array(d), m, y = 0; y < d; ++y)
      (m = c[y]) && (p[y] = m);
    p.sort(a);
  }
  return new Pn(s, this._parents).order();
}
function bR(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function xR() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function wR() {
  return Array.from(this);
}
function _R() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function SR() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function ER() {
  return !this.node();
}
function NR(e) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function CR(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function RR(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function TR(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function MR(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function AR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function DR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function jR(e, a) {
  var r = Hc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? RR : CR : typeof a == "function" ? r.local ? DR : AR : r.local ? MR : TR)(r, a));
}
function j1(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function OR(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function zR(e, a, r) {
  return function() {
    this.style.setProperty(e, a, r);
  };
}
function LR(e, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, r);
  };
}
function kR(e, a, r) {
  return arguments.length > 1 ? this.each((a == null ? OR : typeof a == "function" ? LR : zR)(e, a, r ?? "")) : Tl(this.node(), e);
}
function Tl(e, a) {
  return e.style.getPropertyValue(a) || j1(e).getComputedStyle(e, null).getPropertyValue(a);
}
function HR(e) {
  return function() {
    delete this[e];
  };
}
function BR(e, a) {
  return function() {
    this[e] = a;
  };
}
function UR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function VR(e, a) {
  return arguments.length > 1 ? this.each((a == null ? HR : typeof a == "function" ? UR : BR)(e, a)) : this.node()[e];
}
function O1(e) {
  return e.trim().split(/^|\s+/);
}
function Hm(e) {
  return e.classList || new z1(e);
}
function z1(e) {
  this._node = e, this._names = O1(e.getAttribute("class") || "");
}
z1.prototype = {
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
function L1(e, a) {
  for (var r = Hm(e), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function k1(e, a) {
  for (var r = Hm(e), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function $R(e) {
  return function() {
    L1(this, e);
  };
}
function qR(e) {
  return function() {
    k1(this, e);
  };
}
function IR(e, a) {
  return function() {
    (a.apply(this, arguments) ? L1 : k1)(this, e);
  };
}
function YR(e, a) {
  var r = O1(e + "");
  if (arguments.length < 2) {
    for (var l = Hm(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? IR : a ? $R : qR)(r, a));
}
function GR() {
  this.textContent = "";
}
function FR(e) {
  return function() {
    this.textContent = e;
  };
}
function XR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function PR(e) {
  return arguments.length ? this.each(e == null ? GR : (typeof e == "function" ? XR : FR)(e)) : this.node().textContent;
}
function ZR() {
  this.innerHTML = "";
}
function QR(e) {
  return function() {
    this.innerHTML = e;
  };
}
function KR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function JR(e) {
  return arguments.length ? this.each(e == null ? ZR : (typeof e == "function" ? KR : QR)(e)) : this.node().innerHTML;
}
function WR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function eT() {
  return this.each(WR);
}
function tT() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function nT() {
  return this.each(tT);
}
function aT(e) {
  var a = typeof e == "function" ? e : R1(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function iT() {
  return null;
}
function rT(e, a) {
  var r = typeof e == "function" ? e : R1(e), l = a == null ? iT : typeof a == "function" ? a : km(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function lT() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function oT() {
  return this.each(lT);
}
function sT() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function uT() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function cT(e) {
  return this.select(e ? uT : sT);
}
function fT(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function dT(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function hT(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function mT(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function pT(e, a, r) {
  return function() {
    var l = this.__on, s, u = dT(a);
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
function gT(e, a, r) {
  var l = hT(e + ""), s, u = l.length, c;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var p = 0, m = d.length, y; p < m; ++p)
        for (s = 0, y = d[p]; s < u; ++s)
          if ((c = l[s]).type === y.type && c.name === y.name)
            return y.value;
    }
    return;
  }
  for (d = a ? pT : mT, s = 0; s < u; ++s) this.each(d(l[s], a, r));
  return this;
}
function H1(e, a, r) {
  var l = j1(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function vT(e, a) {
  return function() {
    return H1(this, e, a);
  };
}
function yT(e, a) {
  return function() {
    return H1(this, e, a.apply(this, arguments));
  };
}
function bT(e, a) {
  return this.each((typeof a == "function" ? yT : vT)(e, a));
}
function* xT() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var B1 = [null];
function Pn(e, a) {
  this._groups = e, this._parents = a;
}
function fs() {
  return new Pn([[document.documentElement]], B1);
}
function wT() {
  return this;
}
Pn.prototype = fs.prototype = {
  constructor: Pn,
  select: XC,
  selectAll: KC,
  selectChild: tR,
  selectChildren: rR,
  filter: lR,
  data: dR,
  enter: oR,
  exit: mR,
  join: pR,
  merge: gR,
  selection: wT,
  order: vR,
  sort: yR,
  call: xR,
  nodes: wR,
  node: _R,
  size: SR,
  empty: ER,
  each: NR,
  attr: jR,
  style: kR,
  property: VR,
  classed: YR,
  text: PR,
  html: JR,
  raise: eT,
  lower: nT,
  append: aT,
  insert: rT,
  remove: oT,
  clone: cT,
  datum: fT,
  on: gT,
  dispatch: bT,
  [Symbol.iterator]: xT
};
function Xn(e) {
  return typeof e == "string" ? new Pn([[document.querySelector(e)]], [document.documentElement]) : new Pn([[e]], B1);
}
function _T(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function wa(e, a) {
  if (e = _T(e), a === void 0 && (a = e.currentTarget), a) {
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
const ST = { passive: !1 }, Xo = { capture: !0, passive: !1 };
function hh(e) {
  e.stopImmediatePropagation();
}
function Nl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function U1(e) {
  var a = e.document.documentElement, r = Xn(e).on("dragstart.drag", Nl, Xo);
  "onselectstart" in a ? r.on("selectstart.drag", Nl, Xo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function V1(e, a) {
  var r = e.document.documentElement, l = Xn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", Nl, Xo), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const Au = (e) => () => e;
function Xh(e, {
  sourceEvent: a,
  subject: r,
  target: l,
  identifier: s,
  active: u,
  x: c,
  y: d,
  dx: p,
  dy: m,
  dispatch: y
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
    dy: { value: m, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
Xh.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function ET(e) {
  return !e.ctrlKey && !e.button;
}
function NT() {
  return this.parentNode;
}
function CT(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function RT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function $1() {
  var e = ET, a = NT, r = CT, l = RT, s = {}, u = kc("start", "drag", "end"), c = 0, d, p, m, y, g = 0;
  function b(O) {
    O.on("mousedown.drag", x).filter(l).on("touchstart.drag", N).on("touchmove.drag", R, ST).on("touchend.drag touchcancel.drag", j).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(O, B) {
    if (!(y || !e.call(this, O, B))) {
      var k = C(this, a.call(this, O, B), O, B, "mouse");
      k && (Xn(O.view).on("mousemove.drag", _, Xo).on("mouseup.drag", E, Xo), U1(O.view), hh(O), m = !1, d = O.clientX, p = O.clientY, k("start", O));
    }
  }
  function _(O) {
    if (Nl(O), !m) {
      var B = O.clientX - d, k = O.clientY - p;
      m = B * B + k * k > g;
    }
    s.mouse("drag", O);
  }
  function E(O) {
    Xn(O.view).on("mousemove.drag mouseup.drag", null), V1(O.view, m), Nl(O), s.mouse("end", O);
  }
  function N(O, B) {
    if (e.call(this, O, B)) {
      var k = O.changedTouches, H = a.call(this, O, B), A = k.length, Y, le;
      for (Y = 0; Y < A; ++Y)
        (le = C(this, H, O, B, k[Y].identifier, k[Y])) && (hh(O), le("start", O, k[Y]));
    }
  }
  function R(O) {
    var B = O.changedTouches, k = B.length, H, A;
    for (H = 0; H < k; ++H)
      (A = s[B[H].identifier]) && (Nl(O), A("drag", O, B[H]));
  }
  function j(O) {
    var B = O.changedTouches, k = B.length, H, A;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), H = 0; H < k; ++H)
      (A = s[B[H].identifier]) && (hh(O), A("end", O, B[H]));
  }
  function C(O, B, k, H, A, Y) {
    var le = u.copy(), q = wa(Y || k, B), Q, ne, L;
    if ((L = r.call(O, new Xh("beforestart", {
      sourceEvent: k,
      target: b,
      identifier: A,
      active: c,
      x: q[0],
      y: q[1],
      dx: 0,
      dy: 0,
      dispatch: le
    }), H)) != null)
      return Q = L.x - q[0] || 0, ne = L.y - q[1] || 0, function I(T, z, G) {
        var F = q, te;
        switch (T) {
          case "start":
            s[A] = I, te = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            q = wa(G || z, B), te = c;
            break;
        }
        le.call(
          T,
          O,
          new Xh(T, {
            sourceEvent: z,
            subject: L,
            target: b,
            identifier: A,
            active: te,
            x: q[0] + Q,
            y: q[1] + ne,
            dx: q[0] - F[0],
            dy: q[1] - F[1],
            dispatch: le
          }),
          H
        );
      };
  }
  return b.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : Au(!!O), b) : e;
  }, b.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : Au(O), b) : a;
  }, b.subject = function(O) {
    return arguments.length ? (r = typeof O == "function" ? O : Au(O), b) : r;
  }, b.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : Au(!!O), b) : l;
  }, b.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? b : O;
  }, b.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, b) : Math.sqrt(g);
  }, b;
}
function Bm(e, a, r) {
  e.prototype = a.prototype = r, r.constructor = e;
}
function q1(e, a) {
  var r = Object.create(e.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function ds() {
}
var Po = 0.7, hc = 1 / Po, Cl = "\\s*([+-]?\\d+)\\s*", Zo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", qa = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", TT = /^#([0-9a-f]{3,8})$/, MT = new RegExp(`^rgb\\(${Cl},${Cl},${Cl}\\)$`), AT = new RegExp(`^rgb\\(${qa},${qa},${qa}\\)$`), DT = new RegExp(`^rgba\\(${Cl},${Cl},${Cl},${Zo}\\)$`), jT = new RegExp(`^rgba\\(${qa},${qa},${qa},${Zo}\\)$`), OT = new RegExp(`^hsl\\(${Zo},${qa},${qa}\\)$`), zT = new RegExp(`^hsla\\(${Zo},${qa},${qa},${Zo}\\)$`), By = {
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
Bm(ds, Tr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Uy,
  // Deprecated! Use color.formatHex.
  formatHex: Uy,
  formatHex8: LT,
  formatHsl: kT,
  formatRgb: Vy,
  toString: Vy
});
function Uy() {
  return this.rgb().formatHex();
}
function LT() {
  return this.rgb().formatHex8();
}
function kT() {
  return I1(this).formatHsl();
}
function Vy() {
  return this.rgb().formatRgb();
}
function Tr(e) {
  var a, r;
  return e = (e + "").trim().toLowerCase(), (a = TT.exec(e)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? $y(a) : r === 3 ? new On(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? Du(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? Du(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = MT.exec(e)) ? new On(a[1], a[2], a[3], 1) : (a = AT.exec(e)) ? new On(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = DT.exec(e)) ? Du(a[1], a[2], a[3], a[4]) : (a = jT.exec(e)) ? Du(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = OT.exec(e)) ? Yy(a[1], a[2] / 100, a[3] / 100, 1) : (a = zT.exec(e)) ? Yy(a[1], a[2] / 100, a[3] / 100, a[4]) : By.hasOwnProperty(e) ? $y(By[e]) : e === "transparent" ? new On(NaN, NaN, NaN, 0) : null;
}
function $y(e) {
  return new On(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Du(e, a, r, l) {
  return l <= 0 && (e = a = r = NaN), new On(e, a, r, l);
}
function HT(e) {
  return e instanceof ds || (e = Tr(e)), e ? (e = e.rgb(), new On(e.r, e.g, e.b, e.opacity)) : new On();
}
function Ph(e, a, r, l) {
  return arguments.length === 1 ? HT(e) : new On(e, a, r, l ?? 1);
}
function On(e, a, r, l) {
  this.r = +e, this.g = +a, this.b = +r, this.opacity = +l;
}
Bm(On, Ph, q1(ds, {
  brighter(e) {
    return e = e == null ? hc : Math.pow(hc, e), new On(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Po : Math.pow(Po, e), new On(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new On(Cr(this.r), Cr(this.g), Cr(this.b), mc(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: qy,
  // Deprecated! Use color.formatHex.
  formatHex: qy,
  formatHex8: BT,
  formatRgb: Iy,
  toString: Iy
}));
function qy() {
  return `#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}`;
}
function BT() {
  return `#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}${Nr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Iy() {
  const e = mc(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Cr(this.r)}, ${Cr(this.g)}, ${Cr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function mc(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Cr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Nr(e) {
  return e = Cr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Yy(e, a, r, l) {
  return l <= 0 ? e = a = r = NaN : r <= 0 || r >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new _a(e, a, r, l);
}
function I1(e) {
  if (e instanceof _a) return new _a(e.h, e.s, e.l, e.opacity);
  if (e instanceof ds || (e = Tr(e)), !e) return new _a();
  if (e instanceof _a) return e;
  e = e.rgb();
  var a = e.r / 255, r = e.g / 255, l = e.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (r - l) / d + (r < l) * 6 : r === u ? c = (l - a) / d + 2 : c = (a - r) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new _a(c, d, p, e.opacity);
}
function UT(e, a, r, l) {
  return arguments.length === 1 ? I1(e) : new _a(e, a, r, l ?? 1);
}
function _a(e, a, r, l) {
  this.h = +e, this.s = +a, this.l = +r, this.opacity = +l;
}
Bm(_a, UT, q1(ds, {
  brighter(e) {
    return e = e == null ? hc : Math.pow(hc, e), new _a(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Po : Math.pow(Po, e), new _a(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new On(
      mh(e >= 240 ? e - 240 : e + 120, s, l),
      mh(e, s, l),
      mh(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new _a(Gy(this.h), ju(this.s), ju(this.l), mc(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = mc(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Gy(this.h)}, ${ju(this.s) * 100}%, ${ju(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Gy(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ju(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function mh(e, a, r) {
  return (e < 60 ? a + (r - a) * e / 60 : e < 180 ? r : e < 240 ? a + (r - a) * (240 - e) / 60 : a) * 255;
}
const Um = (e) => () => e;
function VT(e, a) {
  return function(r) {
    return e + r * a;
  };
}
function $T(e, a, r) {
  return e = Math.pow(e, r), a = Math.pow(a, r) - e, r = 1 / r, function(l) {
    return Math.pow(e + l * a, r);
  };
}
function qT(e) {
  return (e = +e) == 1 ? Y1 : function(a, r) {
    return r - a ? $T(a, r, e) : Um(isNaN(a) ? r : a);
  };
}
function Y1(e, a) {
  var r = a - e;
  return r ? VT(e, r) : Um(isNaN(e) ? a : e);
}
const pc = (function e(a) {
  var r = qT(a);
  function l(s, u) {
    var c = r((s = Ph(s)).r, (u = Ph(u)).r), d = r(s.g, u.g), p = r(s.b, u.b), m = Y1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = d(y), s.b = p(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function IT(e, a) {
  a || (a = []);
  var r = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function YT(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function GT(e, a) {
  var r = a ? a.length : 0, l = e ? Math.min(r, e.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = qo(e[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function FT(e, a) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, a = +a, function(l) {
    return r.setTime(e * (1 - l) + a * l), r;
  };
}
function Ua(e, a) {
  return e = +e, a = +a, function(r) {
    return e * (1 - r) + a * r;
  };
}
function XT(e, a) {
  var r = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? r[s] = qo(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var Zh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ph = new RegExp(Zh.source, "g");
function PT(e) {
  return function() {
    return e;
  };
}
function ZT(e) {
  return function(a) {
    return e(a) + "";
  };
}
function G1(e, a) {
  var r = Zh.lastIndex = ph.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = Zh.exec(e)) && (s = ph.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: Ua(l, s) })), r = ph.lastIndex;
  return r < a.length && (u = a.slice(r), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? ZT(p[0].x) : PT(a) : (a = p.length, function(m) {
    for (var y = 0, g; y < a; ++y) d[(g = p[y]).i] = g.x(m);
    return d.join("");
  });
}
function qo(e, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? Um(a) : (r === "number" ? Ua : r === "string" ? (l = Tr(a)) ? (a = l, pc) : G1 : a instanceof Tr ? pc : a instanceof Date ? FT : YT(a) ? IT : Array.isArray(a) ? GT : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? XT : Ua)(e, a);
}
var Fy = 180 / Math.PI, Qh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function F1(e, a, r, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * r + a * l) && (r -= e * p, l -= a * p), (d = Math.sqrt(r * r + l * l)) && (r /= d, l /= d, p /= d), e * l < a * r && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * Fy,
    skewX: Math.atan(p) * Fy,
    scaleX: c,
    scaleY: d
  };
}
var Ou;
function QT(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Qh : F1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function KT(e) {
  return e == null || (Ou || (Ou = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ou.setAttribute("transform", e), !(e = Ou.transform.baseVal.consolidate())) ? Qh : (e = e.matrix, F1(e.a, e.b, e.c, e.d, e.e, e.f));
}
function X1(e, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, g, b, x, _) {
    if (m !== g || y !== b) {
      var E = x.push("translate(", null, a, null, r);
      _.push({ i: E - 4, x: Ua(m, g) }, { i: E - 2, x: Ua(y, b) });
    } else (g || b) && x.push("translate(" + g + a + b + r);
  }
  function c(m, y, g, b) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), b.push({ i: g.push(s(g) + "rotate(", null, l) - 2, x: Ua(m, y) })) : y && g.push(s(g) + "rotate(" + y + l);
  }
  function d(m, y, g, b) {
    m !== y ? b.push({ i: g.push(s(g) + "skewX(", null, l) - 2, x: Ua(m, y) }) : y && g.push(s(g) + "skewX(" + y + l);
  }
  function p(m, y, g, b, x, _) {
    if (m !== g || y !== b) {
      var E = x.push(s(x) + "scale(", null, ",", null, ")");
      _.push({ i: E - 4, x: Ua(m, g) }, { i: E - 2, x: Ua(y, b) });
    } else (g !== 1 || b !== 1) && x.push(s(x) + "scale(" + g + "," + b + ")");
  }
  return function(m, y) {
    var g = [], b = [];
    return m = e(m), y = e(y), u(m.translateX, m.translateY, y.translateX, y.translateY, g, b), c(m.rotate, y.rotate, g, b), d(m.skewX, y.skewX, g, b), p(m.scaleX, m.scaleY, y.scaleX, y.scaleY, g, b), m = y = null, function(x) {
      for (var _ = -1, E = b.length, N; ++_ < E; ) g[(N = b[_]).i] = N.x(x);
      return g.join("");
    };
  };
}
var JT = X1(QT, "px, ", "px)", "deg)"), WT = X1(KT, ", ", ")", ")"), eM = 1e-12;
function Xy(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function tM(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function nM(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ac = (function e(a, r, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], y = c[0], g = c[1], b = c[2], x = y - d, _ = g - p, E = x * x + _ * _, N, R;
    if (E < eM)
      R = Math.log(b / m) / a, N = function(H) {
        return [
          d + H * x,
          p + H * _,
          m * Math.exp(a * H * R)
        ];
      };
    else {
      var j = Math.sqrt(E), C = (b * b - m * m + l * E) / (2 * m * r * j), O = (b * b - m * m - l * E) / (2 * b * r * j), B = Math.log(Math.sqrt(C * C + 1) - C), k = Math.log(Math.sqrt(O * O + 1) - O);
      R = (k - B) / a, N = function(H) {
        var A = H * R, Y = Xy(B), le = m / (r * j) * (Y * nM(a * A + B) - tM(B));
        return [
          d + le * x,
          p + le * _,
          m * Y / Xy(a * A + B)
        ];
      };
    }
    return N.duration = R * 1e3 * a / Math.SQRT2, N;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Ml = 0, Uo = 0, jo = 0, P1 = 1e3, gc, Vo, vc = 0, Mr = 0, Bc = 0, Qo = typeof performance == "object" && performance.now ? performance : Date, Z1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Vm() {
  return Mr || (Z1(aM), Mr = Qo.now() + Bc);
}
function aM() {
  Mr = 0;
}
function yc() {
  this._call = this._time = this._next = null;
}
yc.prototype = Q1.prototype = {
  constructor: yc,
  restart: function(e, a, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Vm() : +r) + (a == null ? 0 : +a), !this._next && Vo !== this && (Vo ? Vo._next = this : gc = this, Vo = this), this._call = e, this._time = r, Kh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Kh());
  }
};
function Q1(e, a, r) {
  var l = new yc();
  return l.restart(e, a, r), l;
}
function iM() {
  Vm(), ++Ml;
  for (var e = gc, a; e; )
    (a = Mr - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Ml;
}
function Py() {
  Mr = (vc = Qo.now()) + Bc, Ml = Uo = 0;
  try {
    iM();
  } finally {
    Ml = 0, lM(), Mr = 0;
  }
}
function rM() {
  var e = Qo.now(), a = e - vc;
  a > P1 && (Bc -= a, vc = e);
}
function lM() {
  for (var e, a = gc, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (r = a._next, a._next = null, a = e ? e._next = r : gc = r);
  Vo = e, Kh(l);
}
function Kh(e) {
  if (!Ml) {
    Uo && (Uo = clearTimeout(Uo));
    var a = e - Mr;
    a > 24 ? (e < 1 / 0 && (Uo = setTimeout(Py, e - Qo.now() - Bc)), jo && (jo = clearInterval(jo))) : (jo || (vc = Qo.now(), jo = setInterval(rM, P1)), Ml = 1, Z1(Py));
  }
}
function Zy(e, a, r) {
  var l = new yc();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, r), l;
}
var oM = kc("start", "end", "cancel", "interrupt"), sM = [], K1 = 0, Qy = 1, Jh = 2, ic = 3, Ky = 4, Wh = 5, rc = 6;
function Uc(e, a, r, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (r in c) return;
  uM(e, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: oM,
    tween: sM,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: K1
  });
}
function $m(e, a) {
  var r = Ta(e, a);
  if (r.state > K1) throw new Error("too late; already scheduled");
  return r;
}
function Ga(e, a) {
  var r = Ta(e, a);
  if (r.state > ic) throw new Error("too late; already running");
  return r;
}
function Ta(e, a) {
  var r = e.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function uM(e, a, r) {
  var l = e.__transition, s;
  l[a] = r, r.timer = Q1(u, 0, r.time);
  function u(m) {
    r.state = Qy, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var y, g, b, x;
    if (r.state !== Qy) return p();
    for (y in l)
      if (x = l[y], x.name === r.name) {
        if (x.state === ic) return Zy(c);
        x.state === Ky ? (x.state = rc, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[y]) : +y < a && (x.state = rc, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[y]);
      }
    if (Zy(function() {
      r.state === ic && (r.state = Ky, r.timer.restart(d, r.delay, r.time), d(m));
    }), r.state = Jh, r.on.call("start", e, e.__data__, r.index, r.group), r.state === Jh) {
      for (r.state = ic, s = new Array(b = r.tween.length), y = 0, g = -1; y < b; ++y)
        (x = r.tween[y].value.call(e, e.__data__, r.index, r.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var y = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(p), r.state = Wh, 1), g = -1, b = s.length; ++g < b; )
      s[g].call(e, y);
    r.state === Wh && (r.on.call("end", e, e.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = rc, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function lc(e, a) {
  var r = e.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > Jh && l.state < Wh, l.state = rc, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete r[c];
    }
    u && delete e.__transition;
  }
}
function cM(e) {
  return this.each(function() {
    lc(this, e);
  });
}
function fM(e, a) {
  var r, l;
  return function() {
    var s = Ga(this, e), u = s.tween;
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
function dM(e, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = Ga(this, e), c = u.tween;
    if (c !== l) {
      s = (l = c).slice();
      for (var d = { name: a, value: r }, p = 0, m = s.length; p < m; ++p)
        if (s[p].name === a) {
          s[p] = d;
          break;
        }
      p === m && s.push(d);
    }
    u.tween = s;
  };
}
function hM(e, a) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = Ta(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? fM : dM)(r, e, a));
}
function qm(e, a, r) {
  var l = e._id;
  return e.each(function() {
    var s = Ga(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return Ta(s, l).value[a];
  };
}
function J1(e, a) {
  var r;
  return (typeof a == "number" ? Ua : a instanceof Tr ? pc : (r = Tr(a)) ? (a = r, pc) : G1)(e, a);
}
function mM(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pM(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function gM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function vM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function yM(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function bM(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function xM(e, a) {
  var r = Hc(e), l = r === "transform" ? WT : J1;
  return this.attrTween(e, typeof a == "function" ? (r.local ? bM : yM)(r, l, qm(this, "attr." + e, a)) : a == null ? (r.local ? pM : mM)(r) : (r.local ? vM : gM)(r, l, a));
}
function wM(e, a) {
  return function(r) {
    this.setAttribute(e, a.call(this, r));
  };
}
function _M(e, a) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, a.call(this, r));
  };
}
function SM(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && _M(e, u)), r;
  }
  return s._value = a, s;
}
function EM(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && wM(e, u)), r;
  }
  return s._value = a, s;
}
function NM(e, a) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = Hc(e);
  return this.tween(r, (l.local ? SM : EM)(l, a));
}
function CM(e, a) {
  return function() {
    $m(this, e).delay = +a.apply(this, arguments);
  };
}
function RM(e, a) {
  return a = +a, function() {
    $m(this, e).delay = a;
  };
}
function TM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? CM : RM)(a, e)) : Ta(this.node(), a).delay;
}
function MM(e, a) {
  return function() {
    Ga(this, e).duration = +a.apply(this, arguments);
  };
}
function AM(e, a) {
  return a = +a, function() {
    Ga(this, e).duration = a;
  };
}
function DM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? MM : AM)(a, e)) : Ta(this.node(), a).duration;
}
function jM(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Ga(this, e).ease = a;
  };
}
function OM(e) {
  var a = this._id;
  return arguments.length ? this.each(jM(a, e)) : Ta(this.node(), a).ease;
}
function zM(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    Ga(this, e).ease = r;
  };
}
function LM(e) {
  if (typeof e != "function") throw new Error();
  return this.each(zM(this._id, e));
}
function kM(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new pi(l, this._parents, this._name, this._id);
}
function HM(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, r = e._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = r[d], y = p.length, g = c[d] = new Array(y), b, x = 0; x < y; ++x)
      (b = p[x] || m[x]) && (g[x] = b);
  for (; d < l; ++d)
    c[d] = a[d];
  return new pi(c, this._parents, this._name, this._id);
}
function BM(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function UM(e, a, r) {
  var l, s, u = BM(a) ? $m : Ga;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, r), c.on = s;
  };
}
function VM(e, a) {
  var r = this._id;
  return arguments.length < 2 ? Ta(this.node(), r).on.on(e) : this.each(UM(r, e, a));
}
function $M(e) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    a && a.removeChild(this);
  };
}
function qM() {
  return this.on("end.remove", $M(this._id));
}
function IM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = km(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), y, g, b = 0; b < p; ++b)
      (y = d[b]) && (g = e.call(y, y.__data__, b, d)) && ("__data__" in y && (g.__data__ = y.__data__), m[b] = g, Uc(m[b], a, r, b, m, Ta(y, r)));
  return new pi(u, this._parents, a, r);
}
function YM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = T1(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, y, g = 0; g < m; ++g)
      if (y = p[g]) {
        for (var b = e.call(y, y.__data__, g, p), x, _ = Ta(y, r), E = 0, N = b.length; E < N; ++E)
          (x = b[E]) && Uc(x, a, r, E, b, _);
        u.push(b), c.push(y);
      }
  return new pi(u, c, a, r);
}
var GM = fs.prototype.constructor;
function FM() {
  return new GM(this._groups, this._parents);
}
function XM(e, a) {
  var r, l, s;
  return function() {
    var u = Tl(this, e), c = (this.style.removeProperty(e), Tl(this, e));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function W1(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function PM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = Tl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function ZM(e, a, r) {
  var l, s, u;
  return function() {
    var c = Tl(this, e), d = r(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), Tl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function QM(e, a) {
  var r, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = Ga(this, e), m = p.on, y = p.value[u] == null ? d || (d = W1(a)) : void 0;
    (m !== r || s !== y) && (l = (r = m).copy()).on(c, s = y), p.on = l;
  };
}
function KM(e, a, r) {
  var l = (e += "") == "transform" ? JT : J1;
  return a == null ? this.styleTween(e, XM(e, l)).on("end.style." + e, W1(e)) : typeof a == "function" ? this.styleTween(e, ZM(e, l, qm(this, "style." + e, a))).each(QM(this._id, e)) : this.styleTween(e, PM(e, l, a), r).on("end.style." + e, null);
}
function JM(e, a, r) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), r);
  };
}
function WM(e, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && JM(e, c, r)), l;
  }
  return u._value = a, u;
}
function eA(e, a, r) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, WM(e, a, r ?? ""));
}
function tA(e) {
  return function() {
    this.textContent = e;
  };
}
function nA(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function aA(e) {
  return this.tween("text", typeof e == "function" ? nA(qm(this, "text", e)) : tA(e == null ? "" : e + ""));
}
function iA(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function rA(e) {
  var a, r;
  function l() {
    var s = e.apply(this, arguments);
    return s !== r && (a = (r = s) && iA(s)), a;
  }
  return l._value = e, l;
}
function lA(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, rA(e));
}
function oA() {
  for (var e = this._name, a = this._id, r = ew(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var y = Ta(p, a);
        Uc(p, e, r, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new pi(l, this._parents, e, r);
}
function sA() {
  var e, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var m = Ga(this, l), y = m.on;
      y !== e && (a = (e = y).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), m.on = a;
    }), s === 0 && u();
  });
}
var uA = 0;
function pi(e, a, r, l) {
  this._groups = e, this._parents = a, this._name = r, this._id = l;
}
function ew() {
  return ++uA;
}
var ci = fs.prototype;
pi.prototype = {
  constructor: pi,
  select: IM,
  selectAll: YM,
  selectChild: ci.selectChild,
  selectChildren: ci.selectChildren,
  filter: kM,
  merge: HM,
  selection: FM,
  transition: oA,
  call: ci.call,
  nodes: ci.nodes,
  node: ci.node,
  size: ci.size,
  empty: ci.empty,
  each: ci.each,
  on: VM,
  attr: xM,
  attrTween: NM,
  style: KM,
  styleTween: eA,
  text: aA,
  textTween: lA,
  remove: qM,
  tween: hM,
  delay: TM,
  duration: DM,
  ease: OM,
  easeVarying: LM,
  end: sA,
  [Symbol.iterator]: ci[Symbol.iterator]
};
function cA(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var fA = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cA
};
function dA(e, a) {
  for (var r; !(r = e.__transition) || !(r = r[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function hA(e) {
  var a, r;
  e instanceof pi ? (a = e._id, e = e._name) : (a = ew(), (r = fA).time = Vm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && Uc(p, e, a, m, c, r || dA(p, a));
  return new pi(l, this._parents, e, a);
}
fs.prototype.interrupt = cM;
fs.prototype.transition = hA;
const zu = (e) => () => e;
function mA(e, {
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
function hi(e, a, r) {
  this.k = e, this.x = a, this.y = r;
}
hi.prototype = {
  constructor: hi,
  scale: function(e) {
    return e === 1 ? this : new hi(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new hi(this.k, this.x + this.k * e, this.y + this.k * a);
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
var Vc = new hi(1, 0, 0);
tw.prototype = hi.prototype;
function tw(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Vc;
  return e.__zoom;
}
function gh(e) {
  e.stopImmediatePropagation();
}
function Oo(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function pA(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function gA() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Jy() {
  return this.__zoom || Vc;
}
function vA(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function yA() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function bA(e, a, r) {
  var l = e.invertX(a[0][0]) - r[0][0], s = e.invertX(a[1][0]) - r[1][0], u = e.invertY(a[0][1]) - r[0][1], c = e.invertY(a[1][1]) - r[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function nw() {
  var e = pA, a = gA, r = bA, l = vA, s = yA, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = ac, m = kc("start", "zoom", "end"), y, g, b, x = 500, _ = 150, E = 0, N = 10;
  function R(L) {
    L.property("__zoom", Jy).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", Y).on("dblclick.zoom", le).filter(s).on("touchstart.zoom", q).on("touchmove.zoom", Q).on("touchend.zoom touchcancel.zoom", ne).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  R.transform = function(L, I, T, z) {
    var G = L.selection ? L.selection() : L;
    G.property("__zoom", Jy), L !== G ? B(L, I, T, z) : G.interrupt().each(function() {
      k(this, arguments).event(z).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, R.scaleBy = function(L, I, T, z) {
    R.scaleTo(L, function() {
      var G = this.__zoom.k, F = typeof I == "function" ? I.apply(this, arguments) : I;
      return G * F;
    }, T, z);
  }, R.scaleTo = function(L, I, T, z) {
    R.transform(L, function() {
      var G = a.apply(this, arguments), F = this.__zoom, te = T == null ? O(G) : typeof T == "function" ? T.apply(this, arguments) : T, D = F.invert(te), V = typeof I == "function" ? I.apply(this, arguments) : I;
      return r(C(j(F, V), te, D), G, c);
    }, T, z);
  }, R.translateBy = function(L, I, T, z) {
    R.transform(L, function() {
      return r(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), a.apply(this, arguments), c);
    }, null, z);
  }, R.translateTo = function(L, I, T, z, G) {
    R.transform(L, function() {
      var F = a.apply(this, arguments), te = this.__zoom, D = z == null ? O(F) : typeof z == "function" ? z.apply(this, arguments) : z;
      return r(Vc.translate(D[0], D[1]).scale(te.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), F, c);
    }, z, G);
  };
  function j(L, I) {
    return I = Math.max(u[0], Math.min(u[1], I)), I === L.k ? L : new hi(I, L.x, L.y);
  }
  function C(L, I, T) {
    var z = I[0] - T[0] * L.k, G = I[1] - T[1] * L.k;
    return z === L.x && G === L.y ? L : new hi(L.k, z, G);
  }
  function O(L) {
    return [(+L[0][0] + +L[1][0]) / 2, (+L[0][1] + +L[1][1]) / 2];
  }
  function B(L, I, T, z) {
    L.on("start.zoom", function() {
      k(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var G = this, F = arguments, te = k(G, F).event(z), D = a.apply(G, F), V = T == null ? O(D) : typeof T == "function" ? T.apply(G, F) : T, Z = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), ee = G.__zoom, se = typeof I == "function" ? I.apply(G, F) : I, he = p(ee.invert(V).concat(Z / ee.k), se.invert(V).concat(Z / se.k));
      return function(me) {
        if (me === 1) me = se;
        else {
          var J = he(me), ve = Z / J[2];
          me = new hi(ve, V[0] - J[0] * ve, V[1] - J[1] * ve);
        }
        te.zoom(null, me);
      };
    });
  }
  function k(L, I, T) {
    return !T && L.__zooming || new H(L, I);
  }
  function H(L, I) {
    this.that = L, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = a.apply(L, I), this.taps = 0;
  }
  H.prototype = {
    event: function(L) {
      return L && (this.sourceEvent = L), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(L, I) {
      return this.mouse && L !== "mouse" && (this.mouse[1] = I.invert(this.mouse[0])), this.touch0 && L !== "touch" && (this.touch0[1] = I.invert(this.touch0[0])), this.touch1 && L !== "touch" && (this.touch1[1] = I.invert(this.touch1[0])), this.that.__zoom = I, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(L) {
      var I = Xn(this.that).datum();
      m.call(
        L,
        this.that,
        new mA(L, {
          sourceEvent: this.sourceEvent,
          target: R,
          transform: this.that.__zoom,
          dispatch: m
        }),
        I
      );
    }
  };
  function A(L, ...I) {
    if (!e.apply(this, arguments)) return;
    var T = k(this, I).event(L), z = this.__zoom, G = Math.max(u[0], Math.min(u[1], z.k * Math.pow(2, l.apply(this, arguments)))), F = wa(L);
    if (T.wheel)
      (T.mouse[0][0] !== F[0] || T.mouse[0][1] !== F[1]) && (T.mouse[1] = z.invert(T.mouse[0] = F)), clearTimeout(T.wheel);
    else {
      if (z.k === G) return;
      T.mouse = [F, z.invert(F)], lc(this), T.start();
    }
    Oo(L), T.wheel = setTimeout(te, _), T.zoom("mouse", r(C(j(z, G), T.mouse[0], T.mouse[1]), T.extent, c));
    function te() {
      T.wheel = null, T.end();
    }
  }
  function Y(L, ...I) {
    if (b || !e.apply(this, arguments)) return;
    var T = L.currentTarget, z = k(this, I, !0).event(L), G = Xn(L.view).on("mousemove.zoom", V, !0).on("mouseup.zoom", Z, !0), F = wa(L, T), te = L.clientX, D = L.clientY;
    U1(L.view), gh(L), z.mouse = [F, this.__zoom.invert(F)], lc(this), z.start();
    function V(ee) {
      if (Oo(ee), !z.moved) {
        var se = ee.clientX - te, he = ee.clientY - D;
        z.moved = se * se + he * he > E;
      }
      z.event(ee).zoom("mouse", r(C(z.that.__zoom, z.mouse[0] = wa(ee, T), z.mouse[1]), z.extent, c));
    }
    function Z(ee) {
      G.on("mousemove.zoom mouseup.zoom", null), V1(ee.view, z.moved), Oo(ee), z.event(ee).end();
    }
  }
  function le(L, ...I) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, z = wa(L.changedTouches ? L.changedTouches[0] : L, this), G = T.invert(z), F = T.k * (L.shiftKey ? 0.5 : 2), te = r(C(j(T, F), z, G), a.apply(this, I), c);
      Oo(L), d > 0 ? Xn(this).transition().duration(d).call(B, te, z, L) : Xn(this).call(R.transform, te, z, L);
    }
  }
  function q(L, ...I) {
    if (e.apply(this, arguments)) {
      var T = L.touches, z = T.length, G = k(this, I, L.changedTouches.length === z).event(L), F, te, D, V;
      for (gh(L), te = 0; te < z; ++te)
        D = T[te], V = wa(D, this), V = [V, this.__zoom.invert(V), D.identifier], G.touch0 ? !G.touch1 && G.touch0[2] !== V[2] && (G.touch1 = V, G.taps = 0) : (G.touch0 = V, F = !0, G.taps = 1 + !!y);
      y && (y = clearTimeout(y)), F && (G.taps < 2 && (g = V[0], y = setTimeout(function() {
        y = null;
      }, x)), lc(this), G.start());
    }
  }
  function Q(L, ...I) {
    if (this.__zooming) {
      var T = k(this, I).event(L), z = L.changedTouches, G = z.length, F, te, D, V;
      for (Oo(L), F = 0; F < G; ++F)
        te = z[F], D = wa(te, this), T.touch0 && T.touch0[2] === te.identifier ? T.touch0[0] = D : T.touch1 && T.touch1[2] === te.identifier && (T.touch1[0] = D);
      if (te = T.that.__zoom, T.touch1) {
        var Z = T.touch0[0], ee = T.touch0[1], se = T.touch1[0], he = T.touch1[1], me = (me = se[0] - Z[0]) * me + (me = se[1] - Z[1]) * me, J = (J = he[0] - ee[0]) * J + (J = he[1] - ee[1]) * J;
        te = j(te, Math.sqrt(me / J)), D = [(Z[0] + se[0]) / 2, (Z[1] + se[1]) / 2], V = [(ee[0] + he[0]) / 2, (ee[1] + he[1]) / 2];
      } else if (T.touch0) D = T.touch0[0], V = T.touch0[1];
      else return;
      T.zoom("touch", r(C(te, D, V), T.extent, c));
    }
  }
  function ne(L, ...I) {
    if (this.__zooming) {
      var T = k(this, I).event(L), z = L.changedTouches, G = z.length, F, te;
      for (gh(L), b && clearTimeout(b), b = setTimeout(function() {
        b = null;
      }, x), F = 0; F < G; ++F)
        te = z[F], T.touch0 && T.touch0[2] === te.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === te.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (te = wa(te, this), Math.hypot(g[0] - te[0], g[1] - te[1]) < N)) {
        var D = Xn(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return R.wheelDelta = function(L) {
    return arguments.length ? (l = typeof L == "function" ? L : zu(+L), R) : l;
  }, R.filter = function(L) {
    return arguments.length ? (e = typeof L == "function" ? L : zu(!!L), R) : e;
  }, R.touchable = function(L) {
    return arguments.length ? (s = typeof L == "function" ? L : zu(!!L), R) : s;
  }, R.extent = function(L) {
    return arguments.length ? (a = typeof L == "function" ? L : zu([[+L[0][0], +L[0][1]], [+L[1][0], +L[1][1]]]), R) : a;
  }, R.scaleExtent = function(L) {
    return arguments.length ? (u[0] = +L[0], u[1] = +L[1], R) : [u[0], u[1]];
  }, R.translateExtent = function(L) {
    return arguments.length ? (c[0][0] = +L[0][0], c[1][0] = +L[1][0], c[0][1] = +L[0][1], c[1][1] = +L[1][1], R) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, R.constrain = function(L) {
    return arguments.length ? (r = L, R) : r;
  }, R.duration = function(L) {
    return arguments.length ? (d = +L, R) : d;
  }, R.interpolate = function(L) {
    return arguments.length ? (p = L, R) : p;
  }, R.on = function() {
    var L = m.on.apply(m, arguments);
    return L === m ? R : L;
  }, R.clickDistance = function(L) {
    return arguments.length ? (E = (L = +L) * L, R) : Math.sqrt(E);
  }, R.tapDistance = function(L) {
    return arguments.length ? (N = +L, R) : N;
  }, R;
}
const Na = {
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
}, Ko = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], aw = ["Enter", " ", "Escape"], iw = {
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
var Al;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Al || (Al = {}));
var Rr;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Rr || (Rr = {}));
var Jo;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Jo || (Jo = {}));
const rw = {
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
var Qi;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Qi || (Qi = {}));
var bc;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(bc || (bc = {}));
var ke;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(ke || (ke = {}));
const Wy = {
  [ke.Left]: ke.Right,
  [ke.Right]: ke.Left,
  [ke.Top]: ke.Bottom,
  [ke.Bottom]: ke.Top
};
function lw(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const ow = (e) => "id" in e && "source" in e && "target" in e, xA = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Im = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), hs = (e, a = [0, 0]) => {
  const { width: r, height: l } = vi(e), s = e.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, wA = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Im(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? xc(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return $c(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return qc(r);
}, ms = (e, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = $c(r, xc(s)), l = !0);
  }), l ? qc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Ym = (e, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...kl(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: y, selectable: g = !0, hidden: b = !1 } = m;
    if (c && !g || b)
      continue;
    const x = y.width ?? m.width ?? m.initialWidth ?? null, _ = y.height ?? m.height ?? m.initialHeight ?? null, E = Wo(d, jl(m)), N = (x ?? 0) * (_ ?? 0), R = u && E > 0;
    (!m.internals.handleBounds || R || E >= N || m.dragging) && p.push(m);
  }
  return p;
}, _A = (e, a) => {
  const r = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function SA(e, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function EA({ nodes: e, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = SA(e, c), p = ms(d), m = Fm(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function sw({ nodeId: e, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(e), d = c.parentId ? r.get(c.parentId) : void 0, { x: p, y: m } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? l;
  let g = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", Na.error005());
    else {
      const x = d.measured.width, _ = d.measured.height;
      x && _ && (g = [
        [p, m],
        [p + x, m + _]
      ]);
    }
  else d && Dr(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + m],
    [c.extent[1][0] + p, c.extent[1][1] + m]
  ]);
  const b = Dr(g) ? Ar(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", Na.error015()), {
    position: {
      x: b.x - p + (c.measured.width ?? 0) * y[0],
      y: b.y - m + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: b
  };
}
async function NA({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((b) => b.id)), c = [];
  for (const b of r) {
    if (b.deletable === !1)
      continue;
    const x = u.has(b.id), _ = !x && b.parentId && c.find((E) => E.id === b.parentId);
    (x || _) && c.push(b);
  }
  const d = new Set(a.map((b) => b.id)), p = l.filter((b) => b.deletable !== !1), y = _A(c, p);
  for (const b of p)
    d.has(b.id) && !y.find((_) => _.id === b.id) && y.push(b);
  if (!s)
    return {
      edges: y,
      nodes: c
    };
  const g = await s({
    nodes: c,
    edges: y
  });
  return typeof g == "boolean" ? g ? { edges: y, nodes: c } : { edges: [], nodes: [] } : g;
}
const Dl = (e, a = 0, r = 1) => Math.min(Math.max(e, a), r), Ar = (e = { x: 0, y: 0 }, a, r) => ({
  x: Dl(e.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: Dl(e.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function uw(e, a, r) {
  const { width: l, height: s } = vi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return Ar(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const eb = (e, a, r) => e < a ? Dl(Math.abs(e - a), 1, a) / a : e > r ? -Dl(Math.abs(e - r), 1, a) / a : 0, Gm = (e, a, r = 15, l = 40) => {
  const s = eb(e.x, l, a.width - l) * r, u = eb(e.y, l, a.height - l) * r;
  return [s, u];
}, $c = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), em = ({ x: e, y: a, width: r, height: l }) => ({
  x: e,
  y: a,
  x2: e + r,
  y2: a + l
}), qc = ({ x: e, y: a, x2: r, y2: l }) => ({
  x: e,
  y: a,
  width: r - e,
  height: l - a
}), jl = (e, a = [0, 0]) => {
  const { x: r, y: l } = Im(e) ? e.internals.positionAbsolute : hs(e, a);
  return {
    x: r,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, xc = (e, a = [0, 0]) => {
  const { x: r, y: l } = Im(e) ? e.internals.positionAbsolute : hs(e, a);
  return {
    x: r,
    y: l,
    x2: r + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, cw = (e, a) => qc($c(em(e), em(a))), Wo = (e, a) => {
  const r = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(r * l);
}, tb = (e) => Sa(e.width) && Sa(e.height) && Sa(e.x) && Sa(e.y), Sa = (e) => !isNaN(e) && isFinite(e), fw = (e, a) => (r, l) => {
}, ps = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), kl = ({ x: e, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - r) / s,
    y: (a - l) / s
  };
  return u ? ps(d, c) : d;
}, Ol = ({ x: e, y: a }, [r, l, s]) => ({
  x: e * s + r,
  y: a * s + l
});
function pl(e, a) {
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
function CA(e, a, r) {
  if (typeof e == "string" || typeof e == "number") {
    const l = pl(e, r), s = pl(e, a);
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
    const l = pl(e.top ?? e.y ?? 0, r), s = pl(e.bottom ?? e.y ?? 0, r), u = pl(e.left ?? e.x ?? 0, a), c = pl(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function RA(e, a, r, l, s, u) {
  const { x: c, y: d } = Ol(e, [a, r, l]), { x: p, y: m } = Ol({ x: e.x + e.width, y: e.y + e.height }, [a, r, l]), y = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(y),
    bottom: Math.floor(g)
  };
}
const Fm = (e, a, r, l, s, u) => {
  const c = CA(u, a, r), d = (a - c.x) / e.width, p = (r - c.y) / e.height, m = Math.min(d, p), y = Dl(m, l, s), g = e.x + e.width / 2, b = e.y + e.height / 2, x = a / 2 - g * y, _ = r / 2 - b * y, E = RA(e, x, _, y, a, r), N = {
    left: Math.min(E.left - c.left, 0),
    top: Math.min(E.top - c.top, 0),
    right: Math.min(E.right - c.right, 0),
    bottom: Math.min(E.bottom - c.bottom, 0)
  };
  return {
    x: x - N.left + N.right,
    y: _ - N.top + N.bottom,
    zoom: y
  };
}, es = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Dr(e) {
  return e != null && e !== "parent";
}
function vi(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function dw(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function hw(e, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...e }, c = l.get(r);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function nb(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const r of e)
    if (!a.has(r))
      return !1;
  return !0;
}
function TA() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function MA(e) {
  return { ...iw, ...e || {} };
}
function Io(e, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = Ea(e), d = kl({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = r ? ps(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const Xm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), mw = (e) => e?.getRootNode?.() || window?.document, AA = ["INPUT", "SELECT", "TEXTAREA"];
function pw(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : AA.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const gw = (e) => "clientX" in e, Ea = (e, a) => {
  const r = gw(e), l = r ? e.clientX : e.touches?.[0].clientX, s = r ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, ab = (e, a, r, l, s) => {
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
      ...Xm(c)
    };
  });
};
function vw({ sourceX: e, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, y = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, y, g];
}
function Lu(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function ib({ pos: e, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (e) {
    case ke.Left:
      return [a - Lu(a - l, u), r];
    case ke.Right:
      return [a + Lu(l - a, u), r];
    case ke.Top:
      return [a, r - Lu(r - s, u)];
    case ke.Bottom:
      return [a, r + Lu(s - r, u)];
  }
}
function yw({ sourceX: e, sourceY: a, sourcePosition: r = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top, curvature: c = 0.25 }) {
  const [d, p] = ib({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = ib({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, b, x, _] = vw({
    sourceX: e,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: d,
    sourceControlY: p,
    targetControlX: m,
    targetControlY: y
  });
  return [
    `M${e},${a} C${d},${p} ${m},${y} ${l},${s}`,
    g,
    b,
    x,
    _
  ];
}
function bw({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - e) / 2, u = r < e ? r + s : r - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function DA({ sourceNode: e, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function jA({ sourceNode: e, targetNode: a, width: r, height: l, transform: s }) {
  const u = $c(xc(e), xc(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Wo(c, qc(u)) > 0;
}
const OA = ({ source: e, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${e}${a || ""}-${r}${l || ""}`, zA = (e, a) => a.some((r) => r.source === e.source && r.target === e.target && (r.sourceHandle === e.sourceHandle || !r.sourceHandle && !e.sourceHandle) && (r.targetHandle === e.targetHandle || !r.targetHandle && !e.targetHandle)), LA = (e, a, r = {}) => {
  if (!e.source || !e.target)
    return r.onError?.("006", Na.error006()), a;
  const l = r.getEdgeId || OA;
  let s;
  return ow(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, zA(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function xw({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, d] = bw({
    sourceX: e,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${e},${a}L ${r},${l}`, s, u, c, d];
}
const rb = {
  [ke.Left]: { x: -1, y: 0 },
  [ke.Right]: { x: 1, y: 0 },
  [ke.Top]: { x: 0, y: -1 },
  [ke.Bottom]: { x: 0, y: 1 }
}, kA = ({ source: e, sourcePosition: a = ke.Bottom, target: r }) => a === ke.Left || a === ke.Right ? e.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, lb = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function HA({ source: e, sourcePosition: a = ke.Bottom, target: r, targetPosition: l = ke.Top, center: s, offset: u, stepPosition: c }) {
  const d = rb[a], p = rb[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, y = { x: r.x + p.x * u, y: r.y + p.y * u }, g = kA({
    source: m,
    sourcePosition: a,
    target: y
  }), b = g.x !== 0 ? "x" : "y", x = g[b];
  let _ = [], E, N;
  const R = { x: 0, y: 0 }, j = { x: 0, y: 0 }, [, , C, O] = bw({
    sourceX: e.x,
    sourceY: e.y,
    targetX: r.x,
    targetY: r.y
  });
  if (d[b] * p[b] === -1) {
    b === "x" ? (E = s.x ?? m.x + (y.x - m.x) * c, N = s.y ?? (m.y + y.y) / 2) : (E = s.x ?? (m.x + y.x) / 2, N = s.y ?? m.y + (y.y - m.y) * c);
    const A = [
      { x: E, y: m.y },
      { x: E, y: y.y }
    ], Y = [
      { x: m.x, y: N },
      { x: y.x, y: N }
    ];
    d[b] === x ? _ = b === "x" ? A : Y : _ = b === "x" ? Y : A;
  } else {
    const A = [{ x: m.x, y: y.y }], Y = [{ x: y.x, y: m.y }];
    if (b === "x" ? _ = d.x === x ? Y : A : _ = d.y === x ? A : Y, a === l) {
      const L = Math.abs(e[b] - r[b]);
      if (L <= u) {
        const I = Math.min(u - 1, u - L);
        d[b] === x ? R[b] = (m[b] > e[b] ? -1 : 1) * I : j[b] = (y[b] > r[b] ? -1 : 1) * I;
      }
    }
    if (a !== l) {
      const L = b === "x" ? "y" : "x", I = d[b] === p[L], T = m[L] > y[L], z = m[L] < y[L];
      (d[b] === 1 && (!I && T || I && z) || d[b] !== 1 && (!I && z || I && T)) && (_ = b === "x" ? A : Y);
    }
    const le = { x: m.x + R.x, y: m.y + R.y }, q = { x: y.x + j.x, y: y.y + j.y }, Q = Math.max(Math.abs(le.x - _[0].x), Math.abs(q.x - _[0].x)), ne = Math.max(Math.abs(le.y - _[0].y), Math.abs(q.y - _[0].y));
    Q >= ne ? (E = (le.x + q.x) / 2, N = _[0].y) : (E = _[0].x, N = (le.y + q.y) / 2);
  }
  const B = { x: m.x + R.x, y: m.y + R.y }, k = { x: y.x + j.x, y: y.y + j.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...B.x !== _[0].x || B.y !== _[0].y ? [B] : [],
    ..._,
    ...k.x !== _[_.length - 1].x || k.y !== _[_.length - 1].y ? [k] : [],
    r
  ], E, N, C, O];
}
function BA(e, a, r, l) {
  const s = Math.min(lb(e, a) / 2, lb(a, r) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === r.x || e.y === c && c === r.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < r.x ? -1 : 1, y = e.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const d = e.x < r.x ? 1 : -1, p = e.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function tm({ sourceX: e, sourceY: a, sourcePosition: r = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: y = 0.5 }) {
  const [g, b, x, _, E] = HA({
    source: { x: e, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: y
  });
  let N = `M${g[0].x} ${g[0].y}`;
  for (let R = 1; R < g.length - 1; R++)
    N += BA(g[R - 1], g[R], g[R + 1], c);
  return N += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [N, b, x, _, E];
}
function ob(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function UA(e) {
  const { sourceNode: a, targetNode: r } = e;
  if (!ob(a) || !ob(r))
    return null;
  const l = a.internals.handleBounds || sb(a.handles), s = r.internals.handleBounds || sb(r.handles), u = ub(l?.source ?? [], e.sourceHandle), c = ub(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Al.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", Na.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || ke.Bottom, p = c?.position || ke.Top, m = jr(a, u, d), y = jr(r, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function sb(e) {
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
function jr(e, a, r = ke.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? vi(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? r) {
    case ke.Top:
      return { x: s + c / 2, y: u };
    case ke.Right:
      return { x: s + c, y: u + d / 2 };
    case ke.Bottom:
      return { x: s + c / 2, y: u + d };
    case ke.Left:
      return { x: s, y: u + d / 2 };
  }
}
function ub(e, a) {
  return e && (a ? e.find((r) => r.id === a) : e[0]) || null;
}
function nm(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function VA(e, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = nm(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || r, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const ww = 1e3, $A = 10, Pm = {
  nodeOrigin: [0, 0],
  nodeExtent: Ko,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, qA = {
  ...Pm,
  checkEquality: !0
};
function Zm(e, a) {
  const r = { ...e };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function IA(e, a, r) {
  const l = Zm(Pm, r);
  for (const s of e.values())
    if (s.parentId)
      Km(s, e, a, l);
    else {
      const u = hs(s, l.nodeOrigin), c = Dr(s.extent) ? s.extent : l.nodeExtent, d = Ar(u, c, vi(s));
      s.internals.positionAbsolute = d;
    }
}
function YA(e, a) {
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
function Qm(e) {
  return e === "manual";
}
function am(e, a, r, l = {}) {
  const s = Zm(qA, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !Qm(s.zIndexMode) ? ww : 0;
  let p = e.length > 0, m = !1;
  a.clear(), r.clear();
  for (const y of e) {
    let g = c.get(y.id);
    if (s.checkEquality && y === g?.internals.userNode)
      a.set(y.id, g);
    else {
      const b = hs(y, s.nodeOrigin), x = Dr(y.extent) ? y.extent : s.nodeExtent, _ = Ar(b, x, vi(y));
      g = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: _,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: YA(y, g),
          z: _w(y, d, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), y.parentId && Km(g, a, r, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function GA(e, a) {
  if (!e.parentId)
    return;
  const r = a.get(e.parentId);
  r ? r.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Km(e, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = Zm(Pm, l), m = e.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  GA(e, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * $A), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const g = u && !Qm(p) ? ww : 0, { x: b, y: x, z: _ } = FA(e, y, c, d, g, p), { positionAbsolute: E } = e.internals, N = b !== E.x || x !== E.y;
  (N || _ !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: N ? { x: b, y: x } : E,
      z: _
    }
  });
}
function _w(e, a, r) {
  const l = Sa(e.zIndex) ? e.zIndex : 0;
  return Qm(r) ? l : l + (e.selected ? a : 0);
}
function FA(e, a, r, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = vi(e), m = hs(e, r), y = Dr(e.extent) ? Ar(m, e.extent, p) : m;
  let g = Ar({ x: c + y.x, y: d + y.y }, l, p);
  e.extent === "parent" && (g = uw(g, p, a));
  const b = _w(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= b ? x + 1 : b
  };
}
function Jm(e, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? jl(d), m = cw(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, y = vi(d), g = d.origin ?? l, b = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, x = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, _ = Math.max(y.width, Math.round(c.width)), E = Math.max(y.height, Math.round(c.height)), N = (_ - y.width) * g[0], R = (E - y.height) * g[1];
    (b > 0 || x > 0 || N || R) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - b + N,
        y: d.position.y - x + R
      }
    }), r.get(p)?.forEach((j) => {
      e.some((C) => C.id === j.id) || s.push({
        id: j.id,
        type: "position",
        position: {
          x: j.position.x + b,
          y: j.position.y + x
        }
      });
    })), (y.width < c.width || y.height < c.height || b || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: _ + (b ? g[0] * b - N : 0),
        height: E + (x ? g[1] * x - R : 0)
      }
    });
  }), s;
}
function XA(e, a, r, l, s, u, c) {
  const d = l?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d)
    return { changes: [], updatedInternals: p };
  const m = [], y = window.getComputedStyle(d), { m22: g } = new window.DOMMatrixReadOnly(y.transform), b = [];
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
    const E = Xm(x.nodeElement), N = _.measured.width !== E.width || _.measured.height !== E.height;
    if (!!(E.width && E.height && (N || !_.internals.handleBounds || x.force))) {
      const j = x.nodeElement.getBoundingClientRect(), C = Dr(_.extent) ? _.extent : u;
      let { positionAbsolute: O } = _.internals;
      _.parentId && _.extent === "parent" ? O = uw(O, E, a.get(_.parentId)) : C && (O = Ar(O, C, E));
      const B = {
        ..._,
        measured: E,
        internals: {
          ..._.internals,
          positionAbsolute: O,
          handleBounds: {
            source: ab("source", x.nodeElement, j, g, _.id),
            target: ab("target", x.nodeElement, j, g, _.id)
          }
        }
      };
      a.set(_.id, B), _.parentId && Km(B, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, N && (m.push({
        id: _.id,
        type: "dimensions",
        dimensions: E
      }), _.expandParent && _.parentId && b.push({
        id: _.id,
        parentId: _.parentId,
        rect: jl(B, s)
      }));
    }
  }
  if (b.length > 0) {
    const x = Jm(b, a, r, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: p };
}
async function PA({ delta: e, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
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
function cb(e, a, r, l, s, u) {
  let c = s;
  const d = l.get(c) || /* @__PURE__ */ new Map();
  l.set(c, d.set(r, a)), c = `${s}-${e}`;
  const p = l.get(c) || /* @__PURE__ */ new Map();
  if (l.set(c, p.set(r, a)), u) {
    c = `${s}-${e}-${u}`;
    const m = l.get(c) || /* @__PURE__ */ new Map();
    l.set(c, m.set(r, a));
  }
}
function Sw(e, a, r) {
  e.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, y = `${u}-${d}--${s}-${c}`;
    cb("source", p, y, e, s, c), cb("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function Ew(e, a) {
  if (!e.parentId)
    return !1;
  const r = a.get(e.parentId);
  return r ? r.selected ? !0 : Ew(r, a) : !1;
}
function fb(e, a, r) {
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
function ZA(e, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !Ew(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function vh({ nodeId: e, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
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
function QA({ dragItems: e, snapGrid: a, x: r, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = ps(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function KA({ onNodeMouseDown: e, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, y = null, g = !1, b = null, x = !1, _ = !1, E = null;
  function N({ noDragClassName: j, handleSelector: C, domNode: O, isSelectable: B, nodeId: k, nodeClickDistance: H = 0 }) {
    b = Xn(O);
    function A({ x: Q, y: ne }) {
      const { nodeLookup: L, nodeExtent: I, snapGrid: T, snapToGrid: z, nodeOrigin: G, onNodeDrag: F, onSelectionDrag: te, onError: D, updateNodePositions: V } = a();
      u = { x: Q, y: ne };
      let Z = !1;
      const ee = d.size > 1, se = ee && I ? em(ms(d)) : null, he = ee && z ? QA({
        dragItems: d,
        snapGrid: T,
        x: Q,
        y: ne
      }) : null;
      for (const [me, J] of d) {
        if (!L.has(me))
          continue;
        let ve = { x: Q - J.distance.x, y: ne - J.distance.y };
        z && (ve = he ? {
          x: Math.round(ve.x + he.x),
          y: Math.round(ve.y + he.y)
        } : ps(ve, T));
        let Oe = null;
        if (ee && I && !J.extent && se) {
          const { positionAbsolute: we } = J.internals, Me = we.x - se.x + I[0][0], Ye = we.x + J.measured.width - se.x2 + I[1][0], ye = we.y - se.y + I[0][1], pe = we.y + J.measured.height - se.y2 + I[1][1];
          Oe = [
            [Me, ye],
            [Ye, pe]
          ];
        }
        const { position: je, positionAbsolute: Ee } = sw({
          nodeId: me,
          nextPosition: ve,
          nodeLookup: L,
          nodeExtent: Oe || I,
          nodeOrigin: G,
          onError: D
        });
        Z = Z || J.position.x !== je.x || J.position.y !== je.y, J.position = je, J.internals.positionAbsolute = Ee;
      }
      if (_ = _ || Z, !!Z && (V(d, !0), E && (l || F || !k && te))) {
        const [me, J] = vh({
          nodeId: k,
          dragItems: d,
          nodeLookup: L
        });
        l?.(E, d, me, J), F?.(E, me, J), k || te?.(E, J);
      }
    }
    async function Y() {
      if (!y)
        return;
      const { transform: Q, panBy: ne, autoPanSpeed: L, autoPanOnNodeDrag: I } = a();
      if (!I) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [T, z] = Gm(m, y, L);
      (T !== 0 || z !== 0) && (u.x = (u.x ?? 0) - T / Q[2], u.y = (u.y ?? 0) - z / Q[2], await ne({ x: T, y: z }) && A(u)), c = requestAnimationFrame(Y);
    }
    function le(Q) {
      const { nodeLookup: ne, multiSelectionActive: L, nodesDraggable: I, transform: T, snapGrid: z, snapToGrid: G, selectNodesOnDrag: F, onNodeDragStart: te, onSelectionDragStart: D, unselectNodesAndEdges: V } = a();
      g = !0, (!F || !B) && !L && k && (ne.get(k)?.selected || V()), B && F && k && e?.(k);
      const Z = Io(Q.sourceEvent, { transform: T, snapGrid: z, snapToGrid: G, containerBounds: y });
      if (u = Z, d = ZA(ne, I, Z, k), d.size > 0 && (r || te || !k && D)) {
        const [ee, se] = vh({
          nodeId: k,
          dragItems: d,
          nodeLookup: ne
        });
        r?.(Q.sourceEvent, d, ee, se), te?.(Q.sourceEvent, ee, se), k || D?.(Q.sourceEvent, se);
      }
    }
    const q = $1().clickDistance(H).on("start", (Q) => {
      const { domNode: ne, nodeDragThreshold: L, transform: I, snapGrid: T, snapToGrid: z } = a();
      y = ne?.getBoundingClientRect() || null, x = !1, _ = !1, E = Q.sourceEvent, L === 0 && le(Q), u = Io(Q.sourceEvent, { transform: I, snapGrid: T, snapToGrid: z, containerBounds: y }), m = Ea(Q.sourceEvent, y);
    }).on("drag", (Q) => {
      const { autoPanOnNodeDrag: ne, transform: L, snapGrid: I, snapToGrid: T, nodeDragThreshold: z, nodeLookup: G } = a(), F = Io(Q.sourceEvent, { transform: L, snapGrid: I, snapToGrid: T, containerBounds: y });
      if (E = Q.sourceEvent, (Q.sourceEvent.type === "touchmove" && Q.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      k && !G.has(k)) && (x = !0), !x) {
        if (!p && ne && g && (p = !0, Y()), !g) {
          const te = Ea(Q.sourceEvent, y), D = te.x - m.x, V = te.y - m.y;
          Math.sqrt(D * D + V * V) > z && le(Q);
        }
        (u.x !== F.xSnapped || u.y !== F.ySnapped) && d && g && (m = Ea(Q.sourceEvent, y), A(F));
      }
    }).on("end", (Q) => {
      if (!g || x) {
        x && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: ne, updateNodePositions: L, onNodeDragStop: I, onSelectionDragStop: T } = a();
        if (_ && (L(d, !1), _ = !1), s || I || !k && T) {
          const [z, G] = vh({
            nodeId: k,
            dragItems: d,
            nodeLookup: ne,
            dragging: !1
          });
          s?.(Q.sourceEvent, d, z, G), I?.(Q.sourceEvent, z, G), k || T?.(Q.sourceEvent, G);
        }
      }
    }).filter((Q) => {
      const ne = Q.target;
      return !Q.button && (!j || !fb(ne, `.${j}`, O)) && (!C || fb(ne, C, O));
    });
    b.call(q);
  }
  function R() {
    b?.on(".drag", null);
  }
  return {
    update: N,
    destroy: R
  };
}
function JA(e, a, r) {
  const l = [], s = {
    x: e.x - r,
    y: e.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Wo(s, jl(u)) > 0 && l.push(u);
  return l;
}
const WA = 250;
function eD(e, a, r, l) {
  let s = [], u = 1 / 0;
  const c = JA(e, r, a + WA);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const m of p) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: y, y: g } = jr(d, m, m.position, !0), b = Math.sqrt(Math.pow(y - e.x, 2) + Math.pow(g - e.y, 2));
      b > a || (b < u ? (s = [{ ...m, x: y, y: g }], u = b) : b === u && s.push({ ...m, x: y, y: g }));
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
function Nw(e, a, r, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? d?.find((m) => m.id === r) : d?.[0]) ?? null;
  return p && u ? { ...p, ...jr(c, p, p.position, !0) } : p;
}
function Cw(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function tD(e, a) {
  let r = null;
  return a ? r = !0 : e && !a && (r = !1), r;
}
const Rw = () => !0;
function nD(e, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: y, flowId: g, panBy: b, cancelConnection: x, onConnectStart: _, onConnect: E, onConnectEnd: N, isValidConnection: R = Rw, onReconnectEnd: j, updateConnection: C, getTransform: O, getFromHandle: B, autoPanSpeed: k, dragThreshold: H = 1, handleDomNode: A }) {
  const Y = mw(e.target);
  let le = 0, q;
  const { x: Q, y: ne } = Ea(e), L = Cw(u, A), I = d?.getBoundingClientRect();
  let T = !1;
  if (!I || !L)
    return;
  const z = Nw(s, L, l, p, a);
  if (!z)
    return;
  let G = Ea(e, I), F = !1, te = null, D = !1, V = null;
  function Z() {
    if (!y || !I)
      return;
    const [je, Ee] = Gm(G, I, k);
    b({ x: je, y: Ee }), le = requestAnimationFrame(Z);
  }
  const ee = {
    ...z,
    nodeId: s,
    type: L,
    position: z.position
  }, se = p.get(s);
  let me = {
    inProgress: !0,
    isValid: null,
    from: jr(se, ee, ke.Left, !0),
    fromHandle: ee,
    fromPosition: ee.position,
    fromNode: se,
    to: G,
    toHandle: null,
    toPosition: Wy[ee.position],
    toNode: null,
    pointer: G
  };
  function J() {
    T = !0, C(me), _?.(e, { nodeId: s, handleId: l, handleType: L });
  }
  H === 0 && J();
  function ve(je) {
    if (!T) {
      const { x: pe, y: _e } = Ea(je), Re = pe - Q, Ae = _e - ne;
      if (!(Re * Re + Ae * Ae > H * H))
        return;
      J();
    }
    if (!B() || !ee) {
      Oe(je);
      return;
    }
    const Ee = O();
    G = Ea(je, I), q = eD(kl(G, Ee, !1, [1, 1]), r, p, ee), F || (Z(), F = !0);
    const we = Tw(je, {
      handle: q,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: R,
      doc: Y,
      lib: m,
      flowId: g,
      nodeLookup: p
    });
    V = we.handleDomNode, te = we.connection, D = tD(!!q, we.isValid);
    const Me = p.get(s), Ye = Me ? jr(Me, ee, ke.Left, !0) : me.from, ye = {
      ...me,
      from: Ye,
      isValid: D,
      to: we.toHandle && D ? Ol({ x: we.toHandle.x, y: we.toHandle.y }, Ee) : G,
      toHandle: we.toHandle,
      toPosition: D && we.toHandle ? we.toHandle.position : Wy[ee.position],
      toNode: we.toHandle ? p.get(we.toHandle.nodeId) : null,
      pointer: G
    };
    C(ye), me = ye;
  }
  function Oe(je) {
    if (!("touches" in je && je.touches.length > 0)) {
      if (T) {
        (q || V) && te && D && E?.(te);
        const { inProgress: Ee, ...we } = me, Me = {
          ...we,
          toPosition: me.toHandle ? me.toPosition : null
        };
        N?.(je, Me), u && j?.(je, Me);
      }
      x(), cancelAnimationFrame(le), F = !1, D = !1, te = null, V = null, Y.removeEventListener("mousemove", ve), Y.removeEventListener("mouseup", Oe), Y.removeEventListener("touchmove", ve), Y.removeEventListener("touchend", Oe);
    }
  }
  Y.addEventListener("mousemove", ve), Y.addEventListener("mouseup", Oe), Y.addEventListener("touchmove", ve), Y.addEventListener("touchend", Oe);
}
function Tw(e, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = Rw, nodeLookup: y }) {
  const g = u === "target", b = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: _ } = Ea(e), E = c.elementFromPoint(x, _), N = E?.classList.contains(`${d}-flow__handle`) ? E : b, R = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const j = Cw(void 0, N), C = N.getAttribute("data-nodeid"), O = N.getAttribute("data-handleid"), B = N.classList.contains("connectable"), k = N.classList.contains("connectableend");
    if (!C || !j)
      return R;
    const H = {
      source: g ? C : l,
      sourceHandle: g ? O : s,
      target: g ? l : C,
      targetHandle: g ? s : O
    };
    R.connection = H;
    const Y = B && k && (r === Al.Strict ? g && j === "source" || !g && j === "target" : C !== l || O !== s);
    R.isValid = Y && m(H), R.toHandle = Nw(C, j, O, y, r, !0);
  }
  return R;
}
const im = {
  onPointerDown: nD,
  isValid: Tw
};
function aD({ domNode: e, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = Xn(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: y = 1, pannable: g = !0, zoomable: b = !0, inversePan: x = !1 }) {
    const _ = (C) => {
      if (C.sourceEvent.type !== "wheel" || !a)
        return;
      const O = r(), B = C.sourceEvent.ctrlKey && es() ? 10 : 1, k = -C.sourceEvent.deltaY * (C.sourceEvent.deltaMode === 1 ? 0.05 : C.sourceEvent.deltaMode ? 1 : 2e-3) * y, H = O[2] * Math.pow(2, k * B);
      a.scaleTo(H);
    };
    let E = [0, 0];
    const N = (C) => {
      (C.sourceEvent.type === "mousedown" || C.sourceEvent.type === "touchstart") && (E = [
        C.sourceEvent.clientX ?? C.sourceEvent.touches[0].clientX,
        C.sourceEvent.clientY ?? C.sourceEvent.touches[0].clientY
      ]);
    }, R = (C) => {
      const O = r();
      if (C.sourceEvent.type !== "mousemove" && C.sourceEvent.type !== "touchmove" || !a)
        return;
      const B = [
        C.sourceEvent.clientX ?? C.sourceEvent.touches[0].clientX,
        C.sourceEvent.clientY ?? C.sourceEvent.touches[0].clientY
      ], k = [B[0] - E[0], B[1] - E[1]];
      E = B;
      const H = l() * Math.max(O[2], Math.log(O[2])) * (x ? -1 : 1), A = {
        x: O[0] - k[0] * H,
        y: O[1] - k[1] * H
      }, Y = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: O[2]
      }, Y, d);
    }, j = nw().on("start", N).on("zoom", g ? R : null).on("zoom.wheel", b ? _ : null);
    s.call(j, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: wa
  };
}
const Ic = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), yh = ({ x: e, y: a, zoom: r }) => Vc.translate(e, a).scale(r), _l = (e, a) => e.target.closest(`.${a}`), Mw = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), iD = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, bh = (e, a = 0, r = iD, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(r).on("end", l) : e;
}, Aw = (e) => {
  const a = e.ctrlKey && es() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function rD({ zoomPanValues: e, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (y) => {
    if (_l(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const g = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const N = wa(y), R = Aw(y), j = g * Math.pow(2, R);
      l.scaleTo(r, j, N, y);
      return;
    }
    const b = y.deltaMode === 1 ? 20 : 1;
    let x = s === Rr.Vertical ? 0 : y.deltaX * b, _ = s === Rr.Horizontal ? 0 : y.deltaY * b;
    !es() && y.shiftKey && s !== Rr.Vertical && (x = y.deltaY * b, _ = 0), l.translateBy(
      r,
      -(x / g) * u,
      -(_ / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const E = Ic(r.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(y, E), e.panScrollTimeout = setTimeout(() => {
      m?.(y, E), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(y, E));
  };
}
function lD({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = _l(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function oD({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = Ic(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function sD({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(r && Mw(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Ic(u.transform));
  };
}
function uD({ zoomPanValues: e, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && Mw(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = Ic(c.transform);
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
function cD({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: y }) {
  return (g) => {
    const b = e || a, x = r && g.ctrlKey, _ = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (_l(g, `${m}-flow__node`) || _l(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !b && !s && !u && !r || c || y && !_ || _l(g, d) && _ || _l(g, p) && (!_ || s && _ && !e) || !r && g.ctrlKey && _)
      return !1;
    if (!r && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!b && !s && !x && _ || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const E = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || _) && E;
  };
}
function fD({ domNode: e, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = e.getBoundingClientRect(), g = nw().scaleExtent([a, r]).translateExtent(l), b = Xn(e).call(g);
  j({
    x: s.x,
    y: s.y,
    zoom: Dl(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const x = b.on("wheel.zoom"), _ = b.on("dblclick.zoom");
  g.wheelDelta(Aw);
  async function E(q, Q) {
    return b ? new Promise((ne) => {
      g?.interpolate(Q?.interpolate === "linear" ? qo : ac).transform(bh(b, Q?.duration, Q?.ease, () => ne(!0)), q);
    }) : !1;
  }
  function N({ noWheelClassName: q, noPanClassName: Q, onPaneContextMenu: ne, userSelectionActive: L, panOnScroll: I, panOnDrag: T, panOnScrollMode: z, panOnScrollSpeed: G, preventScrolling: F, zoomOnPinch: te, zoomOnScroll: D, zoomOnDoubleClick: V, zoomActivationKeyPressed: Z, lib: ee, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: J }) {
    L && !m.isZoomingOrPanning && R();
    const ve = I && !Z && !L;
    g.clickDistance(J ? 1 / 0 : !Sa(me) || me < 0 ? 0 : me);
    const Oe = ve ? rD({
      zoomPanValues: m,
      noWheelClassName: q,
      d3Selection: b,
      d3Zoom: g,
      panOnScrollMode: z,
      panOnScrollSpeed: G,
      zoomOnPinch: te,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : lD({
      noWheelClassName: q,
      preventScrolling: F,
      d3ZoomHandler: x
    });
    b.on("wheel.zoom", Oe, { passive: !1 });
    const je = oD({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", je);
    const Ee = sD({
      zoomPanValues: m,
      panOnDrag: T,
      onPaneContextMenu: !!ne,
      onPanZoom: u,
      onTransformChange: se
    });
    g.on("zoom", Ee);
    const we = uD({
      zoomPanValues: m,
      panOnDrag: T,
      panOnScroll: I,
      onPaneContextMenu: ne,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", we);
    const Me = cD({
      zoomActivationKeyPressed: Z,
      panOnDrag: T,
      zoomOnScroll: D,
      panOnScroll: I,
      zoomOnDoubleClick: V,
      zoomOnPinch: te,
      userSelectionActive: L,
      noPanClassName: Q,
      noWheelClassName: q,
      lib: ee,
      connectionInProgress: he
    });
    g.filter(Me), V ? b.on("dblclick.zoom", _) : b.on("dblclick.zoom", null);
  }
  function R() {
    g.on("zoom", null);
  }
  async function j(q, Q, ne) {
    const L = yh(q), I = g?.constrain()(L, Q, ne);
    return I && await E(I), I;
  }
  async function C(q, Q) {
    const ne = yh(q);
    return await E(ne, Q), ne;
  }
  function O(q) {
    if (b) {
      const Q = yh(q), ne = b.property("__zoom");
      (ne.k !== q.zoom || ne.x !== q.x || ne.y !== q.y) && g?.transform(b, Q, null, { sync: !0 });
    }
  }
  function B() {
    const q = b ? tw(b.node()) : { x: 0, y: 0, k: 1 };
    return { x: q.x, y: q.y, zoom: q.k };
  }
  async function k(q, Q) {
    return b ? new Promise((ne) => {
      g?.interpolate(Q?.interpolate === "linear" ? qo : ac).scaleTo(bh(b, Q?.duration, Q?.ease, () => ne(!0)), q);
    }) : !1;
  }
  async function H(q, Q) {
    return b ? new Promise((ne) => {
      g?.interpolate(Q?.interpolate === "linear" ? qo : ac).scaleBy(bh(b, Q?.duration, Q?.ease, () => ne(!0)), q);
    }) : !1;
  }
  function A(q) {
    g?.scaleExtent(q);
  }
  function Y(q) {
    g?.translateExtent(q);
  }
  function le(q) {
    const Q = !Sa(q) || q < 0 ? 0 : q;
    g?.clickDistance(Q);
  }
  return {
    update: N,
    destroy: R,
    setViewport: C,
    setViewportConstrained: j,
    getViewport: B,
    scaleTo: k,
    scaleBy: H,
    setScaleExtent: A,
    setTranslateExtent: Y,
    syncViewport: O,
    setClickDistance: le
  };
}
var zl;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(zl || (zl = {}));
function dD({ width: e, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = r - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function db(e) {
  const a = e.includes("right") || e.includes("left"), r = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function Fi(e, a) {
  return Math.max(0, a - e);
}
function Xi(e, a) {
  return Math.max(0, e - a);
}
function ku(e, a, r) {
  return Math.max(0, a - e, e - r);
}
function hb(e, a) {
  return e ? !a : a;
}
function hD(e, a, r, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: y, isVertical: g } = a, b = y && g, { xSnapped: x, ySnapped: _ } = r, { minWidth: E, maxWidth: N, minHeight: R, maxHeight: j } = l, { x: C, y: O, width: B, height: k, aspectRatio: H } = e;
  let A = Math.floor(y ? x - e.pointerX : 0), Y = Math.floor(g ? _ - e.pointerY : 0);
  const le = B + (p ? -A : A), q = k + (m ? -Y : Y), Q = -u[0] * B, ne = -u[1] * k;
  let L = ku(le, E, N), I = ku(q, R, j);
  if (c) {
    let G = 0, F = 0;
    p && A < 0 ? G = Fi(C + A + Q, c[0][0]) : !p && A > 0 && (G = Xi(C + le + Q, c[1][0])), m && Y < 0 ? F = Fi(O + Y + ne, c[0][1]) : !m && Y > 0 && (F = Xi(O + q + ne, c[1][1])), L = Math.max(L, G), I = Math.max(I, F);
  }
  if (d) {
    let G = 0, F = 0;
    p && A > 0 ? G = Xi(C + A, d[0][0]) : !p && A < 0 && (G = Fi(C + le, d[1][0])), m && Y > 0 ? F = Xi(O + Y, d[0][1]) : !m && Y < 0 && (F = Fi(O + q, d[1][1])), L = Math.max(L, G), I = Math.max(I, F);
  }
  if (s) {
    if (y) {
      const G = ku(le / H, R, j) * H;
      if (L = Math.max(L, G), c) {
        let F = 0;
        !p && !m || p && !m && b ? F = Xi(O + ne + le / H, c[1][1]) * H : F = Fi(O + ne + (p ? A : -A) / H, c[0][1]) * H, L = Math.max(L, F);
      }
      if (d) {
        let F = 0;
        !p && !m || p && !m && b ? F = Fi(O + le / H, d[1][1]) * H : F = Xi(O + (p ? A : -A) / H, d[0][1]) * H, L = Math.max(L, F);
      }
    }
    if (g) {
      const G = ku(q * H, E, N) / H;
      if (I = Math.max(I, G), c) {
        let F = 0;
        !p && !m || m && !p && b ? F = Xi(C + q * H + Q, c[1][0]) / H : F = Fi(C + (m ? Y : -Y) * H + Q, c[0][0]) / H, I = Math.max(I, F);
      }
      if (d) {
        let F = 0;
        !p && !m || m && !p && b ? F = Fi(C + q * H, d[1][0]) / H : F = Xi(C + (m ? Y : -Y) * H, d[0][0]) / H, I = Math.max(I, F);
      }
    }
  }
  Y = Y + (Y < 0 ? I : -I), A = A + (A < 0 ? L : -L), s && (b ? le > q * H ? Y = (hb(p, m) ? -A : A) / H : A = (hb(p, m) ? -Y : Y) * H : y ? (Y = A / H, m = p) : (A = Y * H, p = m));
  const T = p ? C + A : C, z = m ? O + Y : O;
  return {
    width: B + (p ? -A : A),
    height: k + (m ? -Y : Y),
    x: u[0] * A * (p ? -1 : 1) + T,
    y: u[1] * Y * (m ? -1 : 1) + z
  };
}
const Dw = { width: 0, height: 0, x: 0, y: 0 }, mD = {
  ...Dw,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function pD(e, a, r) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = r[0] * u, p = r[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function gD({ domNode: e, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = Xn(e);
  let c = {
    controlDirection: db("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: y, keepAspectRatio: g, resizeDirection: b, onResizeStart: x, onResize: _, onResizeEnd: E, shouldResize: N }) {
    let R = { ...Dw }, j = { ...mD };
    c = {
      boundaries: y,
      resizeDirection: b,
      keepAspectRatio: g,
      controlDirection: db(m)
    };
    let C, O = null, B = [], k, H, A, Y = !1;
    const le = $1().on("start", (q) => {
      const { nodeLookup: Q, transform: ne, snapGrid: L, snapToGrid: I, nodeOrigin: T, paneDomNode: z } = r();
      if (C = Q.get(a), !C)
        return;
      O = z?.getBoundingClientRect() ?? null;
      const { xSnapped: G, ySnapped: F } = Io(q.sourceEvent, {
        transform: ne,
        snapGrid: L,
        snapToGrid: I,
        containerBounds: O
      });
      R = {
        width: C.measured.width ?? 0,
        height: C.measured.height ?? 0,
        x: C.position.x ?? 0,
        y: C.position.y ?? 0
      }, j = {
        ...R,
        pointerX: G,
        pointerY: F,
        aspectRatio: R.width / R.height
      }, k = void 0, H = Dr(C.extent) ? C.extent : void 0, C.parentId && (C.extent === "parent" || C.expandParent) && (k = Q.get(C.parentId)), k && C.extent === "parent" && (H = [
        [0, 0],
        [k.measured.width, k.measured.height]
      ]), B = [], A = void 0;
      for (const [te, D] of Q)
        if (D.parentId === a && (B.push({
          id: te,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const V = pD(D, C, D.origin ?? T);
          A ? A = [
            [Math.min(V[0][0], A[0][0]), Math.min(V[0][1], A[0][1])],
            [Math.max(V[1][0], A[1][0]), Math.max(V[1][1], A[1][1])]
          ] : A = V;
        }
      x?.(q, { ...R });
    }).on("drag", (q) => {
      const { transform: Q, snapGrid: ne, snapToGrid: L, nodeOrigin: I } = r(), T = Io(q.sourceEvent, {
        transform: Q,
        snapGrid: ne,
        snapToGrid: L,
        containerBounds: O
      }), z = [];
      if (!C)
        return;
      const { x: G, y: F, width: te, height: D } = R, V = {}, Z = C.origin ?? I, { width: ee, height: se, x: he, y: me } = hD(j, c.controlDirection, T, c.boundaries, c.keepAspectRatio, Z, H, A), J = ee !== te, ve = se !== D, Oe = he !== G && J, je = me !== F && ve;
      if (!Oe && !je && !J && !ve)
        return;
      if ((Oe || je || Z[0] === 1 || Z[1] === 1) && (V.x = Oe ? he : R.x, V.y = je ? me : R.y, R.x = V.x, R.y = V.y, B.length > 0)) {
        const Ye = he - G, ye = me - F;
        for (const pe of B)
          pe.position = {
            x: pe.position.x - Ye + Z[0] * (ee - te),
            y: pe.position.y - ye + Z[1] * (se - D)
          }, z.push(pe);
      }
      if ((J || ve) && (V.width = J && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ee : R.width, V.height = ve && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : R.height, R.width = V.width, R.height = V.height), k && C.expandParent) {
        const Ye = Z[0] * (V.width ?? 0);
        V.x && V.x < Ye && (R.x = Ye, j.x = j.x - (V.x - Ye));
        const ye = Z[1] * (V.height ?? 0);
        V.y && V.y < ye && (R.y = ye, j.y = j.y - (V.y - ye));
      }
      const Ee = dD({
        width: R.width,
        prevWidth: te,
        height: R.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), we = { ...R, direction: Ee };
      N?.(q, we) !== !1 && (Y = !0, _?.(q, we), l(V, z));
    }).on("end", (q) => {
      Y && (E?.(q, { ...R }), s?.({ ...R }), Y = !1);
    });
    u.call(le);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: p
  };
}
var xh = { exports: {} }, wh = {}, _h = { exports: {} }, Sh = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mb;
function vD() {
  if (mb) return Sh;
  mb = 1;
  var e = ls();
  function a(g, b) {
    return g === b && (g !== 0 || 1 / g === 1 / b) || g !== g && b !== b;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, b) {
    var x = b(), _ = l({ inst: { value: x, getSnapshot: b } }), E = _[0].inst, N = _[1];
    return u(
      function() {
        E.value = x, E.getSnapshot = b, p(E) && N({ inst: E });
      },
      [g, x, b]
    ), s(
      function() {
        return p(E) && N({ inst: E }), g(function() {
          p(E) && N({ inst: E });
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
  function m(g, b) {
    return b();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : d;
  return Sh.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y, Sh;
}
var pb;
function jw() {
  return pb || (pb = 1, _h.exports = vD()), _h.exports;
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
var gb;
function yD() {
  if (gb) return wh;
  gb = 1;
  var e = ls(), a = jw();
  function r(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return wh.useSyncExternalStoreWithSelector = function(m, y, g, b, x) {
    var _ = u(null);
    if (_.current === null) {
      var E = { hasValue: !1, value: null };
      _.current = E;
    } else E = _.current;
    _ = d(
      function() {
        function R(k) {
          if (!j) {
            if (j = !0, C = k, k = b(k), x !== void 0 && E.hasValue) {
              var H = E.value;
              if (x(H, k))
                return O = H;
            }
            return O = k;
          }
          if (H = O, l(C, k)) return H;
          var A = b(k);
          return x !== void 0 && x(H, A) ? (C = k, H) : (C = k, O = A);
        }
        var j = !1, C, O, B = g === void 0 ? null : g;
        return [
          function() {
            return R(y());
          },
          B === null ? void 0 : function() {
            return R(B());
          }
        ];
      },
      [y, g, b, x]
    );
    var N = s(m, _[0], _[1]);
    return c(
      function() {
        E.hasValue = !0, E.value = N;
      },
      [N]
    ), p(N), N;
  }, wh;
}
var vb;
function bD() {
  return vb || (vb = 1, xh.exports = yD()), xh.exports;
}
var xD = bD();
const wD = /* @__PURE__ */ wm(xD), _D = {}, yb = (e) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (y, g) => {
    const b = typeof y == "function" ? y(a) : y;
    if (!Object.is(b, a)) {
      const x = a;
      a = g ?? (typeof b != "object" || b === null) ? b : Object.assign({}, a, b), r.forEach((_) => _(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (_D ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = e(l, s, p);
  return p;
}, SD = (e) => e ? yb(e) : yb, { useDebugValue: ED } = be, { useSyncExternalStoreWithSelector: ND } = wD, CD = (e) => e;
function Ow(e, a = CD, r) {
  const l = ND(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    r
  );
  return ED(l), l;
}
const bb = (e, a) => {
  const r = SD(e), l = (s, u = a) => Ow(r, s, u);
  return Object.assign(l, r), l;
}, RD = (e, a) => e ? bb(e, a) : bb;
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
var TD = Ix();
const MD = /* @__PURE__ */ wm(TD), Yc = S.createContext(null), AD = Yc.Provider, zw = Na.error001("react");
function st(e, a) {
  const r = S.useContext(Yc);
  if (r === null)
    throw new Error(zw);
  return Ow(r, e, a);
}
function jt() {
  const e = S.useContext(Yc);
  if (e === null)
    throw new Error(zw);
  return S.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const xb = { display: "none" }, DD = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Lw = "react-flow__node-desc", kw = "react-flow__edge-desc", jD = "react-flow__aria-live", OD = (e) => e.ariaLiveMessage, zD = (e) => e.ariaLabelConfig;
function LD({ rfId: e }) {
  const a = st(OD);
  return v.jsx("div", { id: `${jD}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: DD, children: a });
}
function kD({ rfId: e, disableKeyboardA11y: a }) {
  const r = st(zD);
  return v.jsxs(v.Fragment, { children: [v.jsx("div", { id: `${Lw}-${e}`, style: xb, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), v.jsx("div", { id: `${kw}-${e}`, style: xb, children: r["edge.a11yDescription.default"] }), !a && v.jsx(LD, { rfId: e })] });
}
const Gc = S.forwardRef(({ position: e = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return v.jsx("div", { className: Zt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
Gc.displayName = "Panel";
function HD({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : v.jsx(Gc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: v.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const BD = (e) => {
  const a = [], r = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, Hu = (e) => e.id;
function UD(e, a) {
  return Dt(e.selectedNodes.map(Hu), a.selectedNodes.map(Hu)) && Dt(e.selectedEdges.map(Hu), a.selectedEdges.map(Hu));
}
function VD({ onSelectionChange: e }) {
  const a = jt(), { selectedNodes: r, selectedEdges: l } = st(BD, UD);
  return S.useEffect(() => {
    const s = { nodes: r, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, e]), null;
}
const $D = (e) => !!e.onSelectionChangeHandlers;
function qD({ onSelectionChange: e }) {
  const a = st($D);
  return e || a ? v.jsx(VD, { onSelectionChange: e }) : null;
}
const Hw = [0, 0], ID = { x: 0, y: 0, zoom: 1 }, YD = [
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
], wb = [...YD, "rfId"], GD = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), _b = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Ko,
  nodeOrigin: Hw,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function FD(e) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = st(GD, Dt), m = jt();
  S.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    y.current = _b, d();
  }), []);
  const y = S.useRef(_b);
  return S.useEffect(
    () => {
      for (const g of wb) {
        const b = e[g], x = y.current[g];
        b !== x && (typeof e[g] > "u" || (g === "nodes" ? a(b) : g === "edges" ? r(b) : g === "minZoom" ? l(b) : g === "maxZoom" ? s(b) : g === "translateExtent" ? u(b) : g === "nodeExtent" ? c(b) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: MA(b) }) : g === "fitView" ? m.setState({ fitViewQueued: b }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: b }) : m.setState({ [g]: b })));
      }
      y.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    wb.map((g) => e[g])
  ), null;
}
function Sb() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function XD(e) {
  const [a, r] = S.useState(e === "system" ? null : e);
  return S.useEffect(() => {
    if (e !== "system") {
      r(e);
      return;
    }
    const l = Sb(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : Sb()?.matches ? "dark" : "light";
}
const Eb = typeof document < "u" ? document : null;
function ts(e = null, a = { target: Eb, actInsideInputWithModifier: !0 }) {
  const [r, l] = S.useState(!1), s = S.useRef(!1), u = S.useRef(/* @__PURE__ */ new Set([])), [c, d] = S.useMemo(() => {
    if (e !== null) {
      const m = (Array.isArray(e) ? e : [e]).filter((g) => typeof g == "string").map((g) => g.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = m.reduce((g, b) => g.concat(...b), []);
      return [m, y];
    }
    return [[], []];
  }, [e]);
  return S.useEffect(() => {
    const p = a?.target ?? Eb, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && pw(x))
          return !1;
        const E = Cb(x.code, d);
        if (u.current.add(x[E]), Nb(c, u.current, !1)) {
          const N = x.composedPath?.()?.[0] || x.target, R = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !R) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const _ = Cb(x.code, d);
        Nb(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[_]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, b = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", g), window.addEventListener("blur", b), window.addEventListener("contextmenu", b), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", g), window.removeEventListener("blur", b), window.removeEventListener("contextmenu", b);
      };
    }
  }, [e, l]), r;
}
function Nb(e, a, r) {
  return e.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Cb(e, a) {
  return a.includes(e) ? "code" : "key";
}
const PD = () => {
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
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = Fm(a, l, s, u, c, r?.padding ?? 0.1);
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
      const { x: d, y: p } = c.getBoundingClientRect(), m = {
        x: a.x - d,
        y: a.y - p
      }, y = r.snapGrid ?? s, g = r.snapToGrid ?? u;
      return kl(m, l, g, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = Ol(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function Bw(e, a) {
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
      ZD(p, d);
    r.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function ZD(e, a) {
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
function QD(e, a) {
  return Bw(e, a);
}
function KD(e, a) {
  return Bw(e, a);
}
function Sr(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function Sl(e, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(Sr(u.id, c)));
  }
  return l;
}
function Rb({ items: e = [], lookup: a }) {
  const r = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && r.push({ id: u.id, item: u, type: "replace" }), d === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function Tb(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const JD = fw();
function WD(e, a, r = {}) {
  return LA(e, a, {
    ...r,
    onError: r.onError ?? JD
  });
}
const Mb = (e) => xA(e), e4 = (e) => ow(e);
function Uw(e) {
  return S.forwardRef(e);
}
const t4 = typeof window < "u" ? S.useLayoutEffect : S.useEffect;
function Ab(e) {
  const [a, r] = S.useState(BigInt(0)), [l] = S.useState(() => n4(() => r((s) => s + BigInt(1))));
  return t4(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function n4(e) {
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
const Vw = S.createContext(null);
function a4({ children: e }) {
  const a = jt(), r = S.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: y, onNodesChange: g, nodeLookup: b, fitViewQueued: x, onNodesChangeMiddlewareMap: _ } = a.getState();
    let E = p;
    for (const R of d)
      E = typeof R == "function" ? R(E) : R;
    let N = Rb({
      items: E,
      lookup: b
    });
    for (const R of _.values())
      N = R(N);
    y && m(E), N.length > 0 ? g?.(N) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: R, nodes: j, setNodes: C } = a.getState();
      R && C(j);
    });
  }, []), l = Ab(r), s = S.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: g, edgeLookup: b } = a.getState();
    let x = p;
    for (const _ of d)
      x = typeof _ == "function" ? _(x) : _;
    y ? m(x) : g && g(Rb({
      items: x,
      lookup: b
    }));
  }, []), u = Ab(s), c = S.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return v.jsx(Vw.Provider, { value: c, children: e });
}
function i4() {
  const e = S.useContext(Vw);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const r4 = (e) => !!e.panZoom;
function Wm() {
  const e = PD(), a = jt(), r = i4(), l = st(r4), s = S.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      r.nodeQueue.push(g);
    }, d = (g) => {
      r.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: b, nodeOrigin: x } = a.getState(), _ = Mb(g) ? g : b.get(g.id), E = _.parentId ? hw(_.position, _.measured, _.parentId, b, x) : _.position, N = {
        ..._,
        position: E,
        width: _.measured?.width ?? _.width,
        height: _.measured?.height ?? _.height
      };
      return jl(N);
    }, m = (g, b, x = { replace: !1 }) => {
      c((_) => _.map((E) => {
        if (E.id === g) {
          const N = typeof b == "function" ? b(E) : b;
          return x.replace && Mb(N) ? N : { ...E, ...N };
        }
        return E;
      }));
    }, y = (g, b, x = { replace: !1 }) => {
      d((_) => _.map((E) => {
        if (E.id === g) {
          const N = typeof b == "function" ? b(E) : b;
          return x.replace && e4(N) ? N : { ...E, ...N };
        }
        return E;
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
        const { nodes: g = [], edges: b = [], transform: x } = a.getState(), [_, E, N] = x;
        return {
          nodes: g.map((R) => ({ ...R })),
          edges: b.map((R) => ({ ...R })),
          viewport: {
            x: _,
            y: E,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: b = [] }) => {
        const { nodes: x, edges: _, onNodesDelete: E, onEdgesDelete: N, triggerNodeChanges: R, triggerEdgeChanges: j, onDelete: C, onBeforeDelete: O } = a.getState(), { nodes: B, edges: k } = await NA({
          nodesToRemove: g,
          edgesToRemove: b,
          nodes: x,
          edges: _,
          onBeforeDelete: O
        }), H = k.length > 0, A = B.length > 0;
        if (H) {
          const Y = k.map(Tb);
          N?.(k), j(Y);
        }
        if (A) {
          const Y = B.map(Tb);
          E?.(B), R(Y);
        }
        return (A || H) && C?.({ nodes: B, edges: k }), { deletedNodes: B, deletedEdges: k };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, b = !0, x) => {
        const _ = tb(g), E = _ ? g : p(g), N = x !== void 0;
        return E ? (x || a.getState().nodes).filter((R) => {
          const j = a.getState().nodeLookup.get(R.id);
          if (j && !_ && (R.id === g.id || !j.internals.positionAbsolute))
            return !1;
          const C = jl(N ? R : j), O = Wo(C, E);
          return b && O > 0 || O >= C.width * C.height || O >= E.width * E.height;
        }) : [];
      },
      isNodeIntersecting: (g, b, x = !0) => {
        const E = tb(g) ? g : p(g);
        if (!E)
          return !1;
        const N = Wo(E, b);
        return x && N > 0 || N >= b.width * b.height || N >= E.width * E.height;
      },
      updateNode: m,
      updateNodeData: (g, b, x = { replace: !1 }) => {
        m(g, (_) => {
          const E = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: E } : { ..._, data: { ..._.data, ...E } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (g, b, x = { replace: !1 }) => {
        y(g, (_) => {
          const E = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: E } : { ..._, data: { ..._.data, ...E } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: b, nodeOrigin: x } = a.getState();
        return wA(g, { nodeLookup: b, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${b ? `-${b}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? b ? `-${g}-${b}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const b = a.getState().fitViewResolver ?? TA();
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
const Db = (e) => e.selected, l4 = typeof window < "u" ? window : void 0;
function o4({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const r = jt(), { deleteElements: l } = Wm(), s = ts(e, { actInsideInputWithModifier: !1 }), u = ts(a, { target: l4 });
  S.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = r.getState();
      l({ nodes: d.filter(Db), edges: c.filter(Db) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), S.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function s4(e) {
  const a = jt();
  S.useEffect(() => {
    const r = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = Xm(e.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", Na.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
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
const Fc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, u4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function c4({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = Rr.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: y, maxZoom: g, zoomActivationKeyCode: b, preventScrolling: x = !0, children: _, noWheelClassName: E, noPanClassName: N, onViewportChange: R, isControlledViewport: j, paneClickDistance: C, selectionOnDrag: O }) {
  const B = jt(), k = S.useRef(null), { userSelectionActive: H, lib: A, connectionInProgress: Y } = st(u4, Dt), le = ts(b), q = S.useRef();
  s4(k);
  const Q = S.useCallback((ne) => {
    R?.({ x: ne[0], y: ne[1], zoom: ne[2] }), j || B.setState({ transform: ne });
  }, [R, j]);
  return S.useEffect(() => {
    if (k.current) {
      q.current = fD({
        domNode: k.current,
        minZoom: y,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (T) => B.setState((z) => z.paneDragging === T ? z : { paneDragging: T }),
        onPanZoomStart: (T, z) => {
          const { onViewportChangeStart: G, onMoveStart: F } = B.getState();
          F?.(T, z), G?.(z);
        },
        onPanZoom: (T, z) => {
          const { onViewportChange: G, onMove: F } = B.getState();
          F?.(T, z), G?.(z);
        },
        onPanZoomEnd: (T, z) => {
          const { onViewportChangeEnd: G, onMoveEnd: F } = B.getState();
          F?.(T, z), G?.(z);
        }
      });
      const { x: ne, y: L, zoom: I } = q.current.getViewport();
      return B.setState({
        panZoom: q.current,
        transform: [ne, L, I],
        domNode: k.current.closest(".react-flow")
      }), () => {
        q.current?.destroy();
      };
    }
  }, []), S.useEffect(() => {
    q.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: a,
      zoomOnPinch: r,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: le,
      preventScrolling: x,
      noPanClassName: N,
      userSelectionActive: H,
      noWheelClassName: E,
      lib: A,
      onTransformChange: Q,
      connectionInProgress: Y,
      selectionOnDrag: O,
      paneClickDistance: C
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
    le,
    x,
    N,
    H,
    E,
    A,
    Q,
    Y,
    O,
    C
  ]), v.jsx("div", { className: "react-flow__renderer", ref: k, style: Fc, children: _ });
}
const f4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function d4() {
  const { userSelectionActive: e, userSelectionRect: a } = st(f4, Dt);
  return e && a ? v.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const Eh = (e, a) => (r) => {
  r.target === a.current && e?.(r);
}, h4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function m4({ isSelecting: e, selectionKeyPressed: a, selectionMode: r = Jo.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: g, onPaneMouseEnter: b, onPaneMouseMove: x, onPaneMouseLeave: _, children: E }) {
  const N = S.useRef(0), R = jt(), { userSelectionActive: j, elementsSelectable: C, dragging: O, connectionInProgress: B, panBy: k, autoPanSpeed: H } = st(h4, Dt), A = C && (e || j), Y = S.useRef(null), le = S.useRef(), q = S.useRef(/* @__PURE__ */ new Set()), Q = S.useRef(/* @__PURE__ */ new Set()), ne = S.useRef(!1), L = S.useRef({ x: 0, y: 0 }), I = S.useRef(!1), T = (J) => {
    if (ne.current || B) {
      ne.current = !1;
      return;
    }
    m?.(J), R.getState().resetSelectedElements(), R.setState({ nodesSelectionActive: !1 });
  }, z = (J) => {
    if (Array.isArray(l) && l?.includes(2)) {
      J.preventDefault();
      return;
    }
    y?.(J);
  }, G = g ? (J) => g(J) : void 0, F = (J) => {
    ne.current && (J.stopPropagation(), ne.current = !1);
  }, te = (J) => {
    const { domNode: ve, transform: Oe } = R.getState();
    if (le.current = ve?.getBoundingClientRect(), !le.current)
      return;
    const je = J.target === Y.current;
    if (!je && !!J.target.closest(".nokey") || !e || !(c && je || a) || J.button !== 0 || !J.isPrimary)
      return;
    J.target?.setPointerCapture?.(J.pointerId), ne.current = !1;
    const { x: Me, y: Ye } = Ea(J.nativeEvent, le.current), ye = kl({ x: Me, y: Ye }, Oe);
    R.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ye.x,
        startY: ye.y,
        x: Me,
        y: Ye
      }
    }), je || (J.stopPropagation(), J.preventDefault());
  };
  function D(J, ve) {
    const { userSelectionRect: Oe } = R.getState();
    if (!Oe)
      return;
    const { transform: je, nodeLookup: Ee, edgeLookup: we, connectionLookup: Me, triggerNodeChanges: Ye, triggerEdgeChanges: ye, defaultEdgeOptions: pe } = R.getState(), _e = { x: Oe.startX, y: Oe.startY }, { x: Re, y: Ae } = Ol(_e, je), lt = {
      startX: _e.x,
      startY: _e.y,
      x: J < Re ? J : Re,
      y: ve < Ae ? ve : Ae,
      width: Math.abs(J - Re),
      height: Math.abs(ve - Ae)
    }, Ze = q.current, Fe = Q.current;
    q.current = new Set(Ym(Ee, lt, je, r === Jo.Partial, !0).map((vt) => vt.id)), Q.current = /* @__PURE__ */ new Set();
    const Ke = pe?.selectable ?? !0;
    for (const vt of q.current) {
      const yt = Me.get(vt);
      if (yt)
        for (const { edgeId: Yt } of yt.values()) {
          const Lt = we.get(Yt);
          Lt && (Lt.selectable ?? Ke) && Q.current.add(Yt);
        }
    }
    if (!nb(Ze, q.current)) {
      const vt = Sl(Ee, q.current, !0);
      Ye(vt);
    }
    if (!nb(Fe, Q.current)) {
      const vt = Sl(we, Q.current);
      ye(vt);
    }
    R.setState({
      userSelectionRect: lt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function V() {
    if (!s || !le.current)
      return;
    const [J, ve] = Gm(L.current, le.current, H);
    k({ x: J, y: ve }).then((Oe) => {
      if (!ne.current || !Oe) {
        N.current = requestAnimationFrame(V);
        return;
      }
      const { x: je, y: Ee } = L.current;
      D(je, Ee), N.current = requestAnimationFrame(V);
    });
  }
  const Z = () => {
    cancelAnimationFrame(N.current), N.current = 0, I.current = !1;
  };
  S.useEffect(() => () => Z(), []);
  const ee = (J) => {
    const { userSelectionRect: ve, transform: Oe, resetSelectedElements: je } = R.getState();
    if (!le.current || !ve)
      return;
    const { x: Ee, y: we } = Ea(J.nativeEvent, le.current);
    L.current = { x: Ee, y: we };
    const Me = Ol({ x: ve.startX, y: ve.startY }, Oe);
    if (!ne.current) {
      const Ye = a ? 0 : u;
      if (Math.hypot(Ee - Me.x, we - Me.y) <= Ye)
        return;
      je(), d?.(J);
    }
    ne.current = !0, I.current || (V(), I.current = !0), D(Ee, we);
  }, se = (J) => {
    J.button === 0 && (J.target?.releasePointerCapture?.(J.pointerId), !j && J.target === Y.current && R.getState().userSelectionRect && T?.(J), R.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), ne.current && (p?.(J), R.setState({
      nodesSelectionActive: q.current.size > 0
    })), Z());
  }, he = (J) => {
    J.target?.releasePointerCapture?.(J.pointerId), Z();
  }, me = l === !0 || Array.isArray(l) && l.includes(0);
  return v.jsxs("div", { className: Zt(["react-flow__pane", { draggable: me, dragging: O, selection: e }]), onClick: A ? void 0 : Eh(T, Y), onContextMenu: Eh(z, Y), onWheel: Eh(G, Y), onPointerEnter: A ? void 0 : b, onPointerMove: A ? ee : x, onPointerUp: A ? se : void 0, onPointerCancel: A ? he : void 0, onPointerDownCapture: A ? te : void 0, onClickCapture: A ? F : void 0, onPointerLeave: _, ref: Y, style: Fc, children: [E, v.jsx(d4, {})] });
}
function rm({ id: e, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", Na.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function $w({ nodeRef: e, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = jt(), [p, m] = S.useState(!1), y = S.useRef();
  return S.useEffect(() => {
    y.current = KA({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        rm({
          id: g,
          store: d,
          nodeRef: e
        });
      },
      onDragStart: () => {
        m(!0);
      },
      onDragStop: () => {
        m(!1);
      }
    });
  }, []), S.useEffect(() => {
    if (!(a || !e.current || !y.current))
      return y.current.update({
        noDragClassName: r,
        handleSelector: l,
        domNode: e.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        y.current?.destroy();
      };
  }, [r, l, a, u, e, s, c]), p;
}
const p4 = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function qw() {
  const e = jt();
  return S.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: y } = e.getState(), g = /* @__PURE__ */ new Map(), b = p4(c), x = s ? u[0] : 5, _ = s ? u[1] : 5, E = r.direction.x * x * r.factor, N = r.direction.y * _ * r.factor;
    for (const [, R] of m) {
      if (!b(R))
        continue;
      let j = {
        x: R.internals.positionAbsolute.x + E,
        y: R.internals.positionAbsolute.y + N
      };
      s && (j = ps(j, u));
      const { position: C, positionAbsolute: O } = sw({
        nodeId: R.id,
        nextPosition: j,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: d
      });
      R.position = C, R.internals.positionAbsolute = O, g.set(R.id, R);
    }
    p(g);
  }, []);
}
const ep = S.createContext(null), g4 = ep.Provider;
ep.Consumer;
const Iw = () => S.useContext(ep), v4 = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), y4 = (e, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, y = p?.nodeId === e && p?.id === a && p?.type === r;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === Al.Strict ? d?.type !== r : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function b4({ type: e = "source", position: a = ke.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: y, onTouchStart: g, ...b }, x) {
  const _ = c || null, E = e === "target", N = jt(), R = Iw(), { connectOnClick: j, noPanClassName: C, rfId: O } = st(v4, Dt), { connectingFrom: B, connectingTo: k, clickConnecting: H, isPossibleEndHandle: A, connectionInProcess: Y, clickConnectionInProcess: le, valid: q } = st(y4(R, _, e), Dt);
  R || N.getState().onError?.("010", Na.error010());
  const Q = (I) => {
    const { defaultEdgeOptions: T, onConnect: z, hasDefaultEdges: G } = N.getState(), F = {
      ...T,
      ...I
    };
    if (G) {
      const { edges: te, setEdges: D, onError: V } = N.getState();
      D(WD(F, te, { onError: V }));
    }
    z?.(F), d?.(F);
  }, ne = (I) => {
    if (!R)
      return;
    const T = gw(I.nativeEvent);
    if (s && (T && I.button === 0 || !T)) {
      const z = N.getState();
      im.onPointerDown(I.nativeEvent, {
        handleDomNode: I.currentTarget,
        autoPanOnConnect: z.autoPanOnConnect,
        connectionMode: z.connectionMode,
        connectionRadius: z.connectionRadius,
        domNode: z.domNode,
        nodeLookup: z.nodeLookup,
        lib: z.lib,
        isTarget: E,
        handleId: _,
        nodeId: R,
        flowId: z.rfId,
        panBy: z.panBy,
        cancelConnection: z.cancelConnection,
        onConnectStart: z.onConnectStart,
        onConnectEnd: (...G) => N.getState().onConnectEnd?.(...G),
        updateConnection: z.updateConnection,
        onConnect: Q,
        isValidConnection: r || ((...G) => N.getState().isValidConnection?.(...G) ?? !0),
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: z.autoPanSpeed,
        dragThreshold: z.connectionDragThreshold
      });
    }
    T ? y?.(I) : g?.(I);
  }, L = (I) => {
    const { onClickConnectStart: T, onClickConnectEnd: z, connectionClickStartHandle: G, connectionMode: F, isValidConnection: te, lib: D, rfId: V, nodeLookup: Z, connection: ee } = N.getState();
    if (!R || !G && !s)
      return;
    if (!G) {
      T?.(I.nativeEvent, { nodeId: R, handleId: _, handleType: e }), N.setState({ connectionClickStartHandle: { nodeId: R, type: e, id: _ } });
      return;
    }
    const se = mw(I.target), he = r || te, { connection: me, isValid: J } = im.isValid(I.nativeEvent, {
      handle: {
        nodeId: R,
        id: _,
        type: e
      },
      connectionMode: F,
      fromNodeId: G.nodeId,
      fromHandleId: G.id || null,
      fromType: G.type,
      isValidConnection: he,
      flowId: V,
      doc: se,
      lib: D,
      nodeLookup: Z
    });
    J && me && Q(me);
    const ve = structuredClone(ee);
    delete ve.inProgress, ve.toPosition = ve.toHandle ? ve.toHandle.position : null, z?.(I, ve), N.setState({ connectionClickStartHandle: null });
  };
  return v.jsx("div", { "data-handleid": _, "data-nodeid": R, "data-handlepos": a, "data-id": `${O}-${R}-${_}-${e}`, className: Zt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    C,
    m,
    {
      source: !E,
      target: E,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: H,
      connectingfrom: B,
      connectingto: k,
      valid: q,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!Y || A) && (Y || le ? u : s)
    }
  ]), onMouseDown: ne, onTouchStart: ne, onClick: j ? L : void 0, ref: x, ...b, children: p });
}
const Ll = S.memo(Uw(b4));
function x4({ data: e, isConnectable: a, sourcePosition: r = ke.Bottom }) {
  return v.jsxs(v.Fragment, { children: [e?.label, v.jsx(Ll, { type: "source", position: r, isConnectable: a })] });
}
function w4({ data: e, isConnectable: a, targetPosition: r = ke.Top, sourcePosition: l = ke.Bottom }) {
  return v.jsxs(v.Fragment, { children: [v.jsx(Ll, { type: "target", position: r, isConnectable: a }), e?.label, v.jsx(Ll, { type: "source", position: l, isConnectable: a })] });
}
function _4() {
  return null;
}
function S4({ data: e, isConnectable: a, targetPosition: r = ke.Top }) {
  return v.jsxs(v.Fragment, { children: [v.jsx(Ll, { type: "target", position: r, isConnectable: a }), e?.label] });
}
const wc = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, jb = {
  input: x4,
  default: w4,
  output: S4,
  group: _4
};
function E4(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const N4 = (e) => {
  const { width: a, height: r, x: l, y: s } = ms(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: Sa(a) ? a : null,
    height: Sa(r) ? r : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function C4({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = jt(), { width: s, height: u, transformString: c, userSelectionActive: d } = st(N4, Dt), p = qw(), m = S.useRef(null);
  S.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !d && s !== null && u !== null;
  if ($w({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const g = e ? (x) => {
    const _ = l.getState().nodes.filter((E) => E.selected);
    e(x, _);
  } : void 0, b = (x) => {
    Object.prototype.hasOwnProperty.call(wc, x.key) && (x.preventDefault(), p({
      direction: wc[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return v.jsx("div", { className: Zt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: v.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : b, style: {
    width: s,
    height: u
  } }) });
}
const Ob = typeof window < "u" ? window : void 0, R4 = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Yw({ children: e, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: y, selectionMode: g, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: _, panActivationKeyCode: E, zoomActivationKeyCode: N, elementsSelectable: R, zoomOnScroll: j, zoomOnPinch: C, panOnScroll: O, panOnScrollSpeed: B, panOnScrollMode: k, zoomOnDoubleClick: H, panOnDrag: A, autoPanOnSelection: Y, defaultViewport: le, translateExtent: q, minZoom: Q, maxZoom: ne, preventScrolling: L, onSelectionContextMenu: I, noWheelClassName: T, noPanClassName: z, disableKeyboardA11y: G, onViewportChange: F, isControlledViewport: te }) {
  const { nodesSelectionActive: D, userSelectionActive: V } = st(R4, Dt), Z = ts(m, { target: Ob }), ee = ts(E, { target: Ob }), se = ee || A, he = ee || O, me = y && se !== !0, J = Z || V || me;
  return o4({ deleteKeyCode: p, multiSelectionKeyCode: _ }), v.jsx(c4, { onPaneContextMenu: u, elementsSelectable: R, zoomOnScroll: j, zoomOnPinch: C, panOnScroll: he, panOnScrollSpeed: B, panOnScrollMode: k, zoomOnDoubleClick: H, panOnDrag: !Z && se, defaultViewport: le, translateExtent: q, minZoom: Q, maxZoom: ne, zoomActivationKeyCode: N, preventScrolling: L, noWheelClassName: T, noPanClassName: z, onViewportChange: F, isControlledViewport: te, paneClickDistance: d, selectionOnDrag: me, children: v.jsxs(m4, { onSelectionStart: b, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: Y, isSelecting: !!J, selectionMode: g, selectionKeyPressed: Z, paneClickDistance: d, selectionOnDrag: me, children: [e, D && v.jsx(C4, { onSelectionContextMenu: I, noPanClassName: z, disableKeyboardA11y: G })] }) });
}
Yw.displayName = "FlowRenderer";
const T4 = S.memo(Yw), M4 = (e) => (a) => e ? Ym(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function A4(e) {
  return st(S.useCallback(M4(e), [e]), Dt);
}
const D4 = (e) => e.updateNodeInternals;
function j4() {
  const e = st(D4), [a] = S.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
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
function O4({ node: e, nodeType: a, hasDimensions: r, resizeObserver: l }) {
  const s = jt(), u = S.useRef(null), c = S.useRef(null), d = S.useRef(e.sourcePosition), p = S.useRef(e.targetPosition), m = S.useRef(a), y = r && !!e.internals.handleBounds;
  return S.useEffect(() => {
    u.current && !e.hidden && (!y || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [y, e.hidden]), S.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), S.useEffect(() => {
    if (u.current) {
      const g = m.current !== a, b = d.current !== e.sourcePosition, x = p.current !== e.targetPosition;
      (g || b || x) && (m.current = a, d.current = e.sourcePosition, p.current = e.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [e.id, a, e.sourcePosition, e.targetPosition]), u;
}
function z4({ id: e, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: y, resizeObserver: g, noDragClassName: b, noPanClassName: x, disableKeyboardA11y: _, rfId: E, nodeTypes: N, nodeClickDistance: R, onError: j }) {
  const { node: C, internals: O, isParent: B } = st((J) => {
    const ve = J.nodeLookup.get(e), Oe = J.parentLookup.has(e);
    return {
      node: ve,
      internals: ve.internals,
      isParent: Oe
    };
  }, Dt);
  let k = C.type || "default", H = N?.[k] || jb[k];
  H === void 0 && (j?.("003", Na.error003(k)), k = "default", H = N?.default || jb.default);
  const A = !!(C.draggable || d && typeof C.draggable > "u"), Y = !!(C.selectable || p && typeof C.selectable > "u"), le = !!(C.connectable || m && typeof C.connectable > "u"), q = !!(C.focusable || y && typeof C.focusable > "u"), Q = jt(), ne = dw(C), L = O4({ node: C, nodeType: k, hasDimensions: ne, resizeObserver: g }), I = $w({
    nodeRef: L,
    disabled: C.hidden || !A,
    noDragClassName: b,
    handleSelector: C.dragHandle,
    nodeId: e,
    isSelectable: Y,
    nodeClickDistance: R
  }), T = qw();
  if (C.hidden)
    return null;
  const z = vi(C), G = E4(C), F = Y || A || a || r || l || s, te = r ? (J) => r(J, { ...O.userNode }) : void 0, D = l ? (J) => l(J, { ...O.userNode }) : void 0, V = s ? (J) => s(J, { ...O.userNode }) : void 0, Z = u ? (J) => u(J, { ...O.userNode }) : void 0, ee = c ? (J) => c(J, { ...O.userNode }) : void 0, se = (J) => {
    const { selectNodesOnDrag: ve, nodeDragThreshold: Oe } = Q.getState();
    Y && (!ve || !A || Oe > 0) && rm({
      id: e,
      store: Q,
      nodeRef: L
    }), a && a(J, { ...O.userNode });
  }, he = (J) => {
    if (!(pw(J.nativeEvent) || _)) {
      if (aw.includes(J.key) && Y) {
        const ve = J.key === "Escape";
        rm({
          id: e,
          store: Q,
          unselect: ve,
          nodeRef: L
        });
      } else if (A && C.selected && Object.prototype.hasOwnProperty.call(wc, J.key)) {
        J.preventDefault();
        const { ariaLabelConfig: ve } = Q.getState();
        Q.setState({
          ariaLiveMessage: ve["node.a11yDescription.ariaLiveMessage"]({
            direction: J.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), T({
          direction: wc[J.key],
          factor: J.shiftKey ? 4 : 1
        });
      }
    }
  }, me = () => {
    if (_ || !L.current?.matches(":focus-visible"))
      return;
    const { transform: J, width: ve, height: Oe, autoPanOnNodeFocus: je, setCenter: Ee } = Q.getState();
    if (!je)
      return;
    Ym(/* @__PURE__ */ new Map([[e, C]]), { x: 0, y: 0, width: ve, height: Oe }, J, !0).length > 0 || Ee(C.position.x + z.width / 2, C.position.y + z.height / 2, {
      zoom: J[2]
    });
  };
  return v.jsx("div", { className: Zt([
    "react-flow__node",
    `react-flow__node-${k}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: A
    },
    C.className,
    {
      selected: C.selected,
      selectable: Y,
      parent: B,
      draggable: A,
      dragging: I
    }
  ]), ref: L, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: F ? "all" : "none",
    visibility: ne ? "visible" : "hidden",
    ...C.style,
    ...G
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: te, onMouseMove: D, onMouseLeave: V, onContextMenu: Z, onClick: se, onDoubleClick: ee, onKeyDown: q ? he : void 0, tabIndex: q ? 0 : void 0, onFocus: q ? me : void 0, role: C.ariaRole ?? (q ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": _ ? void 0 : `${Lw}-${E}`, "aria-label": C.ariaLabel, ...C.domAttributes, children: v.jsx(g4, { value: e, children: v.jsx(H, { id: e, data: C.data, type: k, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: C.selected ?? !1, selectable: Y, draggable: A, deletable: C.deletable ?? !0, isConnectable: le, sourcePosition: C.sourcePosition, targetPosition: C.targetPosition, dragging: I, dragHandle: C.dragHandle, zIndex: O.z, parentId: C.parentId, ...z }) }) });
}
var L4 = S.memo(z4);
const k4 = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Gw(e) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = st(k4, Dt), c = A4(e.onlyRenderVisibleElements), d = j4();
  return v.jsx("div", { className: "react-flow__nodes", style: Fc, children: c.map((p) => (
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
    v.jsx(L4, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
Gw.displayName = "NodeRenderer";
const H4 = S.memo(Gw);
function B4(e) {
  return st(S.useCallback((r) => {
    if (!e)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && jA({
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
const U4 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return v.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, V4 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return v.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, zb = {
  [bc.Arrow]: U4,
  [bc.ArrowClosed]: V4
};
function $4(e) {
  const a = jt();
  return S.useMemo(() => Object.prototype.hasOwnProperty.call(zb, e) ? zb[e] : (a.getState().onError?.("009", Na.error009(e)), null), [e]);
}
const q4 = ({ id: e, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = $4(a);
  return p ? v.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: v.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, Fw = ({ defaultColor: e, rfId: a }) => {
  const r = st((u) => u.edges), l = st((u) => u.defaultEdgeOptions), s = S.useMemo(() => VA(r, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, e]);
  return s.length ? v.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: v.jsx("defs", { children: s.map((u) => v.jsx(q4, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Fw.displayName = "MarkerDefinitions";
var I4 = S.memo(Fw);
function Xw({ x: e, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...y }) {
  const [g, b] = S.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Zt(["react-flow__edge-textwrapper", m]), _ = S.useRef(null);
  return S.useEffect(() => {
    if (_.current) {
      const E = _.current.getBBox();
      b({
        x: E.x,
        y: E.y,
        width: E.width,
        height: E.height
      });
    }
  }, [r]), r ? v.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...y, children: [s && v.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), v.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: _, style: l, children: r }), p] }) : null;
}
Xw.displayName = "EdgeText";
const Y4 = S.memo(Xw);
function Xc({ path: e, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...y }) {
  return v.jsxs(v.Fragment, { children: [v.jsx("path", { ...y, d: e, fill: "none", className: Zt(["react-flow__edge-path", y.className]) }), m ? v.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && Sa(a) && Sa(r) ? v.jsx(Y4, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function Lb({ pos: e, x1: a, y1: r, x2: l, y2: s }) {
  return e === ke.Left || e === ke.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function Pw({ sourceX: e, sourceY: a, sourcePosition: r = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top }) {
  const [c, d] = Lb({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = Lb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [y, g, b, x] = vw({
    sourceX: e,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: c,
    sourceControlY: d,
    targetControlX: p,
    targetControlY: m
  });
  return [
    `M${e},${a} C${c},${d} ${p},${m} ${l},${s}`,
    y,
    g,
    b,
    x
  ];
}
function Zw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, interactionWidth: R }) => {
    const [j, C, O] = Pw({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), B = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: B, path: j, labelX: C, labelY: O, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, interactionWidth: R });
  });
}
const G4 = Zw({ isInternal: !1 }), Qw = Zw({ isInternal: !0 });
G4.displayName = "SimpleBezierEdge";
Qw.displayName = "SimpleBezierEdgeInternal";
function Kw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, sourcePosition: x = ke.Bottom, targetPosition: _ = ke.Top, markerEnd: E, markerStart: N, pathOptions: R, interactionWidth: j }) => {
    const [C, O, B] = tm({
      sourceX: r,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: _,
      borderRadius: R?.borderRadius,
      offset: R?.offset,
      stepPosition: R?.stepPosition
    }), k = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: k, path: C, labelX: O, labelY: B, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: E, markerStart: N, interactionWidth: j });
  });
}
const Jw = Kw({ isInternal: !1 }), Ww = Kw({ isInternal: !0 });
Jw.displayName = "SmoothStepEdge";
Ww.displayName = "SmoothStepEdgeInternal";
function e_(e) {
  return S.memo(({ id: a, ...r }) => {
    const l = e.isInternal ? void 0 : a;
    return v.jsx(Jw, { ...r, id: l, pathOptions: S.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const F4 = e_({ isInternal: !1 }), t_ = e_({ isInternal: !0 });
F4.displayName = "StepEdge";
t_.displayName = "StepEdgeInternal";
function n_(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: E }) => {
    const [N, R, j] = xw({ sourceX: r, sourceY: l, targetX: s, targetY: u }), C = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: C, path: N, labelX: R, labelY: j, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: E });
  });
}
const X4 = n_({ isInternal: !1 }), a_ = n_({ isInternal: !0 });
X4.displayName = "StraightEdge";
a_.displayName = "StraightEdgeInternal";
function i_(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = ke.Bottom, targetPosition: d = ke.Top, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, pathOptions: R, interactionWidth: j }) => {
    const [C, O, B] = yw({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: R?.curvature
    }), k = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: k, path: C, labelX: O, labelY: B, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, interactionWidth: j });
  });
}
const P4 = i_({ isInternal: !1 }), r_ = i_({ isInternal: !0 });
P4.displayName = "BezierEdge";
r_.displayName = "BezierEdgeInternal";
const kb = {
  default: r_,
  straight: a_,
  step: t_,
  smoothstep: Ww,
  simplebezier: Qw
}, Hb = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, Z4 = (e, a, r) => r === ke.Left ? e - a : r === ke.Right ? e + a : e, Q4 = (e, a, r) => r === ke.Top ? e - a : r === ke.Bottom ? e + a : e, Bb = "react-flow__edgeupdater";
function Ub({ position: e, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return v.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Zt([Bb, `${Bb}-${d}`]), cx: Z4(a, l, e), cy: Q4(r, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function K4({ isReconnectable: e, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: y, onReconnectEnd: g, setReconnecting: b, setUpdateHover: x }) {
  const _ = jt(), E = (O, B) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: k, domNode: H, connectionMode: A, connectionRadius: Y, lib: le, onConnectStart: q, cancelConnection: Q, nodeLookup: ne, rfId: L, panBy: I, updateConnection: T } = _.getState(), z = B.type === "target", G = (D, V) => {
      b(!1), g?.(D, r, B.type, V);
    }, F = (D) => m?.(r, D), te = (D, V) => {
      b(!0), y?.(O, r, B.type), q?.(D, V);
    };
    im.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: k,
      connectionMode: A,
      connectionRadius: Y,
      domNode: H,
      handleId: B.id,
      nodeId: B.nodeId,
      nodeLookup: ne,
      isTarget: z,
      edgeUpdaterType: B.type,
      lib: le,
      flowId: L,
      cancelConnection: Q,
      panBy: I,
      isValidConnection: (...D) => _.getState().isValidConnection?.(...D) ?? !0,
      onConnect: F,
      onConnectStart: te,
      onConnectEnd: (...D) => _.getState().onConnectEnd?.(...D),
      onReconnectEnd: G,
      updateConnection: T,
      getTransform: () => _.getState().transform,
      getFromHandle: () => _.getState().connection.fromHandle,
      dragThreshold: _.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, N = (O) => E(O, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), R = (O) => E(O, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), j = () => x(!0), C = () => x(!1);
  return v.jsxs(v.Fragment, { children: [(e === !0 || e === "source") && v.jsx(Ub, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: N, onMouseEnter: j, onMouseOut: C, type: "source" }), (e === !0 || e === "target") && v.jsx(Ub, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: R, onMouseEnter: j, onMouseOut: C, type: "target" })] });
}
function J4({ id: e, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: y, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, rfId: _, edgeTypes: E, noPanClassName: N, onError: R, disableKeyboardA11y: j }) {
  let C = st((Ee) => Ee.edgeLookup.get(e));
  const O = st((Ee) => Ee.defaultEdgeOptions);
  C = O ? { ...O, ...C } : C;
  let B = C.type || "default", k = E?.[B] || kb[B];
  k === void 0 && (R?.("011", Na.error011(B)), B = "default", k = E?.default || kb.default);
  const H = !!(C.focusable || a && typeof C.focusable > "u"), A = typeof g < "u" && (C.reconnectable || r && typeof C.reconnectable > "u"), Y = !!(C.selectable || l && typeof C.selectable > "u"), le = S.useRef(null), [q, Q] = S.useState(!1), [ne, L] = S.useState(!1), I = jt(), { zIndex: T, sourceX: z, sourceY: G, targetX: F, targetY: te, sourcePosition: D, targetPosition: V } = st(S.useCallback((Ee) => {
    const we = Ee.nodeLookup.get(C.source), Me = Ee.nodeLookup.get(C.target);
    if (!we || !Me)
      return {
        zIndex: C.zIndex,
        ...Hb
      };
    const Ye = UA({
      id: e,
      sourceNode: we,
      targetNode: Me,
      sourceHandle: C.sourceHandle || null,
      targetHandle: C.targetHandle || null,
      connectionMode: Ee.connectionMode,
      onError: R
    });
    return {
      zIndex: DA({
        selected: C.selected,
        zIndex: C.zIndex,
        sourceNode: we,
        targetNode: Me,
        elevateOnSelect: Ee.elevateEdgesOnSelect,
        zIndexMode: Ee.zIndexMode
      }),
      ...Ye || Hb
    };
  }, [C.source, C.target, C.sourceHandle, C.targetHandle, C.selected, C.zIndex]), Dt), Z = S.useMemo(() => C.markerStart ? `url('#${nm(C.markerStart, _)}')` : void 0, [C.markerStart, _]), ee = S.useMemo(() => C.markerEnd ? `url('#${nm(C.markerEnd, _)}')` : void 0, [C.markerEnd, _]);
  if (C.hidden || z === null || G === null || F === null || te === null)
    return null;
  const se = (Ee) => {
    const { addSelectedEdges: we, unselectNodesAndEdges: Me, multiSelectionActive: Ye } = I.getState();
    Y && (I.setState({ nodesSelectionActive: !1 }), C.selected && Ye ? (Me({ nodes: [], edges: [C] }), le.current?.blur()) : we([e])), s && s(Ee, C);
  }, he = u ? (Ee) => {
    u(Ee, { ...C });
  } : void 0, me = c ? (Ee) => {
    c(Ee, { ...C });
  } : void 0, J = d ? (Ee) => {
    d(Ee, { ...C });
  } : void 0, ve = p ? (Ee) => {
    p(Ee, { ...C });
  } : void 0, Oe = m ? (Ee) => {
    m(Ee, { ...C });
  } : void 0, je = (Ee) => {
    if (!j && aw.includes(Ee.key) && Y) {
      const { unselectNodesAndEdges: we, addSelectedEdges: Me } = I.getState();
      Ee.key === "Escape" ? (le.current?.blur(), we({ edges: [C] })) : Me([e]);
    }
  };
  return v.jsx("svg", { style: { zIndex: T }, children: v.jsxs("g", { className: Zt([
    "react-flow__edge",
    `react-flow__edge-${B}`,
    C.className,
    N,
    {
      selected: C.selected,
      animated: C.animated,
      inactive: !Y && !s,
      updating: q,
      selectable: Y
    }
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: J, onMouseMove: ve, onMouseLeave: Oe, onKeyDown: H ? je : void 0, tabIndex: H ? 0 : void 0, role: C.ariaRole ?? (H ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": C.ariaLabel === null ? void 0 : C.ariaLabel || `Edge from ${C.source} to ${C.target}`, "aria-describedby": H ? `${kw}-${_}` : void 0, ref: le, ...C.domAttributes, children: [!ne && v.jsx(k, { id: e, source: C.source, target: C.target, type: C.type, selected: C.selected, animated: C.animated, selectable: Y, deletable: C.deletable ?? !0, label: C.label, labelStyle: C.labelStyle, labelShowBg: C.labelShowBg, labelBgStyle: C.labelBgStyle, labelBgPadding: C.labelBgPadding, labelBgBorderRadius: C.labelBgBorderRadius, sourceX: z, sourceY: G, targetX: F, targetY: te, sourcePosition: D, targetPosition: V, data: C.data, style: C.style, sourceHandleId: C.sourceHandle, targetHandleId: C.targetHandle, markerStart: Z, markerEnd: ee, pathOptions: "pathOptions" in C ? C.pathOptions : void 0, interactionWidth: C.interactionWidth }), A && v.jsx(K4, { edge: C, isReconnectable: A, reconnectRadius: y, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, sourceX: z, sourceY: G, targetX: F, targetY: te, sourcePosition: D, targetPosition: V, setUpdateHover: Q, setReconnecting: L })] }) });
}
var W4 = S.memo(J4);
const ej = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function l_({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: g, onEdgeDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, disableKeyboardA11y: E }) {
  const { edgesFocusable: N, edgesReconnectable: R, elementsSelectable: j, onError: C } = st(ej, Dt), O = B4(a);
  return v.jsxs("div", { className: "react-flow__edges", children: [v.jsx(I4, { defaultColor: e, rfId: r }), O.map((B) => v.jsx(W4, { id: B, edgesFocusable: N, edgesReconnectable: R, elementsSelectable: j, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: y, reconnectRadius: g, onDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, rfId: r, onError: C, edgeTypes: l, disableKeyboardA11y: E }, B))] });
}
l_.displayName = "EdgeRenderer";
const tj = S.memo(l_), nj = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function aj({ children: e }) {
  const a = st(nj);
  return v.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function ij(e) {
  const a = Wm(), r = S.useRef(!1);
  S.useEffect(() => {
    !r.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), r.current = !0);
  }, [e, a.viewportInitialized]);
}
const rj = (e) => e.panZoom?.syncViewport;
function lj(e) {
  const a = st(rj), r = jt();
  return S.useEffect(() => {
    e && (a?.(e), r.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function oj(e) {
  return e.connection.inProgress ? { ...e.connection, to: kl(e.connection.to, e.transform) } : { ...e.connection };
}
function sj(e) {
  return oj;
}
function uj(e) {
  const a = sj();
  return st(a, Dt);
}
const cj = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function fj({ containerStyle: e, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = st(cj, Dt);
  return !(u && s && p) ? null : v.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: v.jsx("g", { className: Zt(["react-flow__connection", lw(d)]), children: v.jsx(o_, { style: a, type: r, CustomComponent: l, isValid: d }) }) });
}
const o_ = ({ style: e, type: a = Qi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: y, toHandle: g, toPosition: b, pointer: x } = uj();
  if (!s)
    return;
  if (r)
    return v.jsx(r, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: b, connectionStatus: lw(l), toNode: y, toHandle: g, pointer: x });
  let _ = "";
  const E = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: b
  };
  switch (a) {
    case Qi.Bezier:
      [_] = yw(E);
      break;
    case Qi.SimpleBezier:
      [_] = Pw(E);
      break;
    case Qi.Step:
      [_] = tm({
        ...E,
        borderRadius: 0
      });
      break;
    case Qi.SmoothStep:
      [_] = tm(E);
      break;
    default:
      [_] = xw(E);
  }
  return v.jsx("path", { d: _, fill: "none", className: "react-flow__connection-path", style: e });
};
o_.displayName = "ConnectionLine";
const dj = {};
function Vb(e = dj) {
  S.useRef(e), jt(), S.useEffect(() => {
  }, [e]);
}
function hj() {
  jt(), S.useRef(!1), S.useEffect(() => {
  }, []);
}
function s_({ nodeTypes: e, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: g, onSelectionStart: b, onSelectionEnd: x, connectionLineType: _, connectionLineStyle: E, connectionLineComponent: N, connectionLineContainerStyle: R, selectionKeyCode: j, selectionOnDrag: C, selectionMode: O, multiSelectionKeyCode: B, panActivationKeyCode: k, zoomActivationKeyCode: H, deleteKeyCode: A, onlyRenderVisibleElements: Y, elementsSelectable: le, defaultViewport: q, translateExtent: Q, minZoom: ne, maxZoom: L, preventScrolling: I, defaultMarkerColor: T, zoomOnScroll: z, zoomOnPinch: G, panOnScroll: F, panOnScrollSpeed: te, panOnScrollMode: D, zoomOnDoubleClick: V, panOnDrag: Z, autoPanOnSelection: ee, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: J, onPaneScroll: ve, onPaneContextMenu: Oe, paneClickDistance: je, nodeClickDistance: Ee, onEdgeContextMenu: we, onEdgeMouseEnter: Me, onEdgeMouseMove: Ye, onEdgeMouseLeave: ye, reconnectRadius: pe, onReconnect: _e, onReconnectStart: Re, onReconnectEnd: Ae, noDragClassName: lt, noWheelClassName: Ze, noPanClassName: Fe, disableKeyboardA11y: Ke, nodeExtent: vt, rfId: yt, viewport: Yt, onViewportChange: Lt }) {
  return Vb(e), Vb(a), hj(), ij(r), lj(Yt), v.jsx(T4, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: J, onPaneContextMenu: Oe, onPaneScroll: ve, paneClickDistance: je, deleteKeyCode: A, selectionKeyCode: j, selectionOnDrag: C, selectionMode: O, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: B, panActivationKeyCode: k, zoomActivationKeyCode: H, elementsSelectable: le, zoomOnScroll: z, zoomOnPinch: G, zoomOnDoubleClick: V, panOnScroll: F, panOnScrollSpeed: te, panOnScrollMode: D, panOnDrag: Z, autoPanOnSelection: ee, defaultViewport: q, translateExtent: Q, minZoom: ne, maxZoom: L, onSelectionContextMenu: g, preventScrolling: I, noDragClassName: lt, noWheelClassName: Ze, noPanClassName: Fe, disableKeyboardA11y: Ke, onViewportChange: Lt, isControlledViewport: !!Yt, children: v.jsxs(aj, { children: [v.jsx(tj, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: _e, onReconnectStart: Re, onReconnectEnd: Ae, onlyRenderVisibleElements: Y, onEdgeContextMenu: we, onEdgeMouseEnter: Me, onEdgeMouseMove: Ye, onEdgeMouseLeave: ye, reconnectRadius: pe, defaultMarkerColor: T, noPanClassName: Fe, disableKeyboardA11y: Ke, rfId: yt }), v.jsx(fj, { style: E, type: _, component: N, containerStyle: R }), v.jsx("div", { className: "react-flow__edgelabel-renderer" }), v.jsx(H4, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: Ee, onlyRenderVisibleElements: Y, noPanClassName: Fe, noDragClassName: lt, disableKeyboardA11y: Ke, nodeExtent: vt, rfId: yt }), v.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
s_.displayName = "GraphView";
const mj = S.memo(s_), pj = fw(), $b = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: g, zIndexMode: b = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), R = l ?? a ?? [], j = r ?? e ?? [], C = y ?? [0, 0], O = g ?? Ko;
  Sw(E, N, R);
  const { nodesInitialized: B } = am(j, x, _, {
    nodeOrigin: C,
    nodeExtent: O,
    zIndexMode: b
  });
  let k = [0, 0, 1];
  if (c && s && u) {
    const H = ms(x, {
      filter: (q) => !!((q.width || q.initialWidth) && (q.height || q.initialHeight))
    }), { x: A, y: Y, zoom: le } = Fm(H, s, u, p, m, d?.padding ?? 0.1);
    k = [A, Y, le];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: k,
    nodes: j,
    nodesInitialized: B,
    nodeLookup: x,
    parentLookup: _,
    edges: R,
    edgeLookup: N,
    connectionLookup: E,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: Ko,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Al.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: C,
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
    connection: { ...rw },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: pj,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: iw,
    zIndexMode: b,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, gj = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: y, nodeExtent: g, zIndexMode: b }) => RD((x, _) => {
  async function E() {
    const { nodeLookup: N, panZoom: R, fitViewOptions: j, fitViewResolver: C, width: O, height: B, minZoom: k, maxZoom: H } = _();
    R && (await EA({
      nodes: N,
      width: O,
      height: B,
      panZoom: R,
      minZoom: k,
      maxZoom: H
    }, j), C?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...$b({
      nodes: e,
      edges: a,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: d,
      minZoom: p,
      maxZoom: m,
      nodeOrigin: y,
      nodeExtent: g,
      defaultNodes: r,
      defaultEdges: l,
      zIndexMode: b
    }),
    setNodes: (N) => {
      const { nodeLookup: R, parentLookup: j, nodeOrigin: C, elevateNodesOnSelect: O, fitViewQueued: B, zIndexMode: k, nodesSelectionActive: H } = _(), { nodesInitialized: A, hasSelectedNodes: Y } = am(N, R, j, {
        nodeOrigin: C,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: k
      }), le = H && Y;
      B && A ? (E(), x({
        nodes: N,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: le
      })) : x({ nodes: N, nodesInitialized: A, nodesSelectionActive: le });
    },
    setEdges: (N) => {
      const { connectionLookup: R, edgeLookup: j } = _();
      Sw(R, j, N), x({ edges: N });
    },
    setDefaultNodesAndEdges: (N, R) => {
      if (N) {
        const { setNodes: j } = _();
        j(N), x({ hasDefaultNodes: !0 });
      }
      if (R) {
        const { setEdges: j } = _();
        j(R), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (N) => {
      const { triggerNodeChanges: R, nodeLookup: j, parentLookup: C, domNode: O, nodeOrigin: B, nodeExtent: k, debug: H, fitViewQueued: A, zIndexMode: Y } = _(), { changes: le, updatedInternals: q } = XA(N, j, C, O, B, k, Y);
      q && (IA(j, C, { nodeOrigin: B, nodeExtent: k, zIndexMode: Y }), A ? (E(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), le?.length > 0 && (H && console.log("React Flow: trigger node changes", le), R?.(le)));
    },
    updateNodePositions: (N, R = !1) => {
      const j = [];
      let C = [];
      const { nodeLookup: O, triggerNodeChanges: B, connection: k, updateConnection: H, onNodesChangeMiddlewareMap: A } = _();
      for (const [Y, le] of N) {
        const q = O.get(Y), Q = !!(q?.expandParent && q?.parentId && le?.position), ne = {
          id: Y,
          type: "position",
          position: Q ? {
            x: Math.max(0, le.position.x),
            y: Math.max(0, le.position.y)
          } : le.position,
          dragging: R
        };
        if (q && k.inProgress && k.fromNode.id === q.id) {
          const L = jr(q, k.fromHandle, ke.Left, !0);
          H({ ...k, from: L });
        }
        Q && q.parentId && j.push({
          id: Y,
          parentId: q.parentId,
          rect: {
            ...le.internals.positionAbsolute,
            width: le.measured.width ?? 0,
            height: le.measured.height ?? 0
          }
        }), C.push(ne);
      }
      if (j.length > 0) {
        const { parentLookup: Y, nodeOrigin: le } = _(), q = Jm(j, O, Y, le);
        C.push(...q);
      }
      for (const Y of A.values())
        C = Y(C);
      B(C);
    },
    triggerNodeChanges: (N) => {
      const { onNodesChange: R, setNodes: j, nodes: C, hasDefaultNodes: O, debug: B } = _();
      if (N?.length) {
        if (O) {
          const k = QD(N, C);
          j(k);
        }
        B && console.log("React Flow: trigger node changes", N), R?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: R, setEdges: j, edges: C, hasDefaultEdges: O, debug: B } = _();
      if (N?.length) {
        if (O) {
          const k = KD(N, C);
          j(k);
        }
        B && console.log("React Flow: trigger edge changes", N), R?.(N);
      }
    },
    addSelectedNodes: (N) => {
      const { multiSelectionActive: R, edgeLookup: j, nodeLookup: C, triggerNodeChanges: O, triggerEdgeChanges: B } = _();
      if (R) {
        const k = N.map((H) => Sr(H, !0));
        O(k);
        return;
      }
      O(Sl(C, /* @__PURE__ */ new Set([...N]), !0)), B(Sl(j));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: R, edgeLookup: j, nodeLookup: C, triggerNodeChanges: O, triggerEdgeChanges: B } = _();
      if (R) {
        const k = N.map((H) => Sr(H, !0));
        B(k);
        return;
      }
      B(Sl(j, /* @__PURE__ */ new Set([...N]))), O(Sl(C, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: N, edges: R } = {}) => {
      const { edges: j, nodes: C, nodeLookup: O, triggerNodeChanges: B, triggerEdgeChanges: k } = _(), H = N || C, A = R || j, Y = [];
      for (const q of H) {
        if (!q.selected)
          continue;
        const Q = O.get(q.id);
        Q && (Q.selected = !1), Y.push(Sr(q.id, !1));
      }
      const le = [];
      for (const q of A)
        q.selected && le.push(Sr(q.id, !1));
      B(Y), k(le);
    },
    setMinZoom: (N) => {
      const { panZoom: R, maxZoom: j } = _();
      R?.setScaleExtent([N, j]), x({ minZoom: N });
    },
    setMaxZoom: (N) => {
      const { panZoom: R, minZoom: j } = _();
      R?.setScaleExtent([j, N]), x({ maxZoom: N });
    },
    setTranslateExtent: (N) => {
      _().panZoom?.setTranslateExtent(N), x({ translateExtent: N });
    },
    resetSelectedElements: () => {
      const { edges: N, nodes: R, triggerNodeChanges: j, triggerEdgeChanges: C, elementsSelectable: O } = _();
      if (!O)
        return;
      const B = R.reduce((H, A) => A.selected ? [...H, Sr(A.id, !1)] : H, []), k = N.reduce((H, A) => A.selected ? [...H, Sr(A.id, !1)] : H, []);
      j(B), C(k);
    },
    setNodeExtent: (N) => {
      const { nodes: R, nodeLookup: j, parentLookup: C, nodeOrigin: O, elevateNodesOnSelect: B, nodeExtent: k, zIndexMode: H } = _();
      N[0][0] === k[0][0] && N[0][1] === k[0][1] && N[1][0] === k[1][0] && N[1][1] === k[1][1] || (am(R, j, C, {
        nodeOrigin: O,
        nodeExtent: N,
        elevateNodesOnSelect: B,
        checkEquality: !1,
        zIndexMode: H
      }), x({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: R, width: j, height: C, panZoom: O, translateExtent: B } = _();
      return PA({ delta: N, panZoom: O, transform: R, translateExtent: B, width: j, height: C });
    },
    setCenter: async (N, R, j) => {
      const { width: C, height: O, maxZoom: B, panZoom: k } = _();
      if (!k)
        return !1;
      const H = typeof j?.zoom < "u" ? j.zoom : B;
      return await k.setViewport({
        x: C / 2 - N * H,
        y: O / 2 - R * H,
        zoom: H
      }, { duration: j?.duration, ease: j?.ease, interpolate: j?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...rw }
      });
    },
    updateConnection: (N) => {
      x({ connection: N });
    },
    reset: () => x({ ...$b() })
  };
}, Object.is);
function u_({ initialNodes: e, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: y, nodeExtent: g, zIndexMode: b, children: x }) {
  const [_] = S.useState(() => gj({
    nodes: e,
    edges: a,
    defaultNodes: r,
    defaultEdges: l,
    width: s,
    height: u,
    fitView: m,
    minZoom: c,
    maxZoom: d,
    fitViewOptions: p,
    nodeOrigin: y,
    nodeExtent: g,
    zIndexMode: b
  }));
  return v.jsx(AD, { value: _, children: v.jsx(a4, { children: x }) });
}
function vj({ children: e, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: b, zIndexMode: x }) {
  return S.useContext(Yc) ? v.jsx(v.Fragment, { children: e }) : v.jsx(u_, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: g, nodeExtent: b, zIndexMode: x, children: e });
}
const yj = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function bj({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: y, onMoveStart: g, onMoveEnd: b, onConnect: x, onConnectStart: _, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: R, onNodeMouseEnter: j, onNodeMouseMove: C, onNodeMouseLeave: O, onNodeContextMenu: B, onNodeDoubleClick: k, onNodeDragStart: H, onNodeDrag: A, onNodeDragStop: Y, onNodesDelete: le, onEdgesDelete: q, onDelete: Q, onSelectionChange: ne, onSelectionDragStart: L, onSelectionDrag: I, onSelectionDragStop: T, onSelectionContextMenu: z, onSelectionStart: G, onSelectionEnd: F, onBeforeDelete: te, connectionMode: D, connectionLineType: V = Qi.Bezier, connectionLineStyle: Z, connectionLineComponent: ee, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: J = !1, selectionMode: ve = Jo.Full, panActivationKeyCode: Oe = "Space", multiSelectionKeyCode: je = es() ? "Meta" : "Control", zoomActivationKeyCode: Ee = es() ? "Meta" : "Control", snapToGrid: we, snapGrid: Me, onlyRenderVisibleElements: Ye = !1, selectNodesOnDrag: ye, nodesDraggable: pe, autoPanOnNodeFocus: _e, nodesConnectable: Re, nodesFocusable: Ae, nodeOrigin: lt = Hw, edgesFocusable: Ze, edgesReconnectable: Fe, elementsSelectable: Ke = !0, defaultViewport: vt = ID, minZoom: yt = 0.5, maxZoom: Yt = 2, translateExtent: Lt = Ko, preventScrolling: pt = !0, nodeExtent: ut, defaultMarkerColor: Zn = "#b1b1b7", zoomOnScroll: _n = !0, zoomOnPinch: nn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = Rr.Free, zoomOnDoubleClick: yi = !0, panOnDrag: Ma = !0, onPaneClick: Sn, onPaneMouseEnter: ha, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: fn, onPaneContextMenu: Ve, paneClickDistance: bt = 1, nodeClickDistance: kt = 0, children: Vt, onReconnect: gn, onReconnectStart: gt, onReconnectEnd: Jt, onEdgeContextMenu: ma, onEdgeDoubleClick: en, onEdgeMouseEnter: U, onEdgeMouseMove: P, onEdgeMouseLeave: W, reconnectRadius: de = 10, onNodesChange: ge, onEdgesChange: Ce, noDragClassName: xe = "nodrag", noWheelClassName: Ne = "nowheel", noPanClassName: Se = "nopan", fitView: ze, fitViewOptions: Le, connectOnClick: qe, attributionPosition: Be, proOptions: Pe, defaultEdgeOptions: ot, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: ct = !1, disableKeyboardA11y: et = !1, autoPanOnConnect: zt, autoPanOnNodeDrag: it, autoPanOnSelection: Aa = !0, autoPanSpeed: kn, connectionRadius: dn, isValidConnection: an, onError: En, style: bi, id: Nn, nodeDragThreshold: xi, connectionDragThreshold: pa, viewport: ga, onViewportChange: $e, width: xt, height: vn, colorMode: Hn = "light", debug: wi, onScroll: Fa, ariaLabelConfig: ht, zIndexMode: Kn = "basic", ...rn }, nr) {
  const kr = Nn || "1", Hl = XD(Hn), _i = S.useCallback((Bl) => {
    Bl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Fa?.(Bl);
  }, [Fa]);
  return v.jsx("div", { "data-testid": "rf__wrapper", ...rn, onScroll: _i, style: { ...bi, ...yj }, ref: nr, className: Zt(["react-flow", s, Hl]), id: Nn, role: "application", children: v.jsxs(vj, { nodes: e, edges: a, width: xt, height: vn, fitView: ze, fitViewOptions: Le, minZoom: yt, maxZoom: Yt, nodeOrigin: lt, nodeExtent: ut, zIndexMode: Kn, children: [v.jsx(FD, { nodes: e, edges: a, defaultNodes: r, defaultEdges: l, onConnect: x, onConnectStart: _, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: R, nodesDraggable: pe, autoPanOnNodeFocus: _e, nodesConnectable: Re, nodesFocusable: Ae, edgesFocusable: Ze, edgesReconnectable: Fe, elementsSelectable: Ke, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: ct, minZoom: yt, maxZoom: Yt, nodeExtent: ut, onNodesChange: ge, onEdgesChange: Ce, snapToGrid: we, snapGrid: Me, connectionMode: D, translateExtent: Lt, connectOnClick: qe, defaultEdgeOptions: ot, fitView: ze, fitViewOptions: Le, onNodesDelete: le, onEdgesDelete: q, onDelete: Q, onNodeDragStart: H, onNodeDrag: A, onNodeDragStop: Y, onSelectionDrag: I, onSelectionDragStart: L, onSelectionDragStop: T, onMove: y, onMoveStart: g, onMoveEnd: b, noPanClassName: Se, nodeOrigin: lt, rfId: kr, autoPanOnConnect: zt, autoPanOnNodeDrag: it, autoPanSpeed: kn, onError: En, connectionRadius: dn, isValidConnection: an, selectNodesOnDrag: ye, nodeDragThreshold: xi, connectionDragThreshold: pa, onBeforeDelete: te, debug: wi, ariaLabelConfig: ht, zIndexMode: Kn }), v.jsx(mj, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: j, onNodeMouseMove: C, onNodeMouseLeave: O, onNodeContextMenu: B, onNodeDoubleClick: k, nodeTypes: u, edgeTypes: c, connectionLineType: V, connectionLineStyle: Z, connectionLineComponent: ee, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: J, selectionMode: ve, deleteKeyCode: he, multiSelectionKeyCode: je, panActivationKeyCode: Oe, zoomActivationKeyCode: Ee, onlyRenderVisibleElements: Ye, defaultViewport: vt, translateExtent: Lt, minZoom: yt, maxZoom: Yt, preventScrolling: pt, zoomOnScroll: _n, zoomOnPinch: nn, zoomOnDoubleClick: yi, panOnScroll: Kt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: Ma, autoPanOnSelection: Aa, onPaneClick: Sn, onPaneMouseEnter: ha, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: fn, onPaneContextMenu: Ve, paneClickDistance: bt, nodeClickDistance: kt, onSelectionContextMenu: z, onSelectionStart: G, onSelectionEnd: F, onReconnect: gn, onReconnectStart: gt, onReconnectEnd: Jt, onEdgeContextMenu: ma, onEdgeDoubleClick: en, onEdgeMouseEnter: U, onEdgeMouseMove: P, onEdgeMouseLeave: W, reconnectRadius: de, defaultMarkerColor: Zn, noDragClassName: xe, noWheelClassName: Ne, noPanClassName: Se, rfId: kr, disableKeyboardA11y: et, nodeExtent: ut, viewport: ga, onViewportChange: $e }), v.jsx(qD, { onSelectionChange: ne }), Vt, v.jsx(HD, { proOptions: Pe, position: Be }), v.jsx(kD, { rfId: kr, disableKeyboardA11y: et })] }) });
}
var xj = Uw(bj);
function wj({ dimensions: e, lineWidth: a, variant: r, className: l }) {
  return v.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Zt(["react-flow__background-pattern", r, l]) });
}
function _j({ radius: e, className: a }) {
  return v.jsx("circle", { cx: e, cy: e, r: e, className: Zt(["react-flow__background-pattern", "dots", a]) });
}
var Ia;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ia || (Ia = {}));
const Sj = {
  [Ia.Dots]: 1,
  [Ia.Lines]: 1,
  [Ia.Cross]: 6
}, Ej = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function c_({
  id: e,
  variant: a = Ia.Dots,
  // only used for dots and cross
  gap: r = 20,
  // only used for lines and cross
  size: l,
  lineWidth: s = 1,
  offset: u = 0,
  color: c,
  bgColor: d,
  style: p,
  className: m,
  patternClassName: y
}) {
  const g = S.useRef(null), { transform: b, patternId: x } = st(Ej, Dt), _ = l || Sj[a], E = a === Ia.Dots, N = a === Ia.Cross, R = Array.isArray(r) ? r : [r, r], j = [R[0] * b[2] || 1, R[1] * b[2] || 1], C = _ * b[2], O = Array.isArray(u) ? u : [u, u], B = N ? [C, C] : j, k = [
    O[0] * b[2] || 1 + B[0] / 2,
    O[1] * b[2] || 1 + B[1] / 2
  ], H = `${x}${e || ""}`;
  return v.jsxs("svg", { className: Zt(["react-flow__background", m]), style: {
    ...p,
    ...Fc,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [v.jsx("pattern", { id: H, x: b[0] % j[0], y: b[1] % j[1], width: j[0], height: j[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${k[0]},-${k[1]})`, children: E ? v.jsx(_j, { radius: C / 2, className: y }) : v.jsx(wj, { dimensions: B, lineWidth: s, variant: a, className: y }) }), v.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${H})` })] });
}
c_.displayName = "Background";
const qb = S.memo(c_);
function Nj() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: v.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function Cj() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: v.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function Rj() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: v.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function Tj() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: v.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function Mj() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: v.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Bu({ children: e, className: a, ...r }) {
  return v.jsx("button", { type: "button", className: Zt(["react-flow__controls-button", a]), ...r, children: e });
}
const Aj = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function f_({ style: e, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: y, position: g = "bottom-left", orientation: b = "vertical", "aria-label": x }) {
  const _ = jt(), { isInteractive: E, minZoomReached: N, maxZoomReached: R, ariaLabelConfig: j } = st(Aj, Dt), { zoomIn: C, zoomOut: O, fitView: B } = Wm(), k = () => {
    C(), u?.();
  }, H = () => {
    O(), c?.();
  }, A = () => {
    B(s), d?.();
  }, Y = () => {
    _.setState({
      nodesDraggable: !E,
      nodesConnectable: !E,
      elementsSelectable: !E
    }), p?.(!E);
  }, le = b === "horizontal" ? "horizontal" : "vertical";
  return v.jsxs(Gc, { className: Zt(["react-flow__controls", le, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? j["controls.ariaLabel"], children: [a && v.jsxs(v.Fragment, { children: [v.jsx(Bu, { onClick: k, className: "react-flow__controls-zoomin", title: j["controls.zoomIn.ariaLabel"], "aria-label": j["controls.zoomIn.ariaLabel"], disabled: R, children: v.jsx(Nj, {}) }), v.jsx(Bu, { onClick: H, className: "react-flow__controls-zoomout", title: j["controls.zoomOut.ariaLabel"], "aria-label": j["controls.zoomOut.ariaLabel"], disabled: N, children: v.jsx(Cj, {}) })] }), r && v.jsx(Bu, { className: "react-flow__controls-fitview", onClick: A, title: j["controls.fitView.ariaLabel"], "aria-label": j["controls.fitView.ariaLabel"], children: v.jsx(Rj, {}) }), l && v.jsx(Bu, { className: "react-flow__controls-interactive", onClick: Y, title: j["controls.interactive.ariaLabel"], "aria-label": j["controls.interactive.ariaLabel"], children: E ? v.jsx(Mj, {}) : v.jsx(Tj, {}) }), y] });
}
f_.displayName = "Controls";
const Dj = S.memo(f_);
function jj({ id: e, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: y, shapeRendering: g, selected: b, onClick: x }) {
  const { background: _, backgroundColor: E } = u || {}, N = c || _ || E;
  return v.jsx("rect", { className: Zt(["react-flow__minimap-node", { selected: b }, m]), x: a, y: r, rx: y, ry: y, width: l, height: s, style: {
    fill: N,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (R) => x(R, e) : void 0 });
}
const Oj = S.memo(jj), zj = (e) => e.nodes.map((a) => a.id), Nh = (e) => e instanceof Function ? e : () => e;
function Lj({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = Oj,
  onClick: c
}) {
  const d = st(zj, Dt), p = Nh(a), m = Nh(e), y = Nh(r), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return v.jsx(v.Fragment, { children: d.map((b) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    v.jsx(Hj, { id: b, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, b)
  )) });
}
function kj({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: y, y: g, width: b, height: x } = st((_) => {
    const E = _.nodeLookup.get(e);
    if (!E)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = E.internals.userNode, { x: R, y: j } = E.internals.positionAbsolute, { width: C, height: O } = vi(N);
    return {
      node: N,
      x: R,
      y: j,
      width: C,
      height: O
    };
  }, Dt);
  return !m || m.hidden || !dw(m) ? null : v.jsx(d, { x: y, y: g, width: b, height: x, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const Hj = S.memo(kj);
var Bj = S.memo(Lj);
const Uj = 200, Vj = 150, $j = (e) => !e.hidden, qj = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? cw(ms(e.nodeLookup, { filter: $j }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, Ij = "react-flow__minimap-desc";
function d_({
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
  maskColor: m,
  maskStrokeColor: y,
  maskStrokeWidth: g,
  position: b = "bottom-right",
  onClick: x,
  onNodeClick: _,
  pannable: E = !1,
  zoomable: N = !1,
  ariaLabel: R,
  inversePan: j,
  zoomStep: C = 1,
  offsetScale: O = 5
}) {
  const B = jt(), k = S.useRef(null), { boundingRect: H, viewBB: A, rfId: Y, panZoom: le, translateExtent: q, flowWidth: Q, flowHeight: ne, ariaLabelConfig: L } = st(qj, Dt), I = e?.width ?? Uj, T = e?.height ?? Vj, z = H.width / I, G = H.height / T, F = Math.max(z, G), te = F * I, D = F * T, V = O * F, Z = H.x - (te - H.width) / 2 - V, ee = H.y - (D - H.height) / 2 - V, se = te + V * 2, he = D + V * 2, me = `${Ij}-${Y}`, J = S.useRef(0), ve = S.useRef();
  J.current = F, S.useEffect(() => {
    if (k.current && le)
      return ve.current = aD({
        domNode: k.current,
        panZoom: le,
        getTransform: () => B.getState().transform,
        getViewScale: () => J.current
      }), () => {
        ve.current?.destroy();
      };
  }, [le]), S.useEffect(() => {
    ve.current?.update({
      translateExtent: q,
      width: Q,
      height: ne,
      inversePan: j,
      pannable: E,
      zoomStep: C,
      zoomable: N
    });
  }, [E, N, j, C, q, Q, ne]);
  const Oe = x ? (we) => {
    const [Me, Ye] = ve.current?.pointer(we) || [0, 0];
    x(we, { x: Me, y: Ye });
  } : void 0, je = _ ? S.useCallback((we, Me) => {
    const Ye = B.getState().nodeLookup.get(Me).internals.userNode;
    _(we, Ye);
  }, []) : void 0, Ee = R ?? L["minimap.ariaLabel"];
  return v.jsx(Gc, { position: b, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * F : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Zt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: v.jsxs("svg", { width: I, height: T, viewBox: `${Z} ${ee} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: k, onClick: Oe, children: [Ee && v.jsx("title", { id: me, children: Ee }), v.jsx(Bj, { onClick: je, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), v.jsx("path", { className: "react-flow__minimap-mask", d: `M${Z - V},${ee - V}h${se + V * 2}v${he + V * 2}h${-se - V * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
d_.displayName = "MiniMap";
const Yj = S.memo(d_), Gj = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, Fj = {
  [zl.Line]: "right",
  [zl.Handle]: "bottom-right"
};
function Xj({ nodeId: e, position: a, variant: r = zl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: b, autoScale: x = !0, shouldResize: _, onResizeStart: E, onResize: N, onResizeEnd: R }) {
  const j = Iw(), C = typeof e == "string" ? e : j, O = jt(), B = S.useRef(null), k = r === zl.Handle, H = st(S.useCallback(Gj(k && x), [k, x]), Dt), A = S.useRef(null), Y = a ?? Fj[r];
  S.useEffect(() => {
    if (!(!B.current || !C))
      return A.current || (A.current = gD({
        domNode: B.current,
        nodeId: C,
        getStoreItems: () => {
          const { nodeLookup: q, transform: Q, snapGrid: ne, snapToGrid: L, nodeOrigin: I, domNode: T } = O.getState();
          return {
            nodeLookup: q,
            transform: Q,
            snapGrid: ne,
            snapToGrid: L,
            nodeOrigin: I,
            paneDomNode: T
          };
        },
        onChange: (q, Q) => {
          const { triggerNodeChanges: ne, nodeLookup: L, parentLookup: I, nodeOrigin: T } = O.getState(), z = [], G = { x: q.x, y: q.y }, F = L.get(C);
          if (F && F.expandParent && F.parentId) {
            const te = F.origin ?? T, D = q.width ?? F.measured.width ?? 0, V = q.height ?? F.measured.height ?? 0, Z = {
              id: F.id,
              parentId: F.parentId,
              rect: {
                width: D,
                height: V,
                ...hw({
                  x: q.x ?? F.position.x,
                  y: q.y ?? F.position.y
                }, { width: D, height: V }, F.parentId, L, te)
              }
            }, ee = Jm([Z], L, I, T);
            z.push(...ee), G.x = q.x ? Math.max(te[0] * D, q.x) : void 0, G.y = q.y ? Math.max(te[1] * V, q.y) : void 0;
          }
          if (G.x !== void 0 && G.y !== void 0) {
            const te = {
              id: C,
              type: "position",
              position: { ...G }
            };
            z.push(te);
          }
          if (q.width !== void 0 && q.height !== void 0) {
            const D = {
              id: C,
              type: "dimensions",
              resizing: !0,
              setAttributes: b ? b === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: q.width,
                height: q.height
              }
            };
            z.push(D);
          }
          for (const te of Q) {
            const D = {
              ...te,
              type: "position"
            };
            z.push(D);
          }
          ne(z);
        },
        onEnd: ({ width: q, height: Q }) => {
          const ne = {
            id: C,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: q,
              height: Q
            }
          };
          O.getState().triggerNodeChanges([ne]);
        }
      })), A.current.update({
        controlPosition: Y,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: g,
        resizeDirection: b,
        onResizeStart: E,
        onResize: N,
        onResizeEnd: R,
        shouldResize: _
      }), () => {
        A.current?.destroy();
      };
  }, [
    Y,
    d,
    p,
    m,
    y,
    g,
    E,
    N,
    R,
    _
  ]);
  const le = Y.split("-");
  return v.jsx("div", { className: Zt(["react-flow__resize-control", "nodrag", ...le, r, l]), ref: B, style: {
    ...s,
    scale: H,
    ...c && { [k ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
S.memo(Xj);
var Pj = "_1bllf8b0", Zj = "_1bllf8b1";
const Ib = 16, Qj = "rgba(186, 158, 255, 0.14)", Kj = "rgba(186, 158, 255, 0.06)", Jj = "rgba(0, 0, 0, 0.6)", Wj = "#1d2023", e3 = "#ba9eff";
function t3({
  nodes: e,
  edges: a,
  nodeTypes: r,
  showMiniMap: l = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: d,
  children: p,
  onNodeClick: m
}) {
  const y = [Pj, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("div", { className: y, "aria-label": d ?? "node graph", children: /* @__PURE__ */ v.jsxs(
    xj,
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
      onNodeClick: (g, b) => m?.(b),
      children: [
        /* @__PURE__ */ v.jsx(
          qb,
          {
            id: "minor",
            variant: Ia.Dots,
            gap: Ib,
            size: 1.1,
            color: Qj
          }
        ),
        /* @__PURE__ */ v.jsx(
          qb,
          {
            id: "major",
            variant: Ia.Lines,
            gap: Ib * 5,
            lineWidth: 1,
            color: Kj
          }
        ),
        s && /* @__PURE__ */ v.jsx(Dj, { showInteractive: !1 }),
        l && /* @__PURE__ */ v.jsx(
          Yj,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: Jj,
            nodeColor: () => Wj,
            nodeStrokeColor: () => e3,
            className: Zj
          }
        ),
        p
      ]
    }
  ) });
}
function n3(e) {
  return /* @__PURE__ */ v.jsx(u_, { children: /* @__PURE__ */ v.jsx(t3, { ...e }) });
}
var a3 = "a9gtw0", i3 = "a9gtw1", r3 = "a9gtw2", l3 = "a9gtw3", o3 = "a9gtw4", s3 = "a9gtw5", u3 = "a9gtw6", c3 = "a9gtw7";
const f3 = {
  default: "",
  raised: i3,
  inset: r3
};
function Ba({
  title: e,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [a3, f3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("section", { className: c, children: [
    (e || r) && /* @__PURE__ */ v.jsxs("header", { className: l3, children: [
      /* @__PURE__ */ v.jsxs("div", { className: o3, children: [
        e && /* @__PURE__ */ v.jsx("span", { className: u3, children: e }),
        a && /* @__PURE__ */ v.jsx("span", { className: c3, children: a })
      ] }),
      r && /* @__PURE__ */ v.jsx("div", { className: s3, children: r })
    ] }),
    l
  ] });
}
const tp = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function np() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function _c() {
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
    stageStates: np()
  };
}
function Yb(e, a, r = Date.now()) {
  return {
    ..._c(),
    phase: "running",
    jobId: e,
    lastFrameAt: r,
    stageStates: {
      ...np(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function d3(e, a, r = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: g3(a.params.fraction),
        stage: a.params.stage ?? l.stage,
        stageDetail: a.params.detail ?? l.stageDetail
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: x3(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: y3(
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
        stageStates: h_(l.stageStates)
      };
    default:
      return l;
  }
}
function h3(e) {
  return { ...e, phase: "cancelled", stageStates: np() };
}
const m3 = -32108;
function p3(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: m3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: h_(e.stageStates)
  };
}
function Gb(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function zo(e) {
  const a = _c();
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
function g3(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const v3 = 0.3;
function y3(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + v3 * (a - e);
}
function b3(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), r = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + r * e.totalSteps) * e.secondsPerStep;
}
function x3(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function h_(e) {
  const a = { ...e };
  for (const r of tp)
    a[r] === "active" && (a[r] = "error");
  return a;
}
function w3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
const _3 = (e) => {
  switch (e) {
    case "success":
      return N3;
    case "info":
      return R3;
    case "warning":
      return C3;
    case "error":
      return T3;
    default:
      return null;
  }
}, S3 = Array(12).fill(0), E3 = ({ visible: e, className: a }) => /* @__PURE__ */ be.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ be.createElement("div", {
  className: "sonner-spinner"
}, S3.map((r, l) => /* @__PURE__ */ be.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), N3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), C3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), R3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), T3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), M3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ be.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ be.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), A3 = () => {
  const [e, a] = be.useState(document.hidden);
  return be.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), e;
};
let lm = 1;
class D3 {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : lm++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
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
      const d = s.then(async (m) => {
        if (c = [
          "resolve",
          m
        ], be.isValidElement(m))
          u = !1, this.create({
            id: l,
            type: "default",
            message: m
          });
        else if (O3(m) && !m.ok) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${m.status}`) : r.error, b = typeof r.description == "function" ? await r.description(`HTTP error! status: ${m.status}`) : r.description, _ = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ..._
          });
        } else if (m instanceof Error) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(m) : r.error, b = typeof r.description == "function" ? await r.description(m) : r.description, _ = typeof g == "object" && !be.isValidElement(g) ? g : {
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
          const g = typeof r.success == "function" ? await r.success(m) : r.success, b = typeof r.description == "function" ? await r.description(m) : r.description, _ = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "success",
            description: b,
            ..._
          });
        }
      }).catch(async (m) => {
        if (c = [
          "reject",
          m
        ], r.error !== void 0) {
          u = !1;
          const y = typeof r.error == "function" ? await r.error(m) : r.error, g = typeof r.description == "function" ? await r.description(m) : r.description, x = typeof y == "object" && !be.isValidElement(y) ? y : {
            message: y
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
      }), p = () => new Promise((m, y) => d.then(() => c[0] === "reject" ? y(c[1]) : m(c[1])).catch(y));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: p
      } : Object.assign(l, {
        unwrap: p
      });
    }, this.custom = (a, r) => {
      const l = r?.id || lm++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const jn = new D3(), j3 = (e, a) => {
  const r = a?.id || lm++;
  return jn.addToast({
    title: e,
    ...a,
    id: r
  }), r;
}, O3 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", z3 = j3, L3 = () => jn.toasts, k3 = () => jn.getActiveToasts(), $a = Object.assign(z3, {
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
  getHistory: L3,
  getToasts: k3
});
w3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Uu(e) {
  return e.label !== void 0;
}
const H3 = 3, B3 = "24px", U3 = "16px", Fb = 4e3, V3 = 356, $3 = 14, q3 = 45, I3 = 200;
function ka(...e) {
  return e.filter(Boolean).join(" ");
}
function Y3(e) {
  const [a, r] = e.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const G3 = (e) => {
  var a, r, l, s, u, c, d, p, m;
  const { invert: y, toast: g, unstyled: b, interacting: x, setHeights: _, visibleToasts: E, heights: N, index: R, toasts: j, expanded: C, removeToast: O, defaultRichColors: B, closeButton: k, style: H, cancelButtonStyle: A, actionButtonStyle: Y, className: le = "", descriptionClassName: q = "", duration: Q, position: ne, gap: L, expandByDefault: I, classNames: T, icons: z, closeButtonAriaLabel: G = "Close toast" } = e, [F, te] = be.useState(null), [D, V] = be.useState(null), [Z, ee] = be.useState(!1), [se, he] = be.useState(!1), [me, J] = be.useState(!1), [ve, Oe] = be.useState(!1), [je, Ee] = be.useState(!1), [we, Me] = be.useState(0), [Ye, ye] = be.useState(0), pe = be.useRef(g.duration || Q || Fb), _e = be.useRef(null), Re = be.useRef(null), Ae = R === 0, lt = R + 1 <= E, Ze = g.type, Fe = g.dismissible !== !1, Ke = g.className || "", vt = g.descriptionClassName || "", yt = be.useMemo(() => N.findIndex((Ve) => Ve.toastId === g.id) || 0, [
    N,
    g.id
  ]), Yt = be.useMemo(() => {
    var Ve;
    return (Ve = g.closeButton) != null ? Ve : k;
  }, [
    g.closeButton,
    k
  ]), Lt = be.useMemo(() => g.duration || Q || Fb, [
    g.duration,
    Q
  ]), pt = be.useRef(0), ut = be.useRef(0), Zn = be.useRef(0), _n = be.useRef(null), [nn, Kt] = ne.split("-"), Ot = be.useMemo(() => N.reduce((Ve, bt, kt) => kt >= yt ? Ve : Ve + bt.height, 0), [
    N,
    yt
  ]), Ut = A3(), yi = g.invert || y, Ma = Ze === "loading";
  ut.current = be.useMemo(() => yt * L + Ot, [
    yt,
    Ot
  ]), be.useEffect(() => {
    pe.current = Lt;
  }, [
    Lt
  ]), be.useEffect(() => {
    ee(!0);
  }, []), be.useEffect(() => {
    const Ve = Re.current;
    if (Ve) {
      const bt = Ve.getBoundingClientRect().height;
      return ye(bt), _((kt) => [
        {
          toastId: g.id,
          height: bt,
          position: g.position
        },
        ...kt
      ]), () => _((kt) => kt.filter((Vt) => Vt.toastId !== g.id));
    }
  }, [
    _,
    g.id
  ]), be.useLayoutEffect(() => {
    if (!Z) return;
    const Ve = Re.current, bt = Ve.style.height;
    Ve.style.height = "auto";
    const kt = Ve.getBoundingClientRect().height;
    Ve.style.height = bt, ye(kt), _((Vt) => Vt.find((gt) => gt.toastId === g.id) ? Vt.map((gt) => gt.toastId === g.id ? {
      ...gt,
      height: kt
    } : gt) : [
      {
        toastId: g.id,
        height: kt,
        position: g.position
      },
      ...Vt
    ]);
  }, [
    Z,
    g.title,
    g.description,
    _,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const Sn = be.useCallback(() => {
    he(!0), Me(ut.current), _((Ve) => Ve.filter((bt) => bt.toastId !== g.id)), setTimeout(() => {
      O(g);
    }, I3);
  }, [
    g,
    O,
    _,
    ut
  ]);
  be.useEffect(() => {
    if (g.promise && Ze === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let Ve;
    return C || x || Ut ? (() => {
      if (Zn.current < pt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - pt.current;
        pe.current = pe.current - Vt;
      }
      Zn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      pe.current !== 1 / 0 && (pt.current = (/* @__PURE__ */ new Date()).getTime(), Ve = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), Sn();
      }, pe.current));
    })(), () => clearTimeout(Ve);
  }, [
    C,
    x,
    g,
    Ze,
    Ut,
    Sn
  ]), be.useEffect(() => {
    g.delete && (Sn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    Sn,
    g.delete
  ]);
  function ha() {
    var Ve;
    if (z?.loading) {
      var bt;
      return /* @__PURE__ */ be.createElement("div", {
        className: ka(T?.loader, g == null || (bt = g.classNames) == null ? void 0 : bt.loader, "sonner-loader"),
        "data-visible": Ze === "loading"
      }, z.loading);
    }
    return /* @__PURE__ */ be.createElement(E3, {
      className: ka(T?.loader, g == null || (Ve = g.classNames) == null ? void 0 : Ve.loader),
      visible: Ze === "loading"
    });
  }
  const Ln = g.icon || z?.[Ze] || _3(Ze);
  var Qn, fn;
  return /* @__PURE__ */ be.createElement("li", {
    tabIndex: 0,
    ref: Re,
    className: ka(le, Ke, T?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, T?.default, T?.[Ze], g == null || (r = g.classNames) == null ? void 0 : r[Ze]),
    "data-sonner-toast": "",
    "data-rich-colors": (Qn = g.richColors) != null ? Qn : B,
    "data-styled": !(g.jsx || g.unstyled || b),
    "data-mounted": Z,
    "data-promise": !!g.promise,
    "data-swiped": je,
    "data-removed": se,
    "data-visible": lt,
    "data-y-position": nn,
    "data-x-position": Kt,
    "data-index": R,
    "data-front": Ae,
    "data-swiping": me,
    "data-dismissible": Fe,
    "data-type": Ze,
    "data-invert": yi,
    "data-swipe-out": ve,
    "data-swipe-direction": D,
    "data-expanded": !!(C || I && Z),
    "data-testid": g.testId,
    style: {
      "--index": R,
      "--toasts-before": R,
      "--z-index": j.length - R,
      "--offset": `${se ? we : ut.current}px`,
      "--initial-height": I ? "auto" : `${Ye}px`,
      ...H,
      ...g.style
    },
    onDragEnd: () => {
      J(!1), te(null), _n.current = null;
    },
    onPointerDown: (Ve) => {
      Ve.button !== 2 && (Ma || !Fe || (_e.current = /* @__PURE__ */ new Date(), Me(ut.current), Ve.target.setPointerCapture(Ve.pointerId), Ve.target.tagName !== "BUTTON" && (J(!0), _n.current = {
        x: Ve.clientX,
        y: Ve.clientY
      })));
    },
    onPointerUp: () => {
      var Ve, bt, kt;
      if (ve || !Fe) return;
      _n.current = null;
      const Vt = Number(((Ve = Re.current) == null ? void 0 : Ve.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), gn = Number(((bt = Re.current) == null ? void 0 : bt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), gt = (/* @__PURE__ */ new Date()).getTime() - ((kt = _e.current) == null ? void 0 : kt.getTime()), Jt = F === "x" ? Vt : gn, ma = Math.abs(Jt) / gt;
      if (Math.abs(Jt) >= q3 || ma > 0.11) {
        Me(ut.current), g.onDismiss == null || g.onDismiss.call(g, g), V(F === "x" ? Vt > 0 ? "right" : "left" : gn > 0 ? "down" : "up"), Sn(), Oe(!0);
        return;
      } else {
        var en, U;
        (en = Re.current) == null || en.style.setProperty("--swipe-amount-x", "0px"), (U = Re.current) == null || U.style.setProperty("--swipe-amount-y", "0px");
      }
      Ee(!1), J(!1), te(null);
    },
    onPointerMove: (Ve) => {
      var bt, kt, Vt;
      if (!_n.current || !Fe || ((bt = window.getSelection()) == null ? void 0 : bt.toString().length) > 0) return;
      const gt = Ve.clientY - _n.current.y, Jt = Ve.clientX - _n.current.x;
      var ma;
      const en = (ma = e.swipeDirections) != null ? ma : Y3(ne);
      !F && (Math.abs(Jt) > 1 || Math.abs(gt) > 1) && te(Math.abs(Jt) > Math.abs(gt) ? "x" : "y");
      let U = {
        x: 0,
        y: 0
      };
      const P = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if (F === "y") {
        if (en.includes("top") || en.includes("bottom"))
          if (en.includes("top") && gt < 0 || en.includes("bottom") && gt > 0)
            U.y = gt;
          else {
            const W = gt * P(gt);
            U.y = Math.abs(W) < Math.abs(gt) ? W : gt;
          }
      } else if (F === "x" && (en.includes("left") || en.includes("right")))
        if (en.includes("left") && Jt < 0 || en.includes("right") && Jt > 0)
          U.x = Jt;
        else {
          const W = Jt * P(Jt);
          U.x = Math.abs(W) < Math.abs(Jt) ? W : Jt;
        }
      (Math.abs(U.x) > 0 || Math.abs(U.y) > 0) && Ee(!0), (kt = Re.current) == null || kt.style.setProperty("--swipe-amount-x", `${U.x}px`), (Vt = Re.current) == null || Vt.style.setProperty("--swipe-amount-y", `${U.y}px`);
    }
  }, Yt && !g.jsx && Ze !== "loading" ? /* @__PURE__ */ be.createElement("button", {
    "aria-label": G,
    "data-disabled": Ma,
    "data-close-button": !0,
    onClick: Ma || !Fe ? () => {
    } : () => {
      Sn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: ka(T?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (fn = z?.close) != null ? fn : M3) : null, (Ze || g.icon || g.promise) && g.icon !== null && (z?.[Ze] !== null || g.icon) ? /* @__PURE__ */ be.createElement("div", {
    "data-icon": "",
    className: ka(T?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ha() : null, g.type !== "loading" ? Ln : null) : null, /* @__PURE__ */ be.createElement("div", {
    "data-content": "",
    className: ka(T?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ be.createElement("div", {
    "data-title": "",
    className: ka(T?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ be.createElement("div", {
    "data-description": "",
    className: ka(q, vt, T?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ be.isValidElement(g.cancel) ? g.cancel : g.cancel && Uu(g.cancel) ? /* @__PURE__ */ be.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (Ve) => {
      Uu(g.cancel) && Fe && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, Ve), Sn());
    },
    className: ka(T?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ be.isValidElement(g.action) ? g.action : g.action && Uu(g.action) ? /* @__PURE__ */ be.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || Y,
    onClick: (Ve) => {
      Uu(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, Ve), !Ve.defaultPrevented && Sn());
    },
    className: ka(T?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function Xb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function F3(e, a) {
  const r = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? U3 : B3;
    function p(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        r[`${c}-${y}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof l == "number" || typeof l == "string" ? p(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      l[m] === void 0 ? r[`${c}-${m}`] = d : r[`${c}-${m}`] = typeof l[m] == "number" ? `${l[m]}px` : l[m];
    }) : p(d);
  }), r;
}
const X3 = /* @__PURE__ */ be.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: y, mobileOffset: g, theme: b = "light", richColors: x, duration: _, style: E, visibleToasts: N = H3, toastOptions: R, dir: j = Xb(), gap: C = $3, icons: O, containerAriaLabel: B = "Notifications" } = a, [k, H] = be.useState([]), A = be.useMemo(() => l ? k.filter((Z) => Z.toasterId === l) : k.filter((Z) => !Z.toasterId), [
    k,
    l
  ]), Y = be.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((Z) => Z.position).map((Z) => Z.position)))), [
    A,
    u
  ]), [le, q] = be.useState([]), [Q, ne] = be.useState(!1), [L, I] = be.useState(!1), [T, z] = be.useState(b !== "system" ? b : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), G = be.useRef(null), F = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), te = be.useRef(null), D = be.useRef(!1), V = be.useCallback((Z) => {
    H((ee) => {
      var se;
      return (se = ee.find((he) => he.id === Z.id)) != null && se.delete || jn.dismiss(Z.id), ee.filter(({ id: he }) => he !== Z.id);
    });
  }, []);
  return be.useEffect(() => jn.subscribe((Z) => {
    if (Z.dismiss) {
      requestAnimationFrame(() => {
        H((ee) => ee.map((se) => se.id === Z.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      MD.flushSync(() => {
        H((ee) => {
          const se = ee.findIndex((he) => he.id === Z.id);
          return se !== -1 ? [
            ...ee.slice(0, se),
            {
              ...ee[se],
              ...Z
            },
            ...ee.slice(se + 1)
          ] : [
            Z,
            ...ee
          ];
        });
      });
    });
  }), [
    k
  ]), be.useEffect(() => {
    if (b !== "system") {
      z(b);
      return;
    }
    if (b === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? z("dark") : z("light")), typeof window > "u") return;
    const Z = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Z.addEventListener("change", ({ matches: ee }) => {
        z(ee ? "dark" : "light");
      });
    } catch {
      Z.addListener(({ matches: se }) => {
        try {
          z(se ? "dark" : "light");
        } catch (he) {
          console.error(he);
        }
      });
    }
  }, [
    b
  ]), be.useEffect(() => {
    k.length <= 1 && ne(!1);
  }, [
    k
  ]), be.useEffect(() => {
    const Z = (ee) => {
      var se;
      if (c.every((J) => ee[J] || ee.code === J)) {
        var me;
        ne(!0), (me = G.current) == null || me.focus();
      }
      ee.code === "Escape" && (document.activeElement === G.current || (se = G.current) != null && se.contains(document.activeElement)) && ne(!1);
    };
    return document.addEventListener("keydown", Z), () => document.removeEventListener("keydown", Z);
  }, [
    c
  ]), be.useEffect(() => {
    if (G.current)
      return () => {
        te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null, D.current = !1);
      };
  }, [
    G.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ be.createElement("section", {
    ref: r,
    "aria-label": `${B} ${F}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, Y.map((Z, ee) => {
    var se;
    const [he, me] = Z.split("-");
    return A.length ? /* @__PURE__ */ be.createElement("ol", {
      key: Z,
      dir: j === "auto" ? Xb() : j,
      tabIndex: -1,
      ref: G,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": T,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = le[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${V3}px`,
        "--gap": `${C}px`,
        ...E,
        ...F3(y, g)
      },
      onBlur: (J) => {
        D.current && !J.currentTarget.contains(J.relatedTarget) && (D.current = !1, te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null));
      },
      onFocus: (J) => {
        J.target instanceof HTMLElement && J.target.dataset.dismissible === "false" || D.current || (D.current = !0, te.current = J.relatedTarget);
      },
      onMouseEnter: () => ne(!0),
      onMouseMove: () => ne(!0),
      onMouseLeave: () => {
        L || ne(!1);
      },
      onDragEnd: () => ne(!1),
      onPointerDown: (J) => {
        J.target instanceof HTMLElement && J.target.dataset.dismissible === "false" || I(!0);
      },
      onPointerUp: () => I(!1)
    }, A.filter((J) => !J.position && ee === 0 || J.position === Z).map((J, ve) => {
      var Oe, je;
      return /* @__PURE__ */ be.createElement(G3, {
        key: J.id,
        icons: O,
        index: ve,
        toast: J,
        defaultRichColors: x,
        duration: (Oe = R?.duration) != null ? Oe : _,
        className: R?.className,
        descriptionClassName: R?.descriptionClassName,
        invert: s,
        visibleToasts: N,
        closeButton: (je = R?.closeButton) != null ? je : p,
        interacting: L,
        position: Z,
        style: R?.style,
        unstyled: R?.unstyled,
        classNames: R?.classNames,
        cancelButtonStyle: R?.cancelButtonStyle,
        actionButtonStyle: R?.actionButtonStyle,
        closeButtonAriaLabel: R?.closeButtonAriaLabel,
        removeToast: V,
        toasts: A.filter((Ee) => Ee.position == J.position),
        heights: le.filter((Ee) => Ee.position == J.position),
        setHeights: q,
        expandByDefault: d,
        gap: C,
        expanded: Q,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), m_ = [
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
], Pc = [
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
    key: "sigma_preset",
    label: "Schedule",
    tier: "quality",
    control: "select",
    default: "auto",
    options: [
      { value: "auto", label: "Auto (flow-match)" },
      { value: "distilled_4step", label: "Distilled 4-step (lightx2v / Lightning)" }
    ],
    help: "Auto = standard flow-match for fp8/bf16 base models. Distilled 4-step = exact lightx2v/Lightning sigmas [1.0, 0.9375, 0.833, 0.625] for NVFP4-Sparse / Lightning-distilled weights — forces 4 steps (2 high + 2 low) + CFG off; Steps / Guidance / Sigma-shift are ignored. Pure-noise output on distilled weights means you need this."
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
function P3(e) {
  return Pc.filter((a) => a.tier === e);
}
function Z3() {
  const e = {};
  for (const a of Pc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function Ch(e) {
  return {
    ...Z3(),
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
function Pb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const p_ = 1, Q3 = "nexus.video.svi2-pro.recipe", K3 = ["ref_image_path", "last_image_path"];
function g_(e) {
  return `${Q3}.${e}`;
}
function v_() {
  try {
    return typeof window < "u" ? window.localStorage : null;
  } catch {
    return null;
  }
}
function J3(e) {
  if (!e) return null;
  const a = v_();
  if (!a) return null;
  try {
    const r = a.getItem(g_(e));
    if (!r) return null;
    const l = JSON.parse(r);
    return l.v !== p_ || typeof l.params != "object" || l.params === null ? null : l.params;
  } catch {
    return null;
  }
}
function W3(e, a) {
  if (!e) return;
  const r = v_();
  if (r)
    try {
      const l = { ...a };
      for (const u of K3) delete l[u];
      const s = {
        v: p_,
        params: l
      };
      r.setItem(g_(e), JSON.stringify(s));
    } catch {
    }
}
const y_ = [10, 20, 30, 60, 120], e5 = "custom", xl = 85, Rh = { framesPerClip: xl, fps: 16, overlap: 5 };
function Or(e) {
  return {
    framesPerClip: e.frames_per_clip ?? Rh.framesPerClip,
    fps: e.fps ?? Rh.fps,
    overlap: e.num_overlap_frame ?? Rh.overlap
  };
}
function b_(e, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (e - 1) * (r - l);
}
function om(e, a) {
  return a.fps <= 0 ? 0 : b_(e, a) / a.fps;
}
function t5(e, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
function n5(e, a) {
  const { fps: r, overlap: l } = a;
  if (r <= 0) return { numClips: 1, framesPerClip: xl };
  const s = Math.round(e * r);
  if (s <= ap)
    return { numClips: 1, framesPerClip: ip(s) };
  const u = xl - l;
  return u <= 0 ? { numClips: 1, framesPerClip: xl } : { numClips: Math.max(2, Math.round((s - xl) / u) + 1), framesPerClip: xl };
}
const a5 = 5, ap = 129, i5 = [2, 3, 4, 5, 6, 8];
function ip(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(ap, Math.max(a5, a));
}
function Zb(e, a) {
  return ip(e * a);
}
function r5(e) {
  return e <= 0 ? 0 : Math.floor(ap / e);
}
function x_(e) {
  const { framesPerClip: a, fps: r } = Or(e);
  return r <= 0 ? 0 : a / r;
}
function l5(e) {
  const { framesPerClip: a, fps: r } = Or(e), l = `1 × ${a} frames @ ${r} fps → ${x_(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function o5(e, a) {
  for (const r of y_)
    if (t5(r, a) === e) return r;
  return e5;
}
function s5(e) {
  const a = Or(e), r = e.num_clips ?? 1, l = om(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
function rp(e) {
  return e ? `${Lc}/media?path=${encodeURIComponent(e)}` : null;
}
function u5(e) {
  return rp(e);
}
async function Qb(e) {
  const a = rp(e);
  if (!a) return !1;
  try {
    return (await fetch(a, { method: "HEAD" })).ok;
  } catch {
    return !1;
  }
}
function Kb(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
const ns = "svi-canonical", c5 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), f5 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), d5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function h5(e) {
  const a = e.frames_per_clip, r = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function m5(e) {
  const a = e.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = h5(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = c5.has(e.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: y,
    isLowVram: p,
    isOffDistribution: f5.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : d5.has(e.id)
  };
}
function p5(e) {
  return [...e].sort((a, r) => a.id === ns ? -1 : r.id === ns ? 1 : 0);
}
function g5(e) {
  const a = e.filter((r) => !r.hidden);
  return {
    featured: p5(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function v5(e = 25) {
  return tr(`/render/jobs?limit=${e}`);
}
async function Vu(e) {
  return tr(`/render/jobs/${e}`);
}
async function y5(e) {
  return tr("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function b5(e) {
  return tr(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function x5(e, a, r) {
  return LC(`/render/jobs/${e}/events`, a, r);
}
const w5 = 9e4, Jb = 24e4, _5 = 5e3, lp = "nexus.video.svi2-pro.active-render";
function S5(e) {
  try {
    sessionStorage.setItem(lp, JSON.stringify({ jobId: e }));
  } catch {
  }
}
function $u() {
  try {
    sessionStorage.removeItem(lp);
  } catch {
  }
}
function E5() {
  try {
    const e = sessionStorage.getItem(lp);
    if (!e) return null;
    const a = JSON.parse(e);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
const w_ = S.createContext(null);
function N5({
  initialSettings: e = N1,
  initialPreset: a = null,
  deploymentId: r,
  children: l
}) {
  const [s, u] = S.useState(e), [c, d] = S.useState(
    a?.id ?? ns
  ), [p, m] = S.useState(a !== null), [y, g] = S.useState(() => {
    const ye = Ch(e), pe = a ? Pb(ye, a) : ye, _e = J3(r);
    return _e ? { ...pe, ..._e } : pe;
  }), [b, x] = S.useState(null), [_, E] = S.useState(null), [N, R] = S.useState({
    enabled: !1,
    prompt: ""
  }), [j, C] = S.useState(_c), [O, B] = S.useState(!1), k = S.useRef(!1), H = S.useRef(null), A = S.useRef(null), Y = S.useRef(j);
  Y.current = j;
  const le = S.useRef(!1), q = S.useRef(0), Q = S.useRef(null), ne = S.useCallback(() => {
    A.current !== null && (clearInterval(A.current), A.current = null);
  }, []), L = S.useCallback(() => {
    ne(), A.current = setInterval(() => {
      const ye = Y.current;
      if (ye.phase !== "running" || ye.lastFrameAt === null || le.current) return;
      const pe = Date.now() - ye.lastFrameAt, _e = Date.now() - q.current;
      if (pe >= Jb && _e >= Jb) {
        ye.jobId && Q.current?.(ye.jobId);
        return;
      }
      pe >= w5 && C((Re) => Gb(Re));
    }, _5);
  }, [ne]), I = S.useCallback(
    (ye) => {
      H.current?.(), H.current = x5(
        ye,
        (pe) => {
          C((_e) => d3(_e, pe));
        },
        () => {
          le.current || C((pe) => Gb(pe));
        }
      ), L();
    },
    [L]
  ), T = S.useCallback(
    (ye) => {
      if (le.current) return;
      const pe = ye;
      le.current = !0, q.current = Date.now(), I(ye), C(
        (Ae) => Ae.phase === "running" ? { ...Ae, lastFrameAt: Date.now() } : Ae
      );
      const _e = () => Y.current.jobId === pe && Y.current.phase === "running", Re = (Ae) => {
        _e() && (H.current?.(), H.current = null, ne(), C(Ae));
      };
      Vu(ye).then((Ae) => {
        (Ae.status === "succeeded" || Ae.status === "failed" || Ae.status === "cancelled") && Re(zo(Ae));
      }).catch(() => {
        Re(p3(Y.current));
      }).finally(() => {
        le.current = !1;
      });
    },
    [I, ne]
  );
  Q.current = T;
  const z = S.useCallback(() => {
    k.current || (k.current = !0, B(!0));
  }, []), G = S.useCallback(() => {
    k.current = !1, B(!1);
  }, []), F = S.useCallback(
    (ye, pe) => {
      pe?.markDirty !== !1 && z();
      const _e = ye.params.requires_last_image === !0;
      d(ye.id), m(!0), g((Re) => {
        const Ae = {
          ...Ch(s),
          mode: Re.mode ?? "image_to_video",
          ref_image_path: Re.ref_image_path,
          prompts: Re.prompts,
          last_image_path: _e ? Re.last_image_path ?? null : null
        };
        return Pb(Ae, ye);
      }), _e || E(null);
    },
    [s, z]
  ), te = S.useCallback(
    (ye) => {
      z(), g((pe) => {
        if (ye === "text_to_video") return { ...pe, mode: ye };
        const { seed: _e, ...Re } = pe;
        return { ...Re, mode: ye };
      });
    },
    [z]
  ), D = S.useCallback(
    (ye, pe) => {
      z(), g((_e) => ({ ..._e, [ye]: pe }));
    },
    [z]
  ), V = S.useCallback(
    (ye) => {
      z(), g((pe) => ({ ...pe, prompts: ye }));
    },
    [z]
  ), Z = S.useCallback(
    (ye, pe) => {
      z(), x(ye), g((_e) => ({ ..._e, ref_image_path: pe }));
    },
    [z]
  ), ee = S.useCallback(
    (ye, pe) => {
      z(), E(ye), g((_e) => pe === null || pe.length === 0 ? { ..._e, last_image_path: pe } : {
        ..._e,
        last_image_path: pe,
        num_clips: 1,
        frames_per_clip: ip(_e.frames_per_clip ?? 81)
      });
    },
    [z]
  ), se = S.useCallback(() => {
    x(null), g((ye) => ({ ...ye, ref_image_path: "" }));
  }, []), he = S.useCallback(() => {
    E(null), g((ye) => ({ ...ye, last_image_path: null }));
  }, []), me = S.useCallback(
    (ye) => {
      z(), R((pe) => ({ ...pe, ...ye }));
    },
    [z]
  ), J = S.useCallback(() => k.current, []), ve = S.useCallback((ye) => {
    u(ye);
  }, []), Oe = S.useCallback(() => {
    H.current?.(), H.current = null, ne(), $u(), C(_c());
  }, [ne]), je = S.useCallback(async () => {
    G(), H.current?.(), q.current = 0, console.info("[svi2] render → params", {
      base_model: {
        dit_high_path: y.dit_high_path ?? "(bundled)",
        dit_low_path: y.dit_low_path ?? "(bundled)",
        svi_lora_tier: y.svi_lora_tier ?? "high"
      },
      quality: {
        num_inference_steps: y.num_inference_steps,
        cfg_scale: y.cfg_scale,
        sigma_shift: y.sigma_shift,
        switch_boundary: y.switch_boundary,
        solver: y.solver,
        seed: y.seed,
        seed_multiplier: y.seed_multiplier
      },
      basics: {
        width: y.width,
        height: y.height,
        num_clips: y.num_clips,
        frames_per_clip: y.frames_per_clip,
        fps: y.fps,
        interpolate_fps: y.interpolate_fps,
        interpolate_method: y.interpolate_method,
        upscale_factor: y.upscale_factor,
        upscale_model: y.upscale_model,
        upscale_quality: y.upscale_quality
      },
      compile: {
        use_torch_compile: y.use_torch_compile,
        torch_compile_mode: y.torch_compile_mode,
        blocks_to_swap: y.blocks_to_swap
      },
      user_loras: y.user_loras ?? [],
      presetId: c
    });
    const { jobId: ye } = await y5({ presetId: c, params: y });
    C(Yb(ye, N.enabled)), S5(ye), I(ye);
  }, [y, c, N.enabled, I, G]), Ee = S.useCallback(async () => {
    const ye = Y.current.jobId ?? j.jobId;
    if (!ye) return;
    const { status: pe } = await b5(ye);
    pe !== "cancelling" && (H.current?.(), H.current = null, ne(), $u(), C((_e) => h3(_e)));
  }, [j.jobId, ne]), we = S.useCallback(
    async (ye) => {
      H.current?.(), H.current = null, ne();
      try {
        const pe = await Vu(ye.id);
        C(zo(pe));
      } catch {
        C(zo(ye));
      }
    },
    [ne]
  ), Me = S.useCallback(
    async (ye) => {
      H.current?.(), H.current = null, ne();
      let pe = ye;
      try {
        pe = await Vu(ye.id);
      } catch {
        pe = ye;
      }
      const _e = pe.params.ref_image_path ?? "";
      let Re = _e, Ae = null;
      _e.length > 0 && (await Qb(_e) ? Ae = Kb(_e) : (Re = "", $a.warning("Input image no longer on disk — re-upload to render")));
      const lt = pe.params.last_image_path ?? null;
      let Ze = lt, Fe = null;
      lt && lt.length > 0 && (await Qb(lt) ? Fe = Kb(lt) : (Ze = null, $a.warning("Last image no longer on disk — re-upload to render"))), g({
        ...Ch(s),
        ...pe.params,
        ref_image_path: Re,
        last_image_path: Ze
      }), d(pe.presetId), m(pe.presetId !== null), x(Ae), E(Fe), C(zo(pe)), G();
    },
    [s, ne, G]
  );
  S.useEffect(() => {
    W3(r, y);
  }, [r, y]), S.useEffect(() => {
    (j.phase === "done" || j.phase === "error" || j.phase === "cancelled") && $u();
  }, [j.phase]), S.useEffect(() => {
    const ye = () => {
      const Re = Y.current;
      Re.phase !== "running" || !Re.jobId || (I(Re.jobId), C(
        (Ae) => Ae.phase === "running" ? { ...Ae, stalled: !1, lastFrameAt: Date.now() } : Ae
      ));
    }, pe = () => {
      document.visibilityState === "visible" && ye();
    }, _e = () => ye();
    return document.addEventListener("visibilitychange", pe), window.addEventListener("focus", _e), () => {
      document.removeEventListener("visibilitychange", pe), window.removeEventListener("focus", _e);
    };
  }, [I]), S.useEffect(() => {
    const ye = E5();
    if (!ye) return;
    let pe = !1;
    return Vu(ye).then((_e) => {
      if (!pe) {
        if (_e.status === "succeeded" || _e.status === "failed" || _e.status === "cancelled") {
          $u(), C(zo(_e));
          return;
        }
        C(Yb(ye, !1)), I(ye);
      }
    }).catch(() => {
    }), () => {
      pe = !0;
    };
  }, [I]), S.useEffect(() => () => {
    H.current?.(), H.current = null, ne();
  }, [ne]);
  const Ye = S.useMemo(
    () => ({
      settings: s,
      presetId: c,
      presetApplied: p,
      params: y,
      refImageName: b,
      lastImageName: _,
      qwenEdit: N,
      render: j,
      isDirty: O,
      applyPresetById: F,
      setMode: te,
      updateParam: D,
      setPrompts: V,
      setRefImage: Z,
      setLastImage: ee,
      clearRefImageSilent: se,
      clearLastImageSilent: he,
      setQwenEdit: me,
      setSettings: ve,
      startRenderJob: je,
      cancelRenderJob: Ee,
      resetRender: Oe,
      showJobResult: we,
      restoreJobIntoForm: Me,
      getIsDirty: J
    }),
    [
      s,
      c,
      p,
      y,
      b,
      _,
      N,
      j,
      O,
      F,
      te,
      D,
      V,
      Z,
      ee,
      se,
      he,
      me,
      ve,
      je,
      Ee,
      Oe,
      we,
      Me,
      J
    ]
  );
  return /* @__PURE__ */ v.jsx(w_.Provider, { value: Ye, children: l });
}
function Qt() {
  const e = S.useContext(w_);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
const sm = "svi2-pro:trigger-render", um = "svi2-pro:render-state";
function C5() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(sm));
}
function R5(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(um, { detail: e }));
}
function T5(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(sm, e), () => window.removeEventListener(sm, e));
}
function M5(e) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && e(l);
  };
  return window.addEventListener(um, a), () => window.removeEventListener(um, a);
}
const A5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), D5 = 832 * 480, j5 = 0.85;
function op(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && A5.has(e);
}
function Zc(e, a) {
  return op(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function Wb(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function O5(e, a) {
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
  Wb(d, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), Wb(p, 16) || r.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${p}).`,
    severity: "error"
  });
  const m = e.num_inference_steps ?? 50;
  (m < 1 || m > 100) && r.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const y = e.cfg_scale ?? 5;
  (y < 1 || y > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const g = e.num_clips;
  return g !== void 0 && g < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), op(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Zc(a.presetId, e) && g !== void 0 && g > 1 && r.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < D5 * j5 && r.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function z5(e) {
  return e.some((a) => a.severity === "error");
}
function __() {
  const {
    params: e,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Qt(), d = S.useMemo(
    () => O5(e, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, r, l]
  ), p = z5(d), m = s.phase === "running", [y, g] = S.useState(null), b = S.useCallback(async () => {
    if (p) {
      const _ = d.find((E) => E.severity === "error");
      _ && g({ field: _.field, token: Date.now() }), $a.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), $a.success("Render started.");
    } catch (_) {
      const E = _ instanceof zc ? _.message : "Could not start the render.";
      $a.error(E);
    }
  }, [p, d, u]), x = S.useCallback(async () => {
    try {
      await c();
    } catch {
      $a.error("Could not cancel the render.");
    }
  }, [c]);
  return S.useEffect(() => T5(() => void b()), [b]), S.useEffect(() => {
    R5({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: b, cancel: x, focusRequest: y };
}
const L5 = 220, k5 = 80;
function H5(e) {
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
function B5(e, a) {
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
function U5(e) {
  const a = tp.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: H5(s),
      subtitle: B5(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * L5, y: k5 },
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
var V5 = "dk8hba0", $5 = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, q5 = "dk8hba5", I5 = "dk8hba6", Y5 = "dk8hba7", G5 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, F5 = "dk8hbac";
function X5({ data: e }) {
  const a = e, r = [V5, $5[a.state]].join(" "), l = [F5, G5[a.state]].join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ v.jsx(Ll, { type: "target", position: ke.Left }),
    /* @__PURE__ */ v.jsxs("div", { className: q5, children: [
      /* @__PURE__ */ v.jsx("span", { className: I5, children: a.title }),
      /* @__PURE__ */ v.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ v.jsx("span", { className: Y5, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ v.jsx(Ll, { type: "source", position: ke.Right })
  ] });
}
const P5 = { pipeline: X5 };
var Z5 = "_1g4g8kk0", Q5 = "_1g4g8kk1", K5 = "_1g4g8kk2", J5 = "_1g4g8kk3", W5 = "_1g4g8kk4", eO = "_1g4g8kk5";
const tO = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, nO = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function aO() {
  const { render: e, params: a, qwenEdit: r } = Qt(), { busy: l, blocked: s, submit: u, cancel: c } = __(), d = S.useMemo(
    () => U5({ render: e, params: a, qwenEditEnabled: r.enabled }),
    [e, a, r.enabled]
  ), p = tp.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ v.jsxs("div", { className: Z5, children: [
    /* @__PURE__ */ v.jsx("div", { className: Q5, children: /* @__PURE__ */ v.jsx(
      n3,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: P5,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ v.jsx("div", { className: K5, children: /* @__PURE__ */ v.jsxs(
      Ba,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ v.jsx("div", { className: J5, children: p.map((m) => /* @__PURE__ */ v.jsxs("div", { className: W5, children: [
            /* @__PURE__ */ v.jsx("span", { children: nO[m] }),
            /* @__PURE__ */ v.jsx(Fn, { tone: tO[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ v.jsx("div", { className: eO, children: l ? /* @__PURE__ */ v.jsx(ua, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ v.jsx(ua, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var ex = jw();
const S_ = 0, E_ = 1, N_ = 2, tx = 3;
var nx = Object.prototype.hasOwnProperty;
function cm(e, a) {
  var r, l;
  if (e === a) return !0;
  if (e && a && (r = e.constructor) === a.constructor) {
    if (r === Date) return e.getTime() === a.getTime();
    if (r === RegExp) return e.toString() === a.toString();
    if (r === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && cm(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof e == "object") {
      l = 0;
      for (r in e)
        if (nx.call(e, r) && ++l && !nx.call(a, r) || !(r in a) || !cm(e[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const di = /* @__PURE__ */ new WeakMap(), mi = () => {
}, pn = (
  /*#__NOINLINE__*/
  mi()
), fm = Object, at = (e) => e === pn, Va = (e) => typeof e == "function", er = (e, a) => ({
  ...e,
  ...a
}), C_ = (e) => Va(e.then), Th = {}, qu = {}, sp = "undefined", gs = typeof window != sp, dm = typeof document != sp, iO = gs && "Deno" in window, rO = () => gs && typeof window.requestAnimationFrame != sp, R_ = (e, a) => {
  const r = di.get(e);
  return [
    // Getter
    () => !at(a) && e.get(a) || Th,
    // Setter
    (l) => {
      if (!at(a)) {
        const s = e.get(a);
        a in qu || (qu[a] = s), r[5](a, er(s, l), s || Th);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !at(a) && a in qu ? qu[a] : !at(a) && e.get(a) || Th
  ];
};
let hm = !0;
const lO = () => hm, [mm, pm] = gs && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  mi,
  mi
], oO = () => {
  const e = dm && document.visibilityState;
  return at(e) || e !== "hidden";
}, sO = (e) => (dm && document.addEventListener("visibilitychange", e), mm("focus", e), () => {
  dm && document.removeEventListener("visibilitychange", e), pm("focus", e);
}), uO = (e) => {
  const a = () => {
    hm = !0, e();
  }, r = () => {
    hm = !1;
  };
  return mm("online", a), mm("offline", r), () => {
    pm("online", a), pm("offline", r);
  };
}, cO = {
  isOnline: lO,
  isVisible: oO
}, fO = {
  initFocus: sO,
  initReconnect: uO
}, ax = !be.useId, Rl = !gs || iO, dO = (e) => rO() ? window.requestAnimationFrame(e) : setTimeout(e, 1), Mh = Rl ? S.useEffect : S.useLayoutEffect, Ah = typeof navigator < "u" && navigator.connection, ix = !Rl && Ah && ([
  "slow-2g",
  "2g"
].includes(Ah.effectiveType) || Ah.saveData), Iu = /* @__PURE__ */ new WeakMap(), hO = (e) => fm.prototype.toString.call(e), Dh = (e, a) => e === `[object ${a}]`;
let mO = 0;
const gm = (e) => {
  const a = typeof e, r = hO(e), l = Dh(r, "Date"), s = Dh(r, "RegExp"), u = Dh(r, "Object");
  let c, d;
  if (fm(e) === e && !l && !s) {
    if (c = Iu.get(e), c) return c;
    if (c = ++mO + "~", Iu.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += gm(e[d]) + ",";
      Iu.set(e, c);
    }
    if (u) {
      c = "#";
      const p = fm.keys(e).sort();
      for (; !at(d = p.pop()); )
        at(e[d]) || (c += d + ":" + gm(e[d]) + ",");
      Iu.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, up = (e) => {
  if (Va(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? gm(e) : "", [
    e,
    a
  ];
};
let pO = 0;
const vm = () => ++pO;
async function T_(...e) {
  const [a, r, l, s] = e, u = er({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const d = u.rollbackOnError;
  let p = u.optimisticData;
  const m = (b) => typeof d == "function" ? d(b) : d !== !1, y = u.throwOnError;
  if (Va(r)) {
    const b = r, x = [], _ = a.keys();
    for (const E of _)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(E) && b(a.get(E)._k) && x.push(E);
    return Promise.all(x.map(g));
  }
  return g(r);
  async function g(b) {
    const [x] = up(b);
    if (!x) return;
    const [_, E] = R_(a, x), [N, R, j, C] = di.get(a), O = () => {
      const L = N[x];
      return (Va(u.revalidate) ? u.revalidate(_().data, b) : u.revalidate !== !1) && (delete j[x], delete C[x], L && L[0]) ? L[0](N_).then(() => _().data) : _().data;
    };
    if (e.length < 3)
      return O();
    let B = l, k, H = !1;
    const A = vm();
    R[x] = [
      A,
      0
    ];
    const Y = !at(p), le = _(), q = le.data, Q = le._c, ne = at(Q) ? q : Q;
    if (Y && (p = Va(p) ? p(ne, q) : p, E({
      data: p,
      _c: ne
    })), Va(B))
      try {
        B = B(ne);
      } catch (L) {
        k = L, H = !0;
      }
    if (B && C_(B))
      if (B = await B.catch((L) => {
        k = L, H = !0;
      }), A !== R[x][0]) {
        if (H) throw k;
        return B;
      } else H && Y && m(k) && (c = !0, E({
        data: ne,
        _c: pn
      }));
    if (c && !H)
      if (Va(c)) {
        const L = c(B, ne);
        E({
          data: L,
          error: pn,
          _c: pn
        });
      } else
        E({
          data: B,
          error: pn,
          _c: pn
        });
    if (R[x][1] = vm(), Promise.resolve(O()).then(() => {
      E({
        _c: pn
      });
    }), H) {
      if (y) throw k;
      return;
    }
    return B;
  }
}
const rx = (e, a) => {
  for (const r in e)
    e[r][0] && e[r][0](a);
}, gO = (e, a) => {
  if (!di.has(e)) {
    const r = er(fO, a), l = /* @__PURE__ */ Object.create(null), s = T_.bind(pn, e);
    let u = mi;
    const c = /* @__PURE__ */ Object.create(null), d = (y, g) => {
      const b = c[y] || [];
      return c[y] = b, b.push(g), () => b.splice(b.indexOf(g), 1);
    }, p = (y, g, b) => {
      e.set(y, g);
      const x = c[y];
      if (x)
        for (const _ of x)
          _(g, b);
    }, m = () => {
      if (!di.has(e) && (di.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !Rl)) {
        const y = r.initFocus(setTimeout.bind(pn, rx.bind(pn, l, S_))), g = r.initReconnect(setTimeout.bind(pn, rx.bind(pn, l, E_)));
        u = () => {
          y && y(), g && g(), di.delete(e);
        };
      }
    };
    return m(), [
      e,
      s,
      m,
      u
    ];
  }
  return [
    e,
    di.get(e)[4]
  ];
}, vO = (e, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !at(u) && c > u || setTimeout(l, d, s);
}, yO = cm, [M_, bO] = gO(/* @__PURE__ */ new Map()), xO = er(
  {
    // events
    onLoadingSlow: mi,
    onSuccess: mi,
    onError: mi,
    onErrorRetry: vO,
    onDiscarded: mi,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: ix ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: ix ? 5e3 : 3e3,
    // providers
    compare: yO,
    isPaused: () => !1,
    cache: M_,
    mutate: bO,
    fallback: {}
  },
  // use web preset by default
  cO
), wO = (e, a) => {
  const r = er(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = er(s, c));
  }
  return r;
}, _O = S.createContext({}), SO = "$inf$", A_ = gs && window.__SWR_DEVTOOLS_USE__, EO = A_ ? window.__SWR_DEVTOOLS_USE__ : [], NO = () => {
  A_ && (window.__SWR_DEVTOOLS_REACT__ = be);
}, CO = (e) => Va(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], RO = () => {
  const e = S.useContext(_O);
  return S.useMemo(() => er(xO, e), [
    e
  ]);
}, TO = (e) => (a, r, l) => e(a, r && ((...u) => {
  const [c] = up(a), [, , , d] = di.get(M_);
  if (c.startsWith(SO))
    return r(...u);
  const p = d[c];
  return at(p) ? r(...u) : (delete d[c], p);
}), l), MO = EO.concat(TO), AO = (e) => function(...r) {
  const l = RO(), [s, u, c] = CO(r), d = wO(l, c);
  let p = e;
  const { use: m } = d, y = (m || []).concat(MO);
  for (let g = y.length; g--; )
    p = y[g](p);
  return p(s, u || d.fetcher || null, d);
}, DO = (e, a, r) => {
  const l = a[e] || (a[e] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
NO();
const jh = be.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), Oh = {
  dedupe: !0
}, lx = Promise.resolve(pn), jO = () => mi, OO = (e, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: g, keepPreviousData: b, strictServerPrefetchWarning: x } = r, [_, E, N, R] = di.get(l), [j, C] = up(e), O = S.useRef(!1), B = S.useRef(!1), k = S.useRef(j), H = S.useRef(a), A = S.useRef(r), Y = () => A.current, le = () => Y().isVisible() && Y().isOnline(), [q, Q, ne, L] = R_(l, j), I = S.useRef({}).current, T = at(c) ? at(r.fallback) ? pn : r.fallback[j] : c, z = (pe, _e) => {
    for (const Re in I) {
      const Ae = Re;
      if (Ae === "data") {
        if (!s(pe[Ae], _e[Ae]) && (!at(pe[Ae]) || !s(he, _e[Ae])))
          return !1;
      } else if (_e[Ae] !== pe[Ae])
        return !1;
    }
    return !0;
  }, G = !O.current, F = S.useMemo(() => {
    const pe = q(), _e = L(), Re = (Fe) => {
      const Ke = er(Fe);
      return delete Ke._k, (() => {
        if (!j || !a || Y().isPaused()) return !1;
        if (G && !at(d)) return d;
        const yt = at(T) ? Ke.data : T;
        return at(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ke
      } : Ke;
    }, Ae = Re(pe), lt = pe === _e ? Ae : Re(_e);
    let Ze = Ae;
    return [
      () => {
        const Fe = Re(q());
        return z(Fe, Ze) ? (Ze.data = Fe.data, Ze.isLoading = Fe.isLoading, Ze.isValidating = Fe.isValidating, Ze.error = Fe.error, Ze) : (Ze = Fe, Fe);
      },
      () => lt
    ];
  }, [
    l,
    j
  ]), te = ex.useSyncExternalStore(S.useCallback(
    (pe) => ne(j, (_e, Re) => {
      z(Re, _e) || pe();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      j
    ]
  ), F[0], F[1]), D = _[j] && _[j].length > 0, V = te.data, Z = at(V) ? T && C_(T) ? jh(T) : T : V, ee = te.error, se = S.useRef(Z), he = b ? at(V) ? at(se.current) ? Z : se.current : V : Z, me = j && at(Z), J = S.useRef(null);
  !Rl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  ex.useSyncExternalStore(jO, () => (J.current = !1, J), () => (J.current = !0, J));
  const ve = J.current;
  x && ve && !u && me && console.warn(`Missing pre-initiated data for serialized key "${j}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const Oe = !j || !a || Y().isPaused() || D && !at(ee) ? !1 : G && !at(d) ? d : u ? at(Z) ? !1 : p : at(Z) || p, je = G && Oe, Ee = at(te.isValidating) ? je : te.isValidating, we = at(te.isLoading) ? je : te.isLoading, Me = S.useCallback(
    async (pe) => {
      const _e = H.current;
      if (!j || !_e || B.current || Y().isPaused())
        return !1;
      let Re, Ae, lt = !0;
      const Ze = pe || {}, Fe = !N[j] || !Ze.dedupe, Ke = () => ax ? !B.current && j === k.current && O.current : j === k.current, vt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        Q(vt);
      }, Yt = () => {
        const pt = N[j];
        pt && pt[1] === Ae && delete N[j];
      }, Lt = {
        isValidating: !0
      };
      at(q().data) && (Lt.isLoading = !0);
      try {
        if (Fe && (Q(Lt), r.loadingTimeout && at(q().data) && setTimeout(() => {
          lt && Ke() && Y().onLoadingSlow(j, r);
        }, r.loadingTimeout), N[j] = [
          _e(C),
          vm()
        ]), [Re, Ae] = N[j], Re = await Re, Fe && setTimeout(Yt, r.dedupingInterval), !N[j] || N[j][1] !== Ae)
          return Fe && Ke() && Y().onDiscarded(j), !1;
        vt.error = pn;
        const pt = E[j];
        if (!at(pt) && // case 1
        (Ae <= pt[0] || // case 2
        Ae <= pt[1] || // case 3
        pt[1] === 0))
          return yt(), Fe && Ke() && Y().onDiscarded(j), !1;
        const ut = q().data;
        vt.data = s(ut, Re) ? ut : Re, Fe && Ke() && Y().onSuccess(Re, j, r);
      } catch (pt) {
        Yt();
        const ut = Y(), { shouldRetryOnError: Zn } = ut;
        ut.isPaused() || (vt.error = pt, Fe && Ke() && (ut.onError(pt, j, ut), (Zn === !0 || Va(Zn) && Zn(pt)) && (!Y().revalidateOnFocus || !Y().revalidateOnReconnect || le()) && ut.onErrorRetry(pt, j, ut, (_n) => {
          const nn = _[j];
          nn && nn[0] && nn[0](tx, _n);
        }, {
          retryCount: (Ze.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return lt = !1, yt(), !0;
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
      j,
      l
    ]
  ), Ye = S.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...pe) => T_(l, k.current, ...pe),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Mh(() => {
    H.current = a, A.current = r, at(V) || (se.current = V);
  }), Mh(() => {
    if (!j) return;
    const pe = Me.bind(pn, Oh);
    let _e = 0;
    Y().revalidateOnFocus && (_e = Date.now() + Y().focusThrottleInterval);
    const Ae = DO(j, _, (lt, Ze = {}) => {
      if (lt == S_) {
        const Fe = Date.now();
        Y().revalidateOnFocus && Fe > _e && le() && (_e = Fe + Y().focusThrottleInterval, pe());
      } else if (lt == E_)
        Y().revalidateOnReconnect && le() && pe();
      else {
        if (lt == N_)
          return Me();
        if (lt == tx)
          return Me(Ze);
      }
    });
    return B.current = !1, k.current = j, O.current = !0, Q({
      _k: C
    }), Oe && (N[j] || (at(Z) || Rl ? pe() : dO(pe))), () => {
      B.current = !0, Ae();
    };
  }, [
    j
  ]), Mh(() => {
    let pe;
    function _e() {
      const Ae = Va(m) ? m(q().data) : m;
      Ae && pe !== -1 && (pe = setTimeout(Re, Ae));
    }
    function Re() {
      !q().error && (y || Y().isVisible()) && (g || Y().isOnline()) ? Me(Oh).then(_e) : _e();
    }
    return _e(), () => {
      pe && (clearTimeout(pe), pe = -1);
    };
  }, [
    m,
    y,
    g,
    j
  ]), S.useDebugValue(he), u) {
    if (!ax && Rl && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (H.current = a, A.current = r, B.current = !1);
    const pe = R[j], _e = !at(pe) && me ? Ye(pe) : lx;
    if (jh(_e), !at(ee) && me)
      throw ee;
    const Re = me ? Me(Oh) : lx;
    !at(he) && me && (Re.status = "fulfilled", Re.value = !0), jh(Re);
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
      return I.isValidating = !0, Ee;
    },
    get isLoading() {
      return I.isLoading = !0, we;
    }
  };
}, as = AO(OO);
var zO = "eb2vop0", LO = "eb2vop1", kO = "eb2vop2", HO = "eb2vop3", BO = "eb2vop4";
function UO({
  open: e,
  title: a,
  message: r,
  confirmLabel: l = "Confirm",
  cancelLabel: s = "Cancel",
  onConfirm: u,
  onCancel: c
}) {
  const d = S.useRef(null), p = S.useRef(c);
  return p.current = c, S.useEffect(() => {
    if (!e) return;
    d.current?.querySelector("button[data-confirm]")?.focus();
    const m = (y) => {
      y.key === "Escape" && p.current();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e]), e ? (
    // biome-ignore lint/a11y/useKeyWithClickEvents: scrim dismiss is a convenience; Escape is handled above
    /* @__PURE__ */ v.jsx("div", { className: zO, onClick: c, children: /* @__PURE__ */ v.jsxs(
      "div",
      {
        ref: d,
        className: LO,
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": a,
        onClick: (m) => m.stopPropagation(),
        children: [
          /* @__PURE__ */ v.jsx("span", { className: kO, children: a }),
          /* @__PURE__ */ v.jsx("span", { className: HO, children: r }),
          /* @__PURE__ */ v.jsxs("div", { className: BO, children: [
            /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: c, children: s }),
            /* @__PURE__ */ v.jsx(ua, { variant: "primary", onClick: u, "data-confirm": !0, children: l })
          ] })
        ]
      }
    ) })
  ) : null;
}
var VO = "_1xasopc0", $O = "_1xasopc1", qO = "_1xasopc2", IO = "_1xasopc3", YO = "_1xasopc4", GO = "_1xasopc5", FO = "_1xasopc6", XO = "_1xasopc7", PO = "_1xasopc8";
function ZO(e, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function QO(e, a, r) {
  for (const l of e) {
    if (a && !ZO(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function ox({
  accept: e,
  maxSizeBytes: a,
  multiple: r = !1,
  disabled: l = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: d,
  renderPreview: p,
  onFiles: m
}) {
  const y = S.useRef(null), g = S.useId(), b = S.useId(), [x, _] = S.useState(!1), [E, N] = S.useState(null), [R, j] = S.useState([]), C = S.useCallback(
    (q) => {
      if (!q || q.length === 0) return;
      const Q = Array.from(q), ne = r ? Q : Q.slice(0, 1), L = QO(ne, e, a);
      if (L) {
        N(L);
        return;
      }
      N(null), j(ne), m(ne);
    },
    [e, a, r, m]
  ), O = S.useCallback(() => {
    l || y.current?.click();
  }, [l]), B = S.useCallback(
    (q) => {
      l || (q.key === "Enter" || q.key === " ") && (q.preventDefault(), O());
    },
    [l, O]
  ), k = S.useCallback(
    (q) => {
      q.preventDefault(), _(!1), !l && C(q.dataTransfer.files);
    },
    [l, C]
  ), H = S.useCallback(
    (q) => {
      q.preventDefault(), l || _(!0);
    },
    [l]
  ), A = S.useCallback((q) => {
    q.preventDefault(), _(!1);
  }, []), Y = [u ? b : null, E ? g : null].filter(Boolean).join(" "), le = [
    VO,
    x ? $O : "",
    l ? qO : "",
    E !== null ? IO : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": l,
        "aria-describedby": Y || void 0,
        className: le,
        onClick: O,
        onKeyDown: B,
        onDrop: k,
        onDragOver: H,
        onDragLeave: A,
        children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: YO,
              accept: e,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: (q) => C(q.target.files)
            }
          ),
          /* @__PURE__ */ v.jsx("span", { className: GO, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ v.jsx("span", { id: b, className: FO, children: u }),
          p && R.length > 0 && /* @__PURE__ */ v.jsx("div", { className: PO, children: p(R) })
        ]
      }
    ),
    E && /* @__PURE__ */ v.jsx("div", { id: g, role: "alert", className: XO, children: E })
  ] });
}
function KO(e) {
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
async function JO(e) {
  const a = new FormData();
  a.append("file", e);
  const r = await fetch(`${Lc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new zc(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function sx(e, a, r) {
  const [l, s] = S.useState(null), [u, c] = S.useState(!1), [d, p] = S.useState(null), m = KO(l), y = S.useCallback(
    async (_) => {
      if (s(_), p(null), !_) {
        e(null, null);
        return;
      }
      c(!0);
      try {
        const { path: E } = await JO(_);
        e(_.name, E);
      } catch (E) {
        const N = E instanceof zc ? E.message : "Upload failed. Try again.";
        p(N), e(null, null), $a.error(N);
      } finally {
        c(!1);
      }
    },
    [e]
  ), g = S.useCallback(() => {
    r(), $a.warning("Input image no longer on disk — re-upload to render");
  }, [r]), b = l ? null : rp(a);
  return { file: l, uploading: u, uploadError: d, previewUrl: m ?? b, pick: y, handleRemotePreviewError: g };
}
var WO = "cyswg40", ux = "cyswg41", cx = "cyswg42", Yu = "cyswg43", fx = "cyswg44", dx = "cyswg45", hx = "cyswg46", mx = "cyswg47", Gu = "cyswg48";
const px = 32 * 1024 * 1024;
function ez({
  refImageRequired: e,
  lastImageRequired: a,
  refError: r,
  lastError: l
}) {
  const {
    params: s,
    refImageName: u,
    lastImageName: c,
    setRefImage: d,
    setLastImage: p,
    clearRefImageSilent: m,
    clearLastImageSilent: y
  } = Qt(), g = S.useCallback(
    (C, O) => d(C, O ?? ""),
    [d]
  ), b = S.useCallback(
    (C, O) => p(C, O),
    [p]
  ), x = s.ref_image_path && s.ref_image_path.length > 0 ? s.ref_image_path : null, _ = s.last_image_path && s.last_image_path.length > 0 ? s.last_image_path : null, E = sx(g, x, m), N = sx(b, _, y), R = E.previewUrl, j = N.previewUrl;
  return /* @__PURE__ */ v.jsxs("div", { className: WO, children: [
    /* @__PURE__ */ v.jsxs("div", { className: ux, children: [
      /* @__PURE__ */ v.jsxs("span", { className: cx, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ v.jsx(Fn, { tone: "accent", children: "required" }) : /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ v.jsx(
        ox,
        {
          accept: "image/*",
          maxSizeBytes: px,
          ariaLabel: "reference image upload",
          label: E.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (C) => void E.pick(C[0] ?? null),
          renderPreview: () => E.file && R ? /* @__PURE__ */ v.jsx("img", { className: Yu, src: R, alt: "reference preview" }) : null
        }
      ),
      !E.file && R && /* @__PURE__ */ v.jsxs("div", { className: fx, children: [
        /* @__PURE__ */ v.jsx(
          "img",
          {
            className: Yu,
            src: R,
            alt: "reference preview",
            onError: E.handleRemotePreviewError
          }
        ),
        /* @__PURE__ */ v.jsxs("span", { className: dx, children: [
          "Restored from a past run",
          u ? ` · ${u}` : ""
        ] })
      ] }),
      E.uploading && /* @__PURE__ */ v.jsx("span", { className: mx, children: "Uploading…" }),
      !E.uploading && E.file && /* @__PURE__ */ v.jsx("span", { className: hx, children: E.file.name }),
      E.uploadError && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Gu, children: E.uploadError }),
      r && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Gu, children: r })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: ux, children: [
      /* @__PURE__ */ v.jsxs("span", { className: cx, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ v.jsx(
        ox,
        {
          accept: "image/*",
          maxSizeBytes: px,
          ariaLabel: "last image upload",
          label: N.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (C) => void N.pick(C[0] ?? null),
          renderPreview: () => N.file && j ? /* @__PURE__ */ v.jsx("img", { className: Yu, src: j, alt: "last preview" }) : null
        }
      ),
      !N.file && j && /* @__PURE__ */ v.jsxs("div", { className: fx, children: [
        /* @__PURE__ */ v.jsx(
          "img",
          {
            className: Yu,
            src: j,
            alt: "last preview",
            onError: N.handleRemotePreviewError
          }
        ),
        /* @__PURE__ */ v.jsxs("span", { className: dx, children: [
          "Restored from a past run",
          c ? ` · ${c}` : ""
        ] })
      ] }),
      N.uploading && /* @__PURE__ */ v.jsx("span", { className: mx, children: "Uploading…" }),
      !N.uploading && N.file && /* @__PURE__ */ v.jsx("span", { className: hx, children: N.file.name }),
      N.uploadError && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Gu, children: N.uploadError }),
      l && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Gu, children: l })
    ] })
  ] });
}
const tz = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function nz(e) {
  return e.replace(/^[a-z0-9_]+:/i, "");
}
function az(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function iz(e) {
  return tz.has(e.format) && e.install_path !== null;
}
function rz(e) {
  return e.filter((a) => iz(a) && a.install_path).map((a) => ({
    value: a.install_path,
    label: `${az(a.filename)}${a.family_id ? ` (${nz(a.family_id)})` : ""}`
  })).sort((a, r) => a.label.localeCompare(r.label));
}
const lz = "/api/v1/model-store/installed";
async function oz() {
  const e = await fetch(lz, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var sz = "_1hbttwg0", uz = "_1hbttwg1", cz = "_1hbttwg2", fz = "_1hbttwg3", D_ = "_1hbttwg4", dz = "_1hbttwg5", hz = "_1hbttwg7 _1hbttwg6", mz = "_1hbttwg8 _1hbttwg6", gx = "_1hbttwg9", j_ = "_1hbttwga", Sc = "_1hbttwgb", Ec = "_1hbttwgc", Nc = "_1hbttwgd", zn = "_1czy96m0", wn = "_1czy96m1", Qc = "_1czy96m2", cp = "_1czy96m3", fp = "_1czy96m4", O_ = "_1czy96m5", z_ = "_1czy96m6", L_ = "_1czy96m7", k_ = "_1czy96m8", dp = "_1czy96m9", pz = "_1czy96ma", vx = "_1czy96mb", yx = "_1czy96mc", bx = "_1czy96md", xx = "_1czy96me", wx = "_1czy96mf", _x = "_1czy96mg", Sx = "_1czy96mh", gz = "_1czy96mi", vz = "_1czy96mk _1czy96mj", yz = "_1czy96ml _1czy96mj", bz = "_1czy96mm", xz = "_1czy96mn", wz = "_1czy96mo", _z = "_1czy96mp", Sz = "_1czy96mq", H_ = "_1czy96mr", Ez = "_1czy96ms", Ex = "_1czy96mt", Nz = "_1czy96mu", Cz = "_1czy96mv", Rz = "_1czy96mw", Tz = "_1czy96mx", Mz = "_1czy96my", Az = "_1czy96mz", Dz = "_1czy96m10", jz = "_1czy96m11", Oz = "_1czy96m12", zh = "_1czy96m13", Ji = "_1czy96m14", Wi = "_1czy96m15", vs = "_1czy96m16", cn = "_1czy96m17", zz = "_1czy96m18", Lz = "_1czy96m19";
const Lh = "__bundled__";
function B_() {
  return /* @__PURE__ */ v.jsx("span", { className: vs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "open" }),
    /* @__PURE__ */ v.jsx(
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
function kh({
  id: e,
  label: a,
  value: r,
  options: l,
  includeBundled: s,
  onChange: u
}) {
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: e, children: a }),
    /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: e,
          className: Wi,
          value: r ?? Lh,
          onChange: (c) => u(c.target.value === Lh ? void 0 : c.target.value),
          children: [
            s && /* @__PURE__ */ v.jsx("option", { value: Lh, children: "Bundled Wan2.2 (default)" }),
            l.map((c) => /* @__PURE__ */ v.jsx("option", { value: c.value, children: c.label }, c.value))
          ]
        }
      ),
      /* @__PURE__ */ v.jsx(B_, {})
    ] })
  ] });
}
function kz() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Qt(), s = as("svi2/installed-models", oz), u = S.useMemo(
    () => rz(s.data?.installed ?? []),
    [s.data]
  ), c = e.dit_high_path ?? void 0, d = e.dit_low_path ?? void 0, p = typeof c == "string" && c.length > 0 && c === d, m = p, y = s.error !== void 0, g = a.sviLoraTier ?? e.svi_lora_tier ?? "high", b = S.useCallback(
    (E, N) => {
      r("dit_high_path", E), r("dit_low_path", N);
      const R = { ...a, ditHighPath: E ?? "", ditLowPath: N ?? "" };
      l(R), fc(R).catch(() => {
      });
    },
    [a, r, l]
  ), x = S.useCallback(
    (E) => {
      if (E) {
        const N = c ?? d ?? u[0]?.value;
        N && b(N, N);
      } else
        b(c, void 0);
    },
    [c, d, u, b]
  ), _ = S.useCallback(
    (E) => {
      const N = E;
      r("svi_lora_tier", N);
      const R = { ...a, sviLoraTier: N };
      l(R), fc(R).catch(() => {
      });
    },
    [a, r, l]
  );
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: Sc, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": p,
          "aria-label": "Use one model file for both experts",
          className: Ec,
          onClick: () => x(!p),
          children: /* @__PURE__ */ v.jsx("span", { className: Nc, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Same file for both experts (single-file model)" })
    ] }),
    p ? /* @__PURE__ */ v.jsx(
      kh,
      {
        id: "svi2-base-model",
        label: "Base model",
        value: c,
        options: u,
        includeBundled: !1,
        onChange: (E) => b(E, E)
      }
    ) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(
        kh,
        {
          id: "svi2-model-high",
          label: "High-noise expert (runs first)",
          value: c,
          options: u,
          includeBundled: !0,
          onChange: (E) => b(E, d)
        }
      ),
      /* @__PURE__ */ v.jsx(
        kh,
        {
          id: "svi2-model-low",
          label: "Low-noise expert (runs second)",
          value: d,
          options: u,
          includeBundled: !0,
          onChange: (E) => b(c, E)
        }
      )
    ] }),
    !m && /* @__PURE__ */ v.jsxs("div", { className: Sc, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": g !== "off",
          "aria-label": "Apply SVI LoRA to both experts",
          className: Ec,
          onClick: () => _(g === "off" ? "high" : "off"),
          children: /* @__PURE__ */ v.jsx("span", { className: Nc, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "SVI LoRA (auto: high→high, low→low). Turn off for merged checkpoints (e.g. SmoothMix)." })
    ] }),
    y && /* @__PURE__ */ v.jsx("span", { className: cn, children: "Model Foundry list unavailable — using the bundled base model." }),
    !y && u.length === 0 && /* @__PURE__ */ v.jsx("span", { className: cn, children: "No models installed via Model Foundry yet — using the bundled base model." }),
    m && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-svi-lora-tier", children: "SVI LoRA" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-svi-lora-tier",
            className: Wi,
            value: g,
            onChange: (E) => _(E.target.value),
            children: OC.map((E) => /* @__PURE__ */ v.jsx("option", { value: E.value, children: E.label }, E.value))
          }
        ),
        /* @__PURE__ */ v.jsx(B_, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Which SVI2 LoRA wraps this single-file model. Off for community merges (e.g. SmoothMix)." })
    ] })
  ] });
}
const Hz = "/api/v1/model-store/installed";
function Bz(e) {
  const a = /* @__PURE__ */ new Set(), r = [];
  for (const l of e) {
    if (!(l.role === "lora" || l.format === "safetensors") || l.install_path === null || l.install_path.length === 0)
      continue;
    const u = `${l.family_id}/${l.filename}`;
    a.has(u) || (a.add(u), r.push({
      artifactId: l.artifact_id,
      familyId: l.family_id,
      filename: l.filename,
      installPath: l.install_path
    }));
  }
  return r;
}
async function Uz() {
  const e = await fetch(Hz, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json(), r = "installed" in a ? a : a.data ?? { installed: [] };
  return Bz(r.installed);
}
const oc = 4, Hh = 4;
function Vz(e) {
  return e.weight_high ?? e.weight ?? 1;
}
function $z(e) {
  return e.weight_low ?? e.weight ?? 1;
}
function qz(e) {
  return e.length >= oc ? e : [...e, { path: "", weight_high: 1, weight_low: 1 }];
}
function Iz(e, a) {
  return e.filter((r, l) => l !== a);
}
function Yz(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, path: r } : l);
}
function Gz(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, weight_high: r } : l);
}
function Fz(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, weight_low: r } : l);
}
const Fu = "__none__";
function Nx({
  tier: e,
  value: a,
  onChange: r
}) {
  const l = S.useId(), u = { flex: 1, "--svi2-slider-fill": `${Math.max(0, Math.min(Hh, a)) / Hh * 100}%` };
  return /* @__PURE__ */ v.jsxs("div", { className: Lz, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: l, style: { width: "34px" }, children: e }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        id: l,
        type: "range",
        className: j_,
        min: 0,
        max: Hh,
        step: 0.05,
        value: a,
        onChange: (c) => r(parseFloat(c.target.value)),
        style: u
      }
    ),
    /* @__PURE__ */ v.jsx("span", { className: dp, children: a.toFixed(2) })
  ] });
}
function Xz({
  rowIndex: e,
  row: a,
  options: r,
  onPath: l,
  onWeightHigh: s,
  onWeightLow: u,
  onRemove: c
}) {
  const d = S.useId(), p = a.path.length > 0 ? a.path : Fu, m = (y) => {
    l(y === Fu ? null : y);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
      /* @__PURE__ */ v.jsxs("label", { className: wn, htmlFor: d, style: { flex: 1 }, children: [
        "LoRA ",
        e + 1
      ] }),
      /* @__PURE__ */ v.jsx(
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
    /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: d,
          className: Wi,
          value: p,
          onChange: (y) => m(y.target.value),
          children: [
            /* @__PURE__ */ v.jsx("option", { value: Fu, children: "None" }),
            r.map((y) => /* @__PURE__ */ v.jsxs("option", { value: y.installPath, children: [
              y.filename,
              y.familyId ? ` (${y.familyId.replace(/^[^:]+:/, "")})` : ""
            ] }, y.artifactId))
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: vs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
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
    p !== Fu && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(Nx, { tier: "High", value: Vz(a), onChange: s }),
      /* @__PURE__ */ v.jsx(Nx, { tier: "Low", value: $z(a), onChange: u }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Per-expert weight (0 = off for that expert). Distill LoRAs like lightx2v run High>Low, e.g. 3.0 / 1.5." })
    ] })
  ] });
}
function Pz() {
  const { params: e, updateParam: a } = Qt(), r = as("svi2/installed-loras", Uz, {
    shouldRetryOnError: !1
  }), l = r.data ?? [], s = e.user_loras ?? [], u = (c) => a("user_loras", c);
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    r.error && /* @__PURE__ */ v.jsx("div", { className: zz, role: "alert", children: "Failed to load installed LoRAs" }),
    /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("span", { className: wn, children: "LoRAs (applied to both experts)" }),
      s.map((c, d) => /* @__PURE__ */ v.jsx(
        Xz,
        {
          rowIndex: d,
          row: c,
          options: l,
          onPath: (p) => u(Yz(s, d, p ?? "")),
          onWeightHigh: (p) => u(Gz(s, d, p)),
          onWeightLow: (p) => u(Fz(s, d, p)),
          onRemove: () => u(Iz(s, d))
        },
        d
      )),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          onClick: () => u(qz(s)),
          disabled: s.length >= oc,
          className: cn,
          style: {
            background: "none",
            border: "none",
            cursor: s.length >= oc ? "not-allowed" : "pointer",
            padding: "4px 0",
            textAlign: "left",
            opacity: s.length >= oc ? 0.45 : 1
          },
          children: "+ Add LoRA"
        }
      )
    ] })
  ] });
}
const is = "custom", Zz = [
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
function hp(e) {
  const a = new Map(e.map((l) => [l.id, l])), r = [];
  for (const l of Zz) {
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
function mp(e, a) {
  const r = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return r ? r.id : is;
}
var Qz = "_14qe5430", Kz = "_14qe5431", Jz = "_14qe5432", Wz = "_14qe5433", eL = "_14qe5434", tL = "_14qe5435", nL = "_14qe5436", aL = "_14qe5437", iL = "_14qe5438", rL = "_14qe543a _14qe5439", lL = "_14qe543b _14qe5439", oL = "_14qe543c _14qe5439";
const sL = {
  ok: Kz,
  neutral: Jz,
  warn: Wz
}, uL = {
  ok: tL,
  neutral: nL,
  warn: aL
}, cL = {
  ok: rL,
  neutral: lL,
  warn: oL
};
function fL(e, a) {
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
function dL({ tone: e }) {
  return e === "ok" ? /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "in distribution" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M7 10l2.1 2.1L13.2 8",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) : e === "warn" ? /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "warning" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M10 2.6L18.6 17H1.4L10 2.6z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ v.jsx("path", { d: "M10 8v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "14.4", r: "0.9", fill: "currentColor" })
  ] }) : /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "info" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ v.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "6.2", r: "0.9", fill: "currentColor" })
  ] });
}
function hL({
  presets: e,
  warningText: a
}) {
  const { params: r } = Qt(), l = S.useMemo(() => hp(e), [e]);
  if (l.length === 0) return null;
  const s = mp(r, l), u = s === is ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = fL(u, a);
  return /* @__PURE__ */ v.jsxs(
    "output",
    {
      className: [Qz, sL[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ v.jsx("span", { className: [eL, uL[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(dL, { tone: c.tone }) }),
        /* @__PURE__ */ v.jsx("span", { className: iL, children: c.text }),
        /* @__PURE__ */ v.jsx("span", { className: cL[c.tone], children: c.tag })
      ]
    }
  );
}
var mL = "_5d10lv0";
const Lo = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], pL = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.", gL = /* @__PURE__ */ new Set(["ArrowRight", "ArrowDown"]), vL = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowUp"]);
function yL(e) {
  return [fp, e ? O_ : ""].filter(Boolean).join(" ");
}
function bL({ value: e, onChange: a }) {
  const r = S.useId(), l = (s) => {
    const u = gL.has(s.key), c = vL.has(s.key);
    if (!u && !c) return;
    s.preventDefault();
    const d = Lo.findIndex((y) => y.value === e), m = Lo[(d + (u ? 1 : -1) + Lo.length) % Lo.length];
    m && m.value !== e && a(m.value);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: r, children: "Mode" }),
    /* @__PURE__ */ v.jsx("div", { className: Qc, children: /* @__PURE__ */ v.jsx(
      "div",
      {
        className: cp,
        role: "radiogroup",
        "aria-labelledby": r,
        onKeyDown: l,
        children: Lo.map((s) => {
          const u = e === s.value;
          return /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": u,
              tabIndex: u ? 0 : -1,
              className: yL(u),
              onClick: () => a(s.value),
              children: s.label
            },
            s.value
          );
        })
      }
    ) }),
    e === "text_to_video" && /* @__PURE__ */ v.jsx("p", { className: mL, "aria-live": "polite", children: pL })
  ] });
}
var xL = "dck790", wL = "dck791", _L = "dck792";
function Cc({ title: e, detail: a, action: r, className: l }) {
  const s = [xL, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: s, children: [
    /* @__PURE__ */ v.jsx("span", { className: wL, children: e }),
    a && /* @__PURE__ */ v.jsx("span", { className: _L, children: a }),
    r
  ] });
}
var SL = "_1880igs0", EL = "_1880igs1", NL = "_1880igs2", CL = "_1880igs3", RL = "_1880igs4", TL = "_1880igs5", ML = "_1880igs6";
const AL = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function DL({ jobs: e, onOpen: a }) {
  return e.length === 0 ? /* @__PURE__ */ v.jsx(
    Cc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ v.jsx("div", { className: SL, children: e.map((r) => /* @__PURE__ */ v.jsxs("button", { type: "button", className: EL, onClick: () => a(r), children: [
    /* @__PURE__ */ v.jsxs("span", { className: NL, children: [
      /* @__PURE__ */ v.jsx("span", { className: CL, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ v.jsx("span", { className: RL, children: OL(r) })
    ] }),
    /* @__PURE__ */ v.jsxs("span", { className: TL, children: [
      /* @__PURE__ */ v.jsx("time", { className: ML, dateTime: r.createdAt, title: zL(r.createdAt), children: LL(r.createdAt) }),
      /* @__PURE__ */ v.jsx(Fn, { tone: AL[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
const jL = S.memo(DL);
function OL(e) {
  const a = e.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function zL(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function LL(e) {
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
function kL() {
  const { presetId: e, params: a } = Qt();
  return Zc(e, a) ? /* @__PURE__ */ v.jsx(BL, {}) : /* @__PURE__ */ v.jsx(HL, {});
}
function U_(e) {
  return [fp, e ? O_ : ""].filter(Boolean).join(" ");
}
function HL() {
  const { params: e, updateParam: a } = Qt(), r = Or(e), l = o5(e.num_clips ?? 1, r), [s, u] = S.useState(
    () => Number(om(e.num_clips ?? 1, r).toFixed(1))
  ), c = (d) => {
    const p = n5(d, r);
    a("num_clips", p.numClips), a("frames_per_clip", p.framesPerClip);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ v.jsxs("div", { className: Qc, children: [
      /* @__PURE__ */ v.jsx("div", { className: cp, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: y_.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: U_(p),
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
      /* @__PURE__ */ v.jsxs("div", { className: z_, children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: L_,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            },
            onBlur: () => {
              u(Number(om(e.num_clips ?? 1, Or(e)).toFixed(1)));
            }
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: k_, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("output", { className: dp, "aria-live": "polite", children: s5(e) })
  ] });
}
function BL() {
  const { params: e, updateParam: a } = Qt(), r = Or(e), l = r5(r.fps), [s, u] = S.useState(() => Number(x_(e).toFixed(1))), c = i5.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", Zb(m, r.fps));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ v.jsxs("div", { className: Qc, children: [
      /* @__PURE__ */ v.jsx("div", { className: cp, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = Zb(p, r.fps) === r.framesPerClip;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: U_(m),
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
      }) : /* @__PURE__ */ v.jsxs("span", { className: fp, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ v.jsxs("div", { className: z_, children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: L_,
            min: 1,
            max: l,
            step: 0.5,
            value: s,
            onChange: (p) => {
              const m = Number(p.target.value);
              u(m), Number.isFinite(m) && m > 0 && d(m);
            }
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: k_, children: "sec" })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: cn, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        r.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("output", { className: dp, "aria-live": "polite", children: l5(e) })
  ] });
}
var UL = "_17owg2e0", VL = "_17owg2e1", $L = "_17owg2e2", Xu = "_17owg2e3", Pu = "_17owg2e4", qL = "_17owg2e5", IL = "_17owg2e6", YL = "_17owg2e7", GL = "_17owg2e8";
function Bh() {
  return /* @__PURE__ */ v.jsx("span", { className: qL, "aria-hidden": "true" });
}
function FL({ presets: e }) {
  const { presetId: a, params: r } = Qt(), l = S.useMemo(() => hp(e), [e]), s = Or(r), u = Zc(a, r), c = u ? 1 : r.num_clips ?? 1, d = u ? s.framesPerClip : b_(c, s), p = s.fps > 0 ? d / s.fps : 0, m = r.interpolate_fps ?? 0, y = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, b = typeof r.upscale_factor == "number" ? r.upscale_factor : 0, x = b > 0 ? b : 1, _ = (r.width ?? 0) * x, E = (r.height ?? 0) * x, N = mp(r, l), R = N === is || (l.find((C) => C.id === N)?.stepsDown ?? 0) >= 2, j = [YL, R ? GL : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: UL, children: [
    /* @__PURE__ */ v.jsx("span", { className: VL, children: "Output" }),
    /* @__PURE__ */ v.jsxs("div", { className: $L, children: [
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Xu, children: g }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Pu, children: "frames" })
      ] }),
      /* @__PURE__ */ v.jsx(Bh, {}),
      /* @__PURE__ */ v.jsxs("span", { className: Xu, children: [
        _,
        "×",
        E
      ] }),
      /* @__PURE__ */ v.jsx(Bh, {}),
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Xu, children: y }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Pu, children: "fps" })
      ] }),
      /* @__PURE__ */ v.jsx(Bh, {}),
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Pu, children: "~" }),
        /* @__PURE__ */ v.jsx("span", { className: Xu, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Pu, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("span", { className: IL, children: [
      /* @__PURE__ */ v.jsx("span", { className: j, "aria-hidden": "true" }),
      R ? "off-distribution" : "ready"
    ] })
  ] });
}
var XL = "dgx4n20", PL = "dgx4n21", ZL = "dgx4n22", QL = "dgx4n23", KL = "dgx4n24", JL = "dgx4n25", WL = "dgx4n26", e6 = "dgx4n27", t6 = "dgx4n28", n6 = "dgx4n29", a6 = "dgx4n2a", i6 = "dgx4n2b", Cx = "dgx4n2c", r6 = "dgx4n2d", l6 = "dgx4n2e";
function o6(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function s6({
  presets: e,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = S.useState(!1), u = S.useMemo(() => g5(e), [e]), c = S.useMemo(() => {
    const b = u.legacy.filter((_) => _.id === a), x = l ? u.legacy : b;
    return [...u.featured, ...x];
  }, [u, l, a]), d = S.useRef([]), p = S.useCallback(
    (b) => {
      const x = c[b];
      x && (d.current[b]?.focus(), r(x));
    },
    [c, r]
  ), m = S.useCallback(
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
    return /* @__PURE__ */ v.jsx(
      Cc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((b) => b.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ v.jsxs("div", { className: a6, children: [
    /* @__PURE__ */ v.jsx("div", { className: XL, role: "radiogroup", "aria-label": "Render presets", children: c.map((b, x) => {
      const _ = m5(b), E = b.id === a, N = b.id === ns, R = [
        PL,
        b.legacy ? "" : ZL,
        N ? QL : "",
        E ? KL : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ v.jsxs(
        "button",
        {
          ref: (j) => {
            d.current[x] = j;
          },
          type: "button",
          role: "radio",
          "aria-checked": E,
          tabIndex: x === y ? 0 : -1,
          title: b.description,
          className: R,
          onClick: () => r(b),
          onKeyDown: (j) => m(j, x),
          children: [
            /* @__PURE__ */ v.jsxs("div", { className: WL, children: [
              /* @__PURE__ */ v.jsx("span", { className: e6, children: b.label }),
              N && /* @__PURE__ */ v.jsx(Fn, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ v.jsx("span", { className: JL, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
                /* @__PURE__ */ v.jsx("title", { children: "selected" }),
                /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
                /* @__PURE__ */ v.jsx(
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
            /* @__PURE__ */ v.jsx("span", { className: t6, children: o6(b.description) }),
            /* @__PURE__ */ v.jsxs("div", { className: n6, children: [
              /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: _.resolution }),
              /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: _.duration }),
              /* @__PURE__ */ v.jsx(Fn, { tone: _.isLowVram ? "success" : "neutral", children: _.vram }),
              _.isOffDistribution && /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "off-distribution" }),
              _.requiresLastImage && /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        b.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ v.jsxs("div", { className: i6, children: [
      /* @__PURE__ */ v.jsx("span", { className: Cx, "aria-hidden": "true" }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: r6,
          "aria-expanded": l,
          onClick: () => s((b) => !b),
          children: [
            /* @__PURE__ */ v.jsx("span", { className: l6, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: Cx, "aria-hidden": "true" })
    ] })
  ] });
}
var u6 = "_1ntn2zv0", c6 = "_1ntn2zv1", f6 = "_1ntn2zv2", d6 = "_1ntn2zv3", h6 = "_1ntn2zv4", m6 = "_1ntn2zv5", Rx = "_1ntn2zv6", p6 = "_1ntn2zv7", g6 = "_1ntn2zv8", v6 = "_1ntn2zv9", y6 = "_1ntn2zva";
function b6({ error: e, textareaId: a }) {
  const { params: r, setPrompts: l } = Qt(), [s, u] = S.useState(!1), c = r.prompts ?? [""], d = S.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), p = S.useMemo(
    () => c.slice(d).filter((b) => b.trim().length > 0).length,
    [c, d]
  ), m = (b) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = b, l(x);
  }, y = (b, x) => {
    const _ = Math.max(d, c.length, b + 1), E = Array.from({ length: _ }, (N, R) => c[R] ?? "");
    E[b] = x, l(E);
  }, g = (b) => {
    if (u(b), b) {
      const x = c[0] ?? "", _ = Math.max(d, c.length);
      l(Array.from({ length: _ }, (E, N) => c[N] ?? x));
    }
  };
  return /* @__PURE__ */ v.jsxs("div", { className: u6, children: [
    /* @__PURE__ */ v.jsx("div", { className: c6, children: /* @__PURE__ */ v.jsxs("span", { className: f6, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: d6,
          onClick: () => g(!s),
          children: /* @__PURE__ */ v.jsx("span", { className: h6, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (b, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ v.jsxs("div", { className: p6, children: [
        /* @__PURE__ */ v.jsxs("span", { className: g6, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ v.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: Rx,
            "aria-label": `prompt for clip ${x + 1}`,
            "aria-invalid": x === 0 && e !== void 0 ? !0 : void 0,
            value: c[x] ?? "",
            onChange: (_) => y(x, _.target.value)
          }
        )
      ] }, `clip-${x}`)
    )) : /* @__PURE__ */ v.jsx(
      "textarea",
      {
        id: a,
        className: Rx,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (b) => m(b.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ v.jsxs("output", { className: m6, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ v.jsx("p", { className: v6, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ v.jsx("span", { role: "alert", className: y6, children: e })
  ] });
}
var x6 = "_1itrxk30", w6 = "_1itrxk31", _6 = "_1itrxk32", S6 = "_1itrxk33", E6 = "_1itrxk34", N6 = "_1itrxk35", C6 = "_1itrxk36", R6 = "_1itrxk37";
function T6() {
  const { qwenEdit: e, setQwenEdit: a } = Qt();
  return /* @__PURE__ */ v.jsxs("div", { className: x6, children: [
    /* @__PURE__ */ v.jsxs("div", { className: w6, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: C6,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ v.jsx("span", { className: R6, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsxs("span", { className: _6, children: [
        /* @__PURE__ */ v.jsx("span", { className: S6, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ v.jsx("span", { className: E6, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ v.jsx(
      "textarea",
      {
        className: N6,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var M6 = "ob7g5b0", A6 = "ob7g5b1", D6 = "ob7g5b3", j6 = "ob7g5b4", O6 = "ob7g5b5", z6 = "ob7g5b6", L6 = "ob7g5b7", k6 = "ob7g5b8", H6 = "ob7g5b9", B6 = "ob7g5ba";
function U6({
  src: e,
  poster: a,
  fpsLabel: r,
  controls: l = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: d,
  className: p,
  emptyContent: m,
  onEnded: y,
  onReady: g,
  onError: b
}) {
  const [x, _] = S.useState("loading"), [E, N] = S.useState(null), R = S.useCallback(() => {
    _("ready"), g?.();
  }, [g]), j = S.useCallback(
    (O) => {
      const B = O.target, k = B.error?.message || `media error code ${B.error?.code ?? "?"}`;
      _("error"), N(k), b?.(new Error(k));
    },
    [b]
  ), C = [M6, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ v.jsx("div", { className: C, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ v.jsxs("div", { className: L6, children: [
    /* @__PURE__ */ v.jsx("div", { className: k6, children: "Could not play video" }),
    /* @__PURE__ */ v.jsx("div", { className: H6, children: E ?? "unknown error" }),
    /* @__PURE__ */ v.jsx("a", { className: B6, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ v.jsxs("div", { className: C, children: [
    x === "loading" && /* @__PURE__ */ v.jsx("div", { className: D6, "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("div", { className: j6 }) }),
    r && /* @__PURE__ */ v.jsx("span", { className: O6, children: r }),
    /* @__PURE__ */ v.jsx(
      "video",
      {
        className: A6,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: R,
        onEnded: y,
        onError: j,
        children: /* @__PURE__ */ v.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ v.jsx("div", { className: C, "aria-label": d ?? "no video", children: /* @__PURE__ */ v.jsx("div", { className: z6, children: m ?? "No video to display yet." }) });
}
const fi = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, Tx = {
  [fi.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [fi.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [fi.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [fi.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [fi.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [fi.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [fi.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [fi.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [fi.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function V6(e, a) {
  return e !== null && Tx[e] ? Tx[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
var Zu = "_1ojc56g0", $6 = "_1ojc56g1", q6 = "_1ojc56g2", I6 = "_1ojc56g3", Y6 = "_1ojc56g4", G6 = "_1ojc56g5", F6 = "_1ojc56g6", X6 = "_1ojc56g7", P6 = "_1ojc56g8", Qu = "_1ojc56g9", Z6 = "_1ojc56ga", Q6 = "_1ojc56gb", K6 = "_1ojc56gc", J6 = "_1ojc56gd", W6 = "_1ojc56ge", e8 = "_1ojc56gf", t8 = "_1ojc56gg", n8 = "_1ojc56gh", a8 = "_51y2ql0", i8 = "_51y2ql1", r8 = "_51y2ql2", l8 = "_51y2ql3", o8 = "_51y2ql4", Uh = "_51y2ql5", s8 = "_51y2ql6", u8 = "_51y2ql7 _51y2ql6", c8 = "_51y2ql8 _51y2ql6", f8 = "_51y2ql9", d8 = "_51y2qla", h8 = "_51y2qlb", m8 = "_51y2qlc", p8 = "_51y2qld", g8 = "_51y2qle";
const bn = 60, la = 62, xn = 46, v8 = 180, Yo = 75, sc = 45, y8 = [0, 0.25, 0.5, 0.75, 1];
function b8(e) {
  const a = Math.PI * (1 - e), r = Math.cos(a), l = Math.sin(a);
  return {
    x1: bn + r * (xn - 9),
    y1: la - l * (xn - 9),
    x2: bn + r * (xn - 14),
    y2: la - l * (xn - 14)
  };
}
function x8(e) {
  const a = Yo - sc, r = (Yo - e) / a;
  return Math.min(1, Math.max(0.02, r));
}
function w8(e) {
  return e >= 0.55 ? s8 : e >= 0.25 ? u8 : c8;
}
function _8({ secondsPerStep: e }) {
  const a = e !== null && e > 0, r = a ? x8(e) : 0, l = v8 * r, s = a ? e.toFixed(1) : "—", u = a ? 1 / e : null, c = u === null ? "—" : u >= 1 ? u.toFixed(2) : u.toFixed(3);
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: a8,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": sc,
      "aria-valuemax": Yo,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ v.jsx("span", { className: i8, children: "Speed" }),
        /* @__PURE__ */ v.jsxs("svg", { className: r8, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ v.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ v.jsx(
            "path",
            {
              className: l8,
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          y8.map((d) => {
            const p = b8(d);
            return /* @__PURE__ */ v.jsx(
              "line",
              {
                className: o8,
                strokeWidth: 1.4,
                x1: p.x1,
                y1: p.y1,
                x2: p.x2,
                y2: p.y2
              },
              d
            );
          }),
          /* @__PURE__ */ v.jsx("text", { className: Uh, x: bn - xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: Yo }),
          /* @__PURE__ */ v.jsx("text", { className: Uh, x: bn, y: 9, fontSize: 6, textAnchor: "middle", children: (Yo + sc) / 2 }),
          /* @__PURE__ */ v.jsx("text", { className: Uh, x: bn + xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: sc }),
          a && /* @__PURE__ */ v.jsx(
            "path",
            {
              className: w8(r),
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, r * 100)} 100`
            }
          ),
          /* @__PURE__ */ v.jsx(
            "g",
            {
              className: f8,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${bn}px ${la}px`
              },
              children: /* @__PURE__ */ v.jsx(
                "line",
                {
                  className: d8,
                  strokeWidth: 2.4,
                  x1: bn,
                  y1: la,
                  x2: bn - xn + 16,
                  y2: la
                }
              )
            }
          ),
          /* @__PURE__ */ v.jsx("circle", { className: h8, cx: bn, cy: la, r: 3.6 }),
          /* @__PURE__ */ v.jsx("text", { className: m8, x: bn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ v.jsx("text", { className: p8, x: bn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] }),
        /* @__PURE__ */ v.jsxs("span", { className: g8, children: [
          c,
          " it/s"
        ] })
      ]
    }
  );
}
function S8({ state: e, onCancel: a, onReset: r }) {
  const [l, s] = S.useState(!1);
  S.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = S.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ v.jsx(
      Cc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = V6(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ v.jsxs("div", { className: Zu, children: [
      /* @__PURE__ */ v.jsxs("div", { className: e8, role: "alert", children: [
        /* @__PURE__ */ v.jsx("span", { className: t8, children: m.title }),
        /* @__PURE__ */ v.jsx("span", { className: n8, children: m.hint })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: Qu, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ v.jsxs("div", { className: Zu, children: [
      /* @__PURE__ */ v.jsx(Cc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ v.jsx("div", { className: Qu, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ v.jsxs("output", { className: Zu, children: [
      /* @__PURE__ */ v.jsx(
        U6,
        {
          src: u5(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ v.jsx(M8, { state: e }),
      /* @__PURE__ */ v.jsx("div", { className: Qu, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ v.jsxs("div", { className: Zu, children: [
    /* @__PURE__ */ v.jsx("output", { className: $6, "aria-live": "polite", children: C8(e) }),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        className: X6,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ v.jsx(
          "div",
          {
            className: P6,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ v.jsx("output", { className: W6, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ v.jsxs("div", { className: q6, "aria-live": "polite", children: [
      /* @__PURE__ */ v.jsx(_8, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ v.jsxs("div", { className: I6, children: [
        /* @__PURE__ */ v.jsx(ko, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ v.jsx(
          ko,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ v.jsx(
          ko,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ v.jsx(ko, { label: "ETA", value: E8(b3(e)) }),
        /* @__PURE__ */ v.jsx(
          ko,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: Qu, children: /* @__PURE__ */ v.jsx(ua, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function E8(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), r = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return r > 0 ? `${r}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const N8 = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading diffusion experts…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function C8(e) {
  if (!e.stage) return "Starting worker…";
  if (e.stage === "loading_experts" && e.stageDetail) return e.stageDetail;
  const a = N8[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function R8(e) {
  const a = e.base_model_high, r = e.base_model_low;
  if (typeof a != "string") return null;
  const l = e.base_model_override === !0, s = l ? "custom" : "bundled", u = Mx(a);
  if (typeof r == "string" && r !== a)
    return `${u} + ${Mx(r)} (${s})`;
  const c = e.svi_lora_tier, d = l && typeof c == "string" ? `, SVI ${c}` : "";
  return `${u} (${s}${d})`;
}
function T8(e) {
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
function Mx(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function ko({ label: e, value: a }) {
  return /* @__PURE__ */ v.jsxs("div", { className: Y6, children: [
    /* @__PURE__ */ v.jsx("span", { className: G6, children: e }),
    /* @__PURE__ */ v.jsx("span", { className: F6, children: a })
  ] });
}
function M8({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const r = [], l = R8(a);
  l && r.push(["Base model", l]);
  const s = T8(a);
  return s && r.push(["torch.compile", s]), typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && r.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && r.push(["Output", e.outputPath]), r.length === 0 ? null : /* @__PURE__ */ v.jsx("div", { className: Z6, children: r.map(([u, c]) => /* @__PURE__ */ v.jsxs("div", { className: Q6, children: [
    /* @__PURE__ */ v.jsx("span", { className: K6, children: u }),
    /* @__PURE__ */ v.jsx("span", { className: J6, children: c })
  ] }, u)) });
}
const ym = 16, zr = 128, Rc = 1920, A8 = 832 * 480, D8 = { width: 848, height: 480 }, V_ = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "3:2", label: "3:2", w: 3, h: 2 },
  { id: "4:3", label: "4:3", w: 4, h: 3 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "3:4", label: "3:4", w: 3, h: 4 },
  { id: "9:16", label: "9:16", w: 9, h: 16 }
];
function $_(e, a, r) {
  return Math.min(r, Math.max(a, e));
}
function rs(e) {
  if (!Number.isFinite(e)) return zr;
  const a = Math.round(e / ym) * ym;
  return $_(a, zr, Rc);
}
function Ax(e, a) {
  const r = rs(e);
  return $_(r + a * ym, zr, Rc);
}
function Tc(e, a) {
  return { width: rs(e), height: rs(a) };
}
function j8(e) {
  return { width: e.height, height: e.width };
}
function q_(e) {
  return e.width * e.height;
}
function I_(e) {
  return e.height === 0 ? 0 : e.width / e.height;
}
function O8(e, a, r) {
  if (e <= 0 || a <= 0 || r <= 0)
    return Tc(zr, zr);
  const l = e / a, s = Math.sqrt(r * l), u = r / s;
  return Tc(s, u);
}
function Y_(e) {
  const a = I_(e);
  if (a <= 0) return null;
  let r = null;
  for (const l of V_) {
    const s = Math.abs(a - l.w / l.h);
    s < 0.06 && (r === null || s < r.delta) && (r = { id: l.id, delta: s });
  }
  return r?.id ?? null;
}
function z8(e) {
  return e.width === e.height ? "square" : e.width > e.height ? "landscape" : "portrait";
}
function G_(e, a) {
  return a === 0 ? e : G_(a, e % a);
}
function L8(e) {
  const a = Y_(e);
  if (a) return a;
  const r = G_(e.width, e.height) || 1, l = e.width / r, s = e.height / r;
  return l <= 64 && s <= 64 ? `${l}:${s}` : `${I_(e).toFixed(2)}:1`;
}
function k8(e) {
  const a = q_(e);
  return {
    megapixels: (a / 1e6).toFixed(2),
    aspect: L8(e),
    orientation: z8(e),
    budgetPct: Math.round(a / A8 * 100)
  };
}
function H8() {
  return /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "swap" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M6.5 3.5L3.5 6.5l3 3M3.5 6.5h9M13.5 16.5l3-3-3-3M16.5 13.5h-9",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function Dx({
  id: e,
  label: a,
  value: r,
  draft: l,
  onDraft: s,
  onCommit: u,
  onStep: c
}) {
  return /* @__PURE__ */ v.jsxs("div", { className: Sz, children: [
    /* @__PURE__ */ v.jsx("label", { className: H_, htmlFor: e, children: a }),
    /* @__PURE__ */ v.jsxs("div", { className: Ez, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Ex,
          "aria-label": `Decrease ${a} by 16`,
          disabled: r <= zr,
          onClick: () => c(-1),
          children: "−"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          id: e,
          type: "number",
          inputMode: "numeric",
          className: Nz,
          "aria-label": a,
          min: zr,
          max: Rc,
          step: 16,
          value: l,
          onChange: (d) => s(d.target.value),
          onBlur: (d) => u(Number(d.target.value)),
          onKeyDown: (d) => {
            d.key === "Enter" && u(Number(d.target.value));
          }
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Ex,
          "aria-label": `Increase ${a} by 16`,
          disabled: r >= Rc,
          onClick: () => c(1),
          children: "+"
        }
      )
    ] })
  ] });
}
function B8({
  width: e,
  height: a,
  onChange: r
}) {
  const [l, s] = S.useState(() => String(e)), [u, c] = S.useState(() => String(a));
  S.useEffect(() => {
    s(String(e));
  }, [e]), S.useEffect(() => {
    c(String(a));
  }, [a]);
  const d = { width: e, height: a }, p = k8(d), m = Y_(d), y = (N) => {
    const R = rs(N);
    s(String(R)), R !== e && r({ width: R, height: a });
  }, g = (N) => {
    const R = rs(N);
    c(String(R)), R !== a && r({ width: e, height: R });
  }, b = (N) => {
    r({ width: Ax(e, N), height: a });
  }, x = (N) => {
    r({ width: e, height: Ax(a, N) });
  }, _ = () => r(j8(d)), E = (N, R) => {
    r(O8(N, R, q_(d)));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: wz, children: [
    /* @__PURE__ */ v.jsxs("div", { className: _z, children: [
      /* @__PURE__ */ v.jsx(
        Dx,
        {
          id: "svi2-custom-width",
          label: "Width",
          value: e,
          draft: l,
          onDraft: s,
          onCommit: y,
          onStep: b
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: Cz, "aria-hidden": "true", children: "×" }),
      /* @__PURE__ */ v.jsx(
        Dx,
        {
          id: "svi2-custom-height",
          label: "Height",
          value: a,
          draft: u,
          onDraft: c,
          onCommit: g,
          onStep: x
        }
      ),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: Rz,
          onClick: _,
          title: "Reverse the aspect ratio — swap width and height at the same pixel count",
          children: [
            /* @__PURE__ */ v.jsx("span", { className: Tz, children: /* @__PURE__ */ v.jsx(H8, {}) }),
            "Swap"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Mz, children: [
      /* @__PURE__ */ v.jsx("span", { className: H_, children: "Aspect ratio · same pixel budget" }),
      /* @__PURE__ */ v.jsx(
        "div",
        {
          className: Az,
          role: "group",
          "aria-label": "Aspect ratio presets",
          children: V_.map((N) => {
            const R = m === N.id, j = [Dz, R ? jz : ""].filter(Boolean).join(" ");
            return /* @__PURE__ */ v.jsx(
              "button",
              {
                type: "button",
                className: j,
                "aria-pressed": R,
                onClick: () => E(N.w, N.h),
                children: N.label
              },
              N.id
            );
          })
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("output", { className: Oz, "aria-live": "polite", children: [
      Tc(e, a).width,
      "×",
      Tc(e, a).height,
      /* @__PURE__ */ v.jsx("span", { className: zh, children: "·" }),
      p.megapixels,
      " MP",
      /* @__PURE__ */ v.jsx("span", { className: zh, children: "·" }),
      p.aspect,
      " ",
      p.orientation,
      /* @__PURE__ */ v.jsx("span", { className: zh, children: "·" }),
      p.budgetPct,
      "% of 480p budget"
    ] })
  ] });
}
function jx() {
  return /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "selected" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ v.jsx(
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
function U8({ presets: e }) {
  const { params: a, updateParam: r } = Qt(), l = S.useMemo(() => hp(e), [e]), [s, u] = S.useState(!1);
  if (l.length === 0) return null;
  const c = mp(a, l), d = c === is || s, p = a.width ?? 832, m = a.height ?? 480, y = (g) => {
    r("width", g.width), r("height", g.height);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ v.jsxs("div", { className: pz, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: [
      l.map((g) => {
        const b = !d && c === g.id, x = [vx, b ? yx : ""].filter(Boolean).join(" "), _ = [wx, b ? _x : ""].filter(Boolean).join(" ");
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": b,
            className: x,
            onClick: () => {
              u(!1), r("width", g.width), r("height", g.height);
            },
            children: [
              /* @__PURE__ */ v.jsxs("span", { className: bx, children: [
                /* @__PURE__ */ v.jsxs("span", { className: xx, children: [
                  g.width,
                  "×",
                  g.height
                ] }),
                /* @__PURE__ */ v.jsx("span", { className: _, children: /* @__PURE__ */ v.jsx(jx, {}) })
              ] }),
              /* @__PURE__ */ v.jsx("span", { className: Sx, children: g.label }),
              /* @__PURE__ */ v.jsx("span", { className: gz, children: g.sub }),
              g.stepsDown > 0 && /* @__PURE__ */ v.jsx(
                "span",
                {
                  className: g.stepsDown >= 2 ? yz : vz,
                  children: g.stepsDown >= 2 ? "off-distribution" : "below native"
                }
              )
            ]
          },
          g.id
        );
      }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": d,
          className: [vx, bz, d ? yx : ""].filter(Boolean).join(" "),
          onClick: () => {
            u(!0), c !== is && y(D8);
          },
          children: [
            /* @__PURE__ */ v.jsxs("span", { className: bx, children: [
              /* @__PURE__ */ v.jsx("span", { className: xx, children: "Custom" }),
              /* @__PURE__ */ v.jsx(
                "span",
                {
                  className: [wx, d ? _x : ""].join(" "),
                  children: /* @__PURE__ */ v.jsx(jx, {})
                }
              )
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: Sx, children: "Any aspect & budget" }),
            /* @__PURE__ */ v.jsx("span", { className: xz, children: "9:16 portrait, square, or a custom Wan2.2 canvas" })
          ]
        }
      )
    ] }),
    d && /* @__PURE__ */ v.jsx(B8, { width: p, height: m, onChange: y })
  ] });
}
var V8 = "_1x63kpu0";
const $8 = "Random each render";
function q8(e) {
  const a = e.trim();
  if (a.length === 0) return;
  const r = Number(a);
  if (!(!Number.isFinite(r) || r < 0))
    return Math.trunc(r);
}
function I8() {
  const { params: e, updateParam: a } = Qt(), r = S.useId(), l = e.seed, s = (u) => {
    a("seed", q8(u.target.value));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: r, children: "Seed" }),
    /* @__PURE__ */ v.jsxs("div", { className: Qc, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          className: V8,
          "aria-labelledby": r,
          min: 0,
          step: 1,
          placeholder: $8,
          value: l ?? "",
          onChange: s
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize." })
    ] })
  ] });
}
function Y8({
  spec: e,
  value: a,
  error: r,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = S.useId(), d = `${c}-help`, p = r ? `${c}-error` : d;
  return /* @__PURE__ */ v.jsxs("div", { className: sz, title: s ? u : void 0, children: [
    /* @__PURE__ */ v.jsxs("div", { className: uz, children: [
      /* @__PURE__ */ v.jsx("label", { className: cz, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ v.jsx("span", { className: fz, children: F8(a, e.step) })
    ] }),
    G8(e, a, l, c, p, r !== void 0, s),
    /* @__PURE__ */ v.jsx("span", { id: d, className: D_, children: s && u ? u : e.help }),
    r && /* @__PURE__ */ v.jsx("span", { id: `${c}-error`, role: "alert", className: dz, children: r })
  ] });
}
function G8(e, a, r, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ v.jsxs("div", { className: Sc, children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: Ec,
            onClick: () => r(!d),
            children: /* @__PURE__ */ v.jsx("span", { className: Nc, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: D_, children: d ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ v.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [mz, u ? gx : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => r(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ v.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = Ox(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ v.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: j_,
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
      return /* @__PURE__ */ v.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [hz, u ? gx : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: Ox(a, e),
          onChange: (d) => r(Number(d.target.value))
        }
      );
  }
}
function Ox(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function F8(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var X8 = "_1f0q5gf0", P8 = "_1f0q5gf1", Z8 = "_1f0q5gf2", Q8 = "_1f0q5gf3", K8 = "_1f0q5gf4", J8 = "_1f0q5gf5", W8 = "_1f0q5gf6", ek = "_1f0q5gf7", tk = "_1f0q5gf8", nk = "_1f0q5gf9", ak = "_1f0q5gfa", ik = "_1f0q5gfb", rk = "_1f0q5gfc";
function lk({
  title: e,
  description: a,
  badge: r,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = S.useId(), [m, y] = S.useState(u ? s : !1), g = [X8, c].filter(Boolean).join(" "), b = [Z8, m ? Q8 : ""].filter(Boolean).join(" "), x = !u || !m;
  return /* @__PURE__ */ v.jsxs("section", { className: g, children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        className: P8,
        "aria-expanded": x,
        "aria-controls": p,
        disabled: !u,
        onClick: () => u && y((_) => !_),
        children: [
          u && /* @__PURE__ */ v.jsx("span", { className: b, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ v.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ v.jsx(
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
          /* @__PURE__ */ v.jsxs("span", { className: K8, children: [
            /* @__PURE__ */ v.jsx("span", { className: J8, children: e }),
            a && /* @__PURE__ */ v.jsx("span", { className: W8, children: a })
          ] }),
          (l || r) && /* @__PURE__ */ v.jsxs("span", { className: ek, children: [
            l && /* @__PURE__ */ v.jsx("span", { className: tk, children: l }),
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        id: p,
        className: [nk, x ? ak : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ v.jsx("div", { className: ik, children: /* @__PURE__ */ v.jsx("div", { className: rk, children: d }) })
      }
    )
  ] });
}
const ok = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function zx(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function sk(e) {
  return Pc.find((a) => a.key === e)?.default;
}
function gl(e, a) {
  const r = e[a];
  if (typeof r == "number" && Number.isFinite(r)) return r;
  const l = sk(a);
  return typeof l == "number" ? l : 0;
}
function uk(e, a) {
  if (e === "core") {
    const r = gl(a, "fps"), l = gl(a, "interpolate_fps"), s = l > 0 ? l : r, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = ok[u] ?? u, d = gl(a, "upscale_factor"), p = `${r} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const r = gl(a, "num_inference_steps"), l = gl(a, "cfg_scale"), s = gl(a, "sigma_shift");
    return `${r} steps · CFG ${zx(l)} · shift ${zx(s)}`;
  }
  return null;
}
async function ck() {
  return tr("/capabilities/attention");
}
const Lx = Object.fromEntries(
  Lm.map((e) => [e.value, e.label])
);
function fk() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Qt(), s = as("svi2/attention-capabilities", ck, {
    shouldRetryOnError: !1
  }), u = e.attention ?? a.attentionBackend ?? "flash2", c = S.useCallback(
    (b) => {
      r("attention", b);
      const x = { ...a, attentionBackend: b };
      l(x), fc(x).catch(() => {
      });
    },
    [a, r, l]
  ), d = s.data, p = d === void 0, m = s.error !== void 0, y = d?.backends.find((b) => b.id === u), g = y !== void 0 && !y.supported;
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-attention", children: "Attention mechanism" }),
    /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: "svi2-attention",
          className: Wi,
          value: u,
          onChange: (b) => c(b.target.value),
          children: [
            /* @__PURE__ */ v.jsx("option", { value: "auto", children: Lx.auto }),
            d ? d.backends.map((b) => /* @__PURE__ */ v.jsx(
              "option",
              {
                value: b.id,
                disabled: !b.supported,
                title: b.reason ?? void 0,
                children: Lx[b.id] ?? b.id
              },
              b.id
            )) : Lm.filter((b) => b.value !== "auto").map((b) => /* @__PURE__ */ v.jsx("option", { value: b.value, children: b.label }, b.value))
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: vs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
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
    m && /* @__PURE__ */ v.jsx("span", { className: cn, children: "GPU capabilities unavailable — all options shown." }),
    g && /* @__PURE__ */ v.jsxs("span", { className: cn, children: [
      y.reason ?? "This backend is not supported on the current GPU",
      " — will fall back to flash2 at render time."
    ] }),
    !p && u === "sage3_fp4" && !g && /* @__PURE__ */ v.jsx("span", { className: cn, children: "FP4 — may show artifacts on some GPUs." })
  ] });
}
function dk() {
  const { params: e, updateParam: a } = Qt(), r = (e.blocks_to_swap ?? 0) > 0, l = !r && (e.use_torch_compile ?? !1), s = e.torch_compile_mode ?? "default";
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-torch-compile", children: "torch.compile (experimental)" }),
    /* @__PURE__ */ v.jsxs("div", { className: Sc, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          id: "svi2-torch-compile",
          role: "switch",
          "aria-checked": l,
          disabled: r,
          className: Ec,
          onClick: () => a("use_torch_compile", !l),
          children: /* @__PURE__ */ v.jsx("span", { className: Nc, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: l ? "On" : "Off" })
    ] }),
    l && /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
      /* @__PURE__ */ v.jsx(
        "select",
        {
          "aria-label": "torch.compile mode",
          className: Wi,
          value: s,
          onChange: (u) => a("torch_compile_mode", u.target.value),
          children: zC.map((u) => /* @__PURE__ */ v.jsx("option", { value: u.value, children: u.label }, u.value))
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: vs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
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
    /* @__PURE__ */ v.jsx("span", { className: cn, children: r ? "Set Blocks to swap = 0 to enable — compile needs both experts VRAM-resident (no offload)." : "Compiles the DiT for faster steps; CUDA graphs via reduce-overhead. Falls back to eager if the backend is unavailable. Render report shows whether it engaged." })
  ] });
}
const pp = "off", hk = [
  { value: "off", label: "Off (native resolution)" },
  { value: "auto", label: "Auto (best available)" },
  { value: "maxine", label: "Maxine VSR — RTX (Windows only)" },
  { value: "drct-l-hq", label: "DRCT-L HQ (best, slow)" },
  { value: "drct-l-real", label: "DRCT-L Real (degraded sources)" },
  { value: "hat-l", label: "HAT-L (transformer)" },
  { value: "swinir-l", label: "SwinIR-L (real-world)" },
  { value: "realesrgan", label: "Real-ESRGAN (fast)" }
], mk = [
  { value: 2, label: "2×" },
  { value: 3, label: "3×" },
  { value: 4, label: "4×" }
], pk = [
  { value: "LOW", label: "Low (fastest)" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "ULTRA", label: "Ultra (best)" },
  { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
  { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" }
], gk = 2;
function vk(e) {
  return e === "maxine" || e === "auto";
}
function yk(e, a) {
  return !e || e <= 0 ? pp : a ?? "auto";
}
function bk(e, a) {
  return e === pp ? { upscale_factor: 0 } : { upscale_factor: a && a > 0 ? a : gk, upscale_model: e };
}
function Vh() {
  return /* @__PURE__ */ v.jsx("span", { className: vs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "open" }),
    /* @__PURE__ */ v.jsx(
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
function xk() {
  const { params: e, updateParam: a } = Qt(), r = yk(e.upscale_factor, e.upscale_model), l = r === pp, s = vk(r), u = S.useCallback(
    (c) => {
      const d = bk(c, e.upscale_factor);
      a("upscale_factor", d.upscale_factor), d.upscale_model !== void 0 && a("upscale_model", d.upscale_model);
    },
    [e.upscale_factor, a]
  );
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-engine", children: "Upscaler" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-engine",
            className: Wi,
            value: r,
            onChange: (c) => u(c.target.value),
            children: hk.map((c) => /* @__PURE__ */ v.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Vh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Super-resolution after stitch, before interpolation. Auto = Maxine (RTX/Windows) → DRCT-L → Real-ESRGAN. DRCT-L is the highest-quality transformer (runs on aarch64/GB10)." })
    ] }),
    !l && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-scale", children: "Scale" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-scale",
            className: Wi,
            value: String(e.upscale_factor ?? 2),
            onChange: (c) => a("upscale_factor", Number(c.target.value)),
            children: mk.map((c) => /* @__PURE__ */ v.jsx("option", { value: String(c.value), children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Vh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Output multiplier applied to the rendered resolution." })
    ] }),
    !l && s && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-quality", children: "Maxine quality" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ji, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-quality",
            className: Wi,
            value: String(e.upscale_quality ?? "HIGH"),
            onChange: (c) => a("upscale_quality", c.target.value),
            children: pk.map((c) => /* @__PURE__ */ v.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Vh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Maxine VSR preset (Maxine/Auto on Windows only; ignored by DRCT-L/Real-ESRGAN)." })
    ] })
  ] });
}
var wk = "kn07ek0", _k = "kn07ek1";
const Sk = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function Ek({ issues: e }) {
  const { presetId: a, params: r, updateParam: l } = Qt(), s = Zc(a, r), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ v.jsx("div", { className: wk, children: m_.map((c) => {
    const d = P3(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ v.jsx(
      lk,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: uk(c.id, r),
        badge: c.defaultCollapsed ? /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ v.jsxs("div", { className: _k, children: [
          c.id === "perf" && /* @__PURE__ */ v.jsx(fk, {}),
          c.id === "perf" && /* @__PURE__ */ v.jsx(dk, {}),
          d.map((p) => {
            const m = s ? Sk[p.key] : void 0;
            return /* @__PURE__ */ v.jsx(
              Y8,
              {
                spec: p,
                value: r[p.key],
                error: u(p.key),
                disabled: m !== void 0,
                disabledReason: m,
                onChange: (y) => l(p.key, y)
              },
              p.key
            );
          }),
          c.id === "core" && /* @__PURE__ */ v.jsx(xk, {})
        ] })
      },
      c.id
    );
  }) });
}
var Nk = "_1w9jfpf0", Ck = "_1w9jfpf1", Rk = "_1w9jfpf2", Tk = "_1w9jfpf3", Mk = "_1w9jfpf4", Ak = "_1w9jfpf5";
const bm = "svi2-anchor-panel", F_ = "svi2-prompt-input";
function Dk() {
  const {
    presetId: e,
    presetApplied: a,
    params: r,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d,
    restoreJobIntoForm: p,
    getIsDirty: m
  } = Qt(), { issues: y, blocked: g, busy: b, submit: x, cancel: _, focusRequest: E } = __(), [N, R] = S.useState(null);
  Ok(E);
  const j = as("svi2/presets", C1), C = as("svi2/history", () => v5(25)), O = j.data?.presets ?? [];
  S.useEffect(() => {
    if (a || O.length === 0) return;
    const T = O.find((z) => z.id === e) ?? O[0];
    T && s(T, { markDirty: !1 });
  }, [a, O, e, s]);
  const B = C.data?.jobs ?? [], k = r.mode ?? "image_to_video", H = k !== "text_to_video", A = op(e, r), Y = y.find((T) => T.field === "ref_image_path")?.message, le = y.find((T) => T.field === "last_image_path")?.message, q = y.find((T) => T.field === "prompts")?.message, Q = y.find(
    (T) => T.field === "width" && T.severity === "warning"
  )?.message, ne = S.useCallback(
    (T) => {
      if (T.status !== "succeeded") {
        d(T);
        return;
      }
      if (m()) {
        R(T.id);
        return;
      }
      p(T);
    },
    [d, p, m]
  ), L = S.useCallback(() => {
    const T = B.find((z) => z.id === N);
    R(null), T && p(T);
  }, [N, B, p]), I = S.useCallback(() => R(null), []);
  return /* @__PURE__ */ v.jsxs("div", { className: Nk, children: [
    /* @__PURE__ */ v.jsx(
      UO,
      {
        open: N !== null,
        title: "Load this run into the form?",
        message: "Unsaved changes will be replaced.",
        confirmLabel: "Load run",
        cancelLabel: "Keep editing",
        onConfirm: L,
        onCancel: I
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Ck, children: [
      /* @__PURE__ */ v.jsx(
        Ba,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ v.jsx(s6, { presets: O, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ v.jsxs(
        Ba,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: [
            /* @__PURE__ */ v.jsx(bL, { value: k, onChange: u }),
            k === "text_to_video" && /* @__PURE__ */ v.jsx(I8, {})
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("div", { id: bm, children: /* @__PURE__ */ v.jsx(
        Ba,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ v.jsx(
            ez,
            {
              refImageRequired: H,
              lastImageRequired: A,
              refError: Y,
              lastError: le
            }
          )
        }
      ) }),
      /* @__PURE__ */ v.jsx(Ba, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ v.jsx(b6, { error: q, textareaId: F_ }) }),
      /* @__PURE__ */ v.jsx(Ba, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ v.jsx(T6, {}) }),
      /* @__PURE__ */ v.jsxs(
        Ba,
        {
          title: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            /* @__PURE__ */ v.jsx("span", { className: Mk, children: "Inference · Parameters" }),
            "Parameters"
          ] }),
          description: "Grouped by tier. Advanced tiers stay collapsed.",
          actions: /* @__PURE__ */ v.jsx(
            ua,
            {
              variant: "secondary",
              size: "sm",
              title: "Re-apply the active preset's defaults",
              onClick: () => {
                const T = O.find((z) => z.id === e);
                T && s(T);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ v.jsx(hL, { presets: O, warningText: Q }),
            /* @__PURE__ */ v.jsxs("div", { className: Ak, children: [
              /* @__PURE__ */ v.jsx(kL, {}),
              /* @__PURE__ */ v.jsx(U8, { presets: O }),
              /* @__PURE__ */ v.jsx(kz, {}),
              /* @__PURE__ */ v.jsx(Pz, {})
            ] }),
            /* @__PURE__ */ v.jsx(Ek, { issues: y }),
            /* @__PURE__ */ v.jsx(FL, { presets: O })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Rk, children: [
      /* @__PURE__ */ v.jsxs(
        Ba,
        {
          title: "Render",
          description: b ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ v.jsx(S8, { state: l, onCancel: _, onReset: c }),
            !b && /* @__PURE__ */ v.jsx("div", { className: Tk, children: /* @__PURE__ */ v.jsx(
              ua,
              {
                variant: "primary",
                disabled: g,
                title: g ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void x(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ v.jsx(Ba, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ v.jsx(jL, { jobs: B, onOpen: ne }) })
    ] })
  ] });
}
const jk = {
  ref_image_path: bm,
  last_image_path: bm,
  prompts: F_
};
function Ok(e) {
  S.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = jk[e.field];
    if (a) {
      const l = document.getElementById(a);
      kx(l);
      return;
    }
    zk(e.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      kx(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [e]);
}
function zk(e) {
  const a = Pc.find((s) => s.key === e);
  if (!a) return;
  const r = m_.find((s) => s.id === a.tier);
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
function kx(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var Lk = "_1smvon90", br = "_1smvon91", xr = "_1smvon92", wr = "_1smvon93", Ku = "_1smvon94", $h = "_1smvon95 _1smvon94", kk = "_1smvon96", Hk = "_1smvon97";
const Bk = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function Uk() {
  const { settings: e, setSettings: a } = Qt(), [r, l] = S.useState(e), [s, u] = S.useState(!1), c = S.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== e[m]
    ),
    [r, e]
  ), d = (m, y) => {
    l((g) => ({ ...g, [m]: y }));
  }, p = async () => {
    u(!0);
    try {
      const m = await fc(r);
      a(m), l(m), $a.success("Settings saved. Applied to new renders.");
    } catch {
      $a.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ v.jsxs(
    Ba,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ v.jsxs("div", { className: Lk, children: [
          /* @__PURE__ */ v.jsxs("label", { className: br, children: [
            /* @__PURE__ */ v.jsx("span", { className: xr, children: "Models directory" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: Ku,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => d("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: br, children: [
            /* @__PURE__ */ v.jsx("span", { className: xr, children: "Output directory" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: Ku,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => d("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: br, children: [
            /* @__PURE__ */ v.jsx("span", { className: xr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: $h,
                value: r.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: Lm.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: br, children: [
            /* @__PURE__ */ v.jsx("span", { className: xr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: $h,
                value: r.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: jC.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: br, children: [
            /* @__PURE__ */ v.jsx("span", { className: xr, children: "Blocks to swap" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: Ku,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (m) => d("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: br, children: [
            /* @__PURE__ */ v.jsx("span", { className: xr, children: "Interpolation method" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: $h,
                value: r.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: Bk.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: br, children: [
            /* @__PURE__ */ v.jsx("span", { className: xr, children: "Interpolate target fps" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: Ku,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (m) => d("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: kk, children: [
          /* @__PURE__ */ v.jsx(ua, { loading: s, disabled: !c, onClick: () => void p(), children: "Save settings" }),
          /* @__PURE__ */ v.jsx(
            ua,
            {
              variant: "secondary",
              onClick: () => l(e),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ v.jsx("output", { className: Hk, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var Vk = "_1ugwva20", $k = "_1ugwva21", qk = "_1ugwva22", Ik = "_1ugwva23", Yk = "_1ugwva24", Gk = "_1ugwva25";
function Fk() {
  const e = UN(), { deploymentId: a } = MN(), r = Xk(e.catalog?.presets ?? []);
  return /* @__PURE__ */ v.jsxs(
    N5,
    {
      initialSettings: e.settings,
      initialPreset: r,
      deploymentId: a,
      children: [
        /* @__PURE__ */ v.jsxs("div", { className: Vk, children: [
          /* @__PURE__ */ v.jsx("header", { className: $k, children: /* @__PURE__ */ v.jsxs("div", { className: qk, children: [
            /* @__PURE__ */ v.jsx("h1", { className: Ik, children: "SVI 2.0 Pro" }),
            /* @__PURE__ */ v.jsx("p", { className: Yk, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
          ] }) }),
          /* @__PURE__ */ v.jsx("main", { className: Gk, children: /* @__PURE__ */ v.jsx(JN, {}) })
        ] }),
        /* @__PURE__ */ v.jsx(X3, { position: "bottom-right", theme: "dark", richColors: !0 })
      ]
    }
  );
}
function Xk(e) {
  return e.find((a) => a.id === ns) ?? e[0] ?? null;
}
async function Pk() {
  const [e, a] = await Promise.all([
    C1().catch(() => null),
    kC().catch(() => N1)
  ]);
  return { catalog: e, settings: a };
}
function Zk() {
  return [
    {
      path: "/",
      loader: () => dy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: Pk,
      Component: Fk,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => dy(`/${Qk(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: Dk },
        { path: "dag", Component: aO },
        { path: "settings", Component: Uk }
      ]
    }
  ];
}
function Qk(e, a) {
  const r = e[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const Hx = "ext-actions-request", Kk = "ext-actions-declare", Jk = "ext-action-state", Bx = "ext-action-invoke", Ux = "svi2-pro:navigate", Vx = "svi2-pro.render";
function Wk(e, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: Vx,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(Kk, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(Jk, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === Vx && C5();
  }, y = M5((g) => {
    r = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(Hx, p), e.addEventListener(Bx, m), c(), {
    dispose: () => {
      y(), e.removeEventListener(Hx, p), e.removeEventListener(Bx, m);
    }
  };
}
const xm = "svi2-pro-app", eH = "ext-event", $x = "svi2-pro-stylesheet", qx = ["accent", "density", "card"];
function tH(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function nH() {
  if (typeof document > "u" || document.getElementById($x)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = $x, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
nH();
class aH extends HTMLElement {
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
    this.root = s2.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Ux, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = Wk(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(Ux, a);
  }
  syncTweaksFromBody() {
    for (const a of qx) {
      const r = tH(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
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
    const a = this.resolveInitialEntry();
    if (this.router && this.paintedEntry === a) return;
    const r = XN(Zk(), { initialEntries: [a] });
    this.router = r, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ v.jsx(S.StrictMode, { children: /* @__PURE__ */ v.jsx(ZN, { router: r }) })
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
      new CustomEvent(eH, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function iH() {
  typeof customElements > "u" || customElements.get(xm) || customElements.define(xm, aH);
}
typeof customElements < "u" && !customElements.get(xm) && iH();
export {
  iH as register
};
//# sourceMappingURL=svi2-pro.js.map
