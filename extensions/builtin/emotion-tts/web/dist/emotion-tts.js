function CE(n, a) {
  for (var i = 0; i < a.length; i++) {
    const s = a[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in n)) {
          const u = Object.getOwnPropertyDescriptor(s, o);
          u && Object.defineProperty(n, o, u.get ? u : {
            enumerable: !0,
            get: () => s[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function Ib(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Pd = { exports: {} }, Xl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qg;
function RE() {
  if (qg) return Xl;
  qg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(s, o, u) {
    var h = null;
    if (u !== void 0 && (h = "" + u), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      u = {};
      for (var m in o)
        m !== "key" && (u[m] = o[m]);
    } else u = o;
    return o = u.ref, {
      $$typeof: n,
      type: s,
      key: h,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return Xl.Fragment = a, Xl.jsx = i, Xl.jsxs = i, Xl;
}
var Ig;
function ME() {
  return Ig || (Ig = 1, Pd.exports = RE()), Pd.exports;
}
var d = ME(), Kd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fg;
function _E() {
  if (Fg) return Le;
  Fg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
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
  }, T = Object.assign, R = {};
  function C(M, P, Q) {
    this.props = M, this.context = P, this.refs = R, this.updater = Q || w;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(M, P) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, P, "setState");
  }, C.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function k() {
  }
  k.prototype = C.prototype;
  function _(M, P, Q) {
    this.props = M, this.context = P, this.refs = R, this.updater = Q || w;
  }
  var z = _.prototype = new k();
  z.constructor = _, T(z, C.prototype), z.isPureReactComponent = !0;
  var K = Array.isArray;
  function ee() {
  }
  var te = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function H(M, P, Q) {
    var oe = Q.ref;
    return {
      $$typeof: n,
      type: M,
      key: P,
      ref: oe !== void 0 ? oe : null,
      props: Q
    };
  }
  function q(M, P) {
    return H(M.type, P, M.props);
  }
  function le(M) {
    return typeof M == "object" && M !== null && M.$$typeof === n;
  }
  function re(M) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(Q) {
      return P[Q];
    });
  }
  var J = /\/+/g;
  function ce(M, P) {
    return typeof M == "object" && M !== null && M.key != null ? re("" + M.key) : P.toString(36);
  }
  function W(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(ee, ee) : (M.status = "pending", M.then(
          function(P) {
            M.status === "pending" && (M.status = "fulfilled", M.value = P);
          },
          function(P) {
            M.status === "pending" && (M.status = "rejected", M.reason = P);
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
  function A(M, P, Q, oe, he) {
    var ge = typeof M;
    (ge === "undefined" || ge === "boolean") && (M = null);
    var Ae = !1;
    if (M === null) Ae = !0;
    else
      switch (ge) {
        case "bigint":
        case "string":
        case "number":
          Ae = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case n:
            case a:
              Ae = !0;
              break;
            case b:
              return Ae = M._init, A(
                Ae(M._payload),
                P,
                Q,
                oe,
                he
              );
          }
      }
    if (Ae)
      return he = he(M), Ae = oe === "" ? "." + ce(M, 0) : oe, K(he) ? (Q = "", Ae != null && (Q = Ae.replace(J, "$&/") + "/"), A(he, P, Q, "", function(Jt) {
        return Jt;
      })) : he != null && (le(he) && (he = q(
        he,
        Q + (he.key == null || M && M.key === he.key ? "" : ("" + he.key).replace(
          J,
          "$&/"
        ) + "/") + Ae
      )), P.push(he)), 1;
    Ae = 0;
    var Me = oe === "" ? "." : oe + ":";
    if (K(M))
      for (var Ve = 0; Ve < M.length; Ve++)
        oe = M[Ve], ge = Me + ce(oe, Ve), Ae += A(
          oe,
          P,
          Q,
          ge,
          he
        );
    else if (Ve = E(M), typeof Ve == "function")
      for (M = Ve.call(M), Ve = 0; !(oe = M.next()).done; )
        oe = oe.value, ge = Me + ce(oe, Ve++), Ae += A(
          oe,
          P,
          Q,
          ge,
          he
        );
    else if (ge === "object") {
      if (typeof M.then == "function")
        return A(
          W(M),
          P,
          Q,
          oe,
          he
        );
      throw P = String(M), Error(
        "Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ae;
  }
  function N(M, P, Q) {
    if (M == null) return M;
    var oe = [], he = 0;
    return A(M, oe, "", "", function(ge) {
      return P.call(Q, ge, he++);
    }), oe;
  }
  function U(M) {
    if (M._status === -1) {
      var P = M._result;
      P = P(), P.then(
        function(Q) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = Q);
        },
        function(Q) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = Q);
        }
      ), M._status === -1 && (M._status = 0, M._result = P);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var I = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var P = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(P)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  }, ne = {
    map: N,
    forEach: function(M, P, Q) {
      N(
        M,
        function() {
          P.apply(this, arguments);
        },
        Q
      );
    },
    count: function(M) {
      var P = 0;
      return N(M, function() {
        P++;
      }), P;
    },
    toArray: function(M) {
      return N(M, function(P) {
        return P;
      }) || [];
    },
    only: function(M) {
      if (!le(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  };
  return Le.Activity = v, Le.Children = ne, Le.Component = C, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = _, Le.StrictMode = s, Le.Suspense = g, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, Le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(M) {
      return te.H.useMemoCache(M);
    }
  }, Le.cache = function(M) {
    return function() {
      return M.apply(null, arguments);
    };
  }, Le.cacheSignal = function() {
    return null;
  }, Le.cloneElement = function(M, P, Q) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var oe = T({}, M.props), he = M.key;
    if (P != null)
      for (ge in P.key !== void 0 && (he = "" + P.key), P)
        !D.call(P, ge) || ge === "key" || ge === "__self" || ge === "__source" || ge === "ref" && P.ref === void 0 || (oe[ge] = P[ge]);
    var ge = arguments.length - 2;
    if (ge === 1) oe.children = Q;
    else if (1 < ge) {
      for (var Ae = Array(ge), Me = 0; Me < ge; Me++)
        Ae[Me] = arguments[Me + 2];
      oe.children = Ae;
    }
    return H(M.type, he, oe);
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
  }, Le.createElement = function(M, P, Q) {
    var oe, he = {}, ge = null;
    if (P != null)
      for (oe in P.key !== void 0 && (ge = "" + P.key), P)
        D.call(P, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (he[oe] = P[oe]);
    var Ae = arguments.length - 2;
    if (Ae === 1) he.children = Q;
    else if (1 < Ae) {
      for (var Me = Array(Ae), Ve = 0; Ve < Ae; Ve++)
        Me[Ve] = arguments[Ve + 2];
      he.children = Me;
    }
    if (M && M.defaultProps)
      for (oe in Ae = M.defaultProps, Ae)
        he[oe] === void 0 && (he[oe] = Ae[oe]);
    return H(M, ge, he);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(M) {
    return { $$typeof: m, render: M };
  }, Le.isValidElement = le, Le.lazy = function(M) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: M },
      _init: U
    };
  }, Le.memo = function(M, P) {
    return {
      $$typeof: p,
      type: M,
      compare: P === void 0 ? null : P
    };
  }, Le.startTransition = function(M) {
    var P = te.T, Q = {};
    te.T = Q;
    try {
      var oe = M(), he = te.S;
      he !== null && he(Q, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(ee, I);
    } catch (ge) {
      I(ge);
    } finally {
      P !== null && Q.types !== null && (P.types = Q.types), te.T = P;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, Le.use = function(M) {
    return te.H.use(M);
  }, Le.useActionState = function(M, P, Q) {
    return te.H.useActionState(M, P, Q);
  }, Le.useCallback = function(M, P) {
    return te.H.useCallback(M, P);
  }, Le.useContext = function(M) {
    return te.H.useContext(M);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(M, P) {
    return te.H.useDeferredValue(M, P);
  }, Le.useEffect = function(M, P) {
    return te.H.useEffect(M, P);
  }, Le.useEffectEvent = function(M) {
    return te.H.useEffectEvent(M);
  }, Le.useId = function() {
    return te.H.useId();
  }, Le.useImperativeHandle = function(M, P, Q) {
    return te.H.useImperativeHandle(M, P, Q);
  }, Le.useInsertionEffect = function(M, P) {
    return te.H.useInsertionEffect(M, P);
  }, Le.useLayoutEffect = function(M, P) {
    return te.H.useLayoutEffect(M, P);
  }, Le.useMemo = function(M, P) {
    return te.H.useMemo(M, P);
  }, Le.useOptimistic = function(M, P) {
    return te.H.useOptimistic(M, P);
  }, Le.useReducer = function(M, P, Q) {
    return te.H.useReducer(M, P, Q);
  }, Le.useRef = function(M) {
    return te.H.useRef(M);
  }, Le.useState = function(M) {
    return te.H.useState(M);
  }, Le.useSyncExternalStore = function(M, P, Q) {
    return te.H.useSyncExternalStore(
      M,
      P,
      Q
    );
  }, Le.useTransition = function() {
    return te.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var Yg;
function yh() {
  return Yg || (Yg = 1, Kd.exports = _E()), Kd.exports;
}
var y = yh();
const me = /* @__PURE__ */ Ib(y), AE = /* @__PURE__ */ CE({
  __proto__: null,
  default: me
}, [y]);
var Qd = { exports: {} }, Pl = {}, Zd = { exports: {} }, Jd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gg;
function DE() {
  return Gg || (Gg = 1, (function(n) {
    function a(A, N) {
      var U = A.length;
      A.push(N);
      e: for (; 0 < U; ) {
        var I = U - 1 >>> 1, ne = A[I];
        if (0 < o(ne, N))
          A[I] = N, A[U] = ne, U = I;
        else break e;
      }
    }
    function i(A) {
      return A.length === 0 ? null : A[0];
    }
    function s(A) {
      if (A.length === 0) return null;
      var N = A[0], U = A.pop();
      if (U !== N) {
        A[0] = U;
        e: for (var I = 0, ne = A.length, M = ne >>> 1; I < M; ) {
          var P = 2 * (I + 1) - 1, Q = A[P], oe = P + 1, he = A[oe];
          if (0 > o(Q, U))
            oe < ne && 0 > o(he, Q) ? (A[I] = he, A[oe] = U, I = oe) : (A[I] = Q, A[P] = U, I = P);
          else if (oe < ne && 0 > o(he, U))
            A[I] = he, A[oe] = U, I = oe;
          else break e;
        }
      }
      return N;
    }
    function o(A, N) {
      var U = A.sortIndex - N.sortIndex;
      return U !== 0 ? U : A.id - N.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      n.unstable_now = function() {
        return u.now();
      };
    } else {
      var h = Date, m = h.now();
      n.unstable_now = function() {
        return h.now() - m;
      };
    }
    var g = [], p = [], b = 1, v = null, S = 3, E = !1, w = !1, T = !1, R = !1, C = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function z(A) {
      for (var N = i(p); N !== null; ) {
        if (N.callback === null) s(p);
        else if (N.startTime <= A)
          s(p), N.sortIndex = N.expirationTime, a(g, N);
        else break;
        N = i(p);
      }
    }
    function K(A) {
      if (T = !1, z(A), !w)
        if (i(g) !== null)
          w = !0, ee || (ee = !0, re());
        else {
          var N = i(p);
          N !== null && W(K, N.startTime - A);
        }
    }
    var ee = !1, te = -1, D = 5, H = -1;
    function q() {
      return R ? !0 : !(n.unstable_now() - H < D);
    }
    function le() {
      if (R = !1, ee) {
        var A = n.unstable_now();
        H = A;
        var N = !0;
        try {
          e: {
            w = !1, T && (T = !1, k(te), te = -1), E = !0;
            var U = S;
            try {
              t: {
                for (z(A), v = i(g); v !== null && !(v.expirationTime > A && q()); ) {
                  var I = v.callback;
                  if (typeof I == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var ne = I(
                      v.expirationTime <= A
                    );
                    if (A = n.unstable_now(), typeof ne == "function") {
                      v.callback = ne, z(A), N = !0;
                      break t;
                    }
                    v === i(g) && s(g), z(A);
                  } else s(g);
                  v = i(g);
                }
                if (v !== null) N = !0;
                else {
                  var M = i(p);
                  M !== null && W(
                    K,
                    M.startTime - A
                  ), N = !1;
                }
              }
              break e;
            } finally {
              v = null, S = U, E = !1;
            }
            N = void 0;
          }
        } finally {
          N ? re() : ee = !1;
        }
      }
    }
    var re;
    if (typeof _ == "function")
      re = function() {
        _(le);
      };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), ce = J.port2;
      J.port1.onmessage = le, re = function() {
        ce.postMessage(null);
      };
    } else
      re = function() {
        C(le, 0);
      };
    function W(A, N) {
      te = C(function() {
        A(n.unstable_now());
      }, N);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, n.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < A ? Math.floor(1e3 / A) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(A) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var N = 3;
          break;
        default:
          N = S;
      }
      var U = S;
      S = N;
      try {
        return A();
      } finally {
        S = U;
      }
    }, n.unstable_requestPaint = function() {
      R = !0;
    }, n.unstable_runWithPriority = function(A, N) {
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
        return N();
      } finally {
        S = U;
      }
    }, n.unstable_scheduleCallback = function(A, N, U) {
      var I = n.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? I + U : I) : U = I, A) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return ne = U + ne, A = {
        id: b++,
        callback: N,
        priorityLevel: A,
        startTime: U,
        expirationTime: ne,
        sortIndex: -1
      }, U > I ? (A.sortIndex = U, a(p, A), i(g) === null && A === i(p) && (T ? (k(te), te = -1) : T = !0, W(K, U - I))) : (A.sortIndex = ne, a(g, A), w || E || (w = !0, ee || (ee = !0, re()))), A;
    }, n.unstable_shouldYield = q, n.unstable_wrapCallback = function(A) {
      var N = S;
      return function() {
        var U = S;
        S = N;
        try {
          return A.apply(this, arguments);
        } finally {
          S = U;
        }
      };
    };
  })(Jd)), Jd;
}
var Xg;
function zE() {
  return Xg || (Xg = 1, Zd.exports = DE()), Zd.exports;
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
var Pg;
function OE() {
  if (Pg) return on;
  Pg = 1;
  var n = yh();
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
  var s = {
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
  function u(g, p, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: p,
      implementation: b
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return on.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, on.createPortal = function(g, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return u(g, p, null, b);
  }, on.flushSync = function(g) {
    var p = h.T, b = s.p;
    try {
      if (h.T = null, s.p = 2, g) return g();
    } finally {
      h.T = p, s.p = b, s.d.f();
    }
  }, on.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(g, p));
  }, on.prefetchDNS = function(g) {
    typeof g == "string" && s.d.D(g);
  }, on.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, E = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? s.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: E
        }
      ) : b === "script" && s.d.X(g, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: E,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, on.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          s.d.M(g, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(g);
  }, on.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin);
      s.d.L(g, b, {
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
  }, on.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        s.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(g);
  }, on.requestFormReset = function(g) {
    s.d.r(g);
  }, on.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, on.useFormState = function(g, p, b) {
    return h.H.useFormState(g, p, b);
  }, on.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, on.version = "19.2.5", on;
}
var Kg;
function Fb() {
  if (Kg) return Wd.exports;
  Kg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Wd.exports = OE(), Wd.exports;
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
var Qg;
function kE() {
  if (Qg) return Pl;
  Qg = 1;
  var n = zE(), a = yh(), i = Fb();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        t += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var t = e, r = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (r = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? r : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (u(e) !== e)
      throw Error(s(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (t = u(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var r = e, l = t; ; ) {
      var c = r.return;
      if (c === null) break;
      var f = c.alternate;
      if (f === null) {
        if (l = c.return, l !== null) {
          r = l;
          continue;
        }
        break;
      }
      if (c.child === f.child) {
        for (f = c.child; f; ) {
          if (f === r) return g(c), e;
          if (f === l) return g(c), t;
          f = f.sibling;
        }
        throw Error(s(188));
      }
      if (r.return !== l.return) r = c, l = f;
      else {
        for (var x = !1, j = c.child; j; ) {
          if (j === r) {
            x = !0, r = c, l = f;
            break;
          }
          if (j === l) {
            x = !0, l = c, r = f;
            break;
          }
          j = j.sibling;
        }
        if (!x) {
          for (j = f.child; j; ) {
            if (j === r) {
              x = !0, r = f, l = c;
              break;
            }
            if (j === l) {
              x = !0, l = f, r = c;
              break;
            }
            j = j.sibling;
          }
          if (!x) throw Error(s(189));
        }
      }
      if (r.alternate !== l) throw Error(s(190));
    }
    if (r.tag !== 3) throw Error(s(188));
    return r.stateNode.current === r ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, S = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), q = Symbol.for("react.memo_cache_sentinel"), le = Symbol.iterator;
  function re(e) {
    return e === null || typeof e != "object" ? null : (e = le && e[le] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var J = Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === J ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case C:
        return "Profiler";
      case R:
        return "StrictMode";
      case K:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case H:
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
        case z:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return t = e.displayName || null, t !== null ? t : ce(e.type) || "Memo";
        case D:
          t = e._payload, e = e._init;
          try {
            return ce(e(t));
          } catch {
          }
      }
    return null;
  }
  var W = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, N = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, I = [], ne = -1;
  function M(e) {
    return { current: e };
  }
  function P(e) {
    0 > ne || (e.current = I[ne], I[ne] = null, ne--);
  }
  function Q(e, t) {
    ne++, I[ne] = e.current, e.current = t;
  }
  var oe = M(null), he = M(null), ge = M(null), Ae = M(null);
  function Me(e, t) {
    switch (Q(ge, t), Q(he, e), Q(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? dg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = dg(t), e = fg(t, e);
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
    P(oe), Q(oe, e);
  }
  function Ve() {
    P(oe), P(he), P(ge);
  }
  function Jt(e) {
    e.memoizedState !== null && Q(Ae, e);
    var t = oe.current, r = fg(t, e.type);
    t !== r && (Q(he, e), Q(oe, r));
  }
  function Pt(e) {
    he.current === e && (P(oe), P(he)), Ae.current === e && (P(Ae), Il._currentValue = U);
  }
  var At, We;
  function pt(e) {
    if (At === void 0)
      try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        At = t && t[1] || "", We = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + At + e + We;
  }
  var fe = !1;
  function ke(e, t) {
    if (!e || fe) return "";
    fe = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var se = function() {
                throw Error();
              };
              if (Object.defineProperty(se.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(se, []);
                } catch (Z) {
                  var X = Z;
                }
                Reflect.construct(e, [], se);
              } else {
                try {
                  se.call();
                } catch (Z) {
                  X = Z;
                }
                e.call(se.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Z) {
                X = Z;
              }
              (se = e()) && typeof se.catch == "function" && se.catch(function() {
              });
            }
          } catch (Z) {
            if (Z && X && typeof Z.stack == "string")
              return [Z.stack, X.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = l.DetermineComponentFrameRoot(), x = f[0], j = f[1];
      if (x && j) {
        var L = x.split(`
`), G = j.split(`
`);
        for (c = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; c < G.length && !G[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (l === L.length || c === G.length)
          for (l = L.length - 1, c = G.length - 1; 1 <= l && 0 <= c && L[l] !== G[c]; )
            c--;
        for (; 1 <= l && 0 <= c; l--, c--)
          if (L[l] !== G[c]) {
            if (l !== 1 || c !== 1)
              do
                if (l--, c--, 0 > c || L[l] !== G[c]) {
                  var ae = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), ae;
                }
              while (1 <= l && 0 <= c);
            break;
          }
      }
    } finally {
      fe = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? pt(r) : "";
  }
  function De(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return pt(e.type);
      case 16:
        return pt("Lazy");
      case 13:
        return e.child !== t && t !== null ? pt("Suspense Fallback") : pt("Suspense");
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
      var t = "", r = null;
      do
        t += De(e, r), r = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var bt = Object.prototype.hasOwnProperty, xt = n.unstable_scheduleCallback, dn = n.unstable_cancelCallback, Ht = n.unstable_shouldYield, On = n.unstable_requestPaint, qt = n.unstable_now, ye = n.unstable_getCurrentPriorityLevel, ze = n.unstable_ImmediatePriority, Ke = n.unstable_UserBlockingPriority, tt = n.unstable_NormalPriority, It = n.unstable_LowPriority, Ft = n.unstable_IdlePriority, jr = n.log, la = n.unstable_setDisableYieldValue, Zn = null, Wt = null;
  function Tt(e) {
    if (typeof jr == "function" && la(e), Wt && typeof Wt.setStrictMode == "function")
      try {
        Wt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : kn, ei = Math.log, Ha = Math.LN2;
  function kn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ei(e) / Ha | 0) | 0;
  }
  var va = 256, Jn = 262144, sa = 4194304;
  function hn(e) {
    var t = e & 42;
    if (t !== 0) return t;
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
  function Oe(e, t, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var c = 0, f = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var j = l & 134217727;
    return j !== 0 ? (l = j & ~f, l !== 0 ? c = hn(l) : (x &= j, x !== 0 ? c = hn(x) : r || (r = j & ~e, r !== 0 && (c = hn(r))))) : (j = l & ~f, j !== 0 ? c = hn(j) : x !== 0 ? c = hn(x) : r || (r = l & ~e, r !== 0 && (c = hn(r)))), c === 0 ? 0 : t !== 0 && t !== c && (t & f) === 0 && (f = c & -c, r = t & -t, f >= r || f === 32 && (r & 4194048) !== 0) ? t : c;
  }
  function ct(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Dt(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
    var e = sa;
    return sa <<= 1, (sa & 62914560) === 0 && (sa = 4194304), e;
  }
  function wn(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function rt(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function en(e, t, r, l, c, f) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var j = e.entanglements, L = e.expirationTimes, G = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ae = 31 - Yt(r), se = 1 << ae;
      j[ae] = 0, L[ae] = -1;
      var X = G[ae];
      if (X !== null)
        for (G[ae] = null, ae = 0; ae < X.length; ae++) {
          var Z = X[ae];
          Z !== null && (Z.lane &= -536870913);
        }
      r &= ~se;
    }
    l !== 0 && ga(e, l, 0), f !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(x & ~t));
  }
  function ga(e, t, r) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Yt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function ln(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var l = 31 - Yt(r), c = 1 << l;
      c & t | e[l] & t && (e[l] |= t), r &= ~c;
    }
  }
  function O(e, t) {
    var r = t & -t;
    return r = (r & 42) !== 0 ? 1 : V(r), (r & (e.suspendedLanes | t)) !== 0 ? 0 : r;
  }
  function V(e) {
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
    var e = N.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : kg(e.type));
  }
  function de(e, t) {
    var r = N.p;
    try {
      return N.p = e, t();
    } finally {
      N.p = r;
    }
  }
  var Se = Math.random().toString(36).slice(2), pe = "__reactFiber$" + Se, ve = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Re = "__reactListeners$" + Se, Ne = "__reactHandles$" + Se, Qe = "__reactResources$" + Se, $e = "__reactMarker$" + Se;
  function ut(e) {
    delete e[pe], delete e[ve], delete e[be], delete e[Re], delete e[Ne];
  }
  function it(e) {
    var t = e[pe];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Ee] || r[pe]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null)
          for (e = bg(e); e !== null; ) {
            if (r = e[pe]) return r;
            e = bg(e);
          }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function St(e) {
    if (e = e[pe] || e[Ee]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ie(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function zt(e) {
    var t = e[Qe];
    return t || (t = e[Qe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function mt(e) {
    e[$e] = !0;
  }
  var qa = /* @__PURE__ */ new Set(), Wn = {};
  function Kt(e, t) {
    oa(e, t), oa(e + "Capture", t);
  }
  function oa(e, t) {
    for (Wn[e] = t, e = 0; e < t.length; e++)
      qa.add(t[e]);
  }
  var Nr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ca = {}, Tr = {};
  function ti(e) {
    return bt.call(Tr, e) ? !0 : bt.call(ca, e) ? !1 : Nr.test(e) ? Tr[e] = !0 : (ca[e] = !0, !1);
  }
  function He(e, t, r) {
    if (ti(t))
      if (r === null) e.removeAttribute(t);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + r);
      }
  }
  function Ct(e, t, r) {
    if (r === null) e.removeAttribute(t);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + r);
    }
  }
  function sn(e, t, r, l) {
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
      e.setAttributeNS(t, r, "" + l);
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
  function vt(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ni(e, t, r) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, f = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(x) {
          r = "" + x, f.call(this, x);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(x) {
          r = "" + x;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ai(e) {
    if (!e._valueTracker) {
      var t = vt(e) ? "checked" : "value";
      e._valueTracker = ni(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Ds(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(), l = "";
    return e && (l = vt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (t.setValue(e), !0) : !1;
  }
  function zs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var SS = /[\n"\\]/g;
  function Ln(e) {
    return e.replace(
      SS,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qc(e, t, r, l, c, f, x, j) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), t != null ? x === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ot(t)) : e.value !== "" + Ot(t) && (e.value = "" + Ot(t)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), t != null ? Ic(e, x, Ot(t)) : r != null ? Ic(e, x, Ot(r)) : l != null && e.removeAttribute("value"), c == null && f != null && (e.defaultChecked = !!f), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), j != null && typeof j != "function" && typeof j != "symbol" && typeof j != "boolean" ? e.name = "" + Ot(j) : e.removeAttribute("name");
  }
  function im(e, t, r, l, c, f, x, j) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + Ot(r) : "", t = t != null ? "" + Ot(t) : r, j || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? c, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = j ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ai(e);
  }
  function Ic(e, t, r) {
    t === "number" && zs(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, t, r, l) {
    if (e = e.options, t) {
      t = {};
      for (var c = 0; c < r.length; c++)
        t["$" + r[c]] = !0;
      for (r = 0; r < e.length; r++)
        c = t.hasOwnProperty("$" + e[r].value), e[r].selected !== c && (e[r].selected = c), c && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Ot(r), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === r) {
          e[c].selected = !0, l && (e[c].defaultSelected = !0);
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function lm(e, t, r) {
    if (t != null && (t = "" + Ot(t), t !== e.value && (e.value = t), r == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = r != null ? "" + Ot(r) : "";
  }
  function sm(e, t, r, l) {
    if (t == null) {
      if (l != null) {
        if (r != null) throw Error(s(92));
        if (W(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), t = r;
    }
    r = Ot(t), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), ai(e);
  }
  function ii(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var wS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function om(e, t, r) {
    var l = t.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, r) : typeof r != "number" || r === 0 || wS.has(t) ? t === "float" ? e.cssFloat = r : e[t] = ("" + r).trim() : e[t] = r + "px";
  }
  function cm(e, t, r) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var c in t)
        l = t[c], t.hasOwnProperty(c) && r[c] !== l && om(e, c, l);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && om(e, f, t[f]);
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
  var ES = /* @__PURE__ */ new Map([
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
  ]), jS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Os(e) {
    return jS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ya() {
  }
  var Yc = null;
  function Gc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var li = null, si = null;
  function um(e) {
    var t = St(e);
    if (t && (e = t.stateNode)) {
      var r = e[ve] || null;
      e: switch (e = t.stateNode, t.type) {
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
          ), t = r.name, r.type === "radio" && t != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll(
              'input[name="' + Ln(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < r.length; t++) {
              var l = r[t];
              if (l !== e && l.form === e.form) {
                var c = l[ve] || null;
                if (!c) throw Error(s(90));
                qc(
                  l,
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
            for (t = 0; t < r.length; t++)
              l = r[t], l.form === e.form && Ds(l);
          }
          break e;
        case "textarea":
          lm(e, r.value, r.defaultValue);
          break e;
        case "select":
          t = r.value, t != null && ri(e, !!r.multiple, t, !1);
      }
    }
  }
  var Xc = !1;
  function dm(e, t, r) {
    if (Xc) return e(t, r);
    Xc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Xc = !1, (li !== null || si !== null) && (wo(), li && (t = li, e = si, si = li = null, um(t), e)))
        for (t = 0; t < e.length; t++) um(e[t]);
    }
  }
  function ll(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[ve] || null;
    if (l === null) return null;
    r = l[t];
    e: switch (t) {
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
        s(231, t, typeof r)
      );
    return r;
  }
  var ba = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Pc = !1;
  if (ba)
    try {
      var sl = {};
      Object.defineProperty(sl, "passive", {
        get: function() {
          Pc = !0;
        }
      }), window.addEventListener("test", sl, sl), window.removeEventListener("test", sl, sl);
    } catch {
      Pc = !1;
    }
  var Ia = null, Kc = null, ks = null;
  function fm() {
    if (ks) return ks;
    var e, t = Kc, r = t.length, l, c = "value" in Ia ? Ia.value : Ia.textContent, f = c.length;
    for (e = 0; e < r && t[e] === c[e]; e++) ;
    var x = r - e;
    for (l = 1; l <= x && t[r - l] === c[f - l]; l++) ;
    return ks = c.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ls(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Us() {
    return !0;
  }
  function hm() {
    return !1;
  }
  function mn(e) {
    function t(r, l, c, f, x) {
      this._reactName = r, this._targetInst = c, this.type = l, this.nativeEvent = f, this.target = x, this.currentTarget = null;
      for (var j in e)
        e.hasOwnProperty(j) && (r = e[j], this[j] = r ? r(f) : f[j]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Us : hm, this.isPropagationStopped = hm, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Us);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Us);
      },
      persist: function() {
      },
      isPersistent: Us
    }), t;
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
  }, Bs = mn(Cr), ol = v({}, Cr, { view: 0, detail: 0 }), NS = mn(ol), Qc, Zc, cl, Vs = v({}, ol, {
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
      return "movementX" in e ? e.movementX : (e !== cl && (cl && e.type === "mousemove" ? (Qc = e.screenX - cl.screenX, Zc = e.screenY - cl.screenY) : Zc = Qc = 0, cl = e), Qc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Zc;
    }
  }), mm = mn(Vs), TS = v({}, Vs, { dataTransfer: 0 }), CS = mn(TS), RS = v({}, ol, { relatedTarget: 0 }), Jc = mn(RS), MS = v({}, Cr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _S = mn(MS), AS = v({}, Cr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), DS = mn(AS), zS = v({}, Cr, { data: 0 }), pm = mn(zS), OS = {
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
  }, kS = {
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
  }, LS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function US(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = LS[e]) ? !!t[e] : !1;
  }
  function Wc() {
    return US;
  }
  var BS = v({}, ol, {
    key: function(e) {
      if (e.key) {
        var t = OS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ls(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? kS[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? Ls(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ls(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), VS = mn(BS), $S = v({}, Vs, {
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
  }), vm = mn($S), HS = v({}, ol, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wc
  }), qS = mn(HS), IS = v({}, Cr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), FS = mn(IS), YS = v({}, Vs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), GS = mn(YS), XS = v({}, Cr, {
    newState: 0,
    oldState: 0
  }), PS = mn(XS), KS = [9, 13, 27, 32], eu = ba && "CompositionEvent" in window, ul = null;
  ba && "documentMode" in document && (ul = document.documentMode);
  var QS = ba && "TextEvent" in window && !ul, gm = ba && (!eu || ul && 8 < ul && 11 >= ul), ym = " ", bm = !1;
  function xm(e, t) {
    switch (e) {
      case "keyup":
        return KS.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Sm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function ZS(e, t) {
    switch (e) {
      case "compositionend":
        return Sm(t);
      case "keypress":
        return t.which !== 32 ? null : (bm = !0, ym);
      case "textInput":
        return e = t.data, e === ym && bm ? null : e;
      default:
        return null;
    }
  }
  function JS(e, t) {
    if (oi)
      return e === "compositionend" || !eu && xm(e, t) ? (e = fm(), ks = Kc = Ia = null, oi = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return gm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var WS = {
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
  function wm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!WS[e.type] : t === "textarea";
  }
  function Em(e, t, r, l) {
    li ? si ? si.push(l) : si = [l] : li = l, t = Mo(t, "onChange"), 0 < t.length && (r = new Bs(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: t }));
  }
  var dl = null, fl = null;
  function ew(e) {
    ig(e, 0);
  }
  function $s(e) {
    var t = Ie(e);
    if (Ds(t)) return e;
  }
  function jm(e, t) {
    if (e === "change") return t;
  }
  var Nm = !1;
  if (ba) {
    var tu;
    if (ba) {
      var nu = "oninput" in document;
      if (!nu) {
        var Tm = document.createElement("div");
        Tm.setAttribute("oninput", "return;"), nu = typeof Tm.oninput == "function";
      }
      tu = nu;
    } else tu = !1;
    Nm = tu && (!document.documentMode || 9 < document.documentMode);
  }
  function Cm() {
    dl && (dl.detachEvent("onpropertychange", Rm), fl = dl = null);
  }
  function Rm(e) {
    if (e.propertyName === "value" && $s(fl)) {
      var t = [];
      Em(
        t,
        fl,
        e,
        Gc(e)
      ), dm(ew, t);
    }
  }
  function tw(e, t, r) {
    e === "focusin" ? (Cm(), dl = t, fl = r, dl.attachEvent("onpropertychange", Rm)) : e === "focusout" && Cm();
  }
  function nw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $s(fl);
  }
  function aw(e, t) {
    if (e === "click") return $s(t);
  }
  function rw(e, t) {
    if (e === "input" || e === "change")
      return $s(t);
  }
  function iw(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var En = typeof Object.is == "function" ? Object.is : iw;
  function hl(e, t) {
    if (En(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(t);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var c = r[l];
      if (!bt.call(t, c) || !En(e[c], t[c]))
        return !1;
    }
    return !0;
  }
  function Mm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function _m(e, t) {
    var r = Mm(e);
    e = 0;
    for (var l; r; ) {
      if (r.nodeType === 3) {
        if (l = e + r.textContent.length, e <= t && l >= t)
          return { node: r, offset: t - e };
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
      r = Mm(r);
    }
  }
  function Am(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Am(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Dm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = zs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = zs(e.document);
    }
    return t;
  }
  function au(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var lw = ba && "documentMode" in document && 11 >= document.documentMode, ci = null, ru = null, ml = null, iu = !1;
  function zm(e, t, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    iu || ci == null || ci !== zs(l) || (l = ci, "selectionStart" in l && au(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ml && hl(ml, l) || (ml = l, l = Mo(ru, "onSelect"), 0 < l.length && (t = new Bs(
      "onSelect",
      "select",
      null,
      t,
      r
    ), e.push({ event: t, listeners: l }), t.target = ci)));
  }
  function Rr(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var ui = {
    animationend: Rr("Animation", "AnimationEnd"),
    animationiteration: Rr("Animation", "AnimationIteration"),
    animationstart: Rr("Animation", "AnimationStart"),
    transitionrun: Rr("Transition", "TransitionRun"),
    transitionstart: Rr("Transition", "TransitionStart"),
    transitioncancel: Rr("Transition", "TransitionCancel"),
    transitionend: Rr("Transition", "TransitionEnd")
  }, lu = {}, Om = {};
  ba && (Om = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function Mr(e) {
    if (lu[e]) return lu[e];
    if (!ui[e]) return e;
    var t = ui[e], r;
    for (r in t)
      if (t.hasOwnProperty(r) && r in Om)
        return lu[e] = t[r];
    return e;
  }
  var km = Mr("animationend"), Lm = Mr("animationiteration"), Um = Mr("animationstart"), sw = Mr("transitionrun"), ow = Mr("transitionstart"), cw = Mr("transitioncancel"), Bm = Mr("transitionend"), Vm = /* @__PURE__ */ new Map(), su = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  su.push("scrollEnd");
  function ea(e, t) {
    Vm.set(e, t), Kt(t, [e]);
  }
  var Hs = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Un = [], di = 0, ou = 0;
  function qs() {
    for (var e = di, t = ou = di = 0; t < e; ) {
      var r = Un[t];
      Un[t++] = null;
      var l = Un[t];
      Un[t++] = null;
      var c = Un[t];
      Un[t++] = null;
      var f = Un[t];
      if (Un[t++] = null, l !== null && c !== null) {
        var x = l.pending;
        x === null ? c.next = c : (c.next = x.next, x.next = c), l.pending = c;
      }
      f !== 0 && $m(r, c, f);
    }
  }
  function Is(e, t, r, l) {
    Un[di++] = e, Un[di++] = t, Un[di++] = r, Un[di++] = l, ou |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function cu(e, t, r, l) {
    return Is(e, t, r, l), Fs(e);
  }
  function _r(e, t) {
    return Is(e, null, null, t), Fs(e);
  }
  function $m(e, t, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var c = !1, f = e.return; f !== null; )
      f.childLanes |= r, l = f.alternate, l !== null && (l.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (c = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, c && t !== null && (c = 31 - Yt(r), e = f.hiddenUpdates, l = e[c], l === null ? e[c] = [t] : l.push(t), t.lane = r | 536870912), f) : null;
  }
  function Fs(e) {
    if (50 < Ll)
      throw Ll = 0, yd = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function uw(e, t, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jn(e, t, r, l) {
    return new uw(e, t, r, l);
  }
  function uu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xa(e, t) {
    var r = e.alternate;
    return r === null ? (r = jn(
      e.tag,
      t,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function Hm(e, t) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, t = r.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ys(e, t, r, l, c, f) {
    var x = 0;
    if (l = e, typeof e == "function") uu(e) && (x = 1);
    else if (typeof e == "string")
      x = pE(
        e,
        r,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case H:
          return e = jn(31, r, t, c), e.elementType = H, e.lanes = f, e;
        case T:
          return Ar(r.children, c, f, t);
        case R:
          x = 8, c |= 24;
          break;
        case C:
          return e = jn(12, r, t, c | 2), e.elementType = C, e.lanes = f, e;
        case K:
          return e = jn(13, r, t, c), e.elementType = K, e.lanes = f, e;
        case ee:
          return e = jn(19, r, t, c), e.elementType = ee, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                x = 10;
                break e;
              case k:
                x = 9;
                break e;
              case z:
                x = 11;
                break e;
              case te:
                x = 14;
                break e;
              case D:
                x = 16, l = null;
                break e;
            }
          x = 29, r = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = jn(x, r, t, c), t.elementType = e, t.type = l, t.lanes = f, t;
  }
  function Ar(e, t, r, l) {
    return e = jn(7, e, l, t), e.lanes = r, e;
  }
  function du(e, t, r) {
    return e = jn(6, e, null, t), e.lanes = r, e;
  }
  function qm(e) {
    var t = jn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function fu(e, t, r) {
    return t = jn(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = r, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Im = /* @__PURE__ */ new WeakMap();
  function Bn(e, t) {
    if (typeof e == "object" && e !== null) {
      var r = Im.get(e);
      return r !== void 0 ? r : (t = {
        value: e,
        source: t,
        stack: Te(t)
      }, Im.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Te(t)
    };
  }
  var hi = [], mi = 0, Gs = null, pl = 0, Vn = [], $n = 0, Fa = null, ua = 1, da = "";
  function Sa(e, t) {
    hi[mi++] = pl, hi[mi++] = Gs, Gs = e, pl = t;
  }
  function Fm(e, t, r) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, Fa = e;
    var l = ua;
    e = da;
    var c = 32 - Yt(l) - 1;
    l &= ~(1 << c), r += 1;
    var f = 32 - Yt(t) + c;
    if (30 < f) {
      var x = c - c % 5;
      f = (l & (1 << x) - 1).toString(32), l >>= x, c -= x, ua = 1 << 32 - Yt(t) + c | r << c | l, da = f + e;
    } else
      ua = 1 << f | r << c | l, da = e;
  }
  function hu(e) {
    e.return !== null && (Sa(e, 1), Fm(e, 1, 0));
  }
  function mu(e) {
    for (; e === Gs; )
      Gs = hi[--mi], hi[mi] = null, pl = hi[--mi], hi[mi] = null;
    for (; e === Fa; )
      Fa = Vn[--$n], Vn[$n] = null, da = Vn[--$n], Vn[$n] = null, ua = Vn[--$n], Vn[$n] = null;
  }
  function Ym(e, t) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, ua = t.id, da = t.overflow, Fa = e;
  }
  var tn = null, gt = null, Pe = !1, Ya = null, Hn = !1, pu = Error(s(519));
  function Ga(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw vl(Bn(t, e)), pu;
  }
  function Gm(e) {
    var t = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (t[pe] = e, t[ve] = l, r) {
      case "dialog":
        Ye("cancel", t), Ye("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ye("load", t);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Bl.length; r++)
          Ye(Bl[r], t);
        break;
      case "source":
        Ye("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ye("error", t), Ye("load", t);
        break;
      case "details":
        Ye("toggle", t);
        break;
      case "input":
        Ye("invalid", t), im(
          t,
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
        Ye("invalid", t);
        break;
      case "textarea":
        Ye("invalid", t), sm(t, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || t.textContent === "" + r || l.suppressHydrationWarning === !0 || cg(t.textContent, r) ? (l.popover != null && (Ye("beforetoggle", t), Ye("toggle", t)), l.onScroll != null && Ye("scroll", t), l.onScrollEnd != null && Ye("scrollend", t), l.onClick != null && (t.onclick = ya), t = !0) : t = !1, t || Ga(e, !0);
  }
  function Xm(e) {
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
    if (!Pe) return Xm(e), Pe = !0, !1;
    var t = e.tag, r;
    if ((r = t !== 3 && t !== 27) && ((r = t === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || zd(e.type, e.memoizedProps)), r = !r), r && gt && Ga(e), Xm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      gt = yg(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      gt = yg(e);
    } else
      t === 27 ? (t = gt, lr(e.type) ? (e = Bd, Bd = null, gt = e) : gt = t) : gt = tn ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Dr() {
    gt = tn = null, Pe = !1;
  }
  function vu() {
    var e = Ya;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Ya = null), e;
  }
  function vl(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var gu = M(null), zr = null, wa = null;
  function Xa(e, t, r) {
    Q(gu, t._currentValue), t._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = gu.current, P(gu);
  }
  function yu(e, t, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function bu(e, t, r, l) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var f = c.dependencies;
      if (f !== null) {
        var x = c.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var j = f;
          f = c;
          for (var L = 0; L < t.length; L++)
            if (j.context === t[L]) {
              f.lanes |= r, j = f.alternate, j !== null && (j.lanes |= r), yu(
                f.return,
                r,
                e
              ), l || (x = null);
              break e;
            }
          f = j.next;
        }
      } else if (c.tag === 18) {
        if (x = c.return, x === null) throw Error(s(341));
        x.lanes |= r, f = x.alternate, f !== null && (f.lanes |= r), yu(x, r, e), x = null;
      } else x = c.child;
      if (x !== null) x.return = c;
      else
        for (x = c; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (c = x.sibling, c !== null) {
            c.return = x.return, x = c;
            break;
          }
          x = x.return;
        }
      c = x;
    }
  }
  function vi(e, t, r, l) {
    e = null;
    for (var c = t, f = !1; c !== null; ) {
      if (!f) {
        if ((c.flags & 524288) !== 0) f = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var x = c.alternate;
        if (x === null) throw Error(s(387));
        if (x = x.memoizedProps, x !== null) {
          var j = c.type;
          En(c.pendingProps.value, x.value) || (e !== null ? e.push(j) : e = [j]);
        }
      } else if (c === Ae.current) {
        if (x = c.alternate, x === null) throw Error(s(387));
        x.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Il) : e = [Il]);
      }
      c = c.return;
    }
    e !== null && bu(
      t,
      e,
      r,
      l
    ), t.flags |= 262144;
  }
  function Xs(e) {
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
    return Pm(zr, e);
  }
  function Ps(e, t) {
    return zr === null && Or(e), Pm(e, t);
  }
  function Pm(e, t) {
    var r = t._currentValue;
    if (t = { context: t, memoizedValue: r, next: null }, wa === null) {
      if (e === null) throw Error(s(308));
      wa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else wa = wa.next = t;
    return r;
  }
  var dw = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(r, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(r) {
        return r();
      });
    };
  }, fw = n.unstable_scheduleCallback, hw = n.unstable_NormalPriority, kt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function xu() {
    return {
      controller: new dw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function gl(e) {
    e.refCount--, e.refCount === 0 && fw(hw, function() {
      e.controller.abort();
    });
  }
  var yl = null, Su = 0, gi = 0, yi = null;
  function mw(e, t) {
    if (yl === null) {
      var r = yl = [];
      Su = 0, gi = jd(), yi = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Su++, t.then(Km, Km), t;
  }
  function Km() {
    if (--Su === 0 && yl !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = yl;
      yl = null, gi = 0, yi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function pw(e, t) {
    var r = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        r.push(c);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var c = 0; c < r.length; c++) (0, r[c])(t);
      },
      function(c) {
        for (l.status = "rejected", l.reason = c, c = 0; c < r.length; c++)
          (0, r[c])(void 0);
      }
    ), l;
  }
  var Qm = A.S;
  A.S = function(e, t) {
    zv = qt(), typeof t == "object" && t !== null && typeof t.then == "function" && mw(e, t), Qm !== null && Qm(e, t);
  };
  var kr = M(null);
  function wu() {
    var e = kr.current;
    return e !== null ? e : dt.pooledCache;
  }
  function Ks(e, t) {
    t === null ? Q(kr, kr.current) : Q(kr, t.pool);
  }
  function Zm() {
    var e = wu();
    return e === null ? null : { parent: kt._currentValue, pool: e };
  }
  var bi = Error(s(460)), Eu = Error(s(474)), Qs = Error(s(542)), Zs = { then: function() {
  } };
  function Jm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Wm(e, t, r) {
    switch (r = e[r], r === void 0 ? e.push(t) : r !== t && (t.then(ya, ya), t = r), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, tp(e), e;
      default:
        if (typeof t.status == "string") t.then(ya, ya);
        else {
          if (e = dt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var c = t;
                c.status = "fulfilled", c.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var c = t;
                c.status = "rejected", c.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, tp(e), e;
        }
        throw Ur = t, bi;
    }
  }
  function Lr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Ur = r, bi) : r;
    }
  }
  var Ur = null;
  function ep() {
    if (Ur === null) throw Error(s(459));
    var e = Ur;
    return Ur = null, e;
  }
  function tp(e) {
    if (e === bi || e === Qs)
      throw Error(s(483));
  }
  var xi = null, bl = 0;
  function Js(e) {
    var t = bl;
    return bl += 1, xi === null && (xi = []), Wm(xi, e, t);
  }
  function xl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ws(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function np(e) {
    function t($, B) {
      if (e) {
        var Y = $.deletions;
        Y === null ? ($.deletions = [B], $.flags |= 16) : Y.push(B);
      }
    }
    function r($, B) {
      if (!e) return null;
      for (; B !== null; )
        t($, B), B = B.sibling;
      return null;
    }
    function l($) {
      for (var B = /* @__PURE__ */ new Map(); $ !== null; )
        $.key !== null ? B.set($.key, $) : B.set($.index, $), $ = $.sibling;
      return B;
    }
    function c($, B) {
      return $ = xa($, B), $.index = 0, $.sibling = null, $;
    }
    function f($, B, Y) {
      return $.index = Y, e ? (Y = $.alternate, Y !== null ? (Y = Y.index, Y < B ? ($.flags |= 67108866, B) : Y) : ($.flags |= 67108866, B)) : ($.flags |= 1048576, B);
    }
    function x($) {
      return e && $.alternate === null && ($.flags |= 67108866), $;
    }
    function j($, B, Y, ie) {
      return B === null || B.tag !== 6 ? (B = du(Y, $.mode, ie), B.return = $, B) : (B = c(B, Y), B.return = $, B);
    }
    function L($, B, Y, ie) {
      var Ce = Y.type;
      return Ce === T ? ae(
        $,
        B,
        Y.props.children,
        ie,
        Y.key
      ) : B !== null && (B.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Lr(Ce) === B.type) ? (B = c(B, Y.props), xl(B, Y), B.return = $, B) : (B = Ys(
        Y.type,
        Y.key,
        Y.props,
        null,
        $.mode,
        ie
      ), xl(B, Y), B.return = $, B);
    }
    function G($, B, Y, ie) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== Y.containerInfo || B.stateNode.implementation !== Y.implementation ? (B = fu(Y, $.mode, ie), B.return = $, B) : (B = c(B, Y.children || []), B.return = $, B);
    }
    function ae($, B, Y, ie, Ce) {
      return B === null || B.tag !== 7 ? (B = Ar(
        Y,
        $.mode,
        ie,
        Ce
      ), B.return = $, B) : (B = c(B, Y), B.return = $, B);
    }
    function se($, B, Y) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = du(
          "" + B,
          $.mode,
          Y
        ), B.return = $, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case E:
            return Y = Ys(
              B.type,
              B.key,
              B.props,
              null,
              $.mode,
              Y
            ), xl(Y, B), Y.return = $, Y;
          case w:
            return B = fu(
              B,
              $.mode,
              Y
            ), B.return = $, B;
          case D:
            return B = Lr(B), se($, B, Y);
        }
        if (W(B) || re(B))
          return B = Ar(
            B,
            $.mode,
            Y,
            null
          ), B.return = $, B;
        if (typeof B.then == "function")
          return se($, Js(B), Y);
        if (B.$$typeof === _)
          return se(
            $,
            Ps($, B),
            Y
          );
        Ws($, B);
      }
      return null;
    }
    function X($, B, Y, ie) {
      var Ce = B !== null ? B.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Ce !== null ? null : j($, B, "" + Y, ie);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case E:
            return Y.key === Ce ? L($, B, Y, ie) : null;
          case w:
            return Y.key === Ce ? G($, B, Y, ie) : null;
          case D:
            return Y = Lr(Y), X($, B, Y, ie);
        }
        if (W(Y) || re(Y))
          return Ce !== null ? null : ae($, B, Y, ie, null);
        if (typeof Y.then == "function")
          return X(
            $,
            B,
            Js(Y),
            ie
          );
        if (Y.$$typeof === _)
          return X(
            $,
            B,
            Ps($, Y),
            ie
          );
        Ws($, Y);
      }
      return null;
    }
    function Z($, B, Y, ie, Ce) {
      if (typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint")
        return $ = $.get(Y) || null, j(B, $, "" + ie, Ce);
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case E:
            return $ = $.get(
              ie.key === null ? Y : ie.key
            ) || null, L(B, $, ie, Ce);
          case w:
            return $ = $.get(
              ie.key === null ? Y : ie.key
            ) || null, G(B, $, ie, Ce);
          case D:
            return ie = Lr(ie), Z(
              $,
              B,
              Y,
              ie,
              Ce
            );
        }
        if (W(ie) || re(ie))
          return $ = $.get(Y) || null, ae(B, $, ie, Ce, null);
        if (typeof ie.then == "function")
          return Z(
            $,
            B,
            Y,
            Js(ie),
            Ce
          );
        if (ie.$$typeof === _)
          return Z(
            $,
            B,
            Y,
            Ps(B, ie),
            Ce
          );
        Ws(B, ie);
      }
      return null;
    }
    function xe($, B, Y, ie) {
      for (var Ce = null, Ze = null, je = B, Be = B = 0, Xe = null; je !== null && Be < Y.length; Be++) {
        je.index > Be ? (Xe = je, je = null) : Xe = je.sibling;
        var Je = X(
          $,
          je,
          Y[Be],
          ie
        );
        if (Je === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && Je.alternate === null && t($, je), B = f(Je, B, Be), Ze === null ? Ce = Je : Ze.sibling = Je, Ze = Je, je = Xe;
      }
      if (Be === Y.length)
        return r($, je), Pe && Sa($, Be), Ce;
      if (je === null) {
        for (; Be < Y.length; Be++)
          je = se($, Y[Be], ie), je !== null && (B = f(
            je,
            B,
            Be
          ), Ze === null ? Ce = je : Ze.sibling = je, Ze = je);
        return Pe && Sa($, Be), Ce;
      }
      for (je = l(je); Be < Y.length; Be++)
        Xe = Z(
          je,
          $,
          Be,
          Y[Be],
          ie
        ), Xe !== null && (e && Xe.alternate !== null && je.delete(
          Xe.key === null ? Be : Xe.key
        ), B = f(
          Xe,
          B,
          Be
        ), Ze === null ? Ce = Xe : Ze.sibling = Xe, Ze = Xe);
      return e && je.forEach(function(dr) {
        return t($, dr);
      }), Pe && Sa($, Be), Ce;
    }
    function _e($, B, Y, ie) {
      if (Y == null) throw Error(s(151));
      for (var Ce = null, Ze = null, je = B, Be = B = 0, Xe = null, Je = Y.next(); je !== null && !Je.done; Be++, Je = Y.next()) {
        je.index > Be ? (Xe = je, je = null) : Xe = je.sibling;
        var dr = X($, je, Je.value, ie);
        if (dr === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && dr.alternate === null && t($, je), B = f(dr, B, Be), Ze === null ? Ce = dr : Ze.sibling = dr, Ze = dr, je = Xe;
      }
      if (Je.done)
        return r($, je), Pe && Sa($, Be), Ce;
      if (je === null) {
        for (; !Je.done; Be++, Je = Y.next())
          Je = se($, Je.value, ie), Je !== null && (B = f(Je, B, Be), Ze === null ? Ce = Je : Ze.sibling = Je, Ze = Je);
        return Pe && Sa($, Be), Ce;
      }
      for (je = l(je); !Je.done; Be++, Je = Y.next())
        Je = Z(je, $, Be, Je.value, ie), Je !== null && (e && Je.alternate !== null && je.delete(Je.key === null ? Be : Je.key), B = f(Je, B, Be), Ze === null ? Ce = Je : Ze.sibling = Je, Ze = Je);
      return e && je.forEach(function(TE) {
        return t($, TE);
      }), Pe && Sa($, Be), Ce;
    }
    function ot($, B, Y, ie) {
      if (typeof Y == "object" && Y !== null && Y.type === T && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case E:
            e: {
              for (var Ce = Y.key; B !== null; ) {
                if (B.key === Ce) {
                  if (Ce = Y.type, Ce === T) {
                    if (B.tag === 7) {
                      r(
                        $,
                        B.sibling
                      ), ie = c(
                        B,
                        Y.props.children
                      ), ie.return = $, $ = ie;
                      break e;
                    }
                  } else if (B.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Lr(Ce) === B.type) {
                    r(
                      $,
                      B.sibling
                    ), ie = c(B, Y.props), xl(ie, Y), ie.return = $, $ = ie;
                    break e;
                  }
                  r($, B);
                  break;
                } else t($, B);
                B = B.sibling;
              }
              Y.type === T ? (ie = Ar(
                Y.props.children,
                $.mode,
                ie,
                Y.key
              ), ie.return = $, $ = ie) : (ie = Ys(
                Y.type,
                Y.key,
                Y.props,
                null,
                $.mode,
                ie
              ), xl(ie, Y), ie.return = $, $ = ie);
            }
            return x($);
          case w:
            e: {
              for (Ce = Y.key; B !== null; ) {
                if (B.key === Ce)
                  if (B.tag === 4 && B.stateNode.containerInfo === Y.containerInfo && B.stateNode.implementation === Y.implementation) {
                    r(
                      $,
                      B.sibling
                    ), ie = c(B, Y.children || []), ie.return = $, $ = ie;
                    break e;
                  } else {
                    r($, B);
                    break;
                  }
                else t($, B);
                B = B.sibling;
              }
              ie = fu(Y, $.mode, ie), ie.return = $, $ = ie;
            }
            return x($);
          case D:
            return Y = Lr(Y), ot(
              $,
              B,
              Y,
              ie
            );
        }
        if (W(Y))
          return xe(
            $,
            B,
            Y,
            ie
          );
        if (re(Y)) {
          if (Ce = re(Y), typeof Ce != "function") throw Error(s(150));
          return Y = Ce.call(Y), _e(
            $,
            B,
            Y,
            ie
          );
        }
        if (typeof Y.then == "function")
          return ot(
            $,
            B,
            Js(Y),
            ie
          );
        if (Y.$$typeof === _)
          return ot(
            $,
            B,
            Ps($, Y),
            ie
          );
        Ws($, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Y = "" + Y, B !== null && B.tag === 6 ? (r($, B.sibling), ie = c(B, Y), ie.return = $, $ = ie) : (r($, B), ie = du(Y, $.mode, ie), ie.return = $, $ = ie), x($)) : r($, B);
    }
    return function($, B, Y, ie) {
      try {
        bl = 0;
        var Ce = ot(
          $,
          B,
          Y,
          ie
        );
        return xi = null, Ce;
      } catch (je) {
        if (je === bi || je === Qs) throw je;
        var Ze = jn(29, je, null, $.mode);
        return Ze.lanes = ie, Ze.return = $, Ze;
      } finally {
      }
    };
  }
  var Br = np(!0), ap = np(!1), Pa = !1;
  function ju(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Nu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
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
  function Qa(e, t, r) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (et & 2) !== 0) {
      var c = l.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), l.pending = t, t = Fs(e), $m(e, null, r), t;
    }
    return Is(e, l, t, r), Fs(e);
  }
  function Sl(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, ln(e, r);
    }
  }
  function Tu(e, t) {
    var r = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, r === l)) {
      var c = null, f = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var x = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          f === null ? c = f = x : f = f.next = x, r = r.next;
        } while (r !== null);
        f === null ? c = f = t : f = f.next = t;
      } else c = f = t;
      r = {
        baseState: l.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: f,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  var Cu = !1;
  function wl() {
    if (Cu) {
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function El(e, t, r, l) {
    Cu = !1;
    var c = e.updateQueue;
    Pa = !1;
    var f = c.firstBaseUpdate, x = c.lastBaseUpdate, j = c.shared.pending;
    if (j !== null) {
      c.shared.pending = null;
      var L = j, G = L.next;
      L.next = null, x === null ? f = G : x.next = G, x = L;
      var ae = e.alternate;
      ae !== null && (ae = ae.updateQueue, j = ae.lastBaseUpdate, j !== x && (j === null ? ae.firstBaseUpdate = G : j.next = G, ae.lastBaseUpdate = L));
    }
    if (f !== null) {
      var se = c.baseState;
      x = 0, ae = G = L = null, j = f;
      do {
        var X = j.lane & -536870913, Z = X !== j.lane;
        if (Z ? (Ge & X) === X : (l & X) === X) {
          X !== 0 && X === gi && (Cu = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: j.tag,
            payload: j.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, _e = j;
            X = t;
            var ot = r;
            switch (_e.tag) {
              case 1:
                if (xe = _e.payload, typeof xe == "function") {
                  se = xe.call(ot, se, X);
                  break e;
                }
                se = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = _e.payload, X = typeof xe == "function" ? xe.call(ot, se, X) : xe, X == null) break e;
                se = v({}, se, X);
                break e;
              case 2:
                Pa = !0;
            }
          }
          X = j.callback, X !== null && (e.flags |= 64, Z && (e.flags |= 8192), Z = c.callbacks, Z === null ? c.callbacks = [X] : Z.push(X));
        } else
          Z = {
            lane: X,
            tag: j.tag,
            payload: j.payload,
            callback: j.callback,
            next: null
          }, ae === null ? (G = ae = Z, L = se) : ae = ae.next = Z, x |= X;
        if (j = j.next, j === null) {
          if (j = c.shared.pending, j === null)
            break;
          Z = j, j = Z.next, Z.next = null, c.lastBaseUpdate = Z, c.shared.pending = null;
        }
      } while (!0);
      ae === null && (L = se), c.baseState = L, c.firstBaseUpdate = G, c.lastBaseUpdate = ae, f === null && (c.shared.lanes = 0), tr |= x, e.lanes = x, e.memoizedState = se;
    }
  }
  function rp(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function ip(e, t) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        rp(r[e], t);
  }
  var Si = M(null), eo = M(0);
  function lp(e, t) {
    e = Da, Q(eo, e), Q(Si, t), Da = e | t.baseLanes;
  }
  function Ru() {
    Q(eo, Da), Q(Si, Si.current);
  }
  function Mu() {
    Da = eo.current, P(Si), P(eo);
  }
  var Nn = M(null), qn = null;
  function Za(e) {
    var t = e.alternate;
    Q(Rt, Rt.current & 1), Q(Nn, e), qn === null && (t === null || Si.current !== null || t.memoizedState !== null) && (qn = e);
  }
  function _u(e) {
    Q(Rt, Rt.current), Q(Nn, e), qn === null && (qn = e);
  }
  function sp(e) {
    e.tag === 22 ? (Q(Rt, Rt.current), Q(Nn, e), qn === null && (qn = e)) : Ja();
  }
  function Ja() {
    Q(Rt, Rt.current), Q(Nn, Nn.current);
  }
  function Tn(e) {
    P(Nn), qn === e && (qn = null), P(Rt);
  }
  var Rt = M(0);
  function to(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Ld(r) || Ud(r)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var ja = 0, Ue = null, lt = null, Lt = null, no = !1, wi = !1, Vr = !1, ao = 0, jl = 0, Ei = null, vw = 0;
  function jt() {
    throw Error(s(321));
  }
  function Au(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!En(e[r], t[r])) return !1;
    return !0;
  }
  function Du(e, t, r, l, c, f) {
    return ja = f, Ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? Fp : Xu, Vr = !1, f = r(l, c), Vr = !1, wi && (f = cp(
      t,
      r,
      l,
      c
    )), op(e), f;
  }
  function op(e) {
    A.H = Cl;
    var t = lt !== null && lt.next !== null;
    if (ja = 0, Lt = lt = Ue = null, no = !1, jl = 0, Ei = null, t) throw Error(s(300));
    e === null || Ut || (e = e.dependencies, e !== null && Xs(e) && (Ut = !0));
  }
  function cp(e, t, r, l) {
    Ue = e;
    var c = 0;
    do {
      if (wi && (Ei = null), jl = 0, wi = !1, 25 <= c) throw Error(s(301));
      if (c += 1, Lt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      A.H = Yp, f = t(r, l);
    } while (wi);
    return f;
  }
  function gw() {
    var e = A.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Nl(t) : t, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), t;
  }
  function zu() {
    var e = ao !== 0;
    return ao = 0, e;
  }
  function Ou(e, t, r) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r;
  }
  function ku(e) {
    if (no) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      no = !1;
    }
    ja = 0, Lt = lt = Ue = null, wi = !1, jl = ao = 0, Ei = null;
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
    var t = Lt === null ? Ue.memoizedState : Lt.next;
    if (t !== null)
      Lt = t, lt = e;
    else {
      if (e === null)
        throw Ue.alternate === null ? Error(s(467)) : Error(s(310));
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
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Nl(e) {
    var t = jl;
    return jl += 1, Ei === null && (Ei = []), e = Wm(Ei, e, t), t = Ue, (Lt === null ? t.memoizedState : Lt.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? Fp : Xu), e;
  }
  function io(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Nl(e);
      if (e.$$typeof === _) return nn(e);
    }
    throw Error(s(438, String(e)));
  }
  function Lu(e) {
    var t = null, r = Ue.updateQueue;
    if (r !== null && (t = r.memoCache), t == null) {
      var l = Ue.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), r === null && (r = ro(), Ue.updateQueue = r), r.memoCache = t, r = t.data[t.index], r === void 0)
      for (r = t.data[t.index] = Array(e), l = 0; l < e; l++)
        r[l] = q;
    return t.index++, r;
  }
  function Na(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function lo(e) {
    var t = Mt();
    return Uu(t, lt, e);
  }
  function Uu(e, t, r) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = r;
    var c = e.baseQueue, f = l.pending;
    if (f !== null) {
      if (c !== null) {
        var x = c.next;
        c.next = f.next, f.next = x;
      }
      t.baseQueue = c = f, l.pending = null;
    }
    if (f = e.baseState, c === null) e.memoizedState = f;
    else {
      t = c.next;
      var j = x = null, L = null, G = t, ae = !1;
      do {
        var se = G.lane & -536870913;
        if (se !== G.lane ? (Ge & se) === se : (ja & se) === se) {
          var X = G.revertLane;
          if (X === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }), se === gi && (ae = !0);
          else if ((ja & X) === X) {
            G = G.next, X === gi && (ae = !0);
            continue;
          } else
            se = {
              lane: 0,
              revertLane: G.revertLane,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }, L === null ? (j = L = se, x = f) : L = L.next = se, Ue.lanes |= X, tr |= X;
          se = G.action, Vr && r(f, se), f = G.hasEagerState ? G.eagerState : r(f, se);
        } else
          X = {
            lane: se,
            revertLane: G.revertLane,
            gesture: G.gesture,
            action: G.action,
            hasEagerState: G.hasEagerState,
            eagerState: G.eagerState,
            next: null
          }, L === null ? (j = L = X, x = f) : L = L.next = X, Ue.lanes |= se, tr |= se;
        G = G.next;
      } while (G !== null && G !== t);
      if (L === null ? x = f : L.next = j, !En(f, e.memoizedState) && (Ut = !0, ae && (r = yi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = x, e.baseQueue = L, l.lastRenderedState = f;
    }
    return c === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Bu(e) {
    var t = Mt(), r = t.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, c = r.pending, f = t.memoizedState;
    if (c !== null) {
      r.pending = null;
      var x = c = c.next;
      do
        f = e(f, x.action), x = x.next;
      while (x !== c);
      En(f, t.memoizedState) || (Ut = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), r.lastRenderedState = f;
    }
    return [f, l];
  }
  function up(e, t, r) {
    var l = Ue, c = Mt(), f = Pe;
    if (f) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else r = t();
    var x = !En(
      (lt || c).memoizedState,
      r
    );
    if (x && (c.memoizedState = r, Ut = !0), c = c.queue, Hu(hp.bind(null, l, c, e), [
      e
    ]), c.getSnapshot !== t || x || Lt !== null && Lt.memoizedState.tag & 1) {
      if (l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        fp.bind(
          null,
          l,
          c,
          r,
          t
        ),
        null
      ), dt === null) throw Error(s(349));
      f || (ja & 127) !== 0 || dp(l, t, r);
    }
    return r;
  }
  function dp(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = Ue.updateQueue, t === null ? (t = ro(), Ue.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function fp(e, t, r, l) {
    t.value = r, t.getSnapshot = l, mp(t) && pp(e);
  }
  function hp(e, t, r) {
    return r(function() {
      mp(t) && pp(e);
    });
  }
  function mp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !En(e, r);
    } catch {
      return !0;
    }
  }
  function pp(e) {
    var t = _r(e, 2);
    t !== null && bn(t, e, 2);
  }
  function Vu(e) {
    var t = fn();
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
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Na,
      lastRenderedState: e
    }, t;
  }
  function vp(e, t, r, l) {
    return e.baseState = r, Uu(
      e,
      lt,
      typeof l == "function" ? l : Na
    );
  }
  function yw(e, t, r, l, c) {
    if (co(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var f = {
        payload: c,
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
      A.T !== null ? r(!0) : f.isTransition = !1, l(f), r = t.pending, r === null ? (f.next = t.pending = f, gp(t, f)) : (f.next = r.next, t.pending = r.next = f);
    }
  }
  function gp(e, t) {
    var r = t.action, l = t.payload, c = e.state;
    if (t.isTransition) {
      var f = A.T, x = {};
      A.T = x;
      try {
        var j = r(c, l), L = A.S;
        L !== null && L(x, j), yp(e, t, j);
      } catch (G) {
        $u(e, t, G);
      } finally {
        f !== null && x.types !== null && (f.types = x.types), A.T = f;
      }
    } else
      try {
        f = r(c, l), yp(e, t, f);
      } catch (G) {
        $u(e, t, G);
      }
  }
  function yp(e, t, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        bp(e, t, l);
      },
      function(l) {
        return $u(e, t, l);
      }
    ) : bp(e, t, r);
  }
  function bp(e, t, r) {
    t.status = "fulfilled", t.value = r, xp(t), e.state = r, t = e.pending, t !== null && (r = t.next, r === t ? e.pending = null : (r = r.next, t.next = r, gp(e, r)));
  }
  function $u(e, t, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = r, xp(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function xp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Sp(e, t) {
    return t;
  }
  function wp(e, t) {
    if (Pe) {
      var r = dt.formState;
      if (r !== null) {
        e: {
          var l = Ue;
          if (Pe) {
            if (gt) {
              t: {
                for (var c = gt, f = Hn; c.nodeType !== 8; ) {
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
                gt = In(
                  c.nextSibling
                ), l = c.data === "F!";
                break e;
              }
            }
            Ga(l);
          }
          l = !1;
        }
        l && (t = r[0]);
      }
    }
    return r = fn(), r.memoizedState = r.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Sp,
      lastRenderedState: t
    }, r.queue = l, r = Hp.bind(
      null,
      Ue,
      l
    ), l.dispatch = r, l = Vu(!1), f = Gu.bind(
      null,
      Ue,
      !1,
      l.queue
    ), l = fn(), c = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = c, r = yw.bind(
      null,
      Ue,
      c,
      f,
      r
    ), c.dispatch = r, l.memoizedState = e, [t, r, !1];
  }
  function Ep(e) {
    var t = Mt();
    return jp(t, lt, e);
  }
  function jp(e, t, r) {
    if (t = Uu(
      e,
      t,
      Sp
    )[0], e = lo(Na)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Nl(t);
      } catch (x) {
        throw x === bi ? Qs : x;
      }
    else l = t;
    t = Mt();
    var c = t.queue, f = c.dispatch;
    return r !== t.memoizedState && (Ue.flags |= 2048, ji(
      9,
      { destroy: void 0 },
      bw.bind(null, c, r),
      null
    )), [l, f, e];
  }
  function bw(e, t) {
    e.action = t;
  }
  function Np(e) {
    var t = Mt(), r = lt;
    if (r !== null)
      return jp(t, r, e);
    Mt(), t = t.memoizedState, r = Mt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [t, l, !1];
  }
  function ji(e, t, r, l) {
    return e = { tag: e, create: r, deps: l, inst: t, next: null }, t = Ue.updateQueue, t === null && (t = ro(), Ue.updateQueue = t), r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Tp() {
    return Mt().memoizedState;
  }
  function so(e, t, r, l) {
    var c = fn();
    Ue.flags |= e, c.memoizedState = ji(
      1 | t,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function oo(e, t, r, l) {
    var c = Mt();
    l = l === void 0 ? null : l;
    var f = c.memoizedState.inst;
    lt !== null && l !== null && Au(l, lt.memoizedState.deps) ? c.memoizedState = ji(t, f, r, l) : (Ue.flags |= e, c.memoizedState = ji(
      1 | t,
      f,
      r,
      l
    ));
  }
  function Cp(e, t) {
    so(8390656, 8, e, t);
  }
  function Hu(e, t) {
    oo(2048, 8, e, t);
  }
  function xw(e) {
    Ue.flags |= 4;
    var t = Ue.updateQueue;
    if (t === null)
      t = ro(), Ue.updateQueue = t, t.events = [e];
    else {
      var r = t.events;
      r === null ? t.events = [e] : r.push(e);
    }
  }
  function Rp(e) {
    var t = Mt().memoizedState;
    return xw({ ref: t, nextImpl: e }), function() {
      if ((et & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Mp(e, t) {
    return oo(4, 2, e, t);
  }
  function _p(e, t) {
    return oo(4, 4, e, t);
  }
  function Ap(e, t) {
    if (typeof t == "function") {
      e = e();
      var r = t(e);
      return function() {
        typeof r == "function" ? r() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Dp(e, t, r) {
    r = r != null ? r.concat([e]) : null, oo(4, 4, Ap.bind(null, t, e), r);
  }
  function qu() {
  }
  function zp(e, t) {
    var r = Mt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    return t !== null && Au(t, l[1]) ? l[0] : (r.memoizedState = [e, t], e);
  }
  function Op(e, t) {
    var r = Mt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    if (t !== null && Au(t, l[1]))
      return l[0];
    if (l = e(), Vr) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return r.memoizedState = [l, t], l;
  }
  function Iu(e, t, r) {
    return r === void 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = r, e = kv(), Ue.lanes |= e, tr |= e, r);
  }
  function kp(e, t, r, l) {
    return En(r, t) ? r : Si.current !== null ? (e = Iu(e, r, l), En(e, t) || (Ut = !0), e) : (ja & 42) === 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? (Ut = !0, e.memoizedState = r) : (e = kv(), Ue.lanes |= e, tr |= e, t);
  }
  function Lp(e, t, r, l, c) {
    var f = N.p;
    N.p = f !== 0 && 8 > f ? f : 8;
    var x = A.T, j = {};
    A.T = j, Gu(e, !1, t, r);
    try {
      var L = c(), G = A.S;
      if (G !== null && G(j, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ae = pw(
          L,
          l
        );
        Tl(
          e,
          t,
          ae,
          Mn(e)
        );
      } else
        Tl(
          e,
          t,
          l,
          Mn(e)
        );
    } catch (se) {
      Tl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: se },
        Mn()
      );
    } finally {
      N.p = f, x !== null && j.types !== null && (x.types = j.types), A.T = x;
    }
  }
  function Sw() {
  }
  function Fu(e, t, r, l) {
    if (e.tag !== 5) throw Error(s(476));
    var c = Up(e).queue;
    Lp(
      e,
      c,
      t,
      U,
      r === null ? Sw : function() {
        return Bp(e), r(l);
      }
    );
  }
  function Up(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
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
    return t.next = {
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
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Bp(e) {
    var t = Up(e);
    t.next === null && (t = e.alternate.memoizedState), Tl(
      e,
      t.next.queue,
      {},
      Mn()
    );
  }
  function Yu() {
    return nn(Il);
  }
  function Vp() {
    return Mt().memoizedState;
  }
  function $p() {
    return Mt().memoizedState;
  }
  function ww(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var r = Mn();
          e = Ka(r);
          var l = Qa(t, e, r);
          l !== null && (bn(l, t, r), Sl(l, t, r)), t = { cache: xu() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Ew(e, t, r) {
    var l = Mn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e) ? qp(t, r) : (r = cu(e, t, r, l), r !== null && (bn(r, e, l), Ip(r, t, l)));
  }
  function Hp(e, t, r) {
    var l = Mn();
    Tl(e, t, r, l);
  }
  function Tl(e, t, r, l) {
    var c = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (co(e)) qp(t, c);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var x = t.lastRenderedState, j = f(x, r);
          if (c.hasEagerState = !0, c.eagerState = j, En(j, x))
            return Is(e, t, c, 0), dt === null && qs(), !1;
        } catch {
        } finally {
        }
      if (r = cu(e, t, c, l), r !== null)
        return bn(r, e, l), Ip(r, t, l), !0;
    }
    return !1;
  }
  function Gu(e, t, r, l) {
    if (l = {
      lane: 2,
      revertLane: jd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e)) {
      if (t) throw Error(s(479));
    } else
      t = cu(
        e,
        r,
        l,
        2
      ), t !== null && bn(t, e, 2);
  }
  function co(e) {
    var t = e.alternate;
    return e === Ue || t !== null && t === Ue;
  }
  function qp(e, t) {
    wi = no = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Ip(e, t, r) {
    if ((r & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, ln(e, r);
    }
  }
  var Cl = {
    readContext: nn,
    use: io,
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
  Cl.useEffectEvent = jt;
  var Fp = {
    readContext: nn,
    use: io,
    useCallback: function(e, t) {
      return fn().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: nn,
    useEffect: Cp,
    useImperativeHandle: function(e, t, r) {
      r = r != null ? r.concat([e]) : null, so(
        4194308,
        4,
        Ap.bind(null, t, e),
        r
      );
    },
    useLayoutEffect: function(e, t) {
      return so(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      so(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var r = fn();
      t = t === void 0 ? null : t;
      var l = e();
      if (Vr) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return r.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, r) {
      var l = fn();
      if (r !== void 0) {
        var c = r(t);
        if (Vr) {
          Tt(!0);
          try {
            r(t);
          } finally {
            Tt(!1);
          }
        }
      } else c = t;
      return l.memoizedState = l.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, l.queue = e, e = e.dispatch = Ew.bind(
        null,
        Ue,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = fn();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Vu(e);
      var t = e.queue, r = Hp.bind(null, Ue, t);
      return t.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: qu,
    useDeferredValue: function(e, t) {
      var r = fn();
      return Iu(r, e, t);
    },
    useTransition: function() {
      var e = Vu(!1);
      return e = Lp.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), fn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, r) {
      var l = Ue, c = fn();
      if (Pe) {
        if (r === void 0)
          throw Error(s(407));
        r = r();
      } else {
        if (r = t(), dt === null)
          throw Error(s(349));
        (Ge & 127) !== 0 || dp(l, t, r);
      }
      c.memoizedState = r;
      var f = { value: r, getSnapshot: t };
      return c.queue = f, Cp(hp.bind(null, l, f, e), [
        e
      ]), l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        fp.bind(
          null,
          l,
          f,
          r,
          t
        ),
        null
      ), r;
    },
    useId: function() {
      var e = fn(), t = dt.identifierPrefix;
      if (Pe) {
        var r = da, l = ua;
        r = (l & ~(1 << 32 - Yt(l) - 1)).toString(32) + r, t = "_" + t + "R_" + r, r = ao++, 0 < r && (t += "H" + r.toString(32)), t += "_";
      } else
        r = vw++, t = "_" + t + "r_" + r.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Yu,
    useFormState: wp,
    useActionState: wp,
    useOptimistic: function(e) {
      var t = fn();
      t.memoizedState = t.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = r, t = Gu.bind(
        null,
        Ue,
        !0,
        r
      ), r.dispatch = t, [e, t];
    },
    useMemoCache: Lu,
    useCacheRefresh: function() {
      return fn().memoizedState = ww.bind(
        null,
        Ue
      );
    },
    useEffectEvent: function(e) {
      var t = fn(), r = { impl: e };
      return t.memoizedState = r, function() {
        if ((et & 2) !== 0)
          throw Error(s(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Xu = {
    readContext: nn,
    use: io,
    useCallback: zp,
    useContext: nn,
    useEffect: Hu,
    useImperativeHandle: Dp,
    useInsertionEffect: Mp,
    useLayoutEffect: _p,
    useMemo: Op,
    useReducer: lo,
    useRef: Tp,
    useState: function() {
      return lo(Na);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, t) {
      var r = Mt();
      return kp(
        r,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = lo(Na)[0], t = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Nl(e),
        t
      ];
    },
    useSyncExternalStore: up,
    useId: Vp,
    useHostTransitionStatus: Yu,
    useFormState: Ep,
    useActionState: Ep,
    useOptimistic: function(e, t) {
      var r = Mt();
      return vp(r, lt, e, t);
    },
    useMemoCache: Lu,
    useCacheRefresh: $p
  };
  Xu.useEffectEvent = Rp;
  var Yp = {
    readContext: nn,
    use: io,
    useCallback: zp,
    useContext: nn,
    useEffect: Hu,
    useImperativeHandle: Dp,
    useInsertionEffect: Mp,
    useLayoutEffect: _p,
    useMemo: Op,
    useReducer: Bu,
    useRef: Tp,
    useState: function() {
      return Bu(Na);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, t) {
      var r = Mt();
      return lt === null ? Iu(r, e, t) : kp(
        r,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Bu(Na)[0], t = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Nl(e),
        t
      ];
    },
    useSyncExternalStore: up,
    useId: Vp,
    useHostTransitionStatus: Yu,
    useFormState: Np,
    useActionState: Np,
    useOptimistic: function(e, t) {
      var r = Mt();
      return lt !== null ? vp(r, lt, e, t) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Lu,
    useCacheRefresh: $p
  };
  Yp.useEffectEvent = Rp;
  function Pu(e, t, r, l) {
    t = e.memoizedState, r = r(l, t), r = r == null ? t : v({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Ku = {
    enqueueSetState: function(e, t, r) {
      e = e._reactInternals;
      var l = Mn(), c = Ka(l);
      c.payload = t, r != null && (c.callback = r), t = Qa(e, c, l), t !== null && (bn(t, e, l), Sl(t, e, l));
    },
    enqueueReplaceState: function(e, t, r) {
      e = e._reactInternals;
      var l = Mn(), c = Ka(l);
      c.tag = 1, c.payload = t, r != null && (c.callback = r), t = Qa(e, c, l), t !== null && (bn(t, e, l), Sl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var r = Mn(), l = Ka(r);
      l.tag = 2, t != null && (l.callback = t), t = Qa(e, l, r), t !== null && (bn(t, e, r), Sl(t, e, r));
    }
  };
  function Gp(e, t, r, l, c, f, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, f, x) : t.prototype && t.prototype.isPureReactComponent ? !hl(r, l) || !hl(c, f) : !0;
  }
  function Xp(e, t, r, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, l), t.state !== e && Ku.enqueueReplaceState(t, t.state, null);
  }
  function $r(e, t) {
    var r = t;
    if ("ref" in t) {
      r = {};
      for (var l in t)
        l !== "ref" && (r[l] = t[l]);
    }
    if (e = e.defaultProps) {
      r === t && (r = v({}, r));
      for (var c in e)
        r[c] === void 0 && (r[c] = e[c]);
    }
    return r;
  }
  function Pp(e) {
    Hs(e);
  }
  function Kp(e) {
    console.error(e);
  }
  function Qp(e) {
    Hs(e);
  }
  function uo(e, t) {
    try {
      var r = e.onUncaughtError;
      r(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Zp(e, t, r) {
    try {
      var l = e.onCaughtError;
      l(r.value, {
        componentStack: r.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function Qu(e, t, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      uo(e, t);
    }, r;
  }
  function Jp(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function Wp(e, t, r, l) {
    var c = r.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var f = l.value;
      e.payload = function() {
        return c(f);
      }, e.callback = function() {
        Zp(t, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      Zp(t, r, l), typeof c != "function" && (nr === null ? nr = /* @__PURE__ */ new Set([this]) : nr.add(this));
      var j = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: j !== null ? j : ""
      });
    });
  }
  function jw(e, t, r, l, c) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = r.alternate, t !== null && vi(
        t,
        r,
        c,
        !0
      ), r = Nn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return qn === null ? Eo() : r.alternate === null && Nt === 0 && (Nt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = c, l === Zs ? r.flags |= 16384 : (t = r.updateQueue, t === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Sd(e, l, c)), !1;
          case 22:
            return r.flags |= 65536, l === Zs ? r.flags |= 16384 : (t = r.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = t) : (r = t.retryQueue, r === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Sd(e, l, c)), !1;
        }
        throw Error(s(435, r.tag));
      }
      return Sd(e, l, c), Eo(), !1;
    }
    if (Pe)
      return t = Nn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = c, l !== pu && (e = Error(s(422), { cause: l }), vl(Bn(e, r)))) : (l !== pu && (t = Error(s(423), {
        cause: l
      }), vl(
        Bn(t, r)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, l = Bn(l, r), c = Qu(
        e.stateNode,
        l,
        c
      ), Tu(e, c), Nt !== 4 && (Nt = 2)), !1;
    var f = Error(s(520), { cause: l });
    if (f = Bn(f, r), kl === null ? kl = [f] : kl.push(f), Nt !== 4 && (Nt = 2), t === null) return !0;
    l = Bn(l, r), r = t;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = c & -c, r.lanes |= e, e = Qu(r.stateNode, l, e), Tu(r, e), !1;
        case 1:
          if (t = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (nr === null || !nr.has(f))))
            return r.flags |= 65536, c &= -c, r.lanes |= c, c = Jp(c), Wp(
              c,
              e,
              r,
              l
            ), Tu(r, c), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Zu = Error(s(461)), Ut = !1;
  function an(e, t, r, l) {
    t.child = e === null ? ap(t, null, r, l) : Br(
      t,
      e.child,
      r,
      l
    );
  }
  function ev(e, t, r, l, c) {
    r = r.render;
    var f = t.ref;
    if ("ref" in l) {
      var x = {};
      for (var j in l)
        j !== "ref" && (x[j] = l[j]);
    } else x = l;
    return Or(t), l = Du(
      e,
      t,
      r,
      x,
      f,
      c
    ), j = zu(), e !== null && !Ut ? (Ou(e, t, c), Ta(e, t, c)) : (Pe && j && hu(t), t.flags |= 1, an(e, t, l, c), t.child);
  }
  function tv(e, t, r, l, c) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !uu(f) && f.defaultProps === void 0 && r.compare === null ? (t.tag = 15, t.type = f, nv(
        e,
        t,
        f,
        l,
        c
      )) : (e = Ys(
        r.type,
        null,
        l,
        t,
        t.mode,
        c
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (f = e.child, !id(e, c)) {
      var x = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : hl, r(x, l) && e.ref === t.ref)
        return Ta(e, t, c);
    }
    return t.flags |= 1, e = xa(f, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function nv(e, t, r, l, c) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (hl(f, l) && e.ref === t.ref)
        if (Ut = !1, t.pendingProps = l = f, id(e, c))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return t.lanes = e.lanes, Ta(e, t, c);
    }
    return Ju(
      e,
      t,
      r,
      l,
      c
    );
  }
  function av(e, t, r, l) {
    var c = l.children, f = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | r : r, e !== null) {
          for (l = t.child = e.child, c = 0; l !== null; )
            c = c | l.lanes | l.childLanes, l = l.sibling;
          l = c & ~f;
        } else l = 0, t.child = null;
        return rv(
          e,
          t,
          f,
          r,
          l
        );
      }
      if ((r & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ks(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? lp(t, f) : Ru(), sp(t);
      else
        return l = t.lanes = 536870912, rv(
          e,
          t,
          f !== null ? f.baseLanes | r : r,
          r,
          l
        );
    } else
      f !== null ? (Ks(t, f.cachePool), lp(t, f), Ja(), t.memoizedState = null) : (e !== null && Ks(t, null), Ru(), Ja());
    return an(e, t, c, r), t.child;
  }
  function Rl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function rv(e, t, r, l, c) {
    var f = wu();
    return f = f === null ? null : { parent: kt._currentValue, pool: f }, t.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Ks(t, null), Ru(), sp(t), e !== null && vi(e, t, l, !0), t.childLanes = c, null;
  }
  function fo(e, t) {
    return t = mo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function iv(e, t, r) {
    return Br(t, e.child, null, r), e = fo(t, t.pendingProps), e.flags |= 2, Tn(t), t.memoizedState = null, e;
  }
  function Nw(e, t, r) {
    var l = t.pendingProps, c = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Pe) {
        if (l.mode === "hidden")
          return e = fo(t, l), t.lanes = 536870912, Rl(null, e);
        if (_u(t), (e = gt) ? (e = gg(
          e,
          Hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = qm(e), r.return = t, t.child = r, tn = t, gt = null)) : e = null, e === null) throw Ga(t);
        return t.lanes = 536870912, null;
      }
      return fo(t, l);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var x = f.dehydrated;
      if (_u(t), c)
        if (t.flags & 256)
          t.flags &= -257, t = iv(
            e,
            t,
            r
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Ut || vi(e, t, r, !1), c = (r & e.childLanes) !== 0, Ut || c) {
        if (l = dt, l !== null && (x = O(l, r), x !== 0 && x !== f.retryLane))
          throw f.retryLane = x, _r(e, x), bn(l, e, x), Zu;
        Eo(), t = iv(
          e,
          t,
          r
        );
      } else
        e = f.treeContext, gt = In(x.nextSibling), tn = t, Pe = !0, Ya = null, Hn = !1, e !== null && Ym(t, e), t = fo(t, l), t.flags |= 4096;
      return t;
    }
    return e = xa(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ho(e, t) {
    var r = t.ref;
    if (r === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(s(284));
      (e === null || e.ref !== r) && (t.flags |= 4194816);
    }
  }
  function Ju(e, t, r, l, c) {
    return Or(t), r = Du(
      e,
      t,
      r,
      l,
      void 0,
      c
    ), l = zu(), e !== null && !Ut ? (Ou(e, t, c), Ta(e, t, c)) : (Pe && l && hu(t), t.flags |= 1, an(e, t, r, c), t.child);
  }
  function lv(e, t, r, l, c, f) {
    return Or(t), t.updateQueue = null, r = cp(
      t,
      l,
      r,
      c
    ), op(e), l = zu(), e !== null && !Ut ? (Ou(e, t, f), Ta(e, t, f)) : (Pe && l && hu(t), t.flags |= 1, an(e, t, r, f), t.child);
  }
  function sv(e, t, r, l, c) {
    if (Or(t), t.stateNode === null) {
      var f = fi, x = r.contextType;
      typeof x == "object" && x !== null && (f = nn(x)), f = new r(l, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Ku, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = l, f.state = t.memoizedState, f.refs = {}, ju(t), x = r.contextType, f.context = typeof x == "object" && x !== null ? nn(x) : fi, f.state = t.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (Pu(
        t,
        r,
        x,
        l
      ), f.state = t.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (x = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), x !== f.state && Ku.enqueueReplaceState(f, f.state, null), El(t, l, f, c), wl(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      f = t.stateNode;
      var j = t.memoizedProps, L = $r(r, j);
      f.props = L;
      var G = f.context, ae = r.contextType;
      x = fi, typeof ae == "object" && ae !== null && (x = nn(ae));
      var se = r.getDerivedStateFromProps;
      ae = typeof se == "function" || typeof f.getSnapshotBeforeUpdate == "function", j = t.pendingProps !== j, ae || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (j || G !== x) && Xp(
        t,
        f,
        l,
        x
      ), Pa = !1;
      var X = t.memoizedState;
      f.state = X, El(t, l, f, c), wl(), G = t.memoizedState, j || X !== G || Pa ? (typeof se == "function" && (Pu(
        t,
        r,
        se,
        l
      ), G = t.memoizedState), (L = Pa || Gp(
        t,
        r,
        L,
        l,
        X,
        G,
        x
      )) ? (ae || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = G), f.props = l, f.state = G, f.context = x, l = L) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      f = t.stateNode, Nu(e, t), x = t.memoizedProps, ae = $r(r, x), f.props = ae, se = t.pendingProps, X = f.context, G = r.contextType, L = fi, typeof G == "object" && G !== null && (L = nn(G)), j = r.getDerivedStateFromProps, (G = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x !== se || X !== L) && Xp(
        t,
        f,
        l,
        L
      ), Pa = !1, X = t.memoizedState, f.state = X, El(t, l, f, c), wl();
      var Z = t.memoizedState;
      x !== se || X !== Z || Pa || e !== null && e.dependencies !== null && Xs(e.dependencies) ? (typeof j == "function" && (Pu(
        t,
        r,
        j,
        l
      ), Z = t.memoizedState), (ae = Pa || Gp(
        t,
        r,
        ae,
        l,
        X,
        Z,
        L
      ) || e !== null && e.dependencies !== null && Xs(e.dependencies)) ? (G || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(l, Z, L), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        l,
        Z,
        L
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = Z), f.props = l, f.state = Z, f.context = L, l = ae) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return f = l, ho(e, t), l = (t.flags & 128) !== 0, f || l ? (f = t.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && l ? (t.child = Br(
      t,
      e.child,
      null,
      c
    ), t.child = Br(
      t,
      null,
      r,
      c
    )) : an(e, t, r, c), t.memoizedState = f.state, e = t.child) : e = Ta(
      e,
      t,
      c
    ), e;
  }
  function ov(e, t, r, l) {
    return Dr(), t.flags |= 256, an(e, t, r, l), t.child;
  }
  var Wu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ed(e) {
    return { baseLanes: e, cachePool: Zm() };
  }
  function td(e, t, r) {
    return e = e !== null ? e.childLanes & ~r : 0, t && (e |= Rn), e;
  }
  function cv(e, t, r) {
    var l = t.pendingProps, c = !1, f = (t.flags & 128) !== 0, x;
    if ((x = f) || (x = e !== null && e.memoizedState === null ? !1 : (Rt.current & 2) !== 0), x && (c = !0, t.flags &= -129), x = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Pe) {
        if (c ? Za(t) : Ja(), (e = gt) ? (e = gg(
          e,
          Hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = qm(e), r.return = t, t.child = r, tn = t, gt = null)) : e = null, e === null) throw Ga(t);
        return Ud(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var j = l.children;
      return l = l.fallback, c ? (Ja(), c = t.mode, j = mo(
        { mode: "hidden", children: j },
        c
      ), l = Ar(
        l,
        c,
        r,
        null
      ), j.return = t, l.return = t, j.sibling = l, t.child = j, l = t.child, l.memoizedState = ed(r), l.childLanes = td(
        e,
        x,
        r
      ), t.memoizedState = Wu, Rl(null, l)) : (Za(t), nd(t, j));
    }
    var L = e.memoizedState;
    if (L !== null && (j = L.dehydrated, j !== null)) {
      if (f)
        t.flags & 256 ? (Za(t), t.flags &= -257, t = ad(
          e,
          t,
          r
        )) : t.memoizedState !== null ? (Ja(), t.child = e.child, t.flags |= 128, t = null) : (Ja(), j = l.fallback, c = t.mode, l = mo(
          { mode: "visible", children: l.children },
          c
        ), j = Ar(
          j,
          c,
          r,
          null
        ), j.flags |= 2, l.return = t, j.return = t, l.sibling = j, t.child = l, Br(
          t,
          e.child,
          null,
          r
        ), l = t.child, l.memoizedState = ed(r), l.childLanes = td(
          e,
          x,
          r
        ), t.memoizedState = Wu, t = Rl(null, l));
      else if (Za(t), Ud(j)) {
        if (x = j.nextSibling && j.nextSibling.dataset, x) var G = x.dgst;
        x = G, l = Error(s(419)), l.stack = "", l.digest = x, vl({ value: l, source: null, stack: null }), t = ad(
          e,
          t,
          r
        );
      } else if (Ut || vi(e, t, r, !1), x = (r & e.childLanes) !== 0, Ut || x) {
        if (x = dt, x !== null && (l = O(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, _r(e, l), bn(x, e, l), Zu;
        Ld(j) || Eo(), t = ad(
          e,
          t,
          r
        );
      } else
        Ld(j) ? (t.flags |= 192, t.child = e.child, t = null) : (e = L.treeContext, gt = In(
          j.nextSibling
        ), tn = t, Pe = !0, Ya = null, Hn = !1, e !== null && Ym(t, e), t = nd(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return c ? (Ja(), j = l.fallback, c = t.mode, L = e.child, G = L.sibling, l = xa(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, G !== null ? j = xa(
      G,
      j
    ) : (j = Ar(
      j,
      c,
      r,
      null
    ), j.flags |= 2), j.return = t, l.return = t, l.sibling = j, t.child = l, Rl(null, l), l = t.child, j = e.child.memoizedState, j === null ? j = ed(r) : (c = j.cachePool, c !== null ? (L = kt._currentValue, c = c.parent !== L ? { parent: L, pool: L } : c) : c = Zm(), j = {
      baseLanes: j.baseLanes | r,
      cachePool: c
    }), l.memoizedState = j, l.childLanes = td(
      e,
      x,
      r
    ), t.memoizedState = Wu, Rl(e.child, l)) : (Za(t), r = e.child, e = r.sibling, r = xa(r, {
      mode: "visible",
      children: l.children
    }), r.return = t, r.sibling = null, e !== null && (x = t.deletions, x === null ? (t.deletions = [e], t.flags |= 16) : x.push(e)), t.child = r, t.memoizedState = null, r);
  }
  function nd(e, t) {
    return t = mo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function mo(e, t) {
    return e = jn(22, e, null, t), e.lanes = 0, e;
  }
  function ad(e, t, r) {
    return Br(t, e.child, null, r), e = nd(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function uv(e, t, r) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), yu(e.return, t, r);
  }
  function rd(e, t, r, l, c, f) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: r,
      tailMode: c,
      treeForkCount: f
    } : (x.isBackwards = t, x.rendering = null, x.renderingStartTime = 0, x.last = l, x.tail = r, x.tailMode = c, x.treeForkCount = f);
  }
  function dv(e, t, r) {
    var l = t.pendingProps, c = l.revealOrder, f = l.tail;
    l = l.children;
    var x = Rt.current, j = (x & 2) !== 0;
    if (j ? (x = x & 1 | 2, t.flags |= 128) : x &= 1, Q(Rt, x), an(e, t, l, r), l = Pe ? pl : 0, !j && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && uv(e, r, t);
        else if (e.tag === 19)
          uv(e, r, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (c) {
      case "forwards":
        for (r = t.child, c = null; r !== null; )
          e = r.alternate, e !== null && to(e) === null && (c = r), r = r.sibling;
        r = c, r === null ? (c = t.child, t.child = null) : (c = r.sibling, r.sibling = null), rd(
          t,
          !1,
          c,
          r,
          f,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, c = t.child, t.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && to(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = r, r = c, c = e;
        }
        rd(
          t,
          !0,
          r,
          null,
          f,
          l
        );
        break;
      case "together":
        rd(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Ta(e, t, r) {
    if (e !== null && (t.dependencies = e.dependencies), tr |= t.lanes, (r & t.childLanes) === 0)
      if (e !== null) {
        if (vi(
          e,
          t,
          r,
          !1
        ), (r & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, r = xa(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; )
        e = e.sibling, r = r.sibling = xa(e, e.pendingProps), r.return = t;
      r.sibling = null;
    }
    return t.child;
  }
  function id(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Xs(e)));
  }
  function Tw(e, t, r) {
    switch (t.tag) {
      case 3:
        Me(t, t.stateNode.containerInfo), Xa(t, kt, e.memoizedState.cache), Dr();
        break;
      case 27:
      case 5:
        Jt(t);
        break;
      case 4:
        Me(t, t.stateNode.containerInfo);
        break;
      case 10:
        Xa(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, _u(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Za(t), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? cv(e, t, r) : (Za(t), e = Ta(
            e,
            t,
            r
          ), e !== null ? e.sibling : null);
        Za(t);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (l = (r & t.childLanes) !== 0, l || (vi(
          e,
          t,
          r,
          !1
        ), l = (r & t.childLanes) !== 0), c) {
          if (l)
            return dv(
              e,
              t,
              r
            );
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Q(Rt, Rt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, av(
          e,
          t,
          r,
          t.pendingProps
        );
      case 24:
        Xa(t, kt, e.memoizedState.cache);
    }
    return Ta(e, t, r);
  }
  function fv(e, t, r) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ut = !0;
      else {
        if (!id(e, r) && (t.flags & 128) === 0)
          return Ut = !1, Tw(
            e,
            t,
            r
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Pe && (t.flags & 1048576) !== 0 && Fm(t, pl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Lr(t.elementType), t.type = e, typeof e == "function")
            uu(e) ? (l = $r(e, l), t.tag = 1, t = sv(
              null,
              t,
              e,
              l,
              r
            )) : (t.tag = 0, t = Ju(
              null,
              t,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === z) {
                t.tag = 11, t = ev(
                  null,
                  t,
                  e,
                  l,
                  r
                );
                break e;
              } else if (c === te) {
                t.tag = 14, t = tv(
                  null,
                  t,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw t = ce(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ju(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 1:
        return l = t.type, c = $r(
          l,
          t.pendingProps
        ), sv(
          e,
          t,
          l,
          c,
          r
        );
      case 3:
        e: {
          if (Me(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var f = t.memoizedState;
          c = f.element, Nu(e, t), El(t, l, null, r);
          var x = t.memoizedState;
          if (l = x.cache, Xa(t, kt, l), l !== f.cache && bu(
            t,
            [kt],
            r,
            !0
          ), wl(), l = x.element, f.isDehydrated)
            if (f = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = ov(
                e,
                t,
                l,
                r
              );
              break e;
            } else if (l !== c) {
              c = Bn(
                Error(s(424)),
                t
              ), vl(c), t = ov(
                e,
                t,
                l,
                r
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (gt = In(e.firstChild), tn = t, Pe = !0, Ya = null, Hn = !0, r = ap(
                t,
                null,
                l,
                r
              ), t.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Dr(), l === c) {
              t = Ta(
                e,
                t,
                r
              );
              break e;
            }
            an(e, t, l, r);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ho(e, t), e === null ? (r = Eg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = r : Pe || (r = t.type, e = t.pendingProps, l = _o(
          ge.current
        ).createElement(r), l[pe] = t, l[ve] = e, rn(l, r, e), mt(l), t.stateNode = l) : t.memoizedState = Eg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Jt(t), e === null && Pe && (l = t.stateNode = xg(
          t.type,
          t.pendingProps,
          ge.current
        ), tn = t, Hn = !0, c = gt, lr(t.type) ? (Bd = c, gt = In(l.firstChild)) : gt = c), an(
          e,
          t,
          t.pendingProps.children,
          r
        ), ho(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Pe && ((c = l = gt) && (l = nE(
          l,
          t.type,
          t.pendingProps,
          Hn
        ), l !== null ? (t.stateNode = l, tn = t, gt = In(l.firstChild), Hn = !1, c = !0) : c = !1), c || Ga(t)), Jt(t), c = t.type, f = t.pendingProps, x = e !== null ? e.memoizedProps : null, l = f.children, zd(c, f) ? l = null : x !== null && zd(c, x) && (t.flags |= 32), t.memoizedState !== null && (c = Du(
          e,
          t,
          gw,
          null,
          null,
          r
        ), Il._currentValue = c), ho(e, t), an(e, t, l, r), t.child;
      case 6:
        return e === null && Pe && ((e = r = gt) && (r = aE(
          r,
          t.pendingProps,
          Hn
        ), r !== null ? (t.stateNode = r, tn = t, gt = null, e = !0) : e = !1), e || Ga(t)), null;
      case 13:
        return cv(e, t, r);
      case 4:
        return Me(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Br(
          t,
          null,
          l,
          r
        ) : an(e, t, l, r), t.child;
      case 11:
        return ev(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 7:
        return an(
          e,
          t,
          t.pendingProps,
          r
        ), t.child;
      case 8:
        return an(
          e,
          t,
          t.pendingProps.children,
          r
        ), t.child;
      case 12:
        return an(
          e,
          t,
          t.pendingProps.children,
          r
        ), t.child;
      case 10:
        return l = t.pendingProps, Xa(t, t.type, l.value), an(e, t, l.children, r), t.child;
      case 9:
        return c = t.type._context, l = t.pendingProps.children, Or(t), c = nn(c), l = l(c), t.flags |= 1, an(e, t, l, r), t.child;
      case 14:
        return tv(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 15:
        return nv(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 19:
        return dv(e, t, r);
      case 31:
        return Nw(e, t, r);
      case 22:
        return av(
          e,
          t,
          r,
          t.pendingProps
        );
      case 24:
        return Or(t), l = nn(kt), e === null ? (c = wu(), c === null && (c = dt, f = xu(), c.pooledCache = f, f.refCount++, f !== null && (c.pooledCacheLanes |= r), c = f), t.memoizedState = { parent: l, cache: c }, ju(t), Xa(t, kt, c)) : ((e.lanes & r) !== 0 && (Nu(e, t), El(t, null, null, r), wl()), c = e.memoizedState, f = t.memoizedState, c.parent !== l ? (c = { parent: l, cache: l }, t.memoizedState = c, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = c), Xa(t, kt, l)) : (l = f.cache, Xa(t, kt, l), l !== c.cache && bu(
          t,
          [kt],
          r,
          !0
        ))), an(
          e,
          t,
          t.pendingProps.children,
          r
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Ca(e) {
    e.flags |= 4;
  }
  function ld(e, t, r, l, c) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Vv()) e.flags |= 8192;
        else
          throw Ur = Zs, Eu;
    } else e.flags &= -16777217;
  }
  function hv(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Rg(t))
      if (Vv()) e.flags |= 8192;
      else
        throw Ur = Zs, Eu;
  }
  function po(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Gt() : 536870912, e.lanes |= t, Ri |= t);
  }
  function Ml(e, t) {
    if (!Pe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var r = null; t !== null; )
            t.alternate !== null && (r = t), t = t.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var l = null; r !== null; )
            r.alternate !== null && (l = r), r = r.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function yt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (t)
      for (var c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, l |= c.subtreeFlags & 65011712, l |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, l |= c.subtreeFlags, l |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, t;
  }
  function Cw(e, t, r) {
    var l = t.pendingProps;
    switch (mu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return yt(t), null;
      case 1:
        return yt(t), null;
      case 3:
        return r = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Ea(kt), Ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(t) ? Ca(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, vu())), yt(t), null;
      case 26:
        var c = t.type, f = t.memoizedState;
        return e === null ? (Ca(t), f !== null ? (yt(t), hv(t, f)) : (yt(t), ld(
          t,
          c,
          null,
          l,
          r
        ))) : f ? f !== e.memoizedState ? (Ca(t), yt(t), hv(t, f)) : (yt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ca(t), yt(t), ld(
          t,
          c,
          e,
          l,
          r
        )), null;
      case 27:
        if (Pt(t), r = ge.current, c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return yt(t), null;
          }
          e = oe.current, pi(t) ? Gm(t) : (e = xg(c, l, r), t.stateNode = e, Ca(t));
        }
        return yt(t), null;
      case 5:
        if (Pt(t), c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return yt(t), null;
          }
          if (f = oe.current, pi(t))
            Gm(t);
          else {
            var x = _o(
              ge.current
            );
            switch (f) {
              case 1:
                f = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                f = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    f = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    f = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    f = x.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof l.is == "string" ? x.createElement("select", {
                      is: l.is
                    }) : x.createElement("select"), l.multiple ? f.multiple = !0 : l.size && (f.size = l.size);
                    break;
                  default:
                    f = typeof l.is == "string" ? x.createElement(c, { is: l.is }) : x.createElement(c);
                }
            }
            f[pe] = t, f[ve] = l;
            e: for (x = t.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                f.appendChild(x.stateNode);
              else if (x.tag !== 4 && x.tag !== 27 && x.child !== null) {
                x.child.return = x, x = x.child;
                continue;
              }
              if (x === t) break e;
              for (; x.sibling === null; ) {
                if (x.return === null || x.return === t)
                  break e;
                x = x.return;
              }
              x.sibling.return = x.return, x = x.sibling;
            }
            t.stateNode = f;
            e: switch (rn(f, c, l), c) {
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
            l && Ca(t);
          }
        }
        return yt(t), ld(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          r
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = ge.current, pi(t)) {
            if (e = t.stateNode, r = t.memoizedProps, l = null, c = tn, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  l = c.memoizedProps;
              }
            e[pe] = t, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || cg(e.nodeValue, r)), e || Ga(t, !0);
          } else
            e = _o(e).createTextNode(
              l
            ), e[pe] = t, t.stateNode = e;
        }
        return yt(t), null;
      case 31:
        if (r = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = pi(t), r !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[pe] = t;
            } else
              Dr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yt(t), e = !1;
          } else
            r = vu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return t.flags & 256 ? (Tn(t), t) : (Tn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return yt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = pi(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(s(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(s(317));
              c[pe] = t;
            } else
              Dr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yt(t), c = !1;
          } else
            c = vu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return t.flags & 256 ? (Tn(t), t) : (Tn(t), null);
        }
        return Tn(t), (t.flags & 128) !== 0 ? (t.lanes = r, t) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = t.child, c = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (c = l.alternate.memoizedState.cachePool.pool), f = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (f = l.memoizedState.cachePool.pool), f !== c && (l.flags |= 2048)), r !== e && r && (t.child.flags |= 8192), po(t, t.updateQueue), yt(t), null);
      case 4:
        return Ve(), e === null && Rd(t.stateNode.containerInfo), yt(t), null;
      case 10:
        return Ea(t.type), yt(t), null;
      case 19:
        if (P(Rt), l = t.memoizedState, l === null) return yt(t), null;
        if (c = (t.flags & 128) !== 0, f = l.rendering, f === null)
          if (c) Ml(l, !1);
          else {
            if (Nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = to(e), f !== null) {
                  for (t.flags |= 128, Ml(l, !1), e = f.updateQueue, t.updateQueue = e, po(t, e), t.subtreeFlags = 0, e = r, r = t.child; r !== null; )
                    Hm(r, e), r = r.sibling;
                  return Q(
                    Rt,
                    Rt.current & 1 | 2
                  ), Pe && Sa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && qt() > xo && (t.flags |= 128, c = !0, Ml(l, !1), t.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = to(f), e !== null) {
              if (t.flags |= 128, c = !0, e = e.updateQueue, t.updateQueue = e, po(t, e), Ml(l, !0), l.tail === null && l.tailMode === "hidden" && !f.alternate && !Pe)
                return yt(t), null;
            } else
              2 * qt() - l.renderingStartTime > xo && r !== 536870912 && (t.flags |= 128, c = !0, Ml(l, !1), t.lanes = 4194304);
          l.isBackwards ? (f.sibling = t.child, t.child = f) : (e = l.last, e !== null ? e.sibling = f : t.child = f, l.last = f);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = qt(), e.sibling = null, r = Rt.current, Q(
          Rt,
          c ? r & 1 | 2 : r & 1
        ), Pe && Sa(t, l.treeForkCount), e) : (yt(t), null);
      case 22:
      case 23:
        return Tn(t), Mu(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (r & 536870912) !== 0 && (t.flags & 128) === 0 && (yt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : yt(t), r = t.updateQueue, r !== null && po(t, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== r && (t.flags |= 2048), e !== null && P(kr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ea(kt), yt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Rw(e, t) {
    switch (mu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ea(kt), Ve(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Pt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Tn(t), t.alternate === null)
            throw Error(s(340));
          Dr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Tn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          Dr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return P(Rt), null;
      case 4:
        return Ve(), null;
      case 10:
        return Ea(t.type), null;
      case 22:
      case 23:
        return Tn(t), Mu(), e !== null && P(kr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Ea(kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function mv(e, t) {
    switch (mu(t), t.tag) {
      case 3:
        Ea(kt), Ve();
        break;
      case 26:
      case 27:
      case 5:
        Pt(t);
        break;
      case 4:
        Ve();
        break;
      case 31:
        t.memoizedState !== null && Tn(t);
        break;
      case 13:
        Tn(t);
        break;
      case 19:
        P(Rt);
        break;
      case 10:
        Ea(t.type);
        break;
      case 22:
      case 23:
        Tn(t), Mu(), e !== null && P(kr);
        break;
      case 24:
        Ea(kt);
    }
  }
  function _l(e, t) {
    try {
      var r = t.updateQueue, l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var c = l.next;
        r = c;
        do {
          if ((r.tag & e) === e) {
            l = void 0;
            var f = r.create, x = r.inst;
            l = f(), x.destroy = l;
          }
          r = r.next;
        } while (r !== c);
      }
    } catch (j) {
      at(t, t.return, j);
    }
  }
  function Wa(e, t, r) {
    try {
      var l = t.updateQueue, c = l !== null ? l.lastEffect : null;
      if (c !== null) {
        var f = c.next;
        l = f;
        do {
          if ((l.tag & e) === e) {
            var x = l.inst, j = x.destroy;
            if (j !== void 0) {
              x.destroy = void 0, c = t;
              var L = r, G = j;
              try {
                G();
              } catch (ae) {
                at(
                  c,
                  L,
                  ae
                );
              }
            }
          }
          l = l.next;
        } while (l !== f);
      }
    } catch (ae) {
      at(t, t.return, ae);
    }
  }
  function pv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var r = e.stateNode;
      try {
        ip(t, r);
      } catch (l) {
        at(e, e.return, l);
      }
    }
  }
  function vv(e, t, r) {
    r.props = $r(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      at(e, t, l);
    }
  }
  function Al(e, t) {
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
    } catch (c) {
      at(e, t, c);
    }
  }
  function fa(e, t) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (c) {
          at(e, t, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (c) {
          at(e, t, c);
        }
      else r.current = null;
  }
  function gv(e) {
    var t = e.type, r = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && l.focus();
          break e;
        case "img":
          r.src ? l.src = r.src : r.srcSet && (l.srcset = r.srcSet);
      }
    } catch (c) {
      at(e, e.return, c);
    }
  }
  function sd(e, t, r) {
    try {
      var l = e.stateNode;
      Qw(l, e.type, r, t), l[ve] = t;
    } catch (c) {
      at(e, e.return, c);
    }
  }
  function yv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && lr(e.type) || e.tag === 4;
  }
  function od(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || yv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && lr(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function cd(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, t) : (t = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, t.appendChild(e), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = ya));
    else if (l !== 4 && (l === 27 && lr(e.type) && (r = e.stateNode, t = null), e = e.child, e !== null))
      for (cd(e, t, r), e = e.sibling; e !== null; )
        cd(e, t, r), e = e.sibling;
  }
  function vo(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && lr(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (vo(e, t, r), e = e.sibling; e !== null; )
        vo(e, t, r), e = e.sibling;
  }
  function bv(e) {
    var t = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, c = t.attributes; c.length; )
        t.removeAttributeNode(c[0]);
      rn(t, l, r), t[pe] = e, t[ve] = r;
    } catch (f) {
      at(e, e.return, f);
    }
  }
  var Ra = !1, Bt = !1, ud = !1, xv = typeof WeakSet == "function" ? WeakSet : Set, Qt = null;
  function Mw(e, t) {
    if (e = e.containerInfo, Ad = Uo, e = Dm(e), au(e)) {
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
            var c = l.anchorOffset, f = l.focusNode;
            l = l.focusOffset;
            try {
              r.nodeType, f.nodeType;
            } catch {
              r = null;
              break e;
            }
            var x = 0, j = -1, L = -1, G = 0, ae = 0, se = e, X = null;
            t: for (; ; ) {
              for (var Z; se !== r || c !== 0 && se.nodeType !== 3 || (j = x + c), se !== f || l !== 0 && se.nodeType !== 3 || (L = x + l), se.nodeType === 3 && (x += se.nodeValue.length), (Z = se.firstChild) !== null; )
                X = se, se = Z;
              for (; ; ) {
                if (se === e) break t;
                if (X === r && ++G === c && (j = x), X === f && ++ae === l && (L = x), (Z = se.nextSibling) !== null) break;
                se = X, X = se.parentNode;
              }
              se = Z;
            }
            r = j === -1 || L === -1 ? null : { start: j, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Dd = { focusedElem: e, selectionRange: r }, Uo = !1, Qt = t; Qt !== null; )
      if (t = Qt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Qt = e;
      else
        for (; Qt !== null; ) {
          switch (t = Qt, f = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  c = e[r], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, r = t, c = f.memoizedProps, f = f.memoizedState, l = r.stateNode;
                try {
                  var xe = $r(
                    r.type,
                    c
                  );
                  e = l.getSnapshotBeforeUpdate(
                    xe,
                    f
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (_e) {
                  at(
                    r,
                    r.return,
                    _e
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, r = e.nodeType, r === 9)
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Qt = e;
            break;
          }
          Qt = t.return;
        }
  }
  function Sv(e, t, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        _a(e, r), l & 4 && _l(5, r);
        break;
      case 1:
        if (_a(e, r), l & 4)
          if (e = r.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (x) {
              at(r, r.return, x);
            }
          else {
            var c = $r(
              r.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                c,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              at(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && pv(r), l & 512 && Al(r, r.return);
        break;
      case 3:
        if (_a(e, r), l & 64 && (e = r.updateQueue, e !== null)) {
          if (t = null, r.child !== null)
            switch (r.child.tag) {
              case 27:
              case 5:
                t = r.child.stateNode;
                break;
              case 1:
                t = r.child.stateNode;
            }
          try {
            ip(e, t);
          } catch (x) {
            at(r, r.return, x);
          }
        }
        break;
      case 27:
        t === null && l & 4 && bv(r);
      case 26:
      case 5:
        _a(e, r), t === null && l & 4 && gv(r), l & 512 && Al(r, r.return);
        break;
      case 12:
        _a(e, r);
        break;
      case 31:
        _a(e, r), l & 4 && jv(e, r);
        break;
      case 13:
        _a(e, r), l & 4 && Nv(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = Bw.bind(
          null,
          r
        ), rE(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Ra, !l) {
          t = t !== null && t.memoizedState !== null || Bt, c = Ra;
          var f = Bt;
          Ra = l, (Bt = t) && !f ? Aa(
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
  function wv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, wv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ut(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var wt = null, pn = !1;
  function Ma(e, t, r) {
    for (r = r.child; r !== null; )
      Ev(e, t, r), r = r.sibling;
  }
  function Ev(e, t, r) {
    if (Wt && typeof Wt.onCommitFiberUnmount == "function")
      try {
        Wt.onCommitFiberUnmount(Zn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Bt || fa(r, t), Ma(
          e,
          t,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Bt || fa(r, t);
        var l = wt, c = pn;
        lr(r.type) && (wt = r.stateNode, pn = !1), Ma(
          e,
          t,
          r
        ), $l(r.stateNode), wt = l, pn = c;
        break;
      case 5:
        Bt || fa(r, t);
      case 6:
        if (l = wt, c = pn, wt = null, Ma(
          e,
          t,
          r
        ), wt = l, pn = c, wt !== null)
          if (pn)
            try {
              (wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(r.stateNode);
            } catch (f) {
              at(
                r,
                t,
                f
              );
            }
          else
            try {
              wt.removeChild(r.stateNode);
            } catch (f) {
              at(
                r,
                t,
                f
              );
            }
        break;
      case 18:
        wt !== null && (pn ? (e = wt, pg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : pg(wt, r.stateNode));
        break;
      case 4:
        l = wt, c = pn, wt = r.stateNode.containerInfo, pn = !0, Ma(
          e,
          t,
          r
        ), wt = l, pn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wa(2, r, t), Bt || Wa(4, r, t), Ma(
          e,
          t,
          r
        );
        break;
      case 1:
        Bt || (fa(r, t), l = r.stateNode, typeof l.componentWillUnmount == "function" && vv(
          r,
          t,
          l
        )), Ma(
          e,
          t,
          r
        );
        break;
      case 21:
        Ma(
          e,
          t,
          r
        );
        break;
      case 22:
        Bt = (l = Bt) || r.memoizedState !== null, Ma(
          e,
          t,
          r
        ), Bt = l;
        break;
      default:
        Ma(
          e,
          t,
          r
        );
    }
  }
  function jv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Li(e);
      } catch (r) {
        at(t, t.return, r);
      }
    }
  }
  function Nv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Li(e);
      } catch (r) {
        at(t, t.return, r);
      }
  }
  function _w(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new xv()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new xv()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function go(e, t) {
    var r = _w(e);
    t.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var c = Vw.bind(null, e, l);
        l.then(c, c);
      }
    });
  }
  function vn(e, t) {
    var r = t.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var c = r[l], f = e, x = t, j = x;
        e: for (; j !== null; ) {
          switch (j.tag) {
            case 27:
              if (lr(j.type)) {
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
        if (wt === null) throw Error(s(160));
        Ev(f, x, c), wt = null, pn = !1, f = c.alternate, f !== null && (f.return = null), c.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Tv(t, e), t = t.sibling;
  }
  var ta = null;
  function Tv(e, t) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vn(t, e), gn(e), l & 4 && (Wa(3, e, e.return), _l(3, e), Wa(5, e, e.return));
        break;
      case 1:
        vn(t, e), gn(e), l & 512 && (Bt || r === null || fa(r, r.return)), l & 64 && Ra && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var c = ta;
        if (vn(t, e), gn(e), l & 512 && (Bt || r === null || fa(r, r.return)), l & 4) {
          var f = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (l) {
                    case "title":
                      f = c.getElementsByTagName("title")[0], (!f || f[$e] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = c.createElement(l), c.head.insertBefore(
                        f,
                        c.querySelector("head > title")
                      )), rn(f, l, r), f[pe] = e, mt(f), l = f;
                      break e;
                    case "link":
                      var x = Tg(
                        "link",
                        "href",
                        c
                      ).get(l + (r.href || ""));
                      if (x) {
                        for (var j = 0; j < x.length; j++)
                          if (f = x[j], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            x.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(l), rn(f, l, r), c.head.appendChild(f);
                      break;
                    case "meta":
                      if (x = Tg(
                        "meta",
                        "content",
                        c
                      ).get(l + (r.content || ""))) {
                        for (j = 0; j < x.length; j++)
                          if (f = x[j], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            x.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(l), rn(f, l, r), c.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  f[pe] = e, mt(f), l = f;
                }
                e.stateNode = l;
              } else
                Cg(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Ng(
                c,
                l,
                e.memoizedProps
              );
          else
            f !== l ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, l === null ? Cg(
              c,
              e.type,
              e.stateNode
            ) : Ng(
              c,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && sd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        vn(t, e), gn(e), l & 512 && (Bt || r === null || fa(r, r.return)), r !== null && l & 4 && sd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (vn(t, e), gn(e), l & 512 && (Bt || r === null || fa(r, r.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            ii(c, "");
          } catch (xe) {
            at(e, e.return, xe);
          }
        }
        l & 4 && e.stateNode != null && (c = e.memoizedProps, sd(
          e,
          c,
          r !== null ? r.memoizedProps : c
        )), l & 1024 && (ud = !0);
        break;
      case 6:
        if (vn(t, e), gn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (xe) {
            at(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (zo = null, c = ta, ta = Ao(t.containerInfo), vn(t, e), ta = c, gn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(t.containerInfo);
          } catch (xe) {
            at(e, e.return, xe);
          }
        ud && (ud = !1, Cv(e));
        break;
      case 4:
        l = ta, ta = Ao(
          e.stateNode.containerInfo
        ), vn(t, e), gn(e), ta = l;
        break;
      case 12:
        vn(t, e), gn(e);
        break;
      case 31:
        vn(t, e), gn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, go(e, l)));
        break;
      case 13:
        vn(t, e), gn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (bo = qt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, go(e, l)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, G = Ra, ae = Bt;
        if (Ra = G || c, Bt = ae || L, vn(t, e), Bt = ae, Ra = G, gn(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = c ? t._visibility & -2 : t._visibility | 1, c && (r === null || L || Ra || Bt || Hr(e)), r = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (r === null) {
                L = r = t;
                try {
                  if (f = L.stateNode, c)
                    x = f.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    j = L.stateNode;
                    var se = L.memoizedProps.style, X = se != null && se.hasOwnProperty("display") ? se.display : null;
                    j.style.display = X == null || typeof X == "boolean" ? "" : ("" + X).trim();
                  }
                } catch (xe) {
                  at(L, L.return, xe);
                }
              }
            } else if (t.tag === 6) {
              if (r === null) {
                L = t;
                try {
                  L.stateNode.nodeValue = c ? "" : L.memoizedProps;
                } catch (xe) {
                  at(L, L.return, xe);
                }
              }
            } else if (t.tag === 18) {
              if (r === null) {
                L = t;
                try {
                  var Z = L.stateNode;
                  c ? vg(Z, !0) : vg(L.stateNode, !1);
                } catch (xe) {
                  at(L, L.return, xe);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              r === t && (r = null), t = t.return;
            }
            r === t && (r = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (r = l.retryQueue, r !== null && (l.retryQueue = null, go(e, r))));
        break;
      case 19:
        vn(t, e), gn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, go(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        vn(t, e), gn(e);
    }
  }
  function gn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (yv(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(s(160));
        switch (r.tag) {
          case 27:
            var c = r.stateNode, f = od(e);
            vo(e, f, c);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ii(x, ""), r.flags &= -33);
            var j = od(e);
            vo(e, j, x);
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
            throw Error(s(161));
        }
      } catch (ae) {
        at(e, e.return, ae);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Cv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Cv(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function _a(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Sv(e, t.alternate, t), t = t.sibling;
  }
  function Hr(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Wa(4, t, t.return), Hr(t);
          break;
        case 1:
          fa(t, t.return);
          var r = t.stateNode;
          typeof r.componentWillUnmount == "function" && vv(
            t,
            t.return,
            r
          ), Hr(t);
          break;
        case 27:
          $l(t.stateNode);
        case 26:
        case 5:
          fa(t, t.return), Hr(t);
          break;
        case 22:
          t.memoizedState === null && Hr(t);
          break;
        case 30:
          Hr(t);
          break;
        default:
          Hr(t);
      }
      e = e.sibling;
    }
  }
  function Aa(e, t, r) {
    for (r = r && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, c = e, f = t, x = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Aa(
            c,
            f,
            r
          ), _l(4, f);
          break;
        case 1:
          if (Aa(
            c,
            f,
            r
          ), l = f, c = l.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (G) {
              at(l, l.return, G);
            }
          if (l = f, c = l.updateQueue, c !== null) {
            var j = l.stateNode;
            try {
              var L = c.shared.hiddenCallbacks;
              if (L !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < L.length; c++)
                  rp(L[c], j);
            } catch (G) {
              at(l, l.return, G);
            }
          }
          r && x & 64 && pv(f), Al(f, f.return);
          break;
        case 27:
          bv(f);
        case 26:
        case 5:
          Aa(
            c,
            f,
            r
          ), r && l === null && x & 4 && gv(f), Al(f, f.return);
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
          ), r && x & 4 && jv(c, f);
          break;
        case 13:
          Aa(
            c,
            f,
            r
          ), r && x & 4 && Nv(c, f);
          break;
        case 22:
          f.memoizedState === null && Aa(
            c,
            f,
            r
          ), Al(f, f.return);
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
      t = t.sibling;
    }
  }
  function dd(e, t) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && gl(r));
  }
  function fd(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && gl(e));
  }
  function na(e, t, r, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Rv(
          e,
          t,
          r,
          l
        ), t = t.sibling;
  }
  function Rv(e, t, r, l) {
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        na(
          e,
          t,
          r,
          l
        ), c & 2048 && _l(9, t);
        break;
      case 1:
        na(
          e,
          t,
          r,
          l
        );
        break;
      case 3:
        na(
          e,
          t,
          r,
          l
        ), c & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && gl(e)));
        break;
      case 12:
        if (c & 2048) {
          na(
            e,
            t,
            r,
            l
          ), e = t.stateNode;
          try {
            var f = t.memoizedProps, x = f.id, j = f.onPostCommit;
            typeof j == "function" && j(
              x,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (L) {
            at(t, t.return, L);
          }
        } else
          na(
            e,
            t,
            r,
            l
          );
        break;
      case 31:
        na(
          e,
          t,
          r,
          l
        );
        break;
      case 13:
        na(
          e,
          t,
          r,
          l
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, x = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? na(
          e,
          t,
          r,
          l
        ) : Dl(e, t) : f._visibility & 2 ? na(
          e,
          t,
          r,
          l
        ) : (f._visibility |= 2, Ni(
          e,
          t,
          r,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && dd(x, t);
        break;
      case 24:
        na(
          e,
          t,
          r,
          l
        ), c & 2048 && fd(t.alternate, t);
        break;
      default:
        na(
          e,
          t,
          r,
          l
        );
    }
  }
  function Ni(e, t, r, l, c) {
    for (c = c && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, x = t, j = r, L = l, G = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
            f,
            x,
            j,
            L,
            c
          ), _l(8, x);
          break;
        case 23:
          break;
        case 22:
          var ae = x.stateNode;
          x.memoizedState !== null ? ae._visibility & 2 ? Ni(
            f,
            x,
            j,
            L,
            c
          ) : Dl(
            f,
            x
          ) : (ae._visibility |= 2, Ni(
            f,
            x,
            j,
            L,
            c
          )), c && G & 2048 && dd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ni(
            f,
            x,
            j,
            L,
            c
          ), c && G & 2048 && fd(x.alternate, x);
          break;
        default:
          Ni(
            f,
            x,
            j,
            L,
            c
          );
      }
      t = t.sibling;
    }
  }
  function Dl(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var r = e, l = t, c = l.flags;
        switch (l.tag) {
          case 22:
            Dl(r, l), c & 2048 && dd(
              l.alternate,
              l
            );
            break;
          case 24:
            Dl(r, l), c & 2048 && fd(l.alternate, l);
            break;
          default:
            Dl(r, l);
        }
        t = t.sibling;
      }
  }
  var zl = 8192;
  function Ti(e, t, r) {
    if (e.subtreeFlags & zl)
      for (e = e.child; e !== null; )
        Mv(
          e,
          t,
          r
        ), e = e.sibling;
  }
  function Mv(e, t, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          t,
          r
        ), e.flags & zl && e.memoizedState !== null && vE(
          r,
          ta,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ti(
          e,
          t,
          r
        );
        break;
      case 3:
      case 4:
        var l = ta;
        ta = Ao(e.stateNode.containerInfo), Ti(
          e,
          t,
          r
        ), ta = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = zl, zl = 16777216, Ti(
          e,
          t,
          r
        ), zl = l) : Ti(
          e,
          t,
          r
        ));
        break;
      default:
        Ti(
          e,
          t,
          r
        );
    }
  }
  function _v(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ol(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var r = 0; r < t.length; r++) {
          var l = t[r];
          Qt = l, Dv(
            l,
            e
          );
        }
      _v(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Av(e), e = e.sibling;
  }
  function Av(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ol(e), e.flags & 2048 && Wa(9, e, e.return);
        break;
      case 3:
        Ol(e);
        break;
      case 12:
        Ol(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, yo(e)) : Ol(e);
        break;
      default:
        Ol(e);
    }
  }
  function yo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var r = 0; r < t.length; r++) {
          var l = t[r];
          Qt = l, Dv(
            l,
            e
          );
        }
      _v(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, t, t.return), yo(t);
          break;
        case 22:
          r = t.stateNode, r._visibility & 2 && (r._visibility &= -3, yo(t));
          break;
        default:
          yo(t);
      }
      e = e.sibling;
    }
  }
  function Dv(e, t) {
    for (; Qt !== null; ) {
      var r = Qt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, r, t);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var l = r.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          gl(r.memoizedState.cache);
      }
      if (l = r.child, l !== null) l.return = r, Qt = l;
      else
        e: for (r = e; Qt !== null; ) {
          l = Qt;
          var c = l.sibling, f = l.return;
          if (wv(l), l === r) {
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
  var Aw = {
    getCacheForType: function(e) {
      var t = nn(kt), r = t.data.get(e);
      return r === void 0 && (r = e(), t.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return nn(kt).controller.signal;
    }
  }, Dw = typeof WeakMap == "function" ? WeakMap : Map, et = 0, dt = null, Fe = null, Ge = 0, nt = 0, Cn = null, er = !1, Ci = !1, hd = !1, Da = 0, Nt = 0, tr = 0, qr = 0, md = 0, Rn = 0, Ri = 0, kl = null, yn = null, pd = !1, bo = 0, zv = 0, xo = 1 / 0, So = null, nr = null, Xt = 0, ar = null, Mi = null, za = 0, vd = 0, gd = null, Ov = null, Ll = 0, yd = null;
  function Mn() {
    return (et & 2) !== 0 && Ge !== 0 ? Ge & -Ge : A.T !== null ? jd() : ue();
  }
  function kv() {
    if (Rn === 0)
      if ((Ge & 536870912) === 0 || Pe) {
        var e = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), Rn = e;
      } else Rn = 536870912;
    return e = Nn.current, e !== null && (e.flags |= 32), Rn;
  }
  function bn(e, t, r) {
    (e === dt && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null) && (_i(e, 0), rr(
      e,
      Ge,
      Rn,
      !1
    )), rt(e, r), ((et & 2) === 0 || e !== dt) && (e === dt && ((et & 2) === 0 && (qr |= r), Nt === 4 && rr(
      e,
      Ge,
      Rn,
      !1
    )), ha(e));
  }
  function Lv(e, t, r) {
    if ((et & 6) !== 0) throw Error(s(327));
    var l = !r && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ct(e, t), c = l ? kw(e, t) : xd(e, t, !0), f = l;
    do {
      if (c === 0) {
        Ci && !l && rr(e, t, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !zw(r)) {
          c = xd(e, t, !1), f = !1;
          continue;
        }
        if (c === 2) {
          if (f = t, e.errorRecoveryDisabledLanes & f)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            t = x;
            e: {
              var j = e;
              c = kl;
              var L = j.current.memoizedState.isDehydrated;
              if (L && (_i(j, x).flags |= 256), x = xd(
                j,
                x,
                !1
              ), x !== 2) {
                if (hd && !L) {
                  j.errorRecoveryDisabledLanes |= f, qr |= f, c = 4;
                  break e;
                }
                f = yn, yn = c, f !== null && (yn === null ? yn = f : yn.push.apply(
                  yn,
                  f
                ));
              }
              c = x;
            }
            if (f = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          _i(e, 0), rr(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, f = c, f) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              rr(
                l,
                t,
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
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (c = bo + 300 - qt(), 10 < c)) {
            if (rr(
              l,
              t,
              Rn,
              !er
            ), Oe(l, 0, !0) !== 0) break e;
            za = t, l.timeoutHandle = hg(
              Uv.bind(
                null,
                l,
                r,
                yn,
                So,
                pd,
                t,
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
          Uv(
            l,
            r,
            yn,
            So,
            pd,
            t,
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
  function Uv(e, t, r, l, c, f, x, j, L, G, ae, se, X, Z) {
    if (e.timeoutHandle = -1, se = t.subtreeFlags, se & 8192 || (se & 16785408) === 16785408) {
      se = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ya
      }, Mv(
        t,
        f,
        se
      );
      var xe = (f & 62914560) === f ? bo - qt() : (f & 4194048) === f ? zv - qt() : 0;
      if (xe = gE(
        se,
        xe
      ), xe !== null) {
        za = f, e.cancelPendingCommit = xe(
          Yv.bind(
            null,
            e,
            t,
            f,
            r,
            l,
            c,
            x,
            j,
            L,
            ae,
            se,
            null,
            X,
            Z
          )
        ), rr(e, f, x, !G);
        return;
      }
    }
    Yv(
      e,
      t,
      f,
      r,
      l,
      c,
      x,
      j,
      L
    );
  }
  function zw(e) {
    for (var t = e; ; ) {
      var r = t.tag;
      if ((r === 0 || r === 11 || r === 15) && t.flags & 16384 && (r = t.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var c = r[l], f = c.getSnapshot;
          c = c.value;
          try {
            if (!En(f(), c)) return !1;
          } catch {
            return !1;
          }
        }
      if (r = t.child, t.subtreeFlags & 16384 && r !== null)
        r.return = t, t = r;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function rr(e, t, r, l) {
    t &= ~md, t &= ~qr, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var c = t; 0 < c; ) {
      var f = 31 - Yt(c), x = 1 << f;
      l[f] = -1, c &= ~x;
    }
    r !== 0 && ga(e, r, t);
  }
  function wo() {
    return (et & 6) === 0 ? (Ul(0), !1) : !0;
  }
  function bd() {
    if (Fe !== null) {
      if (nt === 0)
        var e = Fe.return;
      else
        e = Fe, wa = zr = null, ku(e), xi = null, bl = 0, e = Fe;
      for (; e !== null; )
        mv(e.alternate, e), e = e.return;
      Fe = null;
    }
  }
  function _i(e, t) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Ww(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), za = 0, bd(), dt = e, Fe = r = xa(e.current, null), Ge = t, nt = 0, Cn = null, er = !1, Ci = ct(e, t), hd = !1, Ri = Rn = md = qr = tr = Nt = 0, yn = kl = null, pd = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var c = 31 - Yt(l), f = 1 << c;
        t |= e[c], l &= ~f;
      }
    return Da = t, qs(), r;
  }
  function Bv(e, t) {
    Ue = null, A.H = Cl, t === bi || t === Qs ? (t = ep(), nt = 3) : t === Eu ? (t = ep(), nt = 4) : nt = t === Zu ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Cn = t, Fe === null && (Nt = 1, uo(
      e,
      Bn(t, e.current)
    ));
  }
  function Vv() {
    var e = Nn.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? qn === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === qn : !1;
  }
  function $v() {
    var e = A.H;
    return A.H = Cl, e === null ? Cl : e;
  }
  function Hv() {
    var e = A.A;
    return A.A = Aw, e;
  }
  function Eo() {
    Nt = 4, er || (Ge & 4194048) !== Ge && Nn.current !== null || (Ci = !0), (tr & 134217727) === 0 && (qr & 134217727) === 0 || dt === null || rr(
      dt,
      Ge,
      Rn,
      !1
    );
  }
  function xd(e, t, r) {
    var l = et;
    et |= 2;
    var c = $v(), f = Hv();
    (dt !== e || Ge !== t) && (So = null, _i(e, t)), t = !1;
    var x = Nt;
    e: do
      try {
        if (nt !== 0 && Fe !== null) {
          var j = Fe, L = Cn;
          switch (nt) {
            case 8:
              bd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (t = !0);
              var G = nt;
              if (nt = 0, Cn = null, Ai(e, j, L, G), r && Ci) {
                x = 0;
                break e;
              }
              break;
            default:
              G = nt, nt = 0, Cn = null, Ai(e, j, L, G);
          }
        }
        Ow(), x = Nt;
        break;
      } catch (ae) {
        Bv(e, ae);
      }
    while (!0);
    return t && e.shellSuspendCounter++, wa = zr = null, et = l, A.H = c, A.A = f, Fe === null && (dt = null, Ge = 0, qs()), x;
  }
  function Ow() {
    for (; Fe !== null; ) qv(Fe);
  }
  function kw(e, t) {
    var r = et;
    et |= 2;
    var l = $v(), c = Hv();
    dt !== e || Ge !== t ? (So = null, xo = qt() + 500, _i(e, t)) : Ci = ct(
      e,
      t
    );
    e: do
      try {
        if (nt !== 0 && Fe !== null) {
          t = Fe;
          var f = Cn;
          t: switch (nt) {
            case 1:
              nt = 0, Cn = null, Ai(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (Jm(f)) {
                nt = 0, Cn = null, Iv(t);
                break;
              }
              t = function() {
                nt !== 2 && nt !== 9 || dt !== e || (nt = 7), ha(e);
              }, f.then(t, t);
              break e;
            case 3:
              nt = 7;
              break e;
            case 4:
              nt = 5;
              break e;
            case 7:
              Jm(f) ? (nt = 0, Cn = null, Iv(t)) : (nt = 0, Cn = null, Ai(e, t, f, 7));
              break;
            case 5:
              var x = null;
              switch (Fe.tag) {
                case 26:
                  x = Fe.memoizedState;
                case 5:
                case 27:
                  var j = Fe;
                  if (x ? Rg(x) : j.stateNode.complete) {
                    nt = 0, Cn = null;
                    var L = j.sibling;
                    if (L !== null) Fe = L;
                    else {
                      var G = j.return;
                      G !== null ? (Fe = G, jo(G)) : Fe = null;
                    }
                    break t;
                  }
              }
              nt = 0, Cn = null, Ai(e, t, f, 5);
              break;
            case 6:
              nt = 0, Cn = null, Ai(e, t, f, 6);
              break;
            case 8:
              bd(), Nt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Lw();
        break;
      } catch (ae) {
        Bv(e, ae);
      }
    while (!0);
    return wa = zr = null, A.H = l, A.A = c, et = r, Fe !== null ? 0 : (dt = null, Ge = 0, qs(), Nt);
  }
  function Lw() {
    for (; Fe !== null && !Ht(); )
      qv(Fe);
  }
  function qv(e) {
    var t = fv(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, t === null ? jo(e) : Fe = t;
  }
  function Iv(e) {
    var t = e, r = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = lv(
          r,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ge
        );
        break;
      case 11:
        t = lv(
          r,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ge
        );
        break;
      case 5:
        ku(t);
      default:
        mv(r, t), t = Fe = Hm(t, Da), t = fv(r, t, Da);
    }
    e.memoizedProps = e.pendingProps, t === null ? jo(e) : Fe = t;
  }
  function Ai(e, t, r, l) {
    wa = zr = null, ku(t), xi = null, bl = 0;
    var c = t.return;
    try {
      if (jw(
        e,
        c,
        t,
        r,
        Ge
      )) {
        Nt = 1, uo(
          e,
          Bn(r, e.current)
        ), Fe = null;
        return;
      }
    } catch (f) {
      if (c !== null) throw Fe = c, f;
      Nt = 1, uo(
        e,
        Bn(r, e.current)
      ), Fe = null;
      return;
    }
    t.flags & 32768 ? (Pe || l === 1 ? e = !0 : Ci || (Ge & 536870912) !== 0 ? e = !1 : (er = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Nn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Fv(t, e)) : jo(t);
  }
  function jo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Fv(
          t,
          er
        );
        return;
      }
      e = t.return;
      var r = Cw(
        t.alternate,
        t,
        Da
      );
      if (r !== null) {
        Fe = r;
        return;
      }
      if (t = t.sibling, t !== null) {
        Fe = t;
        return;
      }
      Fe = t = e;
    } while (t !== null);
    Nt === 0 && (Nt = 5);
  }
  function Fv(e, t) {
    do {
      var r = Rw(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, Fe = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !t && (e = e.sibling, e !== null)) {
        Fe = e;
        return;
      }
      Fe = e = r;
    } while (e !== null);
    Nt = 6, Fe = null;
  }
  function Yv(e, t, r, l, c, f, x, j, L) {
    e.cancelPendingCommit = null;
    do
      No();
    while (Xt !== 0);
    if ((et & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= ou, en(
        e,
        r,
        f,
        x,
        j,
        L
      ), e === dt && (Fe = dt = null, Ge = 0), Mi = t, ar = e, za = r, vd = f, gd = c, Ov = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, $w(tt, function() {
        return Qv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, c = N.p, N.p = 2, x = et, et |= 4;
        try {
          Mw(e, t, r);
        } finally {
          et = x, N.p = c, A.T = l;
        }
      }
      Xt = 1, Gv(), Xv(), Pv();
    }
  }
  function Gv() {
    if (Xt === 1) {
      Xt = 0;
      var e = ar, t = Mi, r = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || r) {
        r = A.T, A.T = null;
        var l = N.p;
        N.p = 2;
        var c = et;
        et |= 4;
        try {
          Tv(t, e);
          var f = Dd, x = Dm(e.containerInfo), j = f.focusedElem, L = f.selectionRange;
          if (x !== j && j && j.ownerDocument && Am(
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
                var se = j.ownerDocument || document, X = se && se.defaultView || window;
                if (X.getSelection) {
                  var Z = X.getSelection(), xe = j.textContent.length, _e = Math.min(L.start, xe), ot = L.end === void 0 ? _e : Math.min(L.end, xe);
                  !Z.extend && _e > ot && (x = ot, ot = _e, _e = x);
                  var $ = _m(
                    j,
                    _e
                  ), B = _m(
                    j,
                    ot
                  );
                  if ($ && B && (Z.rangeCount !== 1 || Z.anchorNode !== $.node || Z.anchorOffset !== $.offset || Z.focusNode !== B.node || Z.focusOffset !== B.offset)) {
                    var Y = se.createRange();
                    Y.setStart($.node, $.offset), Z.removeAllRanges(), _e > ot ? (Z.addRange(Y), Z.extend(B.node, B.offset)) : (Y.setEnd(B.node, B.offset), Z.addRange(Y));
                  }
                }
              }
            }
            for (se = [], Z = j; Z = Z.parentNode; )
              Z.nodeType === 1 && se.push({
                element: Z,
                left: Z.scrollLeft,
                top: Z.scrollTop
              });
            for (typeof j.focus == "function" && j.focus(), j = 0; j < se.length; j++) {
              var ie = se[j];
              ie.element.scrollLeft = ie.left, ie.element.scrollTop = ie.top;
            }
          }
          Uo = !!Ad, Dd = Ad = null;
        } finally {
          et = c, N.p = l, A.T = r;
        }
      }
      e.current = t, Xt = 2;
    }
  }
  function Xv() {
    if (Xt === 2) {
      Xt = 0;
      var e = ar, t = Mi, r = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || r) {
        r = A.T, A.T = null;
        var l = N.p;
        N.p = 2;
        var c = et;
        et |= 4;
        try {
          Sv(e, t.alternate, t);
        } finally {
          et = c, N.p = l, A.T = r;
        }
      }
      Xt = 3;
    }
  }
  function Pv() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, On();
      var e = ar, t = Mi, r = za, l = Ov;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, Mi = ar = null, Kv(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (nr = null), F(r), t = t.stateNode, Wt && typeof Wt.onCommitFiberRoot == "function")
        try {
          Wt.onCommitFiberRoot(
            Zn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = A.T, c = N.p, N.p = 2, A.T = null;
        try {
          for (var f = e.onRecoverableError, x = 0; x < l.length; x++) {
            var j = l[x];
            f(j.value, {
              componentStack: j.stack
            });
          }
        } finally {
          A.T = t, N.p = c;
        }
      }
      (za & 3) !== 0 && No(), ha(e), c = e.pendingLanes, (r & 261930) !== 0 && (c & 42) !== 0 ? e === yd ? Ll++ : (Ll = 0, yd = e) : Ll = 0, Ul(0);
    }
  }
  function Kv(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, gl(t)));
  }
  function No() {
    return Gv(), Xv(), Pv(), Qv();
  }
  function Qv() {
    if (Xt !== 5) return !1;
    var e = ar, t = vd;
    vd = 0;
    var r = F(za), l = A.T, c = N.p;
    try {
      N.p = 32 > r ? 32 : r, A.T = null, r = gd, gd = null;
      var f = ar, x = za;
      if (Xt = 0, Mi = ar = null, za = 0, (et & 6) !== 0) throw Error(s(331));
      var j = et;
      if (et |= 4, Av(f.current), Rv(
        f,
        f.current,
        x,
        r
      ), et = j, Ul(0, !1), Wt && typeof Wt.onPostCommitFiberRoot == "function")
        try {
          Wt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      N.p = c, A.T = l, Kv(e, t);
    }
  }
  function Zv(e, t, r) {
    t = Bn(r, t), t = Qu(e.stateNode, t, 2), e = Qa(e, t, 2), e !== null && (rt(e, 2), ha(e));
  }
  function at(e, t, r) {
    if (e.tag === 3)
      Zv(e, e, r);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Zv(
            t,
            e,
            r
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (nr === null || !nr.has(l))) {
            e = Bn(r, e), r = Jp(2), l = Qa(t, r, 2), l !== null && (Wp(
              r,
              l,
              t,
              e
            ), rt(l, 2), ha(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Sd(e, t, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Dw();
      var c = /* @__PURE__ */ new Set();
      l.set(t, c);
    } else
      c = l.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), l.set(t, c));
    c.has(r) || (hd = !0, c.add(r), e = Uw.bind(null, e, t, r), t.then(e, e));
  }
  function Uw(e, t, r) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, dt === e && (Ge & r) === r && (Nt === 4 || Nt === 3 && (Ge & 62914560) === Ge && 300 > qt() - bo ? (et & 2) === 0 && _i(e, 0) : md |= r, Ri === Ge && (Ri = 0)), ha(e);
  }
  function Jv(e, t) {
    t === 0 && (t = Gt()), e = _r(e, t), e !== null && (rt(e, t), ha(e));
  }
  function Bw(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), Jv(e, r);
  }
  function Vw(e, t) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, c = e.memoizedState;
        c !== null && (r = c.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    l !== null && l.delete(t), Jv(e, r);
  }
  function $w(e, t) {
    return xt(e, t);
  }
  var To = null, Di = null, wd = !1, Co = !1, Ed = !1, ir = 0;
  function ha(e) {
    e !== Di && e.next === null && (Di === null ? To = Di = e : Di = Di.next = e), Co = !0, wd || (wd = !0, qw());
  }
  function Ul(e, t) {
    if (!Ed && Co) {
      Ed = !0;
      do
        for (var r = !1, l = To; l !== null; ) {
          if (e !== 0) {
            var c = l.pendingLanes;
            if (c === 0) var f = 0;
            else {
              var x = l.suspendedLanes, j = l.pingedLanes;
              f = (1 << 31 - Yt(42 | e) + 1) - 1, f &= c & ~(x & ~j), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, ng(l, f));
          } else
            f = Ge, f = Oe(
              l,
              l === dt ? f : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (f & 3) === 0 || ct(l, f) || (r = !0, ng(l, f));
          l = l.next;
        }
      while (r);
      Ed = !1;
    }
  }
  function Hw() {
    Wv();
  }
  function Wv() {
    Co = wd = !1;
    var e = 0;
    ir !== 0 && Jw() && (e = ir);
    for (var t = qt(), r = null, l = To; l !== null; ) {
      var c = l.next, f = eg(l, t);
      f === 0 ? (l.next = null, r === null ? To = c : r.next = c, c === null && (Di = r)) : (r = l, (e !== 0 || (f & 3) !== 0) && (Co = !0)), l = c;
    }
    Xt !== 0 && Xt !== 5 || Ul(e), ir !== 0 && (ir = 0);
  }
  function eg(e, t) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, c = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var x = 31 - Yt(f), j = 1 << x, L = c[x];
      L === -1 ? ((j & r) === 0 || (j & l) !== 0) && (c[x] = Dt(j, t)) : L <= t && (e.expiredLanes |= j), f &= ~j;
    }
    if (t = dt, r = Ge, r = Oe(
      e,
      e === t ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === t && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && dn(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ct(e, r)) {
      if (t = r & -r, t === e.callbackPriority) return t;
      switch (l !== null && dn(l), F(r)) {
        case 2:
        case 8:
          r = Ke;
          break;
        case 32:
          r = tt;
          break;
        case 268435456:
          r = Ft;
          break;
        default:
          r = tt;
      }
      return l = tg.bind(null, e), r = xt(r, l), e.callbackPriority = t, e.callbackNode = r, t;
    }
    return l !== null && l !== null && dn(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function tg(e, t) {
    if (Xt !== 0 && Xt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (No() && e.callbackNode !== r)
      return null;
    var l = Ge;
    return l = Oe(
      e,
      e === dt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Lv(e, l, t), eg(e, qt()), e.callbackNode != null && e.callbackNode === r ? tg.bind(null, e) : null);
  }
  function ng(e, t) {
    if (No()) return null;
    Lv(e, t, !0);
  }
  function qw() {
    eE(function() {
      (et & 6) !== 0 ? xt(
        ze,
        Hw
      ) : Wv();
    });
  }
  function jd() {
    if (ir === 0) {
      var e = gi;
      e === 0 && (e = va, va <<= 1, (va & 261888) === 0 && (va = 256)), ir = e;
    }
    return ir;
  }
  function ag(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Os("" + e);
  }
  function rg(e, t) {
    var r = t.ownerDocument.createElement("input");
    return r.name = t.name, r.value = t.value, e.id && r.setAttribute("form", e.id), t.parentNode.insertBefore(r, t), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function Iw(e, t, r, l, c) {
    if (t === "submit" && r && r.stateNode === c) {
      var f = ag(
        (c[ve] || null).action
      ), x = l.submitter;
      x && (t = (t = x[ve] || null) ? ag(t.formAction) : x.getAttribute("formAction"), t !== null && (f = t, x = null));
      var j = new Bs(
        "action",
        "action",
        null,
        l,
        c
      );
      e.push({
        event: j,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (ir !== 0) {
                  var L = x ? rg(c, x) : new FormData(c);
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
                typeof f == "function" && (j.preventDefault(), L = x ? rg(c, x) : new FormData(c), Fu(
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
  for (var Nd = 0; Nd < su.length; Nd++) {
    var Td = su[Nd], Fw = Td.toLowerCase(), Yw = Td[0].toUpperCase() + Td.slice(1);
    ea(
      Fw,
      "on" + Yw
    );
  }
  ea(km, "onAnimationEnd"), ea(Lm, "onAnimationIteration"), ea(Um, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(sw, "onTransitionRun"), ea(ow, "onTransitionStart"), ea(cw, "onTransitionCancel"), ea(Bm, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Kt(
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
  var Bl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Gw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bl)
  );
  function ig(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], c = l.event;
      l = l.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var x = l.length - 1; 0 <= x; x--) {
            var j = l[x], L = j.instance, G = j.currentTarget;
            if (j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = G;
            try {
              f(c);
            } catch (ae) {
              Hs(ae);
            }
            c.currentTarget = null, f = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (j = l[x], L = j.instance, G = j.currentTarget, j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = G;
            try {
              f(c);
            } catch (ae) {
              Hs(ae);
            }
            c.currentTarget = null, f = L;
          }
      }
    }
  }
  function Ye(e, t) {
    var r = t[be];
    r === void 0 && (r = t[be] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (lg(t, e, 2, !1), r.add(l));
  }
  function Cd(e, t, r) {
    var l = 0;
    t && (l |= 4), lg(
      r,
      e,
      l,
      t
    );
  }
  var Ro = "_reactListening" + Math.random().toString(36).slice(2);
  function Rd(e) {
    if (!e[Ro]) {
      e[Ro] = !0, qa.forEach(function(r) {
        r !== "selectionchange" && (Gw.has(r) || Cd(r, !1, e), Cd(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ro] || (t[Ro] = !0, Cd("selectionchange", !1, t));
    }
  }
  function lg(e, t, r, l) {
    switch (kg(t)) {
      case 2:
        var c = xE;
        break;
      case 8:
        c = SE;
        break;
      default:
        c = Id;
    }
    r = c.bind(
      null,
      t,
      r,
      e
    ), c = void 0, !Pc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), l ? c !== void 0 ? e.addEventListener(t, r, {
      capture: !0,
      passive: c
    }) : e.addEventListener(t, r, !0) : c !== void 0 ? e.addEventListener(t, r, {
      passive: c
    }) : e.addEventListener(t, r, !1);
  }
  function Md(e, t, r, l, c) {
    var f = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var x = l.tag;
        if (x === 3 || x === 4) {
          var j = l.stateNode.containerInfo;
          if (j === c) break;
          if (x === 4)
            for (x = l.return; x !== null; ) {
              var L = x.tag;
              if ((L === 3 || L === 4) && x.stateNode.containerInfo === c)
                return;
              x = x.return;
            }
          for (; j !== null; ) {
            if (x = it(j), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = f = x;
              continue e;
            }
            j = j.parentNode;
          }
        }
        l = l.return;
      }
    dm(function() {
      var G = f, ae = Gc(r), se = [];
      e: {
        var X = Vm.get(e);
        if (X !== void 0) {
          var Z = Bs, xe = e;
          switch (e) {
            case "keypress":
              if (Ls(r) === 0) break e;
            case "keydown":
            case "keyup":
              Z = VS;
              break;
            case "focusin":
              xe = "focus", Z = Jc;
              break;
            case "focusout":
              xe = "blur", Z = Jc;
              break;
            case "beforeblur":
            case "afterblur":
              Z = Jc;
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
              Z = mm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Z = CS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Z = qS;
              break;
            case km:
            case Lm:
            case Um:
              Z = _S;
              break;
            case Bm:
              Z = FS;
              break;
            case "scroll":
            case "scrollend":
              Z = NS;
              break;
            case "wheel":
              Z = GS;
              break;
            case "copy":
            case "cut":
            case "paste":
              Z = DS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Z = vm;
              break;
            case "toggle":
            case "beforetoggle":
              Z = PS;
          }
          var _e = (t & 4) !== 0, ot = !_e && (e === "scroll" || e === "scrollend"), $ = _e ? X !== null ? X + "Capture" : null : X;
          _e = [];
          for (var B = G, Y; B !== null; ) {
            var ie = B;
            if (Y = ie.stateNode, ie = ie.tag, ie !== 5 && ie !== 26 && ie !== 27 || Y === null || $ === null || (ie = ll(B, $), ie != null && _e.push(
              Vl(B, ie, Y)
            )), ot) break;
            B = B.return;
          }
          0 < _e.length && (X = new Z(
            X,
            xe,
            null,
            r,
            ae
          ), se.push({ event: X, listeners: _e }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (X = e === "mouseover" || e === "pointerover", Z = e === "mouseout" || e === "pointerout", X && r !== Yc && (xe = r.relatedTarget || r.fromElement) && (it(xe) || xe[Ee]))
            break e;
          if ((Z || X) && (X = ae.window === ae ? ae : (X = ae.ownerDocument) ? X.defaultView || X.parentWindow : window, Z ? (xe = r.relatedTarget || r.toElement, Z = G, xe = xe ? it(xe) : null, xe !== null && (ot = u(xe), _e = xe.tag, xe !== ot || _e !== 5 && _e !== 27 && _e !== 6) && (xe = null)) : (Z = null, xe = G), Z !== xe)) {
            if (_e = mm, ie = "onMouseLeave", $ = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (_e = vm, ie = "onPointerLeave", $ = "onPointerEnter", B = "pointer"), ot = Z == null ? X : Ie(Z), Y = xe == null ? X : Ie(xe), X = new _e(
              ie,
              B + "leave",
              Z,
              r,
              ae
            ), X.target = ot, X.relatedTarget = Y, ie = null, it(ae) === G && (_e = new _e(
              $,
              B + "enter",
              xe,
              r,
              ae
            ), _e.target = Y, _e.relatedTarget = ot, ie = _e), ot = ie, Z && xe)
              t: {
                for (_e = Xw, $ = Z, B = xe, Y = 0, ie = $; ie; ie = _e(ie))
                  Y++;
                ie = 0;
                for (var Ce = B; Ce; Ce = _e(Ce))
                  ie++;
                for (; 0 < Y - ie; )
                  $ = _e($), Y--;
                for (; 0 < ie - Y; )
                  B = _e(B), ie--;
                for (; Y--; ) {
                  if ($ === B || B !== null && $ === B.alternate) {
                    _e = $;
                    break t;
                  }
                  $ = _e($), B = _e(B);
                }
                _e = null;
              }
            else _e = null;
            Z !== null && sg(
              se,
              X,
              Z,
              _e,
              !1
            ), xe !== null && ot !== null && sg(
              se,
              ot,
              xe,
              _e,
              !0
            );
          }
        }
        e: {
          if (X = G ? Ie(G) : window, Z = X.nodeName && X.nodeName.toLowerCase(), Z === "select" || Z === "input" && X.type === "file")
            var Ze = jm;
          else if (wm(X))
            if (Nm)
              Ze = rw;
            else {
              Ze = nw;
              var je = tw;
            }
          else
            Z = X.nodeName, !Z || Z.toLowerCase() !== "input" || X.type !== "checkbox" && X.type !== "radio" ? G && Fc(G.elementType) && (Ze = jm) : Ze = aw;
          if (Ze && (Ze = Ze(e, G))) {
            Em(
              se,
              Ze,
              r,
              ae
            );
            break e;
          }
          je && je(e, X, G), e === "focusout" && G && X.type === "number" && G.memoizedProps.value != null && Ic(X, "number", X.value);
        }
        switch (je = G ? Ie(G) : window, e) {
          case "focusin":
            (wm(je) || je.contentEditable === "true") && (ci = je, ru = G, ml = null);
            break;
          case "focusout":
            ml = ru = ci = null;
            break;
          case "mousedown":
            iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            iu = !1, zm(se, r, ae);
            break;
          case "selectionchange":
            if (lw) break;
          case "keydown":
          case "keyup":
            zm(se, r, ae);
        }
        var Be;
        if (eu)
          e: {
            switch (e) {
              case "compositionstart":
                var Xe = "onCompositionStart";
                break e;
              case "compositionend":
                Xe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Xe = "onCompositionUpdate";
                break e;
            }
            Xe = void 0;
          }
        else
          oi ? xm(e, r) && (Xe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Xe = "onCompositionStart");
        Xe && (gm && r.locale !== "ko" && (oi || Xe !== "onCompositionStart" ? Xe === "onCompositionEnd" && oi && (Be = fm()) : (Ia = ae, Kc = "value" in Ia ? Ia.value : Ia.textContent, oi = !0)), je = Mo(G, Xe), 0 < je.length && (Xe = new pm(
          Xe,
          e,
          null,
          r,
          ae
        ), se.push({ event: Xe, listeners: je }), Be ? Xe.data = Be : (Be = Sm(r), Be !== null && (Xe.data = Be)))), (Be = QS ? ZS(e, r) : JS(e, r)) && (Xe = Mo(G, "onBeforeInput"), 0 < Xe.length && (je = new pm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ae
        ), se.push({
          event: je,
          listeners: Xe
        }), je.data = Be)), Iw(
          se,
          e,
          G,
          r,
          ae
        );
      }
      ig(se, t);
    });
  }
  function Vl(e, t, r) {
    return {
      instance: e,
      listener: t,
      currentTarget: r
    };
  }
  function Mo(e, t) {
    for (var r = t + "Capture", l = []; e !== null; ) {
      var c = e, f = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || f === null || (c = ll(e, r), c != null && l.unshift(
        Vl(e, c, f)
      ), c = ll(e, t), c != null && l.push(
        Vl(e, c, f)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Xw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function sg(e, t, r, l, c) {
    for (var f = t._reactName, x = []; r !== null && r !== l; ) {
      var j = r, L = j.alternate, G = j.stateNode;
      if (j = j.tag, L !== null && L === l) break;
      j !== 5 && j !== 26 && j !== 27 || G === null || (L = G, c ? (G = ll(r, f), G != null && x.unshift(
        Vl(r, G, L)
      )) : c || (G = ll(r, f), G != null && x.push(
        Vl(r, G, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: t, listeners: x });
  }
  var Pw = /\r\n?/g, Kw = /\u0000|\uFFFD/g;
  function og(e) {
    return (typeof e == "string" ? e : "" + e).replace(Pw, `
`).replace(Kw, "");
  }
  function cg(e, t) {
    return t = og(t), og(e) === t;
  }
  function st(e, t, r, l, c, f) {
    switch (r) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || ii(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && ii(e, "" + l);
        break;
      case "className":
        Ct(e, "class", l);
        break;
      case "tabIndex":
        Ct(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ct(e, r, l);
        break;
      case "style":
        cm(e, l, f);
        break;
      case "data":
        if (t !== "object") {
          Ct(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = Os("" + l), e.setAttribute(r, l);
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
          typeof f == "function" && (r === "formAction" ? (t !== "input" && st(e, t, "name", c.name, c, null), st(
            e,
            t,
            "formEncType",
            c.formEncType,
            c,
            null
          ), st(
            e,
            t,
            "formMethod",
            c.formMethod,
            c,
            null
          ), st(
            e,
            t,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (st(e, t, "encType", c.encType, c, null), st(e, t, "method", c.method, c, null), st(e, t, "target", c.target, c, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = Os("" + l), e.setAttribute(r, l);
        break;
      case "onClick":
        l != null && (e.onclick = ya);
        break;
      case "onScroll":
        l != null && Ye("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Ye("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (r = l.__html, r != null) {
            if (c.children != null) throw Error(s(60));
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
        r = Os("" + l), e.setAttributeNS(
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
        Ye("beforetoggle", e), Ye("toggle", e), He(e, "popover", l);
        break;
      case "xlinkActuate":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        He(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = ES.get(r) || r, He(e, r, l));
    }
  }
  function _d(e, t, r, l, c, f) {
    switch (r) {
      case "style":
        cm(e, l, f);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (r = l.__html, r != null) {
            if (c.children != null) throw Error(s(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof l == "string" ? ii(e, l) : (typeof l == "number" || typeof l == "bigint") && ii(e, "" + l);
        break;
      case "onScroll":
        l != null && Ye("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Ye("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = ya);
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
            if (r[0] === "o" && r[1] === "n" && (c = r.endsWith("Capture"), t = r.slice(2, c ? r.length - 7 : void 0), f = e[ve] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(t, f, c), typeof l == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(t, l, c);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : He(e, r, l);
          }
    }
  }
  function rn(e, t, r) {
    switch (t) {
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
        Ye("error", e), Ye("load", e);
        var l = !1, c = !1, f;
        for (f in r)
          if (r.hasOwnProperty(f)) {
            var x = r[f];
            if (x != null)
              switch (f) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  st(e, t, f, x, r, null);
              }
          }
        c && st(e, t, "srcSet", r.srcSet, r, null), l && st(e, t, "src", r.src, r, null);
        return;
      case "input":
        Ye("invalid", e);
        var j = f = x = c = null, L = null, G = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var ae = r[l];
            if (ae != null)
              switch (l) {
                case "name":
                  c = ae;
                  break;
                case "type":
                  x = ae;
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
                    throw Error(s(137, t));
                  break;
                default:
                  st(e, t, l, ae, r, null);
              }
          }
        im(
          e,
          f,
          j,
          L,
          G,
          x,
          c,
          !1
        );
        return;
      case "select":
        Ye("invalid", e), l = x = f = null;
        for (c in r)
          if (r.hasOwnProperty(c) && (j = r[c], j != null))
            switch (c) {
              case "value":
                f = j;
                break;
              case "defaultValue":
                x = j;
                break;
              case "multiple":
                l = j;
              default:
                st(e, t, c, j, r, null);
            }
        t = f, r = x, e.multiple = !!l, t != null ? ri(e, !!l, t, !1) : r != null && ri(e, !!l, r, !0);
        return;
      case "textarea":
        Ye("invalid", e), f = c = l = null;
        for (x in r)
          if (r.hasOwnProperty(x) && (j = r[x], j != null))
            switch (x) {
              case "value":
                l = j;
                break;
              case "defaultValue":
                c = j;
                break;
              case "children":
                f = j;
                break;
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(s(91));
                break;
              default:
                st(e, t, x, j, r, null);
            }
        sm(e, l, c, f);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                st(e, t, L, l, r, null);
            }
        return;
      case "dialog":
        Ye("beforetoggle", e), Ye("toggle", e), Ye("cancel", e), Ye("close", e);
        break;
      case "iframe":
      case "object":
        Ye("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Bl.length; l++)
          Ye(Bl[l], e);
        break;
      case "image":
        Ye("error", e), Ye("load", e);
        break;
      case "details":
        Ye("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ye("error", e), Ye("load", e);
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
          if (r.hasOwnProperty(G) && (l = r[G], l != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                st(e, t, G, l, r, null);
            }
        return;
      default:
        if (Fc(t)) {
          for (ae in r)
            r.hasOwnProperty(ae) && (l = r[ae], l !== void 0 && _d(
              e,
              t,
              ae,
              l,
              r,
              void 0
            ));
          return;
        }
    }
    for (j in r)
      r.hasOwnProperty(j) && (l = r[j], l != null && st(e, t, j, l, r, null));
  }
  function Qw(e, t, r, l) {
    switch (t) {
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
        var c = null, f = null, x = null, j = null, L = null, G = null, ae = null;
        for (Z in r) {
          var se = r[Z];
          if (r.hasOwnProperty(Z) && se != null)
            switch (Z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = se;
              default:
                l.hasOwnProperty(Z) || st(e, t, Z, null, l, se);
            }
        }
        for (var X in l) {
          var Z = l[X];
          if (se = r[X], l.hasOwnProperty(X) && (Z != null || se != null))
            switch (X) {
              case "type":
                f = Z;
                break;
              case "name":
                c = Z;
                break;
              case "checked":
                G = Z;
                break;
              case "defaultChecked":
                ae = Z;
                break;
              case "value":
                x = Z;
                break;
              case "defaultValue":
                j = Z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Z != null)
                  throw Error(s(137, t));
                break;
              default:
                Z !== se && st(
                  e,
                  t,
                  X,
                  Z,
                  l,
                  se
                );
            }
        }
        qc(
          e,
          x,
          j,
          L,
          G,
          ae,
          f,
          c
        );
        return;
      case "select":
        Z = x = j = X = null;
        for (f in r)
          if (L = r[f], r.hasOwnProperty(f) && L != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                Z = L;
              default:
                l.hasOwnProperty(f) || st(
                  e,
                  t,
                  f,
                  null,
                  l,
                  L
                );
            }
        for (c in l)
          if (f = l[c], L = r[c], l.hasOwnProperty(c) && (f != null || L != null))
            switch (c) {
              case "value":
                X = f;
                break;
              case "defaultValue":
                j = f;
                break;
              case "multiple":
                x = f;
              default:
                f !== L && st(
                  e,
                  t,
                  c,
                  f,
                  l,
                  L
                );
            }
        t = j, r = x, l = Z, X != null ? ri(e, !!r, X, !1) : !!l != !!r && (t != null ? ri(e, !!r, t, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        Z = X = null;
        for (j in r)
          if (c = r[j], r.hasOwnProperty(j) && c != null && !l.hasOwnProperty(j))
            switch (j) {
              case "value":
                break;
              case "children":
                break;
              default:
                st(e, t, j, null, l, c);
            }
        for (x in l)
          if (c = l[x], f = r[x], l.hasOwnProperty(x) && (c != null || f != null))
            switch (x) {
              case "value":
                X = c;
                break;
              case "defaultValue":
                Z = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(s(91));
                break;
              default:
                c !== f && st(e, t, x, c, l, f);
            }
        lm(e, X, Z);
        return;
      case "option":
        for (var xe in r)
          if (X = r[xe], r.hasOwnProperty(xe) && X != null && !l.hasOwnProperty(xe))
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                st(
                  e,
                  t,
                  xe,
                  null,
                  l,
                  X
                );
            }
        for (L in l)
          if (X = l[L], Z = r[L], l.hasOwnProperty(L) && X !== Z && (X != null || Z != null))
            switch (L) {
              case "selected":
                e.selected = X && typeof X != "function" && typeof X != "symbol";
                break;
              default:
                st(
                  e,
                  t,
                  L,
                  X,
                  l,
                  Z
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
          X = r[_e], r.hasOwnProperty(_e) && X != null && !l.hasOwnProperty(_e) && st(e, t, _e, null, l, X);
        for (G in l)
          if (X = l[G], Z = r[G], l.hasOwnProperty(G) && X !== Z && (X != null || Z != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(s(137, t));
                break;
              default:
                st(
                  e,
                  t,
                  G,
                  X,
                  l,
                  Z
                );
            }
        return;
      default:
        if (Fc(t)) {
          for (var ot in r)
            X = r[ot], r.hasOwnProperty(ot) && X !== void 0 && !l.hasOwnProperty(ot) && _d(
              e,
              t,
              ot,
              void 0,
              l,
              X
            );
          for (ae in l)
            X = l[ae], Z = r[ae], !l.hasOwnProperty(ae) || X === Z || X === void 0 && Z === void 0 || _d(
              e,
              t,
              ae,
              X,
              l,
              Z
            );
          return;
        }
    }
    for (var $ in r)
      X = r[$], r.hasOwnProperty($) && X != null && !l.hasOwnProperty($) && st(e, t, $, null, l, X);
    for (se in l)
      X = l[se], Z = r[se], !l.hasOwnProperty(se) || X === Z || X == null && Z == null || st(e, t, se, X, l, Z);
  }
  function ug(e) {
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
  function Zw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var c = r[l], f = c.transferSize, x = c.initiatorType, j = c.duration;
        if (f && j && ug(x)) {
          for (x = 0, j = c.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], G = L.startTime;
            if (G > j) break;
            var ae = L.transferSize, se = L.initiatorType;
            ae && ug(se) && (L = L.responseEnd, x += ae * (L < j ? 1 : (j - G) / (L - G)));
          }
          if (--l, t += 8 * (f + x) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ad = null, Dd = null;
  function _o(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function dg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function fg(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function zd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Od = null;
  function Jw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Od ? !1 : (Od = e, !0) : (Od = null, !1);
  }
  var hg = typeof setTimeout == "function" ? setTimeout : void 0, Ww = typeof clearTimeout == "function" ? clearTimeout : void 0, mg = typeof Promise == "function" ? Promise : void 0, eE = typeof queueMicrotask == "function" ? queueMicrotask : typeof mg < "u" ? function(e) {
    return mg.resolve(null).then(e).catch(tE);
  } : hg;
  function tE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function lr(e) {
    return e === "head";
  }
  function pg(e, t) {
    var r = t, l = 0;
    do {
      var c = r.nextSibling;
      if (e.removeChild(r), c && c.nodeType === 8)
        if (r = c.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(c), Li(t);
            return;
          }
          l--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          l++;
        else if (r === "html")
          $l(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, $l(r);
          for (var f = r.firstChild; f; ) {
            var x = f.nextSibling, j = f.nodeName;
            f[$e] || j === "SCRIPT" || j === "STYLE" || j === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = x;
          }
        } else
          r === "body" && $l(e.ownerDocument.body);
      r = c;
    } while (r);
    Li(t);
  }
  function vg(e, t) {
    var r = e;
    e = 0;
    do {
      var l = r.nextSibling;
      if (r.nodeType === 1 ? t ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (t ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), l && l.nodeType === 8)
        if (r = l.data, r === "/$") {
          if (e === 0) break;
          e--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || e++;
      r = l;
    } while (r);
  }
  function kd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var r = t;
      switch (t = t.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          kd(r), ut(r);
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
  function nE(e, t, r, l) {
    for (; e.nodeType === 1; ) {
      var c = r;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[$e])
          switch (t) {
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
      } else if (t === "input" && e.type === "hidden") {
        var f = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = In(e.nextSibling), e === null) break;
    }
    return null;
  }
  function aE(e, t, r) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function gg(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ld(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ud(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function rE(e, t) {
    var r = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || r.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), r.removeEventListener("DOMContentLoaded", l);
      };
      r.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function In(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Bd = null;
  function yg(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (t === 0)
            return In(e.nextSibling);
          t--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function bg(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (t === 0) return e;
          t--;
        } else r !== "/$" && r !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function xg(e, t, r) {
    switch (t = _o(r), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(s(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(s(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function $l(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ut(e);
  }
  var Fn = /* @__PURE__ */ new Map(), Sg = /* @__PURE__ */ new Set();
  function Ao(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = N.d;
  N.d = {
    f: iE,
    r: lE,
    D: sE,
    C: oE,
    L: cE,
    m: uE,
    X: fE,
    S: dE,
    M: hE
  };
  function iE() {
    var e = Oa.f(), t = wo();
    return e || t;
  }
  function lE(e) {
    var t = St(e);
    t !== null && t.tag === 5 && t.type === "form" ? Bp(t) : Oa.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function wg(e, t, r) {
    var l = zi;
    if (l && typeof t == "string" && t) {
      var c = Ln(t);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof r == "string" && (c += '[crossorigin="' + r + '"]'), Sg.has(c) || (Sg.add(c), e = { rel: e, crossOrigin: r, href: t }, l.querySelector(c) === null && (t = l.createElement("link"), rn(t, "link", e), mt(t), l.head.appendChild(t)));
    }
  }
  function sE(e) {
    Oa.D(e), wg("dns-prefetch", e, null);
  }
  function oE(e, t) {
    Oa.C(e, t), wg("preconnect", e, t);
  }
  function cE(e, t, r) {
    Oa.L(e, t, r);
    var l = zi;
    if (l && e && t) {
      var c = 'link[rel="preload"][as="' + Ln(t) + '"]';
      t === "image" && r && r.imageSrcSet ? (c += '[imagesrcset="' + Ln(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (c += '[imagesizes="' + Ln(
        r.imageSizes
      ) + '"]')) : c += '[href="' + Ln(e) + '"]';
      var f = c;
      switch (t) {
        case "style":
          f = Oi(e);
          break;
        case "script":
          f = ki(e);
      }
      Fn.has(f) || (e = v(
        {
          rel: "preload",
          href: t === "image" && r && r.imageSrcSet ? void 0 : e,
          as: t
        },
        r
      ), Fn.set(f, e), l.querySelector(c) !== null || t === "style" && l.querySelector(Hl(f)) || t === "script" && l.querySelector(ql(f)) || (t = l.createElement("link"), rn(t, "link", e), mt(t), l.head.appendChild(t)));
    }
  }
  function uE(e, t) {
    Oa.m(e, t);
    var r = zi;
    if (r && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", c = 'link[rel="modulepreload"][as="' + Ln(l) + '"][href="' + Ln(e) + '"]', f = c;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ki(e);
      }
      if (!Fn.has(f) && (e = v({ rel: "modulepreload", href: e }, t), Fn.set(f, e), r.querySelector(c) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(ql(f)))
              return;
        }
        l = r.createElement("link"), rn(l, "link", e), mt(l), r.head.appendChild(l);
      }
    }
  }
  function dE(e, t, r) {
    Oa.S(e, t, r);
    var l = zi;
    if (l && e) {
      var c = zt(l).hoistableStyles, f = Oi(e);
      t = t || "default";
      var x = c.get(f);
      if (!x) {
        var j = { loading: 0, preload: null };
        if (x = l.querySelector(
          Hl(f)
        ))
          j.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            r
          ), (r = Fn.get(f)) && Vd(e, r);
          var L = x = l.createElement("link");
          mt(L), rn(L, "link", e), L._p = new Promise(function(G, ae) {
            L.onload = G, L.onerror = ae;
          }), L.addEventListener("load", function() {
            j.loading |= 1;
          }), L.addEventListener("error", function() {
            j.loading |= 2;
          }), j.loading |= 4, Do(x, t, l);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: j
        }, c.set(f, x);
      }
    }
  }
  function fE(e, t) {
    Oa.X(e, t);
    var r = zi;
    if (r && e) {
      var l = zt(r).hoistableScripts, c = ki(e), f = l.get(c);
      f || (f = r.querySelector(ql(c)), f || (e = v({ src: e, async: !0 }, t), (t = Fn.get(c)) && $d(e, t), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(c, f));
    }
  }
  function hE(e, t) {
    Oa.M(e, t);
    var r = zi;
    if (r && e) {
      var l = zt(r).hoistableScripts, c = ki(e), f = l.get(c);
      f || (f = r.querySelector(ql(c)), f || (e = v({ src: e, async: !0, type: "module" }, t), (t = Fn.get(c)) && $d(e, t), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(c, f));
    }
  }
  function Eg(e, t, r, l) {
    var c = (c = ge.current) ? Ao(c) : null;
    if (!c) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (t = Oi(r.href), r = zt(
          c
        ).hoistableStyles, l = r.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Oi(r.href);
          var f = zt(
            c
          ).hoistableStyles, x = f.get(e);
          if (x || (c = c.ownerDocument || c, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, x), (f = c.querySelector(
            Hl(e)
          )) && !f._p && (x.instance = f, x.state.loading = 5), Fn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Fn.set(e, r), f || mE(
            c,
            e,
            r,
            x.state
          ))), t && l === null)
            throw Error(s(528, ""));
          return x;
        }
        if (t && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = r.async, r = r.src, typeof r == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ki(r), r = zt(
          c
        ).hoistableScripts, l = r.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function Oi(e) {
    return 'href="' + Ln(e) + '"';
  }
  function Hl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function jg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function mE(e, t, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), rn(t, "link", r), mt(t), e.head.appendChild(t));
  }
  function ki(e) {
    return '[src="' + Ln(e) + '"]';
  }
  function ql(e) {
    return "script[async]" + e;
  }
  function Ng(e, t, r) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Ln(r.href) + '"]'
          );
          if (l)
            return t.instance = l, mt(l), l;
          var c = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), mt(l), rn(l, "style", c), Do(l, r.precedence, e), t.instance = l;
        case "stylesheet":
          c = Oi(r.href);
          var f = e.querySelector(
            Hl(c)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, mt(f), f;
          l = jg(r), (c = Fn.get(c)) && Vd(l, c), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var x = f;
          return x._p = new Promise(function(j, L) {
            x.onload = j, x.onerror = L;
          }), rn(f, "link", l), t.state.loading |= 4, Do(f, r.precedence, e), t.instance = f;
        case "script":
          return f = ki(r.src), (c = e.querySelector(
            ql(f)
          )) ? (t.instance = c, mt(c), c) : (l = r, (c = Fn.get(f)) && (l = v({}, r), $d(l, c)), e = e.ownerDocument || e, c = e.createElement("script"), mt(c), rn(c, "link", l), e.head.appendChild(c), t.instance = c);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Do(l, r.precedence, e));
    return t.instance;
  }
  function Do(e, t, r) {
    for (var l = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = l.length ? l[l.length - 1] : null, f = c, x = 0; x < l.length; x++) {
      var j = l[x];
      if (j.dataset.precedence === t) f = j;
      else if (f !== c) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = r.nodeType === 9 ? r.head : r, t.insertBefore(e, t.firstChild));
  }
  function Vd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function $d(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var zo = null;
  function Tg(e, t, r) {
    if (zo === null) {
      var l = /* @__PURE__ */ new Map(), c = zo = /* @__PURE__ */ new Map();
      c.set(r, l);
    } else
      c = zo, l = c.get(r), l || (l = /* @__PURE__ */ new Map(), c.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), c = 0; c < r.length; c++) {
      var f = r[c];
      if (!(f[$e] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = f.getAttribute(t) || "";
        x = e + x;
        var j = l.get(x);
        j ? j.push(f) : l.set(x, [f]);
      }
    }
    return l;
  }
  function Cg(e, t, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function pE(e, t, r) {
    if (r === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Rg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function vE(e, t, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var c = Oi(l.href), f = t.querySelector(
          Hl(c)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Oo.bind(e), t.then(e, e)), r.state.loading |= 4, r.instance = f, mt(f);
          return;
        }
        f = t.ownerDocument || t, l = jg(l), (c = Fn.get(c)) && Vd(l, c), f = f.createElement("link"), mt(f);
        var x = f;
        x._p = new Promise(function(j, L) {
          x.onload = j, x.onerror = L;
        }), rn(f, "link", l), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, t), (t = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Oo.bind(e), t.addEventListener("load", r), t.addEventListener("error", r));
    }
  }
  var Hd = 0;
  function gE(e, t) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Hd === 0 && (Hd = 62500 * Zw());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Hd ? 50 : 800) + t
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(c);
      };
    } : null;
  }
  function Oo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Lo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ko = null;
  function Lo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ko = /* @__PURE__ */ new Map(), t.forEach(yE, e), ko = null, Oo.call(e));
  }
  function yE(e, t) {
    if (!(t.state.loading & 4)) {
      var r = ko.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), ko.set(e, r);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < c.length; f++) {
          var x = c[f];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), l = x);
        }
        l && r.set(null, l);
      }
      c = t.instance, x = c.getAttribute("data-precedence"), f = r.get(x) || l, f === l && r.set(null, c), r.set(x, c), this.count++, l = Oo.bind(this), c.addEventListener("load", l), c.addEventListener("error", l), f ? f.parentNode.insertBefore(c, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Il = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function bE(e, t, r, l, c, f, x, j, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = l, this.onUncaughtError = c, this.onCaughtError = f, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Mg(e, t, r, l, c, f, x, j, L, G, ae, se) {
    return e = new bE(
      e,
      t,
      r,
      x,
      L,
      G,
      ae,
      se,
      j
    ), t = 1, f === !0 && (t |= 24), f = jn(3, null, null, t), e.current = f, f.stateNode = e, t = xu(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: t
    }, ju(f), e;
  }
  function _g(e) {
    return e ? (e = fi, e) : fi;
  }
  function Ag(e, t, r, l, c, f) {
    c = _g(c), l.context === null ? l.context = c : l.pendingContext = c, l = Ka(t), l.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (l.callback = f), r = Qa(e, l, t), r !== null && (bn(r, e, t), Sl(r, e, t));
  }
  function Dg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function qd(e, t) {
    Dg(e, t), (e = e.alternate) && Dg(e, t);
  }
  function zg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _r(e, 67108864);
      t !== null && bn(t, e, 67108864), qd(e, 67108864);
    }
  }
  function Og(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Mn();
      t = V(t);
      var r = _r(e, t);
      r !== null && bn(r, e, t), qd(e, t);
    }
  }
  var Uo = !0;
  function xE(e, t, r, l) {
    var c = A.T;
    A.T = null;
    var f = N.p;
    try {
      N.p = 2, Id(e, t, r, l);
    } finally {
      N.p = f, A.T = c;
    }
  }
  function SE(e, t, r, l) {
    var c = A.T;
    A.T = null;
    var f = N.p;
    try {
      N.p = 8, Id(e, t, r, l);
    } finally {
      N.p = f, A.T = c;
    }
  }
  function Id(e, t, r, l) {
    if (Uo) {
      var c = Fd(l);
      if (c === null)
        Md(
          e,
          t,
          l,
          Bo,
          r
        ), Lg(e, l);
      else if (EE(
        c,
        e,
        t,
        r,
        l
      ))
        l.stopPropagation();
      else if (Lg(e, l), t & 4 && -1 < wE.indexOf(e)) {
        for (; c !== null; ) {
          var f = St(c);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var x = hn(f.pendingLanes);
                  if (x !== 0) {
                    var j = f;
                    for (j.pendingLanes |= 2, j.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - Yt(x);
                      j.entanglements[1] |= L, x &= ~L;
                    }
                    ha(f), (et & 6) === 0 && (xo = qt() + 500, Ul(0));
                  }
                }
                break;
              case 31:
              case 13:
                j = _r(f, 2), j !== null && bn(j, f, 2), wo(), qd(f, 2);
            }
          if (f = Fd(l), f === null && Md(
            e,
            t,
            l,
            Bo,
            r
          ), f === c) break;
          c = f;
        }
        c !== null && l.stopPropagation();
      } else
        Md(
          e,
          t,
          l,
          null,
          r
        );
    }
  }
  function Fd(e) {
    return e = Gc(e), Yd(e);
  }
  var Bo = null;
  function Yd(e) {
    if (Bo = null, e = it(e), e !== null) {
      var t = u(e);
      if (t === null) e = null;
      else {
        var r = t.tag;
        if (r === 13) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (r === 31) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (r === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Bo = e, null;
  }
  function kg(e) {
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
          case Ke:
            return 8;
          case tt:
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
  var Gd = !1, sr = null, or = null, cr = null, Fl = /* @__PURE__ */ new Map(), Yl = /* @__PURE__ */ new Map(), ur = [], wE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Lg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        sr = null;
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
        Fl.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Yl.delete(t.pointerId);
    }
  }
  function Gl(e, t, r, l, c, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: f,
      targetContainers: [c]
    }, t !== null && (t = St(t), t !== null && zg(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function EE(e, t, r, l, c) {
    switch (t) {
      case "focusin":
        return sr = Gl(
          sr,
          e,
          t,
          r,
          l,
          c
        ), !0;
      case "dragenter":
        return or = Gl(
          or,
          e,
          t,
          r,
          l,
          c
        ), !0;
      case "mouseover":
        return cr = Gl(
          cr,
          e,
          t,
          r,
          l,
          c
        ), !0;
      case "pointerover":
        var f = c.pointerId;
        return Fl.set(
          f,
          Gl(
            Fl.get(f) || null,
            e,
            t,
            r,
            l,
            c
          )
        ), !0;
      case "gotpointercapture":
        return f = c.pointerId, Yl.set(
          f,
          Gl(
            Yl.get(f) || null,
            e,
            t,
            r,
            l,
            c
          )
        ), !0;
    }
    return !1;
  }
  function Ug(e) {
    var t = it(e.target);
    if (t !== null) {
      var r = u(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = h(r), t !== null) {
            e.blockedOn = t, de(e.priority, function() {
              Og(r);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(r), t !== null) {
            e.blockedOn = t, de(e.priority, function() {
              Og(r);
            });
            return;
          }
        } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Vo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = Fd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        Yc = l, r.target.dispatchEvent(l), Yc = null;
      } else
        return t = St(r), t !== null && zg(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function Bg(e, t, r) {
    Vo(e) && r.delete(t);
  }
  function jE() {
    Gd = !1, sr !== null && Vo(sr) && (sr = null), or !== null && Vo(or) && (or = null), cr !== null && Vo(cr) && (cr = null), Fl.forEach(Bg), Yl.forEach(Bg);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Gd || (Gd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      jE
    )));
  }
  var Ho = null;
  function Vg(e) {
    Ho !== e && (Ho = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ho === e && (Ho = null);
        for (var t = 0; t < e.length; t += 3) {
          var r = e[t], l = e[t + 1], c = e[t + 2];
          if (typeof l != "function") {
            if (Yd(l || r) === null)
              continue;
            break;
          }
          var f = St(r);
          f !== null && (e.splice(t, 3), t -= 3, Fu(
            f,
            {
              pending: !0,
              data: c,
              method: r.method,
              action: l
            },
            l,
            c
          ));
        }
      }
    ));
  }
  function Li(e) {
    function t(L) {
      return $o(L, e);
    }
    sr !== null && $o(sr, e), or !== null && $o(or, e), cr !== null && $o(cr, e), Fl.forEach(t), Yl.forEach(t);
    for (var r = 0; r < ur.length; r++) {
      var l = ur[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      Ug(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var c = r[l], f = r[l + 1], x = c[ve] || null;
        if (typeof f == "function")
          x || Vg(r);
        else if (x) {
          var j = null;
          if (f && f.hasAttribute("formAction")) {
            if (c = f, x = f[ve] || null)
              j = x.formAction;
            else if (Yd(c) !== null) continue;
          } else j = x.action;
          typeof j == "function" ? r[l + 1] = j : (r.splice(l, 3), l -= 3), Vg(r);
        }
      }
  }
  function $g() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(x) {
            return c = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      c !== null && (c(), c = null), l || setTimeout(r, 20);
    }
    function r() {
      if (!l && !navigation.transition) {
        var f = navigation.currentEntry;
        f && f.url != null && navigation.navigate(f.url, {
          state: f.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, c = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(r, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), c !== null && (c(), c = null);
      };
    }
  }
  function Xd(e) {
    this._internalRoot = e;
  }
  qo.prototype.render = Xd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var r = t.current, l = Mn();
    Ag(r, l, e, t, null, null);
  }, qo.prototype.unmount = Xd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Ag(e.current, 2, null, e, null, null), wo(), t[Ee] = null;
    }
  };
  function qo(e) {
    this._internalRoot = e;
  }
  qo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ue();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < ur.length && t !== 0 && t < ur[r].priority; r++) ;
      ur.splice(r, 0, e), r === 0 && Ug(e);
    }
  };
  var Hg = a.version;
  if (Hg !== "19.2.5")
    throw Error(
      s(
        527,
        Hg,
        "19.2.5"
      )
    );
  N.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var NE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Io = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Io.isDisabled && Io.supportsFiber)
      try {
        Zn = Io.inject(
          NE
        ), Wt = Io;
      } catch {
      }
  }
  return Pl.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var r = !1, l = "", c = Pp, f = Kp, x = Qp;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (c = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (x = t.onRecoverableError)), t = Mg(
      e,
      1,
      !1,
      null,
      null,
      r,
      l,
      null,
      c,
      f,
      x,
      $g
    ), e[Ee] = t.current, Rd(e), new Xd(t);
  }, Pl.hydrateRoot = function(e, t, r) {
    if (!o(e)) throw Error(s(299));
    var l = !1, c = "", f = Pp, x = Kp, j = Qp, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (j = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), t = Mg(
      e,
      1,
      !0,
      t,
      r ?? null,
      l,
      c,
      L,
      f,
      x,
      j,
      $g
    ), t.context = _g(null), r = t.current, l = Mn(), l = V(l), c = Ka(l), c.callback = null, Qa(r, c, l), r = l, t.current.lanes = r, rt(t, r), ha(t), e[Ee] = t.current, Rd(e), new qo(t);
  }, Pl.version = "19.2.5", Pl;
}
var Zg;
function LE() {
  if (Zg) return Qd.exports;
  Zg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Qd.exports = kE(), Qd.exports;
}
var UE = LE();
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
var Yb = (n) => {
  throw TypeError(n);
}, BE = (n, a, i) => a.has(n) || Yb("Cannot " + i), ef = (n, a, i) => (BE(n, a, "read from private field"), i ? i.call(n) : a.get(n)), VE = (n, a, i) => a.has(n) ? Yb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, i);
function Jg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function $E(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: s = !1 } = n, o;
  o = a.map(
    (E, w) => b(
      E,
      typeof E == "string" ? null : E.state,
      w === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let u = g(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function g(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function p() {
    return o[u];
  }
  function b(E, w = null, T, R) {
    let C = Ff(
      o ? p().pathname : "/",
      E,
      w,
      T,
      R
    );
    return _t(
      C.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        E
      )}`
    ), C;
  }
  function v(E) {
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
    createHref: v,
    createURL(E) {
      return new URL(v(E), "http://localhost");
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
      let T = Jg(E) ? E : b(E, w);
      u += 1, o.splice(u, o.length, T), s && m && m({ action: h, location: T, delta: 1 });
    },
    replace(E, w) {
      h = "REPLACE";
      let T = Jg(E) ? E : b(E, w);
      o[u] = T, s && m && m({ action: h, location: T, delta: 0 });
    },
    go(E) {
      h = "POP";
      let w = g(u + E), T = o[w];
      u = w, m && m({ action: h, location: T, delta: E });
    },
    listen(E) {
      return m = E, () => {
        m = null;
      };
    }
  };
}
function qe(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function _t(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function HE() {
  return Math.random().toString(36).substring(2, 10);
}
function Ff(n, a, i = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ia(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || HE(),
    unstable_mask: o
  };
}
function pa({
  pathname: n = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i), n;
}
function ia(n) {
  let a = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && (a.hash = n.substring(i), n = n.substring(0, i));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function qE(n, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), qe(i, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : pa(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = i + s), new URL(s, i);
}
var ls, Wg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (VE(this, ls, /* @__PURE__ */ new Map()), n)
      for (let [a, i] of n)
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
  get(n) {
    if (ef(this, ls).has(n))
      return ef(this, ls).get(n);
    if (n.defaultValue !== void 0)
      return n.defaultValue;
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
  set(n, a) {
    ef(this, ls).set(n, a);
  }
};
ls = /* @__PURE__ */ new WeakMap();
var IE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function FE(n) {
  return IE.has(
    n
  );
}
var YE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function GE(n) {
  return YE.has(
    n
  );
}
function XE(n) {
  return n.index === !0;
}
function hs(n, a, i = [], s = {}, o = !1) {
  return n.map((u, h) => {
    let m = [...i, String(h)], g = typeof u.id == "string" ? u.id : m.join("-");
    if (qe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), qe(
      o || !s[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), XE(u)) {
      let p = {
        ...u,
        id: g
      };
      return s[g] = ey(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: g,
        children: void 0
      };
      return s[g] = ey(
        p,
        a(p)
      ), u.children && (p.children = hs(
        u.children,
        a,
        m,
        s,
        o
      )), p;
    }
  });
}
function ey(n, a) {
  return Object.assign(n, {
    ...a,
    ...typeof a.lazy == "object" && a.lazy != null ? {
      lazy: {
        ...n.lazy,
        ...a.lazy
      }
    } : {}
  });
}
function vr(n, a, i = "/") {
  return ss(n, a, i, !1);
}
function ss(n, a, i, s) {
  let o = typeof a == "string" ? ia(a) : a, u = Kn(o.pathname || "/", i);
  if (u == null)
    return null;
  let h = Gb(n);
  KE(h);
  let m = null;
  for (let g = 0; m == null && g < h.length; ++g) {
    let p = lj(u);
    m = rj(
      h[g],
      p,
      s
    );
  }
  return m;
}
function PE(n, a) {
  let { route: i, pathname: s, params: o } = n;
  return {
    id: i.id,
    pathname: s,
    params: o,
    data: a[i.id],
    loaderData: a[i.id],
    handle: i.handle
  };
}
function Gb(n, a = [], i = [], s = "", o = !1) {
  let u = (h, m, g = o, p) => {
    let b = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(s) && g)
        return;
      qe(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(s.length);
    }
    let v = Gn([s, b.relativePath]), S = i.concat(b);
    h.children && h.children.length > 0 && (qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Gb(
      h.children,
      a,
      S,
      v,
      g
    )), !(h.path == null && !h.index) && a.push({
      path: v,
      score: nj(v, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      u(h, m);
    else
      for (let g of Xb(h.path))
        u(h, m, !0, g);
  }), a;
}
function Xb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [i, ...s] = a, o = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [u, ""] : [u];
  let h = Xb(s.join("/")), m = [];
  return m.push(
    ...h.map(
      (g) => g === "" ? u : [u, g].join("/")
    )
  ), o && m.push(...h), m.map(
    (g) => n.startsWith("/") && g === "" ? "/" : g
  );
}
function KE(n) {
  n.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : aj(
      a.routesMeta.map((s) => s.childrenIndex),
      i.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var QE = /^:[\w-]+$/, ZE = 3, JE = 2, WE = 1, ej = 10, tj = -2, ty = (n) => n === "*";
function nj(n, a) {
  let i = n.split("/"), s = i.length;
  return i.some(ty) && (s += tj), a && (s += JE), i.filter((o) => !ty(o)).reduce(
    (o, u) => o + (QE.test(u) ? ZE : u === "" ? WE : ej),
    s
  );
}
function aj(n, a) {
  return n.length === a.length && n.slice(0, -1).every((s, o) => s === a[o]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    n[n.length - 1] - a[a.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function rj(n, a, i = !1) {
  let { routesMeta: s } = n, o = {}, u = "/", h = [];
  for (let m = 0; m < s.length; ++m) {
    let g = s[m], p = m === s.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = pc(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: p },
      b
    ), S = g.route;
    if (!v && p && i && !s[s.length - 1].route.index && (v = pc(
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
      pathname: Gn([u, v.pathname]),
      pathnameBase: cj(
        Gn([u, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (u = Gn([u, v.pathnameBase]));
  }
  return h;
}
function pc(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, s] = ij(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(i);
  if (!o) return null;
  let u = o[0], h = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
      (p, { paramName: b, isOptional: v }, S) => {
        if (b === "*") {
          let w = m[S] || "";
          h = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const E = m[S];
        return v && !E ? p[b] = void 0 : p[b] = (E || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: h,
    pattern: n
  };
}
function ij(n, a = !1, i = !0) {
  _t(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, g, p, b) => {
      if (s.push({ paramName: m, isOptional: g != null }), g) {
        let v = b.charAt(p + h.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function lj(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return _t(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function Kn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(i);
  return s && s !== "/" ? null : n.slice(i) || "/";
}
function sj({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : Gn([n, a]);
}
var Pb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, bh = (n) => Pb.test(n);
function oj(n, a = "/") {
  let {
    pathname: i,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? ia(n) : n, u;
  return i ? (i = Sh(i), i.startsWith("/") ? u = ny(i.substring(1), "/") : u = ny(i, a)) : u = a, {
    pathname: u,
    search: uj(s),
    hash: dj(o)
  };
}
function ny(n, a) {
  let i = vc(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function tf(n, a, i, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Kb(n) {
  return n.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function xh(n) {
  let a = Kb(n);
  return a.map(
    (i, s) => s === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Rc(n, a, i, s = !1) {
  let o;
  typeof n == "string" ? o = ia(n) : (o = { ...n }, qe(
    !o.pathname || !o.pathname.includes("?"),
    tf("?", "pathname", "search", o)
  ), qe(
    !o.pathname || !o.pathname.includes("#"),
    tf("#", "pathname", "hash", o)
  ), qe(
    !o.search || !o.search.includes("#"),
    tf("#", "search", "hash", o)
  ));
  let u = n === "" || o.pathname === "", h = u ? "/" : o.pathname, m;
  if (h == null)
    m = i;
  else {
    let v = a.length - 1;
    if (!s && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let g = oj(o, m), p = h && h !== "/" && h.endsWith("/"), b = (u || h === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (p || b) && (g.pathname += "/"), g;
}
var Sh = (n) => n.replace(/\/\/+/g, "/"), Gn = (n) => Sh(n.join("/")), vc = (n) => n.replace(/\/+$/, ""), cj = (n) => vc(n).replace(/^\/*/, "/"), uj = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, dj = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, fj = (n, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let s = new Headers(i.headers);
  return s.set("Location", n), new Response(null, { ...i, headers: s });
}, Mc = class {
  constructor(n, a, i, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function ms(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function Ss(n) {
  let a = n.map((i) => i.route.path).filter(Boolean);
  return Gn(a) || "/";
}
var Qb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Zb(n, a) {
  let i = n;
  if (typeof i != "string" || !Pb.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let s = i, o = !1;
  if (Qb)
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
    absoluteURL: s,
    isExternal: o,
    to: i
  };
}
var yr = Symbol("Uninstrumented");
function hj(n, a) {
  let i = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  n.forEach(
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
  let s = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let o = Fi(i.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let h = o[u], m = i[`lazy.${u}`];
      if (typeof h == "function" && m.length > 0) {
        let g = Fi(m, h, () => {
        });
        g && (s.lazy = Object.assign(s.lazy || {}, {
          [u]: g
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let u = a[o];
    if (typeof u == "function" && i[o].length > 0) {
      let h = u[yr] ?? u, m = Fi(
        i[o],
        h,
        (...g) => ay(g[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yr] = h, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let u = o[yr] ?? o, h = Fi(
      i.middleware,
      u,
      (...m) => ay(m[0])
    );
    return h ? (h[yr] = u, h) : o;
  })), s;
}
function mj(n, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let u = Object.keys(o);
        for (let h of u)
          o[h] && i[h].push(o[h]);
      }
    })
  ), i.navigate.length > 0) {
    let s = n.navigate[yr] ?? n.navigate, o = Fi(
      i.navigate,
      s,
      (...u) => {
        let [h, m] = u;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? pa(h) : ".",
          ...ry(n, m ?? {})
        };
      }
    );
    o && (o[yr] = s, n.navigate = o);
  }
  if (i.fetch.length > 0) {
    let s = n.fetch[yr] ?? n.fetch, o = Fi(i.fetch, s, (...u) => {
      let [h, , m, g] = u;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...ry(n, g ?? {})
      };
    });
    o && (o[yr] = s, n.fetch = o);
  }
  return n;
}
function Fi(n, a, i) {
  return n.length === 0 ? null : async (...s) => {
    let o = await Jb(
      n,
      i(...s),
      () => a(...s),
      n.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function Jb(n, a, i, s) {
  let o = n[s], u;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = Jb(n, a, i, s - 1), u = await h, qe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (g) {
      console.error("An instrumentation function threw an error:", g);
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
function ay(n) {
  let { request: a, context: i, params: s, unstable_pattern: o } = n;
  return {
    request: pj(a),
    params: { ...s },
    unstable_pattern: o,
    context: vj(i)
  };
}
function ry(n, a) {
  return {
    currentUrl: pa(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function pj(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function vj(n) {
  if (yj(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var gj = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function yj(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === gj;
}
var Wb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], bj = new Set(
  Wb
), xj = [
  "GET",
  ...Wb
], Sj = new Set(xj), ex = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), wj = /* @__PURE__ */ new Set([307, 308]), nf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Ej = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Kl = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, jj = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), tx = "remix-router-transitions", nx = Symbol("ResetLoaderData");
function Nj(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  qe(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || jj, u = o;
  if (n.unstable_instrumentations) {
    let O = n.unstable_instrumentations;
    u = (V) => ({
      ...o(V),
      ...hj(
        O.map((F) => F.route).filter(Boolean),
        V
      )
    });
  }
  let h = {}, m = hs(
    n.routes,
    u,
    void 0,
    h
  ), g, p = n.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = n.dataStrategy || _j, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, E = /* @__PURE__ */ new Set(), w = null, T = null, R = null, C = n.hydrationData != null, k = vr(m, n.history.location, p), _ = !1, z = null, K, ee;
  if (k == null && !n.patchRoutesOnNavigation) {
    let O = Yn(404, {
      pathname: n.history.location.pathname
    }), { matches: V, route: F } = Fo(m);
    K = !0, ee = !K, k = V, z = { [F.id]: O };
  } else if (k && !n.hydrationData && wn(
    k,
    m,
    n.history.location.pathname
  ).active && (k = null), k)
    if (k.some((O) => O.route.lazy))
      K = !1, ee = !K;
    else if (!k.some((O) => wh(O.route)))
      K = !0, ee = !K;
    else {
      let O = n.hydrationData ? n.hydrationData.loaderData : null, V = n.hydrationData ? n.hydrationData.errors : null, F = k;
      if (V) {
        let ue = k.findIndex(
          (de) => V[de.route.id] !== void 0
        );
        F = F.slice(0, ue + 1);
      }
      ee = !1, K = !0, F.forEach((ue) => {
        let de = ax(ue.route, O, V);
        ee = ee || de.renderFallback, K = K && !de.shouldLoad;
      });
    }
  else {
    K = !1, ee = !K, k = [];
    let O = wn(
      null,
      m,
      n.history.location.pathname
    );
    O.active && O.matches && (_ = !0, k = O.matches);
  }
  let te, D = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: k,
    initialized: K,
    renderFallback: ee,
    navigation: nf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || z,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, H = "POP", q = null, le = !1, re, J = !1, ce = /* @__PURE__ */ new Map(), W = null, A = !1, N = !1, U = /* @__PURE__ */ new Set(), I = /* @__PURE__ */ new Map(), ne = 0, M = -1, P = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), oe = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Set(), Ae = /* @__PURE__ */ new Map(), Me, Ve = null;
  function Jt() {
    if (S = n.history.listen(
      ({ action: O, location: V, delta: F }) => {
        if (Me) {
          Me(), Me = void 0;
          return;
        }
        _t(
          Ae.size === 0 || F != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ue = sa({
          currentLocation: D.location,
          nextLocation: V,
          historyAction: O
        });
        if (ue && F != null) {
          let de = new Promise((Se) => {
            Me = Se;
          });
          n.history.go(F * -1), Jn(ue, {
            state: "blocked",
            location: V,
            proceed() {
              Jn(ue, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: V
              }), de.then(() => n.history.go(F));
            },
            reset() {
              let Se = new Map(D.blockers);
              Se.set(ue, Kl), We({ blockers: Se });
            }
          }), q?.resolve(), q = null;
          return;
        }
        return De(O, V);
      }
    ), i) {
      Pj(a, ce);
      let O = () => Kj(a, ce);
      a.addEventListener("pagehide", O), W = () => a.removeEventListener("pagehide", O);
    }
    return D.initialized || De("POP", D.location, {
      initialHydration: !0
    }), te;
  }
  function Pt() {
    S && S(), W && W(), E.clear(), re && re.abort(), D.fetchers.forEach((O, V) => Zn(V)), D.blockers.forEach((O, V) => va(V));
  }
  function At(O) {
    return E.add(O), () => E.delete(O);
  }
  function We(O, V = {}) {
    O.matches && (O.matches = O.matches.map((de) => {
      let Se = h[de.route.id], pe = de.route;
      return pe.element !== Se.element || pe.errorElement !== Se.errorElement || pe.hydrateFallbackElement !== Se.hydrateFallbackElement ? {
        ...de,
        route: Se
      } : de;
    })), D = {
      ...D,
      ...O
    };
    let F = [], ue = [];
    D.fetchers.forEach((de, Se) => {
      de.state === "idle" && (ge.has(Se) ? F.push(Se) : ue.push(Se));
    }), ge.forEach((de) => {
      !D.fetchers.has(de) && !I.has(de) && F.push(de);
    }), [...E].forEach(
      (de) => de(D, {
        deletedFetchers: F,
        newErrors: O.errors ?? null,
        viewTransitionOpts: V.viewTransitionOpts,
        flushSync: V.flushSync === !0
      })
    ), F.forEach((de) => Zn(de)), ue.forEach((de) => D.fetchers.delete(de));
  }
  function pt(O, V, { flushSync: F } = {}) {
    let ue = D.actionData != null && D.navigation.formMethod != null && cn(D.navigation.formMethod) && D.navigation.state === "loading" && O.state?._isRedirect !== !0, de;
    V.actionData ? Object.keys(V.actionData).length > 0 ? de = V.actionData : de = null : ue ? de = D.actionData : de = null;
    let Se = V.loaderData ? py(
      D.loaderData,
      V.loaderData,
      V.matches || [],
      V.errors
    ) : D.loaderData, pe = D.blockers;
    pe.size > 0 && (pe = new Map(pe), pe.forEach((Re, Ne) => pe.set(Ne, Kl)));
    let ve = A ? !1 : Gt(O, V.matches || D.matches), Ee = le === !0 || D.navigation.formMethod != null && cn(D.navigation.formMethod) && O.state?._isRedirect !== !0;
    g && (m = g, g = void 0), A || H === "POP" || (H === "PUSH" ? n.history.push(O, O.state) : H === "REPLACE" && n.history.replace(O, O.state));
    let be;
    if (H === "POP") {
      let Re = ce.get(D.location.pathname);
      Re && Re.has(O.pathname) ? be = {
        currentLocation: D.location,
        nextLocation: O
      } : ce.has(O.pathname) && (be = {
        currentLocation: O,
        nextLocation: D.location
      });
    } else if (J) {
      let Re = ce.get(D.location.pathname);
      Re ? Re.add(O.pathname) : (Re = /* @__PURE__ */ new Set([O.pathname]), ce.set(D.location.pathname, Re)), be = {
        currentLocation: D.location,
        nextLocation: O
      };
    }
    We(
      {
        ...V,
        // matches, errors, fetchers go through as-is
        actionData: de,
        loaderData: Se,
        historyAction: H,
        location: O,
        initialized: !0,
        renderFallback: !1,
        navigation: nf,
        revalidation: "idle",
        restoreScrollPosition: ve,
        preventScrollReset: Ee,
        blockers: pe
      },
      {
        viewTransitionOpts: be,
        flushSync: F === !0
      }
    ), H = "POP", le = !1, J = !1, A = !1, N = !1, q?.resolve(), q = null, Ve?.resolve(), Ve = null;
  }
  async function fe(O, V) {
    if (q?.resolve(), q = null, typeof O == "number") {
      q || (q = by());
      let ut = q.promise;
      return n.history.go(O), ut;
    }
    let F = Yf(
      D.location,
      D.matches,
      p,
      O,
      V?.fromRouteId,
      V?.relative
    ), { path: ue, submission: de, error: Se } = iy(
      !1,
      F,
      V
    ), pe;
    V?.unstable_mask && (pe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof V.unstable_mask == "string" ? ia(V.unstable_mask) : {
        ...D.location.unstable_mask,
        ...V.unstable_mask
      }
    });
    let ve = D.location, Ee = Ff(
      ve,
      ue,
      V && V.state,
      void 0,
      pe
    );
    Ee = {
      ...Ee,
      ...n.history.encodeLocation(Ee)
    };
    let be = V && V.replace != null ? V.replace : void 0, Re = "PUSH";
    be === !0 ? Re = "REPLACE" : be === !1 || de != null && cn(de.formMethod) && de.formAction === D.location.pathname + D.location.search && (Re = "REPLACE");
    let Ne = V && "preventScrollReset" in V ? V.preventScrollReset === !0 : void 0, Qe = (V && V.flushSync) === !0, $e = sa({
      currentLocation: ve,
      nextLocation: Ee,
      historyAction: Re
    });
    if ($e) {
      Jn($e, {
        state: "blocked",
        location: Ee,
        proceed() {
          Jn($e, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ee
          }), fe(O, V);
        },
        reset() {
          let ut = new Map(D.blockers);
          ut.set($e, Kl), We({ blockers: ut });
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
      replace: V && V.replace,
      enableViewTransition: V && V.viewTransition,
      flushSync: Qe,
      callSiteDefaultShouldRevalidate: V && V.unstable_defaultShouldRevalidate
    });
  }
  function ke() {
    Ve || (Ve = by()), tt(), We({ revalidation: "loading" });
    let O = Ve.promise;
    return D.navigation.state === "submitting" ? O : D.navigation.state === "idle" ? (De(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), O) : (De(
      H || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: J === !0
      }
    ), O);
  }
  async function De(O, V, F) {
    re && re.abort(), re = null, H = O, A = (F && F.startUninterruptedRevalidation) === !0, Dt(D.location, D.matches), le = (F && F.preventScrollReset) === !0, J = (F && F.enableViewTransition) === !0;
    let ue = g || m, de = F && F.overrideNavigation, Se = F?.initialHydration && D.matches && D.matches.length > 0 && !_ ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : vr(ue, V, p), pe = (F && F.flushSync) === !0;
    if (Se && D.initialized && !N && Bj(D.location, V) && !(F && F.submission && cn(F.submission.formMethod))) {
      pt(V, { matches: Se }, { flushSync: pe });
      return;
    }
    let ve = wn(Se, ue, V.pathname);
    if (ve.active && ve.matches && (Se = ve.matches), !Se) {
      let { error: it, notFoundMatches: St, route: Ie } = hn(
        V.pathname
      );
      pt(
        V,
        {
          matches: St,
          loaderData: {},
          errors: {
            [Ie.id]: it
          }
        },
        { flushSync: pe }
      );
      return;
    }
    re = new AbortController();
    let Ee = qi(
      n.history,
      V,
      re.signal,
      F && F.submission
    ), be = n.getContext ? await n.getContext() : new Wg(), Re;
    if (F && F.pendingError)
      Re = [
        gr(Se).route.id,
        { type: "error", error: F.pendingError }
      ];
    else if (F && F.submission && cn(F.submission.formMethod)) {
      let it = await Te(
        Ee,
        V,
        F.submission,
        Se,
        be,
        ve.active,
        F && F.initialHydration === !0,
        { replace: F.replace, flushSync: pe }
      );
      if (it.shortCircuited)
        return;
      if (it.pendingActionResult) {
        let [St, Ie] = it.pendingActionResult;
        if (An(Ie) && ms(Ie.error) && Ie.error.status === 404) {
          re = null, pt(V, {
            matches: it.matches,
            loaderData: {},
            errors: {
              [St]: Ie.error
            }
          });
          return;
        }
      }
      Se = it.matches || Se, Re = it.pendingActionResult, de = af(V, F.submission), pe = !1, ve.active = !1, Ee = qi(
        n.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Ne,
      matches: Qe,
      loaderData: $e,
      errors: ut
    } = await bt(
      Ee,
      V,
      Se,
      be,
      ve.active,
      de,
      F && F.submission,
      F && F.fetcherSubmission,
      F && F.replace,
      F && F.initialHydration === !0,
      pe,
      Re,
      F && F.callSiteDefaultShouldRevalidate
    );
    Ne || (re = null, pt(V, {
      matches: Qe || Se,
      ...vy(Re),
      loaderData: $e,
      errors: ut
    }));
  }
  async function Te(O, V, F, ue, de, Se, pe, ve = {}) {
    tt();
    let Ee = Gj(V, F);
    if (We({ navigation: Ee }, { flushSync: ve.flushSync === !0 }), Se) {
      let Ne = await rt(
        ue,
        V.pathname,
        O.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: $e, route: ut } = Fo(m);
          return {
            matches: $e,
            pendingActionResult: [
              ut.id,
              {
                type: "error",
                error: Ne.error
              }
            ]
          };
        }
        let Qe = gr(Ne.partialMatches).route.id;
        return {
          matches: Ne.partialMatches,
          pendingActionResult: [
            Qe,
            {
              type: "error",
              error: Ne.error
            }
          ]
        };
      } else if (Ne.matches)
        ue = Ne.matches;
      else {
        let { notFoundMatches: Qe, error: $e, route: ut } = hn(
          V.pathname
        );
        return {
          matches: Qe,
          pendingActionResult: [
            ut.id,
            {
              type: "error",
              error: $e
            }
          ]
        };
      }
    }
    let be, Re = sc(ue, V);
    if (!Re.route.action && !Re.route.lazy)
      be = {
        type: "error",
        error: Yn(405, {
          method: O.method,
          pathname: V.pathname,
          routeId: Re.route.id
        })
      };
    else {
      let Ne = Pi(
        u,
        h,
        O,
        V,
        ue,
        Re,
        pe ? [] : s,
        de
      ), Qe = await ze(
        O,
        V,
        Ne,
        de,
        null
      );
      if (be = Qe[Re.route.id], !be) {
        for (let $e of ue)
          if (Qe[$e.route.id]) {
            be = Qe[$e.route.id];
            break;
          }
      }
      if (O.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Yr(be)) {
      let Ne;
      return ve && ve.replace != null ? Ne = ve.replace : Ne = fy(
        be.response.headers.get("Location"),
        new URL(O.url),
        p,
        n.history
      ) === D.location.pathname + D.location.search, await ye(O, be, !0, {
        submission: F,
        replace: Ne
      }), { shortCircuited: !0 };
    }
    if (An(be)) {
      let Ne = gr(ue, Re.route.id);
      return (ve && ve.replace) !== !0 && (H = "PUSH"), {
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
  async function bt(O, V, F, ue, de, Se, pe, ve, Ee, be, Re, Ne, Qe) {
    let $e = Se || af(V, pe), ut = pe || ve || yy($e), it = !A && !be;
    if (de) {
      if (it) {
        let Ct = xt(Ne);
        We(
          {
            navigation: $e,
            ...Ct !== void 0 ? { actionData: Ct } : {}
          },
          {
            flushSync: Re
          }
        );
      }
      let He = await rt(
        F,
        V.pathname,
        O.signal
      );
      if (He.type === "aborted")
        return { shortCircuited: !0 };
      if (He.type === "error") {
        if (He.partialMatches.length === 0) {
          let { matches: sn, route: Ot } = Fo(m);
          return {
            matches: sn,
            loaderData: {},
            errors: {
              [Ot.id]: He.error
            }
          };
        }
        let Ct = gr(He.partialMatches).route.id;
        return {
          matches: He.partialMatches,
          loaderData: {},
          errors: {
            [Ct]: He.error
          }
        };
      } else if (He.matches)
        F = He.matches;
      else {
        let { error: Ct, notFoundMatches: sn, route: Ot } = hn(
          V.pathname
        );
        return {
          matches: sn,
          loaderData: {},
          errors: {
            [Ot.id]: Ct
          }
        };
      }
    }
    let St = g || m, { dsMatches: Ie, revalidatingFetchers: zt } = ly(
      O,
      ue,
      u,
      h,
      n.history,
      D,
      F,
      ut,
      V,
      be ? [] : s,
      be === !0,
      N,
      U,
      ge,
      oe,
      Q,
      St,
      p,
      n.patchRoutesOnNavigation != null,
      Ne,
      Qe
    );
    if (M = ++ne, !n.dataStrategy && !Ie.some((He) => He.shouldLoad) && !Ie.some(
      (He) => He.route.middleware && He.route.middleware.length > 0
    ) && zt.length === 0) {
      let He = ei();
      return pt(
        V,
        {
          matches: F,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ne && An(Ne[1]) ? { [Ne[0]]: Ne[1].error } : null,
          ...vy(Ne),
          ...He ? { fetchers: new Map(D.fetchers) } : {}
        },
        { flushSync: Re }
      ), { shortCircuited: !0 };
    }
    if (it) {
      let He = {};
      if (!de) {
        He.navigation = $e;
        let Ct = xt(Ne);
        Ct !== void 0 && (He.actionData = Ct);
      }
      zt.length > 0 && (He.fetchers = dn(zt)), We(He, { flushSync: Re });
    }
    zt.forEach((He) => {
      Tt(He.key), He.controller && I.set(He.key, He.controller);
    });
    let mt = () => zt.forEach((He) => Tt(He.key));
    re && re.signal.addEventListener(
      "abort",
      mt
    );
    let { loaderResults: qa, fetcherResults: Wn } = await Ke(
      Ie,
      zt,
      O,
      V,
      ue
    );
    if (O.signal.aborted)
      return { shortCircuited: !0 };
    re && re.signal.removeEventListener(
      "abort",
      mt
    ), zt.forEach((He) => I.delete(He.key));
    let Kt = Yo(qa);
    if (Kt)
      return await ye(O, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Kt = Yo(Wn), Kt)
      return Q.add(Kt.key), await ye(O, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: oa, errors: Nr } = my(
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
  function xt(O) {
    if (O && !An(O[1]))
      return {
        [O[0]]: O[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function dn(O) {
    return O.forEach((V) => {
      let F = D.fetchers.get(V.key), ue = Ql(
        void 0,
        F ? F.data : void 0
      );
      D.fetchers.set(V.key, ue);
    }), new Map(D.fetchers);
  }
  async function Ht(O, V, F, ue) {
    Tt(O);
    let de = (ue && ue.flushSync) === !0, Se = g || m, pe = Yf(
      D.location,
      D.matches,
      p,
      F,
      V,
      ue?.relative
    ), ve = vr(Se, pe, p), Ee = wn(ve, Se, pe);
    if (Ee.active && Ee.matches && (ve = Ee.matches), !ve) {
      Ft(
        O,
        V,
        Yn(404, { pathname: pe }),
        { flushSync: de }
      );
      return;
    }
    let { path: be, submission: Re, error: Ne } = iy(
      !0,
      pe,
      ue
    );
    if (Ne) {
      Ft(O, V, Ne, { flushSync: de });
      return;
    }
    let Qe = n.getContext ? await n.getContext() : new Wg(), $e = (ue && ue.preventScrollReset) === !0;
    if (Re && cn(Re.formMethod)) {
      await On(
        O,
        V,
        be,
        ve,
        Qe,
        Ee.active,
        de,
        $e,
        Re,
        ue && ue.unstable_defaultShouldRevalidate
      );
      return;
    }
    oe.set(O, { routeId: V, path: be }), await qt(
      O,
      V,
      be,
      ve,
      Qe,
      Ee.active,
      de,
      $e,
      Re
    );
  }
  async function On(O, V, F, ue, de, Se, pe, ve, Ee, be) {
    tt(), oe.delete(O);
    let Re = D.fetchers.get(O);
    It(O, Xj(Ee, Re), {
      flushSync: pe
    });
    let Ne = new AbortController(), Qe = qi(
      n.history,
      F,
      Ne.signal,
      Ee
    );
    if (Se) {
      let vt = await rt(
        ue,
        new URL(Qe.url).pathname,
        Qe.signal,
        O
      );
      if (vt.type === "aborted")
        return;
      if (vt.type === "error") {
        Ft(O, V, vt.error, { flushSync: pe });
        return;
      } else if (vt.matches)
        ue = vt.matches;
      else {
        Ft(
          O,
          V,
          Yn(404, { pathname: F }),
          { flushSync: pe }
        );
        return;
      }
    }
    let $e = sc(ue, F);
    if (!$e.route.action && !$e.route.lazy) {
      let vt = Yn(405, {
        method: Ee.formMethod,
        pathname: F,
        routeId: V
      });
      Ft(O, V, vt, { flushSync: pe });
      return;
    }
    I.set(O, Ne);
    let ut = ne, it = Pi(
      u,
      h,
      Qe,
      F,
      ue,
      $e,
      s,
      de
    ), St = await ze(
      Qe,
      F,
      it,
      de,
      O
    ), Ie = St[$e.route.id];
    if (!Ie) {
      for (let vt of it)
        if (St[vt.route.id]) {
          Ie = St[vt.route.id];
          break;
        }
    }
    if (Qe.signal.aborted) {
      I.get(O) === Ne && I.delete(O);
      return;
    }
    if (ge.has(O)) {
      if (Yr(Ie) || An(Ie)) {
        It(O, ka(void 0));
        return;
      }
    } else {
      if (Yr(Ie))
        if (I.delete(O), M > ut) {
          It(O, ka(void 0));
          return;
        } else
          return Q.add(O), It(O, Ql(Ee)), ye(Qe, Ie, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: ve
          });
      if (An(Ie)) {
        Ft(O, V, Ie.error);
        return;
      }
    }
    let zt = D.navigation.location || D.location, mt = qi(
      n.history,
      zt,
      Ne.signal
    ), qa = g || m, Wn = D.navigation.state !== "idle" ? vr(qa, D.navigation.location, p) : D.matches;
    qe(Wn, "Didn't find any matches after fetcher action");
    let Kt = ++ne;
    P.set(O, Kt);
    let oa = Ql(Ee, Ie.data);
    D.fetchers.set(O, oa);
    let { dsMatches: Nr, revalidatingFetchers: ca } = ly(
      mt,
      de,
      u,
      h,
      n.history,
      D,
      Wn,
      Ee,
      zt,
      s,
      !1,
      N,
      U,
      ge,
      oe,
      Q,
      qa,
      p,
      n.patchRoutesOnNavigation != null,
      [$e.route.id, Ie],
      be
    );
    ca.filter((vt) => vt.key !== O).forEach((vt) => {
      let ni = vt.key, ai = D.fetchers.get(ni), Ds = Ql(
        void 0,
        ai ? ai.data : void 0
      );
      D.fetchers.set(ni, Ds), Tt(ni), vt.controller && I.set(ni, vt.controller);
    }), We({ fetchers: new Map(D.fetchers) });
    let Tr = () => ca.forEach((vt) => Tt(vt.key));
    Ne.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ti, fetcherResults: He } = await Ke(
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
    ), P.delete(O), I.delete(O), ca.forEach((vt) => I.delete(vt.key)), D.fetchers.has(O)) {
      let vt = ka(Ie.data);
      D.fetchers.set(O, vt);
    }
    let Ct = Yo(ti);
    if (Ct)
      return ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    if (Ct = Yo(He), Ct)
      return Q.add(Ct.key), ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    let { loaderData: sn, errors: Ot } = my(
      D,
      Wn,
      ti,
      void 0,
      ca,
      He
    );
    Ha(Kt), D.navigation.state === "loading" && Kt > M ? (qe(H, "Expected pending action"), re && re.abort(), pt(D.navigation.location, {
      matches: Wn,
      loaderData: sn,
      errors: Ot,
      fetchers: new Map(D.fetchers)
    })) : (We({
      errors: Ot,
      loaderData: py(
        D.loaderData,
        sn,
        Wn,
        Ot
      ),
      fetchers: new Map(D.fetchers)
    }), N = !1);
  }
  async function qt(O, V, F, ue, de, Se, pe, ve, Ee) {
    let be = D.fetchers.get(O);
    It(
      O,
      Ql(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: pe }
    );
    let Re = new AbortController(), Ne = qi(
      n.history,
      F,
      Re.signal
    );
    if (Se) {
      let Ie = await rt(
        ue,
        new URL(Ne.url).pathname,
        Ne.signal,
        O
      );
      if (Ie.type === "aborted")
        return;
      if (Ie.type === "error") {
        Ft(O, V, Ie.error, { flushSync: pe });
        return;
      } else if (Ie.matches)
        ue = Ie.matches;
      else {
        Ft(
          O,
          V,
          Yn(404, { pathname: F }),
          { flushSync: pe }
        );
        return;
      }
    }
    let Qe = sc(ue, F);
    I.set(O, Re);
    let $e = ne, ut = Pi(
      u,
      h,
      Ne,
      F,
      ue,
      Qe,
      s,
      de
    ), it = await ze(
      Ne,
      F,
      ut,
      de,
      O
    ), St = it[Qe.route.id];
    if (!St) {
      for (let Ie of ue)
        if (it[Ie.route.id]) {
          St = it[Ie.route.id];
          break;
        }
    }
    if (I.get(O) === Re && I.delete(O), !Ne.signal.aborted) {
      if (ge.has(O)) {
        It(O, ka(void 0));
        return;
      }
      if (Yr(St))
        if (M > $e) {
          It(O, ka(void 0));
          return;
        } else {
          Q.add(O), await ye(Ne, St, !1, {
            preventScrollReset: ve
          });
          return;
        }
      if (An(St)) {
        Ft(O, V, St.error);
        return;
      }
      It(O, ka(St.data));
    }
  }
  async function ye(O, V, F, {
    submission: ue,
    fetcherSubmission: de,
    preventScrollReset: Se,
    replace: pe
  } = {}) {
    F || (q?.resolve(), q = null), V.response.headers.has("X-Remix-Revalidate") && (N = !0);
    let ve = V.response.headers.get("Location");
    qe(ve, "Expected a Location header on the redirect Response"), ve = fy(
      ve,
      new URL(O.url),
      p,
      n.history
    );
    let Ee = Ff(D.location, ve, {
      _isRedirect: !0
    });
    if (i) {
      let ut = !1;
      if (V.response.headers.has("X-Remix-Reload-Document"))
        ut = !0;
      else if (bh(ve)) {
        const it = qE(ve, !0);
        ut = // Hard reload if it's an absolute URL to a new origin
        it.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Kn(it.pathname, p) == null;
      }
      if (ut) {
        pe ? a.location.replace(ve) : a.location.assign(ve);
        return;
      }
    }
    re = null;
    let be = pe === !0 || V.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Re, formAction: Ne, formEncType: Qe } = D.navigation;
    !ue && !de && Re && Ne && Qe && (ue = yy(D.navigation));
    let $e = ue || de;
    if (wj.has(V.response.status) && $e && cn($e.formMethod))
      await De(be, Ee, {
        submission: {
          ...$e,
          formAction: ve
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || le,
        enableViewTransition: F ? J : void 0
      });
    else {
      let ut = af(
        Ee,
        ue
      );
      await De(be, Ee, {
        overrideNavigation: ut,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: de,
        // Preserve these flags across redirects
        preventScrollReset: Se || le,
        enableViewTransition: F ? J : void 0
      });
    }
  }
  async function ze(O, V, F, ue, de) {
    let Se, pe = {};
    try {
      Se = await Dj(
        b,
        O,
        V,
        F,
        de,
        ue,
        !1
      );
    } catch (ve) {
      return F.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        pe[Ee.route.id] = {
          type: "error",
          error: ve
        };
      }), pe;
    }
    if (O.signal.aborted)
      return pe;
    if (!cn(O.method))
      for (let ve of F) {
        if (Se[ve.route.id]?.type === "error")
          break;
        !Se.hasOwnProperty(ve.route.id) && !D.loaderData.hasOwnProperty(ve.route.id) && (!D.errors || !D.errors.hasOwnProperty(ve.route.id)) && ve.shouldCallHandler() && (Se[ve.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ve.route.id}`
          )
        });
      }
    for (let [ve, Ee] of Object.entries(Se))
      if (qj(Ee)) {
        let be = Ee.result;
        pe[ve] = {
          type: "redirect",
          response: Lj(
            be,
            O,
            ve,
            F,
            p
          )
        };
      } else
        pe[ve] = await kj(Ee);
    return pe;
  }
  async function Ke(O, V, F, ue, de) {
    let Se = ze(
      F,
      ue,
      O,
      de,
      null
    ), pe = Promise.all(
      V.map(async (be) => {
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
    ), ve = await Se, Ee = (await pe).reduce(
      (be, Re) => Object.assign(be, Re),
      {}
    );
    return {
      loaderResults: ve,
      fetcherResults: Ee
    };
  }
  function tt() {
    N = !0, oe.forEach((O, V) => {
      I.has(V) && U.add(V), Tt(V);
    });
  }
  function It(O, V, F = {}) {
    D.fetchers.set(O, V), We(
      { fetchers: new Map(D.fetchers) },
      { flushSync: (F && F.flushSync) === !0 }
    );
  }
  function Ft(O, V, F, ue = {}) {
    let de = gr(D.matches, V);
    Zn(O), We(
      {
        errors: {
          [de.route.id]: F
        },
        fetchers: new Map(D.fetchers)
      },
      { flushSync: (ue && ue.flushSync) === !0 }
    );
  }
  function jr(O) {
    return he.set(O, (he.get(O) || 0) + 1), ge.has(O) && ge.delete(O), D.fetchers.get(O) || Ej;
  }
  function la(O, V) {
    Tt(O, V?.reason), It(O, ka(null));
  }
  function Zn(O) {
    let V = D.fetchers.get(O);
    I.has(O) && !(V && V.state === "loading" && P.has(O)) && Tt(O), oe.delete(O), P.delete(O), Q.delete(O), ge.delete(O), U.delete(O), D.fetchers.delete(O);
  }
  function Wt(O) {
    let V = (he.get(O) || 0) - 1;
    V <= 0 ? (he.delete(O), ge.add(O)) : he.set(O, V), We({ fetchers: new Map(D.fetchers) });
  }
  function Tt(O, V) {
    let F = I.get(O);
    F && (F.abort(V), I.delete(O));
  }
  function Yt(O) {
    for (let V of O) {
      let F = jr(V), ue = ka(F.data);
      D.fetchers.set(V, ue);
    }
  }
  function ei() {
    let O = [], V = !1;
    for (let F of Q) {
      let ue = D.fetchers.get(F);
      qe(ue, `Expected fetcher: ${F}`), ue.state === "loading" && (Q.delete(F), O.push(F), V = !0);
    }
    return Yt(O), V;
  }
  function Ha(O) {
    let V = [];
    for (let [F, ue] of P)
      if (ue < O) {
        let de = D.fetchers.get(F);
        qe(de, `Expected fetcher: ${F}`), de.state === "loading" && (Tt(F), P.delete(F), V.push(F));
      }
    return Yt(V), V.length > 0;
  }
  function kn(O, V) {
    let F = D.blockers.get(O) || Kl;
    return Ae.get(O) !== V && Ae.set(O, V), F;
  }
  function va(O) {
    D.blockers.delete(O), Ae.delete(O);
  }
  function Jn(O, V) {
    let F = D.blockers.get(O) || Kl;
    qe(
      F.state === "unblocked" && V.state === "blocked" || F.state === "blocked" && V.state === "blocked" || F.state === "blocked" && V.state === "proceeding" || F.state === "blocked" && V.state === "unblocked" || F.state === "proceeding" && V.state === "unblocked",
      `Invalid blocker state transition: ${F.state} -> ${V.state}`
    );
    let ue = new Map(D.blockers);
    ue.set(O, V), We({ blockers: ue });
  }
  function sa({
    currentLocation: O,
    nextLocation: V,
    historyAction: F
  }) {
    if (Ae.size === 0)
      return;
    Ae.size > 1 && _t(!1, "A router only supports one blocker at a time");
    let ue = Array.from(Ae.entries()), [de, Se] = ue[ue.length - 1], pe = D.blockers.get(de);
    if (!(pe && pe.state === "proceeding") && Se({ currentLocation: O, nextLocation: V, historyAction: F }))
      return de;
  }
  function hn(O) {
    let V = Yn(404, { pathname: O }), F = g || m, { matches: ue, route: de } = Fo(F);
    return { notFoundMatches: ue, route: de, error: V };
  }
  function Oe(O, V, F) {
    if (w = O, R = V, T = F || null, !C && D.navigation === nf) {
      C = !0;
      let ue = Gt(D.location, D.matches);
      ue != null && We({ restoreScrollPosition: ue });
    }
    return () => {
      w = null, R = null, T = null;
    };
  }
  function ct(O, V) {
    return T && T(
      O,
      V.map((ue) => PE(ue, D.loaderData))
    ) || O.key;
  }
  function Dt(O, V) {
    if (w && R) {
      let F = ct(O, V);
      w[F] = R();
    }
  }
  function Gt(O, V) {
    if (w) {
      let F = ct(O, V), ue = w[F];
      if (typeof ue == "number")
        return ue;
    }
    return null;
  }
  function wn(O, V, F) {
    if (n.patchRoutesOnNavigation)
      if (O) {
        if (Object.keys(O[0].params).length > 0)
          return { active: !0, matches: ss(
            V,
            F,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ss(
          V,
          F,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function rt(O, V, F, ue) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: O };
    let de = O;
    for (; ; ) {
      let Se = g == null, pe = g || m, ve = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: F,
          path: V,
          matches: de,
          fetcherKey: ue,
          patch: (Re, Ne) => {
            F.aborted || sy(
              Re,
              Ne,
              pe,
              ve,
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
      let Ee = vr(pe, V, p), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = ss(
          pe,
          V,
          p,
          !0
        ), !(be && de.length < be.length && en(
          de,
          be.slice(0, de.length)
        )))
          return { type: "success", matches: Ee };
      }
      if (be || (be = ss(
        pe,
        V,
        p,
        !0
      )), !be || en(de, be))
        return { type: "success", matches: null };
      de = be;
    }
  }
  function en(O, V) {
    return O.length === V.length && O.every((F, ue) => F.route.id === V[ue].route.id);
  }
  function ga(O) {
    h = {}, g = hs(
      O,
      u,
      void 0,
      h
    );
  }
  function ln(O, V, F = !1) {
    let ue = g == null;
    sy(
      O,
      V,
      g || m,
      h,
      u,
      F
    ), ue && (m = [...m], We({}));
  }
  return te = {
    get basename() {
      return p;
    },
    get future() {
      return v;
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
    navigate: fe,
    fetch: Ht,
    revalidate: ke,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (O) => n.history.createHref(O),
    encodeLocation: (O) => n.history.encodeLocation(O),
    getFetcher: jr,
    resetFetcher: la,
    deleteFetcher: Wt,
    dispose: Pt,
    getBlocker: kn,
    deleteBlocker: va,
    patchRoutes: ln,
    _internalFetchControllers: I,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ga,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(O) {
      We(O);
    }
  }, n.unstable_instrumentations && (te = mj(
    te,
    n.unstable_instrumentations.map((O) => O.router).filter(Boolean)
  )), te;
}
function Tj(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function Yf(n, a, i, s, o, u) {
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
    s || ".",
    xh(h),
    Kn(n.pathname, i) || n.pathname,
    u === "path"
  );
  if (s == null && (g.search = n.search, g.hash = n.hash), (s == null || s === "" || s === ".") && m) {
    let p = jh(g.search);
    if (m.route.index && !p)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((E) => E).forEach((E) => b.append("index", E));
      let S = b.toString();
      g.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (g.pathname = sj({ basename: i, pathname: g.pathname })), pa(g);
}
function iy(n, a, i) {
  if (!i || !Tj(i))
    return { path: a };
  if (i.formMethod && !Yj(i.formMethod))
    return {
      path: a,
      error: Yn(405, { method: i.formMethod })
    };
  let s = () => ({
    path: a,
    error: Yn(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), h = ux(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!cn(u))
        return s();
      let v = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
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
          text: v
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!cn(u))
        return s();
      try {
        let v = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: h,
            formEncType: i.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return s();
      }
    }
  }
  qe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, g;
  if (i.formData)
    m = Xf(i.formData), g = i.formData;
  else if (i.body instanceof FormData)
    m = Xf(i.body), g = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, g = hy(m);
  else if (i.body == null)
    m = new URLSearchParams(), g = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), g = hy(m);
    } catch {
      return s();
    }
  let p = {
    formMethod: u,
    formAction: h,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (cn(p.formMethod))
    return { path: a, submission: p };
  let b = ia(a);
  return n && b.search && jh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: pa(b), submission: p };
}
function ly(n, a, i, s, o, u, h, m, g, p, b, v, S, E, w, T, R, C, k, _, z) {
  let K = _ ? An(_[1]) ? _[1].error : _[1].data : void 0, ee = o.createURL(u.location), te = o.createURL(g), D;
  if (b && u.errors) {
    let W = Object.keys(u.errors)[0];
    D = h.findIndex((A) => A.route.id === W);
  } else if (_ && An(_[1])) {
    let W = _[0];
    D = h.findIndex((A) => A.route.id === W) - 1;
  }
  let H = _ ? _[1].statusCode : void 0, q = H && H >= 400, le = {
    currentUrl: ee,
    currentParams: u.matches[0]?.params || {},
    nextUrl: te,
    nextParams: h[0].params,
    ...m,
    actionResult: K,
    actionStatus: H
  }, re = Ss(h), J = h.map((W, A) => {
    let { route: N } = W, U = null;
    if (D != null && A > D)
      U = !1;
    else if (N.lazy)
      U = !0;
    else if (!wh(N))
      U = !1;
    else if (b) {
      let { shouldLoad: P } = ax(
        N,
        u.loaderData,
        u.errors
      );
      U = P;
    } else Cj(u.loaderData, u.matches[A], W) && (U = !0);
    if (U !== null)
      return Gf(
        i,
        s,
        n,
        g,
        re,
        W,
        p,
        a,
        U
      );
    let I = !1;
    typeof z == "boolean" ? I = z : q ? I = !1 : (v || ee.pathname + ee.search === te.pathname + te.search || ee.search !== te.search || Rj(u.matches[A], W)) && (I = !0);
    let ne = {
      ...le,
      defaultShouldRevalidate: I
    }, M = cs(W, ne);
    return Gf(
      i,
      s,
      n,
      g,
      re,
      W,
      p,
      a,
      M,
      ne,
      z
    );
  }), ce = [];
  return w.forEach((W, A) => {
    if (b || !h.some((oe) => oe.route.id === W.routeId) || E.has(A))
      return;
    let N = u.fetchers.get(A), U = N && N.state !== "idle" && N.data === void 0, I = vr(R, W.path, C);
    if (!I) {
      if (k && U)
        return;
      ce.push({
        key: A,
        routeId: W.routeId,
        path: W.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (T.has(A))
      return;
    let ne = sc(I, W.path), M = new AbortController(), P = qi(
      o,
      W.path,
      M.signal
    ), Q = null;
    if (S.has(A))
      S.delete(A), Q = Pi(
        i,
        s,
        P,
        W.path,
        I,
        ne,
        p,
        a
      );
    else if (U)
      v && (Q = Pi(
        i,
        s,
        P,
        W.path,
        I,
        ne,
        p,
        a
      ));
    else {
      let oe;
      typeof z == "boolean" ? oe = z : q ? oe = !1 : oe = v;
      let he = {
        ...le,
        defaultShouldRevalidate: oe
      };
      cs(ne, he) && (Q = Pi(
        i,
        s,
        P,
        W.path,
        I,
        ne,
        p,
        a,
        he
      ));
    }
    Q && ce.push({
      key: A,
      routeId: W.routeId,
      path: W.path,
      matches: Q,
      match: ne,
      request: P,
      controller: M
    });
  }), { dsMatches: J, revalidatingFetchers: ce };
}
function wh(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function ax(n, a, i) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!wh(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = i != null && i[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let u = !s && !o;
  return { shouldLoad: u, renderFallback: u };
}
function Cj(n, a, i) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !n.hasOwnProperty(i.route.id);
  return s || o;
}
function Rj(n, a) {
  let i = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function cs(n, a) {
  if (n.route.shouldRevalidate) {
    let i = n.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function sy(n, a, i, s, o, u) {
  let h;
  if (n) {
    let p = s[n];
    qe(
      p,
      `No route found to patch children into: routeId = ${n}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = i;
  let m = [], g = [];
  if (a.forEach((p) => {
    let b = h.find(
      (v) => rx(p, v)
    );
    b ? g.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = hs(
      m,
      o,
      [n || "_", "patch", String(h?.length || "0")],
      s
    );
    h.push(...p);
  }
  if (u && g.length > 0)
    for (let p = 0; p < g.length; p++) {
      let { existingRoute: b, newRoute: v } = g[p], S = b, [E] = hs(
        [v],
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
function rx(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (i, s) => a.children?.some((o) => rx(i, o))
  ) ?? !1 : !1;
}
var oy = /* @__PURE__ */ new WeakMap(), ix = ({
  key: n,
  route: a,
  manifest: i,
  mapRouteProperties: s
}) => {
  let o = i[a.id];
  if (qe(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[n];
  if (!u)
    return;
  let h = oy.get(o);
  h || (h = {}, oy.set(o, h));
  let m = h[n];
  if (m)
    return m;
  let g = (async () => {
    let p = FE(n), v = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (p)
      _t(
        !p,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), h[n] = Promise.resolve();
    else if (v)
      _t(
        !1,
        `Route "${o.id}" has a static property "${n}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await u();
      S != null && (Object.assign(o, { [n]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[n] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[n] = g, g;
}, cy = /* @__PURE__ */ new WeakMap();
function Mj(n, a, i, s, o) {
  let u = i[n.id];
  if (qe(u, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let b = cy.get(u);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      qe(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), E = {};
      for (let w in S) {
        let T = S[w];
        if (T === void 0)
          continue;
        let R = GE(w), k = u[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        R ? _t(
          !R,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : k ? _t(
          !k,
          `Route "${u.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : E[w] = T;
      }
      Object.assign(u, E), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(u),
        lazy: void 0
      });
    })();
    return cy.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let h = Object.keys(n.lazy), m = [], g;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let v = ix({
      key: b,
      route: n,
      manifest: i,
      mapRouteProperties: s
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
async function uy(n) {
  let a = n.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    i[a[u].route.id] = o;
  }), i;
}
async function _j(n) {
  return n.matches.some((a) => a.route.middleware) ? lx(n, () => uy(n)) : uy(n);
}
function lx(n, a) {
  return Aj(
    n,
    a,
    (s) => {
      if (Fj(s))
        throw s;
      return s;
    },
    $j,
    i
  );
  function i(s, o, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [o]: { type: "error", result: s }
        })
      );
    {
      let { matches: h } = n, m = Math.min(
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
        [g]: { type: "error", result: s }
      });
    }
  }
}
async function Aj(n, a, i, s, o) {
  let { matches: u, ...h } = n, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await sx(
    h,
    m,
    a,
    i,
    s,
    o
  );
}
async function sx(n, a, i, s, o, u, h = 0) {
  let { request: m } = n;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let g = a[h];
  if (!g)
    return await i();
  let [p, b] = g, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await sx(
        n,
        a,
        i,
        s,
        o,
        u,
        h + 1
      ) }, v.value;
    } catch (E) {
      return v = { value: await u(E, p, v) }, v.value;
    }
  };
  try {
    let E = await b(n, S), w = E != null ? s(E) : void 0;
    return o(w) ? w : v ? w ?? v.value : (v = { value: await S() }, v.value);
  } catch (E) {
    return await u(E, p, v);
  }
}
function ox(n, a, i, s, o) {
  let u = ix({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = Mj(
    s.route,
    cn(i.method) ? "action" : "loader",
    a,
    n,
    o
  );
  return {
    middleware: u,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Gf(n, a, i, s, o, u, h, m, g, p = null, b) {
  let v = !1, S = ox(
    n,
    a,
    i,
    u,
    h
  );
  return {
    ...u,
    _lazyPromises: S,
    shouldLoad: g,
    shouldRevalidateArgs: p,
    shouldCallHandler(E) {
      return v = !0, p ? typeof b == "boolean" ? cs(u, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof E == "boolean" ? cs(u, {
        ...p,
        defaultShouldRevalidate: E
      }) : cs(u, p) : g;
    },
    resolve(E) {
      let { lazy: w, loader: T, middleware: R } = u.route, C = v || g || E && !cn(i.method) && (w || T), k = R && R.length > 0 && !T && !w;
      return C && (cn(i.method) || !k) ? zj({
        request: i,
        path: s,
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
function Pi(n, a, i, s, o, u, h, m, g = null) {
  return o.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: ox(
      n,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Gf(
    n,
    a,
    i,
    s,
    Ss(o),
    p,
    h,
    m,
    !0,
    g
  ));
}
async function Dj(n, a, i, s, o, u, h) {
  s.some((b) => b._lazyPromises?.middleware) && await Promise.all(s.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: cx(a, i),
    unstable_pattern: Ss(s),
    params: s[0].params,
    context: u,
    matches: s
  }, p = await n({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return lx(v, () => b({
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
      s.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function zj({
  request: n,
  path: a,
  unstable_pattern: i,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: h,
  scopedContext: m
}) {
  let g, p, b = cn(n.method), v = b ? "action" : "loader", S = (E) => {
    let w, T = new Promise((k, _) => w = _);
    p = () => w(), n.signal.addEventListener("abort", p);
    let R = (k) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : E(
      {
        request: n,
        unstable_url: cx(n, a),
        unstable_pattern: i,
        params: s.params,
        context: m
      },
      ...k !== void 0 ? [k] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (h ? h((_) => R(_)) : R()) };
      } catch (k) {
        return { type: "error", result: k };
      }
    })();
    return Promise.race([C, T]);
  };
  try {
    let E = b ? s.route.action : s.route.loader;
    if (o || u)
      if (E) {
        let w, [T] = await Promise.all([
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
        g = T;
      } else {
        await o;
        let w = b ? s.route.action : s.route.loader;
        if (w)
          [g] = await Promise.all([S(w), u]);
        else if (v === "action") {
          let T = new URL(n.url), R = T.pathname + T.search;
          throw Yn(405, {
            method: n.method,
            pathname: R,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (E)
      g = await S(E);
    else {
      let w = new URL(n.url), T = w.pathname + w.search;
      throw Yn(404, {
        pathname: T
      });
    }
  } catch (E) {
    return { type: "error", result: E };
  } finally {
    p && n.signal.removeEventListener("abort", p);
  }
  return g;
}
async function Oj(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function kj(n) {
  let { result: a, type: i } = n;
  if (Eh(a)) {
    let s;
    try {
      s = await Oj(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new Mc(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? gy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: Vj(a),
    statusCode: ms(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ms(a) ? a.status : void 0
  } : gy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function Lj(n, a, i, s, o) {
  let u = n.headers.get("Location");
  if (qe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !bh(u)) {
    let h = s.slice(
      0,
      s.findIndex((m) => m.route.id === i) + 1
    );
    u = Yf(
      new URL(a.url),
      h,
      o,
      u
    ), n.headers.set("Location", u);
  }
  return n;
}
var dy = [
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
function fy(n, a, i, s) {
  if (bh(n)) {
    let o = n, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (dy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(u.pathname, i) != null;
    if (u.origin === a.origin && h)
      return Sh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = s.createURL(n);
    if (dy.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function qi(n, a, i, s) {
  let o = n.createURL(ux(a)).toString(), u = { signal: i };
  if (s && cn(s.formMethod)) {
    let { formMethod: h, formEncType: m } = s;
    u.method = h.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(s.json)) : m === "text/plain" ? u.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? u.body = Xf(s.formData) : u.body = s.formData;
  }
  return new Request(o, u);
}
function cx(n, a) {
  let i = new URL(n.url), s = typeof a == "string" ? ia(a) : a;
  if (i.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), u = o.getAll("index");
    o.delete("index");
    for (let h of u.filter(Boolean))
      o.append("index", h);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = s.hash || "", i;
}
function Xf(n) {
  let a = new URLSearchParams();
  for (let [i, s] of n.entries())
    a.append(i, typeof s == "string" ? s : s.name);
  return a;
}
function hy(n) {
  let a = new FormData();
  for (let [i, s] of n.entries())
    a.append(i, s);
  return a;
}
function Uj(n, a, i, s = !1, o = !1) {
  let u = {}, h = null, m, g = !1, p = {}, b = i && An(i[1]) ? i[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, E = a[S];
    if (qe(
      !Yr(E),
      "Cannot handle redirect results in processLoaderData"
    ), An(E)) {
      let w = E.error;
      if (b !== void 0 && (w = b, b = void 0), h = h || {}, o)
        h[S] = w;
      else {
        let T = gr(n, S);
        h[T.route.id] == null && (h[T.route.id] = w);
      }
      s || (u[S] = nx), g || (g = !0, m = ms(E.error) ? E.error.status : 500), E.headers && (p[S] = E.headers);
    } else
      u[S] = E.data, E.statusCode && E.statusCode !== 200 && !g && (m = E.statusCode), E.headers && (p[S] = E.headers);
  }), b !== void 0 && i && (h = { [i[0]]: b }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function my(n, a, i, s, o, u) {
  let { loaderData: h, errors: m } = Uj(
    a,
    i,
    s
  );
  return o.filter((g) => !g.matches || g.matches.some((p) => p.shouldLoad)).forEach((g) => {
    let { key: p, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let S = u[p];
    if (qe(S, "Did not find corresponding fetcher result"), An(S)) {
      let E = gr(n.matches, b?.route.id);
      m && m[E.route.id] || (m = {
        ...m,
        [E.route.id]: S.error
      }), n.fetchers.delete(p);
    } else if (Yr(S))
      qe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let E = ka(S.data);
      n.fetchers.set(p, E);
    }
  }), { loaderData: h, errors: m };
}
function py(n, a, i, s) {
  let o = Object.entries(a).filter(([, u]) => u !== nx).reduce((u, [h, m]) => (u[h] = m, u), {});
  for (let u of i) {
    let h = u.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && u.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function vy(n) {
  return n ? An(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function gr(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function Fo(n) {
  let a = n.length === 1 ? n[0] : n.find((i) => i.index || !i.path || i.path === "/") || {
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
function Yn(n, {
  pathname: a,
  routeId: i,
  method: s,
  type: o,
  message: u
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return n === 400 ? (h = "Bad Request", s && a && i ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : n === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : n === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : n === 405 && (h = "Method Not Allowed", s && a && i ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new Mc(
    n || 500,
    h,
    new Error(m),
    !0
  );
}
function Yo(n) {
  let a = Object.entries(n);
  for (let i = a.length - 1; i >= 0; i--) {
    let [s, o] = a[i];
    if (Yr(o))
      return { key: s, result: o };
  }
}
function ux(n) {
  let a = typeof n == "string" ? ia(n) : n;
  return pa({ ...a, hash: "" });
}
function Bj(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function Vj(n) {
  return new Mc(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function $j(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, i]) => typeof a == "string" && Hj(i)
  );
}
function Hj(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function qj(n) {
  return Eh(n.result) && ex.has(n.result.status);
}
function An(n) {
  return n.type === "error";
}
function Yr(n) {
  return (n && n.type) === "redirect";
}
function gy(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Eh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function Ij(n) {
  return ex.has(n);
}
function Fj(n) {
  return Eh(n) && Ij(n.status) && n.headers.has("Location");
}
function Yj(n) {
  return Sj.has(n.toUpperCase());
}
function cn(n) {
  return bj.has(n.toUpperCase());
}
function jh(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function sc(n, a) {
  let i = typeof a == "string" ? ia(a).search : a.search;
  if (n[n.length - 1].route.index && jh(i || ""))
    return n[n.length - 1];
  let s = Kb(n);
  return s[s.length - 1];
}
function yy(n) {
  let { formMethod: a, formAction: i, formEncType: s, text: o, formData: u, json: h } = n;
  if (!(!a || !i || !s)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (h !== void 0)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: void 0,
        json: h,
        text: void 0
      };
  }
}
function af(n, a) {
  return a ? {
    state: "loading",
    location: n,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  } : {
    state: "loading",
    location: n,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function Gj(n, a) {
  return {
    state: "submitting",
    location: n,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  };
}
function Ql(n, a) {
  return n ? {
    state: "loading",
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
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
function Xj(n, a) {
  return {
    state: "submitting",
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
    data: a ? a.data : void 0
  };
}
function ka(n) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: n
  };
}
function Pj(n, a) {
  try {
    let i = n.sessionStorage.getItem(
      tx
    );
    if (i) {
      let s = JSON.parse(i);
      for (let [o, u] of Object.entries(s || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function Kj(n, a) {
  if (a.size > 0) {
    let i = {};
    for (let [s, o] of a)
      i[s] = [...o];
    try {
      n.sessionStorage.setItem(
        tx,
        JSON.stringify(i)
      );
    } catch (s) {
      _t(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function by() {
  let n, a, i = new Promise((s, o) => {
    n = async (u) => {
      s(u);
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
    resolve: n,
    //@ts-ignore
    reject: a
  };
}
var Wr = y.createContext(null);
Wr.displayName = "DataRouter";
var ws = y.createContext(null);
ws.displayName = "DataRouterState";
var dx = y.createContext(!1);
function fx() {
  return y.useContext(dx);
}
var Nh = y.createContext({
  isTransitioning: !1
});
Nh.displayName = "ViewTransition";
var hx = y.createContext(
  /* @__PURE__ */ new Map()
);
hx.displayName = "Fetchers";
var Qj = y.createContext(null);
Qj.displayName = "Await";
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
var Th = y.createContext(null);
Th.displayName = "RouteError";
var mx = "REACT_ROUTER_ERROR", Zj = "REDIRECT", Jj = "ROUTE_ERROR_RESPONSE";
function Wj(n) {
  if (n.startsWith(`${mx}:${Zj}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function eN(n) {
  if (n.startsWith(
    `${mx}:${Jj}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Mc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function tN(n, { relative: a } = {}) {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: s } = y.useContext(Qn), { hash: o, pathname: u, search: h } = Ns(n, { relative: a }), m = u;
  return i !== "/" && (m = u === "/" ? i : Gn([i, u])), s.createHref({ pathname: m, search: h, hash: o });
}
function Es() {
  return y.useContext(_c) != null;
}
function Va() {
  return qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(_c).location;
}
var px = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function vx(n) {
  y.useContext(Qn).static || y.useLayoutEffect(n);
}
function js() {
  let { isDataRoute: n } = y.useContext(Ba);
  return n ? hN() : nN();
}
function nN() {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = y.useContext(Wr), { basename: a, navigator: i } = y.useContext(Qn), { matches: s } = y.useContext(Ba), { pathname: o } = Va(), u = JSON.stringify(xh(s)), h = y.useRef(!1);
  return vx(() => {
    h.current = !0;
  }), y.useCallback(
    (g, p = {}) => {
      if (_t(h.current, px), !h.current) return;
      if (typeof g == "number") {
        i.go(g);
        return;
      }
      let b = Rc(
        g,
        JSON.parse(u),
        o,
        p.relative === "path"
      );
      n == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Gn([a, b.pathname])), (p.replace ? i.replace : i.push)(
        b,
        p.state,
        p
      );
    },
    [
      a,
      i,
      u,
      o,
      n
    ]
  );
}
y.createContext(null);
function Ns(n, { relative: a } = {}) {
  let { matches: i } = y.useContext(Ba), { pathname: s } = Va(), o = JSON.stringify(xh(i));
  return y.useMemo(
    () => Rc(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function aN(n, a, i) {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = y.useContext(Qn), { matches: o } = y.useContext(Ba), u = o[o.length - 1], h = u ? u.params : {}, m = u ? u.pathname : "/", g = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let R = p && p.path || "";
    bx(
      m,
      !p || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let b = Va(), v;
  v = b;
  let S = v.pathname || "/", E = S;
  if (g !== "/") {
    let R = g.replace(/^\//, "").split("/");
    E = "/" + S.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let w = vr(n, { pathname: E });
  return _t(
    p || w != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), _t(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), oN(
    w && w.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, h, R.params),
        pathname: Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? g : Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function rN() {
  let n = fN(), a = ms(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), i = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, u = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, h);
}
var iN = /* @__PURE__ */ y.createElement(rN, null), gx = class extends y.Component {
  constructor(n) {
    super(n), this.state = {
      location: n.location,
      revalidation: n.revalidation,
      error: n.error
    };
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  static getDerivedStateFromProps(n, a) {
    return a.location !== n.location || a.revalidation !== "idle" && n.revalidation === "idle" ? {
      error: n.error,
      location: n.location,
      revalidation: n.revalidation
    } : {
      error: n.error !== void 0 ? n.error : a.error,
      location: a.location,
      revalidation: n.revalidation || a.revalidation
    };
  }
  componentDidCatch(n, a) {
    this.props.onError ? this.props.onError(n, a) : console.error(
      "React Router caught the following error during render",
      n
    );
  }
  render() {
    let n = this.state.error;
    if (this.context && typeof n == "object" && n && "digest" in n && typeof n.digest == "string") {
      const i = eN(n.digest);
      i && (n = i);
    }
    let a = n !== void 0 ? /* @__PURE__ */ y.createElement(Ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Th.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(lN, { error: n }, a) : a;
  }
};
gx.contextType = dx;
var rf = /* @__PURE__ */ new WeakMap();
function lN({
  children: n,
  error: a
}) {
  let { basename: i } = y.useContext(Qn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = Wj(a.digest);
    if (s) {
      let o = rf.get(a);
      if (o) throw o;
      let u = Zb(s.location, i);
      if (Qb && !rf.get(a))
        if (u.isExternal || s.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: s.replace
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
  return n;
}
function sN({ routeContext: n, match: a, children: i }) {
  let s = y.useContext(Wr);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement(Ba.Provider, { value: n }, i);
}
function oN(n, a = [], i) {
  let s = i?.state;
  if (n == null) {
    if (!s)
      return null;
    if (s.errors)
      n = s.matches;
    else if (a.length === 0 && !s.initialized && s.matches.length > 0)
      n = s.matches;
    else
      return null;
  }
  let o = n, u = s?.errors;
  if (u != null) {
    let b = o.findIndex(
      (v) => v.route.id && u?.[v.route.id] !== void 0
    );
    qe(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let h = !1, m = -1;
  if (i && s) {
    h = s.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = b), v.route.id) {
        let { loaderData: S, errors: E } = s, w = v.route.loader && !S.hasOwnProperty(v.route.id) && (!E || E[v.route.id] === void 0);
        if (v.route.lazy || w) {
          i.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let g = i?.onError, p = s && g ? (b, v) => {
    g(b, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: Ss(s.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, S) => {
      let E, w = !1, T = null, R = null;
      s && (E = u && v.route.id ? u[v.route.id] : void 0, T = v.route.errorElement || iN, h && (m < 0 && S === 0 ? (bx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, R = null) : m === S && (w = !0, R = v.route.hydrateFallbackElement || null)));
      let C = a.concat(o.slice(0, S + 1)), k = () => {
        let _;
        return E ? _ = T : w ? _ = R : v.route.Component ? _ = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? _ = v.route.element : _ = b, /* @__PURE__ */ y.createElement(
          sN,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: C,
              isDataRoute: s != null
            },
            children: _
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ y.createElement(
        gx,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: T,
          error: E,
          children: k(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: p
        }
      ) : k();
    },
    null
  );
}
function Ch(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function cN(n) {
  let a = y.useContext(Wr);
  return qe(a, Ch(n)), a;
}
function yx(n) {
  let a = y.useContext(ws);
  return qe(a, Ch(n)), a;
}
function uN(n) {
  let a = y.useContext(Ba);
  return qe(a, Ch(n)), a;
}
function Ac(n) {
  let a = uN(n), i = a.matches[a.matches.length - 1];
  return qe(
    i.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function dN() {
  return Ac(
    "useRouteId"
    /* UseRouteId */
  );
}
function Ts() {
  let n = yx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Ac(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function fN() {
  let n = y.useContext(Th), a = yx(
    "useRouteError"
    /* UseRouteError */
  ), i = Ac(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[i];
}
function hN() {
  let { router: n } = cN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Ac(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return vx(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, u = {}) => {
      _t(i.current, px), i.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...u }));
    },
    [n, a]
  );
}
var xy = {};
function bx(n, a, i) {
  !a && !xy[n] && (xy[n] = !0, _t(!1, i));
}
var Sy = {};
function wy(n, a) {
  !n && !Sy[a] && (Sy[a] = !0, console.warn(a));
}
var mN = "useOptimistic", Ey = AE[mN], pN = () => {
};
function vN(n) {
  return Ey ? Ey(n) : [n, pN];
}
function gN(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && _t(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: y.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && _t(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: y.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && _t(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: y.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var yN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function bN(n, a) {
  return Nj({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: $E({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: yN,
    mapRouteProperties: gN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var xN = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((n, a) => {
      this.resolve = (i) => {
        this.status === "pending" && (this.status = "resolved", n(i));
      }, this.reject = (i) => {
        this.status === "pending" && (this.status = "rejected", a(i));
      };
    });
  }
};
function SN({
  router: n,
  flushSync: a,
  onError: i,
  unstable_useTransitions: s
}) {
  s = fx() || s;
  let [u, h] = y.useState(n.state), [m, g] = vN(u), [p, b] = y.useState(), [v, S] = y.useState({
    isTransitioning: !1
  }), [E, w] = y.useState(), [T, R] = y.useState(), [C, k] = y.useState(), _ = y.useRef(/* @__PURE__ */ new Map()), z = y.useCallback(
    (H, { deletedFetchers: q, newErrors: le, flushSync: re, viewTransitionOpts: J }) => {
      le && i && Object.values(le).forEach(
        (W) => i(W, {
          location: H.location,
          params: H.matches[0]?.params ?? {},
          unstable_pattern: Ss(H.matches)
        })
      ), H.fetchers.forEach((W, A) => {
        W.data !== void 0 && _.current.set(A, W.data);
      }), q.forEach((W) => _.current.delete(W)), wy(
        re === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ce = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (wy(
        J == null || ce,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !J || !ce) {
        a && re ? a(() => h(H)) : s === !1 ? h(H) : y.startTransition(() => {
          s === !0 && g((W) => jy(W, H)), h(H);
        });
        return;
      }
      if (a && re) {
        a(() => {
          T && (E?.resolve(), T.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: J.currentLocation,
            nextLocation: J.nextLocation
          });
        });
        let W = n.window.document.startViewTransition(() => {
          a(() => h(H));
        });
        W.finished.finally(() => {
          a(() => {
            w(void 0), R(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => R(W));
        return;
      }
      T ? (E?.resolve(), T.skipTransition(), k({
        state: H,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      })) : (b(H), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      }));
    },
    [
      n.window,
      a,
      T,
      E,
      s,
      g,
      i
    ]
  );
  y.useLayoutEffect(() => n.subscribe(z), [n, z]);
  let K = m.initialized;
  y.useLayoutEffect(() => {
    !K && n.state.initialized && z(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [K, z, n.state]), y.useEffect(() => {
    v.isTransitioning && !v.flushSync && w(new xN());
  }, [v]), y.useEffect(() => {
    if (E && p && n.window) {
      let H = p, q = E.promise, le = n.window.document.startViewTransition(async () => {
        s === !1 ? h(H) : y.startTransition(() => {
          s === !0 && g((re) => jy(re, H)), h(H);
        }), await q;
      });
      le.finished.finally(() => {
        w(void 0), R(void 0), b(void 0), S({ isTransitioning: !1 });
      }), R(le);
    }
  }, [
    p,
    E,
    n.window,
    s,
    g
  ]), y.useEffect(() => {
    E && p && m.location.key === p.location.key && E.resolve();
  }, [E, T, m.location, p]), y.useEffect(() => {
    !v.isTransitioning && C && (b(C.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), k(void 0));
  }, [v.isTransitioning, C]);
  let ee = y.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (H) => n.navigate(H),
    push: (H, q, le) => n.navigate(H, {
      state: q,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (H, q, le) => n.navigate(H, {
      replace: !0,
      state: q,
      preventScrollReset: le?.preventScrollReset
    })
  }), [n]), te = n.basename || "/", D = y.useMemo(
    () => ({
      router: n,
      navigator: ee,
      static: !1,
      basename: te,
      onError: i
    }),
    [n, ee, te, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Wr.Provider, { value: D }, /* @__PURE__ */ y.createElement(ws.Provider, { value: m }, /* @__PURE__ */ y.createElement(hx.Provider, { value: _.current }, /* @__PURE__ */ y.createElement(Nh.Provider, { value: v }, /* @__PURE__ */ y.createElement(
    jN,
    {
      basename: te,
      location: m.location,
      navigationType: m.historyAction,
      navigator: ee,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ y.createElement(
      wN,
      {
        routes: n.routes,
        future: n.future,
        state: m,
        isStatic: !1,
        onError: i
      }
    )
  ))))), null);
}
function jy(n, a) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...n,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: a.navigation.state !== "idle" ? a.navigation : n.navigation,
    revalidation: a.revalidation !== "idle" ? a.revalidation : n.revalidation,
    actionData: a.navigation.state !== "submitting" ? a.actionData : n.actionData,
    fetchers: a.fetchers
  };
}
var wN = y.memo(EN);
function EN({
  routes: n,
  future: a,
  state: i,
  isStatic: s,
  onError: o
}) {
  return aN(n, void 0, { state: i, isStatic: s, onError: o });
}
function jN({
  basename: n = "/",
  children: a = null,
  location: i,
  navigationType: s = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: h
}) {
  qe(
    !Es(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = n.replace(/^\/*/, "/"), g = y.useMemo(
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
    search: b = "",
    hash: v = "",
    state: S = null,
    key: E = "default",
    unstable_mask: w
  } = i, T = y.useMemo(() => {
    let R = Kn(p, m);
    return R == null ? null : {
      location: {
        pathname: R,
        search: b,
        hash: v,
        state: S,
        key: E,
        unstable_mask: w
      },
      navigationType: s
    };
  }, [
    m,
    p,
    b,
    v,
    S,
    E,
    s,
    w
  ]);
  return _t(
    T != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ y.createElement(Qn.Provider, { value: g }, /* @__PURE__ */ y.createElement(_c.Provider, { children: a, value: T }));
}
var oc = "get", cc = "application/x-www-form-urlencoded";
function Dc(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function NN(n) {
  return Dc(n) && n.tagName.toLowerCase() === "button";
}
function TN(n) {
  return Dc(n) && n.tagName.toLowerCase() === "form";
}
function CN(n) {
  return Dc(n) && n.tagName.toLowerCase() === "input";
}
function RN(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function MN(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !RN(n);
}
var Go = null;
function _N() {
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
var AN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function lf(n) {
  return n != null && !AN.has(n) ? (_t(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${cc}"`
  ), null) : n;
}
function DN(n, a) {
  let i, s, o, u, h;
  if (TN(n)) {
    let m = n.getAttribute("action");
    s = m ? Kn(m, a) : null, i = n.getAttribute("method") || oc, o = lf(n.getAttribute("enctype")) || cc, u = new FormData(n);
  } else if (NN(n) || CN(n) && (n.type === "submit" || n.type === "image")) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = n.getAttribute("formaction") || m.getAttribute("action");
    if (s = g ? Kn(g, a) : null, i = n.getAttribute("formmethod") || m.getAttribute("method") || oc, o = lf(n.getAttribute("formenctype")) || lf(m.getAttribute("enctype")) || cc, u = new FormData(m, n), !_N()) {
      let { name: p, type: b, value: v } = n;
      if (b === "image") {
        let S = p ? `${p}.` : "";
        u.append(`${S}x`, "0"), u.append(`${S}y`, "0");
      } else p && u.append(p, v);
    }
  } else {
    if (Dc(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = oc, s = null, o = cc, h = n;
  }
  return u && o === "text/plain" && (h = u, u = void 0), { action: s, method: i.toLowerCase(), encType: o, formData: u, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Rh(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function xx(n, a, i, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${vc(a)}/_root.${s}` : o.pathname = `${vc(o.pathname)}.${s}`, o;
}
async function zN(n, a) {
  if (n.id in a)
    return a[n.id];
  try {
    let i = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      n.module
    );
    return a[n.id] = i, i;
  } catch (i) {
    return console.error(
      `Error loading route module \`${n.module}\`, reloading page...`
    ), console.error(i), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function ON(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function kN(n, a, i) {
  let s = await Promise.all(
    n.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let h = await zN(u, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return VN(
    s.flat(1).filter(ON).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Ny(n, a, i, s, o, u) {
  let h = (g, p) => i[p] ? g.route.id !== i[p].route.id : !0, m = (g, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== g.params["*"]
  );
  return u === "assets" ? a.filter(
    (g, p) => h(g, p) || m(g, p)
  ) : u === "data" ? a.filter((g, p) => {
    let b = s.routes[g.route.id];
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
        nextUrl: new URL(n, window.origin),
        nextParams: g.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function LN(n, a, { includeHydrateFallback: i } = {}) {
  return UN(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function UN(n) {
  return [...new Set(n)];
}
function BN(n) {
  let a = {}, i = Object.keys(n).sort();
  for (let s of i)
    a[s] = n[s];
  return a;
}
function VN(n, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let u = JSON.stringify(BN(o));
    return i.has(u) || (i.add(u), s.push({ key: u, link: o })), s;
  }, []);
}
function Mh() {
  let n = y.useContext(Wr);
  return Rh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function $N() {
  let n = y.useContext(ws);
  return Rh(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var _h = y.createContext(void 0);
_h.displayName = "FrameworkContext";
function Ah() {
  let n = y.useContext(_h);
  return Rh(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function HN(n, a) {
  let i = y.useContext(_h), [s, o] = y.useState(!1), [u, h] = y.useState(!1), { onFocus: m, onBlur: g, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, S = y.useRef(null);
  y.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let T = (C) => {
        C.forEach((k) => {
          h(k.isIntersecting);
        });
      }, R = new IntersectionObserver(T, { threshold: 0.5 });
      return S.current && R.observe(S.current), () => {
        R.disconnect();
      };
    }
  }, [n]), y.useEffect(() => {
    if (s) {
      let T = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(T);
      };
    }
  }, [s]);
  let E = () => {
    o(!0);
  }, w = () => {
    o(!1), h(!1);
  };
  return i ? n !== "intent" ? [u, S, {}] : [
    u,
    S,
    {
      onFocus: Zl(m, E),
      onBlur: Zl(g, w),
      onMouseEnter: Zl(p, E),
      onMouseLeave: Zl(b, w),
      onTouchStart: Zl(v, E)
    }
  ] : [!1, S, {}];
}
function Zl(n, a) {
  return (i) => {
    n && n(i), i.defaultPrevented || a(i);
  };
}
function qN({ page: n, ...a }) {
  let i = fx(), { router: s } = Mh(), o = y.useMemo(
    () => vr(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(FN, { page: n, matches: o, ...a }) : /* @__PURE__ */ y.createElement(YN, { page: n, matches: o, ...a }) : null;
}
function IN(n) {
  let { manifest: a, routeModules: i } = Ah(), [s, o] = y.useState([]);
  return y.useEffect(() => {
    let u = !1;
    return kN(n, a, i).then(
      (h) => {
        u || o(h);
      }
    ), () => {
      u = !0;
    };
  }, [n, a, i]), s;
}
function FN({
  page: n,
  matches: a,
  ...i
}) {
  let s = Va(), { future: o } = Ah(), { basename: u } = Mh(), h = y.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let m = xx(
      n,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? g = !0 : p.push(b.route.id);
    return g && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, h.map((m) => /* @__PURE__ */ y.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function YN({
  page: n,
  matches: a,
  ...i
}) {
  let s = Va(), { future: o, manifest: u, routeModules: h } = Ah(), { basename: m } = Mh(), { loaderData: g, matches: p } = $N(), b = y.useMemo(
    () => Ny(
      n,
      a,
      p,
      u,
      s,
      "data"
    ),
    [n, a, p, u, s]
  ), v = y.useMemo(
    () => Ny(
      n,
      a,
      p,
      u,
      s,
      "assets"
    ),
    [n, a, p, u, s]
  ), S = y.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let T = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((k) => {
      let _ = u.routes[k.route.id];
      !_ || !_.hasLoader || (!b.some((z) => z.route.id === k.route.id) && k.route.id in g && h[k.route.id]?.shouldRevalidate || _.hasClientLoader ? R = !0 : T.add(k.route.id));
    }), T.size === 0)
      return [];
    let C = xx(
      n,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && T.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((k) => T.has(k.route.id)).map((k) => k.route.id).join(",")
    ), [C.pathname + C.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    g,
    s,
    u,
    b,
    a,
    n,
    h
  ]), E = y.useMemo(
    () => LN(v, u),
    [v, u]
  ), w = IN(v);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, S.map((T) => /* @__PURE__ */ y.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...i })), E.map((T) => /* @__PURE__ */ y.createElement("link", { key: T, rel: "modulepreload", href: T, ...i })), w.map(({ key: T, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement(
      "link",
      {
        key: T,
        nonce: i.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function GN(...n) {
  return (a) => {
    n.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var XN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  XN && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Sx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, zc = y.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: u,
    replace: h,
    unstable_mask: m,
    state: g,
    target: p,
    to: b,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: E,
    ...w
  }, T) {
    let { basename: R, navigator: C, unstable_useTransitions: k } = y.useContext(Qn), _ = typeof b == "string" && Sx.test(b), z = Zb(b, R);
    b = z.to;
    let K = tN(b, { relative: o }), ee = Va(), te = null;
    if (m) {
      let W = Rc(
        m,
        [],
        ee.unstable_mask ? ee.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (W.pathname = W.pathname === "/" ? R : Gn([R, W.pathname])), te = C.createHref(W);
    }
    let [D, H, q] = HN(
      s,
      w
    ), le = ZN(b, {
      replace: h,
      unstable_mask: m,
      state: g,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: k
    });
    function re(W) {
      a && a(W), W.defaultPrevented || le(W);
    }
    let J = !(z.isExternal || u), ce = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...w,
          ...q,
          href: (J ? te : void 0) || z.absoluteURL || K,
          onClick: J ? re : a,
          ref: GN(T, H),
          target: p,
          "data-discover": !_ && i === "render" ? "true" : void 0
        }
      )
    );
    return D && !_ ? /* @__PURE__ */ y.createElement(y.Fragment, null, ce, /* @__PURE__ */ y.createElement(qN, { page: K })) : ce;
  }
);
zc.displayName = "Link";
var PN = y.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: s = "",
    end: o = !1,
    style: u,
    to: h,
    viewTransition: m,
    children: g,
    ...p
  }, b) {
    let v = Ns(h, { relative: p.relative }), S = Va(), E = y.useContext(ws), { navigator: w, basename: T } = y.useContext(Qn), R = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    nT(v) && m === !0, C = w.encodeLocation ? w.encodeLocation(v).pathname : v.pathname, k = S.pathname, _ = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    i || (k = k.toLowerCase(), _ = _ ? _.toLowerCase() : null, C = C.toLowerCase()), _ && T && (_ = Kn(_, T) || _);
    const z = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let K = k === C || !o && k.startsWith(C) && k.charAt(z) === "/", ee = _ != null && (_ === C || !o && _.startsWith(C) && _.charAt(C.length) === "/"), te = {
      isActive: K,
      isPending: ee,
      isTransitioning: R
    }, D = K ? a : void 0, H;
    typeof s == "function" ? H = s(te) : H = [
      s,
      K ? "active" : null,
      ee ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let q = typeof u == "function" ? u(te) : u;
    return /* @__PURE__ */ y.createElement(
      zc,
      {
        ...p,
        "aria-current": D,
        className: H,
        ref: b,
        style: q,
        to: h,
        viewTransition: m
      },
      typeof g == "function" ? g(te) : g
    );
  }
);
PN.displayName = "NavLink";
var KN = y.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: s,
    replace: o,
    state: u,
    method: h = oc,
    action: m,
    onSubmit: g,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...E
  }, w) => {
    let { unstable_useTransitions: T } = y.useContext(Qn), R = eT(), C = tT(m, { relative: p }), k = h.toLowerCase() === "get" ? "get" : "post", _ = typeof m == "string" && Sx.test(m), z = (K) => {
      if (g && g(K), K.defaultPrevented) return;
      K.preventDefault();
      let ee = K.nativeEvent.submitter, te = ee?.getAttribute("formmethod") || h, D = () => R(ee || K.currentTarget, {
        fetcherKey: a,
        method: te,
        navigate: i,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      T && i !== !1 ? y.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: w,
        method: k,
        action: C,
        onSubmit: s ? g : z,
        ...E,
        "data-discover": !_ && n === "render" ? "true" : void 0
      }
    );
  }
);
KN.displayName = "Form";
function QN(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function wx(n) {
  let a = y.useContext(Wr);
  return qe(a, QN(n)), a;
}
function ZN(n, {
  target: a,
  replace: i,
  unstable_mask: s,
  state: o,
  preventScrollReset: u,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: g,
  unstable_useTransitions: p
} = {}) {
  let b = js(), v = Va(), S = Ns(n, { relative: h });
  return y.useCallback(
    (E) => {
      if (MN(E, a)) {
        E.preventDefault();
        let w = i !== void 0 ? i : pa(v) === pa(S), T = () => b(n, {
          replace: w,
          unstable_mask: s,
          state: o,
          preventScrollReset: u,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: g
        });
        p ? y.startTransition(() => T()) : T();
      }
    },
    [
      v,
      b,
      S,
      i,
      s,
      o,
      a,
      n,
      u,
      h,
      m,
      g,
      p
    ]
  );
}
var JN = 0, WN = () => `__${String(++JN)}__`;
function eT() {
  let { router: n } = wx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(Qn), i = dN(), s = n.fetch, o = n.navigate;
  return y.useCallback(
    async (u, h = {}) => {
      let { action: m, method: g, encType: p, formData: b, body: v } = DN(
        u,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || WN();
        await s(S, i, h.action || m, {
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
    [s, o, a, i]
  );
}
function tT(n, { relative: a } = {}) {
  let { basename: i } = y.useContext(Qn), s = y.useContext(Ba);
  qe(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), u = { ...Ns(n || ".", { relative: a }) }, h = Va();
  if (n == null) {
    u.search = h.search;
    let m = new URLSearchParams(u.search), g = m.getAll("index");
    if (g.some((b) => b === "")) {
      m.delete("index"), g.filter((v) => v).forEach((v) => m.append("index", v));
      let b = m.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : Gn([i, u.pathname])), pa(u);
}
function nT(n, { relative: a } = {}) {
  let i = y.useContext(Nh);
  qe(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = wx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Ns(n, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = Kn(i.currentLocation.pathname, s) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, s) || i.nextLocation.pathname;
  return pc(o.pathname, h) != null || pc(o.pathname, u) != null;
}
class el extends Error {
  constructor(a, i, s, o) {
    super(s), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const $a = "/api/v1/extensions/nexus.audio.emotiontts";
async function ht(n, a) {
  const i = n.startsWith("http") ? n : `${$a}${n}`, s = await fetch(i, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!s.ok) {
    let o = null;
    try {
      o = await s.json();
    } catch {
      o = null;
    }
    throw new el(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function aT(n, a, i) {
  const s = n.startsWith("http") ? n : `${$a}${n}`, o = new EventSource(s);
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
async function rT() {
  return ht("/deployments");
}
async function Ty(n) {
  return ht(`/deployments/${n}`);
}
async function iT(n, a) {
  return ht(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Cy(n) {
  return ht(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Dh(n, a) {
  return ht("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function us(n, a, i) {
  return ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Ex(n, a) {
  await ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function lT(n) {
  return ht(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function sT(n, a, i = "error") {
  return ht("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: i })
  });
}
async function oT(n, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const s = i.toString(), o = s ? `?${s}` : "";
  return ht(`/deployments/${n}/runs${o}`);
}
async function cT(n, a) {
  return ht(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function zh(n, a) {
  return ht(`/deployments/${n}/runs/${a}`);
}
async function uT(n, a) {
  return ht(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function jx(n, a) {
  return ht(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function dT(n, a) {
  return ht(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Ry(n, a, i, s) {
  return aT(
    `/deployments/${n}/runs/${a}/progress`,
    i,
    s
  );
}
async function ps(n) {
  return ht(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function gc(n, a, i, s, o) {
  const u = new FormData();
  u.append("deploymentId", n), u.append("displayName", i), u.append("kind", s), u.append("audio", a);
  const h = await fetch(`${$a}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function fT(n, a) {
  await ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function hT(n, a, i) {
  return ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function mT(n) {
  if (!n.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: n.deploymentId });
  return `${$a}/voice-assets/${encodeURIComponent(n.voiceAssetId)}/audio?${a.toString()}`;
}
async function pT(n) {
  return ht(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var vT = "mux0i60", gT = "mux0i61", yT = "mux0i62", bT = "mux0i63";
function Cs({ count: n = "0", title: a, hint: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: vT, children: [
    /* @__PURE__ */ d.jsx("span", { className: gT, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ d.jsx("h3", { className: yT, children: a }),
    i ? /* @__PURE__ */ d.jsx("p", { className: bT, children: i }) : null
  ] });
}
var xT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, ST = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, wT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, ET = "zwn3019";
function La({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: s = "section",
  children: o,
  className: u,
  style: h,
  ...m
}) {
  const g = [xT[n], wT[a], ST[i], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(s, { className: g, style: h, "data-elevation": i, ...m, children: o });
}
function jT({ children: n, className: a }) {
  const i = [ET, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: i, children: n });
}
var Pr = "vrkn5p0", NT = "_93p6291", TT = "_93p6292", CT = "_93p6293", RT = "_93p6294", MT = "_93p6295", _T = "_93p6296", AT = "_93p6297", DT = "_93p6298", zT = "_93p6299", OT = "_93p629a", kT = "_93p629b", LT = "_93p629c", UT = "_93p629d", BT = "_93p629e";
function VT() {
  const { deployments: n } = Ts(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ d.jsxs("main", { className: NT, children: [
    /* @__PURE__ */ d.jsxs("header", { className: TT, children: [
      /* @__PURE__ */ d.jsx("p", { className: CT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ d.jsxs("h1", { className: RT, children: [
        "Direct your characters.",
        /* @__PURE__ */ d.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: MT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ d.jsxs("p", { className: _T, children: [
        /* @__PURE__ */ d.jsx("span", { className: AT, children: n.length }),
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
        className: DT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ d.jsx("h2", { id: "deployments-section-list", className: Pr, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ d.jsx(
            Cs,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ d.jsx("ul", { className: zT, children: n.map((i) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(zc, { to: `/${i.deploymentId}/recipe`, className: OT, children: [
            /* @__PURE__ */ d.jsx("span", { className: kT, "aria-hidden": "true", children: $T(i.displayName) }),
            /* @__PURE__ */ d.jsxs("span", { children: [
              /* @__PURE__ */ d.jsx("span", { className: LT, children: i.displayName }),
              /* @__PURE__ */ d.jsx("span", { className: UT, children: i.deploymentId })
            ] }),
            /* @__PURE__ */ d.jsx("span", { className: BT, "aria-hidden": "true", children: "→" })
          ] }) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function $T(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Oh = Fb();
const HT = /* @__PURE__ */ Ib(Oh);
function qT(n) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n));
}
const IT = (n) => {
  switch (n) {
    case "success":
      return GT;
    case "info":
      return PT;
    case "warning":
      return XT;
    case "error":
      return KT;
    default:
      return null;
  }
}, FT = Array(12).fill(0), YT = ({ visible: n, className: a }) => /* @__PURE__ */ me.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ me.createElement("div", {
  className: "sonner-spinner"
}, FT.map((i, s) => /* @__PURE__ */ me.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), GT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), XT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), PT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), KT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), QT = /* @__PURE__ */ me.createElement("svg", {
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
})), ZT = () => {
  const [n, a] = me.useState(document.hidden);
  return me.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), n;
};
let Pf = 1;
class JT {
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
      const { message: s, ...o } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Pf++, h = this.toasts.find((g) => g.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), h ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({
        ...g,
        ...a,
        id: u,
        title: s
      }), {
        ...g,
        ...a,
        id: u,
        dismissible: m,
        title: s
      }) : g) : this.addToast({
        title: s,
        ...o,
        dismissible: m,
        id: u
      }), u;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((i) => i({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((i) => {
      this.subscribers.forEach((s) => s({
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
      let s;
      i.loading !== void 0 && (s = this.create({
        ...i,
        promise: a,
        type: "loading",
        message: i.loading,
        description: typeof i.description != "function" ? i.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let u = s !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], me.isValidElement(p))
          u = !1, this.create({
            id: s,
            type: "default",
            message: p
          });
        else if (eC(p) && !p.ok) {
          u = !1;
          const v = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, S = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...w
          });
        } else if (p instanceof Error) {
          u = !1;
          const v = typeof i.error == "function" ? await i.error(p) : i.error, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...w
          });
        } else if (i.success !== void 0) {
          u = !1;
          const v = typeof i.success == "function" ? await i.success(p) : i.success, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
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
          const b = typeof i.error == "function" ? await i.error(p) : i.error, v = typeof i.description == "function" ? await i.description(p) : i.description, E = typeof b == "object" && !me.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: s,
            type: "error",
            description: v,
            ...E
          });
        }
      }).finally(() => {
        u && (this.dismiss(s), s = void 0), i.finally == null || i.finally.call(i);
      }), g = () => new Promise((p, b) => m.then(() => h[0] === "reject" ? b(h[1]) : p(h[1])).catch(b));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: g
      } : Object.assign(s, {
        unwrap: g
      });
    }, this.custom = (a, i) => {
      const s = i?.id || Pf++;
      return this.create({
        jsx: a(s),
        id: s,
        ...i
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const xn = new JT(), WT = (n, a) => {
  const i = a?.id || Pf++;
  return xn.addToast({
    title: n,
    ...a,
    id: i
  }), i;
}, eC = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", tC = WT, nC = () => xn.toasts, aC = () => xn.getActiveToasts(), Zt = Object.assign(tC, {
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
  getHistory: nC,
  getToasts: aC
});
qT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Xo(n) {
  return n.label !== void 0;
}
const rC = 3, iC = "24px", lC = "16px", My = 4e3, sC = 356, oC = 14, cC = 45, uC = 200;
function ma(...n) {
  return n.filter(Boolean).join(" ");
}
function dC(n) {
  const [a, i] = n.split("-"), s = [];
  return a && s.push(a), i && s.push(i), s;
}
const fC = (n) => {
  var a, i, s, o, u, h, m, g, p;
  const { invert: b, toast: v, unstyled: S, interacting: E, setHeights: w, visibleToasts: T, heights: R, index: C, toasts: k, expanded: _, removeToast: z, defaultRichColors: K, closeButton: ee, style: te, cancelButtonStyle: D, actionButtonStyle: H, className: q = "", descriptionClassName: le = "", duration: re, position: J, gap: ce, expandByDefault: W, classNames: A, icons: N, closeButtonAriaLabel: U = "Close toast" } = n, [I, ne] = me.useState(null), [M, P] = me.useState(null), [Q, oe] = me.useState(!1), [he, ge] = me.useState(!1), [Ae, Me] = me.useState(!1), [Ve, Jt] = me.useState(!1), [Pt, At] = me.useState(!1), [We, pt] = me.useState(0), [fe, ke] = me.useState(0), De = me.useRef(v.duration || re || My), Te = me.useRef(null), bt = me.useRef(null), xt = C === 0, dn = C + 1 <= T, Ht = v.type, On = v.dismissible !== !1, qt = v.className || "", ye = v.descriptionClassName || "", ze = me.useMemo(() => R.findIndex((Oe) => Oe.toastId === v.id) || 0, [
    R,
    v.id
  ]), Ke = me.useMemo(() => {
    var Oe;
    return (Oe = v.closeButton) != null ? Oe : ee;
  }, [
    v.closeButton,
    ee
  ]), tt = me.useMemo(() => v.duration || re || My, [
    v.duration,
    re
  ]), It = me.useRef(0), Ft = me.useRef(0), jr = me.useRef(0), la = me.useRef(null), [Zn, Wt] = J.split("-"), Tt = me.useMemo(() => R.reduce((Oe, ct, Dt) => Dt >= ze ? Oe : Oe + ct.height, 0), [
    R,
    ze
  ]), Yt = ZT(), ei = v.invert || b, Ha = Ht === "loading";
  Ft.current = me.useMemo(() => ze * ce + Tt, [
    ze,
    Tt
  ]), me.useEffect(() => {
    De.current = tt;
  }, [
    tt
  ]), me.useEffect(() => {
    oe(!0);
  }, []), me.useEffect(() => {
    const Oe = bt.current;
    if (Oe) {
      const ct = Oe.getBoundingClientRect().height;
      return ke(ct), w((Dt) => [
        {
          toastId: v.id,
          height: ct,
          position: v.position
        },
        ...Dt
      ]), () => w((Dt) => Dt.filter((Gt) => Gt.toastId !== v.id));
    }
  }, [
    w,
    v.id
  ]), me.useLayoutEffect(() => {
    if (!Q) return;
    const Oe = bt.current, ct = Oe.style.height;
    Oe.style.height = "auto";
    const Dt = Oe.getBoundingClientRect().height;
    Oe.style.height = ct, ke(Dt), w((Gt) => Gt.find((rt) => rt.toastId === v.id) ? Gt.map((rt) => rt.toastId === v.id ? {
      ...rt,
      height: Dt
    } : rt) : [
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
    w,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const kn = me.useCallback(() => {
    ge(!0), pt(Ft.current), w((Oe) => Oe.filter((ct) => ct.toastId !== v.id)), setTimeout(() => {
      z(v);
    }, uC);
  }, [
    v,
    z,
    w,
    Ft
  ]);
  me.useEffect(() => {
    if (v.promise && Ht === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Oe;
    return _ || E || Yt ? (() => {
      if (jr.current < It.current) {
        const Gt = (/* @__PURE__ */ new Date()).getTime() - It.current;
        De.current = De.current - Gt;
      }
      jr.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      De.current !== 1 / 0 && (It.current = (/* @__PURE__ */ new Date()).getTime(), Oe = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), kn();
      }, De.current));
    })(), () => clearTimeout(Oe);
  }, [
    _,
    E,
    v,
    Ht,
    Yt,
    kn
  ]), me.useEffect(() => {
    v.delete && (kn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    kn,
    v.delete
  ]);
  function va() {
    var Oe;
    if (N?.loading) {
      var ct;
      return /* @__PURE__ */ me.createElement("div", {
        className: ma(A?.loader, v == null || (ct = v.classNames) == null ? void 0 : ct.loader, "sonner-loader"),
        "data-visible": Ht === "loading"
      }, N.loading);
    }
    return /* @__PURE__ */ me.createElement(YT, {
      className: ma(A?.loader, v == null || (Oe = v.classNames) == null ? void 0 : Oe.loader),
      visible: Ht === "loading"
    });
  }
  const Jn = v.icon || N?.[Ht] || IT(Ht);
  var sa, hn;
  return /* @__PURE__ */ me.createElement("li", {
    tabIndex: 0,
    ref: bt,
    className: ma(q, qt, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[Ht], v == null || (i = v.classNames) == null ? void 0 : i[Ht]),
    "data-sonner-toast": "",
    "data-rich-colors": (sa = v.richColors) != null ? sa : K,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": Q,
    "data-promise": !!v.promise,
    "data-swiped": Pt,
    "data-removed": he,
    "data-visible": dn,
    "data-y-position": Zn,
    "data-x-position": Wt,
    "data-index": C,
    "data-front": xt,
    "data-swiping": Ae,
    "data-dismissible": On,
    "data-type": Ht,
    "data-invert": ei,
    "data-swipe-out": Ve,
    "data-swipe-direction": M,
    "data-expanded": !!(_ || W && Q),
    "data-testid": v.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": k.length - C,
      "--offset": `${he ? We : Ft.current}px`,
      "--initial-height": W ? "auto" : `${fe}px`,
      ...te,
      ...v.style
    },
    onDragEnd: () => {
      Me(!1), ne(null), la.current = null;
    },
    onPointerDown: (Oe) => {
      Oe.button !== 2 && (Ha || !On || (Te.current = /* @__PURE__ */ new Date(), pt(Ft.current), Oe.target.setPointerCapture(Oe.pointerId), Oe.target.tagName !== "BUTTON" && (Me(!0), la.current = {
        x: Oe.clientX,
        y: Oe.clientY
      })));
    },
    onPointerUp: () => {
      var Oe, ct, Dt;
      if (Ve || !On) return;
      la.current = null;
      const Gt = Number(((Oe = bt.current) == null ? void 0 : Oe.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((ct = bt.current) == null ? void 0 : ct.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Dt = Te.current) == null ? void 0 : Dt.getTime()), en = I === "x" ? Gt : wn, ga = Math.abs(en) / rt;
      if (Math.abs(en) >= cC || ga > 0.11) {
        pt(Ft.current), v.onDismiss == null || v.onDismiss.call(v, v), P(I === "x" ? Gt > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), kn(), Jt(!0);
        return;
      } else {
        var ln, O;
        (ln = bt.current) == null || ln.style.setProperty("--swipe-amount-x", "0px"), (O = bt.current) == null || O.style.setProperty("--swipe-amount-y", "0px");
      }
      At(!1), Me(!1), ne(null);
    },
    onPointerMove: (Oe) => {
      var ct, Dt, Gt;
      if (!la.current || !On || ((ct = window.getSelection()) == null ? void 0 : ct.toString().length) > 0) return;
      const rt = Oe.clientY - la.current.y, en = Oe.clientX - la.current.x;
      var ga;
      const ln = (ga = n.swipeDirections) != null ? ga : dC(J);
      !I && (Math.abs(en) > 1 || Math.abs(rt) > 1) && ne(Math.abs(en) > Math.abs(rt) ? "x" : "y");
      let O = {
        x: 0,
        y: 0
      };
      const V = (F) => 1 / (1.5 + Math.abs(F) / 20);
      if (I === "y") {
        if (ln.includes("top") || ln.includes("bottom"))
          if (ln.includes("top") && rt < 0 || ln.includes("bottom") && rt > 0)
            O.y = rt;
          else {
            const F = rt * V(rt);
            O.y = Math.abs(F) < Math.abs(rt) ? F : rt;
          }
      } else if (I === "x" && (ln.includes("left") || ln.includes("right")))
        if (ln.includes("left") && en < 0 || ln.includes("right") && en > 0)
          O.x = en;
        else {
          const F = en * V(en);
          O.x = Math.abs(F) < Math.abs(en) ? F : en;
        }
      (Math.abs(O.x) > 0 || Math.abs(O.y) > 0) && At(!0), (Dt = bt.current) == null || Dt.style.setProperty("--swipe-amount-x", `${O.x}px`), (Gt = bt.current) == null || Gt.style.setProperty("--swipe-amount-y", `${O.y}px`);
    }
  }, Ke && !v.jsx && Ht !== "loading" ? /* @__PURE__ */ me.createElement("button", {
    "aria-label": U,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !On ? () => {
    } : () => {
      kn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ma(A?.closeButton, v == null || (s = v.classNames) == null ? void 0 : s.closeButton)
  }, (hn = N?.close) != null ? hn : QT) : null, (Ht || v.icon || v.promise) && v.icon !== null && (N?.[Ht] !== null || v.icon) ? /* @__PURE__ */ me.createElement("div", {
    "data-icon": "",
    className: ma(A?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || va() : null, v.type !== "loading" ? Jn : null) : null, /* @__PURE__ */ me.createElement("div", {
    "data-content": "",
    className: ma(A?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ me.createElement("div", {
    "data-title": "",
    className: ma(A?.title, v == null || (h = v.classNames) == null ? void 0 : h.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ me.createElement("div", {
    "data-description": "",
    className: ma(le, ye, A?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ me.isValidElement(v.cancel) ? v.cancel : v.cancel && Xo(v.cancel) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || D,
    onClick: (Oe) => {
      Xo(v.cancel) && On && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Oe), kn());
    },
    className: ma(A?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ me.isValidElement(v.action) ? v.action : v.action && Xo(v.action) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || H,
    onClick: (Oe) => {
      Xo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Oe), !Oe.defaultPrevented && kn());
    },
    className: ma(A?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function _y() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function hC(n, a) {
  const i = {};
  return [
    n,
    a
  ].forEach((s, o) => {
    const u = o === 1, h = u ? "--mobile-offset" : "--offset", m = u ? lC : iC;
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
    typeof s == "number" || typeof s == "string" ? g(s) : typeof s == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      s[p] === void 0 ? i[`${h}-${p}`] = m : i[`${h}-${p}`] = typeof s[p] == "number" ? `${s[p]}px` : s[p];
    }) : g(m);
  }), i;
}
const mC = /* @__PURE__ */ me.forwardRef(function(a, i) {
  const { id: s, invert: o, position: u = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: g, className: p, offset: b, mobileOffset: v, theme: S = "light", richColors: E, duration: w, style: T, visibleToasts: R = rC, toastOptions: C, dir: k = _y(), gap: _ = oC, icons: z, containerAriaLabel: K = "Notifications" } = a, [ee, te] = me.useState([]), D = me.useMemo(() => s ? ee.filter((Q) => Q.toasterId === s) : ee.filter((Q) => !Q.toasterId), [
    ee,
    s
  ]), H = me.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((Q) => Q.position).map((Q) => Q.position)))), [
    D,
    u
  ]), [q, le] = me.useState([]), [re, J] = me.useState(!1), [ce, W] = me.useState(!1), [A, N] = me.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = me.useRef(null), I = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ne = me.useRef(null), M = me.useRef(!1), P = me.useCallback((Q) => {
    te((oe) => {
      var he;
      return (he = oe.find((ge) => ge.id === Q.id)) != null && he.delete || xn.dismiss(Q.id), oe.filter(({ id: ge }) => ge !== Q.id);
    });
  }, []);
  return me.useEffect(() => xn.subscribe((Q) => {
    if (Q.dismiss) {
      requestAnimationFrame(() => {
        te((oe) => oe.map((he) => he.id === Q.id ? {
          ...he,
          delete: !0
        } : he));
      });
      return;
    }
    setTimeout(() => {
      HT.flushSync(() => {
        te((oe) => {
          const he = oe.findIndex((ge) => ge.id === Q.id);
          return he !== -1 ? [
            ...oe.slice(0, he),
            {
              ...oe[he],
              ...Q
            },
            ...oe.slice(he + 1)
          ] : [
            Q,
            ...oe
          ];
        });
      });
    });
  }), [
    ee
  ]), me.useEffect(() => {
    if (S !== "system") {
      N(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? N("dark") : N("light")), typeof window > "u") return;
    const Q = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Q.addEventListener("change", ({ matches: oe }) => {
        N(oe ? "dark" : "light");
      });
    } catch {
      Q.addListener(({ matches: he }) => {
        try {
          N(he ? "dark" : "light");
        } catch (ge) {
          console.error(ge);
        }
      });
    }
  }, [
    S
  ]), me.useEffect(() => {
    ee.length <= 1 && J(!1);
  }, [
    ee
  ]), me.useEffect(() => {
    const Q = (oe) => {
      var he;
      if (h.every((Me) => oe[Me] || oe.code === Me)) {
        var Ae;
        J(!0), (Ae = U.current) == null || Ae.focus();
      }
      oe.code === "Escape" && (document.activeElement === U.current || (he = U.current) != null && he.contains(document.activeElement)) && J(!1);
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [
    h
  ]), me.useEffect(() => {
    if (U.current)
      return () => {
        ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null, M.current = !1);
      };
  }, [
    U.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ me.createElement("section", {
    ref: i,
    "aria-label": `${K} ${I}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, H.map((Q, oe) => {
    var he;
    const [ge, Ae] = Q.split("-");
    return D.length ? /* @__PURE__ */ me.createElement("ol", {
      key: Q,
      dir: k === "auto" ? _y() : k,
      tabIndex: -1,
      ref: U,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": ge,
      "data-x-position": Ae,
      style: {
        "--front-toast-height": `${((he = q[0]) == null ? void 0 : he.height) || 0}px`,
        "--width": `${sC}px`,
        "--gap": `${_}px`,
        ...T,
        ...hC(b, v)
      },
      onBlur: (Me) => {
        M.current && !Me.currentTarget.contains(Me.relatedTarget) && (M.current = !1, ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null));
      },
      onFocus: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || M.current || (M.current = !0, ne.current = Me.relatedTarget);
      },
      onMouseEnter: () => J(!0),
      onMouseMove: () => J(!0),
      onMouseLeave: () => {
        ce || J(!1);
      },
      onDragEnd: () => J(!1),
      onPointerDown: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || W(!0);
      },
      onPointerUp: () => W(!1)
    }, D.filter((Me) => !Me.position && oe === 0 || Me.position === Q).map((Me, Ve) => {
      var Jt, Pt;
      return /* @__PURE__ */ me.createElement(fC, {
        key: Me.id,
        icons: z,
        index: Ve,
        toast: Me,
        defaultRichColors: E,
        duration: (Jt = C?.duration) != null ? Jt : w,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Pt = C?.closeButton) != null ? Pt : g,
        interacting: ce,
        position: Q,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
        removeToast: P,
        toasts: D.filter((At) => At.position == Me.position),
        heights: q.filter((At) => At.position == Me.position),
        setHeights: le,
        expandByDefault: m,
        gap: _,
        expanded: re,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Ay = 32, Dy = -30, zy = -6, Oy = 0.5, ky = 2, Ly = -24, Uy = 24, By = -12, Vy = 12, $y = -12, Hy = 12, qy = -60, Iy = -20;
class Qi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Nx(n, a, i, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${$a}${o}`, h = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), g = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(g, p);
  }
  if (!h.ok)
    throw new Error(await Oc(h, "apply"));
  return await h.json();
}
async function pC(n, a, i, s, o = {}) {
  const u = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${$a}${u}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const g = await m.json().catch(() => null), p = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(p, b);
  }
  if (!m.ok)
    throw new Error(await Oc(m, "apply"));
  return await m.json();
}
async function vC(n, a, i = {}) {
  const s = `${$a}/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function gC(n, a, i, s = {}) {
  const o = `${$a}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Oc(u, "preview"));
  return u.blob();
}
async function uc(n, a, i, s = 50, o = {}) {
  const u = `${$a}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(u, {
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
function Tx(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > Ay)
    return {
      message: `Chain exceeds the maximum of ${Ay} operations.`
    };
  for (const i of n.ops) {
    const s = yC(i, a);
    if (s) return s;
  }
  return null;
}
function yC(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return bC(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < Dy || n.target_lufs > zy ? {
        opId: n.id,
        message: `Normalize target must be between ${Dy} and ${zy} LUFS.`
      } : null;
    case "speed":
      return n.factor < Oy || n.factor > ky ? {
        opId: n.id,
        message: `Speed factor must be between ${Oy}× and ${ky}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < Ly || n.gain_db > Uy ? {
        opId: n.id,
        message: `Volume must be between ${Ly} and ${Uy} dB.`
      } : null;
    case "eq3":
      for (const [i, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < By || s > Vy)
          return {
            opId: n.id,
            message: `EQ ${i} must be between ${By} and ${Vy} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < $y || n.semitones > Hy ? {
        opId: n.id,
        message: `Pitch must be between ${$y} and ${Hy} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < qy || n.threshold_db > Iy ? {
        opId: n.id,
        message: `Silence threshold must be between ${qy} and ${Iy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function bC(n, a, i, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && i > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function Oc(n, a) {
  const i = await n.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${n.status}`;
}
var xC = "_3f2ar0", SC = "_3f2ar1", wC = "_3f2ar2", EC = "_3f2ar3", jC = "_3f2ar4", NC = "_3f2ar6", Jl = "_3f2ar7", Wl = "_3f2ar8", es = "_3f2ar9", Fy = "_3f2ara", Yy = "_3f2arb";
function TC({ label: n, glyph: a = "?", children: i }) {
  const [s, o] = y.useState(!1), u = y.useRef(null), h = y.useId(), m = `${h}-content`, g = y.useCallback(() => o(!1), []);
  return y.useEffect(() => {
    if (!s) return;
    const p = (v) => {
      u.current && (v.target instanceof Node && u.current.contains(v.target) || g());
    }, b = (v) => {
      v.key === "Escape" && g();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", b);
    };
  }, [s, g]), /* @__PURE__ */ d.jsxs("span", { ref: u, className: xC, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: SC,
        "aria-expanded": s,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: wC, "aria-hidden": "true", children: a }),
          n
        ]
      }
    ),
    s && /* @__PURE__ */ d.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": h,
        className: EC,
        children: i
      }
    )
  ] });
}
var CC = "a6ki8u0", RC = "a6ki8u1", MC = "a6ki8u2", _C = "a6ki8u3", AC = "a6ki8u4", DC = "a6ki8u5", zC = "a6ki8u6", sf = "a6ki8u7", OC = "a6ki8u8", kC = "a6ki8u9", LC = "a6ki8ua", UC = "a6ki8ub", BC = "a6ki8uc", VC = "a6ki8ud", $C = "a6ki8ue", HC = "a6ki8uf", qC = "a6ki8ug", IC = "a6ki8uh", FC = "a6ki8ui", YC = "_1lguv7x0", GC = "_1lguv7x1", XC = "_1lguv7x2", PC = "_1lguv7x3", KC = "_1lguv7x4", QC = "_1lguv7x5", ZC = "_1lguv7x6", JC = "_1lguv7x7", WC = "_1lguv7x8", eR = "_1lguv7x9", tR = "_1lguv7xa", nR = "_1lguv7xb", aR = "_1lguv7xc", Gy = "_1lguv7xd", rR = "_1lguv7xe", iR = "_1lguv7xf", of = "_1lguv7xg", lR = "_1lguv7xh";
const sR = 28;
function oR(n) {
  if (!n) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(n.length, 12); i++)
    a = a * 33 + n.charCodeAt(i) >>> 0;
  return a || 1;
}
function cR(n, a) {
  const i = new Array(a);
  let s = n;
  for (let o = 0; o < a; o++) {
    s = (s * 9301 + 49297) % 233280;
    const u = s / 233280, h = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, h * (0.32 + u * 0.68));
  }
  return i;
}
function uR(n) {
  if (n == null) return "—";
  const a = Math.max(0, Math.round(n / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function dR(n) {
  return n ? `${(n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function fR({
  asset: n,
  presentation: a,
  usedBy: i,
  isPlaying: s,
  onTogglePlay: o,
  onRename: u,
  onCopyName: h,
  onDelete: m,
  onPlaybackEnded: g
}) {
  const [p, b] = y.useState(!1), [v, S] = y.useState(n.displayName), E = y.useRef(null), w = y.useMemo(() => oR(n.contentSha256), [n.contentSha256]), T = y.useMemo(() => cR(w, sR), [w]), R = y.useMemo(() => mT(n), [n]);
  y.useEffect(() => {
    S(n.displayName);
  }, [n.displayName]), y.useEffect(() => {
    const _ = E.current;
    _ && (s && R ? _.play().catch(() => {
    }) : (_.pause(), _.currentTime = 0));
  }, [s, R]);
  const C = async () => {
    const _ = v.trim();
    if (!_ || _ === n.displayName) {
      b(!1), S(n.displayName);
      return;
    }
    try {
      await u(_);
    } finally {
      b(!1);
    }
  }, k = `${uR(n.durationMs)} · ${dR(n.sampleRate)}`;
  return /* @__PURE__ */ d.jsxs("article", { className: YC, "data-playing": s ? "true" : "false", children: [
    /* @__PURE__ */ d.jsxs("header", { className: GC, children: [
      /* @__PURE__ */ d.jsx("span", { className: XC, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ d.jsxs("div", { className: PC, children: [
        p ? /* @__PURE__ */ d.jsx(
          "input",
          {
            className: QC,
            value: v,
            autoFocus: !0,
            onChange: (_) => S(_.target.value),
            onBlur: () => {
              C();
            },
            onKeyDown: (_) => {
              _.key === "Enter" ? (_.preventDefault(), _.currentTarget.blur()) : _.key === "Escape" && (b(!1), S(n.displayName));
            },
            "aria-label": `Rename ${n.displayName}`
          }
        ) : /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: KC,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: n.displayName
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: ZC, children: k })
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: JC, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: WC,
        "data-playing": s ? "true" : "false",
        disabled: R == null,
        title: R ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": s ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ d.jsx("span", { className: eR, "aria-hidden": "true", children: s ? "❚❚" : "▶" }),
          /* @__PURE__ */ d.jsx("span", { className: tR, "aria-hidden": "true", children: T.map((_, z) => /* @__PURE__ */ d.jsx("span", { className: nR, style: { height: `${Math.round(_ * 100)}%` } }, z)) })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("footer", { className: aR, children: [
      i.length > 0 ? /* @__PURE__ */ d.jsxs("span", { className: Gy, children: [
        /* @__PURE__ */ d.jsx("span", { children: "used by" }),
        i.map((_) => /* @__PURE__ */ d.jsx(
          "span",
          {
            className: rR,
            style: { color: _.color, borderColor: _.color },
            children: _.characterName
          },
          _.characterName
        ))
      ] }) : /* @__PURE__ */ d.jsx("span", { className: Gy, children: "unassigned" }),
      /* @__PURE__ */ d.jsxs("span", { className: iR, children: [
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: of,
            title: "Rename",
            "aria-label": "Rename voice",
            onClick: () => b(!0),
            children: "✎"
          }
        ),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: of,
            title: "Copy name",
            "aria-label": "Copy voice name",
            onClick: h,
            children: "⧉"
          }
        ),
        m && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: of,
            "data-tone": "danger",
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
        className: lR,
        onEnded: g
      }
    )
  ] });
}
var hR = "_17eol302", mR = "_17eol303", pR = "_17eol304", vR = "_17eol305", gR = "_17eol306", yR = "_17eol307", Ui = "_17eol308", bR = "_17eol309", xR = "_17eol30a", SR = "_17eol30b", wR = "_17eol30c", ER = "_17eol30d", Xy = "_17eol30e", jR = "_17eol30g";
function NR() {
  if (typeof MediaRecorder > "u")
    return { mime: "audio/webm", ext: "webm" };
  const n = [
    { mime: "audio/webm;codecs=opus", ext: "webm" },
    { mime: "audio/webm", ext: "webm" },
    { mime: "audio/ogg;codecs=opus", ext: "ogg" },
    { mime: "audio/mp4", ext: "m4a" }
  ];
  for (const a of n)
    if (MediaRecorder.isTypeSupported?.(a.mime)) return a;
  return { mime: "", ext: "webm" };
}
function TR(n) {
  const a = Math.max(0, Math.floor(n / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function CR({
  open: n,
  defaultName: a,
  onClose: i,
  onSubmit: s
}) {
  const [o, u] = y.useState("idle"), [h, m] = y.useState(null), [g, p] = y.useState(0), [b, v] = y.useState(null), [S, E] = y.useState(a), [w, T] = y.useState(!1), R = y.useRef(null), C = y.useRef(null), k = y.useRef([]), _ = y.useRef(0), z = y.useRef(null), K = y.useRef(null), ee = y.useRef({ mime: "audio/webm", ext: "webm" }), te = y.useRef(null), D = y.useRef(null), H = y.useRef(null);
  y.useEffect(() => {
    if (n)
      return H.current = document.activeElement ?? null, requestAnimationFrame(() => {
        te.current?.scrollIntoView({ behavior: "smooth", block: "center" }), D.current?.focus();
      }), () => {
        H.current?.focus?.();
      };
  }, [n]), y.useEffect(() => {
    if (!n) return;
    const A = (N) => {
      N.key === "Escape" && i();
    };
    return window.addEventListener("keydown", A), () => window.removeEventListener("keydown", A);
  }, [n, i]);
  const q = y.useCallback(() => {
    if (C.current) {
      for (const A of C.current.getTracks()) A.stop();
      C.current = null;
    }
    z.current != null && (window.clearInterval(z.current), z.current = null);
  }, []), le = y.useCallback(() => {
    q(), b && URL.revokeObjectURL(b), v(null), k.current = [], K.current = null, p(0), m(null), u("idle");
  }, [b, q]);
  if (y.useEffect(() => {
    n || (le(), E(a));
  }, [n, a, le]), y.useEffect(() => () => {
    q(), b && URL.revokeObjectURL(b);
  }, [b, q]), !n) return null;
  const re = async () => {
    m(null), u("preparing");
    try {
      const A = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      C.current = A;
      const N = NR();
      ee.current = N;
      const U = N.mime ? new MediaRecorder(A, { mimeType: N.mime }) : new MediaRecorder(A);
      R.current = U, k.current = [], U.ondataavailable = (I) => {
        I.data && I.data.size > 0 && k.current.push(I.data);
      }, U.onstop = () => {
        const I = N.mime || "audio/webm", ne = new Blob(k.current, { type: I }), M = new File([ne], `${S || a || "recording"}.${N.ext}`, {
          type: I
        });
        K.current = M;
        const P = URL.createObjectURL(ne);
        v(P), u("ready"), q();
      }, U.start(), _.current = Date.now(), p(0), z.current = window.setInterval(() => {
        p(Date.now() - _.current);
      }, 200), u("recording");
    } catch (A) {
      const N = A instanceof Error ? A.message : "could not access microphone";
      m(N), u(N.toLowerCase().includes("denied") ? "denied" : "error"), q();
    }
  }, J = () => {
    const A = R.current;
    A && A.state !== "inactive" && A.stop(), z.current != null && (window.clearInterval(z.current), z.current = null);
  }, ce = async () => {
    const A = K.current;
    if (!A) return;
    const N = (S || a).trim();
    if (!N) {
      m("Name cannot be empty");
      return;
    }
    T(!0);
    try {
      await s(A, N), i();
    } catch (U) {
      m(U instanceof Error ? U.message : "upload failed");
    } finally {
      T(!1);
    }
  }, W = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ d.jsx("div", { className: hR, role: "presentation", onClick: i, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: te,
      className: mR,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (A) => A.stopPropagation(),
      tabIndex: -1,
      children: [
        /* @__PURE__ */ d.jsx("h2", { id: "mic-recorder-heading", className: pR, children: "Record reference audio" }),
        /* @__PURE__ */ d.jsx("p", { className: vR, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: gR,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: W
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: wR, "aria-live": "polite", children: TR(g) }),
        /* @__PURE__ */ d.jsxs("div", { className: yR, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ d.jsxs(
            "button",
            {
              ref: D,
              type: "button",
              className: Ui,
              "data-tone": "danger",
              onClick: () => {
                re();
              },
              children: [
                /* @__PURE__ */ d.jsx("span", { className: Xy, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ d.jsx("button", { type: "button", className: Ui, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ d.jsxs(
            "button",
            {
              type: "button",
              className: Ui,
              "data-tone": "danger",
              "data-active": "true",
              onClick: J,
              children: [
                /* @__PURE__ */ d.jsx("span", { className: Xy, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: Ui,
              onClick: () => {
                le();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ d.jsx("audio", { className: ER, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ d.jsxs("label", { className: bR, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: xR,
              value: S,
              onChange: (A) => E(A.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ d.jsx("div", { className: SR, children: h }),
        /* @__PURE__ */ d.jsxs("div", { className: jR, children: [
          /* @__PURE__ */ d.jsx("button", { type: "button", className: Ui, onClick: i, disabled: w, children: "Cancel" }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: Ui,
              "data-tone": "accent",
              onClick: () => {
                ce();
              },
              disabled: o !== "ready" || w,
              children: w ? "Saving…" : "Save voice"
            }
          )
        ] })
      ]
    }
  ) });
}
function RR({
  deploymentId: n,
  voiceAssets: a,
  mappings: i,
  characterColors: s,
  onVoiceAssetsChange: o
}) {
  const [u, h] = y.useState(""), [m, g] = y.useState("all"), [p, b] = y.useState(!1), [v, S] = y.useState(null), [E, w] = y.useState(!1), [T, R] = y.useState(!1), C = y.useRef(null), k = y.useCallback(
    (J) => "upload",
    []
  ), _ = y.useMemo(() => {
    const J = u.trim().toLowerCase();
    return a.filter((ce) => {
      const W = k(ce);
      return !(m === "uploaded" && W !== "upload" || m === "preset" && W !== "preset" || J && !ce.displayName.toLowerCase().includes(J));
    });
  }, [a, u, m, k]), z = y.useMemo(
    () => a.filter((J) => k(J) === "upload").length,
    [a, k]
  ), K = y.useCallback(
    (J) => {
      const ce = [], W = /* @__PURE__ */ new Set();
      for (const A of i)
        A.speakerVoiceAssetId === J && (W.has(A.characterName) || (W.add(A.characterName), ce.push({
          characterName: A.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: s[A.characterName] ?? "#ba9eff"
        })));
      return ce;
    },
    [i, s]
  ), ee = y.useCallback(
    async (J) => {
      const ce = Array.from(J).slice(0, 8);
      if (ce.length !== 0) {
        R(!0);
        try {
          const W = [];
          for (const A of ce) {
            if (!A.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(A.name)) {
              Zt.error(`${A.name}: not an audio file`);
              continue;
            }
            const N = A.name.replace(/\.[^.]+$/, "");
            try {
              const U = await gc(n, A, N, "speaker");
              W.push(U), Zt.success(`Added ${U.displayName}`);
            } catch (U) {
              Zt.error(U instanceof Error ? U.message : `${A.name}: upload failed`);
            }
          }
          W.length > 0 && o([...W, ...a]);
        } finally {
          R(!1);
        }
      }
    },
    [n, a, o]
  ), te = (J) => {
    J.preventDefault(), b(!1), J.dataTransfer?.files && ee(J.dataTransfer.files);
  }, D = y.useCallback(async () => {
    const J = window.prompt("Paste an audio URL (https://…)");
    if (J)
      try {
        const ce = await fetch(J);
        if (!ce.ok) throw new Error(`fetch failed: ${ce.status}`);
        const W = await ce.blob(), A = J.split("/").pop()?.split("?")[0] ?? "voice.wav", N = new File([W], A, { type: W.type || "audio/wav" });
        await ee([N]);
      } catch (ce) {
        Zt.error(ce instanceof Error ? ce.message : "could not fetch URL");
      }
  }, [ee]), H = y.useCallback(
    async (J, ce) => {
      try {
        const W = await hT(n, J, ce);
        o(
          a.map((A) => A.voiceAssetId === J ? W : A)
        ), Zt.success(`Renamed to ${W.displayName}`);
      } catch (W) {
        Zt.error(W instanceof Error ? W.message : "rename failed");
      }
    },
    [n, a, o]
  ), q = y.useCallback((J) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(J), Zt.success("Copied name")) : Zt.error("Clipboard unavailable");
  }, []), le = y.useCallback(
    async (J) => {
      if (window.confirm(`Delete "${J.displayName}"? Mappings using it will reset.`))
        try {
          await fT(n, J.voiceAssetId), o(a.filter((W) => W.voiceAssetId !== J.voiceAssetId)), Zt.success(`Deleted ${J.displayName}`);
        } catch (W) {
          Zt.error(W instanceof Error ? W.message : "delete failed");
        }
    },
    [n, a, o]
  );
  return /* @__PURE__ */ d.jsxs("div", { className: CC, children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: RC,
        "data-over": p ? "true" : "false",
        onDragOver: (J) => {
          J.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: te,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: MC, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ d.jsxs("div", { className: _C, children: [
            /* @__PURE__ */ d.jsxs("div", { className: AC, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ d.jsx("span", { className: DC, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: zC, children: [
              "or",
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: sf,
                  onClick: () => C.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: sf,
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
                  className: sf,
                  onClick: () => w(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: OC,
              disabled: T,
              onClick: () => C.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              ref: C,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: FC,
              onChange: (J) => {
                J.target.files && (ee(J.target.files), J.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: kC, children: [
      /* @__PURE__ */ d.jsxs("label", { className: LC, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            className: UC,
            value: u,
            onChange: (J) => h(J.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: BC, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([J, ce]) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: VC,
          "data-active": m === J ? "true" : "false",
          onClick: () => g(J),
          children: ce
        },
        J
      )) }),
      /* @__PURE__ */ d.jsxs("span", { className: qC, children: [
        /* @__PURE__ */ d.jsx("span", { className: IC, children: a.length }),
        " voices",
        /* @__PURE__ */ d.jsx("span", { children: "·" }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          z,
          " uploaded"
        ] })
      ] })
    ] }),
    _.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: HC, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ d.jsx("div", { className: $C, children: _.map((J) => {
      const ce = k(J);
      return /* @__PURE__ */ d.jsx(
        fR,
        {
          asset: J,
          presentation: ce,
          usedBy: K(J.voiceAssetId),
          isPlaying: v === J.voiceAssetId,
          onTogglePlay: () => S((W) => W === J.voiceAssetId ? null : J.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (W) => H(J.voiceAssetId, W),
          onCopyName: () => q(J.displayName),
          onDelete: ce === "upload" ? () => void le(J) : void 0
        },
        J.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ d.jsx(
      CR,
      {
        open: E,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => w(!1),
        onSubmit: async (J, ce) => {
          await re(J, ce);
        }
      }
    )
  ] });
  async function re(J, ce) {
    R(!0);
    try {
      const W = await gc(n, J, ce, "speaker");
      o([W, ...a]), Zt.success(`Recorded ${W.displayName}`);
    } catch (W) {
      throw Zt.error(W instanceof Error ? W.message : "upload failed"), W;
    } finally {
      R(!1);
    }
  }
}
async function Cx(n) {
  return ht(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function MR(n, a, i) {
  return ht("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: i })
  });
}
async function _R(n, a) {
  await ht(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var Py = "_190jlds0", AR = "_190jlds1", DR = "_190jlds2", zR = "_190jlds3", OR = "_190jlds4", kR = "_190jlds5", LR = "_190jlds7", UR = "_190jlds8", BR = "_190jlds9", VR = "_190jldsa", $R = "_190jldsb", Ky = "_190jldsc", HR = "_190jldsd", Qy = "_190jldse", qR = "_190jldsf", IR = "_190jldsg", FR = "_190jldsh", Rx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Mx = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, YR = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, GR = "_4ydn54f";
function ft({
  variant: n = "primary",
  size: a = "md",
  type: i = "button",
  loading: s = !1,
  iconOnly: o = !1,
  disabled: u,
  children: h,
  className: m,
  style: g,
  ...p
}) {
  const b = [
    Rx[n],
    Mx[a],
    o ? YR[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsxs(
    "button",
    {
      type: i,
      className: b,
      style: g,
      disabled: s || u,
      "aria-busy": s || void 0,
      ...p,
      children: [
        s ? /* @__PURE__ */ d.jsx("span", { className: GR, "aria-hidden": "true" }) : null,
        h
      ]
    }
  );
}
function XR({
  deploymentId: n,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [u, h] = y.useState(() => Bi(a[0])), [m, g] = y.useState([]), [p, b] = y.useState(!1), [v, S] = y.useState(null), [E, w] = y.useState(!1), [T, R] = y.useState(null), C = y.useMemo(
    () => a.find((z) => Bi(z) === u) ?? a[0],
    [a, u]
  );
  y.useEffect(() => {
    a.length && (a.some((z) => Bi(z) === u) || h(Bi(a[0])));
  }, [a, u]), y.useEffect(() => {
    if (!C) {
      g([]);
      return;
    }
    let z = !1;
    return b(!0), S(null), uc(n, C.kind, C.id, 50).then((K) => {
      z || g(K.entries);
    }).catch((K) => {
      z || S(K instanceof Error ? K.message : "audit fetch failed");
    }).finally(() => {
      z || b(!1);
    }), () => {
      z = !0;
    };
  }, [n, C]);
  const k = y.useCallback(() => {
    if (!C) return;
    const z = {
      deploymentId: n,
      targetKind: C.kind,
      targetId: C.id,
      targetLabel: C.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, K = new Blob([JSON.stringify(z, null, 2)], {
      type: "application/json"
    }), ee = URL.createObjectURL(K), te = document.createElement("a");
    te.href = ee, te.download = `audit-${C.kind}-${C.id}-${Date.now()}.json`, document.body.appendChild(te), te.click(), document.body.removeChild(te), URL.revokeObjectURL(ee);
  }, [n, m, C]), _ = y.useCallback(async () => {
    if (!(!C || !i) && window.confirm(
      `Revert "${C.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      w(!0);
      try {
        await i(C);
        const z = await uc(n, C.kind, C.id, 50);
        g(z.entries);
      } catch (z) {
        S(z instanceof Error ? z.message : "revert failed");
      } finally {
        w(!1);
      }
    }
  }, [n, i, C]);
  return a.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: Py, children: /* @__PURE__ */ d.jsx("p", { className: Qy, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ d.jsxs("div", { className: Py, children: [
    /* @__PURE__ */ d.jsxs("header", { className: AR, children: [
      /* @__PURE__ */ d.jsxs("div", { className: DR, children: [
        /* @__PURE__ */ d.jsx("label", { htmlFor: "audit-target-select", className: Ky, children: "Target" }),
        /* @__PURE__ */ d.jsx(
          "select",
          {
            id: "audit-target-select",
            className: zR,
            value: u,
            onChange: (z) => h(z.target.value),
            children: a.map((z) => /* @__PURE__ */ d.jsxs("option", { value: Bi(z), children: [
              z.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              z.label
            ] }, Bi(z)))
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: OR, children: [
        /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: k,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void _(),
            disabled: E || !C,
            children: E ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ d.jsx("div", { className: IR, children: v }),
    p && !v && /* @__PURE__ */ d.jsx("div", { className: FR, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ d.jsxs("p", { className: Qy, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ d.jsx("br", {}),
      /* @__PURE__ */ d.jsx("span", { className: qR, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: LR, children: m.map((z) => {
      const K = s && C && !!z.chain_snapshot_json && z.operation_count > 0;
      return /* @__PURE__ */ d.jsxs("li", { className: UR, children: [
        /* @__PURE__ */ d.jsx("span", { className: BR, children: PR(z.recorded_at) }),
        /* @__PURE__ */ d.jsx("span", { className: VR, children: z.operation_count === 0 ? "cleared" : `${z.operation_count} ops` }),
        /* @__PURE__ */ d.jsxs("span", { className: $R, title: z.digest_after, children: [
          z.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: Ky, children: z.actor || "—" }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: HR,
            style: {
              background: `color-mix(in oklab, ${z.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: z.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: z.digest_before === "" || !z.digest_before ? "create" : z.operation_count === 0 ? "clear" : "update"
          }
        ),
        K && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: kR,
            disabled: E || T !== null,
            onClick: async () => {
              if (!(!C || !z.chain_snapshot_json) && !(T !== null || E) && window.confirm(
                `Replay this ${z.operation_count}-op chain on "${C.label}"? A new audit entry will be written.`
              )) {
                R(z.entry_id);
                try {
                  await s(C, z.chain_snapshot_json, z);
                  const ee = await uc(
                    n,
                    C.kind,
                    C.id,
                    50
                  );
                  g(ee.entries);
                } catch (ee) {
                  S(ee instanceof Error ? ee.message : "revert failed");
                } finally {
                  R(null);
                }
              }
            },
            children: T === z.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, z.entry_id);
    }) })
  ] });
}
function Bi(n) {
  return n ? `${n.kind}:${n.id}` : "";
}
function PR(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var KR = "_1uzgubz0", QR = "_1uzgubz1", ZR = "_1uzgubz2", JR = "_1uzgubz3", WR = "_1uzgubz4", eM = "_1uzgubz5", tM = "_1uzgubz6", nM = "_1uzgubz7", Zy = "_1uzgubz8", aM = "_1uzgubz9", _x = "_1uzgubza", Ax = "_1uzgubzb", rM = "_1uzgubzc", iM = "_1uzgubzd", cf = "_1uzgubze", uf = "_1uzgubzf", lM = "_1uzgubzg", sM = "_1uzgubzh", Jy = "_1uzgubzi", Wy = "_1uzgubzj", e0 = "_1uzgubzk", t0 = "_1uzgubzl", n0 = "_1uzgubzm", oM = "_1uzgubzn", cM = "_1uzgubzo", uM = "_1uzgubzp", dM = "_1uzgubzq", fM = "_1uzgubzr";
function hM({
  characterName: n,
  color: a,
  lineCount: i,
  mapping: s,
  voiceAssets: o,
  presets: u,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: g,
  onAssignPreset: p,
  onUploadFile: b,
  onClearMapping: v
}) {
  const [S, E] = y.useState(!1), w = s ? o.find((k) => k.voiceAssetId === s.speakerVoiceAssetId) : null, T = s?.defaultVectorPresetId ? u.find((k) => k.presetId === s.defaultVectorPresetId) ?? null : null, R = (n[0] ?? "?").toUpperCase(), C = s !== null;
  return /* @__PURE__ */ d.jsxs("div", { className: `${KR}${h ? ` ${QR}` : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: ZR,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: JR,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: R
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: WR, children: [
            /* @__PURE__ */ d.jsx("span", { className: eM, style: { color: a }, children: n }),
            /* @__PURE__ */ d.jsxs("span", { className: tM, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: nM, children: [
            w ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: Zy, children: w.displayName }),
              w.durationMs != null && /* @__PURE__ */ d.jsxs("span", { children: [
                a0(w.durationMs),
                " ·",
                " ",
                w.sampleRate ? `${w.sampleRate} Hz` : "—"
              ] })
            ] }) : T ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: Zy, children: T.presetName }),
              /* @__PURE__ */ d.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ d.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ d.jsxs("span", { className: rM, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: `${aM} ${C ? _x : Ax}`,
              children: C ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ d.jsxs("div", { className: iM, children: [
      /* @__PURE__ */ d.jsxs("div", { className: cf, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Drop new audio" }),
        /* @__PURE__ */ d.jsxs(
          "label",
          {
            className: `${lM}${S ? ` ${sM}` : ""}`,
            onDragEnter: (k) => {
              k.preventDefault(), E(!0);
            },
            onDragOver: (k) => k.preventDefault(),
            onDragLeave: () => E(!1),
            onDrop: (k) => {
              k.preventDefault(), E(!1);
              const _ = k.dataTransfer.files?.[0];
              _ && b && b(_);
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
                    _ && b && b(_);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: cf, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Reference library" }),
        /* @__PURE__ */ d.jsx("div", { className: Jy, children: o.map((k) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${Wy}${s?.speakerVoiceAssetId === k.voiceAssetId ? ` ${e0}` : ""}`,
            onClick: () => g(k.voiceAssetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: t0, children: k.displayName }),
              /* @__PURE__ */ d.jsxs("span", { className: n0, children: [
                k.durationMs != null ? a0(k.durationMs) : "—",
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
      u.length > 0 && p && /* @__PURE__ */ d.jsxs("div", { className: cf, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Preset voices" }),
        /* @__PURE__ */ d.jsx("div", { className: Jy, children: u.map((k) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${Wy}${s?.defaultVectorPresetId === k.presetId ? ` ${e0}` : ""}`,
            onClick: () => p(k.presetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: t0, children: k.presetName }),
              /* @__PURE__ */ d.jsx("span", { className: n0, children: "preset · vector" })
            ]
          },
          k.presetId
        )) })
      ] }),
      C && v && /* @__PURE__ */ d.jsx("button", { type: "button", className: fM, onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function a0(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const a = Math.round(n / 1e3), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function mM({
  unmappedCount: n,
  totalCount: a,
  children: i,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ d.jsx("p", { className: dM, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsx("header", { className: oM, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `${cM} ${o ? _x : Ax}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ d.jsx("ul", { className: uM, children: i })
  ] });
}
async function yc() {
  return ht("/runtime/health");
}
async function Dx() {
  await ht("/runtime/start", { method: "POST" });
}
async function zx() {
  return ht("/runtime/stop", { method: "POST" });
}
function Ox(n) {
  switch (n) {
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
var pM = "g5r6d10", vM = "g5r6d11", gM = "g5r6d12", yM = "g5r6d13", bM = "g5r6d14", xM = "g5r6d15", SM = "g5r6d1a", wM = "g5r6d1b", EM = "g5r6d1c", jM = "g5r6d1d", NM = "g5r6d1e", TM = "g5r6d1g", CM = "g5r6d1h", RM = "g5r6d1i", MM = "g5r6d1j", _M = "g5r6d1k", AM = "g5r6d1l", DM = "g5r6d1m", zM = "g5r6d1n", OM = "g5r6d1o", r0 = "g5r6d1p", kM = "g5r6d1q", LM = "g5r6d1r", UM = "g5r6d1s", i0 = "g5r6d1t", l0 = "g5r6d1u", BM = "g5r6d1v", VM = "g5r6d1w", Yi = "g5r6d1x", $M = "g5r6d1y", s0 = "g5r6d1z", HM = "g5r6d110", qM = "g5r6d111", fr = "g5r6d112", IM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function zn({
  severity: n,
  children: a,
  role: i,
  ariaLive: s,
  className: o,
  style: u
}) {
  const h = [IM[n], o].filter(Boolean).join(" "), m = i ?? (n === "error" ? "alert" : "status"), g = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ d.jsx("div", { className: h, role: m, "aria-live": g, style: u, children: a });
}
var kx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Lx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, FM = "_13bb4njb";
function Zr({
  tone: n,
  size: a = "sm",
  pulse: i = !1,
  children: s,
  className: o,
  style: u,
  title: h
}) {
  const m = i && n !== "faint", g = [kx[a], Lx[n], m ? FM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("span", { className: g, style: u, title: h, children: s });
}
const YM = 4e3;
function GM({ deployment: n }) {
  const [a, i] = y.useState(null), [s, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const g = async () => {
      try {
        const b = await yc();
        m || (i(b), o(null));
      } catch (b) {
        m || o(KM(b));
      }
    };
    g();
    const p = setInterval(g, YM);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const u = a?.badge ?? "not_installed", h = s?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ d.jsxs("output", { className: $M, "aria-live": "polite", children: [
    /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Runtime" }),
    /* @__PURE__ */ d.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Badge" }),
    /* @__PURE__ */ d.jsx(Zr, { tone: XM(u), pulse: u === "starting" || u === "installing", children: Ox(u) }),
    a && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Uptime" }),
      /* @__PURE__ */ d.jsx("span", { children: PM(a.uptimeSeconds) }),
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "VRAM" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    s && !h && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: s })
  ] });
}
function XM(n) {
  switch (n) {
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
function PM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function KM(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
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
function QM(n, a, i) {
  for (const s of Object.keys(bc)) {
    const o = bc[s];
    if (Math.abs(o.low - n) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - i) < Ua)
      return s;
  }
  return "custom";
}
function ZM(n) {
  let a = WM();
  for (const i of n.ops)
    a = JM(a, i);
  return a;
}
function JM(n, a) {
  switch (a.mode) {
    case "gain":
      return { ...n, volumeDb: a.gain_db };
    case "eq3":
      return {
        ...n,
        eq3: {
          low: a.low_db,
          mid: a.mid_db,
          high: a.high_db,
          preset: QM(a.low_db, a.mid_db, a.high_db)
        }
      };
    case "speed":
      return { ...n, speed: { mode: "audio", value: a.factor } };
    case "pitch_shift":
      return { ...n, pitchSt: a.semitones };
    case "normalize":
      return {
        ...n,
        normalize: { mode: "loudness", targetDbOrLufs: a.target_lufs }
      };
    case "fade_in":
      return {
        ...n,
        fade: { ...n.fade, inS: a.duration_ms / 1e3 }
      };
    case "fade_out":
      return {
        ...n,
        fade: { ...n.fade, outS: a.duration_ms / 1e3 }
      };
    case "silence_strip":
      return {
        ...n,
        silence: { enabled: !0, thresholdDb: a.threshold_db }
      };
    default:
      return n;
  }
}
function WM() {
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
function wr(n, a) {
  return n.ops.filter((i) => i.mode !== a);
}
function Er(n, a) {
  return [...n, a];
}
function e_(n, a) {
  const i = wr(n, "gain");
  if (Math.abs(a) < Ua) return { ...n, ops: i };
  const s = { id: Sn(), mode: "gain", gain_db: a };
  return { ...n, ops: Er(i, s) };
}
function t_(n, a, i, s) {
  const o = wr(n, "eq3");
  if (Math.abs(a) < Ua && Math.abs(i) < Ua && Math.abs(s) < Ua)
    return { ...n, ops: o };
  const u = {
    id: Sn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: s
  };
  return { ...n, ops: Er(o, u) };
}
function n_(n, a) {
  const i = wr(n, "speed");
  if (Math.abs(a - 1) < Ua) return { ...n, ops: i };
  const s = { id: Sn(), mode: "speed", factor: a };
  return { ...n, ops: Er(i, s) };
}
function a_(n, a) {
  const i = wr(n, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...n, ops: i };
  const s = {
    id: Sn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: Er(i, s) };
}
function r_(n, a, i) {
  const s = wr(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: Sn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...n, ops: Er(s, o) };
}
function i_(n, a) {
  const i = wr(n, "fade_in");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: Sn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: Er(i, s) };
}
function l_(n, a) {
  const i = wr(n, "fade_out");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: Sn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: Er(i, s) };
}
function s_(n, a, i) {
  const s = wr(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: Sn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...n, ops: Er(s, o) };
}
const Ux = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function Bx(n, a) {
  const i = {
    ...n,
    ops: n.ops.filter((u) => !Ux.has(u.mode))
  };
  let o = e_({ version: 1, ops: [] }, a.volumeDb);
  return o = t_(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = n_(o, a.speed.value)), o = a_(o, a.pitchSt), o = r_(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = i_(o, a.fade.inS), o = l_(o, a.fade.outS), o = s_(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function Vx(n) {
  const a = {
    ...n,
    ops: n.ops.filter((i) => Ux.has(i.mode))
  };
  return ZM(a);
}
var o_ = "_1rsa80i0", c_ = "_1rsa80i1", u_ = "_1rsa80i2", d_ = "_1rsa80i3", f_ = "_1rsa80i4", h_ = "_1rsa80i5", m_ = "_1rsa80i6", p_ = "_1rsa80i7", v_ = "_1rsa80i8", g_ = "_1rsa80i9";
const $x = ["flat", "warm", "bright", "voice", "telephone"], ts = -12, Po = 12, y_ = 0.5;
function b_(n) {
  const { low: a, mid: i, high: s, preset: o, onChange: u, disabled: h } = n, m = (p) => {
    const b = bc[p];
    u(b.low, b.mid, b.high, p);
  }, g = (p, b) => {
    const v = { low: a, mid: i, high: s, [p]: b }, S = S_(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: o_, children: [
    /* @__PURE__ */ d.jsxs("div", { className: c_, role: "group", "aria-label": "EQ presets", children: [
      $x.map((p) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: u_,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ d.jsx("span", { className: d_, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: f_, children: [
      /* @__PURE__ */ d.jsx(
        df,
        {
          label: "Low",
          value: a,
          onChange: (p) => g("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        df,
        {
          label: "Mid",
          value: i,
          onChange: (p) => g("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        df,
        {
          label: "High",
          value: s,
          onChange: (p) => g("high", p),
          disabled: h
        }
      )
    ] })
  ] });
}
function df({ label: n, value: a, onChange: i, disabled: s }) {
  const o = (a - ts) / (Po - ts) * 100, u = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: h_, children: [
    /* @__PURE__ */ d.jsx("label", { htmlFor: u, className: m_, children: n }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: ts,
        max: Po,
        step: y_,
        value: a,
        disabled: s,
        className: v_,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": ts,
        "aria-valuemax": Po,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: p_, children: x_(a) }),
    /* @__PURE__ */ d.jsxs("span", { className: g_, "aria-hidden": "true", children: [
      /* @__PURE__ */ d.jsx("span", { children: ts }),
      /* @__PURE__ */ d.jsx("span", { children: "0" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "+",
        Po
      ] })
    ] })
  ] });
}
function x_(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const ff = 1e-3;
function S_(n, a, i) {
  for (const s of $x) {
    const o = bc[s];
    if (Math.abs(o.low - n) < ff && Math.abs(o.mid - a) < ff && Math.abs(o.high - i) < ff)
      return s;
  }
  return "custom";
}
var w_ = "_85bhwb0", E_ = "_85bhwb1", o0 = "_85bhwb2", j_ = "_85bhwb3", N_ = "_85bhwb4", T_ = "_85bhwb5", C_ = "_85bhwb6", R_ = "_85bhwb7";
const Ko = 0.5, hf = 2, M_ = 0.05;
function __(n) {
  const { mode: a, value: i, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: u, disabled: h } = n, m = (i - Ko) / (hf - Ko) * 100, g = y.useId(), p = (v) => o(v, i), b = (v) => o(a, v);
  return /* @__PURE__ */ d.jsxs("div", { className: w_, children: [
    s ? /* @__PURE__ */ d.jsxs("div", { className: E_, role: "group", "aria-label": "Speed mode", children: [
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
    /* @__PURE__ */ d.jsxs("div", { className: j_, children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Ko,
          max: hf,
          step: M_,
          value: i,
          disabled: h,
          className: N_,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": hf,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: T_, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ d.jsxs("div", { className: C_, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: h || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: R_, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var A_ = "kgszk50", D_ = "kgszk51", c0 = "kgszk52", z_ = "kgszk53", O_ = "kgszk54", Hx = "kgszk55", k_ = "kgszk56", L_ = "kgszk58", kh = "kgszk59", qx = "kgszk5a", Lh = "kgszk5b", U_ = "kgszk5c", B_ = "kgszk5d", V_ = "kgszk5e", u0 = "kgszk5f", d0 = "kgszk5g", f0 = "kgszk5h", $_ = "kgszk5i", H_ = "kgszk5j", q_ = "kgszk5l", vs = "kgszk5m", gs = "kgszk5n";
const I_ = -24, F_ = 24, Y_ = 0.5, G_ = -12, X_ = 12, P_ = 0.5, K_ = -30, Q_ = -6, Z_ = -12, J_ = 0, Qo = -60, mf = -20;
function Uh(n) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: h = !1,
    disabled: m = !1,
    onApply: g,
    applyLabel: p = "Apply edit"
  } = n, b = (E) => {
    i({ ...a, ...E });
  }, v = nA(a), S = (E) => {
    const w = E.target;
    w && (w.tagName === "INPUT" || w.tagName === "BUTTON" || w.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ d.jsxs("div", { className: A_, onPointerDownCapture: S, children: [
    /* @__PURE__ */ d.jsxs("div", { className: D_, children: [
      v.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: z_, children: "No active edits" }) : /* @__PURE__ */ d.jsxs("span", { className: c0, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ d.jsx("span", { children: v.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ d.jsxs("span", { className: c0, "aria-live": "polite", children: [
        /* @__PURE__ */ d.jsx("span", { className: O_, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ d.jsx(
      h0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: I_,
        max: F_,
        step: Y_,
        format: aA,
        value: a.volumeDb,
        onChange: (E) => b({ volumeDb: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: vs, children: [
      /* @__PURE__ */ d.jsx("span", { className: gs, children: "3-band EQ" }),
      /* @__PURE__ */ d.jsx(
        b_,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (E, w, T, R) => b({ eq3: { low: E, mid: w, high: T, preset: R } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: vs, children: [
      /* @__PURE__ */ d.jsx("span", { className: gs, children: "Speed" }),
      /* @__PURE__ */ d.jsx(
        __,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (E, w) => b({ speed: { mode: E, value: w } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx(
      h0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: G_,
        max: X_,
        step: P_,
        format: rA,
        value: a.pitchSt,
        onChange: (E) => b({ pitchSt: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsx(
      W_,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (E) => b({ normalize: E })
      }
    ),
    /* @__PURE__ */ d.jsx(
      eA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (E, w) => b({ fade: { ...a.fade, inS: E, outS: w } })
      }
    ),
    /* @__PURE__ */ d.jsx(
      tA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (E, w) => b({ silence: { enabled: E, thresholdDb: w } })
      }
    ),
    g ? /* @__PURE__ */ d.jsxs("div", { className: q_, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(kc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ d.jsx(ft, { variant: "primary", size: "md", onClick: g, disabled: m, children: p })
    ] }) : null
  ] });
}
function h0(n) {
  const { label: a, sub: i, min: s, max: o, step: u, format: h, value: m, onChange: g, disabled: p } = n, b = (m - s) / (o - s) * 100, v = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: Hx, children: [
    /* @__PURE__ */ d.jsxs("div", { className: k_, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: v, className: L_, children: a }),
      /* @__PURE__ */ d.jsx("span", { className: qx, children: i })
    ] }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: s,
        max: o,
        step: u,
        value: m,
        disabled: p,
        className: Lh,
        style: { "--fill": `${b}%` },
        onChange: (S) => g(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: kh, children: h(m) })
  ] });
}
function W_({ normalize: n, onChange: a, disabled: i }) {
  const o = n.mode === "loudness" ? { min: K_, max: Q_, step: 0.5, suffix: "LUFS" } : { min: Z_, max: J_, step: 0.5, suffix: "dB" }, u = iA(n.targetDbOrLufs, o.min, o.max), h = (u - o.min) / (o.max - o.min) * 100, m = (g) => {
    if (g === "off") {
      a({ mode: g, targetDbOrLufs: n.targetDbOrLufs });
      return;
    }
    if (g === "peak") {
      a({ mode: g, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: g, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: vs, children: [
    /* @__PURE__ */ d.jsx("span", { className: gs, children: "Normalize" }),
    /* @__PURE__ */ d.jsx("div", { className: U_, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const p = g === "peak";
      return /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: B_,
          "data-active": n.mode === g,
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
    n.mode !== "off" ? /* @__PURE__ */ d.jsxs("div", { className: Hx, children: [
      /* @__PURE__ */ d.jsx("span", { className: qx, children: "Target" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: i,
          className: Lh,
          style: { "--fill": `${h}%` },
          onChange: (g) => a({ mode: n.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: kh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function eA({ inS: n, outS: a, onChange: i, disabled: s }) {
  const o = y.useId(), u = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: vs, children: [
    /* @__PURE__ */ d.jsx("span", { className: gs, children: "Fade" }),
    /* @__PURE__ */ d.jsxs("div", { className: V_, children: [
      /* @__PURE__ */ d.jsxs("div", { className: u0, children: [
        /* @__PURE__ */ d.jsx("label", { className: d0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
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
            disabled: s,
            className: f0,
            onChange: (h) => i(n, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function tA({ enabled: n, thresholdDb: a, onChange: i, disabled: s }) {
  const o = (a - Qo) / (mf - Qo) * 100;
  return /* @__PURE__ */ d.jsxs("div", { className: vs, children: [
    /* @__PURE__ */ d.jsx("span", { className: gs, children: "Silence trim" }),
    /* @__PURE__ */ d.jsxs("div", { className: $_, children: [
      /* @__PURE__ */ d.jsxs("label", { className: H_, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: n,
            disabled: s,
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
          max: mf,
          step: 1,
          value: a,
          disabled: s || !n,
          className: Lh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => i(n, Number(u.target.value)),
          "aria-valuemin": Qo,
          "aria-valuemax": mf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: kh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Vi = 1e-3;
function nA(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= Vi && a.push("gain"), (Math.abs(n.eq3.low) >= Vi || Math.abs(n.eq3.mid) >= Vi || Math.abs(n.eq3.high) >= Vi) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= Vi && a.push("speed"), Math.abs(n.pitchSt) >= Vi && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function aA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function rA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function iA(n, a, i) {
  return Number.isFinite(n) ? Math.max(a, Math.min(i, n)) : a;
}
var lA = "skdk4g0", sA = "skdk4g1", m0 = "skdk4g2", oA = "skdk4g3", cA = "skdk4g4", uA = "skdk4g5", dA = "skdk4g6", fA = "skdk4g7", hA = "skdk4g8", mA = "skdk4g9", pA = "skdk4ga", vA = "skdk4gb", gA = "skdk4gc", yA = "skdk4gd", bA = "skdk4ge", p0 = "skdk4gf", v0 = "skdk4gg", xA = "skdk4gh", g0 = "skdk4gi", y0 = "skdk4gj", SA = "skdk4gk", wA = "skdk4gl", EA = "skdk4gm", b0 = "skdk4gn", jA = "skdk4go", x0 = "skdk4gp", NA = "skdk4gq", TA = "skdk4gr", CA = "skdk4gs", RA = "skdk4gt", MA = "skdk4gu", _A = "skdk4gv", AA = "skdk4gw", S0 = "skdk4gx", DA = "skdk4gy", zA = "skdk4gz", OA = "skdk4g10", kA = "skdk4g11", LA = "cgsfgh1", UA = "cgsfgh2", BA = "cgsfgh3", VA = "cgsfgh4", $A = "cgsfgh5", HA = "cgsfgh6", qA = "cgsfgh7", IA = "cgsfgh8", FA = "cgsfgh9", YA = "cgsfgha", GA = "cgsfghb", XA = "cgsfghc", PA = "cgsfghd", KA = "cgsfghe", QA = "cgsfghm", ZA = "cgsfghn", JA = "cgsfgho", WA = "cgsfghp";
const $t = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], ys = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Zi = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, Ix = 0.05;
function e2(n) {
  let a = null, i = -1 / 0;
  for (const s of $t) {
    const o = n[s];
    o > i && (i = o, a = s);
  }
  return !a || i <= Ix ? null : a;
}
function Fx(n, a = 3) {
  return $t.map((i) => ({ key: i, label: ys[i], value: n[i] })).filter((i) => i.value > Ix).sort((i, s) => s.value - i.value).slice(0, a);
}
function t2(n) {
  let a = 0;
  for (const i of $t) a += n[i] * n[i];
  return Math.sqrt(a);
}
function w0(n) {
  const a = Fx(n, 2), i = a[0];
  if (!i) return "";
  const s = a[1];
  return !s || i.value - s.value > 0.25 ? pf(i.label) : `${pf(i.label)} + ${s.label.toLowerCase()}`;
}
function pf(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function Jr(n) {
  const a = { ...Zi };
  for (const i of $t) {
    const s = n[i];
    a[i] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const E0 = 0.05, j0 = 0.2, n2 = 22, a2 = 320, vf = 0.78;
function gf(n, a, i, s) {
  const o = Math.cos(i), u = Math.sin(i), h = n * o + a * u;
  return Math.max(0, Math.min(1, h / s));
}
function r2(n) {
  const { vec: a, onChange: i, size: s, reduceMotion: o = !1 } = n, [u, h] = y.useState(a), [m, g] = y.useState(null), [p, b] = y.useState(null), v = y.useRef(null), S = y.useRef(a), E = y.useRef(o), w = y.useRef(null), T = y.useRef(0);
  E.current = o, y.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const R = y.useCallback(
    (H) => {
      const q = Jr(H);
      h(q), S.current = q, i(q);
    },
    [i]
  ), C = y.useCallback((H) => {
    const q = Jr(H);
    h(q), S.current = q;
  }, []), k = y.useCallback(
    (H) => {
      const q = v.current;
      if (!q || E.current) return;
      const le = H.clientX - q.centerX, re = H.clientY - q.centerY, J = s / 2 * vf, ce = gf(le, re, q.angle, J), W = { ...S.current, [q.axis]: ce };
      C(W);
    },
    [s, C]
  ), _ = y.useCallback(
    (H) => {
      const q = v.current;
      if (q) {
        if (window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), E.current) {
          const le = H.clientX - q.centerX, re = H.clientY - q.centerY, J = s / 2 * vf, ce = gf(le, re, q.angle, J), W = { ...S.current, [q.axis]: ce };
          v.current = null, R(W);
          return;
        }
        v.current = null, R(S.current);
      }
    },
    [R, k, s]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), v.current = null, w.current !== null && (window.clearTimeout(w.current), w.current = null);
  }, [k, _]);
  const z = y.useCallback((H, q) => {
    E.current || (T.current += 1, b({ x: H, y: q, key: T.current }), w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
      b(null), w.current = null;
    }, a2));
  }, []), K = y.useCallback(
    (H, q, le, re, J) => {
      const ce = le.getBoundingClientRect(), W = ce.left + ce.width / 2, A = ce.top + ce.height / 2, U = $t.indexOf(H) / $t.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: H,
        pointerId: q,
        centerX: W,
        centerY: A,
        angle: U
      }, g(H), re !== void 0 && J !== void 0) {
        const I = re - W, ne = J - A, M = s / 2 * vf, P = gf(I, ne, U, M), Q = { ...S.current, [H]: P };
        E.current ? R(Q) : C(Q);
      }
      window.addEventListener("pointermove", k), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    },
    [R, k, _, s, C]
  ), ee = y.useCallback(
    (H, q) => {
      q.preventDefault();
      const le = q.currentTarget, re = le.ownerSVGElement ?? le;
      K(H, q.pointerId, re);
    },
    [K]
  ), te = y.useCallback(
    (H) => {
      const q = H.currentTarget, le = q instanceof SVGSVGElement ? q : q.ownerSVGElement ?? q, re = le.getBoundingClientRect(), J = re.left + re.width / 2, ce = re.top + re.height / 2, W = H.clientX - J, A = H.clientY - ce;
      if (Math.sqrt(W * W + A * A) < 8) return;
      let U = Math.atan2(A, W) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let I = null, ne = 999;
      for (let Q = 0; Q < $t.length; Q++) {
        const oe = $t[Q];
        if (!oe) continue;
        const he = Q / $t.length * 360, ge = Math.abs((he - U + 540) % 360 - 180);
        ge < ne && (ne = ge, I = oe);
      }
      if (!I || ne > n2) return;
      H.preventDefault();
      const M = (H.clientX - re.left) / re.width * s, P = (H.clientY - re.top) / re.height * s;
      z(M, P), K(I, H.pointerId, le, H.clientX, H.clientY);
    },
    [K, s, z]
  ), D = y.useCallback(
    (H, q) => {
      const le = S.current[H];
      let re = le;
      switch (q.key) {
        case "ArrowUp":
        case "ArrowRight":
          re = le + E0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          re = le - E0;
          break;
        case "PageUp":
          re = le + j0;
          break;
        case "PageDown":
          re = le - j0;
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
      q.preventDefault(), g(H), R({ ...S.current, [H]: re });
    },
    [R]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: g,
    onPointerDown: ee,
    onKeyDown: D,
    onSurfacePointerDown: te,
    surfacePing: p
  };
}
const i2 = [0.25, 0.5, 0.75, 1];
function l2({
  vec: n,
  onChange: a,
  size: i = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const u = r2({ vec: n, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, g = i / 2 * 0.78, p = y.useMemo(() => s2(h, m, g), [h, m, g]), b = y.useMemo(() => $t.map((v, S) => {
    const E = dc(u.liveVec[v]), w = p[S];
    return w ? `${h + w.dx * E},${m + w.dy * E}` : "0,0";
  }).join(" "), [p, h, m, u.liveVec]);
  return /* @__PURE__ */ d.jsx("div", { className: LA, children: /* @__PURE__ */ d.jsx("div", { className: UA, style: { width: i, height: i }, children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: BA,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: s ? void 0 : u.onSurfacePointerDown,
      style: s ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        i2.map((v) => /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: VA,
            cx: h,
            cy: m,
            r: g * v
          },
          v
        )),
        $t.map((v, S) => {
          const E = p[S];
          if (!E) return null;
          const w = h + E.dx * 1.18, T = m + E.dy * 1.18, R = u.activeAxis === v;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "line",
              {
                className: $A,
                x1: h,
                y1: m,
                x2: h + E.dx,
                y2: m + E.dy
              }
            ),
            /* @__PURE__ */ d.jsx(
              "text",
              {
                className: `${PA}${R ? ` ${KA}` : ""}`,
                x: w,
                y: T,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: ys[v]
              }
            )
          ] }, v);
        }),
        $t.map((v, S) => {
          const E = dc(u.liveVec[v]);
          if (E <= 0.01) return null;
          const w = p[S];
          if (!w) return null;
          const T = u.activeAxis === v;
          return /* @__PURE__ */ d.jsx(
            "line",
            {
              className: `${qA}${T ? ` ${IA}` : ""}`,
              x1: h,
              y1: m,
              x2: h + w.dx * E,
              y2: m + w.dy * E
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ d.jsx("polygon", { className: HA, points: b }),
        u.surfacePing && /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: XA,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !s && $t.map((v, S) => {
          const E = dc(u.liveVec[v]), w = p[S];
          if (!w) return null;
          const T = h + w.dx * E, R = m + w.dy * E, C = u.activeAxis === v;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: FA,
                cx: T,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${ys[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": E,
                onPointerDown: (k) => u.onPointerDown(v, k),
                onKeyDown: (k) => u.onKeyDown(v, k),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: `${YA}${C ? ` ${GA}` : ""}`,
                cx: T,
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
function s2(n, a, i) {
  return $t.map((s, o) => {
    const u = o / $t.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * i,
      dy: Math.sin(u) * i
    };
  });
}
function dc(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function o2({ vec: n, size: a = 36 }) {
  const i = a / 2, s = a / 2, o = a / 2 * 0.86, u = y.useMemo(() => $t.map((h, m) => {
    const g = dc(n[h]), p = m / $t.length * Math.PI * 2 - Math.PI / 2, b = i + Math.cos(p) * o * g, v = s + Math.sin(p) * o * g;
    return `${b},${v}`;
  }).join(" "), [i, s, o, n]);
  return /* @__PURE__ */ d.jsx("span", { className: QA, "aria-hidden": "true", children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: ZA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ d.jsx("circle", { className: JA, cx: i, cy: s, r: o }),
        /* @__PURE__ */ d.jsx("polygon", { className: WA, points: u })
      ]
    }
  ) });
}
var c2 = "_1jqr3aj0", u2 = "_1jqr3aj1", d2 = "_1jqr3aj2", f2 = "_1jqr3aj3", h2 = "_1jqr3aj4", m2 = "_1jqr3aj5", p2 = "_1jqr3aj6", v2 = "_1jqr3aj7";
const N0 = 0.05, T0 = 0.2;
function g2({
  vec: n,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: s = !1
}) {
  const [o, u] = y.useState(null), h = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), g = y.useCallback(
    (w, T) => {
      const R = Math.max(0, Math.min(1, T));
      a(Jr({ ...n, [w]: R }));
    },
    [a, n]
  ), p = y.useCallback((w, T) => {
    const R = m.current.get(w);
    return !R || R.width <= 0 ? 0 : (T - R.left) / R.width;
  }, []), b = y.useCallback(
    (w, T) => {
      if (i) return;
      T.preventDefault();
      const R = T.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && m.current.set(w, R.getBoundingClientRect()), T.currentTarget.setPointerCapture(T.pointerId), h.current = w, u(w), g(w, p(w, T.clientX));
    },
    [i, g, p]
  ), v = y.useCallback(
    (w, T) => {
      i || s || h.current === w && g(w, p(w, T.clientX));
    },
    [i, s, g, p]
  ), S = y.useCallback(
    (w, T) => {
      if (h.current === w) {
        try {
          T.currentTarget.releasePointerCapture(T.pointerId);
        } catch {
        }
        h.current = null, m.current.delete(w);
      }
    },
    []
  ), E = y.useCallback(
    (w, T) => {
      if (i) return;
      const R = n[w] ?? 0;
      let C = R;
      switch (T.key) {
        case "ArrowRight":
        case "ArrowUp":
          C = R + N0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          C = R - N0;
          break;
        case "PageUp":
          C = R + T0;
          break;
        case "PageDown":
          C = R - T0;
          break;
        case "Home":
          C = 0;
          break;
        case "End":
          C = 1;
          break;
        default:
          return;
      }
      T.preventDefault(), u(w), g(w, C);
    },
    [i, g, n]
  );
  return /* @__PURE__ */ d.jsx("div", { className: c2, role: "group", "aria-label": "Emotion axis sliders", children: $t.map((w) => {
    const T = y2(n[w] ?? 0), R = T > 0.05, C = o === w, k = ys[w];
    return /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: `${u2}${R ? ` ${d2}` : ""}${C ? ` ${f2}` : ""}`,
        role: "slider",
        "aria-label": `${k} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(T.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (_) => b(w, _),
        onPointerMove: (_) => v(w, _),
        onPointerUp: (_) => S(w, _),
        onPointerCancel: (_) => S(w, _),
        onKeyDown: (_) => E(w, _),
        onFocus: () => u(w),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: h2, children: k }),
          /* @__PURE__ */ d.jsx("span", { className: m2, "data-track": "true", children: /* @__PURE__ */ d.jsx(
            "span",
            {
              className: p2,
              style: { width: `${T * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ d.jsx("span", { className: v2, children: T.toFixed(2) })
        ]
      },
      w
    );
  }) });
}
function y2(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
var C0 = "gvwvwg0", b2 = "gvwvwg2", x2 = "gvwvwg3", S2 = "gvwvwg8", w2 = "gvwvwg9", E2 = "gvwvwga", j2 = "gvwvwgb", N2 = "gvwvwgc", T2 = "gvwvwgd", C2 = "gvwvwge";
function R2({
  presets: n,
  activePresetId: a,
  onSelect: i,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: C0, children: [
    /* @__PURE__ */ d.jsx("span", { className: b2, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("span", { className: x2, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: C0, children: [
    /* @__PURE__ */ d.jsx("span", { className: C2, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("div", { className: S2, children: n.map((o) => {
      const u = M2(o), h = o.presetId === a;
      return /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${w2}${h ? ` ${j2}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: E2,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ d.jsx(o2, { vec: u, size: 28 }),
                  /* @__PURE__ */ d.jsx("span", { className: N2, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: T2,
                onClick: () => {
                  window.confirm(`Delete preset "${o.presetName}"? This cannot be undone.`) && s(o.presetId);
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
function M2(n) {
  const a = Kf.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(n.vector)) return a;
  const i = Kf.reduce(
    (s, o, u) => ({ ...s, [o]: n.vector[u] ?? 0 }),
    a
  );
  return Jr(i);
}
function yf(n) {
  return Kf.map((a) => n[a] ?? 0);
}
const _2 = [
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
], A2 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], D2 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], z2 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function O2(n) {
  const a = n.toLowerCase().trim();
  if (!a) return { ...Zi };
  const s = a.split(/\s+/).some((h) => A2.includes(h)) ? 1.2 : 1, o = D2.some((h) => a.includes(h)) ? 0.55 : 1, u = { ...Zi };
  for (const h of _2) {
    let m = 0;
    for (const g of h.keywords) {
      const p = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const S = v.index, E = a.slice(0, S), w = Math.max(
        E.lastIndexOf(","),
        E.lastIndexOf(";"),
        E.lastIndexOf(" but "),
        E.lastIndexOf(" yet ")
      ), R = E.slice(w >= 0 ? w : 0).slice(-30);
      z2.some((C) => new RegExp(`\\b${C}\\b`).test(R)) || (m += 1);
    }
    if (m > 0) {
      const g = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * s * o;
      u[h.axis] = Math.min(1, g);
    }
  }
  return $t.every((h) => u[h] === 0) && (u.calm = 0.4), Jr(u);
}
const k2 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function L2({
  value: n,
  onChange: a,
  deploymentId: i
}) {
  const s = n.mode ?? "none", o = y.useMemo(() => U2(n.vector), [n.vector]), u = n.emotionAlpha ?? 1, [h, m] = y.useState([]), [g, p] = y.useState(null), [b, v] = y.useState(!1), [S, E] = y.useState(null), [w, T] = y.useState(""), [R, C] = y.useState(!1), k = y.useRef(!0);
  y.useEffect(() => (k.current = !0, () => {
    k.current = !1;
  }), []), y.useEffect(() => {
    let N = !1;
    return Cx(i).then((U) => {
      N || m(R0(U.presets));
    }).catch((U) => {
      N || p(bf(U));
    }), () => {
      N = !0;
    };
  }, [i]), y.useEffect(() => {
    R || T(w0(o));
  }, [o, R]);
  const _ = (N) => {
    a({ ...n, mode: N });
  }, z = (N) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: yf(N)
    }), S && E(null);
  }, K = () => {
    z(Jr(Zi));
  }, ee = (N) => {
    const U = Math.max(0, Math.min(1, Number.isFinite(N) ? N : 1));
    a({ ...n, emotionAlpha: U });
  }, te = async () => {
    const N = w.trim();
    if (N) {
      v(!0), p(null);
      try {
        const U = await MR(i, N, yf(o));
        if (!k.current) return;
        m(
          (I) => R0([U, ...I.filter((ne) => ne.presetId !== U.presetId)])
        ), E(U.presetId), C(!1);
      } catch (U) {
        k.current && p(bf(U));
      } finally {
        k.current && v(!1);
      }
    }
  }, D = async (N) => {
    const U = h;
    m((I) => I.filter((ne) => ne.presetId !== N)), S === N && E(null);
    try {
      await _R(i, N);
    } catch (I) {
      k.current && (m(U), p(bf(I)));
    }
  }, H = (N) => {
    E(N.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: N.vector
    });
  }, q = (N) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: N });
  }, le = e2(o), re = t2(o), J = Fx(o, 3), ce = J.length > 0 && w.trim().length > 0 && !b, W = w0(o) || "name your preset…", A = s !== "emotion_vector";
  return /* @__PURE__ */ d.jsxs("div", { className: lA, children: [
    /* @__PURE__ */ d.jsxs("div", { className: sA, children: [
      /* @__PURE__ */ d.jsx("span", { className: m0, children: "Emotion mode" }),
      /* @__PURE__ */ d.jsx("div", { className: oA, role: "radiogroup", "aria-label": "Emotion mode", children: k2.map((N) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === N.id,
          className: `${cA}${s === N.id ? ` ${uA}` : ""}`,
          onClick: () => _(N.id),
          children: N.label
        },
        N.id
      )) })
    ] }),
    s === "none" && /* @__PURE__ */ d.jsxs("div", { className: x0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ d.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    s === "audio_ref" && /* @__PURE__ */ d.jsx("div", { className: x0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    s === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: SA, children: [
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: wA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: n.qwenTemplate ?? "",
          onChange: (N) => q(N.target.value)
        }
      ),
      /* @__PURE__ */ d.jsxs("div", { className: EA, children: [
        /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "secondary",
            onClick: () => {
              const N = (n.qwenTemplate ?? "").trim();
              if (!N) return;
              const U = O2(N);
              a({
                ...n,
                mode: "emotion_vector",
                vector: yf(U)
              });
            },
            disabled: !(n.qwenTemplate ?? "").trim(),
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
    (s === "emotion_vector" || s === "none" || s === "audio_ref") && /* @__PURE__ */ d.jsxs("div", { className: bA, children: [
      /* @__PURE__ */ d.jsx("div", { className: `${r0} ${dA}`, children: /* @__PURE__ */ d.jsx(
        l2,
        {
          vec: o,
          onChange: z,
          readOnly: A
        }
      ) }),
      /* @__PURE__ */ d.jsxs("div", { className: `${r0} ${fA}`, children: [
        /* @__PURE__ */ d.jsxs("div", { className: hA, children: [
          /* @__PURE__ */ d.jsx("span", { className: m0, children: "Dominant" }),
          /* @__PURE__ */ d.jsx("span", { className: mA, children: le ? ys[le].toLowerCase() : "neutral" }),
          /* @__PURE__ */ d.jsxs("span", { className: pA, children: [
            "‖v‖ = ",
            re.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(g2, { vec: o, onChange: z, readOnly: A }),
        /* @__PURE__ */ d.jsx("div", { className: vA, children: /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: gA,
            onClick: K,
            disabled: A || re < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ d.jsxs(
                "svg",
                {
                  className: yA,
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
    s === "emotion_vector" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: p0, children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          /* @__PURE__ */ d.jsx("span", { className: v0, children: "Alpha" }),
          /* @__PURE__ */ d.jsx("br", {}),
          /* @__PURE__ */ d.jsx("span", { className: xA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: u,
            className: g0,
            style: { "--fill": `${u * 100}%` },
            onChange: (N) => ee(Number(N.target.value)),
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
          className: `${NA}${J.length === 0 ? ` ${TA}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs("div", { className: CA, children: [
              /* @__PURE__ */ d.jsx("span", { className: RA, children: "Save current as preset" }),
              J.length === 0 && /* @__PURE__ */ d.jsx("span", { className: MA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: _A, children: [
              /* @__PURE__ */ d.jsx("div", { className: AA, children: J.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: `${S0} ${zA}`, children: "no axes set" }) : J.map((N) => /* @__PURE__ */ d.jsxs("span", { className: S0, children: [
                N.label.toLowerCase(),
                /* @__PURE__ */ d.jsx("b", { className: DA, children: N.value.toFixed(2) })
              ] }, N.key)) }),
              /* @__PURE__ */ d.jsxs("div", { className: OA, children: [
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "text",
                    className: kA,
                    placeholder: W,
                    value: w,
                    disabled: J.length === 0 || b,
                    onChange: (N) => {
                      T(N.target.value), C(!0);
                    },
                    onKeyDown: (N) => {
                      N.key === "Enter" && ce && te();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  ft,
                  {
                    variant: "primary",
                    disabled: !ce,
                    onClick: te,
                    children: b ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d.jsx(
        R2,
        {
          presets: h,
          activePresetId: S,
          onSelect: H,
          onDelete: D
        }
      )
    ] }),
    s === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: p0, children: [
      /* @__PURE__ */ d.jsx("span", { className: v0, children: "Alpha" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: u,
          className: g0,
          style: { "--fill": `${u * 100}%` },
          onChange: (N) => ee(Number(N.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: y0, children: [
        (u * 100).toFixed(0),
        "%"
      ] })
    ] }),
    g && /* @__PURE__ */ d.jsx("div", { className: jA, children: g })
  ] });
}
function U2(n) {
  if (!n || !Array.isArray(n)) return Jr(Zi);
  const a = { ...Zi };
  return $t.forEach((i, s) => {
    const o = n[s];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function R0(n) {
  return [...n].sort((a, i) => i.updatedAt - a.updatedAt);
}
function bf(n) {
  return n instanceof el || n instanceof Error ? n.message : "Unknown error";
}
var B2 = "_5u1uau0", ns = "_5u1uau1", V2 = "_5u1uau2", $i = "_5u1uau3", as = "_5u1uau4", $2 = "_5u1uau5", xf = "_5u1uau6", H2 = "_5u1uau7", q2 = "_5u1uau8", I2 = "_5u1uau9", F2 = "_5u1uaua", Y2 = "_5u1uaub", G2 = "_5u1uauc", X2 = "_5u1uaud";
const Sf = [
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
], P2 = ["mp3", "wav", "flac"], Zo = 0.5, wf = 2, K2 = 0.05, Q2 = 0.8, Z2 = 0.8, J2 = 42;
function Ef(n, a, i) {
  const s = n[a];
  if (typeof s == "number" && Number.isFinite(s)) return s;
  if (typeof s == "string") {
    const o = Number(s);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function W2({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: h,
  onGenerationChange: m
}) {
  const g = y.useId(), p = y.useId(), b = y.useId(), v = y.useId(), S = y.useId(), E = (_, z) => {
    m({ ...h, [_]: z });
  }, w = Sf.find((_) => _.id === o) ?? Sf[0], T = (i - Zo) / (wf - Zo) * 100, R = Ef(h, "temperature", Q2), C = Ef(h, "top_p", Z2), k = Ef(h, "seed", J2);
  return /* @__PURE__ */ d.jsxs("div", { className: B2, children: [
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: g, className: $i, children: "Format" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "select",
        {
          id: g,
          className: $2,
          value: n,
          onChange: (_) => a(_.currentTarget.value),
          children: P2.map((_) => /* @__PURE__ */ d.jsx("option", { value: _, children: _ }, _))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: $i, children: "Speed" }),
      /* @__PURE__ */ d.jsxs("div", { className: `${as} ${H2}`, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: q2,
            min: Zo,
            max: wf,
            step: K2,
            value: i,
            style: { "--range-pct": `${T}%` },
            onChange: (_) => s(Number(_.currentTarget.value)),
            "aria-valuemin": Zo,
            "aria-valuemax": wf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: I2, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: V2, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ d.jsx("span", { className: $i, children: "Cache" }),
      /* @__PURE__ */ d.jsx("div", { className: F2, children: Sf.map((_) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === _.id,
          className: Y2,
          onClick: () => u(_.id),
          title: _.help,
          children: _.label
        },
        _.id
      )) }),
      /* @__PURE__ */ d.jsx("p", { className: G2, "aria-live": "polite", children: w.help })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: X2, "aria-hidden": "true" }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: b, className: $i, children: "Temperature" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: xf,
          min: 0,
          max: 2,
          step: 0.05,
          value: R,
          onChange: (_) => E("temperature", Number(_.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: v, className: $i, children: "Top-p" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: xf,
          min: 0,
          max: 1,
          step: 0.05,
          value: C,
          onChange: (_) => E("top_p", Number(_.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: S, className: $i, children: "Seed" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: S,
          type: "number",
          className: xf,
          step: 1,
          value: k,
          onChange: (_) => E("seed", Math.trunc(Number(_.currentTarget.value)))
        }
      ) })
    ] })
  ] });
}
var e3 = "iv43qk0", M0 = "iv43qk1", t3 = "iv43qk2", _0 = "iv43qk3", n3 = "iv43qk4", a3 = "iv43qk5", r3 = "iv43qk6", i3 = "iv43qk7", l3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, s3 = "iv43qkd", o3 = "iv43qke", jf = "iv43qkf", Nf = "iv43qkg";
function c3({
  lines: n,
  characterColors: a,
  onLineClick: i
}) {
  if (n.length === 0)
    return /* @__PURE__ */ d.jsx("p", { className: s3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, u = s - o;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: o3, children: [
      /* @__PURE__ */ d.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Nf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Nf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Nf, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ol", { className: e3, children: n.map((h) => /* @__PURE__ */ d.jsx(
      u3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function u3({ line: n, color: a, onClick: i }) {
  return n.character === null ? /* @__PURE__ */ d.jsxs("li", { className: `${M0} ${t3}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: _0, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ d.jsx("span", { className: r3, children: n.text })
  ] }) : /* @__PURE__ */ d.jsxs(
    "li",
    {
      className: M0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: _0, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ d.jsx("span", { className: n3, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ d.jsxs("span", { className: a3, children: [
          n.text,
          n.override && /* @__PURE__ */ d.jsxs("span", { className: `${i3} ${l3[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var d3 = "_46z95i0", f3 = "_46z95i1", h3 = "_46z95i2", m3 = "_46z95i3", p3 = "_46z95i4", v3 = "_46z95i5", g3 = "_46z95i6";
const y3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function b3({ value: n, onChange: a }) {
  return /* @__PURE__ */ d.jsxs("div", { className: d3, children: [
    /* @__PURE__ */ d.jsx(
      Tf,
      {
        label: "Intensity",
        sub: "How emotionally amplified each line reads",
        min: 0,
        max: 1,
        step: 0.01,
        format: (i) => `${Math.round(i * 100)}%`,
        value: n.intensity,
        onChange: (i) => a({ ...n, intensity: i })
      }
    ),
    /* @__PURE__ */ d.jsx(
      Tf,
      {
        label: "Pace",
        sub: "Time-stretched playback per line",
        min: 0.5,
        max: 2,
        step: 0.01,
        format: (i) => `${i.toFixed(2)}×`,
        value: n.pace,
        onChange: (i) => a({ ...n, pace: i })
      }
    ),
    /* @__PURE__ */ d.jsx(
      Tf,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: -12,
        max: 12,
        step: 0.5,
        format: (i) => `${i >= 0 ? "+" : ""}${i.toFixed(1)} st`,
        value: n.pitchSt,
        onChange: (i) => a({ ...n, pitchSt: i })
      }
    )
  ] });
}
function Tf({ label: n, sub: a, min: i, max: s, step: o, format: u, value: h, onChange: m }) {
  const g = (h - i) / (s - i) * 100, p = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ d.jsxs("div", { className: f3, children: [
    /* @__PURE__ */ d.jsxs("div", { className: h3, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: m3, children: n }),
      /* @__PURE__ */ d.jsx("span", { className: p3, children: a })
    ] }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: i,
        max: s,
        step: o,
        value: h,
        className: v3,
        style: { "--fill": `${g}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: g3, children: u(h) })
  ] });
}
var x3 = "qe93dj0", S3 = "qe93dj1", w3 = "qe93dj2", E3 = "qe93dj3", j3 = "qe93dj4", N3 = "qe93dj5", T3 = "qe93dj6", C3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, R3 = "qe93dja", M3 = "qe93djb";
function _3({ checks: n }) {
  const a = n.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ d.jsxs("div", { className: x3, children: [
    /* @__PURE__ */ d.jsxs("header", { className: S3, children: [
      /* @__PURE__ */ d.jsx("span", { className: w3, children: "Pre-flight" }),
      /* @__PURE__ */ d.jsxs("span", { className: E3, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: j3, children: n.map((i) => /* @__PURE__ */ d.jsxs("li", { className: N3, children: [
      /* @__PURE__ */ d.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${T3} ${C3[i.status]}`
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: R3, children: i.label }),
      i.detail && /* @__PURE__ */ d.jsx("span", { className: M3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var A3 = "xq3iim0", D3 = "xq3iim2 xq3iim1", z3 = "xq3iim3 xq3iim1", O3 = "xq3iim4", k3 = "xq3iim5", L3 = "xq3iim6", U3 = "xq3iim7";
function B3({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [s, o] = y.useState([]), [u, h] = y.useState(a), [m, g] = y.useState(!0), [p, b] = y.useState(!1), [v, S] = y.useState(null);
  y.useEffect(() => {
    let w = !1;
    return g(!0), ps(n).then(({ voiceAssets: T }) => {
      w || o(T);
    }).catch((T) => {
      w || S(T instanceof Error ? T.message : "Failed to load voices");
    }).finally(() => {
      w || g(!1);
    }), () => {
      w = !0;
    };
  }, [n]);
  async function E(w) {
    b(!0), S(null);
    const T = u;
    h(w);
    try {
      await iT(n, w), i?.(w);
    } catch (R) {
      h(T), S(R instanceof Error ? R.message : "Failed to update default voice");
    } finally {
      b(!1);
    }
  }
  return m ? /* @__PURE__ */ d.jsx("p", { className: L3, children: "Loading voices…" }) : v ? /* @__PURE__ */ d.jsx("p", { className: U3, children: v }) : s.length === 0 ? /* @__PURE__ */ d.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ d.jsx(
    Cs,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ d.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: A3,
      children: s.map((w) => {
        const T = w.voiceAssetId === u;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": T,
            disabled: p,
            onClick: () => void E(T ? null : w.voiceAssetId),
            className: T ? z3 : D3,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: O3, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ d.jsx("span", { className: k3, children: V3(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function V3(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), s = Math.round(a - i * 60);
  return `${i}:${s.toString().padStart(2, "0")}`;
}
var A0 = "_17fbpt30", D0 = "_17fbpt31", z0 = "_17fbpt32", $3 = "_17fbpt33", H3 = "_17fbpt34", q3 = "_17fbpt35", O0 = "_17fbpt36", I3 = "_17fbpt37", F3 = "_17fbpt38";
const Y3 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function G3({
  runs: n,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: A0, children: [
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
    /* @__PURE__ */ d.jsx("p", { className: I3, children: "No runs yet." }),
    /* @__PURE__ */ d.jsx("p", { className: F3, children: o ?? "Hit Generate to enqueue a batch." })
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
    /* @__PURE__ */ d.jsx("ul", { className: $3, children: n.slice(0, 5).map((u) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: H3,
        onClick: s ? () => s(u.runId) : void 0,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: q3, children: u.runId }),
          /* @__PURE__ */ d.jsx("span", { className: `${kx.sm} ${Lx[Y3[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ d.jsx("span", { className: O0, children: X3(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ d.jsx("span", { className: O0, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function X3(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
var P3 = "_1s59p180", K3 = "_1s59p181", Q3 = "_1s59p182", Z3 = "_1s59p183", J3 = "_1s59p184", W3 = "_1s59p185", eD = "_1s59p186", tD = "_1s59p188", nD = "_1s59p189", k0 = "_1s59p18a", aD = "_1s59p18c", rD = "_1s59p18d", iD = "_1s59p18e", lD = "_1s59p18g";
function sD(n) {
  const a = js(), [i, s] = y.useState("idle"), [o, u] = y.useState(null), [h, m] = y.useState(/* @__PURE__ */ new Map()), [g, p] = y.useState(null), [b, v] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => () => {
    S.current?.();
  }, []), y.useEffect(() => {
    const N = {
      busy: i === "starting" || i === "running"
    };
    window.dispatchEvent(new CustomEvent("emotion-tts:run-state", { detail: N }));
  }, [i]);
  const E = y.useCallback(
    (N) => {
      const U = N.status;
      (U === "completed" || U === "partial") && Zt.success(
        U === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
        {
          action: {
            label: "Artifacts",
            onClick: () => {
              a(`/${n.deploymentId}?tab=artifacts`);
            }
          }
        }
      );
    },
    [a, n.deploymentId]
  ), w = y.useCallback(async () => {
    s("starting"), p(null), m(/* @__PURE__ */ new Map()), v(null);
    try {
      const N = await cT(n.deploymentId, n.createPayload);
      u(N.runId), s("running"), S.current?.(), S.current = Ry(
        n.deploymentId,
        N.runId,
        (U) => L0(
          U,
          m,
          s,
          (I) => {
            v(I), E(I);
          },
          n.deploymentId,
          N.runId
        ),
        () => s("error")
      );
    } catch (N) {
      s("error"), p(Cf(N));
    }
  }, [n.deploymentId, n.createPayload, E]);
  y.useEffect(() => {
    const N = () => {
      (i === "idle" || i === "terminal" || i === "error") && w();
    };
    return window.addEventListener("emotion-tts:trigger-generate", N), () => window.removeEventListener("emotion-tts:trigger-generate", N);
  }, [i, w]);
  const T = y.useCallback(async () => {
    if (o)
      try {
        await uT(n.deploymentId, o);
      } catch (N) {
        p(Cf(N));
      }
  }, [n.deploymentId, o]), R = Array.from(h.values()).sort((N, U) => N.globalIndex - U.globalIndex), C = i === "starting" || i === "running", k = b?.status === "partial", _ = R.filter((N) => N.status === "running").length, z = R.filter((N) => N.status === "completed").length, K = i === "starting" || i === "running" || R.length > 0, ee = R.filter((N) => N.status === "failed"), te = (() => {
    if (i !== "terminal" || ee.length === 0) return null;
    const N = /* @__PURE__ */ new Map();
    for (const M of ee) {
      const P = M.failureCategory ?? "unknown";
      N.set(P, (N.get(P) ?? 0) + 1);
    }
    let U = "unknown", I = 0;
    for (const [M, P] of N)
      P > I && (U = M, I = P);
    const ne = R.length;
    return { category: U, count: I, total: ne };
  })(), D = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, H = "Check the run detail page for the per-segment error log.", q = g?.toLowerCase().includes("unmapped") ?? !1, le = n.diagnostics ?? [], re = le.find((N) => N.status === "fail"), J = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", ce = !n.canGenerate || C || !!re, W = i === "starting" || i === "running", A = W ? "running" : ce ? "blocked" : "idle";
  return /* @__PURE__ */ d.jsxs("div", { className: P3, children: [
    /* @__PURE__ */ d.jsxs("div", { className: K3, children: [
      /* @__PURE__ */ d.jsx("span", { className: Q3, "aria-hidden": "true", children: "01" }),
      /* @__PURE__ */ d.jsxs("div", { className: Z3, children: [
        /* @__PURE__ */ d.jsxs("span", { className: J3, children: [
          "Pre-flight",
          K && /* @__PURE__ */ d.jsxs("span", { className: iD, children: [
            /* @__PURE__ */ d.jsx("span", { className: lD, "aria-hidden": "true" }),
            _ > 0 ? `${_} in flight` : `${z} done`
          ] })
        ] }),
        le.length > 0 ? /* @__PURE__ */ d.jsx("ul", { className: W3, "aria-label": "Pre-flight checks", children: le.map((N) => /* @__PURE__ */ d.jsxs("li", { className: eD, children: [
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: tD,
              "data-status": N.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ d.jsx("span", { className: nD, children: N.label }),
          N.detail && /* @__PURE__ */ d.jsx("span", { className: k0, children: N.detail })
        ] }, N.label)) }) : /* @__PURE__ */ d.jsx("span", { className: k0, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: aD, "data-state": A, children: [
        /* @__PURE__ */ d.jsxs(
          ft,
          {
            variant: "primary",
            size: "lg",
            onClick: w,
            disabled: ce,
            loading: W,
            children: [
              !W && /* @__PURE__ */ d.jsx("span", { className: rD, "aria-hidden": "true", children: "▶" }),
              J
            ]
          }
        ),
        C && /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: T,
            "aria-label": "Cancel current run",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    g && /* @__PURE__ */ d.jsxs(
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
          /* @__PURE__ */ d.jsx("span", { children: g }),
          q && /* @__PURE__ */ d.jsx(
            ft,
            {
              variant: "secondary",
              onClick: () => a(`/${n.deploymentId}/mappings`),
              style: { alignSelf: "flex-start" },
              children: "Open Mappings →"
            }
          )
        ]
      }
    ),
    te && /* @__PURE__ */ d.jsxs(zn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ d.jsxs("strong", { children: [
        "Run failed — ",
        te.count,
        " of ",
        te.total,
        " segments failed with ",
        /* @__PURE__ */ d.jsx("code", { children: te.category })
      ] }),
      /* @__PURE__ */ d.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: D[te.category] ?? H })
    ] }),
    b?.exportArtifactRef && /* @__PURE__ */ d.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${Rx.secondary} ${Mx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    k && b && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "secondary",
          disabled: !!re,
          onClick: async () => {
            try {
              const N = await jx(n.deploymentId, b.runId);
              u(N.runId), m(/* @__PURE__ */ new Map()), v(null), s("running"), S.current?.(), S.current = Ry(
                n.deploymentId,
                N.runId,
                (U) => L0(U, m, s, v, n.deploymentId, N.runId),
                () => s("error")
              );
            } catch (N) {
              p(Cf(N)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    R.length > 0 && /* @__PURE__ */ d.jsxs("table", { className: HM, children: [
      /* @__PURE__ */ d.jsx("thead", { children: /* @__PURE__ */ d.jsxs("tr", { children: [
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "#" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Status" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Duration" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ d.jsx("tbody", { children: R.map((N) => /* @__PURE__ */ d.jsxs("tr", { className: qM, children: [
        /* @__PURE__ */ d.jsx("td", { className: fr, children: N.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: /* @__PURE__ */ d.jsx(Zr, { tone: oD(N.status), children: N.status }) }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: N.durationMs ? `${N.durationMs} ms` : "—" }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: N.failureCategory ?? "" })
      ] }, N.globalIndex)) })
    ] })
  ] });
}
async function L0(n, a, i, s, o, u) {
  switch (n.type) {
    case "segment_started":
      a((h) => {
        const m = new Map(h);
        return m.set(n.globalIndex, { globalIndex: n.globalIndex, status: "running" }), m;
      });
      return;
    case "segment_completed":
      a((h) => {
        const m = new Map(h);
        return m.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "completed",
          durationMs: n.durationMs
        }), m;
      });
      return;
    case "segment_failed":
      a((h) => {
        const m = new Map(h);
        return m.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "failed",
          failureCategory: n.failureCategory
        }), m;
      });
      return;
    case "run_terminal":
      i("terminal");
      try {
        const h = await zh(o, u);
        s(h);
      } catch {
      }
      return;
  }
}
function oD(n) {
  switch (n) {
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
function Cf(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
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
function cD(n) {
  const a = js(), i = y.useRef(null), { tokens: s, attributions: o, unresolved: u, predictedFilenames: h, characterColor: m } = y.useMemo(
    () => dD(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), g = (p) => {
    const b = i.current;
    b && (b.scrollTop = p.currentTarget.scrollTop, b.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: kM, children: [
      /* @__PURE__ */ d.jsx("div", { ref: i, className: LM, "aria-hidden": "true", children: s.map((p, b) => uD(p, b, m)) }),
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: UM,
          value: n.value,
          onChange: (p) => n.onChange(p.currentTarget.value),
          onScroll: g,
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
        ft,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${n.deploymentId}/mappings/new?character=${encodeURIComponent(p)}`
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
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Parsed lines" }),
      /* @__PURE__ */ d.jsx("ul", { className: s0, children: o.map((p) => /* @__PURE__ */ d.jsxs("li", { children: [
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
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Predicted filenames" }),
      /* @__PURE__ */ d.jsx("ul", { className: s0, children: h.map((p) => /* @__PURE__ */ d.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function uD(n, a, i) {
  if (n.kind === "blank")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      /* @__PURE__ */ d.jsx("span", { className: l0, children: n.raw }),
      `
`
    ] }, a);
  const s = i.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? i0 : `${i0} ${BM}`;
  return /* @__PURE__ */ d.jsxs("span", { children: [
    /* @__PURE__ */ d.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ d.jsxs("span", { className: VM, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: l0, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function dD(n, a, i) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), g = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = n.split(/\r?\n/);
  let S = 0;
  return v.forEach((E, w) => {
    const T = E.trim();
    if (!T) {
      o.push({ kind: "blank", raw: E });
      return;
    }
    const R = w + 1, C = T.match(s);
    let k = "Narrator", _ = T, z, K = !1;
    if (C?.groups) {
      K = !0;
      const H = (C.groups.body ?? "").trim(), q = (C.groups.rest ?? "").trim();
      k = ((H.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", z = (H.includes("|") ? H.slice(H.indexOf("|") + 1) : "").trim() || void 0, _ = q;
    }
    S += 1;
    const ee = k.toLowerCase(), te = (m.get(ee) ?? 0) + 1;
    m.set(ee, te);
    const D = k === "Narrator" || i.has(ee);
    if (D || h.add(k), k !== "Narrator" && !p.has(ee) && (p.set(ee, U0[b % U0.length] ?? "currentColor"), b += 1), K) {
      const H = { kind: "character", raw: E, character: k, text: _, hasMapping: D };
      z !== void 0 && (H.override = z), o.push(H);
    } else
      o.push({ kind: "narrator", raw: E });
    u.push({ lineNumber: R, character: k, text: _, hasMapping: D }), g.push(
      `${S.toString().padStart(3, "0")}_${fD(k)}_${te.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(h),
    predictedFilenames: g,
    characterColor: p
  };
}
function fD(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Rf = [
  // audit-allow: hex — neon decorative palette per design lang
  "#ba9eff",
  // audit-allow: hex — neon decorative palette per design lang
  "#9093ff",
  // audit-allow: hex — neon decorative palette per design lang
  "#ff8439",
  // audit-allow: hex — neon decorative palette per design lang
  "#22c55e",
  // audit-allow: hex — neon decorative palette per design lang
  "#ffd34a",
  // audit-allow: hex — neon decorative palette per design lang
  "#ff7aa8"
], hD = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function mD(n) {
  const a = [];
  if (!n) return a;
  const i = n.split(/\r?\n/);
  for (let s = 0; s < i.length; s += 1) {
    const u = (i[s] ?? "").trim();
    if (u.length === 0) continue;
    const h = u.match(hD);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: u, override: null });
      continue;
    }
    const m = h.groups.body ?? "", g = (h.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: s, character: null, text: g || u, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, E = b.join("|").trim(), w = E ? pD(E) : null;
    a.push({
      idx: s,
      character: S,
      text: g,
      override: w
    });
  }
  return a;
}
function pD(n) {
  const a = n.trim();
  if (!a) return { kind: "raw", label: "" };
  const i = a.indexOf(":"), s = i >= 0 ? a.slice(0, i).trim().toLowerCase() : a.toLowerCase(), o = i >= 0 ? a.slice(i + 1).trim() : "";
  switch (s) {
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
function vD(n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(s.character));
  }
  return i;
}
function gD(n) {
  const a = {};
  for (let i = 0; i < n.length; i += 1) {
    const s = n[i];
    s && (a[s] = Rf[i % Rf.length] ?? Rf[0]);
  }
  return a;
}
function yD(n) {
  const a = {};
  for (const i of n)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var bD = "_1snzz30", xD = "_1snzz31", SD = "_1snzz33", wD = "_1snzz34", ED = "_1snzz36", jD = "_1snzz37", ND = "_1snzz38", Mf = "_1snzz39", B0 = "_1snzz3b", V0 = "_1snzz3c", $0 = "_1snzz3d";
const TD = 4e3;
function CD({ visible: n, canGenerate: a }) {
  const [i, s] = y.useState(null), [o, u] = y.useState(!1), [h, m] = y.useState(!1);
  y.useEffect(() => {
    let D = !1;
    const H = async () => {
      try {
        const le = await yc();
        D || s(le);
      } catch {
      }
    };
    H();
    const q = window.setInterval(H, TD);
    return () => {
      D = !0, window.clearInterval(q);
    };
  }, []), y.useEffect(() => {
    const D = (H) => {
      const q = H.detail;
      m(!!q?.busy);
    };
    return window.addEventListener("emotion-tts:run-state", D), () => window.removeEventListener("emotion-tts:run-state", D);
  }, []);
  const g = y.useCallback(() => {
    window.dispatchEvent(new CustomEvent("emotion-tts:trigger-generate"));
  }, []), p = i?.badge ?? "not_installed", b = p === "ready" || p === "running", v = p === "starting" || p === "installing", S = b, E = y.useCallback(async () => {
    u(!0);
    try {
      b ? (await zx(), Zt.success("Runtime stopped")) : (await Dx(), Zt.success("Runtime starting…"));
    } catch (D) {
      Zt.error(D instanceof Error ? D.message : "runtime action failed");
    } finally {
      u(!1);
    }
  }, [b]), w = b ? "Stop runtime" : v ? "Runtime starting…" : "Start runtime", T = o || v, R = o || v, C = R ? "transitioning" : b ? "running" : "stopped", k = !a || h || !S, _ = S ? a ? h ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", z = S && a && !h, K = b ? "ready" : v || o ? "busy" : "off", ee = b ? "Runtime ready" : v ? "Starting…" : o ? "Working…" : "Runtime off", te = K === "busy";
  return typeof document > "u" ? /* @__PURE__ */ d.jsx(d.Fragment, {}) : Oh.createPortal(
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: bD,
        "data-visible": n ? "true" : "false",
        role: "toolbar",
        "aria-label": "Quick actions",
        "aria-hidden": !n,
        style: {
          position: "fixed",
          bottom: "24px",
          left: "50%",
          right: "auto",
          top: "auto",
          // Hardcoded fallbacks so the pill renders with proper depth even when
          // portaled outside the `emotion-tts-app` token scope. The CSS class
          // applies var()-based values on top; these are the safety net.
          background: "rgba(35, 38, 41, 0.78)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(186, 158, 255, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(18px) saturate(1.6)",
          WebkitBackdropFilter: "blur(18px) saturate(1.6)",
          borderRadius: "999px",
          zIndex: 60
        },
        children: [
          /* @__PURE__ */ d.jsxs(
            "span",
            {
              className: xD,
              "data-tone": K,
              "aria-live": "polite",
              children: [
                /* @__PURE__ */ d.jsx(
                  "span",
                  {
                    className: SD,
                    "data-pulse": te ? "true" : "false",
                    "aria-hidden": "true"
                  }
                ),
                ee
              ]
            }
          ),
          /* @__PURE__ */ d.jsx("span", { className: ND, "aria-hidden": "true" }),
          /* @__PURE__ */ d.jsxs("span", { className: V0, children: [
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: wD,
                "data-state": C,
                onClick: E,
                disabled: T,
                "aria-label": w,
                children: R ? /* @__PURE__ */ d.jsx("span", { className: B0, "aria-hidden": "true" }) : b ? /* @__PURE__ */ d.jsx("span", { className: Mf, "aria-hidden": "true", children: "◼" }) : /* @__PURE__ */ d.jsx("span", { className: Mf, "aria-hidden": "true", children: "⏻" })
              }
            ),
            /* @__PURE__ */ d.jsx("span", { className: $0, role: "tooltip", children: w })
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: V0, children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: ED,
                "data-ready": z ? "true" : "false",
                onClick: g,
                disabled: k,
                "aria-label": _,
                children: [
                  h ? /* @__PURE__ */ d.jsx("span", { className: B0, "aria-hidden": "true" }) : /* @__PURE__ */ d.jsx("span", { className: Mf, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ d.jsx("span", { className: jD, children: h ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ d.jsx("span", { className: $0, role: "tooltip", children: _ })
          ] })
        ]
      }
    ),
    document.body
  );
}
function RD(n) {
  const a = n.workflowCustomised ?? !1, i = n.unmappableFields ?? [], s = DD(n.deployment.displayName, n.deployment.deploymentId), o = MD(360), u = n.canGenerate ?? !1;
  return /* @__PURE__ */ d.jsxs("div", { className: pM, children: [
    /* @__PURE__ */ d.jsxs("header", { className: vM, children: [
      /* @__PURE__ */ d.jsx("div", { className: yM, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ d.jsx("div", { className: gM, children: /* @__PURE__ */ d.jsx("h1", { className: bM, children: s }) }),
      /* @__PURE__ */ d.jsx("p", { className: xM, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ d.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    n.quickActions && /* @__PURE__ */ d.jsx("div", { className: AM, "aria-label": "Quick actions", children: n.quickActions }),
    /* @__PURE__ */ d.jsxs("div", { className: SM, children: [
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      n.voiceLibrarySection && /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: n.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      ),
      n.auditSection && /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "08" : "07",
          title: "Edit history",
          id: "recipe-section-audit",
          variant: "default",
          defaultCollapsed: !0,
          children: n.auditSection
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx(CD, { visible: o, canGenerate: u }),
    typeof document < "u" && Oh.createPortal(
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: DM,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: AD,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function MD(n) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const s = Yx(), o = () => {
      const h = s.reduce((m, g) => {
        const p = _D(g);
        return p > m ? p : m;
      }, 0);
      i(h > n);
    };
    o();
    const u = { passive: !0 };
    for (const h of s)
      h.addEventListener("scroll", o, u);
    return () => {
      for (const h of s)
        h.removeEventListener("scroll", o, u);
    };
  }, [n]), a;
}
function _D(n) {
  return n === window ? window.scrollY || document.documentElement.scrollTop || 0 : n.scrollTop;
}
function Yx() {
  const n = [window];
  if (typeof document > "u") return n;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && n.push(a), a = a.parentElement;
  }
  return n;
}
function AD() {
  if (typeof window > "u") return;
  const n = Yx();
  for (const a of n)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function DD(n, a) {
  const i = (n ?? "").trim();
  return !i || i === a ? "Recipe Studio" : i;
}
function hr({
  number: n,
  title: a,
  id: i,
  variant: s,
  defaultCollapsed: o = !1,
  children: u
}) {
  const [h, m] = y.useState(o), g = `${i}-body`;
  return /* @__PURE__ */ d.jsxs("section", { className: wM, "aria-labelledby": i, children: [
    /* @__PURE__ */ d.jsx("header", { className: EM, children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: TM,
        "aria-expanded": !h,
        "aria-controls": g,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ d.jsxs("span", { className: jM, children: [
            /* @__PURE__ */ d.jsx("span", { className: CM, children: n }),
            /* @__PURE__ */ d.jsx("span", { className: RM, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ d.jsx("span", { className: MM, children: a })
          ] }),
          /* @__PURE__ */ d.jsx("h2", { id: i, className: NM, children: a }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: _M,
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
        id: g,
        className: s === "split" ? OM : zM,
        children: u
      }
    )
  ] });
}
const _n = {
  success(n) {
    Zt.success(n);
  },
  error(n) {
    Zt.error(n);
  }
};
function zD(n) {
  try {
    const a = JSON.parse(n);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function OD() {
  const { deployment: n, mappings: a, runs: i, workflow: s } = Ts(), [o, u] = y.useState(a), [h, m] = y.useState([]), [g, p] = y.useState([]), [b, v] = y.useState(null), [S, E] = y.useState(kc), w = y.useMemo(
    () => n.defaultGenerationOverridesJson ? zD(n.defaultGenerationOverridesJson) : {},
    [n.defaultGenerationOverridesJson]
  ), T = y.useMemo(() => {
    const fe = w.__recipe;
    return typeof fe == "object" && fe !== null ? fe : {};
  }, [w]), [R, C] = y.useState(""), [k, _] = y.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [z, K] = y.useState(n.defaultSpeedFactor ?? 1), [ee, te] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [D, H] = y.useState(() => {
    const { __recipe: fe, ...ke } = w;
    return {
      temperature: 0.8,
      top_p: 0.8,
      seed: 42,
      ...ke
    };
  }), [q, le] = y.useState(() => {
    const fe = T.cachePolicy;
    return fe === "use_cache" || fe === "force_regenerate" || fe === "read_only_cache" ? fe : "use_cache";
  }), [re, J] = y.useState(
    n.defaultVoiceAssetId ?? null
  ), [ce, W] = y.useState(() => {
    const fe = T.quickMode;
    return typeof fe == "boolean" ? fe : n.defaultVoiceAssetId != null;
  }), [A, N] = y.useState(y3);
  y.useEffect(() => {
    let fe = !1;
    return ps(n.deploymentId).then((ke) => {
      fe || m(ke.voiceAssets);
    }).catch(() => {
    }), Cx(n.deploymentId).then((ke) => {
      fe || p(ke.presets);
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [n.deploymentId]);
  const U = y.useRef(!0);
  y.useEffect(() => {
    if (U.current) {
      U.current = !1;
      return;
    }
    const fe = window.setTimeout(() => {
      const ke = {
        ...D,
        __recipe: {
          quickMode: ce,
          cachePolicy: q
        }
      };
      ht(`/deployments/${n.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: k,
          defaultSpeedFactor: z,
          defaultGenerationOverrides: ke
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(fe);
  }, [
    n.deploymentId,
    k,
    z,
    q,
    ce,
    D
  ]);
  const I = y.useMemo(() => mD(R), [R]), ne = y.useMemo(() => vD(I), [I]), M = y.useMemo(() => gD(ne), [ne]), P = y.useMemo(() => yD(I), [I]), Q = y.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const ke of o)
      fe.set(ke.characterName.toLowerCase(), ke);
    return fe;
  }, [o]), oe = y.useMemo(() => ce && re ? 0 : ne.filter((fe) => !Q.has(fe.toLowerCase())).length, [ne, Q, ce, re]), he = y.useCallback(
    async (fe, ke) => {
      const De = Q.get(fe.toLowerCase());
      try {
        if (De) {
          const Te = await us(n.deploymentId, De.mappingId, ke);
          u(
            (bt) => bt.map((xt) => xt.mappingId === Te.mappingId ? Te : xt)
          ), _n.success(`Updated mapping for ${fe}`);
        } else if (ke.speakerVoiceAssetId) {
          const Te = await Dh(n.deploymentId, {
            ...ke,
            characterName: fe,
            speakerVoiceAssetId: ke.speakerVoiceAssetId
          });
          u((bt) => [...bt, Te]), _n.success(`Mapped ${fe} to voice`);
        }
      } catch (Te) {
        _n.error(Te instanceof Error ? Te.message : "mapping failed");
      }
    },
    [Q, n.deploymentId]
  ), ge = y.useCallback(
    async (fe) => {
      const ke = Q.get(fe.toLowerCase());
      if (ke)
        try {
          await Ex(n.deploymentId, ke.mappingId), u((De) => De.filter((Te) => Te.mappingId !== ke.mappingId)), _n.success(`Cleared mapping for ${fe}`);
        } catch (De) {
          _n.error(De instanceof Error ? De.message : "clear failed");
        }
    },
    [Q, n.deploymentId]
  ), Ae = y.useCallback(
    async (fe, ke) => {
      try {
        const De = await gc(
          n.deploymentId,
          ke,
          ke.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Te) => [De, ...Te]), await he(fe, { speakerVoiceAssetId: De.voiceAssetId });
      } catch (De) {
        _n.error(De instanceof Error ? De.message : "upload failed");
      }
    },
    [n.deploymentId, he]
  ), Me = y.useCallback((fe) => {
    E(fe);
  }, []), Ve = y.useMemo(() => {
    const fe = [], ke = /* @__PURE__ */ new Set();
    for (const De of o) {
      const Te = De.speakerVoiceAssetId;
      if (!Te || ke.has(Te)) continue;
      ke.add(Te);
      const xt = h.find((dn) => dn.voiceAssetId === Te)?.displayName ?? `${De.characterName} · ${Te.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: Te, label: xt });
    }
    for (const De of h)
      ke.has(De.voiceAssetId) || (ke.add(De.voiceAssetId), fe.push({ kind: "voice_asset", id: De.voiceAssetId, label: De.displayName }));
    return fe;
  }, [o, h]), Jt = y.useCallback(
    async (fe, ke) => {
      if (fe.kind !== "voice_asset") {
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
        const Te = await Nx(fe.id, n.deploymentId, {
          chain: De
        }), bt = o.filter((xt) => xt.speakerVoiceAssetId === fe.id);
        await Promise.all(
          bt.map(
            (xt) => us(n.deploymentId, xt.mappingId, {
              voiceAssetChainDigest: Te.chain_digest
            }).catch(() => null)
          )
        ), u(
          (xt) => xt.map(
            (dn) => dn.speakerVoiceAssetId === fe.id ? { ...dn, voiceAssetChainDigest: Te.chain_digest } : dn
          )
        ), _n.success(`Reverted ${fe.label} to a prior chain`);
      } catch (Te) {
        _n.error(Te instanceof Error ? Te.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), Pt = y.useCallback(
    async (fe) => {
      if (fe.kind !== "voice_asset") {
        _n.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await vC(fe.id, n.deploymentId);
        const ke = o.filter((De) => De.speakerVoiceAssetId === fe.id);
        await Promise.all(
          ke.map(
            (De) => us(n.deploymentId, De.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (De) => De.map(
            (Te) => Te.speakerVoiceAssetId === fe.id ? { ...Te, voiceAssetChainDigest: null } : Te
          )
        ), _n.success(`Cleared edit chain on ${fe.label}`);
      } catch (ke) {
        _n.error(ke instanceof Error ? ke.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), At = y.useMemo(
    () => ({
      script: R,
      parserMode: ce ? "raw_text" : "dialogue",
      outputFormat: k,
      speedFactor: z,
      globalEmotion: { ...ee, emotionAlpha: A.intensity },
      generation: D,
      cachePolicy: q
    }),
    [R, ce, k, z, A.intensity, ee, D, q]
  ), We = y.useMemo(
    () => BD({
      script: R,
      quickMode: ce,
      defaultVoiceAssetId: re,
      characters: ne,
      unmappedCount: oe,
      globalEmotion: ee,
      performance: A
    }),
    [R, ce, re, ne, oe, ee, A]
  ), pt = y.useMemo(
    () => We.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "fail",
      detail: fe.detail
    })),
    [We]
  );
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(mC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ d.jsx(
      RD,
      {
        deployment: n,
        canGenerate: R.trim().length > 0,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ d.jsx(GM, { deployment: n }),
        quickActions: /* @__PURE__ */ d.jsx(
          sD,
          {
            deploymentId: n.deploymentId,
            createPayload: At,
            canGenerate: R.trim().length > 0,
            diagnostics: pt
          }
        ),
        scriptSection: /* @__PURE__ */ d.jsx(
          kD,
          {
            quickMode: ce,
            onToggleQuickMode: W,
            deployment: n,
            script: R,
            onScriptChange: C,
            outputFormat: k,
            mappingsByLower: Q,
            defaultVoiceAssetId: re,
            onDefaultVoiceAssetIdChange: J
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ d.jsx(c3, { lines: I, characterColors: M }),
        voiceLibrarySection: /* @__PURE__ */ d.jsx(
          RR,
          {
            deploymentId: n.deploymentId,
            voiceAssets: h,
            mappings: o,
            characterColors: M,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ d.jsx(mM, { unmappedCount: oe, totalCount: ne.length, children: ne.map((fe) => {
          const ke = Q.get(fe.toLowerCase()) ?? null, De = M[fe] ?? "#ba9eff";
          return /* @__PURE__ */ d.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ d.jsx(
            hM,
            {
              characterName: fe,
              color: De,
              lineCount: P[fe] ?? 0,
              mapping: ke,
              voiceAssets: h,
              presets: g,
              active: b === fe,
              onToggle: () => v((Te) => Te === fe ? null : fe),
              onAssignVoiceAsset: (Te) => he(fe, { speakerVoiceAssetId: Te }),
              onAssignPreset: (Te) => he(fe, { defaultVectorPresetId: Te }),
              onUploadFile: (Te) => Ae(fe, Te),
              onClearMapping: () => ge(fe)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ d.jsx(
          L2,
          {
            value: ee,
            onChange: te,
            deploymentId: n.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            b3,
            {
              value: { ...A, pace: z },
              onChange: (fe) => {
                N(fe), fe.pace !== z && K(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Uh,
            {
              state: S,
              onChange: Me,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ d.jsx(_3, { checks: We }),
          /* @__PURE__ */ d.jsx(
            W2,
            {
              outputFormat: k,
              onOutputFormatChange: _,
              speedFactor: z,
              onSpeedFactorChange: K,
              cachePolicy: q,
              onCachePolicyChange: le,
              generation: D,
              onGenerationChange: H
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ d.jsx(G3, { runs: i, deploymentId: n.deploymentId }),
        auditSection: /* @__PURE__ */ d.jsx(
          XR,
          {
            deploymentId: n.deploymentId,
            targets: Ve,
            onRevertToIdentity: Pt,
            onRevertToChain: Jt
          }
        )
      }
    )
  ] });
}
function kD({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: i,
  script: s,
  onScriptChange: o,
  outputFormat: u,
  mappingsByLower: h,
  defaultVoiceAssetId: m,
  onDefaultVoiceAssetIdChange: g
}) {
  const p = s.length, b = s.trim() ? s.trim().split(/\s+/).length : 0, v = s.trim() ? s.trim().split(/\r?\n/).filter((S) => S.trim()).length : 0;
  return /* @__PURE__ */ d.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap"
        },
        children: [
          /* @__PURE__ */ d.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ d.jsx(
              "input",
              {
                type: "checkbox",
                checked: n,
                onChange: (S) => a(S.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          n && /* @__PURE__ */ d.jsx(
            B3,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: m,
              onChange: g
            }
          ),
          /* @__PURE__ */ d.jsxs(
            "div",
            {
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--on-surface-variant)",
                marginLeft: "auto"
              },
              "aria-live": "polite",
              children: [
                /* @__PURE__ */ d.jsxs("span", { children: [
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: p.toString().padStart(3, "0") }),
                  " ",
                  "chars"
                ] }),
                /* @__PURE__ */ d.jsxs("span", { children: [
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: v.toString().padStart(2, "0") }),
                  " ",
                  "lines"
                ] }),
                /* @__PURE__ */ d.jsxs("span", { children: [
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: b.toString().padStart(3, "0") }),
                  " ",
                  "words"
                ] }),
                /* @__PURE__ */ d.jsx(LD, {})
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsx(
      cD,
      {
        value: s,
        onChange: o,
        outputFormat: u,
        mappings: h,
        deploymentId: i.deploymentId
      }
    ),
    /* @__PURE__ */ d.jsx(UD, {})
  ] });
}
function LD() {
  return /* @__PURE__ */ d.jsxs(TC, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ d.jsx("h3", { className: jC, children: "Script syntax" }),
    /* @__PURE__ */ d.jsxs("ul", { className: NC, children: [
      /* @__PURE__ */ d.jsxs("li", { className: Jl, children: [
        /* @__PURE__ */ d.jsx("code", { className: Wl, children: "[Char] line text" }),
        /* @__PURE__ */ d.jsx("span", { className: es, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: Jl, children: [
        /* @__PURE__ */ d.jsx("code", { className: Wl, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ d.jsx("span", { className: es, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: Jl, children: [
        /* @__PURE__ */ d.jsx("code", { className: Wl, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ d.jsx("span", { className: es, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: Jl, children: [
        /* @__PURE__ */ d.jsx("code", { className: Wl, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ d.jsx("span", { className: es, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ d.jsxs("li", { className: Jl, children: [
        /* @__PURE__ */ d.jsx("code", { className: Wl, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ d.jsx("span", { className: es, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: Fy, children: [
      /* @__PURE__ */ d.jsx("span", { className: Yy, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: Fy, children: [
      /* @__PURE__ */ d.jsx("span", { className: Yy, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function UD() {
  return /* @__PURE__ */ d.jsxs(
    "ul",
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        padding: 0,
        margin: 0,
        listStyle: "none",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--on-surface-variant)"
      },
      children: [
        /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsx("code", { style: { color: "var(--accent)" }, children: "[Char]" }),
          " plain line"
        ] }),
        /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsx("code", { style: { color: "var(--accent)" }, children: "[Char|emotion_vector:happy=0.7]" }),
          " per-line vector"
        ] }),
        /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsx("code", { style: { color: "var(--secondary)" }, children: "[Char|qwen:warm]" }),
          " AI prompt mapping"
        ] }),
        /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsx("code", { style: { color: "var(--tertiary)" }, children: "[Char|preset:Bittersweet]" }),
          " saved preset"
        ] }),
        /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsx("code", { style: { color: "var(--acid-green)" }, children: "[Char|audio:slow_breath.wav]" }),
          " audio reference"
        ] })
      ]
    }
  );
}
function BD({
  script: n,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: s,
  unmappedCount: o,
  globalEmotion: u,
  performance: h
}) {
  const m = [], g = n.trim();
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
  }) : s.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${s.length} mapped` }) : m.push({
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
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const H0 = /* @__PURE__ */ new Map();
function VD(n, a) {
  const [i, s] = y.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return y.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${n}::${a}`, u = H0.get(o);
    if (u) {
      s({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), $D(n, a, h.signal).then((m) => {
      h.signal.aborted || (H0.set(o, m), s({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const g = m instanceof Error ? m.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: g });
    }), () => h.abort();
  }, [n, a]), i;
}
async function $D(n, a, i) {
  const s = await fetch(n, { signal: i });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return HD(h, a);
}
function HD(n, a) {
  const i = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), u = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(n.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const g = m * o, p = Math.min(s, g + o);
    let b = 0;
    for (let v = g; v < p; v += 1) {
      let S = 0;
      for (let w = 0; w < i; w += 1) {
        const T = h[w];
        T && (S += Math.abs(T[v] ?? 0));
      }
      const E = S / i;
      E > b && (b = E);
    }
    u[m] = b;
  }
  return u;
}
const q0 = "(prefers-reduced-motion: reduce)";
function qD() {
  const [n, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(q0).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(q0), s = (o) => a(o.matches);
    return i.addEventListener("change", s), () => i.removeEventListener("change", s);
  }, []), n;
}
var ID = "mquzal0", FD = "mquzal1", I0 = "mquzal2", F0 = "mquzal3", Y0 = "mquzal4", YD = "mquzal5", G0 = "mquzal6", X0 = "mquzal7";
const GD = 120, XD = 720;
function Gx(n) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: s,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: g = 0,
    onSeek: p,
    width: b = XD,
    height: v = GD
  } = n, S = y.useRef(null), E = y.useRef(null), w = y.useRef(null), T = VD(a, b), R = qD();
  y.useEffect(() => {
    PD(S.current, T.peaks, b, v);
  }, [T.peaks, b, v]);
  const C = y.useCallback(
    (D) => {
      const H = E.current?.getBoundingClientRect();
      if (!H || H.width <= 0) return 0;
      const q = Math.max(0, Math.min(1, (D - H.left) / H.width));
      return Math.round(q * i);
    },
    [i]
  );
  y.useEffect(() => {
    const D = (q) => {
      if (!w.current) return;
      const le = C(q.clientX);
      w.current === "start" ? u(Jo(le, 0, o - 1)) : h(Jo(le, s + 1, i));
    }, H = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", D), window.addEventListener("pointerup", H), () => {
      window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", H);
    };
  }, [C, i, o, s, u, h]);
  const k = (D) => (H) => {
    H.preventDefault(), H.stopPropagation(), w.current = D;
  }, _ = (D) => {
    !p || D.target.closest("[data-handle]") || p(C(D.clientX));
  }, z = (D) => (H) => {
    const q = H.shiftKey ? 100 : H.ctrlKey ? 1 : 10;
    let le = 0;
    if (H.key === "ArrowLeft") le = -q;
    else if (H.key === "ArrowRight") le = q;
    else return;
    H.preventDefault(), D === "start" ? u(Jo(s + le, 0, o - 1)) : h(Jo(o + le, s + 1, i));
  }, K = _f(s, i), ee = _f(o, i), te = _f(g, i);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: E,
      className: ID,
      style: { height: v },
      onPointerDown: _,
      children: [
        /* @__PURE__ */ d.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: FD,
            "aria-label": "Audio waveform"
          }
        ),
        T.isLoading && /* @__PURE__ */ d.jsx("div", { className: X0, children: "Decoding waveform…" }),
        T.error && /* @__PURE__ */ d.jsx("div", { className: X0, role: "alert", children: T.error }),
        /* @__PURE__ */ d.jsx("div", { className: G0, style: { left: 0, width: `${K}%` } }),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: G0,
            style: { left: `${ee}%`, right: 0, width: `${100 - ee}%` }
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: I0,
            style: { left: `${K}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: k("start"),
            onKeyDown: z("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: F0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: Y0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: I0,
            style: { left: `${ee}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: k("end"),
            onKeyDown: z("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: F0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: Y0, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: YD,
            style: {
              left: `${te}%`,
              transition: R ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function _f(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function Jo(n, a, i) {
  return Math.max(a, Math.min(i, n));
}
function PD(n, a, i, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, s), !a || a.length === 0)) return;
  const u = s / 2;
  o.fillStyle = KD(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const g = a[m] ?? 0, p = Math.max(1, g * (s - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function KD(n, a, i) {
  return getComputedStyle(n).getPropertyValue(a).trim() || i;
}
var QD = "r8lfsm0", ZD = "r8lfsm1", JD = "r8lfsm2", WD = "r8lfsm3", ez = "r8lfsm4", tz = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, nz = "_1b1zchy3", az = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, rz = "_1b1zchy6", iz = "_1b1zchy7";
const Xx = y.createContext("standalone");
function Px({
  variant: n = "standalone",
  children: a,
  className: i,
  style: s,
  ...o
}) {
  const u = [tz[n], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(Xx.Provider, { value: n, children: /* @__PURE__ */ d.jsx("div", { className: u, style: s, ...o, children: a }) });
}
function Kx({
  title: n,
  meta: a,
  children: i,
  className: s,
  titleId: o
}) {
  const u = y.useContext(Xx), h = [nz, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsxs("div", { className: h, children: [
    /* @__PURE__ */ d.jsx("h3", { id: o, className: az[u], children: n }),
    a ? /* @__PURE__ */ d.jsx("span", { className: rz, children: a }) : null,
    i
  ] });
}
function Qx({
  children: n,
  className: a,
  role: i = "group"
}) {
  const s = [iz, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: s, role: i, children: n });
}
const P0 = -16, lz = 80, sz = 720;
function oz(n) {
  const { deploymentId: a, runId: i, utterance: s, audioUrl: o, onApplied: u, onError: h, onCancel: m } = n, g = s.durationMs ?? 0, [p, b] = y.useState(() => K0(g)), [v, S] = y.useState(kc), [E, w] = y.useState(!1), [T, R] = y.useState(!1), [C, k] = y.useState(null), [_, z] = y.useState(!1), K = y.useRef(null), ee = y.useRef(null), te = y.useRef(null);
  y.useEffect(() => {
    const U = K0(g);
    b(U), S(Vx(U)), R(!1), k(null), te.current = null;
  }, [s.utteranceId, g]);
  const D = y.useCallback((U) => {
    S(U), b((I) => Bx(I, U));
  }, []);
  y.useEffect(() => () => ee.current?.abort(), []), y.useEffect(() => {
    K.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const H = y.useCallback(
    (U) => {
      U.key === "Escape" && (U.stopPropagation(), m());
    },
    [m]
  ), q = y.useMemo(
    () => p.ops.find((U) => U.mode === "trim"),
    [p.ops]
  ), le = q?.start_ms ?? 0, re = q?.end_ms ?? Math.max(1, g), J = y.useCallback((U, I) => {
    b((ne) => cz(ne, "trim", (M) => ({
      ...M,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(I))
    })));
  }, []), ce = y.useCallback((U) => J(U, re), [re, J]), W = y.useCallback((U) => J(le, U), [le, J]), A = y.useCallback((U) => {
    R(U), b((I) => {
      const ne = I.ops.filter((M) => M.mode !== "normalize");
      if (U) {
        const M = {
          id: Sn(),
          mode: "normalize",
          target_lufs: P0
        };
        return { ...I, ops: [...ne, M] };
      }
      return { ...I, ops: ne };
    });
  }, []), N = y.useCallback(async () => {
    const U = Tx(p, g);
    if (U) {
      k(U.message);
      return;
    }
    if (k(null), _) return;
    ee.current?.abort();
    const I = new AbortController();
    ee.current = I, z(!0);
    try {
      const ne = te.current ?? void 0, M = await pC(
        a,
        i,
        s.utteranceId,
        ne ? { chain: p, digest_before: ne } : { chain: p },
        { signal: I.signal }
      );
      if (I.signal.aborted) return;
      te.current = M.chain_digest, u(M);
    } catch (ne) {
      if (I.signal.aborted) return;
      ne instanceof Qi && (te.current = ne.currentDigest || null);
      const M = ne instanceof Qi ? "Edit chain has changed in another tab. Reload to continue." : ne instanceof Error ? ne.message : "apply failed";
      k(M), h(M);
    } finally {
      I.signal.aborted || z(!1);
    }
  }, [p, g, _, a, i, s.utteranceId, u, h]);
  return /* @__PURE__ */ d.jsx(Px, { variant: "nested", children: /* @__PURE__ */ d.jsxs("div", { ref: K, onKeyDown: H, children: [
    /* @__PURE__ */ d.jsx(Kx, { title: "Edit segment", meta: `Source · ${Wo(g)}` }),
    /* @__PURE__ */ d.jsx(
      Gx,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: le,
        endMs: re,
        onChangeStart: ce,
        onChangeEnd: W,
        height: lz,
        width: sz
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: QD, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: ZD, children: [
        Wo(le),
        " → ",
        Wo(re),
        " · ",
        Wo(re - le)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: JD, children: [
      /* @__PURE__ */ d.jsxs("label", { className: WD, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: (U) => A(U.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { children: [
          "Normalize to ",
          P0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: ez,
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
      Uh,
      {
        state: v,
        onChange: D,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ d.jsxs(Qx, { children: [
      /* @__PURE__ */ d.jsx(ft, { size: "sm", onClick: () => void N(), disabled: _, children: _ ? "Applying…" : "Apply" }),
      /* @__PURE__ */ d.jsx(ft, { variant: "ghost", size: "sm", onClick: m, disabled: _, children: "Cancel" })
    ] }),
    C && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: C })
  ] }) });
}
function K0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function cz(n, a, i) {
  const s = n.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: Sn(), mode: a };
    return { ...n, ops: [...n.ops, i(u)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function Wo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var uz = "jq2zyb2", dz = "jq2zyb3", fz = "jq2zyb4", hz = "jq2zyb5", mz = "jq2zyb6", pz = "jq2zyb7", vz = "jq2zyb8", gz = "jq2zyb9", yz = "jq2zyba", bz = "jq2zybb", xz = "jq2zybc", Sz = "jq2zybd", wz = "jq2zybe", Ez = "jq2zybf jq2zybe", jz = "jq2zybg", Nz = "jq2zybh", Tz = "jq2zybi", Cz = "jq2zybj", Rz = "jq2zybk", Mz = "jq2zybl", _z = "jq2zybm", Az = "jq2zybn", Dz = "jq2zybo", zz = "jq2zybp", Oz = "jq2zybq", kz = "jq2zybr", Lz = "jq2zybs", Uz = "jq2zybt", Bz = "jq2zybu", Vz = "jq2zybv", $z = "jq2zybw", Hz = "jq2zybx", qz = "jq2zyby", Iz = "jq2zybz", Q0 = "jq2zyb10", Fz = "jq2zyb11", Yz = "jq2zyb12", Gz = "jq2zyb13", Xz = "jq2zyb14";
const Pz = ["cancelled", "failed", "partial"], Kz = 2600;
function Qz() {
  const { run: n } = Ts(), a = js(), [i, s] = y.useState(n), [o, u] = y.useState(!1), [h, m] = y.useState(null), [g, p] = y.useState(null), [b, v] = y.useState(
    null
  );
  y.useEffect(() => {
    s(n);
  }, [n]), y.useEffect(() => {
    if (!b) return;
    const z = setTimeout(() => v(null), Kz);
    return () => clearTimeout(z);
  }, [b]);
  const S = y.useMemo(() => Wz(i), [i]), E = Pz.includes(i.status) && i.kind === "batch", w = (i.exportZipStaleAt ?? null) !== null, T = async () => {
    if (i.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: z } = await jx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${z}`);
      } catch (z) {
        m(n5(z));
      } finally {
        u(!1);
      }
    }
  }, R = y.useCallback((z) => {
    p((K) => K === z ? null : z);
  }, []), C = y.useCallback(() => {
    p(null);
  }, []), k = (z, K) => {
    s((ee) => Jz(ee, z, K)), p(null), v({ message: "Segment edited", severity: "success" });
  }, _ = y.useCallback((z) => {
    v({ message: z, severity: "error" });
  }, []);
  return /* @__PURE__ */ d.jsxs("main", { className: uz, children: [
    /* @__PURE__ */ d.jsxs("div", { className: dz, children: [
      /* @__PURE__ */ d.jsxs("header", { className: fz, children: [
        /* @__PURE__ */ d.jsxs("p", { className: hz, children: [
          i.deploymentId ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx(zc, { to: `/${i.deploymentId}/recipe`, className: mz, children: "← Back to recipe" }),
            /* @__PURE__ */ d.jsx("span", { className: pz, children: "·" })
          ] }) : null,
          /* @__PURE__ */ d.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: vz, children: [
          /* @__PURE__ */ d.jsxs("h1", { className: gz, children: [
            e5(i.kind),
            /* @__PURE__ */ d.jsx("span", { className: yz, children: i.runId })
          ] }),
          /* @__PURE__ */ d.jsx(Zr, { size: "md", tone: a5(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("section", { className: bz, "aria-label": "Run statistics", children: [
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
      E && /* @__PURE__ */ d.jsxs("section", { className: Nz, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ d.jsxs("div", { className: Tz, children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-resume-title", className: Cz, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ d.jsx("p", { className: Rz, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ d.jsx(ft, { size: "lg", disabled: o, onClick: () => void T(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ d.jsx("p", { className: Mz, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ d.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ d.jsxs(jT, { children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-utterances", className: Pr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ d.jsxs("span", { className: _z, children: [
            /* @__PURE__ */ d.jsx("span", { className: Az, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("ul", { className: Dz, children: i.utterances.map((z) => {
          const K = g === z.utteranceId, ee = z.status === "completed" && z.audioArtifactRef !== null && z.audioArtifactRef !== void 0, te = z.derivedArtifactRef ?? z.audioArtifactRef ?? null, D = te ? `/api/v1/artifacts/${encodeURIComponent(te)}/download` : "", H = (z.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ d.jsxs("li", { className: Oz, children: [
            /* @__PURE__ */ d.jsxs("div", { className: zz, children: [
              /* @__PURE__ */ d.jsxs("span", { className: Uz, children: [
                "#",
                z.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: Bz, title: z.characterDisplay, children: z.characterDisplay }),
              /* @__PURE__ */ d.jsx("span", { className: Vz, title: z.text, children: z.text }),
              /* @__PURE__ */ d.jsxs("span", { className: $z, children: [
                z.cacheHit && /* @__PURE__ */ d.jsx("span", { className: Hz, children: "cached" }),
                H && /* @__PURE__ */ d.jsx("span", { className: kz, children: "edited" }),
                z.durationMs ? /* @__PURE__ */ d.jsx("span", { children: t5(z.durationMs) }) : null,
                /* @__PURE__ */ d.jsx(Zr, { tone: r5(z.status), children: z.status }),
                ee && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: Lz,
                    onClick: () => R(z.utteranceId),
                    "aria-expanded": K,
                    "aria-label": K ? "Close segment editor" : "Edit segment",
                    children: K ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            K && D && i.deploymentId && /* @__PURE__ */ d.jsx(
              oz,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: z,
                audioUrl: D,
                onApplied: (q) => k(z.utteranceId, q),
                onError: _,
                onCancel: C
              }
            )
          ] }, z.utteranceId);
        }) })
      ] }),
      Zz(i, w)
    ] }),
    b && /* @__PURE__ */ d.jsx(
      "div",
      {
        className: Xz,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function Zz(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ d.jsx("div", { className: qz, children: a ? /* @__PURE__ */ d.jsxs("div", { className: Fz, children: [
    /* @__PURE__ */ d.jsx("p", { className: Yz, children: s }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: Gz,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ d.jsx("span", { className: Q0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ d.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: Iz,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ d.jsx("span", { className: Q0, children: "↓" })
      ]
    }
  ) : null });
}
function Jz(n, a, i) {
  const s = n.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: i.derived_artifact_ref,
    durationMs: i.derived_duration_ms
  });
  return {
    ...n,
    utterances: s,
    exportZipStaleAt: n.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function ec({ label: n, value: a, mono: i, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: xz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: Sz, children: n }),
        /* @__PURE__ */ d.jsx("span", { className: i ? Ez : wz, children: a }),
        o !== void 0 && /* @__PURE__ */ d.jsx("span", { className: jz, "aria-hidden": "true" })
      ]
    }
  );
}
function Wz(n) {
  const a = n.utterances.length, i = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, u = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: s, cached: o, cacheRatio: u };
}
function e5(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function t5(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function n5(n) {
  return n instanceof el ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function a5(n) {
  switch (n) {
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
function r5(n) {
  switch (n) {
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
var i5 = "pcphqj2", l5 = "pcphqj3", s5 = "pcphqj4", o5 = "pcphqj5", c5 = "pcphqj6", u5 = "pcphqj7", d5 = "pcphqj8", f5 = "pcphqj9", h5 = "pcphqja", Z0 = "pcphqjb", m5 = "pcphqjc", p5 = "pcphqjd", v5 = "pcphqje pcphqjd", g5 = "pcphqjf", y5 = "pcphqjg", b5 = "pcphqjh", x5 = "pcphqji", S5 = "pcphqjj pcphqji", w5 = "pcphqjk pcphqji", E5 = "pcphqjl pcphqji", j5 = "pcphqjm", Af = "pcphqjn", Df = "pcphqjo";
function N5() {
  const [n, a] = y.useState(null), [i, s] = y.useState(null);
  return y.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await ht("/runtime/queue");
        o || (a(m.entries), s(null));
      } catch (m) {
        o || s(m instanceof Error ? m.message : "Unknown error");
      }
    };
    u();
    const h = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ d.jsx("main", { className: i5, children: /* @__PURE__ */ d.jsxs("div", { className: l5, children: [
    /* @__PURE__ */ d.jsxs("header", { className: s5, children: [
      /* @__PURE__ */ d.jsx("p", { className: o5, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ d.jsxs("div", { className: c5, children: [
        /* @__PURE__ */ d.jsx("h1", { className: u5, children: "Queue" }),
        /* @__PURE__ */ d.jsx("span", { className: d5, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: f5, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ d.jsx(zn, { severity: "error", children: i }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ d.jsx(La, { density: "compact", children: /* @__PURE__ */ d.jsx(Cs, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ d.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ d.jsx("h2", { id: "runtime-queue-section", className: Pr, children: "01 / In flight" }),
      /* @__PURE__ */ d.jsx("ul", { className: h5, children: n.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ d.jsxs(
          "li",
          {
            className: u ? `${Z0} ${m5}` : Z0,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: u ? v5 : p5, children: o.position }),
              /* @__PURE__ */ d.jsxs("span", { className: g5, children: [
                /* @__PURE__ */ d.jsx("span", { className: y5, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ d.jsx("span", { className: b5, children: o.runId })
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: T5(o.kind), children: C5(o.kind) }),
              /* @__PURE__ */ d.jsx("span", { className: j5, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: Af, children: R5(o.etaSeconds) }),
                /* @__PURE__ */ d.jsx("span", { className: Df, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: Af, children: o.utteranceTotal }),
                /* @__PURE__ */ d.jsx("span", { className: Df, children: "lines" })
              ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: Af, children: "—" }),
                /* @__PURE__ */ d.jsx("span", { className: Df, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function T5(n) {
  switch (n) {
    case "batch":
      return S5;
    case "test_line":
      return w5;
    case "resume":
      return E5;
    default:
      return x5;
  }
}
function C5(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function R5(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), i = n % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function M5() {
  const { deploymentId: n, prefillCharacterName: a } = Ts(), i = js(), [s, o] = y.useState(a), [u, h] = y.useState(""), [m, g] = y.useState("none"), [p, b] = y.useState(!1), [v, S] = y.useState(null), E = y.useRef(null);
  y.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const w = async (T) => {
    T.preventDefault(), b(!0), S(null);
    try {
      await Dh(n, {
        characterName: s,
        speakerVoiceAssetId: u,
        defaultEmotionMode: m
      }), i(`/${n}/recipe`);
    } catch (R) {
      S(R instanceof Error ? R.message : "failed");
    } finally {
      b(!1);
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
            value: s,
            onChange: (T) => o(T.currentTarget.value),
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
            onChange: (T) => h(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ d.jsxs("select", { value: m, onChange: (T) => g(T.currentTarget.value), children: [
          /* @__PURE__ */ d.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ d.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ d.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ d.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsx(ft, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: v })
    ] })
  ] });
}
const Zx = y.createContext({});
function Bh(n) {
  const a = y.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const _5 = typeof window < "u", Jx = _5 ? y.useLayoutEffect : y.useEffect, Lc = /* @__PURE__ */ y.createContext(null);
function A5(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function D5(n, a) {
  const i = n.indexOf(a);
  i > -1 && n.splice(i, 1);
}
const xr = (n, a, i) => i > a ? a : i < n ? n : i;
function J0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let Rs = () => {
}, Ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Rs = (n, a, i) => {
  !n && typeof console < "u" && console.warn(J0(a, i));
}, Ji = (n, a, i) => {
  if (!n)
    throw new Error(J0(a, i));
});
const Sr = {}, Wx = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function z5(n) {
  return typeof n == "object" && n !== null;
}
const e1 = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function t1(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const tl = /* @__NO_SIDE_EFFECTS__ */ (n) => n, O5 = (n, a) => (i) => a(n(i)), Uc = (...n) => n.reduce(O5), n1 = /* @__NO_SIDE_EFFECTS__ */ (n, a, i) => {
  const s = a - n;
  return s === 0 ? 1 : (i - n) / s;
};
class a1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return A5(this.subscriptions, a), () => D5(this.subscriptions, a);
  }
  notify(a, i, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, s);
      else
        for (let u = 0; u < o; u++) {
          const h = this.subscriptions[u];
          h && h(a, i, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Xn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, aa = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function r1(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const i1 = (n, a, i) => (((1 - 3 * i + 3 * a) * n + (3 * i - 6 * a)) * n + 3 * a) * n, k5 = 1e-7, L5 = 12;
function U5(n, a, i, s, o) {
  let u, h, m = 0;
  do
    h = a + (i - a) / 2, u = i1(h, s, o) - n, u > 0 ? i = h : a = h;
  while (Math.abs(u) > k5 && ++m < L5);
  return h;
}
function Ms(n, a, i, s) {
  if (n === a && i === s)
    return tl;
  const o = (u) => U5(u, 0, 1, n, i);
  return (u) => u === 0 || u === 1 ? u : i1(o(u), a, s);
}
const l1 = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, s1 = (n) => (a) => 1 - n(1 - a), o1 = /* @__PURE__ */ Ms(0.33, 1.53, 0.69, 0.99), Vh = /* @__PURE__ */ s1(o1), c1 = /* @__PURE__ */ l1(Vh), u1 = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * Vh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), $h = (n) => 1 - Math.sin(Math.acos(n)), B5 = s1($h), d1 = l1($h), V5 = /* @__PURE__ */ Ms(0.42, 0, 1, 1), $5 = /* @__PURE__ */ Ms(0, 0, 0.58, 1), f1 = /* @__PURE__ */ Ms(0.42, 0, 0.58, 1), H5 = (n) => Array.isArray(n) && typeof n[0] != "number", h1 = (n) => Array.isArray(n) && typeof n[0] == "number", W0 = {
  linear: tl,
  easeIn: V5,
  easeInOut: f1,
  easeOut: $5,
  circIn: $h,
  circInOut: d1,
  circOut: B5,
  backIn: Vh,
  backInOut: c1,
  backOut: o1,
  anticipate: u1
}, q5 = (n) => typeof n == "string", eb = (n) => {
  if (h1(n)) {
    Ji(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, s, o] = n;
    return Ms(a, i, s, o);
  } else if (q5(n))
    return Ji(W0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), W0[n];
  return n;
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
function I5(n, a) {
  let i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function g(b) {
    h.has(b) && (p.schedule(b), n()), b(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, v = !1, S = !1) => {
      const w = S && o ? i : s;
      return v && h.add(b), w.add(b), b;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (b) => {
      s.delete(b), h.delete(b);
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
      const v = i;
      i = s, s = v, i.forEach(g), i.clear(), o = !1, u && (u = !1, p.process(b));
    }
  };
  return p;
}
const F5 = 40;
function m1(n, a) {
  let i = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => i = !0, h = tc.reduce((_, z) => (_[z] = I5(u), _), {}), { setup: m, read: g, resolveKeyframes: p, preUpdate: b, update: v, preRender: S, render: E, postRender: w } = h, T = () => {
    const _ = Sr.useManualTiming, z = _ ? o.timestamp : performance.now();
    i = !1, _ || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(z - o.timestamp, F5), 1)), o.timestamp = z, o.isProcessing = !0, m.process(o), g.process(o), p.process(o), b.process(o), v.process(o), S.process(o), E.process(o), w.process(o), o.isProcessing = !1, i && a && (s = !1, n(T));
  }, R = () => {
    i = !0, s = !0, o.isProcessing || n(T);
  };
  return { schedule: tc.reduce((_, z) => {
    const K = h[z];
    return _[z] = (ee, te = !1, D = !1) => (i || R(), K.schedule(ee, te, D)), _;
  }, {}), cancel: (_) => {
    for (let z = 0; z < tc.length; z++)
      h[tc[z]].cancel(_);
  }, state: o, steps: h };
}
const { schedule: Pn, cancel: Qf, state: xc } = /* @__PURE__ */ m1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : tl, !0);
let fc;
function Y5() {
  fc = void 0;
}
const Dn = {
  now: () => (fc === void 0 && Dn.set(xc.isProcessing || Sr.useManualTiming ? xc.timestamp : performance.now()), fc),
  set: (n) => {
    fc = n, queueMicrotask(Y5);
  }
}, p1 = (n) => (a) => typeof a == "string" && a.startsWith(n), v1 = /* @__PURE__ */ p1("--"), G5 = /* @__PURE__ */ p1("var(--"), Hh = (n) => G5(n) ? X5.test(n.split("/*")[0].trim()) : !1, X5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function tb(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const nl = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, bs = {
  ...nl,
  transform: (n) => xr(0, 1, n)
}, nc = {
  ...nl,
  default: 1
}, ds = (n) => Math.round(n * 1e5) / 1e5, qh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function P5(n) {
  return n == null;
}
const K5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Ih = (n, a) => (i) => !!(typeof i == "string" && K5.test(i) && i.startsWith(n) || a && !P5(i) && Object.prototype.hasOwnProperty.call(i, a)), g1 = (n, a, i) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, u, h, m] = s.match(qh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(u),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, Q5 = (n) => xr(0, 255, n), zf = {
  ...nl,
  transform: (n) => Math.round(Q5(n))
}, Gr = {
  test: /* @__PURE__ */ Ih("rgb", "red"),
  parse: /* @__PURE__ */ g1("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: i, alpha: s = 1 }) => "rgba(" + zf.transform(n) + ", " + zf.transform(a) + ", " + zf.transform(i) + ", " + ds(bs.transform(s)) + ")"
};
function Z5(n) {
  let a = "", i = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), i = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), i = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, i += i, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Zf = {
  test: /* @__PURE__ */ Ih("#"),
  parse: Z5,
  transform: Gr.transform
}, _s = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), pr = /* @__PURE__ */ _s("deg"), Ki = /* @__PURE__ */ _s("%"), we = /* @__PURE__ */ _s("px"), J5 = /* @__PURE__ */ _s("vh"), W5 = /* @__PURE__ */ _s("vw"), nb = {
  ...Ki,
  parse: (n) => Ki.parse(n) / 100,
  transform: (n) => Ki.transform(n * 100)
}, Gi = {
  test: /* @__PURE__ */ Ih("hsl", "hue"),
  parse: /* @__PURE__ */ g1("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: i, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Ki.transform(ds(a)) + ", " + Ki.transform(ds(i)) + ", " + ds(bs.transform(s)) + ")"
}, Vt = {
  test: (n) => Gr.test(n) || Zf.test(n) || Gi.test(n),
  parse: (n) => Gr.test(n) ? Gr.parse(n) : Gi.test(n) ? Gi.parse(n) : Zf.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Gr.transform(n) : Gi.transform(n),
  getAnimatableNone: (n) => {
    const a = Vt.parse(n);
    return a.alpha = 0, Vt.transform(a);
  }
}, e4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function t4(n) {
  return isNaN(n) && typeof n == "string" && (n.match(qh)?.length || 0) + (n.match(e4)?.length || 0) > 0;
}
const y1 = "number", b1 = "color", n4 = "var", a4 = "var(", ab = "${}", r4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(n) {
  const a = n.toString(), i = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(r4, (g) => (Vt.test(g) ? (s.color.push(u), o.push(b1), i.push(Vt.parse(g))) : g.startsWith(a4) ? (s.var.push(u), o.push(n4), i.push(g)) : (s.number.push(u), o.push(y1), i.push(parseFloat(g))), ++u, ab)).split(ab);
  return { values: i, split: m, indexes: s, types: o };
}
function i4(n) {
  return Wi(n).values;
}
function x1({ split: n, types: a }) {
  const i = n.length;
  return (s) => {
    let o = "";
    for (let u = 0; u < i; u++)
      if (o += n[u], s[u] !== void 0) {
        const h = a[u];
        h === y1 ? o += ds(s[u]) : h === b1 ? o += Vt.transform(s[u]) : o += s[u];
      }
    return o;
  };
}
function l4(n) {
  return x1(Wi(n));
}
const s4 = (n) => typeof n == "number" ? 0 : Vt.test(n) ? Vt.getAnimatableNone(n) : n, o4 = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : s4(n);
function c4(n) {
  const a = Wi(n);
  return x1(a)(a.values.map((s, o) => o4(s, a.split[o])));
}
const ra = {
  test: t4,
  parse: i4,
  createTransformer: l4,
  getAnimatableNone: c4
};
function Of(n, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? n + (a - n) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? n + (a - n) * (2 / 3 - i) * 6 : n;
}
function u4({ hue: n, saturation: a, lightness: i, alpha: s }) {
  n /= 360, a /= 100, i /= 100;
  let o = 0, u = 0, h = 0;
  if (!a)
    o = u = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, g = 2 * i - m;
    o = Of(g, m, n + 1 / 3), u = Of(g, m, n), h = Of(g, m, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(h * 255),
    alpha: s
  };
}
function Sc(n, a) {
  return (i) => i > 0 ? a : n;
}
const As = (n, a, i) => n + (a - n) * i, kf = (n, a, i) => {
  const s = n * n, o = i * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, d4 = [Zf, Gr, Gi], f4 = (n) => d4.find((a) => a.test(n));
function rb(n) {
  const a = f4(n);
  if (Rs(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(n);
  return a === Gi && (i = u4(i)), i;
}
const ib = (n, a) => {
  const i = rb(n), s = rb(a);
  if (!i || !s)
    return Sc(n, a);
  const o = { ...i };
  return (u) => (o.red = kf(i.red, s.red, u), o.green = kf(i.green, s.green, u), o.blue = kf(i.blue, s.blue, u), o.alpha = As(i.alpha, s.alpha, u), Gr.transform(o));
}, Jf = /* @__PURE__ */ new Set(["none", "hidden"]);
function h4(n, a) {
  return Jf.has(n) ? (i) => i <= 0 ? n : a : (i) => i >= 1 ? a : n;
}
function m4(n, a) {
  return (i) => As(n, a, i);
}
function Fh(n) {
  return typeof n == "number" ? m4 : typeof n == "string" ? Hh(n) ? Sc : Vt.test(n) ? ib : g4 : Array.isArray(n) ? S1 : typeof n == "object" ? Vt.test(n) ? ib : p4 : Sc;
}
function S1(n, a) {
  const i = [...n], s = i.length, o = n.map((u, h) => Fh(u)(u, a[h]));
  return (u) => {
    for (let h = 0; h < s; h++)
      i[h] = o[h](u);
    return i;
  };
}
function p4(n, a) {
  const i = { ...n, ...a }, s = {};
  for (const o in i)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Fh(n[o])(n[o], a[o]));
  return (o) => {
    for (const u in s)
      i[u] = s[u](o);
    return i;
  };
}
function v4(n, a) {
  const i = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], h = n.indexes[u][s[u]], m = n.values[h] ?? 0;
    i[o] = m, s[u]++;
  }
  return i;
}
const g4 = (n, a) => {
  const i = ra.createTransformer(a), s = Wi(n), o = Wi(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Jf.has(n) && !o.values.length || Jf.has(a) && !s.values.length ? h4(n, a) : Uc(S1(v4(s, o), o.values), i) : (Rs(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Sc(n, a));
};
function w1(n, a, i) {
  return typeof n == "number" && typeof a == "number" && typeof i == "number" ? As(n, a, i) : Fh(n)(n, a);
}
const y4 = (n) => {
  const a = ({ timestamp: i }) => n(i);
  return {
    start: (i = !0) => Pn.update(a, i),
    stop: () => Qf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => xc.isProcessing ? xc.timestamp : Dn.now()
  };
}, E1 = (n, a, i = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let u = 0; u < o; u++)
    s += Math.round(n(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, wc = 2e4;
function Yh(n) {
  let a = 0;
  const i = 50;
  let s = n.next(a);
  for (; !s.done && a < wc; )
    a += i, s = n.next(a);
  return a >= wc ? 1 / 0 : a;
}
function b4(n, a = 100, i) {
  const s = i({ ...n, keyframes: [0, a] }), o = Math.min(Yh(s), wc);
  return {
    type: "keyframes",
    ease: (u) => s.next(o * u).value / a,
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
function Wf(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const x4 = 12;
function S4(n, a, i) {
  let s = i;
  for (let o = 1; o < x4; o++)
    s = s - n(s) / a(s);
  return s;
}
const Lf = 1e-3;
function w4({ duration: n = Et.duration, bounce: a = Et.bounce, velocity: i = Et.velocity, mass: s = Et.mass }) {
  let o, u;
  Rs(n <= /* @__PURE__ */ Xn(Et.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xr(Et.minDamping, Et.maxDamping, h), n = xr(Et.minDuration, Et.maxDuration, /* @__PURE__ */ aa(n)), h < 1 ? (o = (p) => {
    const b = p * h, v = b * n, S = b - i, E = Wf(p, h), w = Math.exp(-v);
    return Lf - S / E * w;
  }, u = (p) => {
    const v = p * h * n, S = v * i + i, E = Math.pow(h, 2) * Math.pow(p, 2) * n, w = Math.exp(-v), T = Wf(Math.pow(p, 2), h);
    return (-o(p) + Lf > 0 ? -1 : 1) * ((S - E) * w) / T;
  }) : (o = (p) => {
    const b = Math.exp(-p * n), v = (p - i) * n + 1;
    return -Lf + b * v;
  }, u = (p) => {
    const b = Math.exp(-p * n), v = (i - p) * (n * n);
    return b * v;
  });
  const m = 5 / n, g = S4(o, u, m);
  if (n = /* @__PURE__ */ Xn(n), isNaN(g))
    return {
      stiffness: Et.stiffness,
      damping: Et.damping,
      duration: n
    };
  {
    const p = Math.pow(g, 2) * s;
    return {
      stiffness: p,
      damping: h * 2 * Math.sqrt(s * p),
      duration: n
    };
  }
}
const E4 = ["duration", "bounce"], j4 = ["stiffness", "damping", "mass"];
function lb(n, a) {
  return a.some((i) => n[i] !== void 0);
}
function N4(n) {
  let a = {
    velocity: Et.velocity,
    stiffness: Et.stiffness,
    damping: Et.damping,
    mass: Et.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!lb(n, j4) && lb(n, E4))
    if (a.velocity = 0, n.visualDuration) {
      const i = n.visualDuration, s = 2 * Math.PI / (i * 1.2), o = s * s, u = 2 * xr(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Et.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const i = w4({ ...n, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: Et.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Ec(n = Et.visualDuration, a = Et.bounce) {
  const i = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = i;
  const u = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: g, damping: p, mass: b, duration: v, velocity: S, isResolvedFromDuration: E } = N4({
    ...i,
    velocity: -/* @__PURE__ */ aa(i.velocity || 0)
  }), w = S || 0, T = p / (2 * Math.sqrt(g * b)), R = h - u, C = /* @__PURE__ */ aa(Math.sqrt(g / b)), k = Math.abs(R) < 5;
  s || (s = k ? Et.restSpeed.granular : Et.restSpeed.default), o || (o = k ? Et.restDelta.granular : Et.restDelta.default);
  let _, z, K, ee, te, D;
  if (T < 1)
    K = Wf(C, T), ee = (w + T * C * R) / K, _ = (q) => {
      const le = Math.exp(-T * C * q);
      return h - le * (ee * Math.sin(K * q) + R * Math.cos(K * q));
    }, te = T * C * ee + R * K, D = T * C * R - ee * K, z = (q) => Math.exp(-T * C * q) * (te * Math.sin(K * q) + D * Math.cos(K * q));
  else if (T === 1) {
    _ = (le) => h - Math.exp(-C * le) * (R + (w + C * R) * le);
    const q = w + C * R;
    z = (le) => Math.exp(-C * le) * (C * q * le - w);
  } else {
    const q = C * Math.sqrt(T * T - 1);
    _ = (ce) => {
      const W = Math.exp(-T * C * ce), A = Math.min(q * ce, 300);
      return h - W * ((w + T * C * R) * Math.sinh(A) + q * R * Math.cosh(A)) / q;
    };
    const le = (w + T * C * R) / q, re = T * C * le - R * q, J = T * C * R - le * q;
    z = (ce) => {
      const W = Math.exp(-T * C * ce), A = Math.min(q * ce, 300);
      return W * (re * Math.sinh(A) + J * Math.cosh(A));
    };
  }
  const H = {
    calculatedDuration: E && v || null,
    velocity: (q) => /* @__PURE__ */ Xn(z(q)),
    next: (q) => {
      if (!E && T < 1) {
        const re = Math.exp(-T * C * q), J = Math.sin(K * q), ce = Math.cos(K * q), W = h - re * (ee * J + R * ce), A = /* @__PURE__ */ Xn(re * (te * J + D * ce));
        return m.done = Math.abs(A) <= s && Math.abs(h - W) <= o, m.value = m.done ? h : W, m;
      }
      const le = _(q);
      if (E)
        m.done = q >= v;
      else {
        const re = /* @__PURE__ */ Xn(z(q));
        m.done = Math.abs(re) <= s && Math.abs(h - le) <= o;
      }
      return m.value = m.done ? h : le, m;
    },
    toString: () => {
      const q = Math.min(Yh(H), wc), le = E1((re) => H.next(q * re).value, q, 30);
      return q + "ms " + le;
    },
    toTransition: () => {
    }
  };
  return H;
}
Ec.applyToOptions = (n) => {
  const a = b4(n, 100, Ec);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Xn(a.duration), n.type = "keyframes", n;
};
const T4 = 5;
function j1(n, a, i) {
  const s = Math.max(a - T4, 0);
  return r1(i - n(s), a - s);
}
function eh({ keyframes: n, velocity: a = 0, power: i = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: h, min: m, max: g, restDelta: p = 0.5, restSpeed: b }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, E = (D) => m !== void 0 && D < m || g !== void 0 && D > g, w = (D) => m === void 0 ? g : g === void 0 || Math.abs(m - D) < Math.abs(g - D) ? m : g;
  let T = i * a;
  const R = v + T, C = h === void 0 ? R : h(R);
  C !== R && (T = C - v);
  const k = (D) => -T * Math.exp(-D / s), _ = (D) => C + k(D), z = (D) => {
    const H = k(D), q = _(D);
    S.done = Math.abs(H) <= p, S.value = S.done ? C : q;
  };
  let K, ee;
  const te = (D) => {
    E(S.value) && (K = D, ee = Ec({
      keyframes: [S.value, w(S.value)],
      velocity: j1(_, D, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: b
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (D) => {
      let H = !1;
      return !ee && K === void 0 && (H = !0, z(D), te(D)), K !== void 0 && D >= K ? ee.next(D - K) : (!H && z(D), S);
    }
  };
}
function C4(n, a, i) {
  const s = [], o = i || Sr.mix || w1, u = n.length - 1;
  for (let h = 0; h < u; h++) {
    let m = o(n[h], n[h + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[h] || tl : a;
      m = Uc(g, m);
    }
    s.push(m);
  }
  return s;
}
function R4(n, a, { clamp: i = !0, ease: s, mixer: o } = {}) {
  const u = n.length;
  if (Ji(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[u - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const m = C4(a, s, o), g = m.length, p = (b) => {
    if (h && b < n[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < n.length - 2 && !(b < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ n1(n[v], n[v + 1], b);
    return m[v](S);
  };
  return i ? (b) => p(xr(n[0], n[u - 1], b)) : p;
}
function M4(n, a) {
  const i = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ n1(0, a, s);
    n.push(As(i, 1, o));
  }
}
function _4(n) {
  const a = [0];
  return M4(a, n.length - 1), a;
}
function A4(n, a) {
  return n.map((i) => i * a);
}
function D4(n, a) {
  return n.map(() => a || f1).splice(0, n.length - 1);
}
function fs({ duration: n = 300, keyframes: a, times: i, ease: s = "easeInOut" }) {
  const o = H5(s) ? s.map(eb) : eb(s), u = {
    done: !1,
    value: a[0]
  }, h = A4(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : _4(a),
    n
  ), m = R4(h, a, {
    ease: Array.isArray(o) ? o : D4(a, o)
  });
  return {
    calculatedDuration: n,
    next: (g) => (u.value = m(g), u.done = g >= n, u)
  };
}
const z4 = (n) => n !== null;
function Bc(n, { repeat: a, repeatType: i = "loop" }, s, o = 1) {
  const u = n.filter(z4), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || s === void 0 ? u[m] : s;
}
const O4 = {
  decay: eh,
  inertia: eh,
  tween: fs,
  keyframes: fs,
  spring: Ec
};
function N1(n) {
  typeof n.type == "string" && (n.type = O4[n.type]);
}
class Gh {
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
const k4 = (n) => n / 100;
class jc extends Gh {
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
    N1(a);
    const { type: i = fs, repeat: s = 0, repeatDelay: o = 0, repeatType: u, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const g = i || fs;
    g !== fs && typeof m[0] != "number" && (this.mixKeyframes = Uc(k4, w1(m[0], m[1])), m = [0, 100]);
    const p = g({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Yh(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: u, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: g } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: E, type: w, onUpdate: T, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const C = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), k = this.playbackSpeed >= 0 ? C < 0 : C > o;
    this.currentTime = Math.max(C, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let _ = this.currentTime, z = s;
    if (v) {
      const D = Math.min(this.currentTime, o) / m;
      let H = Math.floor(D), q = D % 1;
      !q && D >= 1 && (q = 1), q === 1 && H--, H = Math.min(H, v + 1), !!(H % 2) && (S === "reverse" ? (q = 1 - q, E && (q -= E / m)) : S === "mirror" && (z = h)), _ = xr(0, 1, q) * m;
    }
    let K;
    k ? (this.delayState.value = b[0], K = this.delayState) : K = z.next(_), u && !k && (K.value = u(K.value));
    let { done: ee } = K;
    !k && g !== null && (ee = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && ee);
    return te && w !== eh && (K.value = Bc(b, this.options, R, this.speed)), T && T(K.value), te && this.finish(), K;
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
    return j1((s) => this.generator.next(s).value, a, i);
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
    const { driver: a = y4, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = i ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
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
function L4(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Xr = (n) => n * 180 / Math.PI, th = (n) => {
  const a = Xr(Math.atan2(n[1], n[0]));
  return nh(a);
}, U4 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: th,
  rotateZ: th,
  skewX: (n) => Xr(Math.atan(n[1])),
  skewY: (n) => Xr(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, nh = (n) => (n = n % 360, n < 0 && (n += 360), n), sb = th, ob = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), cb = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), B4 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ob,
  scaleY: cb,
  scale: (n) => (ob(n) + cb(n)) / 2,
  rotateX: (n) => nh(Xr(Math.atan2(n[6], n[5]))),
  rotateY: (n) => nh(Xr(Math.atan2(-n[2], n[0]))),
  rotateZ: sb,
  rotate: sb,
  skewX: (n) => Xr(Math.atan(n[4])),
  skewY: (n) => Xr(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function ah(n) {
  return n.includes("scale") ? 1 : 0;
}
function rh(n, a) {
  if (!n || n === "none")
    return ah(a);
  const i = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (i)
    s = B4, o = i;
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = U4, o = m;
  }
  if (!o)
    return ah(a);
  const u = s[a], h = o[1].split(",").map($4);
  return typeof u == "function" ? u(h) : h[u];
}
const V4 = (n, a) => {
  const { transform: i = "none" } = getComputedStyle(n);
  return rh(i, a);
};
function $4(n) {
  return parseFloat(n.trim());
}
const al = [
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
], rl = new Set(al), ub = (n) => n === nl || n === we, H4 = /* @__PURE__ */ new Set(["x", "y", "z"]), q4 = al.filter((n) => !H4.has(n));
function I4(n) {
  const a = [];
  return q4.forEach((i) => {
    const s = n.getValue(i);
    s !== void 0 && (a.push([i, s.get()]), s.set(i.startsWith("scale") ? 1 : 0));
  }), a;
}
const br = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: a = "0", paddingRight: i = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  height: ({ y: n }, { paddingTop: a = "0", paddingBottom: i = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  top: (n, { top: a }) => parseFloat(a),
  left: (n, { left: a }) => parseFloat(a),
  bottom: ({ y: n }, { top: a }) => parseFloat(a) + (n.max - n.min),
  right: ({ x: n }, { left: a }) => parseFloat(a) + (n.max - n.min),
  // Transform
  x: (n, { transform: a }) => rh(a, "x"),
  y: (n, { transform: a }) => rh(a, "y")
};
br.translateX = br.x;
br.translateY = br.y;
const Kr = /* @__PURE__ */ new Set();
let ih = !1, lh = !1, sh = !1;
function T1() {
  if (lh) {
    const n = Array.from(Kr).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), i = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = I4(s);
      o.length && (i.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = i.get(s);
      o && o.forEach(([u, h]) => {
        s.getValue(u)?.set(h);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  lh = !1, ih = !1, Kr.forEach((n) => n.complete(sh)), Kr.clear();
}
function C1() {
  Kr.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (lh = !0);
  });
}
function F4() {
  sh = !0, C1(), T1(), sh = !1;
}
class Xh {
  constructor(a, i, s, o, u, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = s, this.motionValue = o, this.element = u, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Kr.add(this), ih || (ih = !0, Pn.read(C1), Pn.resolveKeyframes(T1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), h = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (s && i) {
        const m = s.readValue(i, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && u === void 0 && o.set(a[0]);
    }
    L4(a);
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
const Y4 = (n) => n.startsWith("--");
function R1(n, a, i) {
  Y4(a) ? n.style.setProperty(a, i) : n.style[a] = i;
}
const G4 = {};
function M1(n, a) {
  const i = /* @__PURE__ */ t1(n);
  return () => G4[a] ?? i();
}
const X4 = /* @__PURE__ */ M1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), _1 = /* @__PURE__ */ M1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), os = ([n, a, i, s]) => `cubic-bezier(${n}, ${a}, ${i}, ${s})`, db = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ os([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ os([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ os([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ os([0.33, 1.53, 0.69, 0.99])
};
function A1(n, a) {
  if (n)
    return typeof n == "function" ? _1() ? E1(n, a) : "ease-out" : h1(n) ? os(n) : Array.isArray(n) ? n.map((i) => A1(i, a) || db.easeOut) : db[n];
}
function P4(n, a, i, { delay: s = 0, duration: o = 300, repeat: u = 0, repeatType: h = "loop", ease: m = "easeOut", times: g } = {}, p = void 0) {
  const b = {
    [a]: i
  };
  g && (b.offset = g);
  const v = A1(m, o);
  Array.isArray(v) && (b.easing = v);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), n.animate(b, S);
}
function D1(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function K4({ type: n, ...a }) {
  return D1(n) && _1() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class z1 extends Gh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: s, keyframes: o, pseudoElement: u, allowFlatten: h = !1, finalKeyframe: m, onComplete: g } = a;
    this.isPseudoElement = !!u, this.allowFlatten = h, this.options = a, Ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = K4(a);
    this.animation = P4(i, s, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Bc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), R1(i, s, b), this.animation.cancel();
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
  attachTimeline({ timeline: a, rangeStart: i, rangeEnd: s, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && X4() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), s && (this.animation.rangeEnd = s), tl) : o(this);
  }
}
const O1 = {
  anticipate: u1,
  backInOut: c1,
  circInOut: d1
};
function Q4(n) {
  return n in O1;
}
function Z4(n) {
  typeof n.ease == "string" && Q4(n.ease) && (n.ease = O1[n.ease]);
}
const Uf = 10;
class J4 extends z1 {
  constructor(a) {
    Z4(a), N1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: s, onComplete: o, element: u, ...h } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const m = new jc({
      ...h,
      autoplay: !1
    }), g = Math.max(Uf, Dn.now() - this.startTime), p = xr(0, Uf, g - Uf), b = m.sample(g).value, { name: v } = this.options;
    u && v && R1(u, v, b), i.setWithVelocity(m.sample(Math.max(0, g - p)).value, b, p), m.stop();
  }
}
const fb = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(ra.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function W4(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let i = 0; i < n.length; i++)
    if (n[i] !== a)
      return !0;
}
function eO(n, a, i, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = n[n.length - 1], h = fb(o, a), m = fb(u, a);
  return Rs(h === m, `You are trying to animate ${a} from "${o}" to "${u}". "${h ? u : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : W4(n) || (i === "spring" || D1(i)) && s;
}
function oh(n) {
  n.duration = 0, n.type = "keyframes";
}
const k1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), tO = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function nO(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && tO.test(n[a]))
      return !0;
  return !1;
}
const aO = /* @__PURE__ */ new Set([
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
]), rO = /* @__PURE__ */ t1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function iO(n) {
  const { motionValue: a, name: i, repeatDelay: s, repeatType: o, damping: u, type: h, keyframes: m } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return rO() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (k1.has(i) || aO.has(i) && nO(m)) && (i !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && o !== "mirror" && u !== 0 && h !== "inertia";
}
const lO = 40;
class sO extends Gh {
  constructor({ autoplay: a = !0, delay: i = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: h = "loop", keyframes: m, name: g, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Dn.now();
    const S = {
      autoplay: a,
      delay: i,
      type: s,
      repeat: o,
      repeatDelay: u,
      repeatType: h,
      name: g,
      motionValue: p,
      element: b,
      ...v
    }, E = b?.KeyframeResolver || Xh;
    this.keyframeResolver = new E(m, (w, T, R) => this.onKeyframesResolved(w, T, S, !R), g, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, s, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: h, velocity: m, delay: g, isHandoff: p, onUpdate: b } = s;
    this.resolvedAt = Dn.now();
    let v = !0;
    eO(a, u, h, m) || (v = !1, (Sr.instantAnimations || !g) && b?.(Bc(a, s, i)), a[0] = a[a.length - 1], oh(s), s.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > lO ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...s,
      keyframes: a
    }, w = v && !p && iO(E), T = E.motionValue?.owner?.current;
    let R;
    if (w)
      try {
        R = new J4({
          ...E,
          element: T
        });
      } catch {
        R = new jc(E);
      }
    else
      R = new jc(E);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(tl), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), F4()), this._animation;
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
function L1(n, a, i, s = 0, o = 1) {
  const u = Array.from(n).sort((p, b) => p.sortNodePosition(b)).indexOf(a), h = n.size, m = (h - 1) * s;
  return typeof i == "function" ? i(u, h) : o === 1 ? u * s : m - u * s;
}
const oO = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function cO(n) {
  const a = oO.exec(n);
  if (!a)
    return [,];
  const [, i, s, o] = a;
  return [`--${i ?? s}`, o];
}
const uO = 4;
function U1(n, a, i = 1) {
  Ji(i <= uO, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = cO(n);
  if (!s)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(s);
  if (u) {
    const h = u.trim();
    return Wx(h) ? parseFloat(h) : h;
  }
  return Hh(o) ? U1(o, a, i + 1) : o;
}
const dO = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, fO = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), hO = {
  type: "keyframes",
  duration: 0.8
}, mO = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, pO = (n, { keyframes: a }) => a.length > 2 ? hO : rl.has(n) ? n.startsWith("scale") ? fO(a[1]) : dO : mO;
function B1(n, a) {
  if (n?.inherit && a) {
    const { inherit: i, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function V1(n, a) {
  const i = n?.[a] ?? n?.default ?? n;
  return i !== n ? B1(i, n) : i;
}
const vO = /* @__PURE__ */ new Set([
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
function gO(n) {
  for (const a in n)
    if (!vO.has(a))
      return !0;
  return !1;
}
const yO = (n, a, i, s = {}, o, u) => (h) => {
  const m = V1(s, n) || {}, g = m.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ Xn(g);
  const b = {
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
    name: n,
    motionValue: a,
    element: u ? void 0 : o
  };
  gO(m) || Object.assign(b, pO(n, b)), b.duration && (b.duration = /* @__PURE__ */ Xn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Xn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (oh(b), b.delay === 0 && (v = !0)), (Sr.instantAnimations || Sr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, oh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !u && a.get() !== void 0) {
    const S = Bc(b.keyframes, m);
    if (S !== void 0) {
      Pn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new jc(b) : new sO(b);
};
function hb(n) {
  const a = [{}, {}];
  return n?.values.forEach((i, s) => {
    a[0][s] = i.get(), a[1][s] = i.getVelocity();
  }), a;
}
function Ph(n, a, i, s) {
  if (typeof a == "function") {
    const [o, u] = hb(s);
    a = a(i !== void 0 ? i : n.custom, o, u);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, u] = hb(s);
    a = a(i !== void 0 ? i : n.custom, o, u);
  }
  return a;
}
function Qr(n, a, i) {
  const s = n.getProps();
  return Ph(s, a, i !== void 0 ? i : s.custom, n);
}
const $1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...al
]), mb = 30, bO = (n) => !isNaN(parseFloat(n));
class xO {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Dn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = bO(this.current));
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
    this.events[a] || (this.events[a] = new a1());
    const s = this.events[a].add(i);
    return a === "change" ? () => {
      s(), Pn.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
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
  setWithVelocity(a, i, s) {
    this.set(i), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - s;
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > mb)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, mb);
    return r1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function Nc(n, a) {
  return new xO(n, a);
}
const ch = (n) => Array.isArray(n);
function SO(n, a, i) {
  n.hasValue(a) ? n.getValue(a).set(i) : n.addValue(a, Nc(i));
}
function wO(n) {
  return ch(n) ? n[n.length - 1] || 0 : n;
}
function EO(n, a) {
  const i = Qr(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...u } = i || {};
  u = { ...u, ...s };
  for (const h in u) {
    const m = wO(u[h]);
    SO(n, h, m);
  }
}
const un = (n) => !!(n && n.getVelocity);
function jO(n) {
  return !!(un(n) && n.add);
}
function NO(n, a) {
  const i = n.getValue("willChange");
  if (jO(i))
    return i.add(a);
  if (!i && Sr.WillChange) {
    const s = new Sr.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Kh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const TO = "framerAppearId", H1 = "data-" + Kh(TO);
function CO(n) {
  return n.props[H1];
}
function RO({ protectedKeys: n, needsAnimating: a }, i) {
  const s = n.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, s;
}
function q1(n, a, { delay: i = 0, transitionOverride: s, type: o } = {}) {
  let { transition: u, transitionEnd: h, ...m } = a;
  const g = n.getDefaultTransition();
  u = u ? B1(u, g) : g;
  const p = u?.reduceMotion;
  s && (u = s);
  const b = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in m) {
    const E = n.getValue(S, n.latestValues[S] ?? null), w = m[S];
    if (w === void 0 || v && RO(v, S))
      continue;
    const T = {
      delay: i,
      ...V1(u || {}, S)
    }, R = E.get();
    if (R !== void 0 && !E.isAnimating() && !Array.isArray(w) && w === R && !T.velocity) {
      Pn.update(() => E.set(w));
      continue;
    }
    let C = !1;
    if (window.MotionHandoffAnimation) {
      const z = CO(n);
      if (z) {
        const K = window.MotionHandoffAnimation(z, S, Pn);
        K !== null && (T.startTime = K, C = !0);
      }
    }
    NO(n, S);
    const k = p ?? n.shouldReduceMotion;
    E.start(yO(S, E, w, k && $1.has(S) ? { type: !1 } : T, n, C));
    const _ = E.animation;
    _ && b.push(_);
  }
  if (h) {
    const S = () => Pn.update(() => {
      h && EO(n, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function uh(n, a, i = {}) {
  const s = Qr(n, a, i.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  i.transitionOverride && (o = i.transitionOverride);
  const u = s ? () => Promise.all(q1(n, s, i)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (g = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return MO(n, a, g, p, b, v, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [g, p] = m === "beforeChildren" ? [u, h] : [h, u];
    return g().then(() => p());
  } else
    return Promise.all([u(), h(i.delay)]);
}
function MO(n, a, i = 0, s = 0, o = 0, u = 1, h) {
  const m = [];
  for (const g of n.variantChildren)
    g.notify("AnimationStart", a), m.push(uh(g, a, {
      ...h,
      delay: i + (typeof s == "function" ? 0 : s) + L1(n.variantChildren, g, s, o, u)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function _O(n, a, i = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((u) => uh(n, u, i));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = uh(n, a, i);
  else {
    const o = typeof a == "function" ? Qr(n, a, i.custom) : a;
    s = Promise.all(q1(n, o, i));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const AO = {
  test: (n) => n === "auto",
  parse: (n) => n
}, I1 = (n) => (a) => a.test(n), F1 = [nl, we, Ki, pr, W5, J5, AO], pb = (n) => F1.find(I1(n));
function DO(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || e1(n) : !0;
}
const zO = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function OO(n) {
  const [a, i] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = i.match(qh) || [];
  if (!s)
    return n;
  const o = i.replace(s, "");
  let u = zO.has(a) ? 1 : 0;
  return s !== i && (u *= 100), a + "(" + u + o + ")";
}
const kO = /\b([a-z-]*)\(.*?\)/gu, dh = {
  ...ra,
  getAnimatableNone: (n) => {
    const a = n.match(kO);
    return a ? a.map(OO).join(" ") : n;
  }
}, fh = {
  ...ra,
  getAnimatableNone: (n) => {
    const a = ra.parse(n);
    return ra.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, vb = {
  ...nl,
  transform: Math.round
}, LO = {
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
  opacity: bs,
  originX: nb,
  originY: nb,
  originZ: we
}, Qh = {
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
  ...LO,
  zIndex: vb,
  // SVG
  fillOpacity: bs,
  strokeOpacity: bs,
  numOctaves: vb
}, UO = {
  ...Qh,
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
  filter: dh,
  WebkitFilter: dh,
  mask: fh,
  WebkitMask: fh
}, Y1 = (n) => UO[n], BO = /* @__PURE__ */ new Set([dh, fh]);
function G1(n, a) {
  let i = Y1(n);
  return BO.has(i) || (i = ra), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const VO = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function $O(n, a, i) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const u = n[s];
    typeof u == "string" && !VO.has(u) && Wi(u).values.length && (o = n[s]), s++;
  }
  if (o && i)
    for (const u of a)
      n[u] = G1(i, o);
}
class HO extends Xh {
  constructor(a, i, s, o, u) {
    super(a, i, s, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: s } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let v = a[b];
      if (typeof v == "string" && (v = v.trim(), Hh(v))) {
        const S = U1(v, i.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !$1.has(s) || a.length !== 2)
      return;
    const [o, u] = a, h = pb(o), m = pb(u), g = tb(o), p = tb(u);
    if (g !== p && br[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (ub(h) && ub(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else br[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || DO(a[o])) && s.push(o);
    s.length && $O(a, s, i);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: i, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = br[s](a.measureViewportBox(), window.getComputedStyle(a.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: i, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const u = s.length - 1, h = s[u];
    s[u] = br[i](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, g]) => {
      a.getValue(m).set(g);
    }), this.resolveNoneKeyframes();
  }
}
function qO(n, a, i) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let s = document;
    const o = i?.[n] ?? s.querySelectorAll(n);
    return o ? Array.from(o) : [];
  }
  return Array.from(n).filter((s) => s != null);
}
const X1 = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function hc(n) {
  return z5(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: IO } = /* @__PURE__ */ m1(queueMicrotask, !1), FO = {
  y: !1
};
function YO() {
  return FO.y;
}
function P1(n, a) {
  const i = qO(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [i, o, () => s.abort()];
}
function GO(n) {
  return !(n.pointerType === "touch" || YO());
}
function XO(n, a, i = {}) {
  const [s, o, u] = P1(n, i);
  return s.forEach((h) => {
    let m = !1, g = !1, p;
    const b = () => {
      h.removeEventListener("pointerleave", w);
    }, v = (R) => {
      p && (p(R), p = void 0), b();
    }, S = (R) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), g && (g = !1, v(R));
    }, E = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, w = (R) => {
      if (R.pointerType !== "touch") {
        if (m) {
          g = !0;
          return;
        }
        v(R);
      }
    }, T = (R) => {
      if (!GO(R))
        return;
      g = !1;
      const C = a(h, R);
      typeof C == "function" && (p = C, h.addEventListener("pointerleave", w, o));
    };
    h.addEventListener("pointerenter", T, o), h.addEventListener("pointerdown", E, o);
  }), u;
}
const K1 = (n, a) => a ? n === a ? !0 : K1(n, a.parentElement) : !1, PO = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, KO = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function QO(n) {
  return KO.has(n.tagName) || n.isContentEditable === !0;
}
const mc = /* @__PURE__ */ new WeakSet();
function gb(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function Bf(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const ZO = (n, a) => {
  const i = n.currentTarget;
  if (!i)
    return;
  const s = gb(() => {
    if (mc.has(i))
      return;
    Bf(i, "down");
    const o = gb(() => {
      Bf(i, "up");
    }), u = () => Bf(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", u, a);
  });
  i.addEventListener("keydown", s, a), i.addEventListener("blur", () => i.removeEventListener("keydown", s), a);
};
function yb(n) {
  return PO(n) && !0;
}
const bb = /* @__PURE__ */ new WeakSet();
function JO(n, a, i = {}) {
  const [s, o, u] = P1(n, i), h = (m) => {
    const g = m.currentTarget;
    if (!yb(m) || bb.has(m))
      return;
    mc.add(g), i.stopPropagation && bb.add(m);
    const p = a(g, m), b = (E, w) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), mc.has(g) && mc.delete(g), yb(E) && typeof p == "function" && p(E, { success: w });
    }, v = (E) => {
      b(E, g === window || g === document || i.useGlobalTarget || K1(g, E.target));
    }, S = (E) => {
      b(E, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), hc(m) && (m.addEventListener("focus", (p) => ZO(p, o)), !QO(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const WO = [...F1, Vt, ra], ek = (n) => WO.find(I1(n)), xb = () => ({ min: 0, max: 0 }), Q1 = () => ({
  x: xb(),
  y: xb()
}), tk = /* @__PURE__ */ new WeakMap();
function Vc(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function xs(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Zh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Jh = ["initial", ...Zh];
function $c(n) {
  return Vc(n.animate) || Jh.some((a) => xs(n[a]));
}
function Z1(n) {
  return !!($c(n) || n.variants);
}
function nk(n, a, i) {
  for (const s in a) {
    const o = a[s], u = i[s];
    if (un(o))
      n.addValue(s, o);
    else if (un(u))
      n.addValue(s, Nc(o, { owner: n }));
    else if (u !== o)
      if (n.hasValue(s)) {
        const h = n.getValue(s);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = n.getStaticValue(s);
        n.addValue(s, Nc(h !== void 0 ? h : o, { owner: n }));
      }
  }
  for (const s in i)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const hh = { current: null }, J1 = { current: !1 }, ak = typeof window < "u";
function rk() {
  if (J1.current = !0, !!ak)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => hh.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      hh.current = !1;
}
const Sb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Tc = {};
function W1(n) {
  Tc = n;
}
function ik() {
  return Tc;
}
class lk {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, i, s) {
    return {};
  }
  constructor({ parent: a, props: i, presenceContext: s, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: h, visualState: m }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Xh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = Dn.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Pn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = i, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = $c(i), this.isVariantNode = Z1(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const E in S) {
      const w = S[E];
      p[E] !== void 0 && un(w) && w.set(p[E]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, tk.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, s) => this.bindToMotionValue(s, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (J1.current || rk(), this.shouldReduceMotion = hh.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && k1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: g, ease: p, duration: b } = i.accelerate, v = new z1({
        element: this.current,
        name: a,
        keyframes: m,
        times: g,
        ease: p,
        duration: /* @__PURE__ */ Xn(b)
      }), S = h(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const s = rl.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Pn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
      const { isEnabled: s, Feature: o } = i;
      if (!this.features[a] && o && s(this.props) && (this.features[a] = new o(this)), this.features[a]) {
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Q1();
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
    for (let s = 0; s < Sb.length; s++) {
      const o = Sb[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, h = a[u];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = nk(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const s = this.values.get(a);
    i !== s && (s && this.removeValue(a), this.bindToMotionValue(a, i), this.values.set(a, i), this.latestValues[a] = i.get());
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
    let s = this.values.get(a);
    return s === void 0 && i !== void 0 && (s = Nc(i === null ? void 0 : i, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Wx(s) || e1(s)) ? s = parseFloat(s) : !ek(s) && ra.test(i) && (s = G1(a, i)), this.setBaseTarget(a, un(s) ? s.get() : s)), un(s) ? s.get() : s;
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
    let s;
    if (typeof i == "string" || typeof i == "object") {
      const u = Ph(this.props, i, this.presenceContext?.custom);
      u && (s = u[a]);
    }
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !un(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new a1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    IO.render(this.render);
  }
}
class eS extends lk {
  constructor() {
    super(...arguments), this.KeyframeResolver = HO;
  }
  sortInstanceNodePosition(a, i) {
    return a.compareDocumentPosition(i) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, i) {
    const s = a.style;
    return s ? s[i] : void 0;
  }
  removeValueFromRenderState(a, { vars: i, style: s }) {
    delete i[a], delete s[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    un(a) && (this.childSubscription = a.on("change", (i) => {
      this.current && (this.current.textContent = `${i}`);
    }));
  }
}
class il {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function sk({ top: n, left: a, right: i, bottom: s }) {
  return {
    x: { min: a, max: i },
    y: { min: n, max: s }
  };
}
function ok(n, a) {
  if (!a)
    return n;
  const i = a({ x: n.left, y: n.top }), s = a({ x: n.right, y: n.bottom });
  return {
    top: i.y,
    left: i.x,
    bottom: s.y,
    right: s.x
  };
}
function ck(n, a) {
  return sk(ok(n.getBoundingClientRect(), a));
}
const uk = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, dk = al.length;
function fk(n, a, i) {
  let s = "", o = !0;
  for (let u = 0; u < dk; u++) {
    const h = al[u], m = n[h];
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
      const p = X1(m, Qh[h]);
      if (!g) {
        o = !1;
        const b = uk[h] || h;
        s += `${b}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return s = s.trim(), i ? s = i(a, o ? "" : s) : o && (s = "none"), s;
}
function Wh(n, a, i) {
  const { style: s, vars: o, transformOrigin: u } = n;
  let h = !1, m = !1;
  for (const g in a) {
    const p = a[g];
    if (rl.has(g)) {
      h = !0;
      continue;
    } else if (v1(g)) {
      o[g] = p;
      continue;
    } else {
      const b = X1(p, Qh[g]);
      g.startsWith("origin") ? (m = !0, u[g] = b) : s[g] = b;
    }
  }
  if (a.transform || (h || i ? s.transform = fk(a, n.transform, i) : s.transform && (s.transform = "none")), m) {
    const { originX: g = "50%", originY: p = "50%", originZ: b = 0 } = u;
    s.transformOrigin = `${g} ${p} ${b}`;
  }
}
function tS(n, { style: a, vars: i }, s, o) {
  const u = n.style;
  let h;
  for (h in a)
    u[h] = a[h];
  o?.applyProjectionStyles(u, s);
  for (h in i)
    u.setProperty(h, i[h]);
}
function wb(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const rs = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (we.test(n))
        n = parseFloat(n);
      else
        return n;
    const i = wb(n, a.target.x), s = wb(n, a.target.y);
    return `${i}% ${s}%`;
  }
}, hk = {
  correct: (n, { treeScale: a, projectionDelta: i }) => {
    const s = n, o = ra.parse(n);
    if (o.length > 5)
      return s;
    const u = ra.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, g = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= g;
    const p = As(m, g, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), u(o);
  }
}, mk = {
  borderRadius: {
    ...rs,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: rs,
  borderTopRightRadius: rs,
  borderBottomLeftRadius: rs,
  borderBottomRightRadius: rs,
  boxShadow: hk
};
function nS(n, { layout: a, layoutId: i }) {
  return rl.has(n) || n.startsWith("origin") || (a || i !== void 0) && (!!mk[n] || n === "opacity");
}
function em(n, a, i) {
  const s = n.style, o = a?.style, u = {};
  if (!s)
    return u;
  for (const h in s)
    (un(s[h]) || o && un(o[h]) || nS(h, n) || i?.getValue(h)?.liveStyle !== void 0) && (u[h] = s[h]);
  return u;
}
function pk(n) {
  return window.getComputedStyle(n);
}
class vk extends eS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = tS;
  }
  readValueFromInstance(a, i) {
    if (rl.has(i))
      return this.projection?.isProjecting ? ah(i) : V4(a, i);
    {
      const s = pk(a), o = (v1(i) ? s.getPropertyValue(i) : s[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return ck(a, i);
  }
  build(a, i, s) {
    Wh(a, i, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return em(a, i, s);
  }
}
const gk = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, yk = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function bk(n, a, i = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const u = o ? gk : yk;
  n[u.offset] = `${-s}`, n[u.array] = `${a} ${i}`;
}
const xk = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function aS(n, {
  attrX: a,
  attrY: i,
  attrScale: s,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, g, p, b) {
  if (Wh(n, m, p), g) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const E of xk)
    v[E] !== void 0 && (S[E] = v[E], delete v[E]);
  a !== void 0 && (v.x = a), i !== void 0 && (v.y = i), s !== void 0 && (v.scale = s), o !== void 0 && bk(v, o, u, h, !1);
}
const rS = /* @__PURE__ */ new Set([
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
]), iS = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function Sk(n, a, i, s) {
  tS(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(rS.has(o) ? o : Kh(o), a.attrs[o]);
}
function lS(n, a, i) {
  const s = em(n, a, i);
  for (const o in n)
    if (un(n[o]) || un(a[o])) {
      const u = al.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[u] = n[o];
    }
  return s;
}
class wk extends eS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Q1;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (rl.has(i)) {
      const s = Y1(i);
      return s && s.default || 0;
    }
    return i = rS.has(i) ? i : Kh(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return lS(a, i, s);
  }
  build(a, i, s) {
    aS(a, i, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, i, s, o) {
    Sk(a, i, s, o);
  }
  mount(a) {
    this.isSVGTag = iS(a.tagName), super.mount(a);
  }
}
const Ek = Jh.length;
function sS(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const i = n.parent ? sS(n.parent) || {} : {};
    return n.props.initial !== void 0 && (i.initial = n.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < Ek; i++) {
    const s = Jh[i], o = n.props[s];
    (xs(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function oS(n, a) {
  if (!Array.isArray(a))
    return !1;
  const i = a.length;
  if (i !== n.length)
    return !1;
  for (let s = 0; s < i; s++)
    if (a[s] !== n[s])
      return !1;
  return !0;
}
const jk = [...Zh].reverse(), Nk = Zh.length;
function Tk(n) {
  return (a) => Promise.all(a.map(({ animation: i, options: s }) => _O(n, i, s)));
}
function Ck(n) {
  let a = Tk(n), i = Eb(), s = !0, o = !1;
  const u = (p) => (b, v) => {
    const S = Qr(n, v, p === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: E, transitionEnd: w, ...T } = S;
      b = { ...b, ...T, ...w };
    }
    return b;
  };
  function h(p) {
    a = p(n);
  }
  function m(p) {
    const { props: b } = n, v = sS(n.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let w = {}, T = 1 / 0;
    for (let C = 0; C < Nk; C++) {
      const k = jk[C], _ = i[k], z = b[k] !== void 0 ? b[k] : v[k], K = xs(z), ee = k === p ? _.isActive : null;
      ee === !1 && (T = C);
      let te = z === v[k] && z !== b[k] && K;
      if (te && (s || o) && n.manuallyAnimateOnMount && (te = !1), _.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && ee === null || // If we didn't and don't have any defined prop for this animation type
      !z && !_.prevProp || // Or if the prop doesn't define an animation
      Vc(z) || typeof z == "boolean")
        continue;
      if (k === "exit" && _.isActive && ee !== !0) {
        _.prevResolvedValues && (w = {
          ...w,
          ..._.prevResolvedValues
        });
        continue;
      }
      const D = Rk(_.prevProp, z);
      let H = D || // If we're making this variant active, we want to always make it active
      k === p && _.isActive && !te && K || // If we removed a higher-priority variant (i is in reverse order)
      C > T && K, q = !1;
      const le = Array.isArray(z) ? z : [z];
      let re = le.reduce(u(k), {});
      ee === !1 && (re = {});
      const { prevResolvedValues: J = {} } = _, ce = {
        ...J,
        ...re
      }, W = (U) => {
        H = !0, E.has(U) && (q = !0, E.delete(U)), _.needsAnimating[U] = !0;
        const I = n.getValue(U);
        I && (I.liveStyle = !1);
      };
      for (const U in ce) {
        const I = re[U], ne = J[U];
        if (w.hasOwnProperty(U))
          continue;
        let M = !1;
        ch(I) && ch(ne) ? M = !oS(I, ne) : M = I !== ne, M ? I != null ? W(U) : E.add(U) : I !== void 0 && E.has(U) ? W(U) : _.protectedKeys[U] = !0;
      }
      _.prevProp = z, _.prevResolvedValues = re, _.isActive && (w = { ...w, ...re }), (s || o) && n.blockInitialAnimation && (H = !1);
      const A = te && D;
      H && (!A || q) && S.push(...le.map((U) => {
        const I = { type: k };
        if (typeof U == "string" && (s || o) && !A && n.manuallyAnimateOnMount && n.parent) {
          const { parent: ne } = n, M = Qr(ne, U);
          if (ne.enteringChildren && M) {
            const { delayChildren: P } = M.transition || {};
            I.delay = L1(ne.enteringChildren, n, P);
          }
        }
        return {
          animation: U,
          options: I
        };
      }));
    }
    if (E.size) {
      const C = {};
      if (typeof b.initial != "boolean") {
        const k = Qr(n, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        k && k.transition && (C.transition = k.transition);
      }
      E.forEach((k) => {
        const _ = n.getBaseTarget(k), z = n.getValue(k);
        z && (z.liveStyle = !0), C[k] = _ ?? null;
      }), S.push({ animation: C });
    }
    let R = !!S.length;
    return s && (b.initial === !1 || b.initial === b.animate) && !n.manuallyAnimateOnMount && (R = !1), s = !1, o = !1, R ? a(S) : Promise.resolve();
  }
  function g(p, b) {
    if (i[p].isActive === b)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(p, b)), i[p].isActive = b;
    const v = m(p);
    for (const S in i)
      i[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: g,
    setAnimateFunction: h,
    getState: () => i,
    reset: () => {
      i = Eb(), o = !0;
    }
  };
}
function Rk(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !oS(a, n) : !1;
}
function Ir(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Eb() {
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
function jb(n, a, i, s = { passive: !0 }) {
  return n.addEventListener(a, i, s), () => n.removeEventListener(a, i);
}
function Mk(n) {
  return un(n) ? n.get() : n;
}
const tm = y.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function Nb(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function _k(...n) {
  return (a) => {
    let i = !1;
    const s = n.map((o) => {
      const u = Nb(o, a);
      return !i && typeof u == "function" && (i = !0), u;
    });
    if (i)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const u = s[o];
          typeof u == "function" ? u() : Nb(n[o], null);
        }
      };
  };
}
function Ak(...n) {
  return y.useCallback(_k(...n), n);
}
class Dk extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (hc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = i.offsetParent, o = hc(s) && s.offsetWidth || 0, u = hc(s) && s.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
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
function zk({ children: n, isPresent: a, anchorX: i, anchorY: s, root: o, pop: u }) {
  const h = y.useId(), m = y.useRef(null), g = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(tm), b = n.props?.ref ?? n?.ref, v = Ak(m, b);
  return y.useInsertionEffect(() => {
    const { width: S, height: E, top: w, left: T, right: R, bottom: C } = g.current;
    if (a || u === !1 || !m.current || !S || !E)
      return;
    const k = i === "left" ? `left: ${T}` : `right: ${R}`, _ = s === "bottom" ? `bottom: ${C}` : `top: ${w}`;
    m.current.dataset.motionPopId = h;
    const z = document.createElement("style");
    p && (z.nonce = p);
    const K = o ?? document.head;
    return K.appendChild(z), z.sheet && z.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${k}px !important;
            ${_}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), K.contains(z) && K.removeChild(z);
    };
  }, [a]), d.jsx(Dk, { isPresent: a, childRef: m, sizeRef: g, pop: u, children: u === !1 ? n : y.cloneElement(n, { ref: v }) });
}
const Ok = ({ children: n, initial: a, isPresent: i, onExitComplete: s, custom: o, presenceAffectsLayout: u, mode: h, anchorX: m, anchorY: g, root: p }) => {
  const b = Bh(kk), v = y.useId();
  let S = !0, E = y.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (w) => {
      b.set(w, !0);
      for (const T of b.values())
        if (!T)
          return;
      s && s();
    },
    register: (w) => (b.set(w, !1), () => b.delete(w))
  }), [i, b, s]);
  return u && S && (E = { ...E }), y.useMemo(() => {
    b.forEach((w, T) => b.set(T, !1));
  }, [i]), y.useEffect(() => {
    !i && !b.size && s && s();
  }, [i]), n = d.jsx(zk, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: g, root: p, children: n }), d.jsx(Lc.Provider, { value: E, children: n });
};
function kk() {
  return /* @__PURE__ */ new Map();
}
function Lk(n = !0) {
  const a = y.useContext(Lc);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: s, register: o } = a, u = y.useId();
  y.useEffect(() => {
    if (n)
      return o(u);
  }, [n]);
  const h = y.useCallback(() => n && s && s(u), [u, s, n]);
  return !i && s ? [!1, h] : [!0];
}
const ac = (n) => n.key || "";
function Tb(n) {
  const a = [];
  return y.Children.forEach(n, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const Uk = ({ children: n, custom: a, initial: i = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: h = !1, anchorX: m = "left", anchorY: g = "top", root: p }) => {
  const [b, v] = Lk(h), S = y.useMemo(() => Tb(n), [n]), E = h && !b ? [] : S.map(ac), w = y.useRef(!0), T = y.useRef(S), R = Bh(() => /* @__PURE__ */ new Map()), C = y.useRef(/* @__PURE__ */ new Set()), [k, _] = y.useState(S), [z, K] = y.useState(S);
  Jx(() => {
    w.current = !1, T.current = S;
    for (let D = 0; D < z.length; D++) {
      const H = ac(z[D]);
      E.includes(H) ? (R.delete(H), C.current.delete(H)) : R.get(H) !== !0 && R.set(H, !1);
    }
  }, [z, E.length, E.join("-")]);
  const ee = [];
  if (S !== k) {
    let D = [...S];
    for (let H = 0; H < z.length; H++) {
      const q = z[H], le = ac(q);
      E.includes(le) || (D.splice(H, 0, q), ee.push(q));
    }
    return u === "wait" && ee.length && (D = ee), K(Tb(D)), _(S), null;
  }
  const { forceRender: te } = y.useContext(Zx);
  return d.jsx(d.Fragment, { children: z.map((D) => {
    const H = ac(D), q = h && !b ? !1 : S === z || E.includes(H), le = () => {
      if (C.current.has(H))
        return;
      if (R.has(H))
        C.current.add(H), R.set(H, !0);
      else
        return;
      let re = !0;
      R.forEach((J) => {
        J || (re = !1);
      }), re && (te?.(), K(T.current), h && v?.(), s && s());
    };
    return d.jsx(Ok, { isPresent: q, initial: !w.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: q ? void 0 : le, anchorX: m, anchorY: g, children: D }, H);
  }) });
}, nm = y.createContext({ strict: !1 }), Cb = {
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
let Rb = !1;
function Bk() {
  if (Rb)
    return;
  const n = {};
  for (const a in Cb)
    n[a] = {
      isEnabled: (i) => Cb[a].some((s) => !!i[s])
    };
  W1(n), Rb = !0;
}
function cS() {
  return Bk(), ik();
}
function mh(n) {
  const a = cS();
  for (const i in n)
    a[i] = {
      ...a[i],
      ...n[i]
    };
  W1(a);
}
function uS({ children: n, features: a, strict: i = !1 }) {
  const [, s] = y.useState(!Vf(a)), o = y.useRef(void 0);
  if (!Vf(a)) {
    const { renderer: u, ...h } = a;
    o.current = u, mh(h);
  }
  return y.useEffect(() => {
    Vf(a) && a().then(({ renderer: u, ...h }) => {
      mh(h), o.current = u, s(!0);
    });
  }, []), d.jsx(nm.Provider, { value: { renderer: o.current, strict: i }, children: n });
}
function Vf(n) {
  return typeof n == "function";
}
const Vk = /* @__PURE__ */ new Set([
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
function Cc(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || Vk.has(n);
}
let dS = (n) => !Cc(n);
function $k(n) {
  typeof n == "function" && (dS = (a) => a.startsWith("on") ? !Cc(a) : n(a));
}
try {
  $k(require("@emotion/is-prop-valid").default);
} catch {
}
function Hk(n, a, i) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || un(n[o]) || (dS(o) || i === !0 && Cc(o) || !a && !Cc(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Hc = /* @__PURE__ */ y.createContext({});
function qk(n, a) {
  if ($c(n)) {
    const { initial: i, animate: s } = n;
    return {
      initial: i === !1 || xs(i) ? i : void 0,
      animate: xs(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function Ik(n) {
  const { initial: a, animate: i } = qk(n, y.useContext(Hc));
  return y.useMemo(() => ({ initial: a, animate: i }), [Mb(a), Mb(i)]);
}
function Mb(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const am = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function fS(n, a, i) {
  for (const s in a)
    !un(a[s]) && !nS(s, i) && (n[s] = a[s]);
}
function Fk({ transformTemplate: n }, a) {
  return y.useMemo(() => {
    const i = am();
    return Wh(i, a, n), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function Yk(n, a) {
  const i = n.style || {}, s = {};
  return fS(s, i, n), Object.assign(s, Fk(n, a)), s;
}
function Gk(n, a) {
  const i = {}, s = Yk(n, a);
  return n.drag && n.dragListener !== !1 && (i.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (i.tabIndex = 0), i.style = s, i;
}
const hS = () => ({
  ...am(),
  attrs: {}
});
function Xk(n, a, i, s) {
  const o = y.useMemo(() => {
    const u = hS();
    return aS(u, a, iS(s), n.transformTemplate, n.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (n.style) {
    const u = {};
    fS(u, n.style, n), o.style = { ...u, ...o.style };
  }
  return o;
}
const Pk = [
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
function rm(n) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof n != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    n.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(Pk.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function Kk(n, a, i, { latestValues: s }, o, u = !1, h) {
  const g = (h ?? rm(n) ? Xk : Gk)(a, s, o, n), p = Hk(a, typeof n == "string", u), b = n !== y.Fragment ? { ...p, ...g, ref: i } : {}, { children: v } = a, S = y.useMemo(() => un(v) ? v.get() : v, [v]);
  return y.createElement(n, {
    ...b,
    children: S
  });
}
function Qk({ scrapeMotionValuesFromProps: n, createRenderState: a }, i, s, o) {
  return {
    latestValues: Zk(i, s, o, n),
    renderState: a()
  };
}
function Zk(n, a, i, s) {
  const o = {}, u = s(n, {});
  for (const S in u)
    o[S] = Mk(u[S]);
  let { initial: h, animate: m } = n;
  const g = $c(n), p = Z1(n);
  a && p && !g && n.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let b = i ? i.initial === !1 : !1;
  b = b || h === !1;
  const v = b ? m : h;
  if (v && typeof v != "boolean" && !Vc(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let E = 0; E < S.length; E++) {
      const w = Ph(n, S[E]);
      if (w) {
        const { transitionEnd: T, transition: R, ...C } = w;
        for (const k in C) {
          let _ = C[k];
          if (Array.isArray(_)) {
            const z = b ? _.length - 1 : 0;
            _ = _[z];
          }
          _ !== null && (o[k] = _);
        }
        for (const k in T)
          o[k] = T[k];
      }
    }
  }
  return o;
}
const mS = (n) => (a, i) => {
  const s = y.useContext(Hc), o = y.useContext(Lc), u = () => Qk(n, a, s, o);
  return i ? u() : Bh(u);
}, Jk = /* @__PURE__ */ mS({
  scrapeMotionValuesFromProps: em,
  createRenderState: am
}), Wk = /* @__PURE__ */ mS({
  scrapeMotionValuesFromProps: lS,
  createRenderState: hS
}), eL = Symbol.for("motionComponentSymbol");
function tL(n, a, i) {
  const s = y.useRef(i);
  y.useInsertionEffect(() => {
    s.current = i;
  });
  const o = y.useRef(null);
  return y.useCallback((u) => {
    u && n.onMount?.(u);
    const h = s.current;
    if (typeof h == "function")
      if (u) {
        const m = h(u);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : h(u);
    else h && (h.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const nL = y.createContext({});
function aL(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function rL(n, a, i, s, o, u) {
  const { visualElement: h } = y.useContext(Hc), m = y.useContext(nm), g = y.useContext(Lc), p = y.useContext(tm), b = p.reducedMotion, v = p.skipAnimations, S = y.useRef(null), E = y.useRef(!1);
  s = s || m.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const w = S.current, T = y.useContext(nL);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && iL(S.current, i, o, T);
  const R = y.useRef(!1);
  y.useInsertionEffect(() => {
    w && R.current && w.update(i, g);
  });
  const C = i[H1], k = y.useRef(!!C && typeof window < "u" && !window.MotionHandoffIsComplete?.(C) && window.MotionHasOptimisedAnimation?.(C));
  return Jx(() => {
    E.current = !0, w && (R.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), k.current && w.animationState && w.animationState.animateChanges());
  }), y.useEffect(() => {
    w && (!k.current && w.animationState && w.animationState.animateChanges(), k.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(C);
    }), k.current = !1), w.enteringChildren = void 0);
  }), w;
}
function iL(n, a, i, s) {
  const { layoutId: o, layout: u, drag: h, dragConstraints: m, layoutScroll: g, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  n.projection = new i(n.latestValues, a["data-framer-portal-id"] ? void 0 : pS(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!h || m && aL(m),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: s,
    crossfade: v,
    layoutScroll: g,
    layoutRoot: p,
    layoutAnchor: b
  });
}
function pS(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : pS(n.parent);
}
function $f(n, { forwardMotionProps: a = !1, type: i } = {}, s, o) {
  s && mh(s);
  const u = i ? i === "svg" : rm(n), h = u ? Wk : Jk;
  function m(p, b) {
    let v;
    const S = {
      ...y.useContext(tm),
      ...p,
      layoutId: lL(p)
    }, { isStatic: E } = S, w = Ik(p), T = h(p, E);
    if (!E && typeof window < "u") {
      sL();
      const R = oL(S);
      v = R.MeasureLayout, w.visualElement = rL(n, T, S, o, R.ProjectionNode, u);
    }
    return d.jsxs(Hc.Provider, { value: w, children: [v && w.visualElement ? d.jsx(v, { visualElement: w.visualElement, ...S }) : null, Kk(n, p, tL(T, w.visualElement, b), T, E, a, u)] });
  }
  m.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const g = y.forwardRef(m);
  return g[eL] = n, g;
}
function lL({ layoutId: n }) {
  const a = y.useContext(Zx).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function sL(n, a) {
  y.useContext(nm).strict;
}
function oL(n) {
  const a = cS(), { drag: i, layout: s } = a;
  if (!i && !s)
    return {};
  const o = { ...i, ...s };
  return {
    MeasureLayout: i?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function cL(n, a) {
  if (typeof Proxy > "u")
    return $f;
  const i = /* @__PURE__ */ new Map(), s = (u, h) => $f(u, h, n, a), o = (u, h) => s(u, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, h) => h === "create" ? s : (i.has(h) || i.set(h, $f(h, void 0, n, a)), i.get(h))
  });
}
const vS = /* @__PURE__ */ cL(), uL = (n, a) => a.isSVG ?? rm(n) ? new wk(a) : new vk(a, {
  allowProjection: n !== y.Fragment
});
class dL extends il {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Ck(a));
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
let fL = 0;
class hL extends il {
  constructor() {
    super(...arguments), this.id = fL++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: h } = this.node.getProps();
        if (typeof u == "string") {
          const m = Qr(this.node, u, h);
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
const mL = {
  animation: {
    Feature: dL
  },
  exit: {
    Feature: hL
  }
};
function gS(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function _b(n, a, i) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, u = s[o];
  u && Pn.postRender(() => u(a, gS(a)));
}
class pL extends il {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = XO(a, (i, s) => (_b(this.node, s, "Start"), (o) => _b(this.node, o, "End"))));
  }
  unmount() {
  }
}
class vL extends il {
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
    this.unmount = Uc(jb(this.node.current, "focus", () => this.onFocus()), jb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Ab(n, a, i) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), u = s[o];
  u && Pn.postRender(() => u(a, gS(a)));
}
class gL extends il {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: s } = this.node.props;
    this.unmount = JO(a, (o, u) => (Ab(this.node, u, "Start"), (h, { success: m }) => Ab(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const ph = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), yL = (n) => {
  const a = ph.get(n.target);
  a && a(n);
}, bL = (n) => {
  n.forEach(yL);
};
function xL({ root: n, ...a }) {
  const i = n || document;
  Hf.has(i) || Hf.set(i, {});
  const s = Hf.get(i), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(bL, { root: n, ...a })), s[o];
}
function SL(n, a, i) {
  const s = xL(a);
  return ph.set(n, i), s.observe(n), () => {
    ph.delete(n), s.unobserve(n);
  };
}
const wL = {
  some: 0,
  all: 1
};
class EL extends il {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: s, amount: o = "some", once: u } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : wL[o]
    }, m = (g) => {
      const { isIntersecting: p } = g;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = p ? b : v;
      S && S(g);
    };
    this.stopObserver = SL(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(jL(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function jL({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (i) => n[i] !== a[i];
}
const NL = {
  inView: {
    Feature: EL
  },
  tap: {
    Feature: gL
  },
  focus: {
    Feature: vL
  },
  hover: {
    Feature: pL
  }
}, yS = {
  renderer: uL,
  ...mL,
  ...NL
};
var TL = "_1oor31e0", CL = "_1oor31e1", RL = "_1oor31e2", ML = "_1oor31e3", _L = "_1oor31e4", AL = "_1oor31e5", DL = "_1oor31e6", zL = "_1oor31e7", OL = "_1oor31e8";
const kL = 8;
function LL(n) {
  const { entries: a, loading: i, error: s } = n;
  return /* @__PURE__ */ d.jsxs("div", { className: TL, "aria-busy": !!i, children: [
    s && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: s }),
    i && !s && /* @__PURE__ */ d.jsx("div", { className: OL, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !s && a.length === 0 && /* @__PURE__ */ d.jsx("div", { className: zL, children: "No edits yet" }),
    !i && !s && a.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: CL, children: a.map((o) => /* @__PURE__ */ d.jsxs("li", { className: RL, children: [
      /* @__PURE__ */ d.jsx("span", { className: ML, children: BL(o.recorded_at) }),
      /* @__PURE__ */ d.jsx("span", { className: _L, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ d.jsx("span", { className: AL, title: o.digest_after, children: UL(o.digest_after) }),
      /* @__PURE__ */ d.jsx("span", { className: DL, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function UL(n) {
  return n ? `${n.slice(0, kL)}…` : "—";
}
function BL(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var Db = "_1c63kaw0", VL = "_1c63kaw1", $L = "_1c63kaw2", HL = "_1c63kaw3", qL = "_1c63kaw4", IL = "_1c63kaw5", FL = "_1c63kaw6", YL = "_1c63kaw7";
function GL({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: Db, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ d.jsx("span", { className: VL, children: "No edits yet" }) }) : /* @__PURE__ */ d.jsx("ol", { className: Db, "data-testid": "edit-chain-list", children: n.ops.map((i, s) => /* @__PURE__ */ d.jsxs("li", { className: $L, children: [
    /* @__PURE__ */ d.jsxs("span", { className: HL, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: qL, children: [
      /* @__PURE__ */ d.jsx("span", { className: IL, children: zb(i) }),
      /* @__PURE__ */ d.jsx("span", { className: FL, children: XL(i) })
    ] }),
    /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: YL,
        onClick: () => a(i.id),
        "aria-label": `Remove ${zb(i)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function zb(n) {
  switch (n.mode) {
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
function XL(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Ob(n.start_ms)} → ${Ob(n.end_ms)}`;
    case "normalize":
      return `${n.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `${n.factor.toFixed(2)}×`;
    case "fade_in":
      return `${n.duration_ms} ms in`;
    case "fade_out":
      return `${n.duration_ms} ms out`;
    case "gain":
      return `${n.gain_db >= 0 ? "+" : ""}${n.gain_db.toFixed(1)} dB`;
    case "eq3":
      return `${qf(n.low_db)} / ${qf(n.mid_db)} / ${qf(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function qf(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function Ob(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var rc = "_1o3ytop0", PL = "_1o3ytop1", KL = "_1o3ytop2", QL = "_1o3ytop3", ZL = "_1o3ytop4", ic = "_1o3ytop5", JL = "_1o3ytop6", WL = "_1o3ytopc", e6 = "_1o3ytopd", t6 = "_1o3ytope", n6 = "_1o3ytopf", a6 = "_1o3ytopg", r6 = "_1o3ytoph";
const kb = -16;
function i6(n) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: u
  } = n, h = a.durationMs ?? 0, m = y.useMemo(
    () => l6(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, p] = y.useState(() => If(h)), [b, v] = y.useState(kc), [S, E] = y.useState(!1), [w, T] = y.useState(null), [R, C] = y.useState(null), [k, _] = y.useState(!1), [z, K] = y.useState(!1), [ee, te] = y.useState(!1), [D, H] = y.useState(null), [q, le] = y.useState([]), [re, J] = y.useState(null), [ce, W] = y.useState([]), [A, N] = y.useState(!1), [U, I] = y.useState(null), [ne, M] = y.useState(0), P = y.useRef(null), Q = y.useRef(null), oe = y.useRef(null), he = y.useRef(null), ge = y.useRef(null), Ae = y.useRef(0), Me = y.useMemo(
    () => g.ops.some((ye) => ye.mode === "normalize"),
    [g.ops]
  );
  y.useEffect(() => {
    const ye = If(h);
    p(ye), v(Vx(ye)), T(null), te(!1), le([]), J(null), ge.current = null;
  }, [a.voiceAssetId, h]);
  const Ve = y.useCallback((ye) => {
    v(ye), p((ze) => Bx(ze, ye));
  }, []);
  y.useEffect(() => {
    he.current?.abort();
    const ye = new AbortController();
    return he.current = ye, N(!0), I(null), uc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((ze) => {
      ye.signal.aborted || W(ze.entries);
    }).catch((ze) => {
      if (ye.signal.aborted) return;
      const Ke = ze instanceof Error ? ze.message : "audit fetch failed";
      I(Ke);
    }).finally(() => {
      ye.signal.aborted || N(!1);
    }), () => ye.abort();
  }, [i, a.voiceAssetId, ne]), y.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), y.useEffect(() => () => {
    Q.current?.abort(), oe.current?.abort(), he.current?.abort();
  }, []);
  const Jt = g.ops.find((ye) => ye.mode === "trim"), Pt = g.ops.find((ye) => ye.mode === "normalize"), At = Jt?.start_ms ?? 0, We = Jt?.end_ms ?? Math.max(1, h), pt = y.useCallback((ye, ze) => {
    p(
      (Ke) => Lb(
        Ke,
        "trim",
        (tt) => ({
          ...tt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ye)),
          end_ms: Math.max(Math.floor(ye) + 1, Math.floor(ze))
        })
      )
    );
  }, []), fe = y.useCallback(
    (ye) => pt(ye, We),
    [We, pt]
  ), ke = y.useCallback(
    (ye) => pt(At, ye),
    [At, pt]
  ), De = y.useCallback((ye) => {
    p((ze) => {
      const Ke = ze.ops.filter((tt) => tt.mode !== "normalize");
      if (ye) {
        const tt = {
          id: Sn(),
          mode: "normalize",
          target_lufs: kb
        };
        return { ...ze, ops: [...Ke, tt] };
      }
      return { ...ze, ops: Ke };
    });
  }, []), Te = y.useCallback(
    (ye) => {
      const ze = g.ops.findIndex((It) => It.id === ye);
      if (ze === -1) return;
      const Ke = g.ops[ze];
      if (!Ke) return;
      const tt = [...g.ops.slice(0, ze), ...g.ops.slice(ze + 1)];
      p({ ...g, ops: tt }), le((It) => [...It, { op: Ke, index: ze }]);
    },
    [g]
  ), bt = y.useCallback(() => {
    const ye = q[q.length - 1];
    if (!ye) return;
    const ze = Math.min(ye.index, g.ops.length), Ke = [...g.ops.slice(0, ze), ye.op, ...g.ops.slice(ze)];
    p({ ...g, ops: Ke }), le(q.slice(0, -1));
  }, [g, q]), xt = y.useCallback(() => {
    const ye = Tx(g, h);
    return ye ? (T(ye.message), !1) : (T(null), !0);
  }, [g, h]), dn = y.useCallback(async () => {
    if (!xt() || k) return;
    Q.current?.abort();
    const ye = new AbortController();
    Q.current = ye;
    const ze = ++Ae.current;
    K(!0);
    try {
      const Ke = await gC(a.voiceAssetId, i, g, {
        signal: ye.signal
      });
      if (ye.signal.aborted || ze !== Ae.current) return;
      R && URL.revokeObjectURL(R);
      const tt = URL.createObjectURL(Ke);
      C(tt), te(!0), requestAnimationFrame(() => P.current?.play().catch(() => {
      }));
    } catch (Ke) {
      if (ye.signal.aborted) return;
      const tt = Ke instanceof Error ? Ke.message : "preview failed";
      T(tt), u(tt);
    } finally {
      ye.signal.aborted || K(!1);
    }
  }, [xt, k, a.voiceAssetId, i, g, R, u]), Ht = y.useCallback(async () => {
    if (!xt() || z || k) return;
    if (s.length > 1) {
      const ze = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    Q.current?.abort(), oe.current?.abort();
    const ye = new AbortController();
    oe.current = ye, _(!0);
    try {
      const ze = ge.current ?? void 0, Ke = await Nx(
        a.voiceAssetId,
        i,
        ze ? { chain: g, digest_before: ze } : { chain: g },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ge.current = Ke.chain_digest, J(Ke.chain_digest), T(null), H(Ke.measured_lufs ?? null), le([]), o(Ke), M((tt) => tt + 1);
    } catch (ze) {
      if (ye.signal.aborted) return;
      const Ke = ze instanceof Qi;
      ze instanceof Qi && (ge.current = ze.currentDigest || null);
      const tt = Ke ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      T(tt), u(tt);
    } finally {
      ye.signal.aborted || _(!1);
    }
  }, [
    xt,
    z,
    k,
    s,
    a.voiceAssetId,
    i,
    g,
    o,
    u
  ]), On = y.useCallback(() => {
    Q.current?.abort(), p(If(h)), T(null), H(null), te(!1), le([]), M((ye) => ye + 1), R && (URL.revokeObjectURL(R), C(null));
  }, [h, R]), qt = y.useCallback((ye) => {
    p(
      (ze) => Lb(
        ze,
        "normalize",
        (Ke) => ({
          ...Ke,
          mode: "normalize",
          target_lufs: ye
        })
      )
    );
  }, []);
  return /* @__PURE__ */ d.jsxs(Px, { variant: "standalone", children: [
    /* @__PURE__ */ d.jsx(
      Kx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${lc(h)}`
      }
    ),
    /* @__PURE__ */ d.jsx(
      Gx,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: At,
        endMs: We,
        onChangeStart: fe,
        onChangeEnd: ke
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: rc, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: PL, children: [
        lc(At),
        " → ",
        lc(We),
        " · ",
        lc(We - At)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: ZL, children: [
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Normalize loudness" }),
          Me && Pt && /* @__PURE__ */ d.jsxs("span", { className: WL, children: [
            "target ",
            Pt.target_lufs.toFixed(1),
            " LUFS",
            D !== null && ` · measured ${D.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: JL, children: [
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
            kb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Me && Pt && /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            className: t6,
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
          g.ops.length
        ] }),
        /* @__PURE__ */ d.jsx(GL, { chain: g, onRemoveOp: Te })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: KL,
            onClick: () => E((ye) => !ye),
            "aria-expanded": S,
            children: [
              S ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        S && /* @__PURE__ */ d.jsx(
          Uh,
          {
            state: b,
            onChange: Ve,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      re && /* @__PURE__ */ d.jsx("div", { className: ic, children: /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
        /* @__PURE__ */ d.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ d.jsxs("span", { className: QL, title: re, children: [
          re.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ d.jsxs(Qx, { children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "secondary",
          onClick: () => void dn(),
          disabled: z || k,
          children: z ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          onClick: () => void Ht(),
          disabled: k || z,
          children: k ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "ghost",
          onClick: On,
          disabled: k || z,
          children: "Reset"
        }
      ),
      q.length > 0 && /* @__PURE__ */ d.jsxs(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: bt,
          disabled: k || z,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            q.length,
            ")"
          ]
        }
      ),
      ee && /* @__PURE__ */ d.jsx(
        "span",
        {
          className: r6,
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
        ref: P,
        src: R,
        controls: !0,
        className: e6,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: w }),
    /* @__PURE__ */ d.jsxs("details", { className: n6, children: [
      /* @__PURE__ */ d.jsxs("summary", { className: a6, children: [
        "Edit history",
        ce.length > 0 ? ` · ${ce.length}` : ""
      ] }),
      /* @__PURE__ */ d.jsx(
        LL,
        {
          entries: ce,
          loading: A,
          error: U
        }
      )
    ] })
  ] });
}
function If(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function Lb(n, a, i) {
  const s = n.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: Sn(), mode: a };
    return { ...n, ops: [...n.ops, i(u)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function lc(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function l6(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var s6 = "go9vi12", o6 = "go9vi13", c6 = "go9vi14", u6 = "go9vi15", d6 = "go9vi16", f6 = "go9vi17", h6 = "go9vi18", m6 = "go9vi19", p6 = "go9vi1a go9vi19", v6 = "go9vi1b", g6 = "go9vi1c", y6 = "go9vi1d", b6 = "go9vi1e", x6 = "go9vi1f", S6 = "go9vi1g", w6 = "go9vi1h", E6 = "go9vi1i", Fr = "go9vi1j", is = "go9vi1k", Xi = "go9vi1l", j6 = "go9vi1m go9vi1l", N6 = "go9vi1n", T6 = "go9vi1o go9vi1n", C6 = "go9vi1p go9vi1n", R6 = "go9vi1q", M6 = "go9vi1r", _6 = "go9vi1s", A6 = "go9vi1t", bS = "go9vi1u", D6 = "go9vi1v", z6 = "go9vi1w", O6 = "go9vi1x go9vi1l", k6 = "go9vi1y", L6 = "go9vi1z", U6 = "go9vi110", B6 = "go9vi111", V6 = "go9vi112", $6 = "go9vi113";
const H6 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function q6() {
  const { deployment: n, mappings: a, voiceAssets: i } = Ts(), [s, o] = y.useState(a), [u, h] = y.useState(i), [m, g] = y.useState(
    a[0]?.mappingId ?? null
  ), [p, b] = y.useState(""), [v, S] = y.useState(null), [E, w] = y.useState(null), [T, R] = y.useState(null), C = y.useMemo(() => {
    const N = /* @__PURE__ */ new Map();
    for (const U of u) N.set(U.voiceAssetId, U);
    return N;
  }, [u]), k = y.useMemo(() => {
    const N = p.trim().toLowerCase();
    return N ? s.filter((U) => U.characterName.toLowerCase().includes(N)) : s;
  }, [s, p]), _ = y.useMemo(
    () => s.find((N) => N.mappingId === m) ?? null,
    [s, m]
  );
  y.useEffect(() => {
    o(a), h(i), g(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!E) return;
    const N = setTimeout(() => w(null), 2600);
    return () => clearTimeout(N);
  }, [E]);
  const z = y.useCallback(async () => {
    const N = await ps(n.deploymentId);
    h(N.voiceAssets);
  }, [n.deploymentId]), K = y.useCallback(
    (N) => {
      o(
        (U) => U.map((I) => I.mappingId === m ? { ...I, ...N } : I)
      );
    },
    [m]
  ), ee = y.useCallback(
    async (N) => {
      if (!_) return;
      const U = _;
      try {
        const I = await us(n.deploymentId, _.mappingId, N);
        o((ne) => ne.map((M) => M.mappingId === I.mappingId ? I : M));
      } catch (I) {
        o(
          (ne) => ne.map((M) => M.mappingId === U.mappingId ? U : M)
        ), S(mr(I));
      }
    },
    [_, n.deploymentId]
  ), te = y.useCallback(async () => {
    const N = u[0];
    if (!N) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = P6(s), I = await Dh(n.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: N.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((ne) => [...ne, I]), g(I.mappingId);
    } catch (U) {
      S(mr(U));
    }
  }, [n.deploymentId, u, s]), D = y.useCallback(() => {
    _ && R({ id: _.mappingId, name: _.characterName });
  }, [_]), H = y.useCallback(async () => {
    if (!T) return;
    const { id: N, name: U } = T;
    R(null);
    try {
      await Ex(n.deploymentId, N), o((I) => I.filter((ne) => ne.mappingId !== N)), g(null), w(`Mapping for ${U} deactivated.`);
    } catch (I) {
      S(mr(I));
    }
  }, [n.deploymentId, T]), q = y.useCallback(
    async (N, U, I) => {
      try {
        const ne = await gc(n.deploymentId, N, U, I);
        return h((M) => [ne, ...M]), w(`${ne.displayName} uploaded.`), ne;
      } catch (ne) {
        return S(mr(ne)), null;
      }
    },
    [n.deploymentId]
  ), le = y.useCallback(async () => {
    try {
      const N = await lT(n.deploymentId);
      eU(N, `${n.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (N) {
      S(mr(N));
    }
  }, [n.deploymentId]), re = y.useCallback(
    async (N, U) => {
      try {
        const I = await sT(
          n.deploymentId,
          N.mappings,
          U
        );
        w(
          `Imported ${I.created.length} • skipped ${I.skipped.length} • replaced ${I.replaced.length}.`
        );
        const ne = await ps(n.deploymentId);
        h(ne.voiceAssets);
      } catch (I) {
        S(mr(I));
      }
    },
    [n.deploymentId]
  ), J = y.useCallback(
    async (N) => {
      if (await z(), _ && N.chain_digest)
        try {
          const U = await us(n.deploymentId, _.mappingId, {
            voiceAssetChainDigest: N.chain_digest
          });
          o(
            (I) => I.map((ne) => ne.mappingId === U.mappingId ? U : ne)
          );
        } catch (U) {
          S(mr(U));
        }
      w("Edit applied.");
    },
    [z, _, n.deploymentId]
  ), ce = y.useCallback((N) => {
    S(N);
  }, []), W = y.useCallback(
    async (N, U) => {
      if (!_) return null;
      const I = N.trim() || `[${_.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await dT(n.deploymentId, {
          line: I,
          outputFormat: U
        })).runId };
      } catch (ne) {
        return S(mr(ne)), null;
      }
    },
    [n.deploymentId, _]
  ), A = u.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ d.jsxs("div", { className: s6, children: [
    /* @__PURE__ */ d.jsxs("aside", { className: o6, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ d.jsxs("header", { className: c6, children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("h1", { id: "mapping-sidebar-heading", className: u6, children: "Cast" }),
          /* @__PURE__ */ d.jsxs("span", { className: d6, children: [
            s.length,
            " active · ",
            u.length,
            " ",
            A
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(ft, { variant: "primary", size: "sm", onClick: te, children: "+ Add" })
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "search",
          className: f6,
          placeholder: "Search characters",
          value: p,
          onChange: (N) => b(N.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ d.jsx(X6, { onExport: le, onImport: re, onParseError: S }),
      /* @__PURE__ */ d.jsx("div", { className: h6, children: k.length === 0 ? /* @__PURE__ */ d.jsx(
        Cs,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : k.map((N) => {
        const U = C.get(N.speakerVoiceAssetId), I = N.mappingId === m;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: I ? p6 : m6,
            onClick: () => g(N.mappingId),
            "aria-pressed": I,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: v6, "aria-hidden": "true", children: K6(N.characterName) }),
              /* @__PURE__ */ d.jsxs("span", { className: g6, children: [
                /* @__PURE__ */ d.jsx("span", { className: y6, children: N.characterName }),
                /* @__PURE__ */ d.jsxs("span", { className: b6, children: [
                  N.defaultEmotionMode,
                  " · ",
                  U?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          N.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: x6, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ d.jsx(uS, { features: yS, children: /* @__PURE__ */ d.jsx(Uk, { children: E && /* @__PURE__ */ d.jsx(
        vS.div,
        {
          className: D6,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }) }),
      v && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: v }),
      T && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
        /* @__PURE__ */ d.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          T.name,
          "?"
        ] }),
        /* @__PURE__ */ d.jsx(ft, { variant: "danger", size: "sm", onClick: () => void H(), children: "Delete" }),
        /* @__PURE__ */ d.jsx(ft, { variant: "ghost", size: "sm", onClick: () => R(null), children: "Cancel" })
      ] }),
      _ ? /* @__PURE__ */ d.jsx(
        F6,
        {
          deploymentId: n.deploymentId,
          mapping: _,
          voiceAssets: u,
          allMappings: s,
          onNameChange: (N) => {
            K({ characterName: N });
          },
          onNameBlur: (N) => {
            N !== _.characterName && N.trim() && ee({ characterName: N.trim() });
          },
          onSpeakerChange: (N) => {
            K({ speakerVoiceAssetId: N }), ee({ speakerVoiceAssetId: N });
          },
          onModeChange: (N) => {
            K({ defaultEmotionMode: N }), ee({ defaultEmotionMode: N });
          },
          onQwenChange: (N) => {
            K({ defaultQwenTemplate: N });
          },
          onQwenBlur: (N) => {
            ee({ defaultQwenTemplate: N });
          },
          onSpeedChange: (N) => {
            K({ defaultSpeedFactor: N });
          },
          onSpeedCommit: (N) => {
            ee({ defaultSpeedFactor: N });
          },
          onEmotionVoiceChange: (N) => {
            const U = N || null;
            K({ defaultEmotionVoiceAssetId: U }), ee({ defaultEmotionVoiceAssetId: U });
          },
          onDelete: D,
          onUploadVoice: async (N, U, I) => {
            const ne = await q(N, U, I);
            return ne && I === "speaker" && (K({ speakerVoiceAssetId: ne.voiceAssetId }), ee({ speakerVoiceAssetId: ne.voiceAssetId })), await z(), ne;
          },
          onTestLine: W,
          onEditChainPersisted: J,
          onEditError: ce
        },
        _.mappingId
      ) : /* @__PURE__ */ d.jsx(
        I6,
        {
          voiceCount: u.length,
          onUploadVoice: async (N) => {
            await q(N, N.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function I6({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ d.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ d.jsxs("div", { className: U6, children: [
      /* @__PURE__ */ d.jsx("p", { className: Pr, children: "01 / Onboarding" }),
      /* @__PURE__ */ d.jsx("h2", { id: "onboarding-heading", className: B6, children: "Upload your first voice" }),
      /* @__PURE__ */ d.jsxs("p", { className: V6, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ d.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(
      xS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ d.jsx(La, { density: "airy", children: /* @__PURE__ */ d.jsx(
    Cs,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function F6(n) {
  const { mapping: a, voiceAssets: i, allMappings: s } = n, o = i.find((C) => C.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = y.useMemo(
    () => s.filter(
      (C) => C.isActive && C.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((C) => C.characterName),
    [s, a.speakerVoiceAssetId]
  ), h = i.find((C) => C.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, g] = y.useState(""), [p, b] = y.useState("mp3"), [v, S] = y.useState("idle"), [E, w] = y.useState(null), T = y.useRef(!1);
  y.useEffect(() => (T.current = !1, () => {
    T.current = !0;
  }), []);
  const R = y.useCallback(async () => {
    T.current = !1, S("running"), w(null);
    const C = await n.onTestLine(m, p);
    if (T.current) return;
    if (!C) {
      S("error"), w("Failed to enqueue test-line run.");
      return;
    }
    const { runId: k } = C;
    for (let _ = 0; _ < 60; _ += 1) {
      if (await new Promise((z) => setTimeout(z, 500)), T.current) return;
      try {
        const z = await zh(n.deploymentId, k);
        if (T.current) return;
        if (z.status === "completed") {
          S("done");
          return;
        }
        if (z.status === "failed" || z.status === "cancelled") {
          S("error"), w(`Run ${z.status}.`);
          return;
        }
      } catch (z) {
        if (T.current) return;
        S("error"), w(z instanceof Error ? z.message : "unknown error");
        return;
      }
    }
    T.current || (S("error"), w("test-line timed out after 30s"));
  }, [n.onTestLine, n.deploymentId, m, p]);
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("header", { className: S6, children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("p", { className: Pr, children: "Character" }),
        /* @__PURE__ */ d.jsx("h2", { className: w6, children: a.characterName })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: bS, children: /* @__PURE__ */ d.jsx(ft, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ d.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: z6,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              className: O6,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: m,
              onChange: (C) => g(C.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: v === "running"
            }
          ),
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              className: Xi,
              value: p,
              onChange: (C) => b(C.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: v === "running",
              children: [
                /* @__PURE__ */ d.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ d.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ d.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ d.jsx(
            ft,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void R(),
              disabled: v === "running",
              children: v === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          v === "done" && /* @__PURE__ */ d.jsx(Zr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          v === "error" && E && /* @__PURE__ */ d.jsx(Zr, { tone: "danger", children: E })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: E6, children: [
      /* @__PURE__ */ d.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "identity-heading", className: Pr, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Character name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: Xi,
              value: a.characterName,
              onChange: (C) => n.onNameChange(C.currentTarget.value),
              onBlur: (C) => n.onNameBlur(C.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Emotion mode" }),
          /* @__PURE__ */ d.jsx(
            "select",
            {
              className: Xi,
              value: a.defaultEmotionMode,
              onChange: (C) => n.onModeChange(C.currentTarget.value),
              children: H6.map((C) => /* @__PURE__ */ d.jsx("option", { value: C, children: Q6(C) }, C))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsxs("span", { className: Fr, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ d.jsx(
            "textarea",
            {
              className: j6,
              value: a.defaultQwenTemplate ?? "",
              onChange: (C) => n.onQwenChange(C.currentTarget.value),
              onBlur: (C) => n.onQwenBlur(C.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Emotion reference" }),
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              className: Xi,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (C) => n.onEmotionVoiceChange(C.currentTarget.value),
              children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "— none —" }),
                i.map((C) => /* @__PURE__ */ d.jsxs("option", { value: C.voiceAssetId, children: [
                  C.displayName,
                  " · ",
                  C.kind
                ] }, C.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: is, children: [
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
              onChange: (C) => n.onSpeedChange(Number(C.currentTarget.value)),
              onMouseUp: (C) => n.onSpeedCommit(Number(C.currentTarget.value)),
              onTouchEnd: (C) => n.onSpeedCommit(Number(C.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(La, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "voice-heading", className: Pr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Speaker reference" }),
        /* @__PURE__ */ d.jsx(
          Y6,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: n.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ d.jsx(Ub, { voice: o }),
        /* @__PURE__ */ d.jsx(
          xS,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (C) => n.onUploadVoice(C, C.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ d.jsx(
          i6,
          {
            voiceAsset: o,
            deploymentId: n.deploymentId,
            affectedCharacterNames: u,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        h && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("span", { className: Fr, children: "Emotion reference voice" }),
          /* @__PURE__ */ d.jsx(Ub, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function Y6({
  value: n,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ d.jsxs(
    "select",
    {
      className: Xi,
      value: n,
      onChange: (s) => i(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ d.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ d.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function Ub({ voice: n }) {
  const a = Z6(n.durationMs ?? null);
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: R6, children: [
      /* @__PURE__ */ d.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ d.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ d.jsx("span", { children: J6(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ d.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ d.jsxs("div", { className: M6, children: [
      /* @__PURE__ */ d.jsx("div", { className: _6, children: /* @__PURE__ */ d.jsx(uS, { features: yS, children: /* @__PURE__ */ d.jsx(
        vS.div,
        {
          className: A6,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ d.jsx(Zr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ d.jsx(G6, { seed: n.contentSha256 })
  ] });
}
function G6({ seed: n }) {
  const a = y.useMemo(() => W6(n, 48), [n]);
  return /* @__PURE__ */ d.jsx("div", { className: k6, "aria-hidden": "true", children: a.map((i, s) => /* @__PURE__ */ d.jsx(
    "span",
    {
      className: L6,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function xS({
  label: n,
  onFile: a
}) {
  const [i, s] = y.useState(!1), [o, u] = y.useState(!1), h = y.useRef(null), m = y.useCallback(
    async (g) => {
      u(!0);
      try {
        await a(g);
      } finally {
        u(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: o ? C6 : i ? T6 : N6,
      onDragOver: (g) => {
        g.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (g) => {
        g.preventDefault(), s(!1);
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
        /* @__PURE__ */ d.jsx(
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
        o ? "Uploading…" : n
      ]
    }
  );
}
function X6({
  onExport: n,
  onImport: a,
  onParseError: i
}) {
  const [s, o] = y.useState("error"), u = y.useRef(null);
  return /* @__PURE__ */ d.jsxs("div", { className: bS, children: [
    /* @__PURE__ */ d.jsx(ft, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: $6,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const m = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!m)
            try {
              const g = await m.text(), p = JSON.parse(g);
              a(p, s);
            } catch {
              i("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ d.jsx(ft, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ d.jsxs(
      "select",
      {
        className: Xi,
        value: s,
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
function P6(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function K6(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function Q6(n) {
  switch (n) {
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
function Z6(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function J6(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function W6(n, a) {
  const i = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    i.push((o * 31 + s * 7) % 100 / 100);
  }
  return i;
}
function eU(n, a) {
  const i = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(i), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function mr(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
}
function tU() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await rT();
        return { deployments: n };
      },
      Component: VT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId");
        return fj(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), [i, { mappings: s }, { runs: o }, u] = await Promise.all([
          Ty(a),
          Cy(a),
          oT(a, { limit: 10 }),
          pT(a)
        ]);
        return { deployment: i, mappings: s, runs: o, workflow: u };
      },
      Component: OD
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), i = Hi(n, "runId");
        return { run: await zh(a, i) };
      },
      Component: Qz
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), [i, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          Ty(a),
          Cy(a),
          ps(a)
        ]);
        return { deployment: i, mappings: s, voiceAssets: o };
      },
      Component: q6
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const i = Hi(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: M5
    },
    {
      path: "/runtime/queue",
      Component: N5
    }
  ];
}
function Hi(n, a) {
  const i = n[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Bb = "ext-actions-request", nU = "ext-actions-declare", aU = "ext-action-state", Vb = "ext-action-invoke", vh = "emotion-tts:navigate", Ii = "emotion-tts.run", $b = "emotion-tts.mappings", rU = 4e3;
function iU(n, a) {
  let i = null, s = !1;
  const o = () => {
    const w = i?.badge ?? "not_installed";
    return lU(w, s);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: $b,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    n.dispatchEvent(
      new CustomEvent(nU, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    n.dispatchEvent(
      new CustomEvent(aU, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => h(), p = (w) => {
    const T = w.detail?.id;
    T === Ii ? b() : T === $b && n.dispatchEvent(
      new CustomEvent(vh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const w = i?.badge ?? "not_installed", T = w === "ready" || w === "running" || w === "starting";
    s = !0, m();
    try {
      T ? await zx() : await Dx();
      try {
        i = await yc();
      } catch {
      }
    } catch {
    } finally {
      s = !1, m();
    }
  };
  n.addEventListener(Bb, g), n.addEventListener(Vb, p);
  let v = !1;
  const S = async () => {
    try {
      const w = await yc();
      if (v) return;
      i = w, m();
    } catch {
    }
  };
  S();
  const E = window.setInterval(() => void S(), rU);
  return h(), {
    dispose: () => {
      v = !0, window.clearInterval(E), n.removeEventListener(Bb, g), n.removeEventListener(Vb, p);
    }
  };
}
function lU(n, a) {
  const i = n === "ready" || n === "running" || n === "starting", s = n === "stopped" || n === "not_installed" || n === "failed";
  return a ? {
    id: Ii,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : n === "starting" || n === "installing" || n === "stopping" ? {
    id: Ii,
    label: Ox(n),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : i ? {
    id: Ii,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : s ? {
    id: Ii,
    label: n === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: Ii,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const gh = "emotion-tts-app", sU = "ext-event", Hb = "emotion-tts-stylesheet", qb = ["accent", "density", "card"];
function oU(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function cU() {
  if (typeof document > "u" || document.getElementById(Hb)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Hb, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
cU();
class uU extends HTMLElement {
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
    this.root = UE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(vh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = iU(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const s = i.detail?.path;
      s && this.router && this.router.navigate(s);
    };
    this.navigateListener = a, this.addEventListener(vh, a);
  }
  syncTweaksFromBody() {
    for (const a of qb) {
      const i = oU(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: qb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = bN(tU(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ d.jsx(y.StrictMode, { children: /* @__PURE__ */ d.jsx(SN, { router: i }) })
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
      new CustomEvent(sU, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function dU() {
  typeof customElements > "u" || customElements.get(gh) || customElements.define(gh, uU);
}
typeof customElements < "u" && !customElements.get(gh) && dU();
export {
  dU as register
};
//# sourceMappingURL=emotion-tts.js.map
