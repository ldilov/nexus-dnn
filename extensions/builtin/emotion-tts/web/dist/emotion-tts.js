function FE(t, a) {
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
function rx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Zd = { exports: {} }, Xs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jg;
function YE() {
  if (Jg) return Xs;
  Jg = 1;
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
  return Xs.Fragment = a, Xs.jsx = i, Xs.jsxs = i, Xs;
}
var Wg;
function GE() {
  return Wg || (Wg = 1, Zd.exports = YE()), Zd.exports;
}
var c = GE(), Jd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ey;
function XE() {
  if (ey) return Le;
  ey = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
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
  function T(M, Z, P) {
    this.props = M, this.context = Z, this.refs = R, this.updater = P || w;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(M, Z) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, Z, "setState");
  }, T.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function O() {
  }
  O.prototype = T.prototype;
  function z(M, Z, P) {
    this.props = M, this.context = Z, this.refs = R, this.updater = P || w;
  }
  var _ = z.prototype = new O();
  _.constructor = z, N(_, T.prototype), _.isPureReactComponent = !0;
  var I = Array.isArray;
  function J() {
  }
  var ne = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function q(M, Z, P) {
    var le = P.ref;
    return {
      $$typeof: t,
      type: M,
      key: Z,
      ref: le !== void 0 ? le : null,
      props: P
    };
  }
  function F(M, Z) {
    return q(M.type, Z, M.props);
  }
  function ie(M) {
    return typeof M == "object" && M !== null && M.$$typeof === t;
  }
  function re(M) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(P) {
      return Z[P];
    });
  }
  var te = /\/+/g;
  function ce(M, Z) {
    return typeof M == "object" && M !== null && M.key != null ? re("" + M.key) : Z.toString(36);
  }
  function W(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(J, J) : (M.status = "pending", M.then(
          function(Z) {
            M.status === "pending" && (M.status = "fulfilled", M.value = Z);
          },
          function(Z) {
            M.status === "pending" && (M.status = "rejected", M.reason = Z);
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
  function k(M, Z, P, le, fe) {
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
            case t:
            case a:
              Ae = !0;
              break;
            case b:
              return Ae = M._init, k(
                Ae(M._payload),
                Z,
                P,
                le,
                fe
              );
          }
      }
    if (Ae)
      return fe = fe(M), Ae = le === "" ? "." + ce(M, 0) : le, I(fe) ? (P = "", Ae != null && (P = Ae.replace(te, "$&/") + "/"), k(fe, Z, P, "", function(Jt) {
        return Jt;
      })) : fe != null && (ie(fe) && (fe = F(
        fe,
        P + (fe.key == null || M && M.key === fe.key ? "" : ("" + fe.key).replace(
          te,
          "$&/"
        ) + "/") + Ae
      )), Z.push(fe)), 1;
    Ae = 0;
    var Me = le === "" ? "." : le + ":";
    if (I(M))
      for (var Ve = 0; Ve < M.length; Ve++)
        le = M[Ve], ge = Me + ce(le, Ve), Ae += k(
          le,
          Z,
          P,
          ge,
          fe
        );
    else if (Ve = E(M), typeof Ve == "function")
      for (M = Ve.call(M), Ve = 0; !(le = M.next()).done; )
        le = le.value, ge = Me + ce(le, Ve++), Ae += k(
          le,
          Z,
          P,
          ge,
          fe
        );
    else if (ge === "object") {
      if (typeof M.then == "function")
        return k(
          W(M),
          Z,
          P,
          le,
          fe
        );
      throw Z = String(M), Error(
        "Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ae;
  }
  function C(M, Z, P) {
    if (M == null) return M;
    var le = [], fe = 0;
    return k(M, le, "", "", function(ge) {
      return Z.call(P, ge, fe++);
    }), le;
  }
  function U(M) {
    if (M._status === -1) {
      var Z = M._result;
      Z = Z(), Z.then(
        function(P) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = P);
        },
        function(P) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = P);
        }
      ), M._status === -1 && (M._status = 0, M._result = Z);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var B = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(Z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  }, Q = {
    map: C,
    forEach: function(M, Z, P) {
      C(
        M,
        function() {
          Z.apply(this, arguments);
        },
        P
      );
    },
    count: function(M) {
      var Z = 0;
      return C(M, function() {
        Z++;
      }), Z;
    },
    toArray: function(M) {
      return C(M, function(Z) {
        return Z;
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
  return Le.Activity = v, Le.Children = Q, Le.Component = T, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = z, Le.StrictMode = l, Le.Suspense = g, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, Le.__COMPILER_RUNTIME = {
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
  }, Le.cloneElement = function(M, Z, P) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var le = N({}, M.props), fe = M.key;
    if (Z != null)
      for (ge in Z.key !== void 0 && (fe = "" + Z.key), Z)
        !A.call(Z, ge) || ge === "key" || ge === "__self" || ge === "__source" || ge === "ref" && Z.ref === void 0 || (le[ge] = Z[ge]);
    var ge = arguments.length - 2;
    if (ge === 1) le.children = P;
    else if (1 < ge) {
      for (var Ae = Array(ge), Me = 0; Me < ge; Me++)
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
      $$typeof: d,
      _context: M
    }, M;
  }, Le.createElement = function(M, Z, P) {
    var le, fe = {}, ge = null;
    if (Z != null)
      for (le in Z.key !== void 0 && (ge = "" + Z.key), Z)
        A.call(Z, le) && le !== "key" && le !== "__self" && le !== "__source" && (fe[le] = Z[le]);
    var Ae = arguments.length - 2;
    if (Ae === 1) fe.children = P;
    else if (1 < Ae) {
      for (var Me = Array(Ae), Ve = 0; Ve < Ae; Ve++)
        Me[Ve] = arguments[Ve + 2];
      fe.children = Me;
    }
    if (M && M.defaultProps)
      for (le in Ae = M.defaultProps, Ae)
        fe[le] === void 0 && (fe[le] = Ae[le]);
    return q(M, ge, fe);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(M) {
    return { $$typeof: m, render: M };
  }, Le.isValidElement = ie, Le.lazy = function(M) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: M },
      _init: U
    };
  }, Le.memo = function(M, Z) {
    return {
      $$typeof: p,
      type: M,
      compare: Z === void 0 ? null : Z
    };
  }, Le.startTransition = function(M) {
    var Z = ne.T, P = {};
    ne.T = P;
    try {
      var le = M(), fe = ne.S;
      fe !== null && fe(P, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(J, B);
    } catch (ge) {
      B(ge);
    } finally {
      Z !== null && P.types !== null && (Z.types = P.types), ne.T = Z;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, Le.use = function(M) {
    return ne.H.use(M);
  }, Le.useActionState = function(M, Z, P) {
    return ne.H.useActionState(M, Z, P);
  }, Le.useCallback = function(M, Z) {
    return ne.H.useCallback(M, Z);
  }, Le.useContext = function(M) {
    return ne.H.useContext(M);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(M, Z) {
    return ne.H.useDeferredValue(M, Z);
  }, Le.useEffect = function(M, Z) {
    return ne.H.useEffect(M, Z);
  }, Le.useEffectEvent = function(M) {
    return ne.H.useEffectEvent(M);
  }, Le.useId = function() {
    return ne.H.useId();
  }, Le.useImperativeHandle = function(M, Z, P) {
    return ne.H.useImperativeHandle(M, Z, P);
  }, Le.useInsertionEffect = function(M, Z) {
    return ne.H.useInsertionEffect(M, Z);
  }, Le.useLayoutEffect = function(M, Z) {
    return ne.H.useLayoutEffect(M, Z);
  }, Le.useMemo = function(M, Z) {
    return ne.H.useMemo(M, Z);
  }, Le.useOptimistic = function(M, Z) {
    return ne.H.useOptimistic(M, Z);
  }, Le.useReducer = function(M, Z, P) {
    return ne.H.useReducer(M, Z, P);
  }, Le.useRef = function(M) {
    return ne.H.useRef(M);
  }, Le.useState = function(M) {
    return ne.H.useState(M);
  }, Le.useSyncExternalStore = function(M, Z, P) {
    return ne.H.useSyncExternalStore(
      M,
      Z,
      P
    );
  }, Le.useTransition = function() {
    return ne.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var ty;
function Eh() {
  return ty || (ty = 1, Jd.exports = XE()), Jd.exports;
}
var y = Eh();
const me = /* @__PURE__ */ rx(y), PE = /* @__PURE__ */ FE({
  __proto__: null,
  default: me
}, [y]);
var Wd = { exports: {} }, Ps = {}, ef = { exports: {} }, tf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ny;
function KE() {
  return ny || (ny = 1, (function(t) {
    function a(k, C) {
      var U = k.length;
      k.push(C);
      e: for (; 0 < U; ) {
        var B = U - 1 >>> 1, Q = k[B];
        if (0 < o(Q, C))
          k[B] = C, k[U] = Q, U = B;
        else break e;
      }
    }
    function i(k) {
      return k.length === 0 ? null : k[0];
    }
    function l(k) {
      if (k.length === 0) return null;
      var C = k[0], U = k.pop();
      if (U !== C) {
        k[0] = U;
        e: for (var B = 0, Q = k.length, M = Q >>> 1; B < M; ) {
          var Z = 2 * (B + 1) - 1, P = k[Z], le = Z + 1, fe = k[le];
          if (0 > o(P, U))
            le < Q && 0 > o(fe, P) ? (k[B] = fe, k[le] = U, B = le) : (k[B] = P, k[Z] = U, B = Z);
          else if (le < Q && 0 > o(fe, U))
            k[B] = fe, k[le] = U, B = le;
          else break e;
        }
      }
      return C;
    }
    function o(k, C) {
      var U = k.sortIndex - C.sortIndex;
      return U !== 0 ? U : k.id - C.id;
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
    var g = [], p = [], b = 1, v = null, S = 3, E = !1, w = !1, N = !1, R = !1, T = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function _(k) {
      for (var C = i(p); C !== null; ) {
        if (C.callback === null) l(p);
        else if (C.startTime <= k)
          l(p), C.sortIndex = C.expirationTime, a(g, C);
        else break;
        C = i(p);
      }
    }
    function I(k) {
      if (N = !1, _(k), !w)
        if (i(g) !== null)
          w = !0, J || (J = !0, re());
        else {
          var C = i(p);
          C !== null && W(I, C.startTime - k);
        }
    }
    var J = !1, ne = -1, A = 5, q = -1;
    function F() {
      return R ? !0 : !(t.unstable_now() - q < A);
    }
    function ie() {
      if (R = !1, J) {
        var k = t.unstable_now();
        q = k;
        var C = !0;
        try {
          e: {
            w = !1, N && (N = !1, O(ne), ne = -1), E = !0;
            var U = S;
            try {
              t: {
                for (_(k), v = i(g); v !== null && !(v.expirationTime > k && F()); ) {
                  var B = v.callback;
                  if (typeof B == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var Q = B(
                      v.expirationTime <= k
                    );
                    if (k = t.unstable_now(), typeof Q == "function") {
                      v.callback = Q, _(k), C = !0;
                      break t;
                    }
                    v === i(g) && l(g), _(k);
                  } else l(g);
                  v = i(g);
                }
                if (v !== null) C = !0;
                else {
                  var M = i(p);
                  M !== null && W(
                    I,
                    M.startTime - k
                  ), C = !1;
                }
              }
              break e;
            } finally {
              v = null, S = U, E = !1;
            }
            C = void 0;
          }
        } finally {
          C ? re() : J = !1;
        }
      }
    }
    var re;
    if (typeof z == "function")
      re = function() {
        z(ie);
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
    function W(k, C) {
      ne = T(function() {
        k(t.unstable_now());
      }, C);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(k) {
      k.callback = null;
    }, t.unstable_forceFrameRate = function(k) {
      0 > k || 125 < k ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < k ? Math.floor(1e3 / k) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, t.unstable_next = function(k) {
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
        return k();
      } finally {
        S = U;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(k, C) {
      switch (k) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          k = 3;
      }
      var U = S;
      S = k;
      try {
        return C();
      } finally {
        S = U;
      }
    }, t.unstable_scheduleCallback = function(k, C, U) {
      var B = t.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? B + U : B) : U = B, k) {
        case 1:
          var Q = -1;
          break;
        case 2:
          Q = 250;
          break;
        case 5:
          Q = 1073741823;
          break;
        case 4:
          Q = 1e4;
          break;
        default:
          Q = 5e3;
      }
      return Q = U + Q, k = {
        id: b++,
        callback: C,
        priorityLevel: k,
        startTime: U,
        expirationTime: Q,
        sortIndex: -1
      }, U > B ? (k.sortIndex = U, a(p, k), i(g) === null && k === i(p) && (N ? (O(ne), ne = -1) : N = !0, W(I, U - B))) : (k.sortIndex = Q, a(g, k), w || E || (w = !0, J || (J = !0, re()))), k;
    }, t.unstable_shouldYield = F, t.unstable_wrapCallback = function(k) {
      var C = S;
      return function() {
        var U = S;
        S = C;
        try {
          return k.apply(this, arguments);
        } finally {
          S = U;
        }
      };
    };
  })(tf)), tf;
}
var ay;
function QE() {
  return ay || (ay = 1, ef.exports = KE()), ef.exports;
}
var nf = { exports: {} }, on = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ry;
function ZE() {
  if (ry) return on;
  ry = 1;
  var t = Eh();
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
  return on.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, on.createPortal = function(g, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return d(g, p, null, b);
  }, on.flushSync = function(g) {
    var p = h.T, b = l.p;
    try {
      if (h.T = null, l.p = 2, g) return g();
    } finally {
      h.T = p, l.p = b, l.d.f();
    }
  }, on.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, l.d.C(g, p));
  }, on.prefetchDNS = function(g) {
    typeof g == "string" && l.d.D(g);
  }, on.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, E = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? l.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: E
        }
      ) : b === "script" && l.d.X(g, {
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
          l.d.M(g, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && l.d.M(g);
  }, on.preload = function(g, p) {
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
  }, on.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        l.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else l.d.m(g);
  }, on.requestFormReset = function(g) {
    l.d.r(g);
  }, on.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, on.useFormState = function(g, p, b) {
    return h.H.useFormState(g, p, b);
  }, on.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, on.version = "19.2.5", on;
}
var iy;
function ix() {
  if (iy) return nf.exports;
  iy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), nf.exports = ZE(), nf.exports;
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
var sy;
function JE() {
  if (sy) return Ps;
  sy = 1;
  var t = QE(), a = Eh(), i = ix();
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
        for (var x = !1, j = u.child; j; ) {
          if (j === r) {
            x = !0, r = u, s = f;
            break;
          }
          if (j === s) {
            x = !0, s = u, r = f;
            break;
          }
          j = j.sibling;
        }
        if (!x) {
          for (j = f.child; j; ) {
            if (j === r) {
              x = !0, r = f, s = u;
              break;
            }
            if (j === s) {
              x = !0, s = f, r = u;
              break;
            }
            j = j.sibling;
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
  var v = Object.assign, S = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), z = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), J = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), F = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
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
      case I:
        return "Suspense";
      case J:
        return "SuspenseList";
      case q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case z:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case _:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ne:
          return n = e.displayName || null, n !== null ? n : ce(e.type) || "Memo";
        case A:
          n = e._payload, e = e._init;
          try {
            return ce(e(n));
          } catch {
          }
      }
    return null;
  }
  var W = Array.isArray, k = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, B = [], Q = -1;
  function M(e) {
    return { current: e };
  }
  function Z(e) {
    0 > Q || (e.current = B[Q], B[Q] = null, Q--);
  }
  function P(e, n) {
    Q++, B[Q] = e.current, e.current = n;
  }
  var le = M(null), fe = M(null), ge = M(null), Ae = M(null);
  function Me(e, n) {
    switch (P(ge, n), P(fe, e), P(le, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Sg(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Sg(n), e = wg(n, e);
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
    Z(le), P(le, e);
  }
  function Ve() {
    Z(le), Z(fe), Z(ge);
  }
  function Jt(e) {
    e.memoizedState !== null && P(Ae, e);
    var n = le.current, r = wg(n, e.type);
    n !== r && (P(fe, e), P(le, r));
  }
  function Pt(e) {
    fe.current === e && (Z(le), Z(fe)), Ae.current === e && (Z(Ae), Is._currentValue = U);
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
  function Oe(e, n) {
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
                  var K = ee;
                }
                Reflect.construct(e, [], oe);
              } else {
                try {
                  oe.call();
                } catch (ee) {
                  K = ee;
                }
                e.call(oe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ee) {
                K = ee;
              }
              (oe = e()) && typeof oe.catch == "function" && oe.catch(function() {
              });
            }
          } catch (ee) {
            if (ee && K && typeof ee.stack == "string")
              return [ee.stack, K.stack];
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
      var f = s.DetermineComponentFrameRoot(), x = f[0], j = f[1];
      if (x && j) {
        var L = x.split(`
`), X = j.split(`
`);
        for (u = s = 0; s < L.length && !L[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; u < X.length && !X[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (s === L.length || u === X.length)
          for (s = L.length - 1, u = X.length - 1; 1 <= s && 0 <= u && L[s] !== X[u]; )
            u--;
        for (; 1 <= s && 0 <= u; s--, u--)
          if (L[s] !== X[u]) {
            if (s !== 1 || u !== 1)
              do
                if (s--, u--, 0 > u || L[s] !== X[u]) {
                  var ae = `
` + L[s].replace(" at new ", " at ");
                  return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), ae;
                }
              while (1 <= s && 0 <= u);
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
  var bt = Object.prototype.hasOwnProperty, xt = t.unstable_scheduleCallback, dn = t.unstable_cancelCallback, Ht = t.unstable_shouldYield, kn = t.unstable_requestPaint, qt = t.unstable_now, ye = t.unstable_getCurrentPriorityLevel, ze = t.unstable_ImmediatePriority, Qe = t.unstable_UserBlockingPriority, nt = t.unstable_NormalPriority, It = t.unstable_LowPriority, Ft = t.unstable_IdlePriority, jr = t.log, sa = t.unstable_setDisableYieldValue, Zn = null, Wt = null;
  function Tt(e) {
    if (typeof jr == "function" && sa(e), Wt && typeof Wt.setStrictMode == "function")
      try {
        Wt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : On, ei = Math.log, Ha = Math.LN2;
  function On(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ei(e) / Ha | 0) | 0;
  }
  var va = 256, Jn = 262144, la = 4194304;
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
    var j = s & 134217727;
    return j !== 0 ? (s = j & ~f, s !== 0 ? u = hn(s) : (x &= j, x !== 0 ? u = hn(x) : r || (r = j & ~e, r !== 0 && (u = hn(r))))) : (j = s & ~f, j !== 0 ? u = hn(j) : x !== 0 ? u = hn(x) : r || (r = s & ~e, r !== 0 && (u = hn(r)))), u === 0 ? 0 : n !== 0 && n !== u && (n & f) === 0 && (f = u & -u, r = n & -n, f >= r || f === 32 && (r & 4194048) !== 0) ? n : u;
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
  function en(e, n, r, s, u, f) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var j = e.entanglements, L = e.expirationTimes, X = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ae = 31 - Yt(r), oe = 1 << ae;
      j[ae] = 0, L[ae] = -1;
      var K = X[ae];
      if (K !== null)
        for (X[ae] = null, ae = 0; ae < K.length; ae++) {
          var ee = K[ae];
          ee !== null && (ee.lane &= -536870913);
        }
      r &= ~oe;
    }
    s !== 0 && ga(e, s, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(x & ~n));
  }
  function ga(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var s = 31 - Yt(n);
    e.entangledLanes |= n, e.entanglements[s] = e.entanglements[s] | 1073741824 | r & 261930;
  }
  function sn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var s = 31 - Yt(r), u = 1 << s;
      u & n | e[s] & n && (e[s] |= n), r &= ~u;
    }
  }
  function D(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : V(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
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
  function Y(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ue() {
    var e = C.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Yg(e.type));
  }
  function de(e, n) {
    var r = C.p;
    try {
      return C.p = e, n();
    } finally {
      C.p = r;
    }
  }
  var Se = Math.random().toString(36).slice(2), pe = "__reactFiber$" + Se, ve = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Re = "__reactListeners$" + Se, Ne = "__reactHandles$" + Se, Ze = "__reactResources$" + Se, He = "__reactMarker$" + Se;
  function dt(e) {
    delete e[pe], delete e[ve], delete e[be], delete e[Re], delete e[Ne];
  }
  function st(e) {
    var n = e[pe];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Ee] || r[pe]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Mg(e); e !== null; ) {
            if (r = e[pe]) return r;
            e = Mg(e);
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
  function ni(e, n, r) {
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
  function ai(e) {
    if (!e._valueTracker) {
      var n = vt(e) ? "checked" : "value";
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
    return e && (s = vt(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Dl(e) {
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
  function Yc(e, n, r, s, u, f, x, j) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + kt(n)) : e.value !== "" + kt(n) && (e.value = "" + kt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Gc(e, x, kt(n)) : r != null ? Gc(e, x, kt(r)) : s != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), j != null && typeof j != "function" && typeof j != "symbol" && typeof j != "boolean" ? e.name = "" + kt(j) : e.removeAttribute("name");
  }
  function pm(e, n, r, s, u, f, x, j) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || n != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + kt(r) : "", n = n != null ? "" + kt(n) : r, j || n === e.value || (e.value = n), e.defaultValue = n;
    }
    s = s ?? u, s = typeof s != "function" && typeof s != "symbol" && !!s, e.checked = j ? e.checked : !!s, e.defaultChecked = !!s, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ai(e);
  }
  function Gc(e, n, r) {
    n === "number" && Dl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, n, r, s) {
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
  function vm(e, n, r) {
    if (n != null && (n = "" + kt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + kt(r) : "";
  }
  function gm(e, n, r, s) {
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
    r = kt(n), e.defaultValue = r, s = e.textContent, s === r && s !== "" && s !== null && (e.value = s), ai(e);
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
  var $S = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ym(e, n, r) {
    var s = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? s ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : s ? e.setProperty(n, r) : typeof r != "number" || r === 0 || $S.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function bm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (e = e.style, r != null) {
      for (var s in r)
        !r.hasOwnProperty(s) || n != null && n.hasOwnProperty(s) || (s.indexOf("--") === 0 ? e.setProperty(s, "") : s === "float" ? e.cssFloat = "" : e[s] = "");
      for (var u in n)
        s = n[u], n.hasOwnProperty(u) && r[u] !== s && ym(e, u, s);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && ym(e, f, n[f]);
  }
  function Xc(e) {
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
  function zl(e) {
    return HS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ya() {
  }
  var Pc = null;
  function Kc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var si = null, li = null;
  function xm(e) {
    var n = St(e);
    if (n && (e = n.stateNode)) {
      var r = e[ve] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Yc(
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
                var u = s[ve] || null;
                if (!u) throw Error(l(90));
                Yc(
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
              s = r[n], s.form === e.form && Al(s);
          }
          break e;
        case "textarea":
          vm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ri(e, !!r.multiple, n, !1);
      }
    }
  }
  var Qc = !1;
  function Sm(e, n, r) {
    if (Qc) return e(n, r);
    Qc = !0;
    try {
      var s = e(n);
      return s;
    } finally {
      if (Qc = !1, (si !== null || li !== null) && (So(), si && (n = si, e = li, li = si = null, xm(n), e)))
        for (n = 0; n < e.length; n++) xm(e[n]);
    }
  }
  function ss(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var s = r[ve] || null;
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
  var ba = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Zc = !1;
  if (ba)
    try {
      var ls = {};
      Object.defineProperty(ls, "passive", {
        get: function() {
          Zc = !0;
        }
      }), window.addEventListener("test", ls, ls), window.removeEventListener("test", ls, ls);
    } catch {
      Zc = !1;
    }
  var Ia = null, Jc = null, kl = null;
  function wm() {
    if (kl) return kl;
    var e, n = Jc, r = n.length, s, u = "value" in Ia ? Ia.value : Ia.textContent, f = u.length;
    for (e = 0; e < r && n[e] === u[e]; e++) ;
    var x = r - e;
    for (s = 1; s <= x && n[r - s] === u[f - s]; s++) ;
    return kl = u.slice(e, 1 < s ? 1 - s : void 0);
  }
  function Ol(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ll() {
    return !0;
  }
  function Em() {
    return !1;
  }
  function mn(e) {
    function n(r, s, u, f, x) {
      this._reactName = r, this._targetInst = u, this.type = s, this.nativeEvent = f, this.target = x, this.currentTarget = null;
      for (var j in e)
        e.hasOwnProperty(j) && (r = e[j], this[j] = r ? r(f) : f[j]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Ll : Em, this.isPropagationStopped = Em, this;
    }
    return v(n.prototype, {
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
  }, Ul = mn(Cr), os = v({}, Cr, { view: 0, detail: 0 }), qS = mn(os), Wc, eu, cs, Bl = v({}, os, {
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
    getModifierState: nu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== cs && (cs && e.type === "mousemove" ? (Wc = e.screenX - cs.screenX, eu = e.screenY - cs.screenY) : eu = Wc = 0, cs = e), Wc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : eu;
    }
  }), jm = mn(Bl), IS = v({}, Bl, { dataTransfer: 0 }), FS = mn(IS), YS = v({}, os, { relatedTarget: 0 }), tu = mn(YS), GS = v({}, Cr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), XS = mn(GS), PS = v({}, Cr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), KS = mn(PS), QS = v({}, Cr, { data: 0 }), Nm = mn(QS), ZS = {
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
  function nu() {
    return ew;
  }
  var tw = v({}, os, {
    key: function(e) {
      if (e.key) {
        var n = ZS[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Ol(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? JS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: nu,
    charCode: function(e) {
      return e.type === "keypress" ? Ol(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ol(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), nw = mn(tw), aw = v({}, Bl, {
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
  }), Tm = mn(aw), rw = v({}, os, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: nu
  }), iw = mn(rw), sw = v({}, Cr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lw = mn(sw), ow = v({}, Bl, {
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
  }), dw = mn(uw), fw = [9, 13, 27, 32], au = ba && "CompositionEvent" in window, us = null;
  ba && "documentMode" in document && (us = document.documentMode);
  var hw = ba && "TextEvent" in window && !us, Cm = ba && (!au || us && 8 < us && 11 >= us), Rm = " ", Mm = !1;
  function _m(e, n) {
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
  function Am(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function mw(e, n) {
    switch (e) {
      case "compositionend":
        return Am(n);
      case "keypress":
        return n.which !== 32 ? null : (Mm = !0, Rm);
      case "textInput":
        return e = n.data, e === Rm && Mm ? null : e;
      default:
        return null;
    }
  }
  function pw(e, n) {
    if (oi)
      return e === "compositionend" || !au && _m(e, n) ? (e = wm(), kl = Jc = Ia = null, oi = !1, e) : null;
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
        return Cm && n.locale !== "ko" ? null : n.data;
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
  function Dm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!vw[e.type] : n === "textarea";
  }
  function zm(e, n, r, s) {
    si ? li ? li.push(s) : li = [s] : si = s, n = Ro(n, "onChange"), 0 < n.length && (r = new Ul(
      "onChange",
      "change",
      null,
      r,
      s
    ), e.push({ event: r, listeners: n }));
  }
  var ds = null, fs = null;
  function gw(e) {
    pg(e, 0);
  }
  function $l(e) {
    var n = Fe(e);
    if (Al(n)) return e;
  }
  function km(e, n) {
    if (e === "change") return n;
  }
  var Om = !1;
  if (ba) {
    var ru;
    if (ba) {
      var iu = "oninput" in document;
      if (!iu) {
        var Lm = document.createElement("div");
        Lm.setAttribute("oninput", "return;"), iu = typeof Lm.oninput == "function";
      }
      ru = iu;
    } else ru = !1;
    Om = ru && (!document.documentMode || 9 < document.documentMode);
  }
  function Um() {
    ds && (ds.detachEvent("onpropertychange", Bm), fs = ds = null);
  }
  function Bm(e) {
    if (e.propertyName === "value" && $l(fs)) {
      var n = [];
      zm(
        n,
        fs,
        e,
        Kc(e)
      ), Sm(gw, n);
    }
  }
  function yw(e, n, r) {
    e === "focusin" ? (Um(), ds = n, fs = r, ds.attachEvent("onpropertychange", Bm)) : e === "focusout" && Um();
  }
  function bw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $l(fs);
  }
  function xw(e, n) {
    if (e === "click") return $l(n);
  }
  function Sw(e, n) {
    if (e === "input" || e === "change")
      return $l(n);
  }
  function ww(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var En = typeof Object.is == "function" ? Object.is : ww;
  function hs(e, n) {
    if (En(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), s = Object.keys(n);
    if (r.length !== s.length) return !1;
    for (s = 0; s < r.length; s++) {
      var u = r[s];
      if (!bt.call(n, u) || !En(e[u], n[u]))
        return !1;
    }
    return !0;
  }
  function $m(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Vm(e, n) {
    var r = $m(e);
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
      r = $m(r);
    }
  }
  function Hm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Hm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function qm(e) {
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
  function su(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Ew = ba && "documentMode" in document && 11 >= document.documentMode, ci = null, lu = null, ms = null, ou = !1;
  function Im(e, n, r) {
    var s = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    ou || ci == null || ci !== Dl(s) || (s = ci, "selectionStart" in s && su(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), ms && hs(ms, s) || (ms = s, s = Ro(lu, "onSelect"), 0 < s.length && (n = new Ul(
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
  }, cu = {}, Fm = {};
  ba && (Fm = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function Mr(e) {
    if (cu[e]) return cu[e];
    if (!ui[e]) return e;
    var n = ui[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Fm)
        return cu[e] = n[r];
    return e;
  }
  var Ym = Mr("animationend"), Gm = Mr("animationiteration"), Xm = Mr("animationstart"), jw = Mr("transitionrun"), Nw = Mr("transitionstart"), Tw = Mr("transitioncancel"), Pm = Mr("transitionend"), Km = /* @__PURE__ */ new Map(), uu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  uu.push("scrollEnd");
  function ea(e, n) {
    Km.set(e, n), Kt(n, [e]);
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
  }, Un = [], di = 0, du = 0;
  function Hl() {
    for (var e = di, n = du = di = 0; n < e; ) {
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
      f !== 0 && Qm(r, u, f);
    }
  }
  function ql(e, n, r, s) {
    Un[di++] = e, Un[di++] = n, Un[di++] = r, Un[di++] = s, du |= s, e.lanes |= s, e = e.alternate, e !== null && (e.lanes |= s);
  }
  function fu(e, n, r, s) {
    return ql(e, n, r, s), Il(e);
  }
  function _r(e, n) {
    return ql(e, null, null, n), Il(e);
  }
  function Qm(e, n, r) {
    e.lanes |= r;
    var s = e.alternate;
    s !== null && (s.lanes |= r);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= r, s = f.alternate, s !== null && (s.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && n !== null && (u = 31 - Yt(r), e = f.hiddenUpdates, s = e[u], s === null ? e[u] = [n] : s.push(n), n.lane = r | 536870912), f) : null;
  }
  function Il(e) {
    if (50 < Ls)
      throw Ls = 0, Sd = null, Error(l(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function Cw(e, n, r, s) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jn(e, n, r, s) {
    return new Cw(e, n, r, s);
  }
  function hu(e) {
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
  function Zm(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Fl(e, n, r, s, u, f) {
    var x = 0;
    if (s = e, typeof e == "function") hu(e) && (x = 1);
    else if (typeof e == "string")
      x = DE(
        e,
        r,
        le.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case q:
          return e = jn(31, r, n, u), e.elementType = q, e.lanes = f, e;
        case N:
          return Ar(r.children, u, f, n);
        case R:
          x = 8, u |= 24;
          break;
        case T:
          return e = jn(12, r, n, u | 2), e.elementType = T, e.lanes = f, e;
        case I:
          return e = jn(13, r, n, u), e.elementType = I, e.lanes = f, e;
        case J:
          return e = jn(19, r, n, u), e.elementType = J, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case z:
                x = 10;
                break e;
              case O:
                x = 9;
                break e;
              case _:
                x = 11;
                break e;
              case ne:
                x = 14;
                break e;
              case A:
                x = 16, s = null;
                break e;
            }
          x = 29, r = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), s = null;
      }
    return n = jn(x, r, n, u), n.elementType = e, n.type = s, n.lanes = f, n;
  }
  function Ar(e, n, r, s) {
    return e = jn(7, e, s, n), e.lanes = r, e;
  }
  function mu(e, n, r) {
    return e = jn(6, e, null, n), e.lanes = r, e;
  }
  function Jm(e) {
    var n = jn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function pu(e, n, r) {
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
  var Wm = /* @__PURE__ */ new WeakMap();
  function Bn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = Wm.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Te(n)
      }, Wm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Te(n)
    };
  }
  var hi = [], mi = 0, Yl = null, ps = 0, $n = [], Vn = 0, Fa = null, ua = 1, da = "";
  function Sa(e, n) {
    hi[mi++] = ps, hi[mi++] = Yl, Yl = e, ps = n;
  }
  function ep(e, n, r) {
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
  function vu(e) {
    e.return !== null && (Sa(e, 1), ep(e, 1, 0));
  }
  function gu(e) {
    for (; e === Yl; )
      Yl = hi[--mi], hi[mi] = null, ps = hi[--mi], hi[mi] = null;
    for (; e === Fa; )
      Fa = $n[--Vn], $n[Vn] = null, da = $n[--Vn], $n[Vn] = null, ua = $n[--Vn], $n[Vn] = null;
  }
  function tp(e, n) {
    $n[Vn++] = ua, $n[Vn++] = da, $n[Vn++] = Fa, ua = n.id, da = n.overflow, Fa = e;
  }
  var tn = null, gt = null, Ke = !1, Ya = null, Hn = !1, yu = Error(l(519));
  function Ga(e) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw vs(Bn(n, e)), yu;
  }
  function np(e) {
    var n = e.stateNode, r = e.type, s = e.memoizedProps;
    switch (n[pe] = e, n[ve] = s, r) {
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
        for (r = 0; r < Bs.length; r++)
          Ge(Bs[r], n);
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
        Ge("invalid", n), pm(
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
        Ge("invalid", n), gm(n, s.value, s.defaultValue, s.children);
    }
    r = s.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || s.suppressHydrationWarning === !0 || bg(n.textContent, r) ? (s.popover != null && (Ge("beforetoggle", n), Ge("toggle", n)), s.onScroll != null && Ge("scroll", n), s.onScrollEnd != null && Ge("scrollend", n), s.onClick != null && (n.onclick = ya), n = !0) : n = !1, n || Ga(e, !0);
  }
  function ap(e) {
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
    if (!Ke) return ap(e), Ke = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Ld(e.type, e.memoizedProps)), r = !r), r && gt && Ga(e), ap(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Rg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Rg(e);
    } else
      n === 27 ? (n = gt, sr(e.type) ? (e = Hd, Hd = null, gt = e) : gt = n) : gt = tn ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Dr() {
    gt = tn = null, Ke = !1;
  }
  function bu() {
    var e = Ya;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Ya = null), e;
  }
  function vs(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var xu = M(null), zr = null, wa = null;
  function Xa(e, n, r) {
    P(xu, n._currentValue), n._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = xu.current, Z(xu);
  }
  function Su(e, n, r) {
    for (; e !== null; ) {
      var s = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, s !== null && (s.childLanes |= n)) : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function wu(e, n, r, s) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var x = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var j = f;
          f = u;
          for (var L = 0; L < n.length; L++)
            if (j.context === n[L]) {
              f.lanes |= r, j = f.alternate, j !== null && (j.lanes |= r), Su(
                f.return,
                r,
                e
              ), s || (x = null);
              break e;
            }
          f = j.next;
        }
      } else if (u.tag === 18) {
        if (x = u.return, x === null) throw Error(l(341));
        x.lanes |= r, f = x.alternate, f !== null && (f.lanes |= r), Su(x, r, e), x = null;
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
  function vi(e, n, r, s) {
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
          var j = u.type;
          En(u.pendingProps.value, x.value) || (e !== null ? e.push(j) : e = [j]);
        }
      } else if (u === Ae.current) {
        if (x = u.alternate, x === null) throw Error(l(387));
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Is) : e = [Is]);
      }
      u = u.return;
    }
    e !== null && wu(
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
  function kr(e) {
    zr = e, wa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nn(e) {
    return rp(zr, e);
  }
  function Xl(e, n) {
    return zr === null && kr(e), rp(e, n);
  }
  function rp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, wa === null) {
      if (e === null) throw Error(l(308));
      wa = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else wa = wa.next = n;
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
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Eu() {
    return {
      controller: new Rw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function gs(e) {
    e.refCount--, e.refCount === 0 && Mw(_w, function() {
      e.controller.abort();
    });
  }
  var ys = null, ju = 0, gi = 0, yi = null;
  function Aw(e, n) {
    if (ys === null) {
      var r = ys = [];
      ju = 0, gi = Cd(), yi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          r.push(s);
        }
      };
    }
    return ju++, n.then(ip, ip), n;
  }
  function ip() {
    if (--ju === 0 && ys !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = ys;
      ys = null, gi = 0, yi = null;
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
  var sp = k.S;
  k.S = function(e, n) {
    Iv = qt(), typeof n == "object" && n !== null && typeof n.then == "function" && Aw(e, n), sp !== null && sp(e, n);
  };
  var Or = M(null);
  function Nu() {
    var e = Or.current;
    return e !== null ? e : ft.pooledCache;
  }
  function Pl(e, n) {
    n === null ? P(Or, Or.current) : P(Or, n.pool);
  }
  function lp() {
    var e = Nu();
    return e === null ? null : { parent: Ot._currentValue, pool: e };
  }
  var bi = Error(l(460)), Tu = Error(l(474)), Kl = Error(l(542)), Ql = { then: function() {
  } };
  function op(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function cp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(ya, ya), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, dp(e), e;
      default:
        if (typeof n.status == "string") n.then(ya, ya);
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
            throw e = n.reason, dp(e), e;
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
  function up() {
    if (Ur === null) throw Error(l(459));
    var e = Ur;
    return Ur = null, e;
  }
  function dp(e) {
    if (e === bi || e === Kl)
      throw Error(l(483));
  }
  var xi = null, bs = 0;
  function Zl(e) {
    var n = bs;
    return bs += 1, xi === null && (xi = []), cp(xi, e, n);
  }
  function xs(e, n) {
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
  function fp(e) {
    function n(H, $) {
      if (e) {
        var G = H.deletions;
        G === null ? (H.deletions = [$], H.flags |= 16) : G.push($);
      }
    }
    function r(H, $) {
      if (!e) return null;
      for (; $ !== null; )
        n(H, $), $ = $.sibling;
      return null;
    }
    function s(H) {
      for (var $ = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? $.set(H.key, H) : $.set(H.index, H), H = H.sibling;
      return $;
    }
    function u(H, $) {
      return H = xa(H, $), H.index = 0, H.sibling = null, H;
    }
    function f(H, $, G) {
      return H.index = G, e ? (G = H.alternate, G !== null ? (G = G.index, G < $ ? (H.flags |= 67108866, $) : G) : (H.flags |= 67108866, $)) : (H.flags |= 1048576, $);
    }
    function x(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function j(H, $, G, se) {
      return $ === null || $.tag !== 6 ? ($ = mu(G, H.mode, se), $.return = H, $) : ($ = u($, G), $.return = H, $);
    }
    function L(H, $, G, se) {
      var Ce = G.type;
      return Ce === N ? ae(
        H,
        $,
        G.props.children,
        se,
        G.key
      ) : $ !== null && ($.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === A && Lr(Ce) === $.type) ? ($ = u($, G.props), xs($, G), $.return = H, $) : ($ = Fl(
        G.type,
        G.key,
        G.props,
        null,
        H.mode,
        se
      ), xs($, G), $.return = H, $);
    }
    function X(H, $, G, se) {
      return $ === null || $.tag !== 4 || $.stateNode.containerInfo !== G.containerInfo || $.stateNode.implementation !== G.implementation ? ($ = pu(G, H.mode, se), $.return = H, $) : ($ = u($, G.children || []), $.return = H, $);
    }
    function ae(H, $, G, se, Ce) {
      return $ === null || $.tag !== 7 ? ($ = Ar(
        G,
        H.mode,
        se,
        Ce
      ), $.return = H, $) : ($ = u($, G), $.return = H, $);
    }
    function oe(H, $, G) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return $ = mu(
          "" + $,
          H.mode,
          G
        ), $.return = H, $;
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case E:
            return G = Fl(
              $.type,
              $.key,
              $.props,
              null,
              H.mode,
              G
            ), xs(G, $), G.return = H, G;
          case w:
            return $ = pu(
              $,
              H.mode,
              G
            ), $.return = H, $;
          case A:
            return $ = Lr($), oe(H, $, G);
        }
        if (W($) || re($))
          return $ = Ar(
            $,
            H.mode,
            G,
            null
          ), $.return = H, $;
        if (typeof $.then == "function")
          return oe(H, Zl($), G);
        if ($.$$typeof === z)
          return oe(
            H,
            Xl(H, $),
            G
          );
        Jl(H, $);
      }
      return null;
    }
    function K(H, $, G, se) {
      var Ce = $ !== null ? $.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return Ce !== null ? null : j(H, $, "" + G, se);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case E:
            return G.key === Ce ? L(H, $, G, se) : null;
          case w:
            return G.key === Ce ? X(H, $, G, se) : null;
          case A:
            return G = Lr(G), K(H, $, G, se);
        }
        if (W(G) || re(G))
          return Ce !== null ? null : ae(H, $, G, se, null);
        if (typeof G.then == "function")
          return K(
            H,
            $,
            Zl(G),
            se
          );
        if (G.$$typeof === z)
          return K(
            H,
            $,
            Xl(H, G),
            se
          );
        Jl(H, G);
      }
      return null;
    }
    function ee(H, $, G, se, Ce) {
      if (typeof se == "string" && se !== "" || typeof se == "number" || typeof se == "bigint")
        return H = H.get(G) || null, j($, H, "" + se, Ce);
      if (typeof se == "object" && se !== null) {
        switch (se.$$typeof) {
          case E:
            return H = H.get(
              se.key === null ? G : se.key
            ) || null, L($, H, se, Ce);
          case w:
            return H = H.get(
              se.key === null ? G : se.key
            ) || null, X($, H, se, Ce);
          case A:
            return se = Lr(se), ee(
              H,
              $,
              G,
              se,
              Ce
            );
        }
        if (W(se) || re(se))
          return H = H.get(G) || null, ae($, H, se, Ce, null);
        if (typeof se.then == "function")
          return ee(
            H,
            $,
            G,
            Zl(se),
            Ce
          );
        if (se.$$typeof === z)
          return ee(
            H,
            $,
            G,
            Xl($, se),
            Ce
          );
        Jl($, se);
      }
      return null;
    }
    function xe(H, $, G, se) {
      for (var Ce = null, Je = null, je = $, Be = $ = 0, Pe = null; je !== null && Be < G.length; Be++) {
        je.index > Be ? (Pe = je, je = null) : Pe = je.sibling;
        var We = K(
          H,
          je,
          G[Be],
          se
        );
        if (We === null) {
          je === null && (je = Pe);
          break;
        }
        e && je && We.alternate === null && n(H, je), $ = f(We, $, Be), Je === null ? Ce = We : Je.sibling = We, Je = We, je = Pe;
      }
      if (Be === G.length)
        return r(H, je), Ke && Sa(H, Be), Ce;
      if (je === null) {
        for (; Be < G.length; Be++)
          je = oe(H, G[Be], se), je !== null && ($ = f(
            je,
            $,
            Be
          ), Je === null ? Ce = je : Je.sibling = je, Je = je);
        return Ke && Sa(H, Be), Ce;
      }
      for (je = s(je); Be < G.length; Be++)
        Pe = ee(
          je,
          H,
          Be,
          G[Be],
          se
        ), Pe !== null && (e && Pe.alternate !== null && je.delete(
          Pe.key === null ? Be : Pe.key
        ), $ = f(
          Pe,
          $,
          Be
        ), Je === null ? Ce = Pe : Je.sibling = Pe, Je = Pe);
      return e && je.forEach(function(dr) {
        return n(H, dr);
      }), Ke && Sa(H, Be), Ce;
    }
    function _e(H, $, G, se) {
      if (G == null) throw Error(l(151));
      for (var Ce = null, Je = null, je = $, Be = $ = 0, Pe = null, We = G.next(); je !== null && !We.done; Be++, We = G.next()) {
        je.index > Be ? (Pe = je, je = null) : Pe = je.sibling;
        var dr = K(H, je, We.value, se);
        if (dr === null) {
          je === null && (je = Pe);
          break;
        }
        e && je && dr.alternate === null && n(H, je), $ = f(dr, $, Be), Je === null ? Ce = dr : Je.sibling = dr, Je = dr, je = Pe;
      }
      if (We.done)
        return r(H, je), Ke && Sa(H, Be), Ce;
      if (je === null) {
        for (; !We.done; Be++, We = G.next())
          We = oe(H, We.value, se), We !== null && ($ = f(We, $, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
        return Ke && Sa(H, Be), Ce;
      }
      for (je = s(je); !We.done; Be++, We = G.next())
        We = ee(je, H, Be, We.value, se), We !== null && (e && We.alternate !== null && je.delete(We.key === null ? Be : We.key), $ = f(We, $, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
      return e && je.forEach(function(IE) {
        return n(H, IE);
      }), Ke && Sa(H, Be), Ce;
    }
    function ct(H, $, G, se) {
      if (typeof G == "object" && G !== null && G.type === N && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case E:
            e: {
              for (var Ce = G.key; $ !== null; ) {
                if ($.key === Ce) {
                  if (Ce = G.type, Ce === N) {
                    if ($.tag === 7) {
                      r(
                        H,
                        $.sibling
                      ), se = u(
                        $,
                        G.props.children
                      ), se.return = H, H = se;
                      break e;
                    }
                  } else if ($.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === A && Lr(Ce) === $.type) {
                    r(
                      H,
                      $.sibling
                    ), se = u($, G.props), xs(se, G), se.return = H, H = se;
                    break e;
                  }
                  r(H, $);
                  break;
                } else n(H, $);
                $ = $.sibling;
              }
              G.type === N ? (se = Ar(
                G.props.children,
                H.mode,
                se,
                G.key
              ), se.return = H, H = se) : (se = Fl(
                G.type,
                G.key,
                G.props,
                null,
                H.mode,
                se
              ), xs(se, G), se.return = H, H = se);
            }
            return x(H);
          case w:
            e: {
              for (Ce = G.key; $ !== null; ) {
                if ($.key === Ce)
                  if ($.tag === 4 && $.stateNode.containerInfo === G.containerInfo && $.stateNode.implementation === G.implementation) {
                    r(
                      H,
                      $.sibling
                    ), se = u($, G.children || []), se.return = H, H = se;
                    break e;
                  } else {
                    r(H, $);
                    break;
                  }
                else n(H, $);
                $ = $.sibling;
              }
              se = pu(G, H.mode, se), se.return = H, H = se;
            }
            return x(H);
          case A:
            return G = Lr(G), ct(
              H,
              $,
              G,
              se
            );
        }
        if (W(G))
          return xe(
            H,
            $,
            G,
            se
          );
        if (re(G)) {
          if (Ce = re(G), typeof Ce != "function") throw Error(l(150));
          return G = Ce.call(G), _e(
            H,
            $,
            G,
            se
          );
        }
        if (typeof G.then == "function")
          return ct(
            H,
            $,
            Zl(G),
            se
          );
        if (G.$$typeof === z)
          return ct(
            H,
            $,
            Xl(H, G),
            se
          );
        Jl(H, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint" ? (G = "" + G, $ !== null && $.tag === 6 ? (r(H, $.sibling), se = u($, G), se.return = H, H = se) : (r(H, $), se = mu(G, H.mode, se), se.return = H, H = se), x(H)) : r(H, $);
    }
    return function(H, $, G, se) {
      try {
        bs = 0;
        var Ce = ct(
          H,
          $,
          G,
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
  var Br = fp(!0), hp = fp(!1), Pa = !1;
  function Cu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ru(e, n) {
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
      return u === null ? n.next = n : (n.next = u.next, u.next = n), s.pending = n, n = Il(e), Qm(e, null, r), n;
    }
    return ql(e, s, n, r), Il(e);
  }
  function Ss(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, sn(e, r);
    }
  }
  function Mu(e, n) {
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
  var _u = !1;
  function ws() {
    if (_u) {
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function Es(e, n, r, s) {
    _u = !1;
    var u = e.updateQueue;
    Pa = !1;
    var f = u.firstBaseUpdate, x = u.lastBaseUpdate, j = u.shared.pending;
    if (j !== null) {
      u.shared.pending = null;
      var L = j, X = L.next;
      L.next = null, x === null ? f = X : x.next = X, x = L;
      var ae = e.alternate;
      ae !== null && (ae = ae.updateQueue, j = ae.lastBaseUpdate, j !== x && (j === null ? ae.firstBaseUpdate = X : j.next = X, ae.lastBaseUpdate = L));
    }
    if (f !== null) {
      var oe = u.baseState;
      x = 0, ae = X = L = null, j = f;
      do {
        var K = j.lane & -536870913, ee = K !== j.lane;
        if (ee ? (Xe & K) === K : (s & K) === K) {
          K !== 0 && K === gi && (_u = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: j.tag,
            payload: j.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, _e = j;
            K = n;
            var ct = r;
            switch (_e.tag) {
              case 1:
                if (xe = _e.payload, typeof xe == "function") {
                  oe = xe.call(ct, oe, K);
                  break e;
                }
                oe = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = _e.payload, K = typeof xe == "function" ? xe.call(ct, oe, K) : xe, K == null) break e;
                oe = v({}, oe, K);
                break e;
              case 2:
                Pa = !0;
            }
          }
          K = j.callback, K !== null && (e.flags |= 64, ee && (e.flags |= 8192), ee = u.callbacks, ee === null ? u.callbacks = [K] : ee.push(K));
        } else
          ee = {
            lane: K,
            tag: j.tag,
            payload: j.payload,
            callback: j.callback,
            next: null
          }, ae === null ? (X = ae = ee, L = oe) : ae = ae.next = ee, x |= K;
        if (j = j.next, j === null) {
          if (j = u.shared.pending, j === null)
            break;
          ee = j, j = ee.next, ee.next = null, u.lastBaseUpdate = ee, u.shared.pending = null;
        }
      } while (!0);
      ae === null && (L = oe), u.baseState = L, u.firstBaseUpdate = X, u.lastBaseUpdate = ae, f === null && (u.shared.lanes = 0), tr |= x, e.lanes = x, e.memoizedState = oe;
    }
  }
  function mp(e, n) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(n);
  }
  function pp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        mp(r[e], n);
  }
  var Si = M(null), Wl = M(0);
  function vp(e, n) {
    e = Da, P(Wl, e), P(Si, n), Da = e | n.baseLanes;
  }
  function Au() {
    P(Wl, Da), P(Si, Si.current);
  }
  function Du() {
    Da = Wl.current, Z(Si), Z(Wl);
  }
  var Nn = M(null), qn = null;
  function Za(e) {
    var n = e.alternate;
    P(Rt, Rt.current & 1), P(Nn, e), qn === null && (n === null || Si.current !== null || n.memoizedState !== null) && (qn = e);
  }
  function zu(e) {
    P(Rt, Rt.current), P(Nn, e), qn === null && (qn = e);
  }
  function gp(e) {
    e.tag === 22 ? (P(Rt, Rt.current), P(Nn, e), qn === null && (qn = e)) : Ja();
  }
  function Ja() {
    P(Rt, Rt.current), P(Nn, Nn.current);
  }
  function Tn(e) {
    Z(Nn), qn === e && (qn = null), Z(Rt);
  }
  var Rt = M(0);
  function eo(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || $d(r) || Vd(r)))
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
  var ja = 0, Ue = null, lt = null, Lt = null, to = !1, wi = !1, $r = !1, no = 0, js = 0, Ei = null, zw = 0;
  function jt() {
    throw Error(l(321));
  }
  function ku(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!En(e[r], n[r])) return !1;
    return !0;
  }
  function Ou(e, n, r, s, u, f) {
    return ja = f, Ue = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, k.H = e === null || e.memoizedState === null ? ev : Qu, $r = !1, f = r(s, u), $r = !1, wi && (f = bp(
      n,
      r,
      s,
      u
    )), yp(e), f;
  }
  function yp(e) {
    k.H = Cs;
    var n = lt !== null && lt.next !== null;
    if (ja = 0, Lt = lt = Ue = null, to = !1, js = 0, Ei = null, n) throw Error(l(300));
    e === null || Ut || (e = e.dependencies, e !== null && Gl(e) && (Ut = !0));
  }
  function bp(e, n, r, s) {
    Ue = e;
    var u = 0;
    do {
      if (wi && (Ei = null), js = 0, wi = !1, 25 <= u) throw Error(l(301));
      if (u += 1, Lt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      k.H = tv, f = n(r, s);
    } while (wi);
    return f;
  }
  function kw() {
    var e = k.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ns(n) : n, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), n;
  }
  function Lu() {
    var e = no !== 0;
    return no = 0, e;
  }
  function Uu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Bu(e) {
    if (to) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      to = !1;
    }
    ja = 0, Lt = lt = Ue = null, wi = !1, js = no = 0, Ei = null;
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
  function Ns(e) {
    var n = js;
    return js += 1, Ei === null && (Ei = []), e = cp(Ei, e, n), n = Ue, (Lt === null ? n.memoizedState : Lt.next) === null && (n = n.alternate, k.H = n === null || n.memoizedState === null ? ev : Qu), e;
  }
  function ro(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ns(e);
      if (e.$$typeof === z) return nn(e);
    }
    throw Error(l(438, String(e)));
  }
  function $u(e) {
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
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = ao(), Ue.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), s = 0; s < e; s++)
        r[s] = F;
    return n.index++, r;
  }
  function Na(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function io(e) {
    var n = Mt();
    return Vu(n, lt, e);
  }
  function Vu(e, n, r) {
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
      var j = x = null, L = null, X = n, ae = !1;
      do {
        var oe = X.lane & -536870913;
        if (oe !== X.lane ? (Xe & oe) === oe : (ja & oe) === oe) {
          var K = X.revertLane;
          if (K === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }), oe === gi && (ae = !0);
          else if ((ja & K) === K) {
            X = X.next, K === gi && (ae = !0);
            continue;
          } else
            oe = {
              lane: 0,
              revertLane: X.revertLane,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }, L === null ? (j = L = oe, x = f) : L = L.next = oe, Ue.lanes |= K, tr |= K;
          oe = X.action, $r && r(f, oe), f = X.hasEagerState ? X.eagerState : r(f, oe);
        } else
          K = {
            lane: oe,
            revertLane: X.revertLane,
            gesture: X.gesture,
            action: X.action,
            hasEagerState: X.hasEagerState,
            eagerState: X.eagerState,
            next: null
          }, L === null ? (j = L = K, x = f) : L = L.next = K, Ue.lanes |= oe, tr |= oe;
        X = X.next;
      } while (X !== null && X !== n);
      if (L === null ? x = f : L.next = j, !En(f, e.memoizedState) && (Ut = !0, ae && (r = yi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = x, e.baseQueue = L, s.lastRenderedState = f;
    }
    return u === null && (s.lanes = 0), [e.memoizedState, s.dispatch];
  }
  function Hu(e) {
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
      En(f, n.memoizedState) || (Ut = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), r.lastRenderedState = f;
    }
    return [f, s];
  }
  function xp(e, n, r) {
    var s = Ue, u = Mt(), f = Ke;
    if (f) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else r = n();
    var x = !En(
      (lt || u).memoizedState,
      r
    );
    if (x && (u.memoizedState = r, Ut = !0), u = u.queue, Fu(Ep.bind(null, s, u, e), [
      e
    ]), u.getSnapshot !== n || x || Lt !== null && Lt.memoizedState.tag & 1) {
      if (s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        wp.bind(
          null,
          s,
          u,
          r,
          n
        ),
        null
      ), ft === null) throw Error(l(349));
      f || (ja & 127) !== 0 || Sp(s, n, r);
    }
    return r;
  }
  function Sp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ue.updateQueue, n === null ? (n = ao(), Ue.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function wp(e, n, r, s) {
    n.value = r, n.getSnapshot = s, jp(n) && Np(e);
  }
  function Ep(e, n, r) {
    return r(function() {
      jp(n) && Np(e);
    });
  }
  function jp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !En(e, r);
    } catch {
      return !0;
    }
  }
  function Np(e) {
    var n = _r(e, 2);
    n !== null && bn(n, e, 2);
  }
  function qu(e) {
    var n = fn();
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
      lastRenderedReducer: Na,
      lastRenderedState: e
    }, n;
  }
  function Tp(e, n, r, s) {
    return e.baseState = r, Vu(
      e,
      lt,
      typeof s == "function" ? s : Na
    );
  }
  function Ow(e, n, r, s, u) {
    if (oo(e)) throw Error(l(485));
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
      k.T !== null ? r(!0) : f.isTransition = !1, s(f), r = n.pending, r === null ? (f.next = n.pending = f, Cp(n, f)) : (f.next = r.next, n.pending = r.next = f);
    }
  }
  function Cp(e, n) {
    var r = n.action, s = n.payload, u = e.state;
    if (n.isTransition) {
      var f = k.T, x = {};
      k.T = x;
      try {
        var j = r(u, s), L = k.S;
        L !== null && L(x, j), Rp(e, n, j);
      } catch (X) {
        Iu(e, n, X);
      } finally {
        f !== null && x.types !== null && (f.types = x.types), k.T = f;
      }
    } else
      try {
        f = r(u, s), Rp(e, n, f);
      } catch (X) {
        Iu(e, n, X);
      }
  }
  function Rp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(s) {
        Mp(e, n, s);
      },
      function(s) {
        return Iu(e, n, s);
      }
    ) : Mp(e, n, r);
  }
  function Mp(e, n, r) {
    n.status = "fulfilled", n.value = r, _p(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Cp(e, r)));
  }
  function Iu(e, n, r) {
    var s = e.pending;
    if (e.pending = null, s !== null) {
      s = s.next;
      do
        n.status = "rejected", n.reason = r, _p(n), n = n.next;
      while (n !== s);
    }
    e.action = null;
  }
  function _p(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Ap(e, n) {
    return n;
  }
  function Dp(e, n) {
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
    return r = fn(), r.memoizedState = r.baseState = n, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ap,
      lastRenderedState: n
    }, r.queue = s, r = Zp.bind(
      null,
      Ue,
      s
    ), s.dispatch = r, s = qu(!1), f = Ku.bind(
      null,
      Ue,
      !1,
      s.queue
    ), s = fn(), u = {
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
  function zp(e) {
    var n = Mt();
    return kp(n, lt, e);
  }
  function kp(e, n, r) {
    if (n = Vu(
      e,
      n,
      Ap
    )[0], e = io(Na)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var s = Ns(n);
      } catch (x) {
        throw x === bi ? Kl : x;
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
  function Op(e) {
    var n = Mt(), r = lt;
    if (r !== null)
      return kp(n, r, e);
    Mt(), n = n.memoizedState, r = Mt();
    var s = r.queue.dispatch;
    return r.memoizedState = e, [n, s, !1];
  }
  function ji(e, n, r, s) {
    return e = { tag: e, create: r, deps: s, inst: n, next: null }, n = Ue.updateQueue, n === null && (n = ao(), Ue.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (s = r.next, r.next = e, e.next = s, n.lastEffect = e), e;
  }
  function Lp() {
    return Mt().memoizedState;
  }
  function so(e, n, r, s) {
    var u = fn();
    Ue.flags |= e, u.memoizedState = ji(
      1 | n,
      { destroy: void 0 },
      r,
      s === void 0 ? null : s
    );
  }
  function lo(e, n, r, s) {
    var u = Mt();
    s = s === void 0 ? null : s;
    var f = u.memoizedState.inst;
    lt !== null && s !== null && ku(s, lt.memoizedState.deps) ? u.memoizedState = ji(n, f, r, s) : (Ue.flags |= e, u.memoizedState = ji(
      1 | n,
      f,
      r,
      s
    ));
  }
  function Up(e, n) {
    so(8390656, 8, e, n);
  }
  function Fu(e, n) {
    lo(2048, 8, e, n);
  }
  function Uw(e) {
    Ue.flags |= 4;
    var n = Ue.updateQueue;
    if (n === null)
      n = ao(), Ue.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Bp(e) {
    var n = Mt().memoizedState;
    return Uw({ ref: n, nextImpl: e }), function() {
      if ((tt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function $p(e, n) {
    return lo(4, 2, e, n);
  }
  function Vp(e, n) {
    return lo(4, 4, e, n);
  }
  function Hp(e, n) {
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
  function qp(e, n, r) {
    r = r != null ? r.concat([e]) : null, lo(4, 4, Hp.bind(null, n, e), r);
  }
  function Yu() {
  }
  function Ip(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    return n !== null && ku(n, s[1]) ? s[0] : (r.memoizedState = [e, n], e);
  }
  function Fp(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    if (n !== null && ku(n, s[1]))
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
  function Gu(e, n, r) {
    return r === void 0 || (ja & 1073741824) !== 0 && (Xe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Yv(), Ue.lanes |= e, tr |= e, r);
  }
  function Yp(e, n, r, s) {
    return En(r, n) ? r : Si.current !== null ? (e = Gu(e, r, s), En(e, n) || (Ut = !0), e) : (ja & 42) === 0 || (ja & 1073741824) !== 0 && (Xe & 261930) === 0 ? (Ut = !0, e.memoizedState = r) : (e = Yv(), Ue.lanes |= e, tr |= e, n);
  }
  function Gp(e, n, r, s, u) {
    var f = C.p;
    C.p = f !== 0 && 8 > f ? f : 8;
    var x = k.T, j = {};
    k.T = j, Ku(e, !1, n, r);
    try {
      var L = u(), X = k.S;
      if (X !== null && X(j, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ae = Dw(
          L,
          s
        );
        Ts(
          e,
          n,
          ae,
          Mn(e)
        );
      } else
        Ts(
          e,
          n,
          s,
          Mn(e)
        );
    } catch (oe) {
      Ts(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: oe },
        Mn()
      );
    } finally {
      C.p = f, x !== null && j.types !== null && (x.types = j.types), k.T = x;
    }
  }
  function Bw() {
  }
  function Xu(e, n, r, s) {
    if (e.tag !== 5) throw Error(l(476));
    var u = Xp(e).queue;
    Gp(
      e,
      u,
      n,
      U,
      r === null ? Bw : function() {
        return Pp(e), r(s);
      }
    );
  }
  function Xp(e) {
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
  function Pp(e) {
    var n = Xp(e);
    n.next === null && (n = e.alternate.memoizedState), Ts(
      e,
      n.next.queue,
      {},
      Mn()
    );
  }
  function Pu() {
    return nn(Is);
  }
  function Kp() {
    return Mt().memoizedState;
  }
  function Qp() {
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
          s !== null && (bn(s, n, r), Ss(s, n, r)), n = { cache: Eu() }, e.payload = n;
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
    }, oo(e) ? Jp(n, r) : (r = fu(e, n, r, s), r !== null && (bn(r, e, s), Wp(r, n, s)));
  }
  function Zp(e, n, r) {
    var s = Mn();
    Ts(e, n, r, s);
  }
  function Ts(e, n, r, s) {
    var u = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (oo(e)) Jp(n, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var x = n.lastRenderedState, j = f(x, r);
          if (u.hasEagerState = !0, u.eagerState = j, En(j, x))
            return ql(e, n, u, 0), ft === null && Hl(), !1;
        } catch {
        } finally {
        }
      if (r = fu(e, n, u, s), r !== null)
        return bn(r, e, s), Wp(r, n, s), !0;
    }
    return !1;
  }
  function Ku(e, n, r, s) {
    if (s = {
      lane: 2,
      revertLane: Cd(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oo(e)) {
      if (n) throw Error(l(479));
    } else
      n = fu(
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
  function Jp(e, n) {
    wi = to = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function Wp(e, n, r) {
    if ((r & 4194048) !== 0) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, sn(e, r);
    }
  }
  var Cs = {
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
  Cs.useEffectEvent = jt;
  var ev = {
    readContext: nn,
    use: ro,
    useCallback: function(e, n) {
      return fn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: nn,
    useEffect: Up,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, so(
        4194308,
        4,
        Hp.bind(null, n, e),
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
      var s = fn();
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
      var n = fn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = qu(e);
      var n = e.queue, r = Zp.bind(null, Ue, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Yu,
    useDeferredValue: function(e, n) {
      var r = fn();
      return Gu(r, e, n);
    },
    useTransition: function() {
      var e = qu(!1);
      return e = Gp.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), fn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var s = Ue, u = fn();
      if (Ke) {
        if (r === void 0)
          throw Error(l(407));
        r = r();
      } else {
        if (r = n(), ft === null)
          throw Error(l(349));
        (Xe & 127) !== 0 || Sp(s, n, r);
      }
      u.memoizedState = r;
      var f = { value: r, getSnapshot: n };
      return u.queue = f, Up(Ep.bind(null, s, f, e), [
        e
      ]), s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        wp.bind(
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
        r = zw++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Pu,
    useFormState: Dp,
    useActionState: Dp,
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
      return n.queue = r, n = Ku.bind(
        null,
        Ue,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: $u,
    useCacheRefresh: function() {
      return fn().memoizedState = $w.bind(
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
  }, Qu = {
    readContext: nn,
    use: ro,
    useCallback: Ip,
    useContext: nn,
    useEffect: Fu,
    useImperativeHandle: qp,
    useInsertionEffect: $p,
    useLayoutEffect: Vp,
    useMemo: Fp,
    useReducer: io,
    useRef: Lp,
    useState: function() {
      return io(Na);
    },
    useDebugValue: Yu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return Yp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = io(Na)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ns(e),
        n
      ];
    },
    useSyncExternalStore: xp,
    useId: Kp,
    useHostTransitionStatus: Pu,
    useFormState: zp,
    useActionState: zp,
    useOptimistic: function(e, n) {
      var r = Mt();
      return Tp(r, lt, e, n);
    },
    useMemoCache: $u,
    useCacheRefresh: Qp
  };
  Qu.useEffectEvent = Bp;
  var tv = {
    readContext: nn,
    use: ro,
    useCallback: Ip,
    useContext: nn,
    useEffect: Fu,
    useImperativeHandle: qp,
    useInsertionEffect: $p,
    useLayoutEffect: Vp,
    useMemo: Fp,
    useReducer: Hu,
    useRef: Lp,
    useState: function() {
      return Hu(Na);
    },
    useDebugValue: Yu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return lt === null ? Gu(r, e, n) : Yp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Hu(Na)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ns(e),
        n
      ];
    },
    useSyncExternalStore: xp,
    useId: Kp,
    useHostTransitionStatus: Pu,
    useFormState: Op,
    useActionState: Op,
    useOptimistic: function(e, n) {
      var r = Mt();
      return lt !== null ? Tp(r, lt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: $u,
    useCacheRefresh: Qp
  };
  tv.useEffectEvent = Bp;
  function Zu(e, n, r, s) {
    n = e.memoizedState, r = r(s, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Ju = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), u = Ka(s);
      u.payload = n, r != null && (u.callback = r), n = Qa(e, u, s), n !== null && (bn(n, e, s), Ss(n, e, s));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), u = Ka(s);
      u.tag = 1, u.payload = n, r != null && (u.callback = r), n = Qa(e, u, s), n !== null && (bn(n, e, s), Ss(n, e, s));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Mn(), s = Ka(r);
      s.tag = 2, n != null && (s.callback = n), n = Qa(e, s, r), n !== null && (bn(n, e, r), Ss(n, e, r));
    }
  };
  function nv(e, n, r, s, u, f, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, f, x) : n.prototype && n.prototype.isPureReactComponent ? !hs(r, s) || !hs(u, f) : !0;
  }
  function av(e, n, r, s) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, s), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, s), n.state !== e && Ju.enqueueReplaceState(n, n.state, null);
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
  function rv(e) {
    Vl(e);
  }
  function iv(e) {
    console.error(e);
  }
  function sv(e) {
    Vl(e);
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
  function lv(e, n, r) {
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
  function Wu(e, n, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      co(e, n);
    }, r;
  }
  function ov(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function cv(e, n, r, s) {
    var u = r.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = s.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        lv(n, r, s);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      lv(n, r, s), typeof u != "function" && (nr === null ? nr = /* @__PURE__ */ new Set([this]) : nr.add(this));
      var j = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: j !== null ? j : ""
      });
    });
  }
  function Hw(e, n, r, s, u) {
    if (r.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (n = r.alternate, n !== null && vi(
        n,
        r,
        u,
        !0
      ), r = Nn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return qn === null ? wo() : r.alternate === null && Nt === 0 && (Nt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = u, s === Ql ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([s]) : n.add(s), jd(e, s, u)), !1;
          case 22:
            return r.flags |= 65536, s === Ql ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([s]) : r.add(s)), jd(e, s, u)), !1;
        }
        throw Error(l(435, r.tag));
      }
      return jd(e, s, u), wo(), !1;
    }
    if (Ke)
      return n = Nn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, s !== yu && (e = Error(l(422), { cause: s }), vs(Bn(e, r)))) : (s !== yu && (n = Error(l(423), {
        cause: s
      }), vs(
        Bn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, s = Bn(s, r), u = Wu(
        e.stateNode,
        s,
        u
      ), Mu(e, u), Nt !== 4 && (Nt = 2)), !1;
    var f = Error(l(520), { cause: s });
    if (f = Bn(f, r), Os === null ? Os = [f] : Os.push(f), Nt !== 4 && (Nt = 2), n === null) return !0;
    s = Bn(s, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = u & -u, r.lanes |= e, e = Wu(r.stateNode, s, e), Mu(r, e), !1;
        case 1:
          if (n = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (nr === null || !nr.has(f))))
            return r.flags |= 65536, u &= -u, r.lanes |= u, u = ov(u), cv(
              u,
              e,
              r,
              s
            ), Mu(r, u), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var ed = Error(l(461)), Ut = !1;
  function an(e, n, r, s) {
    n.child = e === null ? hp(n, null, r, s) : Br(
      n,
      e.child,
      r,
      s
    );
  }
  function uv(e, n, r, s, u) {
    r = r.render;
    var f = n.ref;
    if ("ref" in s) {
      var x = {};
      for (var j in s)
        j !== "ref" && (x[j] = s[j]);
    } else x = s;
    return kr(n), s = Ou(
      e,
      n,
      r,
      x,
      f,
      u
    ), j = Lu(), e !== null && !Ut ? (Uu(e, n, u), Ta(e, n, u)) : (Ke && j && vu(n), n.flags |= 1, an(e, n, s, u), n.child);
  }
  function dv(e, n, r, s, u) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !hu(f) && f.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = f, fv(
        e,
        n,
        f,
        s,
        u
      )) : (e = Fl(
        r.type,
        null,
        s,
        n,
        n.mode,
        u
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !od(e, u)) {
      var x = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : hs, r(x, s) && e.ref === n.ref)
        return Ta(e, n, u);
    }
    return n.flags |= 1, e = xa(f, s), e.ref = n.ref, e.return = n, n.child = e;
  }
  function fv(e, n, r, s, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (hs(f, s) && e.ref === n.ref)
        if (Ut = !1, n.pendingProps = s = f, od(e, u))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return n.lanes = e.lanes, Ta(e, n, u);
    }
    return td(
      e,
      n,
      r,
      s,
      u
    );
  }
  function hv(e, n, r, s) {
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
        return mv(
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
        ), f !== null ? vp(n, f) : Au(), gp(n);
      else
        return s = n.lanes = 536870912, mv(
          e,
          n,
          f !== null ? f.baseLanes | r : r,
          r,
          s
        );
    } else
      f !== null ? (Pl(n, f.cachePool), vp(n, f), Ja(), n.memoizedState = null) : (e !== null && Pl(n, null), Au(), Ja());
    return an(e, n, u, r), n.child;
  }
  function Rs(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function mv(e, n, r, s, u) {
    var f = Nu();
    return f = f === null ? null : { parent: Ot._currentValue, pool: f }, n.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Pl(n, null), Au(), gp(n), e !== null && vi(e, n, s, !0), n.childLanes = u, null;
  }
  function uo(e, n) {
    return n = ho(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function pv(e, n, r) {
    return Br(n, e.child, null, r), e = uo(n, n.pendingProps), e.flags |= 2, Tn(n), n.memoizedState = null, e;
  }
  function qw(e, n, r) {
    var s = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Ke) {
        if (s.mode === "hidden")
          return e = uo(n, s), n.lanes = 536870912, Rs(null, e);
        if (zu(n), (e = gt) ? (e = Cg(
          e,
          Hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Jm(e), r.return = n, n.child = r, tn = n, gt = null)) : e = null, e === null) throw Ga(n);
        return n.lanes = 536870912, null;
      }
      return uo(n, s);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var x = f.dehydrated;
      if (zu(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = pv(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ut || vi(e, n, r, !1), u = (r & e.childLanes) !== 0, Ut || u) {
        if (s = ft, s !== null && (x = D(s, r), x !== 0 && x !== f.retryLane))
          throw f.retryLane = x, _r(e, x), bn(s, e, x), ed;
        wo(), n = pv(
          e,
          n,
          r
        );
      } else
        e = f.treeContext, gt = In(x.nextSibling), tn = n, Ke = !0, Ya = null, Hn = !1, e !== null && tp(n, e), n = uo(n, s), n.flags |= 4096;
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
  function td(e, n, r, s, u) {
    return kr(n), r = Ou(
      e,
      n,
      r,
      s,
      void 0,
      u
    ), s = Lu(), e !== null && !Ut ? (Uu(e, n, u), Ta(e, n, u)) : (Ke && s && vu(n), n.flags |= 1, an(e, n, r, u), n.child);
  }
  function vv(e, n, r, s, u, f) {
    return kr(n), n.updateQueue = null, r = bp(
      n,
      s,
      r,
      u
    ), yp(e), s = Lu(), e !== null && !Ut ? (Uu(e, n, f), Ta(e, n, f)) : (Ke && s && vu(n), n.flags |= 1, an(e, n, r, f), n.child);
  }
  function gv(e, n, r, s, u) {
    if (kr(n), n.stateNode === null) {
      var f = fi, x = r.contextType;
      typeof x == "object" && x !== null && (f = nn(x)), f = new r(s, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Ju, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = s, f.state = n.memoizedState, f.refs = {}, Cu(n), x = r.contextType, f.context = typeof x == "object" && x !== null ? nn(x) : fi, f.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (Zu(
        n,
        r,
        x,
        s
      ), f.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (x = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), x !== f.state && Ju.enqueueReplaceState(f, f.state, null), Es(n, s, f, u), ws(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !0;
    } else if (e === null) {
      f = n.stateNode;
      var j = n.memoizedProps, L = Vr(r, j);
      f.props = L;
      var X = f.context, ae = r.contextType;
      x = fi, typeof ae == "object" && ae !== null && (x = nn(ae));
      var oe = r.getDerivedStateFromProps;
      ae = typeof oe == "function" || typeof f.getSnapshotBeforeUpdate == "function", j = n.pendingProps !== j, ae || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (j || X !== x) && av(
        n,
        f,
        s,
        x
      ), Pa = !1;
      var K = n.memoizedState;
      f.state = K, Es(n, s, f, u), ws(), X = n.memoizedState, j || K !== X || Pa ? (typeof oe == "function" && (Zu(
        n,
        r,
        oe,
        s
      ), X = n.memoizedState), (L = Pa || nv(
        n,
        r,
        L,
        s,
        K,
        X,
        x
      )) ? (ae || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = s, n.memoizedState = X), f.props = s, f.state = X, f.context = x, s = L) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !1);
    } else {
      f = n.stateNode, Ru(e, n), x = n.memoizedProps, ae = Vr(r, x), f.props = ae, oe = n.pendingProps, K = f.context, X = r.contextType, L = fi, typeof X == "object" && X !== null && (L = nn(X)), j = r.getDerivedStateFromProps, (X = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x !== oe || K !== L) && av(
        n,
        f,
        s,
        L
      ), Pa = !1, K = n.memoizedState, f.state = K, Es(n, s, f, u), ws();
      var ee = n.memoizedState;
      x !== oe || K !== ee || Pa || e !== null && e.dependencies !== null && Gl(e.dependencies) ? (typeof j == "function" && (Zu(
        n,
        r,
        j,
        s
      ), ee = n.memoizedState), (ae = Pa || nv(
        n,
        r,
        ae,
        s,
        K,
        ee,
        L
      ) || e !== null && e.dependencies !== null && Gl(e.dependencies)) ? (X || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(s, ee, L), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        s,
        ee,
        L
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 1024), n.memoizedProps = s, n.memoizedState = ee), f.props = s, f.state = ee, f.context = L, s = ae) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 1024), s = !1);
    }
    return f = s, fo(e, n), s = (n.flags & 128) !== 0, f || s ? (f = n.stateNode, r = s && typeof r.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && s ? (n.child = Br(
      n,
      e.child,
      null,
      u
    ), n.child = Br(
      n,
      null,
      r,
      u
    )) : an(e, n, r, u), n.memoizedState = f.state, e = n.child) : e = Ta(
      e,
      n,
      u
    ), e;
  }
  function yv(e, n, r, s) {
    return Dr(), n.flags |= 256, an(e, n, r, s), n.child;
  }
  var nd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ad(e) {
    return { baseLanes: e, cachePool: lp() };
  }
  function rd(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Rn), e;
  }
  function bv(e, n, r) {
    var s = n.pendingProps, u = !1, f = (n.flags & 128) !== 0, x;
    if ((x = f) || (x = e !== null && e.memoizedState === null ? !1 : (Rt.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Za(n) : Ja(), (e = gt) ? (e = Cg(
          e,
          Hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Jm(e), r.return = n, n.child = r, tn = n, gt = null)) : e = null, e === null) throw Ga(n);
        return Vd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var j = s.children;
      return s = s.fallback, u ? (Ja(), u = n.mode, j = ho(
        { mode: "hidden", children: j },
        u
      ), s = Ar(
        s,
        u,
        r,
        null
      ), j.return = n, s.return = n, j.sibling = s, n.child = j, s = n.child, s.memoizedState = ad(r), s.childLanes = rd(
        e,
        x,
        r
      ), n.memoizedState = nd, Rs(null, s)) : (Za(n), id(n, j));
    }
    var L = e.memoizedState;
    if (L !== null && (j = L.dehydrated, j !== null)) {
      if (f)
        n.flags & 256 ? (Za(n), n.flags &= -257, n = sd(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (Ja(), n.child = e.child, n.flags |= 128, n = null) : (Ja(), j = s.fallback, u = n.mode, s = ho(
          { mode: "visible", children: s.children },
          u
        ), j = Ar(
          j,
          u,
          r,
          null
        ), j.flags |= 2, s.return = n, j.return = n, s.sibling = j, n.child = s, Br(
          n,
          e.child,
          null,
          r
        ), s = n.child, s.memoizedState = ad(r), s.childLanes = rd(
          e,
          x,
          r
        ), n.memoizedState = nd, n = Rs(null, s));
      else if (Za(n), Vd(j)) {
        if (x = j.nextSibling && j.nextSibling.dataset, x) var X = x.dgst;
        x = X, s = Error(l(419)), s.stack = "", s.digest = x, vs({ value: s, source: null, stack: null }), n = sd(
          e,
          n,
          r
        );
      } else if (Ut || vi(e, n, r, !1), x = (r & e.childLanes) !== 0, Ut || x) {
        if (x = ft, x !== null && (s = D(x, r), s !== 0 && s !== L.retryLane))
          throw L.retryLane = s, _r(e, s), bn(x, e, s), ed;
        $d(j) || wo(), n = sd(
          e,
          n,
          r
        );
      } else
        $d(j) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, gt = In(
          j.nextSibling
        ), tn = n, Ke = !0, Ya = null, Hn = !1, e !== null && tp(n, e), n = id(
          n,
          s.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (Ja(), j = s.fallback, u = n.mode, L = e.child, X = L.sibling, s = xa(L, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = L.subtreeFlags & 65011712, X !== null ? j = xa(
      X,
      j
    ) : (j = Ar(
      j,
      u,
      r,
      null
    ), j.flags |= 2), j.return = n, s.return = n, s.sibling = j, n.child = s, Rs(null, s), s = n.child, j = e.child.memoizedState, j === null ? j = ad(r) : (u = j.cachePool, u !== null ? (L = Ot._currentValue, u = u.parent !== L ? { parent: L, pool: L } : u) : u = lp(), j = {
      baseLanes: j.baseLanes | r,
      cachePool: u
    }), s.memoizedState = j, s.childLanes = rd(
      e,
      x,
      r
    ), n.memoizedState = nd, Rs(e.child, s)) : (Za(n), r = e.child, e = r.sibling, r = xa(r, {
      mode: "visible",
      children: s.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function id(e, n) {
    return n = ho(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function ho(e, n) {
    return e = jn(22, e, null, n), e.lanes = 0, e;
  }
  function sd(e, n, r) {
    return Br(n, e.child, null, r), e = id(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function xv(e, n, r) {
    e.lanes |= n;
    var s = e.alternate;
    s !== null && (s.lanes |= n), Su(e.return, n, r);
  }
  function ld(e, n, r, s, u, f) {
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
  function Sv(e, n, r) {
    var s = n.pendingProps, u = s.revealOrder, f = s.tail;
    s = s.children;
    var x = Rt.current, j = (x & 2) !== 0;
    if (j ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, P(Rt, x), an(e, n, s, r), s = Ke ? ps : 0, !j && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && xv(e, r, n);
        else if (e.tag === 19)
          xv(e, r, n);
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
          e = r.alternate, e !== null && eo(e) === null && (u = r), r = r.sibling;
        r = u, r === null ? (u = n.child, n.child = null) : (u = r.sibling, r.sibling = null), ld(
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
          if (e = u.alternate, e !== null && eo(e) === null) {
            n.child = u;
            break;
          }
          e = u.sibling, u.sibling = r, r = u, u = e;
        }
        ld(
          n,
          !0,
          r,
          null,
          f,
          s
        );
        break;
      case "together":
        ld(
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
        if (vi(
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
  function od(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Gl(e)));
  }
  function Iw(e, n, r) {
    switch (n.tag) {
      case 3:
        Me(n, n.stateNode.containerInfo), Xa(n, Ot, e.memoizedState.cache), Dr();
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
          return n.flags |= 128, zu(n), null;
        break;
      case 13:
        var s = n.memoizedState;
        if (s !== null)
          return s.dehydrated !== null ? (Za(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? bv(e, n, r) : (Za(n), e = Ta(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Za(n);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (s = (r & n.childLanes) !== 0, s || (vi(
          e,
          n,
          r,
          !1
        ), s = (r & n.childLanes) !== 0), u) {
          if (s)
            return Sv(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), P(Rt, Rt.current), s) break;
        return null;
      case 22:
        return n.lanes = 0, hv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Ot, e.memoizedState.cache);
    }
    return Ta(e, n, r);
  }
  function wv(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Ut = !0;
      else {
        if (!od(e, r) && (n.flags & 128) === 0)
          return Ut = !1, Iw(
            e,
            n,
            r
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Ke && (n.flags & 1048576) !== 0 && ep(n, ps, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var s = n.pendingProps;
          if (e = Lr(n.elementType), n.type = e, typeof e == "function")
            hu(e) ? (s = Vr(e, s), n.tag = 1, n = gv(
              null,
              n,
              e,
              s,
              r
            )) : (n.tag = 0, n = td(
              null,
              n,
              e,
              s,
              r
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === _) {
                n.tag = 11, n = uv(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              } else if (u === ne) {
                n.tag = 14, n = dv(
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
        return td(
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
        ), gv(
          e,
          n,
          s,
          u,
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
          u = f.element, Ru(e, n), Es(n, s, null, r);
          var x = n.memoizedState;
          if (s = x.cache, Xa(n, Ot, s), s !== f.cache && wu(
            n,
            [Ot],
            r,
            !0
          ), ws(), s = x.element, f.isDehydrated)
            if (f = {
              element: s,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
              n = yv(
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
              ), vs(u), n = yv(
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
              for (gt = In(e.firstChild), tn = n, Ke = !0, Ya = null, Hn = !0, r = hp(
                n,
                null,
                s,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Dr(), s === u) {
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
        return fo(e, n), e === null ? (r = zg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : Ke || (r = n.type, e = n.pendingProps, s = Mo(
          ge.current
        ).createElement(r), s[pe] = n, s[ve] = e, rn(s, r, e), mt(s), n.stateNode = s) : n.memoizedState = zg(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Jt(n), e === null && Ke && (s = n.stateNode = _g(
          n.type,
          n.pendingProps,
          ge.current
        ), tn = n, Hn = !0, u = gt, sr(n.type) ? (Hd = u, gt = In(s.firstChild)) : gt = u), an(
          e,
          n,
          n.pendingProps.children,
          r
        ), fo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Ke && ((u = s = gt) && (s = bE(
          s,
          n.type,
          n.pendingProps,
          Hn
        ), s !== null ? (n.stateNode = s, tn = n, gt = In(s.firstChild), Hn = !1, u = !0) : u = !1), u || Ga(n)), Jt(n), u = n.type, f = n.pendingProps, x = e !== null ? e.memoizedProps : null, s = f.children, Ld(u, f) ? s = null : x !== null && Ld(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Ou(
          e,
          n,
          kw,
          null,
          null,
          r
        ), Is._currentValue = u), fo(e, n), an(e, n, s, r), n.child;
      case 6:
        return e === null && Ke && ((e = r = gt) && (r = xE(
          r,
          n.pendingProps,
          Hn
        ), r !== null ? (n.stateNode = r, tn = n, gt = null, e = !0) : e = !1), e || Ga(n)), null;
      case 13:
        return bv(e, n, r);
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
        return uv(
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
        return u = n.type._context, s = n.pendingProps.children, kr(n), u = nn(u), s = s(u), n.flags |= 1, an(e, n, s, r), n.child;
      case 14:
        return dv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return fv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return Sv(e, n, r);
      case 31:
        return qw(e, n, r);
      case 22:
        return hv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return kr(n), s = nn(Ot), e === null ? (u = Nu(), u === null && (u = ft, f = Eu(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= r), u = f), n.memoizedState = { parent: s, cache: u }, Cu(n), Xa(n, Ot, u)) : ((e.lanes & r) !== 0 && (Ru(e, n), Es(n, null, null, r), ws()), u = e.memoizedState, f = n.memoizedState, u.parent !== s ? (u = { parent: s, cache: s }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Xa(n, Ot, s)) : (s = f.cache, Xa(n, Ot, s), s !== u.cache && wu(
          n,
          [Ot],
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
  function cd(e, n, r, s, u) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Kv()) e.flags |= 8192;
        else
          throw Ur = Ql, Tu;
    } else e.flags &= -16777217;
  }
  function Ev(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Bg(n))
      if (Kv()) e.flags |= 8192;
      else
        throw Ur = Ql, Tu;
  }
  function mo(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Gt() : 536870912, e.lanes |= n, Ri |= n);
  }
  function Ms(e, n) {
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
    switch (gu(n), n.tag) {
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
        return r = n.stateNode, s = null, e !== null && (s = e.memoizedState.cache), n.memoizedState.cache !== s && (n.flags |= 2048), Ea(Ot), Ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(n) ? Ca(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, bu())), yt(n), null;
      case 26:
        var u = n.type, f = n.memoizedState;
        return e === null ? (Ca(n), f !== null ? (yt(n), Ev(n, f)) : (yt(n), cd(
          n,
          u,
          null,
          s,
          r
        ))) : f ? f !== e.memoizedState ? (Ca(n), yt(n), Ev(n, f)) : (yt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== s && Ca(n), yt(n), cd(
          n,
          u,
          e,
          s,
          r
        )), null;
      case 27:
        if (Pt(n), r = ge.current, u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ca(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          e = le.current, pi(n) ? np(n) : (e = _g(u, s, r), n.stateNode = e, Ca(n));
        }
        return yt(n), null;
      case 5:
        if (Pt(n), u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ca(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          if (f = le.current, pi(n))
            np(n);
          else {
            var x = Mo(
              ge.current
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
            f[pe] = n, f[ve] = s;
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
            e: switch (rn(f, u, s), u) {
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
        return yt(n), cd(
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
          if (e = ge.current, pi(n)) {
            if (e = n.stateNode, r = n.memoizedProps, s = null, u = tn, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  s = u.memoizedProps;
              }
            e[pe] = n, e = !!(e.nodeValue === r || s !== null && s.suppressHydrationWarning === !0 || bg(e.nodeValue, r)), e || Ga(n, !0);
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
            r = bu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return yt(n), null;
      case 13:
        if (s = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = pi(n), s !== null && s.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(l(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(l(317));
              u[pe] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), u = !1;
          } else
            u = bu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
        }
        return Tn(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = s !== null, e = e !== null && e.memoizedState !== null, r && (s = n.child, u = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (u = s.alternate.memoizedState.cachePool.pool), f = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (f = s.memoizedState.cachePool.pool), f !== u && (s.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), mo(n, n.updateQueue), yt(n), null);
      case 4:
        return Ve(), e === null && Ad(n.stateNode.containerInfo), yt(n), null;
      case 10:
        return Ea(n.type), yt(n), null;
      case 19:
        if (Z(Rt), s = n.memoizedState, s === null) return yt(n), null;
        if (u = (n.flags & 128) !== 0, f = s.rendering, f === null)
          if (u) Ms(s, !1);
          else {
            if (Nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = eo(e), f !== null) {
                  for (n.flags |= 128, Ms(s, !1), e = f.updateQueue, n.updateQueue = e, mo(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    Zm(r, e), r = r.sibling;
                  return P(
                    Rt,
                    Rt.current & 1 | 2
                  ), Ke && Sa(n, s.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            s.tail !== null && qt() > bo && (n.flags |= 128, u = !0, Ms(s, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = eo(f), e !== null) {
              if (n.flags |= 128, u = !0, e = e.updateQueue, n.updateQueue = e, mo(n, e), Ms(s, !0), s.tail === null && s.tailMode === "hidden" && !f.alternate && !Ke)
                return yt(n), null;
            } else
              2 * qt() - s.renderingStartTime > bo && r !== 536870912 && (n.flags |= 128, u = !0, Ms(s, !1), n.lanes = 4194304);
          s.isBackwards ? (f.sibling = n.child, n.child = f) : (e = s.last, e !== null ? e.sibling = f : n.child = f, s.last = f);
        }
        return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = qt(), e.sibling = null, r = Rt.current, P(
          Rt,
          u ? r & 1 | 2 : r & 1
        ), Ke && Sa(n, s.treeForkCount), e) : (yt(n), null);
      case 22:
      case 23:
        return Tn(n), Du(), s = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== s && (n.flags |= 8192) : s && (n.flags |= 8192), s ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (yt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : yt(n), r = n.updateQueue, r !== null && mo(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== r && (n.flags |= 2048), e !== null && Z(Or), null;
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
    switch (gu(n), n.tag) {
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
        return Z(Rt), null;
      case 4:
        return Ve(), null;
      case 10:
        return Ea(n.type), null;
      case 22:
      case 23:
        return Tn(n), Du(), e !== null && Z(Or), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ea(Ot), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function jv(e, n) {
    switch (gu(n), n.tag) {
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
        Z(Rt);
        break;
      case 10:
        Ea(n.type);
        break;
      case 22:
      case 23:
        Tn(n), Du(), e !== null && Z(Or);
        break;
      case 24:
        Ea(Ot);
    }
  }
  function _s(e, n) {
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
    } catch (j) {
      rt(n, n.return, j);
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
            var x = s.inst, j = x.destroy;
            if (j !== void 0) {
              x.destroy = void 0, u = n;
              var L = r, X = j;
              try {
                X();
              } catch (ae) {
                rt(
                  u,
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
  function Nv(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        pp(n, r);
      } catch (s) {
        rt(e, e.return, s);
      }
    }
  }
  function Tv(e, n, r) {
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
  function As(e, n) {
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
  function Cv(e) {
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
  function ud(e, n, r) {
    try {
      var s = e.stateNode;
      hE(s, e.type, r, n), s[ve] = n;
    } catch (u) {
      rt(e, e.return, u);
    }
  }
  function Rv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && sr(e.type) || e.tag === 4;
  }
  function dd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Rv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && sr(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function fd(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = ya));
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (fd(e, n, r), e = e.sibling; e !== null; )
        fd(e, n, r), e = e.sibling;
  }
  function po(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (po(e, n, r), e = e.sibling; e !== null; )
        po(e, n, r), e = e.sibling;
  }
  function Mv(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var s = e.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      rn(n, s, r), n[pe] = e, n[ve] = r;
    } catch (f) {
      rt(e, e.return, f);
    }
  }
  var Ra = !1, Bt = !1, hd = !1, _v = typeof WeakSet == "function" ? WeakSet : Set, Qt = null;
  function Gw(e, n) {
    if (e = e.containerInfo, kd = Lo, e = qm(e), su(e)) {
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
            var x = 0, j = -1, L = -1, X = 0, ae = 0, oe = e, K = null;
            t: for (; ; ) {
              for (var ee; oe !== r || u !== 0 && oe.nodeType !== 3 || (j = x + u), oe !== f || s !== 0 && oe.nodeType !== 3 || (L = x + s), oe.nodeType === 3 && (x += oe.nodeValue.length), (ee = oe.firstChild) !== null; )
                K = oe, oe = ee;
              for (; ; ) {
                if (oe === e) break t;
                if (K === r && ++X === u && (j = x), K === f && ++ae === s && (L = x), (ee = oe.nextSibling) !== null) break;
                oe = K, K = oe.parentNode;
              }
              oe = ee;
            }
            r = j === -1 || L === -1 ? null : { start: j, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Od = { focusedElem: e, selectionRange: r }, Lo = !1, Qt = n; Qt !== null; )
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
                  var xe = Vr(
                    r.type,
                    u
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
                  Bd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Bd(e);
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
  function Av(e, n, r) {
    var s = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        _a(e, r), s & 4 && _s(5, r);
        break;
      case 1:
        if (_a(e, r), s & 4)
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
        s & 64 && Nv(r), s & 512 && As(r, r.return);
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
            pp(e, n);
          } catch (x) {
            rt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && s & 4 && Mv(r);
      case 26:
      case 5:
        _a(e, r), n === null && s & 4 && Cv(r), s & 512 && As(r, r.return);
        break;
      case 12:
        _a(e, r);
        break;
      case 31:
        _a(e, r), s & 4 && kv(e, r);
        break;
      case 13:
        _a(e, r), s & 4 && Ov(e, r), s & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = tE.bind(
          null,
          r
        ), SE(e, r))));
        break;
      case 22:
        if (s = r.memoizedState !== null || Ra, !s) {
          n = n !== null && n.memoizedState !== null || Bt, u = Ra;
          var f = Bt;
          Ra = s, (Bt = n) && !f ? Aa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : _a(e, r), Ra = u, Bt = f;
        }
        break;
      case 30:
        break;
      default:
        _a(e, r);
    }
  }
  function Dv(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Dv(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && dt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var wt = null, pn = !1;
  function Ma(e, n, r) {
    for (r = r.child; r !== null; )
      zv(e, n, r), r = r.sibling;
  }
  function zv(e, n, r) {
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
        var s = wt, u = pn;
        sr(r.type) && (wt = r.stateNode, pn = !1), Ma(
          e,
          n,
          r
        ), Vs(r.stateNode), wt = s, pn = u;
        break;
      case 5:
        Bt || fa(r, n);
      case 6:
        if (s = wt, u = pn, wt = null, Ma(
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
        wt !== null && (pn ? (e = wt, Ng(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : Ng(wt, r.stateNode));
        break;
      case 4:
        s = wt, u = pn, wt = r.stateNode.containerInfo, pn = !0, Ma(
          e,
          n,
          r
        ), wt = s, pn = u;
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
        Bt || (fa(r, n), s = r.stateNode, typeof s.componentWillUnmount == "function" && Tv(
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
  function kv(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Li(e);
      } catch (r) {
        rt(n, n.return, r);
      }
    }
  }
  function Ov(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Li(e);
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
        return n === null && (n = e.stateNode = new _v()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new _v()), n;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function vo(e, n) {
    var r = Xw(e);
    n.forEach(function(s) {
      if (!r.has(s)) {
        r.add(s);
        var u = nE.bind(null, e, s);
        s.then(u, u);
      }
    });
  }
  function vn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var s = 0; s < r.length; s++) {
        var u = r[s], f = e, x = n, j = x;
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
        zv(f, x, u), wt = null, pn = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Lv(n, e), n = n.sibling;
  }
  var ta = null;
  function Lv(e, n) {
    var r = e.alternate, s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vn(n, e), gn(e), s & 4 && (Wa(3, e, e.return), _s(3, e), Wa(5, e, e.return));
        break;
      case 1:
        vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 64 && Ra && (e = e.updateQueue, e !== null && (s = e.callbacks, s !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? s : r.concat(s))));
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
                      f = u.getElementsByTagName("title")[0], (!f || f[He] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(s), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), rn(f, s, r), f[pe] = e, mt(f), s = f;
                      break e;
                    case "link":
                      var x = Lg(
                        "link",
                        "href",
                        u
                      ).get(s + (r.href || ""));
                      if (x) {
                        for (var j = 0; j < x.length; j++)
                          if (f = x[j], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            x.splice(j, 1);
                            break t;
                          }
                      }
                      f = u.createElement(s), rn(f, s, r), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (x = Lg(
                        "meta",
                        "content",
                        u
                      ).get(s + (r.content || ""))) {
                        for (j = 0; j < x.length; j++)
                          if (f = x[j], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            x.splice(j, 1);
                            break t;
                          }
                      }
                      f = u.createElement(s), rn(f, s, r), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(l(468, s));
                  }
                  f[pe] = e, mt(f), s = f;
                }
                e.stateNode = s;
              } else
                Ug(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Og(
                u,
                s,
                e.memoizedProps
              );
          else
            f !== s ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, s === null ? Ug(
              u,
              e.type,
              e.stateNode
            ) : Og(
              u,
              s,
              e.memoizedProps
            )) : s === null && e.stateNode !== null && ud(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), r !== null && s & 4 && ud(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            ii(u, "");
          } catch (xe) {
            rt(e, e.return, xe);
          }
        }
        s & 4 && e.stateNode != null && (u = e.memoizedProps, ud(
          e,
          u,
          r !== null ? r.memoizedProps : u
        )), s & 1024 && (hd = !0);
        break;
      case 6:
        if (vn(n, e), gn(e), s & 4) {
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
        if (Do = null, u = ta, ta = _o(n.containerInfo), vn(n, e), ta = u, gn(e), s & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(n.containerInfo);
          } catch (xe) {
            rt(e, e.return, xe);
          }
        hd && (hd = !1, Uv(e));
        break;
      case 4:
        s = ta, ta = _o(
          e.stateNode.containerInfo
        ), vn(n, e), gn(e), ta = s;
        break;
      case 12:
        vn(n, e), gn(e);
        break;
      case 31:
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, vo(e, s)));
        break;
      case 13:
        vn(n, e), gn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (yo = qt()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, vo(e, s)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, X = Ra, ae = Bt;
        if (Ra = X || u, Bt = ae || L, vn(n, e), Bt = ae, Ra = X, gn(e), s & 8192)
          e: for (n = e.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (r === null || L || Ra || Bt || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (f = L.stateNode, u)
                    x = f.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    j = L.stateNode;
                    var oe = L.memoizedProps.style, K = oe != null && oe.hasOwnProperty("display") ? oe.display : null;
                    j.style.display = K == null || typeof K == "boolean" ? "" : ("" + K).trim();
                  }
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = u ? "" : L.memoizedProps;
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var ee = L.stateNode;
                  u ? Tg(ee, !0) : Tg(L.stateNode, !1);
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
        s & 4 && (s = e.updateQueue, s !== null && (r = s.retryQueue, r !== null && (s.retryQueue = null, vo(e, r))));
        break;
      case 19:
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, vo(e, s)));
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
          if (Rv(s)) {
            r = s;
            break;
          }
          s = s.return;
        }
        if (r == null) throw Error(l(160));
        switch (r.tag) {
          case 27:
            var u = r.stateNode, f = dd(e);
            po(e, f, u);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ii(x, ""), r.flags &= -33);
            var j = dd(e);
            po(e, j, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, X = dd(e);
            fd(
              e,
              X,
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
  function Uv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Uv(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function _a(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Av(e, n.alternate, n), n = n.sibling;
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
          typeof r.componentWillUnmount == "function" && Tv(
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
      var s = n.alternate, u = e, f = n, x = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Aa(
            u,
            f,
            r
          ), _s(4, f);
          break;
        case 1:
          if (Aa(
            u,
            f,
            r
          ), s = f, u = s.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (X) {
              rt(s, s.return, X);
            }
          if (s = f, u = s.updateQueue, u !== null) {
            var j = s.stateNode;
            try {
              var L = u.shared.hiddenCallbacks;
              if (L !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < L.length; u++)
                  mp(L[u], j);
            } catch (X) {
              rt(s, s.return, X);
            }
          }
          r && x & 64 && Nv(f), As(f, f.return);
          break;
        case 27:
          Mv(f);
        case 26:
        case 5:
          Aa(
            u,
            f,
            r
          ), r && s === null && x & 4 && Cv(f), As(f, f.return);
          break;
        case 12:
          Aa(
            u,
            f,
            r
          );
          break;
        case 31:
          Aa(
            u,
            f,
            r
          ), r && x & 4 && kv(u, f);
          break;
        case 13:
          Aa(
            u,
            f,
            r
          ), r && x & 4 && Ov(u, f);
          break;
        case 22:
          f.memoizedState === null && Aa(
            u,
            f,
            r
          ), As(f, f.return);
          break;
        case 30:
          break;
        default:
          Aa(
            u,
            f,
            r
          );
      }
      n = n.sibling;
    }
  }
  function md(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && gs(r));
  }
  function pd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && gs(e));
  }
  function na(e, n, r, s) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Bv(
          e,
          n,
          r,
          s
        ), n = n.sibling;
  }
  function Bv(e, n, r, s) {
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
        ), u & 2048 && _s(9, n);
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
        ), u & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && gs(e)));
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
            var f = n.memoizedProps, x = f.id, j = f.onPostCommit;
            typeof j == "function" && j(
              x,
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
        f = n.stateNode, x = n.alternate, n.memoizedState !== null ? f._visibility & 2 ? na(
          e,
          n,
          r,
          s
        ) : Ds(e, n) : f._visibility & 2 ? na(
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
        )), u & 2048 && md(x, n);
        break;
      case 24:
        na(
          e,
          n,
          r,
          s
        ), u & 2048 && pd(n.alternate, n);
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
  function Ni(e, n, r, s, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var f = e, x = n, j = r, L = s, X = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
            f,
            x,
            j,
            L,
            u
          ), _s(8, x);
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
            u
          ) : Ds(
            f,
            x
          ) : (ae._visibility |= 2, Ni(
            f,
            x,
            j,
            L,
            u
          )), u && X & 2048 && md(
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
            u
          ), u && X & 2048 && pd(x.alternate, x);
          break;
        default:
          Ni(
            f,
            x,
            j,
            L,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Ds(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, s = n, u = s.flags;
        switch (s.tag) {
          case 22:
            Ds(r, s), u & 2048 && md(
              s.alternate,
              s
            );
            break;
          case 24:
            Ds(r, s), u & 2048 && pd(s.alternate, s);
            break;
          default:
            Ds(r, s);
        }
        n = n.sibling;
      }
  }
  var zs = 8192;
  function Ti(e, n, r) {
    if (e.subtreeFlags & zs)
      for (e = e.child; e !== null; )
        $v(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function $v(e, n, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          n,
          r
        ), e.flags & zs && e.memoizedState !== null && zE(
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
        e.memoizedState === null && (s = e.alternate, s !== null && s.memoizedState !== null ? (s = zs, zs = 16777216, Ti(
          e,
          n,
          r
        ), zs = s) : Ti(
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
  function Vv(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function ks(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, qv(
            s,
            e
          );
        }
      Vv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Hv(e), e = e.sibling;
  }
  function Hv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ks(e), e.flags & 2048 && Wa(9, e, e.return);
        break;
      case 3:
        ks(e);
        break;
      case 12:
        ks(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, go(e)) : ks(e);
        break;
      default:
        ks(e);
    }
  }
  function go(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, qv(
            s,
            e
          );
        }
      Vv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, n, n.return), go(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, go(n));
          break;
        default:
          go(n);
      }
      e = e.sibling;
    }
  }
  function qv(e, n) {
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
          var u = s.sibling, f = s.return;
          if (Dv(s), s === r) {
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
      var n = nn(Ot), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return nn(Ot).controller.signal;
    }
  }, Kw = typeof WeakMap == "function" ? WeakMap : Map, tt = 0, ft = null, Ye = null, Xe = 0, at = 0, Cn = null, er = !1, Ci = !1, vd = !1, Da = 0, Nt = 0, tr = 0, qr = 0, gd = 0, Rn = 0, Ri = 0, Os = null, yn = null, yd = !1, yo = 0, Iv = 0, bo = 1 / 0, xo = null, nr = null, Xt = 0, ar = null, Mi = null, za = 0, bd = 0, xd = null, Fv = null, Ls = 0, Sd = null;
  function Mn() {
    return (tt & 2) !== 0 && Xe !== 0 ? Xe & -Xe : k.T !== null ? Cd() : ue();
  }
  function Yv() {
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
  function Gv(e, n, r) {
    if ((tt & 6) !== 0) throw Error(l(327));
    var s = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ut(e, n), u = s ? Jw(e, n) : Ed(e, n, !0), f = s;
    do {
      if (u === 0) {
        Ci && !s && rr(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !Qw(r)) {
          u = Ed(e, n, !1), f = !1;
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
              var j = e;
              u = Os;
              var L = j.current.memoizedState.isDehydrated;
              if (L && (_i(j, x).flags |= 256), x = Ed(
                j,
                x,
                !1
              ), x !== 2) {
                if (vd && !L) {
                  j.errorRecoveryDisabledLanes |= f, qr |= f, u = 4;
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
          _i(e, 0), rr(e, n, 0, !0);
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
          if ((n & 62914560) === n && (u = yo + 300 - qt(), 10 < u)) {
            if (rr(
              s,
              n,
              Rn,
              !er
            ), ke(s, 0, !0) !== 0) break e;
            za = n, s.timeoutHandle = Eg(
              Xv.bind(
                null,
                s,
                r,
                yn,
                xo,
                yd,
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
              u
            );
            break e;
          }
          Xv(
            s,
            r,
            yn,
            xo,
            yd,
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
  function Xv(e, n, r, s, u, f, x, j, L, X, ae, oe, K, ee) {
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
      }, $v(
        n,
        f,
        oe
      );
      var xe = (f & 62914560) === f ? yo - qt() : (f & 4194048) === f ? Iv - qt() : 0;
      if (xe = kE(
        oe,
        xe
      ), xe !== null) {
        za = f, e.cancelPendingCommit = xe(
          tg.bind(
            null,
            e,
            n,
            f,
            r,
            s,
            u,
            x,
            j,
            L,
            ae,
            oe,
            null,
            K,
            ee
          )
        ), rr(e, f, x, !X);
        return;
      }
    }
    tg(
      e,
      n,
      f,
      r,
      s,
      u,
      x,
      j,
      L
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
            if (!En(f(), u)) return !1;
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
    n &= ~gd, n &= ~qr, e.suspendedLanes |= n, e.pingedLanes &= ~n, s && (e.warmLanes |= n), s = e.expirationTimes;
    for (var u = n; 0 < u; ) {
      var f = 31 - Yt(u), x = 1 << f;
      s[f] = -1, u &= ~x;
    }
    r !== 0 && ga(e, r, n);
  }
  function So() {
    return (tt & 6) === 0 ? (Us(0), !1) : !0;
  }
  function wd() {
    if (Ye !== null) {
      if (at === 0)
        var e = Ye.return;
      else
        e = Ye, wa = zr = null, Bu(e), xi = null, bs = 0, e = Ye;
      for (; e !== null; )
        jv(e.alternate, e), e = e.return;
      Ye = null;
    }
  }
  function _i(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, vE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), za = 0, wd(), ft = e, Ye = r = xa(e.current, null), Xe = n, at = 0, Cn = null, er = !1, Ci = ut(e, n), vd = !1, Ri = Rn = gd = qr = tr = Nt = 0, yn = Os = null, yd = !1, (n & 8) !== 0 && (n |= n & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= n; 0 < s; ) {
        var u = 31 - Yt(s), f = 1 << u;
        n |= e[u], s &= ~f;
      }
    return Da = n, Hl(), r;
  }
  function Pv(e, n) {
    Ue = null, k.H = Cs, n === bi || n === Kl ? (n = up(), at = 3) : n === Tu ? (n = up(), at = 4) : at = n === ed ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Cn = n, Ye === null && (Nt = 1, co(
      e,
      Bn(n, e.current)
    ));
  }
  function Kv() {
    var e = Nn.current;
    return e === null ? !0 : (Xe & 4194048) === Xe ? qn === null : (Xe & 62914560) === Xe || (Xe & 536870912) !== 0 ? e === qn : !1;
  }
  function Qv() {
    var e = k.H;
    return k.H = Cs, e === null ? Cs : e;
  }
  function Zv() {
    var e = k.A;
    return k.A = Pw, e;
  }
  function wo() {
    Nt = 4, er || (Xe & 4194048) !== Xe && Nn.current !== null || (Ci = !0), (tr & 134217727) === 0 && (qr & 134217727) === 0 || ft === null || rr(
      ft,
      Xe,
      Rn,
      !1
    );
  }
  function Ed(e, n, r) {
    var s = tt;
    tt |= 2;
    var u = Qv(), f = Zv();
    (ft !== e || Xe !== n) && (xo = null, _i(e, n)), n = !1;
    var x = Nt;
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          var j = Ye, L = Cn;
          switch (at) {
            case 8:
              wd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (n = !0);
              var X = at;
              if (at = 0, Cn = null, Ai(e, j, L, X), r && Ci) {
                x = 0;
                break e;
              }
              break;
            default:
              X = at, at = 0, Cn = null, Ai(e, j, L, X);
          }
        }
        Zw(), x = Nt;
        break;
      } catch (ae) {
        Pv(e, ae);
      }
    while (!0);
    return n && e.shellSuspendCounter++, wa = zr = null, tt = s, k.H = u, k.A = f, Ye === null && (ft = null, Xe = 0, Hl()), x;
  }
  function Zw() {
    for (; Ye !== null; ) Jv(Ye);
  }
  function Jw(e, n) {
    var r = tt;
    tt |= 2;
    var s = Qv(), u = Zv();
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
              if (op(f)) {
                at = 0, Cn = null, Wv(n);
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
              op(f) ? (at = 0, Cn = null, Wv(n)) : (at = 0, Cn = null, Ai(e, n, f, 7));
              break;
            case 5:
              var x = null;
              switch (Ye.tag) {
                case 26:
                  x = Ye.memoizedState;
                case 5:
                case 27:
                  var j = Ye;
                  if (x ? Bg(x) : j.stateNode.complete) {
                    at = 0, Cn = null;
                    var L = j.sibling;
                    if (L !== null) Ye = L;
                    else {
                      var X = j.return;
                      X !== null ? (Ye = X, Eo(X)) : Ye = null;
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
              wd(), Nt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        Ww();
        break;
      } catch (ae) {
        Pv(e, ae);
      }
    while (!0);
    return wa = zr = null, k.H = s, k.A = u, tt = r, Ye !== null ? 0 : (ft = null, Xe = 0, Hl(), Nt);
  }
  function Ww() {
    for (; Ye !== null && !Ht(); )
      Jv(Ye);
  }
  function Jv(e) {
    var n = wv(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : Ye = n;
  }
  function Wv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = vv(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Xe
        );
        break;
      case 11:
        n = vv(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Xe
        );
        break;
      case 5:
        Bu(n);
      default:
        jv(r, n), n = Ye = Zm(n, Da), n = wv(r, n, Da);
    }
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : Ye = n;
  }
  function Ai(e, n, r, s) {
    wa = zr = null, Bu(n), xi = null, bs = 0;
    var u = n.return;
    try {
      if (Hw(
        e,
        u,
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
      if (u !== null) throw Ye = u, f;
      Nt = 1, co(
        e,
        Bn(r, e.current)
      ), Ye = null;
      return;
    }
    n.flags & 32768 ? (Ke || s === 1 ? e = !0 : Ci || (Xe & 536870912) !== 0 ? e = !1 : (er = e = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = Nn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), eg(n, e)) : Eo(n);
  }
  function Eo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        eg(
          n,
          er
        );
        return;
      }
      e = n.return;
      var r = Fw(
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
  function eg(e, n) {
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
  function tg(e, n, r, s, u, f, x, j, L) {
    e.cancelPendingCommit = null;
    do
      jo();
    while (Xt !== 0);
    if ((tt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === e.current) throw Error(l(177));
      if (f = n.lanes | n.childLanes, f |= du, en(
        e,
        r,
        f,
        x,
        j,
        L
      ), e === ft && (Ye = ft = null, Xe = 0), Mi = n, ar = e, za = r, bd = f, xd = u, Fv = s, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, aE(nt, function() {
        return sg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), s = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || s) {
        s = k.T, k.T = null, u = C.p, C.p = 2, x = tt, tt |= 4;
        try {
          Gw(e, n, r);
        } finally {
          tt = x, C.p = u, k.T = s;
        }
      }
      Xt = 1, ng(), ag(), rg();
    }
  }
  function ng() {
    if (Xt === 1) {
      Xt = 0;
      var e = ar, n = Mi, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = k.T, k.T = null;
        var s = C.p;
        C.p = 2;
        var u = tt;
        tt |= 4;
        try {
          Lv(n, e);
          var f = Od, x = qm(e.containerInfo), j = f.focusedElem, L = f.selectionRange;
          if (x !== j && j && j.ownerDocument && Hm(
            j.ownerDocument.documentElement,
            j
          )) {
            if (L !== null && su(j)) {
              var X = L.start, ae = L.end;
              if (ae === void 0 && (ae = X), "selectionStart" in j)
                j.selectionStart = X, j.selectionEnd = Math.min(
                  ae,
                  j.value.length
                );
              else {
                var oe = j.ownerDocument || document, K = oe && oe.defaultView || window;
                if (K.getSelection) {
                  var ee = K.getSelection(), xe = j.textContent.length, _e = Math.min(L.start, xe), ct = L.end === void 0 ? _e : Math.min(L.end, xe);
                  !ee.extend && _e > ct && (x = ct, ct = _e, _e = x);
                  var H = Vm(
                    j,
                    _e
                  ), $ = Vm(
                    j,
                    ct
                  );
                  if (H && $ && (ee.rangeCount !== 1 || ee.anchorNode !== H.node || ee.anchorOffset !== H.offset || ee.focusNode !== $.node || ee.focusOffset !== $.offset)) {
                    var G = oe.createRange();
                    G.setStart(H.node, H.offset), ee.removeAllRanges(), _e > ct ? (ee.addRange(G), ee.extend($.node, $.offset)) : (G.setEnd($.node, $.offset), ee.addRange(G));
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
          Lo = !!kd, Od = kd = null;
        } finally {
          tt = u, C.p = s, k.T = r;
        }
      }
      e.current = n, Xt = 2;
    }
  }
  function ag() {
    if (Xt === 2) {
      Xt = 0;
      var e = ar, n = Mi, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = k.T, k.T = null;
        var s = C.p;
        C.p = 2;
        var u = tt;
        tt |= 4;
        try {
          Av(e, n.alternate, n);
        } finally {
          tt = u, C.p = s, k.T = r;
        }
      }
      Xt = 3;
    }
  }
  function rg() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, kn();
      var e = ar, n = Mi, r = za, s = Fv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, Mi = ar = null, ig(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (nr = null), Y(r), n = n.stateNode, Wt && typeof Wt.onCommitFiberRoot == "function")
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
        n = k.T, u = C.p, C.p = 2, k.T = null;
        try {
          for (var f = e.onRecoverableError, x = 0; x < s.length; x++) {
            var j = s[x];
            f(j.value, {
              componentStack: j.stack
            });
          }
        } finally {
          k.T = n, C.p = u;
        }
      }
      (za & 3) !== 0 && jo(), ha(e), u = e.pendingLanes, (r & 261930) !== 0 && (u & 42) !== 0 ? e === Sd ? Ls++ : (Ls = 0, Sd = e) : Ls = 0, Us(0);
    }
  }
  function ig(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, gs(n)));
  }
  function jo() {
    return ng(), ag(), rg(), sg();
  }
  function sg() {
    if (Xt !== 5) return !1;
    var e = ar, n = bd;
    bd = 0;
    var r = Y(za), s = k.T, u = C.p;
    try {
      C.p = 32 > r ? 32 : r, k.T = null, r = xd, xd = null;
      var f = ar, x = za;
      if (Xt = 0, Mi = ar = null, za = 0, (tt & 6) !== 0) throw Error(l(331));
      var j = tt;
      if (tt |= 4, Hv(f.current), Bv(
        f,
        f.current,
        x,
        r
      ), tt = j, Us(0, !1), Wt && typeof Wt.onPostCommitFiberRoot == "function")
        try {
          Wt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      C.p = u, k.T = s, ig(e, n);
    }
  }
  function lg(e, n, r) {
    n = Bn(r, n), n = Wu(e.stateNode, n, 2), e = Qa(e, n, 2), e !== null && (it(e, 2), ha(e));
  }
  function rt(e, n, r) {
    if (e.tag === 3)
      lg(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          lg(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var s = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (nr === null || !nr.has(s))) {
            e = Bn(r, e), r = ov(2), s = Qa(n, r, 2), s !== null && (cv(
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
  function jd(e, n, r) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new Kw();
      var u = /* @__PURE__ */ new Set();
      s.set(n, u);
    } else
      u = s.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), s.set(n, u));
    u.has(r) || (vd = !0, u.add(r), e = eE.bind(null, e, n, r), n.then(e, e));
  }
  function eE(e, n, r) {
    var s = e.pingCache;
    s !== null && s.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, ft === e && (Xe & r) === r && (Nt === 4 || Nt === 3 && (Xe & 62914560) === Xe && 300 > qt() - yo ? (tt & 2) === 0 && _i(e, 0) : gd |= r, Ri === Xe && (Ri = 0)), ha(e);
  }
  function og(e, n) {
    n === 0 && (n = Gt()), e = _r(e, n), e !== null && (it(e, n), ha(e));
  }
  function tE(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), og(e, r);
  }
  function nE(e, n) {
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
    s !== null && s.delete(n), og(e, r);
  }
  function aE(e, n) {
    return xt(e, n);
  }
  var No = null, Di = null, Nd = !1, To = !1, Td = !1, ir = 0;
  function ha(e) {
    e !== Di && e.next === null && (Di === null ? No = Di = e : Di = Di.next = e), To = !0, Nd || (Nd = !0, iE());
  }
  function Us(e, n) {
    if (!Td && To) {
      Td = !0;
      do
        for (var r = !1, s = No; s !== null; ) {
          if (e !== 0) {
            var u = s.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var x = s.suspendedLanes, j = s.pingedLanes;
              f = (1 << 31 - Yt(42 | e) + 1) - 1, f &= u & ~(x & ~j), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, fg(s, f));
          } else
            f = Xe, f = ke(
              s,
              s === ft ? f : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (f & 3) === 0 || ut(s, f) || (r = !0, fg(s, f));
          s = s.next;
        }
      while (r);
      Td = !1;
    }
  }
  function rE() {
    cg();
  }
  function cg() {
    To = Nd = !1;
    var e = 0;
    ir !== 0 && pE() && (e = ir);
    for (var n = qt(), r = null, s = No; s !== null; ) {
      var u = s.next, f = ug(s, n);
      f === 0 ? (s.next = null, r === null ? No = u : r.next = u, u === null && (Di = r)) : (r = s, (e !== 0 || (f & 3) !== 0) && (To = !0)), s = u;
    }
    Xt !== 0 && Xt !== 5 || Us(e), ir !== 0 && (ir = 0);
  }
  function ug(e, n) {
    for (var r = e.suspendedLanes, s = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var x = 31 - Yt(f), j = 1 << x, L = u[x];
      L === -1 ? ((j & r) === 0 || (j & s) !== 0) && (u[x] = Dt(j, n)) : L <= n && (e.expiredLanes |= j), f &= ~j;
    }
    if (n = ft, r = Xe, r = ke(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s = e.callbackNode, r === 0 || e === n && (at === 2 || at === 9) || e.cancelPendingCommit !== null)
      return s !== null && s !== null && dn(s), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ut(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (s !== null && dn(s), Y(r)) {
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
      return s = dg.bind(null, e), r = xt(r, s), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return s !== null && s !== null && dn(s), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function dg(e, n) {
    if (Xt !== 0 && Xt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (jo() && e.callbackNode !== r)
      return null;
    var s = Xe;
    return s = ke(
      e,
      e === ft ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s === 0 ? null : (Gv(e, s, n), ug(e, qt()), e.callbackNode != null && e.callbackNode === r ? dg.bind(null, e) : null);
  }
  function fg(e, n) {
    if (jo()) return null;
    Gv(e, n, !0);
  }
  function iE() {
    gE(function() {
      (tt & 6) !== 0 ? xt(
        ze,
        rE
      ) : cg();
    });
  }
  function Cd() {
    if (ir === 0) {
      var e = gi;
      e === 0 && (e = va, va <<= 1, (va & 261888) === 0 && (va = 256)), ir = e;
    }
    return ir;
  }
  function hg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zl("" + e);
  }
  function mg(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function sE(e, n, r, s, u) {
    if (n === "submit" && r && r.stateNode === u) {
      var f = hg(
        (u[ve] || null).action
      ), x = s.submitter;
      x && (n = (n = x[ve] || null) ? hg(n.formAction) : x.getAttribute("formAction"), n !== null && (f = n, x = null));
      var j = new Ul(
        "action",
        "action",
        null,
        s,
        u
      );
      e.push({
        event: j,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (s.defaultPrevented) {
                if (ir !== 0) {
                  var L = x ? mg(u, x) : new FormData(u);
                  Xu(
                    r,
                    {
                      pending: !0,
                      data: L,
                      method: u.method,
                      action: f
                    },
                    null,
                    L
                  );
                }
              } else
                typeof f == "function" && (j.preventDefault(), L = x ? mg(u, x) : new FormData(u), Xu(
                  r,
                  {
                    pending: !0,
                    data: L,
                    method: u.method,
                    action: f
                  },
                  f,
                  L
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Rd = 0; Rd < uu.length; Rd++) {
    var Md = uu[Rd], lE = Md.toLowerCase(), oE = Md[0].toUpperCase() + Md.slice(1);
    ea(
      lE,
      "on" + oE
    );
  }
  ea(Ym, "onAnimationEnd"), ea(Gm, "onAnimationIteration"), ea(Xm, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(jw, "onTransitionRun"), ea(Nw, "onTransitionStart"), ea(Tw, "onTransitionCancel"), ea(Pm, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Kt(
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
  var Bs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bs)
  );
  function pg(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var s = e[r], u = s.event;
      s = s.listeners;
      e: {
        var f = void 0;
        if (n)
          for (var x = s.length - 1; 0 <= x; x--) {
            var j = s[x], L = j.instance, X = j.currentTarget;
            if (j = j.listener, L !== f && u.isPropagationStopped())
              break e;
            f = j, u.currentTarget = X;
            try {
              f(u);
            } catch (ae) {
              Vl(ae);
            }
            u.currentTarget = null, f = L;
          }
        else
          for (x = 0; x < s.length; x++) {
            if (j = s[x], L = j.instance, X = j.currentTarget, j = j.listener, L !== f && u.isPropagationStopped())
              break e;
            f = j, u.currentTarget = X;
            try {
              f(u);
            } catch (ae) {
              Vl(ae);
            }
            u.currentTarget = null, f = L;
          }
      }
    }
  }
  function Ge(e, n) {
    var r = n[be];
    r === void 0 && (r = n[be] = /* @__PURE__ */ new Set());
    var s = e + "__bubble";
    r.has(s) || (vg(n, e, 2, !1), r.add(s));
  }
  function _d(e, n, r) {
    var s = 0;
    n && (s |= 4), vg(
      r,
      e,
      s,
      n
    );
  }
  var Co = "_reactListening" + Math.random().toString(36).slice(2);
  function Ad(e) {
    if (!e[Co]) {
      e[Co] = !0, qa.forEach(function(r) {
        r !== "selectionchange" && (cE.has(r) || _d(r, !1, e), _d(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Co] || (n[Co] = !0, _d("selectionchange", !1, n));
    }
  }
  function vg(e, n, r, s) {
    switch (Yg(n)) {
      case 2:
        var u = UE;
        break;
      case 8:
        u = BE;
        break;
      default:
        u = Gd;
    }
    r = u.bind(
      null,
      n,
      r,
      e
    ), u = void 0, !Zc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), s ? u !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: u
    }) : e.addEventListener(n, r, !0) : u !== void 0 ? e.addEventListener(n, r, {
      passive: u
    }) : e.addEventListener(n, r, !1);
  }
  function Dd(e, n, r, s, u) {
    var f = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      e: for (; ; ) {
        if (s === null) return;
        var x = s.tag;
        if (x === 3 || x === 4) {
          var j = s.stateNode.containerInfo;
          if (j === u) break;
          if (x === 4)
            for (x = s.return; x !== null; ) {
              var L = x.tag;
              if ((L === 3 || L === 4) && x.stateNode.containerInfo === u)
                return;
              x = x.return;
            }
          for (; j !== null; ) {
            if (x = st(j), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              s = f = x;
              continue e;
            }
            j = j.parentNode;
          }
        }
        s = s.return;
      }
    Sm(function() {
      var X = f, ae = Kc(r), oe = [];
      e: {
        var K = Km.get(e);
        if (K !== void 0) {
          var ee = Ul, xe = e;
          switch (e) {
            case "keypress":
              if (Ol(r) === 0) break e;
            case "keydown":
            case "keyup":
              ee = nw;
              break;
            case "focusin":
              xe = "focus", ee = tu;
              break;
            case "focusout":
              xe = "blur", ee = tu;
              break;
            case "beforeblur":
            case "afterblur":
              ee = tu;
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
              ee = jm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ee = FS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ee = iw;
              break;
            case Ym:
            case Gm:
            case Xm:
              ee = XS;
              break;
            case Pm:
              ee = lw;
              break;
            case "scroll":
            case "scrollend":
              ee = qS;
              break;
            case "wheel":
              ee = cw;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = KS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = Tm;
              break;
            case "toggle":
            case "beforetoggle":
              ee = dw;
          }
          var _e = (n & 4) !== 0, ct = !_e && (e === "scroll" || e === "scrollend"), H = _e ? K !== null ? K + "Capture" : null : K;
          _e = [];
          for (var $ = X, G; $ !== null; ) {
            var se = $;
            if (G = se.stateNode, se = se.tag, se !== 5 && se !== 26 && se !== 27 || G === null || H === null || (se = ss($, H), se != null && _e.push(
              $s($, se, G)
            )), ct) break;
            $ = $.return;
          }
          0 < _e.length && (K = new ee(
            K,
            xe,
            null,
            r,
            ae
          ), oe.push({ event: K, listeners: _e }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (K = e === "mouseover" || e === "pointerover", ee = e === "mouseout" || e === "pointerout", K && r !== Pc && (xe = r.relatedTarget || r.fromElement) && (st(xe) || xe[Ee]))
            break e;
          if ((ee || K) && (K = ae.window === ae ? ae : (K = ae.ownerDocument) ? K.defaultView || K.parentWindow : window, ee ? (xe = r.relatedTarget || r.toElement, ee = X, xe = xe ? st(xe) : null, xe !== null && (ct = d(xe), _e = xe.tag, xe !== ct || _e !== 5 && _e !== 27 && _e !== 6) && (xe = null)) : (ee = null, xe = X), ee !== xe)) {
            if (_e = jm, se = "onMouseLeave", H = "onMouseEnter", $ = "mouse", (e === "pointerout" || e === "pointerover") && (_e = Tm, se = "onPointerLeave", H = "onPointerEnter", $ = "pointer"), ct = ee == null ? K : Fe(ee), G = xe == null ? K : Fe(xe), K = new _e(
              se,
              $ + "leave",
              ee,
              r,
              ae
            ), K.target = ct, K.relatedTarget = G, se = null, st(ae) === X && (_e = new _e(
              H,
              $ + "enter",
              xe,
              r,
              ae
            ), _e.target = G, _e.relatedTarget = ct, se = _e), ct = se, ee && xe)
              t: {
                for (_e = uE, H = ee, $ = xe, G = 0, se = H; se; se = _e(se))
                  G++;
                se = 0;
                for (var Ce = $; Ce; Ce = _e(Ce))
                  se++;
                for (; 0 < G - se; )
                  H = _e(H), G--;
                for (; 0 < se - G; )
                  $ = _e($), se--;
                for (; G--; ) {
                  if (H === $ || $ !== null && H === $.alternate) {
                    _e = H;
                    break t;
                  }
                  H = _e(H), $ = _e($);
                }
                _e = null;
              }
            else _e = null;
            ee !== null && gg(
              oe,
              K,
              ee,
              _e,
              !1
            ), xe !== null && ct !== null && gg(
              oe,
              ct,
              xe,
              _e,
              !0
            );
          }
        }
        e: {
          if (K = X ? Fe(X) : window, ee = K.nodeName && K.nodeName.toLowerCase(), ee === "select" || ee === "input" && K.type === "file")
            var Je = km;
          else if (Dm(K))
            if (Om)
              Je = Sw;
            else {
              Je = bw;
              var je = yw;
            }
          else
            ee = K.nodeName, !ee || ee.toLowerCase() !== "input" || K.type !== "checkbox" && K.type !== "radio" ? X && Xc(X.elementType) && (Je = km) : Je = xw;
          if (Je && (Je = Je(e, X))) {
            zm(
              oe,
              Je,
              r,
              ae
            );
            break e;
          }
          je && je(e, K, X), e === "focusout" && X && K.type === "number" && X.memoizedProps.value != null && Gc(K, "number", K.value);
        }
        switch (je = X ? Fe(X) : window, e) {
          case "focusin":
            (Dm(je) || je.contentEditable === "true") && (ci = je, lu = X, ms = null);
            break;
          case "focusout":
            ms = lu = ci = null;
            break;
          case "mousedown":
            ou = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ou = !1, Im(oe, r, ae);
            break;
          case "selectionchange":
            if (Ew) break;
          case "keydown":
          case "keyup":
            Im(oe, r, ae);
        }
        var Be;
        if (au)
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
          oi ? _m(e, r) && (Pe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (Cm && r.locale !== "ko" && (oi || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && oi && (Be = wm()) : (Ia = ae, Jc = "value" in Ia ? Ia.value : Ia.textContent, oi = !0)), je = Ro(X, Pe), 0 < je.length && (Pe = new Nm(
          Pe,
          e,
          null,
          r,
          ae
        ), oe.push({ event: Pe, listeners: je }), Be ? Pe.data = Be : (Be = Am(r), Be !== null && (Pe.data = Be)))), (Be = hw ? mw(e, r) : pw(e, r)) && (Pe = Ro(X, "onBeforeInput"), 0 < Pe.length && (je = new Nm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ae
        ), oe.push({
          event: je,
          listeners: Pe
        }), je.data = Be)), sE(
          oe,
          e,
          X,
          r,
          ae
        );
      }
      pg(oe, n);
    });
  }
  function $s(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function Ro(e, n) {
    for (var r = n + "Capture", s = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = ss(e, r), u != null && s.unshift(
        $s(e, u, f)
      ), u = ss(e, n), u != null && s.push(
        $s(e, u, f)
      )), e.tag === 3) return s;
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
  function gg(e, n, r, s, u) {
    for (var f = n._reactName, x = []; r !== null && r !== s; ) {
      var j = r, L = j.alternate, X = j.stateNode;
      if (j = j.tag, L !== null && L === s) break;
      j !== 5 && j !== 26 && j !== 27 || X === null || (L = X, u ? (X = ss(r, f), X != null && x.unshift(
        $s(r, X, L)
      )) : u || (X = ss(r, f), X != null && x.push(
        $s(r, X, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var dE = /\r\n?/g, fE = /\u0000|\uFFFD/g;
  function yg(e) {
    return (typeof e == "string" ? e : "" + e).replace(dE, `
`).replace(fE, "");
  }
  function bg(e, n) {
    return n = yg(n), yg(e) === n;
  }
  function ot(e, n, r, s, u, f) {
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
        bm(e, s, f);
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = VS.get(r) || r, qe(e, r, s));
    }
  }
  function zd(e, n, r, s, u, f) {
    switch (r) {
      case "style":
        bm(e, s, f);
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
            if (r[0] === "o" && r[1] === "n" && (u = r.endsWith("Capture"), n = r.slice(2, u ? r.length - 7 : void 0), f = e[ve] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(n, f, u), typeof s == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, s, u);
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
        var j = f = x = u = null, L = null, X = null;
        for (s in r)
          if (r.hasOwnProperty(s)) {
            var ae = r[s];
            if (ae != null)
              switch (s) {
                case "name":
                  u = ae;
                  break;
                case "type":
                  x = ae;
                  break;
                case "checked":
                  L = ae;
                  break;
                case "defaultChecked":
                  X = ae;
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
        pm(
          e,
          f,
          j,
          L,
          X,
          x,
          u,
          !1
        );
        return;
      case "select":
        Ge("invalid", e), s = x = f = null;
        for (u in r)
          if (r.hasOwnProperty(u) && (j = r[u], j != null))
            switch (u) {
              case "value":
                f = j;
                break;
              case "defaultValue":
                x = j;
                break;
              case "multiple":
                s = j;
              default:
                ot(e, n, u, j, r, null);
            }
        n = f, r = x, e.multiple = !!s, n != null ? ri(e, !!s, n, !1) : r != null && ri(e, !!s, r, !0);
        return;
      case "textarea":
        Ge("invalid", e), f = u = s = null;
        for (x in r)
          if (r.hasOwnProperty(x) && (j = r[x], j != null))
            switch (x) {
              case "value":
                s = j;
                break;
              case "defaultValue":
                u = j;
                break;
              case "children":
                f = j;
                break;
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(l(91));
                break;
              default:
                ot(e, n, x, j, r, null);
            }
        gm(e, s, u, f);
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
        for (s = 0; s < Bs.length; s++)
          Ge(Bs[s], e);
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
        for (X in r)
          if (r.hasOwnProperty(X) && (s = r[X], s != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                ot(e, n, X, s, r, null);
            }
        return;
      default:
        if (Xc(n)) {
          for (ae in r)
            r.hasOwnProperty(ae) && (s = r[ae], s !== void 0 && zd(
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
  function hE(e, n, r, s) {
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
        var u = null, f = null, x = null, j = null, L = null, X = null, ae = null;
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
        for (var K in s) {
          var ee = s[K];
          if (oe = r[K], s.hasOwnProperty(K) && (ee != null || oe != null))
            switch (K) {
              case "type":
                f = ee;
                break;
              case "name":
                u = ee;
                break;
              case "checked":
                X = ee;
                break;
              case "defaultChecked":
                ae = ee;
                break;
              case "value":
                x = ee;
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
                  K,
                  ee,
                  s,
                  oe
                );
            }
        }
        Yc(
          e,
          x,
          j,
          L,
          X,
          ae,
          f,
          u
        );
        return;
      case "select":
        ee = x = j = K = null;
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
        for (u in s)
          if (f = s[u], L = r[u], s.hasOwnProperty(u) && (f != null || L != null))
            switch (u) {
              case "value":
                K = f;
                break;
              case "defaultValue":
                j = f;
                break;
              case "multiple":
                x = f;
              default:
                f !== L && ot(
                  e,
                  n,
                  u,
                  f,
                  s,
                  L
                );
            }
        n = j, r = x, s = ee, K != null ? ri(e, !!r, K, !1) : !!s != !!r && (n != null ? ri(e, !!r, n, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        ee = K = null;
        for (j in r)
          if (u = r[j], r.hasOwnProperty(j) && u != null && !s.hasOwnProperty(j))
            switch (j) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, n, j, null, s, u);
            }
        for (x in s)
          if (u = s[x], f = r[x], s.hasOwnProperty(x) && (u != null || f != null))
            switch (x) {
              case "value":
                K = u;
                break;
              case "defaultValue":
                ee = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(l(91));
                break;
              default:
                u !== f && ot(e, n, x, u, s, f);
            }
        vm(e, K, ee);
        return;
      case "option":
        for (var xe in r)
          if (K = r[xe], r.hasOwnProperty(xe) && K != null && !s.hasOwnProperty(xe))
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
                  K
                );
            }
        for (L in s)
          if (K = s[L], ee = r[L], s.hasOwnProperty(L) && K !== ee && (K != null || ee != null))
            switch (L) {
              case "selected":
                e.selected = K && typeof K != "function" && typeof K != "symbol";
                break;
              default:
                ot(
                  e,
                  n,
                  L,
                  K,
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
          K = r[_e], r.hasOwnProperty(_e) && K != null && !s.hasOwnProperty(_e) && ot(e, n, _e, null, s, K);
        for (X in s)
          if (K = s[X], ee = r[X], s.hasOwnProperty(X) && K !== ee && (K != null || ee != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(l(137, n));
                break;
              default:
                ot(
                  e,
                  n,
                  X,
                  K,
                  s,
                  ee
                );
            }
        return;
      default:
        if (Xc(n)) {
          for (var ct in r)
            K = r[ct], r.hasOwnProperty(ct) && K !== void 0 && !s.hasOwnProperty(ct) && zd(
              e,
              n,
              ct,
              void 0,
              s,
              K
            );
          for (ae in s)
            K = s[ae], ee = r[ae], !s.hasOwnProperty(ae) || K === ee || K === void 0 && ee === void 0 || zd(
              e,
              n,
              ae,
              K,
              s,
              ee
            );
          return;
        }
    }
    for (var H in r)
      K = r[H], r.hasOwnProperty(H) && K != null && !s.hasOwnProperty(H) && ot(e, n, H, null, s, K);
    for (oe in s)
      K = s[oe], ee = r[oe], !s.hasOwnProperty(oe) || K === ee || K == null && ee == null || ot(e, n, oe, K, s, ee);
  }
  function xg(e) {
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
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), s = 0; s < r.length; s++) {
        var u = r[s], f = u.transferSize, x = u.initiatorType, j = u.duration;
        if (f && j && xg(x)) {
          for (x = 0, j = u.responseEnd, s += 1; s < r.length; s++) {
            var L = r[s], X = L.startTime;
            if (X > j) break;
            var ae = L.transferSize, oe = L.initiatorType;
            ae && xg(oe) && (L = L.responseEnd, x += ae * (L < j ? 1 : (j - X) / (L - X)));
          }
          if (--s, n += 8 * (f + x) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var kd = null, Od = null;
  function Mo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Sg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wg(e, n) {
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
  function Ld(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Ud = null;
  function pE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ud ? !1 : (Ud = e, !0) : (Ud = null, !1);
  }
  var Eg = typeof setTimeout == "function" ? setTimeout : void 0, vE = typeof clearTimeout == "function" ? clearTimeout : void 0, jg = typeof Promise == "function" ? Promise : void 0, gE = typeof queueMicrotask == "function" ? queueMicrotask : typeof jg < "u" ? function(e) {
    return jg.resolve(null).then(e).catch(yE);
  } : Eg;
  function yE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function sr(e) {
    return e === "head";
  }
  function Ng(e, n) {
    var r = n, s = 0;
    do {
      var u = r.nextSibling;
      if (e.removeChild(r), u && u.nodeType === 8)
        if (r = u.data, r === "/$" || r === "/&") {
          if (s === 0) {
            e.removeChild(u), Li(n);
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
            var x = f.nextSibling, j = f.nodeName;
            f[He] || j === "SCRIPT" || j === "STYLE" || j === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = x;
          }
        } else
          r === "body" && Vs(e.ownerDocument.body);
      r = u;
    } while (r);
    Li(n);
  }
  function Tg(e, n) {
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
  function Bd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Bd(r), dt(r);
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
  function bE(e, n, r, s) {
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
  function xE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Cg(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function $d(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Vd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function SE(e, n) {
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
  var Hd = null;
  function Rg(e) {
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
  function Mg(e) {
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
  function _g(e, n, r) {
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
  var Fn = /* @__PURE__ */ new Map(), Ag = /* @__PURE__ */ new Set();
  function _o(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ka = C.d;
  C.d = {
    f: wE,
    r: EE,
    D: jE,
    C: NE,
    L: TE,
    m: CE,
    X: ME,
    S: RE,
    M: _E
  };
  function wE() {
    var e = ka.f(), n = So();
    return e || n;
  }
  function EE(e) {
    var n = St(e);
    n !== null && n.tag === 5 && n.type === "form" ? Pp(n) : ka.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function Dg(e, n, r) {
    var s = zi;
    if (s && typeof n == "string" && n) {
      var u = Ln(n);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof r == "string" && (u += '[crossorigin="' + r + '"]'), Ag.has(u) || (Ag.add(u), e = { rel: e, crossOrigin: r, href: n }, s.querySelector(u) === null && (n = s.createElement("link"), rn(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function jE(e) {
    ka.D(e), Dg("dns-prefetch", e, null);
  }
  function NE(e, n) {
    ka.C(e, n), Dg("preconnect", e, n);
  }
  function TE(e, n, r) {
    ka.L(e, n, r);
    var s = zi;
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
          f = ki(e);
          break;
        case "script":
          f = Oi(e);
      }
      Fn.has(f) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Fn.set(f, e), s.querySelector(u) !== null || n === "style" && s.querySelector(Hs(f)) || n === "script" && s.querySelector(qs(f)) || (n = s.createElement("link"), rn(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function CE(e, n) {
    ka.m(e, n);
    var r = zi;
    if (r && e) {
      var s = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Ln(s) + '"][href="' + Ln(e) + '"]', f = u;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = Oi(e);
      }
      if (!Fn.has(f) && (e = v({ rel: "modulepreload", href: e }, n), Fn.set(f, e), r.querySelector(u) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(qs(f)))
              return;
        }
        s = r.createElement("link"), rn(s, "link", e), mt(s), r.head.appendChild(s);
      }
    }
  }
  function RE(e, n, r) {
    ka.S(e, n, r);
    var s = zi;
    if (s && e) {
      var u = zt(s).hoistableStyles, f = ki(e);
      n = n || "default";
      var x = u.get(f);
      if (!x) {
        var j = { loading: 0, preload: null };
        if (x = s.querySelector(
          Hs(f)
        ))
          j.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Fn.get(f)) && qd(e, r);
          var L = x = s.createElement("link");
          mt(L), rn(L, "link", e), L._p = new Promise(function(X, ae) {
            L.onload = X, L.onerror = ae;
          }), L.addEventListener("load", function() {
            j.loading |= 1;
          }), L.addEventListener("error", function() {
            j.loading |= 2;
          }), j.loading |= 4, Ao(x, n, s);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: j
        }, u.set(f, x);
      }
    }
  }
  function ME(e, n) {
    ka.X(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, u = Oi(e), f = s.get(u);
      f || (f = r.querySelector(qs(u)), f || (e = v({ src: e, async: !0 }, n), (n = Fn.get(u)) && Id(e, n), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(u, f));
    }
  }
  function _E(e, n) {
    ka.M(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, u = Oi(e), f = s.get(u);
      f || (f = r.querySelector(qs(u)), f || (e = v({ src: e, async: !0, type: "module" }, n), (n = Fn.get(u)) && Id(e, n), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(u, f));
    }
  }
  function zg(e, n, r, s) {
    var u = (u = ge.current) ? _o(u) : null;
    if (!u) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = ki(r.href), r = zt(
          u
        ).hoistableStyles, s = r.get(n), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = ki(r.href);
          var f = zt(
            u
          ).hoistableStyles, x = f.get(e);
          if (x || (u = u.ownerDocument || u, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, x), (f = u.querySelector(
            Hs(e)
          )) && !f._p && (x.instance = f, x.state.loading = 5), Fn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Fn.set(e, r), f || AE(
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
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Oi(r), r = zt(
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
  function ki(e) {
    return 'href="' + Ln(e) + '"';
  }
  function Hs(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function kg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function AE(e, n, r, s) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? s.loading = 1 : (n = e.createElement("link"), s.preload = n, n.addEventListener("load", function() {
      return s.loading |= 1;
    }), n.addEventListener("error", function() {
      return s.loading |= 2;
    }), rn(n, "link", r), mt(n), e.head.appendChild(n));
  }
  function Oi(e) {
    return '[src="' + Ln(e) + '"]';
  }
  function qs(e) {
    return "script[async]" + e;
  }
  function Og(e, n, r) {
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
          ), mt(s), rn(s, "style", u), Ao(s, r.precedence, e), n.instance = s;
        case "stylesheet":
          u = ki(r.href);
          var f = e.querySelector(
            Hs(u)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, mt(f), f;
          s = kg(r), (u = Fn.get(u)) && qd(s, u), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var x = f;
          return x._p = new Promise(function(j, L) {
            x.onload = j, x.onerror = L;
          }), rn(f, "link", s), n.state.loading |= 4, Ao(f, r.precedence, e), n.instance = f;
        case "script":
          return f = Oi(r.src), (u = e.querySelector(
            qs(f)
          )) ? (n.instance = u, mt(u), u) : (s = r, (u = Fn.get(f)) && (s = v({}, r), Id(s, u)), e = e.ownerDocument || e, u = e.createElement("script"), mt(u), rn(u, "link", s), e.head.appendChild(u), n.instance = u);
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
    ), u = s.length ? s[s.length - 1] : null, f = u, x = 0; x < s.length; x++) {
      var j = s[x];
      if (j.dataset.precedence === n) f = j;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function qd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Id(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Do = null;
  function Lg(e, n, r) {
    if (Do === null) {
      var s = /* @__PURE__ */ new Map(), u = Do = /* @__PURE__ */ new Map();
      u.set(r, s);
    } else
      u = Do, s = u.get(r), s || (s = /* @__PURE__ */ new Map(), u.set(r, s));
    if (s.has(e)) return s;
    for (s.set(e, null), r = r.getElementsByTagName(e), u = 0; u < r.length; u++) {
      var f = r[u];
      if (!(f[He] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = f.getAttribute(n) || "";
        x = e + x;
        var j = s.get(x);
        j ? j.push(f) : s.set(x, [f]);
      }
    }
    return s;
  }
  function Ug(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function DE(e, n, r) {
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
  function Bg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function zE(e, n, r, s) {
    if (r.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var u = ki(s.href), f = n.querySelector(
          Hs(u)
        );
        if (f) {
          n = f._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = f, mt(f);
          return;
        }
        f = n.ownerDocument || n, s = kg(s), (u = Fn.get(u)) && qd(s, u), f = f.createElement("link"), mt(f);
        var x = f;
        x._p = new Promise(function(j, L) {
          x.onload = j, x.onerror = L;
        }), rn(f, "link", s), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = zo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Fd = 0;
  function kE(e, n) {
    return e.stylesheets && e.count === 0 && Oo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var s = setTimeout(function() {
        if (e.stylesheets && Oo(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Fd === 0 && (Fd = 62500 * mE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Oo(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Fd ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(s), clearTimeout(u);
      };
    } : null;
  }
  function zo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Oo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ko = null;
  function Oo(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ko = /* @__PURE__ */ new Map(), n.forEach(OE, e), ko = null, zo.call(e));
  }
  function OE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = ko.get(e);
      if (r) var s = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), ko.set(e, r);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var x = u[f];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), s = x);
        }
        s && r.set(null, s);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), f = r.get(x) || s, f === s && r.set(null, u), r.set(x, u), this.count++, s = zo.bind(this), u.addEventListener("load", s), u.addEventListener("error", s), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Is = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function LE(e, n, r, s, u, f, x, j, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = s, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function $g(e, n, r, s, u, f, x, j, L, X, ae, oe) {
    return e = new LE(
      e,
      n,
      r,
      x,
      L,
      X,
      ae,
      oe,
      j
    ), n = 1, f === !0 && (n |= 24), f = jn(3, null, null, n), e.current = f, f.stateNode = e, n = Eu(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: s,
      isDehydrated: r,
      cache: n
    }, Cu(f), e;
  }
  function Vg(e) {
    return e ? (e = fi, e) : fi;
  }
  function Hg(e, n, r, s, u, f) {
    u = Vg(u), s.context === null ? s.context = u : s.pendingContext = u, s = Ka(n), s.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (s.callback = f), r = Qa(e, s, n), r !== null && (bn(r, e, n), Ss(r, e, n));
  }
  function qg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Yd(e, n) {
    qg(e, n), (e = e.alternate) && qg(e, n);
  }
  function Ig(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = _r(e, 67108864);
      n !== null && bn(n, e, 67108864), Yd(e, 67108864);
    }
  }
  function Fg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Mn();
      n = V(n);
      var r = _r(e, n);
      r !== null && bn(r, e, n), Yd(e, n);
    }
  }
  var Lo = !0;
  function UE(e, n, r, s) {
    var u = k.T;
    k.T = null;
    var f = C.p;
    try {
      C.p = 2, Gd(e, n, r, s);
    } finally {
      C.p = f, k.T = u;
    }
  }
  function BE(e, n, r, s) {
    var u = k.T;
    k.T = null;
    var f = C.p;
    try {
      C.p = 8, Gd(e, n, r, s);
    } finally {
      C.p = f, k.T = u;
    }
  }
  function Gd(e, n, r, s) {
    if (Lo) {
      var u = Xd(s);
      if (u === null)
        Dd(
          e,
          n,
          s,
          Uo,
          r
        ), Gg(e, s);
      else if (VE(
        u,
        e,
        n,
        r,
        s
      ))
        s.stopPropagation();
      else if (Gg(e, s), n & 4 && -1 < $E.indexOf(e)) {
        for (; u !== null; ) {
          var f = St(u);
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
                    ha(f), (tt & 6) === 0 && (bo = qt() + 500, Us(0));
                  }
                }
                break;
              case 31:
              case 13:
                j = _r(f, 2), j !== null && bn(j, f, 2), So(), Yd(f, 2);
            }
          if (f = Xd(s), f === null && Dd(
            e,
            n,
            s,
            Uo,
            r
          ), f === u) break;
          u = f;
        }
        u !== null && s.stopPropagation();
      } else
        Dd(
          e,
          n,
          s,
          null,
          r
        );
    }
  }
  function Xd(e) {
    return e = Kc(e), Pd(e);
  }
  var Uo = null;
  function Pd(e) {
    if (Uo = null, e = st(e), e !== null) {
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
    return Uo = e, null;
  }
  function Yg(e) {
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
  var Kd = !1, lr = null, or = null, cr = null, Fs = /* @__PURE__ */ new Map(), Ys = /* @__PURE__ */ new Map(), ur = [], $E = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Gg(e, n) {
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
        Fs.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ys.delete(n.pointerId);
    }
  }
  function Gs(e, n, r, s, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: s,
      nativeEvent: f,
      targetContainers: [u]
    }, n !== null && (n = St(n), n !== null && Ig(n)), e) : (e.eventSystemFlags |= s, n = e.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), e);
  }
  function VE(e, n, r, s, u) {
    switch (n) {
      case "focusin":
        return lr = Gs(
          lr,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "dragenter":
        return or = Gs(
          or,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "mouseover":
        return cr = Gs(
          cr,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return Fs.set(
          f,
          Gs(
            Fs.get(f) || null,
            e,
            n,
            r,
            s,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Ys.set(
          f,
          Gs(
            Ys.get(f) || null,
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
  function Xg(e) {
    var n = st(e.target);
    if (n !== null) {
      var r = d(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = h(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Fg(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Fg(r);
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
      var r = Xd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var s = new r.constructor(
          r.type,
          r
        );
        Pc = s, r.target.dispatchEvent(s), Pc = null;
      } else
        return n = St(r), n !== null && Ig(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Pg(e, n, r) {
    Bo(e) && r.delete(n);
  }
  function HE() {
    Kd = !1, lr !== null && Bo(lr) && (lr = null), or !== null && Bo(or) && (or = null), cr !== null && Bo(cr) && (cr = null), Fs.forEach(Pg), Ys.forEach(Pg);
  }
  function $o(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Kd || (Kd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      HE
    )));
  }
  var Vo = null;
  function Kg(e) {
    Vo !== e && (Vo = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Vo === e && (Vo = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], s = e[n + 1], u = e[n + 2];
          if (typeof s != "function") {
            if (Pd(s || r) === null)
              continue;
            break;
          }
          var f = St(r);
          f !== null && (e.splice(n, 3), n -= 3, Xu(
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
  function Li(e) {
    function n(L) {
      return $o(L, e);
    }
    lr !== null && $o(lr, e), or !== null && $o(or, e), cr !== null && $o(cr, e), Fs.forEach(n), Ys.forEach(n);
    for (var r = 0; r < ur.length; r++) {
      var s = ur[r];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      Xg(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (s = 0; s < r.length; s += 3) {
        var u = r[s], f = r[s + 1], x = u[ve] || null;
        if (typeof f == "function")
          x || Kg(r);
        else if (x) {
          var j = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, x = f[ve] || null)
              j = x.formAction;
            else if (Pd(u) !== null) continue;
          } else j = x.action;
          typeof j == "function" ? r[s + 1] = j : (r.splice(s, 3), s -= 3), Kg(r);
        }
      }
  }
  function Qg() {
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
  function Qd(e) {
    this._internalRoot = e;
  }
  Ho.prototype.render = Qd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var r = n.current, s = Mn();
    Hg(r, s, e, n, null, null);
  }, Ho.prototype.unmount = Qd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Hg(e.current, 2, null, e, null, null), So(), n[Ee] = null;
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
      ur.splice(r, 0, e), r === 0 && Xg(e);
    }
  };
  var Zg = a.version;
  if (Zg !== "19.2.5")
    throw Error(
      l(
        527,
        Zg,
        "19.2.5"
      )
    );
  C.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var qE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: k,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qo.isDisabled && qo.supportsFiber)
      try {
        Zn = qo.inject(
          qE
        ), Wt = qo;
      } catch {
      }
  }
  return Ps.createRoot = function(e, n) {
    if (!o(e)) throw Error(l(299));
    var r = !1, s = "", u = rv, f = iv, x = sv;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = $g(
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
      Qg
    ), e[Ee] = n.current, Ad(e), new Qd(n);
  }, Ps.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(l(299));
    var s = !1, u = "", f = rv, x = iv, j = sv, L = null;
    return r != null && (r.unstable_strictMode === !0 && (s = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (j = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = $g(
      e,
      1,
      !0,
      n,
      r ?? null,
      s,
      u,
      L,
      f,
      x,
      j,
      Qg
    ), n.context = Vg(null), r = n.current, s = Mn(), s = V(s), u = Ka(s), u.callback = null, Qa(r, u, s), r = s, n.current.lanes = r, it(n, r), ha(n), e[Ee] = n.current, Ad(e), new Ho(n);
  }, Ps.version = "19.2.5", Ps;
}
var ly;
function WE() {
  if (ly) return Wd.exports;
  ly = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Wd.exports = JE(), Wd.exports;
}
var ej = WE();
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
var sx = (t) => {
  throw TypeError(t);
}, tj = (t, a, i) => a.has(t) || sx("Cannot " + i), af = (t, a, i) => (tj(t, a, "read from private field"), i ? i.call(t) : a.get(t)), nj = (t, a, i) => a.has(t) ? sx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i);
function oy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function aj(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: l = !1 } = t, o;
  o = a.map(
    (E, w) => b(
      E,
      typeof E == "string" ? null : E.state,
      w === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let d = g(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function g(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function p() {
    return o[d];
  }
  function b(E, w = null, N, R) {
    let T = Xf(
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
  function v(E) {
    return typeof E == "string" ? E : pa(E);
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
      let N = oy(E) ? E : b(E, w);
      d += 1, o.splice(d, o.length, N), l && m && m({ action: h, location: N, delta: 1 });
    },
    replace(E, w) {
      h = "REPLACE";
      let N = oy(E) ? E : b(E, w);
      o[d] = N, l && m && m({ action: h, location: N, delta: 0 });
    },
    go(E) {
      h = "POP";
      let w = g(d + E), N = o[w];
      d = w, m && m({ action: h, location: N, delta: E });
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
function rj() {
  return Math.random().toString(36).substring(2, 10);
}
function Xf(t, a, i = null, l, o) {
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
    key: a && a.key || l || rj(),
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
function ij(t, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Ie(i, "No window.location.(origin|href) available to create URL");
  let l = typeof t == "string" ? t : pa(t);
  return l = l.replace(/ $/, "%20"), !a && l.startsWith("//") && (l = i + l), new URL(l, i);
}
var sl, cy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (nj(this, sl, /* @__PURE__ */ new Map()), t)
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
    if (af(this, sl).has(t))
      return af(this, sl).get(t);
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
    af(this, sl).set(t, a);
  }
};
sl = /* @__PURE__ */ new WeakMap();
var sj = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function lj(t) {
  return sj.has(
    t
  );
}
var oj = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function cj(t) {
  return oj.has(
    t
  );
}
function uj(t) {
  return t.index === !0;
}
function hl(t, a, i = [], l = {}, o = !1) {
  return t.map((d, h) => {
    let m = [...i, String(h)], g = typeof d.id == "string" ? d.id : m.join("-");
    if (Ie(
      d.index !== !0 || !d.children,
      "Cannot specify children on an index route"
    ), Ie(
      o || !l[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), uj(d)) {
      let p = {
        ...d,
        id: g
      };
      return l[g] = uy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...d,
        id: g,
        children: void 0
      };
      return l[g] = uy(
        p,
        a(p)
      ), d.children && (p.children = hl(
        d.children,
        a,
        m,
        l,
        o
      )), p;
    }
  });
}
function uy(t, a) {
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
  return ll(t, a, i, !1);
}
function ll(t, a, i, l) {
  let o = typeof a == "string" ? ia(a) : a, d = Kn(o.pathname || "/", i);
  if (d == null)
    return null;
  let h = lx(t);
  fj(h);
  let m = null;
  for (let g = 0; m == null && g < h.length; ++g) {
    let p = Ej(d);
    m = Sj(
      h[g],
      p,
      l
    );
  }
  return m;
}
function dj(t, a) {
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
function lx(t, a = [], i = [], l = "", o = !1) {
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
    let v = Gn([l, b.relativePath]), S = i.concat(b);
    h.children && h.children.length > 0 && (Ie(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), lx(
      h.children,
      a,
      S,
      v,
      g
    )), !(h.path == null && !h.index) && a.push({
      path: v,
      score: bj(v, h.index),
      routesMeta: S
    });
  };
  return t.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      d(h, m);
    else
      for (let g of ox(h.path))
        d(h, m, !0, g);
  }), a;
}
function ox(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...l] = a, o = i.endsWith("?"), d = i.replace(/\?$/, "");
  if (l.length === 0)
    return o ? [d, ""] : [d];
  let h = ox(l.join("/")), m = [];
  return m.push(
    ...h.map(
      (g) => g === "" ? d : [d, g].join("/")
    )
  ), o && m.push(...h), m.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function fj(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : xj(
      a.routesMeta.map((l) => l.childrenIndex),
      i.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var hj = /^:[\w-]+$/, mj = 3, pj = 2, vj = 1, gj = 10, yj = -2, dy = (t) => t === "*";
function bj(t, a) {
  let i = t.split("/"), l = i.length;
  return i.some(dy) && (l += yj), a && (l += pj), i.filter((o) => !dy(o)).reduce(
    (o, d) => o + (hj.test(d) ? mj : d === "" ? vj : gj),
    l
  );
}
function xj(t, a) {
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
function Sj(t, a, i = !1) {
  let { routesMeta: l } = t, o = {}, d = "/", h = [];
  for (let m = 0; m < l.length; ++m) {
    let g = l[m], p = m === l.length - 1, b = d === "/" ? a : a.slice(d.length) || "/", v = gc(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: p },
      b
    ), S = g.route;
    if (!v && p && i && !l[l.length - 1].route.index && (v = gc(
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
      pathnameBase: Tj(
        Gn([d, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (d = Gn([d, v.pathnameBase]));
  }
  return h;
}
function gc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, l] = wj(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(i);
  if (!o) return null;
  let d = o[0], h = d.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: l.reduce(
      (p, { paramName: b, isOptional: v }, S) => {
        if (b === "*") {
          let w = m[S] || "";
          h = d.slice(0, d.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const E = m[S];
        return v && !E ? p[b] = void 0 : p[b] = (E || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: d,
    pathnameBase: h,
    pattern: t
  };
}
function wj(t, a = !1, i = !0) {
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
function Ej(t) {
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
function jj({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Gn([t, a]);
}
var cx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, jh = (t) => cx.test(t);
function Nj(t, a = "/") {
  let {
    pathname: i,
    search: l = "",
    hash: o = ""
  } = typeof t == "string" ? ia(t) : t, d;
  return i ? (i = Th(i), i.startsWith("/") ? d = fy(i.substring(1), "/") : d = fy(i, a)) : d = a, {
    pathname: d,
    search: Cj(l),
    hash: Rj(o)
  };
}
function fy(t, a) {
  let i = yc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function rf(t, a, i, l) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function ux(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function Nh(t) {
  let a = ux(t);
  return a.map(
    (i, l) => l === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Dc(t, a, i, l = !1) {
  let o;
  typeof t == "string" ? o = ia(t) : (o = { ...t }, Ie(
    !o.pathname || !o.pathname.includes("?"),
    rf("?", "pathname", "search", o)
  ), Ie(
    !o.pathname || !o.pathname.includes("#"),
    rf("#", "pathname", "hash", o)
  ), Ie(
    !o.search || !o.search.includes("#"),
    rf("#", "search", "hash", o)
  ));
  let d = t === "" || o.pathname === "", h = d ? "/" : o.pathname, m;
  if (h == null)
    m = i;
  else {
    let v = a.length - 1;
    if (!l && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let g = Nj(o, m), p = h && h !== "/" && h.endsWith("/"), b = (d || h === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (p || b) && (g.pathname += "/"), g;
}
var Th = (t) => t.replace(/\/\/+/g, "/"), Gn = (t) => Th(t.join("/")), yc = (t) => t.replace(/\/+$/, ""), Tj = (t) => yc(t).replace(/^\/*/, "/"), Cj = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, Rj = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, Mj = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let l = new Headers(i.headers);
  return l.set("Location", t), new Response(null, { ...i, headers: l });
}, zc = class {
  constructor(t, a, i, l = !1) {
    this.status = t, this.statusText = a || "", this.internal = l, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function ml(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function xl(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Gn(a) || "/";
}
var dx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function fx(t, a) {
  let i = t;
  if (typeof i != "string" || !cx.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let l = i, o = !1;
  if (dx)
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
function _j(t, a) {
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
    let o = Ii(i.lazy, a.lazy, () => {
    });
    o && (l.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((d) => {
      let h = o[d], m = i[`lazy.${d}`];
      if (typeof h == "function" && m.length > 0) {
        let g = Ii(m, h, () => {
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
      let h = d[yr] ?? d, m = Ii(
        i[o],
        h,
        (...g) => hy(g[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yr] = h, l[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (l.middleware = a.middleware.map((o) => {
    let d = o[yr] ?? o, h = Ii(
      i.middleware,
      d,
      (...m) => hy(m[0])
    );
    return h ? (h[yr] = d, h) : o;
  })), l;
}
function Aj(t, a) {
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
    let l = t.navigate[yr] ?? t.navigate, o = Ii(
      i.navigate,
      l,
      (...d) => {
        let [h, m] = d;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? pa(h) : ".",
          ...my(t, m ?? {})
        };
      }
    );
    o && (o[yr] = l, t.navigate = o);
  }
  if (i.fetch.length > 0) {
    let l = t.fetch[yr] ?? t.fetch, o = Ii(i.fetch, l, (...d) => {
      let [h, , m, g] = d;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...my(t, g ?? {})
      };
    });
    o && (o[yr] = l, t.fetch = o);
  }
  return t;
}
function Ii(t, a, i) {
  return t.length === 0 ? null : async (...l) => {
    let o = await hx(
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
async function hx(t, a, i, l) {
  let o = t[l], d;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = hx(t, a, i, l - 1), d = await h, Ie(d, "Expected a result"), d.type === "error" && d.value instanceof Error ? { status: "error", error: d.value } : { status: "success", error: void 0 });
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
function hy(t) {
  let { request: a, context: i, params: l, unstable_pattern: o } = t;
  return {
    request: Dj(a),
    params: { ...l },
    unstable_pattern: o,
    context: zj(i)
  };
}
function my(t, a) {
  return {
    currentUrl: pa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function Dj(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function zj(t) {
  if (Oj(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var kj = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Oj(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === kj;
}
var mx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], Lj = new Set(
  mx
), Uj = [
  "GET",
  ...mx
], Bj = new Set(Uj), px = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), $j = /* @__PURE__ */ new Set([307, 308]), sf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Vj = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Ks = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, Hj = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), vx = "remix-router-transitions", gx = Symbol("ResetLoaderData");
function qj(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ie(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = t.hydrationRouteProperties || [], o = t.mapRouteProperties || Hj, d = o;
  if (t.unstable_instrumentations) {
    let D = t.unstable_instrumentations;
    d = (V) => ({
      ...o(V),
      ..._j(
        D.map((Y) => Y.route).filter(Boolean),
        V
      )
    });
  }
  let h = {}, m = hl(
    t.routes,
    d,
    void 0,
    h
  ), g, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || Xj, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, S = null, E = /* @__PURE__ */ new Set(), w = null, N = null, R = null, T = t.hydrationData != null, O = vr(m, t.history.location, p), z = !1, _ = null, I, J;
  if (O == null && !t.patchRoutesOnNavigation) {
    let D = Yn(404, {
      pathname: t.history.location.pathname
    }), { matches: V, route: Y } = Io(m);
    I = !0, J = !I, O = V, _ = { [Y.id]: D };
  } else if (O && !t.hydrationData && wn(
    O,
    m,
    t.history.location.pathname
  ).active && (O = null), O)
    if (O.some((D) => D.route.lazy))
      I = !1, J = !I;
    else if (!O.some((D) => Ch(D.route)))
      I = !0, J = !I;
    else {
      let D = t.hydrationData ? t.hydrationData.loaderData : null, V = t.hydrationData ? t.hydrationData.errors : null, Y = O;
      if (V) {
        let ue = O.findIndex(
          (de) => V[de.route.id] !== void 0
        );
        Y = Y.slice(0, ue + 1);
      }
      J = !1, I = !0, Y.forEach((ue) => {
        let de = yx(ue.route, D, V);
        J = J || de.renderFallback, I = I && !de.shouldLoad;
      });
    }
  else {
    I = !1, J = !I, O = [];
    let D = wn(
      null,
      m,
      t.history.location.pathname
    );
    D.active && D.matches && (z = !0, O = D.matches);
  }
  let ne, A = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: O,
    initialized: I,
    renderFallback: J,
    navigation: sf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || _,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, q = "POP", F = null, ie = !1, re, te = !1, ce = /* @__PURE__ */ new Map(), W = null, k = !1, C = !1, U = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Map(), Q = 0, M = -1, Z = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Set(), Ae = /* @__PURE__ */ new Map(), Me, Ve = null;
  function Jt() {
    if (S = t.history.listen(
      ({ action: D, location: V, delta: Y }) => {
        if (Me) {
          Me(), Me = void 0;
          return;
        }
        _t(
          Ae.size === 0 || Y != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ue = la({
          currentLocation: A.location,
          nextLocation: V,
          historyAction: D
        });
        if (ue && Y != null) {
          let de = new Promise((Se) => {
            Me = Se;
          });
          t.history.go(Y * -1), Jn(ue, {
            state: "blocked",
            location: V,
            proceed() {
              Jn(ue, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: V
              }), de.then(() => t.history.go(Y));
            },
            reset() {
              let Se = new Map(A.blockers);
              Se.set(ue, Ks), et({ blockers: Se });
            }
          }), F?.resolve(), F = null;
          return;
        }
        return De(D, V);
      }
    ), i) {
      dN(a, ce);
      let D = () => fN(a, ce);
      a.addEventListener("pagehide", D), W = () => a.removeEventListener("pagehide", D);
    }
    return A.initialized || De("POP", A.location, {
      initialHydration: !0
    }), ne;
  }
  function Pt() {
    S && S(), W && W(), E.clear(), re && re.abort(), A.fetchers.forEach((D, V) => Zn(V)), A.blockers.forEach((D, V) => va(V));
  }
  function At(D) {
    return E.add(D), () => E.delete(D);
  }
  function et(D, V = {}) {
    D.matches && (D.matches = D.matches.map((de) => {
      let Se = h[de.route.id], pe = de.route;
      return pe.element !== Se.element || pe.errorElement !== Se.errorElement || pe.hydrateFallbackElement !== Se.hydrateFallbackElement ? {
        ...de,
        route: Se
      } : de;
    })), A = {
      ...A,
      ...D
    };
    let Y = [], ue = [];
    A.fetchers.forEach((de, Se) => {
      de.state === "idle" && (ge.has(Se) ? Y.push(Se) : ue.push(Se));
    }), ge.forEach((de) => {
      !A.fetchers.has(de) && !B.has(de) && Y.push(de);
    }), [...E].forEach(
      (de) => de(A, {
        deletedFetchers: Y,
        newErrors: D.errors ?? null,
        viewTransitionOpts: V.viewTransitionOpts,
        flushSync: V.flushSync === !0
      })
    ), Y.forEach((de) => Zn(de)), ue.forEach((de) => A.fetchers.delete(de));
  }
  function pt(D, V, { flushSync: Y } = {}) {
    let ue = A.actionData != null && A.navigation.formMethod != null && cn(A.navigation.formMethod) && A.navigation.state === "loading" && D.state?._isRedirect !== !0, de;
    V.actionData ? Object.keys(V.actionData).length > 0 ? de = V.actionData : de = null : ue ? de = A.actionData : de = null;
    let Se = V.loaderData ? Ny(
      A.loaderData,
      V.loaderData,
      V.matches || [],
      V.errors
    ) : A.loaderData, pe = A.blockers;
    pe.size > 0 && (pe = new Map(pe), pe.forEach((Re, Ne) => pe.set(Ne, Ks)));
    let ve = k ? !1 : Gt(D, V.matches || A.matches), Ee = ie === !0 || A.navigation.formMethod != null && cn(A.navigation.formMethod) && D.state?._isRedirect !== !0;
    g && (m = g, g = void 0), k || q === "POP" || (q === "PUSH" ? t.history.push(D, D.state) : q === "REPLACE" && t.history.replace(D, D.state));
    let be;
    if (q === "POP") {
      let Re = ce.get(A.location.pathname);
      Re && Re.has(D.pathname) ? be = {
        currentLocation: A.location,
        nextLocation: D
      } : ce.has(D.pathname) && (be = {
        currentLocation: D,
        nextLocation: A.location
      });
    } else if (te) {
      let Re = ce.get(A.location.pathname);
      Re ? Re.add(D.pathname) : (Re = /* @__PURE__ */ new Set([D.pathname]), ce.set(A.location.pathname, Re)), be = {
        currentLocation: A.location,
        nextLocation: D
      };
    }
    et(
      {
        ...V,
        // matches, errors, fetchers go through as-is
        actionData: de,
        loaderData: Se,
        historyAction: q,
        location: D,
        initialized: !0,
        renderFallback: !1,
        navigation: sf,
        revalidation: "idle",
        restoreScrollPosition: ve,
        preventScrollReset: Ee,
        blockers: pe
      },
      {
        viewTransitionOpts: be,
        flushSync: Y === !0
      }
    ), q = "POP", ie = !1, te = !1, k = !1, C = !1, F?.resolve(), F = null, Ve?.resolve(), Ve = null;
  }
  async function he(D, V) {
    if (F?.resolve(), F = null, typeof D == "number") {
      F || (F = My());
      let dt = F.promise;
      return t.history.go(D), dt;
    }
    let Y = Pf(
      A.location,
      A.matches,
      p,
      D,
      V?.fromRouteId,
      V?.relative
    ), { path: ue, submission: de, error: Se } = py(
      !1,
      Y,
      V
    ), pe;
    V?.unstable_mask && (pe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof V.unstable_mask == "string" ? ia(V.unstable_mask) : {
        ...A.location.unstable_mask,
        ...V.unstable_mask
      }
    });
    let ve = A.location, Ee = Xf(
      ve,
      ue,
      V && V.state,
      void 0,
      pe
    );
    Ee = {
      ...Ee,
      ...t.history.encodeLocation(Ee)
    };
    let be = V && V.replace != null ? V.replace : void 0, Re = "PUSH";
    be === !0 ? Re = "REPLACE" : be === !1 || de != null && cn(de.formMethod) && de.formAction === A.location.pathname + A.location.search && (Re = "REPLACE");
    let Ne = V && "preventScrollReset" in V ? V.preventScrollReset === !0 : void 0, Ze = (V && V.flushSync) === !0, He = la({
      currentLocation: ve,
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
          }), he(D, V);
        },
        reset() {
          let dt = new Map(A.blockers);
          dt.set(He, Ks), et({ blockers: dt });
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
      flushSync: Ze,
      callSiteDefaultShouldRevalidate: V && V.unstable_defaultShouldRevalidate
    });
  }
  function Oe() {
    Ve || (Ve = My()), nt(), et({ revalidation: "loading" });
    let D = Ve.promise;
    return A.navigation.state === "submitting" ? D : A.navigation.state === "idle" ? (De(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), D) : (De(
      q || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: te === !0
      }
    ), D);
  }
  async function De(D, V, Y) {
    re && re.abort(), re = null, q = D, k = (Y && Y.startUninterruptedRevalidation) === !0, Dt(A.location, A.matches), ie = (Y && Y.preventScrollReset) === !0, te = (Y && Y.enableViewTransition) === !0;
    let ue = g || m, de = Y && Y.overrideNavigation, Se = Y?.initialHydration && A.matches && A.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : vr(ue, V, p), pe = (Y && Y.flushSync) === !0;
    if (Se && A.initialized && !C && tN(A.location, V) && !(Y && Y.submission && cn(Y.submission.formMethod))) {
      pt(V, { matches: Se }, { flushSync: pe });
      return;
    }
    let ve = wn(Se, ue, V.pathname);
    if (ve.active && ve.matches && (Se = ve.matches), !Se) {
      let { error: st, notFoundMatches: St, route: Fe } = hn(
        V.pathname
      );
      pt(
        V,
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
      V,
      re.signal,
      Y && Y.submission
    ), be = t.getContext ? await t.getContext() : new cy(), Re;
    if (Y && Y.pendingError)
      Re = [
        gr(Se).route.id,
        { type: "error", error: Y.pendingError }
      ];
    else if (Y && Y.submission && cn(Y.submission.formMethod)) {
      let st = await Te(
        Ee,
        V,
        Y.submission,
        Se,
        be,
        ve.active,
        Y && Y.initialHydration === !0,
        { replace: Y.replace, flushSync: pe }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [St, Fe] = st.pendingActionResult;
        if (An(Fe) && ml(Fe.error) && Fe.error.status === 404) {
          re = null, pt(V, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [St]: Fe.error
            }
          });
          return;
        }
      }
      Se = st.matches || Se, Re = st.pendingActionResult, de = lf(V, Y.submission), pe = !1, ve.active = !1, Ee = Hi(
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
      V,
      Se,
      be,
      ve.active,
      de,
      Y && Y.submission,
      Y && Y.fetcherSubmission,
      Y && Y.replace,
      Y && Y.initialHydration === !0,
      pe,
      Re,
      Y && Y.callSiteDefaultShouldRevalidate
    );
    Ne || (re = null, pt(V, {
      matches: Ze || Se,
      ...Ty(Re),
      loaderData: He,
      errors: dt
    }));
  }
  async function Te(D, V, Y, ue, de, Se, pe, ve = {}) {
    nt();
    let Ee = cN(V, Y);
    if (et({ navigation: Ee }, { flushSync: ve.flushSync === !0 }), Se) {
      let Ne = await it(
        ue,
        V.pathname,
        D.signal
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
        let Ze = gr(Ne.partialMatches).route.id;
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
          V.pathname
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
    let be, Re = cc(ue, V);
    if (!Re.route.action && !Re.route.lazy)
      be = {
        type: "error",
        error: Yn(405, {
          method: D.method,
          pathname: V.pathname,
          routeId: Re.route.id
        })
      };
    else {
      let Ne = Xi(
        d,
        h,
        D,
        V,
        ue,
        Re,
        pe ? [] : l,
        de
      ), Ze = await ze(
        D,
        V,
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
      if (D.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Yr(be)) {
      let Ne;
      return ve && ve.replace != null ? Ne = ve.replace : Ne = wy(
        be.response.headers.get("Location"),
        new URL(D.url),
        p,
        t.history
      ) === A.location.pathname + A.location.search, await ye(D, be, !0, {
        submission: Y,
        replace: Ne
      }), { shortCircuited: !0 };
    }
    if (An(be)) {
      let Ne = gr(ue, Re.route.id);
      return (ve && ve.replace) !== !0 && (q = "PUSH"), {
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
  async function bt(D, V, Y, ue, de, Se, pe, ve, Ee, be, Re, Ne, Ze) {
    let He = Se || lf(V, pe), dt = pe || ve || Ry(He), st = !k && !be;
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
        Y,
        V.pathname,
        D.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: ln, route: kt } = Io(m);
          return {
            matches: ln,
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
        Y = qe.matches;
      else {
        let { error: Ct, notFoundMatches: ln, route: kt } = hn(
          V.pathname
        );
        return {
          matches: ln,
          loaderData: {},
          errors: {
            [kt.id]: Ct
          }
        };
      }
    }
    let St = g || m, { dsMatches: Fe, revalidatingFetchers: zt } = vy(
      D,
      ue,
      d,
      h,
      t.history,
      A,
      Y,
      dt,
      V,
      be ? [] : l,
      be === !0,
      C,
      U,
      ge,
      le,
      P,
      St,
      p,
      t.patchRoutesOnNavigation != null,
      Ne,
      Ze
    );
    if (M = ++Q, !t.dataStrategy && !Fe.some((qe) => qe.shouldLoad) && !Fe.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && zt.length === 0) {
      let qe = ei();
      return pt(
        V,
        {
          matches: Y,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ne && An(Ne[1]) ? { [Ne[0]]: Ne[1].error } : null,
          ...Ty(Ne),
          ...qe ? { fetchers: new Map(A.fetchers) } : {}
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
      D,
      V,
      ue
    );
    if (D.signal.aborted)
      return { shortCircuited: !0 };
    re && re.signal.removeEventListener(
      "abort",
      mt
    ), zt.forEach((qe) => B.delete(qe.key));
    let Kt = Fo(qa);
    if (Kt)
      return await ye(D, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Kt = Fo(Wn), Kt)
      return P.add(Kt.key), await ye(D, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: oa, errors: Nr } = jy(
      A,
      Y,
      qa,
      Ne,
      zt,
      Wn
    );
    be && A.errors && (Nr = { ...A.errors, ...Nr });
    let ca = ei(), Tr = Ha(M), ti = ca || Tr || zt.length > 0;
    return {
      matches: Y,
      loaderData: oa,
      errors: Nr,
      ...ti ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function xt(D) {
    if (D && !An(D[1]))
      return {
        [D[0]]: D[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function dn(D) {
    return D.forEach((V) => {
      let Y = A.fetchers.get(V.key), ue = Qs(
        void 0,
        Y ? Y.data : void 0
      );
      A.fetchers.set(V.key, ue);
    }), new Map(A.fetchers);
  }
  async function Ht(D, V, Y, ue) {
    Tt(D);
    let de = (ue && ue.flushSync) === !0, Se = g || m, pe = Pf(
      A.location,
      A.matches,
      p,
      Y,
      V,
      ue?.relative
    ), ve = vr(Se, pe, p), Ee = wn(ve, Se, pe);
    if (Ee.active && Ee.matches && (ve = Ee.matches), !ve) {
      Ft(
        D,
        V,
        Yn(404, { pathname: pe }),
        { flushSync: de }
      );
      return;
    }
    let { path: be, submission: Re, error: Ne } = py(
      !0,
      pe,
      ue
    );
    if (Ne) {
      Ft(D, V, Ne, { flushSync: de });
      return;
    }
    let Ze = t.getContext ? await t.getContext() : new cy(), He = (ue && ue.preventScrollReset) === !0;
    if (Re && cn(Re.formMethod)) {
      await kn(
        D,
        V,
        be,
        ve,
        Ze,
        Ee.active,
        de,
        He,
        Re,
        ue && ue.unstable_defaultShouldRevalidate
      );
      return;
    }
    le.set(D, { routeId: V, path: be }), await qt(
      D,
      V,
      be,
      ve,
      Ze,
      Ee.active,
      de,
      He,
      Re
    );
  }
  async function kn(D, V, Y, ue, de, Se, pe, ve, Ee, be) {
    nt(), le.delete(D);
    let Re = A.fetchers.get(D);
    It(D, uN(Ee, Re), {
      flushSync: pe
    });
    let Ne = new AbortController(), Ze = Hi(
      t.history,
      Y,
      Ne.signal,
      Ee
    );
    if (Se) {
      let vt = await it(
        ue,
        new URL(Ze.url).pathname,
        Ze.signal,
        D
      );
      if (vt.type === "aborted")
        return;
      if (vt.type === "error") {
        Ft(D, V, vt.error, { flushSync: pe });
        return;
      } else if (vt.matches)
        ue = vt.matches;
      else {
        Ft(
          D,
          V,
          Yn(404, { pathname: Y }),
          { flushSync: pe }
        );
        return;
      }
    }
    let He = cc(ue, Y);
    if (!He.route.action && !He.route.lazy) {
      let vt = Yn(405, {
        method: Ee.formMethod,
        pathname: Y,
        routeId: V
      });
      Ft(D, V, vt, { flushSync: pe });
      return;
    }
    B.set(D, Ne);
    let dt = Q, st = Xi(
      d,
      h,
      Ze,
      Y,
      ue,
      He,
      l,
      de
    ), St = await ze(
      Ze,
      Y,
      st,
      de,
      D
    ), Fe = St[He.route.id];
    if (!Fe) {
      for (let vt of st)
        if (St[vt.route.id]) {
          Fe = St[vt.route.id];
          break;
        }
    }
    if (Ze.signal.aborted) {
      B.get(D) === Ne && B.delete(D);
      return;
    }
    if (ge.has(D)) {
      if (Yr(Fe) || An(Fe)) {
        It(D, Oa(void 0));
        return;
      }
    } else {
      if (Yr(Fe))
        if (B.delete(D), M > dt) {
          It(D, Oa(void 0));
          return;
        } else
          return P.add(D), It(D, Qs(Ee)), ye(Ze, Fe, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: ve
          });
      if (An(Fe)) {
        Ft(D, V, Fe.error);
        return;
      }
    }
    let zt = A.navigation.location || A.location, mt = Hi(
      t.history,
      zt,
      Ne.signal
    ), qa = g || m, Wn = A.navigation.state !== "idle" ? vr(qa, A.navigation.location, p) : A.matches;
    Ie(Wn, "Didn't find any matches after fetcher action");
    let Kt = ++Q;
    Z.set(D, Kt);
    let oa = Qs(Ee, Fe.data);
    A.fetchers.set(D, oa);
    let { dsMatches: Nr, revalidatingFetchers: ca } = vy(
      mt,
      de,
      d,
      h,
      t.history,
      A,
      Wn,
      Ee,
      zt,
      l,
      !1,
      C,
      U,
      ge,
      le,
      P,
      qa,
      p,
      t.patchRoutesOnNavigation != null,
      [He.route.id, Fe],
      be
    );
    ca.filter((vt) => vt.key !== D).forEach((vt) => {
      let ni = vt.key, ai = A.fetchers.get(ni), Al = Qs(
        void 0,
        ai ? ai.data : void 0
      );
      A.fetchers.set(ni, Al), Tt(ni), vt.controller && B.set(ni, vt.controller);
    }), et({ fetchers: new Map(A.fetchers) });
    let Tr = () => ca.forEach((vt) => Tt(vt.key));
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
    ), Z.delete(D), B.delete(D), ca.forEach((vt) => B.delete(vt.key)), A.fetchers.has(D)) {
      let vt = Oa(Fe.data);
      A.fetchers.set(D, vt);
    }
    let Ct = Fo(ti);
    if (Ct)
      return ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    if (Ct = Fo(qe), Ct)
      return P.add(Ct.key), ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    let { loaderData: ln, errors: kt } = jy(
      A,
      Wn,
      ti,
      void 0,
      ca,
      qe
    );
    Ha(Kt), A.navigation.state === "loading" && Kt > M ? (Ie(q, "Expected pending action"), re && re.abort(), pt(A.navigation.location, {
      matches: Wn,
      loaderData: ln,
      errors: kt,
      fetchers: new Map(A.fetchers)
    })) : (et({
      errors: kt,
      loaderData: Ny(
        A.loaderData,
        ln,
        Wn,
        kt
      ),
      fetchers: new Map(A.fetchers)
    }), C = !1);
  }
  async function qt(D, V, Y, ue, de, Se, pe, ve, Ee) {
    let be = A.fetchers.get(D);
    It(
      D,
      Qs(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: pe }
    );
    let Re = new AbortController(), Ne = Hi(
      t.history,
      Y,
      Re.signal
    );
    if (Se) {
      let Fe = await it(
        ue,
        new URL(Ne.url).pathname,
        Ne.signal,
        D
      );
      if (Fe.type === "aborted")
        return;
      if (Fe.type === "error") {
        Ft(D, V, Fe.error, { flushSync: pe });
        return;
      } else if (Fe.matches)
        ue = Fe.matches;
      else {
        Ft(
          D,
          V,
          Yn(404, { pathname: Y }),
          { flushSync: pe }
        );
        return;
      }
    }
    let Ze = cc(ue, Y);
    B.set(D, Re);
    let He = Q, dt = Xi(
      d,
      h,
      Ne,
      Y,
      ue,
      Ze,
      l,
      de
    ), st = await ze(
      Ne,
      Y,
      dt,
      de,
      D
    ), St = st[Ze.route.id];
    if (!St) {
      for (let Fe of ue)
        if (st[Fe.route.id]) {
          St = st[Fe.route.id];
          break;
        }
    }
    if (B.get(D) === Re && B.delete(D), !Ne.signal.aborted) {
      if (ge.has(D)) {
        It(D, Oa(void 0));
        return;
      }
      if (Yr(St))
        if (M > He) {
          It(D, Oa(void 0));
          return;
        } else {
          P.add(D), await ye(Ne, St, !1, {
            preventScrollReset: ve
          });
          return;
        }
      if (An(St)) {
        Ft(D, V, St.error);
        return;
      }
      It(D, Oa(St.data));
    }
  }
  async function ye(D, V, Y, {
    submission: ue,
    fetcherSubmission: de,
    preventScrollReset: Se,
    replace: pe
  } = {}) {
    Y || (F?.resolve(), F = null), V.response.headers.has("X-Remix-Revalidate") && (C = !0);
    let ve = V.response.headers.get("Location");
    Ie(ve, "Expected a Location header on the redirect Response"), ve = wy(
      ve,
      new URL(D.url),
      p,
      t.history
    );
    let Ee = Xf(A.location, ve, {
      _isRedirect: !0
    });
    if (i) {
      let dt = !1;
      if (V.response.headers.has("X-Remix-Reload-Document"))
        dt = !0;
      else if (jh(ve)) {
        const st = ij(ve, !0);
        dt = // Hard reload if it's an absolute URL to a new origin
        st.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Kn(st.pathname, p) == null;
      }
      if (dt) {
        pe ? a.location.replace(ve) : a.location.assign(ve);
        return;
      }
    }
    re = null;
    let be = pe === !0 || V.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Re, formAction: Ne, formEncType: Ze } = A.navigation;
    !ue && !de && Re && Ne && Ze && (ue = Ry(A.navigation));
    let He = ue || de;
    if ($j.has(V.response.status) && He && cn(He.formMethod))
      await De(be, Ee, {
        submission: {
          ...He,
          formAction: ve
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || ie,
        enableViewTransition: Y ? te : void 0
      });
    else {
      let dt = lf(
        Ee,
        ue
      );
      await De(be, Ee, {
        overrideNavigation: dt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: de,
        // Preserve these flags across redirects
        preventScrollReset: Se || ie,
        enableViewTransition: Y ? te : void 0
      });
    }
  }
  async function ze(D, V, Y, ue, de) {
    let Se, pe = {};
    try {
      Se = await Kj(
        b,
        D,
        V,
        Y,
        de,
        ue,
        !1
      );
    } catch (ve) {
      return Y.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        pe[Ee.route.id] = {
          type: "error",
          error: ve
        };
      }), pe;
    }
    if (D.signal.aborted)
      return pe;
    if (!cn(D.method))
      for (let ve of Y) {
        if (Se[ve.route.id]?.type === "error")
          break;
        !Se.hasOwnProperty(ve.route.id) && !A.loaderData.hasOwnProperty(ve.route.id) && (!A.errors || !A.errors.hasOwnProperty(ve.route.id)) && ve.shouldCallHandler() && (Se[ve.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ve.route.id}`
          )
        });
      }
    for (let [ve, Ee] of Object.entries(Se))
      if (iN(Ee)) {
        let be = Ee.result;
        pe[ve] = {
          type: "redirect",
          response: Wj(
            be,
            D,
            ve,
            Y,
            p
          )
        };
      } else
        pe[ve] = await Jj(Ee);
    return pe;
  }
  async function Qe(D, V, Y, ue, de) {
    let Se = ze(
      Y,
      ue,
      D,
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
  function nt() {
    C = !0, le.forEach((D, V) => {
      B.has(V) && U.add(V), Tt(V);
    });
  }
  function It(D, V, Y = {}) {
    A.fetchers.set(D, V), et(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (Y && Y.flushSync) === !0 }
    );
  }
  function Ft(D, V, Y, ue = {}) {
    let de = gr(A.matches, V);
    Zn(D), et(
      {
        errors: {
          [de.route.id]: Y
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (ue && ue.flushSync) === !0 }
    );
  }
  function jr(D) {
    return fe.set(D, (fe.get(D) || 0) + 1), ge.has(D) && ge.delete(D), A.fetchers.get(D) || Vj;
  }
  function sa(D, V) {
    Tt(D, V?.reason), It(D, Oa(null));
  }
  function Zn(D) {
    let V = A.fetchers.get(D);
    B.has(D) && !(V && V.state === "loading" && Z.has(D)) && Tt(D), le.delete(D), Z.delete(D), P.delete(D), ge.delete(D), U.delete(D), A.fetchers.delete(D);
  }
  function Wt(D) {
    let V = (fe.get(D) || 0) - 1;
    V <= 0 ? (fe.delete(D), ge.add(D)) : fe.set(D, V), et({ fetchers: new Map(A.fetchers) });
  }
  function Tt(D, V) {
    let Y = B.get(D);
    Y && (Y.abort(V), B.delete(D));
  }
  function Yt(D) {
    for (let V of D) {
      let Y = jr(V), ue = Oa(Y.data);
      A.fetchers.set(V, ue);
    }
  }
  function ei() {
    let D = [], V = !1;
    for (let Y of P) {
      let ue = A.fetchers.get(Y);
      Ie(ue, `Expected fetcher: ${Y}`), ue.state === "loading" && (P.delete(Y), D.push(Y), V = !0);
    }
    return Yt(D), V;
  }
  function Ha(D) {
    let V = [];
    for (let [Y, ue] of Z)
      if (ue < D) {
        let de = A.fetchers.get(Y);
        Ie(de, `Expected fetcher: ${Y}`), de.state === "loading" && (Tt(Y), Z.delete(Y), V.push(Y));
      }
    return Yt(V), V.length > 0;
  }
  function On(D, V) {
    let Y = A.blockers.get(D) || Ks;
    return Ae.get(D) !== V && Ae.set(D, V), Y;
  }
  function va(D) {
    A.blockers.delete(D), Ae.delete(D);
  }
  function Jn(D, V) {
    let Y = A.blockers.get(D) || Ks;
    Ie(
      Y.state === "unblocked" && V.state === "blocked" || Y.state === "blocked" && V.state === "blocked" || Y.state === "blocked" && V.state === "proceeding" || Y.state === "blocked" && V.state === "unblocked" || Y.state === "proceeding" && V.state === "unblocked",
      `Invalid blocker state transition: ${Y.state} -> ${V.state}`
    );
    let ue = new Map(A.blockers);
    ue.set(D, V), et({ blockers: ue });
  }
  function la({
    currentLocation: D,
    nextLocation: V,
    historyAction: Y
  }) {
    if (Ae.size === 0)
      return;
    Ae.size > 1 && _t(!1, "A router only supports one blocker at a time");
    let ue = Array.from(Ae.entries()), [de, Se] = ue[ue.length - 1], pe = A.blockers.get(de);
    if (!(pe && pe.state === "proceeding") && Se({ currentLocation: D, nextLocation: V, historyAction: Y }))
      return de;
  }
  function hn(D) {
    let V = Yn(404, { pathname: D }), Y = g || m, { matches: ue, route: de } = Io(Y);
    return { notFoundMatches: ue, route: de, error: V };
  }
  function ke(D, V, Y) {
    if (w = D, R = V, N = Y || null, !T && A.navigation === sf) {
      T = !0;
      let ue = Gt(A.location, A.matches);
      ue != null && et({ restoreScrollPosition: ue });
    }
    return () => {
      w = null, R = null, N = null;
    };
  }
  function ut(D, V) {
    return N && N(
      D,
      V.map((ue) => dj(ue, A.loaderData))
    ) || D.key;
  }
  function Dt(D, V) {
    if (w && R) {
      let Y = ut(D, V);
      w[Y] = R();
    }
  }
  function Gt(D, V) {
    if (w) {
      let Y = ut(D, V), ue = w[Y];
      if (typeof ue == "number")
        return ue;
    }
    return null;
  }
  function wn(D, V, Y) {
    if (t.patchRoutesOnNavigation)
      if (D) {
        if (Object.keys(D[0].params).length > 0)
          return { active: !0, matches: ll(
            V,
            Y,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ll(
          V,
          Y,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function it(D, V, Y, ue) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: D };
    let de = D;
    for (; ; ) {
      let Se = g == null, pe = g || m, ve = h;
      try {
        await t.patchRoutesOnNavigation({
          signal: Y,
          path: V,
          matches: de,
          fetcherKey: ue,
          patch: (Re, Ne) => {
            Y.aborted || gy(
              Re,
              Ne,
              pe,
              ve,
              d,
              !1
            );
          }
        });
      } catch (Re) {
        return { type: "error", error: Re, partialMatches: de };
      } finally {
        Se && !Y.aborted && (m = [...m]);
      }
      if (Y.aborted)
        return { type: "aborted" };
      let Ee = vr(pe, V, p), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = ll(
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
      if (be || (be = ll(
        pe,
        V,
        p,
        !0
      )), !be || en(de, be))
        return { type: "success", matches: null };
      de = be;
    }
  }
  function en(D, V) {
    return D.length === V.length && D.every((Y, ue) => Y.route.id === V[ue].route.id);
  }
  function ga(D) {
    h = {}, g = hl(
      D,
      d,
      void 0,
      h
    );
  }
  function sn(D, V, Y = !1) {
    let ue = g == null;
    gy(
      D,
      V,
      g || m,
      h,
      d,
      Y
    ), ue && (m = [...m], et({}));
  }
  return ne = {
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
    initialize: Jt,
    subscribe: At,
    enableScrollRestoration: ke,
    navigate: he,
    fetch: Ht,
    revalidate: Oe,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (D) => t.history.createHref(D),
    encodeLocation: (D) => t.history.encodeLocation(D),
    getFetcher: jr,
    resetFetcher: sa,
    deleteFetcher: Wt,
    dispose: Pt,
    getBlocker: On,
    deleteBlocker: va,
    patchRoutes: sn,
    _internalFetchControllers: B,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ga,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(D) {
      et(D);
    }
  }, t.unstable_instrumentations && (ne = Aj(
    ne,
    t.unstable_instrumentations.map((D) => D.router).filter(Boolean)
  )), ne;
}
function Ij(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Pf(t, a, i, l, o, d) {
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
  let g = Dc(
    l || ".",
    Nh(h),
    Kn(t.pathname, i) || t.pathname,
    d === "path"
  );
  if (l == null && (g.search = t.search, g.hash = t.hash), (l == null || l === "" || l === ".") && m) {
    let p = Mh(g.search);
    if (m.route.index && !p)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((E) => E).forEach((E) => b.append("index", E));
      let S = b.toString();
      g.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (g.pathname = jj({ basename: i, pathname: g.pathname })), pa(g);
}
function py(t, a, i) {
  if (!i || !Ij(i))
    return { path: a };
  if (i.formMethod && !oN(i.formMethod))
    return {
      path: a,
      error: Yn(405, { method: i.formMethod })
    };
  let l = () => ({
    path: a,
    error: Yn(400, { type: "invalid-body" })
  }), d = (i.formMethod || "get").toUpperCase(), h = Nx(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!cn(d))
        return l();
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
          formMethod: d,
          formAction: h,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!cn(d))
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
    m = Qf(i.formData), g = i.formData;
  else if (i.body instanceof FormData)
    m = Qf(i.body), g = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, g = Ey(m);
  else if (i.body == null)
    m = new URLSearchParams(), g = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), g = Ey(m);
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
  if (cn(p.formMethod))
    return { path: a, submission: p };
  let b = ia(a);
  return t && b.search && Mh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: pa(b), submission: p };
}
function vy(t, a, i, l, o, d, h, m, g, p, b, v, S, E, w, N, R, T, O, z, _) {
  let I = z ? An(z[1]) ? z[1].error : z[1].data : void 0, J = o.createURL(d.location), ne = o.createURL(g), A;
  if (b && d.errors) {
    let W = Object.keys(d.errors)[0];
    A = h.findIndex((k) => k.route.id === W);
  } else if (z && An(z[1])) {
    let W = z[0];
    A = h.findIndex((k) => k.route.id === W) - 1;
  }
  let q = z ? z[1].statusCode : void 0, F = q && q >= 400, ie = {
    currentUrl: J,
    currentParams: d.matches[0]?.params || {},
    nextUrl: ne,
    nextParams: h[0].params,
    ...m,
    actionResult: I,
    actionStatus: q
  }, re = xl(h), te = h.map((W, k) => {
    let { route: C } = W, U = null;
    if (A != null && k > A)
      U = !1;
    else if (C.lazy)
      U = !0;
    else if (!Ch(C))
      U = !1;
    else if (b) {
      let { shouldLoad: Z } = yx(
        C,
        d.loaderData,
        d.errors
      );
      U = Z;
    } else Fj(d.loaderData, d.matches[k], W) && (U = !0);
    if (U !== null)
      return Kf(
        i,
        l,
        t,
        g,
        re,
        W,
        p,
        a,
        U
      );
    let B = !1;
    typeof _ == "boolean" ? B = _ : F ? B = !1 : (v || J.pathname + J.search === ne.pathname + ne.search || J.search !== ne.search || Yj(d.matches[k], W)) && (B = !0);
    let Q = {
      ...ie,
      defaultShouldRevalidate: B
    }, M = cl(W, Q);
    return Kf(
      i,
      l,
      t,
      g,
      re,
      W,
      p,
      a,
      M,
      Q,
      _
    );
  }), ce = [];
  return w.forEach((W, k) => {
    if (b || !h.some((le) => le.route.id === W.routeId) || E.has(k))
      return;
    let C = d.fetchers.get(k), U = C && C.state !== "idle" && C.data === void 0, B = vr(R, W.path, T);
    if (!B) {
      if (O && U)
        return;
      ce.push({
        key: k,
        routeId: W.routeId,
        path: W.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(k))
      return;
    let Q = cc(B, W.path), M = new AbortController(), Z = Hi(
      o,
      W.path,
      M.signal
    ), P = null;
    if (S.has(k))
      S.delete(k), P = Xi(
        i,
        l,
        Z,
        W.path,
        B,
        Q,
        p,
        a
      );
    else if (U)
      v && (P = Xi(
        i,
        l,
        Z,
        W.path,
        B,
        Q,
        p,
        a
      ));
    else {
      let le;
      typeof _ == "boolean" ? le = _ : F ? le = !1 : le = v;
      let fe = {
        ...ie,
        defaultShouldRevalidate: le
      };
      cl(Q, fe) && (P = Xi(
        i,
        l,
        Z,
        W.path,
        B,
        Q,
        p,
        a,
        fe
      ));
    }
    P && ce.push({
      key: k,
      routeId: W.routeId,
      path: W.path,
      matches: P,
      match: Q,
      request: Z,
      controller: M
    });
  }), { dsMatches: te, revalidatingFetchers: ce };
}
function Ch(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function yx(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Ch(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && t.id in a, o = i != null && i[t.id] !== void 0;
  if (!l && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let d = !l && !o;
  return { shouldLoad: d, renderFallback: d };
}
function Fj(t, a, i) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !t.hasOwnProperty(i.route.id);
  return l || o;
}
function Yj(t, a) {
  let i = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function cl(t, a) {
  if (t.route.shouldRevalidate) {
    let i = t.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function gy(t, a, i, l, o, d) {
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
      (v) => bx(p, v)
    );
    b ? g.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = hl(
      m,
      o,
      [t || "_", "patch", String(h?.length || "0")],
      l
    );
    h.push(...p);
  }
  if (d && g.length > 0)
    for (let p = 0; p < g.length; p++) {
      let { existingRoute: b, newRoute: v } = g[p], S = b, [E] = hl(
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
function bx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, l) => a.children?.some((o) => bx(i, o))
  ) ?? !1 : !1;
}
var yy = /* @__PURE__ */ new WeakMap(), xx = ({
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
  let h = yy.get(o);
  h || (h = {}, yy.set(o, h));
  let m = h[t];
  if (m)
    return m;
  let g = (async () => {
    let p = lj(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
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
      let S = await d();
      S != null && (Object.assign(o, { [t]: S }), Object.assign(o, l(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[t] = g, g;
}, by = /* @__PURE__ */ new WeakMap();
function Gj(t, a, i, l, o) {
  let d = i[t.id];
  if (Ie(d, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = by.get(d);
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
      let S = await t.lazy(), E = {};
      for (let w in S) {
        let N = S[w];
        if (N === void 0)
          continue;
        let R = cj(w), O = d[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        R ? _t(
          !R,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : O ? _t(
          !O,
          `Route "${d.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : E[w] = N;
      }
      Object.assign(d, E), Object.assign(d, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(d),
        lazy: void 0
      });
    })();
    return by.set(d, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let h = Object.keys(t.lazy), m = [], g;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let v = xx({
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
async function xy(t) {
  let a = t.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, d) => {
    i[a[d].route.id] = o;
  }), i;
}
async function Xj(t) {
  return t.matches.some((a) => a.route.middleware) ? Sx(t, () => xy(t)) : xy(t);
}
function Sx(t, a) {
  return Pj(
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
async function Pj(t, a, i, l, o) {
  let { matches: d, ...h } = t, m = d.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await wx(
    h,
    m,
    a,
    i,
    l,
    o
  );
}
async function wx(t, a, i, l, o, d, h = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let g = a[h];
  if (!g)
    return await i();
  let [p, b] = g, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await wx(
        t,
        a,
        i,
        l,
        o,
        d,
        h + 1
      ) }, v.value;
    } catch (E) {
      return v = { value: await d(E, p, v) }, v.value;
    }
  };
  try {
    let E = await b(t, S), w = E != null ? l(E) : void 0;
    return o(w) ? w : v ? w ?? v.value : (v = { value: await S() }, v.value);
  } catch (E) {
    return await d(E, p, v);
  }
}
function Ex(t, a, i, l, o) {
  let d = xx({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: t
  }), h = Gj(
    l.route,
    cn(i.method) ? "action" : "loader",
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
function Kf(t, a, i, l, o, d, h, m, g, p = null, b) {
  let v = !1, S = Ex(
    t,
    a,
    i,
    d,
    h
  );
  return {
    ...d,
    _lazyPromises: S,
    shouldLoad: g,
    shouldRevalidateArgs: p,
    shouldCallHandler(E) {
      return v = !0, p ? typeof b == "boolean" ? cl(d, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof E == "boolean" ? cl(d, {
        ...p,
        defaultShouldRevalidate: E
      }) : cl(d, p) : g;
    },
    resolve(E) {
      let { lazy: w, loader: N, middleware: R } = d.route, T = v || g || E && !cn(i.method) && (w || N), O = R && R.length > 0 && !N && !w;
      return T && (cn(i.method) || !O) ? Qj({
        request: i,
        path: l,
        unstable_pattern: o,
        match: d,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: E,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Xi(t, a, i, l, o, d, h, m, g = null) {
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
  } : Kf(
    t,
    a,
    i,
    l,
    xl(o),
    p,
    h,
    m,
    !0,
    g
  ));
}
async function Kj(t, a, i, l, o, d, h) {
  l.some((b) => b._lazyPromises?.middleware) && await Promise.all(l.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: jx(a, i),
    unstable_pattern: xl(l),
    params: l[0].params,
    context: d,
    matches: l
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return Sx(v, () => b({
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
async function Qj({
  request: t,
  path: a,
  unstable_pattern: i,
  match: l,
  lazyHandlerPromise: o,
  lazyRoutePromise: d,
  handlerOverride: h,
  scopedContext: m
}) {
  let g, p, b = cn(t.method), v = b ? "action" : "loader", S = (E) => {
    let w, N = new Promise((O, z) => w = z);
    p = () => w(), t.signal.addEventListener("abort", p);
    let R = (O) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${l.route.id}]`
      )
    ) : E(
      {
        request: t,
        unstable_url: jx(t, a),
        unstable_pattern: i,
        params: l.params,
        context: m
      },
      ...O !== void 0 ? [O] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (h ? h((z) => R(z)) : R()) };
      } catch (O) {
        return { type: "error", result: O };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let E = b ? l.route.action : l.route.loader;
    if (o || d)
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
          d
        ]);
        if (w !== void 0)
          throw w;
        g = N;
      } else {
        await o;
        let w = b ? l.route.action : l.route.loader;
        if (w)
          [g] = await Promise.all([S(w), d]);
        else if (v === "action") {
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
      g = await S(E);
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
  return g;
}
async function Zj(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function Jj(t) {
  let { result: a, type: i } = t;
  if (Rh(a)) {
    let l;
    try {
      l = await Zj(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new zc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Cy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: nN(a),
    statusCode: ml(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ml(a) ? a.status : void 0
  } : Cy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function Wj(t, a, i, l, o) {
  let d = t.headers.get("Location");
  if (Ie(
    d,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !jh(d)) {
    let h = l.slice(
      0,
      l.findIndex((m) => m.route.id === i) + 1
    );
    d = Pf(
      new URL(a.url),
      h,
      o,
      d
    ), t.headers.set("Location", d);
  }
  return t;
}
var Sy = [
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
function wy(t, a, i, l) {
  if (jh(t)) {
    let o = t, d = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Sy.includes(d.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(d.pathname, i) != null;
    if (d.origin === a.origin && h)
      return Th(d.pathname) + d.search + d.hash;
  }
  try {
    let o = l.createURL(t);
    if (Sy.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Hi(t, a, i, l) {
  let o = t.createURL(Nx(a)).toString(), d = { signal: i };
  if (l && cn(l.formMethod)) {
    let { formMethod: h, formEncType: m } = l;
    d.method = h.toUpperCase(), m === "application/json" ? (d.headers = new Headers({ "Content-Type": m }), d.body = JSON.stringify(l.json)) : m === "text/plain" ? d.body = l.text : m === "application/x-www-form-urlencoded" && l.formData ? d.body = Qf(l.formData) : d.body = l.formData;
  }
  return new Request(o, d);
}
function jx(t, a) {
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
function Qf(t) {
  let a = new URLSearchParams();
  for (let [i, l] of t.entries())
    a.append(i, typeof l == "string" ? l : l.name);
  return a;
}
function Ey(t) {
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
    let S = v.route.id, E = a[S];
    if (Ie(
      !Yr(E),
      "Cannot handle redirect results in processLoaderData"
    ), An(E)) {
      let w = E.error;
      if (b !== void 0 && (w = b, b = void 0), h = h || {}, o)
        h[S] = w;
      else {
        let N = gr(t, S);
        h[N.route.id] == null && (h[N.route.id] = w);
      }
      l || (d[S] = gx), g || (g = !0, m = ml(E.error) ? E.error.status : 500), E.headers && (p[S] = E.headers);
    } else
      d[S] = E.data, E.statusCode && E.statusCode !== 200 && !g && (m = E.statusCode), E.headers && (p[S] = E.headers);
  }), b !== void 0 && i && (h = { [i[0]]: b }, i[2] && (d[i[2]] = void 0)), {
    loaderData: d,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function jy(t, a, i, l, o, d) {
  let { loaderData: h, errors: m } = eN(
    a,
    i,
    l
  );
  return o.filter((g) => !g.matches || g.matches.some((p) => p.shouldLoad)).forEach((g) => {
    let { key: p, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let S = d[p];
    if (Ie(S, "Did not find corresponding fetcher result"), An(S)) {
      let E = gr(t.matches, b?.route.id);
      m && m[E.route.id] || (m = {
        ...m,
        [E.route.id]: S.error
      }), t.fetchers.delete(p);
    } else if (Yr(S))
      Ie(!1, "Unhandled fetcher revalidation redirect");
    else {
      let E = Oa(S.data);
      t.fetchers.set(p, E);
    }
  }), { loaderData: h, errors: m };
}
function Ny(t, a, i, l) {
  let o = Object.entries(a).filter(([, d]) => d !== gx).reduce((d, [h, m]) => (d[h] = m, d), {});
  for (let d of i) {
    let h = d.route.id;
    if (!a.hasOwnProperty(h) && t.hasOwnProperty(h) && d.route.loader && (o[h] = t[h]), l && l.hasOwnProperty(h))
      break;
  }
  return o;
}
function Ty(t) {
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
  message: d
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return t === 400 ? (h = "Bad Request", l && a && i ? m = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (h = "Method Not Allowed", l && a && i ? m = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : l && (m = `Invalid request method "${l.toUpperCase()}"`)), new zc(
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
function Nx(t) {
  let a = typeof t == "string" ? ia(t) : t;
  return pa({ ...a, hash: "" });
}
function tN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function nN(t) {
  return new zc(
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
  return Rh(t.result) && px.has(t.result.status);
}
function An(t) {
  return t.type === "error";
}
function Yr(t) {
  return (t && t.type) === "redirect";
}
function Cy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Rh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function sN(t) {
  return px.has(t);
}
function lN(t) {
  return Rh(t) && sN(t.status) && t.headers.has("Location");
}
function oN(t) {
  return Bj.has(t.toUpperCase());
}
function cn(t) {
  return Lj.has(t.toUpperCase());
}
function Mh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function cc(t, a) {
  let i = typeof a == "string" ? ia(a).search : a.search;
  if (t[t.length - 1].route.index && Mh(i || ""))
    return t[t.length - 1];
  let l = ux(t);
  return l[l.length - 1];
}
function Ry(t) {
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
function lf(t, a) {
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
function Qs(t, a) {
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
function Oa(t) {
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
      vx
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
        vx,
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
function My() {
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
var Wr = y.createContext(null);
Wr.displayName = "DataRouter";
var Sl = y.createContext(null);
Sl.displayName = "DataRouterState";
var Tx = y.createContext(!1);
function Cx() {
  return y.useContext(Tx);
}
var _h = y.createContext({
  isTransitioning: !1
});
_h.displayName = "ViewTransition";
var Rx = y.createContext(
  /* @__PURE__ */ new Map()
);
Rx.displayName = "Fetchers";
var hN = y.createContext(null);
hN.displayName = "Await";
var Qn = y.createContext(
  null
);
Qn.displayName = "Navigation";
var kc = y.createContext(
  null
);
kc.displayName = "Location";
var Ba = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ba.displayName = "Route";
var Ah = y.createContext(null);
Ah.displayName = "RouteError";
var Mx = "REACT_ROUTER_ERROR", mN = "REDIRECT", pN = "ROUTE_ERROR_RESPONSE";
function vN(t) {
  if (t.startsWith(`${Mx}:${mN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function gN(t) {
  if (t.startsWith(
    `${Mx}:${pN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new zc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function yN(t, { relative: a } = {}) {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: l } = y.useContext(Qn), { hash: o, pathname: d, search: h } = jl(t, { relative: a }), m = d;
  return i !== "/" && (m = d === "/" ? i : Gn([i, d])), l.createHref({ pathname: m, search: h, hash: o });
}
function wl() {
  return y.useContext(kc) != null;
}
function $a() {
  return Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(kc).location;
}
var _x = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ax(t) {
  y.useContext(Qn).static || y.useLayoutEffect(t);
}
function El() {
  let { isDataRoute: t } = y.useContext(Ba);
  return t ? _N() : bN();
}
function bN() {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = y.useContext(Wr), { basename: a, navigator: i } = y.useContext(Qn), { matches: l } = y.useContext(Ba), { pathname: o } = $a(), d = JSON.stringify(Nh(l)), h = y.useRef(!1);
  return Ax(() => {
    h.current = !0;
  }), y.useCallback(
    (g, p = {}) => {
      if (_t(h.current, _x), !h.current) return;
      if (typeof g == "number") {
        i.go(g);
        return;
      }
      let b = Dc(
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
function jl(t, { relative: a } = {}) {
  let { matches: i } = y.useContext(Ba), { pathname: l } = $a(), o = JSON.stringify(Nh(i));
  return y.useMemo(
    () => Dc(
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
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = y.useContext(Qn), { matches: o } = y.useContext(Ba), d = o[o.length - 1], h = d ? d.params : {}, m = d ? d.pathname : "/", g = d ? d.pathnameBase : "/", p = d && d.route;
  {
    let R = p && p.path || "";
    kx(
      m,
      !p || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let b = $a(), v;
  v = b;
  let S = v.pathname || "/", E = S;
  if (g !== "/") {
    let R = g.replace(/^\//, "").split("/");
    E = "/" + S.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let w = vr(t, { pathname: E });
  return _t(
    p || w != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), _t(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), NN(
    w && w.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, h, R.params),
        pathname: Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? g : Gn([
          g,
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
function SN() {
  let t = MN(), a = ml(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, l = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: l }, d = { padding: "2px 4px", backgroundColor: l }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), h = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: d }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: d }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, h);
}
var wN = /* @__PURE__ */ y.createElement(SN, null), Dx = class extends y.Component {
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
    let a = t !== void 0 ? /* @__PURE__ */ y.createElement(Ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Ah.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(EN, { error: t }, a) : a;
  }
};
Dx.contextType = Tx;
var of = /* @__PURE__ */ new WeakMap();
function EN({
  children: t,
  error: a
}) {
  let { basename: i } = y.useContext(Qn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = vN(a.digest);
    if (l) {
      let o = of.get(a);
      if (o) throw o;
      let d = fx(l.location, i);
      if (dx && !of.get(a))
        if (d.isExternal || l.reloadDocument)
          window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(d.to, {
              replace: l.replace
            })
          );
          throw of.set(a, h), h;
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
function jN({ routeContext: t, match: a, children: i }) {
  let l = y.useContext(Wr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement(Ba.Provider, { value: t }, i);
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
        let { loaderData: S, errors: E } = l, w = v.route.loader && !S.hasOwnProperty(v.route.id) && (!E || E[v.route.id] === void 0);
        if (v.route.lazy || w) {
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
      unstable_pattern: xl(l.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, S) => {
      let E, w = !1, N = null, R = null;
      l && (E = d && v.route.id ? d[v.route.id] : void 0, N = v.route.errorElement || wN, h && (m < 0 && S === 0 ? (kx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, R = null) : m === S && (w = !0, R = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, S + 1)), O = () => {
        let z;
        return E ? z = N : w ? z = R : v.route.Component ? z = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? z = v.route.element : z = b, /* @__PURE__ */ y.createElement(
          jN,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: T,
              isDataRoute: l != null
            },
            children: z
          }
        );
      };
      return l && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ y.createElement(
        Dx,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: N,
          error: E,
          children: O(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : O();
    },
    null
  );
}
function Dh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function TN(t) {
  let a = y.useContext(Wr);
  return Ie(a, Dh(t)), a;
}
function zx(t) {
  let a = y.useContext(Sl);
  return Ie(a, Dh(t)), a;
}
function CN(t) {
  let a = y.useContext(Ba);
  return Ie(a, Dh(t)), a;
}
function Oc(t) {
  let a = CN(t), i = a.matches[a.matches.length - 1];
  return Ie(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function RN() {
  return Oc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Nl() {
  let t = zx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Oc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function MN() {
  let t = y.useContext(Ah), a = zx(
    "useRouteError"
    /* UseRouteError */
  ), i = Oc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function _N() {
  let { router: t } = TN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Oc(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return Ax(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, d = {}) => {
      _t(i.current, _x), i.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...d }));
    },
    [t, a]
  );
}
var _y = {};
function kx(t, a, i) {
  !a && !_y[t] && (_y[t] = !0, _t(!1, i));
}
var Ay = {};
function Dy(t, a) {
  !t && !Ay[a] && (Ay[a] = !0, console.warn(a));
}
var AN = "useOptimistic", zy = PE[AN], DN = () => {
};
function zN(t) {
  return zy ? zy(t) : [t, DN];
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
  return qj({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: aj({
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
  l = Cx() || l;
  let [d, h] = y.useState(t.state), [m, g] = zN(d), [p, b] = y.useState(), [v, S] = y.useState({
    isTransitioning: !1
  }), [E, w] = y.useState(), [N, R] = y.useState(), [T, O] = y.useState(), z = y.useRef(/* @__PURE__ */ new Map()), _ = y.useCallback(
    (q, { deletedFetchers: F, newErrors: ie, flushSync: re, viewTransitionOpts: te }) => {
      ie && i && Object.values(ie).forEach(
        (W) => i(W, {
          location: q.location,
          params: q.matches[0]?.params ?? {},
          unstable_pattern: xl(q.matches)
        })
      ), q.fetchers.forEach((W, k) => {
        W.data !== void 0 && z.current.set(k, W.data);
      }), F.forEach((W) => z.current.delete(W)), Dy(
        re === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ce = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Dy(
        te == null || ce,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !te || !ce) {
        a && re ? a(() => h(q)) : l === !1 ? h(q) : y.startTransition(() => {
          l === !0 && g((W) => ky(W, q)), h(q);
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
        let W = t.window.document.startViewTransition(() => {
          a(() => h(q));
        });
        W.finished.finally(() => {
          a(() => {
            w(void 0), R(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => R(W));
        return;
      }
      N ? (E?.resolve(), N.skipTransition(), O({
        state: q,
        currentLocation: te.currentLocation,
        nextLocation: te.nextLocation
      })) : (b(q), S({
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
      g,
      i
    ]
  );
  y.useLayoutEffect(() => t.subscribe(_), [t, _]);
  let I = m.initialized;
  y.useLayoutEffect(() => {
    !I && t.state.initialized && _(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [I, _, t.state]), y.useEffect(() => {
    v.isTransitioning && !v.flushSync && w(new UN());
  }, [v]), y.useEffect(() => {
    if (E && p && t.window) {
      let q = p, F = E.promise, ie = t.window.document.startViewTransition(async () => {
        l === !1 ? h(q) : y.startTransition(() => {
          l === !0 && g((re) => ky(re, q)), h(q);
        }), await F;
      });
      ie.finished.finally(() => {
        w(void 0), R(void 0), b(void 0), S({ isTransitioning: !1 });
      }), R(ie);
    }
  }, [
    p,
    E,
    t.window,
    l,
    g
  ]), y.useEffect(() => {
    E && p && m.location.key === p.location.key && E.resolve();
  }, [E, N, m.location, p]), y.useEffect(() => {
    !v.isTransitioning && T && (b(T.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), O(void 0));
  }, [v.isTransitioning, T]);
  let J = y.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (q) => t.navigate(q),
    push: (q, F, ie) => t.navigate(q, {
      state: F,
      preventScrollReset: ie?.preventScrollReset
    }),
    replace: (q, F, ie) => t.navigate(q, {
      replace: !0,
      state: F,
      preventScrollReset: ie?.preventScrollReset
    })
  }), [t]), ne = t.basename || "/", A = y.useMemo(
    () => ({
      router: t,
      navigator: J,
      static: !1,
      basename: ne,
      onError: i
    }),
    [t, J, ne, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Wr.Provider, { value: A }, /* @__PURE__ */ y.createElement(Sl.Provider, { value: m }, /* @__PURE__ */ y.createElement(Rx.Provider, { value: z.current }, /* @__PURE__ */ y.createElement(_h.Provider, { value: v }, /* @__PURE__ */ y.createElement(
    HN,
    {
      basename: ne,
      location: m.location,
      navigationType: m.historyAction,
      navigator: J,
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
function ky(t, a) {
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
    !wl(),
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
    state: S = null,
    key: E = "default",
    unstable_mask: w
  } = i, N = y.useMemo(() => {
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
      navigationType: l
    };
  }, [
    m,
    p,
    b,
    v,
    S,
    E,
    l,
    w
  ]);
  return _t(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ y.createElement(Qn.Provider, { value: g }, /* @__PURE__ */ y.createElement(kc.Provider, { children: a, value: N }));
}
var uc = "get", dc = "application/x-www-form-urlencoded";
function Lc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function qN(t) {
  return Lc(t) && t.tagName.toLowerCase() === "button";
}
function IN(t) {
  return Lc(t) && t.tagName.toLowerCase() === "form";
}
function FN(t) {
  return Lc(t) && t.tagName.toLowerCase() === "input";
}
function YN(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function GN(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !YN(t);
}
var Yo = null;
function XN() {
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
var PN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function cf(t) {
  return t != null && !PN.has(t) ? (_t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${dc}"`
  ), null) : t;
}
function KN(t, a) {
  let i, l, o, d, h;
  if (IN(t)) {
    let m = t.getAttribute("action");
    l = m ? Kn(m, a) : null, i = t.getAttribute("method") || uc, o = cf(t.getAttribute("enctype")) || dc, d = new FormData(t);
  } else if (qN(t) || FN(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || m.getAttribute("action");
    if (l = g ? Kn(g, a) : null, i = t.getAttribute("formmethod") || m.getAttribute("method") || uc, o = cf(t.getAttribute("formenctype")) || cf(m.getAttribute("enctype")) || dc, d = new FormData(m, t), !XN()) {
      let { name: p, type: b, value: v } = t;
      if (b === "image") {
        let S = p ? `${p}.` : "";
        d.append(`${S}x`, "0"), d.append(`${S}y`, "0");
      } else p && d.append(p, v);
    }
  } else {
    if (Lc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = uc, l = null, o = dc, h = t;
  }
  return d && o === "text/plain" && (h = d, d = void 0), { action: l, method: i.toLowerCase(), encType: o, formData: d, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function zh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Ox(t, a, i, l) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${l}` : o.pathname = `${o.pathname}.${l}` : o.pathname === "/" ? o.pathname = `_root.${l}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${yc(a)}/_root.${l}` : o.pathname = `${yc(o.pathname)}.${l}`, o;
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
function Oy(t, a, i, l, o, d) {
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
function kh() {
  let t = y.useContext(Wr);
  return zh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function aT() {
  let t = y.useContext(Sl);
  return zh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Oh = y.createContext(void 0);
Oh.displayName = "FrameworkContext";
function Lh() {
  let t = y.useContext(Oh);
  return zh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function rT(t, a) {
  let i = y.useContext(Oh), [l, o] = y.useState(!1), [d, h] = y.useState(!1), { onFocus: m, onBlur: g, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, S = y.useRef(null);
  y.useEffect(() => {
    if (t === "render" && h(!0), t === "viewport") {
      let N = (T) => {
        T.forEach((O) => {
          h(O.isIntersecting);
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
  return i ? t !== "intent" ? [d, S, {}] : [
    d,
    S,
    {
      onFocus: Zs(m, E),
      onBlur: Zs(g, w),
      onMouseEnter: Zs(p, E),
      onMouseLeave: Zs(b, w),
      onTouchStart: Zs(v, E)
    }
  ] : [!1, S, {}];
}
function Zs(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function iT({ page: t, ...a }) {
  let i = Cx(), { router: l } = kh(), o = y.useMemo(
    () => vr(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(lT, { page: t, matches: o, ...a }) : /* @__PURE__ */ y.createElement(oT, { page: t, matches: o, ...a }) : null;
}
function sT(t) {
  let { manifest: a, routeModules: i } = Lh(), [l, o] = y.useState([]);
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
  let l = $a(), { future: o } = Lh(), { basename: d } = kh(), h = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let m = Ox(
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
  let l = $a(), { future: o, manifest: d, routeModules: h } = Lh(), { basename: m } = kh(), { loaderData: g, matches: p } = aT(), b = y.useMemo(
    () => Oy(
      t,
      a,
      p,
      d,
      l,
      "data"
    ),
    [t, a, p, d, l]
  ), v = y.useMemo(
    () => Oy(
      t,
      a,
      p,
      d,
      l,
      "assets"
    ),
    [t, a, p, d, l]
  ), S = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((O) => {
      let z = d.routes[O.route.id];
      !z || !z.hasLoader || (!b.some((_) => _.route.id === O.route.id) && O.route.id in g && h[O.route.id]?.shouldRevalidate || z.hasClientLoader ? R = !0 : N.add(O.route.id));
    }), N.size === 0)
      return [];
    let T = Ox(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((O) => N.has(O.route.id)).map((O) => O.route.id).join(",")
    ), [T.pathname + T.search];
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
  ]), E = y.useMemo(
    () => WN(v, d),
    [v, d]
  ), w = sT(v);
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
var Lx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Uh = y.forwardRef(
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
    viewTransition: S,
    unstable_defaultShouldRevalidate: E,
    ...w
  }, N) {
    let { basename: R, navigator: T, unstable_useTransitions: O } = y.useContext(Qn), z = typeof b == "string" && Lx.test(b), _ = fx(b, R);
    b = _.to;
    let I = yN(b, { relative: o }), J = $a(), ne = null;
    if (m) {
      let W = Dc(
        m,
        [],
        J.unstable_mask ? J.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (W.pathname = W.pathname === "/" ? R : Gn([R, W.pathname])), ne = T.createHref(W);
    }
    let [A, q, F] = rT(
      l,
      w
    ), ie = mT(b, {
      replace: h,
      unstable_mask: m,
      state: g,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: O
    });
    function re(W) {
      a && a(W), W.defaultPrevented || ie(W);
    }
    let te = !(_.isExternal || d), ce = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...w,
          ...F,
          href: (te ? ne : void 0) || _.absoluteURL || I,
          onClick: te ? re : a,
          ref: cT(N, q),
          target: p,
          "data-discover": !z && i === "render" ? "true" : void 0
        }
      )
    );
    return A && !z ? /* @__PURE__ */ y.createElement(y.Fragment, null, ce, /* @__PURE__ */ y.createElement(iT, { page: I })) : ce;
  }
);
Uh.displayName = "Link";
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
    let v = jl(h, { relative: p.relative }), S = $a(), E = y.useContext(Sl), { navigator: w, basename: N } = y.useContext(Qn), R = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bT(v) && m === !0, T = w.encodeLocation ? w.encodeLocation(v).pathname : v.pathname, O = S.pathname, z = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    i || (O = O.toLowerCase(), z = z ? z.toLowerCase() : null, T = T.toLowerCase()), z && N && (z = Kn(z, N) || z);
    const _ = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let I = O === T || !o && O.startsWith(T) && O.charAt(_) === "/", J = z != null && (z === T || !o && z.startsWith(T) && z.charAt(T.length) === "/"), ne = {
      isActive: I,
      isPending: J,
      isTransitioning: R
    }, A = I ? a : void 0, q;
    typeof l == "function" ? q = l(ne) : q = [
      l,
      I ? "active" : null,
      J ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let F = typeof d == "function" ? d(ne) : d;
    return /* @__PURE__ */ y.createElement(
      Uh,
      {
        ...p,
        "aria-current": A,
        className: q,
        ref: b,
        style: F,
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
    method: h = uc,
    action: m,
    onSubmit: g,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...E
  }, w) => {
    let { unstable_useTransitions: N } = y.useContext(Qn), R = gT(), T = yT(m, { relative: p }), O = h.toLowerCase() === "get" ? "get" : "post", z = typeof m == "string" && Lx.test(m), _ = (I) => {
      if (g && g(I), I.defaultPrevented) return;
      I.preventDefault();
      let J = I.nativeEvent.submitter, ne = J?.getAttribute("formmethod") || h, A = () => R(J || I.currentTarget, {
        fetcherKey: a,
        method: ne,
        navigate: i,
        replace: o,
        state: d,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      N && i !== !1 ? y.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: w,
        method: O,
        action: T,
        onSubmit: l ? g : _,
        ...E,
        "data-discover": !z && t === "render" ? "true" : void 0
      }
    );
  }
);
fT.displayName = "Form";
function hT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ux(t) {
  let a = y.useContext(Wr);
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
  let b = El(), v = $a(), S = jl(t, { relative: h });
  return y.useCallback(
    (E) => {
      if (GN(E, a)) {
        E.preventDefault();
        let w = i !== void 0 ? i : pa(v) === pa(S), N = () => b(t, {
          replace: w,
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
      S,
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
  let { router: t } = Ux(
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
        let S = h.fetcherKey || vT();
        await l(S, i, h.action || m, {
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
  let { basename: i } = y.useContext(Qn), l = y.useContext(Ba);
  Ie(l, "useFormAction must be used inside a RouteContext");
  let [o] = l.matches.slice(-1), d = { ...jl(t || ".", { relative: a }) }, h = $a();
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
  let i = y.useContext(_h);
  Ie(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = Ux(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = jl(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let d = Kn(i.currentLocation.pathname, l) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return gc(o.pathname, h) != null || gc(o.pathname, d) != null;
}
class es extends Error {
  constructor(a, i, l, o) {
    super(l), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Va = "/api/v1/extensions/nexus.audio.emotiontts";
async function ht(t, a) {
  const i = t.startsWith("http") ? t : `${Va}${t}`, l = await fetch(i, {
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
    throw new es(
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
  const l = t.startsWith("http") ? t : `${Va}${t}`, o = new EventSource(l);
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
async function Ly(t) {
  return ht(`/deployments/${t}`);
}
async function wT(t, a) {
  return ht(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Uy(t) {
  return ht(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Bh(t, a) {
  return ht("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function ul(t, a, i) {
  return ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Bx(t, a) {
  await ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function ET(t) {
  return ht(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function jT(t, a, i = "error") {
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
async function $h(t, a) {
  return ht(`/deployments/${t}/runs/${a}`);
}
async function CT(t, a) {
  return ht(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function $x(t, a) {
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
function By(t, a, i, l) {
  return xT(
    `/deployments/${t}/runs/${a}/progress`,
    i,
    l
  );
}
async function Ki(t) {
  return ht(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function bc(t, a, i, l, o) {
  const d = new FormData();
  d.append("deploymentId", t), d.append("displayName", i), d.append("kind", l), d.append("audio", a);
  const h = await fetch(`${Va}/voice-assets`, {
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
  return `${Va}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function DT(t) {
  return ht(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var zT = "mux0i60", kT = "mux0i61", OT = "mux0i62", LT = "mux0i63";
function Tl({ count: t = "0", title: a, hint: i }) {
  return /* @__PURE__ */ c.jsxs("div", { className: zT, children: [
    /* @__PURE__ */ c.jsx("span", { className: kT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: OT, children: a }),
    i ? /* @__PURE__ */ c.jsx("p", { className: LT, children: i }) : null
  ] });
}
var UT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, BT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, $T = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, VT = "zwn3019";
function La({
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
var Pr = "vrkn5p0", qT = "_93p6291", IT = "_93p6292", FT = "_93p6293", YT = "_93p6294", GT = "_93p6295", XT = "_93p6296", PT = "_93p6297", KT = "_93p6298", QT = "_93p6299", ZT = "_93p629a", JT = "_93p629b", WT = "_93p629c", eC = "_93p629d", tC = "_93p629e";
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
  const { deployments: t } = Nl(), a = t.length === 1 ? "deployment" : "deployments";
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
      La,
      {
        density: "airy",
        elevation: "raised",
        className: KT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Pr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Tl,
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
var Vh = ix();
const lC = /* @__PURE__ */ rx(Vh);
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
}, uC = Array(12).fill(0), dC = ({ visible: t, className: a }) => /* @__PURE__ */ me.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ me.createElement("div", {
  className: "sonner-spinner"
}, uC.map((i, l) => /* @__PURE__ */ me.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), fC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), hC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), mC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), pC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), vC = /* @__PURE__ */ me.createElement("svg", {
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
})), gC = () => {
  const [t, a] = me.useState(document.hidden);
  return me.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let Zf = 1;
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
      const { message: l, ...o } = a, d = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Zf++, h = this.toasts.find((g) => g.id === d), m = a.dismissible === void 0 ? !0 : a.dismissible;
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
        ], me.isValidElement(p))
          d = !1, this.create({
            id: l,
            type: "default",
            message: p
          });
        else if (xC(p) && !p.ok) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, S = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...w
          });
        } else if (p instanceof Error) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(p) : i.error, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...w
          });
        } else if (i.success !== void 0) {
          d = !1;
          const v = typeof i.success == "function" ? await i.success(p) : i.success, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
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
          d = !1;
          const b = typeof i.error == "function" ? await i.error(p) : i.error, v = typeof i.description == "function" ? await i.description(p) : i.description, E = typeof b == "object" && !me.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...E
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
      const l = i?.id || Zf++;
      return this.create({
        jsx: a(l),
        id: l,
        ...i
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const xn = new yC(), bC = (t, a) => {
  const i = a?.id || Zf++;
  return xn.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, xC = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", SC = bC, wC = () => xn.toasts, EC = () => xn.getActiveToasts(), Zt = Object.assign(SC, {
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
  getToasts: EC
});
oC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Go(t) {
  return t.label !== void 0;
}
const jC = 3, NC = "24px", TC = "16px", $y = 4e3, CC = 356, RC = 14, MC = 45, _C = 200;
function ma(...t) {
  return t.filter(Boolean).join(" ");
}
function AC(t) {
  const [a, i] = t.split("-"), l = [];
  return a && l.push(a), i && l.push(i), l;
}
const DC = (t) => {
  var a, i, l, o, d, h, m, g, p;
  const { invert: b, toast: v, unstyled: S, interacting: E, setHeights: w, visibleToasts: N, heights: R, index: T, toasts: O, expanded: z, removeToast: _, defaultRichColors: I, closeButton: J, style: ne, cancelButtonStyle: A, actionButtonStyle: q, className: F = "", descriptionClassName: ie = "", duration: re, position: te, gap: ce, expandByDefault: W, classNames: k, icons: C, closeButtonAriaLabel: U = "Close toast" } = t, [B, Q] = me.useState(null), [M, Z] = me.useState(null), [P, le] = me.useState(!1), [fe, ge] = me.useState(!1), [Ae, Me] = me.useState(!1), [Ve, Jt] = me.useState(!1), [Pt, At] = me.useState(!1), [et, pt] = me.useState(0), [he, Oe] = me.useState(0), De = me.useRef(v.duration || re || $y), Te = me.useRef(null), bt = me.useRef(null), xt = T === 0, dn = T + 1 <= N, Ht = v.type, kn = v.dismissible !== !1, qt = v.className || "", ye = v.descriptionClassName || "", ze = me.useMemo(() => R.findIndex((ke) => ke.toastId === v.id) || 0, [
    R,
    v.id
  ]), Qe = me.useMemo(() => {
    var ke;
    return (ke = v.closeButton) != null ? ke : J;
  }, [
    v.closeButton,
    J
  ]), nt = me.useMemo(() => v.duration || re || $y, [
    v.duration,
    re
  ]), It = me.useRef(0), Ft = me.useRef(0), jr = me.useRef(0), sa = me.useRef(null), [Zn, Wt] = te.split("-"), Tt = me.useMemo(() => R.reduce((ke, ut, Dt) => Dt >= ze ? ke : ke + ut.height, 0), [
    R,
    ze
  ]), Yt = gC(), ei = v.invert || b, Ha = Ht === "loading";
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
    const ke = bt.current;
    if (ke) {
      const ut = ke.getBoundingClientRect().height;
      return Oe(ut), w((Dt) => [
        {
          toastId: v.id,
          height: ut,
          position: v.position
        },
        ...Dt
      ]), () => w((Dt) => Dt.filter((Gt) => Gt.toastId !== v.id));
    }
  }, [
    w,
    v.id
  ]), me.useLayoutEffect(() => {
    if (!P) return;
    const ke = bt.current, ut = ke.style.height;
    ke.style.height = "auto";
    const Dt = ke.getBoundingClientRect().height;
    ke.style.height = ut, Oe(Dt), w((Gt) => Gt.find((it) => it.toastId === v.id) ? Gt.map((it) => it.toastId === v.id ? {
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
    P,
    v.title,
    v.description,
    w,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const On = me.useCallback(() => {
    ge(!0), pt(Ft.current), w((ke) => ke.filter((ut) => ut.toastId !== v.id)), setTimeout(() => {
      _(v);
    }, _C);
  }, [
    v,
    _,
    w,
    Ft
  ]);
  me.useEffect(() => {
    if (v.promise && Ht === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ke;
    return z || E || Yt ? (() => {
      if (jr.current < It.current) {
        const Gt = (/* @__PURE__ */ new Date()).getTime() - It.current;
        De.current = De.current - Gt;
      }
      jr.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      De.current !== 1 / 0 && (It.current = (/* @__PURE__ */ new Date()).getTime(), ke = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), On();
      }, De.current));
    })(), () => clearTimeout(ke);
  }, [
    z,
    E,
    v,
    Ht,
    Yt,
    On
  ]), me.useEffect(() => {
    v.delete && (On(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    On,
    v.delete
  ]);
  function va() {
    var ke;
    if (C?.loading) {
      var ut;
      return /* @__PURE__ */ me.createElement("div", {
        className: ma(k?.loader, v == null || (ut = v.classNames) == null ? void 0 : ut.loader, "sonner-loader"),
        "data-visible": Ht === "loading"
      }, C.loading);
    }
    return /* @__PURE__ */ me.createElement(dC, {
      className: ma(k?.loader, v == null || (ke = v.classNames) == null ? void 0 : ke.loader),
      visible: Ht === "loading"
    });
  }
  const Jn = v.icon || C?.[Ht] || cC(Ht);
  var la, hn;
  return /* @__PURE__ */ me.createElement("li", {
    tabIndex: 0,
    ref: bt,
    className: ma(F, qt, k?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, k?.default, k?.[Ht], v == null || (i = v.classNames) == null ? void 0 : i[Ht]),
    "data-sonner-toast": "",
    "data-rich-colors": (la = v.richColors) != null ? la : I,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": P,
    "data-promise": !!v.promise,
    "data-swiped": Pt,
    "data-removed": fe,
    "data-visible": dn,
    "data-y-position": Zn,
    "data-x-position": Wt,
    "data-index": T,
    "data-front": xt,
    "data-swiping": Ae,
    "data-dismissible": kn,
    "data-type": Ht,
    "data-invert": ei,
    "data-swipe-out": Ve,
    "data-swipe-direction": M,
    "data-expanded": !!(z || W && P),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": O.length - T,
      "--offset": `${fe ? et : Ft.current}px`,
      "--initial-height": W ? "auto" : `${he}px`,
      ...ne,
      ...v.style
    },
    onDragEnd: () => {
      Me(!1), Q(null), sa.current = null;
    },
    onPointerDown: (ke) => {
      ke.button !== 2 && (Ha || !kn || (Te.current = /* @__PURE__ */ new Date(), pt(Ft.current), ke.target.setPointerCapture(ke.pointerId), ke.target.tagName !== "BUTTON" && (Me(!0), sa.current = {
        x: ke.clientX,
        y: ke.clientY
      })));
    },
    onPointerUp: () => {
      var ke, ut, Dt;
      if (Ve || !kn) return;
      sa.current = null;
      const Gt = Number(((ke = bt.current) == null ? void 0 : ke.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((ut = bt.current) == null ? void 0 : ut.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), it = (/* @__PURE__ */ new Date()).getTime() - ((Dt = Te.current) == null ? void 0 : Dt.getTime()), en = B === "x" ? Gt : wn, ga = Math.abs(en) / it;
      if (Math.abs(en) >= MC || ga > 0.11) {
        pt(Ft.current), v.onDismiss == null || v.onDismiss.call(v, v), Z(B === "x" ? Gt > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), On(), Jt(!0);
        return;
      } else {
        var sn, D;
        (sn = bt.current) == null || sn.style.setProperty("--swipe-amount-x", "0px"), (D = bt.current) == null || D.style.setProperty("--swipe-amount-y", "0px");
      }
      At(!1), Me(!1), Q(null);
    },
    onPointerMove: (ke) => {
      var ut, Dt, Gt;
      if (!sa.current || !kn || ((ut = window.getSelection()) == null ? void 0 : ut.toString().length) > 0) return;
      const it = ke.clientY - sa.current.y, en = ke.clientX - sa.current.x;
      var ga;
      const sn = (ga = t.swipeDirections) != null ? ga : AC(te);
      !B && (Math.abs(en) > 1 || Math.abs(it) > 1) && Q(Math.abs(en) > Math.abs(it) ? "x" : "y");
      let D = {
        x: 0,
        y: 0
      };
      const V = (Y) => 1 / (1.5 + Math.abs(Y) / 20);
      if (B === "y") {
        if (sn.includes("top") || sn.includes("bottom"))
          if (sn.includes("top") && it < 0 || sn.includes("bottom") && it > 0)
            D.y = it;
          else {
            const Y = it * V(it);
            D.y = Math.abs(Y) < Math.abs(it) ? Y : it;
          }
      } else if (B === "x" && (sn.includes("left") || sn.includes("right")))
        if (sn.includes("left") && en < 0 || sn.includes("right") && en > 0)
          D.x = en;
        else {
          const Y = en * V(en);
          D.x = Math.abs(Y) < Math.abs(en) ? Y : en;
        }
      (Math.abs(D.x) > 0 || Math.abs(D.y) > 0) && At(!0), (Dt = bt.current) == null || Dt.style.setProperty("--swipe-amount-x", `${D.x}px`), (Gt = bt.current) == null || Gt.style.setProperty("--swipe-amount-y", `${D.y}px`);
    }
  }, Qe && !v.jsx && Ht !== "loading" ? /* @__PURE__ */ me.createElement("button", {
    "aria-label": U,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !kn ? () => {
    } : () => {
      On(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ma(k?.closeButton, v == null || (l = v.classNames) == null ? void 0 : l.closeButton)
  }, (hn = C?.close) != null ? hn : vC) : null, (Ht || v.icon || v.promise) && v.icon !== null && (C?.[Ht] !== null || v.icon) ? /* @__PURE__ */ me.createElement("div", {
    "data-icon": "",
    className: ma(k?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || va() : null, v.type !== "loading" ? Jn : null) : null, /* @__PURE__ */ me.createElement("div", {
    "data-content": "",
    className: ma(k?.content, v == null || (d = v.classNames) == null ? void 0 : d.content)
  }, /* @__PURE__ */ me.createElement("div", {
    "data-title": "",
    className: ma(k?.title, v == null || (h = v.classNames) == null ? void 0 : h.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ me.createElement("div", {
    "data-description": "",
    className: ma(ie, ye, k?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ me.isValidElement(v.cancel) ? v.cancel : v.cancel && Go(v.cancel) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || A,
    onClick: (ke) => {
      Go(v.cancel) && kn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ke), On());
    },
    className: ma(k?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ me.isValidElement(v.action) ? v.action : v.action && Go(v.action) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || q,
    onClick: (ke) => {
      Go(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ke), !ke.defaultPrevented && On());
    },
    className: ma(k?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function Vy() {
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
const kC = /* @__PURE__ */ me.forwardRef(function(a, i) {
  const { id: l, invert: o, position: d = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: g, className: p, offset: b, mobileOffset: v, theme: S = "light", richColors: E, duration: w, style: N, visibleToasts: R = jC, toastOptions: T, dir: O = Vy(), gap: z = RC, icons: _, containerAriaLabel: I = "Notifications" } = a, [J, ne] = me.useState([]), A = me.useMemo(() => l ? J.filter((P) => P.toasterId === l) : J.filter((P) => !P.toasterId), [
    J,
    l
  ]), q = me.useMemo(() => Array.from(new Set([
    d
  ].concat(A.filter((P) => P.position).map((P) => P.position)))), [
    A,
    d
  ]), [F, ie] = me.useState([]), [re, te] = me.useState(!1), [ce, W] = me.useState(!1), [k, C] = me.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = me.useRef(null), B = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), Q = me.useRef(null), M = me.useRef(!1), Z = me.useCallback((P) => {
    ne((le) => {
      var fe;
      return (fe = le.find((ge) => ge.id === P.id)) != null && fe.delete || xn.dismiss(P.id), le.filter(({ id: ge }) => ge !== P.id);
    });
  }, []);
  return me.useEffect(() => xn.subscribe((P) => {
    if (P.dismiss) {
      requestAnimationFrame(() => {
        ne((le) => le.map((fe) => fe.id === P.id ? {
          ...fe,
          delete: !0
        } : fe));
      });
      return;
    }
    setTimeout(() => {
      lC.flushSync(() => {
        ne((le) => {
          const fe = le.findIndex((ge) => ge.id === P.id);
          return fe !== -1 ? [
            ...le.slice(0, fe),
            {
              ...le[fe],
              ...P
            },
            ...le.slice(fe + 1)
          ] : [
            P,
            ...le
          ];
        });
      });
    });
  }), [
    J
  ]), me.useEffect(() => {
    if (S !== "system") {
      C(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? C("dark") : C("light")), typeof window > "u") return;
    const P = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      P.addEventListener("change", ({ matches: le }) => {
        C(le ? "dark" : "light");
      });
    } catch {
      P.addListener(({ matches: fe }) => {
        try {
          C(fe ? "dark" : "light");
        } catch (ge) {
          console.error(ge);
        }
      });
    }
  }, [
    S
  ]), me.useEffect(() => {
    J.length <= 1 && te(!1);
  }, [
    J
  ]), me.useEffect(() => {
    const P = (le) => {
      var fe;
      if (h.every((Me) => le[Me] || le.code === Me)) {
        var Ae;
        te(!0), (Ae = U.current) == null || Ae.focus();
      }
      le.code === "Escape" && (document.activeElement === U.current || (fe = U.current) != null && fe.contains(document.activeElement)) && te(!1);
    };
    return document.addEventListener("keydown", P), () => document.removeEventListener("keydown", P);
  }, [
    h
  ]), me.useEffect(() => {
    if (U.current)
      return () => {
        Q.current && (Q.current.focus({
          preventScroll: !0
        }), Q.current = null, M.current = !1);
      };
  }, [
    U.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ me.createElement("section", {
    ref: i,
    "aria-label": `${I} ${B}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, q.map((P, le) => {
    var fe;
    const [ge, Ae] = P.split("-");
    return A.length ? /* @__PURE__ */ me.createElement("ol", {
      key: P,
      dir: O === "auto" ? Vy() : O,
      tabIndex: -1,
      ref: U,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": k,
      "data-y-position": ge,
      "data-x-position": Ae,
      style: {
        "--front-toast-height": `${((fe = F[0]) == null ? void 0 : fe.height) || 0}px`,
        "--width": `${CC}px`,
        "--gap": `${z}px`,
        ...N,
        ...zC(b, v)
      },
      onBlur: (Me) => {
        M.current && !Me.currentTarget.contains(Me.relatedTarget) && (M.current = !1, Q.current && (Q.current.focus({
          preventScroll: !0
        }), Q.current = null));
      },
      onFocus: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || M.current || (M.current = !0, Q.current = Me.relatedTarget);
      },
      onMouseEnter: () => te(!0),
      onMouseMove: () => te(!0),
      onMouseLeave: () => {
        ce || te(!1);
      },
      onDragEnd: () => te(!1),
      onPointerDown: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || W(!0);
      },
      onPointerUp: () => W(!1)
    }, A.filter((Me) => !Me.position && le === 0 || Me.position === P).map((Me, Ve) => {
      var Jt, Pt;
      return /* @__PURE__ */ me.createElement(DC, {
        key: Me.id,
        icons: _,
        index: Ve,
        toast: Me,
        defaultRichColors: E,
        duration: (Jt = T?.duration) != null ? Jt : w,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Pt = T?.closeButton) != null ? Pt : g,
        interacting: ce,
        position: P,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: Z,
        toasts: A.filter((At) => At.position == Me.position),
        heights: F.filter((At) => At.position == Me.position),
        setHeights: ie,
        expandByDefault: m,
        gap: z,
        expanded: re,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Hy = 32, qy = -30, Iy = -6, Fy = 0.5, Yy = 2, Gy = -24, Xy = 24, Py = -12, Ky = 12, Qy = -12, Zy = 12, Jy = -60, Wy = -20;
class Qi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Vx(t, a, i, l = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, d = `${Va}${o}`, h = await fetch(d, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), g = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(g, p);
  }
  if (!h.ok)
    throw new Error(await Uc(h, "apply"));
  return await h.json();
}
async function OC(t, a, i, l, o = {}) {
  const d = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${Va}${d}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const g = await m.json().catch(() => null), p = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(p, b);
  }
  if (!m.ok)
    throw new Error(await Uc(m, "apply"));
  return await m.json();
}
async function LC(t, a, i = {}) {
  const l = `${Va}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(l, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function UC(t, a, i, l = {}) {
  const o = `${Va}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, d = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (!d.ok)
    throw new Error(await Uc(d, "preview"));
  return d.blob();
}
async function fc(t, a, i, l = 50, o = {}) {
  const d = `${Va}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(l))}`, h = await fetch(d, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Uc(h, "audit fetch"));
  return await h.json();
}
function Sn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Hx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Hy)
    return {
      message: `Chain exceeds the maximum of ${Hy} operations.`
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
      return t.target_lufs < qy || t.target_lufs > Iy ? {
        opId: t.id,
        message: `Normalize target must be between ${qy} and ${Iy} LUFS.`
      } : null;
    case "speed":
      return t.factor < Fy || t.factor > Yy ? {
        opId: t.id,
        message: `Speed factor must be between ${Fy}× and ${Yy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < Gy || t.gain_db > Xy ? {
        opId: t.id,
        message: `Volume must be between ${Gy} and ${Xy} dB.`
      } : null;
    case "eq3":
      for (const [i, l] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (l < Py || l > Ky)
          return {
            opId: t.id,
            message: `EQ ${i} must be between ${Py} and ${Ky} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < Qy || t.semitones > Zy ? {
        opId: t.id,
        message: `Pitch must be between ${Qy} and ${Zy} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < Jy || t.threshold_db > Wy ? {
        opId: t.id,
        message: `Silence threshold must be between ${Jy} and ${Wy} dB.`
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
async function Uc(t, a) {
  const i = await t.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${t.status}`;
}
var VC = "g5r6d10", HC = "g5r6d11", qC = "g5r6d12", IC = "g5r6d13", FC = "g5r6d14", YC = "g5r6d15", GC = "g5r6d1a", XC = "g5r6d1b", PC = "g5r6d1c", KC = "g5r6d1d", QC = "g5r6d1e", ZC = "g5r6d1g", JC = "g5r6d1h", WC = "g5r6d1i", eR = "g5r6d1j", tR = "g5r6d1k", nR = "g5r6d1l", aR = "g5r6d1m", rR = "g5r6d1n", iR = "g5r6d1o", e0 = "g5r6d1p", sR = "g5r6d1q", lR = "g5r6d1r", oR = "g5r6d1s", cR = "g5r6d1t", uR = "g5r6d1u", t0 = "g5r6d1v", n0 = "g5r6d1w", dR = "g5r6d1x", fR = "g5r6d1y", Fi = "g5r6d1z", hR = "g5r6d110", a0 = "g5r6d111", mR = "g5r6d112", pR = "g5r6d113", fr = "g5r6d114", vR = "g5r6d119", gR = "a6ki8u0", yR = "a6ki8u1", bR = "a6ki8u2", xR = "a6ki8u3", SR = "a6ki8u4", wR = "a6ki8u5", ER = "a6ki8u6", uf = "a6ki8u7", jR = "a6ki8u8", NR = "a6ki8u9", TR = "a6ki8ua", CR = "a6ki8ub", RR = "a6ki8uc", MR = "a6ki8ud", _R = "a6ki8ue", AR = "a6ki8uf", DR = "a6ki8ug", zR = "a6ki8uh", kR = "_1lguv7x0", OR = "_1lguv7x1", LR = "_1lguv7x2", UR = "_1lguv7x3", BR = "_1lguv7x4", $R = "_1lguv7x5", VR = "_1lguv7x6", HR = "_1lguv7x7", qR = "_1lguv7x8", IR = "_1lguv7x9", FR = "_1lguv7xa", YR = "_1lguv7xb", GR = "_1lguv7xc", r0 = "_1lguv7xd", XR = "_1lguv7xe", PR = "_1lguv7xf", KR = "_1lguv7xg", QR = "_1lguv7xh", qx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Ix = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, ZR = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, JR = "_4ydn54f";
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
    qx[t],
    Ix[a],
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
  const [p, b] = y.useState(!1), [v, S] = y.useState(t.displayName), E = y.useRef(null), w = y.useMemo(() => eM(t.contentSha256), [t.contentSha256]), N = y.useMemo(() => tM(w, WR), [w]), R = y.useMemo(() => AT(t), [t]);
  y.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), y.useEffect(() => {
    const z = E.current;
    z && (l && R ? z.play().catch(() => {
    }) : (z.pause(), z.currentTime = 0));
  }, [l, R]);
  const T = async () => {
    const z = v.trim();
    if (!z || z === t.displayName) {
      b(!1), S(t.displayName);
      return;
    }
    try {
      await d(z);
    } finally {
      b(!1);
    }
  }, O = `${nM(t.durationMs)} · ${aM(t.sampleRate)}`;
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
            onChange: (z) => S(z.target.value),
            onBlur: () => {
              T();
            },
            onKeyDown: (z) => {
              z.key === "Enter" ? (z.preventDefault(), z.currentTarget.blur()) : z.key === "Escape" && (b(!1), S(t.displayName));
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
        /* @__PURE__ */ c.jsx("span", { className: VR, children: O })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: HR, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: qR,
        "data-playing": l ? "true" : "false",
        disabled: R == null,
        title: R ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": l ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: IR, "aria-hidden": "true", children: l ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: FR, "aria-hidden": "true", children: N.map((z, _) => /* @__PURE__ */ c.jsx("span", { className: YR, style: { height: `${Math.round(z * 100)}%` } }, _)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: GR, children: [
      i.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: r0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        i.map((z) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: XR,
            style: { color: z.color, borderColor: z.color },
            children: z.characterName
          },
          z.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: r0, children: "unassigned" }),
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
    R && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: E,
        src: R,
        preload: "none",
        className: QR,
        onEnded: g
      }
    )
  ] });
}
var iM = "_17eol302", sM = "_17eol303", lM = "_17eol304", oM = "_17eol305", cM = "_17eol306", uM = "_17eol307", Xo = "_17eol308", dM = "_17eol309", fM = "_17eol30a", hM = "_17eol30b", mM = "_17eol30c", pM = "_17eol30d", i0 = "_17eol30e", vM = "_17eol30g";
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
  const [o, d] = y.useState("idle"), [h, m] = y.useState(null), [g, p] = y.useState(0), [b, v] = y.useState(null), [S, E] = y.useState(a), [w, N] = y.useState(!1), R = y.useRef(null), T = y.useRef(null), O = y.useRef([]), z = y.useRef(0), _ = y.useRef(null), I = y.useRef(null), J = y.useRef({ mime: "audio/webm", ext: "webm" }), ne = y.useRef(null), A = y.useRef(null), q = y.useRef(null);
  y.useEffect(() => {
    if (t)
      return q.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ne.current?.scrollIntoView({ behavior: "smooth", block: "center" }), A.current?.focus();
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
  const F = y.useCallback(
    (C) => {
      if (C.key !== "Tab") return;
      const U = ne.current;
      if (!U) return;
      const B = U.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (B.length === 0) return;
      const Q = B[0], M = B[B.length - 1], Z = document.activeElement;
      C.shiftKey ? (Z === Q || Z === U) && (C.preventDefault(), M.focus()) : Z === M && (C.preventDefault(), Q.focus());
    },
    []
  ), ie = y.useCallback(() => {
    if (T.current) {
      for (const C of T.current.getTracks()) C.stop();
      T.current = null;
    }
    _.current != null && (window.clearInterval(_.current), _.current = null);
  }, []), re = y.useCallback(() => {
    ie(), b && URL.revokeObjectURL(b), v(null), O.current = [], I.current = null, p(0), m(null), d("idle");
  }, [b, ie]);
  if (y.useEffect(() => {
    t || (re(), E(a));
  }, [t, a, re]), y.useEffect(() => () => {
    ie(), b && URL.revokeObjectURL(b);
  }, [b, ie]), !t) return null;
  const te = async () => {
    m(null), d("preparing");
    try {
      const C = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = C;
      const U = gM();
      J.current = U;
      const B = U.mime ? new MediaRecorder(C, { mimeType: U.mime }) : new MediaRecorder(C);
      R.current = B, O.current = [], B.ondataavailable = (Q) => {
        Q.data && Q.data.size > 0 && O.current.push(Q.data);
      }, B.onstop = () => {
        const Q = U.mime || "audio/webm", M = new Blob(O.current, { type: Q }), Z = new File([M], `${S || a || "recording"}.${U.ext}`, {
          type: Q
        });
        I.current = Z;
        const P = URL.createObjectURL(M);
        v(P), d("ready"), ie();
      }, B.start(), z.current = Date.now(), p(0), _.current = window.setInterval(() => {
        p(Date.now() - z.current);
      }, 200), d("recording");
    } catch (C) {
      const U = C instanceof Error ? C.message : "could not access microphone";
      m(U), d(U.toLowerCase().includes("denied") ? "denied" : "error"), ie();
    }
  }, ce = () => {
    const C = R.current;
    C && C.state !== "inactive" && C.stop(), _.current != null && (window.clearInterval(_.current), _.current = null);
  }, W = async () => {
    const C = I.current;
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
  }, k = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: iM, role: "presentation", onClick: i, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ne,
      className: sM,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (C) => C.stopPropagation(),
      onKeyDown: F,
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
            children: k
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: mM, "aria-live": "polite", children: yM(g) }),
        /* @__PURE__ */ c.jsxs("div", { className: uM, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: A,
              type: "button",
              className: Xo,
              "data-tone": "danger",
              onClick: () => {
                te();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: i0, "aria-hidden": "true" }),
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
              onClick: ce,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: i0, "aria-hidden": "true" }),
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
                re();
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
              value: S,
              onChange: (C) => E(C.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ c.jsx("div", { className: hM, children: h }),
        /* @__PURE__ */ c.jsxs("div", { className: vM, children: [
          /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "md", onClick: i, disabled: w, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            $e,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                W();
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
function xM({
  deploymentId: t,
  voiceAssets: a,
  mappings: i,
  characterColors: l,
  onVoiceAssetsChange: o
}) {
  const [d, h] = y.useState(""), [m, g] = y.useState("all"), [p, b] = y.useState(!1), [v, S] = y.useState(null), [E, w] = y.useState(!1), [N, R] = y.useState(!1), T = y.useRef(null), O = y.useCallback(
    (te) => "upload",
    []
  ), z = y.useMemo(() => {
    const te = d.trim().toLowerCase();
    return a.filter((ce) => {
      const W = O(ce);
      return !(m === "uploaded" && W !== "upload" || m === "preset" && W !== "preset" || te && !ce.displayName.toLowerCase().includes(te));
    });
  }, [a, d, m, O]), _ = y.useMemo(
    () => a.filter((te) => O(te) === "upload").length,
    [a, O]
  ), I = y.useCallback(
    (te) => {
      const ce = [], W = /* @__PURE__ */ new Set();
      for (const k of i)
        k.speakerVoiceAssetId === te && (W.has(k.characterName) || (W.add(k.characterName), ce.push({
          characterName: k.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: l[k.characterName] ?? "#ba9eff"
        })));
      return ce;
    },
    [i, l]
  ), J = y.useCallback(
    async (te) => {
      const ce = Array.from(te).slice(0, 8);
      if (ce.length !== 0) {
        R(!0);
        try {
          const W = [];
          for (const k of ce) {
            if (!k.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(k.name)) {
              Zt.error(`${k.name}: not an audio file`);
              continue;
            }
            const C = k.name.replace(/\.[^.]+$/, "");
            try {
              const U = await bc(t, k, C, "speaker");
              W.push(U), Zt.success(`Added ${U.displayName}`);
            } catch (U) {
              Zt.error(U instanceof Error ? U.message : `${k.name}: upload failed`);
            }
          }
          W.length > 0 && o([...W, ...a]);
        } finally {
          R(!1);
        }
      }
    },
    [t, a, o]
  ), ne = (te) => {
    te.preventDefault(), b(!1), te.dataTransfer?.files && J(te.dataTransfer.files);
  }, A = y.useCallback(async () => {
    const te = window.prompt("Paste an audio URL (https://…)");
    if (te)
      try {
        const ce = await fetch(te);
        if (!ce.ok) throw new Error(`fetch failed: ${ce.status}`);
        const W = await ce.blob(), k = te.split("/").pop()?.split("?")[0] ?? "voice.wav", C = new File([W], k, { type: W.type || "audio/wav" });
        await J([C]);
      } catch (ce) {
        Zt.error(ce instanceof Error ? ce.message : "could not fetch URL");
      }
  }, [J]), q = y.useCallback(
    async (te, ce) => {
      try {
        const W = await _T(t, te, ce);
        o(
          a.map((k) => k.voiceAssetId === te ? W : k)
        ), Zt.success(`Renamed to ${W.displayName}`);
      } catch (W) {
        Zt.error(W instanceof Error ? W.message : "rename failed");
      }
    },
    [t, a, o]
  ), F = y.useCallback((te) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(te), Zt.success("Copied name")) : Zt.error("Clipboard unavailable");
  }, []), ie = y.useCallback(
    async (te) => {
      if (window.confirm(`Delete "${te.displayName}"? Mappings using it will reset.`))
        try {
          await MT(t, te.voiceAssetId), o(a.filter((W) => W.voiceAssetId !== te.voiceAssetId)), Zt.success(`Deleted ${te.displayName}`);
        } catch (W) {
          Zt.error(W instanceof Error ? W.message : "delete failed");
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
        onDragOver: (te) => {
          te.preventDefault(), b(!0);
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
            /* @__PURE__ */ c.jsxs("div", { className: ER, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: uf,
                  onClick: () => T.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: uf,
                  onClick: () => {
                    A();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: uf,
                  onClick: () => w(!0),
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
              onClick: () => T.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: T,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: zR,
              onChange: (te) => {
                te.target.files && (J(te.target.files), te.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: jR, children: [
      /* @__PURE__ */ c.jsxs("label", { className: NR, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: TR,
            value: d,
            onChange: (te) => h(te.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: CR, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([te, ce]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: RR,
          "data-active": m === te ? "true" : "false",
          onClick: () => g(te),
          children: ce
        },
        te
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: AR, children: [
        /* @__PURE__ */ c.jsx("span", { className: DR, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          _,
          " uploaded"
        ] })
      ] })
    ] }),
    z.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: _R, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: MR, children: z.map((te) => {
      const ce = O(te);
      return /* @__PURE__ */ c.jsx(
        rM,
        {
          asset: te,
          presentation: ce,
          usedBy: I(te.voiceAssetId),
          isPlaying: v === te.voiceAssetId,
          onTogglePlay: () => S((W) => W === te.voiceAssetId ? null : te.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (W) => q(te.voiceAssetId, W),
          onCopyName: () => F(te.displayName),
          onDelete: ce === "upload" ? () => void ie(te) : void 0
        },
        te.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      bM,
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
      const W = await bc(t, te, ce, "speaker");
      o([W, ...a]), Zt.success(`Recorded ${W.displayName}`);
    } catch (W) {
      throw Zt.error(W instanceof Error ? W.message : "upload failed"), W;
    } finally {
      R(!1);
    }
  }
}
async function Fx(t) {
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
var s0 = "_190jlds0", EM = "_190jlds1", jM = "_190jlds2", NM = "_190jlds3", TM = "_190jlds4", CM = "_190jlds5", RM = "_190jlds6", MM = "_190jlds7", _M = "_190jlds8", AM = "_190jlds9", l0 = "_190jldsa", DM = "_190jldsb", o0 = "_190jldsc", zM = "_190jldsd", kM = "_190jldse", OM = "_190jldsf";
function LM({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: l,
  emptyHint: o
}) {
  const [d, h] = y.useState(() => Ui(a[0])), [m, g] = y.useState([]), [p, b] = y.useState(!1), [v, S] = y.useState(null), [E, w] = y.useState(!1), [N, R] = y.useState(null), T = y.useMemo(
    () => a.find((_) => Ui(_) === d) ?? a[0],
    [a, d]
  );
  y.useEffect(() => {
    a.length && (a.some((_) => Ui(_) === d) || h(Ui(a[0])));
  }, [a, d]), y.useEffect(() => {
    if (!T) {
      g([]);
      return;
    }
    let _ = !1;
    return b(!0), S(null), fc(t, T.kind, T.id, 50).then((I) => {
      _ || g(I.entries);
    }).catch((I) => {
      _ || S(I instanceof Error ? I.message : "audit fetch failed");
    }).finally(() => {
      _ || b(!1);
    }), () => {
      _ = !0;
    };
  }, [t, T]);
  const O = y.useCallback(() => {
    if (!T) return;
    const _ = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, I = new Blob([JSON.stringify(_, null, 2)], {
      type: "application/json"
    }), J = URL.createObjectURL(I), ne = document.createElement("a");
    ne.href = J, ne.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ne), ne.click(), document.body.removeChild(ne), URL.revokeObjectURL(J);
  }, [t, m, T]), z = y.useCallback(async () => {
    if (!(!T || !i) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      w(!0);
      try {
        await i(T);
        const _ = await fc(t, T.kind, T.id, 50);
        g(_.entries);
      } catch (_) {
        S(_ instanceof Error ? _.message : "revert failed");
      } finally {
        w(!1);
      }
    }
  }, [t, i, T]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: s0, children: /* @__PURE__ */ c.jsx("p", { className: o0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: s0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: EM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: jM, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: l0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: NM,
            value: d,
            onChange: (_) => h(_.target.value),
            children: a.map((_) => /* @__PURE__ */ c.jsxs("option", { value: Ui(_), children: [
              _.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              _.label
            ] }, Ui(_)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: TM, children: [
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: O,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void z(),
            disabled: E || !T,
            children: E ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: kM, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: OM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: o0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: zM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: CM, children: m.map((_) => {
      const I = l && T && !!_.chain_snapshot_json && _.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: RM, children: [
        /* @__PURE__ */ c.jsx("span", { className: MM, children: UM(_.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: _M, children: _.operation_count === 0 ? "cleared" : `${_.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: AM, title: _.digest_after, children: [
          _.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: l0, children: _.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: DM,
            style: {
              background: `color-mix(in oklab, ${_.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: _.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: _.digest_before === "" || !_.digest_before ? "create" : _.operation_count === 0 ? "clear" : "update"
          }
        ),
        I && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            disabled: E || N !== null,
            onClick: async () => {
              if (!(!T || !_.chain_snapshot_json) && !(N !== null || E) && window.confirm(
                `Replay this ${_.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                R(_.entry_id);
                try {
                  await l(T, _.chain_snapshot_json, _);
                  const J = await fc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  g(J.entries);
                } catch (J) {
                  S(J instanceof Error ? J.message : "revert failed");
                } finally {
                  R(null);
                }
              }
            },
            children: N === _.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, _.entry_id);
    }) })
  ] });
}
function Ui(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function UM(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var BM = "_1uzgubz0", $M = "_1uzgubz1", VM = "_1uzgubz2", HM = "_1uzgubz3", qM = "_1uzgubz4", IM = "_1uzgubz5", FM = "_1uzgubz6", YM = "_1uzgubz7", c0 = "_1uzgubz8", GM = "_1uzgubz9", Yx = "_1uzgubza", Gx = "_1uzgubzb", XM = "_1uzgubzc", PM = "_1uzgubzd", df = "_1uzgubze", ff = "_1uzgubzf", KM = "_1uzgubzg", QM = "_1uzgubzh", u0 = "_1uzgubzi", d0 = "_1uzgubzj", f0 = "_1uzgubzk", h0 = "_1uzgubzl", m0 = "_1uzgubzm", ZM = "_1uzgubzn", JM = "_1uzgubzo", WM = "_1uzgubzp", e_ = "_1uzgubzq";
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
  const [S, E] = y.useState(!1), w = l ? o.find((O) => O.voiceAssetId === l.speakerVoiceAssetId) : null, N = l?.defaultVectorPresetId ? d.find((O) => O.presetId === l.defaultVectorPresetId) ?? null : null, R = (t[0] ?? "?").toUpperCase(), T = l !== null;
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
              children: R
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
            w ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: c0, children: w.displayName }),
              w.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                p0(w.durationMs),
                " ·",
                " ",
                w.sampleRate ? `${w.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: c0, children: N.presetName }),
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
              className: `${GM} ${T ? Yx : Gx}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ c.jsxs("div", { className: PM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: df, children: [
        /* @__PURE__ */ c.jsx("span", { className: ff, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${KM}${S ? ` ${QM}` : ""}`,
            onDragEnter: (O) => {
              O.preventDefault(), E(!0);
            },
            onDragOver: (O) => O.preventDefault(),
            onDragLeave: () => E(!1),
            onDrop: (O) => {
              O.preventDefault(), E(!1);
              const z = O.dataTransfer.files?.[0];
              z && b && b(z);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (O) => {
                    const z = O.target.files?.[0];
                    z && b && b(z);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: df, children: [
        /* @__PURE__ */ c.jsx("span", { className: ff, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: u0, children: o.map((O) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${d0}${l?.speakerVoiceAssetId === O.voiceAssetId ? ` ${f0}` : ""}`,
            onClick: () => g(O.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: h0, children: O.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: m0, children: [
                O.durationMs != null ? p0(O.durationMs) : "—",
                " ",
                "·",
                " ",
                O.sampleRate ? `${O.sampleRate} Hz` : "—"
              ] })
            ]
          },
          O.voiceAssetId
        )) })
      ] }),
      d.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: df, children: [
        /* @__PURE__ */ c.jsx("span", { className: ff, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: u0, children: d.map((O) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${d0}${l?.defaultVectorPresetId === O.presetId ? ` ${f0}` : ""}`,
            onClick: () => p(O.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: h0, children: O.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: m0, children: "preset · vector" })
            ]
          },
          O.presetId
        )) })
      ] }),
      T && v && /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function p0(t) {
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
        className: `${JM} ${o ? Yx : Gx}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: WM, children: i })
  ] });
}
async function xc() {
  return ht("/runtime/health");
}
async function Xx() {
  await ht("/runtime/start", { method: "POST" });
}
async function Px() {
  return ht("/runtime/stop", { method: "POST" });
}
function Kx(t) {
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
var a_ = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function zn({
  severity: t,
  children: a,
  role: i,
  ariaLive: l,
  className: o,
  style: d
}) {
  const h = [a_[t], o].filter(Boolean).join(" "), m = i ?? (t === "error" ? "alert" : "status"), g = l ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: h, role: m, "aria-live": g, style: d, children: a });
}
var Qx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Zx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, r_ = "_13bb4njb";
function Zr({
  tone: t,
  size: a = "sm",
  pulse: i = !1,
  children: l,
  className: o,
  style: d,
  title: h
}) {
  const m = i && t !== "faint", g = [Qx[a], Zx[t], m ? r_ : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: g, style: d, title: h, children: l });
}
const i_ = 4e3;
function s_({ deployment: t }) {
  const [a, i] = y.useState(null), [l, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const g = async () => {
      try {
        const b = await xc();
        m || (i(b), o(null));
      } catch (b) {
        m || o(c_(b));
      }
    };
    g();
    const p = setInterval(g, i_);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const d = a?.badge ?? "not_installed", h = l?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: hR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Zr, { tone: l_(d), pulse: d === "starting" || d === "installing", children: Kx(d) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: o_(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "VRAM" }),
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
function l_(t) {
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
function o_(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function c_(t) {
  return t instanceof es || t instanceof Error ? t.message : "unknown error";
}
const Sc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Bc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ua = 1e-3;
function u_(t, a, i) {
  for (const l of Object.keys(Sc)) {
    const o = Sc[l];
    if (Math.abs(o.low - t) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - i) < Ua)
      return l;
  }
  return "custom";
}
function d_(t) {
  let a = h_();
  for (const i of t.ops)
    a = f_(a, i);
  return a;
}
function f_(t, a) {
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
          preset: u_(a.low_db, a.mid_db, a.high_db)
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
function h_() {
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
function m_(t, a) {
  const i = wr(t, "gain");
  if (Math.abs(a) < Ua) return { ...t, ops: i };
  const l = { id: Sn(), mode: "gain", gain_db: a };
  return { ...t, ops: Er(i, l) };
}
function p_(t, a, i, l) {
  const o = wr(t, "eq3");
  if (Math.abs(a) < Ua && Math.abs(i) < Ua && Math.abs(l) < Ua)
    return { ...t, ops: o };
  const d = {
    id: Sn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: l
  };
  return { ...t, ops: Er(o, d) };
}
function v_(t, a) {
  const i = wr(t, "speed");
  if (Math.abs(a - 1) < Ua) return { ...t, ops: i };
  const l = { id: Sn(), mode: "speed", factor: a };
  return { ...t, ops: Er(i, l) };
}
function g_(t, a) {
  const i = wr(t, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Er(i, l) };
}
function y_(t, a, i) {
  const l = wr(t, "normalize");
  if (a === "off") return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...t, ops: Er(l, o) };
}
function b_(t, a) {
  const i = wr(t, "fade_in");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Er(i, l) };
}
function x_(t, a) {
  const i = wr(t, "fade_out");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Er(i, l) };
}
function S_(t, a, i) {
  const l = wr(t, "silence_strip");
  if (!a) return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...t, ops: Er(l, o) };
}
const Jx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function Wx(t, a) {
  const i = {
    ...t,
    ops: t.ops.filter((d) => !Jx.has(d.mode))
  };
  let o = m_({ version: 1, ops: [] }, a.volumeDb);
  return o = p_(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = v_(o, a.speed.value)), o = g_(o, a.pitchSt), o = y_(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = b_(o, a.fade.inS), o = x_(o, a.fade.outS), o = S_(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function e1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((i) => Jx.has(i.mode))
  };
  return d_(a);
}
var w_ = "_1rsa80i0", E_ = "_1rsa80i1", j_ = "_1rsa80i2", N_ = "_1rsa80i3", T_ = "_1rsa80i4", C_ = "_1rsa80i5", R_ = "_1rsa80i6", M_ = "_1rsa80i7", __ = "_1rsa80i8", A_ = "_1rsa80i9";
const t1 = ["flat", "warm", "bright", "voice", "telephone"], Js = -12, Po = 12, D_ = 0.5;
function z_(t) {
  const { low: a, mid: i, high: l, preset: o, onChange: d, disabled: h } = t, m = (p) => {
    const b = Sc[p];
    d(b.low, b.mid, b.high, p);
  }, g = (p, b) => {
    const v = { low: a, mid: i, high: l, [p]: b }, S = O_(v.low, v.mid, v.high);
    d(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: w_, children: [
    /* @__PURE__ */ c.jsxs("div", { className: E_, role: "group", "aria-label": "EQ presets", children: [
      t1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: j_,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: N_, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: T_, children: [
      /* @__PURE__ */ c.jsx(
        hf,
        {
          label: "Low",
          value: a,
          onChange: (p) => g("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ c.jsx(
        hf,
        {
          label: "Mid",
          value: i,
          onChange: (p) => g("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ c.jsx(
        hf,
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
function hf({ label: t, value: a, onChange: i, disabled: l }) {
  const o = (a - Js) / (Po - Js) * 100, d = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: C_, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: d, className: R_, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: d,
        type: "range",
        min: Js,
        max: Po,
        step: D_,
        value: a,
        disabled: l,
        className: __,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": Js,
        "aria-valuemax": Po,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: M_, children: k_(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: A_, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: Js }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Po
      ] })
    ] })
  ] });
}
function k_(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const mf = 1e-3;
function O_(t, a, i) {
  for (const l of t1) {
    const o = Sc[l];
    if (Math.abs(o.low - t) < mf && Math.abs(o.mid - a) < mf && Math.abs(o.high - i) < mf)
      return l;
  }
  return "custom";
}
var L_ = "_85bhwb0", U_ = "_85bhwb1", v0 = "_85bhwb2", B_ = "_85bhwb3", $_ = "_85bhwb4", V_ = "_85bhwb5", H_ = "_85bhwb6", q_ = "_85bhwb7";
const Ko = 0.5, pf = 2, I_ = 0.05;
function F_(t) {
  const { mode: a, value: i, supportsSynthSpeed: l, onChange: o, onReRenderAtSynthTime: d, disabled: h } = t, m = (i - Ko) / (pf - Ko) * 100, g = y.useId(), p = (v) => o(v, i), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: L_, children: [
    l ? /* @__PURE__ */ c.jsxs("div", { className: U_, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: v0,
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
          className: v0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: B_, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Ko,
          max: pf,
          step: I_,
          value: i,
          disabled: h,
          className: $_,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": pf,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: V_, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && l ? /* @__PURE__ */ c.jsxs("div", { className: H_, children: [
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
      /* @__PURE__ */ c.jsx("span", { className: q_, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var Y_ = "kgszk50", G_ = "kgszk51", g0 = "kgszk52", X_ = "kgszk53", P_ = "kgszk54", n1 = "kgszk55", K_ = "kgszk56", Q_ = "kgszk58", Hh = "kgszk59", a1 = "kgszk5a", qh = "kgszk5b", Z_ = "kgszk5c", J_ = "kgszk5d", W_ = "kgszk5e", y0 = "kgszk5f", b0 = "kgszk5g", x0 = "kgszk5h", e2 = "kgszk5i", t2 = "kgszk5j", n2 = "kgszk5l", pl = "kgszk5m", vl = "kgszk5n";
const a2 = -24, r2 = 24, i2 = 0.5, s2 = -12, l2 = 12, o2 = 0.5, c2 = -30, u2 = -6, d2 = -12, f2 = 0, Qo = -60, vf = -20;
function Ih(t) {
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
  } = t, b = (E) => {
    i({ ...a, ...E });
  }, v = v2(a), S = (E) => {
    const w = E.target;
    w && (w.tagName === "INPUT" || w.tagName === "BUTTON" || w.closest("input, button")) && d?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: Y_, onPointerDownCapture: S, children: [
    /* @__PURE__ */ c.jsxs("div", { className: G_, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: X_, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: g0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ c.jsxs("span", { className: g0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: P_, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      S0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: a2,
        max: r2,
        step: i2,
        format: g2,
        value: a.volumeDb,
        onChange: (E) => b({ volumeDb: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        z_,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (E, w, N, R) => b({ eq3: { low: E, mid: w, high: N, preset: R } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        F_,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: l,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (E, w) => b({ speed: { mode: E, value: w } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      S0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: s2,
        max: l2,
        step: o2,
        format: y2,
        value: a.pitchSt,
        onChange: (E) => b({ pitchSt: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      h2,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (E) => b({ normalize: E })
      }
    ),
    /* @__PURE__ */ c.jsx(
      m2,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (E, w) => b({ fade: { ...a.fade, inS: E, outS: w } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      p2,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (E, w) => b({ silence: { enabled: E, thresholdDb: w } })
      }
    ),
    g ? /* @__PURE__ */ c.jsxs("div", { className: n2, children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(Bc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx($e, { variant: "primary", size: "md", onClick: g, disabled: m, children: p })
    ] }) : null
  ] });
}
function S0(t) {
  const { label: a, sub: i, min: l, max: o, step: d, format: h, value: m, onChange: g, disabled: p } = t, b = (m - l) / (o - l) * 100, v = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: n1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: K_, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Q_, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: a1, children: i })
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
        className: qh,
        style: { "--fill": `${b}%` },
        onChange: (S) => g(Number(S.target.value)),
        "aria-valuemin": l,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Hh, children: h(m) })
  ] });
}
function h2({ normalize: t, onChange: a, disabled: i }) {
  const o = t.mode === "loudness" ? { min: c2, max: u2, step: 0.5, suffix: "LUFS" } : { min: d2, max: f2, step: 0.5, suffix: "dB" }, d = b2(t.targetDbOrLufs, o.min, o.max), h = (d - o.min) / (o.max - o.min) * 100, m = (g) => {
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
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Normalize" }),
    /* @__PURE__ */ c.jsx("div", { className: Z_, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const p = g === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: J_,
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
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: n1, children: [
      /* @__PURE__ */ c.jsx("span", { className: a1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: d,
          disabled: i,
          className: qh,
          style: { "--fill": `${h}%` },
          onChange: (g) => a({ mode: t.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": d,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Hh, children: [
        d.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function m2({ inS: t, outS: a, onChange: i, disabled: l }) {
  const o = y.useId(), d = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: W_, children: [
      /* @__PURE__ */ c.jsxs("div", { className: y0, children: [
        /* @__PURE__ */ c.jsx("label", { className: b0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: l,
            className: x0,
            onChange: (h) => i(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: y0, children: [
        /* @__PURE__ */ c.jsx("label", { className: b0, htmlFor: d, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: d,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: l,
            className: x0,
            onChange: (h) => i(t, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function p2({ enabled: t, thresholdDb: a, onChange: i, disabled: l }) {
  const o = (a - Qo) / (vf - Qo) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: e2, children: [
      /* @__PURE__ */ c.jsxs("label", { className: t2, children: [
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
          min: Qo,
          max: vf,
          step: 1,
          value: a,
          disabled: l || !t,
          className: qh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (d) => i(t, Number(d.target.value)),
          "aria-valuemin": Qo,
          "aria-valuemax": vf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Hh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Bi = 1e-3;
function v2(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Bi && a.push("gain"), (Math.abs(t.eq3.low) >= Bi || Math.abs(t.eq3.mid) >= Bi || Math.abs(t.eq3.high) >= Bi) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Bi && a.push("speed"), Math.abs(t.pitchSt) >= Bi && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function g2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function y2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function b2(t, a, i) {
  return Number.isFinite(t) ? Math.max(a, Math.min(i, t)) : a;
}
var x2 = "skdk4g0", S2 = "skdk4g1", w0 = "skdk4g2", w2 = "skdk4g3", E2 = "skdk4g4", j2 = "skdk4g5", N2 = "skdk4g6", T2 = "skdk4g7", C2 = "skdk4g8", R2 = "skdk4g9", M2 = "skdk4ga", _2 = "skdk4gb", A2 = "skdk4gc", D2 = "skdk4gd", E0 = "skdk4ge", j0 = "skdk4gf", z2 = "skdk4gg", N0 = "skdk4gh", T0 = "skdk4gi", k2 = "skdk4gj", O2 = "skdk4gk", L2 = "skdk4gl", C0 = "skdk4gm", U2 = "skdk4gn", R0 = "skdk4go", B2 = "skdk4gp", $2 = "skdk4gq", V2 = "skdk4gr", H2 = "skdk4gs", q2 = "skdk4gt", I2 = "skdk4gu", F2 = "skdk4gv", M0 = "skdk4gw", Y2 = "skdk4gx", G2 = "skdk4gy", X2 = "skdk4gz", P2 = "skdk4g10", K2 = "cgsfgh1", Q2 = "cgsfgh2", Z2 = "cgsfgh3", J2 = "cgsfgh4", W2 = "cgsfgh5", eA = "cgsfgh6", tA = "cgsfgh7", nA = "cgsfgh8", aA = "cgsfgh9", rA = "cgsfgha", iA = "cgsfghb", sA = "cgsfghc", lA = "cgsfghd", oA = "cgsfghe", cA = "cgsfghm", uA = "cgsfghn", dA = "cgsfgho", fA = "cgsfghp";
const Vt = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], gl = {
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
}, r1 = 0.05;
function hA(t) {
  let a = null, i = -1 / 0;
  for (const l of Vt) {
    const o = t[l];
    o > i && (i = o, a = l);
  }
  return !a || i <= r1 ? null : a;
}
function i1(t, a = 3) {
  return Vt.map((i) => ({ key: i, label: gl[i], value: t[i] })).filter((i) => i.value > r1).sort((i, l) => l.value - i.value).slice(0, a);
}
function mA(t) {
  let a = 0;
  for (const i of Vt) a += t[i] * t[i];
  return Math.sqrt(a);
}
function _0(t) {
  const a = i1(t, 2), i = a[0];
  if (!i) return "";
  const l = a[1];
  return !l || i.value - l.value > 0.25 ? gf(i.label) : `${gf(i.label)} + ${l.label.toLowerCase()}`;
}
function gf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Jr(t) {
  const a = { ...Zi };
  for (const i of Vt) {
    const l = t[i];
    a[i] = Number.isFinite(l) ? Math.max(0, Math.min(1, l)) : 0;
  }
  return a;
}
const A0 = 0.05, D0 = 0.2, pA = 22, vA = 320, yf = 0.78;
function bf(t, a, i, l) {
  const o = Math.cos(i), d = Math.sin(i), h = t * o + a * d;
  return Math.max(0, Math.min(1, h / l));
}
function gA(t) {
  const { vec: a, onChange: i, size: l, reduceMotion: o = !1 } = t, [d, h] = y.useState(a), [m, g] = y.useState(null), [p, b] = y.useState(null), v = y.useRef(null), S = y.useRef(a), E = y.useRef(o), w = y.useRef(null), N = y.useRef(0);
  E.current = o, y.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const R = y.useCallback(
    (q) => {
      const F = Jr(q);
      h(F), S.current = F, i(F);
    },
    [i]
  ), T = y.useCallback((q) => {
    const F = Jr(q);
    h(F), S.current = F;
  }, []), O = y.useCallback(
    (q) => {
      const F = v.current;
      if (!F || E.current) return;
      const ie = q.clientX - F.centerX, re = q.clientY - F.centerY, te = l / 2 * yf, ce = bf(ie, re, F.angle, te), W = { ...S.current, [F.axis]: ce };
      T(W);
    },
    [l, T]
  ), z = y.useCallback(
    (q) => {
      const F = v.current;
      if (F) {
        if (window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), E.current) {
          const ie = q.clientX - F.centerX, re = q.clientY - F.centerY, te = l / 2 * yf, ce = bf(ie, re, F.angle, te), W = { ...S.current, [F.axis]: ce };
          v.current = null, R(W);
          return;
        }
        v.current = null, R(S.current);
      }
    },
    [R, O, l]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), v.current = null, w.current !== null && (window.clearTimeout(w.current), w.current = null);
  }, [O, z]);
  const _ = y.useCallback((q, F) => {
    E.current || (N.current += 1, b({ x: q, y: F, key: N.current }), w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
      b(null), w.current = null;
    }, vA));
  }, []), I = y.useCallback(
    (q, F, ie, re, te) => {
      const ce = ie.getBoundingClientRect(), W = ce.left + ce.width / 2, k = ce.top + ce.height / 2, U = Vt.indexOf(q) / Vt.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: q,
        pointerId: F,
        centerX: W,
        centerY: k,
        angle: U
      }, g(q), re !== void 0 && te !== void 0) {
        const B = re - W, Q = te - k, M = l / 2 * yf, Z = bf(B, Q, U, M), P = { ...S.current, [q]: Z };
        E.current ? R(P) : T(P);
      }
      window.addEventListener("pointermove", O), window.addEventListener("pointerup", z), window.addEventListener("pointercancel", z);
    },
    [R, O, z, l, T]
  ), J = y.useCallback(
    (q, F) => {
      F.preventDefault();
      const ie = F.currentTarget, re = ie.ownerSVGElement ?? ie;
      I(q, F.pointerId, re);
    },
    [I]
  ), ne = y.useCallback(
    (q) => {
      const F = q.currentTarget, ie = F instanceof SVGSVGElement ? F : F.ownerSVGElement ?? F, re = ie.getBoundingClientRect(), te = re.left + re.width / 2, ce = re.top + re.height / 2, W = q.clientX - te, k = q.clientY - ce;
      if (Math.sqrt(W * W + k * k) < 8) return;
      let U = Math.atan2(k, W) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let B = null, Q = 999;
      for (let P = 0; P < Vt.length; P++) {
        const le = Vt[P];
        if (!le) continue;
        const fe = P / Vt.length * 360, ge = Math.abs((fe - U + 540) % 360 - 180);
        ge < Q && (Q = ge, B = le);
      }
      if (!B || Q > pA) return;
      q.preventDefault();
      const M = (q.clientX - re.left) / re.width * l, Z = (q.clientY - re.top) / re.height * l;
      _(M, Z), I(B, q.pointerId, ie, q.clientX, q.clientY);
    },
    [I, l, _]
  ), A = y.useCallback(
    (q, F) => {
      const ie = S.current[q];
      let re = ie;
      switch (F.key) {
        case "ArrowUp":
        case "ArrowRight":
          re = ie + A0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          re = ie - A0;
          break;
        case "PageUp":
          re = ie + D0;
          break;
        case "PageDown":
          re = ie - D0;
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
      F.preventDefault(), g(q), R({ ...S.current, [q]: re });
    },
    [R]
  );
  return {
    liveVec: d,
    activeAxis: m,
    setActiveAxis: g,
    onPointerDown: J,
    onKeyDown: A,
    onSurfacePointerDown: ne,
    surfacePing: p
  };
}
const yA = [0.25, 0.5, 0.75, 1];
function bA({
  vec: t,
  onChange: a,
  size: i = 360,
  readOnly: l = !1,
  reduceMotion: o = !1
}) {
  const d = gA({ vec: t, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, g = i / 2 * 0.78, p = y.useMemo(() => xA(h, m, g), [h, m, g]), b = y.useMemo(() => Vt.map((v, S) => {
    const E = hc(d.liveVec[v]), w = p[S];
    return w ? `${h + w.dx * E},${m + w.dy * E}` : "0,0";
  }).join(" "), [p, h, m, d.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: K2, children: /* @__PURE__ */ c.jsx("div", { className: Q2, style: { width: i, height: i }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: Z2,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: l ? void 0 : d.onSurfacePointerDown,
      style: l ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        yA.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: J2,
            cx: h,
            cy: m,
            r: g * v
          },
          v
        )),
        Vt.map((v, S) => {
          const E = p[S];
          if (!E) return null;
          const w = h + E.dx * 1.18, N = m + E.dy * 1.18, R = d.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: W2,
                x1: h,
                y1: m,
                x2: h + E.dx,
                y2: m + E.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${lA}${R ? ` ${oA}` : ""}`,
                x: w,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: gl[v]
              }
            )
          ] }, v);
        }),
        Vt.map((v, S) => {
          const E = hc(d.liveVec[v]);
          if (E <= 0.01) return null;
          const w = p[S];
          if (!w) return null;
          const N = d.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${tA}${N ? ` ${nA}` : ""}`,
              x1: h,
              y1: m,
              x2: h + w.dx * E,
              y2: m + w.dy * E
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: eA, points: b }),
        d.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: sA,
            cx: d.surfacePing.x,
            cy: d.surfacePing.y,
            r: 10
          },
          d.surfacePing.key
        ),
        !l && Vt.map((v, S) => {
          const E = hc(d.liveVec[v]), w = p[S];
          if (!w) return null;
          const N = h + w.dx * E, R = m + w.dy * E, T = d.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: aA,
                cx: N,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${gl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": E,
                onPointerDown: (O) => d.onPointerDown(v, O),
                onKeyDown: (O) => d.onKeyDown(v, O),
                onFocus: () => d.setActiveAxis(v),
                onBlur: () => d.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${rA}${T ? ` ${iA}` : ""}`,
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
function xA(t, a, i) {
  return Vt.map((l, o) => {
    const d = o / Vt.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(d) * i,
      dy: Math.sin(d) * i
    };
  });
}
function hc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function SA({ vec: t, size: a = 36 }) {
  const i = a / 2, l = a / 2, o = a / 2 * 0.86, d = y.useMemo(() => Vt.map((h, m) => {
    const g = hc(t[h]), p = m / Vt.length * Math.PI * 2 - Math.PI / 2, b = i + Math.cos(p) * o * g, v = l + Math.sin(p) * o * g;
    return `${b},${v}`;
  }).join(" "), [i, l, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: cA, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: uA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: dA, cx: i, cy: l, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: fA, points: d })
      ]
    }
  ) });
}
var wA = "_1jqr3aj0", EA = "_1jqr3aj1", jA = "_1jqr3aj2", NA = "_1jqr3aj3", TA = "_1jqr3aj4", CA = "_1jqr3aj5", RA = "_1jqr3aj6", MA = "_1jqr3aj7";
const z0 = 0.05, k0 = 0.2;
function _A({
  vec: t,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: l = !1
}) {
  const [o, d] = y.useState(null), h = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), g = y.useCallback(
    (w, N) => {
      const R = Math.max(0, Math.min(1, N));
      a(Jr({ ...t, [w]: R }));
    },
    [a, t]
  ), p = y.useCallback((w, N) => {
    const R = m.current.get(w);
    return !R || R.width <= 0 ? 0 : (N - R.left) / R.width;
  }, []), b = y.useCallback(
    (w, N) => {
      if (i) return;
      N.preventDefault();
      const R = N.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && m.current.set(w, R.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), h.current = w, d(w), g(w, p(w, N.clientX));
    },
    [i, g, p]
  ), v = y.useCallback(
    (w, N) => {
      i || l || h.current === w && g(w, p(w, N.clientX));
    },
    [i, l, g, p]
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
          T = R + z0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = R - z0;
          break;
        case "PageUp":
          T = R + k0;
          break;
        case "PageDown":
          T = R - k0;
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
      N.preventDefault(), d(w), g(w, T);
    },
    [i, g, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: wA, role: "group", "aria-label": "Emotion axis sliders", children: Vt.map((w) => {
    const N = AA(t[w] ?? 0), R = N > 0.05, T = o === w, O = gl[w];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${EA}${R ? ` ${jA}` : ""}${T ? ` ${NA}` : ""}`,
        role: "slider",
        "aria-label": `${O} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (z) => b(w, z),
        onPointerMove: (z) => v(w, z),
        onPointerUp: (z) => S(w, z),
        onPointerCancel: (z) => S(w, z),
        onKeyDown: (z) => E(w, z),
        onFocus: () => d(w),
        onBlur: () => d(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: TA, children: O }),
          /* @__PURE__ */ c.jsx("span", { className: CA, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: RA,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: MA, children: N.toFixed(2) })
        ]
      },
      w
    );
  }) });
}
function AA(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var O0 = "gvwvwg0", DA = "gvwvwg2", zA = "gvwvwg3", kA = "gvwvwg8", OA = "gvwvwg9", LA = "gvwvwga", UA = "gvwvwgb", BA = "gvwvwgc", $A = "gvwvwgd", VA = "gvwvwge";
function HA({
  presets: t,
  activePresetId: a,
  onSelect: i,
  onDelete: l
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
    /* @__PURE__ */ c.jsx("span", { className: DA, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: zA, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
    /* @__PURE__ */ c.jsx("span", { className: VA, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: kA, children: t.map((o) => {
      const d = qA(o), h = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${OA}${h ? ` ${UA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: LA,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ c.jsx(SA, { vec: d, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: BA, children: o.presetName })
                ]
              }
            ),
            l && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: $A,
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
const Jf = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function qA(t) {
  const a = Jf.reduce(
    (l, o) => ({ ...l, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const i = Jf.reduce(
    (l, o, d) => ({ ...l, [o]: t.vector[d] ?? 0 }),
    a
  );
  return Jr(i);
}
function xf(t) {
  return Jf.map((a) => t[a] ?? 0);
}
const IA = [
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
], FA = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], YA = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], GA = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function XA(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Zi };
  const l = a.split(/\s+/).some((h) => FA.includes(h)) ? 1.2 : 1, o = YA.some((h) => a.includes(h)) ? 0.55 : 1, d = { ...Zi };
  for (const h of IA) {
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
      GA.some((T) => new RegExp(`\\b${T}\\b`).test(R)) || (m += 1);
    }
    if (m > 0) {
      const g = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * l * o;
      d[h.axis] = Math.min(1, g);
    }
  }
  return Vt.every((h) => d[h] === 0) && (d.calm = 0.4), Jr(d);
}
const PA = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function KA({
  value: t,
  onChange: a,
  deploymentId: i
}) {
  const l = t.mode ?? "none", o = y.useMemo(() => QA(t.vector), [t.vector]), d = t.emotionAlpha ?? 1, [h, m] = y.useState([]), [g, p] = y.useState(null), [b, v] = y.useState(!1), [S, E] = y.useState(null), [w, N] = y.useState(""), [R, T] = y.useState(!1), O = y.useRef(!0);
  y.useEffect(() => (O.current = !0, () => {
    O.current = !1;
  }), []), y.useEffect(() => {
    let C = !1;
    return Fx(i).then((U) => {
      C || m(L0(U.presets));
    }).catch((U) => {
      C || p(Sf(U));
    }), () => {
      C = !0;
    };
  }, [i]), y.useEffect(() => {
    R || N(_0(o));
  }, [o, R]);
  const z = (C) => {
    a({ ...t, mode: C });
  }, _ = (C) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: xf(C)
    }), S && E(null);
  }, I = () => {
    _(Jr(Zi));
  }, J = (C) => {
    const U = Math.max(0, Math.min(10, Number.isFinite(C) ? C : 1));
    a({ ...t, emotionAlpha: U });
  }, ne = async () => {
    const C = w.trim();
    if (C) {
      v(!0), p(null);
      try {
        const U = await SM(i, C, xf(o));
        if (!O.current) return;
        m(
          (B) => L0([U, ...B.filter((Q) => Q.presetId !== U.presetId)])
        ), E(U.presetId), T(!1);
      } catch (U) {
        O.current && p(Sf(U));
      } finally {
        O.current && v(!1);
      }
    }
  }, A = async (C) => {
    const U = h;
    m((B) => B.filter((Q) => Q.presetId !== C)), S === C && E(null);
    try {
      await wM(i, C);
    } catch (B) {
      O.current && (m(U), p(Sf(B)));
    }
  }, q = (C) => {
    E(C.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: C.vector
    });
  }, F = (C) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: C });
  }, ie = hA(o), re = mA(o), te = i1(o, 3), ce = te.length > 0 && w.trim().length > 0 && !b, W = _0(o) || "name your preset…", k = l !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: x2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: S2, children: [
      /* @__PURE__ */ c.jsx("span", { className: w0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: w2, role: "radiogroup", "aria-label": "Emotion mode", children: PA.map((C) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": l === C.id,
          className: `${E2}${l === C.id ? ` ${j2}` : ""}`,
          onClick: () => z(C.id),
          children: C.label
        },
        C.id
      )) })
    ] }),
    l === "none" && /* @__PURE__ */ c.jsxs("div", { className: R0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ c.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    l === "audio_ref" && /* @__PURE__ */ c.jsx("div", { className: R0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    l === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: k2, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: O2,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (C) => F(C.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: L2, children: [
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "secondary",
            onClick: () => {
              const C = (t.qwenTemplate ?? "").trim();
              if (!C) return;
              const U = XA(C);
              a({
                ...t,
                mode: "emotion_vector",
                vector: xf(U)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: C0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: C0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (l === "emotion_vector" || l === "none" || l === "audio_ref") && /* @__PURE__ */ c.jsxs("div", { className: D2, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${e0} ${N2}`, children: /* @__PURE__ */ c.jsx(
        bA,
        {
          vec: o,
          onChange: _,
          readOnly: k
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${e0} ${T2}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: C2, children: [
          /* @__PURE__ */ c.jsx("span", { className: w0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: R2, children: ie ? gl[ie].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: M2, children: [
            "‖v‖ = ",
            re.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(_A, { vec: o, onChange: _, readOnly: k }),
        /* @__PURE__ */ c.jsx("div", { className: _2, children: /* @__PURE__ */ c.jsxs(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: I,
            disabled: k || re < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: A2,
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
      /* @__PURE__ */ c.jsxs("div", { className: E0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: j0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: z2, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: d,
            className: N0,
            style: { "--fill": `${d * 10}%` },
            onChange: (C) => J(Number(C.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: T0, children: [
          (d * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${B2}${te.length === 0 ? ` ${$2}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: V2, children: [
              /* @__PURE__ */ c.jsx("span", { className: H2, children: "Save current as preset" }),
              te.length === 0 && /* @__PURE__ */ c.jsx("span", { className: q2, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: I2, children: [
              /* @__PURE__ */ c.jsx("div", { className: F2, children: te.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${M0} ${G2}`, children: "no axes set" }) : te.map((C) => /* @__PURE__ */ c.jsxs("span", { className: M0, children: [
                C.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: Y2, children: C.value.toFixed(2) })
              ] }, C.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: X2, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: P2,
                    placeholder: W,
                    value: w,
                    disabled: te.length === 0 || b,
                    onChange: (C) => {
                      N(C.target.value), T(!0);
                    },
                    onKeyDown: (C) => {
                      C.key === "Enter" && ce && ne();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  $e,
                  {
                    variant: "primary",
                    disabled: !ce,
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
        HA,
        {
          presets: h,
          activePresetId: S,
          onSelect: q,
          onDelete: A
        }
      )
    ] }),
    l === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: E0, children: [
      /* @__PURE__ */ c.jsx("span", { className: j0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: d,
          className: N0,
          style: { "--fill": `${d * 10}%` },
          onChange: (C) => J(Number(C.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: T0, children: [
        (d * 100).toFixed(0),
        "%"
      ] })
    ] }),
    g && /* @__PURE__ */ c.jsx("div", { className: U2, children: g })
  ] });
}
function QA(t) {
  if (!t || !Array.isArray(t)) return Jr(Zi);
  const a = { ...Zi };
  return Vt.forEach((i, l) => {
    const o = t[l];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function L0(t) {
  return [...t].sort((a, i) => i.updatedAt - a.updatedAt);
}
function Sf(t) {
  return t instanceof es || t instanceof Error ? t.message : "Unknown error";
}
var ZA = "_5u1uau0", Ws = "_5u1uau1", JA = "_5u1uau2", $i = "_5u1uau3", el = "_5u1uau4", WA = "_5u1uau5", wf = "_5u1uau6", e3 = "_5u1uau7", t3 = "_5u1uau8", n3 = "_5u1uau9", a3 = "_5u1uaua", r3 = "_5u1uaub", i3 = "_5u1uauc", s3 = "_5u1uaud", l3 = "_5u1uaue", U0 = "_5u1uauf", B0 = "_5u1uaug", o3 = "_5u1uauh";
const Ef = [
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
], c3 = ["mp3", "wav", "flac"], Zo = 0.5, jf = 2, u3 = 0.05, d3 = 0.8, f3 = 0.8, $0 = 42;
function Jo(t, a, i) {
  const l = t[a];
  if (typeof l == "number" && Number.isFinite(l)) return l;
  if (typeof l == "string") {
    const o = Number(l);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function h3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: l,
  cachePolicy: o,
  onCachePolicyChange: d,
  generation: h,
  onGenerationChange: m
}) {
  const g = y.useId(), p = y.useId(), b = y.useId(), v = y.useId(), S = y.useId(), E = (I, J) => {
    m({ ...h, [I]: J });
  }, w = h.seed === void 0 || h.seed === null ? "random" : "fixed", N = (I) => {
    if (I !== w)
      if (I === "random") {
        const J = { ...h };
        delete J.seed, m(J);
      } else {
        const J = Jo(h, "seed", $0);
        m({ ...h, seed: J });
      }
  }, R = Ef.find((I) => I.id === o) ?? Ef[0], T = (i - Zo) / (jf - Zo) * 100, O = Jo(h, "temperature", d3), z = Jo(h, "top_p", f3), _ = Jo(h, "seed", $0);
  return /* @__PURE__ */ c.jsxs("div", { className: ZA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: g, className: $i, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: el, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: g,
          className: WA,
          value: t,
          onChange: (I) => a(I.currentTarget.value),
          children: c3.map((I) => /* @__PURE__ */ c.jsx("option", { value: I, children: I }, I))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: $i, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${el} ${e3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: t3,
            min: Zo,
            max: jf,
            step: u3,
            value: i,
            style: { "--range-pct": `${T}%` },
            onChange: (I) => l(Number(I.currentTarget.value)),
            "aria-valuemin": Zo,
            "aria-valuemax": jf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: n3, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: JA, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: $i, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: a3, children: Ef.map((I) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === I.id,
          className: r3,
          onClick: () => d(I.id),
          title: I.help,
          children: I.label
        },
        I.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: i3, "aria-live": "polite", children: R.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: s3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: $i, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: el, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: wf,
          min: 0,
          max: 2,
          step: 0.05,
          value: O,
          onChange: (I) => E("temperature", Number(I.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: $i, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: el, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: wf,
          min: 0,
          max: 1,
          step: 0.05,
          value: z,
          onChange: (I) => E("top_p", Number(I.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("span", { className: $i, id: `${S}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${el} ${l3}`,
          role: "radiogroup",
          "aria-labelledby": `${S}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": w === "fixed",
                className: `${U0} ${w === "fixed" ? B0 : ""}`,
                onClick: () => N("fixed"),
                children: "Fixed"
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": w === "random",
                className: `${U0} ${w === "random" ? B0 : ""}`,
                onClick: () => N("random"),
                title: "A fresh seed is rolled for every run — output varies",
                children: "Random"
              }
            ),
            w === "fixed" ? /* @__PURE__ */ c.jsx(
              "input",
              {
                id: S,
                type: "number",
                className: wf,
                step: 1,
                value: _,
                onChange: (I) => E("seed", Math.trunc(Number(I.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: o3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var m3 = "iv43qk0", V0 = "iv43qk1", p3 = "iv43qk2", H0 = "iv43qk3", v3 = "iv43qk4", g3 = "iv43qk5", y3 = "iv43qk6", b3 = "iv43qk7", x3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, S3 = "iv43qkd", w3 = "iv43qke", Nf = "iv43qkf", Tf = "iv43qkg";
function E3({
  lines: t,
  characterColors: a,
  onLineClick: i
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: S3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const l = t.length, o = t.filter((h) => h.character !== null).length, d = l - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: w3, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Nf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Tf, children: l }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Nf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Tf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Nf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Tf, children: d }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: m3, children: t.map((h) => /* @__PURE__ */ c.jsx(
      j3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function j3({ line: t, color: a, onClick: i }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${V0} ${p3}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: H0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: y3, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: V0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: H0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: v3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: g3, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${b3} ${x3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var N3 = "_46z95i0", T3 = "_46z95i1", C3 = "_46z95i2", R3 = "_46z95i3", M3 = "_46z95i4", _3 = "_46z95i5", A3 = "_46z95i6";
const D3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function z3({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: N3, children: [
    /* @__PURE__ */ c.jsx(
      Cf,
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
      Cf,
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
      Cf,
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
function Cf({ label: t, sub: a, min: i, max: l, step: o, format: d, value: h, onChange: m }) {
  const g = (h - i) / (l - i) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: T3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: C3, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: R3, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: M3, children: a })
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
        className: _3,
        style: { "--fill": `${g}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: A3, children: d(h) })
  ] });
}
var k3 = "qe93dj0", O3 = "qe93dj1", L3 = "qe93dj2", U3 = "qe93dj3", B3 = "qe93dj4", $3 = "qe93dj5", V3 = "qe93dj6", H3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, q3 = "qe93dja", I3 = "qe93djb";
function F3({ checks: t }) {
  const a = t.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: k3, children: [
    /* @__PURE__ */ c.jsxs("header", { className: O3, children: [
      /* @__PURE__ */ c.jsx("span", { className: L3, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: U3, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: B3, children: t.map((i) => /* @__PURE__ */ c.jsxs("li", { className: $3, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${V3} ${H3[i.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: q3, children: i.label }),
      i.detail && /* @__PURE__ */ c.jsx("span", { className: I3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var q0 = "_17fbpt30", I0 = "_17fbpt31", F0 = "_17fbpt32", Y3 = "_17fbpt33", G3 = "_17fbpt34", X3 = "_17fbpt35", Y0 = "_17fbpt36", P3 = "_17fbpt37", K3 = "_17fbpt38";
const Q3 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function Z3({
  runs: t,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: l,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
    /* @__PURE__ */ c.jsx("header", { className: I0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: F0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (d) => {
          d.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: P3, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: K3, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: I0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: F0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (d) => {
            d.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: Y3, children: t.slice(0, 5).map((d) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: G3,
        onClick: l ? () => l(d.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: X3, children: d.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${Qx.sm} ${Zx[Q3[d.status] ?? "neutral"]}`, children: d.status }),
          /* @__PURE__ */ c.jsx("span", { className: Y0, children: J3(d.startedAt ?? d.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: Y0, children: d.kind })
        ]
      }
    ) }, d.runId)) })
  ] });
}
function J3(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
const s1 = y.createContext({});
function Fh(t) {
  const a = y.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const W3 = typeof window < "u", l1 = W3 ? y.useLayoutEffect : y.useEffect, $c = /* @__PURE__ */ y.createContext(null);
function eD(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function tD(t, a) {
  const i = t.indexOf(a);
  i > -1 && t.splice(i, 1);
}
const xr = (t, a, i) => i > a ? a : i < t ? t : i;
function G0(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Cl = () => {
}, Ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Cl = (t, a, i) => {
  !t && typeof console < "u" && console.warn(G0(a, i));
}, Ji = (t, a, i) => {
  if (!t)
    throw new Error(G0(a, i));
});
const Sr = {}, o1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function nD(t) {
  return typeof t == "object" && t !== null;
}
const c1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function u1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ts = /* @__NO_SIDE_EFFECTS__ */ (t) => t, aD = (t, a) => (i) => a(t(i)), Vc = (...t) => t.reduce(aD), d1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, i) => {
  const l = a - t;
  return l === 0 ? 1 : (i - t) / l;
};
class f1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return eD(this.subscriptions, a), () => tD(this.subscriptions, a);
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
function h1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const m1 = (t, a, i) => (((1 - 3 * i + 3 * a) * t + (3 * i - 6 * a)) * t + 3 * a) * t, rD = 1e-7, iD = 12;
function sD(t, a, i, l, o) {
  let d, h, m = 0;
  do
    h = a + (i - a) / 2, d = m1(h, l, o) - t, d > 0 ? i = h : a = h;
  while (Math.abs(d) > rD && ++m < iD);
  return h;
}
function Rl(t, a, i, l) {
  if (t === a && i === l)
    return ts;
  const o = (d) => sD(d, 0, 1, t, i);
  return (d) => d === 0 || d === 1 ? d : m1(o(d), a, l);
}
const p1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, v1 = (t) => (a) => 1 - t(1 - a), g1 = /* @__PURE__ */ Rl(0.33, 1.53, 0.69, 0.99), Yh = /* @__PURE__ */ v1(g1), y1 = /* @__PURE__ */ p1(Yh), b1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Yh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Gh = (t) => 1 - Math.sin(Math.acos(t)), lD = v1(Gh), x1 = p1(Gh), oD = /* @__PURE__ */ Rl(0.42, 0, 1, 1), cD = /* @__PURE__ */ Rl(0, 0, 0.58, 1), S1 = /* @__PURE__ */ Rl(0.42, 0, 0.58, 1), uD = (t) => Array.isArray(t) && typeof t[0] != "number", w1 = (t) => Array.isArray(t) && typeof t[0] == "number", X0 = {
  linear: ts,
  easeIn: oD,
  easeInOut: S1,
  easeOut: cD,
  circIn: Gh,
  circInOut: x1,
  circOut: lD,
  backIn: Yh,
  backInOut: y1,
  backOut: g1,
  anticipate: b1
}, dD = (t) => typeof t == "string", P0 = (t) => {
  if (w1(t)) {
    Ji(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, l, o] = t;
    return Rl(a, i, l, o);
  } else if (dD(t))
    return Ji(X0[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), X0[t];
  return t;
}, Wo = [
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
function fD(t, a) {
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
    schedule: (b, v = !1, S = !1) => {
      const w = S && o ? i : l;
      return v && h.add(b), w.add(b), b;
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
const hD = 40;
function E1(t, a) {
  let i = !1, l = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => i = !0, h = Wo.reduce((z, _) => (z[_] = fD(d), z), {}), { setup: m, read: g, resolveKeyframes: p, preUpdate: b, update: v, preRender: S, render: E, postRender: w } = h, N = () => {
    const z = Sr.useManualTiming, _ = z ? o.timestamp : performance.now();
    i = !1, z || (o.delta = l ? 1e3 / 60 : Math.max(Math.min(_ - o.timestamp, hD), 1)), o.timestamp = _, o.isProcessing = !0, m.process(o), g.process(o), p.process(o), b.process(o), v.process(o), S.process(o), E.process(o), w.process(o), o.isProcessing = !1, i && a && (l = !1, t(N));
  }, R = () => {
    i = !0, l = !0, o.isProcessing || t(N);
  };
  return { schedule: Wo.reduce((z, _) => {
    const I = h[_];
    return z[_] = (J, ne = !1, A = !1) => (i || R(), I.schedule(J, ne, A)), z;
  }, {}), cancel: (z) => {
    for (let _ = 0; _ < Wo.length; _++)
      h[Wo[_]].cancel(z);
  }, state: o, steps: h };
}
const { schedule: Pn, cancel: Wf, state: wc } = /* @__PURE__ */ E1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ts, !0);
let mc;
function mD() {
  mc = void 0;
}
const Dn = {
  now: () => (mc === void 0 && Dn.set(wc.isProcessing || Sr.useManualTiming ? wc.timestamp : performance.now()), mc),
  set: (t) => {
    mc = t, queueMicrotask(mD);
  }
}, j1 = (t) => (a) => typeof a == "string" && a.startsWith(t), N1 = /* @__PURE__ */ j1("--"), pD = /* @__PURE__ */ j1("var(--"), Xh = (t) => pD(t) ? vD.test(t.split("/*")[0].trim()) : !1, vD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function K0(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ns = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, yl = {
  ...ns,
  transform: (t) => xr(0, 1, t)
}, ec = {
  ...ns,
  default: 1
}, dl = (t) => Math.round(t * 1e5) / 1e5, Ph = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function gD(t) {
  return t == null;
}
const yD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Kh = (t, a) => (i) => !!(typeof i == "string" && yD.test(i) && i.startsWith(t) || a && !gD(i) && Object.prototype.hasOwnProperty.call(i, a)), T1 = (t, a, i) => (l) => {
  if (typeof l != "string")
    return l;
  const [o, d, h, m] = l.match(Ph);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(d),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, bD = (t) => xr(0, 255, t), Rf = {
  ...ns,
  transform: (t) => Math.round(bD(t))
}, Gr = {
  test: /* @__PURE__ */ Kh("rgb", "red"),
  parse: /* @__PURE__ */ T1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: i, alpha: l = 1 }) => "rgba(" + Rf.transform(t) + ", " + Rf.transform(a) + ", " + Rf.transform(i) + ", " + dl(yl.transform(l)) + ")"
};
function xD(t) {
  let a = "", i = "", l = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), i = t.substring(3, 5), l = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), i = t.substring(2, 3), l = t.substring(3, 4), o = t.substring(4, 5), a += a, i += i, l += l, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(l, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const eh = {
  test: /* @__PURE__ */ Kh("#"),
  parse: xD,
  transform: Gr.transform
}, Ml = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), pr = /* @__PURE__ */ Ml("deg"), Pi = /* @__PURE__ */ Ml("%"), we = /* @__PURE__ */ Ml("px"), SD = /* @__PURE__ */ Ml("vh"), wD = /* @__PURE__ */ Ml("vw"), Q0 = {
  ...Pi,
  parse: (t) => Pi.parse(t) / 100,
  transform: (t) => Pi.transform(t * 100)
}, Yi = {
  test: /* @__PURE__ */ Kh("hsl", "hue"),
  parse: /* @__PURE__ */ T1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: i, alpha: l = 1 }) => "hsla(" + Math.round(t) + ", " + Pi.transform(dl(a)) + ", " + Pi.transform(dl(i)) + ", " + dl(yl.transform(l)) + ")"
}, $t = {
  test: (t) => Gr.test(t) || eh.test(t) || Yi.test(t),
  parse: (t) => Gr.test(t) ? Gr.parse(t) : Yi.test(t) ? Yi.parse(t) : eh.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Gr.transform(t) : Yi.transform(t),
  getAnimatableNone: (t) => {
    const a = $t.parse(t);
    return a.alpha = 0, $t.transform(a);
  }
}, ED = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function jD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Ph)?.length || 0) + (t.match(ED)?.length || 0) > 0;
}
const C1 = "number", R1 = "color", ND = "var", TD = "var(", Z0 = "${}", CD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(t) {
  const a = t.toString(), i = [], l = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let d = 0;
  const m = a.replace(CD, (g) => ($t.test(g) ? (l.color.push(d), o.push(R1), i.push($t.parse(g))) : g.startsWith(TD) ? (l.var.push(d), o.push(ND), i.push(g)) : (l.number.push(d), o.push(C1), i.push(parseFloat(g))), ++d, Z0)).split(Z0);
  return { values: i, split: m, indexes: l, types: o };
}
function RD(t) {
  return Wi(t).values;
}
function M1({ split: t, types: a }) {
  const i = t.length;
  return (l) => {
    let o = "";
    for (let d = 0; d < i; d++)
      if (o += t[d], l[d] !== void 0) {
        const h = a[d];
        h === C1 ? o += dl(l[d]) : h === R1 ? o += $t.transform(l[d]) : o += l[d];
      }
    return o;
  };
}
function MD(t) {
  return M1(Wi(t));
}
const _D = (t) => typeof t == "number" ? 0 : $t.test(t) ? $t.getAnimatableNone(t) : t, AD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : _D(t);
function DD(t) {
  const a = Wi(t);
  return M1(a)(a.values.map((l, o) => AD(l, a.split[o])));
}
const ra = {
  test: jD,
  parse: RD,
  createTransformer: MD,
  getAnimatableNone: DD
};
function Mf(t, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (a - t) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? t + (a - t) * (2 / 3 - i) * 6 : t;
}
function zD({ hue: t, saturation: a, lightness: i, alpha: l }) {
  t /= 360, a /= 100, i /= 100;
  let o = 0, d = 0, h = 0;
  if (!a)
    o = d = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, g = 2 * i - m;
    o = Mf(g, m, t + 1 / 3), d = Mf(g, m, t), h = Mf(g, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(d * 255),
    blue: Math.round(h * 255),
    alpha: l
  };
}
function Ec(t, a) {
  return (i) => i > 0 ? a : t;
}
const _l = (t, a, i) => t + (a - t) * i, _f = (t, a, i) => {
  const l = t * t, o = i * (a * a - l) + l;
  return o < 0 ? 0 : Math.sqrt(o);
}, kD = [eh, Gr, Yi], OD = (t) => kD.find((a) => a.test(t));
function J0(t) {
  const a = OD(t);
  if (Cl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(t);
  return a === Yi && (i = zD(i)), i;
}
const W0 = (t, a) => {
  const i = J0(t), l = J0(a);
  if (!i || !l)
    return Ec(t, a);
  const o = { ...i };
  return (d) => (o.red = _f(i.red, l.red, d), o.green = _f(i.green, l.green, d), o.blue = _f(i.blue, l.blue, d), o.alpha = _l(i.alpha, l.alpha, d), Gr.transform(o));
}, th = /* @__PURE__ */ new Set(["none", "hidden"]);
function LD(t, a) {
  return th.has(t) ? (i) => i <= 0 ? t : a : (i) => i >= 1 ? a : t;
}
function UD(t, a) {
  return (i) => _l(t, a, i);
}
function Qh(t) {
  return typeof t == "number" ? UD : typeof t == "string" ? Xh(t) ? Ec : $t.test(t) ? W0 : VD : Array.isArray(t) ? _1 : typeof t == "object" ? $t.test(t) ? W0 : BD : Ec;
}
function _1(t, a) {
  const i = [...t], l = i.length, o = t.map((d, h) => Qh(d)(d, a[h]));
  return (d) => {
    for (let h = 0; h < l; h++)
      i[h] = o[h](d);
    return i;
  };
}
function BD(t, a) {
  const i = { ...t, ...a }, l = {};
  for (const o in i)
    t[o] !== void 0 && a[o] !== void 0 && (l[o] = Qh(t[o])(t[o], a[o]));
  return (o) => {
    for (const d in l)
      i[d] = l[d](o);
    return i;
  };
}
function $D(t, a) {
  const i = [], l = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const d = a.types[o], h = t.indexes[d][l[d]], m = t.values[h] ?? 0;
    i[o] = m, l[d]++;
  }
  return i;
}
const VD = (t, a) => {
  const i = ra.createTransformer(a), l = Wi(t), o = Wi(a);
  return l.indexes.var.length === o.indexes.var.length && l.indexes.color.length === o.indexes.color.length && l.indexes.number.length >= o.indexes.number.length ? th.has(t) && !o.values.length || th.has(a) && !l.values.length ? LD(t, a) : Vc(_1($D(l, o), o.values), i) : (Cl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ec(t, a));
};
function A1(t, a, i) {
  return typeof t == "number" && typeof a == "number" && typeof i == "number" ? _l(t, a, i) : Qh(t)(t, a);
}
const HD = (t) => {
  const a = ({ timestamp: i }) => t(i);
  return {
    start: (i = !0) => Pn.update(a, i),
    stop: () => Wf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => wc.isProcessing ? wc.timestamp : Dn.now()
  };
}, D1 = (t, a, i = 10) => {
  let l = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let d = 0; d < o; d++)
    l += Math.round(t(d / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, jc = 2e4;
function Zh(t) {
  let a = 0;
  const i = 50;
  let l = t.next(a);
  for (; !l.done && a < jc; )
    a += i, l = t.next(a);
  return a >= jc ? 1 / 0 : a;
}
function qD(t, a = 100, i) {
  const l = i({ ...t, keyframes: [0, a] }), o = Math.min(Zh(l), jc);
  return {
    type: "keyframes",
    ease: (d) => l.next(o * d).value / a,
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
function nh(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const ID = 12;
function FD(t, a, i) {
  let l = i;
  for (let o = 1; o < ID; o++)
    l = l - t(l) / a(l);
  return l;
}
const Af = 1e-3;
function YD({ duration: t = Et.duration, bounce: a = Et.bounce, velocity: i = Et.velocity, mass: l = Et.mass }) {
  let o, d;
  Cl(t <= /* @__PURE__ */ Xn(Et.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xr(Et.minDamping, Et.maxDamping, h), t = xr(Et.minDuration, Et.maxDuration, /* @__PURE__ */ aa(t)), h < 1 ? (o = (p) => {
    const b = p * h, v = b * t, S = b - i, E = nh(p, h), w = Math.exp(-v);
    return Af - S / E * w;
  }, d = (p) => {
    const v = p * h * t, S = v * i + i, E = Math.pow(h, 2) * Math.pow(p, 2) * t, w = Math.exp(-v), N = nh(Math.pow(p, 2), h);
    return (-o(p) + Af > 0 ? -1 : 1) * ((S - E) * w) / N;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - i) * t + 1;
    return -Af + b * v;
  }, d = (p) => {
    const b = Math.exp(-p * t), v = (i - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, g = FD(o, d, m);
  if (t = /* @__PURE__ */ Xn(t), isNaN(g))
    return {
      stiffness: Et.stiffness,
      damping: Et.damping,
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
const GD = ["duration", "bounce"], XD = ["stiffness", "damping", "mass"];
function eb(t, a) {
  return a.some((i) => t[i] !== void 0);
}
function PD(t) {
  let a = {
    velocity: Et.velocity,
    stiffness: Et.stiffness,
    damping: Et.damping,
    mass: Et.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!eb(t, XD) && eb(t, GD))
    if (a.velocity = 0, t.visualDuration) {
      const i = t.visualDuration, l = 2 * Math.PI / (i * 1.2), o = l * l, d = 2 * xr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Et.mass,
        stiffness: o,
        damping: d
      };
    } else {
      const i = YD({ ...t, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: Et.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Nc(t = Et.visualDuration, a = Et.bounce) {
  const i = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: l, restDelta: o } = i;
  const d = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: d }, { stiffness: g, damping: p, mass: b, duration: v, velocity: S, isResolvedFromDuration: E } = PD({
    ...i,
    velocity: -/* @__PURE__ */ aa(i.velocity || 0)
  }), w = S || 0, N = p / (2 * Math.sqrt(g * b)), R = h - d, T = /* @__PURE__ */ aa(Math.sqrt(g / b)), O = Math.abs(R) < 5;
  l || (l = O ? Et.restSpeed.granular : Et.restSpeed.default), o || (o = O ? Et.restDelta.granular : Et.restDelta.default);
  let z, _, I, J, ne, A;
  if (N < 1)
    I = nh(T, N), J = (w + N * T * R) / I, z = (F) => {
      const ie = Math.exp(-N * T * F);
      return h - ie * (J * Math.sin(I * F) + R * Math.cos(I * F));
    }, ne = N * T * J + R * I, A = N * T * R - J * I, _ = (F) => Math.exp(-N * T * F) * (ne * Math.sin(I * F) + A * Math.cos(I * F));
  else if (N === 1) {
    z = (ie) => h - Math.exp(-T * ie) * (R + (w + T * R) * ie);
    const F = w + T * R;
    _ = (ie) => Math.exp(-T * ie) * (T * F * ie - w);
  } else {
    const F = T * Math.sqrt(N * N - 1);
    z = (ce) => {
      const W = Math.exp(-N * T * ce), k = Math.min(F * ce, 300);
      return h - W * ((w + N * T * R) * Math.sinh(k) + F * R * Math.cosh(k)) / F;
    };
    const ie = (w + N * T * R) / F, re = N * T * ie - R * F, te = N * T * R - ie * F;
    _ = (ce) => {
      const W = Math.exp(-N * T * ce), k = Math.min(F * ce, 300);
      return W * (re * Math.sinh(k) + te * Math.cosh(k));
    };
  }
  const q = {
    calculatedDuration: E && v || null,
    velocity: (F) => /* @__PURE__ */ Xn(_(F)),
    next: (F) => {
      if (!E && N < 1) {
        const re = Math.exp(-N * T * F), te = Math.sin(I * F), ce = Math.cos(I * F), W = h - re * (J * te + R * ce), k = /* @__PURE__ */ Xn(re * (ne * te + A * ce));
        return m.done = Math.abs(k) <= l && Math.abs(h - W) <= o, m.value = m.done ? h : W, m;
      }
      const ie = z(F);
      if (E)
        m.done = F >= v;
      else {
        const re = /* @__PURE__ */ Xn(_(F));
        m.done = Math.abs(re) <= l && Math.abs(h - ie) <= o;
      }
      return m.value = m.done ? h : ie, m;
    },
    toString: () => {
      const F = Math.min(Zh(q), jc), ie = D1((re) => q.next(F * re).value, F, 30);
      return F + "ms " + ie;
    },
    toTransition: () => {
    }
  };
  return q;
}
Nc.applyToOptions = (t) => {
  const a = qD(t, 100, Nc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ Xn(a.duration), t.type = "keyframes", t;
};
const KD = 5;
function z1(t, a, i) {
  const l = Math.max(a - KD, 0);
  return h1(i - t(l), a - l);
}
function ah({ keyframes: t, velocity: a = 0, power: i = 0.8, timeConstant: l = 325, bounceDamping: o = 10, bounceStiffness: d = 500, modifyTarget: h, min: m, max: g, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], S = {
    done: !1,
    value: v
  }, E = (A) => m !== void 0 && A < m || g !== void 0 && A > g, w = (A) => m === void 0 ? g : g === void 0 || Math.abs(m - A) < Math.abs(g - A) ? m : g;
  let N = i * a;
  const R = v + N, T = h === void 0 ? R : h(R);
  T !== R && (N = T - v);
  const O = (A) => -N * Math.exp(-A / l), z = (A) => T + O(A), _ = (A) => {
    const q = O(A), F = z(A);
    S.done = Math.abs(q) <= p, S.value = S.done ? T : F;
  };
  let I, J;
  const ne = (A) => {
    E(S.value) && (I = A, J = Nc({
      keyframes: [S.value, w(S.value)],
      velocity: z1(z, A, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: d,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ne(0), {
    calculatedDuration: null,
    next: (A) => {
      let q = !1;
      return !J && I === void 0 && (q = !0, _(A), ne(A)), I !== void 0 && A >= I ? J.next(A - I) : (!q && _(A), S);
    }
  };
}
function QD(t, a, i) {
  const l = [], o = i || Sr.mix || A1, d = t.length - 1;
  for (let h = 0; h < d; h++) {
    let m = o(t[h], t[h + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[h] || ts : a;
      m = Vc(g, m);
    }
    l.push(m);
  }
  return l;
}
function ZD(t, a, { clamp: i = !0, ease: l, mixer: o } = {}) {
  const d = t.length;
  if (Ji(d === a.length, "Both input and output ranges must be the same length", "range-length"), d === 1)
    return () => a[0];
  if (d === 2 && a[0] === a[1])
    return () => a[1];
  const h = t[0] === t[1];
  t[0] > t[d - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = QD(a, l, o), g = m.length, p = (b) => {
    if (h && b < t[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ d1(t[v], t[v + 1], b);
    return m[v](S);
  };
  return i ? (b) => p(xr(t[0], t[d - 1], b)) : p;
}
function JD(t, a) {
  const i = t[t.length - 1];
  for (let l = 1; l <= a; l++) {
    const o = /* @__PURE__ */ d1(0, a, l);
    t.push(_l(i, 1, o));
  }
}
function WD(t) {
  const a = [0];
  return JD(a, t.length - 1), a;
}
function ez(t, a) {
  return t.map((i) => i * a);
}
function tz(t, a) {
  return t.map(() => a || S1).splice(0, t.length - 1);
}
function fl({ duration: t = 300, keyframes: a, times: i, ease: l = "easeInOut" }) {
  const o = uD(l) ? l.map(P0) : P0(l), d = {
    done: !1,
    value: a[0]
  }, h = ez(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : WD(a),
    t
  ), m = ZD(h, a, {
    ease: Array.isArray(o) ? o : tz(a, o)
  });
  return {
    calculatedDuration: t,
    next: (g) => (d.value = m(g), d.done = g >= t, d)
  };
}
const nz = (t) => t !== null;
function Hc(t, { repeat: a, repeatType: i = "loop" }, l, o = 1) {
  const d = t.filter(nz), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : d.length - 1;
  return !m || l === void 0 ? d[m] : l;
}
const az = {
  decay: ah,
  inertia: ah,
  tween: fl,
  keyframes: fl,
  spring: Nc
};
function k1(t) {
  typeof t.type == "string" && (t.type = az[t.type]);
}
class Jh {
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
const rz = (t) => t / 100;
class Tc extends Jh {
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
    k1(a);
    const { type: i = fl, repeat: l = 0, repeatDelay: o = 0, repeatType: d, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const g = i || fl;
    g !== fl && typeof m[0] != "number" && (this.mixKeyframes = Vc(rz, A1(m[0], m[1])), m = [0, 100]);
    const p = g({ ...a, keyframes: m });
    d === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Zh(p));
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
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: E, type: w, onUpdate: N, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), O = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, _ = l;
    if (v) {
      const A = Math.min(this.currentTime, o) / m;
      let q = Math.floor(A), F = A % 1;
      !F && A >= 1 && (F = 1), F === 1 && q--, q = Math.min(q, v + 1), !!(q % 2) && (S === "reverse" ? (F = 1 - F, E && (F -= E / m)) : S === "mirror" && (_ = h)), z = xr(0, 1, F) * m;
    }
    let I;
    O ? (this.delayState.value = b[0], I = this.delayState) : I = _.next(z), d && !O && (I.value = d(I.value));
    let { done: J } = I;
    !O && g !== null && (J = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ne = this.holdTime === null && (this.state === "finished" || this.state === "running" && J);
    return ne && w !== ah && (I.value = Hc(b, this.options, R, this.speed)), N && N(I.value), ne && this.finish(), I;
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
    return z1((l) => this.generator.next(l).value, a, i);
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
    const { driver: a = HD, startTime: i } = this.options;
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
function iz(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Xr = (t) => t * 180 / Math.PI, rh = (t) => {
  const a = Xr(Math.atan2(t[1], t[0]));
  return ih(a);
}, sz = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: rh,
  rotateZ: rh,
  skewX: (t) => Xr(Math.atan(t[1])),
  skewY: (t) => Xr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, ih = (t) => (t = t % 360, t < 0 && (t += 360), t), tb = rh, nb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), ab = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), lz = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: nb,
  scaleY: ab,
  scale: (t) => (nb(t) + ab(t)) / 2,
  rotateX: (t) => ih(Xr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => ih(Xr(Math.atan2(-t[2], t[0]))),
  rotateZ: tb,
  rotate: tb,
  skewX: (t) => Xr(Math.atan(t[4])),
  skewY: (t) => Xr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function sh(t) {
  return t.includes("scale") ? 1 : 0;
}
function lh(t, a) {
  if (!t || t === "none")
    return sh(a);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, o;
  if (i)
    l = lz, o = i;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = sz, o = m;
  }
  if (!o)
    return sh(a);
  const d = l[a], h = o[1].split(",").map(cz);
  return typeof d == "function" ? d(h) : h[d];
}
const oz = (t, a) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return lh(i, a);
};
function cz(t) {
  return parseFloat(t.trim());
}
const as = [
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
], rs = new Set(as), rb = (t) => t === ns || t === we, uz = /* @__PURE__ */ new Set(["x", "y", "z"]), dz = as.filter((t) => !uz.has(t));
function fz(t) {
  const a = [];
  return dz.forEach((i) => {
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
  x: (t, { transform: a }) => lh(a, "x"),
  y: (t, { transform: a }) => lh(a, "y")
};
br.translateX = br.x;
br.translateY = br.y;
const Kr = /* @__PURE__ */ new Set();
let oh = !1, ch = !1, uh = !1;
function O1() {
  if (ch) {
    const t = Array.from(Kr).filter((l) => l.needsMeasurement), a = new Set(t.map((l) => l.element)), i = /* @__PURE__ */ new Map();
    a.forEach((l) => {
      const o = fz(l);
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
  ch = !1, oh = !1, Kr.forEach((t) => t.complete(uh)), Kr.clear();
}
function L1() {
  Kr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (ch = !0);
  });
}
function hz() {
  uh = !0, L1(), O1(), uh = !1;
}
class Wh {
  constructor(a, i, l, o, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = l, this.motionValue = o, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Kr.add(this), oh || (oh = !0, Pn.read(L1), Pn.resolveKeyframes(O1))) : (this.readKeyframes(), this.complete());
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
    iz(a);
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
const mz = (t) => t.startsWith("--");
function U1(t, a, i) {
  mz(a) ? t.style.setProperty(a, i) : t.style[a] = i;
}
const pz = {};
function B1(t, a) {
  const i = /* @__PURE__ */ u1(t);
  return () => pz[a] ?? i();
}
const vz = /* @__PURE__ */ B1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), $1 = /* @__PURE__ */ B1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ol = ([t, a, i, l]) => `cubic-bezier(${t}, ${a}, ${i}, ${l})`, ib = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ol([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ol([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ol([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ol([0.33, 1.53, 0.69, 0.99])
};
function V1(t, a) {
  if (t)
    return typeof t == "function" ? $1() ? D1(t, a) : "ease-out" : w1(t) ? ol(t) : Array.isArray(t) ? t.map((i) => V1(i, a) || ib.easeOut) : ib[t];
}
function gz(t, a, i, { delay: l = 0, duration: o = 300, repeat: d = 0, repeatType: h = "loop", ease: m = "easeOut", times: g } = {}, p = void 0) {
  const b = {
    [a]: i
  };
  g && (b.offset = g);
  const v = V1(m, o);
  Array.isArray(v) && (b.easing = v);
  const S = {
    delay: l,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: d + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), t.animate(b, S);
}
function H1(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function yz({ type: t, ...a }) {
  return H1(t) && $1() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class q1 extends Jh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: l, keyframes: o, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: m, onComplete: g } = a;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = a, Ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = yz(a);
    this.animation = gz(i, l, o, p, d), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const b = Hc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), U1(i, l, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && vz() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), l && (this.animation.rangeEnd = l), ts) : o(this);
  }
}
const I1 = {
  anticipate: b1,
  backInOut: y1,
  circInOut: x1
};
function bz(t) {
  return t in I1;
}
function xz(t) {
  typeof t.ease == "string" && bz(t.ease) && (t.ease = I1[t.ease]);
}
const Df = 10;
class Sz extends q1 {
  constructor(a) {
    xz(a), k1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const m = new Tc({
      ...h,
      autoplay: !1
    }), g = Math.max(Df, Dn.now() - this.startTime), p = xr(0, Df, g - Df), b = m.sample(g).value, { name: v } = this.options;
    d && v && U1(d, v, b), i.setWithVelocity(m.sample(Math.max(0, g - p)).value, b, p), m.stop();
  }
}
const sb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ra.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function wz(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let i = 0; i < t.length; i++)
    if (t[i] !== a)
      return !0;
}
function Ez(t, a, i, l) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const d = t[t.length - 1], h = sb(o, a), m = sb(d, a);
  return Cl(h === m, `You are trying to animate ${a} from "${o}" to "${d}". "${h ? d : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : wz(t) || (i === "spring" || H1(i)) && l;
}
function dh(t) {
  t.duration = 0, t.type = "keyframes";
}
const F1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), jz = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Nz(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && jz.test(t[a]))
      return !0;
  return !1;
}
const Tz = /* @__PURE__ */ new Set([
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
]), Cz = /* @__PURE__ */ u1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Rz(t) {
  const { motionValue: a, name: i, repeatDelay: l, repeatType: o, damping: d, type: h, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return Cz() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (F1.has(i) || Tz.has(i) && Nz(m)) && (i !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !l && o !== "mirror" && d !== 0 && h !== "inertia";
}
const Mz = 40;
class _z extends Jh {
  constructor({ autoplay: a = !0, delay: i = 0, type: l = "keyframes", repeat: o = 0, repeatDelay: d = 0, repeatType: h = "loop", keyframes: m, name: g, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Dn.now();
    const S = {
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
    }, E = b?.KeyframeResolver || Wh;
    this.keyframeResolver = new E(m, (w, N, R) => this.onKeyframesResolved(w, N, S, !R), g, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, l, o) {
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: m, delay: g, isHandoff: p, onUpdate: b } = l;
    this.resolvedAt = Dn.now();
    let v = !0;
    Ez(a, d, h, m) || (v = !1, (Sr.instantAnimations || !g) && b?.(Hc(a, l, i)), a[0] = a[a.length - 1], dh(l), l.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > Mz ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...l,
      keyframes: a
    }, w = v && !p && Rz(E), N = E.motionValue?.owner?.current;
    let R;
    if (w)
      try {
        R = new Sz({
          ...E,
          element: N
        });
      } catch {
        R = new Tc(E);
      }
    else
      R = new Tc(E);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(ts), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), hz()), this._animation;
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
function Y1(t, a, i, l = 0, o = 1) {
  const d = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), h = t.size, m = (h - 1) * l;
  return typeof i == "function" ? i(d, h) : o === 1 ? d * l : m - d * l;
}
const Az = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Dz(t) {
  const a = Az.exec(t);
  if (!a)
    return [,];
  const [, i, l, o] = a;
  return [`--${i ?? l}`, o];
}
const zz = 4;
function G1(t, a, i = 1) {
  Ji(i <= zz, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [l, o] = Dz(t);
  if (!l)
    return;
  const d = window.getComputedStyle(a).getPropertyValue(l);
  if (d) {
    const h = d.trim();
    return o1(h) ? parseFloat(h) : h;
  }
  return Xh(o) ? G1(o, a, i + 1) : o;
}
const kz = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Oz = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Lz = {
  type: "keyframes",
  duration: 0.8
}, Uz = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Bz = (t, { keyframes: a }) => a.length > 2 ? Lz : rs.has(t) ? t.startsWith("scale") ? Oz(a[1]) : kz : Uz;
function X1(t, a) {
  if (t?.inherit && a) {
    const { inherit: i, ...l } = t;
    return { ...a, ...l };
  }
  return t;
}
function P1(t, a) {
  const i = t?.[a] ?? t?.default ?? t;
  return i !== t ? X1(i, t) : i;
}
const $z = /* @__PURE__ */ new Set([
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
function Vz(t) {
  for (const a in t)
    if (!$z.has(a))
      return !0;
  return !1;
}
const Hz = (t, a, i, l = {}, o, d) => (h) => {
  const m = P1(l, t) || {}, g = m.delay || l.delay || 0;
  let { elapsed: p = 0 } = l;
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
    name: t,
    motionValue: a,
    element: d ? void 0 : o
  };
  Vz(m) || Object.assign(b, Bz(t, b)), b.duration && (b.duration = /* @__PURE__ */ Xn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Xn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (dh(b), b.delay === 0 && (v = !0)), (Sr.instantAnimations || Sr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, dh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !d && a.get() !== void 0) {
    const S = Hc(b.keyframes, m);
    if (S !== void 0) {
      Pn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Tc(b) : new _z(b);
};
function lb(t) {
  const a = [{}, {}];
  return t?.values.forEach((i, l) => {
    a[0][l] = i.get(), a[1][l] = i.getVelocity();
  }), a;
}
function em(t, a, i, l) {
  if (typeof a == "function") {
    const [o, d] = lb(l);
    a = a(i !== void 0 ? i : t.custom, o, d);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, d] = lb(l);
    a = a(i !== void 0 ? i : t.custom, o, d);
  }
  return a;
}
function Qr(t, a, i) {
  const l = t.getProps();
  return em(l, a, i !== void 0 ? i : l.custom, t);
}
const K1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...as
]), ob = 30, qz = (t) => !isNaN(parseFloat(t));
class Iz {
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
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = qz(this.current));
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
    this.events[a] || (this.events[a] = new f1());
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > ob)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, ob);
    return h1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function Cc(t, a) {
  return new Iz(t, a);
}
const fh = (t) => Array.isArray(t);
function Fz(t, a, i) {
  t.hasValue(a) ? t.getValue(a).set(i) : t.addValue(a, Cc(i));
}
function Yz(t) {
  return fh(t) ? t[t.length - 1] || 0 : t;
}
function Gz(t, a) {
  const i = Qr(t, a);
  let { transitionEnd: l = {}, transition: o = {}, ...d } = i || {};
  d = { ...d, ...l };
  for (const h in d) {
    const m = Yz(d[h]);
    Fz(t, h, m);
  }
}
const un = (t) => !!(t && t.getVelocity);
function Xz(t) {
  return !!(un(t) && t.add);
}
function Pz(t, a) {
  const i = t.getValue("willChange");
  if (Xz(i))
    return i.add(a);
  if (!i && Sr.WillChange) {
    const l = new Sr.WillChange("auto");
    t.addValue("willChange", l), l.add(a);
  }
}
function tm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const Kz = "framerAppearId", Q1 = "data-" + tm(Kz);
function Qz(t) {
  return t.props[Q1];
}
function Zz({ protectedKeys: t, needsAnimating: a }, i) {
  const l = t.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, l;
}
function Z1(t, a, { delay: i = 0, transitionOverride: l, type: o } = {}) {
  let { transition: d, transitionEnd: h, ...m } = a;
  const g = t.getDefaultTransition();
  d = d ? X1(d, g) : g;
  const p = d?.reduceMotion;
  l && (d = l);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const S in m) {
    const E = t.getValue(S, t.latestValues[S] ?? null), w = m[S];
    if (w === void 0 || v && Zz(v, S))
      continue;
    const N = {
      delay: i,
      ...P1(d || {}, S)
    }, R = E.get();
    if (R !== void 0 && !E.isAnimating() && !Array.isArray(w) && w === R && !N.velocity) {
      Pn.update(() => E.set(w));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const _ = Qz(t);
      if (_) {
        const I = window.MotionHandoffAnimation(_, S, Pn);
        I !== null && (N.startTime = I, T = !0);
      }
    }
    Pz(t, S);
    const O = p ?? t.shouldReduceMotion;
    E.start(Hz(S, E, w, O && K1.has(S) ? { type: !1 } : N, t, T));
    const z = E.animation;
    z && b.push(z);
  }
  if (h) {
    const S = () => Pn.update(() => {
      h && Gz(t, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function hh(t, a, i = {}) {
  const l = Qr(t, a, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = l || {};
  i.transitionOverride && (o = i.transitionOverride);
  const d = l ? () => Promise.all(Z1(t, l, i)) : () => Promise.resolve(), h = t.variantChildren && t.variantChildren.size ? (g = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return Jz(t, a, g, p, b, v, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [g, p] = m === "beforeChildren" ? [d, h] : [h, d];
    return g().then(() => p());
  } else
    return Promise.all([d(), h(i.delay)]);
}
function Jz(t, a, i = 0, l = 0, o = 0, d = 1, h) {
  const m = [];
  for (const g of t.variantChildren)
    g.notify("AnimationStart", a), m.push(hh(g, a, {
      ...h,
      delay: i + (typeof l == "function" ? 0 : l) + Y1(t.variantChildren, g, l, o, d)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function Wz(t, a, i = {}) {
  t.notify("AnimationStart", a);
  let l;
  if (Array.isArray(a)) {
    const o = a.map((d) => hh(t, d, i));
    l = Promise.all(o);
  } else if (typeof a == "string")
    l = hh(t, a, i);
  else {
    const o = typeof a == "function" ? Qr(t, a, i.custom) : a;
    l = Promise.all(Z1(t, o, i));
  }
  return l.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const e5 = {
  test: (t) => t === "auto",
  parse: (t) => t
}, J1 = (t) => (a) => a.test(t), W1 = [ns, we, Pi, pr, wD, SD, e5], cb = (t) => W1.find(J1(t));
function t5(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || c1(t) : !0;
}
const n5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function a5(t) {
  const [a, i] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [l] = i.match(Ph) || [];
  if (!l)
    return t;
  const o = i.replace(l, "");
  let d = n5.has(a) ? 1 : 0;
  return l !== i && (d *= 100), a + "(" + d + o + ")";
}
const r5 = /\b([a-z-]*)\(.*?\)/gu, mh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = t.match(r5);
    return a ? a.map(a5).join(" ") : t;
  }
}, ph = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = ra.parse(t);
    return ra.createTransformer(t)(a.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, ub = {
  ...ns,
  transform: Math.round
}, i5 = {
  rotate: pr,
  rotateX: pr,
  rotateY: pr,
  rotateZ: pr,
  scale: ec,
  scaleX: ec,
  scaleY: ec,
  scaleZ: ec,
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
  originX: Q0,
  originY: Q0,
  originZ: we
}, nm = {
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
  ...i5,
  zIndex: ub,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: ub
}, s5 = {
  ...nm,
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
  filter: mh,
  WebkitFilter: mh,
  mask: ph,
  WebkitMask: ph
}, eS = (t) => s5[t], l5 = /* @__PURE__ */ new Set([mh, ph]);
function tS(t, a) {
  let i = eS(t);
  return l5.has(i) || (i = ra), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const o5 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function c5(t, a, i) {
  let l = 0, o;
  for (; l < t.length && !o; ) {
    const d = t[l];
    typeof d == "string" && !o5.has(d) && Wi(d).values.length && (o = t[l]), l++;
  }
  if (o && i)
    for (const d of a)
      t[d] = tS(i, o);
}
class u5 extends Wh {
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
      if (typeof v == "string" && (v = v.trim(), Xh(v))) {
        const S = G1(v, i.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !K1.has(l) || a.length !== 2)
      return;
    const [o, d] = a, h = cb(o), m = cb(d), g = K0(o), p = K0(d);
    if (g !== p && br[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (rb(h) && rb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else br[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, l = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || t5(a[o])) && l.push(o);
    l.length && c5(a, l, i);
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
function d5(t, a, i) {
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
const nS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function pc(t) {
  return nD(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: f5 } = /* @__PURE__ */ E1(queueMicrotask, !1), h5 = {
  y: !1
};
function m5() {
  return h5.y;
}
function aS(t, a) {
  const i = d5(t), l = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: l.signal
  };
  return [i, o, () => l.abort()];
}
function p5(t) {
  return !(t.pointerType === "touch" || m5());
}
function v5(t, a, i = {}) {
  const [l, o, d] = aS(t, i);
  return l.forEach((h) => {
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
    }, N = (R) => {
      if (!p5(R))
        return;
      g = !1;
      const T = a(h, R);
      typeof T == "function" && (p = T, h.addEventListener("pointerleave", w, o));
    };
    h.addEventListener("pointerenter", N, o), h.addEventListener("pointerdown", E, o);
  }), d;
}
const rS = (t, a) => a ? t === a ? !0 : rS(t, a.parentElement) : !1, g5 = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, y5 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function b5(t) {
  return y5.has(t.tagName) || t.isContentEditable === !0;
}
const vc = /* @__PURE__ */ new WeakSet();
function db(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function zf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const x5 = (t, a) => {
  const i = t.currentTarget;
  if (!i)
    return;
  const l = db(() => {
    if (vc.has(i))
      return;
    zf(i, "down");
    const o = db(() => {
      zf(i, "up");
    }), d = () => zf(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", d, a);
  });
  i.addEventListener("keydown", l, a), i.addEventListener("blur", () => i.removeEventListener("keydown", l), a);
};
function fb(t) {
  return g5(t) && !0;
}
const hb = /* @__PURE__ */ new WeakSet();
function S5(t, a, i = {}) {
  const [l, o, d] = aS(t, i), h = (m) => {
    const g = m.currentTarget;
    if (!fb(m) || hb.has(m))
      return;
    vc.add(g), i.stopPropagation && hb.add(m);
    const p = a(g, m), b = (E, w) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), vc.has(g) && vc.delete(g), fb(E) && typeof p == "function" && p(E, { success: w });
    }, v = (E) => {
      b(E, g === window || g === document || i.useGlobalTarget || rS(g, E.target));
    }, S = (E) => {
      b(E, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return l.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), pc(m) && (m.addEventListener("focus", (p) => x5(p, o)), !b5(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), d;
}
const w5 = [...W1, $t, ra], E5 = (t) => w5.find(J1(t)), mb = () => ({ min: 0, max: 0 }), iS = () => ({
  x: mb(),
  y: mb()
}), j5 = /* @__PURE__ */ new WeakMap();
function qc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const am = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], rm = ["initial", ...am];
function Ic(t) {
  return qc(t.animate) || rm.some((a) => bl(t[a]));
}
function sS(t) {
  return !!(Ic(t) || t.variants);
}
function N5(t, a, i) {
  for (const l in a) {
    const o = a[l], d = i[l];
    if (un(o))
      t.addValue(l, o);
    else if (un(d))
      t.addValue(l, Cc(o, { owner: t }));
    else if (d !== o)
      if (t.hasValue(l)) {
        const h = t.getValue(l);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = t.getStaticValue(l);
        t.addValue(l, Cc(h !== void 0 ? h : o, { owner: t }));
      }
  }
  for (const l in i)
    a[l] === void 0 && t.removeValue(l);
  return a;
}
const Rc = { current: null }, im = { current: !1 }, T5 = typeof window < "u";
function lS() {
  if (im.current = !0, !!T5)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Rc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Rc.current = !1;
}
const pb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Mc = {};
function oS(t) {
  Mc = t;
}
function C5() {
  return Mc;
}
class R5 {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Wh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = Dn.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Pn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = i, this.presenceContext = l, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = d, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = Ic(i), this.isVariantNode = sS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
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
    this.current = a, j5.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, l) => this.bindToMotionValue(l, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (im.current || lS(), this.shouldReduceMotion = Rc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Wf(this.notifyUpdate), Wf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && F1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: g, ease: p, duration: b } = i.accelerate, v = new q1({
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
    const l = rs.has(a);
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
    for (a in Mc) {
      const i = Mc[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : iS();
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
    for (let l = 0; l < pb.length; l++) {
      const o = pb[l];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const d = "on" + o, h = a[d];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = N5(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return l === void 0 && i !== void 0 && (l = Cc(i === null ? void 0 : i, { owner: this }), this.addValue(a, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let l = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return l != null && (typeof l == "string" && (o1(l) || c1(l)) ? l = parseFloat(l) : !E5(l) && ra.test(i) && (l = tS(a, i)), this.setBaseTarget(a, un(l) ? l.get() : l)), un(l) ? l.get() : l;
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
      const d = em(this.props, i, this.presenceContext?.custom);
      d && (l = d[a]);
    }
    if (i && l !== void 0)
      return l;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !un(o) ? o : this.initialValues[a] !== void 0 && l === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new f1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    f5.render(this.render);
  }
}
class cS extends R5 {
  constructor() {
    super(...arguments), this.KeyframeResolver = u5;
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
class is {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function M5({ top: t, left: a, right: i, bottom: l }) {
  return {
    x: { min: a, max: i },
    y: { min: t, max: l }
  };
}
function _5(t, a) {
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
function A5(t, a) {
  return M5(_5(t.getBoundingClientRect(), a));
}
const D5 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, z5 = as.length;
function k5(t, a, i) {
  let l = "", o = !0;
  for (let d = 0; d < z5; d++) {
    const h = as[d], m = t[h];
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
      const p = nS(m, nm[h]);
      if (!g) {
        o = !1;
        const b = D5[h] || h;
        l += `${b}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return l = l.trim(), i ? l = i(a, o ? "" : l) : o && (l = "none"), l;
}
function sm(t, a, i) {
  const { style: l, vars: o, transformOrigin: d } = t;
  let h = !1, m = !1;
  for (const g in a) {
    const p = a[g];
    if (rs.has(g)) {
      h = !0;
      continue;
    } else if (N1(g)) {
      o[g] = p;
      continue;
    } else {
      const b = nS(p, nm[g]);
      g.startsWith("origin") ? (m = !0, d[g] = b) : l[g] = b;
    }
  }
  if (a.transform || (h || i ? l.transform = k5(a, t.transform, i) : l.transform && (l.transform = "none")), m) {
    const { originX: g = "50%", originY: p = "50%", originZ: b = 0 } = d;
    l.transformOrigin = `${g} ${p} ${b}`;
  }
}
function uS(t, { style: a, vars: i }, l, o) {
  const d = t.style;
  let h;
  for (h in a)
    d[h] = a[h];
  o?.applyProjectionStyles(d, l);
  for (h in i)
    d.setProperty(h, i[h]);
}
function vb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const tl = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (we.test(t))
        t = parseFloat(t);
      else
        return t;
    const i = vb(t, a.target.x), l = vb(t, a.target.y);
    return `${i}% ${l}%`;
  }
}, O5 = {
  correct: (t, { treeScale: a, projectionDelta: i }) => {
    const l = t, o = ra.parse(t);
    if (o.length > 5)
      return l;
    const d = ra.createTransformer(t), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, g = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= g;
    const p = _l(m, g, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), d(o);
  }
}, L5 = {
  borderRadius: {
    ...tl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: tl,
  borderTopRightRadius: tl,
  borderBottomLeftRadius: tl,
  borderBottomRightRadius: tl,
  boxShadow: O5
};
function dS(t, { layout: a, layoutId: i }) {
  return rs.has(t) || t.startsWith("origin") || (a || i !== void 0) && (!!L5[t] || t === "opacity");
}
function lm(t, a, i) {
  const l = t.style, o = a?.style, d = {};
  if (!l)
    return d;
  for (const h in l)
    (un(l[h]) || o && un(o[h]) || dS(h, t) || i?.getValue(h)?.liveStyle !== void 0) && (d[h] = l[h]);
  return d;
}
function U5(t) {
  return window.getComputedStyle(t);
}
class B5 extends cS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = uS;
  }
  readValueFromInstance(a, i) {
    if (rs.has(i))
      return this.projection?.isProjecting ? sh(i) : oz(a, i);
    {
      const l = U5(a), o = (N1(i) ? l.getPropertyValue(i) : l[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return A5(a, i);
  }
  build(a, i, l) {
    sm(a, i, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return lm(a, i, l);
  }
}
const $5 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, V5 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function H5(t, a, i = 1, l = 0, o = !0) {
  t.pathLength = 1;
  const d = o ? $5 : V5;
  t[d.offset] = `${-l}`, t[d.array] = `${a} ${i}`;
}
const q5 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function fS(t, {
  attrX: a,
  attrY: i,
  attrScale: l,
  pathLength: o,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, g, p, b) {
  if (sm(t, m, p), g) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: S } = t;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const E of q5)
    v[E] !== void 0 && (S[E] = v[E], delete v[E]);
  a !== void 0 && (v.x = a), i !== void 0 && (v.y = i), l !== void 0 && (v.scale = l), o !== void 0 && H5(v, o, d, h, !1);
}
const hS = /* @__PURE__ */ new Set([
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
]), mS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function I5(t, a, i, l) {
  uS(t, a, void 0, l);
  for (const o in a.attrs)
    t.setAttribute(hS.has(o) ? o : tm(o), a.attrs[o]);
}
function pS(t, a, i) {
  const l = lm(t, a, i);
  for (const o in t)
    if (un(t[o]) || un(a[o])) {
      const d = as.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      l[d] = t[o];
    }
  return l;
}
class F5 extends cS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = iS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (rs.has(i)) {
      const l = eS(i);
      return l && l.default || 0;
    }
    return i = hS.has(i) ? i : tm(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return pS(a, i, l);
  }
  build(a, i, l) {
    fS(a, i, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(a, i, l, o) {
    I5(a, i, l, o);
  }
  mount(a) {
    this.isSVGTag = mS(a.tagName), super.mount(a);
  }
}
const Y5 = rm.length;
function vS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const i = t.parent ? vS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (i.initial = t.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < Y5; i++) {
    const l = rm[i], o = t.props[l];
    (bl(o) || o === !1) && (a[l] = o);
  }
  return a;
}
function gS(t, a) {
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
const G5 = [...am].reverse(), X5 = am.length;
function P5(t) {
  return (a) => Promise.all(a.map(({ animation: i, options: l }) => Wz(t, i, l)));
}
function K5(t) {
  let a = P5(t), i = gb(), l = !0, o = !1;
  const d = (p) => (b, v) => {
    const S = Qr(t, v, p === "exit" ? t.presenceContext?.custom : void 0);
    if (S) {
      const { transition: E, transitionEnd: w, ...N } = S;
      b = { ...b, ...N, ...w };
    }
    return b;
  };
  function h(p) {
    a = p(t);
  }
  function m(p) {
    const { props: b } = t, v = vS(t.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let w = {}, N = 1 / 0;
    for (let T = 0; T < X5; T++) {
      const O = G5[T], z = i[O], _ = b[O] !== void 0 ? b[O] : v[O], I = bl(_), J = O === p ? z.isActive : null;
      J === !1 && (N = T);
      let ne = _ === v[O] && _ !== b[O] && I;
      if (ne && (l || o) && t.manuallyAnimateOnMount && (ne = !1), z.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && J === null || // If we didn't and don't have any defined prop for this animation type
      !_ && !z.prevProp || // Or if the prop doesn't define an animation
      qc(_) || typeof _ == "boolean")
        continue;
      if (O === "exit" && z.isActive && J !== !0) {
        z.prevResolvedValues && (w = {
          ...w,
          ...z.prevResolvedValues
        });
        continue;
      }
      const A = Q5(z.prevProp, _);
      let q = A || // If we're making this variant active, we want to always make it active
      O === p && z.isActive && !ne && I || // If we removed a higher-priority variant (i is in reverse order)
      T > N && I, F = !1;
      const ie = Array.isArray(_) ? _ : [_];
      let re = ie.reduce(d(O), {});
      J === !1 && (re = {});
      const { prevResolvedValues: te = {} } = z, ce = {
        ...te,
        ...re
      }, W = (U) => {
        q = !0, E.has(U) && (F = !0, E.delete(U)), z.needsAnimating[U] = !0;
        const B = t.getValue(U);
        B && (B.liveStyle = !1);
      };
      for (const U in ce) {
        const B = re[U], Q = te[U];
        if (w.hasOwnProperty(U))
          continue;
        let M = !1;
        fh(B) && fh(Q) ? M = !gS(B, Q) : M = B !== Q, M ? B != null ? W(U) : E.add(U) : B !== void 0 && E.has(U) ? W(U) : z.protectedKeys[U] = !0;
      }
      z.prevProp = _, z.prevResolvedValues = re, z.isActive && (w = { ...w, ...re }), (l || o) && t.blockInitialAnimation && (q = !1);
      const k = ne && A;
      q && (!k || F) && S.push(...ie.map((U) => {
        const B = { type: O };
        if (typeof U == "string" && (l || o) && !k && t.manuallyAnimateOnMount && t.parent) {
          const { parent: Q } = t, M = Qr(Q, U);
          if (Q.enteringChildren && M) {
            const { delayChildren: Z } = M.transition || {};
            B.delay = Y1(Q.enteringChildren, t, Z);
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
      if (typeof b.initial != "boolean") {
        const O = Qr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        O && O.transition && (T.transition = O.transition);
      }
      E.forEach((O) => {
        const z = t.getBaseTarget(O), _ = t.getValue(O);
        _ && (_.liveStyle = !0), T[O] = z ?? null;
      }), S.push({ animation: T });
    }
    let R = !!S.length;
    return l && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (R = !1), l = !1, o = !1, R ? a(S) : Promise.resolve();
  }
  function g(p, b) {
    if (i[p].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((S) => S.animationState?.setActive(p, b)), i[p].isActive = b;
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
      i = gb(), o = !0;
    }
  };
}
function Q5(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !gS(a, t) : !1;
}
function Ir(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function gb() {
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
function yb(t, a, i, l = { passive: !0 }) {
  return t.addEventListener(a, i, l), () => t.removeEventListener(a, i);
}
function Z5(t) {
  return un(t) ? t.get() : t;
}
const om = y.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function bb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function J5(...t) {
  return (a) => {
    let i = !1;
    const l = t.map((o) => {
      const d = bb(o, a);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let o = 0; o < l.length; o++) {
          const d = l[o];
          typeof d == "function" ? d() : bb(t[o], null);
        }
      };
  };
}
function W5(...t) {
  return y.useCallback(J5(...t), t);
}
class e4 extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (pc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = i.offsetParent, o = pc(l) && l.offsetWidth || 0, d = pc(l) && l.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
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
function t4({ children: t, isPresent: a, anchorX: i, anchorY: l, root: o, pop: d }) {
  const h = y.useId(), m = y.useRef(null), g = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(om), b = t.props?.ref ?? t?.ref, v = W5(m, b);
  return y.useInsertionEffect(() => {
    const { width: S, height: E, top: w, left: N, right: R, bottom: T } = g.current;
    if (a || d === !1 || !m.current || !S || !E)
      return;
    const O = i === "left" ? `left: ${N}` : `right: ${R}`, z = l === "bottom" ? `bottom: ${T}` : `top: ${w}`;
    m.current.dataset.motionPopId = h;
    const _ = document.createElement("style");
    p && (_.nonce = p);
    const I = o ?? document.head;
    return I.appendChild(_), _.sheet && _.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${O}px !important;
            ${z}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), I.contains(_) && I.removeChild(_);
    };
  }, [a]), c.jsx(e4, { isPresent: a, childRef: m, sizeRef: g, pop: d, children: d === !1 ? t : y.cloneElement(t, { ref: v }) });
}
const n4 = ({ children: t, initial: a, isPresent: i, onExitComplete: l, custom: o, presenceAffectsLayout: d, mode: h, anchorX: m, anchorY: g, root: p }) => {
  const b = Fh(a4), v = y.useId();
  let S = !0, E = y.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (w) => {
      b.set(w, !0);
      for (const N of b.values())
        if (!N)
          return;
      l && l();
    },
    register: (w) => (b.set(w, !1), () => b.delete(w))
  }), [i, b, l]);
  return d && S && (E = { ...E }), y.useMemo(() => {
    b.forEach((w, N) => b.set(N, !1));
  }, [i]), y.useEffect(() => {
    !i && !b.size && l && l();
  }, [i]), t = c.jsx(t4, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: g, root: p, children: t }), c.jsx($c.Provider, { value: E, children: t });
};
function a4() {
  return /* @__PURE__ */ new Map();
}
function r4(t = !0) {
  const a = y.useContext($c);
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
const tc = (t) => t.key || "";
function xb(t) {
  const a = [];
  return y.Children.forEach(t, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const yS = ({ children: t, custom: a, initial: i = !0, onExitComplete: l, presenceAffectsLayout: o = !0, mode: d = "sync", propagate: h = !1, anchorX: m = "left", anchorY: g = "top", root: p }) => {
  const [b, v] = r4(h), S = y.useMemo(() => xb(t), [t]), E = h && !b ? [] : S.map(tc), w = y.useRef(!0), N = y.useRef(S), R = Fh(() => /* @__PURE__ */ new Map()), T = y.useRef(/* @__PURE__ */ new Set()), [O, z] = y.useState(S), [_, I] = y.useState(S);
  l1(() => {
    w.current = !1, N.current = S;
    for (let A = 0; A < _.length; A++) {
      const q = tc(_[A]);
      E.includes(q) ? (R.delete(q), T.current.delete(q)) : R.get(q) !== !0 && R.set(q, !1);
    }
  }, [_, E.length, E.join("-")]);
  const J = [];
  if (S !== O) {
    let A = [...S];
    for (let q = 0; q < _.length; q++) {
      const F = _[q], ie = tc(F);
      E.includes(ie) || (A.splice(q, 0, F), J.push(F));
    }
    return d === "wait" && J.length && (A = J), I(xb(A)), z(S), null;
  }
  const { forceRender: ne } = y.useContext(s1);
  return c.jsx(c.Fragment, { children: _.map((A) => {
    const q = tc(A), F = h && !b ? !1 : S === _ || E.includes(q), ie = () => {
      if (T.current.has(q))
        return;
      if (R.has(q))
        T.current.add(q), R.set(q, !0);
      else
        return;
      let re = !0;
      R.forEach((te) => {
        te || (re = !1);
      }), re && (ne?.(), I(N.current), h && v?.(), l && l());
    };
    return c.jsx(n4, { isPresent: F, initial: !w.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: d, root: p, onExitComplete: F ? void 0 : ie, anchorX: m, anchorY: g, children: A }, q);
  }) });
}, cm = y.createContext({ strict: !1 }), Sb = {
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
let wb = !1;
function i4() {
  if (wb)
    return;
  const t = {};
  for (const a in Sb)
    t[a] = {
      isEnabled: (i) => Sb[a].some((l) => !!i[l])
    };
  oS(t), wb = !0;
}
function bS() {
  return i4(), C5();
}
function vh(t) {
  const a = bS();
  for (const i in t)
    a[i] = {
      ...a[i],
      ...t[i]
    };
  oS(a);
}
function um({ children: t, features: a, strict: i = !1 }) {
  const [, l] = y.useState(!kf(a)), o = y.useRef(void 0);
  if (!kf(a)) {
    const { renderer: d, ...h } = a;
    o.current = d, vh(h);
  }
  return y.useEffect(() => {
    kf(a) && a().then(({ renderer: d, ...h }) => {
      vh(h), o.current = d, l(!0);
    });
  }, []), c.jsx(cm.Provider, { value: { renderer: o.current, strict: i }, children: t });
}
function kf(t) {
  return typeof t == "function";
}
const s4 = /* @__PURE__ */ new Set([
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
function _c(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || s4.has(t);
}
let xS = (t) => !_c(t);
function l4(t) {
  typeof t == "function" && (xS = (a) => a.startsWith("on") ? !_c(a) : t(a));
}
try {
  l4(require("@emotion/is-prop-valid").default);
} catch {
}
function o4(t, a, i) {
  const l = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || un(t[o]) || (xS(o) || i === !0 && _c(o) || !a && !_c(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (l[o] = t[o]);
  return l;
}
const Fc = /* @__PURE__ */ y.createContext({});
function c4(t, a) {
  if (Ic(t)) {
    const { initial: i, animate: l } = t;
    return {
      initial: i === !1 || bl(i) ? i : void 0,
      animate: bl(l) ? l : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function u4(t) {
  const { initial: a, animate: i } = c4(t, y.useContext(Fc));
  return y.useMemo(() => ({ initial: a, animate: i }), [Eb(a), Eb(i)]);
}
function Eb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const dm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function SS(t, a, i) {
  for (const l in a)
    !un(a[l]) && !dS(l, i) && (t[l] = a[l]);
}
function d4({ transformTemplate: t }, a) {
  return y.useMemo(() => {
    const i = dm();
    return sm(i, a, t), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function f4(t, a) {
  const i = t.style || {}, l = {};
  return SS(l, i, t), Object.assign(l, d4(t, a)), l;
}
function h4(t, a) {
  const i = {}, l = f4(t, a);
  return t.drag && t.dragListener !== !1 && (i.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0), i.style = l, i;
}
const wS = () => ({
  ...dm(),
  attrs: {}
});
function m4(t, a, i, l) {
  const o = y.useMemo(() => {
    const d = wS();
    return fS(d, a, mS(l), t.transformTemplate, t.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [a]);
  if (t.style) {
    const d = {};
    SS(d, t.style, t), o.style = { ...d, ...o.style };
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
function fm(t) {
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
function v4(t, a, i, { latestValues: l }, o, d = !1, h) {
  const g = (h ?? fm(t) ? m4 : h4)(a, l, o, t), p = o4(a, typeof t == "string", d), b = t !== y.Fragment ? { ...p, ...g, ref: i } : {}, { children: v } = a, S = y.useMemo(() => un(v) ? v.get() : v, [v]);
  return y.createElement(t, {
    ...b,
    children: S
  });
}
function g4({ scrapeMotionValuesFromProps: t, createRenderState: a }, i, l, o) {
  return {
    latestValues: y4(i, l, o, t),
    renderState: a()
  };
}
function y4(t, a, i, l) {
  const o = {}, d = l(t, {});
  for (const S in d)
    o[S] = Z5(d[S]);
  let { initial: h, animate: m } = t;
  const g = Ic(t), p = sS(t);
  a && p && !g && t.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let b = i ? i.initial === !1 : !1;
  b = b || h === !1;
  const v = b ? m : h;
  if (v && typeof v != "boolean" && !qc(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let E = 0; E < S.length; E++) {
      const w = em(t, S[E]);
      if (w) {
        const { transitionEnd: N, transition: R, ...T } = w;
        for (const O in T) {
          let z = T[O];
          if (Array.isArray(z)) {
            const _ = b ? z.length - 1 : 0;
            z = z[_];
          }
          z !== null && (o[O] = z);
        }
        for (const O in N)
          o[O] = N[O];
      }
    }
  }
  return o;
}
const ES = (t) => (a, i) => {
  const l = y.useContext(Fc), o = y.useContext($c), d = () => g4(t, a, l, o);
  return i ? d() : Fh(d);
}, b4 = /* @__PURE__ */ ES({
  scrapeMotionValuesFromProps: lm,
  createRenderState: dm
}), x4 = /* @__PURE__ */ ES({
  scrapeMotionValuesFromProps: pS,
  createRenderState: wS
}), S4 = Symbol.for("motionComponentSymbol");
function w4(t, a, i) {
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
const E4 = y.createContext({});
function j4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function N4(t, a, i, l, o, d) {
  const { visualElement: h } = y.useContext(Fc), m = y.useContext(cm), g = y.useContext($c), p = y.useContext(om), b = p.reducedMotion, v = p.skipAnimations, S = y.useRef(null), E = y.useRef(!1);
  l = l || m.renderer, !S.current && l && (S.current = l(t, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: d
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const w = S.current, N = y.useContext(E4);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && T4(S.current, i, o, N);
  const R = y.useRef(!1);
  y.useInsertionEffect(() => {
    w && R.current && w.update(i, g);
  });
  const T = i[Q1], O = y.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return l1(() => {
    E.current = !0, w && (R.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), O.current && w.animationState && w.animationState.animateChanges());
  }), y.useEffect(() => {
    w && (!O.current && w.animationState && w.animationState.animateChanges(), O.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), O.current = !1), w.enteringChildren = void 0);
  }), w;
}
function T4(t, a, i, l) {
  const { layoutId: o, layout: d, drag: h, dragConstraints: m, layoutScroll: g, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new i(t.latestValues, a["data-framer-portal-id"] ? void 0 : jS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: d,
    alwaysMeasureLayout: !!h || m && j4(m),
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
function Of(t, { forwardMotionProps: a = !1, type: i } = {}, l, o) {
  l && vh(l);
  const d = i ? i === "svg" : fm(t), h = d ? x4 : b4;
  function m(p, b) {
    let v;
    const S = {
      ...y.useContext(om),
      ...p,
      layoutId: C4(p)
    }, { isStatic: E } = S, w = u4(p), N = h(p, E);
    if (!E && typeof window < "u") {
      R4();
      const R = M4(S);
      v = R.MeasureLayout, w.visualElement = N4(t, N, S, o, R.ProjectionNode, d);
    }
    return c.jsxs(Fc.Provider, { value: w, children: [v && w.visualElement ? c.jsx(v, { visualElement: w.visualElement, ...S }) : null, v4(t, p, w4(N, w.visualElement, b), N, E, a, d)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const g = y.forwardRef(m);
  return g[S4] = t, g;
}
function C4({ layoutId: t }) {
  const a = y.useContext(s1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function R4(t, a) {
  y.useContext(cm).strict;
}
function M4(t) {
  const a = bS(), { drag: i, layout: l } = a;
  if (!i && !l)
    return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout: i?.isEnabled(t) || l?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function _4(t, a) {
  if (typeof Proxy > "u")
    return Of;
  const i = /* @__PURE__ */ new Map(), l = (d, h) => Of(d, h, t, a), o = (d, h) => l(d, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? l : (i.has(h) || i.set(h, Of(h, void 0, t, a)), i.get(h))
  });
}
const hm = /* @__PURE__ */ _4(), A4 = (t, a) => a.isSVG ?? fm(t) ? new F5(a) : new B5(a, {
  allowProjection: t !== y.Fragment
});
class D4 extends is {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = K5(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    qc(a) && (this.unmountControls = a.subscribe(this.node));
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
let z4 = 0;
class k4 extends is {
  constructor() {
    super(...arguments), this.id = z4++, this.isExitComplete = !1;
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
          const m = Qr(this.node, d, h);
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
const O4 = {
  animation: {
    Feature: D4
  },
  exit: {
    Feature: k4
  }
};
function NS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function jb(t, a, i) {
  const { props: l } = t;
  t.animationState && l.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, d = l[o];
  d && Pn.postRender(() => d(a, NS(a)));
}
class L4 extends is {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = v5(a, (i, l) => (jb(this.node, l, "Start"), (o) => jb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class U4 extends is {
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
    this.unmount = Vc(yb(this.node.current, "focus", () => this.onFocus()), yb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Nb(t, a, i) {
  const { props: l } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && l.whileTap && t.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), d = l[o];
  d && Pn.postRender(() => d(a, NS(a)));
}
class B4 extends is {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: l } = this.node.props;
    this.unmount = S5(a, (o, d) => (Nb(this.node, d, "Start"), (h, { success: m }) => Nb(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const gh = /* @__PURE__ */ new WeakMap(), Lf = /* @__PURE__ */ new WeakMap(), $4 = (t) => {
  const a = gh.get(t.target);
  a && a(t);
}, V4 = (t) => {
  t.forEach($4);
};
function H4({ root: t, ...a }) {
  const i = t || document;
  Lf.has(i) || Lf.set(i, {});
  const l = Lf.get(i), o = JSON.stringify(a);
  return l[o] || (l[o] = new IntersectionObserver(V4, { root: t, ...a })), l[o];
}
function q4(t, a, i) {
  const l = H4(a);
  return gh.set(t, i), l.observe(t), () => {
    gh.delete(t), l.unobserve(t);
  };
}
const I4 = {
  some: 0,
  all: 1
};
class F4 extends is {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: l, amount: o = "some", once: d } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: l,
      threshold: typeof o == "number" ? o : I4[o]
    }, m = (g) => {
      const { isIntersecting: p } = g;
      if (this.isInView === p || (this.isInView = p, d && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = p ? b : v;
      S && S(g);
    };
    this.stopObserver = q4(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(Y4(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function Y4({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (i) => t[i] !== a[i];
}
const G4 = {
  inView: {
    Feature: F4
  },
  tap: {
    Feature: B4
  },
  focus: {
    Feature: U4
  },
  hover: {
    Feature: L4
  }
}, mm = {
  renderer: A4,
  ...O4,
  ...G4
};
function X4() {
  !im.current && lS();
  const [t] = y.useState(Rc.current);
  return t;
}
const yh = "emotion-tts:trigger-generate", bh = "emotion-tts:run-state";
function P4() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(yh));
}
function K4(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(bh, { detail: t }));
}
function Q4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(yh, t), () => window.removeEventListener(yh, t));
}
function TS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const l = i.detail;
    l && t(l);
  };
  return window.addEventListener(bh, a), () => window.removeEventListener(bh, a);
}
var Z4 = "wksjad0", J4 = "wksjad1", W4 = "wksjad2", ek = "wksjad3", tk = "wksjad4", nk = "wksjad5", ak = "wksjad6", rk = "wksjad7", ik = "wksjad8", sk = "wksjad9", lk = "wksjada", ok = "wksjadb", ck = "wksjadc", uk = "wksjadd", dk = "wksjade", fk = "wksjadf", Uf = "wksjadg", hk = "wksjadh", mk = "wksjadi", pk = "wksjadj", vk = "wksjadk", gk = "wksjadl", yk = "wksjadm";
const bk = "nexus.audio.emotiontts", Ac = 5;
function CS(t, a = "") {
  return `/api/v1/extensions/${bk}/deployments/${t}/artifacts${a}`;
}
function xk(t) {
  const [a, i] = y.useState([]), [l, o] = y.useState(!1), [d, h] = y.useState(null), [m, g] = y.useState(0), p = y.useRef(null), b = y.useRef(!1), v = y.useCallback(() => g((S) => S + 1), []);
  return y.useEffect(() => {
    p.current?.abort();
    const S = new AbortController();
    return p.current = S, o(!0), h(null), fetch(`${CS(t)}?limit=${Ac}`, {
      headers: { accept: "application/json" },
      signal: S.signal
    }).then(async (E) => {
      if (!E.ok)
        throw new Error(`HTTP ${E.status}`);
      const w = await E.json();
      S.signal.aborted || i(w.artifacts.slice(0, Ac));
    }).catch((E) => {
      if (S.signal.aborted) return;
      const w = E instanceof Error ? E.message : "fetch failed";
      h(w);
    }).finally(() => {
      S.signal.aborted || o(!1);
    }), () => S.abort();
  }, [t, m]), y.useEffect(() => TS((S) => {
    const E = b.current;
    b.current = S.busy, E && !S.busy && v();
  }), [v]), { rows: a, loading: l, error: d, refetch: v };
}
function Sk(t) {
  const [a, i] = y.useState(() => /* @__PURE__ */ new Map());
  return y.useEffect(() => {
    let l = !1;
    return Ki(t).then(({ voiceAssets: o }) => {
      if (l) return;
      const d = /* @__PURE__ */ new Map();
      for (const h of o)
        d.set(h.voiceAssetId, h.displayName);
      i(d);
    }).catch(() => {
    }), () => {
      l = !0;
    };
  }, [t]), a;
}
function wk({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: i, loading: l, error: o, refetch: d } = xk(t), h = Sk(t), [m, g] = y.useState(null), p = X4(), b = y.useMemo(() => i.slice(0, Ac), [i]);
  return !l && !o && b.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: Z4, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: J4, children: [
      /* @__PURE__ */ c.jsx("span", { className: W4, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: ek, children: [
        /* @__PURE__ */ c.jsx("span", { className: tk, children: b.length }),
        /* @__PURE__ */ c.jsxs("span", { className: nk, children: [
          "last ",
          Ac
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: ak,
            onClick: d,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && b.length === 0 && /* @__PURE__ */ c.jsx("div", { className: yk, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(um, { features: mm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: rk, children: /* @__PURE__ */ c.jsx(yS, { initial: !1, children: b.map((v) => {
      const S = m === v.utteranceId, E = CS(
        t,
        `/${v.utteranceId}/download`
      ), w = h.size > 0 ? Array.from(h.values())[0] : null;
      return /* @__PURE__ */ c.jsxs(
        hm.li,
        {
          className: ik,
          initial: p ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: p ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: p ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": S || void 0,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: sk,
                onClick: () => g(
                  (N) => N === v.utteranceId ? null : v.utteranceId
                ),
                "aria-label": S ? "Stop preview" : "Play preview",
                "aria-pressed": S,
                children: S ? "■" : "▶"
              }
            ),
            /* @__PURE__ */ c.jsxs("div", { className: lk, children: [
              /* @__PURE__ */ c.jsxs("div", { className: ok, children: [
                /* @__PURE__ */ c.jsx("span", { className: ck, children: v.characterDisplay }),
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: uk,
                    title: v.text,
                    "data-tooltip": v.text,
                    children: v.text
                  }
                )
              ] }),
              /* @__PURE__ */ c.jsxs("div", { className: dk, children: [
                /* @__PURE__ */ c.jsx("span", { className: fk, children: jk(v.finishedAt) }),
                w && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                  /* @__PURE__ */ c.jsx("span", { className: Uf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: hk, children: w })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: Uf, "aria-hidden": "true", children: "·" }),
                /* @__PURE__ */ c.jsx("span", { className: mk, children: Ek(v.durationMs) }),
                a !== void 0 && a !== 1 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                  /* @__PURE__ */ c.jsx("span", { className: Uf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsxs("span", { className: pk, children: [
                    a.toFixed(2),
                    "×"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ c.jsx(
              "a",
              {
                className: vk,
                href: E,
                download: v.filename,
                "aria-label": `Download ${v.filename}`,
                title: "Download",
                children: "↓"
              }
            ),
            S && /* @__PURE__ */ c.jsx(
              "audio",
              {
                className: gk,
                src: E,
                controls: !0,
                autoPlay: !0,
                preload: "auto",
                children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
              }
            )
          ]
        },
        v.utteranceId
      );
    }) }) }) })
  ] });
}
function Ek(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return i > 0 ? `${i}:${l.toString().padStart(2, "0")}` : `${l}s`;
}
function jk(t) {
  if (!t) return "—";
  const i = Math.floor(Date.now() / 1e3) - t;
  return i < 0 ? "just now" : i < 60 ? `${i}s ago` : i < 3600 ? `${Math.floor(i / 60)}m ago` : i < 86400 ? `${Math.floor(i / 3600)}h ago` : i < 604800 ? `${Math.floor(i / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function Nk(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function RS() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function Tk() {
  if (typeof window > "u") return;
  const t = RS();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function MS(t) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const l = RS(), o = () => {
      const h = l.reduce((m, g) => {
        const p = Nk(g);
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
const _S = 360;
var Ck = "_1s59p180", Rk = "_1s59p181", Mk = "_1s59p182", _k = "_1s59p183", Ak = "_1s59p184", Dk = "_1s59p185", zk = "_1s59p186", kk = "_1s59p188", Ok = "_1s59p189", Tb = "_1s59p18a", Lk = "_1s59p18c", Uk = "_1s59p18d", Bk = "_1s59p18e", $k = "_1s59p18f", Vk = "_1s59p18g", Hk = "_1s59p18i";
function qk(t) {
  const a = El(), [i, l] = y.useState("idle"), [o, d] = y.useState(null), [h, m] = y.useState(/* @__PURE__ */ new Map()), [g, p] = y.useState(null), [b, v] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => () => {
    S.current?.();
  }, []), y.useEffect(() => {
    K4({ busy: i === "starting" || i === "running" });
  }, [i]);
  const E = y.useCallback(
    (B) => {
      const Q = B.status;
      (Q === "completed" || Q === "partial") && Zt.success(
        Q === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
    l("starting"), p(null), m(/* @__PURE__ */ new Map()), v(null);
    try {
      const B = await TT(t.deploymentId, t.createPayload);
      d(B.runId), l("running"), S.current?.(), S.current = By(
        t.deploymentId,
        B.runId,
        (Q) => Cb(
          Q,
          m,
          l,
          (M) => {
            v(M), E(M);
          },
          t.deploymentId,
          B.runId
        ),
        () => l("error")
      );
    } catch (B) {
      l("error"), p(Bf(B));
    }
  }, [t.deploymentId, t.createPayload, E]);
  y.useEffect(() => Q4(() => {
    (i === "idle" || i === "terminal" || i === "error") && w();
  }), [i, w]);
  const N = y.useCallback(async () => {
    if (o)
      try {
        await CT(t.deploymentId, o);
      } catch (B) {
        p(Bf(B));
      }
  }, [t.deploymentId, o]), R = Array.from(h.values()).sort((B, Q) => B.globalIndex - Q.globalIndex), T = i === "starting" || i === "running", O = b?.status === "partial", z = R.filter((B) => B.status === "running").length, _ = R.filter((B) => B.status === "completed").length, I = i === "starting" || i === "running" || R.length > 0, J = R.filter((B) => B.status === "failed"), ne = (() => {
    if (i !== "terminal" || J.length === 0) return null;
    const B = /* @__PURE__ */ new Map();
    for (const P of J) {
      const le = P.failureCategory ?? "unknown";
      B.set(le, (B.get(le) ?? 0) + 1);
    }
    let Q = "unknown", M = 0;
    for (const [P, le] of B)
      le > M && (Q = P, M = le);
    const Z = R.length;
    return { category: Q, count: M, total: Z };
  })(), A = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, q = "Check the run detail page for the per-segment error log.", F = g?.toLowerCase().includes("unmapped") ?? !1, ie = t.diagnostics ?? [], re = ie.find((B) => B.status === "fail"), te = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", ce = !t.canGenerate || T || !!re, W = i === "starting" || i === "running", k = W ? "running" : ce ? "blocked" : "idle", U = !MS(_S) || W;
  return /* @__PURE__ */ c.jsxs("div", { className: Ck, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Rk, children: [
      /* @__PURE__ */ c.jsxs("div", { className: _k, children: [
        /* @__PURE__ */ c.jsxs("span", { className: Ak, children: [
          /* @__PURE__ */ c.jsx("span", { className: Mk, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          I && /* @__PURE__ */ c.jsxs("span", { className: Vk, children: [
            /* @__PURE__ */ c.jsx("span", { className: Hk, "aria-hidden": "true" }),
            z > 0 ? `${z} in flight` : `${_} done`
          ] })
        ] }),
        ie.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: Dk, "aria-label": "Pre-flight checks", children: ie.map((B) => /* @__PURE__ */ c.jsxs("li", { className: zk, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: kk,
              "data-status": B.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: Ok, children: B.label }),
          B.detail && /* @__PURE__ */ c.jsx("span", { className: Tb, children: B.detail })
        ] }, B.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Tb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Lk, "data-state": k, children: [
        U ? /* @__PURE__ */ c.jsxs(
          $e,
          {
            variant: "primary",
            size: "sm",
            onClick: w,
            disabled: ce,
            loading: W,
            children: [
              !W && /* @__PURE__ */ c.jsx("span", { className: Uk, "aria-hidden": "true", children: "▶" }),
              te
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: Bk, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: $k, children: "↑" })
        ] }),
        T && /* @__PURE__ */ c.jsx(
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
          F && /* @__PURE__ */ c.jsx(
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
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: A[ne.category] ?? q })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${qx.secondary} ${Ix.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    O && b && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "secondary",
          disabled: !!re,
          onClick: async () => {
            try {
              const B = await $x(t.deploymentId, b.runId);
              d(B.runId), m(/* @__PURE__ */ new Map()), v(null), l("running"), S.current?.(), S.current = By(
                t.deploymentId,
                B.runId,
                (Q) => Cb(Q, m, l, v, t.deploymentId, B.runId),
                () => l("error")
              );
            } catch (B) {
              p(Bf(B)), l("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    R.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: mR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: R.map((B) => /* @__PURE__ */ c.jsxs("tr", { className: pR, children: [
        /* @__PURE__ */ c.jsx("td", { className: fr, children: B.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: /* @__PURE__ */ c.jsx(Zr, { tone: Ik(B.status), children: B.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: B.durationMs ? `${B.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: B.failureCategory ?? "" })
      ] }, B.globalIndex)) })
    ] })
  ] });
}
async function Cb(t, a, i, l, o, d) {
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
        const h = await $h(o, d);
        l(h);
      } catch {
      }
      return;
  }
}
function Ik(t) {
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
function Bf(t) {
  return t instanceof es || t instanceof Error ? t.message : "unknown error";
}
var Fk = "pz3uk70", Yk = "pz3uk71", Gk = "pz3uk72", Xk = "pz3uk73", Pk = "pz3uk74", Kk = "pz3uk75", Qk = "pz3uk76", Zk = "pz3uk77";
const Jk = y.forwardRef(
  function({ checked: a, onChange: i, label: l, hint: o, disabled: d, id: h, className: m, emphasis: g = !1 }, p) {
    const b = (v) => {
      i(v.currentTarget.checked);
    };
    return /* @__PURE__ */ c.jsxs(
      "label",
      {
        className: `${Fk} ${g && a ? Yk : ""} ${m ?? ""}`,
        "data-disabled": d || void 0,
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: p,
              id: h,
              type: "checkbox",
              className: Gk,
              checked: a,
              onChange: b,
              disabled: d
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: Xk, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${Pk}`, children: "check" }) }),
          (l || o) && /* @__PURE__ */ c.jsxs("span", { className: Kk, children: [
            l && /* @__PURE__ */ c.jsx("span", { className: Qk, children: l }),
            o && /* @__PURE__ */ c.jsx("span", { className: Zk, children: o })
          ] })
        ]
      }
    );
  }
);
var Wk = "xq3iim0", eO = "xq3iim2 xq3iim1", tO = "xq3iim3 xq3iim1", nO = "xq3iim4", aO = "xq3iim5", rO = "xq3iim6", iO = "xq3iim7";
function sO({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [l, o] = y.useState([]), [d, h] = y.useState(a), [m, g] = y.useState(!0), [p, b] = y.useState(!1), [v, S] = y.useState(null);
  y.useEffect(() => {
    let w = !1;
    return g(!0), Ki(t).then(({ voiceAssets: N }) => {
      w || o(N);
    }).catch((N) => {
      w || S(N instanceof Error ? N.message : "Failed to load voices");
    }).finally(() => {
      w || g(!1);
    }), () => {
      w = !0;
    };
  }, [t]);
  async function E(w) {
    b(!0), S(null);
    const N = d;
    h(w);
    try {
      await wT(t, w), i?.(w);
    } catch (R) {
      h(N), S(R instanceof Error ? R.message : "Failed to update default voice");
    } finally {
      b(!1);
    }
  }
  return m ? /* @__PURE__ */ c.jsx("p", { className: rO, children: "Loading voices…" }) : v ? /* @__PURE__ */ c.jsx("p", { className: iO, children: v }) : l.length === 0 ? /* @__PURE__ */ c.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ c.jsx(
    Tl,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ c.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: Wk,
      children: l.map((w) => {
        const N = w.voiceAssetId === d;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": N,
            disabled: p,
            onClick: () => void E(N ? null : w.voiceAssetId),
            className: N ? tO : eO,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: nO, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ c.jsx("span", { className: aO, children: lO(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function lO(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), l = Math.round(a - i * 60);
  return `${i}:${l.toString().padStart(2, "0")}`;
}
const Rb = [
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
function oO(t) {
  const a = El(), i = y.useRef(null), { tokens: l, attributions: o, unresolved: d, predictedFilenames: h, characterColor: m } = y.useMemo(
    () => uO(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), g = (b) => {
    const v = i.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: `${sR} ${p ? cR : ""}`, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: i, className: lR, "aria-hidden": "true", children: l.map((b, v) => cO(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: `${oR} ${p ? uR : ""}`,
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
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: a0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
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
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: a0, children: h.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function cO(t, a, i) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: n0, children: t.raw }),
      `
`
    ] }, a);
  const l = i.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? t0 : `${t0} ${dR}`;
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
    /* @__PURE__ */ c.jsxs("span", { className: n0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function uO(t, a, i) {
  const l = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], d = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), g = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let S = 0;
  return v.forEach((E, w) => {
    const N = E.trim();
    if (!N) {
      o.push({ kind: "blank", raw: E });
      return;
    }
    const R = w + 1, T = N.match(l);
    let O = "Narrator", z = N, _, I = !1;
    if (T?.groups) {
      I = !0;
      const q = (T.groups.body ?? "").trim(), F = (T.groups.rest ?? "").trim();
      O = ((q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", _ = (q.includes("|") ? q.slice(q.indexOf("|") + 1) : "").trim() || void 0, z = F;
    }
    S += 1;
    const J = O.toLowerCase(), ne = (m.get(J) ?? 0) + 1;
    m.set(J, ne);
    const A = O === "Narrator" || i.has(J);
    if (A || h.add(O), O !== "Narrator" && !p.has(J) && (p.set(J, Rb[b % Rb.length] ?? "currentColor"), b += 1), I) {
      const q = { kind: "character", raw: E, character: O, text: z, hasMapping: A };
      _ !== void 0 && (q.override = _), o.push(q);
    } else
      o.push({ kind: "narrator", raw: E });
    d.push({ lineNumber: R, character: O, text: z, hasMapping: A }), g.push(
      `${S.toString().padStart(3, "0")}_${dO(O)}_${ne.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: d,
    unresolved: Array.from(h),
    predictedFilenames: g,
    characterColor: p
  };
}
function dO(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
var fO = "_5o8xvy0", hO = "_5o8xvy1", mO = "_5o8xvy2", pO = "_5o8xvy3", $f = "_5o8xvy4", vO = "_3f2ar0", gO = "_3f2ar1", yO = "_3f2ar2", bO = "_3f2ar3", xO = "_3f2ar4", SO = "_3f2ar6", nl = "_3f2ar7", al = "_3f2ar8", rl = "_3f2ar9", Mb = "_3f2ara", _b = "_3f2arb";
function wO({ label: t, glyph: a = "?", children: i }) {
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
  }, [l, g]), /* @__PURE__ */ c.jsxs("span", { ref: d, className: vO, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: gO,
        "aria-expanded": l,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: yO, "aria-hidden": "true", children: a }),
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
        className: bO,
        children: i
      }
    )
  ] });
}
var EO = "_1dxb1dg0", Ab = "_1dxb1dg1", jO = "_1dxb1dg2", NO = "_1dxb1dg3", TO = "_1dxb1dg4";
function CO() {
  return /* @__PURE__ */ c.jsxs(wO, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: xO, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: SO, children: [
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Mb, children: [
      /* @__PURE__ */ c.jsx("span", { className: _b, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Mb, children: [
      /* @__PURE__ */ c.jsx("span", { className: _b, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function RO() {
  return /* @__PURE__ */ c.jsxs("ul", { className: EO, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Ab, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Ab, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: jO, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: NO, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: TO, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function MO({
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
  const p = l.length, b = l.trim() ? l.trim().split(/\s+/).length : 0, v = l.trim() ? l.trim().split(/\r?\n/).filter((S) => S.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: fO, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${hO} ${t ? mO : ""}`,
        "data-quick-on": t || void 0,
        children: [
          /* @__PURE__ */ c.jsx(
            Jk,
            {
              checked: t,
              onChange: a,
              emphasis: !0,
              label: "Quick mode",
              hint: "single voice · plain prose · no character syntax"
            }
          ),
          t && /* @__PURE__ */ c.jsx(
            sO,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: m,
              onChange: g
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: pO, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: $f, children: p.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: $f, children: v.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: $f, children: b.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            /* @__PURE__ */ c.jsx(CO, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx(
      oO,
      {
        value: l,
        onChange: o,
        outputFormat: d,
        mappings: h,
        deploymentId: i.deploymentId,
        quickMode: t
      }
    ),
    !t && /* @__PURE__ */ c.jsx(RO, {})
  ] });
}
function _O({
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
const Vf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], AO = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function DO(t) {
  const a = [];
  if (!t) return a;
  const i = t.split(/\r?\n/);
  for (let l = 0; l < i.length; l += 1) {
    const d = (i[l] ?? "").trim();
    if (d.length === 0) continue;
    const h = d.match(AO);
    if (!h || !h.groups) {
      a.push({ idx: l, character: null, text: d, override: null });
      continue;
    }
    const m = h.groups.body ?? "", g = (h.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: l, character: null, text: g || d, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, E = b.join("|").trim(), w = E ? zO(E) : null;
    a.push({
      idx: l,
      character: S,
      text: g,
      override: w
    });
  }
  return a;
}
function zO(t) {
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
function kO(t) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const l of t) {
    if (!l.character) continue;
    const o = l.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(l.character));
  }
  return i;
}
function OO(t) {
  const a = {};
  for (let i = 0; i < t.length; i += 1) {
    const l = t[i];
    l && (a[l] = Vf[i % Vf.length] ?? Vf[0]);
  }
  return a;
}
function LO(t) {
  const a = {};
  for (const i of t)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var UO = "_1snzz30", BO = "_1snzz31", $O = "_1snzz33", VO = "_1snzz34", HO = "_1snzz36", Db = "_1snzz3b", zb = "_1snzz3c", kb = "_1snzz3d";
const qO = 4e3;
function IO({ visible: t, canGenerate: a }) {
  const [i, l] = y.useState(null), [o, d] = y.useState(!1), [h, m] = y.useState(!1), g = y.useRef(null);
  y.useEffect(() => {
    let C = !1;
    const U = async () => {
      try {
        const Q = await xc();
        C || (g.current = Q, l(Q));
      } catch {
      }
    };
    U();
    const B = window.setInterval(U, qO);
    return () => {
      C = !0, window.clearInterval(B);
    };
  }, []), y.useEffect(() => TS((C) => {
    m(!!C.busy);
  }), []);
  const p = y.useCallback(() => {
    P4();
  }, []), b = i?.badge ?? "not_installed", v = b === "ready" || b === "running", S = b === "starting" || b === "installing", E = v, w = y.useCallback(async () => {
    const C = g.current?.badge ?? "not_installed", U = C === "ready" || C === "running";
    d(!0);
    try {
      U ? (await Px(), Zt.success("Runtime stopped")) : (await Xx(), Zt.success("Runtime starting…"));
    } catch (B) {
      Zt.error(B instanceof Error ? B.message : "runtime action failed");
    } finally {
      d(!1);
    }
  }, []), N = v ? "Stop runtime" : S ? "Runtime starting…" : "Start runtime", R = o || S, T = o || S, O = T ? "transitioning" : v ? "running" : "stopped", z = !a || h || !E, _ = E ? a ? h ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", I = E && a && !h, J = v ? "ready" : S || o ? "busy" : "off", ne = v ? "Runtime ready" : S ? "Starting…" : o ? "Working…" : "Runtime off", A = J === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const q = "rgba(28, 30, 34, 0.94)", F = "#ba9eff", ie = "#8455ef", re = "#1a0a3a", te = "#f0f0f3", ce = "#aaabae", W = "#22c55e", k = v ? "◼" : "⏻";
  return Vh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: UO,
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
          /* @__PURE__ */ c.jsxs(
            "span",
            {
              className: BO,
              "data-tone": J,
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
                color: J === "ready" ? W : J === "busy" ? F : ce,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${J === "ready" ? "rgba(34, 197, 94, 0.4)" : J === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: $O,
                    "data-pulse": A ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: J === "ready" ? `0 0 8px ${W}` : J === "busy" ? `0 0 8px ${F}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ne
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: zb, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: VO,
                "data-state": O,
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
                  background: O === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: O === "running" ? W : te,
                  fontSize: "16px",
                  cursor: R ? "not-allowed" : "pointer",
                  opacity: R ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${O === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ c.jsx("span", { className: Db, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: k })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: kb, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: zb, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: HO,
                "data-ready": I ? "true" : "false",
                onClick: p,
                disabled: z,
                "aria-label": _,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: z ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${F} 0%, ${ie} 100%)`,
                  color: z ? ce : re,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: z ? "not-allowed" : "pointer",
                  boxShadow: z ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  h ? /* @__PURE__ */ c.jsx("span", { className: Db, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: h ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: kb, role: "tooltip", children: _ })
          ] })
        ]
      }
    ),
    document.body
  );
}
function FO(t) {
  const a = t.workflowCustomised ?? !1, i = t.unmappableFields ?? [], l = YO(t.deployment.displayName, t.deployment.deploymentId), o = MS(_S), d = t.canGenerate ?? !1;
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
    /* @__PURE__ */ c.jsx(IO, { visible: o, canGenerate: d }),
    typeof document < "u" && Vh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: aR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: Tk,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function YO(t, a) {
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
    Zt.success(t);
  },
  error(t) {
    Zt.error(t);
  }
}, xh = "__recipe";
function GO(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function XO(t) {
  const a = {};
  for (const i of Object.keys(t))
    i !== xh && (a[i] = t[i]);
  return a;
}
function PO() {
  const { deployment: t, mappings: a, runs: i, workflow: l } = Nl(), [o, d] = y.useState(a), [h, m] = y.useState([]), [g, p] = y.useState([]), [b, v] = y.useState(null), [S, E] = y.useState(Bc), w = y.useMemo(
    () => t.defaultGenerationOverridesJson ? GO(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = y.useMemo(() => {
    const he = w[xh];
    return typeof he == "object" && he !== null ? he : {};
  }, [w]), [R, T] = y.useState(""), [O, z] = y.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [_, I] = y.useState(t.defaultSpeedFactor ?? 1), [J, ne] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [A, q] = y.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...XO(w)
  })), [F, ie] = y.useState(() => {
    const he = N.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "use_cache";
  }), [re, te] = y.useState(
    t.defaultVoiceAssetId ?? null
  ), [ce, W] = y.useState(() => {
    const he = N.quickMode;
    return typeof he == "boolean" ? he : t.defaultVoiceAssetId != null;
  }), [k, C] = y.useState(D3);
  y.useEffect(() => {
    let he = !1;
    return Ki(t.deploymentId).then((Oe) => {
      he || m(Oe.voiceAssets);
    }).catch(() => {
    }), Fx(t.deploymentId).then((Oe) => {
      he || p(Oe.presets);
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
      const Oe = {
        ...A,
        [xh]: {
          quickMode: ce,
          cachePolicy: F
        }
      };
      ht(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: O,
          defaultSpeedFactor: _,
          defaultGenerationOverrides: Oe
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(he);
  }, [
    t.deploymentId,
    O,
    _,
    F,
    ce,
    A
  ]);
  const B = y.useMemo(() => DO(R), [R]), Q = y.useMemo(() => kO(B), [B]), M = y.useMemo(() => OO(Q), [Q]), Z = y.useMemo(() => LO(B), [B]), P = y.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const Oe of o)
      he.set(Oe.characterName.toLowerCase(), Oe);
    return he;
  }, [o]), le = y.useMemo(() => ce && re ? 0 : Q.filter((he) => !P.has(he.toLowerCase())).length, [Q, P, ce, re]), fe = y.useCallback(
    async (he, Oe) => {
      const De = P.get(he.toLowerCase());
      try {
        if (De) {
          const Te = await ul(t.deploymentId, De.mappingId, Oe);
          d(
            (bt) => bt.map((xt) => xt.mappingId === Te.mappingId ? Te : xt)
          ), _n.success(`Updated mapping for ${he}`);
        } else if (Oe.speakerVoiceAssetId) {
          const Te = await Bh(t.deploymentId, {
            ...Oe,
            characterName: he,
            speakerVoiceAssetId: Oe.speakerVoiceAssetId
          });
          d((bt) => [...bt, Te]), _n.success(`Mapped ${he} to voice`);
        }
      } catch (Te) {
        _n.error(Te instanceof Error ? Te.message : "mapping failed");
      }
    },
    [P, t.deploymentId]
  ), ge = y.useCallback(
    async (he) => {
      const Oe = P.get(he.toLowerCase());
      if (Oe)
        try {
          await Bx(t.deploymentId, Oe.mappingId), d((De) => De.filter((Te) => Te.mappingId !== Oe.mappingId)), _n.success(`Cleared mapping for ${he}`);
        } catch (De) {
          _n.error(De instanceof Error ? De.message : "clear failed");
        }
    },
    [P, t.deploymentId]
  ), Ae = y.useCallback(
    async (he, Oe) => {
      try {
        const De = await bc(
          t.deploymentId,
          Oe,
          Oe.name.replace(/\.[^.]+$/, ""),
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
  }, []), Ve = y.useMemo(() => {
    const he = [], Oe = /* @__PURE__ */ new Set();
    for (const De of o) {
      const Te = De.speakerVoiceAssetId;
      if (!Te || Oe.has(Te)) continue;
      Oe.add(Te);
      const xt = h.find((dn) => dn.voiceAssetId === Te)?.displayName ?? `${De.characterName} · ${Te.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: Te, label: xt });
    }
    for (const De of h)
      Oe.has(De.voiceAssetId) || (Oe.add(De.voiceAssetId), he.push({ kind: "voice_asset", id: De.voiceAssetId, label: De.displayName }));
    return he;
  }, [o, h]), Jt = y.useCallback(
    async (he, Oe) => {
      if (he.kind !== "voice_asset") {
        _n.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let De;
      try {
        const Te = JSON.parse(Oe);
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
        const Te = await Vx(he.id, t.deploymentId, {
          chain: De
        }), bt = o.filter((xt) => xt.speakerVoiceAssetId === he.id);
        await Promise.all(
          bt.map(
            (xt) => ul(t.deploymentId, xt.mappingId, {
              voiceAssetChainDigest: Te.chain_digest
            }).catch(() => null)
          )
        ), d(
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
        await LC(he.id, t.deploymentId);
        const Oe = o.filter((De) => De.speakerVoiceAssetId === he.id);
        await Promise.all(
          Oe.map(
            (De) => ul(t.deploymentId, De.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), d(
          (De) => De.map(
            (Te) => Te.speakerVoiceAssetId === he.id ? { ...Te, voiceAssetChainDigest: null } : Te
          )
        ), _n.success(`Cleared edit chain on ${he.label}`);
      } catch (Oe) {
        _n.error(Oe instanceof Error ? Oe.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), At = y.useMemo(
    () => ({
      script: R,
      parserMode: ce ? "raw_text" : "dialogue",
      outputFormat: O,
      speedFactor: _,
      globalEmotion: { ...J, emotionAlpha: k.intensity },
      generation: A,
      cachePolicy: F
    }),
    [R, ce, O, _, k.intensity, J, A, F]
  ), et = y.useMemo(
    () => _O({
      script: R,
      quickMode: ce,
      defaultVoiceAssetId: re,
      characters: Q,
      unmappedCount: le,
      globalEmotion: J,
      performance: k
    }),
    [R, ce, re, Q, le, J, k]
  ), pt = y.useMemo(
    () => et.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "fail",
      detail: he.detail
    })),
    [et]
  );
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(kC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ c.jsx(
      FO,
      {
        deployment: t,
        canGenerate: R.trim().length > 0,
        workflowCustomised: l.workflow.customised,
        unmappableFields: l.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(s_, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          qk,
          {
            deploymentId: t.deploymentId,
            createPayload: At,
            canGenerate: R.trim().length > 0,
            diagnostics: pt
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          wk,
          {
            deploymentId: t.deploymentId,
            speedFactor: _
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          MO,
          {
            quickMode: ce,
            onToggleQuickMode: W,
            deployment: t,
            script: R,
            onScriptChange: T,
            outputFormat: O,
            mappingsByLower: P,
            defaultVoiceAssetId: re,
            onDefaultVoiceAssetIdChange: te
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(E3, { lines: B, characterColors: M }),
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
        castSection: /* @__PURE__ */ c.jsx(n_, { unmappedCount: le, totalCount: Q.length, children: Q.map((he) => {
          const Oe = P.get(he.toLowerCase()) ?? null, De = M[he] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: vR, children: /* @__PURE__ */ c.jsx(
            t_,
            {
              characterName: he,
              color: De,
              lineCount: Z[he] ?? 0,
              mapping: Oe,
              voiceAssets: h,
              presets: g,
              active: b === he,
              onToggle: () => v((Te) => Te === he ? null : he),
              onAssignVoiceAsset: (Te) => fe(he, { speakerVoiceAssetId: Te }),
              onAssignPreset: (Te) => fe(he, { defaultVectorPresetId: Te }),
              onUploadFile: (Te) => Ae(he, Te),
              onClearMapping: () => ge(he)
            }
          ) }, he);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          KA,
          {
            value: J,
            onChange: ne,
            deploymentId: t.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            z3,
            {
              value: { ...k, pace: _ },
              onChange: (he) => {
                C(he), he.pace !== _ && I(he.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Ih,
            {
              state: S,
              onChange: Me,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(F3, { checks: et }),
          /* @__PURE__ */ c.jsx(
            h3,
            {
              outputFormat: O,
              onOutputFormatChange: z,
              speedFactor: _,
              onSpeedFactorChange: I,
              cachePolicy: F,
              onCachePolicyChange: ie,
              generation: A,
              onGenerationChange: q
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(Z3, { runs: i, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          LM,
          {
            deploymentId: t.deploymentId,
            targets: Ve,
            onRevertToIdentity: Pt,
            onRevertToChain: Jt
          }
        )
      }
    )
  ] });
}
const Ob = /* @__PURE__ */ new Map();
function KO(t, a) {
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
    const o = `${t}::${a}`, d = Ob.get(o);
    if (d) {
      l({ peaks: d, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return l({ peaks: null, isLoading: !0, error: null }), QO(t, a, h.signal).then((m) => {
      h.signal.aborted || (Ob.set(o, m), l({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const g = m instanceof Error ? m.message : "decode failed";
      l({ peaks: null, isLoading: !1, error: g });
    }), () => h.abort();
  }, [t, a]), i;
}
async function QO(t, a, i) {
  const l = await fetch(t, { signal: i });
  if (!l.ok) throw new Error(`failed to load audio (${l.status})`);
  const o = await l.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return ZO(h, a);
}
function ZO(t, a) {
  const i = t.numberOfChannels, l = t.length, o = Math.max(1, Math.floor(l / a)), d = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const g = m * o, p = Math.min(l, g + o);
    let b = 0;
    for (let v = g; v < p; v += 1) {
      let S = 0;
      for (let w = 0; w < i; w += 1) {
        const N = h[w];
        N && (S += Math.abs(N[v] ?? 0));
      }
      const E = S / i;
      E > b && (b = E);
    }
    d[m] = b;
  }
  return d;
}
const Lb = "(prefers-reduced-motion: reduce)";
function JO() {
  const [t, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Lb).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(Lb), l = (o) => a(o.matches);
    return i.addEventListener("change", l), () => i.removeEventListener("change", l);
  }, []), t;
}
var WO = "mquzal0", e6 = "mquzal1", Ub = "mquzal2", Bb = "mquzal3", $b = "mquzal4", t6 = "mquzal5", Vb = "mquzal6", Hb = "mquzal7";
const n6 = 120, a6 = 720;
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
    width: b = a6,
    height: v = n6
  } = t, S = y.useRef(null), E = y.useRef(null), w = y.useRef(null), N = KO(a, b), R = JO();
  y.useEffect(() => {
    r6(S.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const T = y.useCallback(
    (A) => {
      const q = E.current?.getBoundingClientRect();
      if (!q || q.width <= 0) return 0;
      const F = Math.max(0, Math.min(1, (A - q.left) / q.width));
      return Math.round(F * i);
    },
    [i]
  );
  y.useEffect(() => {
    const A = (F) => {
      if (!w.current) return;
      const ie = T(F.clientX);
      w.current === "start" ? d(nc(ie, 0, o - 1)) : h(nc(ie, l + 1, i));
    }, q = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", q), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", q);
    };
  }, [T, i, o, l, d, h]);
  const O = (A) => (q) => {
    q.preventDefault(), q.stopPropagation(), w.current = A;
  }, z = (A) => {
    !p || A.target.closest("[data-handle]") || p(T(A.clientX));
  }, _ = (A) => (q) => {
    const F = q.shiftKey ? 100 : q.ctrlKey ? 1 : 10;
    let ie = 0;
    if (q.key === "ArrowLeft") ie = -F;
    else if (q.key === "ArrowRight") ie = F;
    else return;
    q.preventDefault(), A === "start" ? d(nc(l + ie, 0, o - 1)) : h(nc(o + ie, l + 1, i));
  }, I = Hf(l, i), J = Hf(o, i), ne = Hf(g, i);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: E,
      className: WO,
      style: { height: v },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: e6,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: Hb, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: Hb, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: Vb, style: { left: 0, width: `${I}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: Vb,
            style: { left: `${J}%`, right: 0, width: `${100 - J}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Ub,
            style: { left: `${I}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": l,
            tabIndex: 0,
            onPointerDown: O("start"),
            onKeyDown: _("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Bb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: $b, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Ub,
            style: { left: `${J}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: O("end"),
            onKeyDown: _("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Bb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: $b, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: t6,
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
function Hf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function nc(t, a, i) {
  return Math.max(a, Math.min(i, t));
}
function r6(t, a, i, l) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, l), !a || a.length === 0)) return;
  const d = l / 2;
  o.fillStyle = i6(t, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const g = a[m] ?? 0, p = Math.max(1, g * (l - 4));
    o.fillRect(m, d - p / 2, 1, p);
  }
}
function i6(t, a, i) {
  return getComputedStyle(t).getPropertyValue(a).trim() || i;
}
var s6 = "r8lfsm0", l6 = "r8lfsm1", o6 = "r8lfsm2", c6 = "r8lfsm3", u6 = "r8lfsm4", d6 = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, f6 = "_1b1zchy3", h6 = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, m6 = "_1b1zchy6", p6 = "_1b1zchy7";
const DS = y.createContext("standalone");
function zS({
  variant: t = "standalone",
  children: a,
  className: i,
  style: l,
  ...o
}) {
  const d = [d6[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(DS.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: d, style: l, ...o, children: a }) });
}
function kS({
  title: t,
  meta: a,
  children: i,
  className: l,
  titleId: o
}) {
  const d = y.useContext(DS), h = [f6, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: h, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: h6[d], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: m6, children: a }) : null,
    i
  ] });
}
function OS({
  children: t,
  className: a,
  role: i = "group"
}) {
  const l = [p6, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: l, role: i, children: t });
}
const qb = -16, v6 = 80, g6 = 720;
function y6(t) {
  const { deploymentId: a, runId: i, utterance: l, audioUrl: o, onApplied: d, onError: h, onCancel: m } = t, g = l.durationMs ?? 0, [p, b] = y.useState(() => Ib(g)), [v, S] = y.useState(Bc), [E, w] = y.useState(!1), [N, R] = y.useState(!1), [T, O] = y.useState(null), [z, _] = y.useState(!1), I = y.useRef(null), J = y.useRef(null), ne = y.useRef(null);
  y.useEffect(() => {
    const U = Ib(g);
    b(U), S(e1(U)), R(!1), O(null), ne.current = null;
  }, [l.utteranceId, g]);
  const A = y.useCallback((U) => {
    S(U), b((B) => Wx(B, U));
  }, []);
  y.useEffect(() => () => J.current?.abort(), []), y.useEffect(() => {
    I.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [l.utteranceId]);
  const q = y.useCallback(
    (U) => {
      U.key === "Escape" && (U.stopPropagation(), m());
    },
    [m]
  ), F = y.useMemo(
    () => p.ops.find((U) => U.mode === "trim"),
    [p.ops]
  ), ie = F?.start_ms ?? 0, re = F?.end_ms ?? Math.max(1, g), te = y.useCallback((U, B) => {
    b((Q) => b6(Q, "trim", (M) => ({
      ...M,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(B))
    })));
  }, []), ce = y.useCallback((U) => te(U, re), [re, te]), W = y.useCallback((U) => te(ie, U), [ie, te]), k = y.useCallback((U) => {
    R(U), b((B) => {
      const Q = B.ops.filter((M) => M.mode !== "normalize");
      if (U) {
        const M = {
          id: Sn(),
          mode: "normalize",
          target_lufs: qb
        };
        return { ...B, ops: [...Q, M] };
      }
      return { ...B, ops: Q };
    });
  }, []), C = y.useCallback(async () => {
    const U = Hx(p, g);
    if (U) {
      O(U.message);
      return;
    }
    if (O(null), z) return;
    J.current?.abort();
    const B = new AbortController();
    J.current = B, _(!0);
    try {
      const Q = ne.current ?? void 0, M = await OC(
        a,
        i,
        l.utteranceId,
        Q ? { chain: p, digest_before: Q } : { chain: p },
        { signal: B.signal }
      );
      if (B.signal.aborted) return;
      ne.current = M.chain_digest, d(M);
    } catch (Q) {
      if (B.signal.aborted) return;
      Q instanceof Qi && (ne.current = Q.currentDigest || null);
      const M = Q instanceof Qi ? "Edit chain has changed in another tab. Reload to continue." : Q instanceof Error ? Q.message : "apply failed";
      O(M), h(M);
    } finally {
      B.signal.aborted || _(!1);
    }
  }, [p, g, z, a, i, l.utteranceId, d, h]);
  return /* @__PURE__ */ c.jsx(zS, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: I, onKeyDown: q, children: [
    /* @__PURE__ */ c.jsx(kS, { title: "Edit segment", meta: `Source · ${ac(g)}` }),
    /* @__PURE__ */ c.jsx(
      AS,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: ie,
        endMs: re,
        onChangeStart: ce,
        onChangeEnd: W,
        height: v6,
        width: g6
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: s6, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: l6, children: [
        ac(ie),
        " → ",
        ac(re),
        " · ",
        ac(re - ie)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: o6, children: [
      /* @__PURE__ */ c.jsxs("label", { className: c6, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (U) => k(U.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          qb.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: u6,
          onClick: () => w((U) => !U),
          "aria-expanded": E,
          children: [
            E ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    E && /* @__PURE__ */ c.jsx(
      Ih,
      {
        state: v,
        onChange: A,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(OS, { children: [
      /* @__PURE__ */ c.jsx($e, { size: "sm", onClick: () => void C(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: m, disabled: z, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: T })
  ] }) });
}
function Ib(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function b6(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function ac(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var x6 = "jq2zyb2", S6 = "jq2zyb3", w6 = "jq2zyb4", E6 = "jq2zyb5", j6 = "jq2zyb6", N6 = "jq2zyb7", T6 = "jq2zyb8", C6 = "jq2zyb9", R6 = "jq2zyba", M6 = "jq2zybb", _6 = "jq2zybc", A6 = "jq2zybd", D6 = "jq2zybe", z6 = "jq2zybf jq2zybe", k6 = "jq2zybg", O6 = "jq2zybh", L6 = "jq2zybi", U6 = "jq2zybj", B6 = "jq2zybk", $6 = "jq2zybl", V6 = "jq2zybm", H6 = "jq2zybn", q6 = "jq2zybo", I6 = "jq2zybp", F6 = "jq2zybq", Y6 = "jq2zybr", G6 = "jq2zybs", X6 = "jq2zybt", P6 = "jq2zybu", K6 = "jq2zybv", Q6 = "jq2zybw", Z6 = "jq2zybx", J6 = "jq2zyby", Fb = "jq2zybz", W6 = "jq2zyb10", eL = "jq2zyb11", tL = "jq2zyb12";
const nL = ["cancelled", "failed", "partial"], aL = 2600;
function rL() {
  const { run: t } = Nl(), a = El(), [i, l] = y.useState(t), [o, d] = y.useState(!1), [h, m] = y.useState(null), [g, p] = y.useState(null), [b, v] = y.useState(
    null
  );
  y.useEffect(() => {
    l(t);
  }, [t]), y.useEffect(() => {
    if (!b) return;
    const _ = setTimeout(() => v(null), aL);
    return () => clearTimeout(_);
  }, [b]);
  const S = y.useMemo(() => lL(i), [i]), E = nL.includes(i.status) && i.kind === "batch", w = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      d(!0), m(null);
      try {
        const { runId: _ } = await $x(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${_}`);
      } catch (_) {
        m(uL(_));
      } finally {
        d(!1);
      }
    }
  }, R = y.useCallback((_) => {
    p((I) => I === _ ? null : _);
  }, []), T = y.useCallback(() => {
    p(null);
  }, []), O = (_, I) => {
    l((J) => sL(J, _, I)), p(null), v({ message: "Segment edited", severity: "success" });
  }, z = y.useCallback((_) => {
    v({ message: _, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: x6, children: [
    /* @__PURE__ */ c.jsxs("div", { className: S6, children: [
      /* @__PURE__ */ c.jsxs("header", { className: w6, children: [
        /* @__PURE__ */ c.jsxs("p", { className: E6, children: [
          i.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Uh, { to: `/${i.deploymentId}/recipe`, className: j6, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: N6, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: T6, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: C6, children: [
            oL(i.kind),
            /* @__PURE__ */ c.jsx("span", { className: R6, children: i.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Zr, { size: "md", tone: dL(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: M6, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(rc, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(rc, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          rc,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          rc,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      E && /* @__PURE__ */ c.jsxs("section", { className: O6, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: L6, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: U6, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: B6, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx($e, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ c.jsx("p", { className: $6, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ c.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(HT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Pr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: V6, children: [
            /* @__PURE__ */ c.jsx("span", { className: H6, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: q6, children: i.utterances.map((_) => {
          const I = g === _.utteranceId, J = _.status === "completed" && _.audioArtifactRef !== null && _.audioArtifactRef !== void 0, ne = _.derivedArtifactRef ?? _.audioArtifactRef ?? null, A = ne ? `/api/v1/artifacts/${encodeURIComponent(ne)}/download` : "", q = (_.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: F6, children: [
            /* @__PURE__ */ c.jsxs("div", { className: I6, children: [
              /* @__PURE__ */ c.jsxs("span", { className: G6, children: [
                "#",
                _.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: X6, title: _.characterDisplay, children: _.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: P6, title: _.text, children: _.text }),
              /* @__PURE__ */ c.jsxs("span", { className: K6, children: [
                _.cacheHit && /* @__PURE__ */ c.jsx("span", { className: Q6, children: "cached" }),
                q && /* @__PURE__ */ c.jsx("span", { className: Y6, children: "edited" }),
                _.durationMs ? /* @__PURE__ */ c.jsx("span", { children: cL(_.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Zr, { tone: fL(_.status), children: _.status }),
                J && /* @__PURE__ */ c.jsx(
                  $e,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => R(_.utteranceId),
                    "aria-expanded": I,
                    "aria-label": I ? "Close segment editor" : "Edit segment",
                    children: I ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            I && A && i.deploymentId && /* @__PURE__ */ c.jsx(
              y6,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: _,
                audioUrl: A,
                onApplied: (F) => O(_.utteranceId, F),
                onError: z,
                onCancel: T
              }
            )
          ] }, _.utteranceId);
        }) })
      ] }),
      iL(i, w)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: tL,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function iL(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const l = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: Z6, children: a ? /* @__PURE__ */ c.jsxs("div", { className: W6, children: [
    /* @__PURE__ */ c.jsx("p", { className: eL, children: l }),
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
          /* @__PURE__ */ c.jsx("span", { className: Fb, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: J6,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: Fb, children: "↓" })
      ]
    }
  ) : null });
}
function sL(t, a, i) {
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
function rc({ label: t, value: a, mono: i, progress: l }) {
  const o = l !== void 0 ? Math.min(1, Math.max(0, l)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: _6,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: A6, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: i ? z6 : D6, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: k6, "aria-hidden": "true" })
      ]
    }
  );
}
function lL(t) {
  const a = t.utterances.length, i = t.utterances.filter((h) => h.status === "completed").length, l = t.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = t.utterances.filter((h) => h.cacheHit).length, d = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: l, cached: o, cacheRatio: d };
}
function oL(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function cL(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function uL(t) {
  return t instanceof es ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function dL(t) {
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
function fL(t) {
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
var hL = "pcphqj2", mL = "pcphqj3", pL = "pcphqj4", vL = "pcphqj5", gL = "pcphqj6", yL = "pcphqj7", bL = "pcphqj8", xL = "pcphqj9", SL = "pcphqja", Yb = "pcphqjb", wL = "pcphqjc", EL = "pcphqjd", jL = "pcphqje pcphqjd", NL = "pcphqjf", TL = "pcphqjg", CL = "pcphqjh", RL = "pcphqji", ML = "pcphqjj pcphqji", _L = "pcphqjk pcphqji", AL = "pcphqjl pcphqji", DL = "pcphqjm", qf = "pcphqjn", If = "pcphqjo";
function zL() {
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: hL, children: /* @__PURE__ */ c.jsxs("div", { className: mL, children: [
    /* @__PURE__ */ c.jsxs("header", { className: pL, children: [
      /* @__PURE__ */ c.jsx("p", { className: vL, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: gL, children: [
        /* @__PURE__ */ c.jsx("h1", { className: yL, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: bL, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: xL, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ c.jsx(zn, { severity: "error", children: i }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(La, { density: "compact", children: /* @__PURE__ */ c.jsx(Tl, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Pr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: SL, children: t.map((o) => {
        const d = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: d ? `${Yb} ${wL}` : Yb,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: d ? jL : EL, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: NL, children: [
                /* @__PURE__ */ c.jsx("span", { className: TL, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: CL, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: kL(o.kind), children: OL(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: DL, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: qf, children: LL(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: If, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: qf, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: If, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: qf, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: If, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function kL(t) {
  switch (t) {
    case "batch":
      return ML;
    case "test_line":
      return _L;
    case "resume":
      return AL;
    default:
      return RL;
  }
}
function OL(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function LL(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), i = t % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function UL() {
  const { deploymentId: t, prefillCharacterName: a } = Nl(), i = El(), [l, o] = y.useState(a), [d, h] = y.useState(""), [m, g] = y.useState("none"), [p, b] = y.useState(!1), [v, S] = y.useState(null), E = y.useRef(null);
  y.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const w = async (N) => {
    N.preventDefault(), b(!0), S(null);
    try {
      await Bh(t, {
        characterName: l,
        speakerVoiceAssetId: d,
        defaultEmotionMode: m
      }), i(`/${t}/recipe`);
    } catch (R) {
      S(R instanceof Error ? R.message : "failed");
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ c.jsxs("main", { children: [
    /* @__PURE__ */ c.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: w, children: [
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: E,
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
var BL = "_1oor31e0", $L = "_1oor31e1", VL = "_1oor31e2", HL = "_1oor31e3", qL = "_1oor31e4", IL = "_1oor31e5", FL = "_1oor31e6", YL = "_1oor31e7", GL = "_1oor31e8";
const XL = 8;
function PL(t) {
  const { entries: a, loading: i, error: l } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: BL, "aria-busy": !!i, children: [
    l && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: l }),
    i && !l && /* @__PURE__ */ c.jsx("div", { className: GL, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !l && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: YL, children: "No edits yet" }),
    !i && !l && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: $L, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: VL, children: [
      /* @__PURE__ */ c.jsx("span", { className: HL, children: QL(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: qL, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: IL, title: o.digest_after, children: KL(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: FL, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function KL(t) {
  return t ? `${t.slice(0, XL)}…` : "—";
}
function QL(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Gb = "_1c63kaw0", ZL = "_1c63kaw1", JL = "_1c63kaw2", WL = "_1c63kaw3", e8 = "_1c63kaw4", t8 = "_1c63kaw5", n8 = "_1c63kaw6";
function a8({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Gb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: ZL, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Gb, "data-testid": "edit-chain-list", children: t.ops.map((i, l) => /* @__PURE__ */ c.jsxs("li", { className: JL, children: [
    /* @__PURE__ */ c.jsxs("span", { className: WL, "aria-hidden": "true", children: [
      l + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: e8, children: [
      /* @__PURE__ */ c.jsx("span", { className: t8, children: Xb(i) }),
      /* @__PURE__ */ c.jsx("span", { className: n8, children: r8(i) })
    ] }),
    /* @__PURE__ */ c.jsx(
      $e,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Xb(i)} (position ${l + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Xb(t) {
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
function r8(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Pb(t.start_ms)} → ${Pb(t.end_ms)}`;
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
      return `${Ff(t.low_db)} / ${Ff(t.mid_db)} / ${Ff(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Ff(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function Pb(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var ic = "_1o3ytop0", Yf = "_1o3ytop1", Kb = "_1o3ytop2", i8 = "_1o3ytop3", s8 = "_1o3ytop4", l8 = "_1o3ytop5", o8 = "_1o3ytop6", c8 = "_1o3ytop7", sc = "_1o3ytop8", u8 = "_1o3ytop9", d8 = "_1o3ytopf", f8 = "_1o3ytopg", h8 = "_1o3ytoph", m8 = "_1o3ytopi", p8 = "_1o3ytopj", v8 = "_1o3ytopk", g8 = "_1t0zy2f0", y8 = "_1t0zy2f1", b8 = "_1t0zy2f2";
function x8({ content: t, children: a, delayMs: i = 350 }) {
  const [l, o] = y.useState(!1), d = y.useId(), h = y.useRef(null), m = y.useCallback(() => {
    h.current != null && (window.clearTimeout(h.current), h.current = null);
  }, []), g = y.useCallback(() => {
    m(), h.current = window.setTimeout(() => o(!0), i);
  }, [m, i]), p = y.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (y.useEffect(() => () => m(), [m]), y.useEffect(() => {
    if (!l) return;
    const v = (S) => {
      S.key === "Escape" && o(!1);
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
  return /* @__PURE__ */ c.jsxs("span", { className: g8, children: [
    y.cloneElement(a, b),
    l && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: d, className: b8, children: t })
  ] });
}
function lc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(x8, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: y8, children: "?" }) });
}
const Qb = -16;
function S8(t) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: l = [],
    onChainPersisted: o,
    onError: d
  } = t, h = a.durationMs ?? 0, m = y.useMemo(
    () => w8(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, p] = y.useState(() => Gf(h)), [b, v] = y.useState(Bc), [S, E] = y.useState(!1), [w, N] = y.useState(null), [R, T] = y.useState(null), [O, z] = y.useState(!1), [_, I] = y.useState(!1), [J, ne] = y.useState(!1), [A, q] = y.useState(null), [F, ie] = y.useState([]), [re, te] = y.useState(null), [ce, W] = y.useState([]), [k, C] = y.useState(!1), [U, B] = y.useState(null), [Q, M] = y.useState(0), Z = y.useRef(null), P = y.useRef(null), le = y.useRef(null), fe = y.useRef(null), ge = y.useRef(null), Ae = y.useRef(0), Me = y.useMemo(
    () => g.ops.some((ye) => ye.mode === "normalize"),
    [g.ops]
  );
  y.useEffect(() => {
    const ye = Gf(h);
    p(ye), v(e1(ye)), N(null), ne(!1), ie([]), te(null), ge.current = null;
  }, [a.voiceAssetId, h]);
  const Ve = y.useCallback((ye) => {
    v(ye), p((ze) => Wx(ze, ye));
  }, []);
  y.useEffect(() => {
    fe.current?.abort();
    const ye = new AbortController();
    return fe.current = ye, C(!0), B(null), fc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((ze) => {
      ye.signal.aborted || W(ze.entries);
    }).catch((ze) => {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Error ? ze.message : "audit fetch failed";
      B(Qe);
    }).finally(() => {
      ye.signal.aborted || C(!1);
    }), () => ye.abort();
  }, [i, a.voiceAssetId, Q]), y.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), y.useEffect(() => () => {
    P.current?.abort(), le.current?.abort(), fe.current?.abort();
  }, []);
  const Jt = g.ops.find((ye) => ye.mode === "trim"), Pt = g.ops.find((ye) => ye.mode === "normalize"), At = Jt?.start_ms ?? 0, et = Jt?.end_ms ?? Math.max(1, h), pt = y.useCallback((ye, ze) => {
    p(
      (Qe) => Zb(
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
  ), Oe = y.useCallback(
    (ye) => pt(At, ye),
    [At, pt]
  ), De = y.useCallback((ye) => {
    p((ze) => {
      const Qe = ze.ops.filter((nt) => nt.mode !== "normalize");
      if (ye) {
        const nt = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Qb
        };
        return { ...ze, ops: [...Qe, nt] };
      }
      return { ...ze, ops: Qe };
    });
  }, []), Te = y.useCallback(
    (ye) => {
      const ze = g.ops.findIndex((It) => It.id === ye);
      if (ze === -1) return;
      const Qe = g.ops[ze];
      if (!Qe) return;
      const nt = [...g.ops.slice(0, ze), ...g.ops.slice(ze + 1)];
      p({ ...g, ops: nt }), ie((It) => [...It, { op: Qe, index: ze }]);
    },
    [g]
  ), bt = y.useCallback(() => {
    const ye = F[F.length - 1];
    if (!ye) return;
    const ze = Math.min(ye.index, g.ops.length), Qe = [...g.ops.slice(0, ze), ye.op, ...g.ops.slice(ze)];
    p({ ...g, ops: Qe }), ie(F.slice(0, -1));
  }, [g, F]), xt = y.useCallback(() => {
    const ye = Hx(g, h);
    return ye ? (N(ye.message), !1) : (N(null), !0);
  }, [g, h]), dn = y.useCallback(async () => {
    if (!xt() || O) return;
    P.current?.abort();
    const ye = new AbortController();
    P.current = ye;
    const ze = ++Ae.current;
    I(!0);
    try {
      const Qe = await UC(a.voiceAssetId, i, g, {
        signal: ye.signal
      });
      if (ye.signal.aborted || ze !== Ae.current) return;
      R && URL.revokeObjectURL(R);
      const nt = URL.createObjectURL(Qe);
      T(nt), ne(!0), requestAnimationFrame(() => Z.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (ye.signal.aborted) return;
      const nt = Qe instanceof Error ? Qe.message : "preview failed";
      N(nt), d(nt);
    } finally {
      ye.signal.aborted || I(!1);
    }
  }, [xt, O, a.voiceAssetId, i, g, R, d]), Ht = y.useCallback(async () => {
    if (!xt() || _ || O) return;
    if (l.length > 1) {
      const ze = l.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${l.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    P.current?.abort(), le.current?.abort();
    const ye = new AbortController();
    le.current = ye, z(!0);
    try {
      const ze = ge.current ?? void 0, Qe = await Vx(
        a.voiceAssetId,
        i,
        ze ? { chain: g, digest_before: ze } : { chain: g },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ge.current = Qe.chain_digest, te(Qe.chain_digest), N(null), q(Qe.measured_lufs ?? null), ie([]), o(Qe), M((nt) => nt + 1);
    } catch (ze) {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Qi;
      ze instanceof Qi && (ge.current = ze.currentDigest || null);
      const nt = Qe ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      N(nt), d(nt);
    } finally {
      ye.signal.aborted || z(!1);
    }
  }, [
    xt,
    _,
    O,
    l,
    a.voiceAssetId,
    i,
    g,
    o,
    d
  ]), kn = y.useCallback(() => {
    P.current?.abort(), p(Gf(h)), N(null), q(null), ne(!1), ie([]), M((ye) => ye + 1), R && (URL.revokeObjectURL(R), T(null));
  }, [h, R]), qt = y.useCallback((ye) => {
    p(
      (ze) => Zb(
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
  return /* @__PURE__ */ c.jsxs(zS, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      kS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${oc(h)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      AS,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: At,
        endMs: et,
        onChangeStart: he,
        onChangeEnd: Oe
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Yf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          lc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Kb, children: [
        oc(At),
        " → ",
        oc(et),
        " · ",
        oc(et - At)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: c8, children: [
      /* @__PURE__ */ c.jsxs("div", { className: sc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: ic, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Yf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              lc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          Me && Pt && /* @__PURE__ */ c.jsxs("span", { className: d8, children: [
            "target ",
            Pt.target_lufs.toFixed(1),
            " LUFS",
            A !== null && ` · measured ${A.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: u8, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: Me,
              onChange: (ye) => De(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Qb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Me && Pt && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: h8,
            min: -30,
            max: -6,
            step: 0.5,
            value: Pt.target_lufs,
            onChange: (ye) => qt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: sc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: ic, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Yf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              lc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: Kb, children: g.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(a8, { chain: g, onRemoveOp: Te })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: sc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: i8,
            onClick: () => E((ye) => !ye),
            "aria-expanded": S,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: s8, "aria-hidden": "true", children: S ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: l8, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                lc,
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
          Ih,
          {
            state: b,
            onChange: Ve,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      re && /* @__PURE__ */ c.jsx("div", { className: sc, children: /* @__PURE__ */ c.jsxs("span", { className: ic, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: o8, title: re, children: [
          re.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(OS, { children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "secondary",
          onClick: () => void dn(),
          disabled: _ || O,
          children: _ ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          onClick: () => void Ht(),
          disabled: O || _,
          children: O ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "ghost",
          onClick: kn,
          disabled: O || _,
          children: "Reset"
        }
      ),
      F.length > 0 && /* @__PURE__ */ c.jsxs(
        $e,
        {
          variant: "ghost",
          size: "sm",
          onClick: bt,
          disabled: O || _,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            F.length,
            ")"
          ]
        }
      ),
      J && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: v8,
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
        ref: Z,
        src: R,
        controls: !0,
        className: f8,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: w }),
    /* @__PURE__ */ c.jsxs("details", { className: m8, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: p8, children: [
        "Edit history",
        ce.length > 0 ? ` · ${ce.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        PL,
        {
          entries: ce,
          loading: k,
          error: U
        }
      )
    ] })
  ] });
}
function Gf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Zb(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function oc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function w8(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var E8 = "go9vi12", j8 = "go9vi13", N8 = "go9vi14", T8 = "go9vi15", C8 = "go9vi16", R8 = "go9vi17", M8 = "go9vi18", _8 = "go9vi19", A8 = "go9vi1a go9vi19", D8 = "go9vi1b", z8 = "go9vi1c", k8 = "go9vi1d", O8 = "go9vi1e", L8 = "go9vi1f", U8 = "go9vi1g", B8 = "go9vi1h", $8 = "go9vi1i", Fr = "go9vi1j", il = "go9vi1k", Gi = "go9vi1l", V8 = "go9vi1m go9vi1l", H8 = "go9vi1n", q8 = "go9vi1o go9vi1n", I8 = "go9vi1p go9vi1n", F8 = "go9vi1q", Y8 = "go9vi1r", G8 = "go9vi1s", X8 = "go9vi1t", LS = "go9vi1u", P8 = "go9vi1v", K8 = "go9vi1w", Q8 = "go9vi1x go9vi1l", Z8 = "go9vi1y", J8 = "go9vi1z", W8 = "go9vi110", eU = "go9vi111", tU = "go9vi112", nU = "go9vi113";
const aU = ["none", "audio_ref", "vector_preset", "qwen_template"];
function rU() {
  const { deployment: t, mappings: a, voiceAssets: i } = Nl(), [l, o] = y.useState(a), [d, h] = y.useState(i), [m, g] = y.useState(
    a[0]?.mappingId ?? null
  ), [p, b] = y.useState(""), [v, S] = y.useState(null), [E, w] = y.useState(null), [N, R] = y.useState(null), T = y.useMemo(() => {
    const C = /* @__PURE__ */ new Map();
    for (const U of d) C.set(U.voiceAssetId, U);
    return C;
  }, [d]), O = y.useMemo(() => {
    const C = p.trim().toLowerCase();
    return C ? l.filter((U) => U.characterName.toLowerCase().includes(C)) : l;
  }, [l, p]), z = y.useMemo(
    () => l.find((C) => C.mappingId === m) ?? null,
    [l, m]
  );
  y.useEffect(() => {
    o(a), h(i), g(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!E) return;
    const C = setTimeout(() => w(null), 2600);
    return () => clearTimeout(C);
  }, [E]);
  const _ = y.useCallback(async () => {
    const C = await Ki(t.deploymentId);
    h(C.voiceAssets);
  }, [t.deploymentId]), I = y.useCallback(
    (C) => {
      o(
        (U) => U.map((B) => B.mappingId === m ? { ...B, ...C } : B)
      );
    },
    [m]
  ), J = y.useCallback(
    async (C) => {
      if (!z) return;
      const U = z;
      try {
        const B = await ul(t.deploymentId, z.mappingId, C);
        o((Q) => Q.map((M) => M.mappingId === B.mappingId ? B : M));
      } catch (B) {
        o(
          (Q) => Q.map((M) => M.mappingId === U.mappingId ? U : M)
        ), S(mr(B));
      }
    },
    [z, t.deploymentId]
  ), ne = y.useCallback(async () => {
    const C = d[0];
    if (!C) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = uU(l), B = await Bh(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: C.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((Q) => [...Q, B]), g(B.mappingId);
    } catch (U) {
      S(mr(U));
    }
  }, [t.deploymentId, d, l]), A = y.useCallback(() => {
    z && R({ id: z.mappingId, name: z.characterName });
  }, [z]), q = y.useCallback(async () => {
    if (!N) return;
    const { id: C, name: U } = N;
    R(null);
    try {
      await Bx(t.deploymentId, C), o((B) => B.filter((Q) => Q.mappingId !== C)), g(null), w(`Mapping for ${U} deactivated.`);
    } catch (B) {
      S(mr(B));
    }
  }, [t.deploymentId, N]), F = y.useCallback(
    async (C, U, B) => {
      try {
        const Q = await bc(t.deploymentId, C, U, B);
        return h((M) => [Q, ...M]), w(`${Q.displayName} uploaded.`), Q;
      } catch (Q) {
        return S(mr(Q)), null;
      }
    },
    [t.deploymentId]
  ), ie = y.useCallback(async () => {
    try {
      const C = await ET(t.deploymentId);
      vU(C, `${t.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (C) {
      S(mr(C));
    }
  }, [t.deploymentId]), re = y.useCallback(
    async (C, U) => {
      try {
        const B = await jT(
          t.deploymentId,
          C.mappings,
          U
        );
        w(
          `Imported ${B.created.length} • skipped ${B.skipped.length} • replaced ${B.replaced.length}.`
        );
        const Q = await Ki(t.deploymentId);
        h(Q.voiceAssets);
      } catch (B) {
        S(mr(B));
      }
    },
    [t.deploymentId]
  ), te = y.useCallback(
    async (C) => {
      if (await _(), z && C.chain_digest)
        try {
          const U = await ul(t.deploymentId, z.mappingId, {
            voiceAssetChainDigest: C.chain_digest
          });
          o(
            (B) => B.map((Q) => Q.mappingId === U.mappingId ? U : Q)
          );
        } catch (U) {
          S(mr(U));
        }
      w("Edit applied.");
    },
    [_, z, t.deploymentId]
  ), ce = y.useCallback((C) => {
    S(C);
  }, []), W = y.useCallback(
    async (C, U) => {
      if (!z) return null;
      const B = C.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await RT(t.deploymentId, {
          line: B,
          outputFormat: U
        })).runId };
      } catch (Q) {
        return S(mr(Q)), null;
      }
    },
    [t.deploymentId, z]
  ), k = d.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: E8, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: j8, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsxs("header", { className: N8, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: T8, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: C8, children: [
            l.length,
            " active · ",
            d.length,
            " ",
            k
          ] })
        ] }),
        /* @__PURE__ */ c.jsx($e, { variant: "primary", size: "sm", onClick: ne, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: R8,
          placeholder: "Search characters",
          value: p,
          onChange: (C) => b(C.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(cU, { onExport: ie, onImport: re, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: M8, children: O.length === 0 ? /* @__PURE__ */ c.jsx(
        Tl,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : O.map((C) => {
        const U = T.get(C.speakerVoiceAssetId), B = C.mappingId === m;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: B ? A8 : _8,
            onClick: () => g(C.mappingId),
            "aria-pressed": B,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: D8, "aria-hidden": "true", children: dU(C.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: z8, children: [
                /* @__PURE__ */ c.jsx("span", { className: k8, children: C.characterName }),
                /* @__PURE__ */ c.jsxs("span", { className: O8, children: [
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
    /* @__PURE__ */ c.jsxs("section", { className: L8, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(um, { features: mm, children: /* @__PURE__ */ c.jsx(yS, { children: E && /* @__PURE__ */ c.jsx(
        hm.div,
        {
          className: P8,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }) }),
      v && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: v }),
      N && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          N.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx($e, { variant: "danger", size: "sm", onClick: () => void q(), children: "Delete" }),
        /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: () => R(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ c.jsx(
        sU,
        {
          deploymentId: t.deploymentId,
          mapping: z,
          voiceAssets: d,
          allMappings: l,
          onNameChange: (C) => {
            I({ characterName: C });
          },
          onNameBlur: (C) => {
            C !== z.characterName && C.trim() && J({ characterName: C.trim() });
          },
          onSpeakerChange: (C) => {
            I({ speakerVoiceAssetId: C }), J({ speakerVoiceAssetId: C });
          },
          onModeChange: (C) => {
            I({ defaultEmotionMode: C }), J({ defaultEmotionMode: C });
          },
          onQwenChange: (C) => {
            I({ defaultQwenTemplate: C });
          },
          onQwenBlur: (C) => {
            J({ defaultQwenTemplate: C });
          },
          onSpeedChange: (C) => {
            I({ defaultSpeedFactor: C });
          },
          onSpeedCommit: (C) => {
            J({ defaultSpeedFactor: C });
          },
          onEmotionVoiceChange: (C) => {
            const U = C || null;
            I({ defaultEmotionVoiceAssetId: U }), J({ defaultEmotionVoiceAssetId: U });
          },
          onDelete: A,
          onUploadVoice: async (C, U, B) => {
            const Q = await F(C, U, B);
            return Q && B === "speaker" && (I({ speakerVoiceAssetId: Q.voiceAssetId }), J({ speakerVoiceAssetId: Q.voiceAssetId })), await _(), Q;
          },
          onTestLine: W,
          onEditChainPersisted: te,
          onEditError: ce
        },
        z.mappingId
      ) : /* @__PURE__ */ c.jsx(
        iU,
        {
          voiceCount: d.length,
          onUploadVoice: async (C) => {
            await F(C, C.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function iU({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: W8, children: [
      /* @__PURE__ */ c.jsx("p", { className: Pr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: eU, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: tU, children: [
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
  ] }) : /* @__PURE__ */ c.jsx(La, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Tl,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function sU(t) {
  const { mapping: a, voiceAssets: i, allMappings: l } = t, o = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, d = y.useMemo(
    () => l.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [l, a.speakerVoiceAssetId]
  ), h = i.find((T) => T.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, g] = y.useState(""), [p, b] = y.useState("mp3"), [v, S] = y.useState("idle"), [E, w] = y.useState(null), N = y.useRef(!1);
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
    const { runId: O } = T;
    for (let z = 0; z < 60; z += 1) {
      if (await new Promise((_) => setTimeout(_, 500)), N.current) return;
      try {
        const _ = await $h(t.deploymentId, O);
        if (N.current) return;
        if (_.status === "completed") {
          S("done");
          return;
        }
        if (_.status === "failed" || _.status === "cancelled") {
          S("error"), w(`Run ${_.status}.`);
          return;
        }
      } catch (_) {
        if (N.current) return;
        S("error"), w(_ instanceof Error ? _.message : "unknown error");
        return;
      }
    }
    N.current || (S("error"), w("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, m, p]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: U8, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Pr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: B8, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: LS, children: /* @__PURE__ */ c.jsx($e, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: K8,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: Q8,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: m,
              onChange: (T) => g(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: v === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Gi,
              value: p,
              onChange: (T) => b(T.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: v === "running",
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
              onClick: () => void R(),
              disabled: v === "running",
              children: v === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          v === "done" && /* @__PURE__ */ c.jsx(Zr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          v === "error" && E && /* @__PURE__ */ c.jsx(Zr, { tone: "danger", children: E })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: $8, children: [
      /* @__PURE__ */ c.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Pr, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Character name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: Gi,
              value: a.characterName,
              onChange: (T) => t.onNameChange(T.currentTarget.value),
              onBlur: (T) => t.onNameBlur(T.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Emotion mode" }),
          /* @__PURE__ */ c.jsx(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionMode,
              onChange: (T) => t.onModeChange(T.currentTarget.value),
              children: aU.map((T) => /* @__PURE__ */ c.jsx("option", { value: T, children: fU(T) }, T))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Fr, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ c.jsx(
            "textarea",
            {
              className: V8,
              value: a.defaultQwenTemplate ?? "",
              onChange: (T) => t.onQwenChange(T.currentTarget.value),
              onBlur: (T) => t.onQwenBlur(T.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Emotion reference" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (T) => t.onEmotionVoiceChange(T.currentTarget.value),
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "", children: "— none —" }),
                i.map((T) => /* @__PURE__ */ c.jsxs("option", { value: T.voiceAssetId, children: [
                  T.displayName,
                  " · ",
                  T.kind
                ] }, T.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Fr, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ c.jsx(
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
      /* @__PURE__ */ c.jsxs(La, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Pr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          lU,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(Jb, { voice: o }),
        /* @__PURE__ */ c.jsx(
          US,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          S8,
          {
            voiceAsset: o,
            deploymentId: t.deploymentId,
            affectedCharacterNames: d,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        ),
        h && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Emotion reference voice" }),
          /* @__PURE__ */ c.jsx(Jb, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function lU({
  value: t,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: Gi,
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
function Jb({ voice: t }) {
  const a = hU(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: F8, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: mU(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: Y8, children: [
      /* @__PURE__ */ c.jsx("div", { className: G8, children: /* @__PURE__ */ c.jsx(um, { features: mm, children: /* @__PURE__ */ c.jsx(
        hm.div,
        {
          className: X8,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Zr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(oU, { seed: t.contentSha256 })
  ] });
}
function oU({ seed: t }) {
  const a = y.useMemo(() => pU(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: Z8, "aria-hidden": "true", children: a.map((i, l) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: J8,
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
      className: o ? I8 : i ? q8 : H8,
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
function cU({
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
        className: nU,
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
        className: Gi,
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
function uU(t) {
  const a = new Set(t.map((l) => l.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function dU(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function fU(t) {
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
function hU(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function mU(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function pU(t, a) {
  const i = [];
  for (let l = 0; l < a; l += 1) {
    const o = t.charCodeAt(l % t.length);
    i.push((o * 31 + l * 7) % 100 / 100);
  }
  return i;
}
function vU(t, a) {
  const i = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), l = URL.createObjectURL(i), o = document.createElement("a");
  o.href = l, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(l);
}
function mr(t) {
  return t instanceof es || t instanceof Error ? t.message : "unknown error";
}
function gU() {
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
        const a = Vi(t, "deploymentId");
        return Mj(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), [i, { mappings: l }, { runs: o }, d] = await Promise.all([
          Ly(a),
          Uy(a),
          NT(a, { limit: 10 }),
          DT(a)
        ]);
        return { deployment: i, mappings: l, runs: o, workflow: d };
      },
      Component: PO
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), i = Vi(t, "runId");
        return { run: await $h(a, i) };
      },
      Component: rL
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), [i, { mappings: l }, { voiceAssets: o }] = await Promise.all([
          Ly(a),
          Uy(a),
          Ki(a)
        ]);
        return { deployment: i, mappings: l, voiceAssets: o };
      },
      Component: rU
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const i = Vi(t, "deploymentId"), l = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: l.searchParams.get("character") ?? ""
        };
      },
      Component: UL
    },
    {
      path: "/runtime/queue",
      Component: zL
    }
  ];
}
function Vi(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Wb = "ext-actions-request", yU = "ext-actions-declare", bU = "ext-action-state", ex = "ext-action-invoke", Sh = "emotion-tts:navigate", qi = "emotion-tts.run", tx = "emotion-tts.mappings", xU = 4e3;
function SU(t, a) {
  let i = null, l = !1;
  const o = () => {
    const w = i?.badge ?? "not_installed";
    return wU(w, l);
  }, d = () => ({
    primary: o(),
    secondary: {
      id: tx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    t.dispatchEvent(
      new CustomEvent(yU, {
        detail: { actions: d() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(bU, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => h(), p = (w) => {
    const N = w.detail?.id;
    N === qi ? b() : N === tx && t.dispatchEvent(
      new CustomEvent(Sh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const w = i?.badge ?? "not_installed", N = w === "ready" || w === "running" || w === "starting";
    l = !0, m();
    try {
      N ? await Px() : await Xx();
      try {
        i = await xc();
      } catch {
      }
    } catch {
    } finally {
      l = !1, m();
    }
  };
  t.addEventListener(Wb, g), t.addEventListener(ex, p);
  let v = !1;
  const S = async () => {
    try {
      const w = await xc();
      if (v) return;
      i = w, m();
    } catch {
    }
  };
  S();
  const E = window.setInterval(() => void S(), xU);
  return h(), {
    dispose: () => {
      v = !0, window.clearInterval(E), t.removeEventListener(Wb, g), t.removeEventListener(ex, p);
    }
  };
}
function wU(t, a) {
  const i = t === "ready" || t === "running" || t === "starting", l = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qi,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qi,
    label: Kx(t),
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
const wh = "emotion-tts-app", EU = "ext-event", nx = "emotion-tts-stylesheet", ax = ["accent", "density", "card"];
function jU(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function NU() {
  if (typeof document > "u" || document.getElementById(nx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = nx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
NU();
class TU extends HTMLElement {
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
    this.root = ej.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Sh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = SU(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const l = i.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(Sh, a);
  }
  syncTweaksFromBody() {
    for (const a of ax) {
      const i = jU(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: ax.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = LN(gU(), { initialEntries: [a] });
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
      new CustomEvent(EU, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function CU() {
  typeof customElements > "u" || customElements.get(wh) || customElements.define(wh, TU);
}
typeof customElements < "u" && !customElements.get(wh) && CU();
export {
  CU as register
};
//# sourceMappingURL=emotion-tts.js.map
