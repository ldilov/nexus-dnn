function DE(t, a) {
  for (var i = 0; i < a.length; i++) {
    const l = a[i];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const o in l)
        if (o !== "default" && !(o in t)) {
          const u = Object.getOwnPropertyDescriptor(l, o);
          u && Object.defineProperty(t, o, u.get ? u : {
            enumerable: !0,
            get: () => l[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function Gb(t) {
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
var Fv;
function zE() {
  if (Fv) return Gs;
  Fv = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(l, o, u) {
    var h = null;
    if (u !== void 0 && (h = "" + u), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      u = {};
      for (var m in o)
        m !== "key" && (u[m] = o[m]);
    } else u = o;
    return o = u.ref, {
      $$typeof: t,
      type: l,
      key: h,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return Gs.Fragment = a, Gs.jsx = i, Gs.jsxs = i, Gs;
}
var Yv;
function OE() {
  return Yv || (Yv = 1, Pd.exports = zE()), Pd.exports;
}
var d = OE(), Kd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gv;
function kE() {
  if (Gv) return Le;
  Gv = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), S = Symbol.iterator;
  function E(M) {
    return M === null || typeof M != "object" ? null : (M = S && M[S] || M["@@iterator"], typeof M == "function" ? M : null);
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
  }, N = Object.assign, R = {};
  function T(M, Q, X) {
    this.props = M, this.context = Q, this.refs = R, this.updater = X || w;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(M, Q) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, Q, "setState");
  }, T.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function k() {
  }
  k.prototype = T.prototype;
  function _(M, Q, X) {
    this.props = M, this.context = Q, this.refs = R, this.updater = X || w;
  }
  var A = _.prototype = new k();
  A.constructor = _, N(A, T.prototype), A.isPureReactComponent = !0;
  var Z = Array.isArray;
  function W() {
  }
  var ne = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function q(M, Q, X) {
    var le = X.ref;
    return {
      $$typeof: t,
      type: M,
      key: Q,
      ref: le !== void 0 ? le : null,
      props: X
    };
  }
  function I(M, Q) {
    return q(M.type, Q, M.props);
  }
  function ie(M) {
    return typeof M == "object" && M !== null && M.$$typeof === t;
  }
  function re(M) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(X) {
      return Q[X];
    });
  }
  var te = /\/+/g;
  function ce(M, Q) {
    return typeof M == "object" && M !== null && M.key != null ? re("" + M.key) : Q.toString(36);
  }
  function J(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(W, W) : (M.status = "pending", M.then(
          function(Q) {
            M.status === "pending" && (M.status = "fulfilled", M.value = Q);
          },
          function(Q) {
            M.status === "pending" && (M.status = "rejected", M.reason = Q);
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
  function O(M, Q, X, le, fe) {
    var ve = typeof M;
    (ve === "undefined" || ve === "boolean") && (M = null);
    var Ae = !1;
    if (M === null) Ae = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          Ae = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case t:
            case a:
              Ae = !0;
              break;
            case x:
              return Ae = M._init, O(
                Ae(M._payload),
                Q,
                X,
                le,
                fe
              );
          }
      }
    if (Ae)
      return fe = fe(M), Ae = le === "" ? "." + ce(M, 0) : le, Z(fe) ? (X = "", Ae != null && (X = Ae.replace(te, "$&/") + "/"), O(fe, Q, X, "", function(Jt) {
        return Jt;
      })) : fe != null && (ie(fe) && (fe = I(
        fe,
        X + (fe.key == null || M && M.key === fe.key ? "" : ("" + fe.key).replace(
          te,
          "$&/"
        ) + "/") + Ae
      )), Q.push(fe)), 1;
    Ae = 0;
    var Me = le === "" ? "." : le + ":";
    if (Z(M))
      for (var $e = 0; $e < M.length; $e++)
        le = M[$e], ve = Me + ce(le, $e), Ae += O(
          le,
          Q,
          X,
          ve,
          fe
        );
    else if ($e = E(M), typeof $e == "function")
      for (M = $e.call(M), $e = 0; !(le = M.next()).done; )
        le = le.value, ve = Me + ce(le, $e++), Ae += O(
          le,
          Q,
          X,
          ve,
          fe
        );
    else if (ve === "object") {
      if (typeof M.then == "function")
        return O(
          J(M),
          Q,
          X,
          le,
          fe
        );
      throw Q = String(M), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ae;
  }
  function C(M, Q, X) {
    if (M == null) return M;
    var le = [], fe = 0;
    return O(M, le, "", "", function(ve) {
      return Q.call(X, ve, fe++);
    }), le;
  }
  function U(M) {
    if (M._status === -1) {
      var Q = M._result;
      Q = Q(), Q.then(
        function(X) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = X);
        },
        function(X) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = X);
        }
      ), M._status === -1 && (M._status = 0, M._result = Q);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var B = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(Q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  }, K = {
    map: C,
    forEach: function(M, Q, X) {
      C(
        M,
        function() {
          Q.apply(this, arguments);
        },
        X
      );
    },
    count: function(M) {
      var Q = 0;
      return C(M, function() {
        Q++;
      }), Q;
    },
    toArray: function(M) {
      return C(M, function(Q) {
        return Q;
      }) || [];
    },
    only: function(M) {
      if (!ie(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  };
  return Le.Activity = g, Le.Children = K, Le.Component = T, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = _, Le.StrictMode = l, Le.Suspense = v, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, Le.__COMPILER_RUNTIME = {
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
  }, Le.cloneElement = function(M, Q, X) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var le = N({}, M.props), fe = M.key;
    if (Q != null)
      for (ve in Q.key !== void 0 && (fe = "" + Q.key), Q)
        !D.call(Q, ve) || ve === "key" || ve === "__self" || ve === "__source" || ve === "ref" && Q.ref === void 0 || (le[ve] = Q[ve]);
    var ve = arguments.length - 2;
    if (ve === 1) le.children = X;
    else if (1 < ve) {
      for (var Ae = Array(ve), Me = 0; Me < ve; Me++)
        Ae[Me] = arguments[Me + 2];
      le.children = Ae;
    }
    return q(M.type, fe, le);
  }, Le.createContext = function(M) {
    return M = {
      $$typeof: h,
      _currentValue: M,
      _currentValue2: M,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, M.Provider = M, M.Consumer = {
      $$typeof: u,
      _context: M
    }, M;
  }, Le.createElement = function(M, Q, X) {
    var le, fe = {}, ve = null;
    if (Q != null)
      for (le in Q.key !== void 0 && (ve = "" + Q.key), Q)
        D.call(Q, le) && le !== "key" && le !== "__self" && le !== "__source" && (fe[le] = Q[le]);
    var Ae = arguments.length - 2;
    if (Ae === 1) fe.children = X;
    else if (1 < Ae) {
      for (var Me = Array(Ae), $e = 0; $e < Ae; $e++)
        Me[$e] = arguments[$e + 2];
      fe.children = Me;
    }
    if (M && M.defaultProps)
      for (le in Ae = M.defaultProps, Ae)
        fe[le] === void 0 && (fe[le] = Ae[le]);
    return q(M, ve, fe);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(M) {
    return { $$typeof: m, render: M };
  }, Le.isValidElement = ie, Le.lazy = function(M) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: M },
      _init: U
    };
  }, Le.memo = function(M, Q) {
    return {
      $$typeof: p,
      type: M,
      compare: Q === void 0 ? null : Q
    };
  }, Le.startTransition = function(M) {
    var Q = ne.T, X = {};
    ne.T = X;
    try {
      var le = M(), fe = ne.S;
      fe !== null && fe(X, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(W, B);
    } catch (ve) {
      B(ve);
    } finally {
      Q !== null && X.types !== null && (Q.types = X.types), ne.T = Q;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, Le.use = function(M) {
    return ne.H.use(M);
  }, Le.useActionState = function(M, Q, X) {
    return ne.H.useActionState(M, Q, X);
  }, Le.useCallback = function(M, Q) {
    return ne.H.useCallback(M, Q);
  }, Le.useContext = function(M) {
    return ne.H.useContext(M);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(M, Q) {
    return ne.H.useDeferredValue(M, Q);
  }, Le.useEffect = function(M, Q) {
    return ne.H.useEffect(M, Q);
  }, Le.useEffectEvent = function(M) {
    return ne.H.useEffectEvent(M);
  }, Le.useId = function() {
    return ne.H.useId();
  }, Le.useImperativeHandle = function(M, Q, X) {
    return ne.H.useImperativeHandle(M, Q, X);
  }, Le.useInsertionEffect = function(M, Q) {
    return ne.H.useInsertionEffect(M, Q);
  }, Le.useLayoutEffect = function(M, Q) {
    return ne.H.useLayoutEffect(M, Q);
  }, Le.useMemo = function(M, Q) {
    return ne.H.useMemo(M, Q);
  }, Le.useOptimistic = function(M, Q) {
    return ne.H.useOptimistic(M, Q);
  }, Le.useReducer = function(M, Q, X) {
    return ne.H.useReducer(M, Q, X);
  }, Le.useRef = function(M) {
    return ne.H.useRef(M);
  }, Le.useState = function(M) {
    return ne.H.useState(M);
  }, Le.useSyncExternalStore = function(M, Q, X) {
    return ne.H.useSyncExternalStore(
      M,
      Q,
      X
    );
  }, Le.useTransition = function() {
    return ne.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var Xv;
function xh() {
  return Xv || (Xv = 1, Kd.exports = kE()), Kd.exports;
}
var y = xh();
const me = /* @__PURE__ */ Gb(y), LE = /* @__PURE__ */ DE({
  __proto__: null,
  default: me
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
var Pv;
function UE() {
  return Pv || (Pv = 1, (function(t) {
    function a(O, C) {
      var U = O.length;
      O.push(C);
      e: for (; 0 < U; ) {
        var B = U - 1 >>> 1, K = O[B];
        if (0 < o(K, C))
          O[B] = C, O[U] = K, U = B;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function l(O) {
      if (O.length === 0) return null;
      var C = O[0], U = O.pop();
      if (U !== C) {
        O[0] = U;
        e: for (var B = 0, K = O.length, M = K >>> 1; B < M; ) {
          var Q = 2 * (B + 1) - 1, X = O[Q], le = Q + 1, fe = O[le];
          if (0 > o(X, U))
            le < K && 0 > o(fe, X) ? (O[B] = fe, O[le] = U, B = le) : (O[B] = X, O[Q] = U, B = Q);
          else if (le < K && 0 > o(fe, U))
            O[B] = fe, O[le] = U, B = le;
          else break e;
        }
      }
      return C;
    }
    function o(O, C) {
      var U = O.sortIndex - C.sortIndex;
      return U !== 0 ? U : O.id - C.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var h = Date, m = h.now();
      t.unstable_now = function() {
        return h.now() - m;
      };
    }
    var v = [], p = [], x = 1, g = null, S = 3, E = !1, w = !1, N = !1, R = !1, T = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function A(O) {
      for (var C = i(p); C !== null; ) {
        if (C.callback === null) l(p);
        else if (C.startTime <= O)
          l(p), C.sortIndex = C.expirationTime, a(v, C);
        else break;
        C = i(p);
      }
    }
    function Z(O) {
      if (N = !1, A(O), !w)
        if (i(v) !== null)
          w = !0, W || (W = !0, re());
        else {
          var C = i(p);
          C !== null && J(Z, C.startTime - O);
        }
    }
    var W = !1, ne = -1, D = 5, q = -1;
    function I() {
      return R ? !0 : !(t.unstable_now() - q < D);
    }
    function ie() {
      if (R = !1, W) {
        var O = t.unstable_now();
        q = O;
        var C = !0;
        try {
          e: {
            w = !1, N && (N = !1, k(ne), ne = -1), E = !0;
            var U = S;
            try {
              t: {
                for (A(O), g = i(v); g !== null && !(g.expirationTime > O && I()); ) {
                  var B = g.callback;
                  if (typeof B == "function") {
                    g.callback = null, S = g.priorityLevel;
                    var K = B(
                      g.expirationTime <= O
                    );
                    if (O = t.unstable_now(), typeof K == "function") {
                      g.callback = K, A(O), C = !0;
                      break t;
                    }
                    g === i(v) && l(v), A(O);
                  } else l(v);
                  g = i(v);
                }
                if (g !== null) C = !0;
                else {
                  var M = i(p);
                  M !== null && J(
                    Z,
                    M.startTime - O
                  ), C = !1;
                }
              }
              break e;
            } finally {
              g = null, S = U, E = !1;
            }
            C = void 0;
          }
        } finally {
          C ? re() : W = !1;
        }
      }
    }
    var re;
    if (typeof _ == "function")
      re = function() {
        _(ie);
      };
    else if (typeof MessageChannel < "u") {
      var te = new MessageChannel(), ce = te.port2;
      te.port1.onmessage = ie, re = function() {
        ce.postMessage(null);
      };
    } else
      re = function() {
        T(ie, 0);
      };
    function J(O, C) {
      ne = T(function() {
        O(t.unstable_now());
      }, C);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, t.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < O ? Math.floor(1e3 / O) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, t.unstable_next = function(O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var C = 3;
          break;
        default:
          C = S;
      }
      var U = S;
      S = C;
      try {
        return O();
      } finally {
        S = U;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(O, C) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var U = S;
      S = O;
      try {
        return C();
      } finally {
        S = U;
      }
    }, t.unstable_scheduleCallback = function(O, C, U) {
      var B = t.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? B + U : B) : U = B, O) {
        case 1:
          var K = -1;
          break;
        case 2:
          K = 250;
          break;
        case 5:
          K = 1073741823;
          break;
        case 4:
          K = 1e4;
          break;
        default:
          K = 5e3;
      }
      return K = U + K, O = {
        id: x++,
        callback: C,
        priorityLevel: O,
        startTime: U,
        expirationTime: K,
        sortIndex: -1
      }, U > B ? (O.sortIndex = U, a(p, O), i(v) === null && O === i(p) && (N ? (k(ne), ne = -1) : N = !0, J(Z, U - B))) : (O.sortIndex = K, a(v, O), w || E || (w = !0, W || (W = !0, re()))), O;
    }, t.unstable_shouldYield = I, t.unstable_wrapCallback = function(O) {
      var C = S;
      return function() {
        var U = S;
        S = C;
        try {
          return O.apply(this, arguments);
        } finally {
          S = U;
        }
      };
    };
  })(Jd)), Jd;
}
var Kv;
function BE() {
  return Kv || (Kv = 1, Zd.exports = UE()), Zd.exports;
}
var Wd = { exports: {} }, on = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qv;
function VE() {
  if (Qv) return on;
  Qv = 1;
  var t = xh();
  function a(v) {
    var p = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        p += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return "Minified React error #" + v + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(v, p, x) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: g == null ? null : "" + g,
      children: v,
      containerInfo: p,
      implementation: x
    };
  }
  var h = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(v, p) {
    if (v === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return on.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, on.createPortal = function(v, p) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return u(v, p, null, x);
  }, on.flushSync = function(v) {
    var p = h.T, x = l.p;
    try {
      if (h.T = null, l.p = 2, v) return v();
    } finally {
      h.T = p, l.p = x, l.d.f();
    }
  }, on.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, l.d.C(v, p));
  }, on.prefetchDNS = function(v) {
    typeof v == "string" && l.d.D(v);
  }, on.preinit = function(v, p) {
    if (typeof v == "string" && p && typeof p.as == "string") {
      var x = p.as, g = m(x, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, E = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      x === "style" ? l.d.S(
        v,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: g,
          integrity: S,
          fetchPriority: E
        }
      ) : x === "script" && l.d.X(v, {
        crossOrigin: g,
        integrity: S,
        fetchPriority: E,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, on.preinitModule = function(v, p) {
    if (typeof v == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var x = m(
            p.as,
            p.crossOrigin
          );
          l.d.M(v, {
            crossOrigin: x,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && l.d.M(v);
  }, on.preload = function(v, p) {
    if (typeof v == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var x = p.as, g = m(x, p.crossOrigin);
      l.d.L(v, x, {
        crossOrigin: g,
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
  }, on.preloadModule = function(v, p) {
    if (typeof v == "string")
      if (p) {
        var x = m(p.as, p.crossOrigin);
        l.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: x,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else l.d.m(v);
  }, on.requestFormReset = function(v) {
    l.d.r(v);
  }, on.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, on.useFormState = function(v, p, x) {
    return h.H.useFormState(v, p, x);
  }, on.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, on.version = "19.2.5", on;
}
var Zv;
function Xb() {
  if (Zv) return Wd.exports;
  Zv = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Wd.exports = VE(), Wd.exports;
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
var Jv;
function $E() {
  if (Jv) return Xs;
  Jv = 1;
  var t = BE(), a = xh(), i = Xb();
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
  function v(e) {
    if (u(e) !== e)
      throw Error(l(188));
  }
  function p(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(l(188));
      return n !== e ? null : e;
    }
    for (var r = e, s = n; ; ) {
      var c = r.return;
      if (c === null) break;
      var f = c.alternate;
      if (f === null) {
        if (s = c.return, s !== null) {
          r = s;
          continue;
        }
        break;
      }
      if (c.child === f.child) {
        for (f = c.child; f; ) {
          if (f === r) return v(c), e;
          if (f === s) return v(c), n;
          f = f.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== s.return) r = c, s = f;
      else {
        for (var b = !1, j = c.child; j; ) {
          if (j === r) {
            b = !0, r = c, s = f;
            break;
          }
          if (j === s) {
            b = !0, s = c, r = f;
            break;
          }
          j = j.sibling;
        }
        if (!b) {
          for (j = f.child; j; ) {
            if (j === r) {
              b = !0, r = f, s = c;
              break;
            }
            if (j === s) {
              b = !0, s = f, r = c;
              break;
            }
            j = j.sibling;
          }
          if (!b) throw Error(l(189));
        }
      }
      if (r.alternate !== s) throw Error(l(190));
    }
    if (r.tag !== 3) throw Error(l(188));
    return r.stateNode.current === r ? e : n;
  }
  function x(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = x(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var g = Object.assign, S = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), A = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), I = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
  function re(e) {
    return e === null || typeof e != "object" ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var te = Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === te ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case T:
        return "Profiler";
      case R:
        return "StrictMode";
      case Z:
        return "Suspense";
      case W:
        return "SuspenseList";
      case q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case _:
          return e.displayName || "Context";
        case k:
          return (e._context.displayName || "Context") + ".Consumer";
        case A:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ne:
          return n = e.displayName || null, n !== null ? n : ce(e.type) || "Memo";
        case D:
          n = e._payload, e = e._init;
          try {
            return ce(e(n));
          } catch {
          }
      }
    return null;
  }
  var J = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, B = [], K = -1;
  function M(e) {
    return { current: e };
  }
  function Q(e) {
    0 > K || (e.current = B[K], B[K] = null, K--);
  }
  function X(e, n) {
    K++, B[K] = e.current, e.current = n;
  }
  var le = M(null), fe = M(null), ve = M(null), Ae = M(null);
  function Me(e, n) {
    switch (X(ve, n), X(fe, e), X(le, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? hv(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = hv(n), e = mv(n, e);
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
    Q(le), X(le, e);
  }
  function $e() {
    Q(le), Q(fe), Q(ve);
  }
  function Jt(e) {
    e.memoizedState !== null && X(Ae, e);
    var n = le.current, r = mv(n, e.type);
    n !== r && (X(fe, e), X(le, r));
  }
  function Pt(e) {
    fe.current === e && (Q(le), Q(fe)), Ae.current === e && (Q(Ae), qs._currentValue = U);
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
  var he = !1;
  function ke(e, n) {
    if (!e || he) return "";
    he = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var oe = function() {
                throw Error();
              };
              if (Object.defineProperty(oe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(oe, []);
                } catch (ee) {
                  var P = ee;
                }
                Reflect.construct(e, [], oe);
              } else {
                try {
                  oe.call();
                } catch (ee) {
                  P = ee;
                }
                e.call(oe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ee) {
                P = ee;
              }
              (oe = e()) && typeof oe.catch == "function" && oe.catch(function() {
              });
            }
          } catch (ee) {
            if (ee && P && typeof ee.stack == "string")
              return [ee.stack, P.stack];
          }
          return [null, null];
        }
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        s.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = s.DetermineComponentFrameRoot(), b = f[0], j = f[1];
      if (b && j) {
        var L = b.split(`
`), G = j.split(`
`);
        for (c = s = 0; s < L.length && !L[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; c < G.length && !G[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (s === L.length || c === G.length)
          for (s = L.length - 1, c = G.length - 1; 1 <= s && 0 <= c && L[s] !== G[c]; )
            c--;
        for (; 1 <= s && 0 <= c; s--, c--)
          if (L[s] !== G[c]) {
            if (s !== 1 || c !== 1)
              do
                if (s--, c--, 0 > c || L[s] !== G[c]) {
                  var ae = `
` + L[s].replace(" at new ", " at ");
                  return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), ae;
                }
              while (1 <= s && 0 <= c);
            break;
          }
      }
    } finally {
      he = !1, Error.prepareStackTrace = r;
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
        return ke(e.type, !1);
      case 11:
        return ke(e.type.render, !1);
      case 1:
        return ke(e.type, !0);
      case 31:
        return pt("Activity");
      default:
        return "";
    }
  }
  function Te(e) {
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
  var bt = Object.prototype.hasOwnProperty, xt = t.unstable_scheduleCallback, dn = t.unstable_cancelCallback, Ht = t.unstable_shouldYield, On = t.unstable_requestPaint, qt = t.unstable_now, ye = t.unstable_getCurrentPriorityLevel, ze = t.unstable_ImmediatePriority, Qe = t.unstable_UserBlockingPriority, nt = t.unstable_NormalPriority, It = t.unstable_LowPriority, Ft = t.unstable_IdlePriority, jr = t.log, sa = t.unstable_setDisableYieldValue, Zn = null, Wt = null;
  function Tt(e) {
    if (typeof jr == "function" && sa(e), Wt && typeof Wt.setStrictMode == "function")
      try {
        Wt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : kn, ei = Math.log, Ha = Math.LN2;
  function kn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ei(e) / Ha | 0) | 0;
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
  function Oe(e, n, r) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var c = 0, f = e.suspendedLanes, b = e.pingedLanes;
    e = e.warmLanes;
    var j = s & 134217727;
    return j !== 0 ? (s = j & ~f, s !== 0 ? c = hn(s) : (b &= j, b !== 0 ? c = hn(b) : r || (r = j & ~e, r !== 0 && (c = hn(r))))) : (j = s & ~f, j !== 0 ? c = hn(j) : b !== 0 ? c = hn(b) : r || (r = s & ~e, r !== 0 && (c = hn(r)))), c === 0 ? 0 : n !== 0 && n !== c && (n & f) === 0 && (f = c & -c, r = n & -n, f >= r || f === 32 && (r & 4194048) !== 0) ? n : c;
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
  function en(e, n, r, s, c, f) {
    var b = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var j = e.entanglements, L = e.expirationTimes, G = e.hiddenUpdates;
    for (r = b & ~r; 0 < r; ) {
      var ae = 31 - Yt(r), oe = 1 << ae;
      j[ae] = 0, L[ae] = -1;
      var P = G[ae];
      if (P !== null)
        for (G[ae] = null, ae = 0; ae < P.length; ae++) {
          var ee = P[ae];
          ee !== null && (ee.lane &= -536870913);
        }
      r &= ~oe;
    }
    s !== 0 && va(e, s, 0), f !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(b & ~n));
  }
  function va(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var s = 31 - Yt(n);
    e.entangledLanes |= n, e.entanglements[s] = e.entanglements[s] | 1073741824 | r & 261930;
  }
  function sn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var s = 31 - Yt(r), c = 1 << s;
      c & n | e[s] & n && (e[s] |= n), r &= ~c;
    }
  }
  function z(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : $(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function $(e) {
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
  function F(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ue() {
    var e = C.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Uv(e.type));
  }
  function de(e, n) {
    var r = C.p;
    try {
      return C.p = e, n();
    } finally {
      C.p = r;
    }
  }
  var Se = Math.random().toString(36).slice(2), pe = "__reactFiber$" + Se, ge = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Re = "__reactListeners$" + Se, Ne = "__reactHandles$" + Se, Ze = "__reactResources$" + Se, He = "__reactMarker$" + Se;
  function dt(e) {
    delete e[pe], delete e[ge], delete e[be], delete e[Re], delete e[Ne];
  }
  function st(e) {
    var n = e[pe];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Ee] || r[pe]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Sv(e); e !== null; ) {
            if (r = e[pe]) return r;
            e = Sv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function St(e) {
    if (e = e[pe] || e[Ee]) {
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
  function ti(e) {
    return bt.call(Tr, e) ? !0 : bt.call(ca, e) ? !1 : Nr.test(e) ? Tr[e] = !0 : (ca[e] = !0, !1);
  }
  function qe(e, n, r) {
    if (ti(n))
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
  function ln(e, n, r, s) {
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
  function Ot(e) {
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
  function gt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ni(e, n, r) {
    var s = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var c = s.get, f = s.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(b) {
          r = "" + b, f.call(this, b);
        }
      }), Object.defineProperty(e, n, {
        enumerable: s.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(b) {
          r = "" + b;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function ai(e) {
    if (!e._valueTracker) {
      var n = gt(e) ? "checked" : "value";
      e._valueTracker = ni(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Al(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), s = "";
    return e && (s = gt(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Dl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var TS = /[\n"\\]/g;
  function Ln(e) {
    return e.replace(
      TS,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qc(e, n, r, s, c, f, b, j) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), n != null ? b === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Ot(n)) : e.value !== "" + Ot(n) && (e.value = "" + Ot(n)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), n != null ? Ic(e, b, Ot(n)) : r != null ? Ic(e, b, Ot(r)) : s != null && e.removeAttribute("value"), c == null && f != null && (e.defaultChecked = !!f), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), j != null && typeof j != "function" && typeof j != "symbol" && typeof j != "boolean" ? e.name = "" + Ot(j) : e.removeAttribute("name");
  }
  function lm(e, n, r, s, c, f, b, j) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || n != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + Ot(r) : "", n = n != null ? "" + Ot(n) : r, j || n === e.value || (e.value = n), e.defaultValue = n;
    }
    s = s ?? c, s = typeof s != "function" && typeof s != "symbol" && !!s, e.checked = j ? e.checked : !!s, e.defaultChecked = !!s, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b), ai(e);
  }
  function Ic(e, n, r) {
    n === "number" && Dl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, n, r, s) {
    if (e = e.options, n) {
      n = {};
      for (var c = 0; c < r.length; c++)
        n["$" + r[c]] = !0;
      for (r = 0; r < e.length; r++)
        c = n.hasOwnProperty("$" + e[r].value), e[r].selected !== c && (e[r].selected = c), c && s && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Ot(r), n = null, c = 0; c < e.length; c++) {
        if (e[c].value === r) {
          e[c].selected = !0, s && (e[c].defaultSelected = !0);
          return;
        }
        n !== null || e[c].disabled || (n = e[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function om(e, n, r) {
    if (n != null && (n = "" + Ot(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Ot(r) : "";
  }
  function cm(e, n, r, s) {
    if (n == null) {
      if (s != null) {
        if (r != null) throw Error(l(92));
        if (J(s)) {
          if (1 < s.length) throw Error(l(93));
          s = s[0];
        }
        r = s;
      }
      r == null && (r = ""), n = r;
    }
    r = Ot(n), e.defaultValue = r, s = e.textContent, s === r && s !== "" && s !== null && (e.value = s), ai(e);
  }
  function ii(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var CS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function um(e, n, r) {
    var s = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? s ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : s ? e.setProperty(n, r) : typeof r != "number" || r === 0 || CS.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function dm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (e = e.style, r != null) {
      for (var s in r)
        !r.hasOwnProperty(s) || n != null && n.hasOwnProperty(s) || (s.indexOf("--") === 0 ? e.setProperty(s, "") : s === "float" ? e.cssFloat = "" : e[s] = "");
      for (var c in n)
        s = n[c], n.hasOwnProperty(c) && r[c] !== s && um(e, c, s);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && um(e, f, n[f]);
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
  var RS = /* @__PURE__ */ new Map([
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
  ]), MS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zl(e) {
    return MS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ya() {
  }
  var Yc = null;
  function Gc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var si = null, li = null;
  function fm(e) {
    var n = St(e);
    if (n && (e = n.stateNode)) {
      var r = e[ge] || null;
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
                var c = s[ge] || null;
                if (!c) throw Error(l(90));
                qc(
                  s,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name
                );
              }
            }
            for (n = 0; n < r.length; n++)
              s = r[n], s.form === e.form && Al(s);
          }
          break e;
        case "textarea":
          om(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ri(e, !!r.multiple, n, !1);
      }
    }
  }
  var Xc = !1;
  function hm(e, n, r) {
    if (Xc) return e(n, r);
    Xc = !0;
    try {
      var s = e(n);
      return s;
    } finally {
      if (Xc = !1, (si !== null || li !== null) && (So(), si && (n = si, e = li, li = si = null, fm(n), e)))
        for (n = 0; n < e.length; n++) fm(e[n]);
    }
  }
  function is(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var s = r[ge] || null;
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
  var ba = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Pc = !1;
  if (ba)
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
  var Ia = null, Kc = null, Ol = null;
  function mm() {
    if (Ol) return Ol;
    var e, n = Kc, r = n.length, s, c = "value" in Ia ? Ia.value : Ia.textContent, f = c.length;
    for (e = 0; e < r && n[e] === c[e]; e++) ;
    var b = r - e;
    for (s = 1; s <= b && n[r - s] === c[f - s]; s++) ;
    return Ol = c.slice(e, 1 < s ? 1 - s : void 0);
  }
  function kl(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ll() {
    return !0;
  }
  function pm() {
    return !1;
  }
  function mn(e) {
    function n(r, s, c, f, b) {
      this._reactName = r, this._targetInst = c, this.type = s, this.nativeEvent = f, this.target = b, this.currentTarget = null;
      for (var j in e)
        e.hasOwnProperty(j) && (r = e[j], this[j] = r ? r(f) : f[j]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Ll : pm, this.isPropagationStopped = pm, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Ll);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Ll);
      },
      persist: function() {
      },
      isPersistent: Ll
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
  }, Ul = mn(Cr), ls = g({}, Cr, { view: 0, detail: 0 }), _S = mn(ls), Qc, Zc, os, Bl = g({}, ls, {
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
  }), gm = mn(Bl), AS = g({}, Bl, { dataTransfer: 0 }), DS = mn(AS), zS = g({}, ls, { relatedTarget: 0 }), Jc = mn(zS), OS = g({}, Cr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), kS = mn(OS), LS = g({}, Cr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), US = mn(LS), BS = g({}, Cr, { data: 0 }), vm = mn(BS), VS = {
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
  }, $S = {
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
  }, HS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function qS(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = HS[e]) ? !!n[e] : !1;
  }
  function Wc() {
    return qS;
  }
  var IS = g({}, ls, {
    key: function(e) {
      if (e.key) {
        var n = VS[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = kl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $S[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? kl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? kl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), FS = mn(IS), YS = g({}, Bl, {
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
  }), ym = mn(YS), GS = g({}, ls, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wc
  }), XS = mn(GS), PS = g({}, Cr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), KS = mn(PS), QS = g({}, Bl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ZS = mn(QS), JS = g({}, Cr, {
    newState: 0,
    oldState: 0
  }), WS = mn(JS), ew = [9, 13, 27, 32], eu = ba && "CompositionEvent" in window, cs = null;
  ba && "documentMode" in document && (cs = document.documentMode);
  var tw = ba && "TextEvent" in window && !cs, bm = ba && (!eu || cs && 8 < cs && 11 >= cs), xm = " ", Sm = !1;
  function wm(e, n) {
    switch (e) {
      case "keyup":
        return ew.indexOf(n.keyCode) !== -1;
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
  function Em(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function nw(e, n) {
    switch (e) {
      case "compositionend":
        return Em(n);
      case "keypress":
        return n.which !== 32 ? null : (Sm = !0, xm);
      case "textInput":
        return e = n.data, e === xm && Sm ? null : e;
      default:
        return null;
    }
  }
  function aw(e, n) {
    if (oi)
      return e === "compositionend" || !eu && wm(e, n) ? (e = mm(), Ol = Kc = Ia = null, oi = !1, e) : null;
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
        return bm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var rw = {
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
  function jm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!rw[e.type] : n === "textarea";
  }
  function Nm(e, n, r, s) {
    si ? li ? li.push(s) : li = [s] : si = s, n = Ro(n, "onChange"), 0 < n.length && (r = new Ul(
      "onChange",
      "change",
      null,
      r,
      s
    ), e.push({ event: r, listeners: n }));
  }
  var us = null, ds = null;
  function iw(e) {
    lv(e, 0);
  }
  function Vl(e) {
    var n = Fe(e);
    if (Al(n)) return e;
  }
  function Tm(e, n) {
    if (e === "change") return n;
  }
  var Cm = !1;
  if (ba) {
    var tu;
    if (ba) {
      var nu = "oninput" in document;
      if (!nu) {
        var Rm = document.createElement("div");
        Rm.setAttribute("oninput", "return;"), nu = typeof Rm.oninput == "function";
      }
      tu = nu;
    } else tu = !1;
    Cm = tu && (!document.documentMode || 9 < document.documentMode);
  }
  function Mm() {
    us && (us.detachEvent("onpropertychange", _m), ds = us = null);
  }
  function _m(e) {
    if (e.propertyName === "value" && Vl(ds)) {
      var n = [];
      Nm(
        n,
        ds,
        e,
        Gc(e)
      ), hm(iw, n);
    }
  }
  function sw(e, n, r) {
    e === "focusin" ? (Mm(), us = n, ds = r, us.attachEvent("onpropertychange", _m)) : e === "focusout" && Mm();
  }
  function lw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vl(ds);
  }
  function ow(e, n) {
    if (e === "click") return Vl(n);
  }
  function cw(e, n) {
    if (e === "input" || e === "change")
      return Vl(n);
  }
  function uw(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var En = typeof Object.is == "function" ? Object.is : uw;
  function fs(e, n) {
    if (En(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), s = Object.keys(n);
    if (r.length !== s.length) return !1;
    for (s = 0; s < r.length; s++) {
      var c = r[s];
      if (!bt.call(n, c) || !En(e[c], n[c]))
        return !1;
    }
    return !0;
  }
  function Am(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Dm(e, n) {
    var r = Am(e);
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
      r = Am(r);
    }
  }
  function zm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? zm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Om(e) {
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
  function au(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var dw = ba && "documentMode" in document && 11 >= document.documentMode, ci = null, ru = null, hs = null, iu = !1;
  function km(e, n, r) {
    var s = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    iu || ci == null || ci !== Dl(s) || (s = ci, "selectionStart" in s && au(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), hs && fs(hs, s) || (hs = s, s = Ro(ru, "onSelect"), 0 < s.length && (n = new Ul(
      "onSelect",
      "select",
      null,
      n,
      r
    ), e.push({ event: n, listeners: s }), n.target = ci)));
  }
  function Rr(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ui = {
    animationend: Rr("Animation", "AnimationEnd"),
    animationiteration: Rr("Animation", "AnimationIteration"),
    animationstart: Rr("Animation", "AnimationStart"),
    transitionrun: Rr("Transition", "TransitionRun"),
    transitionstart: Rr("Transition", "TransitionStart"),
    transitioncancel: Rr("Transition", "TransitionCancel"),
    transitionend: Rr("Transition", "TransitionEnd")
  }, su = {}, Lm = {};
  ba && (Lm = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function Mr(e) {
    if (su[e]) return su[e];
    if (!ui[e]) return e;
    var n = ui[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Lm)
        return su[e] = n[r];
    return e;
  }
  var Um = Mr("animationend"), Bm = Mr("animationiteration"), Vm = Mr("animationstart"), fw = Mr("transitionrun"), hw = Mr("transitionstart"), mw = Mr("transitioncancel"), $m = Mr("transitionend"), Hm = /* @__PURE__ */ new Map(), lu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  lu.push("scrollEnd");
  function ea(e, n) {
    Hm.set(e, n), Kt(n, [e]);
  }
  var $l = typeof reportError == "function" ? reportError : function(e) {
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
  }, Un = [], di = 0, ou = 0;
  function Hl() {
    for (var e = di, n = ou = di = 0; n < e; ) {
      var r = Un[n];
      Un[n++] = null;
      var s = Un[n];
      Un[n++] = null;
      var c = Un[n];
      Un[n++] = null;
      var f = Un[n];
      if (Un[n++] = null, s !== null && c !== null) {
        var b = s.pending;
        b === null ? c.next = c : (c.next = b.next, b.next = c), s.pending = c;
      }
      f !== 0 && qm(r, c, f);
    }
  }
  function ql(e, n, r, s) {
    Un[di++] = e, Un[di++] = n, Un[di++] = r, Un[di++] = s, ou |= s, e.lanes |= s, e = e.alternate, e !== null && (e.lanes |= s);
  }
  function cu(e, n, r, s) {
    return ql(e, n, r, s), Il(e);
  }
  function _r(e, n) {
    return ql(e, null, null, n), Il(e);
  }
  function qm(e, n, r) {
    e.lanes |= r;
    var s = e.alternate;
    s !== null && (s.lanes |= r);
    for (var c = !1, f = e.return; f !== null; )
      f.childLanes |= r, s = f.alternate, s !== null && (s.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (c = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, c && n !== null && (c = 31 - Yt(r), e = f.hiddenUpdates, s = e[c], s === null ? e[c] = [n] : s.push(n), n.lane = r | 536870912), f) : null;
  }
  function Il(e) {
    if (50 < ks)
      throw ks = 0, yd = null, Error(l(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function pw(e, n, r, s) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jn(e, n, r, s) {
    return new pw(e, n, r, s);
  }
  function uu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xa(e, n) {
    var r = e.alternate;
    return r === null ? (r = jn(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function Im(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Fl(e, n, r, s, c, f) {
    var b = 0;
    if (s = e, typeof e == "function") uu(e) && (b = 1);
    else if (typeof e == "string")
      b = xE(
        e,
        r,
        le.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case q:
          return e = jn(31, r, n, c), e.elementType = q, e.lanes = f, e;
        case N:
          return Ar(r.children, c, f, n);
        case R:
          b = 8, c |= 24;
          break;
        case T:
          return e = jn(12, r, n, c | 2), e.elementType = T, e.lanes = f, e;
        case Z:
          return e = jn(13, r, n, c), e.elementType = Z, e.lanes = f, e;
        case W:
          return e = jn(19, r, n, c), e.elementType = W, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                b = 10;
                break e;
              case k:
                b = 9;
                break e;
              case A:
                b = 11;
                break e;
              case ne:
                b = 14;
                break e;
              case D:
                b = 16, s = null;
                break e;
            }
          b = 29, r = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), s = null;
      }
    return n = jn(b, r, n, c), n.elementType = e, n.type = s, n.lanes = f, n;
  }
  function Ar(e, n, r, s) {
    return e = jn(7, e, s, n), e.lanes = r, e;
  }
  function du(e, n, r) {
    return e = jn(6, e, null, n), e.lanes = r, e;
  }
  function Fm(e) {
    var n = jn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function fu(e, n, r) {
    return n = jn(
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
  var Ym = /* @__PURE__ */ new WeakMap();
  function Bn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = Ym.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Te(n)
      }, Ym.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Te(n)
    };
  }
  var hi = [], mi = 0, Yl = null, ms = 0, Vn = [], $n = 0, Fa = null, ua = 1, da = "";
  function Sa(e, n) {
    hi[mi++] = ms, hi[mi++] = Yl, Yl = e, ms = n;
  }
  function Gm(e, n, r) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, Fa = e;
    var s = ua;
    e = da;
    var c = 32 - Yt(s) - 1;
    s &= ~(1 << c), r += 1;
    var f = 32 - Yt(n) + c;
    if (30 < f) {
      var b = c - c % 5;
      f = (s & (1 << b) - 1).toString(32), s >>= b, c -= b, ua = 1 << 32 - Yt(n) + c | r << c | s, da = f + e;
    } else
      ua = 1 << f | r << c | s, da = e;
  }
  function hu(e) {
    e.return !== null && (Sa(e, 1), Gm(e, 1, 0));
  }
  function mu(e) {
    for (; e === Yl; )
      Yl = hi[--mi], hi[mi] = null, ms = hi[--mi], hi[mi] = null;
    for (; e === Fa; )
      Fa = Vn[--$n], Vn[$n] = null, da = Vn[--$n], Vn[$n] = null, ua = Vn[--$n], Vn[$n] = null;
  }
  function Xm(e, n) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, ua = n.id, da = n.overflow, Fa = e;
  }
  var tn = null, vt = null, Ke = !1, Ya = null, Hn = !1, pu = Error(l(519));
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
  function Pm(e) {
    var n = e.stateNode, r = e.type, s = e.memoizedProps;
    switch (n[pe] = e, n[ge] = s, r) {
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
        Ge("invalid", n), lm(
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
        Ge("invalid", n), cm(n, s.value, s.defaultValue, s.children);
    }
    r = s.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || s.suppressHydrationWarning === !0 || dv(n.textContent, r) ? (s.popover != null && (Ge("beforetoggle", n), Ge("toggle", n)), s.onScroll != null && Ge("scroll", n), s.onScrollEnd != null && Ge("scrollend", n), s.onClick != null && (n.onclick = ya), n = !0) : n = !1, n || Ga(e, !0);
  }
  function Km(e) {
    for (tn = e.return; tn; )
      switch (tn.tag) {
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
          tn = tn.return;
      }
  }
  function pi(e) {
    if (e !== tn) return !1;
    if (!Ke) return Km(e), Ke = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || zd(e.type, e.memoizedProps)), r = !r), r && vt && Ga(e), Km(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      vt = xv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      vt = xv(e);
    } else
      n === 27 ? (n = vt, sr(e.type) ? (e = Bd, Bd = null, vt = e) : vt = n) : vt = tn ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Dr() {
    vt = tn = null, Ke = !1;
  }
  function gu() {
    var e = Ya;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Ya = null), e;
  }
  function ps(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var vu = M(null), zr = null, wa = null;
  function Xa(e, n, r) {
    X(vu, n._currentValue), n._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = vu.current, Q(vu);
  }
  function yu(e, n, r) {
    for (; e !== null; ) {
      var s = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, s !== null && (s.childLanes |= n)) : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function bu(e, n, r, s) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var f = c.dependencies;
      if (f !== null) {
        var b = c.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var j = f;
          f = c;
          for (var L = 0; L < n.length; L++)
            if (j.context === n[L]) {
              f.lanes |= r, j = f.alternate, j !== null && (j.lanes |= r), yu(
                f.return,
                r,
                e
              ), s || (b = null);
              break e;
            }
          f = j.next;
        }
      } else if (c.tag === 18) {
        if (b = c.return, b === null) throw Error(l(341));
        b.lanes |= r, f = b.alternate, f !== null && (f.lanes |= r), yu(b, r, e), b = null;
      } else b = c.child;
      if (b !== null) b.return = c;
      else
        for (b = c; b !== null; ) {
          if (b === e) {
            b = null;
            break;
          }
          if (c = b.sibling, c !== null) {
            c.return = b.return, b = c;
            break;
          }
          b = b.return;
        }
      c = b;
    }
  }
  function gi(e, n, r, s) {
    e = null;
    for (var c = n, f = !1; c !== null; ) {
      if (!f) {
        if ((c.flags & 524288) !== 0) f = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var b = c.alternate;
        if (b === null) throw Error(l(387));
        if (b = b.memoizedProps, b !== null) {
          var j = c.type;
          En(c.pendingProps.value, b.value) || (e !== null ? e.push(j) : e = [j]);
        }
      } else if (c === Ae.current) {
        if (b = c.alternate, b === null) throw Error(l(387));
        b.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(qs) : e = [qs]);
      }
      c = c.return;
    }
    e !== null && bu(
      n,
      e,
      r,
      s
    ), n.flags |= 262144;
  }
  function Gl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!En(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Or(e) {
    zr = e, wa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nn(e) {
    return Qm(zr, e);
  }
  function Xl(e, n) {
    return zr === null && Or(e), Qm(e, n);
  }
  function Qm(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, wa === null) {
      if (e === null) throw Error(l(308));
      wa = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else wa = wa.next = n;
    return r;
  }
  var gw = typeof AbortController < "u" ? AbortController : function() {
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
  }, vw = t.unstable_scheduleCallback, yw = t.unstable_NormalPriority, kt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function xu() {
    return {
      controller: new gw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function gs(e) {
    e.refCount--, e.refCount === 0 && vw(yw, function() {
      e.controller.abort();
    });
  }
  var vs = null, Su = 0, vi = 0, yi = null;
  function bw(e, n) {
    if (vs === null) {
      var r = vs = [];
      Su = 0, vi = jd(), yi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          r.push(s);
        }
      };
    }
    return Su++, n.then(Zm, Zm), n;
  }
  function Zm() {
    if (--Su === 0 && vs !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = vs;
      vs = null, vi = 0, yi = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function xw(e, n) {
    var r = [], s = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        r.push(c);
      }
    };
    return e.then(
      function() {
        s.status = "fulfilled", s.value = n;
        for (var c = 0; c < r.length; c++) (0, r[c])(n);
      },
      function(c) {
        for (s.status = "rejected", s.reason = c, c = 0; c < r.length; c++)
          (0, r[c])(void 0);
      }
    ), s;
  }
  var Jm = O.S;
  O.S = function(e, n) {
    kg = qt(), typeof n == "object" && n !== null && typeof n.then == "function" && bw(e, n), Jm !== null && Jm(e, n);
  };
  var kr = M(null);
  function wu() {
    var e = kr.current;
    return e !== null ? e : ft.pooledCache;
  }
  function Pl(e, n) {
    n === null ? X(kr, kr.current) : X(kr, n.pool);
  }
  function Wm() {
    var e = wu();
    return e === null ? null : { parent: kt._currentValue, pool: e };
  }
  var bi = Error(l(460)), Eu = Error(l(474)), Kl = Error(l(542)), Ql = { then: function() {
  } };
  function ep(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function tp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(ya, ya), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, ap(e), e;
      default:
        if (typeof n.status == "string") n.then(ya, ya);
        else {
          if (e = ft, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = n, e.status = "pending", e.then(
            function(s) {
              if (n.status === "pending") {
                var c = n;
                c.status = "fulfilled", c.value = s;
              }
            },
            function(s) {
              if (n.status === "pending") {
                var c = n;
                c.status = "rejected", c.reason = s;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, ap(e), e;
        }
        throw Ur = n, bi;
    }
  }
  function Lr(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Ur = r, bi) : r;
    }
  }
  var Ur = null;
  function np() {
    if (Ur === null) throw Error(l(459));
    var e = Ur;
    return Ur = null, e;
  }
  function ap(e) {
    if (e === bi || e === Kl)
      throw Error(l(483));
  }
  var xi = null, ys = 0;
  function Zl(e) {
    var n = ys;
    return ys += 1, xi === null && (xi = []), tp(xi, e, n);
  }
  function bs(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Jl(e, n) {
    throw n.$$typeof === S ? Error(l(525)) : (e = Object.prototype.toString.call(n), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function rp(e) {
    function n(H, V) {
      if (e) {
        var Y = H.deletions;
        Y === null ? (H.deletions = [V], H.flags |= 16) : Y.push(V);
      }
    }
    function r(H, V) {
      if (!e) return null;
      for (; V !== null; )
        n(H, V), V = V.sibling;
      return null;
    }
    function s(H) {
      for (var V = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? V.set(H.key, H) : V.set(H.index, H), H = H.sibling;
      return V;
    }
    function c(H, V) {
      return H = xa(H, V), H.index = 0, H.sibling = null, H;
    }
    function f(H, V, Y) {
      return H.index = Y, e ? (Y = H.alternate, Y !== null ? (Y = Y.index, Y < V ? (H.flags |= 67108866, V) : Y) : (H.flags |= 67108866, V)) : (H.flags |= 1048576, V);
    }
    function b(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function j(H, V, Y, se) {
      return V === null || V.tag !== 6 ? (V = du(Y, H.mode, se), V.return = H, V) : (V = c(V, Y), V.return = H, V);
    }
    function L(H, V, Y, se) {
      var Ce = Y.type;
      return Ce === N ? ae(
        H,
        V,
        Y.props.children,
        se,
        Y.key
      ) : V !== null && (V.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Lr(Ce) === V.type) ? (V = c(V, Y.props), bs(V, Y), V.return = H, V) : (V = Fl(
        Y.type,
        Y.key,
        Y.props,
        null,
        H.mode,
        se
      ), bs(V, Y), V.return = H, V);
    }
    function G(H, V, Y, se) {
      return V === null || V.tag !== 4 || V.stateNode.containerInfo !== Y.containerInfo || V.stateNode.implementation !== Y.implementation ? (V = fu(Y, H.mode, se), V.return = H, V) : (V = c(V, Y.children || []), V.return = H, V);
    }
    function ae(H, V, Y, se, Ce) {
      return V === null || V.tag !== 7 ? (V = Ar(
        Y,
        H.mode,
        se,
        Ce
      ), V.return = H, V) : (V = c(V, Y), V.return = H, V);
    }
    function oe(H, V, Y) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return V = du(
          "" + V,
          H.mode,
          Y
        ), V.return = H, V;
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case E:
            return Y = Fl(
              V.type,
              V.key,
              V.props,
              null,
              H.mode,
              Y
            ), bs(Y, V), Y.return = H, Y;
          case w:
            return V = fu(
              V,
              H.mode,
              Y
            ), V.return = H, V;
          case D:
            return V = Lr(V), oe(H, V, Y);
        }
        if (J(V) || re(V))
          return V = Ar(
            V,
            H.mode,
            Y,
            null
          ), V.return = H, V;
        if (typeof V.then == "function")
          return oe(H, Zl(V), Y);
        if (V.$$typeof === _)
          return oe(
            H,
            Xl(H, V),
            Y
          );
        Jl(H, V);
      }
      return null;
    }
    function P(H, V, Y, se) {
      var Ce = V !== null ? V.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Ce !== null ? null : j(H, V, "" + Y, se);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case E:
            return Y.key === Ce ? L(H, V, Y, se) : null;
          case w:
            return Y.key === Ce ? G(H, V, Y, se) : null;
          case D:
            return Y = Lr(Y), P(H, V, Y, se);
        }
        if (J(Y) || re(Y))
          return Ce !== null ? null : ae(H, V, Y, se, null);
        if (typeof Y.then == "function")
          return P(
            H,
            V,
            Zl(Y),
            se
          );
        if (Y.$$typeof === _)
          return P(
            H,
            V,
            Xl(H, Y),
            se
          );
        Jl(H, Y);
      }
      return null;
    }
    function ee(H, V, Y, se, Ce) {
      if (typeof se == "string" && se !== "" || typeof se == "number" || typeof se == "bigint")
        return H = H.get(Y) || null, j(V, H, "" + se, Ce);
      if (typeof se == "object" && se !== null) {
        switch (se.$$typeof) {
          case E:
            return H = H.get(
              se.key === null ? Y : se.key
            ) || null, L(V, H, se, Ce);
          case w:
            return H = H.get(
              se.key === null ? Y : se.key
            ) || null, G(V, H, se, Ce);
          case D:
            return se = Lr(se), ee(
              H,
              V,
              Y,
              se,
              Ce
            );
        }
        if (J(se) || re(se))
          return H = H.get(Y) || null, ae(V, H, se, Ce, null);
        if (typeof se.then == "function")
          return ee(
            H,
            V,
            Y,
            Zl(se),
            Ce
          );
        if (se.$$typeof === _)
          return ee(
            H,
            V,
            Y,
            Xl(V, se),
            Ce
          );
        Jl(V, se);
      }
      return null;
    }
    function xe(H, V, Y, se) {
      for (var Ce = null, Je = null, je = V, Be = V = 0, Pe = null; je !== null && Be < Y.length; Be++) {
        je.index > Be ? (Pe = je, je = null) : Pe = je.sibling;
        var We = P(
          H,
          je,
          Y[Be],
          se
        );
        if (We === null) {
          je === null && (je = Pe);
          break;
        }
        e && je && We.alternate === null && n(H, je), V = f(We, V, Be), Je === null ? Ce = We : Je.sibling = We, Je = We, je = Pe;
      }
      if (Be === Y.length)
        return r(H, je), Ke && Sa(H, Be), Ce;
      if (je === null) {
        for (; Be < Y.length; Be++)
          je = oe(H, Y[Be], se), je !== null && (V = f(
            je,
            V,
            Be
          ), Je === null ? Ce = je : Je.sibling = je, Je = je);
        return Ke && Sa(H, Be), Ce;
      }
      for (je = s(je); Be < Y.length; Be++)
        Pe = ee(
          je,
          H,
          Be,
          Y[Be],
          se
        ), Pe !== null && (e && Pe.alternate !== null && je.delete(
          Pe.key === null ? Be : Pe.key
        ), V = f(
          Pe,
          V,
          Be
        ), Je === null ? Ce = Pe : Je.sibling = Pe, Je = Pe);
      return e && je.forEach(function(dr) {
        return n(H, dr);
      }), Ke && Sa(H, Be), Ce;
    }
    function _e(H, V, Y, se) {
      if (Y == null) throw Error(l(151));
      for (var Ce = null, Je = null, je = V, Be = V = 0, Pe = null, We = Y.next(); je !== null && !We.done; Be++, We = Y.next()) {
        je.index > Be ? (Pe = je, je = null) : Pe = je.sibling;
        var dr = P(H, je, We.value, se);
        if (dr === null) {
          je === null && (je = Pe);
          break;
        }
        e && je && dr.alternate === null && n(H, je), V = f(dr, V, Be), Je === null ? Ce = dr : Je.sibling = dr, Je = dr, je = Pe;
      }
      if (We.done)
        return r(H, je), Ke && Sa(H, Be), Ce;
      if (je === null) {
        for (; !We.done; Be++, We = Y.next())
          We = oe(H, We.value, se), We !== null && (V = f(We, V, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
        return Ke && Sa(H, Be), Ce;
      }
      for (je = s(je); !We.done; Be++, We = Y.next())
        We = ee(je, H, Be, We.value, se), We !== null && (e && We.alternate !== null && je.delete(We.key === null ? Be : We.key), V = f(We, V, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
      return e && je.forEach(function(AE) {
        return n(H, AE);
      }), Ke && Sa(H, Be), Ce;
    }
    function ct(H, V, Y, se) {
      if (typeof Y == "object" && Y !== null && Y.type === N && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case E:
            e: {
              for (var Ce = Y.key; V !== null; ) {
                if (V.key === Ce) {
                  if (Ce = Y.type, Ce === N) {
                    if (V.tag === 7) {
                      r(
                        H,
                        V.sibling
                      ), se = c(
                        V,
                        Y.props.children
                      ), se.return = H, H = se;
                      break e;
                    }
                  } else if (V.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Lr(Ce) === V.type) {
                    r(
                      H,
                      V.sibling
                    ), se = c(V, Y.props), bs(se, Y), se.return = H, H = se;
                    break e;
                  }
                  r(H, V);
                  break;
                } else n(H, V);
                V = V.sibling;
              }
              Y.type === N ? (se = Ar(
                Y.props.children,
                H.mode,
                se,
                Y.key
              ), se.return = H, H = se) : (se = Fl(
                Y.type,
                Y.key,
                Y.props,
                null,
                H.mode,
                se
              ), bs(se, Y), se.return = H, H = se);
            }
            return b(H);
          case w:
            e: {
              for (Ce = Y.key; V !== null; ) {
                if (V.key === Ce)
                  if (V.tag === 4 && V.stateNode.containerInfo === Y.containerInfo && V.stateNode.implementation === Y.implementation) {
                    r(
                      H,
                      V.sibling
                    ), se = c(V, Y.children || []), se.return = H, H = se;
                    break e;
                  } else {
                    r(H, V);
                    break;
                  }
                else n(H, V);
                V = V.sibling;
              }
              se = fu(Y, H.mode, se), se.return = H, H = se;
            }
            return b(H);
          case D:
            return Y = Lr(Y), ct(
              H,
              V,
              Y,
              se
            );
        }
        if (J(Y))
          return xe(
            H,
            V,
            Y,
            se
          );
        if (re(Y)) {
          if (Ce = re(Y), typeof Ce != "function") throw Error(l(150));
          return Y = Ce.call(Y), _e(
            H,
            V,
            Y,
            se
          );
        }
        if (typeof Y.then == "function")
          return ct(
            H,
            V,
            Zl(Y),
            se
          );
        if (Y.$$typeof === _)
          return ct(
            H,
            V,
            Xl(H, Y),
            se
          );
        Jl(H, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Y = "" + Y, V !== null && V.tag === 6 ? (r(H, V.sibling), se = c(V, Y), se.return = H, H = se) : (r(H, V), se = du(Y, H.mode, se), se.return = H, H = se), b(H)) : r(H, V);
    }
    return function(H, V, Y, se) {
      try {
        ys = 0;
        var Ce = ct(
          H,
          V,
          Y,
          se
        );
        return xi = null, Ce;
      } catch (je) {
        if (je === bi || je === Kl) throw je;
        var Je = jn(29, je, null, H.mode);
        return Je.lanes = se, Je.return = H, Je;
      } finally {
      }
    };
  }
  var Br = rp(!0), ip = rp(!1), Pa = !1;
  function ju(e) {
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
      var c = s.pending;
      return c === null ? n.next = n : (n.next = c.next, c.next = n), s.pending = n, n = Il(e), qm(e, null, r), n;
    }
    return ql(e, s, n, r), Il(e);
  }
  function xs(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, sn(e, r);
    }
  }
  function Tu(e, n) {
    var r = e.updateQueue, s = e.alternate;
    if (s !== null && (s = s.updateQueue, r === s)) {
      var c = null, f = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var b = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          f === null ? c = f = b : f = f.next = b, r = r.next;
        } while (r !== null);
        f === null ? c = f = n : f = f.next = n;
      } else c = f = n;
      r = {
        baseState: s.baseState,
        firstBaseUpdate: c,
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
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function ws(e, n, r, s) {
    Cu = !1;
    var c = e.updateQueue;
    Pa = !1;
    var f = c.firstBaseUpdate, b = c.lastBaseUpdate, j = c.shared.pending;
    if (j !== null) {
      c.shared.pending = null;
      var L = j, G = L.next;
      L.next = null, b === null ? f = G : b.next = G, b = L;
      var ae = e.alternate;
      ae !== null && (ae = ae.updateQueue, j = ae.lastBaseUpdate, j !== b && (j === null ? ae.firstBaseUpdate = G : j.next = G, ae.lastBaseUpdate = L));
    }
    if (f !== null) {
      var oe = c.baseState;
      b = 0, ae = G = L = null, j = f;
      do {
        var P = j.lane & -536870913, ee = P !== j.lane;
        if (ee ? (Xe & P) === P : (s & P) === P) {
          P !== 0 && P === vi && (Cu = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: j.tag,
            payload: j.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, _e = j;
            P = n;
            var ct = r;
            switch (_e.tag) {
              case 1:
                if (xe = _e.payload, typeof xe == "function") {
                  oe = xe.call(ct, oe, P);
                  break e;
                }
                oe = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = _e.payload, P = typeof xe == "function" ? xe.call(ct, oe, P) : xe, P == null) break e;
                oe = g({}, oe, P);
                break e;
              case 2:
                Pa = !0;
            }
          }
          P = j.callback, P !== null && (e.flags |= 64, ee && (e.flags |= 8192), ee = c.callbacks, ee === null ? c.callbacks = [P] : ee.push(P));
        } else
          ee = {
            lane: P,
            tag: j.tag,
            payload: j.payload,
            callback: j.callback,
            next: null
          }, ae === null ? (G = ae = ee, L = oe) : ae = ae.next = ee, b |= P;
        if (j = j.next, j === null) {
          if (j = c.shared.pending, j === null)
            break;
          ee = j, j = ee.next, ee.next = null, c.lastBaseUpdate = ee, c.shared.pending = null;
        }
      } while (!0);
      ae === null && (L = oe), c.baseState = L, c.firstBaseUpdate = G, c.lastBaseUpdate = ae, f === null && (c.shared.lanes = 0), tr |= b, e.lanes = b, e.memoizedState = oe;
    }
  }
  function sp(e, n) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(n);
  }
  function lp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        sp(r[e], n);
  }
  var Si = M(null), Wl = M(0);
  function op(e, n) {
    e = Da, X(Wl, e), X(Si, n), Da = e | n.baseLanes;
  }
  function Ru() {
    X(Wl, Da), X(Si, Si.current);
  }
  function Mu() {
    Da = Wl.current, Q(Si), Q(Wl);
  }
  var Nn = M(null), qn = null;
  function Za(e) {
    var n = e.alternate;
    X(Rt, Rt.current & 1), X(Nn, e), qn === null && (n === null || Si.current !== null || n.memoizedState !== null) && (qn = e);
  }
  function _u(e) {
    X(Rt, Rt.current), X(Nn, e), qn === null && (qn = e);
  }
  function cp(e) {
    e.tag === 22 ? (X(Rt, Rt.current), X(Nn, e), qn === null && (qn = e)) : Ja();
  }
  function Ja() {
    X(Rt, Rt.current), X(Nn, Nn.current);
  }
  function Tn(e) {
    Q(Nn), qn === e && (qn = null), Q(Rt);
  }
  var Rt = M(0);
  function eo(e) {
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
  var ja = 0, Ue = null, lt = null, Lt = null, to = !1, wi = !1, Vr = !1, no = 0, Es = 0, Ei = null, Sw = 0;
  function jt() {
    throw Error(l(321));
  }
  function Au(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!En(e[r], n[r])) return !1;
    return !0;
  }
  function Du(e, n, r, s, c, f) {
    return ja = f, Ue = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, O.H = e === null || e.memoizedState === null ? Gp : Xu, Vr = !1, f = r(s, c), Vr = !1, wi && (f = dp(
      n,
      r,
      s,
      c
    )), up(e), f;
  }
  function up(e) {
    O.H = Ts;
    var n = lt !== null && lt.next !== null;
    if (ja = 0, Lt = lt = Ue = null, to = !1, Es = 0, Ei = null, n) throw Error(l(300));
    e === null || Ut || (e = e.dependencies, e !== null && Gl(e) && (Ut = !0));
  }
  function dp(e, n, r, s) {
    Ue = e;
    var c = 0;
    do {
      if (wi && (Ei = null), Es = 0, wi = !1, 25 <= c) throw Error(l(301));
      if (c += 1, Lt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = Xp, f = n(r, s);
    } while (wi);
    return f;
  }
  function ww() {
    var e = O.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? js(n) : n, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), n;
  }
  function zu() {
    var e = no !== 0;
    return no = 0, e;
  }
  function Ou(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function ku(e) {
    if (to) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      to = !1;
    }
    ja = 0, Lt = lt = Ue = null, wi = !1, Es = no = 0, Ei = null;
  }
  function fn() {
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
  function ao() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function js(e) {
    var n = Es;
    return Es += 1, Ei === null && (Ei = []), e = tp(Ei, e, n), n = Ue, (Lt === null ? n.memoizedState : Lt.next) === null && (n = n.alternate, O.H = n === null || n.memoizedState === null ? Gp : Xu), e;
  }
  function ro(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return js(e);
      if (e.$$typeof === _) return nn(e);
    }
    throw Error(l(438, String(e)));
  }
  function Lu(e) {
    var n = null, r = Ue.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var s = Ue.alternate;
      s !== null && (s = s.updateQueue, s !== null && (s = s.memoCache, s != null && (n = {
        data: s.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = ao(), Ue.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), s = 0; s < e; s++)
        r[s] = I;
    return n.index++, r;
  }
  function Na(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function io(e) {
    var n = Mt();
    return Uu(n, lt, e);
  }
  function Uu(e, n, r) {
    var s = e.queue;
    if (s === null) throw Error(l(311));
    s.lastRenderedReducer = r;
    var c = e.baseQueue, f = s.pending;
    if (f !== null) {
      if (c !== null) {
        var b = c.next;
        c.next = f.next, f.next = b;
      }
      n.baseQueue = c = f, s.pending = null;
    }
    if (f = e.baseState, c === null) e.memoizedState = f;
    else {
      n = c.next;
      var j = b = null, L = null, G = n, ae = !1;
      do {
        var oe = G.lane & -536870913;
        if (oe !== G.lane ? (Xe & oe) === oe : (ja & oe) === oe) {
          var P = G.revertLane;
          if (P === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }), oe === vi && (ae = !0);
          else if ((ja & P) === P) {
            G = G.next, P === vi && (ae = !0);
            continue;
          } else
            oe = {
              lane: 0,
              revertLane: G.revertLane,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }, L === null ? (j = L = oe, b = f) : L = L.next = oe, Ue.lanes |= P, tr |= P;
          oe = G.action, Vr && r(f, oe), f = G.hasEagerState ? G.eagerState : r(f, oe);
        } else
          P = {
            lane: oe,
            revertLane: G.revertLane,
            gesture: G.gesture,
            action: G.action,
            hasEagerState: G.hasEagerState,
            eagerState: G.eagerState,
            next: null
          }, L === null ? (j = L = P, b = f) : L = L.next = P, Ue.lanes |= oe, tr |= oe;
        G = G.next;
      } while (G !== null && G !== n);
      if (L === null ? b = f : L.next = j, !En(f, e.memoizedState) && (Ut = !0, ae && (r = yi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = b, e.baseQueue = L, s.lastRenderedState = f;
    }
    return c === null && (s.lanes = 0), [e.memoizedState, s.dispatch];
  }
  function Bu(e) {
    var n = Mt(), r = n.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var s = r.dispatch, c = r.pending, f = n.memoizedState;
    if (c !== null) {
      r.pending = null;
      var b = c = c.next;
      do
        f = e(f, b.action), b = b.next;
      while (b !== c);
      En(f, n.memoizedState) || (Ut = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), r.lastRenderedState = f;
    }
    return [f, s];
  }
  function fp(e, n, r) {
    var s = Ue, c = Mt(), f = Ke;
    if (f) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else r = n();
    var b = !En(
      (lt || c).memoizedState,
      r
    );
    if (b && (c.memoizedState = r, Ut = !0), c = c.queue, Hu(pp.bind(null, s, c, e), [
      e
    ]), c.getSnapshot !== n || b || Lt !== null && Lt.memoizedState.tag & 1) {
      if (s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        mp.bind(
          null,
          s,
          c,
          r,
          n
        ),
        null
      ), ft === null) throw Error(l(349));
      f || (ja & 127) !== 0 || hp(s, n, r);
    }
    return r;
  }
  function hp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ue.updateQueue, n === null ? (n = ao(), Ue.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function mp(e, n, r, s) {
    n.value = r, n.getSnapshot = s, gp(n) && vp(e);
  }
  function pp(e, n, r) {
    return r(function() {
      gp(n) && vp(e);
    });
  }
  function gp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !En(e, r);
    } catch {
      return !0;
    }
  }
  function vp(e) {
    var n = _r(e, 2);
    n !== null && bn(n, e, 2);
  }
  function Vu(e) {
    var n = fn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
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
      lastRenderedReducer: Na,
      lastRenderedState: e
    }, n;
  }
  function yp(e, n, r, s) {
    return e.baseState = r, Uu(
      e,
      lt,
      typeof s == "function" ? s : Na
    );
  }
  function Ew(e, n, r, s, c) {
    if (oo(e)) throw Error(l(485));
    if (e = n.action, e !== null) {
      var f = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(b) {
          f.listeners.push(b);
        }
      };
      O.T !== null ? r(!0) : f.isTransition = !1, s(f), r = n.pending, r === null ? (f.next = n.pending = f, bp(n, f)) : (f.next = r.next, n.pending = r.next = f);
    }
  }
  function bp(e, n) {
    var r = n.action, s = n.payload, c = e.state;
    if (n.isTransition) {
      var f = O.T, b = {};
      O.T = b;
      try {
        var j = r(c, s), L = O.S;
        L !== null && L(b, j), xp(e, n, j);
      } catch (G) {
        $u(e, n, G);
      } finally {
        f !== null && b.types !== null && (f.types = b.types), O.T = f;
      }
    } else
      try {
        f = r(c, s), xp(e, n, f);
      } catch (G) {
        $u(e, n, G);
      }
  }
  function xp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(s) {
        Sp(e, n, s);
      },
      function(s) {
        return $u(e, n, s);
      }
    ) : Sp(e, n, r);
  }
  function Sp(e, n, r) {
    n.status = "fulfilled", n.value = r, wp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, bp(e, r)));
  }
  function $u(e, n, r) {
    var s = e.pending;
    if (e.pending = null, s !== null) {
      s = s.next;
      do
        n.status = "rejected", n.reason = r, wp(n), n = n.next;
      while (n !== s);
    }
    e.action = null;
  }
  function wp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Ep(e, n) {
    return n;
  }
  function jp(e, n) {
    if (Ke) {
      var r = ft.formState;
      if (r !== null) {
        e: {
          var s = Ue;
          if (Ke) {
            if (vt) {
              t: {
                for (var c = vt, f = Hn; c.nodeType !== 8; ) {
                  if (!f) {
                    c = null;
                    break t;
                  }
                  if (c = In(
                    c.nextSibling
                  ), c === null) {
                    c = null;
                    break t;
                  }
                }
                f = c.data, c = f === "F!" || f === "F" ? c : null;
              }
              if (c) {
                vt = In(
                  c.nextSibling
                ), s = c.data === "F!";
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
    return r = fn(), r.memoizedState = r.baseState = n, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ep,
      lastRenderedState: n
    }, r.queue = s, r = Ip.bind(
      null,
      Ue,
      s
    ), s.dispatch = r, s = Vu(!1), f = Gu.bind(
      null,
      Ue,
      !1,
      s.queue
    ), s = fn(), c = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, s.queue = c, r = Ew.bind(
      null,
      Ue,
      c,
      f,
      r
    ), c.dispatch = r, s.memoizedState = e, [n, r, !1];
  }
  function Np(e) {
    var n = Mt();
    return Tp(n, lt, e);
  }
  function Tp(e, n, r) {
    if (n = Uu(
      e,
      n,
      Ep
    )[0], e = io(Na)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var s = js(n);
      } catch (b) {
        throw b === bi ? Kl : b;
      }
    else s = n;
    n = Mt();
    var c = n.queue, f = c.dispatch;
    return r !== n.memoizedState && (Ue.flags |= 2048, ji(
      9,
      { destroy: void 0 },
      jw.bind(null, c, r),
      null
    )), [s, f, e];
  }
  function jw(e, n) {
    e.action = n;
  }
  function Cp(e) {
    var n = Mt(), r = lt;
    if (r !== null)
      return Tp(n, r, e);
    Mt(), n = n.memoizedState, r = Mt();
    var s = r.queue.dispatch;
    return r.memoizedState = e, [n, s, !1];
  }
  function ji(e, n, r, s) {
    return e = { tag: e, create: r, deps: s, inst: n, next: null }, n = Ue.updateQueue, n === null && (n = ao(), Ue.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (s = r.next, r.next = e, e.next = s, n.lastEffect = e), e;
  }
  function Rp() {
    return Mt().memoizedState;
  }
  function so(e, n, r, s) {
    var c = fn();
    Ue.flags |= e, c.memoizedState = ji(
      1 | n,
      { destroy: void 0 },
      r,
      s === void 0 ? null : s
    );
  }
  function lo(e, n, r, s) {
    var c = Mt();
    s = s === void 0 ? null : s;
    var f = c.memoizedState.inst;
    lt !== null && s !== null && Au(s, lt.memoizedState.deps) ? c.memoizedState = ji(n, f, r, s) : (Ue.flags |= e, c.memoizedState = ji(
      1 | n,
      f,
      r,
      s
    ));
  }
  function Mp(e, n) {
    so(8390656, 8, e, n);
  }
  function Hu(e, n) {
    lo(2048, 8, e, n);
  }
  function Nw(e) {
    Ue.flags |= 4;
    var n = Ue.updateQueue;
    if (n === null)
      n = ao(), Ue.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function _p(e) {
    var n = Mt().memoizedState;
    return Nw({ ref: n, nextImpl: e }), function() {
      if ((tt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Ap(e, n) {
    return lo(4, 2, e, n);
  }
  function Dp(e, n) {
    return lo(4, 4, e, n);
  }
  function zp(e, n) {
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
  function Op(e, n, r) {
    r = r != null ? r.concat([e]) : null, lo(4, 4, zp.bind(null, n, e), r);
  }
  function qu() {
  }
  function kp(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    return n !== null && Au(n, s[1]) ? s[0] : (r.memoizedState = [e, n], e);
  }
  function Lp(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    if (n !== null && Au(n, s[1]))
      return s[0];
    if (s = e(), Vr) {
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
    return r === void 0 || (ja & 1073741824) !== 0 && (Xe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Ug(), Ue.lanes |= e, tr |= e, r);
  }
  function Up(e, n, r, s) {
    return En(r, n) ? r : Si.current !== null ? (e = Iu(e, r, s), En(e, n) || (Ut = !0), e) : (ja & 42) === 0 || (ja & 1073741824) !== 0 && (Xe & 261930) === 0 ? (Ut = !0, e.memoizedState = r) : (e = Ug(), Ue.lanes |= e, tr |= e, n);
  }
  function Bp(e, n, r, s, c) {
    var f = C.p;
    C.p = f !== 0 && 8 > f ? f : 8;
    var b = O.T, j = {};
    O.T = j, Gu(e, !1, n, r);
    try {
      var L = c(), G = O.S;
      if (G !== null && G(j, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ae = xw(
          L,
          s
        );
        Ns(
          e,
          n,
          ae,
          Mn(e)
        );
      } else
        Ns(
          e,
          n,
          s,
          Mn(e)
        );
    } catch (oe) {
      Ns(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: oe },
        Mn()
      );
    } finally {
      C.p = f, b !== null && j.types !== null && (b.types = j.types), O.T = b;
    }
  }
  function Tw() {
  }
  function Fu(e, n, r, s) {
    if (e.tag !== 5) throw Error(l(476));
    var c = Vp(e).queue;
    Bp(
      e,
      c,
      n,
      U,
      r === null ? Tw : function() {
        return $p(e), r(s);
      }
    );
  }
  function Vp(e) {
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
        lastRenderedReducer: Na,
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
        lastRenderedReducer: Na,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function $p(e) {
    var n = Vp(e);
    n.next === null && (n = e.alternate.memoizedState), Ns(
      e,
      n.next.queue,
      {},
      Mn()
    );
  }
  function Yu() {
    return nn(qs);
  }
  function Hp() {
    return Mt().memoizedState;
  }
  function qp() {
    return Mt().memoizedState;
  }
  function Cw(e) {
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
  function Rw(e, n, r) {
    var s = Mn();
    r = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oo(e) ? Fp(n, r) : (r = cu(e, n, r, s), r !== null && (bn(r, e, s), Yp(r, n, s)));
  }
  function Ip(e, n, r) {
    var s = Mn();
    Ns(e, n, r, s);
  }
  function Ns(e, n, r, s) {
    var c = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (oo(e)) Fp(n, c);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var b = n.lastRenderedState, j = f(b, r);
          if (c.hasEagerState = !0, c.eagerState = j, En(j, b))
            return ql(e, n, c, 0), ft === null && Hl(), !1;
        } catch {
        } finally {
        }
      if (r = cu(e, n, c, s), r !== null)
        return bn(r, e, s), Yp(r, n, s), !0;
    }
    return !1;
  }
  function Gu(e, n, r, s) {
    if (s = {
      lane: 2,
      revertLane: jd(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oo(e)) {
      if (n) throw Error(l(479));
    } else
      n = cu(
        e,
        r,
        s,
        2
      ), n !== null && bn(n, e, 2);
  }
  function oo(e) {
    var n = e.alternate;
    return e === Ue || n !== null && n === Ue;
  }
  function Fp(e, n) {
    wi = to = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function Yp(e, n, r) {
    if ((r & 4194048) !== 0) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, sn(e, r);
    }
  }
  var Ts = {
    readContext: nn,
    use: ro,
    useCallback: jt,
    useContext: jt,
    useEffect: jt,
    useImperativeHandle: jt,
    useLayoutEffect: jt,
    useInsertionEffect: jt,
    useMemo: jt,
    useReducer: jt,
    useRef: jt,
    useState: jt,
    useDebugValue: jt,
    useDeferredValue: jt,
    useTransition: jt,
    useSyncExternalStore: jt,
    useId: jt,
    useHostTransitionStatus: jt,
    useFormState: jt,
    useActionState: jt,
    useOptimistic: jt,
    useMemoCache: jt,
    useCacheRefresh: jt
  };
  Ts.useEffectEvent = jt;
  var Gp = {
    readContext: nn,
    use: ro,
    useCallback: function(e, n) {
      return fn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: nn,
    useEffect: Mp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, so(
        4194308,
        4,
        zp.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return so(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      so(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = fn();
      n = n === void 0 ? null : n;
      var s = e();
      if (Vr) {
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
      var s = fn();
      if (r !== void 0) {
        var c = r(n);
        if (Vr) {
          Tt(!0);
          try {
            r(n);
          } finally {
            Tt(!1);
          }
        }
      } else c = n;
      return s.memoizedState = s.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, s.queue = e, e = e.dispatch = Rw.bind(
        null,
        Ue,
        e
      ), [s.memoizedState, e];
    },
    useRef: function(e) {
      var n = fn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Vu(e);
      var n = e.queue, r = Ip.bind(null, Ue, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: qu,
    useDeferredValue: function(e, n) {
      var r = fn();
      return Iu(r, e, n);
    },
    useTransition: function() {
      var e = Vu(!1);
      return e = Bp.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), fn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var s = Ue, c = fn();
      if (Ke) {
        if (r === void 0)
          throw Error(l(407));
        r = r();
      } else {
        if (r = n(), ft === null)
          throw Error(l(349));
        (Xe & 127) !== 0 || hp(s, n, r);
      }
      c.memoizedState = r;
      var f = { value: r, getSnapshot: n };
      return c.queue = f, Mp(pp.bind(null, s, f, e), [
        e
      ]), s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        mp.bind(
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
      var e = fn(), n = ft.identifierPrefix;
      if (Ke) {
        var r = da, s = ua;
        r = (s & ~(1 << 32 - Yt(s) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = no++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Sw++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Yu,
    useFormState: jp,
    useActionState: jp,
    useOptimistic: function(e) {
      var n = fn();
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
      return fn().memoizedState = Cw.bind(
        null,
        Ue
      );
    },
    useEffectEvent: function(e) {
      var n = fn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((tt & 2) !== 0)
          throw Error(l(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Xu = {
    readContext: nn,
    use: ro,
    useCallback: kp,
    useContext: nn,
    useEffect: Hu,
    useImperativeHandle: Op,
    useInsertionEffect: Ap,
    useLayoutEffect: Dp,
    useMemo: Lp,
    useReducer: io,
    useRef: Rp,
    useState: function() {
      return io(Na);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return Up(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = io(Na)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : js(e),
        n
      ];
    },
    useSyncExternalStore: fp,
    useId: Hp,
    useHostTransitionStatus: Yu,
    useFormState: Np,
    useActionState: Np,
    useOptimistic: function(e, n) {
      var r = Mt();
      return yp(r, lt, e, n);
    },
    useMemoCache: Lu,
    useCacheRefresh: qp
  };
  Xu.useEffectEvent = _p;
  var Xp = {
    readContext: nn,
    use: ro,
    useCallback: kp,
    useContext: nn,
    useEffect: Hu,
    useImperativeHandle: Op,
    useInsertionEffect: Ap,
    useLayoutEffect: Dp,
    useMemo: Lp,
    useReducer: Bu,
    useRef: Rp,
    useState: function() {
      return Bu(Na);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return lt === null ? Iu(r, e, n) : Up(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Bu(Na)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : js(e),
        n
      ];
    },
    useSyncExternalStore: fp,
    useId: Hp,
    useHostTransitionStatus: Yu,
    useFormState: Cp,
    useActionState: Cp,
    useOptimistic: function(e, n) {
      var r = Mt();
      return lt !== null ? yp(r, lt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Lu,
    useCacheRefresh: qp
  };
  Xp.useEffectEvent = _p;
  function Pu(e, n, r, s) {
    n = e.memoizedState, r = r(s, n), r = r == null ? n : g({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Ku = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), c = Ka(s);
      c.payload = n, r != null && (c.callback = r), n = Qa(e, c, s), n !== null && (bn(n, e, s), xs(n, e, s));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), c = Ka(s);
      c.tag = 1, c.payload = n, r != null && (c.callback = r), n = Qa(e, c, s), n !== null && (bn(n, e, s), xs(n, e, s));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Mn(), s = Ka(r);
      s.tag = 2, n != null && (s.callback = n), n = Qa(e, s, r), n !== null && (bn(n, e, r), xs(n, e, r));
    }
  };
  function Pp(e, n, r, s, c, f, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, f, b) : n.prototype && n.prototype.isPureReactComponent ? !fs(r, s) || !fs(c, f) : !0;
  }
  function Kp(e, n, r, s) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, s), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, s), n.state !== e && Ku.enqueueReplaceState(n, n.state, null);
  }
  function $r(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    }
    if (e = e.defaultProps) {
      r === n && (r = g({}, r));
      for (var c in e)
        r[c] === void 0 && (r[c] = e[c]);
    }
    return r;
  }
  function Qp(e) {
    $l(e);
  }
  function Zp(e) {
    console.error(e);
  }
  function Jp(e) {
    $l(e);
  }
  function co(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Wp(e, n, r) {
    try {
      var s = e.onCaughtError;
      s(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function Qu(e, n, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      co(e, n);
    }, r;
  }
  function eg(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function tg(e, n, r, s) {
    var c = r.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var f = s.value;
      e.payload = function() {
        return c(f);
      }, e.callback = function() {
        Wp(n, r, s);
      };
    }
    var b = r.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      Wp(n, r, s), typeof c != "function" && (nr === null ? nr = /* @__PURE__ */ new Set([this]) : nr.add(this));
      var j = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: j !== null ? j : ""
      });
    });
  }
  function Mw(e, n, r, s, c) {
    if (r.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (n = r.alternate, n !== null && gi(
        n,
        r,
        c,
        !0
      ), r = Nn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return qn === null ? wo() : r.alternate === null && Nt === 0 && (Nt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = c, s === Ql ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([s]) : n.add(s), Sd(e, s, c)), !1;
          case 22:
            return r.flags |= 65536, s === Ql ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([s]) : r.add(s)), Sd(e, s, c)), !1;
        }
        throw Error(l(435, r.tag));
      }
      return Sd(e, s, c), wo(), !1;
    }
    if (Ke)
      return n = Nn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = c, s !== pu && (e = Error(l(422), { cause: s }), ps(Bn(e, r)))) : (s !== pu && (n = Error(l(423), {
        cause: s
      }), ps(
        Bn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, s = Bn(s, r), c = Qu(
        e.stateNode,
        s,
        c
      ), Tu(e, c), Nt !== 4 && (Nt = 2)), !1;
    var f = Error(l(520), { cause: s });
    if (f = Bn(f, r), Os === null ? Os = [f] : Os.push(f), Nt !== 4 && (Nt = 2), n === null) return !0;
    s = Bn(s, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = c & -c, r.lanes |= e, e = Qu(r.stateNode, s, e), Tu(r, e), !1;
        case 1:
          if (n = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (nr === null || !nr.has(f))))
            return r.flags |= 65536, c &= -c, r.lanes |= c, c = eg(c), tg(
              c,
              e,
              r,
              s
            ), Tu(r, c), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Zu = Error(l(461)), Ut = !1;
  function an(e, n, r, s) {
    n.child = e === null ? ip(n, null, r, s) : Br(
      n,
      e.child,
      r,
      s
    );
  }
  function ng(e, n, r, s, c) {
    r = r.render;
    var f = n.ref;
    if ("ref" in s) {
      var b = {};
      for (var j in s)
        j !== "ref" && (b[j] = s[j]);
    } else b = s;
    return Or(n), s = Du(
      e,
      n,
      r,
      b,
      f,
      c
    ), j = zu(), e !== null && !Ut ? (Ou(e, n, c), Ta(e, n, c)) : (Ke && j && hu(n), n.flags |= 1, an(e, n, s, c), n.child);
  }
  function ag(e, n, r, s, c) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !uu(f) && f.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = f, rg(
        e,
        n,
        f,
        s,
        c
      )) : (e = Fl(
        r.type,
        null,
        s,
        n,
        n.mode,
        c
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !id(e, c)) {
      var b = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : fs, r(b, s) && e.ref === n.ref)
        return Ta(e, n, c);
    }
    return n.flags |= 1, e = xa(f, s), e.ref = n.ref, e.return = n, n.child = e;
  }
  function rg(e, n, r, s, c) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (fs(f, s) && e.ref === n.ref)
        if (Ut = !1, n.pendingProps = s = f, id(e, c))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return n.lanes = e.lanes, Ta(e, n, c);
    }
    return Ju(
      e,
      n,
      r,
      s,
      c
    );
  }
  function ig(e, n, r, s) {
    var c = s.children, f = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), s.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | r : r, e !== null) {
          for (s = n.child = e.child, c = 0; s !== null; )
            c = c | s.lanes | s.childLanes, s = s.sibling;
          s = c & ~f;
        } else s = 0, n.child = null;
        return sg(
          e,
          n,
          f,
          r,
          s
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Pl(
          n,
          f !== null ? f.cachePool : null
        ), f !== null ? op(n, f) : Ru(), cp(n);
      else
        return s = n.lanes = 536870912, sg(
          e,
          n,
          f !== null ? f.baseLanes | r : r,
          r,
          s
        );
    } else
      f !== null ? (Pl(n, f.cachePool), op(n, f), Ja(), n.memoizedState = null) : (e !== null && Pl(n, null), Ru(), Ja());
    return an(e, n, c, r), n.child;
  }
  function Cs(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function sg(e, n, r, s, c) {
    var f = wu();
    return f = f === null ? null : { parent: kt._currentValue, pool: f }, n.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Pl(n, null), Ru(), cp(n), e !== null && gi(e, n, s, !0), n.childLanes = c, null;
  }
  function uo(e, n) {
    return n = ho(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function lg(e, n, r) {
    return Br(n, e.child, null, r), e = uo(n, n.pendingProps), e.flags |= 2, Tn(n), n.memoizedState = null, e;
  }
  function _w(e, n, r) {
    var s = n.pendingProps, c = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Ke) {
        if (s.mode === "hidden")
          return e = uo(n, s), n.lanes = 536870912, Cs(null, e);
        if (_u(n), (e = vt) ? (e = bv(
          e,
          Hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Fm(e), r.return = n, n.child = r, tn = n, vt = null)) : e = null, e === null) throw Ga(n);
        return n.lanes = 536870912, null;
      }
      return uo(n, s);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var b = f.dehydrated;
      if (_u(n), c)
        if (n.flags & 256)
          n.flags &= -257, n = lg(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ut || gi(e, n, r, !1), c = (r & e.childLanes) !== 0, Ut || c) {
        if (s = ft, s !== null && (b = z(s, r), b !== 0 && b !== f.retryLane))
          throw f.retryLane = b, _r(e, b), bn(s, e, b), Zu;
        wo(), n = lg(
          e,
          n,
          r
        );
      } else
        e = f.treeContext, vt = In(b.nextSibling), tn = n, Ke = !0, Ya = null, Hn = !1, e !== null && Xm(n, e), n = uo(n, s), n.flags |= 4096;
      return n;
    }
    return e = xa(e.child, {
      mode: s.mode,
      children: s.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function fo(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(l(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function Ju(e, n, r, s, c) {
    return Or(n), r = Du(
      e,
      n,
      r,
      s,
      void 0,
      c
    ), s = zu(), e !== null && !Ut ? (Ou(e, n, c), Ta(e, n, c)) : (Ke && s && hu(n), n.flags |= 1, an(e, n, r, c), n.child);
  }
  function og(e, n, r, s, c, f) {
    return Or(n), n.updateQueue = null, r = dp(
      n,
      s,
      r,
      c
    ), up(e), s = zu(), e !== null && !Ut ? (Ou(e, n, f), Ta(e, n, f)) : (Ke && s && hu(n), n.flags |= 1, an(e, n, r, f), n.child);
  }
  function cg(e, n, r, s, c) {
    if (Or(n), n.stateNode === null) {
      var f = fi, b = r.contextType;
      typeof b == "object" && b !== null && (f = nn(b)), f = new r(s, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Ku, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = s, f.state = n.memoizedState, f.refs = {}, ju(n), b = r.contextType, f.context = typeof b == "object" && b !== null ? nn(b) : fi, f.state = n.memoizedState, b = r.getDerivedStateFromProps, typeof b == "function" && (Pu(
        n,
        r,
        b,
        s
      ), f.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (b = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), b !== f.state && Ku.enqueueReplaceState(f, f.state, null), ws(n, s, f, c), Ss(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !0;
    } else if (e === null) {
      f = n.stateNode;
      var j = n.memoizedProps, L = $r(r, j);
      f.props = L;
      var G = f.context, ae = r.contextType;
      b = fi, typeof ae == "object" && ae !== null && (b = nn(ae));
      var oe = r.getDerivedStateFromProps;
      ae = typeof oe == "function" || typeof f.getSnapshotBeforeUpdate == "function", j = n.pendingProps !== j, ae || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (j || G !== b) && Kp(
        n,
        f,
        s,
        b
      ), Pa = !1;
      var P = n.memoizedState;
      f.state = P, ws(n, s, f, c), Ss(), G = n.memoizedState, j || P !== G || Pa ? (typeof oe == "function" && (Pu(
        n,
        r,
        oe,
        s
      ), G = n.memoizedState), (L = Pa || Pp(
        n,
        r,
        L,
        s,
        P,
        G,
        b
      )) ? (ae || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = s, n.memoizedState = G), f.props = s, f.state = G, f.context = b, s = L) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !1);
    } else {
      f = n.stateNode, Nu(e, n), b = n.memoizedProps, ae = $r(r, b), f.props = ae, oe = n.pendingProps, P = f.context, G = r.contextType, L = fi, typeof G == "object" && G !== null && (L = nn(G)), j = r.getDerivedStateFromProps, (G = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (b !== oe || P !== L) && Kp(
        n,
        f,
        s,
        L
      ), Pa = !1, P = n.memoizedState, f.state = P, ws(n, s, f, c), Ss();
      var ee = n.memoizedState;
      b !== oe || P !== ee || Pa || e !== null && e.dependencies !== null && Gl(e.dependencies) ? (typeof j == "function" && (Pu(
        n,
        r,
        j,
        s
      ), ee = n.memoizedState), (ae = Pa || Pp(
        n,
        r,
        ae,
        s,
        P,
        ee,
        L
      ) || e !== null && e.dependencies !== null && Gl(e.dependencies)) ? (G || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(s, ee, L), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        s,
        ee,
        L
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (n.flags |= 1024), n.memoizedProps = s, n.memoizedState = ee), f.props = s, f.state = ee, f.context = L, s = ae) : (typeof f.componentDidUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (n.flags |= 1024), s = !1);
    }
    return f = s, fo(e, n), s = (n.flags & 128) !== 0, f || s ? (f = n.stateNode, r = s && typeof r.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && s ? (n.child = Br(
      n,
      e.child,
      null,
      c
    ), n.child = Br(
      n,
      null,
      r,
      c
    )) : an(e, n, r, c), n.memoizedState = f.state, e = n.child) : e = Ta(
      e,
      n,
      c
    ), e;
  }
  function ug(e, n, r, s) {
    return Dr(), n.flags |= 256, an(e, n, r, s), n.child;
  }
  var Wu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ed(e) {
    return { baseLanes: e, cachePool: Wm() };
  }
  function td(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Rn), e;
  }
  function dg(e, n, r) {
    var s = n.pendingProps, c = !1, f = (n.flags & 128) !== 0, b;
    if ((b = f) || (b = e !== null && e.memoizedState === null ? !1 : (Rt.current & 2) !== 0), b && (c = !0, n.flags &= -129), b = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Ke) {
        if (c ? Za(n) : Ja(), (e = vt) ? (e = bv(
          e,
          Hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Fm(e), r.return = n, n.child = r, tn = n, vt = null)) : e = null, e === null) throw Ga(n);
        return Ud(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var j = s.children;
      return s = s.fallback, c ? (Ja(), c = n.mode, j = ho(
        { mode: "hidden", children: j },
        c
      ), s = Ar(
        s,
        c,
        r,
        null
      ), j.return = n, s.return = n, j.sibling = s, n.child = j, s = n.child, s.memoizedState = ed(r), s.childLanes = td(
        e,
        b,
        r
      ), n.memoizedState = Wu, Cs(null, s)) : (Za(n), nd(n, j));
    }
    var L = e.memoizedState;
    if (L !== null && (j = L.dehydrated, j !== null)) {
      if (f)
        n.flags & 256 ? (Za(n), n.flags &= -257, n = ad(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (Ja(), n.child = e.child, n.flags |= 128, n = null) : (Ja(), j = s.fallback, c = n.mode, s = ho(
          { mode: "visible", children: s.children },
          c
        ), j = Ar(
          j,
          c,
          r,
          null
        ), j.flags |= 2, s.return = n, j.return = n, s.sibling = j, n.child = s, Br(
          n,
          e.child,
          null,
          r
        ), s = n.child, s.memoizedState = ed(r), s.childLanes = td(
          e,
          b,
          r
        ), n.memoizedState = Wu, n = Cs(null, s));
      else if (Za(n), Ud(j)) {
        if (b = j.nextSibling && j.nextSibling.dataset, b) var G = b.dgst;
        b = G, s = Error(l(419)), s.stack = "", s.digest = b, ps({ value: s, source: null, stack: null }), n = ad(
          e,
          n,
          r
        );
      } else if (Ut || gi(e, n, r, !1), b = (r & e.childLanes) !== 0, Ut || b) {
        if (b = ft, b !== null && (s = z(b, r), s !== 0 && s !== L.retryLane))
          throw L.retryLane = s, _r(e, s), bn(b, e, s), Zu;
        Ld(j) || wo(), n = ad(
          e,
          n,
          r
        );
      } else
        Ld(j) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, vt = In(
          j.nextSibling
        ), tn = n, Ke = !0, Ya = null, Hn = !1, e !== null && Xm(n, e), n = nd(
          n,
          s.children
        ), n.flags |= 4096);
      return n;
    }
    return c ? (Ja(), j = s.fallback, c = n.mode, L = e.child, G = L.sibling, s = xa(L, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = L.subtreeFlags & 65011712, G !== null ? j = xa(
      G,
      j
    ) : (j = Ar(
      j,
      c,
      r,
      null
    ), j.flags |= 2), j.return = n, s.return = n, s.sibling = j, n.child = s, Cs(null, s), s = n.child, j = e.child.memoizedState, j === null ? j = ed(r) : (c = j.cachePool, c !== null ? (L = kt._currentValue, c = c.parent !== L ? { parent: L, pool: L } : c) : c = Wm(), j = {
      baseLanes: j.baseLanes | r,
      cachePool: c
    }), s.memoizedState = j, s.childLanes = td(
      e,
      b,
      r
    ), n.memoizedState = Wu, Cs(e.child, s)) : (Za(n), r = e.child, e = r.sibling, r = xa(r, {
      mode: "visible",
      children: s.children
    }), r.return = n, r.sibling = null, e !== null && (b = n.deletions, b === null ? (n.deletions = [e], n.flags |= 16) : b.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function nd(e, n) {
    return n = ho(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function ho(e, n) {
    return e = jn(22, e, null, n), e.lanes = 0, e;
  }
  function ad(e, n, r) {
    return Br(n, e.child, null, r), e = nd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function fg(e, n, r) {
    e.lanes |= n;
    var s = e.alternate;
    s !== null && (s.lanes |= n), yu(e.return, n, r);
  }
  function rd(e, n, r, s, c, f) {
    var b = e.memoizedState;
    b === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: s,
      tail: r,
      tailMode: c,
      treeForkCount: f
    } : (b.isBackwards = n, b.rendering = null, b.renderingStartTime = 0, b.last = s, b.tail = r, b.tailMode = c, b.treeForkCount = f);
  }
  function hg(e, n, r) {
    var s = n.pendingProps, c = s.revealOrder, f = s.tail;
    s = s.children;
    var b = Rt.current, j = (b & 2) !== 0;
    if (j ? (b = b & 1 | 2, n.flags |= 128) : b &= 1, X(Rt, b), an(e, n, s, r), s = Ke ? ms : 0, !j && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && fg(e, r, n);
        else if (e.tag === 19)
          fg(e, r, n);
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
    switch (c) {
      case "forwards":
        for (r = n.child, c = null; r !== null; )
          e = r.alternate, e !== null && eo(e) === null && (c = r), r = r.sibling;
        r = c, r === null ? (c = n.child, n.child = null) : (c = r.sibling, r.sibling = null), rd(
          n,
          !1,
          c,
          r,
          f,
          s
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, c = n.child, n.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && eo(e) === null) {
            n.child = c;
            break;
          }
          e = c.sibling, c.sibling = r, r = c, c = e;
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
  function Ta(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), tr |= n.lanes, (r & n.childLanes) === 0)
      if (e !== null) {
        if (gi(
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
      for (e = n.child, r = xa(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = xa(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function id(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Gl(e)));
  }
  function Aw(e, n, r) {
    switch (n.tag) {
      case 3:
        Me(n, n.stateNode.containerInfo), Xa(n, kt, e.memoizedState.cache), Dr();
        break;
      case 27:
      case 5:
        Jt(n);
        break;
      case 4:
        Me(n, n.stateNode.containerInfo);
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
          return s.dehydrated !== null ? (Za(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? dg(e, n, r) : (Za(n), e = Ta(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Za(n);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (s = (r & n.childLanes) !== 0, s || (gi(
          e,
          n,
          r,
          !1
        ), s = (r & n.childLanes) !== 0), c) {
          if (s)
            return hg(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (c = n.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), X(Rt, Rt.current), s) break;
        return null;
      case 22:
        return n.lanes = 0, ig(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, kt, e.memoizedState.cache);
    }
    return Ta(e, n, r);
  }
  function mg(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Ut = !0;
      else {
        if (!id(e, r) && (n.flags & 128) === 0)
          return Ut = !1, Aw(
            e,
            n,
            r
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Ke && (n.flags & 1048576) !== 0 && Gm(n, ms, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var s = n.pendingProps;
          if (e = Lr(n.elementType), n.type = e, typeof e == "function")
            uu(e) ? (s = $r(e, s), n.tag = 1, n = cg(
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
              var c = e.$$typeof;
              if (c === A) {
                n.tag = 11, n = ng(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              } else if (c === ne) {
                n.tag = 14, n = ag(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              }
            }
            throw n = ce(e) || e, Error(l(306, n, ""));
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
        return s = n.type, c = $r(
          s,
          n.pendingProps
        ), cg(
          e,
          n,
          s,
          c,
          r
        );
      case 3:
        e: {
          if (Me(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          s = n.pendingProps;
          var f = n.memoizedState;
          c = f.element, Nu(e, n), ws(n, s, null, r);
          var b = n.memoizedState;
          if (s = b.cache, Xa(n, kt, s), s !== f.cache && bu(
            n,
            [kt],
            r,
            !0
          ), Ss(), s = b.element, f.isDehydrated)
            if (f = {
              element: s,
              isDehydrated: !1,
              cache: b.cache
            }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
              n = ug(
                e,
                n,
                s,
                r
              );
              break e;
            } else if (s !== c) {
              c = Bn(
                Error(l(424)),
                n
              ), ps(c), n = ug(
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
              for (vt = In(e.firstChild), tn = n, Ke = !0, Ya = null, Hn = !0, r = ip(
                n,
                null,
                s,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Dr(), s === c) {
              n = Ta(
                e,
                n,
                r
              );
              break e;
            }
            an(e, n, s, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return fo(e, n), e === null ? (r = Nv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : Ke || (r = n.type, e = n.pendingProps, s = Mo(
          ve.current
        ).createElement(r), s[pe] = n, s[ge] = e, rn(s, r, e), mt(s), n.stateNode = s) : n.memoizedState = Nv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Jt(n), e === null && Ke && (s = n.stateNode = wv(
          n.type,
          n.pendingProps,
          ve.current
        ), tn = n, Hn = !0, c = vt, sr(n.type) ? (Bd = c, vt = In(s.firstChild)) : vt = c), an(
          e,
          n,
          n.pendingProps.children,
          r
        ), fo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Ke && ((c = s = vt) && (s = lE(
          s,
          n.type,
          n.pendingProps,
          Hn
        ), s !== null ? (n.stateNode = s, tn = n, vt = In(s.firstChild), Hn = !1, c = !0) : c = !1), c || Ga(n)), Jt(n), c = n.type, f = n.pendingProps, b = e !== null ? e.memoizedProps : null, s = f.children, zd(c, f) ? s = null : b !== null && zd(c, b) && (n.flags |= 32), n.memoizedState !== null && (c = Du(
          e,
          n,
          ww,
          null,
          null,
          r
        ), qs._currentValue = c), fo(e, n), an(e, n, s, r), n.child;
      case 6:
        return e === null && Ke && ((e = r = vt) && (r = oE(
          r,
          n.pendingProps,
          Hn
        ), r !== null ? (n.stateNode = r, tn = n, vt = null, e = !0) : e = !1), e || Ga(n)), null;
      case 13:
        return dg(e, n, r);
      case 4:
        return Me(
          n,
          n.stateNode.containerInfo
        ), s = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          s,
          r
        ) : an(e, n, s, r), n.child;
      case 11:
        return ng(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return an(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return an(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return an(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return s = n.pendingProps, Xa(n, n.type, s.value), an(e, n, s.children, r), n.child;
      case 9:
        return c = n.type._context, s = n.pendingProps.children, Or(n), c = nn(c), s = s(c), n.flags |= 1, an(e, n, s, r), n.child;
      case 14:
        return ag(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return rg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return hg(e, n, r);
      case 31:
        return _w(e, n, r);
      case 22:
        return ig(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), s = nn(kt), e === null ? (c = wu(), c === null && (c = ft, f = xu(), c.pooledCache = f, f.refCount++, f !== null && (c.pooledCacheLanes |= r), c = f), n.memoizedState = { parent: s, cache: c }, ju(n), Xa(n, kt, c)) : ((e.lanes & r) !== 0 && (Nu(e, n), ws(n, null, null, r), Ss()), c = e.memoizedState, f = n.memoizedState, c.parent !== s ? (c = { parent: s, cache: s }, n.memoizedState = c, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = c), Xa(n, kt, s)) : (s = f.cache, Xa(n, kt, s), s !== c.cache && bu(
          n,
          [kt],
          r,
          !0
        ))), an(
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
  function Ca(e) {
    e.flags |= 4;
  }
  function sd(e, n, r, s, c) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Hg()) e.flags |= 8192;
        else
          throw Ur = Ql, Eu;
    } else e.flags &= -16777217;
  }
  function pg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !_v(n))
      if (Hg()) e.flags |= 8192;
      else
        throw Ur = Ql, Eu;
  }
  function mo(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Gt() : 536870912, e.lanes |= n, Ri |= n);
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
      for (var c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, s |= c.subtreeFlags & 65011712, s |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, s |= c.subtreeFlags, s |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= s, e.childLanes = r, n;
  }
  function Dw(e, n, r) {
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
        return r = n.stateNode, s = null, e !== null && (s = e.memoizedState.cache), n.memoizedState.cache !== s && (n.flags |= 2048), Ea(kt), $e(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(n) ? Ca(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, gu())), yt(n), null;
      case 26:
        var c = n.type, f = n.memoizedState;
        return e === null ? (Ca(n), f !== null ? (yt(n), pg(n, f)) : (yt(n), sd(
          n,
          c,
          null,
          s,
          r
        ))) : f ? f !== e.memoizedState ? (Ca(n), yt(n), pg(n, f)) : (yt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== s && Ca(n), yt(n), sd(
          n,
          c,
          e,
          s,
          r
        )), null;
      case 27:
        if (Pt(n), r = ve.current, c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ca(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          e = le.current, pi(n) ? Pm(n) : (e = wv(c, s, r), n.stateNode = e, Ca(n));
        }
        return yt(n), null;
      case 5:
        if (Pt(n), c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ca(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          if (f = le.current, pi(n))
            Pm(n);
          else {
            var b = Mo(
              ve.current
            );
            switch (f) {
              case 1:
                f = b.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                f = b.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    f = b.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    f = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    f = b.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof s.is == "string" ? b.createElement("select", {
                      is: s.is
                    }) : b.createElement("select"), s.multiple ? f.multiple = !0 : s.size && (f.size = s.size);
                    break;
                  default:
                    f = typeof s.is == "string" ? b.createElement(c, { is: s.is }) : b.createElement(c);
                }
            }
            f[pe] = n, f[ge] = s;
            e: for (b = n.child; b !== null; ) {
              if (b.tag === 5 || b.tag === 6)
                f.appendChild(b.stateNode);
              else if (b.tag !== 4 && b.tag !== 27 && b.child !== null) {
                b.child.return = b, b = b.child;
                continue;
              }
              if (b === n) break e;
              for (; b.sibling === null; ) {
                if (b.return === null || b.return === n)
                  break e;
                b = b.return;
              }
              b.sibling.return = b.return, b = b.sibling;
            }
            n.stateNode = f;
            e: switch (rn(f, c, s), c) {
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
            s && Ca(n);
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
          e.memoizedProps !== s && Ca(n);
        else {
          if (typeof s != "string" && n.stateNode === null)
            throw Error(l(166));
          if (e = ve.current, pi(n)) {
            if (e = n.stateNode, r = n.memoizedProps, s = null, c = tn, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  s = c.memoizedProps;
              }
            e[pe] = n, e = !!(e.nodeValue === r || s !== null && s.suppressHydrationWarning === !0 || dv(e.nodeValue, r)), e || Ga(n, !0);
          } else
            e = Mo(e).createTextNode(
              s
            ), e[pe] = n, n.stateNode = e;
        }
        return yt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (s = pi(n), r !== null) {
            if (e === null) {
              if (!s) throw Error(l(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[pe] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), e = !1;
          } else
            r = gu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return yt(n), null;
      case 13:
        if (s = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = pi(n), s !== null && s.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(l(318));
              if (c = n.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(l(317));
              c[pe] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), c = !1;
          } else
            c = gu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
        }
        return Tn(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = s !== null, e = e !== null && e.memoizedState !== null, r && (s = n.child, c = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (c = s.alternate.memoizedState.cachePool.pool), f = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (f = s.memoizedState.cachePool.pool), f !== c && (s.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), mo(n, n.updateQueue), yt(n), null);
      case 4:
        return $e(), e === null && Rd(n.stateNode.containerInfo), yt(n), null;
      case 10:
        return Ea(n.type), yt(n), null;
      case 19:
        if (Q(Rt), s = n.memoizedState, s === null) return yt(n), null;
        if (c = (n.flags & 128) !== 0, f = s.rendering, f === null)
          if (c) Rs(s, !1);
          else {
            if (Nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = eo(e), f !== null) {
                  for (n.flags |= 128, Rs(s, !1), e = f.updateQueue, n.updateQueue = e, mo(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    Im(r, e), r = r.sibling;
                  return X(
                    Rt,
                    Rt.current & 1 | 2
                  ), Ke && Sa(n, s.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            s.tail !== null && qt() > bo && (n.flags |= 128, c = !0, Rs(s, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = eo(f), e !== null) {
              if (n.flags |= 128, c = !0, e = e.updateQueue, n.updateQueue = e, mo(n, e), Rs(s, !0), s.tail === null && s.tailMode === "hidden" && !f.alternate && !Ke)
                return yt(n), null;
            } else
              2 * qt() - s.renderingStartTime > bo && r !== 536870912 && (n.flags |= 128, c = !0, Rs(s, !1), n.lanes = 4194304);
          s.isBackwards ? (f.sibling = n.child, n.child = f) : (e = s.last, e !== null ? e.sibling = f : n.child = f, s.last = f);
        }
        return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = qt(), e.sibling = null, r = Rt.current, X(
          Rt,
          c ? r & 1 | 2 : r & 1
        ), Ke && Sa(n, s.treeForkCount), e) : (yt(n), null);
      case 22:
      case 23:
        return Tn(n), Mu(), s = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== s && (n.flags |= 8192) : s && (n.flags |= 8192), s ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (yt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : yt(n), r = n.updateQueue, r !== null && mo(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== r && (n.flags |= 2048), e !== null && Q(kr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ea(kt), yt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function zw(e, n) {
    switch (mu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ea(kt), $e(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
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
        return Q(Rt), null;
      case 4:
        return $e(), null;
      case 10:
        return Ea(n.type), null;
      case 22:
      case 23:
        return Tn(n), Mu(), e !== null && Q(kr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ea(kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function gg(e, n) {
    switch (mu(n), n.tag) {
      case 3:
        Ea(kt), $e();
        break;
      case 26:
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        $e();
        break;
      case 31:
        n.memoizedState !== null && Tn(n);
        break;
      case 13:
        Tn(n);
        break;
      case 19:
        Q(Rt);
        break;
      case 10:
        Ea(n.type);
        break;
      case 22:
      case 23:
        Tn(n), Mu(), e !== null && Q(kr);
        break;
      case 24:
        Ea(kt);
    }
  }
  function Ms(e, n) {
    try {
      var r = n.updateQueue, s = r !== null ? r.lastEffect : null;
      if (s !== null) {
        var c = s.next;
        r = c;
        do {
          if ((r.tag & e) === e) {
            s = void 0;
            var f = r.create, b = r.inst;
            s = f(), b.destroy = s;
          }
          r = r.next;
        } while (r !== c);
      }
    } catch (j) {
      rt(n, n.return, j);
    }
  }
  function Wa(e, n, r) {
    try {
      var s = n.updateQueue, c = s !== null ? s.lastEffect : null;
      if (c !== null) {
        var f = c.next;
        s = f;
        do {
          if ((s.tag & e) === e) {
            var b = s.inst, j = b.destroy;
            if (j !== void 0) {
              b.destroy = void 0, c = n;
              var L = r, G = j;
              try {
                G();
              } catch (ae) {
                rt(
                  c,
                  L,
                  ae
                );
              }
            }
          }
          s = s.next;
        } while (s !== f);
      }
    } catch (ae) {
      rt(n, n.return, ae);
    }
  }
  function vg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        lp(n, r);
      } catch (s) {
        rt(e, e.return, s);
      }
    }
  }
  function yg(e, n, r) {
    r.props = $r(
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
    } catch (c) {
      rt(e, n, c);
    }
  }
  function fa(e, n) {
    var r = e.ref, s = e.refCleanup;
    if (r !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (c) {
          rt(e, n, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (c) {
          rt(e, n, c);
        }
      else r.current = null;
  }
  function bg(e) {
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
    } catch (c) {
      rt(e, e.return, c);
    }
  }
  function ld(e, n, r) {
    try {
      var s = e.stateNode;
      tE(s, e.type, r, n), s[ge] = n;
    } catch (c) {
      rt(e, e.return, c);
    }
  }
  function xg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && sr(e.type) || e.tag === 4;
  }
  function od(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || xg(e.return)) return null;
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
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = ya));
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (cd(e, n, r), e = e.sibling; e !== null; )
        cd(e, n, r), e = e.sibling;
  }
  function po(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (po(e, n, r), e = e.sibling; e !== null; )
        po(e, n, r), e = e.sibling;
  }
  function Sg(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var s = e.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      rn(n, s, r), n[pe] = e, n[ge] = r;
    } catch (f) {
      rt(e, e.return, f);
    }
  }
  var Ra = !1, Bt = !1, ud = !1, wg = typeof WeakSet == "function" ? WeakSet : Set, Qt = null;
  function Ow(e, n) {
    if (e = e.containerInfo, Ad = Lo, e = Om(e), au(e)) {
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
            var c = s.anchorOffset, f = s.focusNode;
            s = s.focusOffset;
            try {
              r.nodeType, f.nodeType;
            } catch {
              r = null;
              break e;
            }
            var b = 0, j = -1, L = -1, G = 0, ae = 0, oe = e, P = null;
            t: for (; ; ) {
              for (var ee; oe !== r || c !== 0 && oe.nodeType !== 3 || (j = b + c), oe !== f || s !== 0 && oe.nodeType !== 3 || (L = b + s), oe.nodeType === 3 && (b += oe.nodeValue.length), (ee = oe.firstChild) !== null; )
                P = oe, oe = ee;
              for (; ; ) {
                if (oe === e) break t;
                if (P === r && ++G === c && (j = b), P === f && ++ae === s && (L = b), (ee = oe.nextSibling) !== null) break;
                oe = P, P = oe.parentNode;
              }
              oe = ee;
            }
            r = j === -1 || L === -1 ? null : { start: j, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Dd = { focusedElem: e, selectionRange: r }, Lo = !1, Qt = n; Qt !== null; )
      if (n = Qt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, Qt = e;
      else
        for (; Qt !== null; ) {
          switch (n = Qt, f = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  c = e[r], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, r = n, c = f.memoizedProps, f = f.memoizedState, s = r.stateNode;
                try {
                  var xe = $r(
                    r.type,
                    c
                  );
                  e = s.getSnapshotBeforeUpdate(
                    xe,
                    f
                  ), s.__reactInternalSnapshotBeforeUpdate = e;
                } catch (_e) {
                  rt(
                    r,
                    r.return,
                    _e
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, r = e.nodeType, r === 9)
                  kd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      kd(e);
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
  function Eg(e, n, r) {
    var s = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        _a(e, r), s & 4 && Ms(5, r);
        break;
      case 1:
        if (_a(e, r), s & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (b) {
              rt(r, r.return, b);
            }
          else {
            var c = $r(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                c,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (b) {
              rt(
                r,
                r.return,
                b
              );
            }
          }
        s & 64 && vg(r), s & 512 && _s(r, r.return);
        break;
      case 3:
        if (_a(e, r), s & 64 && (e = r.updateQueue, e !== null)) {
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
            lp(e, n);
          } catch (b) {
            rt(r, r.return, b);
          }
        }
        break;
      case 27:
        n === null && s & 4 && Sg(r);
      case 26:
      case 5:
        _a(e, r), n === null && s & 4 && bg(r), s & 512 && _s(r, r.return);
        break;
      case 12:
        _a(e, r);
        break;
      case 31:
        _a(e, r), s & 4 && Tg(e, r);
        break;
      case 13:
        _a(e, r), s & 4 && Cg(e, r), s & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = Iw.bind(
          null,
          r
        ), cE(e, r))));
        break;
      case 22:
        if (s = r.memoizedState !== null || Ra, !s) {
          n = n !== null && n.memoizedState !== null || Bt, c = Ra;
          var f = Bt;
          Ra = s, (Bt = n) && !f ? Aa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : _a(e, r), Ra = c, Bt = f;
        }
        break;
      case 30:
        break;
      default:
        _a(e, r);
    }
  }
  function jg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, jg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && dt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var wt = null, pn = !1;
  function Ma(e, n, r) {
    for (r = r.child; r !== null; )
      Ng(e, n, r), r = r.sibling;
  }
  function Ng(e, n, r) {
    if (Wt && typeof Wt.onCommitFiberUnmount == "function")
      try {
        Wt.onCommitFiberUnmount(Zn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Bt || fa(r, n), Ma(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Bt || fa(r, n);
        var s = wt, c = pn;
        sr(r.type) && (wt = r.stateNode, pn = !1), Ma(
          e,
          n,
          r
        ), Vs(r.stateNode), wt = s, pn = c;
        break;
      case 5:
        Bt || fa(r, n);
      case 6:
        if (s = wt, c = pn, wt = null, Ma(
          e,
          n,
          r
        ), wt = s, pn = c, wt !== null)
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
        wt !== null && (pn ? (e = wt, vv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : vv(wt, r.stateNode));
        break;
      case 4:
        s = wt, c = pn, wt = r.stateNode.containerInfo, pn = !0, Ma(
          e,
          n,
          r
        ), wt = s, pn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wa(2, r, n), Bt || Wa(4, r, n), Ma(
          e,
          n,
          r
        );
        break;
      case 1:
        Bt || (fa(r, n), s = r.stateNode, typeof s.componentWillUnmount == "function" && yg(
          r,
          n,
          s
        )), Ma(
          e,
          n,
          r
        );
        break;
      case 21:
        Ma(
          e,
          n,
          r
        );
        break;
      case 22:
        Bt = (s = Bt) || r.memoizedState !== null, Ma(
          e,
          n,
          r
        ), Bt = s;
        break;
      default:
        Ma(
          e,
          n,
          r
        );
    }
  }
  function Tg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Li(e);
      } catch (r) {
        rt(n, n.return, r);
      }
    }
  }
  function Cg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Li(e);
      } catch (r) {
        rt(n, n.return, r);
      }
  }
  function kw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new wg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new wg()), n;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function go(e, n) {
    var r = kw(e);
    n.forEach(function(s) {
      if (!r.has(s)) {
        r.add(s);
        var c = Fw.bind(null, e, s);
        s.then(c, c);
      }
    });
  }
  function gn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var s = 0; s < r.length; s++) {
        var c = r[s], f = e, b = n, j = b;
        e: for (; j !== null; ) {
          switch (j.tag) {
            case 27:
              if (sr(j.type)) {
                wt = j.stateNode, pn = !1;
                break e;
              }
              break;
            case 5:
              wt = j.stateNode, pn = !1;
              break e;
            case 3:
            case 4:
              wt = j.stateNode.containerInfo, pn = !0;
              break e;
          }
          j = j.return;
        }
        if (wt === null) throw Error(l(160));
        Ng(f, b, c), wt = null, pn = !1, f = c.alternate, f !== null && (f.return = null), c.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Rg(n, e), n = n.sibling;
  }
  var ta = null;
  function Rg(e, n) {
    var r = e.alternate, s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        gn(n, e), vn(e), s & 4 && (Wa(3, e, e.return), Ms(3, e), Wa(5, e, e.return));
        break;
      case 1:
        gn(n, e), vn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 64 && Ra && (e = e.updateQueue, e !== null && (s = e.callbacks, s !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? s : r.concat(s))));
        break;
      case 26:
        var c = ta;
        if (gn(n, e), vn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 4) {
          var f = r !== null ? r.memoizedState : null;
          if (s = e.memoizedState, r === null)
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  s = e.type, r = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (s) {
                    case "title":
                      f = c.getElementsByTagName("title")[0], (!f || f[He] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = c.createElement(s), c.head.insertBefore(
                        f,
                        c.querySelector("head > title")
                      )), rn(f, s, r), f[pe] = e, mt(f), s = f;
                      break e;
                    case "link":
                      var b = Rv(
                        "link",
                        "href",
                        c
                      ).get(s + (r.href || ""));
                      if (b) {
                        for (var j = 0; j < b.length; j++)
                          if (f = b[j], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            b.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(s), rn(f, s, r), c.head.appendChild(f);
                      break;
                    case "meta":
                      if (b = Rv(
                        "meta",
                        "content",
                        c
                      ).get(s + (r.content || ""))) {
                        for (j = 0; j < b.length; j++)
                          if (f = b[j], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            b.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(s), rn(f, s, r), c.head.appendChild(f);
                      break;
                    default:
                      throw Error(l(468, s));
                  }
                  f[pe] = e, mt(f), s = f;
                }
                e.stateNode = s;
              } else
                Mv(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Cv(
                c,
                s,
                e.memoizedProps
              );
          else
            f !== s ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, s === null ? Mv(
              c,
              e.type,
              e.stateNode
            ) : Cv(
              c,
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
        gn(n, e), vn(e), s & 512 && (Bt || r === null || fa(r, r.return)), r !== null && s & 4 && ld(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (gn(n, e), vn(e), s & 512 && (Bt || r === null || fa(r, r.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            ii(c, "");
          } catch (xe) {
            rt(e, e.return, xe);
          }
        }
        s & 4 && e.stateNode != null && (c = e.memoizedProps, ld(
          e,
          c,
          r !== null ? r.memoizedProps : c
        )), s & 1024 && (ud = !0);
        break;
      case 6:
        if (gn(n, e), vn(e), s & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          s = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = s;
          } catch (xe) {
            rt(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (Do = null, c = ta, ta = _o(n.containerInfo), gn(n, e), ta = c, vn(e), s & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(n.containerInfo);
          } catch (xe) {
            rt(e, e.return, xe);
          }
        ud && (ud = !1, Mg(e));
        break;
      case 4:
        s = ta, ta = _o(
          e.stateNode.containerInfo
        ), gn(n, e), vn(e), ta = s;
        break;
      case 12:
        gn(n, e), vn(e);
        break;
      case 31:
        gn(n, e), vn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, go(e, s)));
        break;
      case 13:
        gn(n, e), vn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (yo = qt()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, go(e, s)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, G = Ra, ae = Bt;
        if (Ra = G || c, Bt = ae || L, gn(n, e), Bt = ae, Ra = G, vn(e), s & 8192)
          e: for (n = e.stateNode, n._visibility = c ? n._visibility & -2 : n._visibility | 1, c && (r === null || L || Ra || Bt || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (f = L.stateNode, c)
                    b = f.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    j = L.stateNode;
                    var oe = L.memoizedProps.style, P = oe != null && oe.hasOwnProperty("display") ? oe.display : null;
                    j.style.display = P == null || typeof P == "boolean" ? "" : ("" + P).trim();
                  }
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = c ? "" : L.memoizedProps;
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var ee = L.stateNode;
                  c ? yv(ee, !0) : yv(L.stateNode, !1);
                } catch (xe) {
                  rt(L, L.return, xe);
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
        s & 4 && (s = e.updateQueue, s !== null && (r = s.retryQueue, r !== null && (s.retryQueue = null, go(e, r))));
        break;
      case 19:
        gn(n, e), vn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, go(e, s)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        gn(n, e), vn(e);
    }
  }
  function vn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, s = e.return; s !== null; ) {
          if (xg(s)) {
            r = s;
            break;
          }
          s = s.return;
        }
        if (r == null) throw Error(l(160));
        switch (r.tag) {
          case 27:
            var c = r.stateNode, f = od(e);
            po(e, f, c);
            break;
          case 5:
            var b = r.stateNode;
            r.flags & 32 && (ii(b, ""), r.flags &= -33);
            var j = od(e);
            po(e, j, b);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, G = od(e);
            cd(
              e,
              G,
              L
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ae) {
        rt(e, e.return, ae);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Mg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Mg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function _a(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Eg(e, n.alternate, n), n = n.sibling;
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
          typeof r.componentWillUnmount == "function" && yg(
            n,
            n.return,
            r
          ), Hr(n);
          break;
        case 27:
          Vs(n.stateNode);
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
  function Aa(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var s = n.alternate, c = e, f = n, b = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Aa(
            c,
            f,
            r
          ), Ms(4, f);
          break;
        case 1:
          if (Aa(
            c,
            f,
            r
          ), s = f, c = s.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (G) {
              rt(s, s.return, G);
            }
          if (s = f, c = s.updateQueue, c !== null) {
            var j = s.stateNode;
            try {
              var L = c.shared.hiddenCallbacks;
              if (L !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < L.length; c++)
                  sp(L[c], j);
            } catch (G) {
              rt(s, s.return, G);
            }
          }
          r && b & 64 && vg(f), _s(f, f.return);
          break;
        case 27:
          Sg(f);
        case 26:
        case 5:
          Aa(
            c,
            f,
            r
          ), r && s === null && b & 4 && bg(f), _s(f, f.return);
          break;
        case 12:
          Aa(
            c,
            f,
            r
          );
          break;
        case 31:
          Aa(
            c,
            f,
            r
          ), r && b & 4 && Tg(c, f);
          break;
        case 13:
          Aa(
            c,
            f,
            r
          ), r && b & 4 && Cg(c, f);
          break;
        case 22:
          f.memoizedState === null && Aa(
            c,
            f,
            r
          ), _s(f, f.return);
          break;
        case 30:
          break;
        default:
          Aa(
            c,
            f,
            r
          );
      }
      n = n.sibling;
    }
  }
  function dd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && gs(r));
  }
  function fd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && gs(e));
  }
  function na(e, n, r, s) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        _g(
          e,
          n,
          r,
          s
        ), n = n.sibling;
  }
  function _g(e, n, r, s) {
    var c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        na(
          e,
          n,
          r,
          s
        ), c & 2048 && Ms(9, n);
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
        ), c & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && gs(e)));
        break;
      case 12:
        if (c & 2048) {
          na(
            e,
            n,
            r,
            s
          ), e = n.stateNode;
          try {
            var f = n.memoizedProps, b = f.id, j = f.onPostCommit;
            typeof j == "function" && j(
              b,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (L) {
            rt(n, n.return, L);
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
        f = n.stateNode, b = n.alternate, n.memoizedState !== null ? f._visibility & 2 ? na(
          e,
          n,
          r,
          s
        ) : As(e, n) : f._visibility & 2 ? na(
          e,
          n,
          r,
          s
        ) : (f._visibility |= 2, Ni(
          e,
          n,
          r,
          s,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && dd(b, n);
        break;
      case 24:
        na(
          e,
          n,
          r,
          s
        ), c & 2048 && fd(n.alternate, n);
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
  function Ni(e, n, r, s, c) {
    for (c = c && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var f = e, b = n, j = r, L = s, G = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
            f,
            b,
            j,
            L,
            c
          ), Ms(8, b);
          break;
        case 23:
          break;
        case 22:
          var ae = b.stateNode;
          b.memoizedState !== null ? ae._visibility & 2 ? Ni(
            f,
            b,
            j,
            L,
            c
          ) : As(
            f,
            b
          ) : (ae._visibility |= 2, Ni(
            f,
            b,
            j,
            L,
            c
          )), c && G & 2048 && dd(
            b.alternate,
            b
          );
          break;
        case 24:
          Ni(
            f,
            b,
            j,
            L,
            c
          ), c && G & 2048 && fd(b.alternate, b);
          break;
        default:
          Ni(
            f,
            b,
            j,
            L,
            c
          );
      }
      n = n.sibling;
    }
  }
  function As(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, s = n, c = s.flags;
        switch (s.tag) {
          case 22:
            As(r, s), c & 2048 && dd(
              s.alternate,
              s
            );
            break;
          case 24:
            As(r, s), c & 2048 && fd(s.alternate, s);
            break;
          default:
            As(r, s);
        }
        n = n.sibling;
      }
  }
  var Ds = 8192;
  function Ti(e, n, r) {
    if (e.subtreeFlags & Ds)
      for (e = e.child; e !== null; )
        Ag(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Ag(e, n, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          n,
          r
        ), e.flags & Ds && e.memoizedState !== null && SE(
          r,
          ta,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ti(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var s = ta;
        ta = _o(e.stateNode.containerInfo), Ti(
          e,
          n,
          r
        ), ta = s;
        break;
      case 22:
        e.memoizedState === null && (s = e.alternate, s !== null && s.memoizedState !== null ? (s = Ds, Ds = 16777216, Ti(
          e,
          n,
          r
        ), Ds = s) : Ti(
          e,
          n,
          r
        ));
        break;
      default:
        Ti(
          e,
          n,
          r
        );
    }
  }
  function Dg(e) {
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
          Qt = s, Og(
            s,
            e
          );
        }
      Dg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        zg(e), e = e.sibling;
  }
  function zg(e) {
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
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, vo(e)) : zs(e);
        break;
      default:
        zs(e);
    }
  }
  function vo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, Og(
            s,
            e
          );
        }
      Dg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, n, n.return), vo(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, vo(n));
          break;
        default:
          vo(n);
      }
      e = e.sibling;
    }
  }
  function Og(e, n) {
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
          gs(r.memoizedState.cache);
      }
      if (s = r.child, s !== null) s.return = r, Qt = s;
      else
        e: for (r = e; Qt !== null; ) {
          s = Qt;
          var c = s.sibling, f = s.return;
          if (jg(s), s === r) {
            Qt = null;
            break e;
          }
          if (c !== null) {
            c.return = f, Qt = c;
            break e;
          }
          Qt = f;
        }
    }
  }
  var Lw = {
    getCacheForType: function(e) {
      var n = nn(kt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return nn(kt).controller.signal;
    }
  }, Uw = typeof WeakMap == "function" ? WeakMap : Map, tt = 0, ft = null, Ye = null, Xe = 0, at = 0, Cn = null, er = !1, Ci = !1, hd = !1, Da = 0, Nt = 0, tr = 0, qr = 0, md = 0, Rn = 0, Ri = 0, Os = null, yn = null, pd = !1, yo = 0, kg = 0, bo = 1 / 0, xo = null, nr = null, Xt = 0, ar = null, Mi = null, za = 0, gd = 0, vd = null, Lg = null, ks = 0, yd = null;
  function Mn() {
    return (tt & 2) !== 0 && Xe !== 0 ? Xe & -Xe : O.T !== null ? jd() : ue();
  }
  function Ug() {
    if (Rn === 0)
      if ((Xe & 536870912) === 0 || Ke) {
        var e = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), Rn = e;
      } else Rn = 536870912;
    return e = Nn.current, e !== null && (e.flags |= 32), Rn;
  }
  function bn(e, n, r) {
    (e === ft && (at === 2 || at === 9) || e.cancelPendingCommit !== null) && (_i(e, 0), rr(
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
  function Bg(e, n, r) {
    if ((tt & 6) !== 0) throw Error(l(327));
    var s = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ut(e, n), c = s ? $w(e, n) : xd(e, n, !0), f = s;
    do {
      if (c === 0) {
        Ci && !s && rr(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !Bw(r)) {
          c = xd(e, n, !1), f = !1;
          continue;
        }
        if (c === 2) {
          if (f = n, e.errorRecoveryDisabledLanes & f)
            var b = 0;
          else
            b = e.pendingLanes & -536870913, b = b !== 0 ? b : b & 536870912 ? 536870912 : 0;
          if (b !== 0) {
            n = b;
            e: {
              var j = e;
              c = Os;
              var L = j.current.memoizedState.isDehydrated;
              if (L && (_i(j, b).flags |= 256), b = xd(
                j,
                b,
                !1
              ), b !== 2) {
                if (hd && !L) {
                  j.errorRecoveryDisabledLanes |= f, qr |= f, c = 4;
                  break e;
                }
                f = yn, yn = c, f !== null && (yn === null ? yn = f : yn.push.apply(
                  yn,
                  f
                ));
              }
              c = b;
            }
            if (f = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          _i(e, 0), rr(e, n, 0, !0);
          break;
        }
        e: {
          switch (s = e, f = c, f) {
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
          if ((n & 62914560) === n && (c = yo + 300 - qt(), 10 < c)) {
            if (rr(
              s,
              n,
              Rn,
              !er
            ), Oe(s, 0, !0) !== 0) break e;
            za = n, s.timeoutHandle = pv(
              Vg.bind(
                null,
                s,
                r,
                yn,
                xo,
                pd,
                n,
                Rn,
                qr,
                Ri,
                er,
                f,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          Vg(
            s,
            r,
            yn,
            xo,
            pd,
            n,
            Rn,
            qr,
            Ri,
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
  function Vg(e, n, r, s, c, f, b, j, L, G, ae, oe, P, ee) {
    if (e.timeoutHandle = -1, oe = n.subtreeFlags, oe & 8192 || (oe & 16785408) === 16785408) {
      oe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ya
      }, Ag(
        n,
        f,
        oe
      );
      var xe = (f & 62914560) === f ? yo - qt() : (f & 4194048) === f ? kg - qt() : 0;
      if (xe = wE(
        oe,
        xe
      ), xe !== null) {
        za = f, e.cancelPendingCommit = xe(
          Xg.bind(
            null,
            e,
            n,
            f,
            r,
            s,
            c,
            b,
            j,
            L,
            ae,
            oe,
            null,
            P,
            ee
          )
        ), rr(e, f, b, !G);
        return;
      }
    }
    Xg(
      e,
      n,
      f,
      r,
      s,
      c,
      b,
      j,
      L
    );
  }
  function Bw(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var s = 0; s < r.length; s++) {
          var c = r[s], f = c.getSnapshot;
          c = c.value;
          try {
            if (!En(f(), c)) return !1;
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
    for (var c = n; 0 < c; ) {
      var f = 31 - Yt(c), b = 1 << f;
      s[f] = -1, c &= ~b;
    }
    r !== 0 && va(e, r, n);
  }
  function So() {
    return (tt & 6) === 0 ? (Ls(0), !1) : !0;
  }
  function bd() {
    if (Ye !== null) {
      if (at === 0)
        var e = Ye.return;
      else
        e = Ye, wa = zr = null, ku(e), xi = null, ys = 0, e = Ye;
      for (; e !== null; )
        gg(e.alternate, e), e = e.return;
      Ye = null;
    }
  }
  function _i(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, rE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), za = 0, bd(), ft = e, Ye = r = xa(e.current, null), Xe = n, at = 0, Cn = null, er = !1, Ci = ut(e, n), hd = !1, Ri = Rn = md = qr = tr = Nt = 0, yn = Os = null, pd = !1, (n & 8) !== 0 && (n |= n & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= n; 0 < s; ) {
        var c = 31 - Yt(s), f = 1 << c;
        n |= e[c], s &= ~f;
      }
    return Da = n, Hl(), r;
  }
  function $g(e, n) {
    Ue = null, O.H = Ts, n === bi || n === Kl ? (n = np(), at = 3) : n === Eu ? (n = np(), at = 4) : at = n === Zu ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Cn = n, Ye === null && (Nt = 1, co(
      e,
      Bn(n, e.current)
    ));
  }
  function Hg() {
    var e = Nn.current;
    return e === null ? !0 : (Xe & 4194048) === Xe ? qn === null : (Xe & 62914560) === Xe || (Xe & 536870912) !== 0 ? e === qn : !1;
  }
  function qg() {
    var e = O.H;
    return O.H = Ts, e === null ? Ts : e;
  }
  function Ig() {
    var e = O.A;
    return O.A = Lw, e;
  }
  function wo() {
    Nt = 4, er || (Xe & 4194048) !== Xe && Nn.current !== null || (Ci = !0), (tr & 134217727) === 0 && (qr & 134217727) === 0 || ft === null || rr(
      ft,
      Xe,
      Rn,
      !1
    );
  }
  function xd(e, n, r) {
    var s = tt;
    tt |= 2;
    var c = qg(), f = Ig();
    (ft !== e || Xe !== n) && (xo = null, _i(e, n)), n = !1;
    var b = Nt;
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          var j = Ye, L = Cn;
          switch (at) {
            case 8:
              bd(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (n = !0);
              var G = at;
              if (at = 0, Cn = null, Ai(e, j, L, G), r && Ci) {
                b = 0;
                break e;
              }
              break;
            default:
              G = at, at = 0, Cn = null, Ai(e, j, L, G);
          }
        }
        Vw(), b = Nt;
        break;
      } catch (ae) {
        $g(e, ae);
      }
    while (!0);
    return n && e.shellSuspendCounter++, wa = zr = null, tt = s, O.H = c, O.A = f, Ye === null && (ft = null, Xe = 0, Hl()), b;
  }
  function Vw() {
    for (; Ye !== null; ) Fg(Ye);
  }
  function $w(e, n) {
    var r = tt;
    tt |= 2;
    var s = qg(), c = Ig();
    ft !== e || Xe !== n ? (xo = null, bo = qt() + 500, _i(e, n)) : Ci = ut(
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
              at = 0, Cn = null, Ai(e, n, f, 1);
              break;
            case 2:
            case 9:
              if (ep(f)) {
                at = 0, Cn = null, Yg(n);
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
              ep(f) ? (at = 0, Cn = null, Yg(n)) : (at = 0, Cn = null, Ai(e, n, f, 7));
              break;
            case 5:
              var b = null;
              switch (Ye.tag) {
                case 26:
                  b = Ye.memoizedState;
                case 5:
                case 27:
                  var j = Ye;
                  if (b ? _v(b) : j.stateNode.complete) {
                    at = 0, Cn = null;
                    var L = j.sibling;
                    if (L !== null) Ye = L;
                    else {
                      var G = j.return;
                      G !== null ? (Ye = G, Eo(G)) : Ye = null;
                    }
                    break t;
                  }
              }
              at = 0, Cn = null, Ai(e, n, f, 5);
              break;
            case 6:
              at = 0, Cn = null, Ai(e, n, f, 6);
              break;
            case 8:
              bd(), Nt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        Hw();
        break;
      } catch (ae) {
        $g(e, ae);
      }
    while (!0);
    return wa = zr = null, O.H = s, O.A = c, tt = r, Ye !== null ? 0 : (ft = null, Xe = 0, Hl(), Nt);
  }
  function Hw() {
    for (; Ye !== null && !Ht(); )
      Fg(Ye);
  }
  function Fg(e) {
    var n = mg(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : Ye = n;
  }
  function Yg(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = og(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Xe
        );
        break;
      case 11:
        n = og(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Xe
        );
        break;
      case 5:
        ku(n);
      default:
        gg(r, n), n = Ye = Im(n, Da), n = mg(r, n, Da);
    }
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : Ye = n;
  }
  function Ai(e, n, r, s) {
    wa = zr = null, ku(n), xi = null, ys = 0;
    var c = n.return;
    try {
      if (Mw(
        e,
        c,
        n,
        r,
        Xe
      )) {
        Nt = 1, co(
          e,
          Bn(r, e.current)
        ), Ye = null;
        return;
      }
    } catch (f) {
      if (c !== null) throw Ye = c, f;
      Nt = 1, co(
        e,
        Bn(r, e.current)
      ), Ye = null;
      return;
    }
    n.flags & 32768 ? (Ke || s === 1 ? e = !0 : Ci || (Xe & 536870912) !== 0 ? e = !1 : (er = e = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = Nn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), Gg(n, e)) : Eo(n);
  }
  function Eo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Gg(
          n,
          er
        );
        return;
      }
      e = n.return;
      var r = Dw(
        n.alternate,
        n,
        Da
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
  function Gg(e, n) {
    do {
      var r = zw(e.alternate, e);
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
  function Xg(e, n, r, s, c, f, b, j, L) {
    e.cancelPendingCommit = null;
    do
      jo();
    while (Xt !== 0);
    if ((tt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === e.current) throw Error(l(177));
      if (f = n.lanes | n.childLanes, f |= ou, en(
        e,
        r,
        f,
        b,
        j,
        L
      ), e === ft && (Ye = ft = null, Xe = 0), Mi = n, ar = e, za = r, gd = f, vd = c, Lg = s, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Yw(nt, function() {
        return Jg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), s = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || s) {
        s = O.T, O.T = null, c = C.p, C.p = 2, b = tt, tt |= 4;
        try {
          Ow(e, n, r);
        } finally {
          tt = b, C.p = c, O.T = s;
        }
      }
      Xt = 1, Pg(), Kg(), Qg();
    }
  }
  function Pg() {
    if (Xt === 1) {
      Xt = 0;
      var e = ar, n = Mi, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = O.T, O.T = null;
        var s = C.p;
        C.p = 2;
        var c = tt;
        tt |= 4;
        try {
          Rg(n, e);
          var f = Dd, b = Om(e.containerInfo), j = f.focusedElem, L = f.selectionRange;
          if (b !== j && j && j.ownerDocument && zm(
            j.ownerDocument.documentElement,
            j
          )) {
            if (L !== null && au(j)) {
              var G = L.start, ae = L.end;
              if (ae === void 0 && (ae = G), "selectionStart" in j)
                j.selectionStart = G, j.selectionEnd = Math.min(
                  ae,
                  j.value.length
                );
              else {
                var oe = j.ownerDocument || document, P = oe && oe.defaultView || window;
                if (P.getSelection) {
                  var ee = P.getSelection(), xe = j.textContent.length, _e = Math.min(L.start, xe), ct = L.end === void 0 ? _e : Math.min(L.end, xe);
                  !ee.extend && _e > ct && (b = ct, ct = _e, _e = b);
                  var H = Dm(
                    j,
                    _e
                  ), V = Dm(
                    j,
                    ct
                  );
                  if (H && V && (ee.rangeCount !== 1 || ee.anchorNode !== H.node || ee.anchorOffset !== H.offset || ee.focusNode !== V.node || ee.focusOffset !== V.offset)) {
                    var Y = oe.createRange();
                    Y.setStart(H.node, H.offset), ee.removeAllRanges(), _e > ct ? (ee.addRange(Y), ee.extend(V.node, V.offset)) : (Y.setEnd(V.node, V.offset), ee.addRange(Y));
                  }
                }
              }
            }
            for (oe = [], ee = j; ee = ee.parentNode; )
              ee.nodeType === 1 && oe.push({
                element: ee,
                left: ee.scrollLeft,
                top: ee.scrollTop
              });
            for (typeof j.focus == "function" && j.focus(), j = 0; j < oe.length; j++) {
              var se = oe[j];
              se.element.scrollLeft = se.left, se.element.scrollTop = se.top;
            }
          }
          Lo = !!Ad, Dd = Ad = null;
        } finally {
          tt = c, C.p = s, O.T = r;
        }
      }
      e.current = n, Xt = 2;
    }
  }
  function Kg() {
    if (Xt === 2) {
      Xt = 0;
      var e = ar, n = Mi, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = O.T, O.T = null;
        var s = C.p;
        C.p = 2;
        var c = tt;
        tt |= 4;
        try {
          Eg(e, n.alternate, n);
        } finally {
          tt = c, C.p = s, O.T = r;
        }
      }
      Xt = 3;
    }
  }
  function Qg() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, On();
      var e = ar, n = Mi, r = za, s = Lg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, Mi = ar = null, Zg(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (nr = null), F(r), n = n.stateNode, Wt && typeof Wt.onCommitFiberRoot == "function")
        try {
          Wt.onCommitFiberRoot(
            Zn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        n = O.T, c = C.p, C.p = 2, O.T = null;
        try {
          for (var f = e.onRecoverableError, b = 0; b < s.length; b++) {
            var j = s[b];
            f(j.value, {
              componentStack: j.stack
            });
          }
        } finally {
          O.T = n, C.p = c;
        }
      }
      (za & 3) !== 0 && jo(), ha(e), c = e.pendingLanes, (r & 261930) !== 0 && (c & 42) !== 0 ? e === yd ? ks++ : (ks = 0, yd = e) : ks = 0, Ls(0);
    }
  }
  function Zg(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, gs(n)));
  }
  function jo() {
    return Pg(), Kg(), Qg(), Jg();
  }
  function Jg() {
    if (Xt !== 5) return !1;
    var e = ar, n = gd;
    gd = 0;
    var r = F(za), s = O.T, c = C.p;
    try {
      C.p = 32 > r ? 32 : r, O.T = null, r = vd, vd = null;
      var f = ar, b = za;
      if (Xt = 0, Mi = ar = null, za = 0, (tt & 6) !== 0) throw Error(l(331));
      var j = tt;
      if (tt |= 4, zg(f.current), _g(
        f,
        f.current,
        b,
        r
      ), tt = j, Ls(0, !1), Wt && typeof Wt.onPostCommitFiberRoot == "function")
        try {
          Wt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      C.p = c, O.T = s, Zg(e, n);
    }
  }
  function Wg(e, n, r) {
    n = Bn(r, n), n = Qu(e.stateNode, n, 2), e = Qa(e, n, 2), e !== null && (it(e, 2), ha(e));
  }
  function rt(e, n, r) {
    if (e.tag === 3)
      Wg(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Wg(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var s = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (nr === null || !nr.has(s))) {
            e = Bn(r, e), r = eg(2), s = Qa(n, r, 2), s !== null && (tg(
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
      s = e.pingCache = new Uw();
      var c = /* @__PURE__ */ new Set();
      s.set(n, c);
    } else
      c = s.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), s.set(n, c));
    c.has(r) || (hd = !0, c.add(r), e = qw.bind(null, e, n, r), n.then(e, e));
  }
  function qw(e, n, r) {
    var s = e.pingCache;
    s !== null && s.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, ft === e && (Xe & r) === r && (Nt === 4 || Nt === 3 && (Xe & 62914560) === Xe && 300 > qt() - yo ? (tt & 2) === 0 && _i(e, 0) : md |= r, Ri === Xe && (Ri = 0)), ha(e);
  }
  function ev(e, n) {
    n === 0 && (n = Gt()), e = _r(e, n), e !== null && (it(e, n), ha(e));
  }
  function Iw(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), ev(e, r);
  }
  function Fw(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var s = e.stateNode, c = e.memoizedState;
        c !== null && (r = c.retryLane);
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
    s !== null && s.delete(n), ev(e, r);
  }
  function Yw(e, n) {
    return xt(e, n);
  }
  var No = null, Di = null, wd = !1, To = !1, Ed = !1, ir = 0;
  function ha(e) {
    e !== Di && e.next === null && (Di === null ? No = Di = e : Di = Di.next = e), To = !0, wd || (wd = !0, Xw());
  }
  function Ls(e, n) {
    if (!Ed && To) {
      Ed = !0;
      do
        for (var r = !1, s = No; s !== null; ) {
          if (e !== 0) {
            var c = s.pendingLanes;
            if (c === 0) var f = 0;
            else {
              var b = s.suspendedLanes, j = s.pingedLanes;
              f = (1 << 31 - Yt(42 | e) + 1) - 1, f &= c & ~(b & ~j), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, rv(s, f));
          } else
            f = Xe, f = Oe(
              s,
              s === ft ? f : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (f & 3) === 0 || ut(s, f) || (r = !0, rv(s, f));
          s = s.next;
        }
      while (r);
      Ed = !1;
    }
  }
  function Gw() {
    tv();
  }
  function tv() {
    To = wd = !1;
    var e = 0;
    ir !== 0 && aE() && (e = ir);
    for (var n = qt(), r = null, s = No; s !== null; ) {
      var c = s.next, f = nv(s, n);
      f === 0 ? (s.next = null, r === null ? No = c : r.next = c, c === null && (Di = r)) : (r = s, (e !== 0 || (f & 3) !== 0) && (To = !0)), s = c;
    }
    Xt !== 0 && Xt !== 5 || Ls(e), ir !== 0 && (ir = 0);
  }
  function nv(e, n) {
    for (var r = e.suspendedLanes, s = e.pingedLanes, c = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var b = 31 - Yt(f), j = 1 << b, L = c[b];
      L === -1 ? ((j & r) === 0 || (j & s) !== 0) && (c[b] = Dt(j, n)) : L <= n && (e.expiredLanes |= j), f &= ~j;
    }
    if (n = ft, r = Xe, r = Oe(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s = e.callbackNode, r === 0 || e === n && (at === 2 || at === 9) || e.cancelPendingCommit !== null)
      return s !== null && s !== null && dn(s), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ut(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (s !== null && dn(s), F(r)) {
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
      return s = av.bind(null, e), r = xt(r, s), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return s !== null && s !== null && dn(s), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function av(e, n) {
    if (Xt !== 0 && Xt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (jo() && e.callbackNode !== r)
      return null;
    var s = Xe;
    return s = Oe(
      e,
      e === ft ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s === 0 ? null : (Bg(e, s, n), nv(e, qt()), e.callbackNode != null && e.callbackNode === r ? av.bind(null, e) : null);
  }
  function rv(e, n) {
    if (jo()) return null;
    Bg(e, n, !0);
  }
  function Xw() {
    iE(function() {
      (tt & 6) !== 0 ? xt(
        ze,
        Gw
      ) : tv();
    });
  }
  function jd() {
    if (ir === 0) {
      var e = vi;
      e === 0 && (e = ga, ga <<= 1, (ga & 261888) === 0 && (ga = 256)), ir = e;
    }
    return ir;
  }
  function iv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zl("" + e);
  }
  function sv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function Pw(e, n, r, s, c) {
    if (n === "submit" && r && r.stateNode === c) {
      var f = iv(
        (c[ge] || null).action
      ), b = s.submitter;
      b && (n = (n = b[ge] || null) ? iv(n.formAction) : b.getAttribute("formAction"), n !== null && (f = n, b = null));
      var j = new Ul(
        "action",
        "action",
        null,
        s,
        c
      );
      e.push({
        event: j,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (s.defaultPrevented) {
                if (ir !== 0) {
                  var L = b ? sv(c, b) : new FormData(c);
                  Fu(
                    r,
                    {
                      pending: !0,
                      data: L,
                      method: c.method,
                      action: f
                    },
                    null,
                    L
                  );
                }
              } else
                typeof f == "function" && (j.preventDefault(), L = b ? sv(c, b) : new FormData(c), Fu(
                  r,
                  {
                    pending: !0,
                    data: L,
                    method: c.method,
                    action: f
                  },
                  f,
                  L
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Nd = 0; Nd < lu.length; Nd++) {
    var Td = lu[Nd], Kw = Td.toLowerCase(), Qw = Td[0].toUpperCase() + Td.slice(1);
    ea(
      Kw,
      "on" + Qw
    );
  }
  ea(Um, "onAnimationEnd"), ea(Bm, "onAnimationIteration"), ea(Vm, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(fw, "onTransitionRun"), ea(hw, "onTransitionStart"), ea(mw, "onTransitionCancel"), ea($m, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Kt(
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
  ), Zw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Us)
  );
  function lv(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var s = e[r], c = s.event;
      s = s.listeners;
      e: {
        var f = void 0;
        if (n)
          for (var b = s.length - 1; 0 <= b; b--) {
            var j = s[b], L = j.instance, G = j.currentTarget;
            if (j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = G;
            try {
              f(c);
            } catch (ae) {
              $l(ae);
            }
            c.currentTarget = null, f = L;
          }
        else
          for (b = 0; b < s.length; b++) {
            if (j = s[b], L = j.instance, G = j.currentTarget, j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = G;
            try {
              f(c);
            } catch (ae) {
              $l(ae);
            }
            c.currentTarget = null, f = L;
          }
      }
    }
  }
  function Ge(e, n) {
    var r = n[be];
    r === void 0 && (r = n[be] = /* @__PURE__ */ new Set());
    var s = e + "__bubble";
    r.has(s) || (ov(n, e, 2, !1), r.add(s));
  }
  function Cd(e, n, r) {
    var s = 0;
    n && (s |= 4), ov(
      r,
      e,
      s,
      n
    );
  }
  var Co = "_reactListening" + Math.random().toString(36).slice(2);
  function Rd(e) {
    if (!e[Co]) {
      e[Co] = !0, qa.forEach(function(r) {
        r !== "selectionchange" && (Zw.has(r) || Cd(r, !1, e), Cd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Co] || (n[Co] = !0, Cd("selectionchange", !1, n));
    }
  }
  function ov(e, n, r, s) {
    switch (Uv(n)) {
      case 2:
        var c = NE;
        break;
      case 8:
        c = TE;
        break;
      default:
        c = Id;
    }
    r = c.bind(
      null,
      n,
      r,
      e
    ), c = void 0, !Pc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (c = !0), s ? c !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: c
    }) : e.addEventListener(n, r, !0) : c !== void 0 ? e.addEventListener(n, r, {
      passive: c
    }) : e.addEventListener(n, r, !1);
  }
  function Md(e, n, r, s, c) {
    var f = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      e: for (; ; ) {
        if (s === null) return;
        var b = s.tag;
        if (b === 3 || b === 4) {
          var j = s.stateNode.containerInfo;
          if (j === c) break;
          if (b === 4)
            for (b = s.return; b !== null; ) {
              var L = b.tag;
              if ((L === 3 || L === 4) && b.stateNode.containerInfo === c)
                return;
              b = b.return;
            }
          for (; j !== null; ) {
            if (b = st(j), b === null) return;
            if (L = b.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              s = f = b;
              continue e;
            }
            j = j.parentNode;
          }
        }
        s = s.return;
      }
    hm(function() {
      var G = f, ae = Gc(r), oe = [];
      e: {
        var P = Hm.get(e);
        if (P !== void 0) {
          var ee = Ul, xe = e;
          switch (e) {
            case "keypress":
              if (kl(r) === 0) break e;
            case "keydown":
            case "keyup":
              ee = FS;
              break;
            case "focusin":
              xe = "focus", ee = Jc;
              break;
            case "focusout":
              xe = "blur", ee = Jc;
              break;
            case "beforeblur":
            case "afterblur":
              ee = Jc;
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
              ee = gm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ee = DS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ee = XS;
              break;
            case Um:
            case Bm:
            case Vm:
              ee = kS;
              break;
            case $m:
              ee = KS;
              break;
            case "scroll":
            case "scrollend":
              ee = _S;
              break;
            case "wheel":
              ee = ZS;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = US;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = ym;
              break;
            case "toggle":
            case "beforetoggle":
              ee = WS;
          }
          var _e = (n & 4) !== 0, ct = !_e && (e === "scroll" || e === "scrollend"), H = _e ? P !== null ? P + "Capture" : null : P;
          _e = [];
          for (var V = G, Y; V !== null; ) {
            var se = V;
            if (Y = se.stateNode, se = se.tag, se !== 5 && se !== 26 && se !== 27 || Y === null || H === null || (se = is(V, H), se != null && _e.push(
              Bs(V, se, Y)
            )), ct) break;
            V = V.return;
          }
          0 < _e.length && (P = new ee(
            P,
            xe,
            null,
            r,
            ae
          ), oe.push({ event: P, listeners: _e }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", ee = e === "mouseout" || e === "pointerout", P && r !== Yc && (xe = r.relatedTarget || r.fromElement) && (st(xe) || xe[Ee]))
            break e;
          if ((ee || P) && (P = ae.window === ae ? ae : (P = ae.ownerDocument) ? P.defaultView || P.parentWindow : window, ee ? (xe = r.relatedTarget || r.toElement, ee = G, xe = xe ? st(xe) : null, xe !== null && (ct = u(xe), _e = xe.tag, xe !== ct || _e !== 5 && _e !== 27 && _e !== 6) && (xe = null)) : (ee = null, xe = G), ee !== xe)) {
            if (_e = gm, se = "onMouseLeave", H = "onMouseEnter", V = "mouse", (e === "pointerout" || e === "pointerover") && (_e = ym, se = "onPointerLeave", H = "onPointerEnter", V = "pointer"), ct = ee == null ? P : Fe(ee), Y = xe == null ? P : Fe(xe), P = new _e(
              se,
              V + "leave",
              ee,
              r,
              ae
            ), P.target = ct, P.relatedTarget = Y, se = null, st(ae) === G && (_e = new _e(
              H,
              V + "enter",
              xe,
              r,
              ae
            ), _e.target = Y, _e.relatedTarget = ct, se = _e), ct = se, ee && xe)
              t: {
                for (_e = Jw, H = ee, V = xe, Y = 0, se = H; se; se = _e(se))
                  Y++;
                se = 0;
                for (var Ce = V; Ce; Ce = _e(Ce))
                  se++;
                for (; 0 < Y - se; )
                  H = _e(H), Y--;
                for (; 0 < se - Y; )
                  V = _e(V), se--;
                for (; Y--; ) {
                  if (H === V || V !== null && H === V.alternate) {
                    _e = H;
                    break t;
                  }
                  H = _e(H), V = _e(V);
                }
                _e = null;
              }
            else _e = null;
            ee !== null && cv(
              oe,
              P,
              ee,
              _e,
              !1
            ), xe !== null && ct !== null && cv(
              oe,
              ct,
              xe,
              _e,
              !0
            );
          }
        }
        e: {
          if (P = G ? Fe(G) : window, ee = P.nodeName && P.nodeName.toLowerCase(), ee === "select" || ee === "input" && P.type === "file")
            var Je = Tm;
          else if (jm(P))
            if (Cm)
              Je = cw;
            else {
              Je = lw;
              var je = sw;
            }
          else
            ee = P.nodeName, !ee || ee.toLowerCase() !== "input" || P.type !== "checkbox" && P.type !== "radio" ? G && Fc(G.elementType) && (Je = Tm) : Je = ow;
          if (Je && (Je = Je(e, G))) {
            Nm(
              oe,
              Je,
              r,
              ae
            );
            break e;
          }
          je && je(e, P, G), e === "focusout" && G && P.type === "number" && G.memoizedProps.value != null && Ic(P, "number", P.value);
        }
        switch (je = G ? Fe(G) : window, e) {
          case "focusin":
            (jm(je) || je.contentEditable === "true") && (ci = je, ru = G, hs = null);
            break;
          case "focusout":
            hs = ru = ci = null;
            break;
          case "mousedown":
            iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            iu = !1, km(oe, r, ae);
            break;
          case "selectionchange":
            if (dw) break;
          case "keydown":
          case "keyup":
            km(oe, r, ae);
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
          oi ? wm(e, r) && (Pe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (bm && r.locale !== "ko" && (oi || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && oi && (Be = mm()) : (Ia = ae, Kc = "value" in Ia ? Ia.value : Ia.textContent, oi = !0)), je = Ro(G, Pe), 0 < je.length && (Pe = new vm(
          Pe,
          e,
          null,
          r,
          ae
        ), oe.push({ event: Pe, listeners: je }), Be ? Pe.data = Be : (Be = Em(r), Be !== null && (Pe.data = Be)))), (Be = tw ? nw(e, r) : aw(e, r)) && (Pe = Ro(G, "onBeforeInput"), 0 < Pe.length && (je = new vm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ae
        ), oe.push({
          event: je,
          listeners: Pe
        }), je.data = Be)), Pw(
          oe,
          e,
          G,
          r,
          ae
        );
      }
      lv(oe, n);
    });
  }
  function Bs(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function Ro(e, n) {
    for (var r = n + "Capture", s = []; e !== null; ) {
      var c = e, f = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || f === null || (c = is(e, r), c != null && s.unshift(
        Bs(e, c, f)
      ), c = is(e, n), c != null && s.push(
        Bs(e, c, f)
      )), e.tag === 3) return s;
      e = e.return;
    }
    return [];
  }
  function Jw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function cv(e, n, r, s, c) {
    for (var f = n._reactName, b = []; r !== null && r !== s; ) {
      var j = r, L = j.alternate, G = j.stateNode;
      if (j = j.tag, L !== null && L === s) break;
      j !== 5 && j !== 26 && j !== 27 || G === null || (L = G, c ? (G = is(r, f), G != null && b.unshift(
        Bs(r, G, L)
      )) : c || (G = is(r, f), G != null && b.push(
        Bs(r, G, L)
      ))), r = r.return;
    }
    b.length !== 0 && e.push({ event: n, listeners: b });
  }
  var Ww = /\r\n?/g, eE = /\u0000|\uFFFD/g;
  function uv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ww, `
`).replace(eE, "");
  }
  function dv(e, n) {
    return n = uv(n), uv(e) === n;
  }
  function ot(e, n, r, s, c, f) {
    switch (r) {
      case "children":
        typeof s == "string" ? n === "body" || n === "textarea" && s === "" || ii(e, s) : (typeof s == "number" || typeof s == "bigint") && n !== "body" && ii(e, "" + s);
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
        dm(e, s, f);
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
        s = zl("" + s), e.setAttribute(r, s);
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
          typeof f == "function" && (r === "formAction" ? (n !== "input" && ot(e, n, "name", c.name, c, null), ot(
            e,
            n,
            "formEncType",
            c.formEncType,
            c,
            null
          ), ot(
            e,
            n,
            "formMethod",
            c.formMethod,
            c,
            null
          ), ot(
            e,
            n,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (ot(e, n, "encType", c.encType, c, null), ot(e, n, "method", c.method, c, null), ot(e, n, "target", c.target, c, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(r);
          break;
        }
        s = zl("" + s), e.setAttribute(r, s);
        break;
      case "onClick":
        s != null && (e.onclick = ya);
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
            if (c.children != null) throw Error(l(60));
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
        r = zl("" + s), e.setAttributeNS(
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
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          s
        );
        break;
      case "xlinkArcrole":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          s
        );
        break;
      case "xlinkRole":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          s
        );
        break;
      case "xlinkShow":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          s
        );
        break;
      case "xlinkTitle":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          s
        );
        break;
      case "xlinkType":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          s
        );
        break;
      case "xmlBase":
        ln(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          s
        );
        break;
      case "xmlLang":
        ln(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          s
        );
        break;
      case "xmlSpace":
        ln(
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = RS.get(r) || r, qe(e, r, s));
    }
  }
  function _d(e, n, r, s, c, f) {
    switch (r) {
      case "style":
        dm(e, s, f);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(l(61));
          if (r = s.__html, r != null) {
            if (c.children != null) throw Error(l(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof s == "string" ? ii(e, s) : (typeof s == "number" || typeof s == "bigint") && ii(e, "" + s);
        break;
      case "onScroll":
        s != null && Ge("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Ge("scrollend", e);
        break;
      case "onClick":
        s != null && (e.onclick = ya);
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
            if (r[0] === "o" && r[1] === "n" && (c = r.endsWith("Capture"), n = r.slice(2, c ? r.length - 7 : void 0), f = e[ge] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(n, f, c), typeof s == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, s, c);
              break e;
            }
            r in e ? e[r] = s : s === !0 ? e.setAttribute(r, "") : qe(e, r, s);
          }
    }
  }
  function rn(e, n, r) {
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
        var s = !1, c = !1, f;
        for (f in r)
          if (r.hasOwnProperty(f)) {
            var b = r[f];
            if (b != null)
              switch (f) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, n));
                default:
                  ot(e, n, f, b, r, null);
              }
          }
        c && ot(e, n, "srcSet", r.srcSet, r, null), s && ot(e, n, "src", r.src, r, null);
        return;
      case "input":
        Ge("invalid", e);
        var j = f = b = c = null, L = null, G = null;
        for (s in r)
          if (r.hasOwnProperty(s)) {
            var ae = r[s];
            if (ae != null)
              switch (s) {
                case "name":
                  c = ae;
                  break;
                case "type":
                  b = ae;
                  break;
                case "checked":
                  L = ae;
                  break;
                case "defaultChecked":
                  G = ae;
                  break;
                case "value":
                  f = ae;
                  break;
                case "defaultValue":
                  j = ae;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ae != null)
                    throw Error(l(137, n));
                  break;
                default:
                  ot(e, n, s, ae, r, null);
              }
          }
        lm(
          e,
          f,
          j,
          L,
          G,
          b,
          c,
          !1
        );
        return;
      case "select":
        Ge("invalid", e), s = b = f = null;
        for (c in r)
          if (r.hasOwnProperty(c) && (j = r[c], j != null))
            switch (c) {
              case "value":
                f = j;
                break;
              case "defaultValue":
                b = j;
                break;
              case "multiple":
                s = j;
              default:
                ot(e, n, c, j, r, null);
            }
        n = f, r = b, e.multiple = !!s, n != null ? ri(e, !!s, n, !1) : r != null && ri(e, !!s, r, !0);
        return;
      case "textarea":
        Ge("invalid", e), f = c = s = null;
        for (b in r)
          if (r.hasOwnProperty(b) && (j = r[b], j != null))
            switch (b) {
              case "value":
                s = j;
                break;
              case "defaultValue":
                c = j;
                break;
              case "children":
                f = j;
                break;
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(l(91));
                break;
              default:
                ot(e, n, b, j, r, null);
            }
        cm(e, s, c, f);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (s = r[L], s != null))
            switch (L) {
              case "selected":
                e.selected = s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                ot(e, n, L, s, r, null);
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
        for (G in r)
          if (r.hasOwnProperty(G) && (s = r[G], s != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                ot(e, n, G, s, r, null);
            }
        return;
      default:
        if (Fc(n)) {
          for (ae in r)
            r.hasOwnProperty(ae) && (s = r[ae], s !== void 0 && _d(
              e,
              n,
              ae,
              s,
              r,
              void 0
            ));
          return;
        }
    }
    for (j in r)
      r.hasOwnProperty(j) && (s = r[j], s != null && ot(e, n, j, s, r, null));
  }
  function tE(e, n, r, s) {
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
        var c = null, f = null, b = null, j = null, L = null, G = null, ae = null;
        for (ee in r) {
          var oe = r[ee];
          if (r.hasOwnProperty(ee) && oe != null)
            switch (ee) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = oe;
              default:
                s.hasOwnProperty(ee) || ot(e, n, ee, null, s, oe);
            }
        }
        for (var P in s) {
          var ee = s[P];
          if (oe = r[P], s.hasOwnProperty(P) && (ee != null || oe != null))
            switch (P) {
              case "type":
                f = ee;
                break;
              case "name":
                c = ee;
                break;
              case "checked":
                G = ee;
                break;
              case "defaultChecked":
                ae = ee;
                break;
              case "value":
                b = ee;
                break;
              case "defaultValue":
                j = ee;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ee != null)
                  throw Error(l(137, n));
                break;
              default:
                ee !== oe && ot(
                  e,
                  n,
                  P,
                  ee,
                  s,
                  oe
                );
            }
        }
        qc(
          e,
          b,
          j,
          L,
          G,
          ae,
          f,
          c
        );
        return;
      case "select":
        ee = b = j = P = null;
        for (f in r)
          if (L = r[f], r.hasOwnProperty(f) && L != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                ee = L;
              default:
                s.hasOwnProperty(f) || ot(
                  e,
                  n,
                  f,
                  null,
                  s,
                  L
                );
            }
        for (c in s)
          if (f = s[c], L = r[c], s.hasOwnProperty(c) && (f != null || L != null))
            switch (c) {
              case "value":
                P = f;
                break;
              case "defaultValue":
                j = f;
                break;
              case "multiple":
                b = f;
              default:
                f !== L && ot(
                  e,
                  n,
                  c,
                  f,
                  s,
                  L
                );
            }
        n = j, r = b, s = ee, P != null ? ri(e, !!r, P, !1) : !!s != !!r && (n != null ? ri(e, !!r, n, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        ee = P = null;
        for (j in r)
          if (c = r[j], r.hasOwnProperty(j) && c != null && !s.hasOwnProperty(j))
            switch (j) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, n, j, null, s, c);
            }
        for (b in s)
          if (c = s[b], f = r[b], s.hasOwnProperty(b) && (c != null || f != null))
            switch (b) {
              case "value":
                P = c;
                break;
              case "defaultValue":
                ee = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(l(91));
                break;
              default:
                c !== f && ot(e, n, b, c, s, f);
            }
        om(e, P, ee);
        return;
      case "option":
        for (var xe in r)
          if (P = r[xe], r.hasOwnProperty(xe) && P != null && !s.hasOwnProperty(xe))
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ot(
                  e,
                  n,
                  xe,
                  null,
                  s,
                  P
                );
            }
        for (L in s)
          if (P = s[L], ee = r[L], s.hasOwnProperty(L) && P !== ee && (P != null || ee != null))
            switch (L) {
              case "selected":
                e.selected = P && typeof P != "function" && typeof P != "symbol";
                break;
              default:
                ot(
                  e,
                  n,
                  L,
                  P,
                  s,
                  ee
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
        for (var _e in r)
          P = r[_e], r.hasOwnProperty(_e) && P != null && !s.hasOwnProperty(_e) && ot(e, n, _e, null, s, P);
        for (G in s)
          if (P = s[G], ee = r[G], s.hasOwnProperty(G) && P !== ee && (P != null || ee != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(l(137, n));
                break;
              default:
                ot(
                  e,
                  n,
                  G,
                  P,
                  s,
                  ee
                );
            }
        return;
      default:
        if (Fc(n)) {
          for (var ct in r)
            P = r[ct], r.hasOwnProperty(ct) && P !== void 0 && !s.hasOwnProperty(ct) && _d(
              e,
              n,
              ct,
              void 0,
              s,
              P
            );
          for (ae in s)
            P = s[ae], ee = r[ae], !s.hasOwnProperty(ae) || P === ee || P === void 0 && ee === void 0 || _d(
              e,
              n,
              ae,
              P,
              s,
              ee
            );
          return;
        }
    }
    for (var H in r)
      P = r[H], r.hasOwnProperty(H) && P != null && !s.hasOwnProperty(H) && ot(e, n, H, null, s, P);
    for (oe in s)
      P = s[oe], ee = r[oe], !s.hasOwnProperty(oe) || P === ee || P == null && ee == null || ot(e, n, oe, P, s, ee);
  }
  function fv(e) {
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
  function nE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), s = 0; s < r.length; s++) {
        var c = r[s], f = c.transferSize, b = c.initiatorType, j = c.duration;
        if (f && j && fv(b)) {
          for (b = 0, j = c.responseEnd, s += 1; s < r.length; s++) {
            var L = r[s], G = L.startTime;
            if (G > j) break;
            var ae = L.transferSize, oe = L.initiatorType;
            ae && fv(oe) && (L = L.responseEnd, b += ae * (L < j ? 1 : (j - G) / (L - G)));
          }
          if (--s, n += 8 * (f + b) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ad = null, Dd = null;
  function Mo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function hv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function mv(e, n) {
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
  var Od = null;
  function aE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Od ? !1 : (Od = e, !0) : (Od = null, !1);
  }
  var pv = typeof setTimeout == "function" ? setTimeout : void 0, rE = typeof clearTimeout == "function" ? clearTimeout : void 0, gv = typeof Promise == "function" ? Promise : void 0, iE = typeof queueMicrotask == "function" ? queueMicrotask : typeof gv < "u" ? function(e) {
    return gv.resolve(null).then(e).catch(sE);
  } : pv;
  function sE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function sr(e) {
    return e === "head";
  }
  function vv(e, n) {
    var r = n, s = 0;
    do {
      var c = r.nextSibling;
      if (e.removeChild(r), c && c.nodeType === 8)
        if (r = c.data, r === "/$" || r === "/&") {
          if (s === 0) {
            e.removeChild(c), Li(n);
            return;
          }
          s--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          s++;
        else if (r === "html")
          Vs(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, Vs(r);
          for (var f = r.firstChild; f; ) {
            var b = f.nextSibling, j = f.nodeName;
            f[He] || j === "SCRIPT" || j === "STYLE" || j === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = b;
          }
        } else
          r === "body" && Vs(e.ownerDocument.body);
      r = c;
    } while (r);
    Li(n);
  }
  function yv(e, n) {
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
  function kd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          kd(r), dt(r);
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
  function lE(e, n, r, s) {
    for (; e.nodeType === 1; ) {
      var c = r;
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
              if (f !== c.rel || e.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) || e.getAttribute("title") !== (c.title == null ? null : c.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (c.src == null ? null : c.src) || e.getAttribute("type") !== (c.type == null ? null : c.type) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var f = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = In(e.nextSibling), e === null) break;
    }
    return null;
  }
  function oE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function bv(e, n) {
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
  function cE(e, n) {
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
  function xv(e) {
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
  function Sv(e) {
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
  function wv(e, n, r) {
    switch (n = Mo(r), e) {
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
  function Vs(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    dt(e);
  }
  var Fn = /* @__PURE__ */ new Map(), Ev = /* @__PURE__ */ new Set();
  function _o(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = C.d;
  C.d = {
    f: uE,
    r: dE,
    D: fE,
    C: hE,
    L: mE,
    m: pE,
    X: vE,
    S: gE,
    M: yE
  };
  function uE() {
    var e = Oa.f(), n = So();
    return e || n;
  }
  function dE(e) {
    var n = St(e);
    n !== null && n.tag === 5 && n.type === "form" ? $p(n) : Oa.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function jv(e, n, r) {
    var s = zi;
    if (s && typeof n == "string" && n) {
      var c = Ln(n);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof r == "string" && (c += '[crossorigin="' + r + '"]'), Ev.has(c) || (Ev.add(c), e = { rel: e, crossOrigin: r, href: n }, s.querySelector(c) === null && (n = s.createElement("link"), rn(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function fE(e) {
    Oa.D(e), jv("dns-prefetch", e, null);
  }
  function hE(e, n) {
    Oa.C(e, n), jv("preconnect", e, n);
  }
  function mE(e, n, r) {
    Oa.L(e, n, r);
    var s = zi;
    if (s && e && n) {
      var c = 'link[rel="preload"][as="' + Ln(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (c += '[imagesrcset="' + Ln(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (c += '[imagesizes="' + Ln(
        r.imageSizes
      ) + '"]')) : c += '[href="' + Ln(e) + '"]';
      var f = c;
      switch (n) {
        case "style":
          f = Oi(e);
          break;
        case "script":
          f = ki(e);
      }
      Fn.has(f) || (e = g(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Fn.set(f, e), s.querySelector(c) !== null || n === "style" && s.querySelector($s(f)) || n === "script" && s.querySelector(Hs(f)) || (n = s.createElement("link"), rn(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function pE(e, n) {
    Oa.m(e, n);
    var r = zi;
    if (r && e) {
      var s = n && typeof n.as == "string" ? n.as : "script", c = 'link[rel="modulepreload"][as="' + Ln(s) + '"][href="' + Ln(e) + '"]', f = c;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ki(e);
      }
      if (!Fn.has(f) && (e = g({ rel: "modulepreload", href: e }, n), Fn.set(f, e), r.querySelector(c) === null)) {
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
        s = r.createElement("link"), rn(s, "link", e), mt(s), r.head.appendChild(s);
      }
    }
  }
  function gE(e, n, r) {
    Oa.S(e, n, r);
    var s = zi;
    if (s && e) {
      var c = zt(s).hoistableStyles, f = Oi(e);
      n = n || "default";
      var b = c.get(f);
      if (!b) {
        var j = { loading: 0, preload: null };
        if (b = s.querySelector(
          $s(f)
        ))
          j.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Fn.get(f)) && Vd(e, r);
          var L = b = s.createElement("link");
          mt(L), rn(L, "link", e), L._p = new Promise(function(G, ae) {
            L.onload = G, L.onerror = ae;
          }), L.addEventListener("load", function() {
            j.loading |= 1;
          }), L.addEventListener("error", function() {
            j.loading |= 2;
          }), j.loading |= 4, Ao(b, n, s);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: j
        }, c.set(f, b);
      }
    }
  }
  function vE(e, n) {
    Oa.X(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, c = ki(e), f = s.get(c);
      f || (f = r.querySelector(Hs(c)), f || (e = g({ src: e, async: !0 }, n), (n = Fn.get(c)) && $d(e, n), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(c, f));
    }
  }
  function yE(e, n) {
    Oa.M(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, c = ki(e), f = s.get(c);
      f || (f = r.querySelector(Hs(c)), f || (e = g({ src: e, async: !0, type: "module" }, n), (n = Fn.get(c)) && $d(e, n), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(c, f));
    }
  }
  function Nv(e, n, r, s) {
    var c = (c = ve.current) ? _o(c) : null;
    if (!c) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = Oi(r.href), r = zt(
          c
        ).hoistableStyles, s = r.get(n), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Oi(r.href);
          var f = zt(
            c
          ).hoistableStyles, b = f.get(e);
          if (b || (c = c.ownerDocument || c, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, b), (f = c.querySelector(
            $s(e)
          )) && !f._p && (b.instance = f, b.state.loading = 5), Fn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Fn.set(e, r), f || bE(
            c,
            e,
            r,
            b.state
          ))), n && s === null)
            throw Error(l(528, ""));
          return b;
        }
        if (n && s !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ki(r), r = zt(
          c
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
  function Oi(e) {
    return 'href="' + Ln(e) + '"';
  }
  function $s(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Tv(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function bE(e, n, r, s) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? s.loading = 1 : (n = e.createElement("link"), s.preload = n, n.addEventListener("load", function() {
      return s.loading |= 1;
    }), n.addEventListener("error", function() {
      return s.loading |= 2;
    }), rn(n, "link", r), mt(n), e.head.appendChild(n));
  }
  function ki(e) {
    return '[src="' + Ln(e) + '"]';
  }
  function Hs(e) {
    return "script[async]" + e;
  }
  function Cv(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var s = e.querySelector(
            'style[data-href~="' + Ln(r.href) + '"]'
          );
          if (s)
            return n.instance = s, mt(s), s;
          var c = g({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return s = (e.ownerDocument || e).createElement(
            "style"
          ), mt(s), rn(s, "style", c), Ao(s, r.precedence, e), n.instance = s;
        case "stylesheet":
          c = Oi(r.href);
          var f = e.querySelector(
            $s(c)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, mt(f), f;
          s = Tv(r), (c = Fn.get(c)) && Vd(s, c), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var b = f;
          return b._p = new Promise(function(j, L) {
            b.onload = j, b.onerror = L;
          }), rn(f, "link", s), n.state.loading |= 4, Ao(f, r.precedence, e), n.instance = f;
        case "script":
          return f = ki(r.src), (c = e.querySelector(
            Hs(f)
          )) ? (n.instance = c, mt(c), c) : (s = r, (c = Fn.get(f)) && (s = g({}, r), $d(s, c)), e = e.ownerDocument || e, c = e.createElement("script"), mt(c), rn(c, "link", s), e.head.appendChild(c), n.instance = c);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (s = n.instance, n.state.loading |= 4, Ao(s, r.precedence, e));
    return n.instance;
  }
  function Ao(e, n, r) {
    for (var s = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = s.length ? s[s.length - 1] : null, f = c, b = 0; b < s.length; b++) {
      var j = s[b];
      if (j.dataset.precedence === n) f = j;
      else if (f !== c) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Vd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function $d(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Do = null;
  function Rv(e, n, r) {
    if (Do === null) {
      var s = /* @__PURE__ */ new Map(), c = Do = /* @__PURE__ */ new Map();
      c.set(r, s);
    } else
      c = Do, s = c.get(r), s || (s = /* @__PURE__ */ new Map(), c.set(r, s));
    if (s.has(e)) return s;
    for (s.set(e, null), r = r.getElementsByTagName(e), c = 0; c < r.length; c++) {
      var f = r[c];
      if (!(f[He] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = f.getAttribute(n) || "";
        b = e + b;
        var j = s.get(b);
        j ? j.push(f) : s.set(b, [f]);
      }
    }
    return s;
  }
  function Mv(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function xE(e, n, r) {
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
  function _v(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function SE(e, n, r, s) {
    if (r.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var c = Oi(s.href), f = n.querySelector(
          $s(c)
        );
        if (f) {
          n = f._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = f, mt(f);
          return;
        }
        f = n.ownerDocument || n, s = Tv(s), (c = Fn.get(c)) && Vd(s, c), f = f.createElement("link"), mt(f);
        var b = f;
        b._p = new Promise(function(j, L) {
          b.onload = j, b.onerror = L;
        }), rn(f, "link", s), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = zo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Hd = 0;
  function wE(e, n) {
    return e.stylesheets && e.count === 0 && ko(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var s = setTimeout(function() {
        if (e.stylesheets && ko(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Hd === 0 && (Hd = 62500 * nE());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ko(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Hd ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(s), clearTimeout(c);
      };
    } : null;
  }
  function zo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ko(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Oo = null;
  function ko(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Oo = /* @__PURE__ */ new Map(), n.forEach(EE, e), Oo = null, zo.call(e));
  }
  function EE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Oo.get(e);
      if (r) var s = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), Oo.set(e, r);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < c.length; f++) {
          var b = c[f];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (r.set(b.dataset.precedence, b), s = b);
        }
        s && r.set(null, s);
      }
      c = n.instance, b = c.getAttribute("data-precedence"), f = r.get(b) || s, f === s && r.set(null, c), r.set(b, c), this.count++, s = zo.bind(this), c.addEventListener("load", s), c.addEventListener("error", s), f ? f.parentNode.insertBefore(c, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), n.state.loading |= 4;
    }
  }
  var qs = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function jE(e, n, r, s, c, f, b, j, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = s, this.onUncaughtError = c, this.onCaughtError = f, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Av(e, n, r, s, c, f, b, j, L, G, ae, oe) {
    return e = new jE(
      e,
      n,
      r,
      b,
      L,
      G,
      ae,
      oe,
      j
    ), n = 1, f === !0 && (n |= 24), f = jn(3, null, null, n), e.current = f, f.stateNode = e, n = xu(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: s,
      isDehydrated: r,
      cache: n
    }, ju(f), e;
  }
  function Dv(e) {
    return e ? (e = fi, e) : fi;
  }
  function zv(e, n, r, s, c, f) {
    c = Dv(c), s.context === null ? s.context = c : s.pendingContext = c, s = Ka(n), s.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (s.callback = f), r = Qa(e, s, n), r !== null && (bn(r, e, n), xs(r, e, n));
  }
  function Ov(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function qd(e, n) {
    Ov(e, n), (e = e.alternate) && Ov(e, n);
  }
  function kv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = _r(e, 67108864);
      n !== null && bn(n, e, 67108864), qd(e, 67108864);
    }
  }
  function Lv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Mn();
      n = $(n);
      var r = _r(e, n);
      r !== null && bn(r, e, n), qd(e, n);
    }
  }
  var Lo = !0;
  function NE(e, n, r, s) {
    var c = O.T;
    O.T = null;
    var f = C.p;
    try {
      C.p = 2, Id(e, n, r, s);
    } finally {
      C.p = f, O.T = c;
    }
  }
  function TE(e, n, r, s) {
    var c = O.T;
    O.T = null;
    var f = C.p;
    try {
      C.p = 8, Id(e, n, r, s);
    } finally {
      C.p = f, O.T = c;
    }
  }
  function Id(e, n, r, s) {
    if (Lo) {
      var c = Fd(s);
      if (c === null)
        Md(
          e,
          n,
          s,
          Uo,
          r
        ), Bv(e, s);
      else if (RE(
        c,
        e,
        n,
        r,
        s
      ))
        s.stopPropagation();
      else if (Bv(e, s), n & 4 && -1 < CE.indexOf(e)) {
        for (; c !== null; ) {
          var f = St(c);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var b = hn(f.pendingLanes);
                  if (b !== 0) {
                    var j = f;
                    for (j.pendingLanes |= 2, j.entangledLanes |= 2; b; ) {
                      var L = 1 << 31 - Yt(b);
                      j.entanglements[1] |= L, b &= ~L;
                    }
                    ha(f), (tt & 6) === 0 && (bo = qt() + 500, Ls(0));
                  }
                }
                break;
              case 31:
              case 13:
                j = _r(f, 2), j !== null && bn(j, f, 2), So(), qd(f, 2);
            }
          if (f = Fd(s), f === null && Md(
            e,
            n,
            s,
            Uo,
            r
          ), f === c) break;
          c = f;
        }
        c !== null && s.stopPropagation();
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
  var Uo = null;
  function Yd(e) {
    if (Uo = null, e = st(e), e !== null) {
      var n = u(e);
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
    return Uo = e, null;
  }
  function Uv(e) {
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
        switch (ye()) {
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
  var Gd = !1, lr = null, or = null, cr = null, Is = /* @__PURE__ */ new Map(), Fs = /* @__PURE__ */ new Map(), ur = [], CE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Bv(e, n) {
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
  function Ys(e, n, r, s, c, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: s,
      nativeEvent: f,
      targetContainers: [c]
    }, n !== null && (n = St(n), n !== null && kv(n)), e) : (e.eventSystemFlags |= s, n = e.targetContainers, c !== null && n.indexOf(c) === -1 && n.push(c), e);
  }
  function RE(e, n, r, s, c) {
    switch (n) {
      case "focusin":
        return lr = Ys(
          lr,
          e,
          n,
          r,
          s,
          c
        ), !0;
      case "dragenter":
        return or = Ys(
          or,
          e,
          n,
          r,
          s,
          c
        ), !0;
      case "mouseover":
        return cr = Ys(
          cr,
          e,
          n,
          r,
          s,
          c
        ), !0;
      case "pointerover":
        var f = c.pointerId;
        return Is.set(
          f,
          Ys(
            Is.get(f) || null,
            e,
            n,
            r,
            s,
            c
          )
        ), !0;
      case "gotpointercapture":
        return f = c.pointerId, Fs.set(
          f,
          Ys(
            Fs.get(f) || null,
            e,
            n,
            r,
            s,
            c
          )
        ), !0;
    }
    return !1;
  }
  function Vv(e) {
    var n = st(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = h(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Lv(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Lv(r);
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
      var r = Fd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var s = new r.constructor(
          r.type,
          r
        );
        Yc = s, r.target.dispatchEvent(s), Yc = null;
      } else
        return n = St(r), n !== null && kv(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function $v(e, n, r) {
    Bo(e) && r.delete(n);
  }
  function ME() {
    Gd = !1, lr !== null && Bo(lr) && (lr = null), or !== null && Bo(or) && (or = null), cr !== null && Bo(cr) && (cr = null), Is.forEach($v), Fs.forEach($v);
  }
  function Vo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Gd || (Gd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      ME
    )));
  }
  var $o = null;
  function Hv(e) {
    $o !== e && ($o = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        $o === e && ($o = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], s = e[n + 1], c = e[n + 2];
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
              data: c,
              method: r.method,
              action: s
            },
            s,
            c
          ));
        }
      }
    ));
  }
  function Li(e) {
    function n(L) {
      return Vo(L, e);
    }
    lr !== null && Vo(lr, e), or !== null && Vo(or, e), cr !== null && Vo(cr, e), Is.forEach(n), Fs.forEach(n);
    for (var r = 0; r < ur.length; r++) {
      var s = ur[r];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      Vv(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (s = 0; s < r.length; s += 3) {
        var c = r[s], f = r[s + 1], b = c[ge] || null;
        if (typeof f == "function")
          b || Hv(r);
        else if (b) {
          var j = null;
          if (f && f.hasAttribute("formAction")) {
            if (c = f, b = f[ge] || null)
              j = b.formAction;
            else if (Yd(c) !== null) continue;
          } else j = b.action;
          typeof j == "function" ? r[s + 1] = j : (r.splice(s, 3), s -= 3), Hv(r);
        }
      }
  }
  function qv() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(b) {
            return c = b;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      c !== null && (c(), c = null), s || setTimeout(r, 20);
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
      var s = !1, c = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        s = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), c !== null && (c(), c = null);
      };
    }
  }
  function Xd(e) {
    this._internalRoot = e;
  }
  Ho.prototype.render = Xd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var r = n.current, s = Mn();
    zv(r, s, e, n, null, null);
  }, Ho.prototype.unmount = Xd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      zv(e.current, 2, null, e, null, null), So(), n[Ee] = null;
    }
  };
  function Ho(e) {
    this._internalRoot = e;
  }
  Ho.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ue();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < ur.length && n !== 0 && n < ur[r].priority; r++) ;
      ur.splice(r, 0, e), r === 0 && Vv(e);
    }
  };
  var Iv = a.version;
  if (Iv !== "19.2.5")
    throw Error(
      l(
        527,
        Iv,
        "19.2.5"
      )
    );
  C.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = p(n), e = e !== null ? x(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var _E = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qo.isDisabled && qo.supportsFiber)
      try {
        Zn = qo.inject(
          _E
        ), Wt = qo;
      } catch {
      }
  }
  return Xs.createRoot = function(e, n) {
    if (!o(e)) throw Error(l(299));
    var r = !1, s = "", c = Qp, f = Zp, b = Jp;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError)), n = Av(
      e,
      1,
      !1,
      null,
      null,
      r,
      s,
      null,
      c,
      f,
      b,
      qv
    ), e[Ee] = n.current, Rd(e), new Xd(n);
  }, Xs.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(l(299));
    var s = !1, c = "", f = Qp, b = Zp, j = Jp, L = null;
    return r != null && (r.unstable_strictMode === !0 && (s = !0), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (b = r.onCaughtError), r.onRecoverableError !== void 0 && (j = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Av(
      e,
      1,
      !0,
      n,
      r ?? null,
      s,
      c,
      L,
      f,
      b,
      j,
      qv
    ), n.context = Dv(null), r = n.current, s = Mn(), s = $(s), c = Ka(s), c.callback = null, Qa(r, c, s), r = s, n.current.lanes = r, it(n, r), ha(n), e[Ee] = n.current, Rd(e), new Ho(n);
  }, Xs.version = "19.2.5", Xs;
}
var Wv;
function HE() {
  if (Wv) return Qd.exports;
  Wv = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Qd.exports = $E(), Qd.exports;
}
var qE = HE();
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
var Pb = (t) => {
  throw TypeError(t);
}, IE = (t, a, i) => a.has(t) || Pb("Cannot " + i), ef = (t, a, i) => (IE(t, a, "read from private field"), i ? i.call(t) : a.get(t)), FE = (t, a, i) => a.has(t) ? Pb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i);
function ey(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function YE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: l = !1 } = t, o;
  o = a.map(
    (E, w) => x(
      E,
      typeof E == "string" ? null : E.state,
      w === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let u = v(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function v(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function p() {
    return o[u];
  }
  function x(E, w = null, N, R) {
    let T = If(
      o ? p().pathname : "/",
      E,
      w,
      N,
      R
    );
    return _t(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        E
      )}`
    ), T;
  }
  function g(E) {
    return typeof E == "string" ? E : pa(E);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return h;
    },
    get location() {
      return p();
    },
    createHref: g,
    createURL(E) {
      return new URL(g(E), "http://localhost");
    },
    encodeLocation(E) {
      let w = typeof E == "string" ? ia(E) : E;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(E, w) {
      h = "PUSH";
      let N = ey(E) ? E : x(E, w);
      u += 1, o.splice(u, o.length, N), l && m && m({ action: h, location: N, delta: 1 });
    },
    replace(E, w) {
      h = "REPLACE";
      let N = ey(E) ? E : x(E, w);
      o[u] = N, l && m && m({ action: h, location: N, delta: 0 });
    },
    go(E) {
      h = "POP";
      let w = v(u + E), N = o[w];
      u = w, m && m({ action: h, location: N, delta: E });
    },
    listen(E) {
      return m = E, () => {
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
function GE() {
  return Math.random().toString(36).substring(2, 10);
}
function If(t, a, i = null, l, o) {
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
    key: a && a.key || l || GE(),
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
function XE(t, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Ie(i, "No window.location.(origin|href) available to create URL");
  let l = typeof t == "string" ? t : pa(t);
  return l = l.replace(/ $/, "%20"), !a && l.startsWith("//") && (l = i + l), new URL(l, i);
}
var il, ty = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (FE(this, il, /* @__PURE__ */ new Map()), t)
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
    if (ef(this, il).has(t))
      return ef(this, il).get(t);
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
    ef(this, il).set(t, a);
  }
};
il = /* @__PURE__ */ new WeakMap();
var PE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function KE(t) {
  return PE.has(
    t
  );
}
var QE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function ZE(t) {
  return QE.has(
    t
  );
}
function JE(t) {
  return t.index === !0;
}
function fl(t, a, i = [], l = {}, o = !1) {
  return t.map((u, h) => {
    let m = [...i, String(h)], v = typeof u.id == "string" ? u.id : m.join("-");
    if (Ie(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ie(
      o || !l[v],
      `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
    ), JE(u)) {
      let p = {
        ...u,
        id: v
      };
      return l[v] = ny(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: v,
        children: void 0
      };
      return l[v] = ny(
        p,
        a(p)
      ), u.children && (p.children = fl(
        u.children,
        a,
        m,
        l,
        o
      )), p;
    }
  });
}
function ny(t, a) {
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
function gr(t, a, i = "/") {
  return sl(t, a, i, !1);
}
function sl(t, a, i, l) {
  let o = typeof a == "string" ? ia(a) : a, u = Kn(o.pathname || "/", i);
  if (u == null)
    return null;
  let h = Kb(t);
  ej(h);
  let m = null;
  for (let v = 0; m == null && v < h.length; ++v) {
    let p = dj(u);
    m = cj(
      h[v],
      p,
      l
    );
  }
  return m;
}
function WE(t, a) {
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
function Kb(t, a = [], i = [], l = "", o = !1) {
  let u = (h, m, v = o, p) => {
    let x = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (x.relativePath.startsWith("/")) {
      if (!x.relativePath.startsWith(l) && v)
        return;
      Ie(
        x.relativePath.startsWith(l),
        `Absolute route path "${x.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), x.relativePath = x.relativePath.slice(l.length);
    }
    let g = Gn([l, x.relativePath]), S = i.concat(x);
    h.children && h.children.length > 0 && (Ie(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Kb(
      h.children,
      a,
      S,
      g,
      v
    )), !(h.path == null && !h.index) && a.push({
      path: g,
      score: lj(g, h.index),
      routesMeta: S
    });
  };
  return t.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      u(h, m);
    else
      for (let v of Qb(h.path))
        u(h, m, !0, v);
  }), a;
}
function Qb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...l] = a, o = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (l.length === 0)
    return o ? [u, ""] : [u];
  let h = Qb(l.join("/")), m = [];
  return m.push(
    ...h.map(
      (v) => v === "" ? u : [u, v].join("/")
    )
  ), o && m.push(...h), m.map(
    (v) => t.startsWith("/") && v === "" ? "/" : v
  );
}
function ej(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : oj(
      a.routesMeta.map((l) => l.childrenIndex),
      i.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var tj = /^:[\w-]+$/, nj = 3, aj = 2, rj = 1, ij = 10, sj = -2, ay = (t) => t === "*";
function lj(t, a) {
  let i = t.split("/"), l = i.length;
  return i.some(ay) && (l += sj), a && (l += aj), i.filter((o) => !ay(o)).reduce(
    (o, u) => o + (tj.test(u) ? nj : u === "" ? rj : ij),
    l
  );
}
function oj(t, a) {
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
function cj(t, a, i = !1) {
  let { routesMeta: l } = t, o = {}, u = "/", h = [];
  for (let m = 0; m < l.length; ++m) {
    let v = l[m], p = m === l.length - 1, x = u === "/" ? a : a.slice(u.length) || "/", g = pc(
      { path: v.relativePath, caseSensitive: v.caseSensitive, end: p },
      x
    ), S = v.route;
    if (!g && p && i && !l[l.length - 1].route.index && (g = pc(
      {
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: !1
      },
      x
    )), !g)
      return null;
    Object.assign(o, g.params), h.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Gn([u, g.pathname]),
      pathnameBase: mj(
        Gn([u, g.pathnameBase])
      ),
      route: S
    }), g.pathnameBase !== "/" && (u = Gn([u, g.pathnameBase]));
  }
  return h;
}
function pc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, l] = uj(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(i);
  if (!o) return null;
  let u = o[0], h = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: l.reduce(
      (p, { paramName: x, isOptional: g }, S) => {
        if (x === "*") {
          let w = m[S] || "";
          h = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const E = m[S];
        return g && !E ? p[x] = void 0 : p[x] = (E || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: h,
    pattern: t
  };
}
function uj(t, a = !1, i = !0) {
  _t(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let l = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, v, p, x) => {
      if (l.push({ paramName: m, isOptional: v != null }), v) {
        let g = x.charAt(p + h.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (l.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), l];
}
function dj(t) {
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
function fj({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Gn([t, a]);
}
var Zb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Sh = (t) => Zb.test(t);
function hj(t, a = "/") {
  let {
    pathname: i,
    search: l = "",
    hash: o = ""
  } = typeof t == "string" ? ia(t) : t, u;
  return i ? (i = Eh(i), i.startsWith("/") ? u = ry(i.substring(1), "/") : u = ry(i, a)) : u = a, {
    pathname: u,
    search: pj(l),
    hash: gj(o)
  };
}
function ry(t, a) {
  let i = gc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function tf(t, a, i, l) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Jb(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function wh(t) {
  let a = Jb(t);
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
  let u = t === "" || o.pathname === "", h = u ? "/" : o.pathname, m;
  if (h == null)
    m = i;
  else {
    let g = a.length - 1;
    if (!l && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), g -= 1;
      o.pathname = S.join("/");
    }
    m = g >= 0 ? a[g] : "/";
  }
  let v = hj(o, m), p = h && h !== "/" && h.endsWith("/"), x = (u || h === ".") && i.endsWith("/");
  return !v.pathname.endsWith("/") && (p || x) && (v.pathname += "/"), v;
}
var Eh = (t) => t.replace(/\/\/+/g, "/"), Gn = (t) => Eh(t.join("/")), gc = (t) => t.replace(/\/+$/, ""), mj = (t) => gc(t).replace(/^\/*/, "/"), pj = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, gj = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, vj = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let l = new Headers(i.headers);
  return l.set("Location", t), new Response(null, { ...i, headers: l });
}, Mc = class {
  constructor(t, a, i, l = !1) {
    this.status = t, this.statusText = a || "", this.internal = l, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function hl(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function xl(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Gn(a) || "/";
}
var Wb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function ex(t, a) {
  let i = t;
  if (typeof i != "string" || !Zb.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let l = i, o = !1;
  if (Wb)
    try {
      let u = new URL(window.location.href), h = i.startsWith("//") ? new URL(u.protocol + i) : new URL(i), m = Kn(h.pathname, a);
      h.origin === u.origin && m != null ? i = m + h.search + h.hash : o = !0;
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
function yj(t, a) {
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
      instrument(u) {
        let h = Object.keys(i);
        for (let m of h)
          u[m] && i[m].push(u[m]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let o = Ii(i.lazy, a.lazy, () => {
    });
    o && (l.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let h = o[u], m = i[`lazy.${u}`];
      if (typeof h == "function" && m.length > 0) {
        let v = Ii(m, h, () => {
        });
        v && (l.lazy = Object.assign(l.lazy || {}, {
          [u]: v
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let u = a[o];
    if (typeof u == "function" && i[o].length > 0) {
      let h = u[yr] ?? u, m = Ii(
        i[o],
        h,
        (...v) => iy(v[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yr] = h, l[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (l.middleware = a.middleware.map((o) => {
    let u = o[yr] ?? o, h = Ii(
      i.middleware,
      u,
      (...m) => iy(m[0])
    );
    return h ? (h[yr] = u, h) : o;
  })), l;
}
function bj(t, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (l) => l({
      instrument(o) {
        let u = Object.keys(o);
        for (let h of u)
          o[h] && i[h].push(o[h]);
      }
    })
  ), i.navigate.length > 0) {
    let l = t.navigate[yr] ?? t.navigate, o = Ii(
      i.navigate,
      l,
      (...u) => {
        let [h, m] = u;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? pa(h) : ".",
          ...sy(t, m ?? {})
        };
      }
    );
    o && (o[yr] = l, t.navigate = o);
  }
  if (i.fetch.length > 0) {
    let l = t.fetch[yr] ?? t.fetch, o = Ii(i.fetch, l, (...u) => {
      let [h, , m, v] = u;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...sy(t, v ?? {})
      };
    });
    o && (o[yr] = l, t.fetch = o);
  }
  return t;
}
function Ii(t, a, i) {
  return t.length === 0 ? null : async (...l) => {
    let o = await tx(
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
async function tx(t, a, i, l) {
  let o = t[l], u;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = tx(t, a, i, l - 1), u = await h, Ie(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (v) {
      console.error("An instrumentation function threw an error:", v);
    }
    h || await m(), await h;
  } else
    try {
      u = { type: "success", value: await i() };
    } catch (h) {
      u = { type: "error", value: h };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function iy(t) {
  let { request: a, context: i, params: l, unstable_pattern: o } = t;
  return {
    request: xj(a),
    params: { ...l },
    unstable_pattern: o,
    context: Sj(i)
  };
}
function sy(t, a) {
  return {
    currentUrl: pa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function xj(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function Sj(t) {
  if (Ej(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var wj = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ej(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === wj;
}
var nx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], jj = new Set(
  nx
), Nj = [
  "GET",
  ...nx
], Tj = new Set(Nj), ax = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Cj = /* @__PURE__ */ new Set([307, 308]), nf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Rj = {
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
}, Mj = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), rx = "remix-router-transitions", ix = Symbol("ResetLoaderData");
function _j(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ie(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = t.hydrationRouteProperties || [], o = t.mapRouteProperties || Mj, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = ($) => ({
      ...o($),
      ...yj(
        z.map((F) => F.route).filter(Boolean),
        $
      )
    });
  }
  let h = {}, m = fl(
    t.routes,
    u,
    void 0,
    h
  ), v, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let x = t.dataStrategy || kj, g = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, S = null, E = /* @__PURE__ */ new Set(), w = null, N = null, R = null, T = t.hydrationData != null, k = gr(m, t.history.location, p), _ = !1, A = null, Z, W;
  if (k == null && !t.patchRoutesOnNavigation) {
    let z = Yn(404, {
      pathname: t.history.location.pathname
    }), { matches: $, route: F } = Io(m);
    Z = !0, W = !Z, k = $, A = { [F.id]: z };
  } else if (k && !t.hydrationData && wn(
    k,
    m,
    t.history.location.pathname
  ).active && (k = null), k)
    if (k.some((z) => z.route.lazy))
      Z = !1, W = !Z;
    else if (!k.some((z) => jh(z.route)))
      Z = !0, W = !Z;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, $ = t.hydrationData ? t.hydrationData.errors : null, F = k;
      if ($) {
        let ue = k.findIndex(
          (de) => $[de.route.id] !== void 0
        );
        F = F.slice(0, ue + 1);
      }
      W = !1, Z = !0, F.forEach((ue) => {
        let de = sx(ue.route, z, $);
        W = W || de.renderFallback, Z = Z && !de.shouldLoad;
      });
    }
  else {
    Z = !1, W = !Z, k = [];
    let z = wn(
      null,
      m,
      t.history.location.pathname
    );
    z.active && z.matches && (_ = !0, k = z.matches);
  }
  let ne, D = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: k,
    initialized: Z,
    renderFallback: W,
    navigation: nf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || A,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, q = "POP", I = null, ie = !1, re, te = !1, ce = /* @__PURE__ */ new Map(), J = null, O = !1, C = !1, U = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Map(), K = 0, M = -1, Q = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set(), Ae = /* @__PURE__ */ new Map(), Me, $e = null;
  function Jt() {
    if (S = t.history.listen(
      ({ action: z, location: $, delta: F }) => {
        if (Me) {
          Me(), Me = void 0;
          return;
        }
        _t(
          Ae.size === 0 || F != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ue = la({
          currentLocation: D.location,
          nextLocation: $,
          historyAction: z
        });
        if (ue && F != null) {
          let de = new Promise((Se) => {
            Me = Se;
          });
          t.history.go(F * -1), Jn(ue, {
            state: "blocked",
            location: $,
            proceed() {
              Jn(ue, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: $
              }), de.then(() => t.history.go(F));
            },
            reset() {
              let Se = new Map(D.blockers);
              Se.set(ue, Ps), et({ blockers: Se });
            }
          }), I?.resolve(), I = null;
          return;
        }
        return De(z, $);
      }
    ), i) {
      Wj(a, ce);
      let z = () => eN(a, ce);
      a.addEventListener("pagehide", z), J = () => a.removeEventListener("pagehide", z);
    }
    return D.initialized || De("POP", D.location, {
      initialHydration: !0
    }), ne;
  }
  function Pt() {
    S && S(), J && J(), E.clear(), re && re.abort(), D.fetchers.forEach((z, $) => Zn($)), D.blockers.forEach((z, $) => ga($));
  }
  function At(z) {
    return E.add(z), () => E.delete(z);
  }
  function et(z, $ = {}) {
    z.matches && (z.matches = z.matches.map((de) => {
      let Se = h[de.route.id], pe = de.route;
      return pe.element !== Se.element || pe.errorElement !== Se.errorElement || pe.hydrateFallbackElement !== Se.hydrateFallbackElement ? {
        ...de,
        route: Se
      } : de;
    })), D = {
      ...D,
      ...z
    };
    let F = [], ue = [];
    D.fetchers.forEach((de, Se) => {
      de.state === "idle" && (ve.has(Se) ? F.push(Se) : ue.push(Se));
    }), ve.forEach((de) => {
      !D.fetchers.has(de) && !B.has(de) && F.push(de);
    }), [...E].forEach(
      (de) => de(D, {
        deletedFetchers: F,
        newErrors: z.errors ?? null,
        viewTransitionOpts: $.viewTransitionOpts,
        flushSync: $.flushSync === !0
      })
    ), F.forEach((de) => Zn(de)), ue.forEach((de) => D.fetchers.delete(de));
  }
  function pt(z, $, { flushSync: F } = {}) {
    let ue = D.actionData != null && D.navigation.formMethod != null && cn(D.navigation.formMethod) && D.navigation.state === "loading" && z.state?._isRedirect !== !0, de;
    $.actionData ? Object.keys($.actionData).length > 0 ? de = $.actionData : de = null : ue ? de = D.actionData : de = null;
    let Se = $.loaderData ? vy(
      D.loaderData,
      $.loaderData,
      $.matches || [],
      $.errors
    ) : D.loaderData, pe = D.blockers;
    pe.size > 0 && (pe = new Map(pe), pe.forEach((Re, Ne) => pe.set(Ne, Ps)));
    let ge = O ? !1 : Gt(z, $.matches || D.matches), Ee = ie === !0 || D.navigation.formMethod != null && cn(D.navigation.formMethod) && z.state?._isRedirect !== !0;
    v && (m = v, v = void 0), O || q === "POP" || (q === "PUSH" ? t.history.push(z, z.state) : q === "REPLACE" && t.history.replace(z, z.state));
    let be;
    if (q === "POP") {
      let Re = ce.get(D.location.pathname);
      Re && Re.has(z.pathname) ? be = {
        currentLocation: D.location,
        nextLocation: z
      } : ce.has(z.pathname) && (be = {
        currentLocation: z,
        nextLocation: D.location
      });
    } else if (te) {
      let Re = ce.get(D.location.pathname);
      Re ? Re.add(z.pathname) : (Re = /* @__PURE__ */ new Set([z.pathname]), ce.set(D.location.pathname, Re)), be = {
        currentLocation: D.location,
        nextLocation: z
      };
    }
    et(
      {
        ...$,
        // matches, errors, fetchers go through as-is
        actionData: de,
        loaderData: Se,
        historyAction: q,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: nf,
        revalidation: "idle",
        restoreScrollPosition: ge,
        preventScrollReset: Ee,
        blockers: pe
      },
      {
        viewTransitionOpts: be,
        flushSync: F === !0
      }
    ), q = "POP", ie = !1, te = !1, O = !1, C = !1, I?.resolve(), I = null, $e?.resolve(), $e = null;
  }
  async function he(z, $) {
    if (I?.resolve(), I = null, typeof z == "number") {
      I || (I = Sy());
      let dt = I.promise;
      return t.history.go(z), dt;
    }
    let F = Ff(
      D.location,
      D.matches,
      p,
      z,
      $?.fromRouteId,
      $?.relative
    ), { path: ue, submission: de, error: Se } = ly(
      !1,
      F,
      $
    ), pe;
    $?.unstable_mask && (pe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof $.unstable_mask == "string" ? ia($.unstable_mask) : {
        ...D.location.unstable_mask,
        ...$.unstable_mask
      }
    });
    let ge = D.location, Ee = If(
      ge,
      ue,
      $ && $.state,
      void 0,
      pe
    );
    Ee = {
      ...Ee,
      ...t.history.encodeLocation(Ee)
    };
    let be = $ && $.replace != null ? $.replace : void 0, Re = "PUSH";
    be === !0 ? Re = "REPLACE" : be === !1 || de != null && cn(de.formMethod) && de.formAction === D.location.pathname + D.location.search && (Re = "REPLACE");
    let Ne = $ && "preventScrollReset" in $ ? $.preventScrollReset === !0 : void 0, Ze = ($ && $.flushSync) === !0, He = la({
      currentLocation: ge,
      nextLocation: Ee,
      historyAction: Re
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
          }), he(z, $);
        },
        reset() {
          let dt = new Map(D.blockers);
          dt.set(He, Ps), et({ blockers: dt });
        }
      });
      return;
    }
    await De(Re, Ee, {
      submission: de,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Se,
      preventScrollReset: Ne,
      replace: $ && $.replace,
      enableViewTransition: $ && $.viewTransition,
      flushSync: Ze,
      callSiteDefaultShouldRevalidate: $ && $.unstable_defaultShouldRevalidate
    });
  }
  function ke() {
    $e || ($e = Sy()), nt(), et({ revalidation: "loading" });
    let z = $e.promise;
    return D.navigation.state === "submitting" ? z : D.navigation.state === "idle" ? (De(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), z) : (De(
      q || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: te === !0
      }
    ), z);
  }
  async function De(z, $, F) {
    re && re.abort(), re = null, q = z, O = (F && F.startUninterruptedRevalidation) === !0, Dt(D.location, D.matches), ie = (F && F.preventScrollReset) === !0, te = (F && F.enableViewTransition) === !0;
    let ue = v || m, de = F && F.overrideNavigation, Se = F?.initialHydration && D.matches && D.matches.length > 0 && !_ ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : gr(ue, $, p), pe = (F && F.flushSync) === !0;
    if (Se && D.initialized && !C && Ij(D.location, $) && !(F && F.submission && cn(F.submission.formMethod))) {
      pt($, { matches: Se }, { flushSync: pe });
      return;
    }
    let ge = wn(Se, ue, $.pathname);
    if (ge.active && ge.matches && (Se = ge.matches), !Se) {
      let { error: st, notFoundMatches: St, route: Fe } = hn(
        $.pathname
      );
      pt(
        $,
        {
          matches: St,
          loaderData: {},
          errors: {
            [Fe.id]: st
          }
        },
        { flushSync: pe }
      );
      return;
    }
    re = new AbortController();
    let Ee = Hi(
      t.history,
      $,
      re.signal,
      F && F.submission
    ), be = t.getContext ? await t.getContext() : new ty(), Re;
    if (F && F.pendingError)
      Re = [
        vr(Se).route.id,
        { type: "error", error: F.pendingError }
      ];
    else if (F && F.submission && cn(F.submission.formMethod)) {
      let st = await Te(
        Ee,
        $,
        F.submission,
        Se,
        be,
        ge.active,
        F && F.initialHydration === !0,
        { replace: F.replace, flushSync: pe }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [St, Fe] = st.pendingActionResult;
        if (An(Fe) && hl(Fe.error) && Fe.error.status === 404) {
          re = null, pt($, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [St]: Fe.error
            }
          });
          return;
        }
      }
      Se = st.matches || Se, Re = st.pendingActionResult, de = af($, F.submission), pe = !1, ge.active = !1, Ee = Hi(
        t.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Ne,
      matches: Ze,
      loaderData: He,
      errors: dt
    } = await bt(
      Ee,
      $,
      Se,
      be,
      ge.active,
      de,
      F && F.submission,
      F && F.fetcherSubmission,
      F && F.replace,
      F && F.initialHydration === !0,
      pe,
      Re,
      F && F.callSiteDefaultShouldRevalidate
    );
    Ne || (re = null, pt($, {
      matches: Ze || Se,
      ...yy(Re),
      loaderData: He,
      errors: dt
    }));
  }
  async function Te(z, $, F, ue, de, Se, pe, ge = {}) {
    nt();
    let Ee = Zj($, F);
    if (et({ navigation: Ee }, { flushSync: ge.flushSync === !0 }), Se) {
      let Ne = await it(
        ue,
        $.pathname,
        z.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: He, route: dt } = Io(m);
          return {
            matches: He,
            pendingActionResult: [
              dt.id,
              {
                type: "error",
                error: Ne.error
              }
            ]
          };
        }
        let Ze = vr(Ne.partialMatches).route.id;
        return {
          matches: Ne.partialMatches,
          pendingActionResult: [
            Ze,
            {
              type: "error",
              error: Ne.error
            }
          ]
        };
      } else if (Ne.matches)
        ue = Ne.matches;
      else {
        let { notFoundMatches: Ze, error: He, route: dt } = hn(
          $.pathname
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
    let be, Re = lc(ue, $);
    if (!Re.route.action && !Re.route.lazy)
      be = {
        type: "error",
        error: Yn(405, {
          method: z.method,
          pathname: $.pathname,
          routeId: Re.route.id
        })
      };
    else {
      let Ne = Xi(
        u,
        h,
        z,
        $,
        ue,
        Re,
        pe ? [] : l,
        de
      ), Ze = await ze(
        z,
        $,
        Ne,
        de,
        null
      );
      if (be = Ze[Re.route.id], !be) {
        for (let He of ue)
          if (Ze[He.route.id]) {
            be = Ze[He.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Yr(be)) {
      let Ne;
      return ge && ge.replace != null ? Ne = ge.replace : Ne = my(
        be.response.headers.get("Location"),
        new URL(z.url),
        p,
        t.history
      ) === D.location.pathname + D.location.search, await ye(z, be, !0, {
        submission: F,
        replace: Ne
      }), { shortCircuited: !0 };
    }
    if (An(be)) {
      let Ne = vr(ue, Re.route.id);
      return (ge && ge.replace) !== !0 && (q = "PUSH"), {
        matches: ue,
        pendingActionResult: [
          Ne.route.id,
          be,
          Re.route.id
        ]
      };
    }
    return {
      matches: ue,
      pendingActionResult: [Re.route.id, be]
    };
  }
  async function bt(z, $, F, ue, de, Se, pe, ge, Ee, be, Re, Ne, Ze) {
    let He = Se || af($, pe), dt = pe || ge || xy(He), st = !O && !be;
    if (de) {
      if (st) {
        let Ct = xt(Ne);
        et(
          {
            navigation: He,
            ...Ct !== void 0 ? { actionData: Ct } : {}
          },
          {
            flushSync: Re
          }
        );
      }
      let qe = await it(
        F,
        $.pathname,
        z.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: ln, route: Ot } = Io(m);
          return {
            matches: ln,
            loaderData: {},
            errors: {
              [Ot.id]: qe.error
            }
          };
        }
        let Ct = vr(qe.partialMatches).route.id;
        return {
          matches: qe.partialMatches,
          loaderData: {},
          errors: {
            [Ct]: qe.error
          }
        };
      } else if (qe.matches)
        F = qe.matches;
      else {
        let { error: Ct, notFoundMatches: ln, route: Ot } = hn(
          $.pathname
        );
        return {
          matches: ln,
          loaderData: {},
          errors: {
            [Ot.id]: Ct
          }
        };
      }
    }
    let St = v || m, { dsMatches: Fe, revalidatingFetchers: zt } = oy(
      z,
      ue,
      u,
      h,
      t.history,
      D,
      F,
      dt,
      $,
      be ? [] : l,
      be === !0,
      C,
      U,
      ve,
      le,
      X,
      St,
      p,
      t.patchRoutesOnNavigation != null,
      Ne,
      Ze
    );
    if (M = ++K, !t.dataStrategy && !Fe.some((qe) => qe.shouldLoad) && !Fe.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && zt.length === 0) {
      let qe = ei();
      return pt(
        $,
        {
          matches: F,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ne && An(Ne[1]) ? { [Ne[0]]: Ne[1].error } : null,
          ...yy(Ne),
          ...qe ? { fetchers: new Map(D.fetchers) } : {}
        },
        { flushSync: Re }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let qe = {};
      if (!de) {
        qe.navigation = He;
        let Ct = xt(Ne);
        Ct !== void 0 && (qe.actionData = Ct);
      }
      zt.length > 0 && (qe.fetchers = dn(zt)), et(qe, { flushSync: Re });
    }
    zt.forEach((qe) => {
      Tt(qe.key), qe.controller && B.set(qe.key, qe.controller);
    });
    let mt = () => zt.forEach((qe) => Tt(qe.key));
    re && re.signal.addEventListener(
      "abort",
      mt
    );
    let { loaderResults: qa, fetcherResults: Wn } = await Qe(
      Fe,
      zt,
      z,
      $,
      ue
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    re && re.signal.removeEventListener(
      "abort",
      mt
    ), zt.forEach((qe) => B.delete(qe.key));
    let Kt = Fo(qa);
    if (Kt)
      return await ye(z, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Kt = Fo(Wn), Kt)
      return X.add(Kt.key), await ye(z, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: oa, errors: Nr } = gy(
      D,
      F,
      qa,
      Ne,
      zt,
      Wn
    );
    be && D.errors && (Nr = { ...D.errors, ...Nr });
    let ca = ei(), Tr = Ha(M), ti = ca || Tr || zt.length > 0;
    return {
      matches: F,
      loaderData: oa,
      errors: Nr,
      ...ti ? { fetchers: new Map(D.fetchers) } : {}
    };
  }
  function xt(z) {
    if (z && !An(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function dn(z) {
    return z.forEach(($) => {
      let F = D.fetchers.get($.key), ue = Ks(
        void 0,
        F ? F.data : void 0
      );
      D.fetchers.set($.key, ue);
    }), new Map(D.fetchers);
  }
  async function Ht(z, $, F, ue) {
    Tt(z);
    let de = (ue && ue.flushSync) === !0, Se = v || m, pe = Ff(
      D.location,
      D.matches,
      p,
      F,
      $,
      ue?.relative
    ), ge = gr(Se, pe, p), Ee = wn(ge, Se, pe);
    if (Ee.active && Ee.matches && (ge = Ee.matches), !ge) {
      Ft(
        z,
        $,
        Yn(404, { pathname: pe }),
        { flushSync: de }
      );
      return;
    }
    let { path: be, submission: Re, error: Ne } = ly(
      !0,
      pe,
      ue
    );
    if (Ne) {
      Ft(z, $, Ne, { flushSync: de });
      return;
    }
    let Ze = t.getContext ? await t.getContext() : new ty(), He = (ue && ue.preventScrollReset) === !0;
    if (Re && cn(Re.formMethod)) {
      await On(
        z,
        $,
        be,
        ge,
        Ze,
        Ee.active,
        de,
        He,
        Re,
        ue && ue.unstable_defaultShouldRevalidate
      );
      return;
    }
    le.set(z, { routeId: $, path: be }), await qt(
      z,
      $,
      be,
      ge,
      Ze,
      Ee.active,
      de,
      He,
      Re
    );
  }
  async function On(z, $, F, ue, de, Se, pe, ge, Ee, be) {
    nt(), le.delete(z);
    let Re = D.fetchers.get(z);
    It(z, Jj(Ee, Re), {
      flushSync: pe
    });
    let Ne = new AbortController(), Ze = Hi(
      t.history,
      F,
      Ne.signal,
      Ee
    );
    if (Se) {
      let gt = await it(
        ue,
        new URL(Ze.url).pathname,
        Ze.signal,
        z
      );
      if (gt.type === "aborted")
        return;
      if (gt.type === "error") {
        Ft(z, $, gt.error, { flushSync: pe });
        return;
      } else if (gt.matches)
        ue = gt.matches;
      else {
        Ft(
          z,
          $,
          Yn(404, { pathname: F }),
          { flushSync: pe }
        );
        return;
      }
    }
    let He = lc(ue, F);
    if (!He.route.action && !He.route.lazy) {
      let gt = Yn(405, {
        method: Ee.formMethod,
        pathname: F,
        routeId: $
      });
      Ft(z, $, gt, { flushSync: pe });
      return;
    }
    B.set(z, Ne);
    let dt = K, st = Xi(
      u,
      h,
      Ze,
      F,
      ue,
      He,
      l,
      de
    ), St = await ze(
      Ze,
      F,
      st,
      de,
      z
    ), Fe = St[He.route.id];
    if (!Fe) {
      for (let gt of st)
        if (St[gt.route.id]) {
          Fe = St[gt.route.id];
          break;
        }
    }
    if (Ze.signal.aborted) {
      B.get(z) === Ne && B.delete(z);
      return;
    }
    if (ve.has(z)) {
      if (Yr(Fe) || An(Fe)) {
        It(z, ka(void 0));
        return;
      }
    } else {
      if (Yr(Fe))
        if (B.delete(z), M > dt) {
          It(z, ka(void 0));
          return;
        } else
          return X.add(z), It(z, Ks(Ee)), ye(Ze, Fe, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: ge
          });
      if (An(Fe)) {
        Ft(z, $, Fe.error);
        return;
      }
    }
    let zt = D.navigation.location || D.location, mt = Hi(
      t.history,
      zt,
      Ne.signal
    ), qa = v || m, Wn = D.navigation.state !== "idle" ? gr(qa, D.navigation.location, p) : D.matches;
    Ie(Wn, "Didn't find any matches after fetcher action");
    let Kt = ++K;
    Q.set(z, Kt);
    let oa = Ks(Ee, Fe.data);
    D.fetchers.set(z, oa);
    let { dsMatches: Nr, revalidatingFetchers: ca } = oy(
      mt,
      de,
      u,
      h,
      t.history,
      D,
      Wn,
      Ee,
      zt,
      l,
      !1,
      C,
      U,
      ve,
      le,
      X,
      qa,
      p,
      t.patchRoutesOnNavigation != null,
      [He.route.id, Fe],
      be
    );
    ca.filter((gt) => gt.key !== z).forEach((gt) => {
      let ni = gt.key, ai = D.fetchers.get(ni), Al = Ks(
        void 0,
        ai ? ai.data : void 0
      );
      D.fetchers.set(ni, Al), Tt(ni), gt.controller && B.set(ni, gt.controller);
    }), et({ fetchers: new Map(D.fetchers) });
    let Tr = () => ca.forEach((gt) => Tt(gt.key));
    Ne.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ti, fetcherResults: qe } = await Qe(
      Nr,
      ca,
      mt,
      zt,
      de
    );
    if (Ne.signal.aborted)
      return;
    if (Ne.signal.removeEventListener(
      "abort",
      Tr
    ), Q.delete(z), B.delete(z), ca.forEach((gt) => B.delete(gt.key)), D.fetchers.has(z)) {
      let gt = ka(Fe.data);
      D.fetchers.set(z, gt);
    }
    let Ct = Fo(ti);
    if (Ct)
      return ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ge }
      );
    if (Ct = Fo(qe), Ct)
      return X.add(Ct.key), ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ge }
      );
    let { loaderData: ln, errors: Ot } = gy(
      D,
      Wn,
      ti,
      void 0,
      ca,
      qe
    );
    Ha(Kt), D.navigation.state === "loading" && Kt > M ? (Ie(q, "Expected pending action"), re && re.abort(), pt(D.navigation.location, {
      matches: Wn,
      loaderData: ln,
      errors: Ot,
      fetchers: new Map(D.fetchers)
    })) : (et({
      errors: Ot,
      loaderData: vy(
        D.loaderData,
        ln,
        Wn,
        Ot
      ),
      fetchers: new Map(D.fetchers)
    }), C = !1);
  }
  async function qt(z, $, F, ue, de, Se, pe, ge, Ee) {
    let be = D.fetchers.get(z);
    It(
      z,
      Ks(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: pe }
    );
    let Re = new AbortController(), Ne = Hi(
      t.history,
      F,
      Re.signal
    );
    if (Se) {
      let Fe = await it(
        ue,
        new URL(Ne.url).pathname,
        Ne.signal,
        z
      );
      if (Fe.type === "aborted")
        return;
      if (Fe.type === "error") {
        Ft(z, $, Fe.error, { flushSync: pe });
        return;
      } else if (Fe.matches)
        ue = Fe.matches;
      else {
        Ft(
          z,
          $,
          Yn(404, { pathname: F }),
          { flushSync: pe }
        );
        return;
      }
    }
    let Ze = lc(ue, F);
    B.set(z, Re);
    let He = K, dt = Xi(
      u,
      h,
      Ne,
      F,
      ue,
      Ze,
      l,
      de
    ), st = await ze(
      Ne,
      F,
      dt,
      de,
      z
    ), St = st[Ze.route.id];
    if (!St) {
      for (let Fe of ue)
        if (st[Fe.route.id]) {
          St = st[Fe.route.id];
          break;
        }
    }
    if (B.get(z) === Re && B.delete(z), !Ne.signal.aborted) {
      if (ve.has(z)) {
        It(z, ka(void 0));
        return;
      }
      if (Yr(St))
        if (M > He) {
          It(z, ka(void 0));
          return;
        } else {
          X.add(z), await ye(Ne, St, !1, {
            preventScrollReset: ge
          });
          return;
        }
      if (An(St)) {
        Ft(z, $, St.error);
        return;
      }
      It(z, ka(St.data));
    }
  }
  async function ye(z, $, F, {
    submission: ue,
    fetcherSubmission: de,
    preventScrollReset: Se,
    replace: pe
  } = {}) {
    F || (I?.resolve(), I = null), $.response.headers.has("X-Remix-Revalidate") && (C = !0);
    let ge = $.response.headers.get("Location");
    Ie(ge, "Expected a Location header on the redirect Response"), ge = my(
      ge,
      new URL(z.url),
      p,
      t.history
    );
    let Ee = If(D.location, ge, {
      _isRedirect: !0
    });
    if (i) {
      let dt = !1;
      if ($.response.headers.has("X-Remix-Reload-Document"))
        dt = !0;
      else if (Sh(ge)) {
        const st = XE(ge, !0);
        dt = // Hard reload if it's an absolute URL to a new origin
        st.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Kn(st.pathname, p) == null;
      }
      if (dt) {
        pe ? a.location.replace(ge) : a.location.assign(ge);
        return;
      }
    }
    re = null;
    let be = pe === !0 || $.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Re, formAction: Ne, formEncType: Ze } = D.navigation;
    !ue && !de && Re && Ne && Ze && (ue = xy(D.navigation));
    let He = ue || de;
    if (Cj.has($.response.status) && He && cn(He.formMethod))
      await De(be, Ee, {
        submission: {
          ...He,
          formAction: ge
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || ie,
        enableViewTransition: F ? te : void 0
      });
    else {
      let dt = af(
        Ee,
        ue
      );
      await De(be, Ee, {
        overrideNavigation: dt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: de,
        // Preserve these flags across redirects
        preventScrollReset: Se || ie,
        enableViewTransition: F ? te : void 0
      });
    }
  }
  async function ze(z, $, F, ue, de) {
    let Se, pe = {};
    try {
      Se = await Uj(
        x,
        z,
        $,
        F,
        de,
        ue,
        !1
      );
    } catch (ge) {
      return F.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        pe[Ee.route.id] = {
          type: "error",
          error: ge
        };
      }), pe;
    }
    if (z.signal.aborted)
      return pe;
    if (!cn(z.method))
      for (let ge of F) {
        if (Se[ge.route.id]?.type === "error")
          break;
        !Se.hasOwnProperty(ge.route.id) && !D.loaderData.hasOwnProperty(ge.route.id) && (!D.errors || !D.errors.hasOwnProperty(ge.route.id)) && ge.shouldCallHandler() && (Se[ge.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ge.route.id}`
          )
        });
      }
    for (let [ge, Ee] of Object.entries(Se))
      if (Xj(Ee)) {
        let be = Ee.result;
        pe[ge] = {
          type: "redirect",
          response: Hj(
            be,
            z,
            ge,
            F,
            p
          )
        };
      } else
        pe[ge] = await $j(Ee);
    return pe;
  }
  async function Qe(z, $, F, ue, de) {
    let Se = ze(
      F,
      ue,
      z,
      de,
      null
    ), pe = Promise.all(
      $.map(async (be) => {
        if (be.matches && be.match && be.request && be.controller) {
          let Ne = (await ze(
            be.request,
            be.path,
            be.matches,
            de,
            be.key
          ))[be.match.route.id];
          return { [be.key]: Ne };
        } else
          return Promise.resolve({
            [be.key]: {
              type: "error",
              error: Yn(404, {
                pathname: be.path
              })
            }
          });
      })
    ), ge = await Se, Ee = (await pe).reduce(
      (be, Re) => Object.assign(be, Re),
      {}
    );
    return {
      loaderResults: ge,
      fetcherResults: Ee
    };
  }
  function nt() {
    C = !0, le.forEach((z, $) => {
      B.has($) && U.add($), Tt($);
    });
  }
  function It(z, $, F = {}) {
    D.fetchers.set(z, $), et(
      { fetchers: new Map(D.fetchers) },
      { flushSync: (F && F.flushSync) === !0 }
    );
  }
  function Ft(z, $, F, ue = {}) {
    let de = vr(D.matches, $);
    Zn(z), et(
      {
        errors: {
          [de.route.id]: F
        },
        fetchers: new Map(D.fetchers)
      },
      { flushSync: (ue && ue.flushSync) === !0 }
    );
  }
  function jr(z) {
    return fe.set(z, (fe.get(z) || 0) + 1), ve.has(z) && ve.delete(z), D.fetchers.get(z) || Rj;
  }
  function sa(z, $) {
    Tt(z, $?.reason), It(z, ka(null));
  }
  function Zn(z) {
    let $ = D.fetchers.get(z);
    B.has(z) && !($ && $.state === "loading" && Q.has(z)) && Tt(z), le.delete(z), Q.delete(z), X.delete(z), ve.delete(z), U.delete(z), D.fetchers.delete(z);
  }
  function Wt(z) {
    let $ = (fe.get(z) || 0) - 1;
    $ <= 0 ? (fe.delete(z), ve.add(z)) : fe.set(z, $), et({ fetchers: new Map(D.fetchers) });
  }
  function Tt(z, $) {
    let F = B.get(z);
    F && (F.abort($), B.delete(z));
  }
  function Yt(z) {
    for (let $ of z) {
      let F = jr($), ue = ka(F.data);
      D.fetchers.set($, ue);
    }
  }
  function ei() {
    let z = [], $ = !1;
    for (let F of X) {
      let ue = D.fetchers.get(F);
      Ie(ue, `Expected fetcher: ${F}`), ue.state === "loading" && (X.delete(F), z.push(F), $ = !0);
    }
    return Yt(z), $;
  }
  function Ha(z) {
    let $ = [];
    for (let [F, ue] of Q)
      if (ue < z) {
        let de = D.fetchers.get(F);
        Ie(de, `Expected fetcher: ${F}`), de.state === "loading" && (Tt(F), Q.delete(F), $.push(F));
      }
    return Yt($), $.length > 0;
  }
  function kn(z, $) {
    let F = D.blockers.get(z) || Ps;
    return Ae.get(z) !== $ && Ae.set(z, $), F;
  }
  function ga(z) {
    D.blockers.delete(z), Ae.delete(z);
  }
  function Jn(z, $) {
    let F = D.blockers.get(z) || Ps;
    Ie(
      F.state === "unblocked" && $.state === "blocked" || F.state === "blocked" && $.state === "blocked" || F.state === "blocked" && $.state === "proceeding" || F.state === "blocked" && $.state === "unblocked" || F.state === "proceeding" && $.state === "unblocked",
      `Invalid blocker state transition: ${F.state} -> ${$.state}`
    );
    let ue = new Map(D.blockers);
    ue.set(z, $), et({ blockers: ue });
  }
  function la({
    currentLocation: z,
    nextLocation: $,
    historyAction: F
  }) {
    if (Ae.size === 0)
      return;
    Ae.size > 1 && _t(!1, "A router only supports one blocker at a time");
    let ue = Array.from(Ae.entries()), [de, Se] = ue[ue.length - 1], pe = D.blockers.get(de);
    if (!(pe && pe.state === "proceeding") && Se({ currentLocation: z, nextLocation: $, historyAction: F }))
      return de;
  }
  function hn(z) {
    let $ = Yn(404, { pathname: z }), F = v || m, { matches: ue, route: de } = Io(F);
    return { notFoundMatches: ue, route: de, error: $ };
  }
  function Oe(z, $, F) {
    if (w = z, R = $, N = F || null, !T && D.navigation === nf) {
      T = !0;
      let ue = Gt(D.location, D.matches);
      ue != null && et({ restoreScrollPosition: ue });
    }
    return () => {
      w = null, R = null, N = null;
    };
  }
  function ut(z, $) {
    return N && N(
      z,
      $.map((ue) => WE(ue, D.loaderData))
    ) || z.key;
  }
  function Dt(z, $) {
    if (w && R) {
      let F = ut(z, $);
      w[F] = R();
    }
  }
  function Gt(z, $) {
    if (w) {
      let F = ut(z, $), ue = w[F];
      if (typeof ue == "number")
        return ue;
    }
    return null;
  }
  function wn(z, $, F) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: sl(
            $,
            F,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: sl(
          $,
          F,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function it(z, $, F, ue) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let de = z;
    for (; ; ) {
      let Se = v == null, pe = v || m, ge = h;
      try {
        await t.patchRoutesOnNavigation({
          signal: F,
          path: $,
          matches: de,
          fetcherKey: ue,
          patch: (Re, Ne) => {
            F.aborted || cy(
              Re,
              Ne,
              pe,
              ge,
              u,
              !1
            );
          }
        });
      } catch (Re) {
        return { type: "error", error: Re, partialMatches: de };
      } finally {
        Se && !F.aborted && (m = [...m]);
      }
      if (F.aborted)
        return { type: "aborted" };
      let Ee = gr(pe, $, p), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = sl(
          pe,
          $,
          p,
          !0
        ), !(be && de.length < be.length && en(
          de,
          be.slice(0, de.length)
        )))
          return { type: "success", matches: Ee };
      }
      if (be || (be = sl(
        pe,
        $,
        p,
        !0
      )), !be || en(de, be))
        return { type: "success", matches: null };
      de = be;
    }
  }
  function en(z, $) {
    return z.length === $.length && z.every((F, ue) => F.route.id === $[ue].route.id);
  }
  function va(z) {
    h = {}, v = fl(
      z,
      u,
      void 0,
      h
    );
  }
  function sn(z, $, F = !1) {
    let ue = v == null;
    cy(
      z,
      $,
      v || m,
      h,
      u,
      F
    ), ue && (m = [...m], et({}));
  }
  return ne = {
    get basename() {
      return p;
    },
    get future() {
      return g;
    },
    get state() {
      return D;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: Jt,
    subscribe: At,
    enableScrollRestoration: Oe,
    navigate: he,
    fetch: Ht,
    revalidate: ke,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => t.history.createHref(z),
    encodeLocation: (z) => t.history.encodeLocation(z),
    getFetcher: jr,
    resetFetcher: sa,
    deleteFetcher: Wt,
    dispose: Pt,
    getBlocker: kn,
    deleteBlocker: ga,
    patchRoutes: sn,
    _internalFetchControllers: B,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: va,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      et(z);
    }
  }, t.unstable_instrumentations && (ne = bj(
    ne,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), ne;
}
function Aj(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Ff(t, a, i, l, o, u) {
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
  let v = Rc(
    l || ".",
    wh(h),
    Kn(t.pathname, i) || t.pathname,
    u === "path"
  );
  if (l == null && (v.search = t.search, v.hash = t.hash), (l == null || l === "" || l === ".") && m) {
    let p = Th(v.search);
    if (m.route.index && !p)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let x = new URLSearchParams(v.search), g = x.getAll("index");
      x.delete("index"), g.filter((E) => E).forEach((E) => x.append("index", E));
      let S = x.toString();
      v.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (v.pathname = fj({ basename: i, pathname: v.pathname })), pa(v);
}
function ly(t, a, i) {
  if (!i || !Aj(i))
    return { path: a };
  if (i.formMethod && !Qj(i.formMethod))
    return {
      path: a,
      error: Yn(405, { method: i.formMethod })
    };
  let l = () => ({
    path: a,
    error: Yn(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), h = hx(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!cn(u))
        return l();
      let g = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (S, [E, w]) => `${S}${E}=${w}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: h,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!cn(u))
        return l();
      try {
        let g = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: h,
            formEncType: i.formEncType,
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
  Ie(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, v;
  if (i.formData)
    m = Gf(i.formData), v = i.formData;
  else if (i.body instanceof FormData)
    m = Gf(i.body), v = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, v = py(m);
  else if (i.body == null)
    m = new URLSearchParams(), v = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), v = py(m);
    } catch {
      return l();
    }
  let p = {
    formMethod: u,
    formAction: h,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: v,
    json: void 0,
    text: void 0
  };
  if (cn(p.formMethod))
    return { path: a, submission: p };
  let x = ia(a);
  return t && x.search && Th(x.search) && m.append("index", ""), x.search = `?${m}`, { path: pa(x), submission: p };
}
function oy(t, a, i, l, o, u, h, m, v, p, x, g, S, E, w, N, R, T, k, _, A) {
  let Z = _ ? An(_[1]) ? _[1].error : _[1].data : void 0, W = o.createURL(u.location), ne = o.createURL(v), D;
  if (x && u.errors) {
    let J = Object.keys(u.errors)[0];
    D = h.findIndex((O) => O.route.id === J);
  } else if (_ && An(_[1])) {
    let J = _[0];
    D = h.findIndex((O) => O.route.id === J) - 1;
  }
  let q = _ ? _[1].statusCode : void 0, I = q && q >= 400, ie = {
    currentUrl: W,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ne,
    nextParams: h[0].params,
    ...m,
    actionResult: Z,
    actionStatus: q
  }, re = xl(h), te = h.map((J, O) => {
    let { route: C } = J, U = null;
    if (D != null && O > D)
      U = !1;
    else if (C.lazy)
      U = !0;
    else if (!jh(C))
      U = !1;
    else if (x) {
      let { shouldLoad: Q } = sx(
        C,
        u.loaderData,
        u.errors
      );
      U = Q;
    } else Dj(u.loaderData, u.matches[O], J) && (U = !0);
    if (U !== null)
      return Yf(
        i,
        l,
        t,
        v,
        re,
        J,
        p,
        a,
        U
      );
    let B = !1;
    typeof A == "boolean" ? B = A : I ? B = !1 : (g || W.pathname + W.search === ne.pathname + ne.search || W.search !== ne.search || zj(u.matches[O], J)) && (B = !0);
    let K = {
      ...ie,
      defaultShouldRevalidate: B
    }, M = ol(J, K);
    return Yf(
      i,
      l,
      t,
      v,
      re,
      J,
      p,
      a,
      M,
      K,
      A
    );
  }), ce = [];
  return w.forEach((J, O) => {
    if (x || !h.some((le) => le.route.id === J.routeId) || E.has(O))
      return;
    let C = u.fetchers.get(O), U = C && C.state !== "idle" && C.data === void 0, B = gr(R, J.path, T);
    if (!B) {
      if (k && U)
        return;
      ce.push({
        key: O,
        routeId: J.routeId,
        path: J.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(O))
      return;
    let K = lc(B, J.path), M = new AbortController(), Q = Hi(
      o,
      J.path,
      M.signal
    ), X = null;
    if (S.has(O))
      S.delete(O), X = Xi(
        i,
        l,
        Q,
        J.path,
        B,
        K,
        p,
        a
      );
    else if (U)
      g && (X = Xi(
        i,
        l,
        Q,
        J.path,
        B,
        K,
        p,
        a
      ));
    else {
      let le;
      typeof A == "boolean" ? le = A : I ? le = !1 : le = g;
      let fe = {
        ...ie,
        defaultShouldRevalidate: le
      };
      ol(K, fe) && (X = Xi(
        i,
        l,
        Q,
        J.path,
        B,
        K,
        p,
        a,
        fe
      ));
    }
    X && ce.push({
      key: O,
      routeId: J.routeId,
      path: J.path,
      matches: X,
      match: K,
      request: Q,
      controller: M
    });
  }), { dsMatches: te, revalidatingFetchers: ce };
}
function jh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function sx(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!jh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && t.id in a, o = i != null && i[t.id] !== void 0;
  if (!l && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !o;
  return { shouldLoad: u, renderFallback: u };
}
function Dj(t, a, i) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !t.hasOwnProperty(i.route.id);
  return l || o;
}
function zj(t, a) {
  let i = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function ol(t, a) {
  if (t.route.shouldRevalidate) {
    let i = t.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function cy(t, a, i, l, o, u) {
  let h;
  if (t) {
    let p = l[t];
    Ie(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = i;
  let m = [], v = [];
  if (a.forEach((p) => {
    let x = h.find(
      (g) => lx(p, g)
    );
    x ? v.push({ existingRoute: x, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = fl(
      m,
      o,
      [t || "_", "patch", String(h?.length || "0")],
      l
    );
    h.push(...p);
  }
  if (u && v.length > 0)
    for (let p = 0; p < v.length; p++) {
      let { existingRoute: x, newRoute: g } = v[p], S = x, [E] = fl(
        [g],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(S, {
        element: E.element ? E.element : S.element,
        errorElement: E.errorElement ? E.errorElement : S.errorElement,
        hydrateFallbackElement: E.hydrateFallbackElement ? E.hydrateFallbackElement : S.hydrateFallbackElement
      });
    }
}
function lx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, l) => a.children?.some((o) => lx(i, o))
  ) ?? !1 : !1;
}
var uy = /* @__PURE__ */ new WeakMap(), ox = ({
  key: t,
  route: a,
  manifest: i,
  mapRouteProperties: l
}) => {
  let o = i[a.id];
  if (Ie(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[t];
  if (!u)
    return;
  let h = uy.get(o);
  h || (h = {}, uy.set(o, h));
  let m = h[t];
  if (m)
    return m;
  let v = (async () => {
    let p = KE(t), g = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      _t(
        !p,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), h[t] = Promise.resolve();
    else if (g)
      _t(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await u();
      S != null && (Object.assign(o, { [t]: S }), Object.assign(o, l(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[t] = v, v;
}, dy = /* @__PURE__ */ new WeakMap();
function Oj(t, a, i, l, o) {
  let u = i[t.id];
  if (Ie(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let x = dy.get(u);
    if (x)
      return {
        lazyRoutePromise: x,
        lazyHandlerPromise: x
      };
    let g = (async () => {
      Ie(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let S = await t.lazy(), E = {};
      for (let w in S) {
        let N = S[w];
        if (N === void 0)
          continue;
        let R = ZE(w), k = u[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        R ? _t(
          !R,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : k ? _t(
          !k,
          `Route "${u.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : E[w] = N;
      }
      Object.assign(u, E), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return dy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let h = Object.keys(t.lazy), m = [], v;
  for (let x of h) {
    if (o && o.includes(x))
      continue;
    let g = ox({
      key: x,
      route: t,
      manifest: i,
      mapRouteProperties: l
    });
    g && (m.push(g), x === a && (v = g));
  }
  let p = m.length > 0 ? Promise.all(m).then(() => {
  }) : void 0;
  return p?.catch(() => {
  }), v?.catch(() => {
  }), {
    lazyRoutePromise: p,
    lazyHandlerPromise: v
  };
}
async function fy(t) {
  let a = t.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    i[a[u].route.id] = o;
  }), i;
}
async function kj(t) {
  return t.matches.some((a) => a.route.middleware) ? cx(t, () => fy(t)) : fy(t);
}
function cx(t, a) {
  return Lj(
    t,
    a,
    (l) => {
      if (Kj(l))
        throw l;
      return l;
    },
    Yj,
    i
  );
  function i(l, o, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
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
      ), v = vr(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [v]: { type: "error", result: l }
      });
    }
  }
}
async function Lj(t, a, i, l, o) {
  let { matches: u, ...h } = t, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((x) => [p.route.id, x]) : []
  );
  return await ux(
    h,
    m,
    a,
    i,
    l,
    o
  );
}
async function ux(t, a, i, l, o, u, h = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let v = a[h];
  if (!v)
    return await i();
  let [p, x] = v, g, S = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await ux(
        t,
        a,
        i,
        l,
        o,
        u,
        h + 1
      ) }, g.value;
    } catch (E) {
      return g = { value: await u(E, p, g) }, g.value;
    }
  };
  try {
    let E = await x(t, S), w = E != null ? l(E) : void 0;
    return o(w) ? w : g ? w ?? g.value : (g = { value: await S() }, g.value);
  } catch (E) {
    return await u(E, p, g);
  }
}
function dx(t, a, i, l, o) {
  let u = ox({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: t
  }), h = Oj(
    l.route,
    cn(i.method) ? "action" : "loader",
    a,
    t,
    o
  );
  return {
    middleware: u,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Yf(t, a, i, l, o, u, h, m, v, p = null, x) {
  let g = !1, S = dx(
    t,
    a,
    i,
    u,
    h
  );
  return {
    ...u,
    _lazyPromises: S,
    shouldLoad: v,
    shouldRevalidateArgs: p,
    shouldCallHandler(E) {
      return g = !0, p ? typeof x == "boolean" ? ol(u, {
        ...p,
        defaultShouldRevalidate: x
      }) : typeof E == "boolean" ? ol(u, {
        ...p,
        defaultShouldRevalidate: E
      }) : ol(u, p) : v;
    },
    resolve(E) {
      let { lazy: w, loader: N, middleware: R } = u.route, T = g || v || E && !cn(i.method) && (w || N), k = R && R.length > 0 && !N && !w;
      return T && (cn(i.method) || !k) ? Bj({
        request: i,
        path: l,
        unstable_pattern: o,
        match: u,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: E,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Xi(t, a, i, l, o, u, h, m, v = null) {
  return o.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: v,
    shouldCallHandler: () => !1,
    _lazyPromises: dx(
      t,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Yf(
    t,
    a,
    i,
    l,
    xl(o),
    p,
    h,
    m,
    !0,
    v
  ));
}
async function Uj(t, a, i, l, o, u, h) {
  l.some((x) => x._lazyPromises?.middleware) && await Promise.all(l.map((x) => x._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: fx(a, i),
    unstable_pattern: xl(l),
    params: l[0].params,
    context: u,
    matches: l
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (x) => {
      let g = m;
      return cx(g, () => x({
        ...g,
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
      l.flatMap((x) => [
        x._lazyPromises?.handler,
        x._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function Bj({
  request: t,
  path: a,
  unstable_pattern: i,
  match: l,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: h,
  scopedContext: m
}) {
  let v, p, x = cn(t.method), g = x ? "action" : "loader", S = (E) => {
    let w, N = new Promise((k, _) => w = _);
    p = () => w(), t.signal.addEventListener("abort", p);
    let R = (k) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : E(
      {
        request: t,
        unstable_url: fx(t, a),
        unstable_pattern: i,
        params: l.params,
        context: m
      },
      ...k !== void 0 ? [k] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (h ? h((_) => R(_)) : R()) };
      } catch (k) {
        return { type: "error", result: k };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let E = x ? l.route.action : l.route.loader;
    if (o || u)
      if (E) {
        let w, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(E).catch((R) => {
            w = R;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          u
        ]);
        if (w !== void 0)
          throw w;
        v = N;
      } else {
        await o;
        let w = x ? l.route.action : l.route.loader;
        if (w)
          [v] = await Promise.all([S(w), u]);
        else if (g === "action") {
          let N = new URL(t.url), R = N.pathname + N.search;
          throw Yn(405, {
            method: t.method,
            pathname: R,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (E)
      v = await S(E);
    else {
      let w = new URL(t.url), N = w.pathname + w.search;
      throw Yn(404, {
        pathname: N
      });
    }
  } catch (E) {
    return { type: "error", result: E };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return v;
}
async function Vj(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function $j(t) {
  let { result: a, type: i } = t;
  if (Nh(a)) {
    let l;
    try {
      l = await Vj(a);
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
  return i === "error" ? by(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: Fj(a),
    statusCode: hl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: hl(a) ? a.status : void 0
  } : by(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function Hj(t, a, i, l, o) {
  let u = t.headers.get("Location");
  if (Ie(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Sh(u)) {
    let h = l.slice(
      0,
      l.findIndex((m) => m.route.id === i) + 1
    );
    u = Ff(
      new URL(a.url),
      h,
      o,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var hy = [
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
function my(t, a, i, l) {
  if (Sh(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (hy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(u.pathname, i) != null;
    if (u.origin === a.origin && h)
      return Eh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = l.createURL(t);
    if (hy.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Hi(t, a, i, l) {
  let o = t.createURL(hx(a)).toString(), u = { signal: i };
  if (l && cn(l.formMethod)) {
    let { formMethod: h, formEncType: m } = l;
    u.method = h.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(l.json)) : m === "text/plain" ? u.body = l.text : m === "application/x-www-form-urlencoded" && l.formData ? u.body = Gf(l.formData) : u.body = l.formData;
  }
  return new Request(o, u);
}
function fx(t, a) {
  let i = new URL(t.url), l = typeof a == "string" ? ia(a) : a;
  if (i.pathname = l.pathname || "/", l.search) {
    let o = new URLSearchParams(l.search), u = o.getAll("index");
    o.delete("index");
    for (let h of u.filter(Boolean))
      o.append("index", h);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = l.hash || "", i;
}
function Gf(t) {
  let a = new URLSearchParams();
  for (let [i, l] of t.entries())
    a.append(i, typeof l == "string" ? l : l.name);
  return a;
}
function py(t) {
  let a = new FormData();
  for (let [i, l] of t.entries())
    a.append(i, l);
  return a;
}
function qj(t, a, i, l = !1, o = !1) {
  let u = {}, h = null, m, v = !1, p = {}, x = i && An(i[1]) ? i[1].error : void 0;
  return t.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let S = g.route.id, E = a[S];
    if (Ie(
      !Yr(E),
      "Cannot handle redirect results in processLoaderData"
    ), An(E)) {
      let w = E.error;
      if (x !== void 0 && (w = x, x = void 0), h = h || {}, o)
        h[S] = w;
      else {
        let N = vr(t, S);
        h[N.route.id] == null && (h[N.route.id] = w);
      }
      l || (u[S] = ix), v || (v = !0, m = hl(E.error) ? E.error.status : 500), E.headers && (p[S] = E.headers);
    } else
      u[S] = E.data, E.statusCode && E.statusCode !== 200 && !v && (m = E.statusCode), E.headers && (p[S] = E.headers);
  }), x !== void 0 && i && (h = { [i[0]]: x }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function gy(t, a, i, l, o, u) {
  let { loaderData: h, errors: m } = qj(
    a,
    i,
    l
  );
  return o.filter((v) => !v.matches || v.matches.some((p) => p.shouldLoad)).forEach((v) => {
    let { key: p, match: x, controller: g } = v;
    if (g && g.signal.aborted)
      return;
    let S = u[p];
    if (Ie(S, "Did not find corresponding fetcher result"), An(S)) {
      let E = vr(t.matches, x?.route.id);
      m && m[E.route.id] || (m = {
        ...m,
        [E.route.id]: S.error
      }), t.fetchers.delete(p);
    } else if (Yr(S))
      Ie(!1, "Unhandled fetcher revalidation redirect");
    else {
      let E = ka(S.data);
      t.fetchers.set(p, E);
    }
  }), { loaderData: h, errors: m };
}
function vy(t, a, i, l) {
  let o = Object.entries(a).filter(([, u]) => u !== ix).reduce((u, [h, m]) => (u[h] = m, u), {});
  for (let u of i) {
    let h = u.route.id;
    if (!a.hasOwnProperty(h) && t.hasOwnProperty(h) && u.route.loader && (o[h] = t[h]), l && l.hasOwnProperty(h))
      break;
  }
  return o;
}
function yy(t) {
  return t ? An(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function vr(t, a) {
  return (a ? t.slice(0, t.findIndex((l) => l.route.id === a) + 1) : [...t]).reverse().find((l) => l.route.hasErrorBoundary === !0) || t[0];
}
function Io(t) {
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
  message: u
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return t === 400 ? (h = "Bad Request", l && a && i ? m = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (h = "Method Not Allowed", l && a && i ? m = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : l && (m = `Invalid request method "${l.toUpperCase()}"`)), new Mc(
    t || 500,
    h,
    new Error(m),
    !0
  );
}
function Fo(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [l, o] = a[i];
    if (Yr(o))
      return { key: l, result: o };
  }
}
function hx(t) {
  let a = typeof t == "string" ? ia(t) : t;
  return pa({ ...a, hash: "" });
}
function Ij(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function Fj(t) {
  return new Mc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function Yj(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && Gj(i)
  );
}
function Gj(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function Xj(t) {
  return Nh(t.result) && ax.has(t.result.status);
}
function An(t) {
  return t.type === "error";
}
function Yr(t) {
  return (t && t.type) === "redirect";
}
function by(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Nh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function Pj(t) {
  return ax.has(t);
}
function Kj(t) {
  return Nh(t) && Pj(t.status) && t.headers.has("Location");
}
function Qj(t) {
  return Tj.has(t.toUpperCase());
}
function cn(t) {
  return jj.has(t.toUpperCase());
}
function Th(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function lc(t, a) {
  let i = typeof a == "string" ? ia(a).search : a.search;
  if (t[t.length - 1].route.index && Th(i || ""))
    return t[t.length - 1];
  let l = Jb(t);
  return l[l.length - 1];
}
function xy(t) {
  let { formMethod: a, formAction: i, formEncType: l, text: o, formData: u, json: h } = t;
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
    if (u != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: u,
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
function Zj(t, a) {
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
function Jj(t, a) {
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
function ka(t) {
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
function Wj(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      rx
    );
    if (i) {
      let l = JSON.parse(i);
      for (let [o, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function eN(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [l, o] of a)
      i[l] = [...o];
    try {
      t.sessionStorage.setItem(
        rx,
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
function Sy() {
  let t, a, i = new Promise((l, o) => {
    t = async (u) => {
      l(u);
      try {
        await i;
      } catch {
      }
    }, a = async (u) => {
      o(u);
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
var Wr = y.createContext(null);
Wr.displayName = "DataRouter";
var Sl = y.createContext(null);
Sl.displayName = "DataRouterState";
var mx = y.createContext(!1);
function px() {
  return y.useContext(mx);
}
var Ch = y.createContext({
  isTransitioning: !1
});
Ch.displayName = "ViewTransition";
var gx = y.createContext(
  /* @__PURE__ */ new Map()
);
gx.displayName = "Fetchers";
var tN = y.createContext(null);
tN.displayName = "Await";
var Qn = y.createContext(
  null
);
Qn.displayName = "Navigation";
var _c = y.createContext(
  null
);
_c.displayName = "Location";
var Ba = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ba.displayName = "Route";
var Rh = y.createContext(null);
Rh.displayName = "RouteError";
var vx = "REACT_ROUTER_ERROR", nN = "REDIRECT", aN = "ROUTE_ERROR_RESPONSE";
function rN(t) {
  if (t.startsWith(`${vx}:${nN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function iN(t) {
  if (t.startsWith(
    `${vx}:${aN}:{`
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
function sN(t, { relative: a } = {}) {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: l } = y.useContext(Qn), { hash: o, pathname: u, search: h } = jl(t, { relative: a }), m = u;
  return i !== "/" && (m = u === "/" ? i : Gn([i, u])), l.createHref({ pathname: m, search: h, hash: o });
}
function wl() {
  return y.useContext(_c) != null;
}
function Va() {
  return Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(_c).location;
}
var yx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function bx(t) {
  y.useContext(Qn).static || y.useLayoutEffect(t);
}
function El() {
  let { isDataRoute: t } = y.useContext(Ba);
  return t ? yN() : lN();
}
function lN() {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = y.useContext(Wr), { basename: a, navigator: i } = y.useContext(Qn), { matches: l } = y.useContext(Ba), { pathname: o } = Va(), u = JSON.stringify(wh(l)), h = y.useRef(!1);
  return bx(() => {
    h.current = !0;
  }), y.useCallback(
    (v, p = {}) => {
      if (_t(h.current, yx), !h.current) return;
      if (typeof v == "number") {
        i.go(v);
        return;
      }
      let x = Rc(
        v,
        JSON.parse(u),
        o,
        p.relative === "path"
      );
      t == null && a !== "/" && (x.pathname = x.pathname === "/" ? a : Gn([a, x.pathname])), (p.replace ? i.replace : i.push)(
        x,
        p.state,
        p
      );
    },
    [
      a,
      i,
      u,
      o,
      t
    ]
  );
}
y.createContext(null);
function jl(t, { relative: a } = {}) {
  let { matches: i } = y.useContext(Ba), { pathname: l } = Va(), o = JSON.stringify(wh(i));
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
function oN(t, a, i) {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = y.useContext(Qn), { matches: o } = y.useContext(Ba), u = o[o.length - 1], h = u ? u.params : {}, m = u ? u.pathname : "/", v = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let R = p && p.path || "";
    wx(
      m,
      !p || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let x = Va(), g;
  g = x;
  let S = g.pathname || "/", E = S;
  if (v !== "/") {
    let R = v.replace(/^\//, "").split("/");
    E = "/" + S.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let w = gr(t, { pathname: E });
  return _t(
    p || w != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), _t(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), hN(
    w && w.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, h, R.params),
        pathname: Gn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? v : Gn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function cN() {
  let t = vN(), a = hl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, l = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), h = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, h);
}
var uN = /* @__PURE__ */ y.createElement(cN, null), xx = class extends y.Component {
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
      const i = iN(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ y.createElement(Ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Rh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(dN, { error: t }, a) : a;
  }
};
xx.contextType = mx;
var rf = /* @__PURE__ */ new WeakMap();
function dN({
  children: t,
  error: a
}) {
  let { basename: i } = y.useContext(Qn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = rN(a.digest);
    if (l) {
      let o = rf.get(a);
      if (o) throw o;
      let u = ex(l.location, i);
      if (Wb && !rf.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw rf.set(a, h), h;
        }
      return /* @__PURE__ */ y.createElement(
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
function fN({ routeContext: t, match: a, children: i }) {
  let l = y.useContext(Wr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement(Ba.Provider, { value: t }, i);
}
function hN(t, a = [], i) {
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
  let o = t, u = l?.errors;
  if (u != null) {
    let x = o.findIndex(
      (g) => g.route.id && u?.[g.route.id] !== void 0
    );
    Ie(
      x >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, x + 1)
    );
  }
  let h = !1, m = -1;
  if (i && l) {
    h = l.renderFallback;
    for (let x = 0; x < o.length; x++) {
      let g = o[x];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (m = x), g.route.id) {
        let { loaderData: S, errors: E } = l, w = g.route.loader && !S.hasOwnProperty(g.route.id) && (!E || E[g.route.id] === void 0);
        if (g.route.lazy || w) {
          i.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let v = i?.onError, p = l && v ? (x, g) => {
    v(x, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      unstable_pattern: xl(l.matches),
      errorInfo: g
    });
  } : void 0;
  return o.reduceRight(
    (x, g, S) => {
      let E, w = !1, N = null, R = null;
      l && (E = u && g.route.id ? u[g.route.id] : void 0, N = g.route.errorElement || uN, h && (m < 0 && S === 0 ? (wx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, R = null) : m === S && (w = !0, R = g.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, S + 1)), k = () => {
        let _;
        return E ? _ = N : w ? _ = R : g.route.Component ? _ = /* @__PURE__ */ y.createElement(g.route.Component, null) : g.route.element ? _ = g.route.element : _ = x, /* @__PURE__ */ y.createElement(
          fN,
          {
            match: g,
            routeContext: {
              outlet: x,
              matches: T,
              isDataRoute: l != null
            },
            children: _
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || S === 0) ? /* @__PURE__ */ y.createElement(
        xx,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: N,
          error: E,
          children: k(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : k();
    },
    null
  );
}
function Mh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function mN(t) {
  let a = y.useContext(Wr);
  return Ie(a, Mh(t)), a;
}
function Sx(t) {
  let a = y.useContext(Sl);
  return Ie(a, Mh(t)), a;
}
function pN(t) {
  let a = y.useContext(Ba);
  return Ie(a, Mh(t)), a;
}
function Ac(t) {
  let a = pN(t), i = a.matches[a.matches.length - 1];
  return Ie(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function gN() {
  return Ac(
    "useRouteId"
    /* UseRouteId */
  );
}
function Nl() {
  let t = Sx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Ac(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function vN() {
  let t = y.useContext(Rh), a = Sx(
    "useRouteError"
    /* UseRouteError */
  ), i = Ac(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function yN() {
  let { router: t } = mN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Ac(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return bx(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, u = {}) => {
      _t(i.current, yx), i.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var wy = {};
function wx(t, a, i) {
  !a && !wy[t] && (wy[t] = !0, _t(!1, i));
}
var Ey = {};
function jy(t, a) {
  !t && !Ey[a] && (Ey[a] = !0, console.warn(a));
}
var bN = "useOptimistic", Ny = LE[bN], xN = () => {
};
function SN(t) {
  return Ny ? Ny(t) : [t, xN];
}
function wN(t) {
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
var EN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function jN(t, a) {
  return _j({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: YE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: EN,
    mapRouteProperties: wN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var NN = class {
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
function TN({
  router: t,
  flushSync: a,
  onError: i,
  unstable_useTransitions: l
}) {
  l = px() || l;
  let [u, h] = y.useState(t.state), [m, v] = SN(u), [p, x] = y.useState(), [g, S] = y.useState({
    isTransitioning: !1
  }), [E, w] = y.useState(), [N, R] = y.useState(), [T, k] = y.useState(), _ = y.useRef(/* @__PURE__ */ new Map()), A = y.useCallback(
    (q, { deletedFetchers: I, newErrors: ie, flushSync: re, viewTransitionOpts: te }) => {
      ie && i && Object.values(ie).forEach(
        (J) => i(J, {
          location: q.location,
          params: q.matches[0]?.params ?? {},
          unstable_pattern: xl(q.matches)
        })
      ), q.fetchers.forEach((J, O) => {
        J.data !== void 0 && _.current.set(O, J.data);
      }), I.forEach((J) => _.current.delete(J)), jy(
        re === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ce = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (jy(
        te == null || ce,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !te || !ce) {
        a && re ? a(() => h(q)) : l === !1 ? h(q) : y.startTransition(() => {
          l === !0 && v((J) => Ty(J, q)), h(q);
        });
        return;
      }
      if (a && re) {
        a(() => {
          N && (E?.resolve(), N.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: te.currentLocation,
            nextLocation: te.nextLocation
          });
        });
        let J = t.window.document.startViewTransition(() => {
          a(() => h(q));
        });
        J.finished.finally(() => {
          a(() => {
            w(void 0), R(void 0), x(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => R(J));
        return;
      }
      N ? (E?.resolve(), N.skipTransition(), k({
        state: q,
        currentLocation: te.currentLocation,
        nextLocation: te.nextLocation
      })) : (x(q), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: te.currentLocation,
        nextLocation: te.nextLocation
      }));
    },
    [
      t.window,
      a,
      N,
      E,
      l,
      v,
      i
    ]
  );
  y.useLayoutEffect(() => t.subscribe(A), [t, A]);
  let Z = m.initialized;
  y.useLayoutEffect(() => {
    !Z && t.state.initialized && A(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [Z, A, t.state]), y.useEffect(() => {
    g.isTransitioning && !g.flushSync && w(new NN());
  }, [g]), y.useEffect(() => {
    if (E && p && t.window) {
      let q = p, I = E.promise, ie = t.window.document.startViewTransition(async () => {
        l === !1 ? h(q) : y.startTransition(() => {
          l === !0 && v((re) => Ty(re, q)), h(q);
        }), await I;
      });
      ie.finished.finally(() => {
        w(void 0), R(void 0), x(void 0), S({ isTransitioning: !1 });
      }), R(ie);
    }
  }, [
    p,
    E,
    t.window,
    l,
    v
  ]), y.useEffect(() => {
    E && p && m.location.key === p.location.key && E.resolve();
  }, [E, N, m.location, p]), y.useEffect(() => {
    !g.isTransitioning && T && (x(T.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), k(void 0));
  }, [g.isTransitioning, T]);
  let W = y.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (q) => t.navigate(q),
    push: (q, I, ie) => t.navigate(q, {
      state: I,
      preventScrollReset: ie?.preventScrollReset
    }),
    replace: (q, I, ie) => t.navigate(q, {
      replace: !0,
      state: I,
      preventScrollReset: ie?.preventScrollReset
    })
  }), [t]), ne = t.basename || "/", D = y.useMemo(
    () => ({
      router: t,
      navigator: W,
      static: !1,
      basename: ne,
      onError: i
    }),
    [t, W, ne, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Wr.Provider, { value: D }, /* @__PURE__ */ y.createElement(Sl.Provider, { value: m }, /* @__PURE__ */ y.createElement(gx.Provider, { value: _.current }, /* @__PURE__ */ y.createElement(Ch.Provider, { value: g }, /* @__PURE__ */ y.createElement(
    MN,
    {
      basename: ne,
      location: m.location,
      navigationType: m.historyAction,
      navigator: W,
      unstable_useTransitions: l
    },
    /* @__PURE__ */ y.createElement(
      CN,
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
function Ty(t, a) {
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
var CN = y.memo(RN);
function RN({
  routes: t,
  future: a,
  state: i,
  isStatic: l,
  onError: o
}) {
  return oN(t, void 0, { state: i, isStatic: l, onError: o });
}
function MN({
  basename: t = "/",
  children: a = null,
  location: i,
  navigationType: l = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: h
}) {
  Ie(
    !wl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = t.replace(/^\/*/, "/"), v = y.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: u,
      unstable_useTransitions: h,
      future: {}
    }),
    [m, o, u, h]
  );
  typeof i == "string" && (i = ia(i));
  let {
    pathname: p = "/",
    search: x = "",
    hash: g = "",
    state: S = null,
    key: E = "default",
    unstable_mask: w
  } = i, N = y.useMemo(() => {
    let R = Kn(p, m);
    return R == null ? null : {
      location: {
        pathname: R,
        search: x,
        hash: g,
        state: S,
        key: E,
        unstable_mask: w
      },
      navigationType: l
    };
  }, [
    m,
    p,
    x,
    g,
    S,
    E,
    l,
    w
  ]);
  return _t(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${x}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ y.createElement(Qn.Provider, { value: v }, /* @__PURE__ */ y.createElement(_c.Provider, { children: a, value: N }));
}
var oc = "get", cc = "application/x-www-form-urlencoded";
function Dc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function _N(t) {
  return Dc(t) && t.tagName.toLowerCase() === "button";
}
function AN(t) {
  return Dc(t) && t.tagName.toLowerCase() === "form";
}
function DN(t) {
  return Dc(t) && t.tagName.toLowerCase() === "input";
}
function zN(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function ON(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !zN(t);
}
var Yo = null;
function kN() {
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
var LN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function sf(t) {
  return t != null && !LN.has(t) ? (_t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${cc}"`
  ), null) : t;
}
function UN(t, a) {
  let i, l, o, u, h;
  if (AN(t)) {
    let m = t.getAttribute("action");
    l = m ? Kn(m, a) : null, i = t.getAttribute("method") || oc, o = sf(t.getAttribute("enctype")) || cc, u = new FormData(t);
  } else if (_N(t) || DN(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = t.getAttribute("formaction") || m.getAttribute("action");
    if (l = v ? Kn(v, a) : null, i = t.getAttribute("formmethod") || m.getAttribute("method") || oc, o = sf(t.getAttribute("formenctype")) || sf(m.getAttribute("enctype")) || cc, u = new FormData(m, t), !kN()) {
      let { name: p, type: x, value: g } = t;
      if (x === "image") {
        let S = p ? `${p}.` : "";
        u.append(`${S}x`, "0"), u.append(`${S}y`, "0");
      } else p && u.append(p, g);
    }
  } else {
    if (Dc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = oc, l = null, o = cc, h = t;
  }
  return u && o === "text/plain" && (h = u, u = void 0), { action: l, method: i.toLowerCase(), encType: o, formData: u, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function _h(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Ex(t, a, i, l) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${l}` : o.pathname = `${o.pathname}.${l}` : o.pathname === "/" ? o.pathname = `_root.${l}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${gc(a)}/_root.${l}` : o.pathname = `${gc(o.pathname)}.${l}`, o;
}
async function BN(t, a) {
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
function VN(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function $N(t, a, i) {
  let l = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let h = await BN(u, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return FN(
    l.flat(1).filter(VN).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Cy(t, a, i, l, o, u) {
  let h = (v, p) => i[p] ? v.route.id !== i[p].route.id : !0, m = (v, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== v.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== v.params["*"]
  );
  return u === "assets" ? a.filter(
    (v, p) => h(v, p) || m(v, p)
  ) : u === "data" ? a.filter((v, p) => {
    let x = l.routes[v.route.id];
    if (!x || !x.hasLoader)
      return !1;
    if (h(v, p) || m(v, p))
      return !0;
    if (v.route.shouldRevalidate) {
      let g = v.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: i[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: v.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function HN(t, a, { includeHydrateFallback: i } = {}) {
  return qN(
    t.map((l) => {
      let o = a.routes[l.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function qN(t) {
  return [...new Set(t)];
}
function IN(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let l of i)
    a[l] = t[l];
  return a;
}
function FN(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((l, o) => {
    let u = JSON.stringify(IN(o));
    return i.has(u) || (i.add(u), l.push({ key: u, link: o })), l;
  }, []);
}
function Ah() {
  let t = y.useContext(Wr);
  return _h(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function YN() {
  let t = y.useContext(Sl);
  return _h(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Dh = y.createContext(void 0);
Dh.displayName = "FrameworkContext";
function zh() {
  let t = y.useContext(Dh);
  return _h(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function GN(t, a) {
  let i = y.useContext(Dh), [l, o] = y.useState(!1), [u, h] = y.useState(!1), { onFocus: m, onBlur: v, onMouseEnter: p, onMouseLeave: x, onTouchStart: g } = a, S = y.useRef(null);
  y.useEffect(() => {
    if (t === "render" && h(!0), t === "viewport") {
      let N = (T) => {
        T.forEach((k) => {
          h(k.isIntersecting);
        });
      }, R = new IntersectionObserver(N, { threshold: 0.5 });
      return S.current && R.observe(S.current), () => {
        R.disconnect();
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
  let E = () => {
    o(!0);
  }, w = () => {
    o(!1), h(!1);
  };
  return i ? t !== "intent" ? [u, S, {}] : [
    u,
    S,
    {
      onFocus: Qs(m, E),
      onBlur: Qs(v, w),
      onMouseEnter: Qs(p, E),
      onMouseLeave: Qs(x, w),
      onTouchStart: Qs(g, E)
    }
  ] : [!1, S, {}];
}
function Qs(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function XN({ page: t, ...a }) {
  let i = px(), { router: l } = Ah(), o = y.useMemo(
    () => gr(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(KN, { page: t, matches: o, ...a }) : /* @__PURE__ */ y.createElement(QN, { page: t, matches: o, ...a }) : null;
}
function PN(t) {
  let { manifest: a, routeModules: i } = zh(), [l, o] = y.useState([]);
  return y.useEffect(() => {
    let u = !1;
    return $N(t, a, i).then(
      (h) => {
        u || o(h);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, i]), l;
}
function KN({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o } = zh(), { basename: u } = Ah(), h = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let m = Ex(
      t,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), v = !1, p = [];
    for (let x of a)
      typeof x.route.shouldRevalidate == "function" ? v = !0 : p.push(x.route.id);
    return v && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    l,
    a
  ]);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, h.map((m) => /* @__PURE__ */ y.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function QN({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o, manifest: u, routeModules: h } = zh(), { basename: m } = Ah(), { loaderData: v, matches: p } = YN(), x = y.useMemo(
    () => Cy(
      t,
      a,
      p,
      u,
      l,
      "data"
    ),
    [t, a, p, u, l]
  ), g = y.useMemo(
    () => Cy(
      t,
      a,
      p,
      u,
      l,
      "assets"
    ),
    [t, a, p, u, l]
  ), S = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((k) => {
      let _ = u.routes[k.route.id];
      !_ || !_.hasLoader || (!x.some((A) => A.route.id === k.route.id) && k.route.id in v && h[k.route.id]?.shouldRevalidate || _.hasClientLoader ? R = !0 : N.add(k.route.id));
    }), N.size === 0)
      return [];
    let T = Ex(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((k) => N.has(k.route.id)).map((k) => k.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    v,
    l,
    u,
    x,
    a,
    t,
    h
  ]), E = y.useMemo(
    () => HN(g, u),
    [g, u]
  ), w = PN(g);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, S.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...i })), E.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "modulepreload", href: N, ...i })), w.map(({ key: N, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement(
      "link",
      {
        key: N,
        nonce: i.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function ZN(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var JN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  JN && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var jx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, zc = y.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: l = "none",
    relative: o,
    reloadDocument: u,
    replace: h,
    unstable_mask: m,
    state: v,
    target: p,
    to: x,
    preventScrollReset: g,
    viewTransition: S,
    unstable_defaultShouldRevalidate: E,
    ...w
  }, N) {
    let { basename: R, navigator: T, unstable_useTransitions: k } = y.useContext(Qn), _ = typeof x == "string" && jx.test(x), A = ex(x, R);
    x = A.to;
    let Z = sN(x, { relative: o }), W = Va(), ne = null;
    if (m) {
      let J = Rc(
        m,
        [],
        W.unstable_mask ? W.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (J.pathname = J.pathname === "/" ? R : Gn([R, J.pathname])), ne = T.createHref(J);
    }
    let [D, q, I] = GN(
      l,
      w
    ), ie = nT(x, {
      replace: h,
      unstable_mask: m,
      state: v,
      target: p,
      preventScrollReset: g,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: k
    });
    function re(J) {
      a && a(J), J.defaultPrevented || ie(J);
    }
    let te = !(A.isExternal || u), ce = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...w,
          ...I,
          href: (te ? ne : void 0) || A.absoluteURL || Z,
          onClick: te ? re : a,
          ref: ZN(N, q),
          target: p,
          "data-discover": !_ && i === "render" ? "true" : void 0
        }
      )
    );
    return D && !_ ? /* @__PURE__ */ y.createElement(y.Fragment, null, ce, /* @__PURE__ */ y.createElement(XN, { page: Z })) : ce;
  }
);
zc.displayName = "Link";
var WN = y.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: l = "",
    end: o = !1,
    style: u,
    to: h,
    viewTransition: m,
    children: v,
    ...p
  }, x) {
    let g = jl(h, { relative: p.relative }), S = Va(), E = y.useContext(Sl), { navigator: w, basename: N } = y.useContext(Qn), R = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    lT(g) && m === !0, T = w.encodeLocation ? w.encodeLocation(g).pathname : g.pathname, k = S.pathname, _ = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    i || (k = k.toLowerCase(), _ = _ ? _.toLowerCase() : null, T = T.toLowerCase()), _ && N && (_ = Kn(_, N) || _);
    const A = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let Z = k === T || !o && k.startsWith(T) && k.charAt(A) === "/", W = _ != null && (_ === T || !o && _.startsWith(T) && _.charAt(T.length) === "/"), ne = {
      isActive: Z,
      isPending: W,
      isTransitioning: R
    }, D = Z ? a : void 0, q;
    typeof l == "function" ? q = l(ne) : q = [
      l,
      Z ? "active" : null,
      W ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let I = typeof u == "function" ? u(ne) : u;
    return /* @__PURE__ */ y.createElement(
      zc,
      {
        ...p,
        "aria-current": D,
        className: q,
        ref: x,
        style: I,
        to: h,
        viewTransition: m
      },
      typeof v == "function" ? v(ne) : v
    );
  }
);
WN.displayName = "NavLink";
var eT = y.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: l,
    replace: o,
    state: u,
    method: h = oc,
    action: m,
    onSubmit: v,
    relative: p,
    preventScrollReset: x,
    viewTransition: g,
    unstable_defaultShouldRevalidate: S,
    ...E
  }, w) => {
    let { unstable_useTransitions: N } = y.useContext(Qn), R = iT(), T = sT(m, { relative: p }), k = h.toLowerCase() === "get" ? "get" : "post", _ = typeof m == "string" && jx.test(m), A = (Z) => {
      if (v && v(Z), Z.defaultPrevented) return;
      Z.preventDefault();
      let W = Z.nativeEvent.submitter, ne = W?.getAttribute("formmethod") || h, D = () => R(W || Z.currentTarget, {
        fetcherKey: a,
        method: ne,
        navigate: i,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: x,
        viewTransition: g,
        unstable_defaultShouldRevalidate: S
      });
      N && i !== !1 ? y.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: w,
        method: k,
        action: T,
        onSubmit: l ? v : A,
        ...E,
        "data-discover": !_ && t === "render" ? "true" : void 0
      }
    );
  }
);
eT.displayName = "Form";
function tT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Nx(t) {
  let a = y.useContext(Wr);
  return Ie(a, tT(t)), a;
}
function nT(t, {
  target: a,
  replace: i,
  unstable_mask: l,
  state: o,
  preventScrollReset: u,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: v,
  unstable_useTransitions: p
} = {}) {
  let x = El(), g = Va(), S = jl(t, { relative: h });
  return y.useCallback(
    (E) => {
      if (ON(E, a)) {
        E.preventDefault();
        let w = i !== void 0 ? i : pa(g) === pa(S), N = () => x(t, {
          replace: w,
          unstable_mask: l,
          state: o,
          preventScrollReset: u,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: v
        });
        p ? y.startTransition(() => N()) : N();
      }
    },
    [
      g,
      x,
      S,
      i,
      l,
      o,
      a,
      t,
      u,
      h,
      m,
      v,
      p
    ]
  );
}
var aT = 0, rT = () => `__${String(++aT)}__`;
function iT() {
  let { router: t } = Nx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(Qn), i = gN(), l = t.fetch, o = t.navigate;
  return y.useCallback(
    async (u, h = {}) => {
      let { action: m, method: v, encType: p, formData: x, body: g } = UN(
        u,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || rT();
        await l(S, i, h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: x,
          body: g,
          formMethod: h.method || v,
          formEncType: h.encType || p,
          flushSync: h.flushSync
        });
      } else
        await o(h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: x,
          body: g,
          formMethod: h.method || v,
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
function sT(t, { relative: a } = {}) {
  let { basename: i } = y.useContext(Qn), l = y.useContext(Ba);
  Ie(l, "useFormAction must be used inside a RouteContext");
  let [o] = l.matches.slice(-1), u = { ...jl(t || ".", { relative: a }) }, h = Va();
  if (t == null) {
    u.search = h.search;
    let m = new URLSearchParams(u.search), v = m.getAll("index");
    if (v.some((x) => x === "")) {
      m.delete("index"), v.filter((g) => g).forEach((g) => m.append("index", g));
      let x = m.toString();
      u.search = x ? `?${x}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : Gn([i, u.pathname])), pa(u);
}
function lT(t, { relative: a } = {}) {
  let i = y.useContext(Ch);
  Ie(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = Nx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = jl(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = Kn(i.currentLocation.pathname, l) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return pc(o.pathname, h) != null || pc(o.pathname, u) != null;
}
class Wi extends Error {
  constructor(a, i, l, o) {
    super(l), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const $a = "/api/v1/extensions/nexus.audio.emotiontts";
async function ht(t, a) {
  const i = t.startsWith("http") ? t : `${$a}${t}`, l = await fetch(i, {
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
function oT(t, a, i) {
  const l = t.startsWith("http") ? t : `${$a}${t}`, o = new EventSource(l);
  return o.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, o.onerror = (u) => {
    i?.(u);
  }, () => o.close();
}
async function cT() {
  return ht("/deployments");
}
async function Ry(t) {
  return ht(`/deployments/${t}`);
}
async function uT(t, a) {
  return ht(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function My(t) {
  return ht(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Oh(t, a) {
  return ht("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function cl(t, a, i) {
  return ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Tx(t, a) {
  await ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function dT(t) {
  return ht(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function fT(t, a, i = "error") {
  return ht("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: i })
  });
}
async function hT(t, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const l = i.toString(), o = l ? `?${l}` : "";
  return ht(`/deployments/${t}/runs${o}`);
}
async function mT(t, a) {
  return ht(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function kh(t, a) {
  return ht(`/deployments/${t}/runs/${a}`);
}
async function pT(t, a) {
  return ht(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function Cx(t, a) {
  return ht(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function gT(t, a) {
  return ht(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function _y(t, a, i, l) {
  return oT(
    `/deployments/${t}/runs/${a}/progress`,
    i,
    l
  );
}
async function ml(t) {
  return ht(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function vc(t, a, i, l, o) {
  const u = new FormData();
  u.append("deploymentId", t), u.append("displayName", i), u.append("kind", l), u.append("audio", a);
  const h = await fetch(`${$a}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function vT(t, a) {
  await ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function yT(t, a, i) {
  return ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function bT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${$a}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function xT(t) {
  return ht(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var ST = "mux0i60", wT = "mux0i61", ET = "mux0i62", jT = "mux0i63";
function Tl({ count: t = "0", title: a, hint: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: ST, children: [
    /* @__PURE__ */ d.jsx("span", { className: wT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ d.jsx("h3", { className: ET, children: a }),
    i ? /* @__PURE__ */ d.jsx("p", { className: jT, children: i }) : null
  ] });
}
var NT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, TT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, CT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, RT = "zwn3019";
function La({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: l = "section",
  children: o,
  className: u,
  style: h,
  ...m
}) {
  const v = [NT[t], CT[a], TT[i], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(l, { className: v, style: h, "data-elevation": i, ...m, children: o });
}
function MT({ children: t, className: a }) {
  const i = [RT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: i, children: t });
}
var Pr = "vrkn5p0", _T = "_93p6291", AT = "_93p6292", DT = "_93p6293", zT = "_93p6294", OT = "_93p6295", kT = "_93p6296", LT = "_93p6297", UT = "_93p6298", BT = "_93p6299", VT = "_93p629a", $T = "_93p629b", HT = "_93p629c", qT = "_93p629d", IT = "_93p629e";
function FT() {
  const { deployments: t } = Nl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ d.jsxs("main", { className: _T, children: [
    /* @__PURE__ */ d.jsxs("header", { className: AT, children: [
      /* @__PURE__ */ d.jsx("p", { className: DT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ d.jsxs("h1", { className: zT, children: [
        "Direct your characters.",
        /* @__PURE__ */ d.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: OT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ d.jsxs("p", { className: kT, children: [
        /* @__PURE__ */ d.jsx("span", { className: LT, children: t.length }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs(
      La,
      {
        density: "airy",
        elevation: "raised",
        className: UT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ d.jsx("h2", { id: "deployments-section-list", className: Pr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ d.jsx(
            Tl,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ d.jsx("ul", { className: BT, children: t.map((i) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(zc, { to: `/${i.deploymentId}/recipe`, className: VT, children: [
            /* @__PURE__ */ d.jsx("span", { className: $T, "aria-hidden": "true", children: YT(i.displayName) }),
            /* @__PURE__ */ d.jsxs("span", { children: [
              /* @__PURE__ */ d.jsx("span", { className: HT, children: i.displayName }),
              /* @__PURE__ */ d.jsx("span", { className: qT, children: i.deploymentId })
            ] }),
            /* @__PURE__ */ d.jsx("span", { className: IT, "aria-hidden": "true", children: "→" })
          ] }) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function YT(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Lh = Xb();
const GT = /* @__PURE__ */ Gb(Lh);
function XT(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const PT = (t) => {
  switch (t) {
    case "success":
      return ZT;
    case "info":
      return WT;
    case "warning":
      return JT;
    case "error":
      return eC;
    default:
      return null;
  }
}, KT = Array(12).fill(0), QT = ({ visible: t, className: a }) => /* @__PURE__ */ me.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ me.createElement("div", {
  className: "sonner-spinner"
}, KT.map((i, l) => /* @__PURE__ */ me.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), ZT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), JT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), WT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), eC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), tC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ me.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ me.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), nC = () => {
  const [t, a] = me.useState(document.hidden);
  return me.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let Xf = 1;
class aC {
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
      const { message: l, ...o } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Xf++, h = this.toasts.find((v) => v.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), h ? this.toasts = this.toasts.map((v) => v.id === u ? (this.publish({
        ...v,
        ...a,
        id: u,
        title: l
      }), {
        ...v,
        ...a,
        id: u,
        dismissible: m,
        title: l
      }) : v) : this.addToast({
        title: l,
        ...o,
        dismissible: m,
        id: u
      }), u;
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
      let u = l !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], me.isValidElement(p))
          u = !1, this.create({
            id: l,
            type: "default",
            message: p
          });
        else if (iC(p) && !p.ok) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, S = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, w = typeof g == "object" && !me.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...w
          });
        } else if (p instanceof Error) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(p) : i.error, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof g == "object" && !me.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...w
          });
        } else if (i.success !== void 0) {
          u = !1;
          const g = typeof i.success == "function" ? await i.success(p) : i.success, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof g == "object" && !me.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "success",
            description: S,
            ...w
          });
        }
      }).catch(async (p) => {
        if (h = [
          "reject",
          p
        ], i.error !== void 0) {
          u = !1;
          const x = typeof i.error == "function" ? await i.error(p) : i.error, g = typeof i.description == "function" ? await i.description(p) : i.description, E = typeof x == "object" && !me.isValidElement(x) ? x : {
            message: x
          };
          this.create({
            id: l,
            type: "error",
            description: g,
            ...E
          });
        }
      }).finally(() => {
        u && (this.dismiss(l), l = void 0), i.finally == null || i.finally.call(i);
      }), v = () => new Promise((p, x) => m.then(() => h[0] === "reject" ? x(h[1]) : p(h[1])).catch(x));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: v
      } : Object.assign(l, {
        unwrap: v
      });
    }, this.custom = (a, i) => {
      const l = i?.id || Xf++;
      return this.create({
        jsx: a(l),
        id: l,
        ...i
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const xn = new aC(), rC = (t, a) => {
  const i = a?.id || Xf++;
  return xn.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, iC = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", sC = rC, lC = () => xn.toasts, oC = () => xn.getActiveToasts(), Zt = Object.assign(sC, {
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
  getHistory: lC,
  getToasts: oC
});
XT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Go(t) {
  return t.label !== void 0;
}
const cC = 3, uC = "24px", dC = "16px", Ay = 4e3, fC = 356, hC = 14, mC = 45, pC = 200;
function ma(...t) {
  return t.filter(Boolean).join(" ");
}
function gC(t) {
  const [a, i] = t.split("-"), l = [];
  return a && l.push(a), i && l.push(i), l;
}
const vC = (t) => {
  var a, i, l, o, u, h, m, v, p;
  const { invert: x, toast: g, unstyled: S, interacting: E, setHeights: w, visibleToasts: N, heights: R, index: T, toasts: k, expanded: _, removeToast: A, defaultRichColors: Z, closeButton: W, style: ne, cancelButtonStyle: D, actionButtonStyle: q, className: I = "", descriptionClassName: ie = "", duration: re, position: te, gap: ce, expandByDefault: J, classNames: O, icons: C, closeButtonAriaLabel: U = "Close toast" } = t, [B, K] = me.useState(null), [M, Q] = me.useState(null), [X, le] = me.useState(!1), [fe, ve] = me.useState(!1), [Ae, Me] = me.useState(!1), [$e, Jt] = me.useState(!1), [Pt, At] = me.useState(!1), [et, pt] = me.useState(0), [he, ke] = me.useState(0), De = me.useRef(g.duration || re || Ay), Te = me.useRef(null), bt = me.useRef(null), xt = T === 0, dn = T + 1 <= N, Ht = g.type, On = g.dismissible !== !1, qt = g.className || "", ye = g.descriptionClassName || "", ze = me.useMemo(() => R.findIndex((Oe) => Oe.toastId === g.id) || 0, [
    R,
    g.id
  ]), Qe = me.useMemo(() => {
    var Oe;
    return (Oe = g.closeButton) != null ? Oe : W;
  }, [
    g.closeButton,
    W
  ]), nt = me.useMemo(() => g.duration || re || Ay, [
    g.duration,
    re
  ]), It = me.useRef(0), Ft = me.useRef(0), jr = me.useRef(0), sa = me.useRef(null), [Zn, Wt] = te.split("-"), Tt = me.useMemo(() => R.reduce((Oe, ut, Dt) => Dt >= ze ? Oe : Oe + ut.height, 0), [
    R,
    ze
  ]), Yt = nC(), ei = g.invert || x, Ha = Ht === "loading";
  Ft.current = me.useMemo(() => ze * ce + Tt, [
    ze,
    Tt
  ]), me.useEffect(() => {
    De.current = nt;
  }, [
    nt
  ]), me.useEffect(() => {
    le(!0);
  }, []), me.useEffect(() => {
    const Oe = bt.current;
    if (Oe) {
      const ut = Oe.getBoundingClientRect().height;
      return ke(ut), w((Dt) => [
        {
          toastId: g.id,
          height: ut,
          position: g.position
        },
        ...Dt
      ]), () => w((Dt) => Dt.filter((Gt) => Gt.toastId !== g.id));
    }
  }, [
    w,
    g.id
  ]), me.useLayoutEffect(() => {
    if (!X) return;
    const Oe = bt.current, ut = Oe.style.height;
    Oe.style.height = "auto";
    const Dt = Oe.getBoundingClientRect().height;
    Oe.style.height = ut, ke(Dt), w((Gt) => Gt.find((it) => it.toastId === g.id) ? Gt.map((it) => it.toastId === g.id ? {
      ...it,
      height: Dt
    } : it) : [
      {
        toastId: g.id,
        height: Dt,
        position: g.position
      },
      ...Gt
    ]);
  }, [
    X,
    g.title,
    g.description,
    w,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const kn = me.useCallback(() => {
    ve(!0), pt(Ft.current), w((Oe) => Oe.filter((ut) => ut.toastId !== g.id)), setTimeout(() => {
      A(g);
    }, pC);
  }, [
    g,
    A,
    w,
    Ft
  ]);
  me.useEffect(() => {
    if (g.promise && Ht === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let Oe;
    return _ || E || Yt ? (() => {
      if (jr.current < It.current) {
        const Gt = (/* @__PURE__ */ new Date()).getTime() - It.current;
        De.current = De.current - Gt;
      }
      jr.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      De.current !== 1 / 0 && (It.current = (/* @__PURE__ */ new Date()).getTime(), Oe = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), kn();
      }, De.current));
    })(), () => clearTimeout(Oe);
  }, [
    _,
    E,
    g,
    Ht,
    Yt,
    kn
  ]), me.useEffect(() => {
    g.delete && (kn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    kn,
    g.delete
  ]);
  function ga() {
    var Oe;
    if (C?.loading) {
      var ut;
      return /* @__PURE__ */ me.createElement("div", {
        className: ma(O?.loader, g == null || (ut = g.classNames) == null ? void 0 : ut.loader, "sonner-loader"),
        "data-visible": Ht === "loading"
      }, C.loading);
    }
    return /* @__PURE__ */ me.createElement(QT, {
      className: ma(O?.loader, g == null || (Oe = g.classNames) == null ? void 0 : Oe.loader),
      visible: Ht === "loading"
    });
  }
  const Jn = g.icon || C?.[Ht] || PT(Ht);
  var la, hn;
  return /* @__PURE__ */ me.createElement("li", {
    tabIndex: 0,
    ref: bt,
    className: ma(I, qt, O?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, O?.default, O?.[Ht], g == null || (i = g.classNames) == null ? void 0 : i[Ht]),
    "data-sonner-toast": "",
    "data-rich-colors": (la = g.richColors) != null ? la : Z,
    "data-styled": !(g.jsx || g.unstyled || S),
    "data-mounted": X,
    "data-promise": !!g.promise,
    "data-swiped": Pt,
    "data-removed": fe,
    "data-visible": dn,
    "data-y-position": Zn,
    "data-x-position": Wt,
    "data-index": T,
    "data-front": xt,
    "data-swiping": Ae,
    "data-dismissible": On,
    "data-type": Ht,
    "data-invert": ei,
    "data-swipe-out": $e,
    "data-swipe-direction": M,
    "data-expanded": !!(_ || J && X),
    "data-testid": g.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": k.length - T,
      "--offset": `${fe ? et : Ft.current}px`,
      "--initial-height": J ? "auto" : `${he}px`,
      ...ne,
      ...g.style
    },
    onDragEnd: () => {
      Me(!1), K(null), sa.current = null;
    },
    onPointerDown: (Oe) => {
      Oe.button !== 2 && (Ha || !On || (Te.current = /* @__PURE__ */ new Date(), pt(Ft.current), Oe.target.setPointerCapture(Oe.pointerId), Oe.target.tagName !== "BUTTON" && (Me(!0), sa.current = {
        x: Oe.clientX,
        y: Oe.clientY
      })));
    },
    onPointerUp: () => {
      var Oe, ut, Dt;
      if ($e || !On) return;
      sa.current = null;
      const Gt = Number(((Oe = bt.current) == null ? void 0 : Oe.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((ut = bt.current) == null ? void 0 : ut.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), it = (/* @__PURE__ */ new Date()).getTime() - ((Dt = Te.current) == null ? void 0 : Dt.getTime()), en = B === "x" ? Gt : wn, va = Math.abs(en) / it;
      if (Math.abs(en) >= mC || va > 0.11) {
        pt(Ft.current), g.onDismiss == null || g.onDismiss.call(g, g), Q(B === "x" ? Gt > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), kn(), Jt(!0);
        return;
      } else {
        var sn, z;
        (sn = bt.current) == null || sn.style.setProperty("--swipe-amount-x", "0px"), (z = bt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      At(!1), Me(!1), K(null);
    },
    onPointerMove: (Oe) => {
      var ut, Dt, Gt;
      if (!sa.current || !On || ((ut = window.getSelection()) == null ? void 0 : ut.toString().length) > 0) return;
      const it = Oe.clientY - sa.current.y, en = Oe.clientX - sa.current.x;
      var va;
      const sn = (va = t.swipeDirections) != null ? va : gC(te);
      !B && (Math.abs(en) > 1 || Math.abs(it) > 1) && K(Math.abs(en) > Math.abs(it) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const $ = (F) => 1 / (1.5 + Math.abs(F) / 20);
      if (B === "y") {
        if (sn.includes("top") || sn.includes("bottom"))
          if (sn.includes("top") && it < 0 || sn.includes("bottom") && it > 0)
            z.y = it;
          else {
            const F = it * $(it);
            z.y = Math.abs(F) < Math.abs(it) ? F : it;
          }
      } else if (B === "x" && (sn.includes("left") || sn.includes("right")))
        if (sn.includes("left") && en < 0 || sn.includes("right") && en > 0)
          z.x = en;
        else {
          const F = en * $(en);
          z.x = Math.abs(F) < Math.abs(en) ? F : en;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && At(!0), (Dt = bt.current) == null || Dt.style.setProperty("--swipe-amount-x", `${z.x}px`), (Gt = bt.current) == null || Gt.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Qe && !g.jsx && Ht !== "loading" ? /* @__PURE__ */ me.createElement("button", {
    "aria-label": U,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !On ? () => {
    } : () => {
      kn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: ma(O?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (hn = C?.close) != null ? hn : tC) : null, (Ht || g.icon || g.promise) && g.icon !== null && (C?.[Ht] !== null || g.icon) ? /* @__PURE__ */ me.createElement("div", {
    "data-icon": "",
    className: ma(O?.icon, g == null || (o = g.classNames) == null ? void 0 : o.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ga() : null, g.type !== "loading" ? Jn : null) : null, /* @__PURE__ */ me.createElement("div", {
    "data-content": "",
    className: ma(O?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ me.createElement("div", {
    "data-title": "",
    className: ma(O?.title, g == null || (h = g.classNames) == null ? void 0 : h.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ me.createElement("div", {
    "data-description": "",
    className: ma(ie, ye, O?.description, g == null || (m = g.classNames) == null ? void 0 : m.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ me.isValidElement(g.cancel) ? g.cancel : g.cancel && Go(g.cancel) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || D,
    onClick: (Oe) => {
      Go(g.cancel) && On && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, Oe), kn());
    },
    className: ma(O?.cancelButton, g == null || (v = g.classNames) == null ? void 0 : v.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ me.isValidElement(g.action) ? g.action : g.action && Go(g.action) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || q,
    onClick: (Oe) => {
      Go(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, Oe), !Oe.defaultPrevented && kn());
    },
    className: ma(O?.actionButton, g == null || (p = g.classNames) == null ? void 0 : p.actionButton)
  }, g.action.label) : null);
};
function Dy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function yC(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((l, o) => {
    const u = o === 1, h = u ? "--mobile-offset" : "--offset", m = u ? dC : uC;
    function v(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((x) => {
        i[`${h}-${x}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof l == "number" || typeof l == "string" ? v(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      l[p] === void 0 ? i[`${h}-${p}`] = m : i[`${h}-${p}`] = typeof l[p] == "number" ? `${l[p]}px` : l[p];
    }) : v(m);
  }), i;
}
const bC = /* @__PURE__ */ me.forwardRef(function(a, i) {
  const { id: l, invert: o, position: u = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: v, className: p, offset: x, mobileOffset: g, theme: S = "light", richColors: E, duration: w, style: N, visibleToasts: R = cC, toastOptions: T, dir: k = Dy(), gap: _ = hC, icons: A, containerAriaLabel: Z = "Notifications" } = a, [W, ne] = me.useState([]), D = me.useMemo(() => l ? W.filter((X) => X.toasterId === l) : W.filter((X) => !X.toasterId), [
    W,
    l
  ]), q = me.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((X) => X.position).map((X) => X.position)))), [
    D,
    u
  ]), [I, ie] = me.useState([]), [re, te] = me.useState(!1), [ce, J] = me.useState(!1), [O, C] = me.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = me.useRef(null), B = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), K = me.useRef(null), M = me.useRef(!1), Q = me.useCallback((X) => {
    ne((le) => {
      var fe;
      return (fe = le.find((ve) => ve.id === X.id)) != null && fe.delete || xn.dismiss(X.id), le.filter(({ id: ve }) => ve !== X.id);
    });
  }, []);
  return me.useEffect(() => xn.subscribe((X) => {
    if (X.dismiss) {
      requestAnimationFrame(() => {
        ne((le) => le.map((fe) => fe.id === X.id ? {
          ...fe,
          delete: !0
        } : fe));
      });
      return;
    }
    setTimeout(() => {
      GT.flushSync(() => {
        ne((le) => {
          const fe = le.findIndex((ve) => ve.id === X.id);
          return fe !== -1 ? [
            ...le.slice(0, fe),
            {
              ...le[fe],
              ...X
            },
            ...le.slice(fe + 1)
          ] : [
            X,
            ...le
          ];
        });
      });
    });
  }), [
    W
  ]), me.useEffect(() => {
    if (S !== "system") {
      C(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? C("dark") : C("light")), typeof window > "u") return;
    const X = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      X.addEventListener("change", ({ matches: le }) => {
        C(le ? "dark" : "light");
      });
    } catch {
      X.addListener(({ matches: fe }) => {
        try {
          C(fe ? "dark" : "light");
        } catch (ve) {
          console.error(ve);
        }
      });
    }
  }, [
    S
  ]), me.useEffect(() => {
    W.length <= 1 && te(!1);
  }, [
    W
  ]), me.useEffect(() => {
    const X = (le) => {
      var fe;
      if (h.every((Me) => le[Me] || le.code === Me)) {
        var Ae;
        te(!0), (Ae = U.current) == null || Ae.focus();
      }
      le.code === "Escape" && (document.activeElement === U.current || (fe = U.current) != null && fe.contains(document.activeElement)) && te(!1);
    };
    return document.addEventListener("keydown", X), () => document.removeEventListener("keydown", X);
  }, [
    h
  ]), me.useEffect(() => {
    if (U.current)
      return () => {
        K.current && (K.current.focus({
          preventScroll: !0
        }), K.current = null, M.current = !1);
      };
  }, [
    U.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ me.createElement("section", {
    ref: i,
    "aria-label": `${Z} ${B}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, q.map((X, le) => {
    var fe;
    const [ve, Ae] = X.split("-");
    return D.length ? /* @__PURE__ */ me.createElement("ol", {
      key: X,
      dir: k === "auto" ? Dy() : k,
      tabIndex: -1,
      ref: U,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": O,
      "data-y-position": ve,
      "data-x-position": Ae,
      style: {
        "--front-toast-height": `${((fe = I[0]) == null ? void 0 : fe.height) || 0}px`,
        "--width": `${fC}px`,
        "--gap": `${_}px`,
        ...N,
        ...yC(x, g)
      },
      onBlur: (Me) => {
        M.current && !Me.currentTarget.contains(Me.relatedTarget) && (M.current = !1, K.current && (K.current.focus({
          preventScroll: !0
        }), K.current = null));
      },
      onFocus: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || M.current || (M.current = !0, K.current = Me.relatedTarget);
      },
      onMouseEnter: () => te(!0),
      onMouseMove: () => te(!0),
      onMouseLeave: () => {
        ce || te(!1);
      },
      onDragEnd: () => te(!1),
      onPointerDown: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || J(!0);
      },
      onPointerUp: () => J(!1)
    }, D.filter((Me) => !Me.position && le === 0 || Me.position === X).map((Me, $e) => {
      var Jt, Pt;
      return /* @__PURE__ */ me.createElement(vC, {
        key: Me.id,
        icons: A,
        index: $e,
        toast: Me,
        defaultRichColors: E,
        duration: (Jt = T?.duration) != null ? Jt : w,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Pt = T?.closeButton) != null ? Pt : v,
        interacting: ce,
        position: X,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: Q,
        toasts: D.filter((At) => At.position == Me.position),
        heights: I.filter((At) => At.position == Me.position),
        setHeights: ie,
        expandByDefault: m,
        gap: _,
        expanded: re,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), zy = 32, Oy = -30, ky = -6, Ly = 0.5, Uy = 2, By = -24, Vy = 24, $y = -12, Hy = 12, qy = -12, Iy = 12, Fy = -60, Yy = -20;
class Ki extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Rx(t, a, i, l = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${$a}${o}`, h = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), v = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Ki(v, p);
  }
  if (!h.ok)
    throw new Error(await Oc(h, "apply"));
  return await h.json();
}
async function xC(t, a, i, l, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${$a}${u}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const v = await m.json().catch(() => null), p = v?.error?.current_digest ?? "", x = v?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Ki(p, x);
  }
  if (!m.ok)
    throw new Error(await Oc(m, "apply"));
  return await m.json();
}
async function SC(t, a, i = {}) {
  const l = `${$a}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(l, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function wC(t, a, i, l = {}) {
  const o = `${$a}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Oc(u, "preview"));
  return u.blob();
}
async function uc(t, a, i, l = 50, o = {}) {
  const u = `${$a}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(l))}`, h = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Oc(h, "audit fetch"));
  return await h.json();
}
function Sn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Mx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > zy)
    return {
      message: `Chain exceeds the maximum of ${zy} operations.`
    };
  for (const i of t.ops) {
    const l = EC(i, a);
    if (l) return l;
  }
  return null;
}
function EC(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return jC(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Oy || t.target_lufs > ky ? {
        opId: t.id,
        message: `Normalize target must be between ${Oy} and ${ky} LUFS.`
      } : null;
    case "speed":
      return t.factor < Ly || t.factor > Uy ? {
        opId: t.id,
        message: `Speed factor must be between ${Ly}× and ${Uy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < By || t.gain_db > Vy ? {
        opId: t.id,
        message: `Volume must be between ${By} and ${Vy} dB.`
      } : null;
    case "eq3":
      for (const [i, l] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (l < $y || l > Hy)
          return {
            opId: t.id,
            message: `EQ ${i} must be between ${$y} and ${Hy} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < qy || t.semitones > Iy ? {
        opId: t.id,
        message: `Pitch must be between ${qy} and ${Iy} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < Fy || t.threshold_db > Yy ? {
        opId: t.id,
        message: `Silence threshold must be between ${Fy} and ${Yy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function jC(t, a, i, l) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: t, message: "End must be greater than start." } : l > 0 && i > l ? { opId: t, message: "End extends past source duration." } : null;
}
async function Oc(t, a) {
  const i = await t.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${t.status}`;
}
var NC = "g5r6d10", TC = "g5r6d11", CC = "g5r6d12", RC = "g5r6d13", MC = "g5r6d14", _C = "g5r6d15", AC = "g5r6d1a", DC = "g5r6d1b", zC = "g5r6d1c", OC = "g5r6d1d", kC = "g5r6d1e", LC = "g5r6d1g", UC = "g5r6d1h", BC = "g5r6d1i", VC = "g5r6d1j", $C = "g5r6d1k", HC = "g5r6d1l", qC = "g5r6d1m", IC = "g5r6d1n", FC = "g5r6d1o", Gy = "g5r6d1p", YC = "g5r6d1q", GC = "g5r6d1r", XC = "g5r6d1s", Xy = "g5r6d1t", Py = "g5r6d1u", PC = "g5r6d1v", KC = "g5r6d1w", Fi = "g5r6d1x", QC = "g5r6d1y", Ky = "g5r6d1z", ZC = "g5r6d110", JC = "g5r6d111", fr = "g5r6d112", WC = "g5r6d117", eR = "a6ki8u0", tR = "a6ki8u1", nR = "a6ki8u2", aR = "a6ki8u3", rR = "a6ki8u4", iR = "a6ki8u5", sR = "a6ki8u6", lf = "a6ki8u7", lR = "a6ki8u8", oR = "a6ki8u9", cR = "a6ki8ua", uR = "a6ki8ub", dR = "a6ki8uc", fR = "a6ki8ud", hR = "a6ki8ue", mR = "a6ki8uf", pR = "a6ki8ug", gR = "a6ki8uh", vR = "_1lguv7x0", yR = "_1lguv7x1", bR = "_1lguv7x2", xR = "_1lguv7x3", SR = "_1lguv7x4", wR = "_1lguv7x5", ER = "_1lguv7x6", jR = "_1lguv7x7", NR = "_1lguv7x8", TR = "_1lguv7x9", CR = "_1lguv7xa", RR = "_1lguv7xb", MR = "_1lguv7xc", Qy = "_1lguv7xd", _R = "_1lguv7xe", AR = "_1lguv7xf", DR = "_1lguv7xg", zR = "_1lguv7xh", _x = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Ax = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, OR = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, kR = "_4ydn54f";
function Ve({
  variant: t = "primary",
  size: a = "md",
  type: i = "button",
  loading: l = !1,
  iconOnly: o = !1,
  disabled: u,
  children: h,
  className: m,
  style: v,
  ...p
}) {
  const x = [
    _x[t],
    Ax[a],
    o ? OR[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsxs(
    "button",
    {
      type: i,
      className: x,
      style: v,
      disabled: l || u,
      "aria-busy": l || void 0,
      ...p,
      children: [
        l ? /* @__PURE__ */ d.jsx("span", { className: kR, "aria-hidden": "true" }) : null,
        h
      ]
    }
  );
}
const LR = 28;
function UR(t) {
  if (!t) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(t.length, 12); i++)
    a = a * 33 + t.charCodeAt(i) >>> 0;
  return a || 1;
}
function BR(t, a) {
  const i = new Array(a);
  let l = t;
  for (let o = 0; o < a; o++) {
    l = (l * 9301 + 49297) % 233280;
    const u = l / 233280, h = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, h * (0.32 + u * 0.68));
  }
  return i;
}
function VR(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function $R(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function HR({
  asset: t,
  presentation: a,
  usedBy: i,
  isPlaying: l,
  onTogglePlay: o,
  onRename: u,
  onCopyName: h,
  onDelete: m,
  onPlaybackEnded: v
}) {
  const [p, x] = y.useState(!1), [g, S] = y.useState(t.displayName), E = y.useRef(null), w = y.useMemo(() => UR(t.contentSha256), [t.contentSha256]), N = y.useMemo(() => BR(w, LR), [w]), R = y.useMemo(() => bT(t), [t]);
  y.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), y.useEffect(() => {
    const _ = E.current;
    _ && (l && R ? _.play().catch(() => {
    }) : (_.pause(), _.currentTime = 0));
  }, [l, R]);
  const T = async () => {
    const _ = g.trim();
    if (!_ || _ === t.displayName) {
      x(!1), S(t.displayName);
      return;
    }
    try {
      await u(_);
    } finally {
      x(!1);
    }
  }, k = `${VR(t.durationMs)} · ${$R(t.sampleRate)}`;
  return /* @__PURE__ */ d.jsxs("article", { className: vR, "data-playing": l ? "true" : "false", children: [
    /* @__PURE__ */ d.jsxs("header", { className: yR, children: [
      /* @__PURE__ */ d.jsx("span", { className: bR, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ d.jsxs("div", { className: xR, children: [
        p ? /* @__PURE__ */ d.jsx(
          "input",
          {
            className: wR,
            value: g,
            autoFocus: !0,
            onChange: (_) => S(_.target.value),
            onBlur: () => {
              T();
            },
            onKeyDown: (_) => {
              _.key === "Enter" ? (_.preventDefault(), _.currentTarget.blur()) : _.key === "Escape" && (x(!1), S(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: SR,
            onDoubleClick: () => x(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: ER, children: k })
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: jR, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: NR,
        "data-playing": l ? "true" : "false",
        disabled: R == null,
        title: R ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": l ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ d.jsx("span", { className: TR, "aria-hidden": "true", children: l ? "❚❚" : "▶" }),
          /* @__PURE__ */ d.jsx("span", { className: CR, "aria-hidden": "true", children: N.map((_, A) => /* @__PURE__ */ d.jsx("span", { className: RR, style: { height: `${Math.round(_ * 100)}%` } }, A)) })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("footer", { className: MR, children: [
      i.length > 0 ? /* @__PURE__ */ d.jsxs("span", { className: Qy, children: [
        /* @__PURE__ */ d.jsx("span", { children: "used by" }),
        i.map((_) => /* @__PURE__ */ d.jsx(
          "span",
          {
            className: _R,
            style: { color: _.color, borderColor: _.color },
            children: _.characterName
          },
          _.characterName
        ))
      ] }) : /* @__PURE__ */ d.jsx("span", { className: Qy, children: "unassigned" }),
      /* @__PURE__ */ d.jsxs("span", { className: AR, children: [
        /* @__PURE__ */ d.jsx(
          Ve,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Rename",
            "aria-label": "Rename voice",
            onClick: () => x(!0),
            children: "✎"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Ve,
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
        m && /* @__PURE__ */ d.jsx(
          Ve,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: DR,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }),
    R && /* @__PURE__ */ d.jsx(
      "audio",
      {
        ref: E,
        src: R,
        preload: "none",
        className: zR,
        onEnded: v
      }
    )
  ] });
}
var qR = "_17eol302", IR = "_17eol303", FR = "_17eol304", YR = "_17eol305", GR = "_17eol306", XR = "_17eol307", Xo = "_17eol308", PR = "_17eol309", KR = "_17eol30a", QR = "_17eol30b", ZR = "_17eol30c", JR = "_17eol30d", Zy = "_17eol30e", WR = "_17eol30g";
function eM() {
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
function tM(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function nM({
  open: t,
  defaultName: a,
  onClose: i,
  onSubmit: l
}) {
  const [o, u] = y.useState("idle"), [h, m] = y.useState(null), [v, p] = y.useState(0), [x, g] = y.useState(null), [S, E] = y.useState(a), [w, N] = y.useState(!1), R = y.useRef(null), T = y.useRef(null), k = y.useRef([]), _ = y.useRef(0), A = y.useRef(null), Z = y.useRef(null), W = y.useRef({ mime: "audio/webm", ext: "webm" }), ne = y.useRef(null), D = y.useRef(null), q = y.useRef(null);
  y.useEffect(() => {
    if (t)
      return q.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ne.current?.scrollIntoView({ behavior: "smooth", block: "center" }), D.current?.focus();
      }), () => {
        q.current?.focus?.();
      };
  }, [t]), y.useEffect(() => {
    if (!t) return;
    const C = (U) => {
      U.key === "Escape" && i();
    };
    return window.addEventListener("keydown", C), () => window.removeEventListener("keydown", C);
  }, [t, i]);
  const I = y.useCallback(
    (C) => {
      if (C.key !== "Tab") return;
      const U = ne.current;
      if (!U) return;
      const B = U.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (B.length === 0) return;
      const K = B[0], M = B[B.length - 1], Q = document.activeElement;
      C.shiftKey ? (Q === K || Q === U) && (C.preventDefault(), M.focus()) : Q === M && (C.preventDefault(), K.focus());
    },
    []
  ), ie = y.useCallback(() => {
    if (T.current) {
      for (const C of T.current.getTracks()) C.stop();
      T.current = null;
    }
    A.current != null && (window.clearInterval(A.current), A.current = null);
  }, []), re = y.useCallback(() => {
    ie(), x && URL.revokeObjectURL(x), g(null), k.current = [], Z.current = null, p(0), m(null), u("idle");
  }, [x, ie]);
  if (y.useEffect(() => {
    t || (re(), E(a));
  }, [t, a, re]), y.useEffect(() => () => {
    ie(), x && URL.revokeObjectURL(x);
  }, [x, ie]), !t) return null;
  const te = async () => {
    m(null), u("preparing");
    try {
      const C = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = C;
      const U = eM();
      W.current = U;
      const B = U.mime ? new MediaRecorder(C, { mimeType: U.mime }) : new MediaRecorder(C);
      R.current = B, k.current = [], B.ondataavailable = (K) => {
        K.data && K.data.size > 0 && k.current.push(K.data);
      }, B.onstop = () => {
        const K = U.mime || "audio/webm", M = new Blob(k.current, { type: K }), Q = new File([M], `${S || a || "recording"}.${U.ext}`, {
          type: K
        });
        Z.current = Q;
        const X = URL.createObjectURL(M);
        g(X), u("ready"), ie();
      }, B.start(), _.current = Date.now(), p(0), A.current = window.setInterval(() => {
        p(Date.now() - _.current);
      }, 200), u("recording");
    } catch (C) {
      const U = C instanceof Error ? C.message : "could not access microphone";
      m(U), u(U.toLowerCase().includes("denied") ? "denied" : "error"), ie();
    }
  }, ce = () => {
    const C = R.current;
    C && C.state !== "inactive" && C.stop(), A.current != null && (window.clearInterval(A.current), A.current = null);
  }, J = async () => {
    const C = Z.current;
    if (!C) return;
    const U = (S || a).trim();
    if (!U) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await l(C, U), i();
    } catch (B) {
      m(B instanceof Error ? B.message : "upload failed");
    } finally {
      N(!1);
    }
  }, O = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ d.jsx("div", { className: qR, role: "presentation", onClick: i, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: ne,
      className: IR,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (C) => C.stopPropagation(),
      onKeyDown: I,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ d.jsx("h2", { id: "mic-recorder-heading", className: FR, children: "Record reference audio" }),
        /* @__PURE__ */ d.jsx("p", { className: YR, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: GR,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: O
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: ZR, "aria-live": "polite", children: tM(v) }),
        /* @__PURE__ */ d.jsxs("div", { className: XR, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ d.jsxs(
            "button",
            {
              ref: D,
              type: "button",
              className: Xo,
              "data-tone": "danger",
              onClick: () => {
                te();
              },
              children: [
                /* @__PURE__ */ d.jsx("span", { className: Zy, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ d.jsx("button", { type: "button", className: Xo, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ d.jsxs(
            "button",
            {
              type: "button",
              className: Xo,
              "data-tone": "danger",
              "data-active": "true",
              onClick: ce,
              children: [
                /* @__PURE__ */ d.jsx("span", { className: Zy, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: Xo,
              onClick: () => {
                re();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        x && /* @__PURE__ */ d.jsx("audio", { className: JR, src: x, controls: !0, preload: "auto" }),
        /* @__PURE__ */ d.jsxs("label", { className: PR, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: KR,
              value: S,
              onChange: (C) => E(C.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ d.jsx("div", { className: QR, children: h }),
        /* @__PURE__ */ d.jsxs("div", { className: WR, children: [
          /* @__PURE__ */ d.jsx(Ve, { variant: "ghost", size: "md", onClick: i, disabled: w, children: "Cancel" }),
          /* @__PURE__ */ d.jsx(
            Ve,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                J();
              },
              disabled: o !== "ready" || w,
              loading: w,
              children: w ? "Saving…" : "Save voice"
            }
          )
        ] })
      ]
    }
  ) });
}
function aM({
  deploymentId: t,
  voiceAssets: a,
  mappings: i,
  characterColors: l,
  onVoiceAssetsChange: o
}) {
  const [u, h] = y.useState(""), [m, v] = y.useState("all"), [p, x] = y.useState(!1), [g, S] = y.useState(null), [E, w] = y.useState(!1), [N, R] = y.useState(!1), T = y.useRef(null), k = y.useCallback(
    (te) => "upload",
    []
  ), _ = y.useMemo(() => {
    const te = u.trim().toLowerCase();
    return a.filter((ce) => {
      const J = k(ce);
      return !(m === "uploaded" && J !== "upload" || m === "preset" && J !== "preset" || te && !ce.displayName.toLowerCase().includes(te));
    });
  }, [a, u, m, k]), A = y.useMemo(
    () => a.filter((te) => k(te) === "upload").length,
    [a, k]
  ), Z = y.useCallback(
    (te) => {
      const ce = [], J = /* @__PURE__ */ new Set();
      for (const O of i)
        O.speakerVoiceAssetId === te && (J.has(O.characterName) || (J.add(O.characterName), ce.push({
          characterName: O.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: l[O.characterName] ?? "#ba9eff"
        })));
      return ce;
    },
    [i, l]
  ), W = y.useCallback(
    async (te) => {
      const ce = Array.from(te).slice(0, 8);
      if (ce.length !== 0) {
        R(!0);
        try {
          const J = [];
          for (const O of ce) {
            if (!O.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(O.name)) {
              Zt.error(`${O.name}: not an audio file`);
              continue;
            }
            const C = O.name.replace(/\.[^.]+$/, "");
            try {
              const U = await vc(t, O, C, "speaker");
              J.push(U), Zt.success(`Added ${U.displayName}`);
            } catch (U) {
              Zt.error(U instanceof Error ? U.message : `${O.name}: upload failed`);
            }
          }
          J.length > 0 && o([...J, ...a]);
        } finally {
          R(!1);
        }
      }
    },
    [t, a, o]
  ), ne = (te) => {
    te.preventDefault(), x(!1), te.dataTransfer?.files && W(te.dataTransfer.files);
  }, D = y.useCallback(async () => {
    const te = window.prompt("Paste an audio URL (https://…)");
    if (te)
      try {
        const ce = await fetch(te);
        if (!ce.ok) throw new Error(`fetch failed: ${ce.status}`);
        const J = await ce.blob(), O = te.split("/").pop()?.split("?")[0] ?? "voice.wav", C = new File([J], O, { type: J.type || "audio/wav" });
        await W([C]);
      } catch (ce) {
        Zt.error(ce instanceof Error ? ce.message : "could not fetch URL");
      }
  }, [W]), q = y.useCallback(
    async (te, ce) => {
      try {
        const J = await yT(t, te, ce);
        o(
          a.map((O) => O.voiceAssetId === te ? J : O)
        ), Zt.success(`Renamed to ${J.displayName}`);
      } catch (J) {
        Zt.error(J instanceof Error ? J.message : "rename failed");
      }
    },
    [t, a, o]
  ), I = y.useCallback((te) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(te), Zt.success("Copied name")) : Zt.error("Clipboard unavailable");
  }, []), ie = y.useCallback(
    async (te) => {
      if (window.confirm(`Delete "${te.displayName}"? Mappings using it will reset.`))
        try {
          await vT(t, te.voiceAssetId), o(a.filter((J) => J.voiceAssetId !== te.voiceAssetId)), Zt.success(`Deleted ${te.displayName}`);
        } catch (J) {
          Zt.error(J instanceof Error ? J.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ d.jsxs("div", { className: eR, children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: tR,
        "data-over": p ? "true" : "false",
        onDragOver: (te) => {
          te.preventDefault(), x(!0);
        },
        onDragLeave: () => x(!1),
        onDrop: ne,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: nR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ d.jsxs("div", { className: aR, children: [
            /* @__PURE__ */ d.jsxs("div", { className: rR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ d.jsx("span", { className: iR, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: sR, children: [
              "or",
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: lf,
                  onClick: () => T.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: lf,
                  onClick: () => {
                    D();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: lf,
                  onClick: () => w(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            Ve,
            {
              variant: "primary",
              size: "md",
              disabled: N,
              onClick: () => T.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              ref: T,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: gR,
              onChange: (te) => {
                te.target.files && (W(te.target.files), te.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: lR, children: [
      /* @__PURE__ */ d.jsxs("label", { className: oR, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            className: cR,
            value: u,
            onChange: (te) => h(te.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: uR, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([te, ce]) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: dR,
          "data-active": m === te ? "true" : "false",
          onClick: () => v(te),
          children: ce
        },
        te
      )) }),
      /* @__PURE__ */ d.jsxs("span", { className: mR, children: [
        /* @__PURE__ */ d.jsx("span", { className: pR, children: a.length }),
        " voices",
        /* @__PURE__ */ d.jsx("span", { children: "·" }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          A,
          " uploaded"
        ] })
      ] })
    ] }),
    _.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: hR, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ d.jsx("div", { className: fR, children: _.map((te) => {
      const ce = k(te);
      return /* @__PURE__ */ d.jsx(
        HR,
        {
          asset: te,
          presentation: ce,
          usedBy: Z(te.voiceAssetId),
          isPlaying: g === te.voiceAssetId,
          onTogglePlay: () => S((J) => J === te.voiceAssetId ? null : te.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (J) => q(te.voiceAssetId, J),
          onCopyName: () => I(te.displayName),
          onDelete: ce === "upload" ? () => void ie(te) : void 0
        },
        te.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ d.jsx(
      nM,
      {
        open: E,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => w(!1),
        onSubmit: async (te, ce) => {
          await re(te, ce);
        }
      }
    )
  ] });
  async function re(te, ce) {
    R(!0);
    try {
      const J = await vc(t, te, ce, "speaker");
      o([J, ...a]), Zt.success(`Recorded ${J.displayName}`);
    } catch (J) {
      throw Zt.error(J instanceof Error ? J.message : "upload failed"), J;
    } finally {
      R(!1);
    }
  }
}
async function Dx(t) {
  return ht(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function rM(t, a, i) {
  return ht("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: i })
  });
}
async function iM(t, a) {
  await ht(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var Jy = "_190jlds0", sM = "_190jlds1", lM = "_190jlds2", oM = "_190jlds3", cM = "_190jlds4", uM = "_190jlds5", dM = "_190jlds6", fM = "_190jlds7", hM = "_190jlds8", mM = "_190jlds9", Wy = "_190jldsa", pM = "_190jldsb", e0 = "_190jldsc", gM = "_190jldsd", vM = "_190jldse", yM = "_190jldsf";
function bM({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: l,
  emptyHint: o
}) {
  const [u, h] = y.useState(() => Ui(a[0])), [m, v] = y.useState([]), [p, x] = y.useState(!1), [g, S] = y.useState(null), [E, w] = y.useState(!1), [N, R] = y.useState(null), T = y.useMemo(
    () => a.find((A) => Ui(A) === u) ?? a[0],
    [a, u]
  );
  y.useEffect(() => {
    a.length && (a.some((A) => Ui(A) === u) || h(Ui(a[0])));
  }, [a, u]), y.useEffect(() => {
    if (!T) {
      v([]);
      return;
    }
    let A = !1;
    return x(!0), S(null), uc(t, T.kind, T.id, 50).then((Z) => {
      A || v(Z.entries);
    }).catch((Z) => {
      A || S(Z instanceof Error ? Z.message : "audit fetch failed");
    }).finally(() => {
      A || x(!1);
    }), () => {
      A = !0;
    };
  }, [t, T]);
  const k = y.useCallback(() => {
    if (!T) return;
    const A = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, Z = new Blob([JSON.stringify(A, null, 2)], {
      type: "application/json"
    }), W = URL.createObjectURL(Z), ne = document.createElement("a");
    ne.href = W, ne.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ne), ne.click(), document.body.removeChild(ne), URL.revokeObjectURL(W);
  }, [t, m, T]), _ = y.useCallback(async () => {
    if (!(!T || !i) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      w(!0);
      try {
        await i(T);
        const A = await uc(t, T.kind, T.id, 50);
        v(A.entries);
      } catch (A) {
        S(A instanceof Error ? A.message : "revert failed");
      } finally {
        w(!1);
      }
    }
  }, [t, i, T]);
  return a.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: Jy, children: /* @__PURE__ */ d.jsx("p", { className: e0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ d.jsxs("div", { className: Jy, children: [
    /* @__PURE__ */ d.jsxs("header", { className: sM, children: [
      /* @__PURE__ */ d.jsxs("div", { className: lM, children: [
        /* @__PURE__ */ d.jsx("label", { htmlFor: "audit-target-select", className: Wy, children: "Target" }),
        /* @__PURE__ */ d.jsx(
          "select",
          {
            id: "audit-target-select",
            className: oM,
            value: u,
            onChange: (A) => h(A.target.value),
            children: a.map((A) => /* @__PURE__ */ d.jsxs("option", { value: Ui(A), children: [
              A.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              A.label
            ] }, Ui(A)))
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: cM, children: [
        /* @__PURE__ */ d.jsx(
          Ve,
          {
            variant: "ghost",
            size: "sm",
            onClick: k,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ d.jsx(
          Ve,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void _(),
            disabled: E || !T,
            children: E ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    g && /* @__PURE__ */ d.jsx("div", { className: vM, children: g }),
    p && !g && /* @__PURE__ */ d.jsx("div", { className: yM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !g && m.length === 0 && /* @__PURE__ */ d.jsxs("p", { className: e0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ d.jsx("br", {}),
      /* @__PURE__ */ d.jsx("span", { className: gM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !g && m.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: uM, children: m.map((A) => {
      const Z = l && T && !!A.chain_snapshot_json && A.operation_count > 0;
      return /* @__PURE__ */ d.jsxs("li", { className: dM, children: [
        /* @__PURE__ */ d.jsx("span", { className: fM, children: xM(A.recorded_at) }),
        /* @__PURE__ */ d.jsx("span", { className: hM, children: A.operation_count === 0 ? "cleared" : `${A.operation_count} ops` }),
        /* @__PURE__ */ d.jsxs("span", { className: mM, title: A.digest_after, children: [
          A.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: Wy, children: A.actor || "—" }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: pM,
            style: {
              background: `color-mix(in oklab, ${A.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: A.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: A.digest_before === "" || !A.digest_before ? "create" : A.operation_count === 0 ? "clear" : "update"
          }
        ),
        Z && /* @__PURE__ */ d.jsx(
          Ve,
          {
            variant: "ghost",
            size: "xs",
            disabled: E || N !== null,
            onClick: async () => {
              if (!(!T || !A.chain_snapshot_json) && !(N !== null || E) && window.confirm(
                `Replay this ${A.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                R(A.entry_id);
                try {
                  await l(T, A.chain_snapshot_json, A);
                  const W = await uc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  v(W.entries);
                } catch (W) {
                  S(W instanceof Error ? W.message : "revert failed");
                } finally {
                  R(null);
                }
              }
            },
            children: N === A.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, A.entry_id);
    }) })
  ] });
}
function Ui(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function xM(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var SM = "_1uzgubz0", wM = "_1uzgubz1", EM = "_1uzgubz2", jM = "_1uzgubz3", NM = "_1uzgubz4", TM = "_1uzgubz5", CM = "_1uzgubz6", RM = "_1uzgubz7", t0 = "_1uzgubz8", MM = "_1uzgubz9", zx = "_1uzgubza", Ox = "_1uzgubzb", _M = "_1uzgubzc", AM = "_1uzgubzd", of = "_1uzgubze", cf = "_1uzgubzf", DM = "_1uzgubzg", zM = "_1uzgubzh", n0 = "_1uzgubzi", a0 = "_1uzgubzj", r0 = "_1uzgubzk", i0 = "_1uzgubzl", s0 = "_1uzgubzm", OM = "_1uzgubzn", kM = "_1uzgubzo", LM = "_1uzgubzp", UM = "_1uzgubzq";
function BM({
  characterName: t,
  color: a,
  lineCount: i,
  mapping: l,
  voiceAssets: o,
  presets: u,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: v,
  onAssignPreset: p,
  onUploadFile: x,
  onClearMapping: g
}) {
  const [S, E] = y.useState(!1), w = l ? o.find((k) => k.voiceAssetId === l.speakerVoiceAssetId) : null, N = l?.defaultVectorPresetId ? u.find((k) => k.presetId === l.defaultVectorPresetId) ?? null : null, R = (t[0] ?? "?").toUpperCase(), T = l !== null;
  return /* @__PURE__ */ d.jsxs("div", { className: `${SM}${h ? ` ${wM}` : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: EM,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: jM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: R
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: NM, children: [
            /* @__PURE__ */ d.jsx("span", { className: TM, style: { color: a }, children: t }),
            /* @__PURE__ */ d.jsxs("span", { className: CM, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: RM, children: [
            w ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: t0, children: w.displayName }),
              w.durationMs != null && /* @__PURE__ */ d.jsxs("span", { children: [
                l0(w.durationMs),
                " ·",
                " ",
                w.sampleRate ? `${w.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: t0, children: N.presetName }),
              /* @__PURE__ */ d.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ d.jsx("span", { children: "no voice assigned" }),
            l?.voiceAssetChainDigest && /* @__PURE__ */ d.jsxs("span", { className: _M, children: [
              "chain · ",
              l.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: `${MM} ${T ? zx : Ox}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ d.jsxs("div", { className: AM, children: [
      /* @__PURE__ */ d.jsxs("div", { className: of, children: [
        /* @__PURE__ */ d.jsx("span", { className: cf, children: "Drop new audio" }),
        /* @__PURE__ */ d.jsxs(
          "label",
          {
            className: `${DM}${S ? ` ${zM}` : ""}`,
            onDragEnter: (k) => {
              k.preventDefault(), E(!0);
            },
            onDragOver: (k) => k.preventDefault(),
            onDragLeave: () => E(!1),
            onDrop: (k) => {
              k.preventDefault(), E(!1);
              const _ = k.dataTransfer.files?.[0];
              _ && x && x(_);
            },
            children: [
              /* @__PURE__ */ d.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (k) => {
                    const _ = k.target.files?.[0];
                    _ && x && x(_);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: of, children: [
        /* @__PURE__ */ d.jsx("span", { className: cf, children: "Reference library" }),
        /* @__PURE__ */ d.jsx("div", { className: n0, children: o.map((k) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${a0}${l?.speakerVoiceAssetId === k.voiceAssetId ? ` ${r0}` : ""}`,
            onClick: () => v(k.voiceAssetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: i0, children: k.displayName }),
              /* @__PURE__ */ d.jsxs("span", { className: s0, children: [
                k.durationMs != null ? l0(k.durationMs) : "—",
                " ",
                "·",
                " ",
                k.sampleRate ? `${k.sampleRate} Hz` : "—"
              ] })
            ]
          },
          k.voiceAssetId
        )) })
      ] }),
      u.length > 0 && p && /* @__PURE__ */ d.jsxs("div", { className: of, children: [
        /* @__PURE__ */ d.jsx("span", { className: cf, children: "Preset voices" }),
        /* @__PURE__ */ d.jsx("div", { className: n0, children: u.map((k) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${a0}${l?.defaultVectorPresetId === k.presetId ? ` ${r0}` : ""}`,
            onClick: () => p(k.presetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: i0, children: k.presetName }),
              /* @__PURE__ */ d.jsx("span", { className: s0, children: "preset · vector" })
            ]
          },
          k.presetId
        )) })
      ] }),
      T && g && /* @__PURE__ */ d.jsx(Ve, { variant: "ghost", size: "sm", onClick: g, children: "Clear mapping →" })
    ] })
  ] });
}
function l0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function VM({
  unmappedCount: t,
  totalCount: a,
  children: i,
  emptyHint: l
}) {
  if (a === 0)
    return /* @__PURE__ */ d.jsx("p", { className: UM, children: l ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsx("header", { className: OM, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `${kM} ${o ? zx : Ox}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ d.jsx("ul", { className: LM, children: i })
  ] });
}
async function yc() {
  return ht("/runtime/health");
}
async function kx() {
  await ht("/runtime/start", { method: "POST" });
}
async function Lx() {
  return ht("/runtime/stop", { method: "POST" });
}
function Ux(t) {
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
var $M = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function zn({
  severity: t,
  children: a,
  role: i,
  ariaLive: l,
  className: o,
  style: u
}) {
  const h = [$M[t], o].filter(Boolean).join(" "), m = i ?? (t === "error" ? "alert" : "status"), v = l ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ d.jsx("div", { className: h, role: m, "aria-live": v, style: u, children: a });
}
var Bx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Vx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, HM = "_13bb4njb";
function Zr({
  tone: t,
  size: a = "sm",
  pulse: i = !1,
  children: l,
  className: o,
  style: u,
  title: h
}) {
  const m = i && t !== "faint", v = [Bx[a], Vx[t], m ? HM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("span", { className: v, style: u, title: h, children: l });
}
const qM = 4e3;
function IM({ deployment: t }) {
  const [a, i] = y.useState(null), [l, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const v = async () => {
      try {
        const x = await yc();
        m || (i(x), o(null));
      } catch (x) {
        m || o(GM(x));
      }
    };
    v();
    const p = setInterval(v, qM);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const u = a?.badge ?? "not_installed", h = l?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ d.jsxs("output", { className: QC, "aria-live": "polite", children: [
    /* @__PURE__ */ d.jsx("span", { className: Fi, children: "Runtime" }),
    /* @__PURE__ */ d.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ d.jsx("span", { className: Fi, children: "Badge" }),
    /* @__PURE__ */ d.jsx(Zr, { tone: FM(u), pulse: u === "starting" || u === "installing", children: Ux(u) }),
    a && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("span", { className: Fi, children: "Uptime" }),
      /* @__PURE__ */ d.jsx("span", { children: YM(a.uptimeSeconds) }),
      /* @__PURE__ */ d.jsx("span", { className: Fi, children: "VRAM" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    l && !h && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: l })
  ] });
}
function FM(t) {
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
function YM(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function GM(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
const bc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, kc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ua = 1e-3;
function XM(t, a, i) {
  for (const l of Object.keys(bc)) {
    const o = bc[l];
    if (Math.abs(o.low - t) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - i) < Ua)
      return l;
  }
  return "custom";
}
function PM(t) {
  let a = QM();
  for (const i of t.ops)
    a = KM(a, i);
  return a;
}
function KM(t, a) {
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
          preset: XM(a.low_db, a.mid_db, a.high_db)
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
function QM() {
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
function Er(t, a) {
  return [...t, a];
}
function ZM(t, a) {
  const i = wr(t, "gain");
  if (Math.abs(a) < Ua) return { ...t, ops: i };
  const l = { id: Sn(), mode: "gain", gain_db: a };
  return { ...t, ops: Er(i, l) };
}
function JM(t, a, i, l) {
  const o = wr(t, "eq3");
  if (Math.abs(a) < Ua && Math.abs(i) < Ua && Math.abs(l) < Ua)
    return { ...t, ops: o };
  const u = {
    id: Sn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: l
  };
  return { ...t, ops: Er(o, u) };
}
function WM(t, a) {
  const i = wr(t, "speed");
  if (Math.abs(a - 1) < Ua) return { ...t, ops: i };
  const l = { id: Sn(), mode: "speed", factor: a };
  return { ...t, ops: Er(i, l) };
}
function e_(t, a) {
  const i = wr(t, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Er(i, l) };
}
function t_(t, a, i) {
  const l = wr(t, "normalize");
  if (a === "off") return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...t, ops: Er(l, o) };
}
function n_(t, a) {
  const i = wr(t, "fade_in");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Er(i, l) };
}
function a_(t, a) {
  const i = wr(t, "fade_out");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Er(i, l) };
}
function r_(t, a, i) {
  const l = wr(t, "silence_strip");
  if (!a) return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...t, ops: Er(l, o) };
}
const $x = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function Hx(t, a) {
  const i = {
    ...t,
    ops: t.ops.filter((u) => !$x.has(u.mode))
  };
  let o = ZM({ version: 1, ops: [] }, a.volumeDb);
  return o = JM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = WM(o, a.speed.value)), o = e_(o, a.pitchSt), o = t_(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = n_(o, a.fade.inS), o = a_(o, a.fade.outS), o = r_(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function qx(t) {
  const a = {
    ...t,
    ops: t.ops.filter((i) => $x.has(i.mode))
  };
  return PM(a);
}
var i_ = "_1rsa80i0", s_ = "_1rsa80i1", l_ = "_1rsa80i2", o_ = "_1rsa80i3", c_ = "_1rsa80i4", u_ = "_1rsa80i5", d_ = "_1rsa80i6", f_ = "_1rsa80i7", h_ = "_1rsa80i8", m_ = "_1rsa80i9";
const Ix = ["flat", "warm", "bright", "voice", "telephone"], Zs = -12, Po = 12, p_ = 0.5;
function g_(t) {
  const { low: a, mid: i, high: l, preset: o, onChange: u, disabled: h } = t, m = (p) => {
    const x = bc[p];
    u(x.low, x.mid, x.high, p);
  }, v = (p, x) => {
    const g = { low: a, mid: i, high: l, [p]: x }, S = y_(g.low, g.mid, g.high);
    u(g.low, g.mid, g.high, S);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: i_, children: [
    /* @__PURE__ */ d.jsxs("div", { className: s_, role: "group", "aria-label": "EQ presets", children: [
      Ix.map((p) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: l_,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ d.jsx("span", { className: o_, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: c_, children: [
      /* @__PURE__ */ d.jsx(
        uf,
        {
          label: "Low",
          value: a,
          onChange: (p) => v("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        uf,
        {
          label: "Mid",
          value: i,
          onChange: (p) => v("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        uf,
        {
          label: "High",
          value: l,
          onChange: (p) => v("high", p),
          disabled: h
        }
      )
    ] })
  ] });
}
function uf({ label: t, value: a, onChange: i, disabled: l }) {
  const o = (a - Zs) / (Po - Zs) * 100, u = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: u_, children: [
    /* @__PURE__ */ d.jsx("label", { htmlFor: u, className: d_, children: t }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: Zs,
        max: Po,
        step: p_,
        value: a,
        disabled: l,
        className: h_,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": Zs,
        "aria-valuemax": Po,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: f_, children: v_(a) }),
    /* @__PURE__ */ d.jsxs("span", { className: m_, "aria-hidden": "true", children: [
      /* @__PURE__ */ d.jsx("span", { children: Zs }),
      /* @__PURE__ */ d.jsx("span", { children: "0" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "+",
        Po
      ] })
    ] })
  ] });
}
function v_(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const df = 1e-3;
function y_(t, a, i) {
  for (const l of Ix) {
    const o = bc[l];
    if (Math.abs(o.low - t) < df && Math.abs(o.mid - a) < df && Math.abs(o.high - i) < df)
      return l;
  }
  return "custom";
}
var b_ = "_85bhwb0", x_ = "_85bhwb1", o0 = "_85bhwb2", S_ = "_85bhwb3", w_ = "_85bhwb4", E_ = "_85bhwb5", j_ = "_85bhwb6", N_ = "_85bhwb7";
const Ko = 0.5, ff = 2, T_ = 0.05;
function C_(t) {
  const { mode: a, value: i, supportsSynthSpeed: l, onChange: o, onReRenderAtSynthTime: u, disabled: h } = t, m = (i - Ko) / (ff - Ko) * 100, v = y.useId(), p = (g) => o(g, i), x = (g) => o(a, g);
  return /* @__PURE__ */ d.jsxs("div", { className: b_, children: [
    l ? /* @__PURE__ */ d.jsxs("div", { className: x_, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: o0,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: h,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: o0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ d.jsxs("div", { className: S_, children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: v,
          type: "range",
          min: Ko,
          max: ff,
          step: T_,
          value: i,
          disabled: h,
          className: w_,
          style: { "--fill": `${m}%` },
          onChange: (g) => x(Number(g.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": ff,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: E_, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && l ? /* @__PURE__ */ d.jsxs("div", { className: j_, children: [
      /* @__PURE__ */ d.jsx(
        Ve,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: h || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: N_, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var R_ = "kgszk50", M_ = "kgszk51", c0 = "kgszk52", __ = "kgszk53", A_ = "kgszk54", Fx = "kgszk55", D_ = "kgszk56", z_ = "kgszk58", Uh = "kgszk59", Yx = "kgszk5a", Bh = "kgszk5b", O_ = "kgszk5c", k_ = "kgszk5d", L_ = "kgszk5e", u0 = "kgszk5f", d0 = "kgszk5g", f0 = "kgszk5h", U_ = "kgszk5i", B_ = "kgszk5j", V_ = "kgszk5l", pl = "kgszk5m", gl = "kgszk5n";
const $_ = -24, H_ = 24, q_ = 0.5, I_ = -12, F_ = 12, Y_ = 0.5, G_ = -30, X_ = -6, P_ = -12, K_ = 0, Qo = -60, hf = -20;
function Vh(t) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: l,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: h = !1,
    disabled: m = !1,
    onApply: v,
    applyLabel: p = "Apply edit"
  } = t, x = (E) => {
    i({ ...a, ...E });
  }, g = W_(a), S = (E) => {
    const w = E.target;
    w && (w.tagName === "INPUT" || w.tagName === "BUTTON" || w.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ d.jsxs("div", { className: R_, onPointerDownCapture: S, children: [
    /* @__PURE__ */ d.jsxs("div", { className: M_, children: [
      g.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: __, children: "No active edits" }) : /* @__PURE__ */ d.jsxs("span", { className: c0, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ d.jsx("span", { children: g.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ d.jsxs("span", { className: c0, "aria-live": "polite", children: [
        /* @__PURE__ */ d.jsx("span", { className: A_, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ d.jsx(
      h0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: $_,
        max: H_,
        step: q_,
        format: eA,
        value: a.volumeDb,
        onChange: (E) => x({ volumeDb: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ d.jsx("span", { className: gl, children: "3-band EQ" }),
      /* @__PURE__ */ d.jsx(
        g_,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (E, w, N, R) => x({ eq3: { low: E, mid: w, high: N, preset: R } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ d.jsx("span", { className: gl, children: "Speed" }),
      /* @__PURE__ */ d.jsx(
        C_,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: l,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (E, w) => x({ speed: { mode: E, value: w } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx(
      h0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: I_,
        max: F_,
        step: Y_,
        format: tA,
        value: a.pitchSt,
        onChange: (E) => x({ pitchSt: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsx(
      Q_,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (E) => x({ normalize: E })
      }
    ),
    /* @__PURE__ */ d.jsx(
      Z_,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (E, w) => x({ fade: { ...a.fade, inS: E, outS: w } })
      }
    ),
    /* @__PURE__ */ d.jsx(
      J_,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (E, w) => x({ silence: { enabled: E, thresholdDb: w } })
      }
    ),
    v ? /* @__PURE__ */ d.jsxs("div", { className: V_, children: [
      /* @__PURE__ */ d.jsx(
        Ve,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(kc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ d.jsx(Ve, { variant: "primary", size: "md", onClick: v, disabled: m, children: p })
    ] }) : null
  ] });
}
function h0(t) {
  const { label: a, sub: i, min: l, max: o, step: u, format: h, value: m, onChange: v, disabled: p } = t, x = (m - l) / (o - l) * 100, g = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: Fx, children: [
    /* @__PURE__ */ d.jsxs("div", { className: D_, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: g, className: z_, children: a }),
      /* @__PURE__ */ d.jsx("span", { className: Yx, children: i })
    ] }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: g,
        type: "range",
        min: l,
        max: o,
        step: u,
        value: m,
        disabled: p,
        className: Bh,
        style: { "--fill": `${x}%` },
        onChange: (S) => v(Number(S.target.value)),
        "aria-valuemin": l,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: Uh, children: h(m) })
  ] });
}
function Q_({ normalize: t, onChange: a, disabled: i }) {
  const o = t.mode === "loudness" ? { min: G_, max: X_, step: 0.5, suffix: "LUFS" } : { min: P_, max: K_, step: 0.5, suffix: "dB" }, u = nA(t.targetDbOrLufs, o.min, o.max), h = (u - o.min) / (o.max - o.min) * 100, m = (v) => {
    if (v === "off") {
      a({ mode: v, targetDbOrLufs: t.targetDbOrLufs });
      return;
    }
    if (v === "peak") {
      a({ mode: v, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: v, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ d.jsx("span", { className: gl, children: "Normalize" }),
    /* @__PURE__ */ d.jsx("div", { className: O_, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((v) => {
      const p = v === "peak";
      return /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: k_,
          "data-active": t.mode === v,
          disabled: i || p,
          onClick: () => m(v),
          title: p ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            v,
            p ? " (soon)" : ""
          ]
        },
        v
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ d.jsxs("div", { className: Fx, children: [
      /* @__PURE__ */ d.jsx("span", { className: Yx, children: "Target" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: i,
          className: Bh,
          style: { "--fill": `${h}%` },
          onChange: (v) => a({ mode: t.mode, targetDbOrLufs: Number(v.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: Uh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function Z_({ inS: t, outS: a, onChange: i, disabled: l }) {
  const o = y.useId(), u = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ d.jsx("span", { className: gl, children: "Fade" }),
    /* @__PURE__ */ d.jsxs("div", { className: L_, children: [
      /* @__PURE__ */ d.jsxs("div", { className: u0, children: [
        /* @__PURE__ */ d.jsx("label", { className: d0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: l,
            className: f0,
            onChange: (h) => i(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: u0, children: [
        /* @__PURE__ */ d.jsx("label", { className: d0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: l,
            className: f0,
            onChange: (h) => i(t, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function J_({ enabled: t, thresholdDb: a, onChange: i, disabled: l }) {
  const o = (a - Qo) / (hf - Qo) * 100;
  return /* @__PURE__ */ d.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ d.jsx("span", { className: gl, children: "Silence trim" }),
    /* @__PURE__ */ d.jsxs("div", { className: U_, children: [
      /* @__PURE__ */ d.jsxs("label", { className: B_, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            disabled: l,
            onChange: (u) => i(u.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: Qo,
          max: hf,
          step: 1,
          value: a,
          disabled: l || !t,
          className: Bh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => i(t, Number(u.target.value)),
          "aria-valuemin": Qo,
          "aria-valuemax": hf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: Uh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Bi = 1e-3;
function W_(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Bi && a.push("gain"), (Math.abs(t.eq3.low) >= Bi || Math.abs(t.eq3.mid) >= Bi || Math.abs(t.eq3.high) >= Bi) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Bi && a.push("speed"), Math.abs(t.pitchSt) >= Bi && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function eA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function tA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function nA(t, a, i) {
  return Number.isFinite(t) ? Math.max(a, Math.min(i, t)) : a;
}
var aA = "skdk4g0", rA = "skdk4g1", m0 = "skdk4g2", iA = "skdk4g3", sA = "skdk4g4", lA = "skdk4g5", oA = "skdk4g6", cA = "skdk4g7", uA = "skdk4g8", dA = "skdk4g9", fA = "skdk4ga", hA = "skdk4gb", mA = "skdk4gc", pA = "skdk4gd", p0 = "skdk4ge", g0 = "skdk4gf", gA = "skdk4gg", v0 = "skdk4gh", y0 = "skdk4gi", vA = "skdk4gj", yA = "skdk4gk", bA = "skdk4gl", b0 = "skdk4gm", xA = "skdk4gn", x0 = "skdk4go", SA = "skdk4gp", wA = "skdk4gq", EA = "skdk4gr", jA = "skdk4gs", NA = "skdk4gt", TA = "skdk4gu", CA = "skdk4gv", S0 = "skdk4gw", RA = "skdk4gx", MA = "skdk4gy", _A = "skdk4gz", AA = "skdk4g10", DA = "cgsfgh1", zA = "cgsfgh2", OA = "cgsfgh3", kA = "cgsfgh4", LA = "cgsfgh5", UA = "cgsfgh6", BA = "cgsfgh7", VA = "cgsfgh8", $A = "cgsfgh9", HA = "cgsfgha", qA = "cgsfghb", IA = "cgsfghc", FA = "cgsfghd", YA = "cgsfghe", GA = "cgsfghm", XA = "cgsfghn", PA = "cgsfgho", KA = "cgsfghp";
const $t = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], vl = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Qi = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, Gx = 0.05;
function QA(t) {
  let a = null, i = -1 / 0;
  for (const l of $t) {
    const o = t[l];
    o > i && (i = o, a = l);
  }
  return !a || i <= Gx ? null : a;
}
function Xx(t, a = 3) {
  return $t.map((i) => ({ key: i, label: vl[i], value: t[i] })).filter((i) => i.value > Gx).sort((i, l) => l.value - i.value).slice(0, a);
}
function ZA(t) {
  let a = 0;
  for (const i of $t) a += t[i] * t[i];
  return Math.sqrt(a);
}
function w0(t) {
  const a = Xx(t, 2), i = a[0];
  if (!i) return "";
  const l = a[1];
  return !l || i.value - l.value > 0.25 ? mf(i.label) : `${mf(i.label)} + ${l.label.toLowerCase()}`;
}
function mf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Jr(t) {
  const a = { ...Qi };
  for (const i of $t) {
    const l = t[i];
    a[i] = Number.isFinite(l) ? Math.max(0, Math.min(1, l)) : 0;
  }
  return a;
}
const E0 = 0.05, j0 = 0.2, JA = 22, WA = 320, pf = 0.78;
function gf(t, a, i, l) {
  const o = Math.cos(i), u = Math.sin(i), h = t * o + a * u;
  return Math.max(0, Math.min(1, h / l));
}
function e2(t) {
  const { vec: a, onChange: i, size: l, reduceMotion: o = !1 } = t, [u, h] = y.useState(a), [m, v] = y.useState(null), [p, x] = y.useState(null), g = y.useRef(null), S = y.useRef(a), E = y.useRef(o), w = y.useRef(null), N = y.useRef(0);
  E.current = o, y.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const R = y.useCallback(
    (q) => {
      const I = Jr(q);
      h(I), S.current = I, i(I);
    },
    [i]
  ), T = y.useCallback((q) => {
    const I = Jr(q);
    h(I), S.current = I;
  }, []), k = y.useCallback(
    (q) => {
      const I = g.current;
      if (!I || E.current) return;
      const ie = q.clientX - I.centerX, re = q.clientY - I.centerY, te = l / 2 * pf, ce = gf(ie, re, I.angle, te), J = { ...S.current, [I.axis]: ce };
      T(J);
    },
    [l, T]
  ), _ = y.useCallback(
    (q) => {
      const I = g.current;
      if (I) {
        if (window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), E.current) {
          const ie = q.clientX - I.centerX, re = q.clientY - I.centerY, te = l / 2 * pf, ce = gf(ie, re, I.angle, te), J = { ...S.current, [I.axis]: ce };
          g.current = null, R(J);
          return;
        }
        g.current = null, R(S.current);
      }
    },
    [R, k, l]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), g.current = null, w.current !== null && (window.clearTimeout(w.current), w.current = null);
  }, [k, _]);
  const A = y.useCallback((q, I) => {
    E.current || (N.current += 1, x({ x: q, y: I, key: N.current }), w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
      x(null), w.current = null;
    }, WA));
  }, []), Z = y.useCallback(
    (q, I, ie, re, te) => {
      const ce = ie.getBoundingClientRect(), J = ce.left + ce.width / 2, O = ce.top + ce.height / 2, U = $t.indexOf(q) / $t.length * Math.PI * 2 - Math.PI / 2;
      if (g.current = {
        axis: q,
        pointerId: I,
        centerX: J,
        centerY: O,
        angle: U
      }, v(q), re !== void 0 && te !== void 0) {
        const B = re - J, K = te - O, M = l / 2 * pf, Q = gf(B, K, U, M), X = { ...S.current, [q]: Q };
        E.current ? R(X) : T(X);
      }
      window.addEventListener("pointermove", k), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    },
    [R, k, _, l, T]
  ), W = y.useCallback(
    (q, I) => {
      I.preventDefault();
      const ie = I.currentTarget, re = ie.ownerSVGElement ?? ie;
      Z(q, I.pointerId, re);
    },
    [Z]
  ), ne = y.useCallback(
    (q) => {
      const I = q.currentTarget, ie = I instanceof SVGSVGElement ? I : I.ownerSVGElement ?? I, re = ie.getBoundingClientRect(), te = re.left + re.width / 2, ce = re.top + re.height / 2, J = q.clientX - te, O = q.clientY - ce;
      if (Math.sqrt(J * J + O * O) < 8) return;
      let U = Math.atan2(O, J) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let B = null, K = 999;
      for (let X = 0; X < $t.length; X++) {
        const le = $t[X];
        if (!le) continue;
        const fe = X / $t.length * 360, ve = Math.abs((fe - U + 540) % 360 - 180);
        ve < K && (K = ve, B = le);
      }
      if (!B || K > JA) return;
      q.preventDefault();
      const M = (q.clientX - re.left) / re.width * l, Q = (q.clientY - re.top) / re.height * l;
      A(M, Q), Z(B, q.pointerId, ie, q.clientX, q.clientY);
    },
    [Z, l, A]
  ), D = y.useCallback(
    (q, I) => {
      const ie = S.current[q];
      let re = ie;
      switch (I.key) {
        case "ArrowUp":
        case "ArrowRight":
          re = ie + E0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          re = ie - E0;
          break;
        case "PageUp":
          re = ie + j0;
          break;
        case "PageDown":
          re = ie - j0;
          break;
        case "Home":
          re = 0;
          break;
        case "End":
          re = 1;
          break;
        default:
          return;
      }
      I.preventDefault(), v(q), R({ ...S.current, [q]: re });
    },
    [R]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: v,
    onPointerDown: W,
    onKeyDown: D,
    onSurfacePointerDown: ne,
    surfacePing: p
  };
}
const t2 = [0.25, 0.5, 0.75, 1];
function n2({
  vec: t,
  onChange: a,
  size: i = 360,
  readOnly: l = !1,
  reduceMotion: o = !1
}) {
  const u = e2({ vec: t, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, v = i / 2 * 0.78, p = y.useMemo(() => a2(h, m, v), [h, m, v]), x = y.useMemo(() => $t.map((g, S) => {
    const E = dc(u.liveVec[g]), w = p[S];
    return w ? `${h + w.dx * E},${m + w.dy * E}` : "0,0";
  }).join(" "), [p, h, m, u.liveVec]);
  return /* @__PURE__ */ d.jsx("div", { className: DA, children: /* @__PURE__ */ d.jsx("div", { className: zA, style: { width: i, height: i }, children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: OA,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: l ? void 0 : u.onSurfacePointerDown,
      style: l ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        t2.map((g) => /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: kA,
            cx: h,
            cy: m,
            r: v * g
          },
          g
        )),
        $t.map((g, S) => {
          const E = p[S];
          if (!E) return null;
          const w = h + E.dx * 1.18, N = m + E.dy * 1.18, R = u.activeAxis === g;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "line",
              {
                className: LA,
                x1: h,
                y1: m,
                x2: h + E.dx,
                y2: m + E.dy
              }
            ),
            /* @__PURE__ */ d.jsx(
              "text",
              {
                className: `${FA}${R ? ` ${YA}` : ""}`,
                x: w,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: vl[g]
              }
            )
          ] }, g);
        }),
        $t.map((g, S) => {
          const E = dc(u.liveVec[g]);
          if (E <= 0.01) return null;
          const w = p[S];
          if (!w) return null;
          const N = u.activeAxis === g;
          return /* @__PURE__ */ d.jsx(
            "line",
            {
              className: `${BA}${N ? ` ${VA}` : ""}`,
              x1: h,
              y1: m,
              x2: h + w.dx * E,
              y2: m + w.dy * E
            },
            `petal-${g}`
          );
        }),
        /* @__PURE__ */ d.jsx("polygon", { className: UA, points: x }),
        u.surfacePing && /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: IA,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !l && $t.map((g, S) => {
          const E = dc(u.liveVec[g]), w = p[S];
          if (!w) return null;
          const N = h + w.dx * E, R = m + w.dy * E, T = u.activeAxis === g;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: $A,
                cx: N,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${vl[g]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": E,
                onPointerDown: (k) => u.onPointerDown(g, k),
                onKeyDown: (k) => u.onKeyDown(g, k),
                onFocus: () => u.setActiveAxis(g),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: `${HA}${T ? ` ${qA}` : ""}`,
                cx: N,
                cy: R,
                r: 6
              }
            )
          ] }, g);
        })
      ]
    }
  ) }) });
}
function a2(t, a, i) {
  return $t.map((l, o) => {
    const u = o / $t.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * i,
      dy: Math.sin(u) * i
    };
  });
}
function dc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function r2({ vec: t, size: a = 36 }) {
  const i = a / 2, l = a / 2, o = a / 2 * 0.86, u = y.useMemo(() => $t.map((h, m) => {
    const v = dc(t[h]), p = m / $t.length * Math.PI * 2 - Math.PI / 2, x = i + Math.cos(p) * o * v, g = l + Math.sin(p) * o * v;
    return `${x},${g}`;
  }).join(" "), [i, l, o, t]);
  return /* @__PURE__ */ d.jsx("span", { className: GA, "aria-hidden": "true", children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: XA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ d.jsx("circle", { className: PA, cx: i, cy: l, r: o }),
        /* @__PURE__ */ d.jsx("polygon", { className: KA, points: u })
      ]
    }
  ) });
}
var i2 = "_1jqr3aj0", s2 = "_1jqr3aj1", l2 = "_1jqr3aj2", o2 = "_1jqr3aj3", c2 = "_1jqr3aj4", u2 = "_1jqr3aj5", d2 = "_1jqr3aj6", f2 = "_1jqr3aj7";
const N0 = 0.05, T0 = 0.2;
function h2({
  vec: t,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: l = !1
}) {
  const [o, u] = y.useState(null), h = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), v = y.useCallback(
    (w, N) => {
      const R = Math.max(0, Math.min(1, N));
      a(Jr({ ...t, [w]: R }));
    },
    [a, t]
  ), p = y.useCallback((w, N) => {
    const R = m.current.get(w);
    return !R || R.width <= 0 ? 0 : (N - R.left) / R.width;
  }, []), x = y.useCallback(
    (w, N) => {
      if (i) return;
      N.preventDefault();
      const R = N.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && m.current.set(w, R.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), h.current = w, u(w), v(w, p(w, N.clientX));
    },
    [i, v, p]
  ), g = y.useCallback(
    (w, N) => {
      i || l || h.current === w && v(w, p(w, N.clientX));
    },
    [i, l, v, p]
  ), S = y.useCallback(
    (w, N) => {
      if (h.current === w) {
        try {
          N.currentTarget.releasePointerCapture(N.pointerId);
        } catch {
        }
        h.current = null, m.current.delete(w);
      }
    },
    []
  ), E = y.useCallback(
    (w, N) => {
      if (i) return;
      const R = t[w] ?? 0;
      let T = R;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = R + N0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = R - N0;
          break;
        case "PageUp":
          T = R + T0;
          break;
        case "PageDown":
          T = R - T0;
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
      N.preventDefault(), u(w), v(w, T);
    },
    [i, v, t]
  );
  return /* @__PURE__ */ d.jsx("div", { className: i2, role: "group", "aria-label": "Emotion axis sliders", children: $t.map((w) => {
    const N = m2(t[w] ?? 0), R = N > 0.05, T = o === w, k = vl[w];
    return /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: `${s2}${R ? ` ${l2}` : ""}${T ? ` ${o2}` : ""}`,
        role: "slider",
        "aria-label": `${k} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (_) => x(w, _),
        onPointerMove: (_) => g(w, _),
        onPointerUp: (_) => S(w, _),
        onPointerCancel: (_) => S(w, _),
        onKeyDown: (_) => E(w, _),
        onFocus: () => u(w),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: c2, children: k }),
          /* @__PURE__ */ d.jsx("span", { className: u2, "data-track": "true", children: /* @__PURE__ */ d.jsx(
            "span",
            {
              className: d2,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ d.jsx("span", { className: f2, children: N.toFixed(2) })
        ]
      },
      w
    );
  }) });
}
function m2(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var C0 = "gvwvwg0", p2 = "gvwvwg2", g2 = "gvwvwg3", v2 = "gvwvwg8", y2 = "gvwvwg9", b2 = "gvwvwga", x2 = "gvwvwgb", S2 = "gvwvwgc", w2 = "gvwvwgd", E2 = "gvwvwge";
function j2({
  presets: t,
  activePresetId: a,
  onSelect: i,
  onDelete: l
}) {
  return t.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: C0, children: [
    /* @__PURE__ */ d.jsx("span", { className: p2, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("span", { className: g2, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: C0, children: [
    /* @__PURE__ */ d.jsx("span", { className: E2, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("div", { className: v2, children: t.map((o) => {
      const u = N2(o), h = o.presetId === a;
      return /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${y2}${h ? ` ${x2}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: b2,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ d.jsx(r2, { vec: u, size: 28 }),
                  /* @__PURE__ */ d.jsx("span", { className: S2, children: o.presetName })
                ]
              }
            ),
            l && /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: w2,
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
const Pf = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function N2(t) {
  const a = Pf.reduce(
    (l, o) => ({ ...l, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const i = Pf.reduce(
    (l, o, u) => ({ ...l, [o]: t.vector[u] ?? 0 }),
    a
  );
  return Jr(i);
}
function vf(t) {
  return Pf.map((a) => t[a] ?? 0);
}
const T2 = [
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
], C2 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], R2 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], M2 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function _2(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Qi };
  const l = a.split(/\s+/).some((h) => C2.includes(h)) ? 1.2 : 1, o = R2.some((h) => a.includes(h)) ? 0.55 : 1, u = { ...Qi };
  for (const h of T2) {
    let m = 0;
    for (const v of h.keywords) {
      const p = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), g = new RegExp(`\\b${p}\\b`).exec(a);
      if (!g) continue;
      const S = g.index, E = a.slice(0, S), w = Math.max(
        E.lastIndexOf(","),
        E.lastIndexOf(";"),
        E.lastIndexOf(" but "),
        E.lastIndexOf(" yet ")
      ), R = E.slice(w >= 0 ? w : 0).slice(-30);
      M2.some((T) => new RegExp(`\\b${T}\\b`).test(R)) || (m += 1);
    }
    if (m > 0) {
      const v = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * l * o;
      u[h.axis] = Math.min(1, v);
    }
  }
  return $t.every((h) => u[h] === 0) && (u.calm = 0.4), Jr(u);
}
const A2 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function D2({
  value: t,
  onChange: a,
  deploymentId: i
}) {
  const l = t.mode ?? "none", o = y.useMemo(() => z2(t.vector), [t.vector]), u = t.emotionAlpha ?? 1, [h, m] = y.useState([]), [v, p] = y.useState(null), [x, g] = y.useState(!1), [S, E] = y.useState(null), [w, N] = y.useState(""), [R, T] = y.useState(!1), k = y.useRef(!0);
  y.useEffect(() => (k.current = !0, () => {
    k.current = !1;
  }), []), y.useEffect(() => {
    let C = !1;
    return Dx(i).then((U) => {
      C || m(R0(U.presets));
    }).catch((U) => {
      C || p(yf(U));
    }), () => {
      C = !0;
    };
  }, [i]), y.useEffect(() => {
    R || N(w0(o));
  }, [o, R]);
  const _ = (C) => {
    a({ ...t, mode: C });
  }, A = (C) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: vf(C)
    }), S && E(null);
  }, Z = () => {
    A(Jr(Qi));
  }, W = (C) => {
    const U = Math.max(0, Math.min(1, Number.isFinite(C) ? C : 1));
    a({ ...t, emotionAlpha: U });
  }, ne = async () => {
    const C = w.trim();
    if (C) {
      g(!0), p(null);
      try {
        const U = await rM(i, C, vf(o));
        if (!k.current) return;
        m(
          (B) => R0([U, ...B.filter((K) => K.presetId !== U.presetId)])
        ), E(U.presetId), T(!1);
      } catch (U) {
        k.current && p(yf(U));
      } finally {
        k.current && g(!1);
      }
    }
  }, D = async (C) => {
    const U = h;
    m((B) => B.filter((K) => K.presetId !== C)), S === C && E(null);
    try {
      await iM(i, C);
    } catch (B) {
      k.current && (m(U), p(yf(B)));
    }
  }, q = (C) => {
    E(C.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: C.vector
    });
  }, I = (C) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: C });
  }, ie = QA(o), re = ZA(o), te = Xx(o, 3), ce = te.length > 0 && w.trim().length > 0 && !x, J = w0(o) || "name your preset…", O = l !== "emotion_vector";
  return /* @__PURE__ */ d.jsxs("div", { className: aA, children: [
    /* @__PURE__ */ d.jsxs("div", { className: rA, children: [
      /* @__PURE__ */ d.jsx("span", { className: m0, children: "Emotion mode" }),
      /* @__PURE__ */ d.jsx("div", { className: iA, role: "radiogroup", "aria-label": "Emotion mode", children: A2.map((C) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": l === C.id,
          className: `${sA}${l === C.id ? ` ${lA}` : ""}`,
          onClick: () => _(C.id),
          children: C.label
        },
        C.id
      )) })
    ] }),
    l === "none" && /* @__PURE__ */ d.jsxs("div", { className: x0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ d.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    l === "audio_ref" && /* @__PURE__ */ d.jsx("div", { className: x0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    l === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: vA, children: [
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: yA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (C) => I(C.target.value)
        }
      ),
      /* @__PURE__ */ d.jsxs("div", { className: bA, children: [
        /* @__PURE__ */ d.jsx(
          Ve,
          {
            variant: "secondary",
            onClick: () => {
              const C = (t.qwenTemplate ?? "").trim();
              if (!C) return;
              const U = _2(C);
              a({
                ...t,
                mode: "emotion_vector",
                vector: vf(U)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: b0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: b0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ d.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (l === "emotion_vector" || l === "none" || l === "audio_ref") && /* @__PURE__ */ d.jsxs("div", { className: pA, children: [
      /* @__PURE__ */ d.jsx("div", { className: `${Gy} ${oA}`, children: /* @__PURE__ */ d.jsx(
        n2,
        {
          vec: o,
          onChange: A,
          readOnly: O
        }
      ) }),
      /* @__PURE__ */ d.jsxs("div", { className: `${Gy} ${cA}`, children: [
        /* @__PURE__ */ d.jsxs("div", { className: uA, children: [
          /* @__PURE__ */ d.jsx("span", { className: m0, children: "Dominant" }),
          /* @__PURE__ */ d.jsx("span", { className: dA, children: ie ? vl[ie].toLowerCase() : "neutral" }),
          /* @__PURE__ */ d.jsxs("span", { className: fA, children: [
            "‖v‖ = ",
            re.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(h2, { vec: o, onChange: A, readOnly: O }),
        /* @__PURE__ */ d.jsx("div", { className: hA, children: /* @__PURE__ */ d.jsxs(
          Ve,
          {
            variant: "ghost",
            size: "sm",
            onClick: Z,
            disabled: O || re < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ d.jsxs(
                "svg",
                {
                  className: mA,
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ d.jsx(
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
                    /* @__PURE__ */ d.jsx(
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
    l === "emotion_vector" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: p0, children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          /* @__PURE__ */ d.jsx("span", { className: g0, children: "Alpha" }),
          /* @__PURE__ */ d.jsx("br", {}),
          /* @__PURE__ */ d.jsx("span", { className: gA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: u,
            className: v0,
            style: { "--fill": `${u * 100}%` },
            onChange: (C) => W(Number(C.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: y0, children: [
          (u * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${SA}${te.length === 0 ? ` ${wA}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs("div", { className: EA, children: [
              /* @__PURE__ */ d.jsx("span", { className: jA, children: "Save current as preset" }),
              te.length === 0 && /* @__PURE__ */ d.jsx("span", { className: NA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: TA, children: [
              /* @__PURE__ */ d.jsx("div", { className: CA, children: te.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: `${S0} ${MA}`, children: "no axes set" }) : te.map((C) => /* @__PURE__ */ d.jsxs("span", { className: S0, children: [
                C.label.toLowerCase(),
                /* @__PURE__ */ d.jsx("b", { className: RA, children: C.value.toFixed(2) })
              ] }, C.key)) }),
              /* @__PURE__ */ d.jsxs("div", { className: _A, children: [
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "text",
                    className: AA,
                    placeholder: J,
                    value: w,
                    disabled: te.length === 0 || x,
                    onChange: (C) => {
                      N(C.target.value), T(!0);
                    },
                    onKeyDown: (C) => {
                      C.key === "Enter" && ce && ne();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  Ve,
                  {
                    variant: "primary",
                    disabled: !ce,
                    onClick: ne,
                    children: x ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d.jsx(
        j2,
        {
          presets: h,
          activePresetId: S,
          onSelect: q,
          onDelete: D
        }
      )
    ] }),
    l === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: p0, children: [
      /* @__PURE__ */ d.jsx("span", { className: g0, children: "Alpha" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: u,
          className: v0,
          style: { "--fill": `${u * 100}%` },
          onChange: (C) => W(Number(C.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: y0, children: [
        (u * 100).toFixed(0),
        "%"
      ] })
    ] }),
    v && /* @__PURE__ */ d.jsx("div", { className: xA, children: v })
  ] });
}
function z2(t) {
  if (!t || !Array.isArray(t)) return Jr(Qi);
  const a = { ...Qi };
  return $t.forEach((i, l) => {
    const o = t[l];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function R0(t) {
  return [...t].sort((a, i) => i.updatedAt - a.updatedAt);
}
function yf(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "Unknown error";
}
var O2 = "_5u1uau0", Js = "_5u1uau1", k2 = "_5u1uau2", Vi = "_5u1uau3", Ws = "_5u1uau4", L2 = "_5u1uau5", bf = "_5u1uau6", U2 = "_5u1uau7", B2 = "_5u1uau8", V2 = "_5u1uau9", $2 = "_5u1uaua", H2 = "_5u1uaub", q2 = "_5u1uauc", I2 = "_5u1uaud";
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
], F2 = ["mp3", "wav", "flac"], Zo = 0.5, Sf = 2, Y2 = 0.05, G2 = 0.8, X2 = 0.8, P2 = 42;
function wf(t, a, i) {
  const l = t[a];
  if (typeof l == "number" && Number.isFinite(l)) return l;
  if (typeof l == "string") {
    const o = Number(l);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function K2({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: l,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: h,
  onGenerationChange: m
}) {
  const v = y.useId(), p = y.useId(), x = y.useId(), g = y.useId(), S = y.useId(), E = (_, A) => {
    m({ ...h, [_]: A });
  }, w = xf.find((_) => _.id === o) ?? xf[0], N = (i - Zo) / (Sf - Zo) * 100, R = wf(h, "temperature", G2), T = wf(h, "top_p", X2), k = wf(h, "seed", P2);
  return /* @__PURE__ */ d.jsxs("div", { className: O2, children: [
    /* @__PURE__ */ d.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: v, className: Vi, children: "Format" }),
      /* @__PURE__ */ d.jsx("div", { className: Ws, children: /* @__PURE__ */ d.jsx(
        "select",
        {
          id: v,
          className: L2,
          value: t,
          onChange: (_) => a(_.currentTarget.value),
          children: F2.map((_) => /* @__PURE__ */ d.jsx("option", { value: _, children: _ }, _))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: Vi, children: "Speed" }),
      /* @__PURE__ */ d.jsxs("div", { className: `${Ws} ${U2}`, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: B2,
            min: Zo,
            max: Sf,
            step: Y2,
            value: i,
            style: { "--range-pct": `${N}%` },
            onChange: (_) => l(Number(_.currentTarget.value)),
            "aria-valuemin": Zo,
            "aria-valuemax": Sf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: V2, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: k2, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ d.jsx("span", { className: Vi, children: "Cache" }),
      /* @__PURE__ */ d.jsx("div", { className: $2, children: xf.map((_) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === _.id,
          className: H2,
          onClick: () => u(_.id),
          title: _.help,
          children: _.label
        },
        _.id
      )) }),
      /* @__PURE__ */ d.jsx("p", { className: q2, "aria-live": "polite", children: w.help })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: I2, "aria-hidden": "true" }),
    /* @__PURE__ */ d.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: x, className: Vi, children: "Temperature" }),
      /* @__PURE__ */ d.jsx("div", { className: Ws, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: x,
          type: "number",
          className: bf,
          min: 0,
          max: 2,
          step: 0.05,
          value: R,
          onChange: (_) => E("temperature", Number(_.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: g, className: Vi, children: "Top-p" }),
      /* @__PURE__ */ d.jsx("div", { className: Ws, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: g,
          type: "number",
          className: bf,
          min: 0,
          max: 1,
          step: 0.05,
          value: T,
          onChange: (_) => E("top_p", Number(_.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: S, className: Vi, children: "Seed" }),
      /* @__PURE__ */ d.jsx("div", { className: Ws, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: S,
          type: "number",
          className: bf,
          step: 1,
          value: k,
          onChange: (_) => E("seed", Math.trunc(Number(_.currentTarget.value)))
        }
      ) })
    ] })
  ] });
}
var Q2 = "iv43qk0", M0 = "iv43qk1", Z2 = "iv43qk2", _0 = "iv43qk3", J2 = "iv43qk4", W2 = "iv43qk5", e3 = "iv43qk6", t3 = "iv43qk7", n3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, a3 = "iv43qkd", r3 = "iv43qke", Ef = "iv43qkf", jf = "iv43qkg";
function i3({
  lines: t,
  characterColors: a,
  onLineClick: i
}) {
  if (t.length === 0)
    return /* @__PURE__ */ d.jsx("p", { className: a3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const l = t.length, o = t.filter((h) => h.character !== null).length, u = l - o;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: r3, children: [
      /* @__PURE__ */ d.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ d.jsx("span", { className: jf, children: l }),
        "lines"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ d.jsx("span", { className: jf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ d.jsx("span", { className: jf, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ol", { className: Q2, children: t.map((h) => /* @__PURE__ */ d.jsx(
      s3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function s3({ line: t, color: a, onClick: i }) {
  return t.character === null ? /* @__PURE__ */ d.jsxs("li", { className: `${M0} ${Z2}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: _0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ d.jsx("span", { className: e3, children: t.text })
  ] }) : /* @__PURE__ */ d.jsxs(
    "li",
    {
      className: M0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: _0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ d.jsx("span", { className: J2, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ d.jsxs("span", { className: W2, children: [
          t.text,
          t.override && /* @__PURE__ */ d.jsxs("span", { className: `${t3} ${n3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var l3 = "_46z95i0", o3 = "_46z95i1", c3 = "_46z95i2", u3 = "_46z95i3", d3 = "_46z95i4", f3 = "_46z95i5", h3 = "_46z95i6";
const m3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function p3({ value: t, onChange: a }) {
  return /* @__PURE__ */ d.jsxs("div", { className: l3, children: [
    /* @__PURE__ */ d.jsx(
      Nf,
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
    /* @__PURE__ */ d.jsx(
      Nf,
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
    /* @__PURE__ */ d.jsx(
      Nf,
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
function Nf({ label: t, sub: a, min: i, max: l, step: o, format: u, value: h, onChange: m }) {
  const v = (h - i) / (l - i) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ d.jsxs("div", { className: o3, children: [
    /* @__PURE__ */ d.jsxs("div", { className: c3, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: u3, children: t }),
      /* @__PURE__ */ d.jsx("span", { className: d3, children: a })
    ] }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: i,
        max: l,
        step: o,
        value: h,
        className: f3,
        style: { "--fill": `${v}%` },
        onChange: (x) => m(Number(x.target.value))
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: h3, children: u(h) })
  ] });
}
var g3 = "qe93dj0", v3 = "qe93dj1", y3 = "qe93dj2", b3 = "qe93dj3", x3 = "qe93dj4", S3 = "qe93dj5", w3 = "qe93dj6", E3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, j3 = "qe93dja", N3 = "qe93djb";
function T3({ checks: t }) {
  const a = t.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ d.jsxs("div", { className: g3, children: [
    /* @__PURE__ */ d.jsxs("header", { className: v3, children: [
      /* @__PURE__ */ d.jsx("span", { className: y3, children: "Pre-flight" }),
      /* @__PURE__ */ d.jsxs("span", { className: b3, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: x3, children: t.map((i) => /* @__PURE__ */ d.jsxs("li", { className: S3, children: [
      /* @__PURE__ */ d.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${w3} ${E3[i.status]}`
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: j3, children: i.label }),
      i.detail && /* @__PURE__ */ d.jsx("span", { className: N3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var A0 = "_17fbpt30", D0 = "_17fbpt31", z0 = "_17fbpt32", C3 = "_17fbpt33", R3 = "_17fbpt34", M3 = "_17fbpt35", O0 = "_17fbpt36", _3 = "_17fbpt37", A3 = "_17fbpt38";
const D3 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function z3({
  runs: t,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: l,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: A0, children: [
    /* @__PURE__ */ d.jsx("header", { className: D0, children: /* @__PURE__ */ d.jsx(
      "a",
      {
        className: z0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (u) => {
          u.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ d.jsx("p", { className: _3, children: "No runs yet." }),
    /* @__PURE__ */ d.jsx("p", { className: A3, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: A0, children: [
    /* @__PURE__ */ d.jsxs("header", { className: D0, children: [
      /* @__PURE__ */ d.jsx("span", {}),
      /* @__PURE__ */ d.jsx(
        "a",
        {
          className: z0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (u) => {
            u.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: C3, children: t.slice(0, 5).map((u) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: R3,
        onClick: l ? () => l(u.runId) : void 0,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: M3, children: u.runId }),
          /* @__PURE__ */ d.jsx("span", { className: `${Bx.sm} ${Vx[D3[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ d.jsx("span", { className: O0, children: O3(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ d.jsx("span", { className: O0, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function O3(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
function k3(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function Px() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function L3() {
  if (typeof window > "u") return;
  const t = Px();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function Kx(t) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const l = Px(), o = () => {
      const h = l.reduce((m, v) => {
        const p = k3(v);
        return p > m ? p : m;
      }, 0);
      i(h > t);
    };
    o();
    const u = { passive: !0 };
    for (const h of l)
      h.addEventListener("scroll", o, u);
    return () => {
      for (const h of l)
        h.removeEventListener("scroll", o, u);
    };
  }, [t]), a;
}
const Qx = 360, Kf = "emotion-tts:trigger-generate", Qf = "emotion-tts:run-state";
function U3() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Kf));
}
function B3(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Qf, { detail: t }));
}
function V3(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Kf, t), () => window.removeEventListener(Kf, t));
}
function $3(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const l = i.detail;
    l && t(l);
  };
  return window.addEventListener(Qf, a), () => window.removeEventListener(Qf, a);
}
var H3 = "_1s59p180", q3 = "_1s59p181", I3 = "_1s59p182", F3 = "_1s59p183", Y3 = "_1s59p184", G3 = "_1s59p185", X3 = "_1s59p186", P3 = "_1s59p188", K3 = "_1s59p189", k0 = "_1s59p18a", Q3 = "_1s59p18c", Z3 = "_1s59p18d", J3 = "_1s59p18e", W3 = "_1s59p18f", eD = "_1s59p18g", tD = "_1s59p18i";
function nD(t) {
  const a = El(), [i, l] = y.useState("idle"), [o, u] = y.useState(null), [h, m] = y.useState(/* @__PURE__ */ new Map()), [v, p] = y.useState(null), [x, g] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => () => {
    S.current?.();
  }, []), y.useEffect(() => {
    B3({ busy: i === "starting" || i === "running" });
  }, [i]);
  const E = y.useCallback(
    (B) => {
      const K = B.status;
      (K === "completed" || K === "partial") && Zt.success(
        K === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
  ), w = y.useCallback(async () => {
    l("starting"), p(null), m(/* @__PURE__ */ new Map()), g(null);
    try {
      const B = await mT(t.deploymentId, t.createPayload);
      u(B.runId), l("running"), S.current?.(), S.current = _y(
        t.deploymentId,
        B.runId,
        (K) => L0(
          K,
          m,
          l,
          (M) => {
            g(M), E(M);
          },
          t.deploymentId,
          B.runId
        ),
        () => l("error")
      );
    } catch (B) {
      l("error"), p(Tf(B));
    }
  }, [t.deploymentId, t.createPayload, E]);
  y.useEffect(() => V3(() => {
    (i === "idle" || i === "terminal" || i === "error") && w();
  }), [i, w]);
  const N = y.useCallback(async () => {
    if (o)
      try {
        await pT(t.deploymentId, o);
      } catch (B) {
        p(Tf(B));
      }
  }, [t.deploymentId, o]), R = Array.from(h.values()).sort((B, K) => B.globalIndex - K.globalIndex), T = i === "starting" || i === "running", k = x?.status === "partial", _ = R.filter((B) => B.status === "running").length, A = R.filter((B) => B.status === "completed").length, Z = i === "starting" || i === "running" || R.length > 0, W = R.filter((B) => B.status === "failed"), ne = (() => {
    if (i !== "terminal" || W.length === 0) return null;
    const B = /* @__PURE__ */ new Map();
    for (const X of W) {
      const le = X.failureCategory ?? "unknown";
      B.set(le, (B.get(le) ?? 0) + 1);
    }
    let K = "unknown", M = 0;
    for (const [X, le] of B)
      le > M && (K = X, M = le);
    const Q = R.length;
    return { category: K, count: M, total: Q };
  })(), D = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, q = "Check the run detail page for the per-segment error log.", I = v?.toLowerCase().includes("unmapped") ?? !1, ie = t.diagnostics ?? [], re = ie.find((B) => B.status === "fail"), te = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", ce = !t.canGenerate || T || !!re, J = i === "starting" || i === "running", O = J ? "running" : ce ? "blocked" : "idle", U = !Kx(Qx) || J;
  return /* @__PURE__ */ d.jsxs("div", { className: H3, children: [
    /* @__PURE__ */ d.jsxs("div", { className: q3, children: [
      /* @__PURE__ */ d.jsxs("div", { className: F3, children: [
        /* @__PURE__ */ d.jsxs("span", { className: Y3, children: [
          /* @__PURE__ */ d.jsx("span", { className: I3, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          Z && /* @__PURE__ */ d.jsxs("span", { className: eD, children: [
            /* @__PURE__ */ d.jsx("span", { className: tD, "aria-hidden": "true" }),
            _ > 0 ? `${_} in flight` : `${A} done`
          ] })
        ] }),
        ie.length > 0 ? /* @__PURE__ */ d.jsx("ul", { className: G3, "aria-label": "Pre-flight checks", children: ie.map((B) => /* @__PURE__ */ d.jsxs("li", { className: X3, children: [
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: P3,
              "data-status": B.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ d.jsx("span", { className: K3, children: B.label }),
          B.detail && /* @__PURE__ */ d.jsx("span", { className: k0, children: B.detail })
        ] }, B.label)) }) : /* @__PURE__ */ d.jsx("span", { className: k0, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: Q3, "data-state": O, children: [
        U ? /* @__PURE__ */ d.jsxs(
          Ve,
          {
            variant: "primary",
            size: "sm",
            onClick: w,
            disabled: ce,
            loading: J,
            children: [
              !J && /* @__PURE__ */ d.jsx("span", { className: Z3, "aria-hidden": "true", children: "▶" }),
              te
            ]
          }
        ) : /* @__PURE__ */ d.jsxs("span", { className: J3, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ d.jsx("span", { className: W3, children: "↑" })
        ] }),
        T && /* @__PURE__ */ d.jsx(
          Ve,
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
    v && /* @__PURE__ */ d.jsxs(
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
          /* @__PURE__ */ d.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ d.jsx("span", { children: v }),
          I && /* @__PURE__ */ d.jsx(
            Ve,
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
    ne && /* @__PURE__ */ d.jsxs(zn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ d.jsxs("strong", { children: [
        "Run failed — ",
        ne.count,
        " of ",
        ne.total,
        " segments failed with ",
        /* @__PURE__ */ d.jsx("code", { children: ne.category })
      ] }),
      /* @__PURE__ */ d.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: D[ne.category] ?? q })
    ] }),
    x?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ d.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${x.exportArtifactRef}/download`,
        download: !0,
        className: `${_x.secondary} ${Ax.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    k && x && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ d.jsx(
        Ve,
        {
          variant: "secondary",
          disabled: !!re,
          onClick: async () => {
            try {
              const B = await Cx(t.deploymentId, x.runId);
              u(B.runId), m(/* @__PURE__ */ new Map()), g(null), l("running"), S.current?.(), S.current = _y(
                t.deploymentId,
                B.runId,
                (K) => L0(K, m, l, g, t.deploymentId, B.runId),
                () => l("error")
              );
            } catch (B) {
              p(Tf(B)), l("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    R.length > 0 && /* @__PURE__ */ d.jsxs("table", { className: ZC, children: [
      /* @__PURE__ */ d.jsx("thead", { children: /* @__PURE__ */ d.jsxs("tr", { children: [
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "#" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Status" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Duration" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ d.jsx("tbody", { children: R.map((B) => /* @__PURE__ */ d.jsxs("tr", { className: JC, children: [
        /* @__PURE__ */ d.jsx("td", { className: fr, children: B.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: /* @__PURE__ */ d.jsx(Zr, { tone: aD(B.status), children: B.status }) }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: B.durationMs ? `${B.durationMs} ms` : "—" }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: B.failureCategory ?? "" })
      ] }, B.globalIndex)) })
    ] })
  ] });
}
async function L0(t, a, i, l, o, u) {
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
        const h = await kh(o, u);
        l(h);
      } catch {
      }
      return;
  }
}
function aD(t) {
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
function Tf(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
var rD = "xq3iim0", iD = "xq3iim2 xq3iim1", sD = "xq3iim3 xq3iim1", lD = "xq3iim4", oD = "xq3iim5", cD = "xq3iim6", uD = "xq3iim7";
function dD({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [l, o] = y.useState([]), [u, h] = y.useState(a), [m, v] = y.useState(!0), [p, x] = y.useState(!1), [g, S] = y.useState(null);
  y.useEffect(() => {
    let w = !1;
    return v(!0), ml(t).then(({ voiceAssets: N }) => {
      w || o(N);
    }).catch((N) => {
      w || S(N instanceof Error ? N.message : "Failed to load voices");
    }).finally(() => {
      w || v(!1);
    }), () => {
      w = !0;
    };
  }, [t]);
  async function E(w) {
    x(!0), S(null);
    const N = u;
    h(w);
    try {
      await uT(t, w), i?.(w);
    } catch (R) {
      h(N), S(R instanceof Error ? R.message : "Failed to update default voice");
    } finally {
      x(!1);
    }
  }
  return m ? /* @__PURE__ */ d.jsx("p", { className: cD, children: "Loading voices…" }) : g ? /* @__PURE__ */ d.jsx("p", { className: uD, children: g }) : l.length === 0 ? /* @__PURE__ */ d.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ d.jsx(
    Tl,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ d.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: rD,
      children: l.map((w) => {
        const N = w.voiceAssetId === u;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": N,
            disabled: p,
            onClick: () => void E(N ? null : w.voiceAssetId),
            className: N ? sD : iD,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: lD, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ d.jsx("span", { className: oD, children: fD(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function fD(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), l = Math.round(a - i * 60);
  return `${i}:${l.toString().padStart(2, "0")}`;
}
const U0 = [
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
function hD(t) {
  const a = El(), i = y.useRef(null), { tokens: l, attributions: o, unresolved: u, predictedFilenames: h, characterColor: m } = y.useMemo(
    () => pD(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), v = (p) => {
    const x = i.current;
    x && (x.scrollTop = p.currentTarget.scrollTop, x.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: YC, children: [
      /* @__PURE__ */ d.jsx("div", { ref: i, className: GC, "aria-hidden": "true", children: l.map((p, x) => mD(p, x, m)) }),
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: XC,
          value: t.value,
          onChange: (p) => t.onChange(p.currentTarget.value),
          onScroll: v,
          placeholder: `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    u.length > 0 && /* @__PURE__ */ d.jsxs(zn, { severity: "error", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      u.map((p) => /* @__PURE__ */ d.jsxs(
        Ve,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${t.deploymentId}/mappings/new?character=${encodeURIComponent(p)}`
          ),
          children: [
            "Create mapping for ",
            p
          ]
        },
        p
      ))
    ] }),
    o.length > 0 && /* @__PURE__ */ d.jsxs("div", { children: [
      /* @__PURE__ */ d.jsx("span", { className: Fi, children: "Parsed lines" }),
      /* @__PURE__ */ d.jsx("ul", { className: Ky, children: o.map((p) => /* @__PURE__ */ d.jsxs("li", { children: [
        "#",
        p.lineNumber.toString().padStart(3, "0"),
        " [",
        p.character,
        "] ",
        p.text,
        !p.hasMapping && p.character !== "Narrator" && " — unresolved"
      ] }, p.lineNumber)) })
    ] }),
    h.length > 0 && /* @__PURE__ */ d.jsxs("div", { children: [
      /* @__PURE__ */ d.jsx("span", { className: Fi, children: "Predicted filenames" }),
      /* @__PURE__ */ d.jsx("ul", { className: Ky, children: h.map((p) => /* @__PURE__ */ d.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function mD(t, a, i) {
  if (t.kind === "blank")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      /* @__PURE__ */ d.jsx("span", { className: Py, children: t.raw }),
      `
`
    ] }, a);
  const l = i.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? Xy : `${Xy} ${PC}`;
  return /* @__PURE__ */ d.jsxs("span", { children: [
    /* @__PURE__ */ d.jsxs("span", { className: o, style: { color: l }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ d.jsxs("span", { className: KC, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: Py, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function pD(t, a, i) {
  const l = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), v = [], p = /* @__PURE__ */ new Map();
  let x = 0;
  const g = t.split(/\r?\n/);
  let S = 0;
  return g.forEach((E, w) => {
    const N = E.trim();
    if (!N) {
      o.push({ kind: "blank", raw: E });
      return;
    }
    const R = w + 1, T = N.match(l);
    let k = "Narrator", _ = N, A, Z = !1;
    if (T?.groups) {
      Z = !0;
      const q = (T.groups.body ?? "").trim(), I = (T.groups.rest ?? "").trim();
      k = ((q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", A = (q.includes("|") ? q.slice(q.indexOf("|") + 1) : "").trim() || void 0, _ = I;
    }
    S += 1;
    const W = k.toLowerCase(), ne = (m.get(W) ?? 0) + 1;
    m.set(W, ne);
    const D = k === "Narrator" || i.has(W);
    if (D || h.add(k), k !== "Narrator" && !p.has(W) && (p.set(W, U0[x % U0.length] ?? "currentColor"), x += 1), Z) {
      const q = { kind: "character", raw: E, character: k, text: _, hasMapping: D };
      A !== void 0 && (q.override = A), o.push(q);
    } else
      o.push({ kind: "narrator", raw: E });
    u.push({ lineNumber: R, character: k, text: _, hasMapping: D }), v.push(
      `${S.toString().padStart(3, "0")}_${gD(k)}_${ne.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(h),
    predictedFilenames: v,
    characterColor: p
  };
}
function gD(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
var vD = "_5o8xvy0", yD = "_5o8xvy1", bD = "_5o8xvy2", xD = "_5o8xvy3", Cf = "_5o8xvy4", SD = "_3f2ar0", wD = "_3f2ar1", ED = "_3f2ar2", jD = "_3f2ar3", ND = "_3f2ar4", TD = "_3f2ar6", el = "_3f2ar7", tl = "_3f2ar8", nl = "_3f2ar9", B0 = "_3f2ara", V0 = "_3f2arb";
function CD({ label: t, glyph: a = "?", children: i }) {
  const [l, o] = y.useState(!1), u = y.useRef(null), h = y.useId(), m = `${h}-content`, v = y.useCallback(() => o(!1), []);
  return y.useEffect(() => {
    if (!l) return;
    const p = (g) => {
      u.current && (g.target instanceof Node && u.current.contains(g.target) || v());
    }, x = (g) => {
      g.key === "Escape" && v();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", x), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", x);
    };
  }, [l, v]), /* @__PURE__ */ d.jsxs("span", { ref: u, className: SD, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: wD,
        "aria-expanded": l,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: ED, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    l && /* @__PURE__ */ d.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": h,
        className: jD,
        children: i
      }
    )
  ] });
}
var RD = "_1dxb1dg0", $0 = "_1dxb1dg1", MD = "_1dxb1dg2", _D = "_1dxb1dg3", AD = "_1dxb1dg4";
function DD() {
  return /* @__PURE__ */ d.jsxs(CD, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ d.jsx("h3", { className: ND, children: "Script syntax" }),
    /* @__PURE__ */ d.jsxs("ul", { className: TD, children: [
      /* @__PURE__ */ d.jsxs("li", { className: el, children: [
        /* @__PURE__ */ d.jsx("code", { className: tl, children: "[Char] line text" }),
        /* @__PURE__ */ d.jsx("span", { className: nl, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: el, children: [
        /* @__PURE__ */ d.jsx("code", { className: tl, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ d.jsx("span", { className: nl, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: el, children: [
        /* @__PURE__ */ d.jsx("code", { className: tl, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ d.jsx("span", { className: nl, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: el, children: [
        /* @__PURE__ */ d.jsx("code", { className: tl, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ d.jsx("span", { className: nl, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: el, children: [
        /* @__PURE__ */ d.jsx("code", { className: tl, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ d.jsx("span", { className: nl, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: B0, children: [
      /* @__PURE__ */ d.jsx("span", { className: V0, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: B0, children: [
      /* @__PURE__ */ d.jsx("span", { className: V0, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function zD() {
  return /* @__PURE__ */ d.jsxs("ul", { className: RD, children: [
    /* @__PURE__ */ d.jsxs("li", { children: [
      /* @__PURE__ */ d.jsx("code", { className: $0, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ d.jsxs("li", { children: [
      /* @__PURE__ */ d.jsx("code", { className: $0, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ d.jsxs("li", { children: [
      /* @__PURE__ */ d.jsx("code", { className: MD, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ d.jsxs("li", { children: [
      /* @__PURE__ */ d.jsx("code", { className: _D, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ d.jsxs("li", { children: [
      /* @__PURE__ */ d.jsx("code", { className: AD, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function OD({
  quickMode: t,
  onToggleQuickMode: a,
  deployment: i,
  script: l,
  onScriptChange: o,
  outputFormat: u,
  mappingsByLower: h,
  defaultVoiceAssetId: m,
  onDefaultVoiceAssetIdChange: v
}) {
  const p = l.length, x = l.trim() ? l.trim().split(/\s+/).length : 0, g = l.trim() ? l.trim().split(/\r?\n/).filter((S) => S.trim()).length : 0;
  return /* @__PURE__ */ d.jsxs("div", { className: vD, children: [
    /* @__PURE__ */ d.jsxs("div", { className: yD, children: [
      /* @__PURE__ */ d.jsxs("label", { className: bD, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            onChange: (S) => a(S.target.checked)
          }
        ),
        "Quick mode (no character mapping required)"
      ] }),
      t && /* @__PURE__ */ d.jsx(
        dD,
        {
          deploymentId: i.deploymentId,
          initialVoiceAssetId: m,
          onChange: v
        }
      ),
      /* @__PURE__ */ d.jsxs("div", { className: xD, "aria-live": "polite", children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          /* @__PURE__ */ d.jsx("strong", { className: Cf, children: p.toString().padStart(3, "0") }),
          " ",
          "chars"
        ] }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          /* @__PURE__ */ d.jsx("strong", { className: Cf, children: g.toString().padStart(2, "0") }),
          " ",
          "lines"
        ] }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          /* @__PURE__ */ d.jsx("strong", { className: Cf, children: x.toString().padStart(3, "0") }),
          " ",
          "words"
        ] }),
        /* @__PURE__ */ d.jsx(DD, {})
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(
      hD,
      {
        value: l,
        onChange: o,
        outputFormat: u,
        mappings: h,
        deploymentId: i.deploymentId
      }
    ),
    /* @__PURE__ */ d.jsx(zD, {})
  ] });
}
function kD({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: l,
  unmappedCount: o,
  globalEmotion: u,
  performance: h
}) {
  const m = [], v = t.trim();
  if (!v)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = v.split(/\r?\n/).filter((x) => x.trim()).length;
    m.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${p} lines · ${v.length} chars`
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
  }), u.mode === "qwen_template" && !u.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (u.mode === "emotion_vector") {
    const p = u.vector, x = Array.isArray(p) && p.some((g) => Math.abs(g) > 0.01);
    m.push({
      id: "emotion",
      status: x ? "ok" : "info",
      label: "Emotion",
      detail: x ? "8-axis vector" : "neutral vector"
    });
  } else u.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const Rf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], LD = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function UD(t) {
  const a = [];
  if (!t) return a;
  const i = t.split(/\r?\n/);
  for (let l = 0; l < i.length; l += 1) {
    const u = (i[l] ?? "").trim();
    if (u.length === 0) continue;
    const h = u.match(LD);
    if (!h || !h.groups) {
      a.push({ idx: l, character: null, text: u, override: null });
      continue;
    }
    const m = h.groups.body ?? "", v = (h.groups.rest ?? "").trim(), [p = "", ...x] = m.split("|"), g = p.trim();
    if (!g) {
      a.push({ idx: l, character: null, text: v || u, override: null });
      continue;
    }
    const S = g.split(":")[0]?.trim() || null, E = x.join("|").trim(), w = E ? BD(E) : null;
    a.push({
      idx: l,
      character: S,
      text: v,
      override: w
    });
  }
  return a;
}
function BD(t) {
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
function VD(t) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const l of t) {
    if (!l.character) continue;
    const o = l.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(l.character));
  }
  return i;
}
function $D(t) {
  const a = {};
  for (let i = 0; i < t.length; i += 1) {
    const l = t[i];
    l && (a[l] = Rf[i % Rf.length] ?? Rf[0]);
  }
  return a;
}
function HD(t) {
  const a = {};
  for (const i of t)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var qD = "_1snzz30", ID = "_1snzz31", FD = "_1snzz33", YD = "_1snzz34", GD = "_1snzz36", H0 = "_1snzz3b", q0 = "_1snzz3c", I0 = "_1snzz3d";
const XD = 4e3;
function PD({ visible: t, canGenerate: a }) {
  const [i, l] = y.useState(null), [o, u] = y.useState(!1), [h, m] = y.useState(!1), v = y.useRef(null);
  y.useEffect(() => {
    let C = !1;
    const U = async () => {
      try {
        const K = await yc();
        C || (v.current = K, l(K));
      } catch {
      }
    };
    U();
    const B = window.setInterval(U, XD);
    return () => {
      C = !0, window.clearInterval(B);
    };
  }, []), y.useEffect(() => $3((C) => {
    m(!!C.busy);
  }), []);
  const p = y.useCallback(() => {
    U3();
  }, []), x = i?.badge ?? "not_installed", g = x === "ready" || x === "running", S = x === "starting" || x === "installing", E = g, w = y.useCallback(async () => {
    const C = v.current?.badge ?? "not_installed", U = C === "ready" || C === "running";
    u(!0);
    try {
      U ? (await Lx(), Zt.success("Runtime stopped")) : (await kx(), Zt.success("Runtime starting…"));
    } catch (B) {
      Zt.error(B instanceof Error ? B.message : "runtime action failed");
    } finally {
      u(!1);
    }
  }, []), N = g ? "Stop runtime" : S ? "Runtime starting…" : "Start runtime", R = o || S, T = o || S, k = T ? "transitioning" : g ? "running" : "stopped", _ = !a || h || !E, A = E ? a ? h ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", Z = E && a && !h, W = g ? "ready" : S || o ? "busy" : "off", ne = g ? "Runtime ready" : S ? "Starting…" : o ? "Working…" : "Runtime off", D = W === "busy";
  if (typeof document > "u") return /* @__PURE__ */ d.jsx(d.Fragment, {});
  const q = "rgba(28, 30, 34, 0.94)", I = "#ba9eff", ie = "#8455ef", re = "#1a0a3a", te = "#f0f0f3", ce = "#aaabae", J = "#22c55e", O = g ? "◼" : "⏻";
  return Lh.createPortal(
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: qD,
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
          /* @__PURE__ */ d.jsxs(
            "span",
            {
              className: ID,
              "data-tone": W,
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
                color: W === "ready" ? J : W === "busy" ? I : ce,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${W === "ready" ? "rgba(34, 197, 94, 0.4)" : W === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ d.jsx(
                  "span",
                  {
                    className: FD,
                    "data-pulse": D ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: W === "ready" ? `0 0 8px ${J}` : W === "busy" ? `0 0 8px ${I}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ne
              ]
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: q0, children: [
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: YD,
                "data-state": k,
                onClick: w,
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
                  background: k === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: k === "running" ? J : te,
                  fontSize: "16px",
                  cursor: R ? "not-allowed" : "pointer",
                  opacity: R ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${k === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ d.jsx("span", { className: H0, "aria-hidden": "true" }) : /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: O })
              }
            ),
            /* @__PURE__ */ d.jsx("span", { className: I0, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: q0, children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: GD,
                "data-ready": Z ? "true" : "false",
                onClick: p,
                disabled: _,
                "aria-label": A,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: _ ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${I} 0%, ${ie} 100%)`,
                  color: _ ? ce : re,
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
                  h ? /* @__PURE__ */ d.jsx("span", { className: H0, "aria-hidden": "true" }) : /* @__PURE__ */ d.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ d.jsx("span", { children: h ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ d.jsx("span", { className: I0, role: "tooltip", children: A })
          ] })
        ]
      }
    ),
    document.body
  );
}
function KD(t) {
  const a = t.workflowCustomised ?? !1, i = t.unmappableFields ?? [], l = QD(t.deployment.displayName, t.deployment.deploymentId), o = Kx(Qx), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ d.jsxs("div", { className: NC, children: [
    /* @__PURE__ */ d.jsxs("header", { className: TC, children: [
      /* @__PURE__ */ d.jsx("div", { className: RC, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ d.jsx("div", { className: CC, children: /* @__PURE__ */ d.jsx("h1", { className: MC, children: l }) }),
      /* @__PURE__ */ d.jsx("p", { className: _C, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ d.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ d.jsx("div", { className: HC, "aria-label": "Quick actions", children: t.quickActions }),
    /* @__PURE__ */ d.jsxs("div", { className: AC, children: [
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: t.scriptSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: t.parsedDialogueSection
        }
      ),
      t.voiceLibrarySection && /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: t.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: t.castSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: t.emotionSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: t.performanceSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: t.recentRunsSection
        }
      ),
      t.auditSection && /* @__PURE__ */ d.jsx(
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
    /* @__PURE__ */ d.jsx(PD, { visible: o, canGenerate: u }),
    typeof document < "u" && Lh.createPortal(
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: qC,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: L3,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function QD(t, a) {
  const i = (t ?? "").trim();
  return !i || i === a ? "Recipe Studio" : i;
}
function hr({
  number: t,
  title: a,
  id: i,
  variant: l,
  defaultCollapsed: o = !1,
  children: u
}) {
  const [h, m] = y.useState(o), v = `${i}-body`;
  return /* @__PURE__ */ d.jsxs("section", { className: DC, "aria-labelledby": i, children: [
    /* @__PURE__ */ d.jsx("header", { className: zC, children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: LC,
        "aria-expanded": !h,
        "aria-controls": v,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ d.jsxs("span", { className: OC, children: [
            /* @__PURE__ */ d.jsx("span", { className: UC, children: t }),
            /* @__PURE__ */ d.jsx("span", { className: BC, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ d.jsx("span", { className: VC, children: a })
          ] }),
          /* @__PURE__ */ d.jsx("h2", { id: i, className: kC, children: a }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: $C,
              "data-collapsed": h ? "true" : "false",
              "aria-hidden": "true",
              children: "▾"
            }
          )
        ]
      }
    ) }),
    !h && /* @__PURE__ */ d.jsx(
      "div",
      {
        id: v,
        className: l === "split" ? FC : IC,
        children: u
      }
    )
  ] });
}
const _n = {
  success(t) {
    Zt.success(t);
  },
  error(t) {
    Zt.error(t);
  }
}, Zf = "__recipe";
function ZD(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function JD(t) {
  const a = {};
  for (const i of Object.keys(t))
    i !== Zf && (a[i] = t[i]);
  return a;
}
function WD() {
  const { deployment: t, mappings: a, runs: i, workflow: l } = Nl(), [o, u] = y.useState(a), [h, m] = y.useState([]), [v, p] = y.useState([]), [x, g] = y.useState(null), [S, E] = y.useState(kc), w = y.useMemo(
    () => t.defaultGenerationOverridesJson ? ZD(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = y.useMemo(() => {
    const he = w[Zf];
    return typeof he == "object" && he !== null ? he : {};
  }, [w]), [R, T] = y.useState(""), [k, _] = y.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [A, Z] = y.useState(t.defaultSpeedFactor ?? 1), [W, ne] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [D, q] = y.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...JD(w)
  })), [I, ie] = y.useState(() => {
    const he = N.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "use_cache";
  }), [re, te] = y.useState(
    t.defaultVoiceAssetId ?? null
  ), [ce, J] = y.useState(() => {
    const he = N.quickMode;
    return typeof he == "boolean" ? he : t.defaultVoiceAssetId != null;
  }), [O, C] = y.useState(m3);
  y.useEffect(() => {
    let he = !1;
    return ml(t.deploymentId).then((ke) => {
      he || m(ke.voiceAssets);
    }).catch(() => {
    }), Dx(t.deploymentId).then((ke) => {
      he || p(ke.presets);
    }).catch(() => {
    }), () => {
      he = !0;
    };
  }, [t.deploymentId]);
  const U = y.useRef(!0);
  y.useEffect(() => {
    if (U.current) {
      U.current = !1;
      return;
    }
    const he = window.setTimeout(() => {
      const ke = {
        ...D,
        [Zf]: {
          quickMode: ce,
          cachePolicy: I
        }
      };
      ht(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: k,
          defaultSpeedFactor: A,
          defaultGenerationOverrides: ke
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(he);
  }, [
    t.deploymentId,
    k,
    A,
    I,
    ce,
    D
  ]);
  const B = y.useMemo(() => UD(R), [R]), K = y.useMemo(() => VD(B), [B]), M = y.useMemo(() => $D(K), [K]), Q = y.useMemo(() => HD(B), [B]), X = y.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const ke of o)
      he.set(ke.characterName.toLowerCase(), ke);
    return he;
  }, [o]), le = y.useMemo(() => ce && re ? 0 : K.filter((he) => !X.has(he.toLowerCase())).length, [K, X, ce, re]), fe = y.useCallback(
    async (he, ke) => {
      const De = X.get(he.toLowerCase());
      try {
        if (De) {
          const Te = await cl(t.deploymentId, De.mappingId, ke);
          u(
            (bt) => bt.map((xt) => xt.mappingId === Te.mappingId ? Te : xt)
          ), _n.success(`Updated mapping for ${he}`);
        } else if (ke.speakerVoiceAssetId) {
          const Te = await Oh(t.deploymentId, {
            ...ke,
            characterName: he,
            speakerVoiceAssetId: ke.speakerVoiceAssetId
          });
          u((bt) => [...bt, Te]), _n.success(`Mapped ${he} to voice`);
        }
      } catch (Te) {
        _n.error(Te instanceof Error ? Te.message : "mapping failed");
      }
    },
    [X, t.deploymentId]
  ), ve = y.useCallback(
    async (he) => {
      const ke = X.get(he.toLowerCase());
      if (ke)
        try {
          await Tx(t.deploymentId, ke.mappingId), u((De) => De.filter((Te) => Te.mappingId !== ke.mappingId)), _n.success(`Cleared mapping for ${he}`);
        } catch (De) {
          _n.error(De instanceof Error ? De.message : "clear failed");
        }
    },
    [X, t.deploymentId]
  ), Ae = y.useCallback(
    async (he, ke) => {
      try {
        const De = await vc(
          t.deploymentId,
          ke,
          ke.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Te) => [De, ...Te]), await fe(he, { speakerVoiceAssetId: De.voiceAssetId });
      } catch (De) {
        _n.error(De instanceof Error ? De.message : "upload failed");
      }
    },
    [t.deploymentId, fe]
  ), Me = y.useCallback((he) => {
    E(he);
  }, []), $e = y.useMemo(() => {
    const he = [], ke = /* @__PURE__ */ new Set();
    for (const De of o) {
      const Te = De.speakerVoiceAssetId;
      if (!Te || ke.has(Te)) continue;
      ke.add(Te);
      const xt = h.find((dn) => dn.voiceAssetId === Te)?.displayName ?? `${De.characterName} · ${Te.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: Te, label: xt });
    }
    for (const De of h)
      ke.has(De.voiceAssetId) || (ke.add(De.voiceAssetId), he.push({ kind: "voice_asset", id: De.voiceAssetId, label: De.displayName }));
    return he;
  }, [o, h]), Jt = y.useCallback(
    async (he, ke) => {
      if (he.kind !== "voice_asset") {
        _n.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let De;
      try {
        const Te = JSON.parse(ke);
        if (typeof Te != "object" || Te === null || Te.version !== 1 || !Array.isArray(Te.ops))
          throw new Error("snapshot is not a valid EditChain");
        De = Te;
      } catch (Te) {
        _n.error(
          Te instanceof Error ? `Audit snapshot is malformed: ${Te.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Te = await Rx(he.id, t.deploymentId, {
          chain: De
        }), bt = o.filter((xt) => xt.speakerVoiceAssetId === he.id);
        await Promise.all(
          bt.map(
            (xt) => cl(t.deploymentId, xt.mappingId, {
              voiceAssetChainDigest: Te.chain_digest
            }).catch(() => null)
          )
        ), u(
          (xt) => xt.map(
            (dn) => dn.speakerVoiceAssetId === he.id ? { ...dn, voiceAssetChainDigest: Te.chain_digest } : dn
          )
        ), _n.success(`Reverted ${he.label} to a prior chain`);
      } catch (Te) {
        _n.error(Te instanceof Error ? Te.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Pt = y.useCallback(
    async (he) => {
      if (he.kind !== "voice_asset") {
        _n.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await SC(he.id, t.deploymentId);
        const ke = o.filter((De) => De.speakerVoiceAssetId === he.id);
        await Promise.all(
          ke.map(
            (De) => cl(t.deploymentId, De.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (De) => De.map(
            (Te) => Te.speakerVoiceAssetId === he.id ? { ...Te, voiceAssetChainDigest: null } : Te
          )
        ), _n.success(`Cleared edit chain on ${he.label}`);
      } catch (ke) {
        _n.error(ke instanceof Error ? ke.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), At = y.useMemo(
    () => ({
      script: R,
      parserMode: ce ? "raw_text" : "dialogue",
      outputFormat: k,
      speedFactor: A,
      globalEmotion: { ...W, emotionAlpha: O.intensity },
      generation: D,
      cachePolicy: I
    }),
    [R, ce, k, A, O.intensity, W, D, I]
  ), et = y.useMemo(
    () => kD({
      script: R,
      quickMode: ce,
      defaultVoiceAssetId: re,
      characters: K,
      unmappedCount: le,
      globalEmotion: W,
      performance: O
    }),
    [R, ce, re, K, le, W, O]
  ), pt = y.useMemo(
    () => et.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "fail",
      detail: he.detail
    })),
    [et]
  );
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(bC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ d.jsx(
      KD,
      {
        deployment: t,
        canGenerate: R.trim().length > 0,
        workflowCustomised: l.workflow.customised,
        unmappableFields: l.unmappableFields,
        hero: /* @__PURE__ */ d.jsx(IM, { deployment: t }),
        quickActions: /* @__PURE__ */ d.jsx(
          nD,
          {
            deploymentId: t.deploymentId,
            createPayload: At,
            canGenerate: R.trim().length > 0,
            diagnostics: pt
          }
        ),
        scriptSection: /* @__PURE__ */ d.jsx(
          OD,
          {
            quickMode: ce,
            onToggleQuickMode: J,
            deployment: t,
            script: R,
            onScriptChange: T,
            outputFormat: k,
            mappingsByLower: X,
            defaultVoiceAssetId: re,
            onDefaultVoiceAssetIdChange: te
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ d.jsx(i3, { lines: B, characterColors: M }),
        voiceLibrarySection: /* @__PURE__ */ d.jsx(
          aM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: h,
            mappings: o,
            characterColors: M,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ d.jsx(VM, { unmappedCount: le, totalCount: K.length, children: K.map((he) => {
          const ke = X.get(he.toLowerCase()) ?? null, De = M[he] ?? "#ba9eff";
          return /* @__PURE__ */ d.jsx("li", { className: WC, children: /* @__PURE__ */ d.jsx(
            BM,
            {
              characterName: he,
              color: De,
              lineCount: Q[he] ?? 0,
              mapping: ke,
              voiceAssets: h,
              presets: v,
              active: x === he,
              onToggle: () => g((Te) => Te === he ? null : he),
              onAssignVoiceAsset: (Te) => fe(he, { speakerVoiceAssetId: Te }),
              onAssignPreset: (Te) => fe(he, { defaultVectorPresetId: Te }),
              onUploadFile: (Te) => Ae(he, Te),
              onClearMapping: () => ve(he)
            }
          ) }, he);
        }) }),
        emotionSection: /* @__PURE__ */ d.jsx(
          D2,
          {
            value: W,
            onChange: ne,
            deploymentId: t.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            p3,
            {
              value: { ...O, pace: A },
              onChange: (he) => {
                C(he), he.pace !== A && Z(he.pace);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Vh,
            {
              state: S,
              onChange: Me,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ d.jsx(T3, { checks: et }),
          /* @__PURE__ */ d.jsx(
            K2,
            {
              outputFormat: k,
              onOutputFormatChange: _,
              speedFactor: A,
              onSpeedFactorChange: Z,
              cachePolicy: I,
              onCachePolicyChange: ie,
              generation: D,
              onGenerationChange: q
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ d.jsx(z3, { runs: i, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ d.jsx(
          bM,
          {
            deploymentId: t.deploymentId,
            targets: $e,
            onRevertToIdentity: Pt,
            onRevertToChain: Jt
          }
        )
      }
    )
  ] });
}
const F0 = /* @__PURE__ */ new Map();
function ez(t, a) {
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
    const o = `${t}::${a}`, u = F0.get(o);
    if (u) {
      l({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return l({ peaks: null, isLoading: !0, error: null }), tz(t, a, h.signal).then((m) => {
      h.signal.aborted || (F0.set(o, m), l({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const v = m instanceof Error ? m.message : "decode failed";
      l({ peaks: null, isLoading: !1, error: v });
    }), () => h.abort();
  }, [t, a]), i;
}
async function tz(t, a, i) {
  const l = await fetch(t, { signal: i });
  if (!l.ok) throw new Error(`failed to load audio (${l.status})`);
  const o = await l.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return nz(h, a);
}
function nz(t, a) {
  const i = t.numberOfChannels, l = t.length, o = Math.max(1, Math.floor(l / a)), u = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const v = m * o, p = Math.min(l, v + o);
    let x = 0;
    for (let g = v; g < p; g += 1) {
      let S = 0;
      for (let w = 0; w < i; w += 1) {
        const N = h[w];
        N && (S += Math.abs(N[g] ?? 0));
      }
      const E = S / i;
      E > x && (x = E);
    }
    u[m] = x;
  }
  return u;
}
const Y0 = "(prefers-reduced-motion: reduce)";
function az() {
  const [t, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Y0).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(Y0), l = (o) => a(o.matches);
    return i.addEventListener("change", l), () => i.removeEventListener("change", l);
  }, []), t;
}
var rz = "mquzal0", iz = "mquzal1", G0 = "mquzal2", X0 = "mquzal3", P0 = "mquzal4", sz = "mquzal5", K0 = "mquzal6", Q0 = "mquzal7";
const lz = 120, oz = 720;
function Zx(t) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: l,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: v = 0,
    onSeek: p,
    width: x = oz,
    height: g = lz
  } = t, S = y.useRef(null), E = y.useRef(null), w = y.useRef(null), N = ez(a, x), R = az();
  y.useEffect(() => {
    cz(S.current, N.peaks, x, g);
  }, [N.peaks, x, g]);
  const T = y.useCallback(
    (D) => {
      const q = E.current?.getBoundingClientRect();
      if (!q || q.width <= 0) return 0;
      const I = Math.max(0, Math.min(1, (D - q.left) / q.width));
      return Math.round(I * i);
    },
    [i]
  );
  y.useEffect(() => {
    const D = (I) => {
      if (!w.current) return;
      const ie = T(I.clientX);
      w.current === "start" ? u(Jo(ie, 0, o - 1)) : h(Jo(ie, l + 1, i));
    }, q = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", D), window.addEventListener("pointerup", q), () => {
      window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", q);
    };
  }, [T, i, o, l, u, h]);
  const k = (D) => (q) => {
    q.preventDefault(), q.stopPropagation(), w.current = D;
  }, _ = (D) => {
    !p || D.target.closest("[data-handle]") || p(T(D.clientX));
  }, A = (D) => (q) => {
    const I = q.shiftKey ? 100 : q.ctrlKey ? 1 : 10;
    let ie = 0;
    if (q.key === "ArrowLeft") ie = -I;
    else if (q.key === "ArrowRight") ie = I;
    else return;
    q.preventDefault(), D === "start" ? u(Jo(l + ie, 0, o - 1)) : h(Jo(o + ie, l + 1, i));
  }, Z = Mf(l, i), W = Mf(o, i), ne = Mf(v, i);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: E,
      className: rz,
      style: { height: g },
      onPointerDown: _,
      children: [
        /* @__PURE__ */ d.jsx(
          "canvas",
          {
            ref: S,
            width: x,
            height: g,
            className: iz,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ d.jsx("div", { className: Q0, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ d.jsx("div", { className: Q0, role: "alert", children: N.error }),
        /* @__PURE__ */ d.jsx("div", { className: K0, style: { left: 0, width: `${Z}%` } }),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: K0,
            style: { left: `${W}%`, right: 0, width: `${100 - W}%` }
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: G0,
            style: { left: `${Z}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": l,
            tabIndex: 0,
            onPointerDown: k("start"),
            onKeyDown: A("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: X0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: P0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: G0,
            style: { left: `${W}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: k("end"),
            onKeyDown: A("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: X0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: P0, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: sz,
            style: {
              left: `${ne}%`,
              transition: R ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Mf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function Jo(t, a, i) {
  return Math.max(a, Math.min(i, t));
}
function cz(t, a, i, l) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, l), !a || a.length === 0)) return;
  const u = l / 2;
  o.fillStyle = uz(t, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const v = a[m] ?? 0, p = Math.max(1, v * (l - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function uz(t, a, i) {
  return getComputedStyle(t).getPropertyValue(a).trim() || i;
}
var dz = "r8lfsm0", fz = "r8lfsm1", hz = "r8lfsm2", mz = "r8lfsm3", pz = "r8lfsm4", gz = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, vz = "_1b1zchy3", yz = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, bz = "_1b1zchy6", xz = "_1b1zchy7";
const Jx = y.createContext("standalone");
function Wx({
  variant: t = "standalone",
  children: a,
  className: i,
  style: l,
  ...o
}) {
  const u = [gz[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(Jx.Provider, { value: t, children: /* @__PURE__ */ d.jsx("div", { className: u, style: l, ...o, children: a }) });
}
function e1({
  title: t,
  meta: a,
  children: i,
  className: l,
  titleId: o
}) {
  const u = y.useContext(Jx), h = [vz, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsxs("div", { className: h, children: [
    /* @__PURE__ */ d.jsx("h3", { id: o, className: yz[u], children: t }),
    a ? /* @__PURE__ */ d.jsx("span", { className: bz, children: a }) : null,
    i
  ] });
}
function t1({
  children: t,
  className: a,
  role: i = "group"
}) {
  const l = [xz, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: l, role: i, children: t });
}
const Z0 = -16, Sz = 80, wz = 720;
function Ez(t) {
  const { deploymentId: a, runId: i, utterance: l, audioUrl: o, onApplied: u, onError: h, onCancel: m } = t, v = l.durationMs ?? 0, [p, x] = y.useState(() => J0(v)), [g, S] = y.useState(kc), [E, w] = y.useState(!1), [N, R] = y.useState(!1), [T, k] = y.useState(null), [_, A] = y.useState(!1), Z = y.useRef(null), W = y.useRef(null), ne = y.useRef(null);
  y.useEffect(() => {
    const U = J0(v);
    x(U), S(qx(U)), R(!1), k(null), ne.current = null;
  }, [l.utteranceId, v]);
  const D = y.useCallback((U) => {
    S(U), x((B) => Hx(B, U));
  }, []);
  y.useEffect(() => () => W.current?.abort(), []), y.useEffect(() => {
    Z.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [l.utteranceId]);
  const q = y.useCallback(
    (U) => {
      U.key === "Escape" && (U.stopPropagation(), m());
    },
    [m]
  ), I = y.useMemo(
    () => p.ops.find((U) => U.mode === "trim"),
    [p.ops]
  ), ie = I?.start_ms ?? 0, re = I?.end_ms ?? Math.max(1, v), te = y.useCallback((U, B) => {
    x((K) => jz(K, "trim", (M) => ({
      ...M,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(B))
    })));
  }, []), ce = y.useCallback((U) => te(U, re), [re, te]), J = y.useCallback((U) => te(ie, U), [ie, te]), O = y.useCallback((U) => {
    R(U), x((B) => {
      const K = B.ops.filter((M) => M.mode !== "normalize");
      if (U) {
        const M = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Z0
        };
        return { ...B, ops: [...K, M] };
      }
      return { ...B, ops: K };
    });
  }, []), C = y.useCallback(async () => {
    const U = Mx(p, v);
    if (U) {
      k(U.message);
      return;
    }
    if (k(null), _) return;
    W.current?.abort();
    const B = new AbortController();
    W.current = B, A(!0);
    try {
      const K = ne.current ?? void 0, M = await xC(
        a,
        i,
        l.utteranceId,
        K ? { chain: p, digest_before: K } : { chain: p },
        { signal: B.signal }
      );
      if (B.signal.aborted) return;
      ne.current = M.chain_digest, u(M);
    } catch (K) {
      if (B.signal.aborted) return;
      K instanceof Ki && (ne.current = K.currentDigest || null);
      const M = K instanceof Ki ? "Edit chain has changed in another tab. Reload to continue." : K instanceof Error ? K.message : "apply failed";
      k(M), h(M);
    } finally {
      B.signal.aborted || A(!1);
    }
  }, [p, v, _, a, i, l.utteranceId, u, h]);
  return /* @__PURE__ */ d.jsx(Wx, { variant: "nested", children: /* @__PURE__ */ d.jsxs("div", { ref: Z, onKeyDown: q, children: [
    /* @__PURE__ */ d.jsx(e1, { title: "Edit segment", meta: `Source · ${Wo(v)}` }),
    /* @__PURE__ */ d.jsx(
      Zx,
      {
        audioUrl: o,
        durationMs: Math.max(1, v),
        startMs: ie,
        endMs: re,
        onChangeStart: ce,
        onChangeEnd: J,
        height: Sz,
        width: wz
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: dz, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: fz, children: [
        Wo(ie),
        " → ",
        Wo(re),
        " · ",
        Wo(re - ie)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: hz, children: [
      /* @__PURE__ */ d.jsxs("label", { className: mz, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (U) => O(U.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { children: [
          "Normalize to ",
          Z0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: pz,
          onClick: () => w((U) => !U),
          "aria-expanded": E,
          children: [
            E ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    E && /* @__PURE__ */ d.jsx(
      Vh,
      {
        state: g,
        onChange: D,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ d.jsxs(t1, { children: [
      /* @__PURE__ */ d.jsx(Ve, { size: "sm", onClick: () => void C(), disabled: _, children: _ ? "Applying…" : "Apply" }),
      /* @__PURE__ */ d.jsx(Ve, { variant: "ghost", size: "sm", onClick: m, disabled: _, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: T })
  ] }) });
}
function J0(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function jz(t, a, i) {
  const l = t.ops.findIndex((u) => u.mode === a);
  if (l === -1) {
    const u = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(u)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function Wo(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var Nz = "jq2zyb2", Tz = "jq2zyb3", Cz = "jq2zyb4", Rz = "jq2zyb5", Mz = "jq2zyb6", _z = "jq2zyb7", Az = "jq2zyb8", Dz = "jq2zyb9", zz = "jq2zyba", Oz = "jq2zybb", kz = "jq2zybc", Lz = "jq2zybd", Uz = "jq2zybe", Bz = "jq2zybf jq2zybe", Vz = "jq2zybg", $z = "jq2zybh", Hz = "jq2zybi", qz = "jq2zybj", Iz = "jq2zybk", Fz = "jq2zybl", Yz = "jq2zybm", Gz = "jq2zybn", Xz = "jq2zybo", Pz = "jq2zybp", Kz = "jq2zybq", Qz = "jq2zybr", Zz = "jq2zybs", Jz = "jq2zybt", Wz = "jq2zybu", e5 = "jq2zybv", t5 = "jq2zybw", n5 = "jq2zybx", a5 = "jq2zyby", W0 = "jq2zybz", r5 = "jq2zyb10", i5 = "jq2zyb11", s5 = "jq2zyb12";
const l5 = ["cancelled", "failed", "partial"], o5 = 2600;
function c5() {
  const { run: t } = Nl(), a = El(), [i, l] = y.useState(t), [o, u] = y.useState(!1), [h, m] = y.useState(null), [v, p] = y.useState(null), [x, g] = y.useState(
    null
  );
  y.useEffect(() => {
    l(t);
  }, [t]), y.useEffect(() => {
    if (!x) return;
    const A = setTimeout(() => g(null), o5);
    return () => clearTimeout(A);
  }, [x]);
  const S = y.useMemo(() => f5(i), [i]), E = l5.includes(i.status) && i.kind === "batch", w = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: A } = await Cx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${A}`);
      } catch (A) {
        m(p5(A));
      } finally {
        u(!1);
      }
    }
  }, R = y.useCallback((A) => {
    p((Z) => Z === A ? null : A);
  }, []), T = y.useCallback(() => {
    p(null);
  }, []), k = (A, Z) => {
    l((W) => d5(W, A, Z)), p(null), g({ message: "Segment edited", severity: "success" });
  }, _ = y.useCallback((A) => {
    g({ message: A, severity: "error" });
  }, []);
  return /* @__PURE__ */ d.jsxs("main", { className: Nz, children: [
    /* @__PURE__ */ d.jsxs("div", { className: Tz, children: [
      /* @__PURE__ */ d.jsxs("header", { className: Cz, children: [
        /* @__PURE__ */ d.jsxs("p", { className: Rz, children: [
          i.deploymentId ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx(zc, { to: `/${i.deploymentId}/recipe`, className: Mz, children: "← Back to recipe" }),
            /* @__PURE__ */ d.jsx("span", { className: _z, children: "·" })
          ] }) : null,
          /* @__PURE__ */ d.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: Az, children: [
          /* @__PURE__ */ d.jsxs("h1", { className: Dz, children: [
            h5(i.kind),
            /* @__PURE__ */ d.jsx("span", { className: zz, children: i.runId })
          ] }),
          /* @__PURE__ */ d.jsx(Zr, { size: "md", tone: g5(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("section", { className: Oz, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ d.jsx(ec, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ d.jsx(ec, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ d.jsx(
          ec,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ d.jsx(
          ec,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      E && /* @__PURE__ */ d.jsxs("section", { className: $z, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ d.jsxs("div", { className: Hz, children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-resume-title", className: qz, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ d.jsx("p", { className: Iz, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ d.jsx(Ve, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ d.jsx("p", { className: Fz, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ d.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ d.jsxs(MT, { children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-utterances", className: Pr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ d.jsxs("span", { className: Yz, children: [
            /* @__PURE__ */ d.jsx("span", { className: Gz, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("ul", { className: Xz, children: i.utterances.map((A) => {
          const Z = v === A.utteranceId, W = A.status === "completed" && A.audioArtifactRef !== null && A.audioArtifactRef !== void 0, ne = A.derivedArtifactRef ?? A.audioArtifactRef ?? null, D = ne ? `/api/v1/artifacts/${encodeURIComponent(ne)}/download` : "", q = (A.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ d.jsxs("li", { className: Kz, children: [
            /* @__PURE__ */ d.jsxs("div", { className: Pz, children: [
              /* @__PURE__ */ d.jsxs("span", { className: Zz, children: [
                "#",
                A.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: Jz, title: A.characterDisplay, children: A.characterDisplay }),
              /* @__PURE__ */ d.jsx("span", { className: Wz, title: A.text, children: A.text }),
              /* @__PURE__ */ d.jsxs("span", { className: e5, children: [
                A.cacheHit && /* @__PURE__ */ d.jsx("span", { className: t5, children: "cached" }),
                q && /* @__PURE__ */ d.jsx("span", { className: Qz, children: "edited" }),
                A.durationMs ? /* @__PURE__ */ d.jsx("span", { children: m5(A.durationMs) }) : null,
                /* @__PURE__ */ d.jsx(Zr, { tone: v5(A.status), children: A.status }),
                W && /* @__PURE__ */ d.jsx(
                  Ve,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => R(A.utteranceId),
                    "aria-expanded": Z,
                    "aria-label": Z ? "Close segment editor" : "Edit segment",
                    children: Z ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            Z && D && i.deploymentId && /* @__PURE__ */ d.jsx(
              Ez,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: A,
                audioUrl: D,
                onApplied: (I) => k(A.utteranceId, I),
                onError: _,
                onCancel: T
              }
            )
          ] }, A.utteranceId);
        }) })
      ] }),
      u5(i, w)
    ] }),
    x && /* @__PURE__ */ d.jsx(
      "div",
      {
        className: s5,
        role: x.severity === "error" ? "alert" : "status",
        "aria-live": x.severity === "error" ? "assertive" : "polite",
        children: x.message
      }
    )
  ] });
}
function u5(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const l = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ d.jsx("div", { className: n5, children: a ? /* @__PURE__ */ d.jsxs("div", { className: r5, children: [
    /* @__PURE__ */ d.jsx("p", { className: i5, children: l }),
    /* @__PURE__ */ d.jsxs(
      Ve,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ d.jsx("span", { className: W0, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ d.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: a5,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ d.jsx("span", { className: W0, children: "↓" })
      ]
    }
  ) : null });
}
function d5(t, a, i) {
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
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: kz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: Lz, children: t }),
        /* @__PURE__ */ d.jsx("span", { className: i ? Bz : Uz, children: a }),
        o !== void 0 && /* @__PURE__ */ d.jsx("span", { className: Vz, "aria-hidden": "true" })
      ]
    }
  );
}
function f5(t) {
  const a = t.utterances.length, i = t.utterances.filter((h) => h.status === "completed").length, l = t.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = t.utterances.filter((h) => h.cacheHit).length, u = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: l, cached: o, cacheRatio: u };
}
function h5(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function m5(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function p5(t) {
  return t instanceof Wi ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function g5(t) {
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
function v5(t) {
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
var y5 = "pcphqj2", b5 = "pcphqj3", x5 = "pcphqj4", S5 = "pcphqj5", w5 = "pcphqj6", E5 = "pcphqj7", j5 = "pcphqj8", N5 = "pcphqj9", T5 = "pcphqja", eb = "pcphqjb", C5 = "pcphqjc", R5 = "pcphqjd", M5 = "pcphqje pcphqjd", _5 = "pcphqjf", A5 = "pcphqjg", D5 = "pcphqjh", z5 = "pcphqji", O5 = "pcphqjj pcphqji", k5 = "pcphqjk pcphqji", L5 = "pcphqjl pcphqji", U5 = "pcphqjm", _f = "pcphqjn", Af = "pcphqjo";
function B5() {
  const [t, a] = y.useState(null), [i, l] = y.useState(null);
  return y.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await ht("/runtime/queue");
        o || (a(m.entries), l(null));
      } catch (m) {
        o || l(m instanceof Error ? m.message : "Unknown error");
      }
    };
    u();
    const h = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ d.jsx("main", { className: y5, children: /* @__PURE__ */ d.jsxs("div", { className: b5, children: [
    /* @__PURE__ */ d.jsxs("header", { className: x5, children: [
      /* @__PURE__ */ d.jsx("p", { className: S5, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ d.jsxs("div", { className: w5, children: [
        /* @__PURE__ */ d.jsx("h1", { className: E5, children: "Queue" }),
        /* @__PURE__ */ d.jsx("span", { className: j5, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: N5, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ d.jsx(zn, { severity: "error", children: i }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ d.jsx(La, { density: "compact", children: /* @__PURE__ */ d.jsx(Tl, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ d.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ d.jsx("h2", { id: "runtime-queue-section", className: Pr, children: "01 / In flight" }),
      /* @__PURE__ */ d.jsx("ul", { className: T5, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ d.jsxs(
          "li",
          {
            className: u ? `${eb} ${C5}` : eb,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: u ? M5 : R5, children: o.position }),
              /* @__PURE__ */ d.jsxs("span", { className: _5, children: [
                /* @__PURE__ */ d.jsx("span", { className: A5, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ d.jsx("span", { className: D5, children: o.runId })
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: V5(o.kind), children: $5(o.kind) }),
              /* @__PURE__ */ d.jsx("span", { className: U5, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: _f, children: H5(o.etaSeconds) }),
                /* @__PURE__ */ d.jsx("span", { className: Af, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: _f, children: o.utteranceTotal }),
                /* @__PURE__ */ d.jsx("span", { className: Af, children: "lines" })
              ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: _f, children: "—" }),
                /* @__PURE__ */ d.jsx("span", { className: Af, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function V5(t) {
  switch (t) {
    case "batch":
      return O5;
    case "test_line":
      return k5;
    case "resume":
      return L5;
    default:
      return z5;
  }
}
function $5(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function H5(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), i = t % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function q5() {
  const { deploymentId: t, prefillCharacterName: a } = Nl(), i = El(), [l, o] = y.useState(a), [u, h] = y.useState(""), [m, v] = y.useState("none"), [p, x] = y.useState(!1), [g, S] = y.useState(null), E = y.useRef(null);
  y.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const w = async (N) => {
    N.preventDefault(), x(!0), S(null);
    try {
      await Oh(t, {
        characterName: l,
        speakerVoiceAssetId: u,
        defaultEmotionMode: m
      }), i(`/${t}/recipe`);
    } catch (R) {
      S(R instanceof Error ? R.message : "failed");
    } finally {
      x(!1);
    }
  };
  return /* @__PURE__ */ d.jsxs("main", { children: [
    /* @__PURE__ */ d.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ d.jsxs("form", { onSubmit: w, children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: E,
            value: l,
            onChange: (N) => o(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ d.jsx(
          "input",
          {
            value: u,
            onChange: (N) => h(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ d.jsxs("select", { value: m, onChange: (N) => v(N.currentTarget.value), children: [
          /* @__PURE__ */ d.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ d.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ d.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ d.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsx(Ve, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      g && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: g })
    ] })
  ] });
}
const n1 = y.createContext({});
function $h(t) {
  const a = y.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const I5 = typeof window < "u", a1 = I5 ? y.useLayoutEffect : y.useEffect, Lc = /* @__PURE__ */ y.createContext(null);
function F5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function Y5(t, a) {
  const i = t.indexOf(a);
  i > -1 && t.splice(i, 1);
}
const xr = (t, a, i) => i > a ? a : i < t ? t : i;
function tb(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Cl = () => {
}, Zi = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Cl = (t, a, i) => {
  !t && typeof console < "u" && console.warn(tb(a, i));
}, Zi = (t, a, i) => {
  if (!t)
    throw new Error(tb(a, i));
});
const Sr = {}, r1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function G5(t) {
  return typeof t == "object" && t !== null;
}
const i1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function s1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const es = /* @__NO_SIDE_EFFECTS__ */ (t) => t, X5 = (t, a) => (i) => a(t(i)), Uc = (...t) => t.reduce(X5), l1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, i) => {
  const l = a - t;
  return l === 0 ? 1 : (i - t) / l;
};
class o1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return F5(this.subscriptions, a), () => Y5(this.subscriptions, a);
  }
  notify(a, i, l) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, l);
      else
        for (let u = 0; u < o; u++) {
          const h = this.subscriptions[u];
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
function c1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const u1 = (t, a, i) => (((1 - 3 * i + 3 * a) * t + (3 * i - 6 * a)) * t + 3 * a) * t, P5 = 1e-7, K5 = 12;
function Q5(t, a, i, l, o) {
  let u, h, m = 0;
  do
    h = a + (i - a) / 2, u = u1(h, l, o) - t, u > 0 ? i = h : a = h;
  while (Math.abs(u) > P5 && ++m < K5);
  return h;
}
function Rl(t, a, i, l) {
  if (t === a && i === l)
    return es;
  const o = (u) => Q5(u, 0, 1, t, i);
  return (u) => u === 0 || u === 1 ? u : u1(o(u), a, l);
}
const d1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, f1 = (t) => (a) => 1 - t(1 - a), h1 = /* @__PURE__ */ Rl(0.33, 1.53, 0.69, 0.99), Hh = /* @__PURE__ */ f1(h1), m1 = /* @__PURE__ */ d1(Hh), p1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Hh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), qh = (t) => 1 - Math.sin(Math.acos(t)), Z5 = f1(qh), g1 = d1(qh), J5 = /* @__PURE__ */ Rl(0.42, 0, 1, 1), W5 = /* @__PURE__ */ Rl(0, 0, 0.58, 1), v1 = /* @__PURE__ */ Rl(0.42, 0, 0.58, 1), e4 = (t) => Array.isArray(t) && typeof t[0] != "number", y1 = (t) => Array.isArray(t) && typeof t[0] == "number", nb = {
  linear: es,
  easeIn: J5,
  easeInOut: v1,
  easeOut: W5,
  circIn: qh,
  circInOut: g1,
  circOut: Z5,
  backIn: Hh,
  backInOut: m1,
  backOut: h1,
  anticipate: p1
}, t4 = (t) => typeof t == "string", ab = (t) => {
  if (y1(t)) {
    Zi(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, l, o] = t;
    return Rl(a, i, l, o);
  } else if (t4(t))
    return Zi(nb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), nb[t];
  return t;
}, tc = [
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
function n4(t, a) {
  let i = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function v(x) {
    h.has(x) && (p.schedule(x), t()), x(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (x, g = !1, S = !1) => {
      const w = S && o ? i : l;
      return g && h.add(x), w.add(x), x;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (x) => {
      l.delete(x), h.delete(x);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (x) => {
      if (m = x, o) {
        u = !0;
        return;
      }
      o = !0;
      const g = i;
      i = l, l = g, i.forEach(v), i.clear(), o = !1, u && (u = !1, p.process(x));
    }
  };
  return p;
}
const a4 = 40;
function b1(t, a) {
  let i = !1, l = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => i = !0, h = tc.reduce((_, A) => (_[A] = n4(u), _), {}), { setup: m, read: v, resolveKeyframes: p, preUpdate: x, update: g, preRender: S, render: E, postRender: w } = h, N = () => {
    const _ = Sr.useManualTiming, A = _ ? o.timestamp : performance.now();
    i = !1, _ || (o.delta = l ? 1e3 / 60 : Math.max(Math.min(A - o.timestamp, a4), 1)), o.timestamp = A, o.isProcessing = !0, m.process(o), v.process(o), p.process(o), x.process(o), g.process(o), S.process(o), E.process(o), w.process(o), o.isProcessing = !1, i && a && (l = !1, t(N));
  }, R = () => {
    i = !0, l = !0, o.isProcessing || t(N);
  };
  return { schedule: tc.reduce((_, A) => {
    const Z = h[A];
    return _[A] = (W, ne = !1, D = !1) => (i || R(), Z.schedule(W, ne, D)), _;
  }, {}), cancel: (_) => {
    for (let A = 0; A < tc.length; A++)
      h[tc[A]].cancel(_);
  }, state: o, steps: h };
}
const { schedule: Pn, cancel: Jf, state: xc } = /* @__PURE__ */ b1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : es, !0);
let fc;
function r4() {
  fc = void 0;
}
const Dn = {
  now: () => (fc === void 0 && Dn.set(xc.isProcessing || Sr.useManualTiming ? xc.timestamp : performance.now()), fc),
  set: (t) => {
    fc = t, queueMicrotask(r4);
  }
}, x1 = (t) => (a) => typeof a == "string" && a.startsWith(t), S1 = /* @__PURE__ */ x1("--"), i4 = /* @__PURE__ */ x1("var(--"), Ih = (t) => i4(t) ? s4.test(t.split("/*")[0].trim()) : !1, s4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function rb(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ts = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, yl = {
  ...ts,
  transform: (t) => xr(0, 1, t)
}, nc = {
  ...ts,
  default: 1
}, ul = (t) => Math.round(t * 1e5) / 1e5, Fh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function l4(t) {
  return t == null;
}
const o4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Yh = (t, a) => (i) => !!(typeof i == "string" && o4.test(i) && i.startsWith(t) || a && !l4(i) && Object.prototype.hasOwnProperty.call(i, a)), w1 = (t, a, i) => (l) => {
  if (typeof l != "string")
    return l;
  const [o, u, h, m] = l.match(Fh);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, c4 = (t) => xr(0, 255, t), Df = {
  ...ts,
  transform: (t) => Math.round(c4(t))
}, Gr = {
  test: /* @__PURE__ */ Yh("rgb", "red"),
  parse: /* @__PURE__ */ w1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: i, alpha: l = 1 }) => "rgba(" + Df.transform(t) + ", " + Df.transform(a) + ", " + Df.transform(i) + ", " + ul(yl.transform(l)) + ")"
};
function u4(t) {
  let a = "", i = "", l = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), i = t.substring(3, 5), l = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), i = t.substring(2, 3), l = t.substring(3, 4), o = t.substring(4, 5), a += a, i += i, l += l, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(l, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Wf = {
  test: /* @__PURE__ */ Yh("#"),
  parse: u4,
  transform: Gr.transform
}, Ml = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), pr = /* @__PURE__ */ Ml("deg"), Pi = /* @__PURE__ */ Ml("%"), we = /* @__PURE__ */ Ml("px"), d4 = /* @__PURE__ */ Ml("vh"), f4 = /* @__PURE__ */ Ml("vw"), ib = {
  ...Pi,
  parse: (t) => Pi.parse(t) / 100,
  transform: (t) => Pi.transform(t * 100)
}, Yi = {
  test: /* @__PURE__ */ Yh("hsl", "hue"),
  parse: /* @__PURE__ */ w1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: i, alpha: l = 1 }) => "hsla(" + Math.round(t) + ", " + Pi.transform(ul(a)) + ", " + Pi.transform(ul(i)) + ", " + ul(yl.transform(l)) + ")"
}, Vt = {
  test: (t) => Gr.test(t) || Wf.test(t) || Yi.test(t),
  parse: (t) => Gr.test(t) ? Gr.parse(t) : Yi.test(t) ? Yi.parse(t) : Wf.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Gr.transform(t) : Yi.transform(t),
  getAnimatableNone: (t) => {
    const a = Vt.parse(t);
    return a.alpha = 0, Vt.transform(a);
  }
}, h4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function m4(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Fh)?.length || 0) + (t.match(h4)?.length || 0) > 0;
}
const E1 = "number", j1 = "color", p4 = "var", g4 = "var(", sb = "${}", v4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ji(t) {
  const a = t.toString(), i = [], l = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(v4, (v) => (Vt.test(v) ? (l.color.push(u), o.push(j1), i.push(Vt.parse(v))) : v.startsWith(g4) ? (l.var.push(u), o.push(p4), i.push(v)) : (l.number.push(u), o.push(E1), i.push(parseFloat(v))), ++u, sb)).split(sb);
  return { values: i, split: m, indexes: l, types: o };
}
function y4(t) {
  return Ji(t).values;
}
function N1({ split: t, types: a }) {
  const i = t.length;
  return (l) => {
    let o = "";
    for (let u = 0; u < i; u++)
      if (o += t[u], l[u] !== void 0) {
        const h = a[u];
        h === E1 ? o += ul(l[u]) : h === j1 ? o += Vt.transform(l[u]) : o += l[u];
      }
    return o;
  };
}
function b4(t) {
  return N1(Ji(t));
}
const x4 = (t) => typeof t == "number" ? 0 : Vt.test(t) ? Vt.getAnimatableNone(t) : t, S4 = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : x4(t);
function w4(t) {
  const a = Ji(t);
  return N1(a)(a.values.map((l, o) => S4(l, a.split[o])));
}
const ra = {
  test: m4,
  parse: y4,
  createTransformer: b4,
  getAnimatableNone: w4
};
function zf(t, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (a - t) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? t + (a - t) * (2 / 3 - i) * 6 : t;
}
function E4({ hue: t, saturation: a, lightness: i, alpha: l }) {
  t /= 360, a /= 100, i /= 100;
  let o = 0, u = 0, h = 0;
  if (!a)
    o = u = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, v = 2 * i - m;
    o = zf(v, m, t + 1 / 3), u = zf(v, m, t), h = zf(v, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(h * 255),
    alpha: l
  };
}
function Sc(t, a) {
  return (i) => i > 0 ? a : t;
}
const _l = (t, a, i) => t + (a - t) * i, Of = (t, a, i) => {
  const l = t * t, o = i * (a * a - l) + l;
  return o < 0 ? 0 : Math.sqrt(o);
}, j4 = [Wf, Gr, Yi], N4 = (t) => j4.find((a) => a.test(t));
function lb(t) {
  const a = N4(t);
  if (Cl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(t);
  return a === Yi && (i = E4(i)), i;
}
const ob = (t, a) => {
  const i = lb(t), l = lb(a);
  if (!i || !l)
    return Sc(t, a);
  const o = { ...i };
  return (u) => (o.red = Of(i.red, l.red, u), o.green = Of(i.green, l.green, u), o.blue = Of(i.blue, l.blue, u), o.alpha = _l(i.alpha, l.alpha, u), Gr.transform(o));
}, eh = /* @__PURE__ */ new Set(["none", "hidden"]);
function T4(t, a) {
  return eh.has(t) ? (i) => i <= 0 ? t : a : (i) => i >= 1 ? a : t;
}
function C4(t, a) {
  return (i) => _l(t, a, i);
}
function Gh(t) {
  return typeof t == "number" ? C4 : typeof t == "string" ? Ih(t) ? Sc : Vt.test(t) ? ob : _4 : Array.isArray(t) ? T1 : typeof t == "object" ? Vt.test(t) ? ob : R4 : Sc;
}
function T1(t, a) {
  const i = [...t], l = i.length, o = t.map((u, h) => Gh(u)(u, a[h]));
  return (u) => {
    for (let h = 0; h < l; h++)
      i[h] = o[h](u);
    return i;
  };
}
function R4(t, a) {
  const i = { ...t, ...a }, l = {};
  for (const o in i)
    t[o] !== void 0 && a[o] !== void 0 && (l[o] = Gh(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in l)
      i[u] = l[u](o);
    return i;
  };
}
function M4(t, a) {
  const i = [], l = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], h = t.indexes[u][l[u]], m = t.values[h] ?? 0;
    i[o] = m, l[u]++;
  }
  return i;
}
const _4 = (t, a) => {
  const i = ra.createTransformer(a), l = Ji(t), o = Ji(a);
  return l.indexes.var.length === o.indexes.var.length && l.indexes.color.length === o.indexes.color.length && l.indexes.number.length >= o.indexes.number.length ? eh.has(t) && !o.values.length || eh.has(a) && !l.values.length ? T4(t, a) : Uc(T1(M4(l, o), o.values), i) : (Cl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Sc(t, a));
};
function C1(t, a, i) {
  return typeof t == "number" && typeof a == "number" && typeof i == "number" ? _l(t, a, i) : Gh(t)(t, a);
}
const A4 = (t) => {
  const a = ({ timestamp: i }) => t(i);
  return {
    start: (i = !0) => Pn.update(a, i),
    stop: () => Jf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => xc.isProcessing ? xc.timestamp : Dn.now()
  };
}, R1 = (t, a, i = 10) => {
  let l = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let u = 0; u < o; u++)
    l += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, wc = 2e4;
function Xh(t) {
  let a = 0;
  const i = 50;
  let l = t.next(a);
  for (; !l.done && a < wc; )
    a += i, l = t.next(a);
  return a >= wc ? 1 / 0 : a;
}
function D4(t, a = 100, i) {
  const l = i({ ...t, keyframes: [0, a] }), o = Math.min(Xh(l), wc);
  return {
    type: "keyframes",
    ease: (u) => l.next(o * u).value / a,
    duration: /* @__PURE__ */ aa(o)
  };
}
const Et = {
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
function th(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const z4 = 12;
function O4(t, a, i) {
  let l = i;
  for (let o = 1; o < z4; o++)
    l = l - t(l) / a(l);
  return l;
}
const kf = 1e-3;
function k4({ duration: t = Et.duration, bounce: a = Et.bounce, velocity: i = Et.velocity, mass: l = Et.mass }) {
  let o, u;
  Cl(t <= /* @__PURE__ */ Xn(Et.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xr(Et.minDamping, Et.maxDamping, h), t = xr(Et.minDuration, Et.maxDuration, /* @__PURE__ */ aa(t)), h < 1 ? (o = (p) => {
    const x = p * h, g = x * t, S = x - i, E = th(p, h), w = Math.exp(-g);
    return kf - S / E * w;
  }, u = (p) => {
    const g = p * h * t, S = g * i + i, E = Math.pow(h, 2) * Math.pow(p, 2) * t, w = Math.exp(-g), N = th(Math.pow(p, 2), h);
    return (-o(p) + kf > 0 ? -1 : 1) * ((S - E) * w) / N;
  }) : (o = (p) => {
    const x = Math.exp(-p * t), g = (p - i) * t + 1;
    return -kf + x * g;
  }, u = (p) => {
    const x = Math.exp(-p * t), g = (i - p) * (t * t);
    return x * g;
  });
  const m = 5 / t, v = O4(o, u, m);
  if (t = /* @__PURE__ */ Xn(t), isNaN(v))
    return {
      stiffness: Et.stiffness,
      damping: Et.damping,
      duration: t
    };
  {
    const p = Math.pow(v, 2) * l;
    return {
      stiffness: p,
      damping: h * 2 * Math.sqrt(l * p),
      duration: t
    };
  }
}
const L4 = ["duration", "bounce"], U4 = ["stiffness", "damping", "mass"];
function cb(t, a) {
  return a.some((i) => t[i] !== void 0);
}
function B4(t) {
  let a = {
    velocity: Et.velocity,
    stiffness: Et.stiffness,
    damping: Et.damping,
    mass: Et.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!cb(t, U4) && cb(t, L4))
    if (a.velocity = 0, t.visualDuration) {
      const i = t.visualDuration, l = 2 * Math.PI / (i * 1.2), o = l * l, u = 2 * xr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Et.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const i = k4({ ...t, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: Et.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Ec(t = Et.visualDuration, a = Et.bounce) {
  const i = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: l, restDelta: o } = i;
  const u = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: v, damping: p, mass: x, duration: g, velocity: S, isResolvedFromDuration: E } = B4({
    ...i,
    velocity: -/* @__PURE__ */ aa(i.velocity || 0)
  }), w = S || 0, N = p / (2 * Math.sqrt(v * x)), R = h - u, T = /* @__PURE__ */ aa(Math.sqrt(v / x)), k = Math.abs(R) < 5;
  l || (l = k ? Et.restSpeed.granular : Et.restSpeed.default), o || (o = k ? Et.restDelta.granular : Et.restDelta.default);
  let _, A, Z, W, ne, D;
  if (N < 1)
    Z = th(T, N), W = (w + N * T * R) / Z, _ = (I) => {
      const ie = Math.exp(-N * T * I);
      return h - ie * (W * Math.sin(Z * I) + R * Math.cos(Z * I));
    }, ne = N * T * W + R * Z, D = N * T * R - W * Z, A = (I) => Math.exp(-N * T * I) * (ne * Math.sin(Z * I) + D * Math.cos(Z * I));
  else if (N === 1) {
    _ = (ie) => h - Math.exp(-T * ie) * (R + (w + T * R) * ie);
    const I = w + T * R;
    A = (ie) => Math.exp(-T * ie) * (T * I * ie - w);
  } else {
    const I = T * Math.sqrt(N * N - 1);
    _ = (ce) => {
      const J = Math.exp(-N * T * ce), O = Math.min(I * ce, 300);
      return h - J * ((w + N * T * R) * Math.sinh(O) + I * R * Math.cosh(O)) / I;
    };
    const ie = (w + N * T * R) / I, re = N * T * ie - R * I, te = N * T * R - ie * I;
    A = (ce) => {
      const J = Math.exp(-N * T * ce), O = Math.min(I * ce, 300);
      return J * (re * Math.sinh(O) + te * Math.cosh(O));
    };
  }
  const q = {
    calculatedDuration: E && g || null,
    velocity: (I) => /* @__PURE__ */ Xn(A(I)),
    next: (I) => {
      if (!E && N < 1) {
        const re = Math.exp(-N * T * I), te = Math.sin(Z * I), ce = Math.cos(Z * I), J = h - re * (W * te + R * ce), O = /* @__PURE__ */ Xn(re * (ne * te + D * ce));
        return m.done = Math.abs(O) <= l && Math.abs(h - J) <= o, m.value = m.done ? h : J, m;
      }
      const ie = _(I);
      if (E)
        m.done = I >= g;
      else {
        const re = /* @__PURE__ */ Xn(A(I));
        m.done = Math.abs(re) <= l && Math.abs(h - ie) <= o;
      }
      return m.value = m.done ? h : ie, m;
    },
    toString: () => {
      const I = Math.min(Xh(q), wc), ie = R1((re) => q.next(I * re).value, I, 30);
      return I + "ms " + ie;
    },
    toTransition: () => {
    }
  };
  return q;
}
Ec.applyToOptions = (t) => {
  const a = D4(t, 100, Ec);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ Xn(a.duration), t.type = "keyframes", t;
};
const V4 = 5;
function M1(t, a, i) {
  const l = Math.max(a - V4, 0);
  return c1(i - t(l), a - l);
}
function nh({ keyframes: t, velocity: a = 0, power: i = 0.8, timeConstant: l = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: h, min: m, max: v, restDelta: p = 0.5, restSpeed: x }) {
  const g = t[0], S = {
    done: !1,
    value: g
  }, E = (D) => m !== void 0 && D < m || v !== void 0 && D > v, w = (D) => m === void 0 ? v : v === void 0 || Math.abs(m - D) < Math.abs(v - D) ? m : v;
  let N = i * a;
  const R = g + N, T = h === void 0 ? R : h(R);
  T !== R && (N = T - g);
  const k = (D) => -N * Math.exp(-D / l), _ = (D) => T + k(D), A = (D) => {
    const q = k(D), I = _(D);
    S.done = Math.abs(q) <= p, S.value = S.done ? T : I;
  };
  let Z, W;
  const ne = (D) => {
    E(S.value) && (Z = D, W = Ec({
      keyframes: [S.value, w(S.value)],
      velocity: M1(_, D, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: x
    }));
  };
  return ne(0), {
    calculatedDuration: null,
    next: (D) => {
      let q = !1;
      return !W && Z === void 0 && (q = !0, A(D), ne(D)), Z !== void 0 && D >= Z ? W.next(D - Z) : (!q && A(D), S);
    }
  };
}
function $4(t, a, i) {
  const l = [], o = i || Sr.mix || C1, u = t.length - 1;
  for (let h = 0; h < u; h++) {
    let m = o(t[h], t[h + 1]);
    if (a) {
      const v = Array.isArray(a) ? a[h] || es : a;
      m = Uc(v, m);
    }
    l.push(m);
  }
  return l;
}
function H4(t, a, { clamp: i = !0, ease: l, mixer: o } = {}) {
  const u = t.length;
  if (Zi(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const h = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = $4(a, l, o), v = m.length, p = (x) => {
    if (h && x < t[0])
      return a[0];
    let g = 0;
    if (v > 1)
      for (; g < t.length - 2 && !(x < t[g + 1]); g++)
        ;
    const S = /* @__PURE__ */ l1(t[g], t[g + 1], x);
    return m[g](S);
  };
  return i ? (x) => p(xr(t[0], t[u - 1], x)) : p;
}
function q4(t, a) {
  const i = t[t.length - 1];
  for (let l = 1; l <= a; l++) {
    const o = /* @__PURE__ */ l1(0, a, l);
    t.push(_l(i, 1, o));
  }
}
function I4(t) {
  const a = [0];
  return q4(a, t.length - 1), a;
}
function F4(t, a) {
  return t.map((i) => i * a);
}
function Y4(t, a) {
  return t.map(() => a || v1).splice(0, t.length - 1);
}
function dl({ duration: t = 300, keyframes: a, times: i, ease: l = "easeInOut" }) {
  const o = e4(l) ? l.map(ab) : ab(l), u = {
    done: !1,
    value: a[0]
  }, h = F4(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : I4(a),
    t
  ), m = H4(h, a, {
    ease: Array.isArray(o) ? o : Y4(a, o)
  });
  return {
    calculatedDuration: t,
    next: (v) => (u.value = m(v), u.done = v >= t, u)
  };
}
const G4 = (t) => t !== null;
function Bc(t, { repeat: a, repeatType: i = "loop" }, l, o = 1) {
  const u = t.filter(G4), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || l === void 0 ? u[m] : l;
}
const X4 = {
  decay: nh,
  inertia: nh,
  tween: dl,
  keyframes: dl,
  spring: Ec
};
function _1(t) {
  typeof t.type == "string" && (t.type = X4[t.type]);
}
class Ph {
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
const P4 = (t) => t / 100;
class jc extends Ph {
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
    _1(a);
    const { type: i = dl, repeat: l = 0, repeatDelay: o = 0, repeatType: u, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const v = i || dl;
    v !== dl && typeof m[0] != "number" && (this.mixKeyframes = Uc(P4, C1(m[0], m[1])), m = [0, 100]);
    const p = v({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = v({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Xh(p));
    const { calculatedDuration: x } = p;
    this.calculatedDuration = x, this.resolvedDuration = x + o, this.totalDuration = this.resolvedDuration * (l + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: l, totalDuration: o, mixKeyframes: u, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: v } = this;
    if (this.startTime === null)
      return l.next(0);
    const { delay: p = 0, keyframes: x, repeat: g, repeatType: S, repeatDelay: E, type: w, onUpdate: N, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), k = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let _ = this.currentTime, A = l;
    if (g) {
      const D = Math.min(this.currentTime, o) / m;
      let q = Math.floor(D), I = D % 1;
      !I && D >= 1 && (I = 1), I === 1 && q--, q = Math.min(q, g + 1), !!(q % 2) && (S === "reverse" ? (I = 1 - I, E && (I -= E / m)) : S === "mirror" && (A = h)), _ = xr(0, 1, I) * m;
    }
    let Z;
    k ? (this.delayState.value = x[0], Z = this.delayState) : Z = A.next(_), u && !k && (Z.value = u(Z.value));
    let { done: W } = Z;
    !k && v !== null && (W = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ne = this.holdTime === null && (this.state === "finished" || this.state === "running" && W);
    return ne && w !== nh && (Z.value = Bc(x, this.options, R, this.speed)), N && N(Z.value), ne && this.finish(), Z;
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
    return M1((l) => this.generator.next(l).value, a, i);
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
    const { driver: a = A4, startTime: i } = this.options;
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
function K4(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Xr = (t) => t * 180 / Math.PI, ah = (t) => {
  const a = Xr(Math.atan2(t[1], t[0]));
  return rh(a);
}, Q4 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: ah,
  rotateZ: ah,
  skewX: (t) => Xr(Math.atan(t[1])),
  skewY: (t) => Xr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, rh = (t) => (t = t % 360, t < 0 && (t += 360), t), ub = ah, db = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), fb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Z4 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: db,
  scaleY: fb,
  scale: (t) => (db(t) + fb(t)) / 2,
  rotateX: (t) => rh(Xr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => rh(Xr(Math.atan2(-t[2], t[0]))),
  rotateZ: ub,
  rotate: ub,
  skewX: (t) => Xr(Math.atan(t[4])),
  skewY: (t) => Xr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function ih(t) {
  return t.includes("scale") ? 1 : 0;
}
function sh(t, a) {
  if (!t || t === "none")
    return ih(a);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, o;
  if (i)
    l = Z4, o = i;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = Q4, o = m;
  }
  if (!o)
    return ih(a);
  const u = l[a], h = o[1].split(",").map(W4);
  return typeof u == "function" ? u(h) : h[u];
}
const J4 = (t, a) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return sh(i, a);
};
function W4(t) {
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
], as = new Set(ns), hb = (t) => t === ts || t === we, eO = /* @__PURE__ */ new Set(["x", "y", "z"]), tO = ns.filter((t) => !eO.has(t));
function nO(t) {
  const a = [];
  return tO.forEach((i) => {
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
  x: (t, { transform: a }) => sh(a, "x"),
  y: (t, { transform: a }) => sh(a, "y")
};
br.translateX = br.x;
br.translateY = br.y;
const Kr = /* @__PURE__ */ new Set();
let lh = !1, oh = !1, ch = !1;
function A1() {
  if (oh) {
    const t = Array.from(Kr).filter((l) => l.needsMeasurement), a = new Set(t.map((l) => l.element)), i = /* @__PURE__ */ new Map();
    a.forEach((l) => {
      const o = nO(l);
      o.length && (i.set(l, o), l.render());
    }), t.forEach((l) => l.measureInitialState()), a.forEach((l) => {
      l.render();
      const o = i.get(l);
      o && o.forEach(([u, h]) => {
        l.getValue(u)?.set(h);
      });
    }), t.forEach((l) => l.measureEndState()), t.forEach((l) => {
      l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY);
    });
  }
  oh = !1, lh = !1, Kr.forEach((t) => t.complete(ch)), Kr.clear();
}
function D1() {
  Kr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (oh = !0);
  });
}
function aO() {
  ch = !0, D1(), A1(), ch = !1;
}
class Kh {
  constructor(a, i, l, o, u, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = l, this.motionValue = o, this.element = u, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Kr.add(this), lh || (lh = !0, Pn.read(D1), Pn.resolveKeyframes(A1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: l, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), h = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (l && i) {
        const m = l.readValue(i, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && u === void 0 && o.set(a[0]);
    }
    K4(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Kr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Kr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const rO = (t) => t.startsWith("--");
function z1(t, a, i) {
  rO(a) ? t.style.setProperty(a, i) : t.style[a] = i;
}
const iO = {};
function O1(t, a) {
  const i = /* @__PURE__ */ s1(t);
  return () => iO[a] ?? i();
}
const sO = /* @__PURE__ */ O1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), k1 = /* @__PURE__ */ O1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ll = ([t, a, i, l]) => `cubic-bezier(${t}, ${a}, ${i}, ${l})`, mb = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ll([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ll([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ll([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ll([0.33, 1.53, 0.69, 0.99])
};
function L1(t, a) {
  if (t)
    return typeof t == "function" ? k1() ? R1(t, a) : "ease-out" : y1(t) ? ll(t) : Array.isArray(t) ? t.map((i) => L1(i, a) || mb.easeOut) : mb[t];
}
function lO(t, a, i, { delay: l = 0, duration: o = 300, repeat: u = 0, repeatType: h = "loop", ease: m = "easeOut", times: v } = {}, p = void 0) {
  const x = {
    [a]: i
  };
  v && (x.offset = v);
  const g = L1(m, o);
  Array.isArray(g) && (x.easing = g);
  const S = {
    delay: l,
    duration: o,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: u + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), t.animate(x, S);
}
function U1(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function oO({ type: t, ...a }) {
  return U1(t) && k1() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class B1 extends Ph {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: l, keyframes: o, pseudoElement: u, allowFlatten: h = !1, finalKeyframe: m, onComplete: v } = a;
    this.isPseudoElement = !!u, this.allowFlatten = h, this.options = a, Zi(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = oO(a);
    this.animation = lO(i, l, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const x = Bc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(x), z1(i, l, x), this.animation.cancel();
      }
      v?.(), this.notifyFinished();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && sO() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), l && (this.animation.rangeEnd = l), es) : o(this);
  }
}
const V1 = {
  anticipate: p1,
  backInOut: m1,
  circInOut: g1
};
function cO(t) {
  return t in V1;
}
function uO(t) {
  typeof t.ease == "string" && cO(t.ease) && (t.ease = V1[t.ease]);
}
const Lf = 10;
class dO extends B1 {
  constructor(a) {
    uO(a), _1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: l, onComplete: o, element: u, ...h } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const m = new jc({
      ...h,
      autoplay: !1
    }), v = Math.max(Lf, Dn.now() - this.startTime), p = xr(0, Lf, v - Lf), x = m.sample(v).value, { name: g } = this.options;
    u && g && z1(u, g, x), i.setWithVelocity(m.sample(Math.max(0, v - p)).value, x, p), m.stop();
  }
}
const pb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ra.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function fO(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let i = 0; i < t.length; i++)
    if (t[i] !== a)
      return !0;
}
function hO(t, a, i, l) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], h = pb(o, a), m = pb(u, a);
  return Cl(h === m, `You are trying to animate ${a} from "${o}" to "${u}". "${h ? u : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : fO(t) || (i === "spring" || U1(i)) && l;
}
function uh(t) {
  t.duration = 0, t.type = "keyframes";
}
const $1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), mO = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function pO(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && mO.test(t[a]))
      return !0;
  return !1;
}
const gO = /* @__PURE__ */ new Set([
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
]), vO = /* @__PURE__ */ s1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function yO(t) {
  const { motionValue: a, name: i, repeatDelay: l, repeatType: o, damping: u, type: h, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: x } = a.owner.getProps();
  return vO() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  ($1.has(i) || gO.has(i) && pO(m)) && (i !== "transform" || !x) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !l && o !== "mirror" && u !== 0 && h !== "inertia";
}
const bO = 40;
class xO extends Ph {
  constructor({ autoplay: a = !0, delay: i = 0, type: l = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: h = "loop", keyframes: m, name: v, motionValue: p, element: x, ...g }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Dn.now();
    const S = {
      autoplay: a,
      delay: i,
      type: l,
      repeat: o,
      repeatDelay: u,
      repeatType: h,
      name: v,
      motionValue: p,
      element: x,
      ...g
    }, E = x?.KeyframeResolver || Kh;
    this.keyframeResolver = new E(m, (w, N, R) => this.onKeyframesResolved(w, N, S, !R), v, p, x), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, l, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: h, velocity: m, delay: v, isHandoff: p, onUpdate: x } = l;
    this.resolvedAt = Dn.now();
    let g = !0;
    hO(a, u, h, m) || (g = !1, (Sr.instantAnimations || !v) && x?.(Bc(a, l, i)), a[0] = a[a.length - 1], uh(l), l.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > bO ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...l,
      keyframes: a
    }, w = g && !p && yO(E), N = E.motionValue?.owner?.current;
    let R;
    if (w)
      try {
        R = new dO({
          ...E,
          element: N
        });
      } catch {
        R = new jc(E);
      }
    else
      R = new jc(E);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(es), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), aO()), this._animation;
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
function H1(t, a, i, l = 0, o = 1) {
  const u = Array.from(t).sort((p, x) => p.sortNodePosition(x)).indexOf(a), h = t.size, m = (h - 1) * l;
  return typeof i == "function" ? i(u, h) : o === 1 ? u * l : m - u * l;
}
const SO = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function wO(t) {
  const a = SO.exec(t);
  if (!a)
    return [,];
  const [, i, l, o] = a;
  return [`--${i ?? l}`, o];
}
const EO = 4;
function q1(t, a, i = 1) {
  Zi(i <= EO, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [l, o] = wO(t);
  if (!l)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(l);
  if (u) {
    const h = u.trim();
    return r1(h) ? parseFloat(h) : h;
  }
  return Ih(o) ? q1(o, a, i + 1) : o;
}
const jO = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, NO = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), TO = {
  type: "keyframes",
  duration: 0.8
}, CO = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, RO = (t, { keyframes: a }) => a.length > 2 ? TO : as.has(t) ? t.startsWith("scale") ? NO(a[1]) : jO : CO;
function I1(t, a) {
  if (t?.inherit && a) {
    const { inherit: i, ...l } = t;
    return { ...a, ...l };
  }
  return t;
}
function F1(t, a) {
  const i = t?.[a] ?? t?.default ?? t;
  return i !== t ? I1(i, t) : i;
}
const MO = /* @__PURE__ */ new Set([
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
function _O(t) {
  for (const a in t)
    if (!MO.has(a))
      return !0;
  return !1;
}
const AO = (t, a, i, l = {}, o, u) => (h) => {
  const m = F1(l, t) || {}, v = m.delay || l.delay || 0;
  let { elapsed: p = 0 } = l;
  p = p - /* @__PURE__ */ Xn(v);
  const x = {
    keyframes: Array.isArray(i) ? i : [null, i],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -p,
    onUpdate: (S) => {
      a.set(S), m.onUpdate && m.onUpdate(S);
    },
    onComplete: () => {
      h(), m.onComplete && m.onComplete();
    },
    name: t,
    motionValue: a,
    element: u ? void 0 : o
  };
  _O(m) || Object.assign(x, RO(t, x)), x.duration && (x.duration = /* @__PURE__ */ Xn(x.duration)), x.repeatDelay && (x.repeatDelay = /* @__PURE__ */ Xn(x.repeatDelay)), x.from !== void 0 && (x.keyframes[0] = x.from);
  let g = !1;
  if ((x.type === !1 || x.duration === 0 && !x.repeatDelay) && (uh(x), x.delay === 0 && (g = !0)), (Sr.instantAnimations || Sr.skipAnimations || o?.shouldSkipAnimations) && (g = !0, uh(x), x.delay = 0), x.allowFlatten = !m.type && !m.ease, g && !u && a.get() !== void 0) {
    const S = Bc(x.keyframes, m);
    if (S !== void 0) {
      Pn.update(() => {
        x.onUpdate(S), x.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new jc(x) : new xO(x);
};
function gb(t) {
  const a = [{}, {}];
  return t?.values.forEach((i, l) => {
    a[0][l] = i.get(), a[1][l] = i.getVelocity();
  }), a;
}
function Qh(t, a, i, l) {
  if (typeof a == "function") {
    const [o, u] = gb(l);
    a = a(i !== void 0 ? i : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = gb(l);
    a = a(i !== void 0 ? i : t.custom, o, u);
  }
  return a;
}
function Qr(t, a, i) {
  const l = t.getProps();
  return Qh(l, a, i !== void 0 ? i : l.custom, t);
}
const Y1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ns
]), vb = 30, DO = (t) => !isNaN(parseFloat(t));
class zO {
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
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = DO(this.current));
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
    this.events[a] || (this.events[a] = new o1());
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > vb)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, vb);
    return c1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function Nc(t, a) {
  return new zO(t, a);
}
const dh = (t) => Array.isArray(t);
function OO(t, a, i) {
  t.hasValue(a) ? t.getValue(a).set(i) : t.addValue(a, Nc(i));
}
function kO(t) {
  return dh(t) ? t[t.length - 1] || 0 : t;
}
function LO(t, a) {
  const i = Qr(t, a);
  let { transitionEnd: l = {}, transition: o = {}, ...u } = i || {};
  u = { ...u, ...l };
  for (const h in u) {
    const m = kO(u[h]);
    OO(t, h, m);
  }
}
const un = (t) => !!(t && t.getVelocity);
function UO(t) {
  return !!(un(t) && t.add);
}
function BO(t, a) {
  const i = t.getValue("willChange");
  if (UO(i))
    return i.add(a);
  if (!i && Sr.WillChange) {
    const l = new Sr.WillChange("auto");
    t.addValue("willChange", l), l.add(a);
  }
}
function Zh(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const VO = "framerAppearId", G1 = "data-" + Zh(VO);
function $O(t) {
  return t.props[G1];
}
function HO({ protectedKeys: t, needsAnimating: a }, i) {
  const l = t.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, l;
}
function X1(t, a, { delay: i = 0, transitionOverride: l, type: o } = {}) {
  let { transition: u, transitionEnd: h, ...m } = a;
  const v = t.getDefaultTransition();
  u = u ? I1(u, v) : v;
  const p = u?.reduceMotion;
  l && (u = l);
  const x = [], g = o && t.animationState && t.animationState.getState()[o];
  for (const S in m) {
    const E = t.getValue(S, t.latestValues[S] ?? null), w = m[S];
    if (w === void 0 || g && HO(g, S))
      continue;
    const N = {
      delay: i,
      ...F1(u || {}, S)
    }, R = E.get();
    if (R !== void 0 && !E.isAnimating() && !Array.isArray(w) && w === R && !N.velocity) {
      Pn.update(() => E.set(w));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const A = $O(t);
      if (A) {
        const Z = window.MotionHandoffAnimation(A, S, Pn);
        Z !== null && (N.startTime = Z, T = !0);
      }
    }
    BO(t, S);
    const k = p ?? t.shouldReduceMotion;
    E.start(AO(S, E, w, k && Y1.has(S) ? { type: !1 } : N, t, T));
    const _ = E.animation;
    _ && x.push(_);
  }
  if (h) {
    const S = () => Pn.update(() => {
      h && LO(t, h);
    });
    x.length ? Promise.all(x).then(S) : S();
  }
  return x;
}
function fh(t, a, i = {}) {
  const l = Qr(t, a, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = l || {};
  i.transitionOverride && (o = i.transitionOverride);
  const u = l ? () => Promise.all(X1(t, l, i)) : () => Promise.resolve(), h = t.variantChildren && t.variantChildren.size ? (v = 0) => {
    const { delayChildren: p = 0, staggerChildren: x, staggerDirection: g } = o;
    return qO(t, a, v, p, x, g, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [v, p] = m === "beforeChildren" ? [u, h] : [h, u];
    return v().then(() => p());
  } else
    return Promise.all([u(), h(i.delay)]);
}
function qO(t, a, i = 0, l = 0, o = 0, u = 1, h) {
  const m = [];
  for (const v of t.variantChildren)
    v.notify("AnimationStart", a), m.push(fh(v, a, {
      ...h,
      delay: i + (typeof l == "function" ? 0 : l) + H1(t.variantChildren, v, l, o, u)
    }).then(() => v.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function IO(t, a, i = {}) {
  t.notify("AnimationStart", a);
  let l;
  if (Array.isArray(a)) {
    const o = a.map((u) => fh(t, u, i));
    l = Promise.all(o);
  } else if (typeof a == "string")
    l = fh(t, a, i);
  else {
    const o = typeof a == "function" ? Qr(t, a, i.custom) : a;
    l = Promise.all(X1(t, o, i));
  }
  return l.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const FO = {
  test: (t) => t === "auto",
  parse: (t) => t
}, P1 = (t) => (a) => a.test(t), K1 = [ts, we, Pi, pr, f4, d4, FO], yb = (t) => K1.find(P1(t));
function YO(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || i1(t) : !0;
}
const GO = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function XO(t) {
  const [a, i] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [l] = i.match(Fh) || [];
  if (!l)
    return t;
  const o = i.replace(l, "");
  let u = GO.has(a) ? 1 : 0;
  return l !== i && (u *= 100), a + "(" + u + o + ")";
}
const PO = /\b([a-z-]*)\(.*?\)/gu, hh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = t.match(PO);
    return a ? a.map(XO).join(" ") : t;
  }
}, mh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = ra.parse(t);
    return ra.createTransformer(t)(a.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, bb = {
  ...ts,
  transform: Math.round
}, KO = {
  rotate: pr,
  rotateX: pr,
  rotateY: pr,
  rotateZ: pr,
  scale: nc,
  scaleX: nc,
  scaleY: nc,
  scaleZ: nc,
  skew: pr,
  skewX: pr,
  skewY: pr,
  distance: we,
  translateX: we,
  translateY: we,
  translateZ: we,
  x: we,
  y: we,
  z: we,
  perspective: we,
  transformPerspective: we,
  opacity: yl,
  originX: ib,
  originY: ib,
  originZ: we
}, Jh = {
  // Border props
  borderWidth: we,
  borderTopWidth: we,
  borderRightWidth: we,
  borderBottomWidth: we,
  borderLeftWidth: we,
  borderRadius: we,
  borderTopLeftRadius: we,
  borderTopRightRadius: we,
  borderBottomRightRadius: we,
  borderBottomLeftRadius: we,
  // Positioning props
  width: we,
  maxWidth: we,
  height: we,
  maxHeight: we,
  top: we,
  right: we,
  bottom: we,
  left: we,
  inset: we,
  insetBlock: we,
  insetBlockStart: we,
  insetBlockEnd: we,
  insetInline: we,
  insetInlineStart: we,
  insetInlineEnd: we,
  // Spacing props
  padding: we,
  paddingTop: we,
  paddingRight: we,
  paddingBottom: we,
  paddingLeft: we,
  paddingBlock: we,
  paddingBlockStart: we,
  paddingBlockEnd: we,
  paddingInline: we,
  paddingInlineStart: we,
  paddingInlineEnd: we,
  margin: we,
  marginTop: we,
  marginRight: we,
  marginBottom: we,
  marginLeft: we,
  marginBlock: we,
  marginBlockStart: we,
  marginBlockEnd: we,
  marginInline: we,
  marginInlineStart: we,
  marginInlineEnd: we,
  // Typography
  fontSize: we,
  // Misc
  backgroundPositionX: we,
  backgroundPositionY: we,
  ...KO,
  zIndex: bb,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: bb
}, QO = {
  ...Jh,
  // Color props
  color: Vt,
  backgroundColor: Vt,
  outlineColor: Vt,
  fill: Vt,
  stroke: Vt,
  // Border props
  borderColor: Vt,
  borderTopColor: Vt,
  borderRightColor: Vt,
  borderBottomColor: Vt,
  borderLeftColor: Vt,
  filter: hh,
  WebkitFilter: hh,
  mask: mh,
  WebkitMask: mh
}, Q1 = (t) => QO[t], ZO = /* @__PURE__ */ new Set([hh, mh]);
function Z1(t, a) {
  let i = Q1(t);
  return ZO.has(i) || (i = ra), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const JO = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function WO(t, a, i) {
  let l = 0, o;
  for (; l < t.length && !o; ) {
    const u = t[l];
    typeof u == "string" && !JO.has(u) && Ji(u).values.length && (o = t[l]), l++;
  }
  if (o && i)
    for (const u of a)
      t[u] = Z1(i, o);
}
class ek extends Kh {
  constructor(a, i, l, o, u) {
    super(a, i, l, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: l } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let x = 0; x < a.length; x++) {
      let g = a[x];
      if (typeof g == "string" && (g = g.trim(), Ih(g))) {
        const S = q1(g, i.current);
        S !== void 0 && (a[x] = S), x === a.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !Y1.has(l) || a.length !== 2)
      return;
    const [o, u] = a, h = yb(o), m = yb(u), v = rb(o), p = rb(u);
    if (v !== p && br[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (hb(h) && hb(m))
        for (let x = 0; x < a.length; x++) {
          const g = a[x];
          typeof g == "string" && (a[x] = parseFloat(g));
        }
      else br[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, l = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || YO(a[o])) && l.push(o);
    l.length && WO(a, l, i);
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
    const u = l.length - 1, h = l[u];
    l[u] = br[i](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, v]) => {
      a.getValue(m).set(v);
    }), this.resolveNoneKeyframes();
  }
}
function tk(t, a, i) {
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
const J1 = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function hc(t) {
  return G5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: nk } = /* @__PURE__ */ b1(queueMicrotask, !1), ak = {
  y: !1
};
function rk() {
  return ak.y;
}
function W1(t, a) {
  const i = tk(t), l = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: l.signal
  };
  return [i, o, () => l.abort()];
}
function ik(t) {
  return !(t.pointerType === "touch" || rk());
}
function sk(t, a, i = {}) {
  const [l, o, u] = W1(t, i);
  return l.forEach((h) => {
    let m = !1, v = !1, p;
    const x = () => {
      h.removeEventListener("pointerleave", w);
    }, g = (R) => {
      p && (p(R), p = void 0), x();
    }, S = (R) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), v && (v = !1, g(R));
    }, E = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, w = (R) => {
      if (R.pointerType !== "touch") {
        if (m) {
          v = !0;
          return;
        }
        g(R);
      }
    }, N = (R) => {
      if (!ik(R))
        return;
      v = !1;
      const T = a(h, R);
      typeof T == "function" && (p = T, h.addEventListener("pointerleave", w, o));
    };
    h.addEventListener("pointerenter", N, o), h.addEventListener("pointerdown", E, o);
  }), u;
}
const eS = (t, a) => a ? t === a ? !0 : eS(t, a.parentElement) : !1, lk = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, ok = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function ck(t) {
  return ok.has(t.tagName) || t.isContentEditable === !0;
}
const mc = /* @__PURE__ */ new WeakSet();
function xb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Uf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const uk = (t, a) => {
  const i = t.currentTarget;
  if (!i)
    return;
  const l = xb(() => {
    if (mc.has(i))
      return;
    Uf(i, "down");
    const o = xb(() => {
      Uf(i, "up");
    }), u = () => Uf(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", u, a);
  });
  i.addEventListener("keydown", l, a), i.addEventListener("blur", () => i.removeEventListener("keydown", l), a);
};
function Sb(t) {
  return lk(t) && !0;
}
const wb = /* @__PURE__ */ new WeakSet();
function dk(t, a, i = {}) {
  const [l, o, u] = W1(t, i), h = (m) => {
    const v = m.currentTarget;
    if (!Sb(m) || wb.has(m))
      return;
    mc.add(v), i.stopPropagation && wb.add(m);
    const p = a(v, m), x = (E, w) => {
      window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", S), mc.has(v) && mc.delete(v), Sb(E) && typeof p == "function" && p(E, { success: w });
    }, g = (E) => {
      x(E, v === window || v === document || i.useGlobalTarget || eS(v, E.target));
    }, S = (E) => {
      x(E, !1);
    };
    window.addEventListener("pointerup", g, o), window.addEventListener("pointercancel", S, o);
  };
  return l.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), hc(m) && (m.addEventListener("focus", (p) => uk(p, o)), !ck(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const fk = [...K1, Vt, ra], hk = (t) => fk.find(P1(t)), Eb = () => ({ min: 0, max: 0 }), tS = () => ({
  x: Eb(),
  y: Eb()
}), mk = /* @__PURE__ */ new WeakMap();
function Vc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Wh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], em = ["initial", ...Wh];
function $c(t) {
  return Vc(t.animate) || em.some((a) => bl(t[a]));
}
function nS(t) {
  return !!($c(t) || t.variants);
}
function pk(t, a, i) {
  for (const l in a) {
    const o = a[l], u = i[l];
    if (un(o))
      t.addValue(l, o);
    else if (un(u))
      t.addValue(l, Nc(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(l)) {
        const h = t.getValue(l);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = t.getStaticValue(l);
        t.addValue(l, Nc(h !== void 0 ? h : o, { owner: t }));
      }
  }
  for (const l in i)
    a[l] === void 0 && t.removeValue(l);
  return a;
}
const ph = { current: null }, aS = { current: !1 }, gk = typeof window < "u";
function vk() {
  if (aS.current = !0, !!gk)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => ph.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      ph.current = !1;
}
const jb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Tc = {};
function rS(t) {
  Tc = t;
}
function yk() {
  return Tc;
}
class bk {
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
  constructor({ parent: a, props: i, presenceContext: l, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: h, visualState: m }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Kh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = Dn.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Pn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: x } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = x, this.parent = a, this.props = i, this.presenceContext = l, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = v, this.blockInitialAnimation = !!h, this.isControllingVariants = $c(i), this.isVariantNode = nS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: g, ...S } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const E in S) {
      const w = S[E];
      p[E] !== void 0 && un(w) && w.set(p[E]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, mk.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, l) => this.bindToMotionValue(l, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (aS.current || vk(), this.shouldReduceMotion = ph.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Jf(this.notifyUpdate), Jf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && $1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: v, ease: p, duration: x } = i.accelerate, g = new B1({
        element: this.current,
        name: a,
        keyframes: m,
        times: v,
        ease: p,
        duration: /* @__PURE__ */ Xn(x)
      }), S = h(g);
      this.valueSubscriptions.set(a, () => {
        S(), g.cancel();
      });
      return;
    }
    const l = as.has(a);
    l && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Pn.preRender(this.notifyUpdate), l && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let u;
    typeof window < "u" && window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, a, i)), this.valueSubscriptions.set(a, () => {
      o(), u && u(), i.owner && i.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in Tc) {
      const i = Tc[a];
      if (!i)
        continue;
      const { isEnabled: l, Feature: o } = i;
      if (!this.features[a] && o && l(this.props) && (this.features[a] = new o(this)), this.features[a]) {
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : tS();
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
    for (let l = 0; l < jb.length; l++) {
      const o = jb[l];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, h = a[u];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = pk(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return l === void 0 && i !== void 0 && (l = Nc(i === null ? void 0 : i, { owner: this }), this.addValue(a, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let l = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return l != null && (typeof l == "string" && (r1(l) || i1(l)) ? l = parseFloat(l) : !hk(l) && ra.test(i) && (l = Z1(a, i)), this.setBaseTarget(a, un(l) ? l.get() : l)), un(l) ? l.get() : l;
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
      const u = Qh(this.props, i, this.presenceContext?.custom);
      u && (l = u[a]);
    }
    if (i && l !== void 0)
      return l;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !un(o) ? o : this.initialValues[a] !== void 0 && l === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new o1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    nk.render(this.render);
  }
}
class iS extends bk {
  constructor() {
    super(...arguments), this.KeyframeResolver = ek;
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
    un(a) && (this.childSubscription = a.on("change", (i) => {
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
function xk({ top: t, left: a, right: i, bottom: l }) {
  return {
    x: { min: a, max: i },
    y: { min: t, max: l }
  };
}
function Sk(t, a) {
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
function wk(t, a) {
  return xk(Sk(t.getBoundingClientRect(), a));
}
const Ek = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, jk = ns.length;
function Nk(t, a, i) {
  let l = "", o = !0;
  for (let u = 0; u < jk; u++) {
    const h = ns[u], m = t[h];
    if (m === void 0)
      continue;
    let v = !0;
    if (typeof m == "number")
      v = m === (h.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      v = h.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!v || i) {
      const p = J1(m, Jh[h]);
      if (!v) {
        o = !1;
        const x = Ek[h] || h;
        l += `${x}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return l = l.trim(), i ? l = i(a, o ? "" : l) : o && (l = "none"), l;
}
function tm(t, a, i) {
  const { style: l, vars: o, transformOrigin: u } = t;
  let h = !1, m = !1;
  for (const v in a) {
    const p = a[v];
    if (as.has(v)) {
      h = !0;
      continue;
    } else if (S1(v)) {
      o[v] = p;
      continue;
    } else {
      const x = J1(p, Jh[v]);
      v.startsWith("origin") ? (m = !0, u[v] = x) : l[v] = x;
    }
  }
  if (a.transform || (h || i ? l.transform = Nk(a, t.transform, i) : l.transform && (l.transform = "none")), m) {
    const { originX: v = "50%", originY: p = "50%", originZ: x = 0 } = u;
    l.transformOrigin = `${v} ${p} ${x}`;
  }
}
function sS(t, { style: a, vars: i }, l, o) {
  const u = t.style;
  let h;
  for (h in a)
    u[h] = a[h];
  o?.applyProjectionStyles(u, l);
  for (h in i)
    u.setProperty(h, i[h]);
}
function Nb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const al = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (we.test(t))
        t = parseFloat(t);
      else
        return t;
    const i = Nb(t, a.target.x), l = Nb(t, a.target.y);
    return `${i}% ${l}%`;
  }
}, Tk = {
  correct: (t, { treeScale: a, projectionDelta: i }) => {
    const l = t, o = ra.parse(t);
    if (o.length > 5)
      return l;
    const u = ra.createTransformer(t), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, v = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= v;
    const p = _l(m, v, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), u(o);
  }
}, Ck = {
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
  boxShadow: Tk
};
function lS(t, { layout: a, layoutId: i }) {
  return as.has(t) || t.startsWith("origin") || (a || i !== void 0) && (!!Ck[t] || t === "opacity");
}
function nm(t, a, i) {
  const l = t.style, o = a?.style, u = {};
  if (!l)
    return u;
  for (const h in l)
    (un(l[h]) || o && un(o[h]) || lS(h, t) || i?.getValue(h)?.liveStyle !== void 0) && (u[h] = l[h]);
  return u;
}
function Rk(t) {
  return window.getComputedStyle(t);
}
class Mk extends iS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = sS;
  }
  readValueFromInstance(a, i) {
    if (as.has(i))
      return this.projection?.isProjecting ? ih(i) : J4(a, i);
    {
      const l = Rk(a), o = (S1(i) ? l.getPropertyValue(i) : l[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return wk(a, i);
  }
  build(a, i, l) {
    tm(a, i, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return nm(a, i, l);
  }
}
const _k = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Ak = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Dk(t, a, i = 1, l = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? _k : Ak;
  t[u.offset] = `${-l}`, t[u.array] = `${a} ${i}`;
}
const zk = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function oS(t, {
  attrX: a,
  attrY: i,
  attrScale: l,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, v, p, x) {
  if (tm(t, m, p), v) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: g, style: S } = t;
  g.transform && (S.transform = g.transform, delete g.transform), (S.transform || g.transformOrigin) && (S.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), S.transform && (S.transformBox = x?.transformBox ?? "fill-box", delete g.transformBox);
  for (const E of zk)
    g[E] !== void 0 && (S[E] = g[E], delete g[E]);
  a !== void 0 && (g.x = a), i !== void 0 && (g.y = i), l !== void 0 && (g.scale = l), o !== void 0 && Dk(g, o, u, h, !1);
}
const cS = /* @__PURE__ */ new Set([
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
]), uS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Ok(t, a, i, l) {
  sS(t, a, void 0, l);
  for (const o in a.attrs)
    t.setAttribute(cS.has(o) ? o : Zh(o), a.attrs[o]);
}
function dS(t, a, i) {
  const l = nm(t, a, i);
  for (const o in t)
    if (un(t[o]) || un(a[o])) {
      const u = ns.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      l[u] = t[o];
    }
  return l;
}
class kk extends iS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = tS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (as.has(i)) {
      const l = Q1(i);
      return l && l.default || 0;
    }
    return i = cS.has(i) ? i : Zh(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return dS(a, i, l);
  }
  build(a, i, l) {
    oS(a, i, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(a, i, l, o) {
    Ok(a, i, l, o);
  }
  mount(a) {
    this.isSVGTag = uS(a.tagName), super.mount(a);
  }
}
const Lk = em.length;
function fS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const i = t.parent ? fS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (i.initial = t.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < Lk; i++) {
    const l = em[i], o = t.props[l];
    (bl(o) || o === !1) && (a[l] = o);
  }
  return a;
}
function hS(t, a) {
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
const Uk = [...Wh].reverse(), Bk = Wh.length;
function Vk(t) {
  return (a) => Promise.all(a.map(({ animation: i, options: l }) => IO(t, i, l)));
}
function $k(t) {
  let a = Vk(t), i = Tb(), l = !0, o = !1;
  const u = (p) => (x, g) => {
    const S = Qr(t, g, p === "exit" ? t.presenceContext?.custom : void 0);
    if (S) {
      const { transition: E, transitionEnd: w, ...N } = S;
      x = { ...x, ...N, ...w };
    }
    return x;
  };
  function h(p) {
    a = p(t);
  }
  function m(p) {
    const { props: x } = t, g = fS(t.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let w = {}, N = 1 / 0;
    for (let T = 0; T < Bk; T++) {
      const k = Uk[T], _ = i[k], A = x[k] !== void 0 ? x[k] : g[k], Z = bl(A), W = k === p ? _.isActive : null;
      W === !1 && (N = T);
      let ne = A === g[k] && A !== x[k] && Z;
      if (ne && (l || o) && t.manuallyAnimateOnMount && (ne = !1), _.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && W === null || // If we didn't and don't have any defined prop for this animation type
      !A && !_.prevProp || // Or if the prop doesn't define an animation
      Vc(A) || typeof A == "boolean")
        continue;
      if (k === "exit" && _.isActive && W !== !0) {
        _.prevResolvedValues && (w = {
          ...w,
          ..._.prevResolvedValues
        });
        continue;
      }
      const D = Hk(_.prevProp, A);
      let q = D || // If we're making this variant active, we want to always make it active
      k === p && _.isActive && !ne && Z || // If we removed a higher-priority variant (i is in reverse order)
      T > N && Z, I = !1;
      const ie = Array.isArray(A) ? A : [A];
      let re = ie.reduce(u(k), {});
      W === !1 && (re = {});
      const { prevResolvedValues: te = {} } = _, ce = {
        ...te,
        ...re
      }, J = (U) => {
        q = !0, E.has(U) && (I = !0, E.delete(U)), _.needsAnimating[U] = !0;
        const B = t.getValue(U);
        B && (B.liveStyle = !1);
      };
      for (const U in ce) {
        const B = re[U], K = te[U];
        if (w.hasOwnProperty(U))
          continue;
        let M = !1;
        dh(B) && dh(K) ? M = !hS(B, K) : M = B !== K, M ? B != null ? J(U) : E.add(U) : B !== void 0 && E.has(U) ? J(U) : _.protectedKeys[U] = !0;
      }
      _.prevProp = A, _.prevResolvedValues = re, _.isActive && (w = { ...w, ...re }), (l || o) && t.blockInitialAnimation && (q = !1);
      const O = ne && D;
      q && (!O || I) && S.push(...ie.map((U) => {
        const B = { type: k };
        if (typeof U == "string" && (l || o) && !O && t.manuallyAnimateOnMount && t.parent) {
          const { parent: K } = t, M = Qr(K, U);
          if (K.enteringChildren && M) {
            const { delayChildren: Q } = M.transition || {};
            B.delay = H1(K.enteringChildren, t, Q);
          }
        }
        return {
          animation: U,
          options: B
        };
      }));
    }
    if (E.size) {
      const T = {};
      if (typeof x.initial != "boolean") {
        const k = Qr(t, Array.isArray(x.initial) ? x.initial[0] : x.initial);
        k && k.transition && (T.transition = k.transition);
      }
      E.forEach((k) => {
        const _ = t.getBaseTarget(k), A = t.getValue(k);
        A && (A.liveStyle = !0), T[k] = _ ?? null;
      }), S.push({ animation: T });
    }
    let R = !!S.length;
    return l && (x.initial === !1 || x.initial === x.animate) && !t.manuallyAnimateOnMount && (R = !1), l = !1, o = !1, R ? a(S) : Promise.resolve();
  }
  function v(p, x) {
    if (i[p].isActive === x)
      return Promise.resolve();
    t.variantChildren?.forEach((S) => S.animationState?.setActive(p, x)), i[p].isActive = x;
    const g = m(p);
    for (const S in i)
      i[S].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: m,
    setActive: v,
    setAnimateFunction: h,
    getState: () => i,
    reset: () => {
      i = Tb(), o = !0;
    }
  };
}
function Hk(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !hS(a, t) : !1;
}
function Ir(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Tb() {
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
function Cb(t, a, i, l = { passive: !0 }) {
  return t.addEventListener(a, i, l), () => t.removeEventListener(a, i);
}
function qk(t) {
  return un(t) ? t.get() : t;
}
const am = y.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Rb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function Ik(...t) {
  return (a) => {
    let i = !1;
    const l = t.map((o) => {
      const u = Rb(o, a);
      return !i && typeof u == "function" && (i = !0), u;
    });
    if (i)
      return () => {
        for (let o = 0; o < l.length; o++) {
          const u = l[o];
          typeof u == "function" ? u() : Rb(t[o], null);
        }
      };
  };
}
function Fk(...t) {
  return y.useCallback(Ik(...t), t);
}
class Yk extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (hc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = i.offsetParent, o = hc(l) && l.offsetWidth || 0, u = hc(l) && l.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = i.offsetTop, m.left = i.offsetLeft, m.right = o - m.width - m.left, m.bottom = u - m.height - m.top;
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
function Gk({ children: t, isPresent: a, anchorX: i, anchorY: l, root: o, pop: u }) {
  const h = y.useId(), m = y.useRef(null), v = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(am), x = t.props?.ref ?? t?.ref, g = Fk(m, x);
  return y.useInsertionEffect(() => {
    const { width: S, height: E, top: w, left: N, right: R, bottom: T } = v.current;
    if (a || u === !1 || !m.current || !S || !E)
      return;
    const k = i === "left" ? `left: ${N}` : `right: ${R}`, _ = l === "bottom" ? `bottom: ${T}` : `top: ${w}`;
    m.current.dataset.motionPopId = h;
    const A = document.createElement("style");
    p && (A.nonce = p);
    const Z = o ?? document.head;
    return Z.appendChild(A), A.sheet && A.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${k}px !important;
            ${_}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), Z.contains(A) && Z.removeChild(A);
    };
  }, [a]), d.jsx(Yk, { isPresent: a, childRef: m, sizeRef: v, pop: u, children: u === !1 ? t : y.cloneElement(t, { ref: g }) });
}
const Xk = ({ children: t, initial: a, isPresent: i, onExitComplete: l, custom: o, presenceAffectsLayout: u, mode: h, anchorX: m, anchorY: v, root: p }) => {
  const x = $h(Pk), g = y.useId();
  let S = !0, E = y.useMemo(() => (S = !1, {
    id: g,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (w) => {
      x.set(w, !0);
      for (const N of x.values())
        if (!N)
          return;
      l && l();
    },
    register: (w) => (x.set(w, !1), () => x.delete(w))
  }), [i, x, l]);
  return u && S && (E = { ...E }), y.useMemo(() => {
    x.forEach((w, N) => x.set(N, !1));
  }, [i]), y.useEffect(() => {
    !i && !x.size && l && l();
  }, [i]), t = d.jsx(Gk, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: v, root: p, children: t }), d.jsx(Lc.Provider, { value: E, children: t });
};
function Pk() {
  return /* @__PURE__ */ new Map();
}
function Kk(t = !0) {
  const a = y.useContext(Lc);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: l, register: o } = a, u = y.useId();
  y.useEffect(() => {
    if (t)
      return o(u);
  }, [t]);
  const h = y.useCallback(() => t && l && l(u), [u, l, t]);
  return !i && l ? [!1, h] : [!0];
}
const ac = (t) => t.key || "";
function Mb(t) {
  const a = [];
  return y.Children.forEach(t, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const Qk = ({ children: t, custom: a, initial: i = !0, onExitComplete: l, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: h = !1, anchorX: m = "left", anchorY: v = "top", root: p }) => {
  const [x, g] = Kk(h), S = y.useMemo(() => Mb(t), [t]), E = h && !x ? [] : S.map(ac), w = y.useRef(!0), N = y.useRef(S), R = $h(() => /* @__PURE__ */ new Map()), T = y.useRef(/* @__PURE__ */ new Set()), [k, _] = y.useState(S), [A, Z] = y.useState(S);
  a1(() => {
    w.current = !1, N.current = S;
    for (let D = 0; D < A.length; D++) {
      const q = ac(A[D]);
      E.includes(q) ? (R.delete(q), T.current.delete(q)) : R.get(q) !== !0 && R.set(q, !1);
    }
  }, [A, E.length, E.join("-")]);
  const W = [];
  if (S !== k) {
    let D = [...S];
    for (let q = 0; q < A.length; q++) {
      const I = A[q], ie = ac(I);
      E.includes(ie) || (D.splice(q, 0, I), W.push(I));
    }
    return u === "wait" && W.length && (D = W), Z(Mb(D)), _(S), null;
  }
  const { forceRender: ne } = y.useContext(n1);
  return d.jsx(d.Fragment, { children: A.map((D) => {
    const q = ac(D), I = h && !x ? !1 : S === A || E.includes(q), ie = () => {
      if (T.current.has(q))
        return;
      if (R.has(q))
        T.current.add(q), R.set(q, !0);
      else
        return;
      let re = !0;
      R.forEach((te) => {
        te || (re = !1);
      }), re && (ne?.(), Z(N.current), h && g?.(), l && l());
    };
    return d.jsx(Xk, { isPresent: I, initial: !w.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: I ? void 0 : ie, anchorX: m, anchorY: v, children: D }, q);
  }) });
}, rm = y.createContext({ strict: !1 }), _b = {
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
let Ab = !1;
function Zk() {
  if (Ab)
    return;
  const t = {};
  for (const a in _b)
    t[a] = {
      isEnabled: (i) => _b[a].some((l) => !!i[l])
    };
  rS(t), Ab = !0;
}
function mS() {
  return Zk(), yk();
}
function gh(t) {
  const a = mS();
  for (const i in t)
    a[i] = {
      ...a[i],
      ...t[i]
    };
  rS(a);
}
function pS({ children: t, features: a, strict: i = !1 }) {
  const [, l] = y.useState(!Bf(a)), o = y.useRef(void 0);
  if (!Bf(a)) {
    const { renderer: u, ...h } = a;
    o.current = u, gh(h);
  }
  return y.useEffect(() => {
    Bf(a) && a().then(({ renderer: u, ...h }) => {
      gh(h), o.current = u, l(!0);
    });
  }, []), d.jsx(rm.Provider, { value: { renderer: o.current, strict: i }, children: t });
}
function Bf(t) {
  return typeof t == "function";
}
const Jk = /* @__PURE__ */ new Set([
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
function Cc(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Jk.has(t);
}
let gS = (t) => !Cc(t);
function Wk(t) {
  typeof t == "function" && (gS = (a) => a.startsWith("on") ? !Cc(a) : t(a));
}
try {
  Wk(require("@emotion/is-prop-valid").default);
} catch {
}
function e6(t, a, i) {
  const l = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || un(t[o]) || (gS(o) || i === !0 && Cc(o) || !a && !Cc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (l[o] = t[o]);
  return l;
}
const Hc = /* @__PURE__ */ y.createContext({});
function t6(t, a) {
  if ($c(t)) {
    const { initial: i, animate: l } = t;
    return {
      initial: i === !1 || bl(i) ? i : void 0,
      animate: bl(l) ? l : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function n6(t) {
  const { initial: a, animate: i } = t6(t, y.useContext(Hc));
  return y.useMemo(() => ({ initial: a, animate: i }), [Db(a), Db(i)]);
}
function Db(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const im = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function vS(t, a, i) {
  for (const l in a)
    !un(a[l]) && !lS(l, i) && (t[l] = a[l]);
}
function a6({ transformTemplate: t }, a) {
  return y.useMemo(() => {
    const i = im();
    return tm(i, a, t), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function r6(t, a) {
  const i = t.style || {}, l = {};
  return vS(l, i, t), Object.assign(l, a6(t, a)), l;
}
function i6(t, a) {
  const i = {}, l = r6(t, a);
  return t.drag && t.dragListener !== !1 && (i.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0), i.style = l, i;
}
const yS = () => ({
  ...im(),
  attrs: {}
});
function s6(t, a, i, l) {
  const o = y.useMemo(() => {
    const u = yS();
    return oS(u, a, uS(l), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    vS(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const l6 = [
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
function sm(t) {
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
      !!(l6.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function o6(t, a, i, { latestValues: l }, o, u = !1, h) {
  const v = (h ?? sm(t) ? s6 : i6)(a, l, o, t), p = e6(a, typeof t == "string", u), x = t !== y.Fragment ? { ...p, ...v, ref: i } : {}, { children: g } = a, S = y.useMemo(() => un(g) ? g.get() : g, [g]);
  return y.createElement(t, {
    ...x,
    children: S
  });
}
function c6({ scrapeMotionValuesFromProps: t, createRenderState: a }, i, l, o) {
  return {
    latestValues: u6(i, l, o, t),
    renderState: a()
  };
}
function u6(t, a, i, l) {
  const o = {}, u = l(t, {});
  for (const S in u)
    o[S] = qk(u[S]);
  let { initial: h, animate: m } = t;
  const v = $c(t), p = nS(t);
  a && p && !v && t.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let x = i ? i.initial === !1 : !1;
  x = x || h === !1;
  const g = x ? m : h;
  if (g && typeof g != "boolean" && !Vc(g)) {
    const S = Array.isArray(g) ? g : [g];
    for (let E = 0; E < S.length; E++) {
      const w = Qh(t, S[E]);
      if (w) {
        const { transitionEnd: N, transition: R, ...T } = w;
        for (const k in T) {
          let _ = T[k];
          if (Array.isArray(_)) {
            const A = x ? _.length - 1 : 0;
            _ = _[A];
          }
          _ !== null && (o[k] = _);
        }
        for (const k in N)
          o[k] = N[k];
      }
    }
  }
  return o;
}
const bS = (t) => (a, i) => {
  const l = y.useContext(Hc), o = y.useContext(Lc), u = () => c6(t, a, l, o);
  return i ? u() : $h(u);
}, d6 = /* @__PURE__ */ bS({
  scrapeMotionValuesFromProps: nm,
  createRenderState: im
}), f6 = /* @__PURE__ */ bS({
  scrapeMotionValuesFromProps: dS,
  createRenderState: yS
}), h6 = Symbol.for("motionComponentSymbol");
function m6(t, a, i) {
  const l = y.useRef(i);
  y.useInsertionEffect(() => {
    l.current = i;
  });
  const o = y.useRef(null);
  return y.useCallback((u) => {
    u && t.onMount?.(u);
    const h = l.current;
    if (typeof h == "function")
      if (u) {
        const m = h(u);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : h(u);
    else h && (h.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const p6 = y.createContext({});
function g6(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function v6(t, a, i, l, o, u) {
  const { visualElement: h } = y.useContext(Hc), m = y.useContext(rm), v = y.useContext(Lc), p = y.useContext(am), x = p.reducedMotion, g = p.skipAnimations, S = y.useRef(null), E = y.useRef(!1);
  l = l || m.renderer, !S.current && l && (S.current = l(t, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: v,
    blockInitialAnimation: v ? v.initial === !1 : !1,
    reducedMotionConfig: x,
    skipAnimations: g,
    isSVG: u
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const w = S.current, N = y.useContext(p6);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && y6(S.current, i, o, N);
  const R = y.useRef(!1);
  y.useInsertionEffect(() => {
    w && R.current && w.update(i, v);
  });
  const T = i[G1], k = y.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return a1(() => {
    E.current = !0, w && (R.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), k.current && w.animationState && w.animationState.animateChanges());
  }), y.useEffect(() => {
    w && (!k.current && w.animationState && w.animationState.animateChanges(), k.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), k.current = !1), w.enteringChildren = void 0);
  }), w;
}
function y6(t, a, i, l) {
  const { layoutId: o, layout: u, drag: h, dragConstraints: m, layoutScroll: v, layoutRoot: p, layoutAnchor: x, layoutCrossfade: g } = a;
  t.projection = new i(t.latestValues, a["data-framer-portal-id"] ? void 0 : xS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!h || m && g6(m),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: l,
    crossfade: g,
    layoutScroll: v,
    layoutRoot: p,
    layoutAnchor: x
  });
}
function xS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : xS(t.parent);
}
function Vf(t, { forwardMotionProps: a = !1, type: i } = {}, l, o) {
  l && gh(l);
  const u = i ? i === "svg" : sm(t), h = u ? f6 : d6;
  function m(p, x) {
    let g;
    const S = {
      ...y.useContext(am),
      ...p,
      layoutId: b6(p)
    }, { isStatic: E } = S, w = n6(p), N = h(p, E);
    if (!E && typeof window < "u") {
      x6();
      const R = S6(S);
      g = R.MeasureLayout, w.visualElement = v6(t, N, S, o, R.ProjectionNode, u);
    }
    return d.jsxs(Hc.Provider, { value: w, children: [g && w.visualElement ? d.jsx(g, { visualElement: w.visualElement, ...S }) : null, o6(t, p, m6(N, w.visualElement, x), N, E, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const v = y.forwardRef(m);
  return v[h6] = t, v;
}
function b6({ layoutId: t }) {
  const a = y.useContext(n1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function x6(t, a) {
  y.useContext(rm).strict;
}
function S6(t) {
  const a = mS(), { drag: i, layout: l } = a;
  if (!i && !l)
    return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout: i?.isEnabled(t) || l?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function w6(t, a) {
  if (typeof Proxy > "u")
    return Vf;
  const i = /* @__PURE__ */ new Map(), l = (u, h) => Vf(u, h, t, a), o = (u, h) => l(u, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, h) => h === "create" ? l : (i.has(h) || i.set(h, Vf(h, void 0, t, a)), i.get(h))
  });
}
const SS = /* @__PURE__ */ w6(), E6 = (t, a) => a.isSVG ?? sm(t) ? new kk(a) : new Mk(a, {
  allowProjection: t !== y.Fragment
});
class j6 extends rs {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = $k(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Vc(a) && (this.unmountControls = a.subscribe(this.node));
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
let N6 = 0;
class T6 extends rs {
  constructor() {
    super(...arguments), this.id = N6++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: l } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === l)
      return;
    if (a && l === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: h } = this.node.getProps();
        if (typeof u == "string") {
          const m = Qr(this.node, u, h);
          if (m) {
            const { transition: v, transitionEnd: p, ...x } = m;
            for (const g in x)
              this.node.getValue(g)?.jump(x[g]);
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
const C6 = {
  animation: {
    Feature: j6
  },
  exit: {
    Feature: T6
  }
};
function wS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function zb(t, a, i) {
  const { props: l } = t;
  t.animationState && l.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, u = l[o];
  u && Pn.postRender(() => u(a, wS(a)));
}
class R6 extends rs {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = sk(a, (i, l) => (zb(this.node, l, "Start"), (o) => zb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class M6 extends rs {
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
    this.unmount = Uc(Cb(this.node.current, "focus", () => this.onFocus()), Cb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Ob(t, a, i) {
  const { props: l } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && l.whileTap && t.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), u = l[o];
  u && Pn.postRender(() => u(a, wS(a)));
}
class _6 extends rs {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: l } = this.node.props;
    this.unmount = dk(a, (o, u) => (Ob(this.node, u, "Start"), (h, { success: m }) => Ob(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const vh = /* @__PURE__ */ new WeakMap(), $f = /* @__PURE__ */ new WeakMap(), A6 = (t) => {
  const a = vh.get(t.target);
  a && a(t);
}, D6 = (t) => {
  t.forEach(A6);
};
function z6({ root: t, ...a }) {
  const i = t || document;
  $f.has(i) || $f.set(i, {});
  const l = $f.get(i), o = JSON.stringify(a);
  return l[o] || (l[o] = new IntersectionObserver(D6, { root: t, ...a })), l[o];
}
function O6(t, a, i) {
  const l = z6(a);
  return vh.set(t, i), l.observe(t), () => {
    vh.delete(t), l.unobserve(t);
  };
}
const k6 = {
  some: 0,
  all: 1
};
class L6 extends rs {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: l, amount: o = "some", once: u } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: l,
      threshold: typeof o == "number" ? o : k6[o]
    }, m = (v) => {
      const { isIntersecting: p } = v;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: x, onViewportLeave: g } = this.node.getProps(), S = p ? x : g;
      S && S(v);
    };
    this.stopObserver = O6(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(U6(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function U6({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (i) => t[i] !== a[i];
}
const B6 = {
  inView: {
    Feature: L6
  },
  tap: {
    Feature: _6
  },
  focus: {
    Feature: M6
  },
  hover: {
    Feature: R6
  }
}, ES = {
  renderer: E6,
  ...C6,
  ...B6
};
var V6 = "_1oor31e0", $6 = "_1oor31e1", H6 = "_1oor31e2", q6 = "_1oor31e3", I6 = "_1oor31e4", F6 = "_1oor31e5", Y6 = "_1oor31e6", G6 = "_1oor31e7", X6 = "_1oor31e8";
const P6 = 8;
function K6(t) {
  const { entries: a, loading: i, error: l } = t;
  return /* @__PURE__ */ d.jsxs("div", { className: V6, "aria-busy": !!i, children: [
    l && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: l }),
    i && !l && /* @__PURE__ */ d.jsx("div", { className: X6, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !l && a.length === 0 && /* @__PURE__ */ d.jsx("div", { className: G6, children: "No edits yet" }),
    !i && !l && a.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: $6, children: a.map((o) => /* @__PURE__ */ d.jsxs("li", { className: H6, children: [
      /* @__PURE__ */ d.jsx("span", { className: q6, children: Z6(o.recorded_at) }),
      /* @__PURE__ */ d.jsx("span", { className: I6, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ d.jsx("span", { className: F6, title: o.digest_after, children: Q6(o.digest_after) }),
      /* @__PURE__ */ d.jsx("span", { className: Y6, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function Q6(t) {
  return t ? `${t.slice(0, P6)}…` : "—";
}
function Z6(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var kb = "_1c63kaw0", J6 = "_1c63kaw1", W6 = "_1c63kaw2", eL = "_1c63kaw3", tL = "_1c63kaw4", nL = "_1c63kaw5", aL = "_1c63kaw6";
function rL({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: kb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ d.jsx("span", { className: J6, children: "No edits yet" }) }) : /* @__PURE__ */ d.jsx("ol", { className: kb, "data-testid": "edit-chain-list", children: t.ops.map((i, l) => /* @__PURE__ */ d.jsxs("li", { className: W6, children: [
    /* @__PURE__ */ d.jsxs("span", { className: eL, "aria-hidden": "true", children: [
      l + 1,
      "."
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: tL, children: [
      /* @__PURE__ */ d.jsx("span", { className: nL, children: Lb(i) }),
      /* @__PURE__ */ d.jsx("span", { className: aL, children: iL(i) })
    ] }),
    /* @__PURE__ */ d.jsx(
      Ve,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Lb(i)} (position ${l + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Lb(t) {
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
function iL(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Ub(t.start_ms)} → ${Ub(t.end_ms)}`;
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
function Ub(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var rc = "_1o3ytop0", sL = "_1o3ytop1", lL = "_1o3ytop2", oL = "_1o3ytop3", cL = "_1o3ytop4", ic = "_1o3ytop5", uL = "_1o3ytop6", dL = "_1o3ytopc", fL = "_1o3ytopd", hL = "_1o3ytope", mL = "_1o3ytopf", pL = "_1o3ytopg", gL = "_1o3ytoph";
const Bb = -16;
function vL(t) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: l = [],
    onChainPersisted: o,
    onError: u
  } = t, h = a.durationMs ?? 0, m = y.useMemo(
    () => yL(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [v, p] = y.useState(() => qf(h)), [x, g] = y.useState(kc), [S, E] = y.useState(!1), [w, N] = y.useState(null), [R, T] = y.useState(null), [k, _] = y.useState(!1), [A, Z] = y.useState(!1), [W, ne] = y.useState(!1), [D, q] = y.useState(null), [I, ie] = y.useState([]), [re, te] = y.useState(null), [ce, J] = y.useState([]), [O, C] = y.useState(!1), [U, B] = y.useState(null), [K, M] = y.useState(0), Q = y.useRef(null), X = y.useRef(null), le = y.useRef(null), fe = y.useRef(null), ve = y.useRef(null), Ae = y.useRef(0), Me = y.useMemo(
    () => v.ops.some((ye) => ye.mode === "normalize"),
    [v.ops]
  );
  y.useEffect(() => {
    const ye = qf(h);
    p(ye), g(qx(ye)), N(null), ne(!1), ie([]), te(null), ve.current = null;
  }, [a.voiceAssetId, h]);
  const $e = y.useCallback((ye) => {
    g(ye), p((ze) => Hx(ze, ye));
  }, []);
  y.useEffect(() => {
    fe.current?.abort();
    const ye = new AbortController();
    return fe.current = ye, C(!0), B(null), uc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((ze) => {
      ye.signal.aborted || J(ze.entries);
    }).catch((ze) => {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Error ? ze.message : "audit fetch failed";
      B(Qe);
    }).finally(() => {
      ye.signal.aborted || C(!1);
    }), () => ye.abort();
  }, [i, a.voiceAssetId, K]), y.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), y.useEffect(() => () => {
    X.current?.abort(), le.current?.abort(), fe.current?.abort();
  }, []);
  const Jt = v.ops.find((ye) => ye.mode === "trim"), Pt = v.ops.find((ye) => ye.mode === "normalize"), At = Jt?.start_ms ?? 0, et = Jt?.end_ms ?? Math.max(1, h), pt = y.useCallback((ye, ze) => {
    p(
      (Qe) => Vb(
        Qe,
        "trim",
        (nt) => ({
          ...nt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ye)),
          end_ms: Math.max(Math.floor(ye) + 1, Math.floor(ze))
        })
      )
    );
  }, []), he = y.useCallback(
    (ye) => pt(ye, et),
    [et, pt]
  ), ke = y.useCallback(
    (ye) => pt(At, ye),
    [At, pt]
  ), De = y.useCallback((ye) => {
    p((ze) => {
      const Qe = ze.ops.filter((nt) => nt.mode !== "normalize");
      if (ye) {
        const nt = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Bb
        };
        return { ...ze, ops: [...Qe, nt] };
      }
      return { ...ze, ops: Qe };
    });
  }, []), Te = y.useCallback(
    (ye) => {
      const ze = v.ops.findIndex((It) => It.id === ye);
      if (ze === -1) return;
      const Qe = v.ops[ze];
      if (!Qe) return;
      const nt = [...v.ops.slice(0, ze), ...v.ops.slice(ze + 1)];
      p({ ...v, ops: nt }), ie((It) => [...It, { op: Qe, index: ze }]);
    },
    [v]
  ), bt = y.useCallback(() => {
    const ye = I[I.length - 1];
    if (!ye) return;
    const ze = Math.min(ye.index, v.ops.length), Qe = [...v.ops.slice(0, ze), ye.op, ...v.ops.slice(ze)];
    p({ ...v, ops: Qe }), ie(I.slice(0, -1));
  }, [v, I]), xt = y.useCallback(() => {
    const ye = Mx(v, h);
    return ye ? (N(ye.message), !1) : (N(null), !0);
  }, [v, h]), dn = y.useCallback(async () => {
    if (!xt() || k) return;
    X.current?.abort();
    const ye = new AbortController();
    X.current = ye;
    const ze = ++Ae.current;
    Z(!0);
    try {
      const Qe = await wC(a.voiceAssetId, i, v, {
        signal: ye.signal
      });
      if (ye.signal.aborted || ze !== Ae.current) return;
      R && URL.revokeObjectURL(R);
      const nt = URL.createObjectURL(Qe);
      T(nt), ne(!0), requestAnimationFrame(() => Q.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (ye.signal.aborted) return;
      const nt = Qe instanceof Error ? Qe.message : "preview failed";
      N(nt), u(nt);
    } finally {
      ye.signal.aborted || Z(!1);
    }
  }, [xt, k, a.voiceAssetId, i, v, R, u]), Ht = y.useCallback(async () => {
    if (!xt() || A || k) return;
    if (l.length > 1) {
      const ze = l.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${l.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    X.current?.abort(), le.current?.abort();
    const ye = new AbortController();
    le.current = ye, _(!0);
    try {
      const ze = ve.current ?? void 0, Qe = await Rx(
        a.voiceAssetId,
        i,
        ze ? { chain: v, digest_before: ze } : { chain: v },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ve.current = Qe.chain_digest, te(Qe.chain_digest), N(null), q(Qe.measured_lufs ?? null), ie([]), o(Qe), M((nt) => nt + 1);
    } catch (ze) {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Ki;
      ze instanceof Ki && (ve.current = ze.currentDigest || null);
      const nt = Qe ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      N(nt), u(nt);
    } finally {
      ye.signal.aborted || _(!1);
    }
  }, [
    xt,
    A,
    k,
    l,
    a.voiceAssetId,
    i,
    v,
    o,
    u
  ]), On = y.useCallback(() => {
    X.current?.abort(), p(qf(h)), N(null), q(null), ne(!1), ie([]), M((ye) => ye + 1), R && (URL.revokeObjectURL(R), T(null));
  }, [h, R]), qt = y.useCallback((ye) => {
    p(
      (ze) => Vb(
        ze,
        "normalize",
        (Qe) => ({
          ...Qe,
          mode: "normalize",
          target_lufs: ye
        })
      )
    );
  }, []);
  return /* @__PURE__ */ d.jsxs(Wx, { variant: "standalone", children: [
    /* @__PURE__ */ d.jsx(
      e1,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${sc(h)}`
      }
    ),
    /* @__PURE__ */ d.jsx(
      Zx,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: At,
        endMs: et,
        onChangeStart: he,
        onChangeEnd: ke
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: rc, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: sL, children: [
        sc(At),
        " → ",
        sc(et),
        " · ",
        sc(et - At)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: cL, children: [
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Normalize loudness" }),
          Me && Pt && /* @__PURE__ */ d.jsxs("span", { className: dL, children: [
            "target ",
            Pt.target_lufs.toFixed(1),
            " LUFS",
            D !== null && ` · measured ${D.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: uL, children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: Me,
              onChange: (ye) => De(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { children: [
            "Target ",
            Bb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Me && Pt && /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            className: hL,
            min: -30,
            max: -6,
            step: 0.5,
            value: Pt.target_lufs,
            onChange: (ye) => qt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
          "Operations · ",
          v.ops.length
        ] }),
        /* @__PURE__ */ d.jsx(rL, { chain: v, onRemoveOp: Te })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: lL,
            onClick: () => E((ye) => !ye),
            "aria-expanded": S,
            children: [
              S ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        S && /* @__PURE__ */ d.jsx(
          Vh,
          {
            state: x,
            onChange: $e,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      re && /* @__PURE__ */ d.jsx("div", { className: ic, children: /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
        /* @__PURE__ */ d.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ d.jsxs("span", { className: oL, title: re, children: [
          re.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ d.jsxs(t1, { children: [
      /* @__PURE__ */ d.jsx(
        Ve,
        {
          variant: "secondary",
          onClick: () => void dn(),
          disabled: A || k,
          children: A ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ve,
        {
          onClick: () => void Ht(),
          disabled: k || A,
          children: k ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ve,
        {
          variant: "ghost",
          onClick: On,
          disabled: k || A,
          children: "Reset"
        }
      ),
      I.length > 0 && /* @__PURE__ */ d.jsxs(
        Ve,
        {
          variant: "ghost",
          size: "sm",
          onClick: bt,
          disabled: k || A,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            I.length,
            ")"
          ]
        }
      ),
      W && /* @__PURE__ */ d.jsx(
        "span",
        {
          className: gL,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    R && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ d.jsx(
      "audio",
      {
        ref: Q,
        src: R,
        controls: !0,
        className: fL,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: w }),
    /* @__PURE__ */ d.jsxs("details", { className: mL, children: [
      /* @__PURE__ */ d.jsxs("summary", { className: pL, children: [
        "Edit history",
        ce.length > 0 ? ` · ${ce.length}` : ""
      ] }),
      /* @__PURE__ */ d.jsx(
        K6,
        {
          entries: ce,
          loading: O,
          error: U
        }
      )
    ] })
  ] });
}
function qf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Vb(t, a, i) {
  const l = t.ops.findIndex((u) => u.mode === a);
  if (l === -1) {
    const u = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(u)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function sc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function yL(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var bL = "go9vi12", xL = "go9vi13", SL = "go9vi14", wL = "go9vi15", EL = "go9vi16", jL = "go9vi17", NL = "go9vi18", TL = "go9vi19", CL = "go9vi1a go9vi19", RL = "go9vi1b", ML = "go9vi1c", _L = "go9vi1d", AL = "go9vi1e", DL = "go9vi1f", zL = "go9vi1g", OL = "go9vi1h", kL = "go9vi1i", Fr = "go9vi1j", rl = "go9vi1k", Gi = "go9vi1l", LL = "go9vi1m go9vi1l", UL = "go9vi1n", BL = "go9vi1o go9vi1n", VL = "go9vi1p go9vi1n", $L = "go9vi1q", HL = "go9vi1r", qL = "go9vi1s", IL = "go9vi1t", jS = "go9vi1u", FL = "go9vi1v", YL = "go9vi1w", GL = "go9vi1x go9vi1l", XL = "go9vi1y", PL = "go9vi1z", KL = "go9vi110", QL = "go9vi111", ZL = "go9vi112", JL = "go9vi113";
const WL = ["none", "audio_ref", "vector_preset", "qwen_template"];
function e8() {
  const { deployment: t, mappings: a, voiceAssets: i } = Nl(), [l, o] = y.useState(a), [u, h] = y.useState(i), [m, v] = y.useState(
    a[0]?.mappingId ?? null
  ), [p, x] = y.useState(""), [g, S] = y.useState(null), [E, w] = y.useState(null), [N, R] = y.useState(null), T = y.useMemo(() => {
    const C = /* @__PURE__ */ new Map();
    for (const U of u) C.set(U.voiceAssetId, U);
    return C;
  }, [u]), k = y.useMemo(() => {
    const C = p.trim().toLowerCase();
    return C ? l.filter((U) => U.characterName.toLowerCase().includes(C)) : l;
  }, [l, p]), _ = y.useMemo(
    () => l.find((C) => C.mappingId === m) ?? null,
    [l, m]
  );
  y.useEffect(() => {
    o(a), h(i), v(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!E) return;
    const C = setTimeout(() => w(null), 2600);
    return () => clearTimeout(C);
  }, [E]);
  const A = y.useCallback(async () => {
    const C = await ml(t.deploymentId);
    h(C.voiceAssets);
  }, [t.deploymentId]), Z = y.useCallback(
    (C) => {
      o(
        (U) => U.map((B) => B.mappingId === m ? { ...B, ...C } : B)
      );
    },
    [m]
  ), W = y.useCallback(
    async (C) => {
      if (!_) return;
      const U = _;
      try {
        const B = await cl(t.deploymentId, _.mappingId, C);
        o((K) => K.map((M) => M.mappingId === B.mappingId ? B : M));
      } catch (B) {
        o(
          (K) => K.map((M) => M.mappingId === U.mappingId ? U : M)
        ), S(mr(B));
      }
    },
    [_, t.deploymentId]
  ), ne = y.useCallback(async () => {
    const C = u[0];
    if (!C) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = s8(l), B = await Oh(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: C.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((K) => [...K, B]), v(B.mappingId);
    } catch (U) {
      S(mr(U));
    }
  }, [t.deploymentId, u, l]), D = y.useCallback(() => {
    _ && R({ id: _.mappingId, name: _.characterName });
  }, [_]), q = y.useCallback(async () => {
    if (!N) return;
    const { id: C, name: U } = N;
    R(null);
    try {
      await Tx(t.deploymentId, C), o((B) => B.filter((K) => K.mappingId !== C)), v(null), w(`Mapping for ${U} deactivated.`);
    } catch (B) {
      S(mr(B));
    }
  }, [t.deploymentId, N]), I = y.useCallback(
    async (C, U, B) => {
      try {
        const K = await vc(t.deploymentId, C, U, B);
        return h((M) => [K, ...M]), w(`${K.displayName} uploaded.`), K;
      } catch (K) {
        return S(mr(K)), null;
      }
    },
    [t.deploymentId]
  ), ie = y.useCallback(async () => {
    try {
      const C = await dT(t.deploymentId);
      f8(C, `${t.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (C) {
      S(mr(C));
    }
  }, [t.deploymentId]), re = y.useCallback(
    async (C, U) => {
      try {
        const B = await fT(
          t.deploymentId,
          C.mappings,
          U
        );
        w(
          `Imported ${B.created.length} • skipped ${B.skipped.length} • replaced ${B.replaced.length}.`
        );
        const K = await ml(t.deploymentId);
        h(K.voiceAssets);
      } catch (B) {
        S(mr(B));
      }
    },
    [t.deploymentId]
  ), te = y.useCallback(
    async (C) => {
      if (await A(), _ && C.chain_digest)
        try {
          const U = await cl(t.deploymentId, _.mappingId, {
            voiceAssetChainDigest: C.chain_digest
          });
          o(
            (B) => B.map((K) => K.mappingId === U.mappingId ? U : K)
          );
        } catch (U) {
          S(mr(U));
        }
      w("Edit applied.");
    },
    [A, _, t.deploymentId]
  ), ce = y.useCallback((C) => {
    S(C);
  }, []), J = y.useCallback(
    async (C, U) => {
      if (!_) return null;
      const B = C.trim() || `[${_.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await gT(t.deploymentId, {
          line: B,
          outputFormat: U
        })).runId };
      } catch (K) {
        return S(mr(K)), null;
      }
    },
    [t.deploymentId, _]
  ), O = u.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ d.jsxs("div", { className: bL, children: [
    /* @__PURE__ */ d.jsxs("aside", { className: xL, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ d.jsxs("header", { className: SL, children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("h1", { id: "mapping-sidebar-heading", className: wL, children: "Cast" }),
          /* @__PURE__ */ d.jsxs("span", { className: EL, children: [
            l.length,
            " active · ",
            u.length,
            " ",
            O
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(Ve, { variant: "primary", size: "sm", onClick: ne, children: "+ Add" })
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "search",
          className: jL,
          placeholder: "Search characters",
          value: p,
          onChange: (C) => x(C.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ d.jsx(i8, { onExport: ie, onImport: re, onParseError: S }),
      /* @__PURE__ */ d.jsx("div", { className: NL, children: k.length === 0 ? /* @__PURE__ */ d.jsx(
        Tl,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : k.map((C) => {
        const U = T.get(C.speakerVoiceAssetId), B = C.mappingId === m;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: B ? CL : TL,
            onClick: () => v(C.mappingId),
            "aria-pressed": B,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: RL, "aria-hidden": "true", children: l8(C.characterName) }),
              /* @__PURE__ */ d.jsxs("span", { className: ML, children: [
                /* @__PURE__ */ d.jsx("span", { className: _L, children: C.characterName }),
                /* @__PURE__ */ d.jsxs("span", { className: AL, children: [
                  C.defaultEmotionMode,
                  " · ",
                  U?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          C.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: DL, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ d.jsx(pS, { features: ES, children: /* @__PURE__ */ d.jsx(Qk, { children: E && /* @__PURE__ */ d.jsx(
        SS.div,
        {
          className: FL,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }) }),
      g && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: g }),
      N && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
        /* @__PURE__ */ d.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          N.name,
          "?"
        ] }),
        /* @__PURE__ */ d.jsx(Ve, { variant: "danger", size: "sm", onClick: () => void q(), children: "Delete" }),
        /* @__PURE__ */ d.jsx(Ve, { variant: "ghost", size: "sm", onClick: () => R(null), children: "Cancel" })
      ] }),
      _ ? /* @__PURE__ */ d.jsx(
        n8,
        {
          deploymentId: t.deploymentId,
          mapping: _,
          voiceAssets: u,
          allMappings: l,
          onNameChange: (C) => {
            Z({ characterName: C });
          },
          onNameBlur: (C) => {
            C !== _.characterName && C.trim() && W({ characterName: C.trim() });
          },
          onSpeakerChange: (C) => {
            Z({ speakerVoiceAssetId: C }), W({ speakerVoiceAssetId: C });
          },
          onModeChange: (C) => {
            Z({ defaultEmotionMode: C }), W({ defaultEmotionMode: C });
          },
          onQwenChange: (C) => {
            Z({ defaultQwenTemplate: C });
          },
          onQwenBlur: (C) => {
            W({ defaultQwenTemplate: C });
          },
          onSpeedChange: (C) => {
            Z({ defaultSpeedFactor: C });
          },
          onSpeedCommit: (C) => {
            W({ defaultSpeedFactor: C });
          },
          onEmotionVoiceChange: (C) => {
            const U = C || null;
            Z({ defaultEmotionVoiceAssetId: U }), W({ defaultEmotionVoiceAssetId: U });
          },
          onDelete: D,
          onUploadVoice: async (C, U, B) => {
            const K = await I(C, U, B);
            return K && B === "speaker" && (Z({ speakerVoiceAssetId: K.voiceAssetId }), W({ speakerVoiceAssetId: K.voiceAssetId })), await A(), K;
          },
          onTestLine: J,
          onEditChainPersisted: te,
          onEditError: ce
        },
        _.mappingId
      ) : /* @__PURE__ */ d.jsx(
        t8,
        {
          voiceCount: u.length,
          onUploadVoice: async (C) => {
            await I(C, C.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function t8({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ d.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ d.jsxs("div", { className: KL, children: [
      /* @__PURE__ */ d.jsx("p", { className: Pr, children: "01 / Onboarding" }),
      /* @__PURE__ */ d.jsx("h2", { id: "onboarding-heading", className: QL, children: "Upload your first voice" }),
      /* @__PURE__ */ d.jsxs("p", { className: ZL, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ d.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(
      NS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ d.jsx(La, { density: "airy", children: /* @__PURE__ */ d.jsx(
    Tl,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function n8(t) {
  const { mapping: a, voiceAssets: i, allMappings: l } = t, o = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = y.useMemo(
    () => l.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [l, a.speakerVoiceAssetId]
  ), h = i.find((T) => T.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, v] = y.useState(""), [p, x] = y.useState("mp3"), [g, S] = y.useState("idle"), [E, w] = y.useState(null), N = y.useRef(!1);
  y.useEffect(() => (N.current = !1, () => {
    N.current = !0;
  }), []);
  const R = y.useCallback(async () => {
    N.current = !1, S("running"), w(null);
    const T = await t.onTestLine(m, p);
    if (N.current) return;
    if (!T) {
      S("error"), w("Failed to enqueue test-line run.");
      return;
    }
    const { runId: k } = T;
    for (let _ = 0; _ < 60; _ += 1) {
      if (await new Promise((A) => setTimeout(A, 500)), N.current) return;
      try {
        const A = await kh(t.deploymentId, k);
        if (N.current) return;
        if (A.status === "completed") {
          S("done");
          return;
        }
        if (A.status === "failed" || A.status === "cancelled") {
          S("error"), w(`Run ${A.status}.`);
          return;
        }
      } catch (A) {
        if (N.current) return;
        S("error"), w(A instanceof Error ? A.message : "unknown error");
        return;
      }
    }
    N.current || (S("error"), w("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, m, p]);
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("header", { className: zL, children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("p", { className: Pr, children: "Character" }),
        /* @__PURE__ */ d.jsx("h2", { className: OL, children: a.characterName })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: jS, children: /* @__PURE__ */ d.jsx(Ve, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ d.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: YL,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              className: GL,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: m,
              onChange: (T) => v(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: g === "running"
            }
          ),
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              className: Gi,
              value: p,
              onChange: (T) => x(T.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: g === "running",
              children: [
                /* @__PURE__ */ d.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ d.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ d.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ d.jsx(
            Ve,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void R(),
              disabled: g === "running",
              children: g === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          g === "done" && /* @__PURE__ */ d.jsx(Zr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          g === "error" && E && /* @__PURE__ */ d.jsx(Zr, { tone: "danger", children: E })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: kL, children: [
      /* @__PURE__ */ d.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "identity-heading", className: Pr, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ d.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Character name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: Gi,
              value: a.characterName,
              onChange: (T) => t.onNameChange(T.currentTarget.value),
              onBlur: (T) => t.onNameBlur(T.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Emotion mode" }),
          /* @__PURE__ */ d.jsx(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionMode,
              onChange: (T) => t.onModeChange(T.currentTarget.value),
              children: WL.map((T) => /* @__PURE__ */ d.jsx("option", { value: T, children: o8(T) }, T))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ d.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ d.jsxs("span", { className: Fr, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ d.jsx(
            "textarea",
            {
              className: LL,
              value: a.defaultQwenTemplate ?? "",
              onChange: (T) => t.onQwenChange(T.currentTarget.value),
              onBlur: (T) => t.onQwenBlur(T.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ d.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Emotion reference" }),
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (T) => t.onEmotionVoiceChange(T.currentTarget.value),
              children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "— none —" }),
                i.map((T) => /* @__PURE__ */ d.jsxs("option", { value: T.voiceAssetId, children: [
                  T.displayName,
                  " · ",
                  T.kind
                ] }, T.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ d.jsxs("span", { className: Fr, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (T) => t.onSpeedChange(Number(T.currentTarget.value)),
              onMouseUp: (T) => t.onSpeedCommit(Number(T.currentTarget.value)),
              onTouchEnd: (T) => t.onSpeedCommit(Number(T.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(La, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "voice-heading", className: Pr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Speaker reference" }),
        /* @__PURE__ */ d.jsx(
          a8,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ d.jsx($b, { voice: o }),
        /* @__PURE__ */ d.jsx(
          NS,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ d.jsx(
          vL,
          {
            voiceAsset: o,
            deploymentId: t.deploymentId,
            affectedCharacterNames: u,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        ),
        h && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Emotion reference voice" }),
          /* @__PURE__ */ d.jsx($b, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function a8({
  value: t,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ d.jsxs(
    "select",
    {
      className: Gi,
      value: t,
      onChange: (l) => i(l.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ d.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((l) => /* @__PURE__ */ d.jsx("option", { value: l.voiceAssetId, children: l.displayName }, l.voiceAssetId))
      ]
    }
  );
}
function $b({ voice: t }) {
  const a = c8(t.durationMs ?? null);
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: $L, children: [
      /* @__PURE__ */ d.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ d.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ d.jsx("span", { children: u8(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ d.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ d.jsxs("div", { className: HL, children: [
      /* @__PURE__ */ d.jsx("div", { className: qL, children: /* @__PURE__ */ d.jsx(pS, { features: ES, children: /* @__PURE__ */ d.jsx(
        SS.div,
        {
          className: IL,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ d.jsx(Zr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ d.jsx(r8, { seed: t.contentSha256 })
  ] });
}
function r8({ seed: t }) {
  const a = y.useMemo(() => d8(t, 48), [t]);
  return /* @__PURE__ */ d.jsx("div", { className: XL, "aria-hidden": "true", children: a.map((i, l) => /* @__PURE__ */ d.jsx(
    "span",
    {
      className: PL,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${t}-${l}`
  )) });
}
function NS({
  label: t,
  onFile: a
}) {
  const [i, l] = y.useState(!1), [o, u] = y.useState(!1), h = y.useRef(null), m = y.useCallback(
    async (v) => {
      u(!0);
      try {
        await a(v);
      } finally {
        u(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: o ? VL : i ? BL : UL,
      onDragOver: (v) => {
        v.preventDefault(), l(!0);
      },
      onDragLeave: () => l(!1),
      onDrop: (v) => {
        v.preventDefault(), l(!1);
        const p = v.dataTransfer.files?.[0];
        p && m(p);
      },
      onClick: () => h.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (v) => {
        (v.key === "Enter" || v.key === " ") && (v.preventDefault(), h.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: h,
            type: "file",
            accept: "audio/*",
            onChange: (v) => {
              const p = v.currentTarget.files?.[0];
              p && m(p), v.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function i8({
  onExport: t,
  onImport: a,
  onParseError: i
}) {
  const [l, o] = y.useState("error"), u = y.useRef(null);
  return /* @__PURE__ */ d.jsxs("div", { className: jS, children: [
    /* @__PURE__ */ d.jsx(Ve, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: JL,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const m = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!m)
            try {
              const v = await m.text(), p = JSON.parse(v);
              a(p, l);
            } catch {
              i("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ d.jsx(Ve, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ d.jsxs(
      "select",
      {
        className: Gi,
        value: l,
        onChange: (h) => o(h.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ d.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ d.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ d.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function s8(t) {
  const a = new Set(t.map((l) => l.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function l8(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function o8(t) {
  switch (t) {
    case "none":
      return "None";
    case "audio_ref":
      return "Audio reference";
    case "vector_preset":
      return "Vector preset";
    case "qwen_template":
      return "Qwen template";
  }
}
function c8(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function u8(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function d8(t, a) {
  const i = [];
  for (let l = 0; l < a; l += 1) {
    const o = t.charCodeAt(l % t.length);
    i.push((o * 31 + l * 7) % 100 / 100);
  }
  return i;
}
function f8(t, a) {
  const i = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), l = URL.createObjectURL(i), o = document.createElement("a");
  o.href = l, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(l);
}
function mr(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
function h8() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await cT();
        return { deployments: t };
      },
      Component: FT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId");
        return vj(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), [i, { mappings: l }, { runs: o }, u] = await Promise.all([
          Ry(a),
          My(a),
          hT(a, { limit: 10 }),
          xT(a)
        ]);
        return { deployment: i, mappings: l, runs: o, workflow: u };
      },
      Component: WD
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), i = $i(t, "runId");
        return { run: await kh(a, i) };
      },
      Component: c5
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), [i, { mappings: l }, { voiceAssets: o }] = await Promise.all([
          Ry(a),
          My(a),
          ml(a)
        ]);
        return { deployment: i, mappings: l, voiceAssets: o };
      },
      Component: e8
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
      Component: q5
    },
    {
      path: "/runtime/queue",
      Component: B5
    }
  ];
}
function $i(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Hb = "ext-actions-request", m8 = "ext-actions-declare", p8 = "ext-action-state", qb = "ext-action-invoke", yh = "emotion-tts:navigate", qi = "emotion-tts.run", Ib = "emotion-tts.mappings", g8 = 4e3;
function v8(t, a) {
  let i = null, l = !1;
  const o = () => {
    const w = i?.badge ?? "not_installed";
    return y8(w, l);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Ib,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    t.dispatchEvent(
      new CustomEvent(m8, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(p8, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, v = () => h(), p = (w) => {
    const N = w.detail?.id;
    N === qi ? x() : N === Ib && t.dispatchEvent(
      new CustomEvent(yh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, x = async () => {
    const w = i?.badge ?? "not_installed", N = w === "ready" || w === "running" || w === "starting";
    l = !0, m();
    try {
      N ? await Lx() : await kx();
      try {
        i = await yc();
      } catch {
      }
    } catch {
    } finally {
      l = !1, m();
    }
  };
  t.addEventListener(Hb, v), t.addEventListener(qb, p);
  let g = !1;
  const S = async () => {
    try {
      const w = await yc();
      if (g) return;
      i = w, m();
    } catch {
    }
  };
  S();
  const E = window.setInterval(() => void S(), g8);
  return h(), {
    dispose: () => {
      g = !0, window.clearInterval(E), t.removeEventListener(Hb, v), t.removeEventListener(qb, p);
    }
  };
}
function y8(t, a) {
  const i = t === "ready" || t === "running" || t === "starting", l = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qi,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qi,
    label: Ux(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : i ? {
    id: qi,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : l ? {
    id: qi,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: qi,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const bh = "emotion-tts-app", b8 = "ext-event", Fb = "emotion-tts-stylesheet", Yb = ["accent", "density", "card"];
function x8(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function S8() {
  if (typeof document > "u" || document.getElementById(Fb)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Fb, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
S8();
class w8 extends HTMLElement {
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
    this.root = qE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(yh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = v8(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const l = i.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(yh, a);
  }
  syncTweaksFromBody() {
    for (const a of Yb) {
      const i = x8(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Yb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = jN(h8(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ d.jsx(y.StrictMode, { children: /* @__PURE__ */ d.jsx(TN, { router: i }) })
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
      new CustomEvent(b8, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function E8() {
  typeof customElements > "u" || customElements.get(bh) || customElements.define(bh, w8);
}
typeof customElements < "u" && !customElements.get(bh) && E8();
export {
  E8 as register
};
//# sourceMappingURL=emotion-tts.js.map
